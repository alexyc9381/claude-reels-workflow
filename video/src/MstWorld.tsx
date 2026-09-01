import React from "react";
import { Img, staticFile } from "remotion";
import { inter, fraunces } from "./fonts";
import { MONO, Mascot, hexA } from "./SlopKit";
import {
  W, H, SAFE, E, OUT, IO, BACK, IN_Q, LIN, hexa, mix, dark, SH, SH_D, rnd,
  Beam, Strip, Motes, Chip, Slug, Plate, BigNum, Contact, Edge, Scene, Cam,
  Mark, MarkPlate, MarkCast, CamCtx, PalCtx,
} from "./NomWorld";
import type { Place } from "./NomWorld";
import { dkh, mxh, idle } from "./AppWorld";
import { rock, shake, drift, squash } from "./SklWorld";
import {
  Rake, Ring, Puff, Pool, Steam, Crew, Hero, Forearm, costumeFor, COSTUMES,
  mono, ui, vivid, lerpHex,
} from "./LoopWorld";

/* ===========================================================================
   REEL 121 · "MISTAKE" — THE WORLD KIT.  Board: storyboards/121-mistake.md.

   Subject: three things that ride along in your context window and buy you
   nothing — a role costume, a negative instruction, and every connector's tool
   schema on every single message.

   ⛔⛔ THE ARC IS SUBTRACTION. Every other reel in this repo ADDS: agents land,
      crates stack, lanes open. This one takes three things OUT of one space and
      the payoff is what fits once they are gone. That means the usual motion
      reflex — "add more large bright objects arriving" — is fighting the
      argument, so the motion is bought instead with (a) a hero that is REMOVED
      across a distance, (b) the same trip repeated four times in S8, and (c)
      the drag traverse in S7. See ANIMATION-QUALITY §1: large x bright x fast.

   ⛔⛔ THE WORLD IS OUTDOORS AND THAT IS A DELIBERATE CORRECTION. 117 KNOW, 118
      LOOP, 119 OX and 120 UNLAZY were all interiors (hall / hall / bay / hall).
      A sky is free luma that costs no shadow, which is exactly what §8 asks for:
      brightness is the MEAN, hierarchy is the SPREAD. The one dark set in the
      reel is the LOCK-UP at S9, and it is dark so that the payoff can be the
      only lit thing inside it.

   ⛔ MATTE ONLY. No `boxShadow: 0 0 Npx` anywhere — the grep gate returns 0.
   ⛔ `dark()`/`mix()` are hex-in/rgb-out and DO NOT NEST. Use dkh/mxh.
   ⛔ `Scene` push walks content off-frame: keep `left >= 506 - 486/push`, and the
      real bound includes `cam.s` ([[feedback_the_crop_bound_includes_cam]]).
   ⛔ A transformed wrapper with NO zIndex VANISHES. Use `Cam`.
   ⛔ `Mascot`'s drawn body is ~100% of `size`, NOT 70%. Pitch >= 0.85 * size.
   ⛔ THE 40px FLOOR APPLIES TO MOVING OBJECTS TOO (>=170px drawn, pre-downsample).
   ========================================================================= */

export { W, H, SAFE, E, OUT, IO, BACK, IN_Q, LIN, hexa, mix, dark, SH, SH_D, rnd,
  Beam, Strip, Motes, Chip, Slug, Plate, BigNum, Contact, Edge, Scene, Cam,
  Mark, MarkPlate, MarkCast, CamCtx, PalCtx, dkh, mxh, idle, rock, shake, drift, squash,
  Rake, Ring, Puff, Pool, Steam, Crew, Hero, Forearm, costumeFor, COSTUMES,
  mono, ui, vivid, lerpHex };
export type { Place };

/* ---- the palette ---------------------------------------------------------
   Matte animation paints, dark shadows, no neon ([[feedback_reel_matte_palette]]).
   The van is OXIDE red-brown so it is the dark side of the contrast against sky
   in every exterior — [[feedback_hook_simplicity]]'s "name which side of the
   contrast your subject is on", answered once, here, for the whole reel. */
export const CLAY = "#D97757", CLAYD = "#B8501F", GOLD = "#E7B24C", GREEN = "#3F9E74";
export const RED = "#C44A3A", SKY = "#6FAEE4", PAPER = "#F7F5F0", CREAMB = "#F2EDE0";
export const INK = "#1A1813", MUTE = "#9A968B", TEAL = "#7FC0C9", STEEL = "#8E9299";
export const BRASS = "#C9A15A", SODIUM = "#E7A94C", VIOLET = "#8B72B0", EMBER = "#E06A2C";
export const OXIDE = "#7E3A24", SLATE = "#4E5A62", VERD = "#5C8C6A", BONE = "#E8DFC9";
export const WOODT = "#9A6F3E", VELVET = "#5B3E7A", ASPH = "#5A5750", CHALK = "#EFE7D4";

/* ---- THE LEDGER ----------------------------------------------------------
   ⛔ Every number and word the picture is allowed to assert, and where it came
   from. Checked live 2026-08-24. If it is not in here it does not go on screen.

   ⛔⛔ THE ONE THING THE VO SAYS THAT THE SOURCES DO NOT: "this one DEFAULT
      setting". support.claude.com lists three tool-access modes — `Auto`
      (the default), `Always available` and `On demand` — so "all your
      connectors, always" is NOT what ships. The picture therefore draws the
      MECHANISM (schemas riding along on every message) and the FIX, and the
      word DEFAULT never appears on a plate anywhere in this reel. That is
      `docs/KICKOFF-PROMPT.md`'s "dramatise the MECHANISM and stop at the edge
      of the claim", applied before anything was drawn rather than after a
      round of notes. */
export const R = {
  /** ⭐ THE HERO NUMBER, first-party, and it names its own five products:
      "A typical multiserver setup (GitHub, Slack, Sentry, Grafana, and Splunk)
      can consume ~55k tokens in definitions before Claude does any work."
      — platform.claude.com/docs/en/agents-and-tools/tool-use/manage-tool-context */
  bloat:   { n: "~55K", label: "TOKENS BEFORE YOU TYPE ANYTHING",
             src: "ANTHROPIC · MANAGE TOOL CONTEXT" },
  /** same page: "Tool search typically reduces this by over 85 percent,
      loading only the 3-5 tools Claude needs for a given request." */
  saved:   { n: "-85%", label: "LOADED ON DEMAND" },
  /** the five servers in Anthropic's own worked example. Real marks, white
      tiles, `public/logos/`. ⛔ NOT a set of five picked to look good. */
  servers: ["github", "slack", "sentry", "grafana", "splunk"] as const,
  /** the real in-product strings, Settings -> Connectors -> Tool access */
  lever:   { on: "LOAD TOOLS WHEN NEEDED", off: "TOOLS ALREADY LOADED" },
  /** ⭐⭐⭐ ANTHROPIC'S OWN DOCUMENTED BEFORE/AFTER PAIR, verbatim, from
      claude.com/blog/best-practices-for-prompt-engineering:
        "Tell the AI what TO do instead of what NOT to do.
         Instead of: 'Do not use markdown in your response'
         Try: 'Your response should be composed of smoothly flowing prose
         paragraphs'"
      The VO's own example ("write smooth flowing text paragraphs") IS this
      line, so S4 and S6 can put the real pair on the boards. The receipt is
      the prop. */
  dont:    "DO NOT USE MARKDOWN\nIN YOUR RESPONSE",
  do:      "YOUR RESPONSE SHOULD BE\nSMOOTHLY FLOWING\nPROSE PARAGRAPHS",
  /** "modern models are sophisticated enough that heavy-handed role prompting
      is often unnecessary" — same page. So the robe is WORTHLESS, which is
      what the source says. It is never drawn as harmful or banned. */
  robe:    { bulk: "31%", worth: "0" },
  /** Alex's own guide. CTA only. */
  guide:   { n: "15", kw: "MISTAKE" },
} as const;

/** ⛔ words the picture may never print. A greppable gate, checked in the
    reel root: none of these appears in any Mst*.tsx string literal. */
export const BANNED = ["DEFAULT", "ALWAYS ON", "BANNED", "FORBIDDEN"] as const;

/* ---- THE PLACES ----------------------------------------------------------
   ⛔ NEIGHBOURS DIFFER BY BOTH HUE AND LIGHTNESS (ANIMATION-QUALITY §9). Read
   down the `key` and `floor` columns: warm street -> cool depot -> warm scale ->
   cool hold -> warm street -> cool slots -> warm street -> warm low -> hot wide
   -> DARK lock-up -> hottest street. No two adjacent rows share a temperature.

   ⛔ The horizon is HIGH on the exteriors (430-470) so the lit ground plane is
   ~46% of the panel and frame 0 wins its brightness competition without the
   dark stop being touched — the reel-98 `ridge` fix, reused deliberately. */
export const PLACES: Record<string, Place> = {
  /* ⛔⛔⛔ THE FIRST CUT FAILED `look_audit` ON BOTH AXES AND THE CAUSE WAS THE
     WORLD CHOICE ITSELF. An outdoor reel is a bright sky and a lit road in every
     single scene, so it measured BODY_LUMA 133.6 (AGENCY's body range is 70-105),
     BODY_BLACK p10 57.7 (bar <=35) and BODY_SAT 30.0% (bar >=34%) — i.e. exactly
     the ten-reel pale drift §8 was written about, arrived at from the other
     direction. Nothing here was "fixed by lifting the shading"; the values below
     are DARKER and MORE SATURATED than the first cut, and the reel keeps its
     black point because the near ground, the kerb riser and the gutter are all
     genuinely in shadow.
     ⭐ `dawn` is the ONE exception and it is deliberate: the >=140 luma law is
     frame 0 ONLY (§8), and frame 0 is `dawn`. */

  /* S0 · morning street. The only place tuned for the frame-0 bar. */
  dawn:   { back: "#8CBEE8", back2: "#F6E2B4", floor: "#D2C6B2", floor2: "#9C9282",
            lip: "#5A5348", key: SODIUM, horizon: 442, grit: "#6B6355" },
  /* S1 · depot shade. COOL and a full stop darker than dawn. */
  shade:  { back: "#47617A", back2: "#7C97AA", floor: "#6C7078", floor2: "#464B52",
            lip: "#2C3138", key: TEAL, horizon: 452, grit: "#3A3F45" },
  /* S2 · the depot scale. Warm, saturated, hotter floor, new key angle. */
  scale:  { back: "#7E6242", back2: "#C09A63", floor: "#8F7C55", floor2: "#5F5236",
            lip: "#3D3524", key: BRASS, horizon: 436, grit: "#4E4430" },
  /* S3 · INSIDE the hold looking out. Cool interior, hot doorway — the reel's
     biggest value gap, and it is free depth. */
  hold:   { back: "#2A2E35", back2: "#414753", floor: "#4C4133", floor2: "#2C2721",
            lip: "#1A1814", key: SODIUM, horizon: 486, grit: "#232019" },
  /* S4 · square-on at the hold mouth. Warm. */
  mouth:  { back: "#5E90B8", back2: "#D0A96C", floor: "#8A7B62", floor2: "#5A5040",
            lip: "#3A342A", key: SODIUM, horizon: 448, grit: "#4A4234" },
  /* S5 · tight on the slot wall. COOL and LOW — the dip before the fix. */
  slots:  { back: "#333E4A", back2: "#4E5C69", floor: "#43464D", floor2: "#2C2F34",
            lip: "#1C1F23", key: TEAL, horizon: 470, grit: "#26292E" },
  /* S6 · the swap. Same framing as S4, warm key RESTORED and hotter. */
  swap:   { back: "#6699C4", back2: "#E0B776", floor: "#94856A", floor2: "#625843",
            lip: "#40382B", key: GOLD, horizon: 448, grit: "#524836" },
  /* S7 · ground level at the tow hitch. Deep shadow under the van. */
  hitch:  { back: "#5588B4", back2: "#C69C64", floor: "#766B58", floor2: "#4C4538",
            lip: "#302B22", key: SODIUM, horizon: 408, grit: "#403A2E" },
  /* S8 · the widest and most saturated frame of the eleven. */
  run:    { back: "#5FA0D8", back2: "#EDCE8A", floor: "#A08C63", floor2: "#6C5F42",
            lip: "#463D2B", key: GOLD, horizon: 458, grit: "#5C5138" },
  /* S9 · THE LOCK-UP. The one genuinely dark set, on purpose (§8: hierarchy
     needs DARKNESS, and a dark room with one lit thing ranks at 2.92 where a
     cream room ranks nothing at 1.24). */
  lockup: { back: "#1B1F24", back2: "#2A3036", floor: "#332E27", floor2: "#1E1B17",
            lip: "#121110", key: SODIUM, horizon: 498, grit: "#1A1815" },
  /* S10 · full day. Warmest and most saturated after S8 — the light travelled. */
  day:    { back: "#6BAEE4", back2: "#F2D89A", floor: "#A8946E", floor2: "#71634A",
            lip: "#47402F", key: GOLD, horizon: 452, grit: "#605440" },
};

/* =========================================================================
   THE SET — a street, built in planes.
   ⛔ §8's depth question is "is there a mass cropped by the panel edge, IN
   FRONT of the action?" `Bollard` is that mass and it is mounted in every
   exterior scene. Without it the camera is pointed at a backdrop.
   ====================================================================== */

/** sky + a soft horizon haze + a sun wash. The reel's luma floor lives here,
    so no scene has to lift its dark stop to clear the frame-0 bar. */
export const Sky: React.FC<{ p: Place; sun?: number; z?: number }> =
  ({ p, sun = 214, z = 2 }) => (
  <>
    <div style={{ position: "absolute", left: 0, top: 0, width: W, height: p.horizon + 12,
      zIndex: z, background: `linear-gradient(180deg, ${p.back} 0%, ${mix3(p.back, p.back2, 0.55)} 62%, ${p.back2} 100%)` }} />
    {/* the sun wash — a shaped disc + one low-alpha ring, never an emissive blur */}
    <div style={{ position: "absolute", left: sun - 96, top: p.horizon - 292, width: 192, height: 192,
      borderRadius: "50%", zIndex: z + 1, background: hexa(p.back2, 0.42) }} />
    <div style={{ position: "absolute", left: sun - 168, top: p.horizon - 364, width: 336, height: 336,
      borderRadius: "50%", zIndex: z, background: hexa(p.back2, 0.11) }} />
    {/* haze band that sits the far plane down into the ground */}
    <div style={{ position: "absolute", left: 0, top: p.horizon - 74, width: W, height: 86, zIndex: z + 2,
      background: `linear-gradient(180deg, ${hexa(p.back2, 0)} 0%, ${hexa(p.back2, 0.66)} 100%)` }} />
  </>
);

/** the far plane: a depot roofline, a water tower, three flat-roof blocks and a
    line of poles. Flat, desaturated, and never taller than a third of the sky. */
export const Roofline: React.FC<{ p: Place; z?: number; o?: number }> = ({ p, z = 4, o = 1 }) => {
  const c = mix3(p.back2, p.lip, 0.52), c2 = mix3(p.back2, p.lip, 0.34);
  const B = [[24, 128, 96], [150, 92, 64], [232, 168, 118], [412, 108, 78],
             [536, 146, 102], [700, 96, 66], [790, 176, 126], [928, 116, 84]];
  return (
    <div style={{ position: "absolute", inset: 0, zIndex: z, opacity: o }}>
      {B.map(([x, w, h], i) => (
        <div key={"rf" + i} style={{ position: "absolute", left: x, top: p.horizon - h,
          width: w, height: h + 8, background: i % 2 ? c2 : c }}>
          {/* window rows — 6px is under the downsample floor, so they are
              texture for the eye only and are never asked to carry motion */}
          {Array.from({ length: Math.max(1, Math.floor(h / 34)) }, (_, r) => (
            <div key={r} style={{ position: "absolute", left: 8, right: 8, top: 12 + r * 30,
              height: 12, background: hexa(p.back2, 0.34) }} />
          ))}
        </div>
      ))}
      {/* the water tower — the one silhouette with a shape worth reading */}
      <div style={{ position: "absolute", left: 604, top: p.horizon - 236, width: 88, height: 74,
        borderRadius: "10px 10px 26px 26px", background: c }} />
      <div style={{ position: "absolute", left: 616, top: p.horizon - 166, width: 12, height: 166, background: c2 }} />
      <div style={{ position: "absolute", left: 668, top: p.horizon - 166, width: 12, height: 166, background: c2 }} />
      <div style={{ position: "absolute", left: 596, top: p.horizon - 248, width: 104, height: 14, background: c2 }} />
    </div>
  );
};

/** the road: ground plane, kerb, gutter shadow, grit, and the raking shadow
    bars the van crosses. ⛔ The bars alternate LIGHT AND SHADOW — a light-only
    band scores worse AND lifts the black point (ANIMATION-QUALITY §1). */
export const Road: React.FC<{ p: Place; f: number; rake?: number; z?: number }> =
  ({ p, f, rake = 0, z = 8 }) => (
  <>
    <div style={{ position: "absolute", left: 0, top: p.horizon, width: W, height: H - p.horizon,
      zIndex: z, background: `linear-gradient(180deg, ${p.floor2} 0%, ${p.floor} 46%, ${dkh(p.floor, 0.18)} 100%)` }} />
    {/* kerb: a lit top face and a dark riser, which is where the value gap is */}
    <div style={{ position: "absolute", left: 0, top: p.horizon + 26, width: W, height: 20, zIndex: z + 1,
      background: mix3(p.floor, "#FFFFFF", 0.22) }} />
    <div style={{ position: "absolute", left: 0, top: p.horizon + 46, width: W, height: 15, zIndex: z + 1,
      background: dkh(p.lip, 0.24) }} />
    {/* gutter shadow — the darkest line in an exterior, and it protects p10 */}
    <div style={{ position: "absolute", left: 0, top: p.horizon + 61, width: W, height: 11, zIndex: z + 1,
      background: hexa(INK, 0.42) }} />
    {rake > 0 && (
      <Rake f={f} y={p.horizon + 72} h={H - p.horizon - 72} n={9} rate={rake}
        c={mix3(p.floor, "#FFFFFF", 0.30)} o={0.30} skew={-24} z={z + 2} />
    )}
    {/* ⭐ THE NEAR GROUND IS IN SHADOW. `look_audit` measured p10 57.7 against a
        bar of 35 on the first cut — the whole frame was lit. This is the band
        that gives the reel a black point, and it is MOTIVATED (the kerb and the
        camera-side buildings are between the low sun and this strip), not a
        vignette cranked up to make a number go down. */}
    <div style={{ position: "absolute", left: 0, top: H - 214, width: W, height: 214, zIndex: z + 2,
      background: `linear-gradient(180deg, ${hexa(INK, 0)} 0%, ${hexa(INK, 0.40)} 42%, ${hexa(INK, 0.78)} 100%)` }} />
    {/* grit: 40 chips, seeded, never random — re-renders must be identical */}
    {Array.from({ length: 40 }, (_, i) => (
      <div key={"gr" + i} style={{ position: "absolute", zIndex: z + 3,
        left: rnd(i, 11) * W, top: p.horizon + 74 + rnd(i, 12) * (H - p.horizon - 90),
        width: 3 + rnd(i, 13) * 6, height: 2 + rnd(i, 14) * 4, borderRadius: 2,
        background: hexa(p.grit, 0.5 + rnd(i, 15) * 0.4) }} />
    ))}
  </>
);

/** ⛔ THE OCCLUDER — a bollard and its slack chain, cropped by the frame edge,
    IN FRONT of the action. This is the answer to §8's depth question and it is
    mounted in every exterior. It is not decoration; without it the set is a
    backdrop with props on it. */
export const Bollard: React.FC<{ p: Place; x?: number; y?: number; s?: number; z?: number;
  flip?: boolean; posts?: 1 | 2 }> = ({ p, x = -54, y = 470, s = 1, z = 88, flip = false, posts = 2 }) => {
  /* ⛔⛔ v1 SHIPPED ONE POST AT x=-52 AND IT READ AS DEBRIS, not as depth. Two
     things were wrong and both are visible only in a render:
       1. a single post at the frame edge is 90% cropped, so the chain leaving it
          had nothing to arrive at and read as junk lying on the tarmac;
       2. the chain hung 88px below the post TOP, i.e. below the kerb line, so it
          was drawn ON the road surface instead of across the space in front.
     It is now a real barrier — TWO posts with the chain slung BETWEEN them at
     shoulder height, deep in shadow, and the whole thing is the nearest plane in
     the frame. That is what §8's depth question is actually asking for. */
  const c = dkh(p.lip, 0.52), c2 = dkh(p.lip, 0.3), c3 = dkh(p.lip, 0.14);
  const Post = (px: number) => (
    <>
      <div style={{ position: "absolute", left: px, top: 0, width: 84, height: 330,
        borderRadius: "14px 14px 4px 4px", background: c }} />
      <div style={{ position: "absolute", left: px + 60, top: 0, width: 24, height: 330, background: c2 }} />
      <div style={{ position: "absolute", left: px - 9, top: -26, width: 102, height: 34, borderRadius: 11, background: c2 }} />
      <div style={{ position: "absolute", left: px, top: 58, width: 84, height: 19, background: hexa(CHALK, 0.26) }} />
      <div style={{ position: "absolute", left: px, top: 116, width: 84, height: 12, background: hexa(CHALK, 0.15) }} />
      <div style={{ position: "absolute", left: px - 16, top: 300, width: 116, height: 38, borderRadius: 9, background: dkh(c, 0.3) }} />
      {/* the ring the chain is shackled through */}
      <div style={{ position: "absolute", left: px + 30, top: 30, width: 30, height: 20,
        borderRadius: 10, border: `6px solid ${c3}` }} />
    </>
  );
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: z,
      transform: `scale(${s}) ${flip ? "scaleX(-1)" : ""}`, transformOrigin: "0% 100%" }}>
      {Post(0)}
      {posts === 2 && Post(430)}
      {/* the chain, slung between the two rings, drawn as LINKS so it is a chain
          and not a rope ([[feedback_props_need_real_drawing]]).
          ⛔ WITH ONE POST IT RUNS **LEFT**, OFF FRAME. A single cropped post with
          a chain heading into open road reads as litter; heading off the edge it
          reads as a barrier that continues past the frame, which is the whole
          job of an occluder. */}
      {Array.from({ length: 13 }, (_, i) => {
        const k = i / 12, sag = Math.sin(k * Math.PI) * (posts === 2 ? 62 : 30);
        const lx = posts === 2 ? 52 + i * 34 : 30 - i * 34;
        return (
          <div key={"ch" + i} style={{ position: "absolute", left: lx, top: 40 + sag,
            width: 32, height: 19, borderRadius: 10, border: `7px solid ${c2}`,
            transform: `rotate(${i % 2 ? 0 : 68}deg)` }} />
        );
      })}
    </div>
  );
};

/** railings on the far kerb — a plane between the roofline and the road that
    gives the exteriors a third depth band for almost no ink. */
export const Railing: React.FC<{ p: Place; z?: number }> = ({ p, z = 6 }) => {
  const c = mix3(p.lip, p.back2, 0.38);
  return (
    <div style={{ position: "absolute", inset: 0, zIndex: z }}>
      <div style={{ position: "absolute", left: 0, top: p.horizon - 62, width: W, height: 9, background: c }} />
      <div style={{ position: "absolute", left: 0, top: p.horizon - 34, width: W, height: 6, background: hexa(c, 0.7) }} />
      {Array.from({ length: 17 }, (_, i) => (
        <div key={"rl" + i} style={{ position: "absolute", left: 14 + i * 62, top: p.horizon - 62,
          width: 8, height: 62, background: c }} />
      ))}
    </div>
  );
};

/* ---- small shared bits --------------------------------------------------- */

/** a real mark on a white tile. ⛔ A wrong mark is worse than no mark, so the
    only ids used are the five in `R.servers` plus `claude`, all present in
    `public/logos/`. */
export const Tile: React.FC<{ id: string; x: number; y: number; s?: number; z?: number;
  r?: number }> = ({ id, x, y, s = 92, z = 70, r = 14 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: s, height: s, borderRadius: r, zIndex: z,
    background: PAPER, boxShadow: SH_D, display: "flex", alignItems: "center", justifyContent: "center" }}>
    <Img src={staticFile(`logos/${id}.svg`)} style={{ width: s * 0.66, height: s * 0.66, objectFit: "contain" }} />
  </div>
);

/** stencilled type, for anything painted ON a surface (the van flank, the kerb
    chalk, the lever plates). Tracked wide, slightly transparent, so it reads as
    paint sitting in the surface rather than a label floating over it. */
export const Stencil: React.FC<{ t: string; x: number; y: number; size?: number; c?: string;
  z?: number; o?: number; w?: number; rot?: number; align?: "left" | "center" }> =
  ({ t, x, y, size = 34, c = CHALK, z = 74, o = 0.9, w = 520, rot = 0, align = "left" }) => (
  <div style={{ position: "absolute", left: x, top: y, width: w, zIndex: z, opacity: o,
    transform: `rotate(${rot}deg)`, textAlign: align, whiteSpace: "pre-line",
    fontFamily: inter.fontFamily, fontWeight: 900, fontSize: size, lineHeight: 1.12,
    letterSpacing: size * 0.06, color: c }}>{t}</div>
);


/** ⛔⛔ A HEX-IN / **HEX-OUT** THREE-ARG MIX. The house has three colour helpers
    and none of them does this safely: `mxh(hex, k)` mixes toward a FIXED cream
    (247), `dkh(hex, k)` only darkens, and `lerpHex(a, b, t)` is **rgb-out**, so
    feeding its result to `hexa()` or `dkh()` paints solid black
    ([[feedback_nested_colour_helpers_go_black]]). This one round-trips through
    hex so it composes with every other helper in the kit. */
export const mix3 = (a: string, b: string, t: number) => {
  const A = parseInt(a.slice(1), 16), B = parseInt(b.slice(1), 16);
  const ch = (sh: number) => {
    const va = (A >> sh) & 255, vb = (B >> sh) & 255;
    return Math.max(0, Math.min(255, Math.round(va + (vb - va) * t)))
      .toString(16).padStart(2, "0");
  };
  return `#${ch(16)}${ch(8)}${ch(0)}`;
};


/* ---- SUNBARS: the measured motion lever ----------------------------------
   ⭐⭐⭐ A FULL-WIDTH HIGH-CONTRAST TRAVELLING BAND is the biggest single thing
   that moves `scene_motion_audit` (ANIMATION-QUALITY §1: one scene measured
   10.44 against its neighbour's 2.83 at identical push). The formula underneath
   is `motion ~= (fraction of the panel repainted per 0.1s) x (luma delta)`, so a
   band has to be FULL-PANEL, not road-only — the road rake repaints the bottom
   44% and leaves the sky untouched.

   ⛔⛔ IT ALTERNATES LIGHT **AND SHADOW**. Reel 106 shipped light-only bands:
   they scored 7.79 AND lifted the black point 47.4 -> 56.1, which is exactly the
   "fix it by lifting the shading" move §8 exists to ban, reached for by
   accident. Interleaving a dark band fixed both at once (9.92, black point back
   DOWN), and it is also just what raking light looks like.

   ⛔ AND THE EDGES ARE FEATHERED. A hard-edged bar reads as a graphic laid over
   the room — reel 109's `Rake` was called wallpaper on a contact sheet. What
   makes it MEASURE is swept area x SPEED, neither of which a viewer reads as
   stripiness in a still. Keep the feather, take the rest back through `rate`. */
export const SunBars: React.FC<{ f: number; rate?: number; n?: number; o?: number;
  z?: number; skew?: number; c?: string }> =
  ({ f, rate = 3.4, n = 6, o = 0.26, z = 24, skew = -21, c = "#FFF3D6" }) => {
  const span = W + 520, pitch = span / n;
  return (<>{Array.from({ length: n * 2 }, (_, i) => {
    const dark = i % 2 === 1;
    const x = ((((i * pitch) / 2 + f * rate) % span) + span) % span - 260;
    return (
      <div key={"sb" + i} style={{ position: "absolute", left: x, top: -140,
        width: pitch * 0.46, height: H + 280, zIndex: z, transform: `skewX(${skew}deg)`,
        background: dark
          ? `linear-gradient(90deg, ${hexa("#1A1813", 0)} 0%, ${hexa("#1A1813", o * 0.78)} 50%, ${hexa("#1A1813", 0)} 100%)`
          : `linear-gradient(90deg, ${hexa(c, 0)} 0%, ${hexa(c, o)} 50%, ${hexa(c, 0)} 100%)` }} />
    );
  })}</>);
};


/* ---- OVERHEAD: the dark plane that gives an outdoor reel a black point -----
   ⛔⛔ p10 48.5 AGAINST A BAR OF 35, AND THE SKY WAS THE REASON. An exterior is
   bright across the top 55% of every frame, so no amount of shadow on the
   GROUND can pull a 10th percentile down — the bright half is simply too big.
   The answer is a dark mass where the frame is brightest: a depot gantry with a
   soffit, brackets, a conduit run and a hanging lamp, cropped by the panel top.

   ⭐ It does three jobs at once, which is why it is worth the ink: it is the
   black point, it is a fourth depth plane, and it answers §8's "is there a mass
   cropped by the panel edge" from the top as well as the side.
   ⛔ It is NOT a vignette. A vignette darkens the corners of whatever is there
   and reads as a filter; this is a THING, with structure, that light falls on. */
export const Overhead: React.FC<{ p: Place; f: number; h?: number; z?: number;
  lamp?: boolean }> = ({ p, f, h: hh = 156, z = 86, lamp = true }) => {
  /* ⛔ h<=0 renders NOTHING. The hook carries the frame-0 >=140 bar and every
     pixel of soffit costs it directly, so shot A opts out entirely rather than
     paying for a mass it does not need. */
  if (hh <= 0) return null;
  const c = dkh(p.lip, 0.74), c2 = dkh(p.lip, 0.56), c3 = dkh(p.lip, 0.34);
  return (
    <>
      {/* the soffit, its lit leading edge, and the shadow it throws below */}
      <div style={{ position: "absolute", left: 0, top: -18, width: W, height: hh, zIndex: z, background: c }} />
      <div style={{ position: "absolute", left: 0, top: hh - 18, width: W, height: 13, zIndex: z + 1, background: c3 }} />
      <div style={{ position: "absolute", left: 0, top: hh - 5, width: W, height: 74, zIndex: z + 1,
        background: `linear-gradient(180deg, ${hexa(INK, 0.56)} 0%, ${hexa(INK, 0)} 100%)` }} />
      {/* the beams running back, in perspective */}
      {Array.from({ length: 7 }, (_, i) => (
        <div key={"ob" + i} style={{ position: "absolute", left: 24 + i * 150, top: -18,
          width: 34, height: hh - 10, zIndex: z + 1, background: c2 }} />
      ))}
      {/* the conduit run and its clips */}
      <div style={{ position: "absolute", left: 0, top: hh - 44, width: W, height: 15, zIndex: z + 2, background: c3 }} />
      {Array.from({ length: 12 }, (_, i) => (
        <div key={"oc" + i} style={{ position: "absolute", left: 44 + i * 86, top: hh - 50,
          width: 16, height: 27, borderRadius: 4, zIndex: z + 2, background: c2 }} />
      ))}
      {/* one practical: a solid disc plus a shaped cone, never an emissive blur */}
      {lamp && <>
        <div style={{ position: "absolute", left: 640, top: hh - 8, width: 12, height: 44, zIndex: z + 2, background: c2 }} />
        <div style={{ position: "absolute", left: 596, top: hh + 34, width: 100, height: 34,
          borderRadius: "6px 6px 46px 46px", zIndex: z + 2, background: c3 }} />
        <div style={{ position: "absolute", left: 622, top: hh + 60, width: 48, height: 20,
          borderRadius: "50%", zIndex: z + 2, background: mix3(p.key, "#FFFFFF", 0.4) }} />
        <div style={{ position: "absolute", left: 520, top: hh + 66, width: 252, height: 300, zIndex: z,
          background: `linear-gradient(180deg, ${hexa(p.key, 0.20)} 0%, ${hexa(p.key, 0)} 100%)`,
          clipPath: "polygon(38% 0, 62% 0, 100% 100%, 0 100%)" }} />
      </>}
    </>
  );
};

/** a damped ring-out. ⛔ Nothing in a reel lands and simply stops (§5). */
export const settle = (lf: number, amp = 9, per = 3.1, dec = 26) =>
  lf < 0 ? 0 : Math.sin(lf / per) * amp * Math.exp(-lf / dec);
