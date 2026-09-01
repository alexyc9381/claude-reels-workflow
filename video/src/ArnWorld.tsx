import React from "react";
import { Img, staticFile } from "remotion";
import { MONO } from "./SlopKit";
import { inter } from "./fonts";
import {
  W, H, SAFE, E, OUT, IO, BACK, IN_Q, LIN, hexa, mix, dark, SH, SH_D, rnd,
  Beam, Strip, Motes, Chip, Slug, Plate, BigNum, Contact, Edge, Scene, Cam,
  Mark, MarkPlate, MarkCast, CamCtx, PalCtx,
  dkh, mxh, idle, rock, shake, drift, squash,
  Rake, Runner, Ring, Puff, Pool, Steam, Sweat, Fall,
  COSTUMES, costumeFor, Crew, Hero, Forearm, vivid, lerpHex, mono, ui,
  CLAY, CLAYD, GOLD, GREEN, RED, SKY, PAPER, CREAMB, INK, MUTE, TEAL, STEEL,
  BRASS, SODIUM, VIOLET, EMBER, OXIDE, SLATE, PCB, COPPER,
} from "./HwWorld";
import type { Place } from "./HwWorld";

/* ===========================================================================
   REEL 128 · "BOSS" — THE WORLD KIT, v2.  Board: storyboards/128-boss.md.

   ⛔⛔⛔ v1 WAS REJECTED ON THE METAPHOR, NOT ON THE EXECUTION.
   Alex, after every gate was green and the median was 10.44:
     *"the hook concept is too boring. I don't really understand what the big
      box of tools going up and then falling out is. I'm not exactly sure what's
      going on... a lot of these animation concepts just need to be completely
      redone because it's way too boring. I don't like the machinery concepts."*

   ⭐ THE DIAGNOSIS, IN ONE SENTENCE: **v1's hero artifact was a machine I made
   up.** THE OVERLOOK's `Unit` — a brass frame with a hopper, a gear train and a
   spout — stood for "an app". It is a CONTAINER one layer up (§3): a viewer
   cannot name it, so at half a second it reads as exactly what he called it, a
   big box of tools. §15 is the law that was broken: *at half a second a viewer
   RECOGNISES A THING; they do not decode a silhouette.* Craft on the object was
   never going to fix it, and three rounds of making it bigger and better lit
   did not.

   ⭐⭐⭐ AND THE REPLACEMENT IS NOT A NICER METAPHOR, IT IS THE SUBJECT'S OWN
   VOCABULARY. **"The boss loop" is a GAMING term.** A boss is a thing you fight,
   lose to, and run again until you beat it — which is the mechanic, exactly, and
   the reason the technique is called that at all. Reel 125's win was the same
   move: *a patch field IS a node graph*, so the metaphor was the subject drawn
   in brass rather than a costume over it. Here:

     the VO says            the world already calls it
     -------------------    -----------------------------------------
     "a strict AI boss"     THE BOSS. A boss.
     "loop and fix errors"  the RETRY. Die, respawn, run it again.
     "a perfect score"      PERFECT. A game's own word for it.
     "burns through         TOKENS. ⭐ THE SAME WORD. A coin slot eating
      tokens fast"          arcade tokens is not a metaphor, it is a pun
                            that happens to be literally true.
     "worker sub-agents"    THE PARTY.

   ⛔⛔ AND THERE ARE NO INVENTED OBJECTS IN IT. The cast is Claudes, the villain
   is a Claude, and everything else is light, impact and a token stack. That is
   §9's finding applied at world scale: *"prefer sprites over abstract slabs
   every time; reach for a rectangle only when the thing genuinely is a
   rectangle."* Nothing here has to be decoded.

   ⛔ WORLDS ALREADY SPENT, CHECKED BEFORE CHOOSING: reel 57 RAMSAY is a KITCHEN
   and is *the same two-Claude-adversarial-reviewer concept*, so a head chef at a
   pass is not available at any price. Reel 80 OPEN used an arcade CLAW MACHINE
   as one hook variant only, never as a world.

   ⛔ MATTE ONLY. No `boxShadow: 0 0 Npx` anywhere. ⛔ `dark()`/`mix()` do not
   nest — use dkh/mxh. ⛔ `E` CLAMPS. ⛔ Anything crossing a cut is LIN or IN.
   ========================================================================= */

export {
  W, H, SAFE, E, OUT, IO, BACK, IN_Q, LIN, hexa, mix, dark, SH, SH_D, rnd,
  Beam, Strip, Motes, Chip, Slug, Plate, BigNum, Contact, Edge, Scene, Cam,
  Mark, MarkPlate, MarkCast, CamCtx, PalCtx,
  dkh, mxh, idle, rock, shake, drift, squash,
  Rake, Runner, Ring, Puff, Pool, Steam, Sweat, Fall,
  COSTUMES, costumeFor, Crew, Hero, Forearm, vivid, lerpHex, mono, ui,
  CLAY, CLAYD, GOLD, GREEN, RED, SKY, PAPER, CREAMB, INK, MUTE, TEAL, STEEL,
  BRASS, SODIUM, VIOLET, EMBER, OXIDE, SLATE, PCB, COPPER,
};
export type { Place };

/** the arena's own paints. `NEON` is the rim light every surface in the room is
    edged with — it is what makes a dark chamber read as a PLACE rather than a
    black rectangle. `PERFECT` is the one green in the reel and only S10 gets
    it. `BOSSC` is the boss's clay: the SAME family as the party, two stops down
    and desaturated, because he has to read as one of them and not as a monster. */
export const NEON = "#5EC8E8", PERFECT = "#48D48A", BOSSC = "#7A4433", TOKEN = "#E7B24C";

/* ---- THE LEDGER — unchanged from v1, the facts did not move --------------- */
export const R = {
  /** ⛔⛔ OUR NAME, NOT THE INDUSTRY'S. The published terms are "loop
      engineering" and "agent loops". It appears twice and never as a citation. */
  name: "THE BOSS LOOP",
  quote: "CAN THE AGENT RUN THE THING?",
  quoteWho: "BORIS CHERNY · CLAUDE CODE",
  future: "I DON'T PROMPT CLAUDE ANYMORE",
  futureWho: "CREATOR · CLAUDE CODE",
  split: "MAKER · CHECKER",
  /** ⛔ AN EVENT COUNT, NOT A BENCHMARK — the boss's own verdict on a thing the
      viewer watches being tested three times and then working. */
  scores: [61, 74, 88] as const,
  perfect: "PERFECT",
  lines: [
    { n: "1", t: "THE TASK" },
    { n: "2", t: "SPAWN THE PARTY" },
    { n: "3", t: "ASSIGN A STRICT BOSS" },
  ] as const,
  keyword: "BOSS",
} as const;

export const NAME_BANNED = ["EVERYONE CALLS", "KNOWN AS", "THE INDUSTRY", "OFFICIALLY"] as const;
export const PERF_BANNED = ["10X", "100X", "5X FASTER", "% BETTER", "BEST"] as const;
export const MONEY_BANNED = ["$", "USD", "COST:", "£"] as const;

/* ---- THE PLACES ----------------------------------------------------------
   ⛔ NEIGHBOURING SCENES DIFFER BY BOTH HUE AND LIGHTNESS.
   ⛔ BODY SCENES TARGET LUMA 70-105, sat >= 34%, black point p10 <= 35. The
   >=140 bar is FRAME 0 ONLY and `arena` is the only place built for it.
   ⛔ EVERY LIT PLACE KEEPS AN UNLIT HALF — brightness is the MEAN and hierarchy
   is the SPREAD, and they only fight when you reach for the dark stop. */
export const PLACES: Record<string, Place> = {
  /* frame 0 lives here: a lit arena floor under a bright rig, with the boss's
     near-black mass standing in it. The mean is high AND the spread is the
     biggest in the reel, which is §8's answer to the two gates at once. */
  arena:   { back: "#3E6478", back2: "#BFE6F2", floor: "#A8CEDD", floor2: "#6791A5",
             lip: "#0E1A22", key: "#EAFBFF", horizon: 588, grit: "#0A141B" },
  /* the same chamber with the house lights DOWN — a returning set is a callback
     only if the light changed */
  arena2:  { back: "#030710", back2: "#1A3B4C", floor: "#123243", floor2: "#050D13",
             lip: "#030810", key: "#8FE4FF", horizon: 588, grit: "#03080D" },
  /* the gate at the far end — violet, the way in */
  gate:    { back: "#160B2A", back2: "#5B3A96", floor: "#3A2668", floor2: "#05020D",
             lip: "#070312", key: "#C9A6FF", horizon: 560, grit: "#060310" },
  /* the spawn pad — teal, cold, bright */
  spawn:   { back: "#02181C", back2: "#2E8A96", floor: "#1B5A64", floor2: "#010507",
             lip: "#010B0E", key: "#9FF4FF", horizon: 604, grit: "#020A0D" },
  /* the boss's strike — red, the hardest frame in the reel */
  slam:    { back: "#1A0406", back2: "#8E2118", floor: "#621810", floor2: "#0B0202",
             lip: "#0D0202", key: "#FFB09A", horizon: 572, grit: "#0A0203" },
  /* the CONTINUE screen — ember, the cost */
  retry:   { back: "#170A02", back2: "#8A4410", floor: "#5E2E0A", floor2: "#050200",
             lip: "#0C0401", key: "#FFB64D", horizon: 566, grit: "#080300" },
  /* PERFECT — the only green in the reel, and only S10 and S13 get it */
  perfect: { back: "#031A10", back2: "#3EA870", floor: "#20724C", floor2: "#010704",
             lip: "#02100A", key: "#A8FFCE", horizon: 574, grit: "#03120B" },
  /* the practice room — small, warm, the quiet trough */
  prep:    { back: "#1A1004", back2: "#7A5A22", floor: "#54401A", floor2: "#1A1206",
             lip: "#0C0702", key: "#FFD98A", horizon: 596, grit: "#080502" },
};
export const asPlace = (k: keyof typeof PLACES): Place => PLACES[k];

/* =========================================================================
   THE ARENA — the room itself. ⛔ It is drawn as a PLACE, not as a screen: a
   floor with a lit edge, a raised dais, standing pillars receding in value, a
   lighting rig overhead and a rim of neon on every horizontal. A dark chamber
   with no rim light is a black rectangle, and that is what makes an arena read
   as an arena rather than as an absence.
   ====================================================================== */
export const Arena: React.FC<{ p: Place; f: number; z?: number; lit?: number;
  dais?: boolean; rig?: boolean; dx?: number; mark?: number; roof?: number }> =
  ({ p, f, z = 6, lit = 1, dais = true, rig = true, dx = 0, mark = 1, roof = 0 }) => (
  <>
    {/* ⭐ THE HOUSE MARK, BIG, TURNING, AT THE BACK OF THE ROOM. Alex asked for
        it here and asked for it once before on another reel, which is why
        `MarkCast` already carries a `spin` prop. It is a FIXTURE, not a subject:
        it sits behind every plane except the wall, so it costs the hierarchy
        nothing, and it makes the audience filter itself the thing that catches
        the eye. ⛔ A slow rate — 0.22 deg/frame is 6.6 deg/sec, a turn you read
        rather than a spin you notice. */}
    {mark > 0 && (
      <MarkCast x={506 + dx * 0.2} y={352} s={760} z={z + 1} o={0.24 * mark * (0.55 + lit * 0.45)}
        spin={0.22} f={f} pulse={0.6} />
    )}
    {/* the back wall, and three ranks of pillars receding in VALUE — size alone
        is a texture; value is what makes depth readable and it is the axis the
        greyscale audit can see */}
    {[0, 1, 2].map((rank) => {
      const n = [5, 6, 8][rank];
      const hgt = [300, 236, 178][rank];
      const top = [214, 268, 316][rank];
      const dk = [0.22, 0.08, -0.06][rank];
      return Array.from({ length: n }, (_, i) => (
        <div key={`pl${rank}-${i}`} style={{ position: "absolute",
          left: -70 + i * ((W + 150) / n) + dx * (0.3 + rank * 0.3), top,
          width: (W + 150) / n - 34 - rank * 6, height: hgt, zIndex: z + rank,
          background: `linear-gradient(180deg, ${dkh(p.back2, dk)} 0%, ${dkh(p.back2, dk + 0.30)} 100%)` }}>
          <div style={{ position: "absolute", left: 0, top: 0, right: 0, height: 9,
            background: hexa(NEON, (0.30 + rank * 0.14) * lit) }} />
          {/* a lit strip DOWN each pillar — this is what turns a block into
              architecture, and it is where the arena's colour lives */}
          <div style={{ position: "absolute", left: "44%", top: 18, width: 10, bottom: 12,
            background: hexa(NEON, (0.14 + rank * 0.10) * lit) }} />
        </div>
      ));
    })}
    {/* ⭐⭐⭐ THE MARK ON THE FLOOR, LIKE A CENTRE-COURT LOGO. Alex: *"even the
        beginning scene should be more interesting, like logos etc, more like
        signaling towards Claude."* `feedback_real_marks_are_the_props` and the
        audience-filter rule: *"more Claude logo imagery especially in the first
        3 seconds... so our target Claude audience keeps watching and other
        randoms don't."* An arena is the one world where a huge mark on the
        ground is not branding pasted on the frame — it is what the floor of
        every arena on earth actually has. Squashed to ~0.30 so it lies IN the
        floor plane rather than standing on it, and it sits under every body. */}
    <div style={{ position: "absolute", left: 506 - 300 + dx * 0.5, top: p.horizon + 22,
      width: 640, height: 640, zIndex: z + 9, opacity: 0.46 * (0.4 + lit * 0.6),
      transform: "scaleY(0.30)", transformOrigin: "50% 0%" }}>
      <Img src={staticFile("claude_logo.png")}
        style={{ width: "100%", height: "100%", objectFit: "contain" }} />
    </div>
    {/* the floor, its lit leading edge, and the reflection band */}
    <div style={{ position: "absolute", left: 0, right: 0, top: p.horizon, bottom: 0, zIndex: z + 6,
      background: `linear-gradient(184deg, ${p.floor} 0%, ${p.floor2} 100%)` }} />
    <div style={{ position: "absolute", left: 0, right: 0, top: p.horizon - 9, height: 11, zIndex: z + 7,
      background: hexa(NEON, 0.30 + lit * 0.5) }} />
    <div style={{ position: "absolute", left: 0, right: 0, top: p.horizon + 2, height: 150, zIndex: z + 7,
      background: `linear-gradient(180deg, ${hexa(p.key, 0.40 * lit)} 0%, ${hexa(p.key, 0)} 100%)` }} />
    {/* floor grid lines running to the horizon — the only thing in the room that
        says "this is a big space" without drawing another object */}
    {Array.from({ length: 11 }, (_, i) => (
      <div key={"gl" + i} style={{ position: "absolute", left: -300 + i * 170, top: p.horizon,
        width: 5, height: H - p.horizon, zIndex: z + 8, opacity: 0.30 * lit,
        transformOrigin: "50% 0%", transform: `rotate(${(i - 5) * 5.6}deg)`,
        background: `linear-gradient(180deg, ${hexa(NEON, 0.7)} 0%, ${hexa(NEON, 0)} 100%)` }} />
    ))}
    {/* ⭐⭐⭐ THE SWEEPING SPOTS — THE FIX FOR ELEVEN SCENES AT ONCE.
        `scene_open_audit` found 13 of 15 scenes opening on a dead half-second,
        and pulling each scene's own event earlier only fixed four of them. The
        reason is that an EVENT has a start, so however early you move it there
        is still a frame before it. What a scene needs at frame 0 is motion that
        has NO start — a continuous process that is simply already running when
        the cut lands.
        ⭐ In an arena that is house spotlights sweeping the floor: §1's
        second-highest-value shape (a full-width high-contrast travelling band),
        utterly natural to the world, present on frame 1 of every scene BY
        CONSTRUCTION, and costing the hierarchy nothing because it is furniture.
        ⛔ Three of them on DIFFERENT periods and directions, so the pattern
        never repeats and never reads as a loop. */}
    {Array.from({ length: 2 }, (_, i) => {
      const per = [64, 83, 51][i];
      const dir = i === 1 ? -1 : 1;
      const t = (((f * dir) % per) + per) / per;
      const sx = -300 + t * (W + 600);
      const top = [128, 150, 138][i];
      return (
        <div key={"sp" + i} style={{ position: "absolute", left: sx, top,
          width: 430, height: H - top, zIndex: z + 15, opacity: [0.26, 0.20, 0.23][i] * lit,
          clipPath: "polygon(40% 0, 60% 0, 100% 100%, 0 100%)",
          background: `linear-gradient(180deg, ${hexa(p.key, 0.85)} 0%, ${hexa(p.key, 0.10)} 62%, ${hexa(p.key, 0)} 100%)` }} />
      );
    })}
    {/* and the pool each one drags across the floor — the light has a FOOT */}
    {Array.from({ length: 2 }, (_, i) => {
      const per = [64, 83, 51][i];
      const dir = i === 1 ? -1 : 1;
      const t = (((f * dir) % per) + per) / per;
      const sx = -300 + t * (W + 600);
      return (
        <div key={"po" + i} style={{ position: "absolute", left: sx - 130, top: p.horizon + 26,
          width: 620, height: 165, zIndex: z + 8, opacity: [0.30, 0.24, 0.27][i] * lit,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${hexa(p.key, 0.8)} 0%, ${hexa(p.key, 0)} 68%)` }} />
      );
    })}
    {/* the dais the boss stands on — raised, so he is above the party always */}
    {dais && (<>
      <div style={{ position: "absolute", left: 596, top: p.horizon - 96, width: 500, height: 104,
        zIndex: z + 10, background: `linear-gradient(180deg, ${dkh(p.back2, 0.30)} 0%, ${dkh(p.back2, 0.56)} 100%)` }} />
      <div style={{ position: "absolute", left: 596, top: p.horizon - 102, width: 500, height: 9,
        zIndex: z + 11, background: hexa(NEON, 0.5 + lit * 0.4) }} />
      {Array.from({ length: 6 }, (_, i) => (
        <div key={"ds" + i} style={{ position: "absolute", left: 616 + i * 82, top: p.horizon - 88,
          width: 46, height: 88, zIndex: z + 11, background: dkh(p.back2, 0.46) }} />
      ))}
      {/* the mark cast into the front of the dais — the world saying what it runs */}
      <Img src={staticFile("claude_logo.png")}
        style={{ position: "absolute", left: 796, top: p.horizon - 82, width: 76, height: 76,
          objectFit: "contain", zIndex: z + 12, opacity: 0.42 }} />
    </>)}
    {/* the overhead rig — lamps that STROBE on their own clocks, which is the
        room's background process and costs the hierarchy nothing */}
    {rig && (<>
      {/* the ceiling truss — LIT. An arena roof is a structure with light on it,
          not a black band, and that band measured 36.8 against a 140 bar. */}
      <div style={{ position: "absolute", left: -40, top: 96, width: W + 80, height: 92, zIndex: z + 13,
        background: `linear-gradient(180deg, ${dkh(p.back2, 0.34)} 0%, ${dkh(p.back2, 0.14)} 100%)` }} />
      {Array.from({ length: 13 }, (_, i) => (
        <div key={"tr" + i} style={{ position: "absolute", left: -30 + i * 84, top: 100, width: 13,
          height: 84, zIndex: z + 13, background: dkh(p.back2, 0.44),
          transform: `skewX(${i % 2 ? 16 : -16}deg)` }} />
      ))}
      {roof > 0 && (<>
        <div style={{ position: "absolute", left: -40, top: -10, width: W + 80, height: 108, zIndex: z + 12,
          background: `linear-gradient(180deg, ${mxh(p.back2, 0.30 * lit)} 0%, ${
            mxh(p.back2, 0.02)} 58%, ${dkh(p.back2, 0.62)} 100%)` }} />
        {Array.from({ length: 9 }, (_, i) => (
          <div key={"sof" + i} style={{ position: "absolute", left: -20 + i * 122, top: -10, width: 74,
            height: 108, zIndex: z + 12, background: mxh(p.back2, 0.14 * lit) }} />
        ))}
      </>)}
      <div style={{ position: "absolute", left: -40, top: 92, width: W + 80, height: 15, zIndex: z + 14,
        background: mxh(p.back2, 0.06) }} />
      {Array.from({ length: 7 }, (_, i) => {
        const on = ((f + i * 13) % 44) < 26;
        return (
          <React.Fragment key={"rg" + i}>
            <div style={{ position: "absolute", left: 34 + i * 142, top: 107, width: 66, height: 30,
              zIndex: z + 14, borderRadius: "0 0 12px 12px",
              background: dkh(p.back2, 0.5) }} />
            <div style={{ position: "absolute", left: 44 + i * 142, top: 133, width: 46, height: 11,
              zIndex: z + 15, borderRadius: 4,
              background: on ? mxh(p.key, 0.2) : dkh(p.back2, 0.3) }} />
            {on && (
              <div style={{ position: "absolute", left: 67 + i * 142 - 90, top: 142, width: 180,
                height: 300, zIndex: z + 12, opacity: 0.20 * lit,
                clipPath: "polygon(38% 0, 62% 0, 100% 100%, 0 100%)",
                background: `linear-gradient(180deg, ${hexa(p.key, 0.7)} 0%, ${hexa(p.key, 0)} 100%)` }} />
            )}
          </React.Fragment>
        );
      })}
    </>)}
  </>
);


/* =========================================================================
   THE STANDS — ⭐ what turns a room with two characters in it into an ARENA,
   and the fix for a hook whose TOP half measured 0.24 of its bottom (§24).

   ⛔ A CROWD IS NOT A TEXTURE. Rows of identical dots read as noise; what makes
   a crowd read is (a) a VALUE RAMP back to front — the same law that makes
   sprite depth readable and the axis a greyscale audit can see — and (b) that
   they REACT. They lean on the beat and they come off their seats when
   something lands, on their own phases, so no two move together.
   ⛔ They are the house clay at three depths, not silhouettes: a black crowd on
   a lit wall reads as holes.
   ====================================================================== */
export const Stands: React.FC<{ p: Place; f: number; y?: number; z?: number;
  react?: number; lit?: number; banners?: number }> =
  ({ p, f, y = 214, z = 20, react = 0, lit = 1, banners = 1 }) => (
  <>
    {/* the tiered wall the crowd sits on — lit, because an arena's stands are */}
    <div style={{ position: "absolute", left: -40, top: y - 40, width: W + 80, height: 168, zIndex: z - 1,
      background: `linear-gradient(180deg, ${mxh(p.back2, 0.16)} 0%, ${dkh(p.back2, 0.06)} 100%)` }} />
    {[0, 1, 2].map((r) => (
      <div key={"tier" + r} style={{ position: "absolute", left: -40, top: y - 6 + r * 34,
        width: W + 80, height: 5, zIndex: z - 1, background: hexa(NEON, 0.34) }} />
    ))}
    {/* the barrier the front row leans on */}
    <div style={{ position: "absolute", left: -40, top: y + 104, width: W + 80, height: 20, zIndex: z + 4,
      background: `linear-gradient(180deg, ${mxh(p.back2, 0.06)} 0%, ${dkh(p.back2, 0.26)} 100%)` }} />
    <div style={{ position: "absolute", left: -40, top: y + 100, width: W + 80, height: 6, zIndex: z + 5,
      background: hexa(NEON, 0.44 + lit * 0.4) }} />
    {/* ⭐ THE BANNERS. Six of them hung off the barrier, each carrying the mark,
        each swinging on its own clock — arena furniture that happens to be the
        audience filter. They are OVER the crowd and UNDER the cast. */}
    {banners > 0 && Array.from({ length: 6 }, (_, i) => {
      const bx = 34 + i * 168;
      const sway = Math.sin(f / 21 + i * 1.3) * 2.6;
      return (
        <div key={"bn" + i} style={{ position: "absolute", left: bx + 14, top: y + 112,
          width: 88, height: 116, zIndex: z + 6, transformOrigin: "50% 0%",
          transform: `rotate(${sway}deg)`, opacity: (0.4 + lit * 0.42) }}>
          <div style={{ position: "absolute", inset: 0, borderRadius: "3px 3px 7px 7px",
            background: `linear-gradient(180deg, ${dkh(CLAY, 0.80)} 0%, ${dkh(CLAY, 0.90)} 100%)`,
            border: `3px solid ${dkh(CLAY, 0.93)}` }} />
          <div style={{ position: "absolute", left: -5, top: -6, width: 98, height: 10,
            borderRadius: 3, background: mxh(p.back2, 0.04) }} />
          {/* the mark reads BRIGHT against a near-black field — the two values
              the two gates each want, out of one object */}
          <div style={{ position: "absolute", left: 8, top: 14, width: 72, height: 72,
            borderRadius: 9, background: "#FFF6EC" }} />
          <Img src={staticFile("claude_logo.png")}
            style={{ position: "absolute", left: 12, top: 18, width: 64, height: 64,
              objectFit: "contain" }} />
        </div>
      );
    })}
    {[0, 1, 2].map((row) => {
      const n = [14, 12, 10][row];
      const sz = [30, 40, 52][row];
      const yy = y + row * 34;
      const dk = [0.54, 0.34, 0.12][row];
      return Array.from({ length: n }, (_, i) => {
        const ph = i * 1.7 + row * 0.9;
        /* ⛔ A CROWD THAT ONLY BOBS IS THIRTY-SIX MORE OSCILLATIONS. Alex:
           *"too much basic back and forth movement."* §1: a full-width
           high-contrast TRAVELLING event is the second highest-value shape
           there is, and a crowd already has one — a WAVE. It crosses the whole
           stand on a real clock, each body rising and sitting as it passes, so
           the top of the frame has something with a DESTINATION in it rather
           than thirty-six things vibrating in place. */
        const wavePos = ((f * 0.026 + row * 0.06) % 1.4) * (n + 3) - 1.5;
        const d = Math.abs(i - wavePos);
        const wave = d < 1.9 ? Math.cos((d / 1.9) * 1.57) * (sz * 1.15) : 0;
        /* the counter-wave — a different rate, the other way, so two bands of
           the stand are always up and the loop never reads as one */
        const wp2 = (((-f * 0.019 + row * 0.09) % 1.7) + 1.7) % 1.7 * (n + 3) - 1.5;
        const d2 = Math.abs(i - wp2);
        const wave2 = d2 < 1.5 ? Math.cos((d2 / 1.5) * 1.57) * (sz * 0.80) : 0;
        const bob = Math.sin(f / 11 + ph) * 2.2;
        const up = wave + (react > 0.02 ? react * (13 + rnd(i + row * 20, 5) * 18) : 0);
        return (
          <div key={`cw${row}-${i}`} style={{ position: "absolute",
            left: -30 + i * ((W + 60) / n) + (row % 2) * 16,
            top: yy + 78 - sz - bob - up, width: sz, height: sz, zIndex: z + row,
            borderRadius: sz * 0.14,
            transform: `rotate(${Math.sin(f / 14 + ph) * 4}deg)`,
            background: dkh(CLAY, dk) }}>
            <div style={{ position: "absolute", left: sz * 0.18, top: sz * 0.3, width: sz * 0.16,
              height: sz * 0.16, background: "#15100C", opacity: 0.8 }} />
            <div style={{ position: "absolute", left: sz * 0.62, top: sz * 0.3, width: sz * 0.16,
              height: sz * 0.16, background: "#15100C", opacity: 0.8 }} />
          </div>
        );
      });
    })}
  </>
);

/* =========================================================================
   THE BOSS — a Claude, at four to five times the party's size, on the dais.

   ⛔⛔ HE IS THE SAME CLAY AS EVERYONE ELSE, TWO STOPS DOWN. Reel 128 v1's
   villain was a suit behind glass and read as "an office worker"; a MONSTER
   would read as a different species and lose the whole point, which is that the
   thing grading the work is the same kind of thing that made it. Scale, height
   and light do the villainy — not a new creature.
   ⛔ `Mascot`'s drawn body is ~100% of `size`, so a 560px boss is 560px of body
   and the pitch arithmetic for anything beside him has to use that number.
   ====================================================================== */
export const Boss: React.FC<{ f: number; x: number; y: number; size?: number; z?: number;
  swing?: number; guard?: number; hurt?: number; down?: number; ph?: number }> =
  ({ f, x, y, size = 520, z = 60, swing = 0, guard = 0, hurt = 0, down = 0, ph = 0 }) => {
  const sw = Math.max(0, Math.min(1, swing));
  const hp = Math.max(0, Math.min(1, hurt));
  const dn = Math.max(0, Math.min(1, down));
  /* he BREATHES at four times a worker's amplitude — mass reads as slow */
  const br = Math.sin(f / 26 + ph) * size * 0.014 + Math.sin(f / 61 + ph) * size * 0.007;
  /* the whole body LEANS into the swing and recoils out of it. §11: an ACTION is
     a DISTANCE — 26 degrees of lean on a 470px body is ~200px of travel at the
     shoulder, which is a distance the eye can resolve. */
  const lean = sw * -13 + guard * 6 + hp * 4 + dn * 9;
  return (
    <div style={{ position: "absolute", left: x - size / 2, top: y - size + br + dn * size * 0.34,
      width: size, height: size, zIndex: z,
      transform: `rotate(${lean}deg) scale(${1 + sw * 0.06 - dn * 0.10}, ${1 - sw * 0.07 - dn * 0.14})`,
      transformOrigin: "50% 100%" }}>
      {/* the cast shadow he stands in — a body this size without one floats */}
      <div style={{ position: "absolute", left: size * 0.02, top: size * 0.965, width: size * 0.96,
        height: size * 0.10, borderRadius: "50%", background: "rgba(4,8,14,0.52)", filter: "blur(9px)" }} />
      {/* ⛔⛔⛔ NO HAND-DRAWN LIMB, AND NO ADDED GEOMETRY AT ALL. v1 hung a
          0.46-size arm rect and a separate fist off the body edge and rotated
          them through 96 degrees. That is the shape §11 bans in as many words:
          *"the first attempt hung a hand-drawn arm off the body edge and it read
          as a TAIL on every sprite in the reel... a limb that terminates in
          mid-air is the banned shape."* Alex: *"the arm on it doesn't look good
          and the shapes look weird."*
          ⭐ `SlopKit.Mascot` ALREADY DRAWS ITS OWN ARMS — two 26x26 clay rects
          whose `cheer` prop raises AND rotates them (`armY = 86 - cheer*26`).
          So the swing is: the mascot's own arms come up on `cheer`, the whole
          BODY leans through the arc, and the air wedge and the flying bodies do
          the rest. Read the rig before drawing geometry.
          ⛔ The pauldrons and the rim-light bar are gone with it. Scale, height
          and light do the villainy; he is the SAME clay as the party, two stops
          down, because the point is that the thing grading the work is the same
          kind of thing that made it. */}
      <Hero f={f} x={size / 2} y={size} size={size} z={2} costume={{ suit: 1 }}
        act={3} stern={1 - dn} shock={hp} cheer={sw * 0.9 + guard * 0.7}
        gaze={-0.2} tint={BOSSC} ph={ph} />
    </div>
  );
};

/* =========================================================================
   THE HEALTH RAIL — the boss's verdict, drawn as a physical row of lamps on the
   wall behind him rather than as a UI bar.
   ⛔ `feedback_graphical_over_textual`: a number MOVES to its value, it is never
   typeset at it. The score is TEN SEGMENTS, four lit — no numeral anywhere
   until PERFECT, which is a word, not a measurement.
   ====================================================================== */
export const Rail: React.FC<{ p: Place; x: number; y: number; w?: number; z?: number;
  k: number; f: number; perfect?: boolean; label?: string }> =
  ({ p, x, y, w: ww = 560, z = 84, k, f, perfect: pf = false, label }) => {
  const N = 10;
  const lit = Math.round(Math.max(0, Math.min(1, k)) * N);
  return (
    <div style={{ position: "absolute", left: x, top: y, width: ww, height: 76, zIndex: z }}>
      <div style={{ position: "absolute", left: -10, top: -10, right: -10, height: 62,
        borderRadius: 8, background: dkh(p.back2, 0.62),
        border: `5px solid ${dkh(p.back2, 0.44)}` }} />
      {Array.from({ length: N }, (_, i) => {
        const on = i < lit;
        const pulse = on && i === lit - 1 ? 0.72 + 0.28 * Math.sin(f / 3.4) : 1;
        return (
          <div key={"sg" + i} style={{ position: "absolute", left: 6 + i * ((ww - 12) / N),
            top: 4, width: (ww - 12) / N - 8, height: 34, borderRadius: 3,
            background: on ? (pf ? mxh(PERFECT, 0.16) : mxh(TOKEN, 0.1)) : dkh(p.back2, 0.3),
            opacity: pulse }} />
        );
      })}
      {label && (
        <div style={{ position: "absolute", left: 0, top: 46, width: ww, textAlign: "center",
          ...mono(22, 800), color: pf ? mxh(PERFECT, 0.4) : mxh(p.key, 0.34), letterSpacing: 5 }}>
          {label}
        </div>
      )}
    </div>
  );
};

/* =========================================================================
   THE TOKEN SLOT — ⭐ the one place in this reel where the metaphor and the
   subject are THE SAME WORD. "This burns through tokens fast" is a sentence
   about API tokens and about arcade tokens at once, so the picture asserts
   nothing the VO does not.
   ⛔ NO CURRENCY AND NO FIGURE. The VO names none, and a number here reads as
   the price of the run we have just watched. It is a STACK that empties.
   ====================================================================== */
export const TokenSlot: React.FC<{ p: Place; x: number; y: number; s?: number; z?: number;
  f: number; left: number }> = ({ p, x, y, s = 1, z = 62, f, left }) => {
  const P = (v: number) => v * s;
  const n = Math.max(0, Math.round(left * 12));
  return (
    <div style={{ position: "absolute", left: x, top: y, width: P(360), height: P(320), zIndex: z }}>
      {/* the cabinet face, the slot, and the lit bezel */}
      <div style={{ position: "absolute", left: P(40), top: 0, width: P(240), height: P(300),
        borderRadius: P(8), background: `linear-gradient(172deg, ${dkh(p.back2, 0.30)} 0%, ${dkh(p.back2, 0.58)} 100%)`,
        border: `${P(7)}px solid ${dkh(p.back2, 0.46)}` }} />
      <div style={{ position: "absolute", left: P(56), top: P(16), width: P(208), height: P(8),
        background: hexa(p.key, 0.5) }} />
      {/* the slot itself — a real mouth with a lip */}
      <div style={{ position: "absolute", left: P(126), top: P(64), width: P(70), height: P(20),
        borderRadius: P(4), background: "#05080C",
        border: `${P(5)}px solid ${mxh(p.back2, 0.1)}` }} />
      {/* the STACK, and it EMPTIES — the destination is zero */}
      {Array.from({ length: 12 }, (_, i) => (
        <div key={"tk" + i} style={{ position: "absolute", left: P(112), top: P(266 - i * 15),
          width: P(96), height: P(22), borderRadius: "50%", zIndex: 3,
          opacity: i < n ? 1 : 0,
          background: `linear-gradient(180deg, ${mxh(TOKEN, 0.26)} 0%, ${dkh(TOKEN, 0.24)} 100%)`,
          border: `${P(3)}px solid ${dkh(TOKEN, 0.4)}` }} />
      ))}
      {/* and one token FALLING INTO the slot on a loop, always — the drain is a
          continuous process, not a state */}
      {Array.from({ length: 3 }, (_, i) => {
        const t = ((f * 3.4 + i * 34) % 100) / 100;
        return (
          <div key={"fl" + i} style={{ position: "absolute", left: P(128) + Math.sin(t * 6) * P(6),
            top: P(-70) + t * P(140), width: P(66), height: P(18), borderRadius: "50%", zIndex: 4,
            opacity: t > 0.92 ? 0 : 1,
            transform: `rotate(${t * 220}deg)`,
            background: `linear-gradient(180deg, ${mxh(TOKEN, 0.34)} 0%, ${dkh(TOKEN, 0.16)} 100%)` }} />
        );
      })}
    </div>
  );
};

/** the party's WORK, as a volley: large bright masses travelling at the boss.
    ⛔ NOT "abstract lights on wires" (§10) — each one is a solid slab with a
    lit leading edge and a real silhouette, big enough to survive the audit's
    1012->240 downsample, and they travel a real distance. */
export const Volley: React.FC<{ f: number; at: number; n?: number; x0: number; x1: number;
  y0: number; spread?: number; z?: number; c?: string; s?: number; life?: number }> =
  ({ f, at, n = 9, x0, x1, y0, spread = 190, z = 70, c = NEON, s = 1, life = 26 }) => (
  <>{Array.from({ length: n }, (_, i) => {
    const lf = f - at - i * 1.8;
    if (lf < 0 || lf > life) return null;
    const t = lf / life;
    /* ⛔ NOT A STRAIGHT LINE. A rigid object travelling straight at constant
       scale is the one case where smooth and high-motion are opposed (§13), and
       it also reads as a slide. Each one ARCS, TUMBLES and grows as it comes at
       the boss, so the composite keeps repainting without a single jump cut. */
    const yy = y0 + (rnd(i, 3) - 0.5) * spread - Math.sin(t * 3.14) * 90;
    const sz = (76 + rnd(i, 4) * 44) * s * (0.7 + t * 0.5);
    return (
      <div key={"vo" + i} style={{ position: "absolute",
        left: x0 + (x1 - x0) * t, top: yy, width: sz, height: sz, zIndex: z,
        opacity: t > 0.9 ? (1 - t) * 10 : 1,
        transform: `rotate(${(rnd(i, 5) - 0.5) * 40 + t * 210 * (i % 2 ? 1 : -1)}deg)` }}>
        {/* the plate it rides — a real tile with a lit leading edge, so the mark
            has a silhouette against a lit room instead of floating */}
        <div style={{ position: "absolute", inset: 0, borderRadius: sz * 0.2,
          background: `linear-gradient(150deg, ${mxh(c, 0.34)} 0%, ${dkh(c, 0.18)} 100%)`,
          border: `${Math.max(3, sz * 0.055)}px solid ${dkh(c, 0.36)}` }} />
        <div style={{ position: "absolute", left: sz * 0.08, top: sz * 0.08, width: sz * 0.84,
          height: sz * 0.10, borderRadius: sz * 0.05, background: hexa("#FFFFFF", 0.5) }} />
        <Img src={staticFile("claude_logo.png")}
          style={{ position: "absolute", left: sz * 0.16, top: sz * 0.16, width: sz * 0.68,
            height: sz * 0.68, objectFit: "contain" }} />
      </div>
    );
  })}</>
);


/* =========================================================================
   THE SPAWN PAD — a lit ring in the floor a body materialises out of.
   ⛔ It has to READ WHILE EMPTY, because empty is the promise (§11): a ring,
   a rim, four index marks and a floor glow, all present before anything uses it.
   ====================================================================== */
export const Pad: React.FC<{ p: Place; x: number; y: number; r?: number; z?: number;
  f: number; k?: number }> = ({ p, x, y, r = 96, z = 22, f, k = 0 }) => {
  const hot = Math.max(0, Math.min(1, k));
  return (
    <div style={{ position: "absolute", left: x - r, top: y - r * 0.34, width: r * 2,
      height: r * 0.68, zIndex: z }}>
      <div style={{ position: "absolute", inset: 0, borderRadius: "50%",
        background: `radial-gradient(50% 50% at 50% 50%, ${hexa(NEON, 0.30 + hot * 0.6)} 0%, ${hexa(NEON, 0)} 72%)` }} />
      <div style={{ position: "absolute", inset: 0, borderRadius: "50%",
        border: `${Math.max(3, r * 0.05)}px solid ${hexa(NEON, 0.5 + hot * 0.45)}` }} />
      <div style={{ position: "absolute", left: r * 0.24, top: r * 0.10, width: r * 1.52,
        height: r * 0.48, borderRadius: "50%",
        border: `${Math.max(2, r * 0.03)}px solid ${hexa(NEON, 0.24 + hot * 0.4)}` }} />
      {[0, 1, 2, 3].map((i) => (
        <div key={"ix" + i} style={{ position: "absolute",
          left: r - r * 0.05 + Math.cos((i / 4) * 6.283 + f / 60) * r * 0.92,
          top: r * 0.34 - r * 0.04 + Math.sin((i / 4) * 6.283 + f / 60) * r * 0.30,
          width: r * 0.11, height: r * 0.08, background: hexa(NEON, 0.7 + hot * 0.3) }} />
      ))}
      {/* the column of light a body arrives down */}
      {hot > 0.02 && (
        <div style={{ position: "absolute", left: r * 0.36, top: -r * 4.4, width: r * 1.28,
          height: r * 4.4, opacity: hot,
          background: `linear-gradient(180deg, ${hexa(NEON, 0)} 0%, ${hexa(NEON, 0.34)} 70%, ${hexa(NEON, 0.62)} 100%)` }} />
      )}
    </div>
  );
};

/* =========================================================================
   THE BOARD — the arena's own big lit sign, hung over the floor. This is where
   a quote or a loadout goes, and it is a real object in a real arena rather
   than a caption pasted on the frame.
   ⛔ ONE TEXT CHIP PER SHOT, and it lives in the reserved band (panel y
   112..210) so it can never enter the ground line the cast stands on.
   ====================================================================== */
export const Board: React.FC<{ p: Place; x: number; y: number; w?: number; h?: number;
  z?: number; f: number; on?: number; rows: { t: string; lit: number }[]; title?: string }> =
  ({ p, x, y, w: ww = 700, h: hh = 210, z = 84, f, on = 1, rows, title }) => (
  <div style={{ position: "absolute", left: x, top: y, width: ww, height: hh, zIndex: z }}>
    {/* the hanger it swings from — a sign with no fixing floats */}
    {[0.24, 0.76].map((k, i) => (
      <div key={"hg" + i} style={{ position: "absolute", left: ww * k - 5, top: -46, width: 10,
        height: 48, background: dkh(p.back2, 0.4) }} />
    ))}
    <div style={{ position: "absolute", inset: 0, borderRadius: 8,
      background: `linear-gradient(174deg, ${dkh(p.back2, 0.52)} 0%, ${dkh(p.back2, 0.70)} 100%)`,
      border: `7px solid ${dkh(p.back2, 0.36)}` }} />
    <div style={{ position: "absolute", left: 10, top: 10, right: 10, height: 6,
      background: hexa(NEON, 0.3 + on * 0.5) }} />
    {title && (
      <div style={{ position: "absolute", left: 22, top: 20, ...mono(20, 800),
        color: mxh(NEON, 0.4), letterSpacing: 4 }}>{title}</div>
    )}
    {rows.map((r, i) => (
      <div key={"rw" + i} style={{ position: "absolute", left: 22, top: (title ? 54 : 24) + i * 52,
        width: ww - 44, height: 44, borderRadius: 5, overflow: "hidden",
        background: r.lit > 0.5 ? dkh(p.back2, 0.30) : dkh(p.back2, 0.58),
        display: "flex", alignItems: "center", paddingLeft: 14 }}>
        <span style={{ ...mono(30, 800), letterSpacing: 2, opacity: Math.min(1, r.lit * 2),
          transform: `translateY(${(1 - Math.min(1, r.lit)) * -40}px)`,
          color: r.lit > 0.5 ? mxh(TOKEN, 0.24) : dkh(p.key, 0.5) }}>{r.t}</span>
      </div>
    ))}
  </div>
);

/* =========================================================================
   THE TRAINING DUMMY — a small, obviously fake boss on a post, for the practice
   room. ⭐ It is recognisable because it is a MINIATURE OF THE BOSS: same
   silhouette, quarter the size, on a spring. Nothing new to decode.
   ====================================================================== */
export const Dummy: React.FC<{ p: Place; x: number; y: number; s?: number; z?: number;
  f: number; hit?: number }> = ({ p, x, y, s = 1, z = 56, f, hit = 0 }) => {
  const P = (v: number) => v * s;
  const k = Math.max(0, Math.min(1, hit));
  const sway = Math.sin(f / 9) * 2 + k * 26 * Math.exp(-k * 2);
  return (
    <div style={{ position: "absolute", left: x, top: y, width: P(190), height: P(300), zIndex: z }}>
      {/* the base and the spring post */}
      <div style={{ position: "absolute", left: P(40), top: P(272), width: P(110), height: P(26),
        borderRadius: P(6), background: dkh(p.back2, 0.44) }} />
      {Array.from({ length: 5 }, (_, i) => (
        <div key={"sp" + i} style={{ position: "absolute", left: P(76) + sway * (i / 5) * 0.5,
          top: P(216 + i * 12), width: P(38), height: P(9), borderRadius: P(4),
          background: mxh(p.back2, 0.06) }} />
      ))}
      {/* the head: the boss's silhouette in miniature, and it takes the hit */}
      <div style={{ position: "absolute", left: P(20) + sway, top: P(70), width: P(150),
        height: P(150), borderRadius: P(10), transform: `rotate(${sway * 0.5}deg)`,
        background: `linear-gradient(168deg, ${mxh(BOSSC, 0.12)} 0%, ${dkh(BOSSC, 0.2)} 100%)` }}>
        <div style={{ position: "absolute", left: P(26), top: P(52), width: P(26), height: P(30),
          background: "#15100C" }} />
        <div style={{ position: "absolute", left: P(96), top: P(52), width: P(26), height: P(30),
          background: "#15100C" }} />
        {/* the angry brow, so it reads as HIM and not as a box */}
        <div style={{ position: "absolute", left: P(20), top: P(38), width: P(40), height: P(11),
          background: "#15100C", transform: "rotate(14deg)" }} />
        <div style={{ position: "absolute", left: P(90), top: P(38), width: P(40), height: P(11),
          background: "#15100C", transform: "rotate(-14deg)" }} />
      </div>
      {[0, 1].map((i) => (
        <div key={"pd" + i} style={{ position: "absolute", left: P(i ? 132 : 8) + sway, top: P(96),
          width: P(46), height: P(30), borderRadius: P(6), background: dkh(BOSSC, 0.28) }} />
      ))}
    </div>
  );
};

/* =========================================================================
   THE FIGHT LAYER — health bars, hit flashes and impact sparks.

   ⭐⭐⭐ ALEX ASKED FOR THIS DIRECTLY: *"make it into, like, a fight, more like a
   fight. Make it, like, health bars above the... each of the quads."* It is the
   single best note in this build, because a health bar does something no amount
   of choreography could: **it makes the LOOP legible.** A viewer who sees eight
   little bars empty, a token go in, and the same eight bars come back full
   understands "it retries" without a word of narration — and when the boss's
   own bar finally empties, "until the boss gives it a perfect score" has a
   picture that is exact rather than approximate.

   ⛔ THIS IS NOT THE BANNED "UI AS ANIMATION". The standing rule is against
   *text* standing in for graphics and against product screenshots as scenes. A
   health bar in a fight is a GAME OBJECT — it is read as an instrument, not as
   copy, and it carries a QUANTITY as a length, which is precisely what
   `feedback_graphical_over_textual` asks for: *a number MOVES to its value; it
   is never typeset at it.* There is no numeral anywhere in this layer.
   ====================================================================== */

/** a fighter's bar — sits above a head, drains, flashes white on a hit and goes
    dark when it empties. ⛔ It has a FRAME and a backing so it reads while FULL
    and while EMPTY; a bare fill is invisible at zero, which is the one state it
    most has to communicate. */
export const HP: React.FC<{ x: number; y: number; w?: number; k: number; f: number;
  z?: number; flash?: number; c?: string; ko?: boolean }> =
  ({ x, y, w: ww = 92, k, f, z = 88, flash = 0, c = PERFECT, ko = false }) => {
  const v = Math.max(0, Math.min(1, k));
  const fl = Math.max(0, Math.min(1, flash));
  const h = Math.max(9, ww * 0.13);
  return (
    <div style={{ position: "absolute", left: x - ww / 2, top: y, width: ww, height: h + 6,
      zIndex: z }}>
      {/* the frame + backing — present at every value, including zero */}
      <div style={{ position: "absolute", inset: 0, borderRadius: 3,
        background: "#0B1016", border: `2px solid ${hexa("#FFFFFF", 0.34)}` }} />
      {/* the drained part shows a dark red bed, so empty reads as DAMAGE */}
      <div style={{ position: "absolute", left: 2, top: 3, width: ww - 4, height: h,
        borderRadius: 2, background: dkh(RED, 0.42) }} />
      <div style={{ position: "absolute", left: 2, top: 3, width: (ww - 4) * v, height: h,
        borderRadius: 2,
        background: ko ? dkh(RED, 0.2)
          : `linear-gradient(180deg, ${mxh(c, 0.3)} 0%, ${dkh(c, 0.1)} 100%)` }} />
      {/* the white hit flash across the whole bar */}
      {fl > 0.01 && (
        <div style={{ position: "absolute", left: 2, top: 3, width: ww - 4, height: h,
          borderRadius: 2, background: hexa("#FFFFFF", 0.85 * fl) }} />
      )}
    </div>
  );
};

/** THE BOSS BAR — the wide one across the top that every boss fight has, with a
    name plate and segment ticks so a small change in it is still readable.
    ⛔ It lives in the reserved band (panel y 112..210) so it can never enter the
    ground line the cast stands on. */
export const BossBar: React.FC<{ p: Place; y?: number; k: number; f: number; z?: number;
  flash?: number; name?: string; on?: number; c?: string }> =
  ({ p, y = 132, k, f, z = 90, flash = 0, name = "THE BOSS", on = 1, c = RED }) => {
  const v = Math.max(0, Math.min(1, k));
  const fl = Math.max(0, Math.min(1, flash));
  const X = 74, WW = W - 148;
  return (
    <div style={{ position: "absolute", left: X, top: y, width: WW, height: 60, zIndex: z,
      opacity: on }}>
      <div style={{ position: "absolute", left: 0, top: 22, width: WW, height: 30, borderRadius: 4,
        background: "#080C11", border: `3px solid ${hexa("#FFFFFF", 0.40)}` }} />
      <div style={{ position: "absolute", left: 3, top: 25, width: WW - 6, height: 24,
        borderRadius: 2, background: dkh(c, 0.44) }} />
      <div style={{ position: "absolute", left: 3, top: 25, width: (WW - 6) * v, height: 24,
        borderRadius: 2,
        background: `linear-gradient(180deg, ${mxh(c, 0.22)} 0%, ${dkh(c, 0.06)} 100%)` }} />
      {/* segment ticks — ten of them, so a one-tenth change is still visible */}
      {Array.from({ length: 9 }, (_, i) => (
        <div key={"tk" + i} style={{ position: "absolute", left: 3 + (WW - 6) * ((i + 1) / 10),
          top: 25, width: 2, height: 24, background: hexa("#000000", 0.44) }} />
      ))}
      {fl > 0.01 && (
        <div style={{ position: "absolute", left: 3, top: 25, width: WW - 6, height: 24,
          borderRadius: 2, background: hexa("#FFFFFF", 0.8 * fl) }} />
      )}
      <div style={{ position: "absolute", left: 2, top: 0, ...mono(19, 800),
        color: hexa("#FFFFFF", 0.78), letterSpacing: 5 }}>{name}</div>
    </div>
  );
};

/** a hit: a burst of chevrons out of the point of contact. ⛔ Not a particle
    cloud — chevrons have a DIRECTION, so a hit reads as a blow landing rather
    than as something exploding. */
export const Hit: React.FC<{ x: number; y: number; f: number; at: number; s?: number;
  z?: number; c?: string; dir?: number }> =
  ({ x, y, f, at, s = 1, z = 92, c = "#FFFFFF", dir = 1 }) => {
  const lf = f - at;
  if (lf < 0 || lf > 16) return null;
  const t = lf / 16;
  return (
    <>
      {/* the flash disc, contained — never a screen flash */}
      <div style={{ position: "absolute", left: x - 60 * s * (0.4 + t), top: y - 60 * s * (0.4 + t),
        width: 120 * s * (0.4 + t), height: 120 * s * (0.4 + t), borderRadius: "50%", zIndex: z,
        opacity: (1 - t) * 0.8,
        background: `radial-gradient(circle, ${hexa(c, 0.9)} 0%, ${hexa(c, 0)} 68%)` }} />
      {Array.from({ length: 6 }, (_, i) => {
        const a = (-0.6 + (i / 5) * 1.2) * dir;
        const d = t * 150 * s;
        return (
          <div key={"cv" + i} style={{ position: "absolute",
            left: x + Math.cos(a) * d, top: y + Math.sin(a) * d,
            width: 46 * s * (1 - t * 0.4), height: 11 * s, borderRadius: 6, zIndex: z + 1,
            opacity: 1 - t, transform: `rotate(${(a * 180) / 3.14}deg)`,
            background: hexa(c, 0.92) }} />
        );
      })}
    </>
  );
};

/* =========================================================================
   THE THING THEY ARE BUILDING — an app window and a web page, drawn.

   ⛔⛔ ALEX: *"when I mention apps and websites we need to see that."* §3 is the
   rule and I had not obeyed it: the VO's nouns are APPS and WEBSITES, and what
   was on screen was a crowd and some abstract tiles. Draw the noun the sentence
   uses.

   ⛔ AND THIS IS NOT THE BANNED "UI AS A SCENE". The standing bans are on
   product SCREENSHOTS as scenes and on TEXT standing in for graphics. These are
   PROPS — objects the cast carries, raises and throws — and every line of copy
   inside them is a BLOCK, not type, which is exactly how a wireframe reads.
   There is no legible text anywhere in either of them.

   ⭐ `rough` 0..1 is how FINISHED it is. At 0 it is a grey wireframe with no
   colour and no image; at 1 it is a lit, coloured, populated product. The same
   component therefore carries the reel's whole "prototype -> polished" arc, and
   S12's crude one is visibly the S13 one before the loop ran.
   ====================================================================== */
export const AppWin: React.FC<{ x: number; y: number; w?: number; z?: number; f?: number;
  rough?: number; hue?: string; tilt?: number; s?: number }> =
  ({ x, y, w: ww = 210, z = 60, f = 0, rough = 1, hue = NEON, tilt = 0, s = 1 }) => {
  const W_ = ww * s, H_ = ww * 0.72 * s;
  const r = Math.max(0, Math.min(1, rough));
  const ink = (k: number) => (r < 0.5 ? dkh("#8C99A4", k) : dkh(hue, k));
  return (
    <div style={{ position: "absolute", left: x, top: y, width: W_, height: H_, zIndex: z,
      transform: `rotate(${tilt}deg)` }}>
      {/* the chassis + title bar with three real dots */}
      <div style={{ position: "absolute", inset: 0, borderRadius: W_ * 0.045,
        background: r < 0.5 ? "#C9D2D8" : "#F6F3EC",
        border: `${Math.max(2, W_ * 0.016)}px solid ${r < 0.5 ? "#8894A0" : dkh(hue, 0.42)}` }} />
      <div style={{ position: "absolute", left: 0, top: 0, width: W_, height: H_ * 0.16,
        borderRadius: `${W_ * 0.045}px ${W_ * 0.045}px 0 0`,
        background: r < 0.5 ? "#A8B4BE" : dkh(hue, 0.30) }} />
      {[0, 1, 2].map((i) => (
        <div key={"dt" + i} style={{ position: "absolute", left: W_ * (0.05 + i * 0.055),
          top: H_ * 0.055, width: W_ * 0.033, height: W_ * 0.033, borderRadius: "50%",
          background: r < 0.5 ? "#7C8894" : ["#E5695C", "#E9B84C", "#5CB87F"][i] }} />
      ))}
      {/* the sidebar */}
      <div style={{ position: "absolute", left: 0, top: H_ * 0.16, width: W_ * 0.22,
        height: H_ * 0.84, borderRadius: `0 0 0 ${W_ * 0.045}px`,
        background: r < 0.5 ? "#B6C0C9" : dkh(hue, 0.16) }} />
      {[0, 1, 2, 3].map((i) => (
        <div key={"sb" + i} style={{ position: "absolute", left: W_ * 0.045,
          top: H_ * (0.26 + i * 0.15), width: W_ * 0.13, height: H_ * 0.065, borderRadius: 3,
          background: hexa("#FFFFFF", r < 0.5 ? 0.34 : 0.62) }} />
      ))}
      {/* the hero panel — an IMAGE when finished, a crossed grey box when not */}
      <div style={{ position: "absolute", left: W_ * 0.27, top: H_ * 0.24, width: W_ * 0.66,
        height: H_ * 0.34, borderRadius: 4,
        background: r < 0.5 ? "#AEB9C2"
          : `linear-gradient(140deg, ${mxh(hue, 0.3)} 0%, ${dkh(hue, 0.2)} 100%)` }}>
        {r < 0.5 && (<>
          <div style={{ position: "absolute", left: 0, top: "50%", width: "100%", height: 2,
            background: "#8894A0", transform: "rotate(24deg)" }} />
          <div style={{ position: "absolute", left: 0, top: "50%", width: "100%", height: 2,
            background: "#8894A0", transform: "rotate(-24deg)" }} />
        </>)}
      </div>
      {/* content rows — BLOCKS, never type */}
      {[0, 1, 2].map((i) => (
        <div key={"rw" + i} style={{ position: "absolute", left: W_ * 0.27,
          top: H_ * (0.64 + i * 0.10), width: W_ * (0.62 - i * 0.13), height: H_ * 0.055,
          borderRadius: 3, background: ink(0.34) }} />
      ))}
      {/* the one live element — a button that PULSES once it is finished */}
      <div style={{ position: "absolute", left: W_ * 0.72, top: H_ * 0.79, width: W_ * 0.2,
        height: H_ * 0.12, borderRadius: 4,
        background: r < 0.5 ? "#9AA6B0"
          : mxh(hue, 0.2 + 0.12 * Math.sin(f / 7)) }} />
    </div>
  );
};

/** a WEB PAGE — taller, a nav bar, a hero band and a card grid. Same `rough`
    contract as `AppWin` so the two read as one family. */
export const SitePage: React.FC<{ x: number; y: number; w?: number; z?: number; f?: number;
  rough?: number; hue?: string; tilt?: number; s?: number }> =
  ({ x, y, w: ww = 168, z = 60, f = 0, rough = 1, hue = TOKEN, tilt = 0, s = 1 }) => {
  const W_ = ww * s, H_ = ww * 1.28 * s;
  const r = Math.max(0, Math.min(1, rough));
  return (
    <div style={{ position: "absolute", left: x, top: y, width: W_, height: H_, zIndex: z,
      transform: `rotate(${tilt}deg)` }}>
      <div style={{ position: "absolute", inset: 0, borderRadius: W_ * 0.045,
        background: r < 0.5 ? "#C9D2D8" : "#FAF7F1",
        border: `${Math.max(2, W_ * 0.018)}px solid ${r < 0.5 ? "#8894A0" : dkh(hue, 0.4)}` }} />
      {/* nav bar + three links */}
      <div style={{ position: "absolute", left: 0, top: 0, width: W_, height: H_ * 0.09,
        borderRadius: `${W_ * 0.045}px ${W_ * 0.045}px 0 0`,
        background: r < 0.5 ? "#A8B4BE" : dkh(hue, 0.26) }} />
      {[0, 1, 2].map((i) => (
        <div key={"nv" + i} style={{ position: "absolute", left: W_ * (0.52 + i * 0.15),
          top: H_ * 0.032, width: W_ * 0.10, height: H_ * 0.026, borderRadius: 2,
          background: hexa("#FFFFFF", 0.6) }} />
      ))}
      {/* the hero band */}
      <div style={{ position: "absolute", left: W_ * 0.07, top: H_ * 0.14, width: W_ * 0.86,
        height: H_ * 0.26, borderRadius: 4,
        background: r < 0.5 ? "#AEB9C2"
          : `linear-gradient(140deg, ${mxh(hue, 0.32)} 0%, ${dkh(hue, 0.22)} 100%)` }} />
      <div style={{ position: "absolute", left: W_ * 0.07, top: H_ * 0.44, width: W_ * 0.62,
        height: H_ * 0.035, borderRadius: 3, background: r < 0.5 ? "#9AA6B0" : dkh(hue, 0.36) }} />
      {/* the card grid — six of them, the shape of every landing page there is */}
      {Array.from({ length: 6 }, (_, i) => (
        <div key={"cd" + i} style={{ position: "absolute",
          left: W_ * (0.07 + (i % 3) * 0.30), top: H_ * (0.53 + Math.floor(i / 3) * 0.20),
          width: W_ * 0.25, height: H_ * 0.16, borderRadius: 3,
          background: r < 0.5 ? "#B6C0C9" : hexa(mxh(hue, 0.2), 0.55 + (i % 3) * 0.14) }} />
      ))}
      <div style={{ position: "absolute", left: W_ * 0.07, top: H_ * 0.90, width: W_ * 0.34,
        height: H_ * 0.055, borderRadius: 3,
        background: r < 0.5 ? "#9AA6B0" : mxh(hue, 0.2 + 0.12 * Math.sin(f / 7)) }} />
    </div>
  );
};

/* =========================================================================
   THE BRIEF — what "you give Claude a task" actually looks like.

   ⛔⛔ ALEX: *"when you say 'when you give it a task' or something like that you
   have to make it more like SHOWING something for that."* S5 was labelling the
   beat — a pill with the words THE TASK on it — which is `feedback_graphical_
   over_textual` exactly: type is READ, graphics are WATCHED, and on a muted feed
   a caption saying "task" communicates nothing a viewer can see.

   ⭐ A task is not a word, it is A THING SOMEBODY IS ASKED TO MAKE. So the brief
   is a board carrying the TARGET: a blueprint of the very app the party is
   about to build, drawn as the same `AppWin` at `rough=0`, with corner marks
   and a spec strip of BLOCKS under it. Hand a viewer that and "give it a task"
   needs no caption — you can see what has been asked for, and you recognise it
   again when they build it two scenes later.
   ====================================================================== */
export const Brief: React.FC<{ p: Place; x: number; y: number; s?: number; z?: number;
  f: number; open?: number }> = ({ p, x, y, s = 1, z = 64, f, open = 1 }) => {
  const P = (v: number) => v * s;
  const k = Math.max(0, Math.min(1, open));
  return (
    <div style={{ position: "absolute", left: x, top: y, width: P(400), height: P(320), zIndex: z }}>
      {/* the board it is pinned to, with a lit rim and four corner bolts */}
      <div style={{ position: "absolute", inset: 0, borderRadius: P(8),
        background: `linear-gradient(172deg, ${dkh(p.back2, 0.24)} 0%, ${dkh(p.back2, 0.5)} 100%)`,
        border: `${P(7)}px solid ${dkh(p.back2, 0.14)}` }} />
      <div style={{ position: "absolute", left: P(12), top: P(12), right: P(12), height: P(6),
        background: hexa(NEON, 0.4 + k * 0.5) }} />
      {[[14, 14], [14, 1], [1, 14], [1, 1]].map((c, i) => (
        <div key={"bo" + i} style={{ position: "absolute",
          left: c[0] === 14 ? P(18) : P(368), top: c[1] === 14 ? P(18) : P(288),
          width: P(14), height: P(14), borderRadius: "50%", background: mxh(p.back2, 0.06) }} />
      ))}
      {/* ⭐ THE TARGET — the app they are being asked to build, as a blueprint */}
      <div style={{ position: "absolute", left: P(46), top: P(48), opacity: k }}>
        <AppWin x={0} y={0} w={P(308)} z={z + 2} f={f} rough={0} tilt={0} />
      </div>
      {/* corner marks around it, the way a spec crops its subject */}
      {[[36, 38], [36, 1], [1, 38], [1, 1]].map((c, i) => (
        <div key={"cm" + i} style={{ position: "absolute",
          left: c[0] === 36 ? P(36) : P(330), top: c[1] === 38 ? P(38) : P(232),
          width: P(34), height: P(34), opacity: 0.8 * k,
          borderTop: c[1] === 38 ? `${P(5)}px solid ${hexa(NEON, 0.9)}` : undefined,
          borderBottom: c[1] !== 38 ? `${P(5)}px solid ${hexa(NEON, 0.9)}` : undefined,
          borderLeft: c[0] === 36 ? `${P(5)}px solid ${hexa(NEON, 0.9)}` : undefined,
          borderRight: c[0] !== 36 ? `${P(5)}px solid ${hexa(NEON, 0.9)}` : undefined }} />
      ))}
      {/* the spec strip — BLOCKS, never type. Three requirements, ticked. */}
      {[0, 1, 2].map((i) => (
        <div key={"sp" + i} style={{ position: "absolute", left: P(46), top: P(258 + i * 0),
          width: P(308), height: P(18), display: "flex", alignItems: "center", gap: P(8),
          opacity: k, transform: `translateX(${i * P(0)}px)` }}>
        </div>
      ))}
      <div style={{ position: "absolute", left: P(46), top: P(256), width: P(308), height: P(46),
        opacity: k }}>
        {[0, 1, 2].map((i) => (
          <React.Fragment key={"rq" + i}>
            <div style={{ position: "absolute", left: P(i * 104), top: P(6), width: P(16),
              height: P(16), borderRadius: P(3), background: mxh(PERFECT, 0.2) }} />
            <div style={{ position: "absolute", left: P(i * 104 + 24), top: P(10), width: P(66),
              height: P(9), borderRadius: P(4), background: hexa("#FFFFFF", 0.44) }} />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
