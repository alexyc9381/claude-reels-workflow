import React from "react";
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
   REEL 124 · "MEM" — THE WORLD KIT.  Board: storyboards/124-mem.md.

   Subject: Anthropic's 2026-08-25 memory update. Claude now writes what it
   learns into individual FILES, grouped under TOPICS in Memory settings, while
   you are still talking — and you can read, edit or delete any of them.

   ⛔⛔ THE WORLD IS "THE MEMORY WORKS" AND IT IS A PLANT, NOT A LIBRARY.
      Nothing here is browsed; everything here is MADE, continuously, while the
      hero is mid-sentence. That distinction is the whole subject: the news is
      not that Claude has storage, it is that the writing happens DURING the
      conversation instead of as a summary afterwards. A library would have said
      the opposite thing. (It would also have repeated reel 112 THE STACKS.)

   ⛔⛔ THE VILLAIN IS `THE GAP` AND IT IS NEVER BEATEN.
      The black slot between one chat and the next. It eats the details at S3,
      wins again at S4, gets PLATED OVER at S5 — floored, not killed — and it
      re-opens under the severed local line at S14 and wins there. The reel's
      opening problem is its closing caveat, in the same physical object.

   ⛔⛔ THE HONESTY LEDGER IS IN THIS FILE AND NOWHERE ELSE (`R` below).
      Checked live 2026-08-27 against Anthropic's own post. If a figure is not
      in `R` it does not go on screen.
   ⛔ THE VO SAYS "FOR ALL USERS" AND THE FRAME MUST NOT — Team/Enterprise is
      admin-controlled and defaults OFF. `R.plans` is what gets stamped.
   ⛔ MATTE ONLY. No `boxShadow: 0 0 Npx` anywhere.
   ⛔ `dark()`/`mix()` are hex-in/rgb-out and DO NOT NEST. Use dkh/mxh.
   ⛔ `Scene` push walks content off-frame: keep `left >= 506 - 486/push`.
   ⛔ A transformed wrapper with NO zIndex VANISHES. Use `Cam`.
   ⛔ `Mascot`'s drawn body is ~100% of `size`, NOT 70%. Pitch >= 0.85 * size.
   ⛔ THE 40px FLOOR APPLIES TO MOVING OBJECTS TOO (really "survives the audit's
      1012->240 downsample", i.e. a 52px object is 12px when differenced).
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

/** ⭐ THE BRAIN PINK. Asked for directly (Alex: *"it should actually be pink
    like an actual brain"*). A real brain is a warm grey-pink, not a fuchsia, so
    this is the house `PINK` (#E27BA0) pulled toward bone until it sits inside
    the matte palette — `feedback_reel_matte_palette` is standing and bans neon
    house-wide. `BRAIND` is its sulcus, dark enough that a groove reads as a
    groove and not as a line drawn on a flat shape. */
export const BRAIN = "#F2939F", BRAIND = "#8A4150";

/* ---- THE LEDGER ----------------------------------------------------------
   Every word and figure the picture is allowed to assert, and where it came
   from. Source: Anthropic, "Claude's memory works everywhere, and you decide
   what's in it", 2026-08-25. Verified 2026-08-27. */
export const R = {
  /** the announcement date — the only date on screen */
  date: "AUG 25 2026",
  /** the literal name of the settings section the files live under */
  section: "TOPICS",
  /** ⛔ NOT "ALL USERS". Memory is on by default on these three consumer plans;
      Team/Enterprise is admin-controlled and defaults OFF for individuals. */
  plans: "FREE · PRO · MAX",
  /** the three surfaces, verbatim from the post */
  surfaces: ["BROWSER", "DESKTOP", "MOBILE"] as const,
  /** the three controls the post names: "read, edit, or delete each one" */
  controls: ["READ", "EDIT", "DELETE"] as const,
  /** ⭐ THE MECHANISM, and the actual change. Verbatim: Claude "adds topics to
      memory as you chat, instead of summarizing conversations after they end." */
  live: "WRITES WHILE YOU TALK",
  /** the topic labels on the wall. Generic subject headings only — ⛔ nothing
      here may look like a real person's data, and the post explicitly excludes
      health / race / ethnicity / religion / politics / gender identity by
      default, so none of those appear. */
  topics: ["PROJECTS", "PREFERENCES", "TOOLS", "WRITING", "STACK",
           "CLIENTS", "GOALS", "STYLE", "REPOS"] as const,
  /** the two intake chutes — the nouns in the S1 line */
  intake: ["PROJECTS", "PREFERENCES"] as const,
  /** ⭐ ONE COLOUR PER TOPIC, asked for directly (Alex: *"each category must be
      diff color books"*). It is also better information design than nine ranks
      of identical cream: colour is the fastest thing the eye sorts by, so a
      wall of nine colours reads as NINE CATEGORIES in a single glance, where
      nine cream ranks read as "a lot of paper". ⛔ Every one is a house paint
      already in the palette — no new hues enter the reel through this. */
  topicColour: ["#D97757", "#E7B24C", "#3F9E74", "#7FC0C9", "#8B72B0",
                "#C44A3A", "#5AA0DE", "#C9A15A", "#8C4A2E"] as const,
  /** the catch, in the post's own terms: Cowork tasks run in the cloud with
      access to chat memory; a task that needs LOCAL files runs on your machine */
  cloud: "CLOUD",
  local: "LOCAL",
  keyword: "MEM",
} as const;

/** ⛔ greppable guards — these must return ZERO rendered hits. The first is the
    claim the VO makes and the frame may not; the others are claims no source
    backs. */
export const USERS_BANNED = ["ALL USERS", "EVERY USER", "EVERYONE", "UNLIMITED"] as const;
export const PRIV_BANNED = ["HEALTH", "RELIGION", "POLITICS", "ETHNICITY", "GENDER"] as const;
export const PERF_BANNED = ["X FASTER", "BENCHMARK", "SOTA", "BEATS", "#1"] as const;

/* ---- THE TEN PLACES ------------------------------------------------------
   ⛔ NEIGHBOURING SCENES DIFFER BY BOTH HUE **AND** LIGHTNESS. Visit order is
   floor -> line -> line' -> bench -> bench' -> press -> wall -> wall' -> wall''
   -> feeds -> feeds' -> gear -> stop -> shed -> shed' -> gate, which alternates
   cold/warm and dark/bright on every cut.
   ⛔ BODY SCENES TARGET LUMA 70-105 AND BLACK POINT p10 <= 35. The >=140 bar is
   FRAME 0 ONLY, and `floor` is the only place built for it. */
export const PLACES: Record<string, Place> = {
  /* 1 · THE EMPTY FLOOR — frame 0 lives here, so it is built for >=140: a bone
     back wall, a hard cold key and a lit disc on the ground. The violet is in
     the KEY and the crate, never in the shading — hierarchy comes from the
     value SPREAD between a lit bone wall and a near-black crate, which is the
     one way brightness and hierarchy do not fight. */
  /* ⛔ REBUILT AFTER THE FIRST HOOK STILLS. v1 was a lilac-grey wall of pale
     boxes: luma 153 (fine) but only 10.1% saturated pixels and no value spread
     in the set itself, i.e. exactly reel 96-105's "an object on a flat wall".
     Bone plaster + a BRASS rack skeleton + a warm floor gives the hook a real
     ground to be lit against, and the near-black crate on top of it is where
     the reel's biggest value SPREAD comes from. Brightness is the MEAN;
     hierarchy is the SPREAD — and no dark stop was lifted to get either. */
  floor:  { back: "#96866C", back2: "#F8F3E6", floor: "#CBB388", floor2: "#947D58",
            lip: "#33281A", key: "#FFEEC4", horizon: 452, grit: "#241B10" },
  /* 2 · THE INTAKE LINE — teal, low raking light, the belt is the only bright
     thing. First body set, and the biggest lightness drop in the reel. */
  line:   { back: "#0E2630", back2: "#2C5A68", floor: "#1C3E4A", floor2: "#0C1E26",
            lip: "#041016", key: "#7FD4E4", horizon: 500, grit: "#06121A" },
  /* 3 · THE CROSSING — the same line, wider and colder, so the rail reads as a
     span rather than a belt. A returning set is a callback only if the LIGHT
     changed. */
  cross:  { back: "#101C2E", back2: "#2E4468", floor: "#1E2C46", floor2: "#0C1424",
            lip: "#040A12", key: "#9EC0F0", horizon: 528, grit: "#060C16" },
  /* 4 · THE OLD BENCH — cold slate, one dying lamp, and the only pure black in
     the reel is the GAP in its floor. */
  bench:  { back: "#333B44", back2: "#7A8794", floor: "#4A535E", floor2: "#252B33",
            lip: "#0A0E12", key: "#DCE6F2", horizon: 500, grit: "#0A0D11" },
  /* 5 · THE PRESS — brass and hot sodium, the only warm set before the wall.
     Follows `bench` for the biggest warm/cold jump in the body. */
  press:  { back: "#2C1A08", back2: "#8A5A18", floor: "#7A5620", floor2: "#241704",
            lip: "#0C0702", key: "#FFC85E", horizon: 486, grit: "#0C0702" },
  /* 6 · THE TOPIC WALL — cream-lit and the BRIGHTEST body set in the reel. This
     is the payoff section and it is allowed to be bright; the value spread is
     kept by the near-black bay mouths behind the files. */
  wall:   { back: "#A9A091", back2: "#F4F0E6", floor: "#C4B79E", floor2: "#6E6248",
            lip: "#1C1810", key: "#FFF2CE", horizon: 492, grit: "#120E08" },
  /* 7 · THE BURN BAY — the same wall, re-lit hard and low, so the empty slot is
     the brightest thing left. */
  burn:   { back: "#3A2A20", back2: "#7E5A3E", floor: "#6A4E36", floor2: "#1E1410",
            lip: "#0C0705", key: "#FFB06A", horizon: 500, grit: "#0A0604" },
  /* 8 · THE THREE OUTLETS — DUSK, not daylight. Measured per scene, this set
     was carrying a p10 of 70 across two scenes and dragging the whole reel's
     black point over the bar on its own. It is also better hierarchy: the three
     lit SCREENS are the subject, and a screen only reads as lit if the room
     around it is not. Nothing bright was dimmed — the sky went to dusk and the
     screens stayed exactly where they were. */
  feeds:  { back: "#1C2C4A", back2: "#6E86AE", floor: "#39445A", floor2: "#161B26",
            lip: "#070A10", key: "#FFFFFF", horizon: 470, grit: "#070A10" },
  /* 8b · THE READING DESK — dark, one lamp, and it exists for TWO reasons that
     turn out to be the same reason. S7 was staged on the lit `wall` set, which
     meant a cream file held up against a cream wall: p10 105, the highest in
     the reel, AND no silhouette at all. "Light on light" is the answer to
     *"I can't tell what that is"* more often than shape ever is, so the file
     now comes to a dark bench under one lamp and is the only lit thing in the
     frame. It also stops S6/S7/S8 all being the same wall three times, which
     is how half a reel becomes one rectangle. */
  desk:   { back: "#171A20", back2: "#3E4756", floor: "#2A3038", floor2: "#101319",
            lip: "#06080B", key: "#FFEBC0", horizon: 516, grit: "#06080A" },
  /* 9 · THE WORKS AT FULL GEAR — gold, hot, everything running. */
  gear:   { back: "#3A2606", back2: "#A87A18", floor: "#9A7420", floor2: "#281C04",
            lip: "#0E0802", key: "#FFD470", horizon: 480, grit: "#0E0902" },
  /* 10 · THE STOP — the only red in the reel, and everything but the barrier is
     killed. */
  /* ⛔ THE ROOM WAS RED AND SO WAS THE BARRIER, so the peak of the reel was one
     flat colour edge to edge. A red gate only reads as an alarm if the room it
     drops into is NOT already alarmed: the set is now cold slate and the
     barrier is the only red thing in the frame, which is what makes it the
     loudest object rather than the only object. */
  stop:   { back: "#1A2028", back2: "#4A545E", floor: "#252B32", floor2: "#0C1015",
            lip: "#05070A", key: "#FF5236", horizon: 512, grit: "#05070A" },
  /* 11 · THE SHED — dead slate under a bright sky feed. The two-lane scene lives
     here and the whole point is that the top half and the bottom half are lit
     differently inside ONE frame. */
  shed:   { back: "#20325A", back2: "#7E96BC", floor: "#333A44", floor2: "#12161B",
            lip: "#070A0D", key: "#FFF6E2", horizon: 430, grit: "#070A0D" },
  /* 12 · THE GATE — clay and gold, warm, the last frame. */
  gate:   { back: "#2E1A12", back2: "#8A4A28", floor: "#6E4224", floor2: "#22140A",
            lip: "#0E0703", key: "#FFC27A", horizon: 496, grit: "#0C0603" },
};
export const asPlace = (k: keyof typeof PLACES): Place => PLACES[k];

/* =========================================================================
   THE ONE ATMOSPHERE PIECE THIS WORLD NEEDS THAT THE KIT DOES NOT HAVE
   ====================================================================== */

/** ⭐⭐⭐ THE GAP — the villain, drawn.
    It is the only pure black in the reel and it has to read WHILE IT IS EMPTY,
    because empty is the whole threat (an empty container that reads as a patch
    of wall is the standing defect). So it is given a bright cream LIP on the
    near side, a hard value step at its mouth, and a slow cold updraught out of
    it — you can see there is nothing down there.
    `plate` 0..1 swings the steel floor across it at S5. ⛔ It is FLOORED, never
    removed: at S14 the same component comes back with `plate = 0`. */
export const Gap: React.FC<{ x: number; y: number; w: number; f: number; z?: number;
  plate?: number; lip?: string; depth?: number }> =
  ({ x, y, w: ww, f, z = 44, plate = 0, lip = "#E8E1CE", depth = 250 }) => {
  const k = Math.max(0, Math.min(1, plate));
  return (
    <>
      {/* the mouth — a hard step from a lit lip into nothing */}
      <div style={{ position: "absolute", left: x, top: y, width: ww, height: depth, zIndex: z,
        overflow: "hidden",
        background: `linear-gradient(180deg, #05060A 0%, #000000 34%, #000000 100%)` }}>
        {/* the far wall of the shaft, just visible, so it has a bottom you cannot see */}
        <div style={{ position: "absolute", left: ww * 0.06, top: 0, width: ww * 0.88, height: 26,
          background: `linear-gradient(180deg, ${hexa("#1E2630", 0.9)} 0%, ${hexa("#05070A", 0)} 100%)` }} />
        {/* the cold updraught: four slow columns, wide enough to survive the
            1012->240 downsample (56px), so the hole is never a still black box */}
        {Array.from({ length: 4 }, (_, i) => {
          const t = ((f * 0.011 + i * 0.25) % 1);
          return (
            <div key={"up" + i} style={{ position: "absolute",
              left: ww * (0.08 + i * 0.23), top: depth * (1 - t) - 40,
              width: ww * 0.17, height: 84, borderRadius: "50%",
              opacity: (1 - t) * 0.30 * (1 - k), filter: "blur(13px)",
              background: `radial-gradient(50% 50% at 50% 50%, ${hexa("#7E90A8", 0.8)} 0%, ${hexa("#7E90A8", 0)} 100%)` }} />
          );
        })}
      </div>
      {/* ⭐⭐ THE LIP, AND IT TOOK FOUR ROUNDS TO GET RIGHT. A 17px cream bar was
          not enough: on a dark floor the mouth kept reading as "the corner is
          dark" rather than as a hole, and three successive value fixes (a
          brighter bar, an inner chamfer, a pool of light on the floor) all
          failed the same way. A hole in a flat-lit diorama does not read from
          VALUE — it reads from the thing a real open floor hatch actually has:
          a HAZARD-MARKED EDGE. It is on-topic for a works, it is the brightest
          object in the scene, and it says "there is no floor past this line"
          with no narration at all.
          ⛔ AND THE THREE FAILED ATTEMPTS BEFORE IT WERE WRITTEN INTO THE WRONG
          FILE. `Gap` lives here, in MemWorld; the patches were applied to
          MemProps and reported success because a string-replace that finds
          nothing is silent. Grep for the new text before believing an edit
          landed — that is the same class as the phantom component rename. */}
      <div style={{ position: "absolute", left: x - 16, top: y - 30, width: ww + 32, height: 30,
        zIndex: z + 1, borderRadius: 2,
        background: `linear-gradient(180deg, ${mxh(lip, 0.40)} 0%, ${mxh(lip, 0.04)} 58%, ${dkh(lip, 0.28)} 100%)` }} />
      <div style={{ position: "absolute", left: x - 16, top: y - 30, width: ww + 32, height: 16,
        zIndex: z + 2, overflow: "hidden", background: "#E7B24C" }}>
        {Array.from({ length: Math.ceil((ww + 64) / 26) }, (_, i) => (
          <div key={"hz" + i} style={{ position: "absolute", left: -24 + i * 26, top: -6,
            width: 13, height: 28, transform: "skewX(-28deg)", background: "#1A1813" }} />
        ))}
      </div>
      {/* the hard shadow the near edge throws DOWN into the mouth */}
      <div style={{ position: "absolute", left: x, top: y, width: ww, height: 40, zIndex: z + 1,
        background: `linear-gradient(180deg, ${hexa("#000000", 0.9)} 0%, ${hexa("#000000", 0)} 100%)` }} />
      {/* the two side walls, catching a sliver of light, so it has DEPTH */}
      {[0, 1].map(sd => (
        <div key={"gw" + sd} style={{ position: "absolute", left: x + (sd ? ww - 14 : 0), top: y,
          width: 14, height: depth * 0.46, zIndex: z + 1,
          background: `linear-gradient(180deg, ${hexa(lip, 0.34)} 0%, ${hexa(lip, 0)} 100%)` }} />
      ))}
      {/* ⭐ THE FLOOR SWINGING ACROSS — steel plates that arrive from both sides
          and BOLT DOWN. The villain is covered, which is not the same as gone. */}
      {k > 0.001 && [0, 1].map(sd => (
        <div key={"pl" + sd} style={{ position: "absolute",
          left: x + (sd ? ww / 2 : 0) + (sd ? 1 : -1) * (1 - k) * ww * 0.62,
          top: y - 32, width: ww / 2 + 6, height: 46, zIndex: z + 4,
          background: `linear-gradient(180deg, ${mxh(STEEL, 0.22)} 0%, ${dkh(STEEL, 0.40)} 100%)`,
          borderTop: `3px solid ${mxh(STEEL, 0.42)}` }}>
          {[0.22, 0.78].map((bx, i) => (
            <div key={i} style={{ position: "absolute", left: `${bx * 100}%`, top: 8,
              width: 13, height: 13, borderRadius: "50%", background: dkh(STEEL, 0.52),
              transform: `scale(${E(k, 0.72, 1, 0, 1, BACK)})` }} />
          ))}
        </div>
      ))}
    </>
  );
};

/** the works' background process: an overhead file rail. Every reel scene has
    exactly one thing running that nobody is looking at.
    ⛔ It is a RUN OF REAL OBJECTS, not a stripe generator — reel 112 multiplied
    its rakes by 2.6, passed every gate and shipped venetian blinds. */
export const FileRail: React.FC<{ y: number; f: number; z?: number; rate?: number;
  pitch?: number; c?: string; s?: number; hang?: number }> =
  ({ y, f, z = 30, rate = 6.4, pitch = 196, c = CREAMB, s = 1, hang = 40 }) => {
  const span = pitch * Math.ceil((W + pitch * 2) / pitch);
  return (
    <>
      {/* the rail itself */}
      <div style={{ position: "absolute", left: -30, top: y, width: W + 60, height: 11, zIndex: z,
        background: `linear-gradient(180deg, ${mxh(STEEL, 0.16)} 0%, ${dkh(STEEL, 0.46)} 100%)` }} />
      {Array.from({ length: Math.ceil(span / pitch) }, (_, i) => {
        const x = (((i * pitch - f * rate) % span) + span) % span - pitch;
        const sw = Math.sin(f / 15 + i * 1.4) * 3.2;
        return (
          <div key={"fr" + i} style={{ position: "absolute", left: x, top: y + 8, zIndex: z + 1,
            transformOrigin: "50% 0%", transform: `rotate(${sw}deg)` }}>
            <div style={{ width: 5, height: hang, marginLeft: 46 * s, background: dkh(STEEL, 0.30) }} />
            {/* a real folder, not a rectangle: a tab, a body, a banded edge */}
            <div style={{ position: "absolute", left: 22 * s, top: hang, width: 52 * s, height: 12 * s,
              borderRadius: `${4 * s}px ${4 * s}px 0 0`, background: dkh(c, 0.12) }} />
            <div style={{ position: "absolute", left: 8 * s, top: hang + 10 * s, width: 96 * s,
              height: 62 * s, borderRadius: 4 * s, background: c,
              borderLeft: `${5 * s}px solid ${dkh(c, 0.26)}`, boxShadow: SH_D }}>
              {[0, 1, 2].map(k => (
                <div key={k} style={{ position: "absolute", left: 15 * s, top: (14 + k * 14) * s,
                  width: (60 - k * 16) * s, height: 4 * s, borderRadius: 2,
                  background: hexa(INK, 0.30) }} />
              ))}
            </div>
          </div>
        );
      })}
    </>
  );
};
