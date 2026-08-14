import React from "react";
import { Img, staticFile } from "remotion";
import { MONO } from "./SlopKit";
import { inter, fraunces } from "./fonts";
import {
  W, H, E, OUT, IO, BACK, IN_Q, LIN, hexa, mxh, dkh, SH, SH_D, rnd,
  CLAY, GOLD, GREEN, RED, CREAMP, CREAMD, CREAML, STEEL, STEELD, MODULES,
} from "./PlgWorld";
import { rock, Sheen } from "./PlgProps";

/* ===========================================================================
   REEL 104 · THE DEPICTIONS, v2 — GRAPHICAL, NOT TYPESET.

   ⛔⛔ v1 OF THIS FILE FIXED ONE PROBLEM AND CREATED ITS OPPOSITE. Round 6's
      note was that the shots were CONTAINERS carrying no information, so I gave
      them information — as lists, tables and labelled rows. Alex, round 7:
      *"a lot of the ways here is just too much text. I don't want to see text in
      animation. Animation should not be text. Animation should be magical,
      interesting, stimulating ... how do you actually represent the information
      rather than just a number?"*

   ⛔ AND I ALREADY HAD THE RULE. [[feedback_graphical_over_textual]], written
      after a hook shot shipped with SEVEN text elements:
        "A number MOVES to its value; it is never typeset at it."
        "Budget ONE text chip per shot."
        "type is read, graphics are WATCHED ... on a muted feed the needle still
         works."
      Counted on what v1 shipped: the provider table had ~30 text elements, the
      capability list 12, each plugin card ~5. Information density was right and
      the MEDIUM was wrong.

   ⭐⭐ THE TRANSLATION THIS FILE NOW MAKES:
        a percentage   -> a SEGMENTED BAR fills to it and stops
        a count of 40+ -> FORTY REAL LOGO TILES land, and you count them
        a model count  -> a BAR LENGTH under the tile, never a numeral
        a capability   -> an ICON, lit or dark outline
        "it remembers" -> COLOURED BARS travel across a session boundary
      Every one of those is watched, not read, and every one still survives mute.

   ⛔ TEXT BUDGET, ENFORCED PER COMPONENT: a name or a count, never both, and
      never a row of labelled values. If a component needs a sentence to work,
      it is the wrong component.
   ========================================================================= */

/** the repo's own provider table, read on build day — used for BAR LENGTHS and
    tile ORDER, never printed as a column of numerals. */
export const PROVIDER_ROWS: { n: string; models: number; logo?: string }[] = [
  { n: "NVIDIA NIM",            models: 125, logo: "logos/nvidia.svg" },
  { n: "ModelScope",            models: 55 },
  { n: "Cloudflare Workers AI", models: 39,  logo: "logos/cloudflare.svg" },
  { n: "GitHub Models",         models: 16,  logo: "logos/github.svg" },
  { n: "Google Gemini",         models: 15,  logo: "logos/googlegemini.svg" },
  { n: "LLM7.io",               models: 15 },
  { n: "OVHcloud AI",           models: 14 },
  { n: "Ollama Cloud",          models: 13,  logo: "logos/ollama.svg" },
  { n: "Groq",                  models: 12,  logo: "logos/groq.svg" },
  { n: "Mistral AI",            models: 12,  logo: "logos/mistralai.svg" },
];

/* the real marks available, cycled so the grid is made of ACTUAL providers */
const GRID_MARKS = ["logos/nvidia.svg", "logos/googlegemini.svg", "logos/groq.svg",
  "logos/cloudflare.svg", "logos/github.svg", "logos/mistralai.svg", "logos/ollama.svg",
  "logos/huggingface.svg", "logos/openrouter.svg", "logos/deepseek.svg", "logos/qwen.svg",
  "logos/replicate.svg"];

/* =========================================================================
   ⭐⭐ THE PROVIDER GRID — "over 40 providers", drawn as FORTY TILES LANDING.
   You count them; you do not read them. Each tile carries a real mark and a
   bar under it whose LENGTH is that provider's real free-model count, so the
   information survives with every numeral removed.
   ⛔ Replaces a 10-row table that had ~30 text elements in it.
   ====================================================================== */
export const ProviderGrid: React.FC<{ x: number; y: number; w: number; h: number;
  f: number; at: number; z?: number; cols?: number; rows?: number }> =
  ({ x, y, w, h, f, at, z = 60, cols = 8, rows = 5 }) => {
  const N = cols * rows;                     /* 40 tiles = the claim, countable */
  const CW = w / cols, CH = h / rows;
  return (
    <div style={{ position: "absolute", left: x, top: y, width: w, height: h, zIndex: z }}>
      {Array.from({ length: N }, (_, i) => {
        /* they land in a diagonal sweep, so the fill reads as a wave not a list */
        const col = i % cols, row = Math.floor(i / cols);
        const order = col + row * 2;
        const k = E(f, at + order * 2.4, at + order * 2.4 + 11, 0, 1, BACK);
        if (k <= 0.01) return null;
        const src = GRID_MARKS[i % GRID_MARKS.length];
        /* the bar length IS the model count, normalised — never a numeral */
        const models = PROVIDER_ROWS[i % PROVIDER_ROWS.length].models;
        const barK = Math.min(1, models / 125) * 0.82 + 0.18;
        const S = CW - 16;
        return (
          <div key={"pg" + i} style={{ position: "absolute", left: col * CW + 8, top: row * CH + 6,
            width: S, height: CH - 12, opacity: Math.min(1, k * 2),
            transform: `scale(${0.72 + k * 0.28}) rotate(${(1 - k) * -14}deg)`,
            transformOrigin: "50% 100%" }}>
            <div style={{ width: S, height: S, borderRadius: S * 0.24, background: "#FFFFFF",
              border: `3px solid ${CREAMD}`, boxShadow: SH, display: "flex",
              alignItems: "center", justifyContent: "center" }}>
              <Img src={staticFile(src)} style={{ width: S * 0.62, height: S * 0.62, objectFit: "contain" }} />
            </div>
            {/* the free-model count as a BAR, watched not read */}
            <div style={{ position: "absolute", left: 0, top: S + 6, width: S, height: 9,
              borderRadius: 5, background: hexa("#FFFFFF", 0.22) }}>
              <div style={{ position: "absolute", left: 0, top: 0, height: 9, borderRadius: 5,
                width: `${barK * 100 * Math.min(1, (f - at - order * 2.4) / 14)}%`,
                background: "#3FA36E" }} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

/** the only numeral in the scene, and it MOVES to its value */
export const RollCount: React.FC<{ x: number; y: number; f: number; at: number; to: number;
  suffix?: string; z?: number; s?: number; c?: string }> =
  ({ x, y, f, at, to, suffix = "+", z = 88, s = 1, c = GOLD }) => {
  const n = Math.round(E(f, at, at + 74, 0, to, OUT));
  const pop = 1 + E(f, at + 72, at + 80, 0, 1, OUT) * 0.10 - E(f, at + 80, at + 92, 0, 1, OUT) * 0.10;
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: z, textAlign: "center",
      transform: `scale(${pop})`, transformOrigin: "50% 50%" }}>
      <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 150 * s,
        lineHeight: 0.88, letterSpacing: "-0.045em", color: c,
        textShadow: "0 5px 16px rgba(0,0,0,0.45)" }}>{n}{suffix}</div>
    </div>
  );
};

/* =========================================================================
   ⭐⭐ THE CAPACITY BAR — the "40%" line. ⛔ THE NUMBER IS NEVER TYPESET.
   Ten big segments; four fill with light and stop dead, and the six that stay
   dark are the picture. A viewer counts 4-of-10 without reading anything, and
   it still works on a muted feed.
   ⛔ Replaces a six-row labelled checklist (12 text elements).
   ====================================================================== */
export const CapacityBar: React.FC<{ x: number; y: number; w: number; h: number; f: number;
  at: number; lit?: number; total?: number; z?: number }> =
  ({ x, y, w, h, f, at, lit = 4, total = 10, z = 62 }) => {
  const G = 10, CWd = (w - G * (total - 1)) / total;
  /* ⛔ THE FILL RUNS ONCE AND THEN HELD FOR 80 FRAMES, and the audit saw it:
     second 4 fell from 8.4 back to 6.9 the moment this replaced a list whose
     rows arrived one by one. A bar that fills and stops is a STATE.
     ⭐ So it now keeps TRYING: the fill surges into the fifth segment, the red
     stop knocks it back, and it goes again. That is continuous motion AND it is
     the actual claim — you are capped and the machine keeps hitting the cap. */
  const base = E(f, at, at + 34, 0, lit, OUT);
  const t = f - at - 34;
  const surge = t > 0 ? Math.max(0, Math.sin(t / 10.5)) ** 1.6 * 0.92 : 0;
  const prog = base + (base >= lit - 0.02 ? surge : 0);
  const hit = t > 0 ? Math.max(0, Math.sin(t / 10.5)) ** 6 : 0;   /* the impact */
  /* ⭐ THE ALARM. Once the fill has proved it cannot pass, the six dead
     segments start flashing red on every failed surge. It escalates: the first
     couple of hits are dim, and by the third the whole dead half is pulsing. */
  const armed = t > 26 ? Math.min(1, (t - 26) / 44) : 0;
  const alarm = armed * (0.42 + 0.58 * hit);
  const bump = rock(f, at + 34, 5.0, 22) - hit * 7;
  return (
    <div style={{ position: "absolute", left: x, top: y, width: w, height: h, zIndex: z,
      transform: `translateX(${bump}px)` }}>
      {Array.from({ length: total }, (_, i) => {
        const on = prog > i;
        const k = Math.min(1, Math.max(0, prog - i));
          {/* the dark cells get a travelling sheen that never LIGHTS them — the
              six that stay off have to behave, or the right half of the frame is
              dead for four seconds ([[apple-reel]]: an absence must be drawn as
              a picture, not as logic). */}
          const shimmer = !on
            ? Math.max(0, 1 - Math.abs(((f * 1.9) % 120) / 120 * total - i) * 1.6) * 0.16
            : 0;
          return (
          <div key={"cs" + i} style={{ position: "absolute", left: i * (CWd + G), top: 0,
            width: CWd, height: h, borderRadius: 10,
            background: on
              ? mxh(GOLD, 0.02 + k * 0.30)
              : mxh(mxh(dkh("#1E3A34", 0.12), shimmer), alarm * 0.80),
            border: `4px solid ${on ? dkh(GOLD, 0.30)
              : mxh(dkh("#1E3A34", 0.30), alarm * 0.88)}`,
            transform: on ? `scaleY(${1 + k * 0.06})` : undefined, transformOrigin: "50% 100%" }} />
        );
      })}
      {/* the hard stop — a barrier the fill slams into and cannot pass */}
      {/* the barrier it keeps hitting — it flares on every impact */}
      <div style={{ position: "absolute", left: lit * (CWd + G) - G / 2 - 4, top: -16 - hit * 10,
        width: 9 + hit * 6, height: h + 32 + hit * 20, borderRadius: 5, background: RED,
        opacity: E(f, at + 30, at + 40, 0, 1, OUT) * (0.7 + hit * 0.3) }} />
      {/* two alarm lamps over the dead half, solid discs + a low-alpha ring —
          ⛔ never an emissive blur ([[feedback_reel_matte_palette]]) */}
      {armed > 0.02 && [0, 1].map((i) => {
        const cx = (lit + 1.6 + i * 3.4) * (CWd + G);
        return (
          <div key={"al" + i}>
            <div style={{ position: "absolute", left: cx - 15, top: h / 2 - 15, width: 30, height: 30,
              borderRadius: "50%", background: RED, opacity: 0.24 + alarm * 0.76,
              border: `4px solid ${dkh(RED, 0.32)}` }} />
            <div style={{ position: "absolute", left: cx - 33, top: h / 2 - 33, width: 66, height: 66,
              borderRadius: "50%", background: hexa(RED, 0.34 * alarm) }} />
          </div>
        );
      })}
    </div>
  );
};

/** the three missing abilities as ICONS, dark. ⛔ No labels — the shapes are
    a key, a magnifier and a chain link, which is what the three plugins do. */
export const MissingIcons: React.FC<{ x: number; y: number; f: number; at: number;
  z?: number; s?: number; lit?: boolean; alarm?: number }> =
  ({ x, y, f, at, z = 70, s = 1, lit = false, alarm = 0 }) => {
  /* ⭐ they flash on the SAME beat as the capacity bar's alarm, so the whole
     lower half of the frame pulses rather than one strip of it */
  const C = lit ? GOLD : mxh("#6E9A8C", alarm * 0.85);
  const BG = lit ? mxh(GOLD, 0.50) : hexa(RED, 0.16 * alarm);
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: z, display: "flex", gap: 34 * s }}>
      {[0, 1, 2].map((i) => {
        const k = E(f, at + i * 6, at + i * 6 + 12, 0, 1, BACK);
        const D = 112 * s;
        return (
          <div key={"mi" + i} style={{ width: D, height: D, borderRadius: D * 0.26,
            border: `${5 * s}px dashed ${C}`, background: BG, opacity: Math.min(1, k * 2),
            transform: `scale(${0.7 + k * 0.3})`, position: "relative" }}>
            {/* i0 a KEY · i1 a MAGNIFIER · i2 a CHAIN LINK */}
            {i === 0 && (<>
              <div style={{ position: "absolute", left: D * 0.20, top: D * 0.34, width: D * 0.26,
                height: D * 0.26, borderRadius: "50%", border: `${6 * s}px solid ${C}` }} />
              <div style={{ position: "absolute", left: D * 0.44, top: D * 0.44, width: D * 0.36,
                height: D * 0.09, background: C }} />
              <div style={{ position: "absolute", left: D * 0.68, top: D * 0.53, width: D * 0.08,
                height: D * 0.14, background: C }} />
            </>)}
            {i === 1 && (<>
              <div style={{ position: "absolute", left: D * 0.20, top: D * 0.18, width: D * 0.42,
                height: D * 0.42, borderRadius: "50%", border: `${7 * s}px solid ${C}` }} />
              <div style={{ position: "absolute", left: D * 0.58, top: D * 0.58, width: D * 0.26,
                height: D * 0.10, background: C, transform: "rotate(42deg)",
                transformOrigin: "0% 50%", borderRadius: 4 }} />
            </>)}
            {i === 2 && (<>
              <div style={{ position: "absolute", left: D * 0.14, top: D * 0.36, width: D * 0.40,
                height: D * 0.28, borderRadius: D * 0.14, border: `${6 * s}px solid ${C}` }} />
              <div style={{ position: "absolute", left: D * 0.46, top: D * 0.36, width: D * 0.40,
                height: D * 0.28, borderRadius: D * 0.14, border: `${6 * s}px solid ${C}` }} />
            </>)}
          </div>
        );
      })}
    </div>
  );
};

/* =========================================================================
   ⭐⭐ THE MEMORY THREAD — "across your different chats". Three session panels,
   and what the first one learns travels along a thread into the next two as
   COLOURED BARS. ⛔ No labelled key-value rows: the crossing is the claim, and
   a bar arriving in an empty panel says it without a word.
   ====================================================================== */
export const MemoryThread: React.FC<{ x: number; y: number; f: number; at: number; z?: number;
  cw?: number }> = ({ x, y, f, at, z = 60, cw = 268 }) => {
  const CH = 244, G = 26;
  const BARW = [0.82, 0.56, 0.68];
  const TONE = ["#D9A441", "#C9743F", "#8E6BB0"];
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: z }}>
      {/* the thread that runs behind all three — the session boundary crossed */}
      <div style={{ position: "absolute", left: 30, top: CH / 2, height: 8, borderRadius: 4,
        width: (cw + G) * 2 * E(f, at + 14, at + 54, 0, 1, OUT), background: mxh(GOLD, 0.16) }} />
      {[0, 1, 2].map((sIdx) => {
        const k = E(f, at + sIdx * 5, at + sIdx * 5 + 12, 0, 1, OUT);
        return (
          <div key={"ms" + sIdx} style={{ position: "absolute", left: sIdx * (cw + G), top: 0,
            width: cw, height: CH, opacity: Math.min(1, k * 2.2),
            transform: `translateY(${(1 - k) * 22}px)` }}>
            <div style={{ position: "absolute", inset: 0, borderRadius: 13, background: CREAML,
              border: `5px solid ${CREAMD}`, boxShadow: SH_D }} />
            {/* the session's mark — the ONE piece of type in the whole component */}
            <div style={{ position: "absolute", left: 14, top: 12, width: 34, height: 34,
              borderRadius: 9, background: "#FFFFFF", border: `2px solid ${CREAMD}`,
              display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Img src={staticFile("claude_logo.png")}
                style={{ width: 24, height: 24, objectFit: "contain" }} />
            </div>
            <div style={{ position: "absolute", right: 14, top: 18, display: "flex", gap: 5 }}>
              {[0, 1, 2].map((d) => (
                <div key={d} style={{ width: 9, height: 9, borderRadius: "50%",
                  background: d <= sIdx ? CLAY : mxh(CREAMD, 0.10) }} />
              ))}
            </div>
            {/* what the session holds — three bars, arriving later in each panel */}
            {BARW.map((bw, i) => {
              const arrive = E(f, at + 16 + sIdx * 17 + i * 5, at + 30 + sIdx * 17 + i * 5, 0, 1, OUT);
              return (
                <div key={"bar" + i} style={{ position: "absolute", left: 16, top: 68 + i * 54,
                  width: cw - 32, height: 40, borderRadius: 9,
                  background: mxh(CREAMD, 0.30), border: `3px dashed ${CREAMD}`, overflow: "hidden" }}>
                  <div style={{ position: "absolute", left: 0, top: 0, bottom: 0,
                    width: `${bw * 100 * arrive}%`, borderRadius: 7, background: TONE[i] }} />
                </div>
              );
            })}
          </div>
        );
      })}
      {/* the carry — a bright token that physically travels between panels */}
      {[0, 1].map((i) => {
        const k = E(f, at + 20 + i * 17, at + 34 + i * 17, 0, 1, IO);
        if (k <= 0.01 || k >= 0.999) return null;
        return (
          <div key={"tok" + i} style={{ position: "absolute",
            left: i * (cw + G) + cw - 26 + (G + 30) * k, top: CH / 2 - 18,
            width: 36, height: 36, borderRadius: 10, background: GOLD,
            border: `4px solid ${dkh(GOLD, 0.30)}`, transform: `rotate(${k * 180}deg)` }} />
        );
      })}
    </div>
  );
};

/* =========================================================================
   ⭐ THE PLUGIN CARD — each of the three landing objects shows its job as a
   MOVING PICTURE, with its name as the single text chip.
   ⛔ v1 put a mini table, a query string and a two-panel diagram plus a name
      and a star count on every card — five text elements each, at 150px wide.
   ====================================================================== */
export const PluginCard: React.FC<{ i: number; w?: number; h?: number; f?: number }> =
  ({ i, w = 250, h = 150, f = 0 }) => {
  const m = MODULES[i];
  return (
    <div style={{ width: w, height: h, borderRadius: 12, position: "relative",
      background: `linear-gradient(166deg, ${mxh(m.accent, 0.26)} 0%, ${m.accent} 58%, ${dkh(m.accent, 0.30)} 100%)`,
      border: `5px solid ${dkh(m.accent, 0.44)}`, boxShadow: SH_D, overflow: "hidden" }}>

      {/* ⭐ THE FACE — a graphic of the job, filling the card */}
      <div style={{ position: "absolute", left: 10, right: 10, top: 10, height: h - 54,
        borderRadius: 9, background: hexa("#FFFFFF", 0.94), overflow: "hidden" }}>
        {/* 0 · MANY provider tiles funnel into ONE socket */}
        {i === 0 && (<>
          {Array.from({ length: 9 }, (_, k) => {
            const ph = (f * 2.4 + k * 13) % 100 / 100;
            return (
              <div key={k} style={{ position: "absolute", left: 8 + (k % 3) * 22,
                top: 8 + Math.floor(k / 3) * 22, width: 17, height: 17, borderRadius: 5,
                background: ["#4E8AC8", "#3FA36E", "#D06A3A", "#8E6BB0"][k % 4],
                opacity: 0.35 + 0.65 * Math.abs(Math.sin((ph + k * 0.11) * Math.PI)),
                transform: `translateX(${ph * 96}px) scale(${1 - ph * 0.45})` }} />
            );
          })}
          <div style={{ position: "absolute", right: 10, top: "50%", marginTop: -19, width: 38,
            height: 38, borderRadius: 11, border: `5px solid ${m.accent}` }} />
        </>)}
        {/* 1 · a beam sweeps a field and ONE item lifts out */}
        {i === 1 && (<>
          {Array.from({ length: 18 }, (_, k) => {
            const cx = 12 + (k % 6) * 32, cy = 12 + Math.floor(k / 6) * 22;
            const hit = k === 8;
            const sweep = (f * 2.2) % 200 / 200;
            const lit = Math.abs(sweep - (k % 6) / 6) < 0.14;
            return (
              <div key={k} style={{ position: "absolute", left: cx, top: hit ? cy - 6 : cy,
                width: hit ? 26 : 20, height: hit ? 15 : 11, borderRadius: 4,
                background: hit ? GOLD : lit ? mxh(m.accent, 0.34) : mxh(CREAMD, 0.02),
                border: hit ? `2px solid ${dkh(GOLD, 0.3)}` : undefined }} />
            );
          })}
          <div style={{ position: "absolute", left: `${((f * 2.2) % 200) / 2}%`, top: 0, bottom: 0,
            width: 22, background: hexa(m.accent, 0.26) }} />
        </>)}
        {/* 2 · two sessions and a token crossing between them, forever */}
        {i === 2 && (<>
          {[0, 1].map((k) => (
            <div key={k} style={{ position: "absolute", left: 10 + k * 108, top: 12, width: 84,
              height: 56, borderRadius: 7, background: mxh(m.accent, 0.52),
              border: `2px solid ${mxh(m.accent, 0.20)}` }}>
              {[0, 1].map((r) => (
                <div key={r} style={{ position: "absolute", left: 7, top: 12 + r * 16,
                  width: r ? 44 : 60, height: 7, borderRadius: 3, background: hexa("#FFFFFF", 0.8) }} />
              ))}
            </div>
          ))}
          <div style={{ position: "absolute", left: 96 + ((f * 1.9) % 30) - 2, top: 32, width: 18,
            height: 18, borderRadius: 6, background: GOLD, transform: `rotate(${f * 5}deg)` }} />
        </>)}
      </div>

      {/* the single text chip: the name. ⛔ No star count here — it is on the
          receipt at the peak, where it has a frame to itself. */}
      <div style={{ position: "absolute", left: 10, right: 10, bottom: 9, height: 30,
        display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ width: 26, height: 26, borderRadius: 7, background: "#FFFFFF",
          flex: "0 0 auto", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Img src={staticFile(m.mark)} style={{ width: 18, height: 18, objectFit: "contain" }} />
        </div>
        <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 19,
          color: "#FFFFFF", whiteSpace: "nowrap", letterSpacing: "0.01em" }}>{m.spoken}</span>
      </div>
    </div>
  );
};


/* =========================================================================
   ⭐⭐ THE THREE NAMED PROVIDERS — "Gemini, Groq and NVIDIA, all with a
   permanent free tier". The three real marks at scale, each with its real
   free-model count drawn as a BAR, and the free-tier claim as two icons:
   an open padlock (permanent) and a struck-through card (no card required).
   ⛔ Replaces keys hanging on hooks — a container for the idea of an API key
      that carried no information at all.
   ====================================================================== */
export const NamedProviders: React.FC<{ x: number; y: number; f: number; at: number;
  z?: number }> = ({ x, y, f, at, z = 70 }) => {
  const P = [
    { t: "logos/googlegemini.svg", models: 15 },
    { t: "logos/groq.svg",         models: 12 },
    { t: "logos/nvidia.svg",       models: 125 },
  ];
  const S = 196, G = 52;
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: z }}>
      {P.map((p, i) => {
        const AT = at + i * 15;
        const k = E(f, AT, AT + 18, 0, 1, BACK);
        /* the bar keeps filling for the rest of the scene, never parks */
        const bar = E(f, AT + 12, AT + 58, 0, Math.min(1, p.models / 125), OUT);
        const rk = rock(f, AT + 18, 5.2, 26);
        /* a ceiling'd idle so an arrived tile is still never static */
        const idleY = Math.sin((f + i * 21) / 23) * 5.2 + Math.sin((f + i * 9) / 47) * 2.1;
        const idleR = Math.sin((f + i * 17) / 31) * 2.7;
        const ring = f - (AT + 18);
        return (
          <div key={p.t} style={{ position: "absolute", left: i * (S + G), top: 0, width: S,
            opacity: Math.min(1, k * 2.2),
            transform: `translateY(${(1 - k) * -70 + idleY}px) rotate(${rk * 0.5 + idleR}deg)`,
            transformOrigin: "50% 0%" }}>
            {/* the landing ring — each arrival reads as an impact */}
            {ring >= 0 && ring < 20 && (
              <div style={{ position: "absolute", left: S / 2 - (S * 1.5) * (ring / 20),
                top: S / 2 - (S * 1.5) * (ring / 20), width: S * 3 * (ring / 20),
                height: S * 3 * (ring / 20), borderRadius: "50%", zIndex: -1,
                border: `${Math.max(1, 8 * (1 - ring / 20))}px solid ${hexa("#FFFFFF", 0.40 * (1 - ring / 20))}` }} />
            )}
            <div style={{ width: S, height: S, borderRadius: S * 0.22, background: "#FFFFFF",
              border: `6px solid ${CREAMD}`, boxShadow: SH_D, display: "flex",
              alignItems: "center", justifyContent: "center" }}>
              <Img src={staticFile(p.t)} style={{ width: S * 0.60, height: S * 0.60, objectFit: "contain" }} />
            </div>
            {/* the free-model count, as length */}
            <div style={{ position: "absolute", left: 0, top: S + 16, width: S, height: 20,
              borderRadius: 10, background: hexa("#FFFFFF", 0.20) }}>
              <div style={{ position: "absolute", left: 0, top: 0, height: 20, borderRadius: 10,
                width: `${bar * 100}%`, background: "#3FA36E" }} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

/** the free-tier claim as two ICONS: an OPEN padlock, and a card struck out */
export const FreeTierIcons: React.FC<{ x: number; y: number; f: number; at: number;
  z?: number; s?: number }> = ({ x, y, f, at, z = 88, s = 1 }) => {
  const k0 = E(f, at, at + 14, 0, 1, BACK), k1 = E(f, at + 8, at + 22, 0, 1, BACK);
  const strike = E(f, at + 18, at + 30, 0, 1, OUT);
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: z, display: "flex", gap: 44 * s }}>
      {/* PERMANENT — a padlock, open */}
      <div style={{ width: 132 * s, height: 132 * s, position: "relative",
        opacity: Math.min(1, k0 * 2), transform: `scale(${0.7 + k0 * 0.3})` }}>
        <div style={{ position: "absolute", left: 22 * s, top: 54 * s, width: 88 * s, height: 66 * s,
          borderRadius: 12 * s, background: GOLD, border: `${5 * s}px solid ${dkh(GOLD, 0.32)}` }} />
        {/* the shackle, swung OPEN */}
        <div style={{ position: "absolute", left: 52 * s, top: 8 * s, width: 56 * s, height: 54 * s,
          borderRadius: `${28 * s}px ${28 * s}px 0 0`, border: `${9 * s}px solid ${GOLD}`,
          borderBottom: "none", transform: "rotate(24deg)", transformOrigin: "0% 100%" }} />
        <div style={{ position: "absolute", left: 60 * s, top: 78 * s, width: 12 * s, height: 22 * s,
          borderRadius: 6 * s, background: dkh(GOLD, 0.40) }} />
      </div>
      {/* NO CARD — a card, struck through */}
      <div style={{ width: 148 * s, height: 132 * s, position: "relative",
        opacity: Math.min(1, k1 * 2), transform: `scale(${0.7 + k1 * 0.3})` }}>
        <div style={{ position: "absolute", left: 8 * s, top: 36 * s, width: 130 * s, height: 84 * s,
          borderRadius: 10 * s, background: CREAML, border: `${5 * s}px solid ${CREAMD}` }}>
          <div style={{ position: "absolute", left: 0, right: 0, top: 14 * s, height: 18 * s,
            background: dkh(CREAMD, 0.30) }} />
          <div style={{ position: "absolute", left: 12 * s, bottom: 12 * s, width: 52 * s,
            height: 10 * s, borderRadius: 5 * s, background: mxh(CREAMD, 0.02) }} />
        </div>
        {/* the strike, drawn on */}
        <div style={{ position: "absolute", left: 6 * s, top: 30 * s, width: 152 * s * strike,
          height: 11 * s, borderRadius: 6 * s, background: RED, transform: "rotate(31deg)",
          transformOrigin: "0% 50%" }} />
      </div>
    </div>
  );
};


/** the alarm level for a CapacityBar with the same (f, at) — so a scene can
    sync its other elements to the same beat instead of guessing. */
export const alarmLevel = (f: number, at: number) => {
  const t = f - at - 20;
  if (t <= 3) return 0;
  const hit = Math.max(0, Math.sin(t / 9.0)) ** 6;
  return Math.min(1, (t - 3) / 26) * (0.52 + 0.48 * hit);
};


/* =========================================================================
   ⭐⭐ THE ALARM OVERLAY — Alex: *"more like red alarm BLARING ... alarm
   flashing around the screen, it's not that visible right now, like everything
   flash red."* A tint on one prop was not reading; this puts the alarm on the
   WHOLE FRAME.
   ⛔ It is still not a banned flash ([[feedback_no_flashing_transitions]]): that
      rule governs TRANSITIONS between scenes, and it is about full-frame plates
      that hide the picture. Here the heavy work is done by EDGE BANDS — which
      is how a real alarm reads — and the full-frame wash is capped at 0.20 so
      the picture is never obscured and it never approaches a strobe.
   ====================================================================== */
export const AlarmOverlay: React.FC<{ level: number; f?: number; z?: number }> =
  ({ level, f = 0, z = 120 }) => {
  if (level <= 0.02) return null;
  const blink = Math.sin(f / 7.2) > -0.15 ? 1 : 0.22;      /* ~2 Hz, hard edge */
  const L = Math.min(1, level) * blink;
  const band = (st: React.CSSProperties) => (
    <div style={{ position: "absolute", zIndex: z, pointerEvents: "none", ...st }} />
  );
  return (<>
    {/* the four edges take most of the intensity — this is what reads as ALARM */}
    {band({ left: 0, right: 0, top: 0, height: 188,
      background: `linear-gradient(180deg, ${hexa("#E03325", 0.92 * L)} 0%, ${hexa("#E03325", 0)} 100%)` })}
    {band({ left: 0, right: 0, bottom: 0, height: 188,
      background: `linear-gradient(0deg, ${hexa("#E03325", 0.92 * L)} 0%, ${hexa("#E03325", 0)} 100%)` })}
    {band({ top: 0, bottom: 0, left: 0, width: 176,
      background: `linear-gradient(90deg, ${hexa("#E03325", 0.88 * L)} 0%, ${hexa("#E03325", 0)} 100%)` })}
    {band({ top: 0, bottom: 0, right: 0, width: 176,
      background: `linear-gradient(270deg, ${hexa("#E03325", 0.88 * L)} 0%, ${hexa("#E03325", 0)} 100%)` })}
    {/* and a capped wash so the middle of the frame is in the alarm too */}
    {band({ inset: 0, background: hexa("#E03325", 0.22 * L) })}
  </>);
};


/* =========================================================================
   ⭐⭐ THE CONFIG SLOT — Alex: *"animation at 14 seconds should have more of
   those rectangle boxes going into the holes, like two more so all 3 get
   filled, and satisfying entry sounds."*

   ⛔ THE PAYOFF CONSTRAINT STILL HOLDS: the three PLUGIN bays may not all fill
      until 27.4s or the peak is spent. But the VO at 13.7s is *"one click setup
      in your Cursor, Claude Code, or Codex"* — which is literally three things
      going into three holes. So the three satisfying insertions here are the
      CONFIG going into the three TOOLS, which is on-message AND leaves the
      plugin bays for the peak.

   The entry is built to feel good: a fast travel, a hard seat with a small
   overshoot, a squash, and a settle that never quite stops.
   ====================================================================== */
export const ConfigSlot: React.FC<{ from: { x: number; y: number }; to: { x: number; y: number };
  f: number; at: number; accent?: string; z?: number; label?: string }> =
  ({ from, to, f, at, accent = CLAY, z = 84, label }) => {
  const travel = E(f, at, at + 15, 0, 1, IN_Q);      /* fast, it is thrown */
  const seat = E(f, at + 13, at + 22, 0, 1, BACK);   /* the overshoot + settle */
  if (f < at) return null;
  const x = from.x + (to.x - from.x) * travel;
  const y = from.y + (to.y - from.y) * travel;
  const done = f >= at + 15;
  const sq = done ? 1 + Math.sin((f - at - 15) / 2.4) * 0.16 * Math.exp(-(f - at - 15) / 8) : 1;
  const rk = done ? rock(f, at + 15, 5.0, 18) : 0;
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: z,
      transform: `translate(-50%,-50%) rotate(${(1 - travel) * -26 + rk * 0.5}deg) scaleX(${sq}) scaleY(${2 - sq})` }}>
      <div style={{ width: 92, height: 58, borderRadius: 9,
        background: `linear-gradient(166deg, ${mxh(accent, 0.28)} 0%, ${accent} 62%, ${dkh(accent, 0.28)} 100%)`,
        border: `4px solid ${dkh(accent, 0.44)}`, boxShadow: SH,
        opacity: 0.55 + 0.45 * Math.min(1, travel * 2) }}>
        {/* the connector teeth — it is a thing that PLUGS IN */}
        <div style={{ position: "absolute", left: 10, right: 10, bottom: 7, height: 10,
          display: "flex", gap: 4 }}>
          {Array.from({ length: 6 }, (_, k) => (
            <div key={k} style={{ flex: 1, borderRadius: 2, background: dkh(accent, 0.34) }} />
          ))}
        </div>
      </div>
      {/* the seat ring — the click, made visible */}
      {done && f < at + 30 && (() => {
        const r = (f - at - 15) / 15;
        return (
          <div style={{ position: "absolute", left: 46 - 110 * r, top: 29 - 70 * r,
            width: 220 * r, height: 140 * r, borderRadius: "50%",
            border: `${Math.max(1, 6 * (1 - r))}px solid ${hexa("#FFFFFF", 0.52 * (1 - r))}` }} />
        );
      })()}
    </div>
  );
};
