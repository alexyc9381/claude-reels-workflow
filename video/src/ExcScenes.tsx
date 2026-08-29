import React from "react";
import { Img, staticFile, useCurrentFrame } from "remotion";
import {
  W, H, E, OUT, IO, BACK, IN_Q, LIN, hexa, dkh, mxh, rnd, SH, SH_D,
  Scene, Cam, Chip, Plate, Contact, Mark, MarkPlate, MarkCast, Edge,
  R, PLACES, asPlace, vivid, mono, ui, Rake, Ring, Puff, Pool, Steam, Fall, Motes,
  Crew, Hero, Forearm, costumeFor, squash, rock, shake, lerpHex, Runner, Sweat,
  Cord, PatchCard, JackField, Bench, RelayBank, Dial, WebOfCords,
  MarkTile, MarkBoard,
  CLAY, CLAYD, GOLD, GREEN, RED, SKY, PAPER, CREAMB, INK, MUTE, TEAL, STEEL,
  BRASS, SODIUM, VIOLET, EMBER, OXIDE, SLATE, PCB, COPPER, JADE, BAKE,
} from "./ExcWorld";
import {
  Envelope, Pigeonholes, SorterArm, LeadTicket, Outlet, SlotRack, HallBench,
  CountPlate, KeyTag, Stool, N8nFlow, Cursor,
} from "./ExcProps";
import { Room, Jamb, Stack, Overhead } from "./HwSets";

/* ===========================================================================
   REEL 125 · "AUTO" — THE SCENES.  Board: storyboards/125-auto.md.

   ⛔⛔ EVERY SCENE HAS AN EVENT, NOT A COMPOSITION: a before state legible on
   frame 1, a visible TRIGGER, TRAVEL that crosses distance, and an arrival that
   COSTS something. Nothing here lands and simply stops.

   ⛔⛔ AND THE HERO ACTS. Asked of every scene before it was written — *what
   does the CLAUDE DO here?* — never "what is around him":
     S0  fights ONE cord into a jack, loses, turns to the wall, drops the pliers
     S1  pushes a card home and rides the dial round with it
     S2  watches the bank sort itself and never touches it (the stool is empty)
     S3  SLEEPS while four leads, in four outfits, get answered without him
     S4  loads one post at the head of the line and steps back off the press
     S5  steadies the four cards as they eject past him
     S6  HAULS DOWN the main switch that lights the whole field
     S7  FAILS to wire it by hand three times, boils over, then backs off
     S8  takes ONE card off the wall, in his own hands
     S9  slams it home and recoils as it goes live
     S10 IS NOT HERE — he is the one who left; nine others are still patching,
         and the four in front are visibly boiling over about it
     S11 strikes the keyword tag

   ⛔ AN ACTION LOOP IS NOT A SCENE. `Crew`'s four loops are what the room does
      WHILE the scene happens. Every scene still owes its own four-part event.
   ⛔ ONE TEXT CHIP PER SHOT, in the reserved band (panel y 112..210). Plates
      never enter the ground line the cast stands on.
   ⛔ EVERY SCENE IS LOCKED. The reel has exactly TWO re-framings — S5 f30 and
      S8 f0 — and both are CUTS, not drifts.
   ⛔ `E` CLAMPS. Anything that should LEAVE gets its own clock and an end;
      anything that should REPEAT returns; anything that SWEEPS uses
      `0.5 - 0.5*cos(t)`, never a ramp.
   ========================================================================= */

export type Variant = "house" | "amber" | "steel";

/** ⛔ the camera offset goes on the PANEL CONTENTS, never the whole comp, and it
    has to be big enough to beat a 64-bit dHash: targets mean >= 14, min >= 10. */
/* ⛔⛔⛔ LEVEL, AND INSIDE 1% OF SCALE. Alex, this reel: *"I don't like the second
   cut, it's just tilted to the right, it doesn't look good... how are these any
   different from the original?"* — the same words, on the same defect, that
   reel 120 produced `dhash-passes-while-cuts-are-identical` for.
   ⛔ A 2.5deg roll reads as a MISTAKE, not a choice, and a 5% push crops the
   frame differently for no reason. Both existed only to move a hash, which is
   differentiating by DEGRADING: two cuts made worse so a number would shift.
   ⭐ The camera is now a tie-breaker and nothing more. What actually separates
   the cuts is THREE DIFFERENT HOOKS — see `makeHook` below. */
export const CAM: Record<Variant, { dx: number; dy: number; s: number; rot: number }> = {
  house: { dx: -8, dy: 6, s: 1.006, rot: 0 },
  amber: { dx: -52, dy: -24, s: 1.024, rot: 0 },
  steel: { dx: 54, dy: 22, s: 1.028, rot: 0 },
};
/* ⛔⛔ `rot` IS 0 IN ALL THREE AND STAYS THERE. A roll reads as a MISTAKE, not a
   choice — it was the specific thing that got flagged, and reel 120 flagged it
   before that. A PAN does not: 50px on a 1012px panel is a different framing,
   which is a legitimate editorial decision, where a 2.5deg tilt just looks
   broken. Scale stays inside 3% so nothing is cropped differently enough to
   lose a receipt.
   ⛔ AND A BIG PAN IS NOT LUMA-NEUTRAL — the set is not evenly lit, so frame 0
   is re-measured on every cut after any change here, never assumed. */

/** ⛔⛔⛔ HUE IS NOT A VARIANT LEVER (reel 115). `hue-rotate` / `saturate` are
    BANNED from GRADE — both move the clay, and a trial cut may never recolour
    the Claude. Only CONTRAST and BRIGHTNESS vary. */
export const GRADE: Record<Variant, string> = {
  house: "contrast(1.000) saturate(1.20) brightness(1.000)",
  amber: "contrast(1.135) saturate(1.20) brightness(0.960)",
  steel: "contrast(1.070) saturate(1.20) brightness(1.050)",
};

const PAR_X: Record<Variant, number> = { house: 0, amber: -46, steel: 44 };
/** ⛔⛔ A RAKE PHASE IS MODULO THE BAND PITCH — offsets inside one pitch collapse
    to nothing. Varying `n` changes the PITCH itself, which is the only offset
    that cannot go inert. */
const RAKE_X: Record<Variant, number> = { house: 0, amber: 96, steel: 172 };
const RAKE_K: Record<Variant, number> = { house: 1, amber: 1.84, steel: 0.50 };
const RAKE_N: Record<Variant, number> = { house: 7, amber: 5, steel: 11 };
/** ⭐ PER-CUT LAYOUT on the three flattest scenes — one large object on a plain
    field is the hardest frame to differentiate and a grade has nothing to bite
    on there. At any sampled instant the subject is somewhere else. */
const LAY: Record<Variant, { slot: number; card: number; tag: number }> = {
  house: { slot: 0, card: 0, tag: 0 },
  amber: { slot: 92, card: -64, tag: -54 },
  steel: { slot: -98, card: 88, tag: 90 },
};

/* ⭐⭐⭐ THE BODY'S VARIANT LEVER: WHICH REAL APPS ARE ON SCREEN.
   Flattening the camera collapsed the dHash from 22.2 to **12.3, MIN 5** — and
   that is the useful diagnostic, exactly as `dhash-passes-while-cuts-are-
   identical` predicts. The hook frames stayed strong (20 / 23) because the three
   mechanisms genuinely differ; every frame from f152 on was weak, which named
   the real problem: **the body scenes had no variant lever at all.** A tilt had
   been standing in for one.

   ⭐ So the cuts now differ by CONTENT. Each draws its marks from a different
   offset into `R.roster` wherever the VO does not dictate them — a different
   shelf at 5s, different destinations at 7s, a different category order at 14s,
   a different workflow at 18s. Every mark is still one of the 24 verified as
   really being in the repo, so nothing is invented to make a hash move.
   ⛔ WHERE THE VO NAMES THEM, THEY DO NOT MOVE: S5's four marks are the spoken
   words (Gmail · Slack · WhatsApp · YouTube) and S4's three outlets are the
   named platforms. Those are identical in all three cuts, by law. */
const MSET: Record<Variant, number> = { house: 0, amber: 9, steel: 17 };
/** the workflow shown at 5s, 18s and 19s — three real chains, none of them spoken */
const FLOW: Record<Variant, readonly string[]> = {
  house: ["gmail", "googlesheets", "slack"],
  amber: ["telegram", "notion", "whatsapp"],
  steel: ["googledrive", "googlegemini", "discord"],
};
/** the seven-app shelf at 5s */
const SHELF: Record<Variant, readonly string[]> = {
  house: ["telegram", "notion", "airtable", "discord", "wordpress", "googledrive", "instagram"],
  amber: ["googlesheets", "whatsapp", "github", "reddit", "supabase", "googleforms", "x"],
  steel: ["gmail", "googlegemini", "postgresql", "anthropic", "youtube", "elevenlabs", "slack"],
};
/** the four destinations mail is sorted into at 7s */
const DEST: Record<Variant, readonly string[]> = {
  house: ["googlesheets", "notion", "slack", "telegram"],
  amber: ["airtable", "discord", "googledrive", "whatsapp"],
  steel: ["notion", "googleforms", "supabase", "telegram"],
};

export type SP = { v: Variant; dur: number };

/** the ground line the cast stands on, house-wide */
export const GY = 706;
/** ⛔ the reserved plate band — nothing else enters panel y 112..210 */
const BAND_Y = 132;

/* =========================================================================
   S0 · THEY COME TO HIM — 0.00 to 5.23s (157f) · THE HOOK
   VO: "There's a GitHub repo with over 30,000 stars that gives you 280
        pre-built automations so you never have to set one up yourself."

   ⛔⛔⛔ THE THIRD VERSION OF THIS HOOK, AND A THIRD NOTE MEANS THE OBJECT.
     v1  a Claude losing a fight with one patch cord      → wrong axis (no marks)
     v2  a 24-socket board filling with logo tiles        → right axis, wrong OBJECT
     v3  finished automations FLY IN and stack around him
   v2 was on brief and still read flat, and the reason is structural, not
   cosmetic: **a grid filling is one idea repeated twelve times.** Every tile did
   the same thing, over the same 330px, into the same lattice, so the twelfth
   arrival carried exactly as much information as the first. Measured, it also
   repainted almost nothing — a tile dropping into its own slot sweeps 140x330px
   and no more.

   ⭐ THE FIX IS TRAVEL AND ACCELERATION. Each automation now crosses the WHOLE
   PANEL — off-screen right to its place in a growing wall, ~1100px on an arc —
   and they arrive FASTER AND FASTER, from one every twenty frames to three every
   ten. §1's top row is "many large bright objects arriving continuously"; this
   is that shape with the travel maximised and a real accelerando on top, so the
   shot has an ARC rather than a rate.
   ⭐ AND THEY OVERLAP (§13). Three or four are in the air at any moment on
   different arcs, which is what makes it read SMOOTH instead of as a string of
   pops — the composite keeps repainting while every individual object moves on
   one clean curve.
   ⛔ EVERY CHIP IS A REAL APP FROM `R.roster`, so this is still the logo reel
   Alex asked for: 24 marks, each 65px on a white card, each crossing the frame.
   ====================================================================== */
export const S0: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("bench");

  const CUT = 104;
  /* ⛔⛔ THE OBJECT IS THE MARK ITSELF, NOT A CARD WITH A MARK ON IT.
     v3's first pass flew `FlowChip`s — little white cards carrying a 57px logo,
     an n8n bug and a mini node chain. On a frame strip they read as NAME BADGES
     in a grey room: the travel was right and the object had regressed, because a
     150px logo is recognised at thumbnail size and a 57px logo on a card is not.
     ⭐ So this is v2's object at v2's size, with v3's TRAVEL and ACCELERATION —
     the two halves that each worked, together. Marks at 150px, twenty of them,
     each crossing the whole panel. */
  const COLS = 5, ROWS = 4, CW = 150, CH = 150, GX = 12, GY0 = 12;
  /* ⛔ BY clears the chassis header pill, which bottoms out around panel y 96 */
  const BX = 100, BY = 106;
  const slotX = (i: number) => BX + (i % COLS) * (CW + GX);
  /* ⛔ IT FILLS DOWNWARD, NOT UPWARD. Building bottom-up left the top third of
     the panel as empty grey for most of the shot — reel 112's bottom-heavy note
     inverted, and just as dead. Seeding the TOP two ranks means frame 0 opens on
     a full upper wall, and the arrivals come down toward the cast rather than
     away from them. */
  const slotY = (i: number) => BY + Math.floor(i / COLS) * (CH + GY0);

  /* ⭐ WHICH OF THE STREAM GET KEPT — front-loaded, so the wall completes before
     the cut and the last stretch is pure flow-through. */
  const KEEP = [0, 2, 3, 5, 6, 8, 9, 11, 12, 14];
  const AT = KEEP.map(k => 4 + k * 6);
  /* ⛔ the bottom TWO ranks are seated at frame 0 — settled, never mid-flight —
     and ten 150px white tiles is what carries the >=140 luma bar now that the
     hook has no text plate at all. */
  const SEED = 10;
  const FLIGHT = 20;

  /* his reaction: he reaches for the first, is driven back by the rate, and
     ends up laughing at it */
  const first = 22;
  const heat = Math.max(0, 0.5 - E(f, 30, 76, 0, 0.5, IO));
  const joy = E(f, 74, 92, 0, 1, BACK);
  const knock = [16, 34, 52].reduce((m, a2) =>
    Math.max(m, f >= a2 && f < a2 + 8 ? 1 - (f - a2) / 8 : 0), 0);

  /* ---- shot B · the marks WIRE THEMSELVES ---- */
  /* ⛔ shot B owns the hook's LAST EIGHT FRAMES, and its wiring used to finish
     six frames early — a static wired grid at the boundary. It now runs past
     the cut, and the marks pulse in a travelling wave behind it. */
  const wire = E(f, CUT + 4, dur + 8, 0, 1, LIN);

  return (
    <Scene p={p} slug="" push={[0, dur, 1.045]} vig={0.44} glow={hexa(p.key, 0.20)}>
      {f < CUT ? (<>
        <Room p={p} f={f} dx={PAR_X[v]} bands={2} kind="rack" overhead="lampbar"
          rake={0.16} rakeX={RAKE_X[v]} rakeRate={9.6 * RAKE_K[v]} rakeN={RAKE_N[v]}
          floorKind="slab" grit={0.4} lamp={{ x: 506, y: 96, r: 330 }} />

        {/* ⭐⭐⭐ THREE CUTS = ONE BODY, THREE HOOKS, THREE MECHANISMS.
            `three-cuts-three-hooks` is settled house policy and this is the
            fourth reel to arrive at it. Alex: *"how are these any different from
            the original?"* — because a crop, a tilt and a tone curve are not a
            different cut. What changes here is what HAPPENS:

              house  THE SWARM    · CONVERGE — twenty marks on two counter-
                                    rotating rings that accelerate and lock
              amber  THE CASCADE  · POUR     — they fall in columns and fill the
                                    frame from the floor up, like a vessel
              steel  THE DEAL     · DEAL     — they are dealt off a deck at the
                                    left, one at a time, fanning into place

            All three end on the same formed grid with links firing, so shot B,
            the whole body and — critically — every SFX beat frame are untouched.
            ⛔ THE BEAT FRAMES CANNOT MOVE: the cue bank is per-REEL, so a hook
            that re-times its arrivals desynchronises every cut but one. All
            three deliver their arrivals on the same clock; only the PATH and the
            mechanism differ. */}
        {(() => {
          const CXc = BX + (COLS * (CW + GX) - GX) / 2;
          const CYc = BY + (ROWS * (CH + GY0) - GY0) / 2;
          const N = COLS * ROWS;
          const lock = E(f, 10, CUT + 6, 0, 1, IN_Q);

          /* ---- the three paths. Each returns where mark `i` is at frame `f`,
             and how it is oriented, for a formation that is `lock` resolved. -- */
          const place = (i: number) => {
            const gx = slotX(i), gy = slotY(i);

            if (v === "amber") {
              /* ⭐ THE CASCADE · POUR. Columns fall from above the frame and
                 stack from the floor up. Each column runs on its own clock so
                 the fill is ragged, the way anything poured actually settles. */
              const col = i % COLS, row = Math.floor(i / COLS);
              const order = (ROWS - 1 - row) * COLS + col;   /* bottom rank first */
              /* ⛔⛔ TEN ARE ALREADY DOWN AND SETTLED AT FRAME 0. The first build
                 of this hook started every column from scratch, so frame 0 was
                 an EMPTY GREY ROOM — no subject, no marks, and nothing to carry
                 the >=140 luma bar. THE-OPEN's frame-0 laws apply to every cut,
                 not just the house one, and `at = -60` puts these far enough
                 back to be FINISHED rather than merely started. */
              const at = order < 10 ? -60 : 4 + (order - 10) * 7;
              const t = Math.max(0, Math.min(1, (f - at) / 16));
              const e = E(t, 0, 1, 0, 1, IN_Q);              /* it FALLS, so it accelerates */
              const bounce = t >= 1
                ? Math.sin((f - at - 16) / 2.6) * 16 * Math.exp(-(f - at - 16) / 7) : 0;
              return { x: gx, y: -220 + (gy + 220) * e + bounce,
                       rot: (1 - e) * (i % 2 ? 22 : -22), on: t > 0 };
            }

            if (v === "steel") {
              /* ⭐ THE DEAL · one deck, dealt out. Every mark starts stacked at
                 the left and slides to its place, spinning as it goes — the
                 shape of a hand being dealt, and the reason its frame 0 is a
                 DECK rather than a wall. */
              /* ⛔ same rule for the deal: ten are already on the table at
                 frame 0, settled, and the deck is what makes this cut's opening
                 image read apart from the other two. */
              const at = i < 10 ? -60 : 4 + (i - 10) * 7;
              const t = Math.max(0, Math.min(1, (f - at) / 15));
              const e = E(t, 0, 1, 0, 1, OUT);               /* it is THROWN, so it decelerates */
              const dx0 = 46, dy0 = 470;
              return { x: dx0 + (gx - dx0) * e,
                       y: dy0 + (gy - dy0) * e - Math.sin(e * Math.PI) * 120,
                       rot: (1 - e) * 340, on: t > 0 };
            }

            /* ⭐ THE SWARM · CONVERGE (house) */
            const outer = i < 12;
            const ring = outer ? 12 : N - 12;
            const idx = outer ? i : i - 12;
            const dir = outer ? 1 : -1.45;
            const ang = (idx / ring) * Math.PI * 2
              + (f * 0.030 + f * f * 0.00055) * dir;
            const rad = (outer ? 372 : 214) * (1 - lock * 0.55);
            const ox = CXc + Math.cos(ang) * rad - CW / 2;
            const oy = CYc + Math.sin(ang) * rad * 0.72 - CH / 2;
            const tumble = (Math.sin(f / 5.2 + i * 1.7) * 18
              + Math.sin(f / 8.5 + i) * 9) * (1 - lock * 0.82);
            return { x: ox + (gx - ox) * lock, y: oy + (gy - oy) * lock,
                     rot: tumble, on: true };
          };

          /* how "formed" the grid is, per mechanism — drives the links */
          const formed = v === "house" ? lock
            : v === "amber" ? E(f, 70, CUT - 2, 0, 1, LIN)
            : E(f, 74, CUT - 2, 0, 1, LIN);

          return (
            <>
              {/* ⛔ STEEL'S DECK — its frame 0 is a stack of automations, not a
                  wall of them, which is the whole reason the cut reads apart. */}
              {v === "steel" && Array.from({ length: 7 }, (_, k) => (
                <MarkTile key={"dk" + k} x={40 - k * 2} y={464 - k * 5} s={CW}
                  z={30 + k} mark={R.roster[(N + k) % R.roster.length].id}
                  rot={-4 + k * 1.2} o={0.96} />
              ))}

              {Array.from({ length: N }, (_, i) => {
                const q = place(i);
                if (!q.on) return null;
                /* ⛔ THE LANDED ONES FIRE. Factoring the three mechanisms into
                   `place()` quietly dropped the periodic work-pulse the house
                   hook used to have, so a seeded rank went back to being a
                   static block of white — the exact defect round 4 fixed. */
                const per = 46, plf = (f + i * 7) % per;
                const fire = plf < 9 ? squash(plf, 0, 0.12, 3, 7) : 1;
                return (
                  <React.Fragment key={"hk" + i}>
                    <MarkTile x={q.x} y={q.y} s={CW} z={54 + i}
                      mark={R.roster[i].id} rot={q.rot} scale={fire}
                      live={1} f={f} ph={i * 0.83} />
                    {plf < 9 && (
                      <Ring x={q.x + CW / 2} y={q.y + CH / 2} f={f} at={f - plf} c="#7CF3C0" />
                    )}
                  </React.Fragment>
                );
              })}

              {/* the links fire the moment the formation is made, whichever way
                  it was made */}
              {formed > 0.72 && Array.from({ length: 10 }, (_, k) => {
                const lf = (f + k * 8) % 26;
                if (lf > 11) return null;
                const horiz = k % 3 !== 2;
                const r0 = (k * 5 + 1) % ROWS, c0 = (k * 3) % (horiz ? COLS - 1 : COLS);
                const i0 = r0 * COLS + c0, i1 = horiz ? i0 + 1 : i0 + COLS;
                if (i1 >= N) return null;
                const ax = slotX(i0) + CW / 2, ay = slotY(i0) + CH / 2;
                const bx = slotX(i1) + CW / 2, by = slotY(i1) + CH / 2;
                const t = Math.min(1, lf / 7);
                const ang2 = (Math.atan2(by - ay, bx - ax) * 180) / Math.PI;
                const fade = lf > 8 ? 1 - (lf - 8) / 3 : 1;
                return (
                  <React.Fragment key={"lk" + k}>
                    <div style={{ position: "absolute", left: ax, top: ay - 6,
                      width: Math.hypot(bx - ax, by - ay) * t, height: 12,
                      borderRadius: 7, background: "#2FB673", opacity: fade,
                      transform: `rotate(${ang2}deg)`, transformOrigin: "0 50%", zIndex: 90 }} />
                    <div style={{ position: "absolute", left: ax + (bx - ax) * t - 11,
                      top: ay + (by - ay) * t - 11, width: 22, height: 22,
                      borderRadius: "50%", background: "#7CF3C0",
                      border: "4px solid #2FB673", opacity: fade, zIndex: 91 }} />
                  </React.Fragment>
                );
              })}
            </>
          );
        })()}

        {/* ⭐ marks still streaming in from off-screen to join the swarm — the
            fourth kind of motion, and the one that says there are more of these
            than fit on any wall */}
        {/* ⛔⛔⛔ THE PASS-THROUGH STREAM WAS AT z 38 — BEHIND THE WALL.
            Measured on the first 1.5s, top half vs bottom half of the panel:
            SWARM 34.12 / 36.34 (balanced), CASCADE 11.75 / 8.03, and
            **DEAL 4.04 / 15.17** — its top half all but dead, which is exactly
            "there's not enough motion in the top, only the bottom ones moving".
            The cause was not the stream's rate, it was its z: the seeded tiles
            sit at z 54-73 and the stream was drawn UNDER them, so in whichever
            half of the frame was already full it was invisible — and in DEAL and
            CASCADE the full half is the empty-looking one's neighbour.
            ⭐ At z 80 it runs IN FRONT of the wall and behind the hero, which is
            also the better read: hundreds more going past, in front of the
            twenty you kept.
            ⭐ Each mechanism gets its own path, so the stream reinforces the hook
            instead of contradicting it — the cascade RAINS, the deal FANS. */}
        {/* ⛔⛔ AND THE RATE HAD TO GO UP, NOT JUST THE z. Balanced but quiet is
            still quiet: after the z fix the two new hooks measured ~12/13 top
            and bottom against the SWARM's 34/36, because an orbit has all twenty
            tiles travelling at once while a pour or a deal has three in the air.
            The mechanism decides the ceiling, so the fix is more of the
            mechanism — 38 in the stream instead of 22, larger, and arriving
            every 2.5 frames. A heavier pour and a faster deal are more of what
            each hook already IS, not a foreign element bolted on. */}
        {Array.from({ length: 38 }, (_, k) => {
          const at = 1 + k * 2.5;
          const lf = f - at;
          if (lf < 0) return null;
          const t = lf / (v === "steel" ? 22 : 26);
          if (t >= 1) return null;
          const e = E(t, 0, 1, 0, 1, LIN);
          const col = (k * 229) % 980;
          const pos = v === "amber"
            /* CASCADE · it rains straight down the full width and off the bottom */
            ? { x: -40 + col, y: -190 + e * 1040, rot: (1 - e) * (k % 2 ? 30 : -30) }
            : v === "steel"
            /* DEAL · it fans off the deck ACROSS THE TOP and out the right edge,
               which is the half that was dead */
            ? { x: -180 + e * 1340, y: 430 - Math.sin(e * Math.PI) * 460,
                rot: e * 300 }
            /* SWARM · the original diagonal */
            : { x: 1160 - e * 1400, y: -150 + e * 900 + Math.sin(e * Math.PI) * 90,
                rot: (1 - e) * (k % 2 ? 42 : -42) };
          return (
            <MarkTile key={"st" + k} x={pos.x} y={pos.y}
              s={v === "house" ? 112 : 134} z={80}
              mark={R.roster[(12 + k + MSET[v]) % R.roster.length].id}
              o={0.92} rot={pos.rot} live={1} f={f} ph={k} />
          );
        })}

        {/* ⭐ HIM. He reaches for the first one, gets driven back as the rate
            climbs, and ends up laughing at it. */}
        <Contact x={806} y={GY + 14} w={214} o={0.44} />
        <Hero f={f} x={862} y={GY + 40} size={278} z={88} act={3} ph={0.6}
          costume={{ constr: 1 }} gaze={-1.2} heat={heat}
          stern={Math.max(0, 0.65 - joy)} shock={knock}
          drive={E(f, first, first + 10, 0, 0.30, OUT) * (1 - joy)}
          reach={90} cheer={joy} flip />

        {[452, 646].map((x, i) => (
          <Crew key={"cw" + i} f={f} x={x} y={GY + 46} i={i + 6} size={150}
            z={86} at={10 + i * 9} loop={[2, 3][i]} cheer={joy} />
        ))}

        <Edge side="l" c={p.grit} w={104} z={94} kind="post" />
      </>) : (<>
        {/* ================= SHOT B — THEY WIRE THEMSELVES =================
            "so you never have to set one up yourself" */}
        <Room p={asPlace("wall")} f={f} dx={PAR_X[v] * 1.5} bands={2} kind="rack"
          overhead="gantry" rake={0.17} rakeX={RAKE_X[v] + 60}
          rakeRate={10.4 * RAKE_K[v]} rakeN={RAKE_N[v]}
          floorKind="slab" grit={0.5} lamp={{ x: 506, y: 120, r: 330 }} />

        {(() => {
          const P = [[96, 186], [430, 138], [764, 194], [96, 418], [430, 452], [764, 386]];
          const M = ["gmail", "googlesheets", "slack", "telegram", "notion", "whatsapp"];
          const LINK: [number, number][] = [[0, 1], [1, 2], [3, 4], [4, 5], [0, 3], [2, 5]];
          const T = 152;
          return (
            <>
              {LINK.map(([a2, b2], i) => {
                const k = Math.max(0, Math.min(1, (wire * (LINK.length + 1) - i) / 1.1));
                if (k <= 0) return null;
                const ax = P[a2][0] + T / 2, ay = P[a2][1] + T / 2;
                const bx = P[b2][0] + T / 2, by = P[b2][1] + T / 2;
                const len = Math.hypot(bx - ax, by - ay) * k;
                const ang = (Math.atan2(by - ay, bx - ax) * 180) / Math.PI;
                return (
                  <React.Fragment key={"wl" + i}>
                    <div style={{ position: "absolute", left: ax, top: ay - 7, width: len,
                      height: 14, borderRadius: 8, background: k >= 1 ? "#2FB673" : "#7CF3C0",
                      transform: `rotate(${ang}deg)`, transformOrigin: "0 50%", zIndex: 40 }} />
                    {k >= 1 && <Ring x={bx} y={by} f={f} at={CUT} c="#7CF3C0" />}
                  </React.Fragment>
                );
              })}
              {P.map(([tx, ty], i) => (
                <MarkTile key={"mt" + i} x={tx} y={ty} s={T} z={70 + i} mark={M[i]}
                  live={1} f={f} ph={i * 1.1}
                  /* ⭐ a WAVE runs the cluster continuously — 152px tiles
                     breathing 9% is real swept area, unlike the 10px bead the
                     first attempt relied on */
                  scale={1 + 0.09 * Math.max(0, Math.sin(f / 7 - i * 0.9))
                    + (wire * 7 > i && wire * 7 < i + 1 ? 0.07 : 0)} />
              ))}
              <Contact x={232} y={GY + 22} w={200} o={0.40} />
              <Hero f={f} x={286} y={GY + 48} size={218} z={92} act={2} ph={1.3}
                costume={{ glasses: 1 }} gaze={Math.sin(f / 6) * 1.3}
                shock={wire < 0.25 ? 1 - wire * 4 : 0}
                cheer={E(wire, 0.72, 0.95, 0, 1, BACK)} />
            </>
          );
        })()}
        <Edge side="l" c={p.grit} w={96} z={94} kind="rail" />
      </>)}
    </Scene>
  );
};

/* =========================================================================
   S1 · THE SLOT — 5.23 to 6.93s (51f)
   VO: "And it takes just one minute to set up."
   §3: the noun is a MINUTE and the verb is SET UP. ⛔ THE EVENT IS THE SEATING,
   NOT THE DIAL — the dial is the receipt, the card going home is the action,
   and it travels 340px in 9 frames with a squash and a rack recoil.
   ⭐ A NUMBER MOVES TO ITS VALUE: the needle sweeps a full revolution and the
   reading is where it STOPS. Nothing is typeset at its value.
   ====================================================================== */
export const S1: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("slot");
  const SEAT = 26;
  const X0 = 74, X1 = 414 + LAY[v].slot * 0.2;

  /* ⛔ OVERLAPPING ACTION, NOT N DISCRETE POPS (§13): the card leads, the hand
     follows it, and the rack recoils after — smooth object, composite still
     repainting. Peak px/frame stays under the choppiness threshold. */
  const k = E(f, 8, SEAT, 0, 1, IO);
  const cx = X0 + (X1 - X0) * k;
  const seated = f >= SEAT;
  const recoil = seated ? rock(f, SEAT, 9, 11) : 0;
  const sq = squash(f, SEAT, 0.14, 3, 12);
  /* the needle sweeps once, all the way round, and lands as the card seats */
  const dial = E(f, 6, SEAT + 4, 0, 1, IO);
  const lit = seated ? Math.min(5, 1 + Math.floor((f - SEAT) / 4)) : 1;

  return (
    <Scene p={p} slug="" push={[0, dur, 1.075]} vig={0.48} glow={hexa(p.key, 0.22)}>
      <Room p={p} f={f} dx={PAR_X[v]} bands={3} kind="rack" overhead="gantry"
        rake={0.15} rakeX={RAKE_X[v]} rakeRate={7.0 * RAKE_K[v]} rakeN={RAKE_N[v]}
        floorKind="slab" grit={0.6} lamp={{ x: 250, y: 140, r: 250 }} />

      {/* the background process this world owns — relays, always ticking */}
      <RelayBank f={f} x={640} y={188} n={6} z={26} s={0.82} rate={8} />

      {/* ⭐ A SHELF OF REAL APPS ABOVE THE SLOT — Alex: *"start like at four
          seconds, show off even more of logos."* The one going in is a choice
          out of many, and the many are on screen while he makes it. */}
      {SHELF[v].map((m, i) => (
        <MarkTile key={"sh" + i} x={74 + i * 124} y={272} s={100} z={34} mark={m}
          o={0.94} live={1} f={f} ph={i * 0.9} rot={(i % 2 ? 1 : -1) * 1.6} />
      ))}
      <div style={{ position: "absolute", left: 56, top: 380, width: 902, height: 15,
        zIndex: 32, borderRadius: 4, background: dkh(BRASS, 0.40) }} />

      <div style={{ transform: `translateY(${recoil * 0.4}px)` }}>
        <SlotRack x={396 + LAY[v].slot * 0.2} y={378} w={430} z={40} latch={0} live={seated ? 1 : 0} f={f} />
      </div>
      {/* the card, travelling into the bay */}
      {/* ⭐ what goes in is a WORKFLOW, not a slab — the same object S8 opens */}
      <div style={{ position: "absolute", inset: 0, zIndex: 62,
        transform: `scale(${sq})`, transformOrigin: `${cx + 170}px 500px` }}>
        {/* ⛔ `run` WAS A STEP, SO NOTHING MOVED AFTER THE SEAT. The card went
            in at f26 of 51 and the last eight frames measured 0.60 of the body.
            The execution pulse now walks the graph from the seat all the way
            PAST the scene end, so the shot is still running when it cuts. */}
        <N8nFlow x={cx} y={438} w={342} z={62} f={f} nodes={FLOW[v]}
          run={seated ? E(f, SEAT + 2, dur + 8, 0, 1, LIN) : 0} build={1} />
      </div>
      {seated && <Ring x={cx + 150} y={470} f={f} at={SEAT} c={mxh(BRASS, 0.3)} />}
      {seated && <Puff x={cx + 150} y={476} f={f} at={SEAT} c={p.grit} n={7} />}

      {/* ⭐ THE TAIL IS THE PAYOFF, NOT DEAD AIR. Once the card is seated the
          shot had nothing left; now finished jobs pour out of the slot for the
          rest of it, so the scene is still producing when it cuts. 88px objects
          on ballistic arcs — large enough to survive the downsample, which the
          execution pulse was not. */}
      {seated && [30, 36, 42, 48].map((at, i) => {
        const lf = f - at;
        if (lf < 0) return null;
        const t = Math.min(1, lf / 15);
        return (
          <div key={"ot" + i} style={{ position: "absolute",
            left: 660 + t * 250, top: 470 - Math.sin(t * Math.PI) * 150 + t * 120,
            width: 88, height: 62, zIndex: 76, opacity: 1 - Math.max(0, t - 0.75) * 4,
            background: PAPER, border: `4px solid ${dkh(PAPER, 0.30)}`, borderRadius: 4,
            transform: `rotate(${-16 + t * 44}deg)`, boxShadow: SH }}>
            <div style={{ position: "absolute", left: 9, top: 12, width: 50, height: 6,
              background: dkh(PAPER, 0.46) }} />
            <div style={{ position: "absolute", right: 8, bottom: 8, width: 18, height: 18,
              borderRadius: "50%", background: JADE }} />
          </div>
        );
      })}

      <Contact x={200} y={GY - 12} w={230} o={0.38} />
      {/* ⭐ HE PUSHES IT HOME. `strain` while he leans into it, a real 0.52 of
          drive, then the recoil and a big cheer the frame it seats — an
          emotional beat on the arrival, not just a landing. */}
      <Hero f={f} x={250} y={GY} size={276} z={56} act={1} ph={1.1}
        costume={{ glasses: 1 }} reach={132}
        strain={E(f, 6, SEAT, 0.2, 0.75, IO) * (seated ? 0 : 1)}
        drive={E(f, 8, SEAT, 0, 0.52, IO) - E(f, SEAT, SEAT + 12, 0, 0.52, OUT)}
        shock={seated && f < SEAT + 10 ? 1 - (f - SEAT) / 10 : 0}
        cheer={seated ? E(f, SEAT + 4, SEAT + 12, 0, 1, BACK) : 0} gaze={0.7} />

      <Dial x={856} y={556} r={86} v={dial} read="1:00" c={BRASS} z={64} />

      <Edge side="r" c={p.grit} w={116} z={94} kind="rail" />
    </Scene>
  );
};

/* =========================================================================
   S2 · MAIL SORTS ITSELF — 6.93 to 8.33s (42f)
   VO: "So now your emails sort themselves,"

   ⛔⛔ REBUILT ON DIRECT FEEDBACK — *"same with the other animations... at six
   seconds Gmail, stuff like that. Really focus on the logos."*
   v1 was a wooden pigeonhole bank with TEXT labels (INBOX / LEADS / BILLS /
   SPAM). It was a decent prop and it said nothing a viewer recognises.
   ⭐ It is now the real automation, drawn with real marks: mail leaves GMAIL and
   lands in GOOGLE SHEETS, NOTION, SLACK and TELEGRAM — four apps this repo
   genuinely automates, each with a counter that ticks as its own envelope
   arrives. Same information, zero labels, and every object is one the viewer
   can name in half a second.
   ⛔ AND NOBODY IS AT IT. The operator stool is empty and turned away, and the
   hero watches from the frame edge without touching anything: "sort THEMSELVES"
   is the whole line, and the absence is what says it.
   ====================================================================== */
export const S2: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("mail");
  /* ⭐ ARRIVALS SPAN THE FULL DURATION — eight drops across 42 frames, never
     bunched into the first third, or the tail goes dead. */
  const DROPS = [0, 5, 10, 16, 21, 27, 32, 37];
  const TARGET = [0, 2, 1, 3, 0, 2, 3, 1];
  const OUT_M = DEST[v];
  const TY = [168, 300, 432, 564];
  const TX = 726, TS = 118;
  const landed = (i: number) => DROPS.filter((d, j) => TARGET[j] === i && f >= d + 13).length;

  return (
    <Scene p={p} slug="" push={[0, dur, 1.085]} vig={0.50} glow={hexa(p.key, 0.20)}>
      <Room p={p} f={f} dx={PAR_X[v]} bands={3} kind="shelf" overhead="tray"
        rake={0.13} rakeX={RAKE_X[v]} rakeRate={7.6 * RAKE_K[v]} rakeN={RAKE_N[v]}
        floorKind="tile" grit={0.5} lamp={{ x: 300, y: 130, r: 280 }} />

      {/* ⭐ GMAIL, BIG, AS THE SOURCE — the noun in the line, at the size the
          noun in the line deserves */}
      <MarkTile x={92} y={286} s={216} z={60} mark="gmail" live={1} f={f} ph={0.3} />

      {/* the four destinations, each with its own real counter */}
      {OUT_M.map((m, i) => (
        <React.Fragment key={"ot" + i}>
          <MarkTile x={TX} y={TY[i]} s={TS} z={60} mark={m}
            live={1} f={f} ph={i * 1.2} />
          <div style={{ position: "absolute", left: TX + TS + 14, top: TY[i] + TS * 0.30,
            zIndex: 62, ...mono(30, 700), color: mxh(TEAL, 0.52) }}>{landed(i)}</div>
        </React.Fragment>
      ))}

      {/* the envelopes, each on its own ballistic path from Gmail to its app */}
      {DROPS.map((d, j) => {
        const lf = f - d;
        if (lf < 0 || lf > 17) return null;
        const t = Math.min(1, lf / 13);
        const hx = TX + TS * 0.2, hy = TY[TARGET[j]] + TS * 0.2;
        return (
          <Envelope key={"ev" + j} x={214 + (hx - 214) * t}
            y={378 + (hy - 378) * t - Math.sin(t * Math.PI) * 92}
            w={94} z={70} rot={-14 + t * 32} o={lf > 13 ? 1 - (lf - 13) / 4 : 1} />
        );
      })}

      {/* ⛔ THE STOOL IS EMPTY AND TURNED AWAY. That is the whole line. */}
      <Stool x={330} y={GY - 148} s={1.05} z={46} rot={-9} />

      {/* he watches and never touches it — a LOOK loop tracking each envelope */}
      <Contact x={470} y={GY - 12} w={190} o={0.36} />
      {/* ⭐ A DOUBLE-TAKE, THEN DELIGHT. He tracks the first envelope across,
          startles when the second counter ticks without him, and is cheering by
          the end — "sort THEMSELVES" landing on his face as well as on the
          bank. */}
      <Hero f={f} x={518} y={GY + 8} size={228} z={56} act={3} ph={0.2}
        costume={{ suit: 1 }} gaze={Math.sin(f / 6) * 1.4}
        shock={f >= 16 && f < 26 ? 1 - (f - 16) / 10 : 0}
        cheer={E(f, 28, 38, 0, 1, BACK)} />

      <Edge side="l" c={p.grit} w={92} z={94} kind="wall" />
    </Scene>
  );
};

/* =========================================================================
   S3 · THE LEADS GET ANSWERED — 8.33 to 9.47s (34f)
   VO: "your leads get followed up on while you sleep,"

   ⛔⛔ REBUILT ON DIRECT FEEDBACK: *"the animation at 8 seconds, show the 'leads
   followed up on' better, with like Claude sprites, different outfits etc."*
   v1 drew paper tickets travelling a rail with a `SENT` stamp on them — a lead
   as a docket. That is a CONTAINER (§3): it carries one bit, "a thing was
   processed", and it looks nothing like the noun in the line.

   ⭐ A LEAD IS A PERSON, SO A LEAD IS A CLAUDE. Four of them, in four different
   costumes, because different outfits is the fastest way to say *different
   people* with no text — the cast reads as four separate customers rather than
   one animation played four times. Each one gets a reply delivered while the
   hero sleeps, and each one REACTS to it.

   ⭐ CUT TO THE WORDS. "leads" f7 · "followed" f14 · "up" f21 · "on" f26 — so
   the four replies land on f8, f14, f20, f26 and the last one lands on the last
   word of the clause.
   ⛔ AND HE NEVER WAKES. The hero is asleep for all 34 frames: the whole line is
   that this happens without him, so his stillness is the content and everything
   else in the frame has to carry the motion.
   ====================================================================== */
export const S3: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("night");
  const AT = [8, 14, 20, 26];
  const LX = [388, 552, 716, 880];
  /* ⛔ four DIFFERENT costumes — `costumeFor` cycles all twelve, and these four
     indices give suit / girl / cop / fro, which read apart at thumbnail size. */
  const WHO = [6, 4, 8, 5];

  return (
    <Scene p={p} slug="" push={[0, dur, 1.09]} vig={0.42} glow={hexa(p.key, 0.16)}>
      <Room p={p} f={f} dx={PAR_X[v]} bands={3} kind="column" overhead="joist"
        rake={0.11} rakeX={RAKE_X[v]} rakeRate={6.4 * RAKE_K[v]} rakeN={RAKE_N[v]}
        floorKind="boards" grit={0.7} lamp={{ x: 806, y: 140, r: 250 }} />

      {/* the overhead line the replies run out on — a full-width travelling
          band, and the only thing awake besides the leads */}
      <div style={{ position: "absolute", left: -40, top: 236, width: W + 80, height: 14,
        zIndex: 30, background: `linear-gradient(180deg, ${mxh(BRASS, 0.34)} 0%, ${dkh(BRASS, 0.44)} 100%)` }} />
      {Array.from({ length: 16 }, (_, i) => (
        <div key={"tie" + i} style={{ position: "absolute",
          left: ((i * 72 - f * 5.4) % (W + 140)) - 70, top: 246,
          width: 10, height: 22, zIndex: 29, background: dkh(BRASS, 0.58) }} />
      ))}

      {/* ⭐ THE FOUR LEADS — four people, four outfits, four reactions */}
      {LX.map((x, i) => {
        const lf = f - AT[i];
        const got = lf >= 0;
        return (
          <React.Fragment key={"ld" + i}>
            <Contact x={x - 54} y={GY - 4} w={112} o={0.36} />
            <Crew f={f} x={x} y={GY} i={WHO[i]} size={148} z={54 + i} at={0}
              loop={got ? 2 : 3} cheer={got ? Math.min(1, lf / 5) : 0} />
            {/* the reply that reaches them — it drops off the line, lands
                beside the lead, and they light up */}
            {got && lf < 26 && (() => {
              const t = Math.min(1, lf / 7);
              const by = 250 + (GY - 320 - 250) * t;
              return (
                <div style={{ position: "absolute", left: x - 52, top: by,
                  width: 104, height: 66, zIndex: 70,
                  transform: `scale(${0.6 + t * 0.4})`, transformOrigin: "50% 0%" }}>
                  <div style={{ position: "absolute", inset: 0, borderRadius: 14,
                    background: mxh(JADE, 0.30), border: `4px solid ${dkh(JADE, 0.22)}`,
                    boxShadow: SH }} />
                  {[0, 1].map(k => (
                    <div key={k} style={{ position: "absolute", left: 16, top: 20 + k * 16,
                      width: k ? 44 : 64, height: 7, borderRadius: 4,
                      background: dkh(JADE, 0.42) }} />
                  ))}
                  {/* the tail — it is a MESSAGE, not a card */}
                  <div style={{ position: "absolute", left: 22, bottom: -13, width: 22,
                    height: 16, background: mxh(JADE, 0.30),
                    clipPath: "polygon(0 0, 100% 0, 20% 100%)" }} />
                </div>
              );
            })()}
            {got && <Ring x={x} y={GY - 250} f={f} at={AT[i] + 7} c={mxh(JADE, 0.34)} />}
          </React.Fragment>
        );
      })}

      {/* ⭐ HE IS ASLEEP, AND HE NEVER WAKES. His stillness is the line. */}
      <Contact x={106} y={GY - 4} w={210} o={0.42} />
      <Stool x={120} y={GY - 152} s={1.15} z={44} />
      <div style={{ position: "absolute", inset: 0, zIndex: 56,
        transform: `translateY(-96px) rotate(${13 + Math.sin(f / 26) * 1.1}deg)`,
        transformOrigin: "176px 706px" }}>
        <Hero f={f} x={176} y={GY} size={252} z={56} act={3} ph={2.2}
          costume={{ beard: 1 }} gaze={0} />
      </div>
      {[0, 1, 2].map(i => {
        const t = ((f + i * 11) % 33) / 33;
        return (
          <div key={"z" + i} style={{ position: "absolute", left: 250 + t * 74,
            top: GY - 300 - t * 118, zIndex: 66, opacity: (1 - t) * 0.9,
            ...ui(26 + t * 24, 900), color: mxh(SKY, 0.44),
            transform: `rotate(${t * 16}deg)` }}>Z</div>
        );
      })}

      <Edge side="r" c={p.grit} w={104} z={94} kind="post" />
    </Scene>
  );
};

/* =========================================================================
   S4 · THE OUTFEED — 9.47 to 12.13s (80f)
   VO: "your content gets posted to every social media platform."
   ⛔⛔ THE VO SAYS "EVERY PLATFORM" AND THE FRAME MUST NOT. The three outlets
   drawn are the ones the repo actually covers (`R.outlets`). No mark that is
   not in the repo appears anywhere in this scene.
   EVENT: one post loaded at the head of the line · a press that stamps THREE
   discrete times · each stamp fires a copy down its own chute · each outlet
   flashes, swallows it and its counter ticks. Arrivals at f14/f36/f58 of 80 —
   spread across the FULL duration.
   ====================================================================== */
export const S4: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("feed");
  const HITS = [14, 36, 58];
  const OX = [292, 552, 812];

  return (
    <Scene p={p} slug="" push={[0, dur, 1.10]} vig={0.48} glow={hexa(p.key, 0.22)}>
      <Room p={p} f={f} dx={PAR_X[v]} bands={3} kind="plant" overhead="duct"
        rake={0.15} rakeX={RAKE_X[v]} rakeRate={8.2 * RAKE_K[v]} rakeN={RAKE_N[v]}
        floorKind="slab" grit={0.6} lamp={{ x: 506, y: 118, r: 300 }} />

      {/* ⛔ THE MARK IS THE OUTLET. v1 drew a brown chute with a 40px logo on its
          shoulder, and on a contact sheet three brown boxes is what you saw. The
          logo is the only part a viewer recognises, so it is now 168px and it IS
          the object; the throat, the lit ring and the counter hang off it. */}
      {R.outlets.map((o, i) => {
        const hot = Math.max(0, 1 - Math.abs(f - HITS[i] - 12) / 12);
        const done = f >= HITS[i] + 12;
        return (
          <React.Fragment key={"ot" + i}>
            {/* ⭐⭐⭐ THE LANDING IS A LIGHT-UP, NOT A NUDGE. Alex, round 7:
                *"when each logo gets on top of the other we need to see like
                light up etc, more interesting."* v1 scaled the receiving mark by
                9% and drew a thin ring — a nudge. The arrival of one logo onto
                another is the beat this whole scene exists for, so it gets the
                full reward stack (reel 115 §18: a burst that goes nowhere is a
                firework, a burst that DELIVERS is a reward):
                  · a contained radial BLOOM behind the tile
                  · a 26% scale punch that overshoots and rings out
                  · an expanding ring AND a second, slower one behind it
                  · eight sparks thrown on ballistic arcs
                  · the counter popping as it ticks
                ⛔ CONTAINED, NEVER A SCREEN FLASH. The bloom is 260px on a
                1012px panel — 6.6% of frame width. `feedback_no_flashing_
                transitions` is standing, and reel 115 shipped a banned
                full-frame flash to pass a gate. */}
            {hot > 0.02 && (
              <div style={{ position: "absolute", left: OX[i] - 55, top: 355,
                width: 260, height: 260, borderRadius: "50%", zIndex: 52,
                opacity: hot * 0.85,
                background: `radial-gradient(50% 50% at 50% 50%, ${hexa("#FFF4D0", 0.95)} 0%, ${hexa("#FFC855", 0.35)} 46%, ${hexa("#FFC855", 0)} 72%)`,
                transform: `scale(${0.55 + hot * 0.7})` }} />
            )}
            <MarkTile x={OX[i]} y={410} s={150} z={56}
              mark={["instagram", "x", "youtube"][i]}
              live={1} f={f} ph={i * 1.4}
              scale={1 + hot * 0.26 + (done ? rock(f, HITS[i] + 12, 0.05, 11) : 0)} />
            {/* the sparks — eight, ballistic, on their own decay */}
            {hot > 0.05 && Array.from({ length: 8 }, (_, k) => {
              const a2 = (k / 8) * Math.PI * 2 + i;
              const r = (1 - hot) * 150;
              return (
                <div key={"sp" + k} style={{ position: "absolute",
                  left: OX[i] + 75 + Math.cos(a2) * r - 9,
                  top: 485 + Math.sin(a2) * r * 0.8 - 9 + (1 - hot) * 44,
                  width: 18, height: 18, borderRadius: 4, zIndex: 60,
                  opacity: hot, background: mxh(SODIUM, 0.34),
                  transform: `rotate(${a2 * 57}deg)` }} />
              );
            })}
            {/* the throat it drops into — near-black, so it reads as a HOLE */}
            <div style={{ position: "absolute", left: OX[i] + 8, top: 576, width: 134,
              height: 40, borderRadius: 4, background: BAKE, zIndex: 50,
              border: `5px solid ${dkh(OXIDE, 0.60)}` }} />
            {hot > 0.02 && [0, 1].map(r => (
              <div key={"rg" + r} style={{ position: "absolute",
                left: OX[i] - 10 - r * 30, top: 400 - r * 30,
                width: 170 + r * 60, height: 170 + r * 60, borderRadius: 24 + r * 10,
                zIndex: 48, opacity: hot * (r ? 0.5 : 1),
                border: `${7 - r * 2}px solid ${mxh(SODIUM, 0.30)}`,
                transform: `scale(${1 + (1 - hot) * (r ? 0.5 : 0.28)})` }} />
            ))}
            <div style={{ position: "absolute", left: OX[i] + 60, top: 630, zIndex: 58,
              ...mono(34 + hot * 16, 700),
              color: done ? mxh(SODIUM, 0.34) : dkh(BRASS, 0.30) }}>
              {done ? 1 : 0}
            </div>
          </React.Fragment>
        );
      })}

      {/* ⭐ THE PRESS — three DISCRETE hits, each with a real stroke, not one
          long tween. §13's limit is respected because the ram has a hoist that
          LEADS it and a shadow that lags: the composite keeps repainting while
          the object itself is smooth. */}
      {(() => {
        const near = HITS.map(h => f - h).filter(d => d > -8 && d < 16);
        const d = near.length ? near[0] : -99;
        const dropK = d > -99 ? (d < 4 ? E(d, -6, 4, 0, 1, IN_Q) : E(d, 4, 13, 1, 0, OUT)) : 0;
        return (
          <>
            <div style={{ position: "absolute", left: 396, top: 96 + dropK * 148, width: 226,
              height: 128, zIndex: 60,
              background: `linear-gradient(172deg, ${mxh(STEEL, 0.20)} 0%, ${dkh(STEEL, 0.46)} 100%)`,
              border: `6px solid ${dkh(STEEL, 0.62)}`, borderRadius: 5, boxShadow: SH_D }}>
              {Array.from({ length: 4 }, (_, i) => (
                <div key={"rb" + i} style={{ position: "absolute", left: 18 + i * 50, top: 14,
                  width: 30, height: 100, background: dkh(STEEL, 0.58), borderRadius: 3 }} />
              ))}
            </div>
            {/* the two guide columns the ram runs in — a ram in the sky with no
                columns is the "press hovering for four beats" defect */}
            {[366, 606].map((x, i) => (
              <div key={"gc" + i} style={{ position: "absolute", left: x, top: 60, width: 26,
                height: 300, zIndex: 44, background: dkh(STEEL, 0.52) }} />
            ))}
          </>
        );
      })()}

      {/* the post card on the bed, and the three copies it fires */}
      <N8nFlow x={352} y={188} w={330} z={50} f={f}
        nodes={["instagram", "x", "youtube"]} run={1} build={1} />
      {HITS.map((h, i) => {
        const lf = f - h;
        if (lf < 4 || lf > 26) return null;
        const t = Math.min(1, (lf - 4) / 16);
        const sx = 470, sy = 258;
        const tx = OX[i] + 24, ty = 470;
        return (
          <MarkTile key={"cp" + i} x={sx + (tx - sx) * t}
            y={sy + (ty - sy) * t - Math.sin(t * Math.PI) * 118} s={104}
            z={64} mark={["instagram", "x", "youtube"][i]}
            rot={-18 + t * 40} o={t > 0.86 ? (1 - t) / 0.14 : 1} />
        );
      })}
      {HITS.map((h, i) => (
        <React.Fragment key={"fx" + i}>
          <Ring x={OX[i] + 75} y={488} f={f} at={h + 20} c={mxh(SODIUM, 0.28)} />
          <Puff x={OX[i] + 75} y={492} f={f} at={h + 20} c={p.grit} n={8} />
        </React.Fragment>
      ))}

      {/* the hero LOADS the first one and steps back off the press */}
      <Contact x={54} y={GY - 10} w={200} o={0.38} />
      <Hero f={f} x={108} y={GY + 22} size={244} z={58} act={1} ph={0.9}
        costume={{ chef: 1 }}
        drive={-E(f, 0, 10, 0, 0.40, OUT) + E(f, 10, 22, 0, 0.40, IO)}
        shock={f >= HITS[0] && f < HITS[0] + 12 ? 1 - (f - HITS[0]) / 12 : 0} />

      <CountPlate x={62} y={BAND_Y} big="1 IN" sub="3 PLACES OUT" z={96} s={0.86} c={PAPER} />
      <Edge side="l" c={p.grit} w={108} z={94} kind="rail" />
    </Scene>
  );
};

/* =========================================================================
   S5 · THE RANK, CLOSE — 12.13 to 13.80s (50f)
   VO: "Gmail, Slack, WhatsApp, YouTube, Stripe,"
   ⭐ CUT TO THE WORDS. Measured onsets, minus the scene start (12.13s):
     Gmail 12.25 -> f4 · Slack 12.69 -> f17 · WhatsApp 12.97 -> f25 ·
     YouTube 13.34 -> f36 · (Stripe 13.74 -> f48)
   ⛔⛔ ON "STRIPE" NO FIFTH MARK IS SHOWN — there are zero Stripe templates in
   the repo. The rank RECEDES instead, which reads as "and there are far more of
   these" and hands straight into the next line. It asserts nothing false.
   ====================================================================== */
export const S5: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("rank");
  const AT = [4, 17, 25, 36];
  const RECEDE = 48;
  /* ⛔ safe against the scene's own push: 506 +/- 486/1.06 = 47.5..964.5 */
  const CX = [58, 288, 518, 748];
  /* ⛔ the recede has its OWN clock and an END, so nothing freezes at 1 */
  /* ⛔ the recede landed with frames to spare; it now runs to the boundary so
     the rank is still travelling when the scene changes */
  const back = E(f, RECEDE, dur + 4, 0, 1, LIN);

  return (
    <Scene p={p} slug="" push={[0, dur, 1.06]} vig={0.58} glow={hexa(p.key, 0.20)}>
      <Room p={p} f={f} dx={PAR_X[v]} bands={2} kind="rack" overhead="lampbar"
        rake={0.16} rakeX={RAKE_X[v]} rakeRate={9.8 * RAKE_K[v]} rakeN={RAKE_N[v]}
        floorKind="tile" grit={0.4} lamp={{ x: 506, y: 126, r: 320 }} />

      {/* ⛔ THE SCENE HAD NOTHING RUNNING BETWEEN ITS FOUR WORD-TIMED BEATS, so
          the gaps between "Gmail", "Slack", "WhatsApp" and "YouTube" were dead.
          ⭐ A continuous stream of marks crosses behind the rank the whole shot —
          the same device as the hook, which is also what ties the two together:
          these four are pulled OUT of a flow that never stops. */}
      <RelayBank f={f} x={78} y={150} n={9} z={22} s={0.72} rate={5.5} />
      {Array.from({ length: 7 }, (_, k) => {
        const t = ((f + k * 13) % 62) / 62;
        return (
          <MarkTile key={"bg" + k} x={1080 - t * 1280} y={172 + ((k % 3) - 1) * 74}
            s={96} z={26} mark={R.roster[(k + 9 + MSET[v]) % R.roster.length].id} o={0.55} />
        );
      })}

      {/* the field behind, receding — it is what the cards come OUT of, and
          what they go back INTO */}
      <Cam z={20} s={1 - back * 0.30} y={back * 42}>
        <JackField f={f} y={286} ranks={3} cols={11} on={1} s={0.92} z={20} />
      </Cam>

      {/* ⭐ FOUR MARKS EJECT, ONE PER SPOKEN WORD, and they are TILES now — the
          logo at 196px rather than a card with the logo on it. Alex, round 1:
          *"really focus on the logos."* The real per-directory count sits under
          each one, which is the receipt the scene owes.
          ⛔ THEY EJECT, THEY DO NOT INFLATE: 196px of travel in 7 frames with a
          squash, a recoil and a ring. §1 measured a smooth scale sweep at 2.78,
          WORSE than what it replaced. */}
      {R.marks.map((m, i) => {
        const lf = f - AT[i];
        if (lf < 0) return null;
        const out = E(lf, 0, 7, 0, 1, OUT);
        const land = squash(lf, 7, 0.17, 3, 12);
        const rk = lf > 7 ? rock(f, AT[i] + 7, 3.4, 12) : 0;
        return (
          <React.Fragment key={"mk" + i}>
            <MarkTile x={CX[i]} y={296 - (1 - out) * 196 + back * 150} s={186}
              z={64 + i} mark={m.id} o={1 - back * 0.55}
              live={out >= 1 ? 1 : 0} f={f} ph={i * 1.05}
              scale={(0.66 + out * 0.34) * land * (1 - back * 0.34)}
              rot={(i % 2 ? 1 : -1) * (12 * (1 - out) + rk)} />
            <div style={{ position: "absolute", left: CX[i], top: 496 + back * 150,
              width: 186, textAlign: "center", zIndex: 70,
              opacity: out * (1 - back), ...mono(34, 700),
              color: mxh(BRASS, 0.46) }}>{m.n}</div>
            <Ring x={CX[i] + 93} y={392} f={f} at={AT[i] + 7} c={mxh(BRASS, 0.34)} />
            <Puff x={CX[i] + 93} y={400} f={f} at={AT[i] + 7} c={p.grit} n={6} />
          </React.Fragment>
        );
      })}

      {/* the hero steadies them as they come past — he is IN the frame doing
          something, not standing beside it */}
      <Contact x={456} y={GY + 8} w={206} o={0.34} />
      <Hero f={f} x={506} y={GY + 62} size={246} z={80} act={1} ph={1.6}
        costume={{ glasses: 1 }}
        shock={AT.some(a => f >= a && f < a + 9) ? 0.7 : 0}
        cheer={f > RECEDE ? E(f, RECEDE, RECEDE + 10, 0, 1, OUT) : 0} />

      <Edge side="r" c={p.grit} w={100} z={94} kind="wall" />
    </Scene>
  );
};

/* =========================================================================
   S6 · THE WHOLE FIELD — 13.80 to 16.10s (69f) · THE SECOND PEAK
   VO: "over 18 categories of automations in total."
   ⭐ §4: a numeral typeset at its value is TEXT. The total CLIMBS to 350 as the
   banks light, and the banks light in RANKS on an ascending run — a repeated
   reward only reads as PROGRESS when it climbs.
   EVENT: before, a dark field and a raised switch · trigger f10, the hero
   HAULS THE SWITCH DOWN · travel f10-52, 19 banks light back to front across
   the full panel · arrival f52, the count plate lands with a hit.
   ====================================================================== */
export const S6: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("field");
  const THROW = 10, LIT_A = 14, LIT_B = 52, PLATE = 54;
  const pull = E(f, THROW, THROW + 7, 0, 1, IO);
  /* ⛔ FOUR DISCRETE RANK SNAPS, NOT ONE 38-FRAME RAMP — the same fix the hook
     needed, for the same measured reason. A smooth ease spreads a big luma
     delta across a dozen samples and each one gets almost nothing; four fast
     6-frame steps put the same total into four. The columns still chase
     left-to-right inside each step, so the composite keeps repainting and it
     reads as light arriving rather than as a jump cut (§13). */
  /* ⛔⛔ THE RANKS OVERLAP, THEY ARE NOT STEPPED. v1 fired four 6-frame ramps
     with four-frame GAPS between them, which is what "not smooth" is made of —
     §13's whole point is that OVERLAPPING ACTION beats a stepped move on the
     metric AND by eye, and that a gap between impulses is a jump cut you chose.
     Four 12-frame ramps starting every 7 keeps all four impulses, covers every
     frame from 14 to 47 with something rising, and reads as light spreading
     rather than as four flashes. */
  /* ⛔ THE LAST RANK IS STILL LIGHTING WHEN THE SCENE CUTS. The four ramps used
     to finish at f47 of 69 and the tail measured 0.69 of the body. Spreading
     them so the fourth ends past `dur` keeps the wall filling right through the
     boundary — the count is still climbing on the last frame. */
  const on = E(f, LIT_A, LIT_A + 14, 0, 0.26, IO)
    + E(f, LIT_A + 10, LIT_A + 26, 0, 0.25, IO)
    + E(f, LIT_A + 20, LIT_A + 38, 0, 0.25, IO)
    + E(f, LIT_A + 30, dur + 6, 0, 0.24, LIN);
  /* the running total MOVES to its value and lands exactly with the last rank */
  const total = Math.round(Math.min(1, on) * R.workflowsN);

  return (
    <Scene p={p} slug="" push={[0, dur, 1.05]} vig={0.50} glow={hexa(p.key, 0.24)}>
      <Room p={p} f={f} dx={PAR_X[v]} bands={3} kind="rack" overhead="gantry"
        rake={0.14} rakeX={RAKE_X[v]} rakeRate={6.0 * RAKE_K[v]} rakeN={RAKE_N[v]}
        floorKind="slab" grit={0.5} lamp={{ x: 506, y: 110, r: 340 }} />

      {/* ⛔⛔⛔ THE CATEGORIES ARE ICONS NOW. Alex, round 1: *"same with the
          categories — have like different icons and stuff like that."* v1 lit a
          field of DRAWN cards and printed six category names over it, and the
          names had already collided with the art twice elsewhere in this reel.
          ⭐ A grid of real app marks lighting rank by rank says "nineteen
          categories of automation" with no text at all, and every tile is an app
          the repo genuinely covers. This is also §1's best-paying shape and the
          §3 test passed for free: the picture now shows WHAT the categories ARE,
          not that there are nineteen of something. */}
      <Cam z={20}>
        {/* ⛔ A LIT BOARD THAT STOPS MOVING IS A PHOTOGRAPH. Same defect as the
            hook's: nineteen tiles light and then park for the rest of the shot.
            They run. */}
        <MarkBoard f={f} x={104} y={166} cols={7} rows={3} tile={108} gap={11}
          z={24} count={R.categoriesN} fill={Math.min(1, on * 1.06)} live={1}
          offset={MSET[v]}
          wave={E(f, LIT_A + 30, LIT_A + 44, 0, 1, LIN)} />
      </Cam>
      {/* ⛔ AND NO LABEL ROW AT ALL. Three separate label rows collided with the
          art in this reel before the real answer landed: the depiction is the
          marks lighting and the total climbing, and text was never it. The one
          text chip this shot is allowed is the count plate. */}
      {/* the main switch — a real knife switch with a blade that TRAVELS.
          ⛔ v1 was a 150x176 near-black box beside the hero and read as a slab,
          not a switch. GREY + RECTANGULAR is the combination that reads boring
          (reel 120): it is now brass on a bakelite base, smaller, with visible
          clips and a blade that swings a real 52 degrees. */}
      <div style={{ position: "absolute", left: 268, top: 566, width: 112, height: 128,
        zIndex: 62, background: "#1B1E20", border: `5px solid ${dkh(BRASS, 0.46)}`,
        borderRadius: 5, boxShadow: SH_D }}>
        {[0.14, 0.60].map((t, i) => (
          <div key={"cl" + i} style={{ position: "absolute", left: 16, top: 108 * t + 10,
            width: 76, height: 13, background: mxh(BRASS, 0.30), borderRadius: 3 }} />
        ))}
        <div style={{ position: "absolute", left: 22, top: 22, width: 66, height: 15,
          borderRadius: 5, background: mxh(BRASS, 0.52),
          transform: `rotate(${-52 + pull * 52}deg)`, transformOrigin: "6% 50%" }} />
        <div style={{ position: "absolute", left: 18, top: 18, width: 12, height: 12,
          borderRadius: "50%", background: dkh(BRASS, 0.24) }} />
      </div>

      <Contact x={72} y={GY + 12} w={210} o={0.36} />
      <Hero f={f} x={128} y={GY + 30} size={250} z={66} act={1} ph={0.3}
        costume={{ constr: 1 }} strain={pull * 0.75 * (1 - E(f, THROW + 8, THROW + 20, 0, 1, OUT))}
        cheer={E(f, PLATE, PLATE + 9, 0, 1, BACK)} gaze={-0.8} />

      {/* the crew, looking up at it — five, pitch computed against size */}
      {[560, 668, 776, 884, 962].map((x, i) => (
        <Crew key={"cw" + i} f={f} x={x} y={GY + 22} i={i + 3} size={128} z={54}
          at={18 + i * 5} loop={[3, 0, 2, 3, 1][i]} />
      ))}

      {/* ⭐ ONCE IT IS FULL IT STARTS RUNNING. The board finished filling around
          f60 of 69 and the last eight frames were a still picture. Links now
          fire across it into the cut — the same device as the hook, and the
          honest statement that all nineteen are live. */}
      {on > 0.80 && Array.from({ length: 8 }, (_, k) => {
        const lf = (f + k * 7) % 22;
        if (lf > 10) return null;
        const c0 = (k * 3) % 6, r0 = (k * 2) % 3;
        const ax = 104 + c0 * 119 + 54, ay = 166 + r0 * 119 + 54;
        const bx = ax + 119, by = ay;
        const t = Math.min(1, lf / 6);
        const fade = lf > 7 ? 1 - (lf - 7) / 3 : 1;
        return (
          <React.Fragment key={"fk" + k}>
            <div style={{ position: "absolute", left: ax, top: ay - 5,
              width: (bx - ax) * t, height: 10, borderRadius: 6, zIndex: 60,
              background: "#2FB673", opacity: fade }} />
            <div style={{ position: "absolute", left: ax + (bx - ax) * t - 10,
              top: ay - 10, width: 20, height: 20, borderRadius: "50%", zIndex: 61,
              background: "#7CF3C0", border: "4px solid #2FB673", opacity: fade }} />
          </React.Fragment>
        );
      })}

      <CountPlate x={62} y={BAND_Y} big={`${R.categories} CATEGORIES`}
        sub={`${total} WORKFLOWS`} z={96} s={0.94} c={PAPER}
        pop={f >= PLATE ? 1 + Math.max(0, 0.16 - (f - PLATE) * 0.022) : 1} />
      <Edge side="l" c={p.grit} w={96} z={94} kind="post" />
    </Scene>
  );
};

/* =========================================================================
   S7 · HE CANNOT WIRE IT — 16.10 to 17.63s (46f) · THE TURN
   VO: "And you don't have to build any of them."

   ⛔⛔⛔ REBUILT ON DIRECT FEEDBACK: *"at 16 seconds animation needs to be better
   too here."* And this is §10's exact class — **A HIGH MOTION SCORE IS NOT
   LEGIBILITY.** The old version measured **17.18, the second highest in the
   reel**, and it was the last scene still built the pre-logo way: a bench, a
   web of cable, a guttering lamp, and a hero putting pliers down and walking
   off. Everything moved and nothing HAPPENED — the beat was a man leaving a
   room, which depicts no building, no not-building, and none of them.

   ⭐ CUT TO THE WORDS. Measured onsets, scene-local:
     "don't" f10 · "have to" f12-14 · **"build" f18** · "any" f22 · "them" f33
   So the picture is: he tries to BUILD it by hand and the wire will not take —
   three times, harder each time, on those exact frames — and then on "any of
   them" a FINISHED workflow drops onto his canvas and wires itself in one pass
   while he backs away from it.

   ⭐⭐ THE EMOTIONAL ARC IS THE SCENE. He starts merely working, goes to
   properly angry (`heat` climbing through the failures, steam off the head,
   the brow hard, a real tremble), and lands on hands-up disbelief. `heat` is
   the one lever that drives the flush, the tremble, the brow, the steam and the
   anger ticks together, and this is the scene it exists for.
   ⛔ THE BENCH IS STILL NOT DESTROYED. Nothing is smashed. His hand-built
   attempt is simply made irrelevant, which is why it can still win at S10.
   ====================================================================== */
export const S7: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("bench2");

  /* ⭐ three failed hand-drags, ON the spoken words. Each one: he hauls the
     connector out toward the empty node, it stretches, and it SNAPS BACK. */
  const TRY = [2, 10, 18];
  const tryK = (a2: number) =>
    f < a2 ? 0 : f < a2 + 5 ? E(f, a2, a2 + 5, 0, 1, IO)
    : f < a2 + 7 ? 1 : Math.max(0, E(f, a2 + 7, a2 + 11, 1, 0, IN_Q));
  const pull = Math.max(...TRY.map(tryK));
  /* the snap-back recoil — its own decaying clock, so it leaves */
  const snap = TRY.reduce((m, a2) =>
    Math.max(m, f >= a2 + 7 && f < a2 + 16
      ? Math.sin((f - a2 - 7) / 1.9) * Math.exp(-(f - a2 - 7) / 5) : 0), 0);

  const DROP = 22, WIRE = 27;
  /* the finished workflow arrives and completes itself */
  const drop = E(f, DROP, DROP + 8, 0, 1, BACK);
  const build = 0.42 + E(f, WIRE, WIRE + 12, 0, 0.58, IO);
  /* ⛔ the execution pulse used to finish four frames before the cut, which is
     four frames of a perfectly still canvas. It now runs past the boundary. */
  const run = E(f, WIRE + 4, dur + 8, 0, 1, LIN);

  /* ⭐ THE EMOTION ARC: working -> boiling -> hands up. `heat` climbs with each
     failure and DROPS TO ZERO the instant the thing solves itself. */
  const heat = f < DROP
    ? Math.min(0.92, 0.22 + TRY.filter(a2 => f >= a2 + 7).length * 0.26 + pull * 0.2)
    : Math.max(0, 0.9 - (f - DROP) * 0.10);
  const shock = f >= DROP && f < DROP + 14 ? 1 - (f - DROP) / 14 : 0;

  /* ⛔ the lamp GUTTERS: a repeating value that returns, never a ramp */
  const gutter = 0.46 + 0.28 * Math.pow(Math.abs(Math.sin(f / 5.3)), 3)
    + 0.12 * Math.sin(f / 2.1);
  const sh = shake(f, DROP, 11, 9);

  const FX = 262, FY = 250, FW = 620;

  return (
    <Scene p={p} slug="" push={[0, dur, 1.07]} vig={0.52} glow={hexa(p.key, 0.16)}>
      <Room p={p} f={f} dx={PAR_X[v]} bands={3} kind="rack" overhead="lampbar"
        rake={0.13} rakeX={RAKE_X[v]} rakeRate={7.4 * RAKE_K[v]} rakeN={RAKE_N[v]}
        floorKind="tile" grit={0.6} lamp={{ x: 330, y: 150, r: 280 * gutter }} />

      {/* his own half-built canvas — the trigger and two nodes wired, and a
          third node sitting there UNCONNECTED. That empty gap is the scene. */}
      <div style={{ position: "absolute", inset: 0, zIndex: 60,
        transform: `translate(${sh.x}px, ${sh.y}px)` }}>
        <N8nFlow x={FX} y={FY} w={FW} z={60} f={f} build={build} run={run}
          nodes={["gmail", "googlegemini", "googlesheets", "slack"]} />
      </div>

      {/* ⭐ THE CONNECTOR HE CANNOT LAND. It leaves the second node's port,
          stretches toward the empty one, and springs back every time — drawn
          from the SAME geometry the canvas uses so it cannot drift off it. */}
      {f < DROP && (() => {
        const nodeW = FW * 0.170;
        const gapX = (FW - nodeW * 5 - FW * 0.10) / 4;
        const ax = FX + FW * 0.05 + 2 * (nodeW + gapX) + nodeW + sh.x;
        const ay = FY + FW * 0.50 * 0.36 + nodeW / 2 + sh.y;
        const reach = gapX * (0.30 + pull * 0.62) + snap * 16;
        return (
          <>
            <div style={{ position: "absolute", left: ax, top: ay - 7, width: reach,
              height: 14, borderRadius: 8, zIndex: 66,
              background: pull > 0.8 ? "#E4574F" : "#B9B9C0",
              transform: `rotate(${snap * 5}deg)`, transformOrigin: "0 50%" }} />
            <div style={{ position: "absolute", left: ax + reach - 11, top: ay - 11,
              width: 22, height: 22, borderRadius: "50%", zIndex: 67,
              background: pull > 0.8 ? "#E4574F" : "#9A9AA2" }} />
          </>
        );
      })()}

      {/* ⭐ THE FINISHED ONE ARRIVES and lands ON his canvas */}
      {f >= DROP && (
        <>
          {/* ⛔ IT LANDS AND HANDS OFF. v1 left it hovering at the top-right for
              the rest of the scene, so the object that was supposed to CAUSE the
              wiring just sat there while the wiring happened beside it. It now
              drops onto the canvas, rings, and fades as the flow completes —
              the badge is the trigger, not a sticker. */}
          <div style={{ position: "absolute", left: FX + FW * 0.40,
            top: FY - 210 + drop * 268, zIndex: 74,
            opacity: Math.min(1, drop * 2) * (1 - E(f, WIRE + 6, WIRE + 16, 0, 1, IO)),
            transform: `scale(${(0.7 + drop * 0.3) * (1 - E(f, WIRE + 6, WIRE + 16, 0, 0.4, IO))}) rotate(${(1 - drop) * -14}deg)`,
            transformOrigin: "50% 100%" }}>
            <div style={{ width: 132, height: 132, borderRadius: 26, background: "#FFFFFF",
              border: "5px solid #E4DCC8", boxShadow: SH_D, display: "flex",
              alignItems: "center", justifyContent: "center" }}>
              <Img src={staticFile("logos/n8n.svg")}
                style={{ width: 78, height: 78, objectFit: "contain" }} />
            </div>
          </div>
          <Ring x={FX + FW * 0.40 + 66} y={FY + 96} f={f} at={DROP + 8} c="#7CF3C0" />
          <Puff x={FX + FW * 0.40 + 66} y={FY + 106} f={f} at={DROP + 8} c={p.grit} n={9} />
        </>
      )}

      {/* ⭐ HIM. Working, then boiling, then hands up and backing off. */}
      <Contact x={96} y={GY - 10} w={220} o={0.40} />
      <Hero f={f} x={152} y={GY + 12} size={272} z={80} act={1} ph={0.9}
        costume={{ constr: 1 }} heat={heat} stern={f < DROP ? 0.8 : 0}
        strain={f < DROP ? pull * 0.7 : 0}
        drive={f < DROP ? pull * 0.34 : -E(f, DROP, DROP + 12, 0, 0.30, OUT)}
        reach={120} shock={shock}
        cheer={E(f, DROP + 12, DROP + 22, 0, 1, BACK)} gaze={0.8} />
      {/* ⛔ NO FOREARM HERE. One was drawn from his shoulder to the connector
          and it spanned 380px across the whole canvas — a plank, not an arm.
          `Mascot` draws its own arms, and a hand-drawn limb only survives when
          it is SHORT and clearly terminates on something (reel 110's rule). The
          effort is carried by the BODY instead: a 0.34 lean, a real strain
          deformation and the heat tremble, which is where it belongs. */}

      {/* ⭐ AND IT IMMEDIATELY PRODUCES. The wiring finished seven frames before
          the cut and the canvas sat there; finished jobs now fly out of it into
          the boundary, which is also the better hand-off into S8. */}
      {f >= WIRE + 8 && [0, 1, 2].map(i => {
        const at = WIRE + 8 + i * 6;
        const lf = f - at;
        if (lf < 0) return null;
        const t = Math.min(1, lf / 14);
        return (
          <div key={"bo" + i} style={{ position: "absolute",
            left: FX + FW * 0.72 + t * 210, top: FY + 140 - Math.sin(t * Math.PI) * 130 + t * 90,
            width: 84, height: 60, zIndex: 84, opacity: 1 - Math.max(0, t - 0.72) * 3.6,
            background: PAPER, border: `4px solid ${dkh(PAPER, 0.30)}`, borderRadius: 4,
            transform: `rotate(${-18 + t * 46}deg)`, boxShadow: SH }}>
            <div style={{ position: "absolute", left: 9, top: 11, width: 48, height: 6,
              background: dkh(PAPER, 0.46) }} />
            <div style={{ position: "absolute", right: 8, bottom: 8, width: 17, height: 17,
              borderRadius: "50%", background: JADE }} />
          </div>
        );
      })}

      <Edge side="l" c={p.grit} w={110} z={94} kind="post" />
    </Scene>
  );
};

/* =========================================================================
   S8 · THE WORKFLOW — 17.63 to 18.97s (40f) · THE HERO ARTIFACT
   VO: "Just grab one file, click import,"

   ⛔⛔⛔ REBUILT ON DIRECT FEEDBACK. Alex, round 1: *"same with the n8n workflow
   part at like eighteen seconds — really focus on showing a graphic of an
   actual n8n workflow."*

   The previous version drew an invented "patch card": a cream slab with a
   five-node chain printed on it. It was a metaphor FOR a workflow. This is the
   thing itself — n8n's own canvas, its dot grid, its rounded-left trigger node,
   real app icons in the action nodes, its port dots and its trailing `+`. A
   viewer who has ever opened n8n recognises it instantly, and one who has not
   still reads "this is a piece of software, and it is already finished".
   ⛔ EVERY ICON IN IT IS AN APP THE REPO REALLY AUTOMATES (`R.roster`), so the
   graphic is not a fabricated screenshot.

   ⭐⭐ THE REVEAL IS THE ROTATION, NOT THE TRAVEL. It comes forward at -19deg and
   turns INTO readability, so the canvas resolves at the same instant it
   arrives. Carrying it in already legible would spend the one moment it gets.
   ⛔ PROPORTION: 700px = 69% of panel width with air on both sides. Past ~85%
   no silhouette can form.
   ====================================================================== */
export const S8: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("card");
  const PULL = 2, IN = 26;
  const out = E(f, PULL, PULL + 16, 0, 1, OUT);
  const rot = -19 + out * 19;
  const push = E(f, IN, IN + 12, 0, 1, IO);
  const cx = 262 + LAY[v].card * 0.20 + out * 14 - push * 26;
  const cy = 232 - out * 20 + push * 108;
  const latch = E(f, IN + 8, IN + 14, 0, 1, BACK);

  /* ⭐⭐ THE CURSOR CLICKS ON THE WORD. Measured onsets, scene-local:
     "click" f29 · "import" f33. So it travels f18-29, presses on f29, and the
     button is DOWN through "import". ⛔ It is 76px: §1 measured a 30x38 cursor
     travelling at ~0 motion, and a real-sized pointer is invisible on a phone. */
  const CLICK = 29;
  const cur = E(f, 18, CLICK, 0, 1, IO);
  const press = f >= CLICK && f < CLICK + 9 ? 1 - (f - CLICK) / 9 : 0;
  const BTN = { x: 636, y: 636 };
  const curX = 946 + (BTN.x - 946) * cur;
  const curY = 388 + (BTN.y - 388) * cur;

  return (
    <Scene p={p} slug="" push={[0, dur, 1.10]} vig={0.56} glow={hexa(p.key, 0.22)}>
      <Room p={p} f={f} dx={PAR_X[v]} bands={2} kind="rack" overhead="none"
        rake={0.11} rakeX={RAKE_X[v]} rakeRate={5.6 * RAKE_K[v]} rakeN={RAKE_N[v]}
        floorKind="tile" grit={0.4} lamp={{ x: 640, y: 130, r: 300 }} />

      {/* the wall it came out of, with the HOLE where it was */}
      <Cam z={18}>
        <JackField f={f} y={190} ranks={2} cols={7} on={1} s={0.78} z={18}
          hole={[0, 1]} dim={0.3} />
      </Cam>

      <SlotRack x={596} y={452} w={380} z={40} latch={latch} live={0} f={f} label={false} />

      {/* ⭐ THE ACTUAL n8n WORKFLOW — a trigger and four real apps, wired */}
      {/* ⛔ THREE NODES, NOT FOUR. Dropping one buys every remaining icon ~25%
          more width on the same canvas, and a mark that is recognised is worth
          more than a mark that is present. */}
      <N8nFlow x={cx} y={cy} w={700} z={74} rot={rot} s={1 - push * 0.28}
        nodes={FLOW[v]} run={0} build={1} f={f} />

      {/* his forearm STARTS on the mascot's own arm and ENDS on the file */}
      {/* ⛔ HE STANDS BESIDE IT, NOT UNDER IT. The first pass put a 250px hero
          at x=164 with a 700px canvas starting at x=172, so the subject of the
          shot sat on top of him and he read as a cropped blob with glasses. */}
      <Forearm x0={158} y0={GY - 150} x1={cx + 30} y1={cy + 250} w={26} z={78} />
      <Contact x={54} y={GY - 6} w={210} o={0.36} />
      <Hero f={f} x={110} y={GY + 34} size={264} z={72} act={1} ph={0.7}
        costume={{ glasses: 1 }} strain={out * 0.4} drive={push * 0.4} />

      {/* ⭐ THE BUTTON HE IS CLICKING — a real IMPORT control that DEPRESSES
          under the cursor, so the click lands on an object rather than in the
          air. n8n's own wording, and the literal step the VO names. */}
      <div style={{ position: "absolute", left: BTN.x - 96, top: BTN.y - 34,
        width: 216, height: 74, zIndex: 88,
        transform: `translateY(${press * 6}px) scale(${1 - press * 0.03})`,
        transformOrigin: "50% 50%" }}>
        <div style={{ position: "absolute", inset: 0, borderRadius: 12,
          background: press > 0.1 ? dkh(JADE, 0.10) : "#2FB673",
          border: `5px solid ${dkh(JADE, 0.38)}`,
          boxShadow: press > 0.1 ? "none" : SH_D,
          display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ ...ui(30, 900), color: "#FFFFFF",
            letterSpacing: "0.14em" }}>IMPORT</span>
        </div>
      </div>
      <Cursor x={curX} y={curY} s={78} z={97} click={press} />

      {f >= IN + 10 && <Ring x={cx + 300} y={cy + 150} f={f} at={IN + 10} c={mxh(BRASS, 0.3)} />}
      <Edge side="l" c={p.grit} w={92} z={94} kind="wall" />
    </Scene>
  );
};

/* =========================================================================
   S9 · IT RUNS — 18.97 to 20.23s (38f) · **THE PEAK**
   VO: "and it runs immediately."

   ⭐ THE SAME OBJECT, EXECUTING. The workflow from S8 is still on screen and a
   pulse now walks it: each connector goes green as the pulse crosses it and
   each node's border and accent flip as it arrives — which is what n8n's own
   execution view does. Reusing the object rather than cutting to a new one is
   what makes the sentence readable: *the file went in and it started running.*

   ⛔ NOT A LIGHT SHOW (§10). Every element is the input, the mechanism or the
   output: the flow executes, the relays fire, finished work pours out of the
   mouth and stacks, and the hero recoils and cheers. And no screen flash —
   `feedback_no_flashing_transitions` is standing, and reel 115 shipped a banned
   flash to pass a gate; the honest replacement measured better.
   ====================================================================== */
export const S9: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("live");
  const GO = 3;
  /* the execution pulse walks the graph across most of the shot */
  const run = E(f, GO, GO + 22, 0, 1, IO);
  const drive = E(f, GO + 2, GO + 10, 0, 1, OUT);
  /* ⭐ THE OUTPUT — eight finished runs pouring out, spread across the FULL
     duration so the tail never goes still (§19). */
  const OUT_AT = [10, 13, 16, 19, 22, 25, 28, 31];

  return (
    <Scene p={p} slug="" push={[0, dur, 1.075]} vig={0.40} glow={hexa(p.key, 0.26)}>
      <Room p={p} f={f} dx={PAR_X[v]} bands={3} kind="rack" overhead="gantry"
        rake={0.16} rakeX={RAKE_X[v]} rakeRate={9.0 * RAKE_K[v]} rakeN={RAKE_N[v]}
        floorKind="slab" grit={0.5} lamp={{ x: 400, y: 118, r: 300 }} />

      {/* ⛔ the relay bank goes OVER the rack — when a prop joins two props its
          z has to beat BOTH of them */}
      <RelayBank f={f} x={640} y={148} n={6} z={64} s={1.0} rate={5} drive={drive} />

      {/* the workflow, seated and EXECUTING */}
      <N8nFlow x={54} y={286} w={620} z={70} f={f} run={run} build={1}
        nodes={FLOW[v]} />

      {/* the output mouth and what comes out of it */}
      <div style={{ position: "absolute", left: 690, top: 430, width: 250, height: 92,
        zIndex: 44, background: BAKE, border: `6px solid ${dkh(STEEL, 0.54)}`,
        borderRadius: 4 }} />
      {OUT_AT.map((at, i) => {
        const lf = f - at;
        if (lf < 0) return null;
        const t = Math.min(1, lf / 13);
        const tx = 706 + (i % 4) * 54;
        return (
          <div key={"op" + i} style={{ position: "absolute",
            left: 746 + (tx - 746) * t, top: 452 + t * (176 - i * 4) - Math.sin(t * Math.PI) * 70,
            width: 76, height: 54, zIndex: 58 + i,
            background: PAPER, border: `3px solid ${dkh(PAPER, 0.30)}`,
            borderRadius: 3, transform: `rotate(${-20 + t * 26 + i * 3}deg)`,
            boxShadow: SH }}>
            <div style={{ position: "absolute", left: 8, top: 10, width: 44, height: 5,
              background: dkh(PAPER, 0.48) }} />
            <div style={{ position: "absolute", left: 8, top: 24, width: 30, height: 4,
              background: dkh(PAPER, 0.34) }} />
            <div style={{ position: "absolute", right: 7, bottom: 7, width: 16, height: 16,
              borderRadius: "50%", background: JADE }} />
          </div>
        );
      })}
      {OUT_AT.filter((_, i) => i % 2 === 0).map((at, i) => (
        <Ring key={"or" + i} x={780 + i * 56} y={640} f={f} at={at + 11} c={mxh(JADE, 0.3)} />
      ))}

      <Contact x={372} y={GY - 6} w={220} o={0.36} />
      <Hero f={f} x={424} y={GY + 40} size={268} z={80} act={2} ph={1.9}
        costume={{ glasses: 1 }}
        shock={f >= GO && f < GO + 12 ? 1 - (f - GO) / 12 : 0}
        cheer={E(f, GO + 10, GO + 18, 0, 1, BACK)} />

      <Edge side="r" c={p.grit} w={100} z={94} kind="rail" />
    </Scene>
  );
};

/* =========================================================================
   S10 · STILL WIRING IT BY HAND — 20.23 to 23.00s (83f) · THE VILLAIN WINS
   VO: "Everyone else is still spending hours doing all of this by hand every
        day."

   ⛔⛔ REBUILT ON DIRECT FEEDBACK: *"at 21 seconds that animation needs to be
   better, more interesting too."* v1 was benches and cable belting past with
   operators hauling — abstract, and left over from before the reel spoke in
   marks and canvases. It measured 9.99 with **HOLD 89%**, the worst in the reel:
   a belt that never stops keeps the floor high and hides that nothing else was
   happening.

   ⭐ IT IS NOW S7's FAILURE, REPEATED DOWN A HALL. Every station is a half-built
   n8n canvas with ONE red connector dangling off it, and every operator is
   hauling at that connector and not landing it — the same defeat the hero had
   at 16s, happening to five people at once, forever. That is the line drawn
   exactly: not "people are busy", but *people are still doing the step you no
   longer have to do.*
   ⛔ THE HERO IS NOT HERE. He is the one who left, and THE BENCH is undefeated.
   ⛔ AND THE TAIL MUST NOT GO STILL (§19) — the rank travels the full duration,
   so the dominant mass is moving on every frame, not only the first thirty.
   ====================================================================== */
export const S10: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("hall");
  const near = -(f * 7.6) % 372;
  const far = -(f * 4.2) % 268;
  const hour = E(f, 4, dur - 6, 0, 1, LIN);

  /* each operator hauls on his own clock and NONE of them lands it */
  const haul = (i: number) => {
    const t = (f + i * 13) % 42;
    return t < 10 ? E(t, 0, 10, 0, 1, IO) : t < 14 ? 1 : E(t, 14, 25, 1, 0, OUT);
  };

  return (
    <Scene p={p} slug="" push={[0, dur, 1.09]} vig={0.46} glow={hexa(p.key, 0.20)}>
      <Room p={p} f={f} dx={PAR_X[v]} bands={3} kind="column" overhead="joist"
        rake={0.13} rakeX={RAKE_X[v]} rakeRate={7.2 * RAKE_K[v]} rakeN={RAKE_N[v]}
        floorKind="boards" grit={0.8} lamp={{ x: 506, y: 118, r: 250 }} />

      {/* the far rank — smaller, darker, slower. The value ramp is what makes
          depth readable in greyscale; size alone is a texture. */}
      {Array.from({ length: 5 }, (_, i) => (
        <div key={"fr" + i} style={{ position: "absolute", left: far + i * 268 - 60, top: 0,
          width: 268, height: H, zIndex: 26, opacity: 0.58 }}>
          <N8nFlow x={22} y={352} w={210} z={26} f={f} build={0.44} run={0} o={0.9}
            nodes={FLOW[v]} />
          <Crew f={f} x={126} y={512} i={i + 5} size={104} z={28} at={0} loop={1} />
        </div>
      ))}

      {/* ⭐ the near rank — three stations, each a half-built canvas with a RED
          connector its operator cannot land */}
      {Array.from({ length: 3 }, (_, i) => {
        const hk = haul(i);
        return (
          <div key={"nr" + i} style={{ position: "absolute", left: near + i * 372 - 120, top: 0,
            width: 372, height: H, zIndex: 46 }}>
            {/* the bench top the canvas sits on */}
            <div style={{ position: "absolute", left: 8, top: 556, width: 320, height: 26,
              background: `linear-gradient(178deg, ${mxh(OXIDE, 0.24)} 0%, ${dkh(OXIDE, 0.32)} 100%)`,
              border: `3px solid ${dkh(OXIDE, 0.58)}`, borderRadius: 3, zIndex: 44 }} />
            {[26, 268].map((lx, k) => (
              <div key={"lg" + k} style={{ position: "absolute", left: lx, top: 582,
                width: 26, height: 96, background: dkh(OXIDE, 0.60), zIndex: 43 }} />
            ))}
            <N8nFlow x={18} y={318} w={300} z={48} f={f} build={0.46} run={0}
              nodes={FLOW[v]} />
            {/* ⛔ THE RED ONE. It stretches as he hauls and springs back, every
                time — the same shape as S7, and it never lands. */}
            {(() => {
              const nodeW = 300 * 0.170, gap = (300 - nodeW * 4 - 30) / 3;
              const ax = 18 + 300 * 0.05 + 2 * (nodeW + gap) + nodeW;
              const ay = 318 + 300 * 0.50 * 0.36 + nodeW / 2;
              const reach = gap * (0.3 + hk * 0.66);
              return (
                <>
                  <div style={{ position: "absolute", left: ax, top: ay - 5, width: reach,
                    height: 10, borderRadius: 6, background: "#E4574F", zIndex: 54 }} />
                  <div style={{ position: "absolute", left: ax + reach - 8, top: ay - 8,
                    width: 16, height: 16, borderRadius: "50%", background: "#E4574F",
                    zIndex: 55 }} />
                </>
              );
            })()}
            <Contact x={172} y={GY - 4} w={168} o={0.40} />
            <Hero f={f} x={216} y={GY} size={162} z={50} act={1} ph={i * 2.1}
              costume={costumeFor(i + 2)} stern={0.8}
              heat={0.34 + 0.30 * Math.abs(Math.sin(f / 33 + i * 2.1))}
              drive={hk * 0.5} reach={96} strain={hk * 0.5} />
          </div>
        );
      })}

      {/* the hour dial — the "every day" of the line, and a number that MOVES */}
      <Dial x={862} y={216} r={98} v={hour} read="HRS" c={dkh(BRASS, 0.18)} z={38} />

      <CountPlate x={62} y={BAND_Y} big="BY HAND" sub="EVERY DAY" z={96} s={0.86}
        c={dkh(CREAMB, 0.10)} />
      <Edge side="r" c={p.grit} w={128} z={94} kind="post" />
    </Scene>
  );
};

/* =========================================================================
   S11 · THE GATE — 23.00 to 24.37s (41f) · CTA
   VO: "Comment AUTO for the repo."
   ⛔ HARD CUT ON THE KEYWORD. The tag is an OBJECT hanging on the board — it
   drops on a chain, takes a hit and rings out on a damped swing. A caption laid
   over the picture is not a payoff.
   ====================================================================== */
export const S11: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("gate");
  const TAG = 5;
  return (
    <Scene p={p} slug="" push={[0, dur, 1.06]} vig={0.34} glow={hexa(p.key, 0.24)}>
      <Room p={p} f={f} dx={PAR_X[v]} bands={3} kind="rack" overhead="lampbar"
        rake={0.14} rakeX={RAKE_X[v]} rakeRate={6.6 * RAKE_K[v]} rakeN={RAKE_N[v]}
        floorKind="slab" grit={0.5} lamp={{ x: 506, y: 120, r: 320 }} />

      <Cam z={20}>
        <JackField f={f} y={318} ranks={2} cols={9} on={1} s={0.86} z={20} />
      </Cam>

      <KeyTag x={330 + LAY[v].tag * 0.2} y={276} t={R.keyword} f={f} at={TAG} w={356} z={84} />
      {f >= TAG + 8 && <Ring x={508 + LAY[v].tag * 0.2} y={352} f={f} at={TAG + 8} c={mxh(GOLD, 0.3)} />}

      {/* the cast — nine, pitch computed against size, all twelve costumes
          cycled across the reel */}
      {[64, 196, 328, 460, 592, 724, 856, 962].map((x, i) => (
        <Crew key={"gc" + i} f={f} x={x} y={GY + 26} i={i + 4} size={140} z={54}
          at={4 + i * 3} loop={[2, 0, 2, 3, 2, 1, 2, 0][i]} cheer={f > TAG + 8 ? 1 : 0} />
      ))}

      {/* ⛔ THE REEL MUST NOT DIE ON ITS LAST FRAME EITHER. The tag settles and
          the cast cheers, and both of those finish — so marks keep streaming
          across behind the gate right through the final frame. */}
      {Array.from({ length: 6 }, (_, k) => {
        const t = ((f + k * 9) % 44) / 44;
        return (
          <MarkTile key={"gs" + k} x={1080 - t * 1300} y={196 + ((k % 3) - 1) * 88}
            s={104} z={26} mark={R.roster[(k + 3 + MSET[v]) % R.roster.length].id} o={0.5}
            live={1} f={f} ph={k * 1.3} />
        );
      })}

      <MarkPlate x={62} y={BAND_Y} t={R.repo} s={0.80} z={96} c={CREAMB} />
      <CountPlate x={62} y={BAND_Y + 76} big={R.stars} sub={`${R.workflows} WORKFLOWS`}
        z={96} s={0.84} c={PAPER} />
      <Edge side="l" c={p.grit} w={100} z={94} kind="rail" />
    </Scene>
  );
};
