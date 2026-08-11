import React from "react";
import { Img, staticFile, useCurrentFrame } from "remotion";
import { inter, fraunces } from "./fonts";
import { MONO } from "./SlopKit";
import {
  W, H, SAFE, E, OUT, IO, BACK, IN_Q, LIN, hexa, mix, dark, SH, SH_D, rnd,
  Beam, Strip, Motes, Chip, Plate, BigNum, Contact, Edge, Scene, Cam,
  Mark, MarkPlate, MarkCast, CamCtx, PalCtx,
} from "./NomWorld";
import type { Place } from "./NomWorld";

/* ===========================================================================
   REEL 99 "REPO" — THE WORLD KIT.  Board: storyboards/99-repo.md.

   ⛔⛔ v1 OF THIS REEL WAS A NIGHT WATERWORKS AND IT WAS REJECTED, for the
      reason reel 86 already wrote down and I built past anyway:

        "each of the scenes dont really make sense in relation back to the main
         topic like its just water animations not really about claude or ai and
         stuff ppl will just get bored and scroll away"

      The mechanism was right — pipes pool, a gauge ranks, a selector switches —
      and it did not matter, because A METAPHOR FOR THE MECHANISM IS NOT THE
      SUBJECT. Nothing in frame said AI. The viewer had to decode plumbing
      before the topic arrived, and that decode costs the exact second the reel
      has to earn.

   THE FIX IS NOT A BETTER METAPHOR. It is that the REAL MARKS ARE THE PROPS.
   Every scene below carries a provider mark at 110-260px, or the Claude mark,
   or a real product noun (429, /v1, MIT, 18,265★) — usually all three. The
   world is staging for those objects, never a substitute for them.

   THE WORLD: A TAG-TEAM TITLE FIGHT, in a warm old boxing hall.
     free tiers, each good for a round   -> twenty-nine fighters in ONE corner
     pooled behind one endpoint          -> one ring, one fight, one belt
     capacity                            -> ROUNDS on the corner's roster board
     a rate limit                        -> a fighter gasses out, 429 towel in
     automatic failover                  -> THE TAG, and the fight never stops
     paying per provider                 -> a box office that sells ONE ticket
   The ritual's entire cultural purpose is relief by substitution, which IS
   failover — so the mechanism needs no diagram and no decode.

   ⛔ MATTE PALETTE, NOT NEON. An arena pulls hard toward spotlights on black.
      The brightest thing here is the CANVAS — cream, and it fills the lower
      half of frame 0, which is what wins the luma gate from inside the world.
      No `0 0 Npx <colour>` anywhere; ring lights are solid discs and one
      low-alpha cone.
   ========================================================================= */

export { W, H, SAFE, E, OUT, IO, BACK, IN_Q, LIN, hexa, mix, dark, SH, SH_D, rnd,
  Beam, Strip, Motes, Chip, Plate, BigNum, Contact, Edge, Scene, Cam,
  Mark, MarkPlate, MarkCast, CamCtx, PalCtx };
export type { Place };

/* the house accents, matte */
export const CLAY = "#D97757", GOLD = "#E7B24C", GREEN = "#3F9E74";
export const RED = "#C44A3A", SKY = "#5AA0DE", PAPER = "#F7F5F0";
export const INK = "#1A1813";

/* ⛔⛔ `dark()` AND `mix()` TAKE HEX AND RETURN `rgb(...)`, SO THEY DO NOT NEST.
   `dark(dark(c, .2), .1)` runs `parseInt("gb(186,179,164)", 16)` -> NaN, and
   `NaN >> 16 & 255` is 0, so the result is a SILENT SOLID BLACK — not a crash,
   not a dropped style, black. It only bites when a surface is DIMMED, which is
   why the undimmed frames looked perfect for a whole pass. Hex in, hex out. */
export const dkh = (hex: string, k: number) => {
  const n = parseInt(hex.slice(1), 16);
  const m = (v: number) => Math.round(v * (1 - k));
  const h = (v: number) => m(v).toString(16).padStart(2, "0");
  return `#${h((n >> 16) & 255)}${h((n >> 8) & 255)}${h(n & 255)}`;
};
export const mxh = (hex: string, k: number) => {
  const n = parseInt(hex.slice(1), 16);
  const m = (v: number) => Math.round(v + (247 - v) * k);
  const h = (v: number) => m(v).toString(16).padStart(2, "0");
  return `#${h((n >> 16) & 255)}${h((n >> 8) & 255)}${h(n & 255)}`;
};

/* the world's own materials */
export const CANVAS = "#EFE8D8", CANVAS2 = "#CFC5AE";
export const ROPE = "#E4DACA", ROPED = "#B8AC96";
export const POST_R = "#C25E42", POST_B = "#5E718C";
export const BRASS = "#C8963E", BRASSD = "#8E6626", BRASSL = "#E8C57A";
/* ⛔ THE CROWD IS WHAT COSTS THE LUMA GATE. At #2A303A/#1D222A the tiers ate
   the upper half and frame 0 measured 141.8 against the >=150 bar. Lifted a
   stop and warmed toward the hall light: still silhouette, still never competing
   with a mark, and now the frame is legible at feed size. */
export const CROWD = "#4C5666", CROWD2 = "#3E4756";

/* ---------------------------------------------------------------------------
   THE SEVEN PLACES. Neighbours in the cut differ by both hue and lightness.
   ⛔ FRAME 0 IS A BRIGHTNESS COMPETITION (docs/THE-OPEN.md law 1, ≥150/255) and
      `ring` wins it from INSIDE the world: a lit canvas is the brightest thing
      a boxing hall actually contains, so no neutral card is imported.
   ------------------------------------------------------------------------ */
export const PLACES: Record<string, Place> = {
  /* S0/S4 · the ring, from the apron. Warm hall, dark crowd, CREAM canvas. */
  ring:   { back: "#69748A", back2: "#454E5C", floor: CANVAS, floor2: CANVAS2,
            lip: POST_R, key: GOLD, horizon: 430, grit: "#B7AD98" },
  /* S0c/S6 · the corner, tighter and warmer */
  corner: { back: "#54443A", back2: "#2E2620", floor: "#EDE5D3", floor2: "#C6BCA4",
            lip: "#B8543A", key: "#EFD9A2", horizon: 470, grit: "#AFA48C" },
  /* S2 · the tunnel where the corner is introduced. AMBER, deepest frame. */
  roster: { back: "#5A4A38", back2: "#80704C", floor: "#9C8F78", floor2: "#6E624F",
            lip: "#8C7E66", key: GOLD, horizon: 480, grit: "#9E8E72" },
  /* S3 · the box office, outside in the rain. COLD SLATE + one sour lamp.
     The villain's palette, used NOWHERE else in the reel. */
  booth:  { back: "#3A4650", back2: "#28313A", floor: "#59636B", floor2: "#363F47",
            lip: "#4C575F", key: "#93A98C", horizon: 520, grit: "#6A737B" },
  /* S1 · the arena wide from high in the stand */
  stand:  { back: "#5F6C80", back2: "#3E4756", floor: "#E6DECC", floor2: "#B8AE98",
            lip: "#8E6C58", key: GOLD, horizon: 400, grit: "#A89E88" },
  /* S5 · macro on the tag, at the ropes */
  apron:  { back: "#57462F", back2: "#332A1E", floor: "#EDE5D3", floor2: "#C2B79E",
            lip: "#B8543A", key: "#F0DDB0", horizon: 500, grit: "#AA9F86" },
  /* S6 · the belt. Brightest frame in the reel. */
  belt:   { back: "#65523E", back2: "#3A2F24", floor: "#F4EEE0", floor2: "#D6CCB6",
            lip: "#C25E42", key: GOLD, horizon: 500, grit: "#BDB39C" },
};

const BRIGHT = ["ring", "corner", "stand", "apron", "belt"];
const DIMMER = ["roster", "booth"];
/* ⛔ HEX IN, HEX OUT. A `Place` field is fed straight back into `dkh`/`mxh` by
   the surfaces below, so a rotation emitting `rgb(...)` blacks out every dimmed
   variant — the same trap, one level further out. */
const LEVEL: Record<number, (c: string) => string> = {
  1: (c) => mxh(c, 0.10),
  2: (c) => mxh(c, 0.17),
  3: (c) => dkh(c, 0.11),
};
export const usePlace = (key: string): Place => {
  const p = React.useContext(PalCtx);
  const base = PLACES[key];
  if (!p) return base;
  const ring = BRIGHT.includes(key) ? BRIGHT : DIMMER;
  const d = PLACES[ring[(ring.indexOf(key) + p) % ring.length]];
  const L = LEVEL[p];
  const c = L ? { ...d, back: L(d.back), back2: L(d.back2), floor: L(d.floor),
    floor2: L(d.floor2), lip: L(d.lip), grit: L(d.grit) } : d;
  return { ...c, key: base.key, horizon: base.horizon };
};

/* =========================================================================
   SURFACES
   ====================================================================== */

/** the hall: crowd tiers, a back wall, and the lighting truss. Six depth
    planes before a prop lands — wall, upper tier, lower tier, rail, floor,
    truss. The crowd is SILHOUETTE ONLY; it must never compete with the marks. */
export const Arena: React.FC<{ p: Place; f: number; rows?: number; truss?: boolean;
  dim?: number; lights?: number }> =
  ({ p, f, rows = 3, truss = true, dim = 0, lights = 4 }) => {
  const hz = p.horizon;
  const D = (c: string) => (dim > 0 ? dkh(c, dim) : c);
  return (<>
    <div style={{ position: "absolute", inset: 0, zIndex: 1,
      background: `linear-gradient(176deg, ${D(p.back2)} 0%, ${D(p.back)} 58%, ${D(dkh(p.back, 0.16))} 100%)` }} />
    {/* the far wall's steel bays — structure, so the dark has something in it */}
    {Array.from({ length: 7 }, (_, i) => (
      <div key={"bay" + i} style={{ position: "absolute", left: 26 + i * 148, top: 40,
        width: 9, height: hz - 90, background: D(dkh(p.back, 0.26)), zIndex: 2 }} />
    ))}
    {/* crowd tiers, receding and darkening */}
    {Array.from({ length: rows }, (_, r) => {
      const ty = hz - 210 + r * 62;
      const c = D(r === 0 ? dkh(CROWD2, 0.15) : r === 1 ? CROWD2 : CROWD);
      return (<React.Fragment key={"tier" + r}>
        <div style={{ position: "absolute", left: -20, top: ty, width: W + 40, height: 64,
          background: c, zIndex: 4 + r }} />
        {Array.from({ length: 26 }, (_, i) => (
          <div key={"hd" + r + i} style={{ position: "absolute",
            left: -10 + i * 40 + (r % 2) * 20 + rnd(r * 30 + i, 7) * 12,
            top: ty - 16 - rnd(r * 30 + i, 8) * 7, width: 24, height: 26,
            borderRadius: "12px 12px 3px 3px", background: c, zIndex: 4 + r }} />
        ))}
        {/* the tier's front rail catches the light */}
        <div style={{ position: "absolute", left: -20, top: ty + 58, width: W + 40, height: 7,
          background: D(mxh(p.back, 0.14)), opacity: 0.8, zIndex: 4 + r }} />
      </React.Fragment>);
    })}
    {/* the floor the ring stands on */}
    <div style={{ position: "absolute", left: 0, right: 0, top: hz - 22, bottom: 0, zIndex: 11,
      background: `linear-gradient(184deg, ${D(dkh(p.back, 0.34))} 0%, ${D(dkh(p.back, 0.5))} 100%)` }} />
    {/* the truss and its lamps — solid discs, never an emissive blur */}
    {truss && (<>
      <div style={{ position: "absolute", left: -20, top: 44, width: W + 40, height: 15,
        background: D("#2B3038"), zIndex: 20 }} />
      <div style={{ position: "absolute", left: -20, top: 56, width: W + 40, height: 6,
        background: D("#454C56"), zIndex: 21 }} />
      {Array.from({ length: lights }, (_, i) => {
        const x = 108 + i * ((W - 216) / Math.max(1, lights - 1));
        return (<React.Fragment key={"lt" + i}>
          <div style={{ position: "absolute", left: x - 27, top: 58, width: 54, height: 32,
            borderRadius: "5px 5px 26px 26px", background: D("#3C434D"), zIndex: 22 }} />
          <div style={{ position: "absolute", left: x - 20, top: 82, width: 40, height: 15,
            borderRadius: "0 0 20px 20px", background: D("#F4E4B8"), zIndex: 23 }} />
          <Beam x={x} y={92} top={40} bot={330} len={430} c="#F4E4B8" o={0.13} z={19} f={f} />
        </React.Fragment>);
      })}
    </>)}
  </>);
};

/** THE RING. Canvas, apron, three ropes, four posts — and the Claude mark
    painted on the mat at sponsor scale.

    ⛔⛔ THIS IS THE ANSWER TO "the hook needs to be clearer we are talking about
       claude". A real ring has a huge mark painted on the canvas, so the single
       most legible object in frame 0 can be the Claude logo without a badge
       being pasted anywhere — the world itself carries it, at 260px, under
       everything else. It is also the brightest plane, so it wins the luma gate
       and says the subject in the same move. */
export const Ring: React.FC<{ p: Place; f: number; z?: number; mark?: number;
  ropes?: number; near?: boolean; markX?: number; markY?: number }> =
  ({ p, f, z = 30, mark = 260, ropes = 3, near = true, markX, markY }) => {
  const hz = p.horizon;
  const FAR_L = 150, FAR_R = W - 150, NEAR_L = -46, NEAR_R = W + 46;
  /* the apron skirt has to stay ON PANEL — it is where the ring branding
     lives, and at hz+342 it was pushed off the bottom edge entirely */
  const CT = hz + 4, CB = hz + 296;
  return (<>
    {/* the canvas — a trapezoid, the brightest plane in the reel */}
    <div style={{ position: "absolute", left: 0, top: CT, width: W, height: CB - CT,
      zIndex: z, background: `linear-gradient(182deg, ${p.floor2} 0%, ${p.floor} 62%)`,
      clipPath: `polygon(${FAR_L}px 0, ${FAR_R}px 0, ${NEAR_R}px 100%, ${NEAR_L}px 100%)` }} />
    {/* the painted mark, ON the canvas, in perspective.
        ⛔ 0.30 opacity on a cream mat is a smudge. At 0.46 against a canvas this
        bright it still reads as PAINT rather than a decal, and it is the single
        largest object in frame 0 — which is the whole point: the subject is
        legible before anything has to be decoded. */}
    <div style={{ position: "absolute", left: (markX ?? W / 2) - mark / 2,
      top: (markY ?? CT + 96) - mark / 2, width: mark, height: mark, zIndex: z + 1,
      opacity: 0.36, transform: "scaleY(0.52)", transformOrigin: "50% 50%" }}>
      <Img src={staticFile("claude_logo.png")}
        style={{ width: "100%", height: "100%", objectFit: "contain" }} />
    </div>
    {/* the canvas seams */}
    {[0.3, 0.62].map((k, i) => (
      <div key={"sm" + i} style={{ position: "absolute", left: 0, top: CT + (CB - CT) * k,
        width: W, height: 3, background: dkh(CANVAS2, 0.12), opacity: 0.6, zIndex: z + 2 }} />
    ))}
    {/* the apron skirt below the near edge */}
    <div style={{ position: "absolute", left: NEAR_L, top: CB - 4, width: NEAR_R - NEAR_L,
      height: 130, background: p.lip, zIndex: z + 3, boxShadow: SH_D }} />
    <div style={{ position: "absolute", left: NEAR_L, top: CB - 4, width: NEAR_R - NEAR_L,
      height: 13, background: mxh(p.lip, 0.26), zIndex: z + 4 }} />
    {/* the ropes, far side, behind everything that stands on the canvas */}
    {Array.from({ length: ropes }, (_, i) => (
      <React.Fragment key={"rf" + i}>
        <div style={{ position: "absolute", left: FAR_L - 8, top: CT - 128 + i * 42,
          width: FAR_R - FAR_L + 16, height: 11, borderRadius: 6, background: ROPE,
          zIndex: z + 5, boxShadow: SH }} />
        <div style={{ position: "absolute", left: FAR_L - 8, top: CT - 122 + i * 42,
          width: FAR_R - FAR_L + 16, height: 4, borderRadius: 6, background: ROPED,
          zIndex: z + 6 }} />
      </React.Fragment>
    ))}
    {/* the two far posts */}
    {[FAR_L - 22, FAR_R - 8].map((x, i) => (
      <React.Fragment key={"pf" + i}>
        <div style={{ position: "absolute", left: x, top: CT - 168, width: 30, height: 176,
          borderRadius: 7, background: i === 0 ? POST_R : POST_B, zIndex: z + 8, boxShadow: SH }} />
        <div style={{ position: "absolute", left: x, top: CT - 168, width: 9, height: 176,
          background: mxh(i === 0 ? POST_R : POST_B, 0.28), zIndex: z + 9 }} />
        <div style={{ position: "absolute", left: x - 6, top: CT - 180, width: 42, height: 18,
          borderRadius: 5, background: BRASS, zIndex: z + 10 }} />
      </React.Fragment>
    ))}
    {/* the near ropes, IN FRONT — the frame-edge occluder this world owns */}
    {near && Array.from({ length: ropes }, (_, i) => (
      <div key={"rn" + i} style={{ position: "absolute", left: -60, top: CB - 34 + i * 54,
        width: W + 120, height: 15, borderRadius: 8,
        background: i === 0 ? ROPE : mxh(ROPE, 0.06), zIndex: z + 60, boxShadow: SH }} />
    ))}
  </>);
};

/** THE RINGSIDE HOARDING — the lit advertising board that runs behind the
    ropes in every real arena.

    ⛔ IT IS DOING TWO JOBS AT ONCE, WHICH IS WHY IT EXISTS. Measured by band,
       frame 0's problem was never the canvas (142-171) — it was the hall above
       it, y 99-396, sitting at 110-118 and pulling the panel mean to 145
       against a 150 bar. A cream board across the full width lands ~200 in the
       exact band that was short. And because it is a hoarding, the thing it
       carries is MARKS: five more at 66px, in the frame the brief said needed
       more logos. Fixing the gate from inside the world, again. */
export const Hoarding: React.FC<{ y: number; z?: number; n?: number; from?: number;
  h?: number }> = ({ y, z = 16, n = 5, from = 0, h: hh = 86 }) => (<>
  <div style={{ position: "absolute", left: -30, top: y, width: W + 60, height: hh,
    background: "#EFE7D4", zIndex: z, boxShadow: SH }} />
  <div style={{ position: "absolute", left: -30, top: y, width: W + 60, height: 9,
    background: "#FBF6EA", zIndex: z + 1 }} />
  <div style={{ position: "absolute", left: -30, top: y + hh - 11, width: W + 60, height: 11,
    background: "#C3B9A2", zIndex: z + 1 }} />
  {Array.from({ length: n }, (_, i) => {
    const pr = PROVIDERS[(from + i) % PROVIDERS.length];
    const x = 74 + i * ((W - 148) / Math.max(1, n - 1));
    return (
      <div key={"ho" + i} style={{ position: "absolute", left: x - 82, top: y + 12,
        width: 164, height: hh - 26, zIndex: z + 2, display: "flex", alignItems: "center",
        justifyContent: "center", gap: 9 }}>
        {pr.mark
          ? <Img src={staticFile(`logos/${pr.k}.svg`)}
              style={{ width: 46, height: 46, objectFit: "contain" }} />
          : null}
        <span style={{ fontFamily: inter.fontFamily, fontWeight: 900,
          fontSize: pr.n.length > 8 ? 19 : 24, letterSpacing: "0.02em",
          color: "#3A342A", whiteSpace: "nowrap" }}>{pr.n}</span>
      </div>
    );
  })}
</>);

/** rain — solid slanted strokes, never a wash. The box office only. */
export const Rain: React.FC<{ f: number; n?: number; z?: number; c?: string }> =
  ({ f, n = 40, z = 88, c = "#B6C6CE" }) => (<>
    {Array.from({ length: n }, (_, i) => {
      const sp = 13 + rnd(i, 41) * 9;
      const y = (rnd(i, 42) * H + f * sp) % (H + 120) - 60;
      return <div key={"rn" + i} style={{ position: "absolute",
        left: rnd(i, 43) * (W + 120) - 60 - y * 0.16, top: y,
        width: 2, height: 22 + rnd(i, 44) * 16, background: c,
        opacity: 0.34, zIndex: z, transform: "rotate(9deg)" }} />;
    })}
  </>);

/* =========================================================================
   ⛔⛔ THE MARKS ARE THE PROPS, AND THEY ARE BIG.

   Alex, on v1: *"logos need to be bigger and especially hook scene needs to be
   clearer we are talking about claude and stuff."* v1's provider marks were
   46px enamel discs on a tap. Here the smallest a mark is ever drawn is 96px,
   the corner banners run 150-190px, the roster cards 210px, and the Claude mark
   is painted on the canvas at 260.

   ⛔ NEVER FILTER A BRAND MARK (reel 86). `grayscale(1) brightness(0.12)` turns
      any mark that owns a colour into a black square. They go on light plates
      and are left alone.
   ⛔ NEVER INVENT ONE. Groq, Cerebras, Cohere and Z.ai are not on simple-icons,
      so they get a cast stencil nameplate instead of a guessed glyph.
   ====================================================================== */
export const PROVIDERS = [
  { k: "googlegemini", n: "GOOGLE",      mark: true },
  { k: "mistralai",    n: "MISTRAL",     mark: true },
  { k: "cloudflare",   n: "CLOUDFLARE",  mark: true },
  { k: "nvidia",       n: "NVIDIA",      mark: true },
  { k: "huggingface",  n: "HUGGINGFACE", mark: true },
  { k: "openrouter",   n: "OPENROUTER",  mark: true },
  { k: "groq",         n: "GROQ",        mark: false },
  { k: "cerebras",     n: "CEREBRAS",    mark: false },
  { k: "cohere",       n: "COHERE",      mark: false },
  { k: "zai",          n: "Z.AI",        mark: false },
] as const;

/** a hanging corner banner carrying ONE provider at scale. This is the reel's
    workhorse: it is how a mark gets to be 150-190px without covering a face. */
export const Banner: React.FC<{ x: number; y: number; w?: number; z?: number;
  markKey?: string; name: string; hasMark?: boolean; f?: number; sway?: number;
  sub?: string }> =
  ({ x, y, w: ww = 190, z = 40, markKey, name, hasMark, f = 0, sway = 1, sub }) => {
  const a = Math.sin(f / 52 + x / 180) * 0.9 * sway;
  const hh = ww * 1.20;
  return (
    <div style={{ position: "absolute", left: x - ww / 2, top: y, width: ww, zIndex: z,
      transform: `rotate(${a}deg)`, transformOrigin: "50% 0%" }}>
      {/* the hanger */}
      <div style={{ position: "absolute", left: ww / 2 - 4, top: -34, width: 8, height: 36,
        background: BRASSD }} />
      <div style={{ position: "absolute", left: ww / 2 - 26, top: -40, width: 52, height: 12,
        borderRadius: 4, background: BRASS }} />
      <div style={{ width: ww, height: hh, borderRadius: 10, background: "#F7F3E8",
        border: `6px solid ${BRASSD}`, boxShadow: SH_D, boxSizing: "border-box",
        display: "flex", flexDirection: "column", alignItems: "center",
        justifyContent: "center", gap: ww * 0.05, overflow: "hidden" }}>
        {hasMark && markKey
          ? <Img src={staticFile(`logos/${markKey}.svg`)}
              style={{ width: ww * 0.56, height: ww * 0.56, objectFit: "contain" }} />
          : <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900,
              fontSize: ww * (name.length > 8 ? 0.16 : 0.22), lineHeight: 1,
              color: "#241F17", textAlign: "center", padding: "0 6px" }}>{name}</span>}
        <span style={{ fontFamily: inter.fontFamily, fontWeight: 900,
          fontSize: ww * 0.088, letterSpacing: "0.06em", color: "#6B6355",
          textAlign: "center", padding: "0 6px" }}>{hasMark ? name : ""}</span>
        {sub && <span style={{ fontFamily: MONO, fontWeight: 800, fontSize: ww * 0.082,
          letterSpacing: "0.08em", color: "#8C8474" }}>{sub}</span>}
      </div>
      {/* the tail */}
      <div style={{ position: "absolute", left: 0, top: hh - 2, width: ww, height: ww * 0.16,
        background: "#F7F3E8", borderLeft: `6px solid ${BRASSD}`,
        borderRight: `6px solid ${BRASSD}`, boxSizing: "border-box",
        clipPath: "polygon(0 0, 100% 0, 50% 100%)" }} />
    </div>
  );
};

/** the repo's own receipt, on a fight-bill card. Every value is real, pulled
    from the GitHub API on 2026-08-11. */
export const MakerPlate: React.FC<{ x: number; y: number; s?: number; z?: number;
  stars?: string }> = ({ x, y, s = 1, z = 84, stars = "18,265" }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z,
    padding: `${13 * s}px ${20 * s}px`, borderRadius: 8 * s,
    background: "#F4EFE2", border: `${5 * s}px solid ${BRASSD}`, boxShadow: SH_D }}>
    <div style={{ display: "flex", alignItems: "center", gap: 11 * s }}>
      <Img src={staticFile("logos/github.svg")}
        style={{ width: 38 * s, height: 38 * s, objectFit: "contain" }} />
      <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 34 * s,
        letterSpacing: "-0.01em", color: "#241F14" }}>freellmapi</span>
    </div>
    <div style={{ marginTop: 5 * s, fontFamily: MONO, fontWeight: 800, fontSize: 21 * s,
      letterSpacing: "0.10em", color: "#7A6A44" }}>★ {stars}  ·  MIT</div>
  </div>
);

/** a cast stencil nameplate — what a provider with no public mark gets. */
export const Stencil: React.FC<{ t: string; x: number; y: number; s?: number; z?: number;
  c?: string; fg?: string }> =
  ({ t, x, y, s = 1, z = 80, c = "#E4DAC4", fg = "#2A2418" }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z,
    padding: `${6 * s}px ${13 * s}px`, borderRadius: 4 * s, background: c,
    border: `${3 * s}px solid ${dkh(c, 0.26)}`, boxShadow: SH,
    fontFamily: MONO, fontWeight: 800, fontSize: 20 * s, letterSpacing: "0.13em",
    color: fg, whiteSpace: "nowrap" }}>{t}</div>
);
