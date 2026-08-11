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

   ⛔⛔ THIS IS BUILD 3. TWO WORLDS WERE REJECTED, FOR THE SAME REASON, AND THE
      REASON IS WORTH KEEPING IN FRONT OF YOU:

      v1, a night waterworks:
        *"its just water animations not really about claude or ai and stuff ppl
          will just get bored and scroll away"*
      v2, a tag-team title fight:
        *"some of the components i wouldnt think its about the content discussed
          in the video unless otherwise, like the animations isnt really
          related"* + *"represent 800 million free tokens in a much simpler and
          straightforward way"*

      v1's mechanism mapped perfectly. v2's ritual mapped perfectly. Both still
      failed, because A BORROWED PROP HAS TO BE TRANSLATED BEFORE IT MEANS
      ANYTHING. A gauge glass, a championship belt, a corner man — the viewer
      has to be told what each one stands for, and you do not get to tell them.

   ⛔ THE RULE THIS BUILD IS HELD TO: **every object on screen is a TOKEN, a
      LOGO, a COUNTER or a REAL NUMBER.** If a prop needs a sentence of
      explanation, it is cut. There is no metaphor left to decode, because a
      "token" is already a physical object and the number is just the number.

   THE PLACE: a warm counting house. Cream plaster, a wood counter, brass
   chutes, gold tokens. It is deliberately almost no world at all — staging for
   the tokens, and nothing that competes with them.
     800 million free tokens   -> an ODOMETER, and a token pile past the frame
     29 providers              -> 29 chutes, each with its LOGO on the front
     one endpoint              -> they all pour into ONE hopper
     a rate limit              -> a chute jams and a red 429 flag drops on it
     failover                  -> the next chute opens; the counter never pauses
     paying per provider       -> a change machine: $300 in, one small cup out

   ⛔ MATTE PALETTE. Gold tokens and cream plaster carry the brightness; there
      is not one `0 0 Npx <colour>` glow in the reel.
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
   `dark(dark(c,.2),.1)` parses to NaN and `NaN >> 16 & 255` is 0 — a SILENT
   SOLID BLACK, and only in dimmed shots. Hex in, hex out. */
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
export const TOK = "#E4A93F", TOKD = "#A9721F", TOKL = "#F5D68A";
export const BRASS = "#C8963E", BRASSD = "#8E6626", BRASSL = "#E8C57A";
/* ⛔ THE COUNTER-TOP IS 47% OF THE PANEL. At #8A6242/#5C412C (luma ~104/68)
   it dragged frame 0 to 145.7 against the >=150 bar while the plaster above was
   already at 230. Lifted a stop; still clearly wood, now the frame clears. */
export const WOOD = "#A67F58", WOODD = "#77593C", WOODL = "#C0996E";
export const PLAST = "#EDE5D2", PLASTD = "#CDC3AC";

export const PLACES: Record<string, Place> = {
  /* S0/S4/S6 · the counting room. BRIGHT cream plaster, wood counter. */
  count: { back: PLAST, back2: "#D2C8B0", floor: WOOD, floor2: WOODD,
           lip: "#B9AD93", key: GOLD, horizon: 420, grit: "#A08B6E" },
  /* S1 · the same room, wider and cooler, for the scale comparison */
  hall:  { back: "#DED8C6", back2: "#B6AE99", floor: "#9C8E76", floor2: "#6B6050",
           lip: "#AA9E86", key: GOLD, horizon: 430, grit: "#8E8069" },
  /* S2 · close on the tokens, warm and shallow */
  bench: { back: "#E6DCC4", back2: "#C0B49A", floor: "#A88354", floor2: "#71583A",
           lip: "#BE9464", key: GOLD, horizon: 500, grit: "#B08E62" },
  /* S3 · the change machine. COLD SLATE, the villain's palette, used nowhere
     else in the reel. */
  cash:  { back: "#4A555F", back2: "#333C45", floor: "#5E6870", floor2: "#3A424A",
           lip: "#525C64", key: "#93A98C", horizon: 520, grit: "#6E777F" },
  /* S5 · macro on the chutes */
  chute: { back: "#E2D9C4", back2: "#B4A98E", floor: "#8E7048", floor2: "#5E4A30",
           lip: "#A8845A", key: GOLD, horizon: 520, grit: "#9A7C54" },
};

const WARM = ["count", "hall", "bench", "chute"];
const COLD = ["cash"];
/* ⛔ HEX IN, HEX OUT — a Place field is fed straight back into dkh/mxh. */
const LEVEL: Record<number, (c: string) => string> = {
  1: (c) => mxh(c, 0.09), 2: (c) => mxh(c, 0.16), 3: (c) => dkh(c, 0.10),
};
export const usePlace = (key: string): Place => {
  const p = React.useContext(PalCtx);
  const base = PLACES[key];
  if (!p) return base;
  const ring = COLD.includes(key) ? COLD : WARM;
  const d = PLACES[ring[(ring.indexOf(key) + p) % ring.length]];
  const L = LEVEL[p];
  const c = L ? { ...d, back: L(d.back), back2: L(d.back2), floor: L(d.floor),
    floor2: L(d.floor2), lip: L(d.lip), grit: L(d.grit) } : d;
  return { ...c, key: base.key, horizon: base.horizon };
};

/* =========================================================================
   THE ROOM — plaster wall, a wood counter, and almost nothing else. It is
   deliberately plain: the tokens are the subject and the set must not argue
   with them.
   ====================================================================== */
/* ⛔⛔ *"so much more needs to be animated as well."* The body scenes had ONE
   moving thing each — the hero — against a set that was completely frozen, so
   however good the hero was the frame read as a still with an animation pasted
   on it. `live` adds a permanent idle to the room itself: dust drifting through
   the beam, a lamp on a slow swing, and the light on the counter breathing.
   None of it competes with the hero (all of it is low-contrast and slow) and
   all of it means the frame is never static. */
export const Room: React.FC<{ p: Place; f: number; dim?: number; panel?: boolean;
  counter?: boolean; live?: boolean }> =
  ({ p, f, dim = 0, panel = true, counter = true, live = true }) => {
  const hz = p.horizon;
  const D = (c: string) => (dim > 0 ? dkh(c, dim) : c);
  const sway = Math.sin(f / 47) * 1.5 + Math.sin(f / 31) * 0.6;
  return (<>
    <div style={{ position: "absolute", inset: 0, zIndex: 1,
      background: `linear-gradient(176deg, ${D(mxh(p.back, 0.10))} 0%, ${D(p.back)} 46%, ${D(p.back2)} 100%)` }} />
    {/* wall panelling — two rails, the only wall detail there is */}
    {panel && (<>
      <div style={{ position: "absolute", left: 0, right: 0, top: hz - 190, height: 7,
        background: D(dkh(p.back2, 0.16)), zIndex: 2 }} />
      <div style={{ position: "absolute", left: 0, right: 0, top: hz - 176, height: 3,
        background: D(mxh(p.back, 0.20)), zIndex: 2 }} />
    </>)}
    {counter && (<>
      <div style={{ position: "absolute", left: 0, right: 0, top: hz, bottom: 0, zIndex: 12,
        background: `linear-gradient(184deg, ${D(p.floor)} 0%, ${D(p.floor2)} 100%)` }} />
      <div style={{ position: "absolute", left: 0, right: 0, top: hz - 16, height: 20,
        background: D(mxh(p.floor, 0.22)), zIndex: 13, boxShadow: SH }} />
      <div style={{ position: "absolute", left: 0, right: 0, top: hz + 4, height: 6,
        background: D(dkh(p.floor2, 0.22)), zIndex: 14 }} />
      {Array.from({ length: 5 }, (_, i) => (
        <div key={"pj" + i} style={{ position: "absolute", left: 0, right: 0,
          top: hz + 40 + i * i * 12 + i * 30, height: 3,
          background: D(dkh(p.floor2, 0.24)), opacity: 0.6, zIndex: 15 }} />
      ))}
      {/* the light on the counter, breathing */}
      {live && (
        <div style={{ position: "absolute", left: W / 2 - 300 + sway * 8, top: hz + 24,
          width: 600, height: 128, borderRadius: "50%",
          background: D(mxh(p.floor, 0.22)), opacity: 0.30 + Math.sin(f / 53) * 0.05,
          zIndex: 16 }} />
      )}
    </>)}
    {/* a hung lamp on a slow permanent swing, and the dust under it */}
    {live && (<>
      <div style={{ position: "absolute", left: 812, top: 0, zIndex: 19,
        transform: `rotate(${sway * 0.7}deg)`, transformOrigin: "50% 0%" }}>
        <div style={{ position: "absolute", left: -3, top: 0, width: 6, height: 62,
          background: D("#3E444A") }} />
        <div style={{ position: "absolute", left: -42, top: 58, width: 84, height: 36,
          borderRadius: "5px 5px 42px 42px", background: D("#4E555C"), boxShadow: SH_D }} />
        <div style={{ position: "absolute", left: -34, top: 86, width: 68, height: 12,
          borderRadius: "0 0 34px 34px", background: D("#F2DFAE") }} />
      </div>
      <Motes x={812} y={120} w={330} h={hz - 60} n={12} f={f} z={17} />
    </>)}
  </>);
};

/** rain — the change-machine scene only. Solid strokes, never a wash. */
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
   ⛔⛔ THE MARKS ARE THE PROPS, AND ON A TOKEN THEY GET TO BE HUGE.
   A token is a disc with a light plate in it, so a brand mark sits on the one
   surface it is guaranteed to read on — and at 200px+ in the close shots,
   which is the size the note asked for.
   ⛔ NEVER FILTER A BRAND MARK (reel 86: the darken filter turns any coloured
      mark into a black square). ⛔ NEVER INVENT ONE — the four providers with
      no public mark get their NAME struck into the token instead.
   ====================================================================== */
/* ⛔ ORDERED BY RECOGNITION, NOT BY THE README'S ORDER. *"primarily show the
   most popular ones first and then the less popular ones after."* Everything
   here is still a real provider from that README — the ordering is the only
   thing that changed, so the biggest names carry the frames that matter and
   Mistral/OpenRouter fill in behind them. */
export const PROVIDERS = [
  { k: "googlegemini", n: "GOOGLE",      mark: true },
  { k: "nvidia",       n: "NVIDIA",      mark: true },
  { k: "cloudflare",   n: "CLOUDFLARE",  mark: true },
  { k: "huggingface",  n: "HUGGINGFACE", mark: true },
  { k: "mistralai",    n: "MISTRAL",     mark: true },
  { k: "openrouter",   n: "OPENROUTER",  mark: true },
  { k: "groq",         n: "GROQ",        mark: false },
  { k: "cerebras",     n: "CEREBRAS",    mark: false },
  { k: "cohere",       n: "COHERE",      mark: false },
  { k: "zai",          n: "Z.AI",        mark: false },
] as const;

/* ⛔⛔ THE CLIENTS — AND THIS IS HOW OPENAI HONESTLY GETS ON SCREEN.
   Alex asked for the big consumer names, ChatGPT included. OpenAI is NOT a
   provider in this repo: you cannot get GPT out of it, and a ChatGPT token in
   a pile captioned "free AI tokens" would be a straight false claim.

   But the README names, by name, the tools you POINT AT the pool: "Claude Code,
   Codex CLI, Cline / Roo Code, Continue, Aider, opencode, and Cursor each have
   a short recipe". Codex is OpenAI's CLI. So the OpenAI mark belongs on the
   CLIENT side, where it is simply true — these are the things that SPEND the
   tokens, not things that supply them. Same for Cursor and Copilot.

   ⭐ The distinction is also the clearest thing the reel can teach: one row is
   what you GET, the other row is what you USE. Keep them visually separate and
   never mix a client mark into a provider pile. */
export const CLIENTS = [
  { k: "claude",         n: "CLAUDE CODE" },
  { k: "openai",         n: "CODEX",   official: true },
  { k: "cursor",         n: "CURSOR" },
  { k: "githubcopilot",  n: "COPILOT" },
  { k: "cline",          n: "CLINE" },
] as const;

/** a client mark on a light plate — the tools that spend the tokens. */
export const ClientChip: React.FC<{ i: number; x: number; y: number; s?: number;
  z?: number; label?: boolean }> = ({ i, x, y, s = 118, z = 80, label = true }) => {
  const c = CLIENTS[i % CLIENTS.length];
  const src = (c as any).official ? `logos_official/${c.k}.svg` : `logos/${c.k}.svg`;
  return (
    <div style={{ position: "absolute", left: x - s / 2, top: y - s / 2, width: s, zIndex: z,
      display: "flex", flexDirection: "column", alignItems: "center", gap: s * 0.07 }}>
      <div style={{ width: s, height: s, borderRadius: s * 0.26, background: "#FBF8F1",
        border: `${Math.max(3, s * 0.045)}px solid #D9CFB6`, boxSizing: "border-box",
        boxShadow: SH, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Img src={staticFile(src)}
          style={{ width: s * 0.58, height: s * 0.58, objectFit: "contain" }} />
      </div>
      {label && <span style={{ fontFamily: inter.fontFamily, fontWeight: 900,
        fontSize: s * 0.125, letterSpacing: "0.04em", color: "#4A4238",
        whiteSpace: "nowrap" }}>{c.n}</span>}
    </div>
  );
};

/** THE TOKEN. The whole reel is made of these.
    `plain` is an unstruck token — the ones that make up the bulk of a pile. */
export const Token: React.FC<{ x: number; y: number; s?: number; z?: number;
  markKey?: string; name?: string; hasMark?: boolean; rot?: number; plain?: boolean;
  claude?: boolean; dim?: number }> =
  ({ x, y, s = 90, z = 60, markKey, name, hasMark, rot = 0, plain, claude,
     dim = 0 }) => {
  const D = (c: string) => (dim > 0 ? dkh(c, dim) : c);
  return (
    <div style={{ position: "absolute", left: x - s / 2, top: y - s / 2, width: s, height: s,
      zIndex: z, transform: `rotate(${rot}deg)` }}>
      {/* rim, face, highlight — three solid values, never a gradient */}
      <div style={{ position: "absolute", inset: 0, borderRadius: "50%",
        background: D(TOKD), boxShadow: SH }} />
      <div style={{ position: "absolute", inset: s * 0.045, borderRadius: "50%",
        background: D(TOK) }} />
      <div style={{ position: "absolute", left: s * 0.09, top: s * 0.07,
        width: s * 0.38, height: s * 0.30, borderRadius: "50%", background: D(TOKL),
        opacity: 0.7 }} />
      {!plain ? (
        <div style={{ position: "absolute", inset: s * 0.14, borderRadius: "50%",
          background: D("#FBF8F1"), display: "flex", alignItems: "center",
          justifyContent: "center", overflow: "hidden" }}>
          {claude
            ? <Img src={staticFile("claude_logo.png")}
                style={{ width: s * 0.46, height: s * 0.46, objectFit: "contain" }} />
            : hasMark && markKey
            ? <Img src={staticFile(`logos/${markKey}.svg`)}
                style={{ width: s * 0.46, height: s * 0.46, objectFit: "contain" }} />
            : <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900,
                /* ⛔ A NAME HAS TO FIT INSIDE A CIRCLE, and the inner plate is
                   only 72% of the token. CEREBRAS at 0.16 overflowed and the
                   round mask sliced it to "EREBRA". Scaled by length, allowed
                   to wrap, and hyphenless. */
                fontSize: s * ((name?.length ?? 4) > 7 ? 0.098 : 0.145),
                lineHeight: 1.02, color: "#241F17", textAlign: "center",
                padding: "0 6px", wordBreak: "keep-all",
                letterSpacing: "-0.01em" }}>{name}</span>}
        </div>
      ) : (
        <div style={{ position: "absolute", inset: s * 0.20, borderRadius: "50%",
          border: `${Math.max(2, s * 0.035)}px solid ${D(TOKD)}`, boxSizing: "border-box",
          opacity: 0.7 }} />
      )}
    </div>
  );
};

/** the repo's receipt, struck on a plate. Every value real, GitHub API 2026-08-11. */
export const MakerPlate: React.FC<{ x: number; y: number; s?: number; z?: number;
  stars?: string }> = ({ x, y, s = 1, z = 84, stars = "18,265" }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z,
    padding: `${13 * s}px ${20 * s}px`, borderRadius: 8 * s,
    background: "#F7F3E7", border: `${5 * s}px solid ${BRASSD}`, boxShadow: SH_D }}>
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
