import React from "react";
import { staticFile, Img } from "remotion";
import { inter, fraunces } from "./fonts";
import { MONO } from "./SlopKit";
import {
  W, H, E, OUT, IO, BACK, IN_Q, LIN, hexa, SH, SH_D, rnd, dkh, mxh,
  CLAY, GOLD, GREEN, RED, PAPER, INK, STEEL, STEELD, STEELL,
  CONC, CONCD, SHEET, SHEETD, AMBER, AMBERD, CARD, CARDD, LIME, Sheen,
} from "./CmpWorld";

/* ===========================================================================
   REEL 101 "COMPRESS" · THE PROPS.  Board: storyboards/101-compress.md.

   ⛔⛔ DRAW, DON'T STACK ([[reel-draw-dont-stack]]). Anything whose identity is
      its OUTLINE is one inline <svg> with real paths — the press, the arch, the
      drawer pull, the Claude-mark lintel. Manufactured faces (a sheet, a flap
      cell, a plate, a column) render fine as shaded rects and stay rects.
      Every prop below passes the SILHOUETTE TEST: nameable in flat black.
   ⛔ VALUE separation: hero and ground differ in LIGHTNESS, not just hue.
   ⛔ Flat + one shade + one highlight. One light direction: above-front-left.
   ========================================================================= */

/* --------------------------------------------------------------------------
   THE SHEET — what your agent reads. The face carries REAL content (a stack
   trace over a JSON blob) and the corner carries the token count you are
   billed for. Height IS the token count: that is the reel's whole scale rule.
   ----------------------------------------------------------------------- */
/* ⛔⛔ ROUND 5 — ALEX: *"instead of having TEXT it needs to show graphics …
   who cares about those little line text things, no one wants to see that"*.
   He is right and the maths proves it: a slab is 130-200px wide, so its body
   text rendered at 4-6px. Nobody can read it, so it cost legibility AND read
   as grey noise. The face is now DRAWN CONTENT — a syntax block with coloured
   tokens, a JSON tree, a log with severity bars, a bar chart, a diff with
   red/green bands. At 130px those read instantly as "rich data"; grey lines
   never did. ⛔ Solid paints only, no glow. */

const SYN = ["#C1704A", "#5E8FB8", "#7FA86A", "#B5892F", "#8A8578"];

/** ⛔⛔ ROUND 6 — ALEX: *"the graphics on the papers need to be hierarchical and
    simple to see, not so long like text things — just one graphic is good … or
    claude sprites on the papers"*.
    Round 5 replaced text with MANY small coloured rows, which at 130px is the
    same fault wearing a costume: no hierarchy, nothing dominant, still reads as
    stripes. Each face now carries **ONE dominant symbol** filling ~62% of the
    slab, plus a single caption bar. Readable in a quarter second at thumbnail
    size, which is the only size these are ever seen at. */
const Face: React.FC<{ kind: string; w: number; h: number; c: string; seed: number }> =
  ({ kind, w: ww, h: hh, c, seed }) => {
  const S = Math.min(ww, hh) * 0.62;          /* the hero symbol's box */
  const cx = ww / 2, cy = hh * 0.46;
  const ink = dkh(c, 0.62);
  const cap = (t: string, col: string) => (
    <div style={{ position: "absolute", left: ww * 0.10, right: ww * 0.10, top: hh * 0.80,
      height: Math.max(6, hh * 0.075), background: col, borderRadius: 2, opacity: 0.9 }} />
  );
  const box = { position: "absolute" as const, left: cx - S / 2, top: cy - S / 2,
    width: S, height: S };

  /* ⛔⛔ ROUND 11 — ALEX: *"its not clear to target our direct audience with the
     visuals … its just random graphics right now"*. Correct, and it was the
     most expensive miss in the reel: alert triangles and donuts say "documents"
     to ANYONE, which means they filter for nobody. The slabs are what a Claude
     Code user stares at all day, so they now render CLAUDE CODE'S OWN OUTPUT —
     the bullet, the tool name, the path, the ⎿ result line. A viewer who has
     never opened Claude Code reads it as code; a viewer who has reads their own
     terminal, and that is the audience filter ([[reel 95 round 3]]). */
  /* ⛔⛔ ROUND 13 — ALEX: *"you should have logos of ai companies like claude,
     chatgpt, cursor etc on those papers for the hook beginning part"*.
     Right, and it is the sharpest version of the audience-filter fix: in the
     first two seconds the viewer cannot READ anything, so the slabs have to be
     recognisable at a glance and at 40deg of rotation. A mark is; a tool-call
     line is not. Every logo here is a real file from public/logos and every one
     is a documented headroom target (its README wrap list + its provider list),
     so none of it is invented ([[feedback_real_marks_are_the_props]]). */
  if (kind === "logo") {
    /* ⛔ CLAUDE LEADS THE SET — it appears roughly twice as often as any other
       mark, because this reel's audience is Claude Code users first and the
       mark is the filter ([[reel 95 round 3]]). The rest are the tools they
       also run, all documented headroom targets. */
    const LOGOS = ["claude.svg", "openai.png", "claude.svg", "cursor.svg",
                   "claude.svg", "githubcopilot.svg", "googlegemini.svg",
                   "claude.svg", "cline.svg", "ollama.svg", "claude.svg",
                   "windsurf.svg"];
    const file = LOGOS[Math.abs(Math.floor(seed)) % LOGOS.length];
    /* ⛔ ROUND 14 — ALEX: *"the logos need to be big on the papers so its easy to
       see"*. 0.56 of the short side was sized for a slab sitting still; these
       tumble past at 40deg in under a second. The mark now takes the short side
       almost entirely, the tile padding is halved, and the caption bar shrinks
       so nothing competes with it. */
    const L = Math.min(ww, hh) * 0.86;
    return (<>
      <div style={{ position: "absolute", left: cx - L / 2, top: cy - L / 2, width: L,
        height: L, borderRadius: L * 0.16, background: "#FFFFFF",
        border: `${Math.max(2, L * 0.035)}px solid ${dkh(c, 0.26)}`, boxSizing: "border-box",
        display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Img src={staticFile("logos/" + file)}
          style={{ width: L * 0.80, height: L * 0.80, objectFit: "contain" }} />
      </div>
      {/* one bar under it so the slab still reads as a DOCUMENT, not a card */}
      <div style={{ position: "absolute", left: ww * 0.24, right: ww * 0.24, top: hh * 0.88,
        height: Math.max(4, hh * 0.036), background: dkh(c, 0.34), borderRadius: 2,
        opacity: 0.7 }} />
    </>);
  }
  if (kind === "toolcall") {
    const TOOLS: [string, string, string][] = [
      ["Read", "server/ingest.py", "Read 412 lines"],
      ["Bash", "pytest -q tests/", "47 passed, 2 failed"],
      ["Grep", "\"SchemaError\"", "18 matches"],
      ["Edit", "api/routes.ts", "Applied 3 edits"],
      ["Read", "node_modules/…", "Read 9,204 lines"],
    ];
    /* ⛔ seed arrives as a float (it is offset by x), so index it safely */
    const [tool, arg, res] = TOOLS[Math.abs(Math.floor(seed)) % 5];
    const fs = Math.max(5.2, ww / 17);
    return (
      <div style={{ position: "absolute", left: ww * 0.07, top: hh * 0.16, right: ww * 0.07 }}>
        <div style={{ display: "flex", alignItems: "center", gap: ww * 0.035 }}>
          <div style={{ width: fs * 0.82, height: fs * 0.82, borderRadius: "50%",
            background: dkh(CLAY, 0.02), flexShrink: 0 }} />
          <span style={{ fontFamily: MONO, fontWeight: 900, fontSize: fs,
            color: dkh(c, 0.72) }}>{tool}</span>
          <span style={{ fontFamily: MONO, fontWeight: 700, fontSize: fs * 0.92,
            color: dkh(c, 0.50), overflow: "hidden", whiteSpace: "nowrap",
            textOverflow: "ellipsis" }}>({arg})</span>
        </div>
        <div style={{ marginTop: hh * 0.055, display: "flex", gap: ww * 0.035 }}>
          <span style={{ fontFamily: MONO, fontWeight: 700, fontSize: fs,
            color: dkh(c, 0.40) }}>⎿</span>
          <span style={{ fontFamily: MONO, fontWeight: 700, fontSize: fs * 0.92,
            color: dkh(c, 0.46), whiteSpace: "nowrap" }}>{res}</span>
        </div>
        {/* the output block underneath, as bars — this is the bulk you re-send */}
        {Array.from({ length: 7 }, (_, i) => (
          <div key={i} style={{ marginTop: hh * 0.032, height: hh * 0.030,
            width: `${52 + rnd(seed + i, 2) * 44}%`, background: dkh(c, 0.34),
            opacity: 0.62 }} />
        ))}
      </div>
    );
  }
  if (kind === "chart") return (<>
    <div style={box}>
      {[0.42, 0.72, 1.0, 0.58].map((v, i) => (
        <div key={i} style={{ position: "absolute", bottom: 0, left: i * (S / 4) + S * 0.045,
          width: S * 0.19, height: S * v,
          background: i === 2 ? dkh(CLAY, 0.02) : dkh(c, 0.42), borderRadius: 1.5 }} />
      ))}
    </div>
    {cap("", dkh(c, 0.34))}
  </>);

  if (kind === "alert") return (<>
    <svg style={box} viewBox="0 0 100 100">
      <path d="M50 8 L96 88 L4 88 Z" fill={dkh(RED, 0.06)} stroke={dkh(RED, 0.34)} strokeWidth="6" />
      <rect x="44" y="34" width="12" height="30" rx="4" fill={mxh(RED, 0.72)} />
      <circle cx="50" cy="74" r="7" fill={mxh(RED, 0.72)} />
    </svg>
    {cap("", dkh(RED, 0.22))}
  </>);

  if (kind === "claude") return (<>
    <div style={{ ...box, borderRadius: S * 0.22, background: "#FFFFFF",
      border: `${Math.max(2, S * 0.045)}px solid ${dkh(c, 0.30)}`, display: "flex",
      alignItems: "center", justifyContent: "center" }}>
      <Img src={staticFile("claude_logo.png")}
        style={{ width: S * 0.68, height: S * 0.68, objectFit: "contain" }} />
    </div>
    {cap("", dkh(CLAY, 0.14))}
  </>);

  if (kind === "braces") return (<>
    <svg style={box} viewBox="0 0 100 100">
      <path d="M38 10 Q18 10 18 30 Q18 50 6 50 Q18 50 18 70 Q18 90 38 90"
        fill="none" stroke={ink} strokeWidth="11" strokeLinecap="round" />
      <path d="M62 10 Q82 10 82 30 Q82 50 94 50 Q82 50 82 70 Q82 90 62 90"
        fill="none" stroke={ink} strokeWidth="11" strokeLinecap="round" />
    </svg>
    {cap("", dkh(c, 0.34))}
  </>);

  if (kind === "donut") return (<>
    <svg style={box} viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="34" fill="none" stroke={dkh(c, 0.28)} strokeWidth="19" />
      <circle cx="50" cy="50" r="34" fill="none" stroke={dkh(GREEN, 0.06)} strokeWidth="19"
        strokeDasharray={`${44 + (seed % 5) * 12} 400`} transform="rotate(-90 50 50)" />
    </svg>
    {cap("", dkh(c, 0.34))}
  </>);

  if (kind === "wave") return (<>
    <div style={box}>
      {Array.from({ length: 11 }, (_, i) => {
        const v = 0.22 + Math.abs(Math.sin(i * 1.35 + seed)) * 0.78;
        return <div key={i} style={{ position: "absolute", left: i * (S / 11) + S * 0.018,
          top: S / 2 - (S * v) / 2, width: S * 0.055, height: S * v, borderRadius: 2,
          background: i % 4 === 1 ? dkh(GOLD, 0.06) : dkh(c, 0.44) }} />;
      })}
    </div>
    {cap("", dkh(c, 0.34))}
  </>);

  if (kind === "folder") return (<>
    <svg style={box} viewBox="0 0 100 100">
      <path d="M6 24 L40 24 L48 34 L94 34 L94 84 L6 84 Z" fill={dkh(GOLD, 0.16)}
        stroke={dkh(GOLD, 0.42)} strokeWidth="6" />
      <path d="M6 24 L40 24 L48 34 L6 34 Z" fill={dkh(GOLD, 0.02)} />
    </svg>
    {cap("", dkh(GOLD, 0.28))}
  </>);

  /* default `diff`: one big split panel, red half vs green half */
  return (<>
    <div style={box}>
      <div style={{ position: "absolute", left: 0, top: 0, width: "100%", height: "46%",
        background: dkh(RED, 0.22), borderLeft: `${S * 0.09}px solid ${dkh(RED, 0.02)}` }} />
      <div style={{ position: "absolute", left: 0, bottom: 0, width: "100%", height: "46%",
        background: dkh(GREEN, 0.24), borderLeft: `${S * 0.09}px solid ${dkh(GREEN, 0.02)}` }} />
    </div>
    {cap("", dkh(c, 0.34))}
  </>);
};

/* ⛔ ONE symbol per slab, and the set is deliberately small so the eye learns
   them across the reel. A Claude mark rides ~1 slab in 7 (Alex: "or claude
   sprites on the papers"). */
/* ⛔ TOOLCALL LEADS THE SET — it is the audience filter, so it is the face a
   viewer sees most often as the flood goes past. */
export const SHEET_KINDS = ["logo", "logo", "logo", "logo", "logo", "logo", "logo", "logo"];

export const Sheet: React.FC<{ x: number; y: number; w?: number; h?: number; z?: number;
  tok?: string; lit?: number; rot?: number; kind?: string; label?: string;
  dense?: number; seed?: number }> =
  ({ x, y, w: ww = 176, h: hh = 300, z = 40, tok, lit = 1, rot = 0, kind = "syntax",
     label, dense = 1, seed = 0 }) => {
  const body = mxh(SHEET, (lit - 1) * 0.5 + 0.02);
  const k = kind === "trace" ? "toolcall" : kind === "json" ? "toolcall" : kind === "syntax" ? "braces" : kind === "log" ? "toolcall" : kind === "tree" ? "folder" : kind;
  return (
    <div style={{ position: "absolute", left: x, top: y, width: ww, height: hh, zIndex: z,
      transform: rot ? `rotate(${rot}deg)` : undefined, transformOrigin: "50% 100%",
      background: `linear-gradient(101deg, ${mxh(body, 0.20)} 0%, ${body} 34%, ${dkh(body, 0.22)} 100%)`,
      border: `2px solid ${dkh(body, 0.40)}`, boxShadow: SH_D, overflow: "hidden",
      boxSizing: "border-box", opacity: 0.36 + lit * 0.64 }}>
      <div style={{ position: "absolute", left: 0, right: 0, top: label ? 15 : 0,
        bottom: tok ? 24 : 0 }}>
        <Face kind={k} w={ww} h={hh - (label ? 15 : 0) - (tok ? 24 : 0)} c={body} seed={seed + x} />
      </div>
      {label && (
        <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 15,
          background: dkh(body, 0.30), display: "flex", alignItems: "center",
          paddingLeft: 7, fontFamily: MONO, fontWeight: 800, fontSize: Math.max(7, ww / 22),
          letterSpacing: "0.05em", color: mxh(body, 0.62) }}>{label}</div>
      )}
      {tok && (
        <div style={{ position: "absolute", right: 0, bottom: 0, height: 24,
          paddingLeft: 9, paddingRight: 9, background: dkh(body, 0.52),
          display: "flex", alignItems: "center", gap: 4 }}>
          <span style={{ fontFamily: MONO, fontWeight: 900, fontSize: Math.max(9, ww / 13),
            color: mxh(AMBER, 0.34) }}>{tok}</span>
          <span style={{ fontFamily: MONO, fontWeight: 700, fontSize: Math.max(6, ww / 22),
            color: mxh(body, 0.44), letterSpacing: "0.10em" }}>TOK</span>
        </div>
      )}
    </div>
  );
};

/* --------------------------------------------------------------------------
   THE INGOT — a compressed segment. Same material, a fraction of the height,
   denser and brighter, stamped [REF:id]. The HERO ARTIFACT's body.
   ----------------------------------------------------------------------- */
export const Ingot: React.FC<{ x: number; y: number; w?: number; h?: number; z?: number;
  ref_?: string; tok?: string; lit?: number; rot?: number; seed?: number; f?: number;
  logo?: boolean }> =
  ({ x, y, w: ww = 176, h: hh = 62, z = 44, ref_ = "REF:a91f", tok, lit = 1, rot = 0,
     seed = 0, f = 0, logo = true }) => {
  /* ⛔⛔ ROUND 17 — ALEX: *"the animations after 8 seconds are way too boring …
     just looking like a bunch of shapes jumbled together"*. Correct, and the
     cause is one prop: from 9s on, almost everything on screen is an INGOT, and
     an ingot was a flat green rectangle with a ref id on it. The first half got
     branded logo papers; the second half got shapes.
     The ingot now carries the MARK OF THE THING IT WAS MADE FROM, so the
     compressed block is visibly still your Claude file, just smaller — which is
     also the story the reel is telling. Plus compaction striations, a squeeze
     seam, and the token count. */
  const LOGOS = ["claude.svg", "claude.svg", "openai.png", "claude.svg", "cursor.svg",
                 "githubcopilot.svg", "claude.svg", "googlegemini.svg", "cline.svg"];
  const file = LOGOS[Math.abs(Math.floor(seed)) % LOGOS.length];
  const L = Math.min(hh * 0.74, ww * 0.30);
  return (
    <div style={{ position: "absolute", left: x, top: y, width: ww, height: hh, zIndex: z,
      transform: rot ? `rotate(${rot}deg)` : undefined, transformOrigin: "50% 100%",
      background: `linear-gradient(101deg, ${mxh(LIME, 0.52)} 0%, ${mxh(LIME, 0.24)} 40%, ${dkh(LIME, 0.30)} 100%)`,
      border: `2px solid ${dkh(LIME, 0.48)}`, boxShadow: SH_D, overflow: "hidden",
      boxSizing: "border-box", opacity: 0.30 + lit * 0.70 }}>
      {/* compaction striations — it reads as something that was PRESSED */}
      {Array.from({ length: Math.max(3, Math.round(hh / 11)) }, (_, i) => (
        <div key={i} style={{ position: "absolute", left: 4, right: 4, top: 5 + i * 10.5,
          height: 3, background: dkh(LIME, 0.44), opacity: i % 2 ? 0.28 : 0.52 }} />
      ))}
      {/* the seam where the ram closed */}
      <div style={{ position: "absolute", left: 0, right: 0, top: hh * 0.5 - 1.4, height: 2.8,
        background: dkh(LIME, 0.56), opacity: 0.7 }} />
      {/* ⭐ THE MARK OF WHAT IT USED TO BE */}
      {logo && L > 13 && (
        <div style={{ position: "absolute", left: ww * 0.045, top: hh / 2 - L / 2,
          width: L, height: L, borderRadius: L * 0.22, background: "#FFFFFF",
          border: `2px solid ${dkh(LIME, 0.42)}`, boxSizing: "border-box",
          display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Img src={staticFile("logos/" + file)}
            style={{ width: L * 0.74, height: L * 0.74, objectFit: "contain" }} />
        </div>
      )}
      <div style={{ position: "absolute", left: ww * 0.045 + (logo && L > 13 ? L + 8 : 0),
        top: 5, fontFamily: MONO, fontWeight: 900, fontSize: Math.max(8, ww / 19),
        letterSpacing: "0.03em", color: dkh(LIME, 0.66) }}>[{ref_}]</div>
      {tok && (
        <div style={{ position: "absolute", right: 0, bottom: 0, height: 21, paddingLeft: 8,
          paddingRight: 8, background: dkh(LIME, 0.54), display: "flex", alignItems: "center", gap: 4 }}>
          <span style={{ fontFamily: MONO, fontWeight: 900, fontSize: Math.max(9, ww / 14),
            color: mxh(LIME, 0.72) }}>{tok}</span>
          <span style={{ fontFamily: MONO, fontWeight: 700, fontSize: Math.max(6, ww / 24),
            color: mxh(LIME, 0.40), letterSpacing: "0.10em" }}>TOK</span>
        </div>
      )}
      <Sheen f={f} w={ww} h={hh} o={0.13} period={84} seed={seed} />
    </div>
  );
};

/* --------------------------------------------------------------------------
   THE METER — the villain's face. A split-flap counter: the thing that charges
   by volume and cannot read. `fall` animates the top half of the last digit.
   ⛔ Manufactured face -> stacked rects are correct here.
   ----------------------------------------------------------------------- */
export const Meter: React.FC<{ x: number; y: number; s?: number; z?: number; v: string;
  fall?: number; hot?: number; strike?: string }> =
  ({ x, y, s = 1, z = 60, v, fall = 0, hot = 0, strike }) => {
  const cw = 40 * s, ch = 62 * s;
  const cells = v.split("");
  const face = hot > 0.02 ? mxh(dkh(AMBER, 0.44), hot * 0.20) : "#2B2F35";
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: z }}>
      {/* the housing */}
      <div style={{ position: "absolute", left: -12 * s, top: -12 * s,
        width: cells.length * (cw + 5 * s) + 19 * s, height: ch + 24 * s,
        background: `linear-gradient(180deg, ${mxh(STEELD, 0.22)} 0%, ${dkh(STEELD, 0.30)} 100%)`,
        borderRadius: 6 * s, boxShadow: SH_D,
        border: `${2 * s}px solid ${dkh(STEELD, 0.44)}` }} />
      {cells.map((d, i) => (
        <div key={i} style={{ position: "absolute", left: i * (cw + 5 * s), top: 0,
          width: cw, height: ch, background: face, borderRadius: 3 * s, overflow: "hidden",
          border: `${1.6 * s}px solid ${dkh(face, 0.34)}`, boxSizing: "border-box" }}>
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center",
            justifyContent: "center", fontFamily: MONO, fontWeight: 900, fontSize: 34 * s,
            color: hot > 0.02 ? mxh(AMBER, 0.60) : "#D8DDE4" }}>{d}</div>
          {/* the split line every flap board has */}
          <div style={{ position: "absolute", left: 0, right: 0, top: ch / 2 - 1 * s,
            height: 2 * s, background: dkh(face, 0.55), zIndex: 3 }} />
          {/* the falling top half, on the last cell only */}
          {i === cells.length - 1 && fall > 0.01 && (
            <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: ch / 2,
              background: dkh(face, 0.14), zIndex: 4, transformOrigin: "50% 100%",
              transform: `rotateX(${fall * 92}deg)`, opacity: 1 - fall * 0.5 }} />
          )}
        </div>
      ))}
      {/* the number it WAS going to charge, struck through (S8 only) */}
      {strike && (
        <div style={{ position: "absolute", left: 0, top: -34 * s, fontFamily: MONO,
          fontWeight: 900, fontSize: 24 * s, color: "#9AA2AB", letterSpacing: "0.02em" }}>
          <span style={{ position: "relative" }}>{strike}
            <span style={{ position: "absolute", left: -2, right: -2, top: "52%", height: 3 * s,
              background: RED }} />
          </span>
        </div>
      )}
    </div>
  );
};

/* --------------------------------------------------------------------------
   THE DOORWAY — the API call. A fixed-size opening with the Claude mark cast
   into the lintel. Its INNER HEIGHT never changes: that is the whole villain.
   ⛔ The mark is on the DOOR (the thing you are calling), never on the press
      and never on the ingot. Nothing claims Anthropic made headroom.
   ----------------------------------------------------------------------- */
export const DoorWay: React.FC<{ x: number; y: number; w?: number; h?: number; z?: number;
  glowIn?: string; lintel?: string; mark?: number }> =
  ({ x, y, w: ww = 250, h: hh = 236, z = 34, glowIn = "#F3E4BE", lintel = "api.anthropic.com",
     mark = 1 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: ww, height: hh, zIndex: z }}>
    {/* the jamb, drawn as one path so the opening reads as a hole in a wall */}
    <svg width={ww} height={hh} viewBox={`0 0 ${ww} ${hh}`} style={{ position: "absolute", inset: 0 }}>
      <path d={`M0 ${hh} L0 26 Q0 8 20 8 L${ww - 20} 8 Q${ww} 8 ${ww} 26 L${ww} ${hh} Z`}
        fill={dkh(CONC, 0.30)} />
      <path d={`M26 ${hh} L26 44 Q26 30 42 30 L${ww - 42} 30 Q${ww - 26} 30 ${ww - 26} 44 L${ww - 26} ${hh} Z`}
        fill={dkh("#0B0E12", 0.10)} />
      {/* the light spilling out of the opening, matte, no blur */}
      <path d={`M26 ${hh} L26 44 Q26 30 42 30 L${ww - 42} 30 Q${ww - 26} 30 ${ww - 26} 44 L${ww - 26} ${hh} Z`}
        fill={hexa(glowIn, 0.16)} />
      <path d={`M0 ${hh} L0 26 Q0 8 20 8 L${ww - 20} 8 Q${ww} 8 ${ww} 26 L${ww} 22 L20 22 Q10 22 10 34 L10 ${hh} Z`}
        fill={mxh(CONC, 0.24)} opacity={0.7} />
    </svg>
    {/* the lintel plate: the endpoint you are actually calling */}
    <div style={{ position: "absolute", left: ww * 0.5 - 104, top: -34, width: 208, height: 28,
      background: mxh(CONC, 0.30), border: `2px solid ${dkh(CONC, 0.34)}`, borderRadius: 3,
      display: "flex", alignItems: "center", justifyContent: "center", zIndex: 3, boxShadow: SH }}>
      <span style={{ fontFamily: MONO, fontWeight: 800, fontSize: 13, letterSpacing: "0.02em",
        color: dkh(CONC, 0.58) }}>{lintel}</span>
    </div>
    {mark > 0.02 && (
      <div style={{ position: "absolute", left: ww * 0.5 - 27, top: -96, width: 54, height: 54,
        borderRadius: 15, background: "#FFFFFF", border: "2px solid #E8DCC0", zIndex: 4,
        display: "flex", alignItems: "center", justifyContent: "center", boxShadow: SH,
        opacity: mark }}>
        <Img src={staticFile("claude_logo.png")} style={{ width: 38, height: 38, objectFit: "contain" }} />
      </div>
    )}
  </div>
);

/* --------------------------------------------------------------------------
   THE PRESS — headroom. A machine straddling the belt with three router heads
   on its spine, each labelled with the real compressor it is.
   ⛔ ONE inline svg: the gantry silhouette is the recognition.
   ----------------------------------------------------------------------- */
export const HEADS: [string, string][] = [
  ["SmartCrusher", "JSON"], ["CodeCompressor", "AST"], ["Kompress-v2-base", "TEXT"],
];

export const Press: React.FC<{ x: number; y: number; w?: number; h?: number; z?: number;
  wake?: number; heads?: number[]; iris?: number; labels?: boolean; ram?: number;
  f?: number; crush?: number }> =
  ({ x, y, w: ww = 470, h: hh = 250, z = 42, wake = 1, heads = [0, 0, 0], iris = 0,
     labels = true, ram = 0, f = 0, crush = 0 }) => {
  const body = mxh(STEELD, 0.10 + wake * 0.06);
  const legW = ww * 0.13;
  const RY = 132 + ram * (hh - 236);          /* the ram's current top edge */
  const spin = f * (2.6 + wake * 3.4);        /* the flywheel never stops */
  return (
    <div style={{ position: "absolute", left: x, top: y, width: ww, height: hh, zIndex: z }}>
      {/* ⛔⛔ ALEX ROUND 3: *"the main focus should be the compression machine,
          make it look dramatic and interesting and detailed"*. v2's press was a
          gantry + a ram and read as furniture. It now has the parts a real
          press has and they all MOVE: a flywheel that spins, a hopper that
          feeds, two hydraulic rods that extend with the ram, a pressure gauge
          whose needle climbs with the stroke, vent stacks that puff on the
          crush, warning stripes, a rivet line and a bolted base.
          SILHOUETTE TEST: nameable in flat black from the crown + rods + base. */}
      <svg width={ww} height={hh} viewBox={`0 0 ${ww} ${hh}`} style={{ position: "absolute", inset: 0 }}>
        <defs>
          <linearGradient id="prsB" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={mxh(body, 0.26)} /><stop offset="0.5" stopColor={body} />
            <stop offset="1" stopColor={dkh(body, 0.34)} />
          </linearGradient>
          <linearGradient id="prsR" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor={mxh(body, 0.46)} /><stop offset="0.45" stopColor={mxh(body, 0.16)} />
            <stop offset="1" stopColor={dkh(body, 0.42)} />
          </linearGradient>
        </defs>

        {/* the hopper feeding the crown */}
        <path d={`M${ww * 0.31} 0 L${ww * 0.69} 0 L${ww * 0.60} 54 L${ww * 0.40} 54 Z`}
          fill={dkh(body, 0.16)} stroke={dkh(body, 0.46)} strokeWidth="3" />
        <path d={`M${ww * 0.31} 0 L${ww * 0.42} 0 L${ww * 0.455} 54 L${ww * 0.40} 54 Z`}
          fill={mxh(body, 0.30)} opacity="0.6" />

        {/* the gantry: two legs and a heavy crown */}
        <path d={`M0 ${hh} L0 96 Q0 72 28 72 L${ww - 28} 72 Q${ww} 72 ${ww} 96 L${ww} ${hh}
                  L${ww - legW} ${hh} L${ww - legW} 132 L${legW} 132 L${legW} ${hh} Z`}
          fill="url(#prsB)" stroke={dkh(body, 0.48)} strokeWidth="3" />
        <path d={`M14 82 L${ww - 14} 82 L${ww - 14} 97 L14 97 Z`} fill={mxh(body, 0.42)} opacity="0.85" />
        {/* a rivet line along the crown */}
        {Array.from({ length: 11 }, (_, i) => (
          <circle key={"rv" + i} cx={26 + i * ((ww - 52) / 10)} cy={110} r={4.4}
            fill={dkh(body, 0.42)} stroke={mxh(body, 0.26)} strokeWidth="1.6" />
        ))}
        {/* warning stripes down each leg — the one saturated accent on the machine */}
        {[0, 1].map((sd) => (
          <g key={"ws" + sd} clipPath="none">
            {Array.from({ length: 6 }, (_, i) => (
              <path key={i}
                d={`M${sd ? ww - legW + 6 : 6} ${hh - 130 + i * 20} l${legW - 12} -14 l0 11
                    l${-(legW - 12)} 14 Z`}
                fill={i % 2 ? dkh(AMBER, 0.30) : dkh(body, 0.30)} opacity="0.85" />
            ))}
          </g>
        ))}

        {/* the throat — ⛔ NEVER AN EMPTY DARK BOX (Alex round 3: "textboxes
            even though theres no text"). It carries a back wall, roller guides
            and a lit floor, so there is always something inside the machine. */}
        <path d={`M${legW + 10} 132 L${ww - legW - 10} 132 L${ww - legW - 10} ${hh} L${legW + 10} ${hh} Z`}
          fill={dkh("#0C0F13", 0.05)} opacity="0.55" />
        {/* the back wall of the throat, ribbed */}
        {Array.from({ length: 9 }, (_, i) => (
          <rect key={"tb" + i} x={legW + 18 + i * ((ww - 2 * legW - 36) / 9)} y={140}
            width={(ww - 2 * legW - 36) / 18} height={hh - 176}
            fill={mxh(body, 0.10)} opacity="0.30" />
        ))}
        {/* the roller guides the material is drawn between */}
        {[0, 1].map((sd) => (
          <g key={"rg" + sd}>
            {Array.from({ length: 4 }, (_, i) => (
              <circle key={i} cx={sd ? ww - legW - 30 : legW + 30} cy={hh - 128 + i * 26} r={10}
                fill={mxh(body, 0.22)} stroke={dkh(body, 0.44)} strokeWidth="2.4" />
            ))}
          </g>
        ))}
        {/* the lit floor of the throat, where the work happens */}
        <path d={`M${legW + 16} ${hh - 34} L${ww - legW - 16} ${hh - 34}
                  L${ww - legW - 16} ${hh - 16} L${legW + 16} ${hh - 16} Z`}
          fill={hexa(AMBER, 0.16 + wake * 0.14)} />

        {/* the two hydraulic rods, extending with the ram */}
        {[0.32, 0.68].map((k, i) => (
          <g key={"rod" + i}>
            <rect x={ww * k - 11} y={98} width={22} height={40 + ram * (hh - 236)}
              fill={mxh(body, 0.38)} stroke={dkh(body, 0.46)} strokeWidth="2" />
            <rect x={ww * k - 11} y={98} width={7} height={40 + ram * (hh - 236)}
              fill={mxh(body, 0.56)} opacity="0.7" />
          </g>
        ))}

        {/* ⭐ THE RAM — the part that makes it a press */}
        <path d={`M${legW + 24} ${RY} L${ww - legW - 24} ${RY}
                  L${ww - legW - 24} ${RY + 64} L${legW + 24} ${RY + 64} Z`}
          fill="url(#prsR)" stroke={dkh(body, 0.52)} strokeWidth="3" />
        <path d={`M${legW + 24} ${RY + 54} L${ww - legW - 24} ${RY + 54}
                  L${ww - legW - 24} ${RY + 64} L${legW + 24} ${RY + 64} Z`}
          fill={dkh(body, 0.52)} />
        {/* the ram's face plate, so it has a working edge */}
        {Array.from({ length: 7 }, (_, i) => (
          <rect key={"rf" + i} x={legW + 40 + i * ((ww - 2 * legW - 96) / 6)} y={RY + 12}
            width={10} height={34} fill={dkh(body, 0.38)} opacity="0.6" />
        ))}

        {/* the flywheel — the detail that says MACHINE at a glance, and it spins */}
        <g transform={`translate(${ww - legW * 0.5 - 4} ${hh - 96})`}>
          <circle r={legW * 0.46} fill={dkh(body, 0.26)} stroke={dkh(body, 0.50)} strokeWidth="3" />
          <g transform={`rotate(${spin})`}>
            {[0, 60, 120].map((a2) => (
              <rect key={a2} x={-legW * 0.40} y={-3.4} width={legW * 0.80} height={6.8}
                fill={mxh(body, 0.30)} transform={`rotate(${a2})`} />
            ))}
          </g>
          <circle r={legW * 0.13} fill={mxh(body, 0.44)} stroke={dkh(body, 0.44)} strokeWidth="2" />
        </g>

        {/* the pressure gauge — its needle climbs with the stroke */}
        <g transform={`translate(${legW * 0.5 + 4} ${hh - 96})`}>
          <circle r={legW * 0.40} fill={CARD} stroke={dkh(body, 0.50)} strokeWidth="3" />
          {Array.from({ length: 7 }, (_, i) => {
            const a2 = (-210 + i * 40) * Math.PI / 180;
            return <line key={i} x1={Math.cos(a2) * legW * 0.30} y1={Math.sin(a2) * legW * 0.30}
              x2={Math.cos(a2) * legW * 0.36} y2={Math.sin(a2) * legW * 0.36}
              stroke={dkh(CARD, 0.55)} strokeWidth="2" />;
          })}
          <line x1="0" y1="0"
            x2={Math.cos((-210 + (0.12 + ram * 0.86) * 240) * Math.PI / 180) * legW * 0.30}
            y2={Math.sin((-210 + (0.12 + ram * 0.86) * 240) * Math.PI / 180) * legW * 0.30}
            stroke={RED} strokeWidth="3.4" strokeLinecap="round" />
          <circle r={3.4} fill={dkh(body, 0.40)} />
        </g>

        {/* vent stacks on the crown */}
        {[0.16, 0.84].map((k, i) => (
          <rect key={"vs" + i} x={ww * k - 13} y={38} width={26} height={38}
            fill={dkh(body, 0.24)} stroke={dkh(body, 0.46)} strokeWidth="2.4" />
        ))}

        {/* bolted base */}
        <path d={`M${legW - 18} ${hh - 26} L${legW + 36} ${hh - 26} L${legW + 36} ${hh} L${legW - 18} ${hh} Z`}
          fill={dkh(body, 0.30)} />
        <path d={`M${ww - legW - 36} ${hh - 26} L${ww - legW + 18} ${hh - 26} L${ww - legW + 18} ${hh} L${ww - legW - 36} ${hh} Z`}
          fill={dkh(body, 0.30)} />
      </svg>

      {/* the vents PUFF on the crush — a large, bright, fast mover */}
      {crush > 0.01 && [0.16, 0.84].map((k, i) => (
        <div key={"pf" + i} style={{ position: "absolute", left: ww * k - 46 - i * 8,
          top: 38 - crush * 74, width: 92, height: 92, borderRadius: "50%",
          background: hexa("#E8E2D2", 0.30 * (1 - crush)), zIndex: 4,
          transform: `scale(${0.4 + crush * 1.5})` }} />
      ))}

      {/* the three router heads, each its own lamp + plate */}
      {HEADS.map(([nm, kind], i) => {
        const on = heads[i] ?? 0;
        const hx = ww * (0.22 + i * 0.28);
        return (
          <div key={nm} style={{ position: "absolute", left: hx - 46, top: 20, zIndex: 6 }}>
            <div style={{ width: 92, height: 20, borderRadius: 3,
              background: on > 0.03 ? mxh(AMBER, 0.10 + on * 0.30) : dkh(STEELD, 0.30),
              border: `2px solid ${dkh(STEELD, 0.46)}`, boxSizing: "border-box", boxShadow: SH }} />
            {labels && (
              <div style={{ position: "absolute", left: -14, top: 24, width: 120,
                textAlign: "center", fontFamily: MONO, fontWeight: 800, fontSize: 10.5,
                letterSpacing: "0.01em", color: on > 0.03 ? mxh(AMBER, 0.46) : "#7E858D",
                opacity: 0.45 + on * 0.55, lineHeight: 1.3 }}>
                {nm}<div style={{ fontSize: 8.6, opacity: 0.8, letterSpacing: "0.12em" }}>{kind}</div>
              </div>
            )}
          </div>
        );
      })}

      {/* the intake iris */}
      {iris > 0.01 && (
        <div style={{ position: "absolute", left: ww / 2 - 62, top: 150, width: 124, height: 58,
          zIndex: 5, overflow: "hidden" }}>
          <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 29 * (1 - iris),
            background: dkh(STEELD, 0.24), borderBottom: `2px solid ${dkh(STEELD, 0.5)}` }} />
          <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 29 * (1 - iris),
            background: dkh(STEELD, 0.24), borderTop: `2px solid ${dkh(STEELD, 0.5)}` }} />
          <div style={{ position: "absolute", inset: 0, zIndex: -1,
            background: hexa(AMBER, 0.22 * iris) }} />
        </div>
      )}
    </div>
  );
};

/* --------------------------------------------------------------------------
   THE LIMIT COLUMN — your usage limit. The red line NEVER moves; the fill does.
   ⛔ NO NUMBER ON IT. The repo publishes no usage-limit figure, so this is
      drawn as a STATE, never as a claim (board: HONESTY LINE).
   ----------------------------------------------------------------------- */
export const Column: React.FC<{ x: number; y: number; w?: number; h?: number; z?: number;
  fill: number; line?: number; alarm?: number }> =
  ({ x, y, w: ww = 74, h: hh = 430, z = 40, fill, line = 0.86, alarm = 0 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: ww, height: hh, zIndex: z,
    background: `linear-gradient(96deg, ${mxh(STEELD, 0.18)} 0%, ${dkh(STEELD, 0.20)} 100%)`,
    border: `3px solid ${dkh(STEELD, 0.46)}`, boxSizing: "border-box", boxShadow: SH_D,
    overflow: "hidden" }}>
    {/* the fill */}
    <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: `${fill * 100}%`,
      background: fill > line - 0.06
        ? `linear-gradient(180deg, ${mxh(RED, 0.16)} 0%, ${dkh(RED, 0.24)} 100%)`
        : `linear-gradient(180deg, ${mxh(LIME, 0.16)} 0%, ${dkh(LIME, 0.30)} 100%)` }} />
    {/* graduations, so a level is readable */}
    {Array.from({ length: 9 }, (_, i) => (
      <div key={i} style={{ position: "absolute", left: 0, width: i % 2 ? 12 : 22,
        top: hh * (0.06 + i * 0.10), height: 2, background: hexa("#F2F4F7", 0.28) }} />
    ))}
    {/* THE LIMIT — lit the whole time, and it does not move */}
    <div style={{ position: "absolute", left: -6, right: -6, top: hh * (1 - line) - 3, height: 6,
      background: RED, boxShadow: SH, zIndex: 4, opacity: 0.85 + alarm * 0.15 }} />
    <div style={{ position: "absolute", right: -70, top: hh * (1 - line) - 12, width: 62,
      fontFamily: MONO, fontWeight: 900, fontSize: 11, letterSpacing: "0.06em",
      color: mxh(RED, 0.30), zIndex: 5 }}>LIMIT</div>
  </div>
);

/* --------------------------------------------------------------------------
   A WORKLOAD ROW — the repo's measured before/after, drawn as a BAR whose
   bright stub IS the after ([[reel-graphical-not-textual]]: the number moves
   to its value, it is not typeset at it).
   ----------------------------------------------------------------------- */
export const WorkRow: React.FC<{ x: number; y: number; w?: number; z?: number; label: string;
  before: string; after: string; frac: number; pct: string; scope?: string; on: number }> =
  ({ x, y, w: ww = 700, z = 46, label, before, after, frac, pct, scope, on }) => {
  const grow = E(on, 0, 1, 0, 1, OUT);
  return (
    <div style={{ position: "absolute", left: x, top: y, width: ww, height: 52, zIndex: z,
      opacity: on <= 0 ? 0 : 1, transform: `translateY(${(1 - grow) * 16}px)` }}>
      <div style={{ position: "absolute", left: 0, top: 0, width: 196, height: 20,
        fontFamily: MONO, fontWeight: 800, fontSize: 13, letterSpacing: "0.04em",
        color: mxh(CARDD, 0.30) }}>{label}</div>
      {scope && (
        <div style={{ position: "absolute", left: 200, top: 1, height: 17, paddingLeft: 6,
          paddingRight: 6, background: hexa(GOLD, 0.20), border: `1.5px solid ${hexa(GOLD, 0.5)}`,
          borderRadius: 3, display: "flex", alignItems: "center", fontFamily: MONO,
          fontWeight: 800, fontSize: 9.5, letterSpacing: "0.05em", color: mxh(GOLD, 0.44) }}>
          {scope}</div>
      )}
      {/* the BEFORE bar: pale, full width */}
      <div style={{ position: "absolute", left: 0, top: 24, width: ww - 150, height: 22,
        background: hexa("#E9E3D3", 0.20), border: `2px solid ${hexa("#E9E3D3", 0.34)}`,
        boxSizing: "border-box", borderRadius: 2 }} />
      <div style={{ position: "absolute", left: ww - 144, top: 24, height: 22,
        display: "flex", alignItems: "center", fontFamily: MONO, fontWeight: 700, fontSize: 12,
        color: hexa("#EDE7D8", 0.62) }}>{before}</div>
      {/* the AFTER stub: bright clay, and its width IS the ratio */}
      <div style={{ position: "absolute", left: 0, top: 24, width: (ww - 150) * frac * grow,
        height: 22, background: `linear-gradient(180deg, ${mxh(CLAY, 0.18)} 0%, ${dkh(CLAY, 0.16)} 100%)`,
        borderRadius: 2, boxShadow: SH }} />
      <div style={{ position: "absolute", left: (ww - 150) * frac * grow + 9, top: 24, height: 22,
        display: "flex", alignItems: "center", gap: 8, opacity: grow }}>
        <span style={{ fontFamily: MONO, fontWeight: 900, fontSize: 14, color: mxh(CLAY, 0.52) }}>
          {after}</span>
        <span style={{ fontFamily: MONO, fontWeight: 900, fontSize: 14, color: mxh(GREEN, 0.34) }}>
          {pct}</span>
      </div>
    </div>
  );
};

/* --------------------------------------------------------------------------
   THE BALANCE — the accuracy receipt. Two identical answer sheets that do not
   tip, and the repo's published delta stamped under them.
   ----------------------------------------------------------------------- */
export const Balance: React.FC<{ x: number; y: number; z?: number; tilt?: number;
  s?: number }> = ({ x, y, z = 44, tilt = 0, s = 1 }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z }}>
    {/* the post */}
    <div style={{ position: "absolute", left: -9 * s, top: 26 * s, width: 18 * s, height: 128 * s,
      background: `linear-gradient(90deg, ${mxh(STEELD, 0.24)} 0%, ${dkh(STEELD, 0.32)} 100%)`,
      boxShadow: SH }} />
    <div style={{ position: "absolute", left: -46 * s, top: 150 * s, width: 92 * s, height: 14 * s,
      borderRadius: 4 * s, background: dkh(STEELD, 0.24), boxShadow: SH }} />
    {/* the beam */}
    <div style={{ position: "absolute", left: -190 * s, top: 20 * s, width: 380 * s, height: 12 * s,
      background: `linear-gradient(180deg, ${mxh(STEELL, 0.10)} 0%, ${dkh(STEEL, 0.24)} 100%)`,
      transformOrigin: "50% 50%", transform: `rotate(${tilt}deg)`, boxShadow: SH, borderRadius: 3 }} />
    {/* the two pans, each an identical answer */}
    {[-1, 1].map((sgn, i) => (
      <div key={i} style={{ position: "absolute", left: sgn * 148 * s - 74 * s,
        top: 34 * s + sgn * tilt * 2.6 * s, width: 148 * s, height: 96 * s }}>
        <div style={{ position: "absolute", left: 0, top: 0, width: "100%", height: "100%",
          background: `linear-gradient(101deg, ${mxh(SHEET, 0.18)} 0%, ${dkh(SHEET, 0.10)} 100%)`,
          border: `2px solid ${dkh(SHEET, 0.36)}`, boxSizing: "border-box", boxShadow: SH_D }}>
          <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 17 * s,
            background: dkh(SHEET, 0.30), display: "flex", alignItems: "center",
            justifyContent: "center", fontFamily: MONO, fontWeight: 900, fontSize: 9.5 * s,
            letterSpacing: "0.10em", color: mxh(SHEET, 0.66) }}>
            {i ? "HEADROOM" : "BASELINE"}</div>
          {[0, 1, 2, 3].map((l) => (
            <div key={l} style={{ position: "absolute", left: 10 * s, right: 10 * s,
              top: (26 + l * 15) * s, height: 5 * s, background: dkh(SHEET, 0.44),
              opacity: l === 3 ? 0.5 : 0.85, width: l === 3 ? "48%" : undefined }} />
          ))}
        </div>
      </div>
    ))}
  </div>
);

/* the answer that came back — the same finding, as a struck chip */
export const AnswerChip: React.FC<{ x: number; y: number; s?: number; z?: number;
  t?: string; on?: number }> = ({ x, y, s = 1, z = 60, t = "FATAL", on = 1 }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z, opacity: on,
    transform: `scale(${0.86 + on * 0.14})`, transformOrigin: "50% 50%" }}>
    <div style={{ width: 132 * s, height: 44 * s, background: dkh(RED, 0.16),
      border: `${3 * s}px solid ${mxh(RED, 0.22)}`, borderRadius: 4 * s, boxSizing: "border-box",
      display: "flex", alignItems: "center", justifyContent: "center", boxShadow: SH_D }}>
      <span style={{ fontFamily: MONO, fontWeight: 900, fontSize: 20 * s, letterSpacing: "0.10em",
        color: mxh(RED, 0.66) }}>{t}</span>
    </div>
  </div>
);

/* --------------------------------------------------------------------------
   THE REPO PLATE — the only place a star count appears, and it is verified.
   ----------------------------------------------------------------------- */
export const RepoPlate: React.FC<{ x: number; y: number; z?: number; s?: number;
  stars: string; on?: number }> = ({ x, y, z = 60, s = 1, stars, on = 1 }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z, opacity: on,
    transform: `translateY(${(1 - on) * 18}px)` }}>
    <div style={{ width: 372 * s, padding: `${13 * s}px ${16 * s}px`, background: CARD,
      border: `${3 * s}px solid ${CARDD}`, borderRadius: 5 * s, boxShadow: SH_D,
      display: "flex", flexDirection: "column", gap: 6 * s }}>
      <div style={{ display: "flex", alignItems: "center", gap: 9 * s }}>
        {/* the GitHub mark, drawn — not an emoji, not an image dependency */}
        <svg width={24 * s} height={24 * s} viewBox="0 0 16 16" fill={INK}>
          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38
            0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01
            1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95
            0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.4 7.4 0 0 1 2-.27c.68 0
            1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0
            3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01
            8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
        </svg>
        <span style={{ fontFamily: MONO, fontWeight: 900, fontSize: 21 * s, color: INK,
          letterSpacing: "-0.01em" }}>headroom</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 10 * s }}>
        <div style={{ display: "flex", alignItems: "center", gap: 5 * s, padding: `${3 * s}px ${9 * s}px`,
          background: hexa(GOLD, 0.26), border: `2px solid ${hexa(GOLD, 0.62)}`, borderRadius: 3 * s }}>
          <svg width={13 * s} height={13 * s} viewBox="0 0 24 24" fill={dkh(GOLD, 0.30)}>
            <path d="M12 2l2.9 6.26 6.85.72-5.1 4.6 1.44 6.72L12 16.9l-6.09 3.4 1.44-6.72-5.1-4.6
              6.85-.72z" />
          </svg>
          <span style={{ fontFamily: MONO, fontWeight: 900, fontSize: 17 * s,
            color: dkh(GOLD, 0.44) }}>{stars}</span>
        </div>
        <span style={{ fontFamily: MONO, fontWeight: 800, fontSize: 12 * s, color: "#7A7266",
          letterSpacing: "0.05em" }}>APACHE-2.0</span>
      </div>
    </div>
  </div>
);

/* --------------------------------------------------------------------------
   THE ARCH — one provider exit. Three of these, side by side, in S10.
   ----------------------------------------------------------------------- */
export const Arch: React.FC<{ x: number; y: number; w?: number; h?: number; z?: number;
  t: string; on?: number; mark?: boolean }> =
  ({ x, y, w: ww = 200, h: hh = 218, z = 34, t, on = 0, mark = false }) => (
  <div style={{ position: "absolute", left: x, top: y, width: ww, height: hh, zIndex: z }}>
    <svg width={ww} height={hh} viewBox={`0 0 ${ww} ${hh}`} style={{ position: "absolute", inset: 0 }}>
      <path d={`M0 ${hh} L0 ${ww / 2} A ${ww / 2} ${ww / 2} 0 0 1 ${ww} ${ww / 2} L${ww} ${hh} Z`}
        fill={dkh(CONC, 0.26)} />
      <path d={`M22 ${hh} L22 ${ww / 2} A ${ww / 2 - 22} ${ww / 2 - 22} 0 0 1 ${ww - 22} ${ww / 2} L${ww - 22} ${hh} Z`}
        fill={dkh("#0A0D11", 0.05)} />
      <path d={`M22 ${hh} L22 ${ww / 2} A ${ww / 2 - 22} ${ww / 2 - 22} 0 0 1 ${ww - 22} ${ww / 2} L${ww - 22} ${hh} Z`}
        fill={hexa("#F0DFB4", 0.20 * on)} />
    </svg>
    <div style={{ position: "absolute", left: ww * 0.5 - 88, top: hh - 42, width: 176, height: 28,
      background: on > 0.03 ? mxh(CARD, 0.0) : dkh(CONC, 0.36), borderRadius: 3, zIndex: 5,
      border: `2px solid ${on > 0.03 ? CARDD : dkh(CONC, 0.44)}`, display: "flex",
      alignItems: "center", justifyContent: "center", boxShadow: SH, opacity: 0.5 + on * 0.5 }}>
      <span style={{ fontFamily: MONO, fontWeight: 900, fontSize: 13, letterSpacing: "0.08em",
        color: on > 0.03 ? INK : "#7E858D" }}>{t}</span>
    </div>
    {mark && (
      <div style={{ position: "absolute", left: ww * 0.5 - 24, top: 26, width: 48, height: 48,
        borderRadius: 13, background: "#FFFFFF", border: "2px solid #E8DCC0", zIndex: 6,
        display: "flex", alignItems: "center", justifyContent: "center", boxShadow: SH,
        opacity: 0.35 + on * 0.65 }}>
        <Img src={staticFile("claude_logo.png")} style={{ width: 33, height: 33, objectFit: "contain" }} />
      </div>
    )}
  </div>
);

/* --------------------------------------------------------------------------
   THE CCR CABINET — the originals, kept. The drawer is the S9 reveal, and it
   must be OPEN early in the scene, not at its end (board: the named soft spot).
   ----------------------------------------------------------------------- */
export const Cabinet: React.FC<{ x: number; y: number; z?: number; open: number;
  lift?: number; s?: number }> = ({ x, y, z = 40, open, lift = 0, s = 1 }) => {
  const dw = 400 * s, dh = 118 * s;
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: z }}>
      {/* the carcass */}
      <div style={{ position: "absolute", left: 0, top: 0, width: 470 * s, height: 268 * s,
        background: `linear-gradient(174deg, ${mxh(STEELD, 0.20)} 0%, ${dkh(STEELD, 0.26)} 100%)`,
        border: `${3 * s}px solid ${dkh(STEELD, 0.44)}`, boxSizing: "border-box", boxShadow: SH_D }} />
      {/* two closed drawers below */}
      {[0, 1].map((i) => (
        <div key={i} style={{ position: "absolute", left: 16 * s, top: (150 + i * 58) * s,
          width: 438 * s, height: 50 * s, background: dkh(STEELD, 0.16),
          border: `${2 * s}px solid ${dkh(STEELD, 0.40)}`, boxSizing: "border-box" }}>
          <div style={{ position: "absolute", left: "50%", marginLeft: -26 * s, top: 20 * s,
            width: 52 * s, height: 7 * s, borderRadius: 3 * s, background: mxh(STEELD, 0.26) }} />
        </div>
      ))}
      {/* THE OPEN DRAWER — the originals, whole, each tagged to an ingot */}
      <div style={{ position: "absolute", left: 20 * s + open * 38 * s, top: 22 * s,
        width: dw, height: dh, zIndex: 6,
        background: `linear-gradient(180deg, ${mxh(STEELD, 0.30)} 0%, ${dkh(STEELD, 0.18)} 100%)`,
        border: `${3 * s}px solid ${dkh(STEELD, 0.46)}`, boxSizing: "border-box",
        boxShadow: SH_D, overflow: "visible" }}>
        {/* the originals standing in the drawer, uncompressed */}
        <div style={{ position: "absolute", left: 12 * s, top: -14 * s, right: 12 * s,
          height: dh - 10 * s, display: "flex", gap: 7 * s, alignItems: "flex-end",
          overflow: "hidden", opacity: Math.min(1, open * 1.6) }}>
          {Array.from({ length: 9 }, (_, i) => (
            <div key={i} style={{ flex: 1, height: (86 + (i % 3) * 12) * s,
              marginBottom: (i === 4 ? lift * 26 * s : 0),
              background: `linear-gradient(180deg, ${mxh(SHEET, 0.14)} 0%, ${dkh(SHEET, 0.16)} 100%)`,
              border: `1.6px solid ${dkh(SHEET, 0.38)}`, boxSizing: "border-box",
              display: "flex", flexDirection: "column", justifyContent: "flex-start",
              paddingTop: 4 * s, gap: 3 * s, alignItems: "center", boxShadow: SH }}>
              <div style={{ fontFamily: MONO, fontWeight: 900, fontSize: 6.4 * s,
                color: dkh(SHEET, 0.60), letterSpacing: "-0.02em" }}>
                REF:{["a91f", "a920", "b04c", "b117", "c3d2", "c4e8", "d55a", "d61b", "e77f"][i]}</div>
              {[0, 1, 2, 3, 4].map((l) => (
                <div key={l} style={{ width: "72%", height: 2.4 * s, background: dkh(SHEET, 0.44),
                  opacity: 0.7 }} />
              ))}
            </div>
          ))}
        </div>
        {/* the drawer face plate */}
        <div style={{ position: "absolute", left: 0, right: 0, bottom: -2 * s, height: 34 * s,
          background: dkh(STEELD, 0.30), borderTop: `${2 * s}px solid ${dkh(STEELD, 0.5)}`,
          display: "flex", alignItems: "center", justifyContent: "center", zIndex: 4 }}>
          <span style={{ fontFamily: MONO, fontWeight: 900, fontSize: 15 * s,
            letterSpacing: "0.03em", color: mxh("#6FC3C8", 0.30) }}>headroom_retrieve</span>
        </div>
      </div>
    </div>
  );
};

/* --------------------------------------------------------------------------
   THE CTA CARD — its own column, nothing crossing it (reel 82's buried seal).
   ----------------------------------------------------------------------- */
export const CtaCard: React.FC<{ x: number; y: number; z?: number; s?: number;
  on: number; kw: number }> = ({ x, y, z = 80, s = 1, on, kw }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z, opacity: on,
    transform: `translateY(${(1 - on) * 22}px) scale(${0.95 + on * 0.05})`,
    transformOrigin: "50% 60%" }}>
    <div style={{ width: 452 * s, padding: `${22 * s}px ${24 * s}px ${20 * s}px`, background: CARD,
      border: `${4 * s}px solid ${CARDD}`, borderRadius: 7 * s, boxShadow: SH_D,
      display: "flex", flexDirection: "column", alignItems: "center", gap: 11 * s }}>
      <div style={{ width: 58 * s, height: 58 * s, borderRadius: 15 * s, background: "#FFFFFF",
        border: `2px solid #E8DCC0`, display: "flex", alignItems: "center",
        justifyContent: "center", boxShadow: SH }}>
        <Img src={staticFile("claude_logo.png")}
          style={{ width: 40 * s, height: 40 * s, objectFit: "contain" }} />
      </div>
      <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 15 * s, letterSpacing: "0.16em",
        color: "#8A8175" }}>COMMENT</div>
      <div style={{ position: "relative", padding: `${9 * s}px ${26 * s}px`,
        background: kw > 0.02 ? dkh(CLAY, 0.04) : "transparent",
        border: `${3 * s}px solid ${kw > 0.02 ? dkh(CLAY, 0.22) : "#CFC5B0"}`, borderRadius: 5 * s,
        transform: `scale(${1 + (1 - Math.min(1, kw * 3)) * 0.06})` }}>
        <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 47 * s,
          letterSpacing: "0.02em", color: kw > 0.02 ? CARD : INK }}>COMPRESS</span>
      </div>
      <div style={{ fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 15 * s, color: "#6E665B",
        letterSpacing: "0.03em" }}>and I'll send you the guide</div>
    </div>
  </div>
);

/* ===========================================================================
   ROUND 4 — ALEX: *"a lot of these animations are way too boring and way too
   plain like just papers and stuff … especially the first 10 seconds needs to
   be a lot more stimulating"*.

   ⛔ THE DIAGNOSIS, AND IT IS STRUCTURAL: every hero in v3 was a FLAT
   RECTANGLE revealed in place — a sheet, a plate, a bar row, a card. Component
   idles cannot fix that, because a rectangle that fades in is still a
   rectangle. The premise is "everything your agent reads", which is a VOLUME,
   and volume was the one thing never on screen.

   These three give the reel the register it was missing: a TORRENT with real
   depth, a MASS that physically collapses, and DEBRIS on impact.
   ========================================================================= */

/** ⭐ THE TORRENT — dozens of text slabs pouring toward camera on four depth
    planes, each with its own speed, scale and tumble. This is what "everything
    your agent reads" actually looks like. Near planes blur past; far planes
    crawl, so the shot has parallax rather than a flat drift. */
export const Torrent: React.FC<{ f: number; n?: number; z?: number; seed?: number;
  speed?: number; tint?: string; spread?: number; cy?: number }> =
  ({ f, n = 34, z = 40, seed = 0, speed = 1, tint = SHEET, spread = 1, cy = 300 }) => (<>
    {Array.from({ length: n }, (_, i) => {
      const r1 = rnd(seed + i, 1), r2 = rnd(seed + i, 2), r3 = rnd(seed + i, 3);
      const plane = i % 4;                          /* 0 = far, 3 = near */
      const sc = 0.24 + plane * 0.30;
      const spd = (0.9 + plane * 1.5) * speed;
      /* each slab runs its own loop so the stream never pulses in sync */
      const t = ((f * spd + r1 * 420) % 420) / 420;
      const x = -260 + t * (W + 560) * (0.9 + r2 * 0.3);
      const y = cy + (r2 - 0.5) * 420 * spread + Math.sin(f / 23 + i) * 9;
      const ww = 96 * sc * (0.7 + r3 * 0.7), hh = ww * (1.5 + r1 * 1.4);
      const rot = (r3 - 0.5) * 46 + Math.sin(f / 19 + i * 2.1) * 7;
      const body = mxh(tint, 0.10 + plane * 0.10);
      return (
        <div key={"tr" + i} style={{ position: "absolute", left: x, top: y - hh / 2,
          width: ww, height: hh, zIndex: z + plane, transform: `rotate(${rot}deg)`,
          background: `linear-gradient(101deg, ${mxh(body, 0.18)} 0%, ${dkh(body, 0.20)} 100%)`,
          border: `${1.2 + plane * 0.6}px solid ${dkh(body, 0.42)}`, boxSizing: "border-box",
          boxShadow: plane > 1 ? SH_D : undefined,
          opacity: 0.30 + plane * 0.22, overflow: "hidden" }}>
          {/* ⛔ ROUND 5: the torrent's slabs carry DRAWN content too, not lines */}
          <Face kind={SHEET_KINDS[(i * 3 + seed) % 8]} w={ww} h={hh} c={body} seed={seed + i * 13} />
        </div>
      );
    })}
  </>);

/** ⭐ A MASS that physically collapses — `k` 0 = full height, 1 = crushed to
    its stub. The bar chart's job, done as an object that gets shorter under
    load instead of a rectangle that grows. */
export const Mass: React.FC<{ x: number; ground: number; w?: number; hFull: number;
  k: number; z?: number; label?: string; big?: string; small?: string;
  pct?: string; f?: number }> =
  ({ x, ground, w: ww = 190, hFull, k, z = 46, label, big, small, pct, f = 0 }) => {
  const h = hFull * (1 - k * 0.92);
  const squash = 1 + k * 0.16;                     /* it bulges as it compacts */
  const c = k > 0.5 ? LIME : SHEET;
  return (
    <div style={{ position: "absolute", left: x - (ww * squash) / 2, top: ground - h,
      width: ww * squash, height: h, zIndex: z, overflow: "hidden",
      background: `linear-gradient(101deg, ${mxh(c, 0.30)} 0%, ${mxh(c, 0.04)} 44%, ${dkh(c, 0.26)} 100%)`,
      border: `3px solid ${dkh(c, 0.44)}`, boxSizing: "border-box", boxShadow: SH_D }}>
      {/* ⛔ ROUND 5: the mass carried grey stripes — the same "little line text"
          fault. Its face is DRAWN content, and it switches to a compacted
          block once it has been crushed. */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 30 }}>
        <Face kind={k > 0.5 ? "chart" : "log"} w={ww * squash} h={Math.max(24, h - 30)}
          c={c} seed={Math.round(x)} />
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 4, textAlign: "center",
        fontFamily: MONO, fontWeight: 900, fontSize: Math.min(26, 10 + h / 9),
        color: dkh(c, 0.66) }}>{k > 0.5 ? small : big}</div>
      {pct && k > 0.55 && (
        <div style={{ position: "absolute", left: 0, right: 0, top: 4, textAlign: "center",
          fontFamily: MONO, fontWeight: 900, fontSize: 15, color: dkh(c, 0.70) }}>{pct}</div>
      )}
    </div>
  );
};

/** ⭐ DEBRIS — fragments thrown off an impact. `k` 0..1 across the burst.
    ⛔ Solid shards, never a glow ([[feedback_reel_matte_palette]]). */
export const Debris: React.FC<{ x: number; y: number; k: number; n?: number; z?: number;
  seed?: number; c?: string; spread?: number }> =
  ({ x, y, k, n = 22, z = 70, seed = 0, c = SHEET, spread = 300 }) => {
  if (k <= 0.001 || k >= 1) return null;
  return (<>
    {Array.from({ length: n }, (_, i) => {
      const a = (rnd(seed + i, 1) - 0.5) * Math.PI * 1.9 - Math.PI / 2;
      const v = spread * (0.35 + rnd(seed + i, 2) * 0.9);
      const dx = Math.cos(a) * v * k;
      const dy = Math.sin(a) * v * k + 640 * k * k * 0.42;   /* gravity */
      const sz = 7 + rnd(seed + i, 3) * 17;
      return (
        <div key={"db" + i} style={{ position: "absolute", left: x + dx, top: y + dy,
          width: sz, height: sz * (0.4 + rnd(seed + i, 4) * 0.9), zIndex: z,
          background: dkh(c, 0.10 + rnd(seed + i, 5) * 0.34),
          border: `1.4px solid ${dkh(c, 0.48)}`, boxSizing: "border-box",
          transform: `rotate(${rnd(seed + i, 6) * 420 * k}deg)`,
          opacity: 1 - k * k }} />
      );
    })}
  </>);
};


/* ===========================================================================
   ROUND 7 — ALEX: real provider marks, a simpler "same answer", and a payoff
   that SHOWS the fraction instead of stating it.
   ========================================================================= */

/** a real provider mark on a white tile. ⛔ REAL MARKS ONLY, from public/logos
    ([[feedback_relevant_colleges_real_logos]] — a wrong mark is worse than no
    mark). All three are named in headroom's own README as targets it forwards
    to, so nothing here is invented. */
export const ProviderTile: React.FC<{ x: number; y: number; s?: number; z?: number;
  file: string; name: string; on?: number }> =
  ({ x, y, s = 1, z = 60, file, name, on = 1 }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z, opacity: 0.25 + on * 0.75,
    transform: `translateY(${(1 - on) * 22}px) scale(${0.9 + on * 0.1})` }}>
    <div style={{ width: 150 * s, height: 150 * s, borderRadius: 26 * s, background: "#FFFFFF",
      border: `${4 * s}px solid ${on > 0.5 ? CARDD : "#B9B2A2"}`, boxSizing: "border-box",
      display: "flex", alignItems: "center", justifyContent: "center", boxShadow: SH_D }}>
      <Img src={staticFile("logos/" + file)}
        style={{ width: 96 * s, height: 96 * s, objectFit: "contain" }} />
    </div>
    <div style={{ width: 150 * s, marginTop: 10 * s, textAlign: "center", fontFamily: MONO,
      fontWeight: 900, fontSize: 15 * s, letterSpacing: "0.06em",
      color: on > 0.5 ? mxh(CARD, 0.10) : "#7E858D" }}>{name}</div>
  </div>
);

/** ⭐ THE FRACTION — the original as a hollow GHOST outline with the compressed
    piece sitting inside it at true relative size. You do not read the ratio,
    you see it. */
export const Fraction: React.FC<{ x: number; y: number; w: number; h: number; z?: number;
  k: number; big: string; small: string; f?: number }> =
  ({ x, y, w: ww, h: hh, z = 50, k, big, small, f = 0 }) => {
  const fh = hh * 0.124;                       /* 1,260 / 10,144 = 12.4%, true */
  return (
    <div style={{ position: "absolute", left: x, top: y, width: ww, height: hh, zIndex: z }}>
      {/* the ghost of what you WOULD have sent */}
      <div style={{ position: "absolute", inset: 0, border: `5px dashed ${hexa("#D9D2C2", 0.5)}`,
        boxSizing: "border-box", opacity: 0.35 + 0.45 * (1 - k) }} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 12, textAlign: "center",
        fontFamily: MONO, fontWeight: 900, fontSize: 40, color: hexa("#E6DFCE", 0.44),
        opacity: 1 - k * 0.45 }}>
        <span style={{ position: "relative" }}>{big}
          <span style={{ position: "absolute", left: -4, right: -4, top: "52%", height: 5,
            background: RED, transform: `scaleX(${k})`, transformOrigin: "0% 50%" }} /></span>
      </div>
      {/* the real thing, at TRUE relative size, sitting on the floor of the ghost */}
      <div style={{ position: "absolute", left: 0, bottom: 0, width: ww,
        height: hh * (1 - k) + fh * k, overflow: "hidden",
        background: `linear-gradient(101deg, ${mxh(LIME, 0.48)} 0%, ${mxh(LIME, 0.18)} 44%, ${dkh(LIME, 0.32)} 100%)`,
        border: `5px solid ${dkh(LIME, 0.48)}`, boxSizing: "border-box", boxShadow: SH_D }}>
        <div style={{ position: "absolute", left: 0, right: 0, top: "50%", marginTop: -26,
          textAlign: "center", fontFamily: MONO, fontWeight: 900, fontSize: 52,
          color: dkh(LIME, 0.72), opacity: k }}>{small}</div>
        <Sheen f={f} w={ww} h={hh} o={0.14} period={70} />
      </div>
      {/* the callout that names what the empty space IS */}
      {k > 0.6 && (
        <div style={{ position: "absolute", left: 0, right: 0, top: hh * 0.42, textAlign: "center",
          fontFamily: MONO, fontWeight: 900, fontSize: 21, letterSpacing: "0.06em",
          color: hexa("#EFE7D6", 0.62), opacity: (k - 0.6) / 0.4 }}>YOU DO NOT SEND THIS</div>
      )}
    </div>
  );
};

/* ===========================================================================
   ROUND 10 — ALEX: *"needs more quirks … easter eggs etc"*.
   The storyboard spec has a GAG line on every scene card and I had filled none
   of them. These are comment-bait for a Claude Code audience specifically: the
   joke only lands if you have hit a context limit at 2am, which is exactly the
   filter the reel wants ([[reel 95: the mark is an AUDIENCE FILTER]]).
   ⛔ All of them are FURNITURE — small, off-centre, never the hero, and none
   moves enough to compete for hierarchy.
   ========================================================================= */

/** ⭐ the factory safety board, permanently reset to zero. */
export const SafetyBoard: React.FC<{ x: number; y: number; s?: number; z?: number;
  f?: number }> = ({ x, y, s = 1, z = 34, f = 0 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: 208 * s, zIndex: z,
    background: dkh("#2E3A2E", 0.06), border: `${3 * s}px solid ${dkh("#2E3A2E", 0.34)}`,
    borderRadius: 4 * s, padding: `${8 * s}px ${9 * s}px`, boxShadow: SH,
    transform: `rotate(-1.2deg)` }}>
    <div style={{ fontFamily: MONO, fontWeight: 900, fontSize: 9.4 * s, lineHeight: 1.32,
      letterSpacing: "0.03em", color: mxh("#8FBF5A", 0.34) }}>
      DAYS SINCE LAST<br />CONTEXT OVERFLOW</div>
    <div style={{ marginTop: 4 * s, background: "#14181C", borderRadius: 3 * s,
      padding: `${3 * s}px 0`, textAlign: "center", fontFamily: MONO, fontWeight: 900,
      fontSize: 30 * s, color: Math.sin(f / 9) > 0 ? RED : dkh(RED, 0.24) }}>0</div>
  </div>
);

/** ⭐ the rubber duck. It rides the line with everything else, because of course
    it does. Bobs; never still. */
export const Duck: React.FC<{ x: number; y: number; s?: number; z?: number; f?: number }> =
  ({ x, y, s = 1, z = 50, f = 0 }) => (
  <svg width={54 * s} height={50 * s} viewBox="0 0 54 50"
    style={{ position: "absolute", left: x, top: y + Math.sin(f / 8) * 3, zIndex: z,
      transform: `rotate(${Math.sin(f / 13) * 4}deg)` }}>
    <ellipse cx="26" cy="36" rx="20" ry="12" fill="#E7B24C" />
    <ellipse cx="26" cy="33" rx="20" ry="9" fill="#F0C260" />
    <circle cx="38" cy="18" r="11" fill="#F0C260" />
    <path d="M47 18 L54 21 L47 24 Z" fill="#D97757" />
    <circle cx="41" cy="15" r="2.2" fill="#1A1813" />
  </svg>
);

/** ⭐ the slab every developer recognises, comically out of scale. */
export const NodeModules: React.FC<{ x: number; ground: number; h?: number; z?: number;
  f?: number }> = ({ x, ground, h: hh = 460, z = 42, f = 0 }) => (
  <div style={{ position: "absolute", left: x, top: ground - hh, width: 118, height: hh,
    zIndex: z, transform: `rotate(${-2 + Math.sin(f / 21) * 0.8}deg)`, transformOrigin: "50% 100%",
    background: `linear-gradient(101deg, ${mxh(SHEET, 0.16)} 0%, ${dkh(SHEET, 0.18)} 100%)`,
    border: `2px solid ${dkh(SHEET, 0.42)}`, boxSizing: "border-box", boxShadow: SH_D,
    overflow: "hidden" }}>
    <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 17,
      background: dkh(SHEET, 0.34), display: "flex", alignItems: "center",
      justifyContent: "center", fontFamily: MONO, fontWeight: 900, fontSize: 8.6,
      letterSpacing: "0.02em", color: mxh(SHEET, 0.64) }}>node_modules</div>
    {Array.from({ length: Math.round(hh / 22) }, (_, i) => (
      <div key={i} style={{ position: "absolute", left: 8, right: 8, top: 26 + i * 21,
        height: 13, background: dkh(SHEET, 0.30), opacity: 0.55, borderRadius: 1.5 }} />
    ))}
    <div style={{ position: "absolute", right: 0, bottom: 0, height: 19, paddingLeft: 6,
      paddingRight: 6, background: dkh(SHEET, 0.54), display: "flex", alignItems: "center",
      fontFamily: MONO, fontWeight: 900, fontSize: 9.4, color: mxh(RED, 0.30) }}>∞ TOK</div>
  </div>
);

/** ⭐ a mug on the machine that JUMPS when the ram lands. `hit` 0..1. */
export const Mug: React.FC<{ x: number; y: number; s?: number; z?: number; hit?: number }> =
  ({ x, y, s = 1, z = 56, hit = 0 }) => {
  const j = Math.sin(hit * Math.PI) * 26;
  return (
    <div style={{ position: "absolute", left: x, top: y - j, zIndex: z,
      transform: `rotate(${hit > 0.02 ? Math.sin(hit * 22) * 12 : 0}deg)` }}>
      <div style={{ width: 34 * s, height: 30 * s, borderRadius: `3px 3px ${9 * s}px ${9 * s}px`,
        background: CARD, border: `${2.4 * s}px solid ${CARDD}`, boxSizing: "border-box",
        boxShadow: SH }} />
      <div style={{ position: "absolute", right: -9 * s, top: 7 * s, width: 12 * s,
        height: 13 * s, borderRadius: "50%", border: `${2.4 * s}px solid ${CARDD}` }} />
    </div>
  );
};

/** ⭐ a hand-written sticky, stuck on the machinery. */
export const Sticky: React.FC<{ x: number; y: number; t: string; s?: number; z?: number;
  rot?: number; c?: string }> = ({ x, y, t, s = 1, z = 66, rot = -6, c = "#D8CFA4" }) => (
  <div style={{ position: "absolute", left: x, top: y, width: 96 * s, zIndex: z,
    background: c, boxShadow: SH, transform: `rotate(${rot}deg)`,
    padding: `${7 * s}px ${6 * s}px`, textAlign: "center", fontFamily: MONO,
    fontWeight: 900, fontSize: 10 * s, lineHeight: 1.25, letterSpacing: "0.02em",
    color: "#5B5340" }}>{t}</div>
);

/* ⭐⭐ ROUND 12 — ALEX: *"more messaging throughout to our target audience
   through like logos and stuff that attracts them, AI niche"*.
   THE AGENT RACK: the coding agents headroom wraps, as their REAL marks.
   ⛔ This is not decoration and it is not invented — headroom's README ships
   `headroom wrap claude|codex|grok|copilot|cursor|aider|opencode|cline|…`, so
   every mark here is a documented target. For an AI-niche viewer this is the
   strongest single frame in the reel: they own at least one of these.
   ⛔ Real marks only, from public/logos, on white tiles. */
export const AGENTS: [string, string][] = [
  ["claude.svg", "CLAUDE CODE"], ["cursor.svg", "CURSOR"],
  ["githubcopilot.svg", "COPILOT"], ["cline.svg", "CLINE"],
];

export const AgentRack: React.FC<{ x: number; y: number; s?: number; z?: number;
  on: number[]; f?: number; label?: string }> =
  ({ x, y, s = 1, z = 64, on, f = 0, label = "IT WRAPS" }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z }}>
    <div style={{ position: "absolute", left: 0, top: -26 * s, fontFamily: MONO,
      fontWeight: 900, fontSize: 14 * s, letterSpacing: "0.14em",
      color: mxh(AMBER, 0.40) }}>{label}</div>
    {AGENTS.map(([file, name], i) => {
      const k = on[i] ?? 0;
      /* ⭐ EXAGGERATED: each tile overshoots hard and settles, and keeps a
         small permanent float so the rack is never a static row. */
      const pop = 0.55 + k * 0.45;
      return (
        <div key={name} style={{ position: "absolute", left: i * 116 * s, top: 0,
          opacity: 0.15 + k * 0.85,
          transform: `translateY(${(1 - k) * 40 * s + Math.sin(f / 17 + i * 1.4) * 3}px) scale(${pop}) rotate(${(1 - k) * (i % 2 ? 12 : -12)}deg)`,
          transformOrigin: "50% 100%" }}>
          <div style={{ width: 96 * s, height: 96 * s, borderRadius: 20 * s,
            background: "#FFFFFF", border: `${3 * s}px solid ${CARDD}`, boxSizing: "border-box",
            display: "flex", alignItems: "center", justifyContent: "center", boxShadow: SH_D }}>
            <Img src={staticFile("logos/" + file)}
              style={{ width: 60 * s, height: 60 * s, objectFit: "contain" }} />
          </div>
          <div style={{ width: 96 * s, marginTop: 7 * s, textAlign: "center",
            fontFamily: MONO, fontWeight: 900, fontSize: 10 * s, letterSpacing: "0.04em",
            color: mxh(CARD, 0.06) }}>{name}</div>
        </div>
      );
    })}
  </div>
);
