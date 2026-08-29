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
   REEL 125 · "AUTO" — THE WORLD KIT.  Board: storyboards/125-auto.md.

   Subject: github.com/enescingoz/awesome-n8n-templates — 350 ready-made n8n
   workflow JSONs across 19 categories. You import one file and it runs; the
   alternative is wiring the same automation yourself, node by node.

   ⛔⛔ THE WORLD IS "THE EXCHANGE" AND THE REASON IS MECHANICAL, NOT DECORATIVE.
      A manual telephone patch field IS a node graph: an operator pushing a cord
      from one jack into another and hoping the route holds is, physically, what
      building an n8n workflow by hand is. So the metaphor is not a costume over
      the subject — it is the same object drawn in brass. It also hands the reel
      its villain (the bench where you do it yourself) and its payoff (a wall
      where somebody already did it 350 times) in one set.

   ⛔⛔ THE VILLAIN IS `THE BENCH` AND IT IS NEVER BEATEN.
      Its RULE: nothing leaves the bench finished. Planted at S0 with the hero
      losing to ONE cord, abandoned at S7 (he puts the pliers down — it is
      walked away from, not destroyed), and it WINS at S10 over a whole hall of
      operators still at theirs. Nothing is ever smashed.

   ⛔⛔ THE HONESTY LEDGER IS IN THIS FILE AND NOWHERE ELSE (`R` below).
      Counted live 2026-08-28 off the GitHub API and the repo tree. If a figure
      is not in `R` it does not go on screen.
   ⛔ THE VO SAYS "OVER 30,000 STARS" AND THE FRAME MUST NOT — the live count is
      24,983. `R.stars` is what gets plated, big and early.
   ⛔ THE VO SAYS "STRIPE" AND THERE ARE ZERO STRIPE TEMPLATES IN THE REPO. Four
      marks land on their own spoken words; on "Stripe" the rank RECEDES instead
      of showing a fifth, which is also the better beat because it hands
      straight into "over 18 categories in total".
   ⛔ MATTE ONLY. No `boxShadow: 0 0 Npx` anywhere.
   ⛔ `dark()`/`mix()` are hex-in/rgb-out and DO NOT NEST. Use dkh/mxh.
   ⛔ `Scene` push walks content off-frame: keep `left >= 506 - 486/push`.
   ⛔ A transformed wrapper with NO zIndex VANISHES. Use `Cam`.
   ⛔ `Mascot`'s drawn body is ~100% of `size`, NOT 70%. Pitch >= 0.85 * size.
   ⛔ THE 40px FLOOR APPLIES TO MOVING OBJECTS TOO (really "survives the audit's
      1012->240 downsample", i.e. a 52px object is 12px when differenced).
   ⛔ `E` CLAMPS: an entrance that ends at 1 returns 1 for ever. Anything that
      should LEAVE needs its own clock; anything that should REPEAT must return.
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

/** ⭐ THE EXCHANGE'S OWN TWO PAINTS. `JADE` is the only green in the reel and it
    exists for exactly one beat — S9, the moment a card goes live. A colour used
    once is a colour that means something. `BAKE` is bakelite: the near-black
    the jack field is built out of, dark enough that a lit lamp on it is a real
    value step and not a tint. */
export const JADE = "#3FA982", BAKE = "#191C1E";

/* ---- THE LEDGER ----------------------------------------------------------
   Source: github.com/enescingoz/awesome-n8n-templates, read via the GitHub API
   (`/repos/...` for stars) and the full recursive repo tree (for the file and
   directory counts). Verified 2026-08-28, before a frame was drawn. */
export const R = {
  /** ⛔ THE REAL STARGAZER COUNT. The VO says "over 30,000"; this is what the
      plate carries. When a VO asserts a result you cannot source, you dramatise
      the mechanism and stop at the edge of the claim. */
  stars: "★24,983",
  /** counted: 350 `.json` workflow files in the tree. The repo's own README
      advertises "280+", so 350 is the honest number AND the higher one. */
  workflows: "350",
  workflowsN: 350,
  /** counted: 19 content directories (the 22 top-level dirs less `.github`,
      `docs` and `img`). The VO says "over 18", which this backs. */
  categories: "19",
  categoriesN: 19,
  /** the repo, spelled the way a viewer would search for it */
  repo: "AWESOME-N8N-TEMPLATES",
  /** ⭐ THE FOUR MARKS THAT ARE REAL, with their real per-directory counts, in
      the order the VO says them. Each lands on its own measured word onset. */
  marks: [
    { id: "gmail",    name: "GMAIL",    n: 26, tile: "#FFFFFF", face: "#F0E4D4" },
    { id: "slack",    name: "SLACK",    n: 9,  tile: "#FFFFFF", face: "#DCD8EA" },
    { id: "whatsapp", name: "WHATSAPP", n: 8,  tile: "#FFFFFF", face: "#D8E8D8" },
    { id: "youtube",  name: "YOUTUBE",  n: 8,  tile: "#FFFFFF", face: "#F2D6D2" },
  ] as const,
  /** the bank labels on the wall — every one a real directory in the repo, and
      the count beside it is that directory's real file count */
  banks: [
    { t: "OPENAI · LLMS", n: 92 }, { t: "OTHER INTEGRATIONS", n: 45 },
    { t: "AI RESEARCH · RAG", n: 44 }, { t: "GMAIL · EMAIL", n: 26 },
    { t: "TELEGRAM", n: 26 }, { t: "DRIVE · SHEETS", n: 21 },
    { t: "PDF · DOCUMENTS", n: 18 }, { t: "SOCIAL", n: 15 },
    { t: "NOTION", n: 10 }, { t: "SLACK", n: 9 }, { t: "WHATSAPP", n: 8 },
    { t: "WORDPRESS", n: 6 }, { t: "DEVOPS", n: 6 }, { t: "AIRTABLE", n: 5 },
    { t: "DATABASE", n: 5 }, { t: "DISCORD", n: 4 }, { t: "FORMS", n: 4 },
    { t: "HR · RECRUITING", n: 4 }, { t: "OTHER", n: 1 },
  ] as const,
  /** ⭐⭐⭐ THE ROSTER — every mark that goes on screen anywhere in this reel, and
      the number of times that app is actually named in the repo's 350 workflow
      filenames. ⛔ EVERY ONE WAS GREPPED AGAINST THE REPO TREE BEFORE IT WAS
      DRAWN, because a wrong mark is worse than no mark. The following were
      considered and REJECTED for having zero mentions: mysql, shopify, jira,
      cloudflare, figma, zapier, make, stripe. Stripe is in the VO and is still
      not on screen.
      ⭐ Ordered by real weight, so the board fills with the biggest first — the
      arrival order is itself a true statement about the repo. */
  roster: [
    { id: "googlesheets",   n: 54 }, { id: "telegram",     n: 53 },
    { id: "gmail",          n: 35 }, { id: "googledrive",  n: 31 },
    { id: "googleforms",    n: 25 }, { id: "notion",       n: 21 },
    { id: "instagram",      n: 20 }, { id: "x",            n: 19 },
    { id: "slack",          n: 18 }, { id: "airtable",     n: 17 },
    { id: "whatsapp",       n: 16 }, { id: "wordpress",    n: 12 },
    { id: "googlegemini",   n: 12 }, { id: "youtube",      n: 8  },
    { id: "discord",        n: 8  }, { id: "supabase",     n: 7  },
    { id: "anthropic",      n: 5  }, { id: "postgresql",   n: 4  },
    { id: "github",         n: 2  }, { id: "reddit",       n: 2  },
    { id: "googledocs",     n: 2  }, { id: "elevenlabs",   n: 3  },
    /* ⛔ THESE TWO GO LAST BECAUSE THEY READ AS BLANK TILES. Both are real and
       both are in the repo, but `googlecalendar` is a pale line drawing and
       `perplexity` is a light teal glyph — on a WHITE tile they have almost no
       silhouette, and a mark a viewer cannot see is worse than one less tile.
       They are still used where the board runs long; they are never in the
       first rank, and `MarkBoard`'s `count` keeps them out of S6 entirely. */
    { id: "googlecalendar", n: 4  }, { id: "perplexity",   n: 2  },
  ] as const,
  /** ⛔ the three social outlets are the ones the repo's `Instagram_Twitter_
      Social_Media` (15) and its 8 YouTube templates actually cover. The VO says
      "every platform" and the frame names three real ones. */
  outlets: ["INSTAGRAM", "X", "YOUTUBE"] as const,
  /** the literal mechanism, in n8n's own words: Workflows -> Import from File */
  action: "IMPORT",
  /** the one measured figure behind the mail bank */
  mail: "GMAIL · 26",
  keyword: "AUTO",
} as const;

/** ⛔ GREPPABLE GUARDS. A grep for any of these across `Exc*.tsx` must return
    zero hits inside a rendered string. The first two are the claims the VO
    makes that the frame may not; the rest are claims no source backs. */
export const STARS_BANNED = ["30,000", "30K", "30000"] as const;
export const MARK_BANNED = ["STRIPE", "SHOPIFY", "SALESFORCE", "HUBSPOT"] as const;
export const SCOPE_BANNED = ["EVERY PLATFORM", "EVERY APP", "UNLIMITED", "FREE FOREVER"] as const;

/* ---- THE TWELVE PLACES ---------------------------------------------------
   ⛔ NEIGHBOURING SCENES DIFFER BY BOTH HUE **AND** LIGHTNESS. Visit order is
   bench -> slot -> mail -> night -> feed -> rank -> field -> bench' -> card ->
   live -> hall -> gate, which alternates cold/warm and dark/bright on every cut.
   ⛔ BODY SCENES TARGET LUMA 70-105 AND BLACK POINT p10 <= 35. The >=140 bar is
   FRAME 0 ONLY, and `bench` is the only place built for it.
   ⛔⛔ THE FIRST BUILD MEASURED p10 48.8 AND EVERY BRIGHT PLACE WAS THE REASON:
   `rank`, `field`, `card`, `slot`, `feed` and `gate` all had a mid-value CEILING
   over a mid-value floor, so the frame had no dark pixels in it anywhere. The
   fix is NOT lifting or dropping the whole palette — it is that a lit room needs
   an UNLIT half. Every `back` (the ceiling end of the wall gradient) and every
   `floor2` (the far floor) went two to three stops down while `back2`, `floor`
   and `key` — the LIT parts, which is where all the saturation lives — did not
   move at all. That is §8's "hierarchy needs DARKNESS" as arithmetic: the
   brightness MEAN is untouched and only the SPREAD changed. */
export const PLACES: Record<string, Place> = {
  /* 1 · THE BENCH AISLE — frame 0 lives here, so it is built for >=140: a bone
     back wall behind the working light and a lit bench top. The jack field on
     top of it is near-black bakelite, which is where the reel's biggest value
     SPREAD comes from. ⛔ Brightness is the MEAN and hierarchy is the SPREAD;
     they only fight if you reach for the palette's dark stop, which nothing
     here does. */
  bench:   { back: "#828D96", back2: "#F4F6F4", floor: "#C8CECB", floor2: "#99A1A2",
             lip: "#2A3134", key: "#FFF4D6", horizon: 470, grit: "#20262A" },
  /* 1b · THE WALL, WIDE — hook shot B. ⛔ It ran on `bench` (which is built for
     the >=140 frame-0 bar) and measured luma 155.8 / p10 73 across 73 body
     frames: BRIGHTER THAN FRAME 0, which is backwards, and the single largest
     block of pale frames in the reel. The lit thing in this shot is the FIELD;
     the hall around it is dark, which is both the correct look and what makes
     350 lit cards read as a lot of light. */
  wall:    { back: "#0D1114", back2: "#39434A", floor: "#2B3336", floor2: "#12181A",
             lip: "#080B0D", key: "#FFEEC4", horizon: 640, grit: "#05080A" },
  /* 2 · THE SLOT — brass, hard key from the left. Warm against the cold bench. */
  slot:    { back: "#150E05", back2: "#7A5A24", floor: "#5E4720", floor2: "#1A1206",
             lip: "#0C0803", key: "#F6CE72", horizon: 500, grit: "#090603" },
  /* 3 · THE MAIL BANK — teal, cool and BRIGHT. Biggest hue jump so far. */
  mail:    { back: "#040E13", back2: "#7CA2AA", floor: "#557780", floor2: "#0E2028",
             lip: "#030A0D", key: "#DFF6F8", horizon: 480, grit: "#020609" },
  /* 4 · THE NIGHT AISLE — deep blue, one lamp. Darkest set until the hall. */
  night:   { back: "#0C1430", back2: "#26325E", floor: "#1A2444", floor2: "#0A0E22",
             lip: "#04060E", key: "#F0D28C", horizon: 522, grit: "#060814" },
  /* 5 · THE OUTFEED — gold, the warmest body scene. */
  feed:    { back: "#150C02", back2: "#946618", floor: "#77571C", floor2: "#1C1305",
             lip: "#0D0702", key: "#FFC855", horizon: 492, grit: "#080502" },
  /* 6 · THE RANK, CLOSE — cream-lit, brightest section in the reel. */
  rank:    { back: "#191813", back2: "#E4DECB", floor: "#C4BAA0", floor2: "#3A362C",
             lip: "#100F09", key: "#FFF9E6", horizon: 470, grit: "#0A0906" },
  /* 7 · THE WHOLE FIELD — brass over bone, the widest shot in the reel. */
  field:   { back: "#16130D", back2: "#C6C0AF", floor: "#8E836A", floor2: "#302B20",
             lip: "#0D0B05", key: "#FFEDBE", horizon: 502, grit: "#080704" },
  /* 8 · THE BENCH AGAIN, AND THE LAMP IS DYING — the same room, colder and two
     stops down. ⛔ A returning set is a callback only if the LIGHT changed. */
  bench2:  { back: "#141A1E", back2: "#3C464C", floor: "#333A3C", floor2: "#1A2022",
             lip: "#0A0E11", key: "#C8A968", horizon: 486, grit: "#070A0C" },
  /* 9 · THE CARD, CLOSE — bone, one hard key, the tightest shot in the reel. */
  card:    { back: "#1C1A16", back2: "#C4BFAE", floor: "#A79E88", floor2: "#3E3A30",
             lip: "#131108", key: "#FFF8E4", horizon: 560, grit: "#0A0906" },
  /* 10 · IT GOES LIVE — the slot re-lit JADE. The only green in the reel. */
  live:    { back: "#062218", back2: "#48A87C", floor: "#2E7A5A", floor2: "#0A2418",
             lip: "#03120C", key: "#9CFFD4", horizon: 500, grit: "#04140E" },
  /* 11 · THE OTHER HALL — sodium over near-black. The darkest, most saturated
     set in the reel, and the biggest value drop on any cut in it. */
  hall:    { back: "#160E04", back2: "#6E4410", floor: "#4A3010", floor2: "#1C1206",
             lip: "#0A0602", key: "#FFA83A", horizon: 512, grit: "#0C0804" },
  /* 12 · THE GATE — clay and gold, the house close. */
  gate:    { back: "#180C06", back2: "#9A5230", floor: "#7A4A2A", floor2: "#241408",
             lip: "#0E0603", key: "#FFCF7A", horizon: 496, grit: "#0A0503" },
};
export const asPlace = (k: keyof typeof PLACES): Place => PLACES[k];

/* =========================================================================
   THE PATCH CORD — the villain's object, and the reason a hand-built
   automation is a fight.

   ⛔⛔ A BOW ON A CUBIC'S MID CONTROL POINT DRAGS THE BASE TANGENT (reel 120).
   The cord is described by a SAMPLED CENTRE-LINE that is zero AND flat at both
   ends, so the plug ends never swing when the middle is pushed:

       cy(u) = droop*u*(1-u)*4  +  bow*sin(pi*u)^1.7

   and the sheath, the highlight and the fabric weave are all read off the same
   function, so they cannot drift off it.
   ====================================================================== */
export const Cord: React.FC<{ x0: number; y0: number; x1: number; y1: number;
  droop?: number; bow?: number; c?: string; w?: number; z?: number; o?: number;
  /** 0..1 — how hard the cord is being FOUGHT. Drives a fast small tremble
      along the span, which is what "this wire will not go in" looks like. */
  strain?: number; f?: number; seed?: number }> =
  ({ x0, y0, x1, y1, droop = 90, bow = 0, c = "#2E2A26", w: ww = 13, z = 40, o = 1,
     strain = 0, f = 0, seed = 0 }) => {
  const N = 16;
  const pts: Array<[number, number]> = [];
  for (let i = 0; i <= N; i++) {
    const u = i / N;
    const sag = droop * u * (1 - u) * 4 + bow * Math.pow(Math.sin(Math.PI * u), 1.7);
    /* the tremble is zero at both plugs and biggest in the middle — a wire
       fights along its span, not at its terminations */
    const tr = strain > 0.02
      ? Math.sin(f * 1.7 + u * 7 + seed) * 9 * strain * Math.sin(Math.PI * u) : 0;
    pts.push([x0 + (x1 - x0) * u, y0 + (y1 - y0) * u + sag + tr]);
  }
  return (
    <div style={{ position: "absolute", inset: 0, zIndex: z, opacity: o, pointerEvents: "none" }}>
      {pts.slice(0, -1).map(([ax, ay], i) => {
        const [bx, by] = pts[i + 1];
        const len = Math.hypot(bx - ax, by - ay) + 2.5;
        const ang = (Math.atan2(by - ay, bx - ax) * 180) / Math.PI;
        return (
          <React.Fragment key={"cd" + i}>
            {/* ⛔⛔ SQUARE CAPS, NOT ROUNDED. The first build rounded every one of
                the sixteen segments, and sixteen overlapping capsules rendered
                as a STRING OF BEADS — a necklace, not a patch cord. Square caps
                overlap into one continuous sheath; only the two plug ends are
                finished, and they are finished by the plugs themselves. */}
            <div style={{ position: "absolute", left: ax, top: ay - ww / 2, width: len,
              height: ww, background: c,
              transform: `rotate(${ang}deg)`, transformOrigin: "0 50%" }} />
            {/* the fabric weave and the sheen — read off the SAME centre-line,
                so they can never drift off the cord.
                ⛔ THE FIRST BUILD ALTERNATED HARD BLACK AND WHITE PER SEGMENT
                and the cord rendered as a string of BEADS — a necklace, not a
                cable. A cable has ONE continuous highlight along its top and a
                weave that is a texture, not a pattern of blocks. */}
            <div style={{ position: "absolute", left: ax, top: ay - ww / 2 + ww * 0.16,
              width: len, height: Math.max(2, ww * 0.20), borderRadius: ww,
              background: hexa("#FFF", 0.13),
              transform: `rotate(${ang}deg)`, transformOrigin: "0 50%" }} />
            <div style={{ position: "absolute", left: ax, top: ay + ww * 0.24, width: len,
              height: Math.max(1.5, ww * 0.14), borderRadius: ww,
              background: hexa("#000", 0.24),
              transform: `rotate(${ang}deg)`, transformOrigin: "0 50%" }} />
          </React.Fragment>
        );
      })}
      {/* the two plugs — brass barrels, so the cord TERMINATES in an object
          rather than in mid-air (a limb that ends in nothing is the banned
          shape, and the same rule reads on a cable) */}
      {[[x0, y0], [x1, y1]].map(([px, py], i) => (
        <div key={"pg" + i} style={{ position: "absolute", left: px - 11, top: py - 15,
          width: 22, height: 30, borderRadius: 4, background: `linear-gradient(96deg, ${dkh(BRASS, 0.32)} 0%, ${mxh(BRASS, 0.30)} 52%, ${dkh(BRASS, 0.42)} 100%)`,
          border: `2px solid ${dkh(BRASS, 0.55)}` }}>
          <div style={{ position: "absolute", left: 3, top: 7, width: 16, height: 3,
            background: hexa("#000", 0.42) }} />
          <div style={{ position: "absolute", left: 3, top: 17, width: 16, height: 3,
            background: hexa("#000", 0.42) }} />
        </div>
      ))}
    </div>
  );
};

/* =========================================================================
   ⭐⭐⭐ THE PATCH CARD — THE HERO ARTIFACT.

   Fourteen drawn parts, not four: a cream face, a machined bezel, an app mark
   on its own tile, a name strip, a CHAIN OF FIVE WIRED NODES across the face,
   the links between them, five status lamps down the edge, a `.json` tab on the
   spine, a card number, two guide rails and a pull handle.

   ⛔ A CONTAINER IS STILL A CONTAINER WHEN IT IS A NICE BOX (reel 112). A blank
   plate with a logo on it carries ONE bit — "there is a thing here". What makes
   this read as a WORKFLOW is the node chain: five stations wired in series, in
   an order, which is the literal thing the file contains.
   ⛔ IDENTITY IS SHAPE **AND** COLOUR (reel 115). `face` differs per card; the
   white mark tile is never the only thing distinguishing two of them.
   ====================================================================== */
export const PatchCard: React.FC<{ x: number; y: number; w?: number; z?: number;
  /** the mark tile's svg id in `public/logos`, or null for an unbranded card */
  mark?: string | null; name?: string; face?: string; num?: string;
  /** 0..5 — how many of the status lamps are LIT. The whole story of the reel
      is this number going from 1 (hand-built, unfinished) to 5 (it runs). */
  lit?: number; rot?: number; o?: number; s?: number;
  /** 0..1 — the chase running down the lamps when it goes live */
  chase?: number; count?: string }> =
  ({ x, y, w: ww = 300, z = 60, mark = null, name, face = CREAMB, num, lit = 0,
     rot = 0, o = 1, s = 1, chase = 0, count }) => {
  const hh = ww * 0.62;
  const NODES = 5;
  const nx = (i: number) => ww * (0.13 + i * 0.185);
  const ny = ww * 0.40;
  return (
    <div style={{ position: "absolute", left: x, top: y, width: ww, height: hh, zIndex: z,
      opacity: o, transform: `rotate(${rot}deg) scale(${s})`, transformOrigin: "50% 50%" }}>
      {/* the card body + its machined bezel */}
      <div style={{ position: "absolute", inset: 0, borderRadius: ww * 0.022,
        background: `linear-gradient(166deg, ${mxh(face, 0.20)} 0%, ${face} 46%, ${dkh(face, 0.16)} 100%)`,
        border: `${Math.max(2, ww * 0.011)}px solid ${dkh(face, 0.42)}`, boxShadow: SH }} />
      {/* the two guide rails down the long edges — what makes it a thing that
          SLOTS rather than a thing that sits */}
      {[0.035, 0.925].map((t, i) => (
        <div key={"gr" + i} style={{ position: "absolute", left: 0, top: hh * t,
          width: ww, height: hh * 0.040, background: dkh(face, 0.34) }} />
      ))}

      {/* the mark tile + the name strip. ⛔ the strip says what it IS, the mark
          says what it is ABOUT — reel 115's rule, and the reason a shared white
          tile alone is not identity. */}
      {mark && (
        <div style={{ position: "absolute", left: ww * 0.045, top: hh * 0.115,
          width: ww * 0.20, height: ww * 0.20, borderRadius: ww * 0.030,
          background: "#FFFFFF", border: `${Math.max(2, ww * 0.008)}px solid ${dkh(face, 0.30)}`,
          display: "flex", alignItems: "center", justifyContent: "center" }}>
          {/* ⛔ `staticFile` + Remotion's `Img`, NOT a bare relative `<img>`. A
              relative src resolves against the BUNDLE url, not `public/`, so
              every mark tile in the first build rendered as a broken-image
              placeholder — visible in the still, invisible to every gate. */}
          <Img src={staticFile(`logos/${mark}.svg`)}
            style={{ width: "70%", height: "70%", objectFit: "contain" }} />
        </div>
      )}
      {name && (
        <div style={{ position: "absolute", left: ww * (mark ? 0.275 : 0.055), top: hh * 0.145,
          ...ui(ww * 0.076, 900), color: dkh(face, 0.74), letterSpacing: "0.045em" }}>{name}</div>
      )}
      {count && (
        <div style={{ position: "absolute", left: ww * (mark ? 0.278 : 0.058), top: hh * 0.300,
          ...mono(ww * 0.058, 700), color: dkh(face, 0.56), letterSpacing: "0.10em" }}>{count}</div>
      )}

      {/* ⭐ THE NODE CHAIN — five stations wired in series. This is the part
          that makes the object a WORKFLOW instead of a labelled box. */}
      {Array.from({ length: NODES - 1 }, (_, i) => (
        <div key={"lk" + i} style={{ position: "absolute", left: nx(i) + ww * 0.052,
          top: ny + ww * 0.026, width: ww * 0.133, height: Math.max(2, ww * 0.014),
          background: dkh(face, 0.52) }} />
      ))}
      {Array.from({ length: NODES }, (_, i) => (
        <div key={"nd" + i} style={{ position: "absolute", left: nx(i), top: ny,
          width: ww * 0.066, height: ww * 0.066, borderRadius: ww * 0.014,
          background: i === 0 ? dkh(face, 0.78) : dkh(face, 0.60),
          border: `${Math.max(1.5, ww * 0.007)}px solid ${dkh(face, 0.84)}` }}>
          <div style={{ position: "absolute", left: "26%", top: "26%", width: "48%",
            height: "48%", borderRadius: "50%", background: mxh(face, 0.44) }} />
        </div>
      ))}

      {/* the five status lamps down the near edge, and the chase that runs them
          when the card goes live. ⛔ A REPEATED REWARD ONLY READS AS PROGRESS
          WHEN IT CLIMBS — the chase is strictly left to right, never a blink. */}
      {Array.from({ length: 5 }, (_, i) => {
        const on = i < lit || (chase > 0 && chase * 5 > i);
        const hot = chase > 0 && Math.abs(chase * 5 - i - 0.5) < 0.7;
        return (
          <div key={"lp" + i} style={{ position: "absolute", left: ww * (0.075 + i * 0.190),
            top: hh * 0.775, width: ww * 0.085, height: hh * 0.105,
            borderRadius: ww * 0.012,
            background: on ? (hot ? mxh(JADE, 0.52) : JADE) : dkh(face, 0.48),
            border: `${Math.max(1.5, ww * 0.007)}px solid ${dkh(face, 0.62)}` }} />
        );
      })}

      {/* the `.json` tab on the spine + the card number — the receipt that this
          is a FILE, in the place a part number goes */}
      <div style={{ position: "absolute", right: -ww * 0.052, top: hh * 0.30,
        width: ww * 0.105, height: hh * 0.34, borderRadius: `0 ${ww * 0.018}px ${ww * 0.018}px 0`,
        background: dkh(BRASS, 0.20), border: `${Math.max(1.5, ww * 0.006)}px solid ${dkh(BRASS, 0.52)}` }} />
      <div style={{ position: "absolute", right: ww * 0.030, top: hh * 0.395,
        ...mono(ww * 0.046, 700), color: dkh(face, 0.62), letterSpacing: "0.04em",
        transform: "rotate(90deg)", transformOrigin: "100% 0" }}>.json</div>
      {num && (
        <div style={{ position: "absolute", left: ww * 0.055, top: hh * 0.615,
          ...mono(ww * 0.048, 700), color: dkh(face, 0.50), letterSpacing: "0.12em" }}>{num}</div>
      )}
      {/* the pull handle — you take it off the wall by something */}
      <div style={{ position: "absolute", right: ww * 0.055, top: hh * 0.115,
        width: ww * 0.115, height: hh * 0.085, borderRadius: ww * 0.010,
        background: dkh(face, 0.40), border: `${Math.max(1.5, ww * 0.006)}px solid ${dkh(face, 0.60)}` }} />
    </div>
  );
};

/* =========================================================================
   THE JACK FIELD — the wall, and the payoff.

   ⛔⛔ A VALUE RAMP IS WHAT MAKES A CROWD READABLE, NOT SIZE (reel 110). Back
   ranks are painted in progressively darker brass, which is also the only axis
   the greyscale motion audit can see. Sixty identical cards at one value is a
   texture whatever the pitch is.
   ⛔ THE LAMPS ARE THE MOTION, AND THEY LIGHT IN RANKS. A full-width band of
   lamps coming on back-to-front is a travelling high-contrast edge across the
   whole panel — §1's highest-value shape — and it costs no new object.
   ====================================================================== */
export const JackField: React.FC<{ f: number; y: number; z?: number;
  /** ranks, near to far */ ranks?: number; cols?: number;
  /** 0..1 — how much of the field has LIT, back rank first */ on?: number;
  x0?: number; span?: number; s?: number;
  /** when set, this rank/col is EMPTY (a card has been pulled out of it) */
  hole?: [number, number] | null; dim?: number }> =
  ({ f, y, z = 30, ranks = 3, cols = 9, on = 0, x0 = -40, span = W + 80, s = 1,
     hole = null, dim = 0 }) => (
  <>
    {Array.from({ length: ranks }, (_, r) => {
      /* far rank first so near ranks paint over them */
      const depth = (ranks - 1 - r) / Math.max(1, ranks - 1);   // 0 near .. 1 far
      const k = 1 - depth * 0.34;                                // scale falloff
      const cw = (span / cols) * 0.86 * k * s;
      const ch = cw * 0.56;
      const ry = y - depth * 96 * s;
      /* ⭐ the value ramp — far ranks darker, so depth is readable in GREYSCALE */
      const litB = dkh(BRASS, 0.30 + depth * 0.30);
      const litA = mxh(litB, 0.14);
      /* ⛔⛔ AN UNLIT FIELD IS NEAR-BLACK BAKELITE, NOT DIM BRASS. The first
         build painted the cards brass at `on = 0`, so frame 0 already showed a
         bright wall of finished work and the hook's whole reveal was spent
         before the trigger fired. It is also the reel's hierarchy: §8's "a dark
         room with one lit thing ranks at 2.92" needs the dark room to exist. */
      const dkA = "#23272B", dkB = dkh("#14171A", depth * 0.30);
      /* ranks light BACK TO FRONT: rank r lights once `on` passes its threshold */
      const th = depth * 0.62;
      const litK = Math.max(0, Math.min(1, (on - th) / 0.34));
      return Array.from({ length: cols }, (_, c) => {
        if (hole && hole[0] === r && hole[1] === c) return null;
        const cx = x0 + (span / cols) * c + (span / cols) * 0.07 + depth * 40 * s;
        /* each column lights slightly after the one left of it — an ascending
           run across the panel rather than a whole rank blinking at once */
        const cl = Math.max(0, Math.min(1, (litK * (cols + 3) - c) / 1.6));
        const fA = cl > 0.02 ? lerpHex(dkA, litA, cl) : dkA;
        const fB = cl > 0.02 ? lerpHex(dkB, litB, cl) : dkB;
        const bord = cl > 0.02 ? lerpHex("#0B0D0F", dkh(litB, 0.50), cl) : "#0B0D0F";
        return (
          <div key={`jf${r}_${c}`} style={{ position: "absolute", left: cx, top: ry,
            width: cw, height: ch, zIndex: z + r * 2,
            background: `linear-gradient(168deg, ${fA} 0%, ${fB} 100%)`,
            border: `${Math.max(1.5, cw * 0.022)}px solid ${bord}`,
            borderRadius: cw * 0.028, opacity: 1 - dim * depth * 0.5 }}>
            {/* ⭐ THE PAPER LABEL. It is the one thing on an unlit card that is
                still visible in a dark room, so at frame 0 the field reads as
                RANKS OF FILED CARDS rather than as a black slab — and it gives
                the wall a countable structure before any light touches it. */}
            <div style={{ position: "absolute", left: cw * 0.08, top: ch * 0.10,
              width: cw * 0.56, height: ch * 0.20, borderRadius: 1,
              background: cl > 0.02 ? lerpHex("#7E7A6E", "#F3EEDD", cl) : "#7E7A6E" }} />
            {/* the jack pair — what makes it a patch card and not a brick. Two
                dark bores with a bright rim: a hole reads because the surface
                STOPS at it. */}
            {[0.72, 0.86].map((t, i) => (
              <div key={"jk" + i} style={{ position: "absolute", left: cw * t,
                top: ch * 0.13, width: cw * 0.11, height: cw * 0.11, borderRadius: "50%",
                background: "#07090A",
                border: `${Math.max(1, cw * 0.016)}px solid ${cl > 0.02 ? lerpHex("#4A4640", mxh(litB, 0.34), cl) : "#4A4640"}` }} />
            ))}
            {/* the lamp strip — four lamps, lighting left to right */}
            {Array.from({ length: 4 }, (_, i) => (
              <div key={"lm" + i} style={{ position: "absolute", left: cw * (0.10 + i * 0.225),
                top: ch * 0.62, width: cw * 0.16, height: ch * 0.24, borderRadius: cw * 0.02,
                background: cl * 4 > i ? mxh(SODIUM, 0.22 - depth * 0.16) : "#191C1F" }} />
            ))}
          </div>
        );
      });
    })}
  </>
);

/* =========================================================================
   THE BENCH — the villain, as an object.

   ⛔ IT IS NEVER SMASHED. It is planted, abandoned, and it wins the last
   picture before the CTA. All this component does is get DIMMER and messier.
   ====================================================================== */
export const Bench: React.FC<{ x: number; y: number; w?: number; z?: number;
  /** how many dead cords hang off the lip — grows across the reel */ tangle?: number;
  /** 0..1 — the working lamp above it. 1 at S0, guttering at S7 */ lamp?: number;
  f?: number; s?: number; pliers?: boolean; card?: boolean; seed?: number }> =
  ({ x, y, w: ww = 420, z = 44, tangle = 12, lamp = 1, f = 0, s = 1, pliers = true,
     card = true, seed = 0 }) => {
  const hh = ww * 0.10;
  return (
    <div style={{ position: "absolute", left: x, top: y, width: ww, zIndex: z }}>
      {/* the top — a lit working surface, which is what carries frame 0's luma */}
      <div style={{ position: "absolute", left: 0, top: 0, width: ww, height: hh,
        background: `linear-gradient(178deg, ${mxh(OXIDE, 0.30 + lamp * 0.30)} 0%, ${dkh(OXIDE, 0.18)} 100%)`,
        border: `3px solid ${dkh(OXIDE, 0.52)}`, borderRadius: 3, boxShadow: SH }} />
      {/* the front rail and two legs — a bench has structure */}
      <div style={{ position: "absolute", left: ww * 0.03, top: hh, width: ww * 0.94,
        height: hh * 0.34, background: dkh(OXIDE, 0.46) }} />
      {[0.06, 0.86].map((t, i) => (
        <div key={"lg" + i} style={{ position: "absolute", left: ww * t, top: hh * 1.3,
          width: ww * 0.075, height: ww * 0.30, background: dkh(OXIDE, 0.58) }} />
      ))}
      {/* the vice, and the half-wired card still in it */}
      <div style={{ position: "absolute", left: ww * 0.42, top: -hh * 0.52, width: ww * 0.16,
        height: hh * 0.62, background: dkh(STEEL, 0.42), border: `3px solid ${dkh(STEEL, 0.62)}`,
        borderRadius: 3 }} />
      {/* ⛔ THE CARD IN THE VICE IS THE ONE HE IS BUILDING, AND IT IS UNFINISHED.
          The first build drew it pale, flat-on and full width, and it read as a
          LAPTOP sitting on the bench. It now carries the n8n mark (so a viewer
          knows what kind of object it is in half a second), sits at a real angle
          in the jaws, and has ONE lamp of five lit. */}
      {card && (
        <PatchCard x={ww * 0.19} y={-hh * 2.5} w={ww * 0.36} z={z + 4} lit={1}
          mark="n8n" face={mxh(CREAMB, 0.12)} num="001" rot={-9} />
      )}
      {pliers && (
        <div style={{ position: "absolute", left: ww * 0.70, top: -hh * 0.30,
          width: ww * 0.19, height: hh * 0.30 }}>
          <div style={{ position: "absolute", left: 0, top: 0, width: "100%", height: "38%",
            background: dkh(STEEL, 0.30), borderRadius: 4, transform: "rotate(-8deg)" }} />
          <div style={{ position: "absolute", left: 0, top: "44%", width: "100%", height: "38%",
            background: dkh(STEEL, 0.44), borderRadius: 4, transform: "rotate(6deg)" }} />
        </div>
      )}
      {/* ⭐⭐⭐ THE JACK STRIP — where the hand-run cords come FROM.
          ⛔⛔⛔ THIS REPLACES THE TANGLE, AND THAT IS A CHANGE OF OBJECT, NOT OF
          VALUES. Three versions of "loose cable in a heap" were drawn and all
          three read as something else — straight sticks were PENCILS IN A JAR,
          even U-loops were CROQUET HOOPS, overlapping ellipses were OLYMPIC
          RINGS. `feedback_three_notes_means_the_object` is exactly this: the
          first note is values, the second is staging, the third means the OBJECT
          is wrong. A heap of slack cable is ambiguous at any quality.
          ⭐ What is NOT ambiguous, and what actually says "somebody has been
          wiring this by hand for hours", is CORDS THAT ARE PLUGGED IN AND
          CROSSING EACH OTHER. That is the one image everybody has of a manual
          exchange, and it is also literally what a hand-built node graph looks
          like. So the bench gets a real jack strip, and `WebOfCords` (below)
          runs the crossing web off it. */}
      <div style={{ position: "absolute", left: ww * 0.03, top: hh * 0.40, width: ww * 0.94,
        height: hh * 0.42, borderRadius: 3,
        background: `linear-gradient(178deg, ${mxh(BRASS, 0.20)} 0%, ${dkh(BRASS, 0.38)} 100%)`,
        border: `3px solid ${dkh(BRASS, 0.56)}` }}>
        {Array.from({ length: 16 }, (_, i) => (
          <div key={"jb" + i} style={{ position: "absolute", left: `${2.4 + i * 6.1}%`,
            top: "24%", width: ww * 0.030, height: ww * 0.030, borderRadius: "50%",
            background: "#07090A", border: `2px solid ${dkh(BRASS, 0.62)}` }} />
        ))}
      </div>
      {/* two slack coils AT ONE END only — not a row. A single detail reads as
          detail; sixteen of it reads as a pattern. */}
      {tangle > 0 && [0, 1].map(i => (
        <div key={"sl" + i} style={{ position: "absolute", left: ww * (0.02 + i * 0.10),
          top: hh * 0.92 + i * 8, width: ww * (0.13 - i * 0.02),
          height: ww * (0.10 - i * 0.015),
          border: `${9 - i}px solid ${i ? "#2E2A26" : dkh(RED, 0.42)}`, borderRadius: "50%",
          transform: `rotate(${-24 + i * 40 + Math.sin(f / 31 + i) * 2}deg)` }} />
      ))}
    </div>
  );
};

/* =========================================================================
   THE RELAY BANK — the background process this world owns, and the mechanism
   that makes "it runs" visible.

   ⛔ A BACKGROUND PROCESS COSTS THE HIERARCHY NOTHING because it is furniture —
   but it is never the answer to "not enough motion" (§12). It runs in every
   scene; the SCENE still owes its own event.
   ====================================================================== */
export const RelayBank: React.FC<{ f: number; x: number; y: number; n?: number;
  z?: number; s?: number; rate?: number;
  /** 0..1 — how much of the bank is firing. 0 = idle ticking, 1 = all in */
  drive?: number; c?: string }> =
  ({ f, x, y, n = 8, z = 28, s = 1, rate = 9, drive = 0, c = BRASS }) => (
  <>
    {Array.from({ length: n }, (_, i) => {
      /* each armature runs on its own phase so the bank is never in lockstep */
      const ph = i * 0.83;
      const beat = (Math.sin(f / rate + ph) + 1) / 2;
      const pull = Math.max(drive, beat > 0.72 ? 1 : 0);
      const w = 46 * s, h = 62 * s;
      return (
        <div key={"rl" + i} style={{ position: "absolute", left: x + i * w * 1.22, top: y,
          width: w, height: h, zIndex: z }}>
          {/* the coil */}
          <div style={{ position: "absolute", left: 0, top: h * 0.34, width: w,
            height: h * 0.66, borderRadius: 3, background: dkh(c, 0.42),
            border: `${2 * s}px solid ${dkh(c, 0.62)}` }} />
          {Array.from({ length: 4 }, (_, k) => (
            <div key={"wd" + k} style={{ position: "absolute", left: 0, top: h * (0.40 + k * 0.13),
              width: w, height: h * 0.045, background: hexa("#000", 0.28) }} />
          ))}
          {/* ⭐ THE ARMATURE, and it TRAVELS — a state change is not an action.
              It swings 22deg, which is a distance the eye resolves. */}
          <div style={{ position: "absolute", left: w * 0.10, top: h * 0.22, width: w * 0.80,
            height: h * 0.14, borderRadius: 2, background: mxh(c, 0.30),
            transform: `rotate(${-22 + pull * 22}deg)`, transformOrigin: "8% 50%" }} />
          {/* the contact it closes onto — lights only when the armature is in */}
          <div style={{ position: "absolute", left: w * 0.72, top: h * 0.10, width: w * 0.20,
            height: h * 0.14, borderRadius: 2,
            background: pull > 0.7 ? mxh(SODIUM, 0.30) : dkh(c, 0.56) }} />
        </div>
      );
    })}
  </>
);

/* =========================================================================
   THE DIAL — a number that MOVES to its value.
   ⛔ A NUMBER IS NEVER TYPESET AT ITS VALUE. The needle sweeps the whole face
   and the reading is where it STOPS.
   ====================================================================== */
export const Dial: React.FC<{ x: number; y: number; r?: number; z?: number;
  /** 0..1 — needle position around the face */ v: number; label?: string;
  read?: string; c?: string }> =
  ({ x, y, r = 84, z = 62, v, label, read, c = BRASS }) => (
  <div style={{ position: "absolute", left: x - r, top: y - r, width: r * 2, height: r * 2,
    zIndex: z }}>
    <div style={{ position: "absolute", inset: 0, borderRadius: "50%",
      background: `radial-gradient(58% 58% at 38% 30%, ${mxh(c, 0.56)} 0%, ${dkh(c, 0.24)} 100%)`,
      border: `${r * 0.10}px solid ${dkh(c, 0.52)}`, boxShadow: SH }} />
    {/* the graduations — twelve, so the face reads as an instrument */}
    {Array.from({ length: 12 }, (_, i) => (
      <div key={"gd" + i} style={{ position: "absolute", left: r - 2, top: r * 0.16,
        width: 4, height: i % 3 === 0 ? r * 0.22 : r * 0.13,
        background: i % 3 === 0 ? dkh(c, 0.72) : dkh(c, 0.54),
        transform: `rotate(${i * 30}deg)`, transformOrigin: `50% ${r * 0.84}px` }} />
    ))}
    {/* the needle */}
    <div style={{ position: "absolute", left: r - 3.5, top: r * 0.22, width: 7,
      height: r * 0.80, borderRadius: 4, background: dkh(RED, 0.10),
      transform: `rotate(${v * 360}deg)`, transformOrigin: `50% ${r * 0.78}px` }} />
    <div style={{ position: "absolute", left: r - r * 0.11, top: r - r * 0.11,
      width: r * 0.22, height: r * 0.22, borderRadius: "50%", background: dkh(c, 0.66) }} />
    {read && (
      <div style={{ position: "absolute", left: 0, top: r * 1.24, width: r * 2,
        textAlign: "center", ...mono(r * 0.26, 700), color: dkh(c, 0.78) }}>{read}</div>
    )}
    {label && (
      <div style={{ position: "absolute", left: 0, top: r * 2.10, width: r * 2,
        textAlign: "center", ...ui(r * 0.20, 900), color: mxh(c, 0.50),
        letterSpacing: "0.10em" }}>{label}</div>
    )}
  </div>
);

/* =========================================================================
   ⭐⭐⭐ THE WEB OF CORDS — the villain, drawn as the thing it actually is.

   N patch cords run from the bench's jack strip up to jacks on the wall,
   crossing each other, each with its own droop, colour and thickness. This is
   what "spending hours doing all of this by hand" looks like without a word of
   narration, and it is the same picture as a hand-built node graph.

   ⛔ IT IS ALSO THE SCENE'S BIGGEST MOTION SOURCE. Each cord breathes on its
   own slow clock, so the web is never still — and a full-width high-contrast
   structure is the shape §1's table pays most for.
   ⛔ THE COLOURS ARE MUTED CABLE, NOT PRIMARIES. Five saturated hues crossing a
   pale wall reads as bunting.
   ====================================================================== */
export const WebOfCords: React.FC<{ f: number; n?: number; z?: number;
  /** the bench's jack strip, in panel coords */ x0: number; y0: number; span0: number;
  /** the wall's jack rank */ x1: number; y1: number; span1: number;
  /** 0..1 — cords fade out as the hero abandons the bench */ o?: number;
  /** ⭐ 0..1 — the whole web GOES TAUT when the hero hauls on it. This is the
      single biggest motion source in the open: nine cords straightening at once
      repaints a full-panel-width high-contrast structure, which is the shape
      §1's table pays most for, and it costs no new object. It is also the
      MECHANISM — you can see the load arrive on every line he has run. */
  taut?: number;
  /** ⭐⭐⭐ 0..1 — THE WEB LETS GO. Each cord unplugs from the wall in turn and
      swings down to the bench line, staggered across the whole value so nine
      large high-contrast objects are travelling continuously rather than
      arriving together. This exists because reel 125's hook measured 5.02 with
      everything happening in its first half: §19's failure is a scene that
      ARRIVES AND PARKS, and its fix is never new objects, it is THE SUBJECT
      CONTINUING TO ACT. It is also the line — "you never have to set one up
      yourself" is a picture of the hand-run wiring coming down. */
  fall?: number;
  /** ⛔ a LIGHT cable set, for use against a dark set. Dark cable on a dark hall
      has no edge: it is invisible to a viewer and worth nothing to the motion
      audit, however much of the panel it sweeps. */
  light?: boolean; seed?: number }> =
  ({ f, n = 9, z = 50, x0, y0, span0, x1, y1, span1, o = 1, taut = 0, fall = 0,
     light = false, seed = 0 }) => (
  <>
    {Array.from({ length: n }, (_, i) => {
      const a = x0 + span0 * ((i * 0.37 + rnd(i + seed, 61) * 0.6) % 1);
      const b = x1 + span1 * ((i * 0.61 + rnd(i + seed, 62) * 0.6) % 1);
      /* ⛔ EVERY CORD BREATHES ON ITS OWN CLOCK. One shared phase would make the
         whole web pulse in lockstep, which reads as a wobbling net rather than
         as slack cable settling. */
      const br = Math.sin(f / (23 + i * 3.1) + i * 1.9) * 7;
      const c = (light
        ? ["#E8DCC0", mxh(SODIUM, 0.30), mxh(TEAL, 0.42), "#D6C8A6",
           mxh(BRASS, 0.36), mxh(SKY, 0.44), "#F0E6CE"]
        : ["#2E2A26", dkh(RED, 0.40), dkh(TEAL, 0.44), "#3A342C",
           dkh(SODIUM, 0.46), dkh(SKY, 0.44), "#26221E"])[i % 7];
      /* ⛔ STAGGERED, NOT SIMULTANEOUS. Nine cords dropping together is one
         event; nine dropping in sequence is nine, spread across the full
         duration — which is the difference between a burst and a scene. */
      const k = Math.max(0, Math.min(1, (fall * (n + 2) - i) / 1.8));
      /* the loose end swings past its rest position and rings out — nothing in
         a reel lands and simply stops */
      const sw = k > 0.55 ? Math.sin((k - 0.55) * 13) * (1 - k) * 46 : 0;
      const wy = y1 + k * (y0 - y1 + 66) + sw;
      const wx = b + k * (x0 + span0 * 0.5 - b) * 0.36;
      return (
        <Cord key={"wb" + i} x0={a} y0={y0} x1={wx} y1={wy}
          droop={(54 + rnd(i + seed, 63) * 74 + br) * (1 - taut * 0.78) + k * 96}
          bow={0} strain={taut * 0.5} f={f} seed={i * 2.3}
          c={c} w={9 + Math.round(rnd(i + seed, 64) * 4)} z={z + i} o={o} />
      );
    })}
  </>
);

/* =========================================================================
   ⭐⭐⭐ THE MARK TILE — the house convention, and the reel's main visual now.

   `feedback_real_marks_are_the_props` and reel 115 §15: **at half a second on a
   phone a viewer RECOGNISES A MARK; they do not decode a silhouette.** Craft on
   an invented object is the wrong axis entirely — recognition is the axis. A
   real logo on a WHITE tile is the house form, and it is also the brightest,
   most saturated object available, which is why a board of them can carry a
   frame-0 luma bar that a drawn prop would have to be deformed to hold.
   ====================================================================== */
export const MarkTile: React.FC<{ x: number; y: number; s?: number; z?: number;
  mark: string; o?: number; rot?: number; scale?: number; lit?: boolean;
  /** ⭐⭐⭐ 0..1 — THE TILE IS A RUNNING AUTOMATION, NOT A STICKER.
      Alex, round 3: *"between 0-1 second each of those hook things needs to all
      have motion, everything, not just this here."* He is right and it is the
      single most common way a frame dies: at frame 0 the hook had TEN 150px
      tiles sitting perfectly still — most of the panel's area frozen — while
      only the two or three in flight moved. A viewer reads the whole frame, not
      the object you are animating.
      ⛔ AND THE AMPLITUDE IS THE MEASURED ONE. §5: 1.15deg / 1.7px "registers as
      never-static on a metric and READS as static to a human"; 2.6deg / 4.6px
      with a second slower harmonic is the floor at which an idle actually
      shows. Both harmonics are here, on a per-tile phase, so ten tiles never
      breathe in lockstep.
      ⭐ Plus a three-lamp CHASE along the foot — small, but it is the thing that
      says these are LIVE rather than filed, and at full resolution it is what
      the eye catches first. */
  live?: number; f?: number; ph?: number }> =
  ({ x, y, s: sz = 118, z = 60, mark, o = 1, rot = 0, scale = 1, lit = true,
     live = 0, f = 0, ph = 0 }) => {
  const idle = live
    ? { dy: (Math.sin(f / 19 + ph) * 4.6 + Math.sin(f / 31 + ph * 1.7) * 2.2) * live,
        r: Math.sin(f / 23 + ph * 1.3) * 2.6 * live }
    : { dy: 0, r: 0 };
  return (
  <div style={{ position: "absolute", left: x, top: y + idle.dy, width: sz, height: sz,
    zIndex: z, opacity: o,
    transform: `rotate(${rot + idle.r}deg) scale(${scale})`,
    transformOrigin: "50% 50%", borderRadius: sz * 0.22,
    background: lit ? "#FFFFFF" : "#3A3A38",
    border: `${Math.max(2, sz * 0.028)}px solid ${lit ? "#E4DCC8" : "#262624"}`,
    boxShadow: SH, display: "flex", alignItems: "center", justifyContent: "center" }}>
    <Img src={staticFile(`logos/${mark}.svg`)}
      style={{ width: sz * 0.60, height: sz * 0.60, objectFit: "contain",
        opacity: lit ? 1 : 0.22, filter: lit ? undefined : "grayscale(1)" }} />
    {/* the running lamps — three, chasing, on this tile's own phase */}
    {live > 0 && Array.from({ length: 3 }, (_, i) => {
      const t = ((f * 0.055 + ph) % 1) * 3;
      const on = t > i && t < i + 1.25;
      return (
        <div key={"lp" + i} style={{ position: "absolute",
          left: sz * (0.30 + i * 0.16), bottom: sz * 0.075,
          width: sz * 0.085, height: sz * 0.038, borderRadius: sz * 0.02,
          background: on ? "#2FB673" : "#DCD6C6" }} />
      );
    })}
  </div>
  );
};

/* =========================================================================
   THE MARK BOARD — a grid of real logos that FILLS.

   ⭐ §1's highest-scoring shape is MANY LARGE BRIGHT OBJECTS ARRIVING
   CONTINUOUSLY, and that is exactly what this is — with the bonus that every
   one of those objects is a thing the viewer already recognises. The empty
   sockets are drawn dark so the board reads as a board before anything lands
   in it, and so each arrival is a real value step rather than an appearance.
   ⛔ ARRIVALS SPAN THE FULL DURATION. Bunching them leaves the tail dead.
   ====================================================================== */
export const MarkBoard: React.FC<{ f: number; x: number; y: number; cols?: number;
  rows?: number; tile?: number; gap?: number; z?: number;
  /** 0..1 — how much of the board has landed */ fill: number;
  /** frames each tile takes to slam in */ dropF?: number;
  /** ⭐ how many sockets EXIST. Defaults to the full grid, but S6 passes 19 so
      the picture is literally the claim: nineteen categories, nineteen icons. A
      grid that says "19 CATEGORIES" over 24 tiles is a small lie the viewer can
      count. */
  count?: number;
  /** ⛔⛔ HOW MANY ARE ALREADY SEATED AND SETTLED. A continuous fill ramp always
      has ~1.4 tiles IN FLIGHT, so seeding the board by starting `fill` part-way
      up caught one tile mid-drop on frame 0 — a half-scaled, rotated logo, on
      the one frame that is guaranteed to be seen. THE-OPEN is explicit: every
      animated element that exists at frame 0 needs its start pushed back far
      enough to be FINISHED, not merely started (reel 115's counter, 13 frames
      into a flip). The seeded tiles are drawn landed outright and the ramp
      starts from the first unseeded index, so at `fill = seeded/n` nothing is
      partial. */
  seeded?: number;
  /* ⛔ THERE IS NO `sweep` PROP, DELIBERATELY. One was built — a cream band
     travelling the finished board — and it measured 8.09 -> 6.74 with HOLD
     12% -> 31%: a cream band over WHITE TILES has almost no luma delta, which
     is §6.5's dark-on-dark trap in reverse. It was removed rather than left
     defaulted to 0, because dead code that still renders is how a fix gets
     credited to the wrong change. */
  /** ⭐ 0..1 — every LANDED tile runs its idle and its lamp chase. A board that
      has finished filling is otherwise a photograph, which is the whole of
      "everything needs motion, not just this here".
      ⛔ THIS LINE WAS MISSING FOR ONE BUILD and it is exactly why the typecheck
      is worth running: the destructure and the call site both used `live`, so
      it WORKED at runtime (esbuild strips types) while `tsc` was the only thing
      that knew the component's declared contract was a lie. A silent patch
      reports success. */
  live?: number;
  /** ⭐ 0..1 — a breathing WAVE travels the landed tiles. `live`'s idle and the
      link beads are both under the audit's 1012->240 downsample floor (a 10px
      bead is 2.4px), so they are for the eye only; a wave that scales 108px
      tiles is the version with real swept AREA in it, which is what a scene
      needs when its own event has finished but the cut has not arrived. */
  wave?: number;
  /** ⭐ rotate WHICH marks appear. This is the body's variant lever: the cuts
      differ by the real apps on screen, not by a tone curve. */
  offset?: number;
  marks?: readonly { id: string; n: number }[]; sockets?: boolean }> =
  ({ f, x, y, cols = 6, rows = 4, tile = 118, gap = 16, z = 60, fill,
     dropF = 7, count, seeded = 0, live = 0, wave = 0, offset = 0,
     marks = R.roster, sockets = true }) => {
  const n = Math.min(count ?? cols * rows, cols * rows);
  const pitch = tile + gap;
  return (
    <>
      {Array.from({ length: n }, (_, i) => {
        const cx = x + (i % cols) * pitch, cy = y + Math.floor(i / cols) * pitch;
        /* ⭐ the board fills in READING ORDER, and `R.roster` is sorted by how
           often each app really appears in the repo — so the arrival order is
           itself a true statement, not decoration. */
        /* ⛔⛔ WIDER IS BETTER HERE, AND THAT IS THE OPPOSITE OF §5.
           §5's measured fix was to SHORTEN an arrival — but its subject was ONE
           object easing in alone. This is a QUEUE, and the stagger width sets
           how many tiles are in flight AT THE SAME TIME. Measured on the hook:
           0.85 -> 6.39 · 1.4 -> 8.09 · 2.2 -> 6.99 with the light sockets. More
           simultaneous movers repaints more area per sample, up to the point
           where they start overlapping their own rows. The rules pull opposite
           ways and only the measurement settles it. */
        const k = i < seeded ? 1 : Math.max(0, Math.min(1,
          ((fill - seeded / n) * (n + 3) - (i - seeded)) / 1.4));
        const landed = k >= 1;
        const m = marks[(i + offset) % marks.length];
        return (
          <React.Fragment key={"mb" + i}>
            {/* ⛔⛔ AN EMPTY SOCKET IS A RECESSED PLATE, NOT A BLACK HOLE — reel
                108's rule, and the third place in this reel it has applied.
                It also happens to be the frame-0 luma bar: near-black sockets
                held the hook at 139 against a 140 floor, and every attempt to
                fix it with MORE or BIGGER tiles was a wash, because the sockets
                grew with them. A mid-grey recess is +10 luma, still gives each
                arrival a 190-point value step, and reads as a place a thing
                GOES rather than a hole in the wall. The top shadow is what
                makes it read as recessed rather than as a flat grey square. */}
            {sockets && (
              <div style={{ position: "absolute", left: cx, top: cy, width: tile,
                height: tile, zIndex: z - 2, borderRadius: tile * 0.22,
                background: "#3E4348", border: `2px solid #23272B`, overflow: "hidden" }}>
                <div style={{ position: "absolute", left: 0, top: 0, width: "100%",
                  height: "34%", background: hexa("#000", 0.34) }} />
                <div style={{ position: "absolute", left: "26%", top: "38%", width: "48%",
                  height: "24%", borderRadius: tile * 0.04, background: hexa("#000", 0.20) }} />
              </div>
            )}
            {/* ⭐ 330px OF DROP, NOT 190. Lifting the sockets from near-black to
                a mid-grey recess bought +10 frame-0 luma and cost the arrival
                ~15% of its value step (223 -> 190), which showed up immediately
                as motion. Swept area is `tile width x drop distance`, so 74%
                more travel puts that back — and unlike colour, distance is free
                of every gate in the reel. */}
            {k > 0 && (
              <MarkTile x={cx} y={cy - (1 - k) * 330} s={tile} z={z + i}
                mark={m.id} o={Math.min(1, k * 2)}
                live={k >= 1 ? live : 0} f={f} ph={i * 0.79}
                rot={(1 - k) * (i % 2 ? 13 : -13)}
                /* ⛔⛔ ONE `scale`, NOT TWO. The wave was added as a second
                   `scale` attribute next to the landing squash — JSX silently
                   keeps the LAST one, so the wave rendered as nothing and FIELD's
                   tail did not move at all. It looked like the fix had failed on
                   its merits; `tsc` was the only thing that knew there were two.
                   Squash while arriving, wave once landed, in one expression. */
                scale={landed
                  ? 1 + 0.085 * wave * Math.max(0, Math.sin(f / 6.5 - i * 0.62))
                  : 0.72 + k * 0.34} />
            )}
            {k > 0.98 && k < 1.6 && (
              <Ring x={cx + tile / 2} y={cy + tile / 2} f={f} at={f} c="#F2E2B8" />
            )}
          </React.Fragment>
        );
      })}
    </>
  );
};
