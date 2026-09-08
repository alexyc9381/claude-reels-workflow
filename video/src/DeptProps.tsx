import React from "react";
import { Img, staticFile } from "remotion";
import {
  W, H, E, OUT, IO, BACK, IN_Q, LIN, hexa, dkh, mxh, SH, SH_D, rnd, mono, ui,
  INK, MUTE, CLAY, CLAYD, GOLD, GREEN, RED, SKY, BONE, BRASS, STEEL, IRON, CHROME,
  SLATE, EMBER, VIOLET, PLUM, TEAL, SODIUM, OXBLOOD, MOSS, GUNMETAL, PAPER, CREAMB,
} from "./DeptWorld";

/* ===========================================================================
   REEL 143 · "DEPARTMENT" — THE PROPS.

   ⛔⛔ DRAW, DON'T STACK. `memory/reel-draw-dont-stack`: stacked CSS divs cannot
   draw a recognisable object. Every object whose IDENTITY matters is ONE inline
   <svg> with real paths, and every one passes the SILHOUETTE TEST — flat black
   on white, nameable from the outline alone. Only genuinely rectangular things
   (racks, decks, plates, boards) are divs.

   ⛔ VALUE SEPARATION, not hue: a hero and its ground must differ in LIGHTNESS.
   ⛔ FLAT + ONE SHADE + ONE HIGHLIGHT, never six stacked gradients.
   ⛔ ONE LIGHT DIRECTION for the whole reel: top-left.
   ⛔ MATTE ONLY — SH / SH_D are OFFSET shadows. No `0 0 Npx` glow anywhere.
   ========================================================================= */

export type HatId = "cap" | "phones" | "beret" | "visor" | "wig";

/* ---------------------------------------------------------------------------
   ⭐⭐⭐ THE FIVE JOB HATS — the hook's hero object and the reel's spine.

   They have to be nameable at 104px on a muted feed, which means the test is
   the OUTLINE, not the detail: a peak that juts, a band with two cups and a
   boom, a slumped disc with a nib, a flat shade brim, a rolled wig with tails.
   Every one is a different overall SHAPE, so a stack of five reads as five
   different jobs and not as five hats.
   ⛔ Drawn in a 220x140 box with the head line at y=140, so a tower can just
      stack them at their own heights without per-hat fudging.
------------------------------------------------------------------------- */
export const JobHat: React.FC<{ id: HatId; x: number; y: number; s?: number; z?: number;
  rot?: number; o?: number; dim?: number }> =
  ({ id, x, y, s = 1, z = 60, rot = 0, o = 1, dim = 0 }) => {
  const w = 220 * s, h = 140 * s;
  const D = (c: string) => dkh(c, 0.26 + dim * 0.22);
  const M = (c: string) => mxh(c, 0.20 - dim * 0.14);
  const body = (c: string) => (dim ? dkh(c, dim * 0.4) : c);
  return (
    <div style={{ position: "absolute", left: x - w / 2, top: y - h, width: w, height: h, zIndex: z,
      opacity: o, transform: `rotate(${rot}deg)`, transformOrigin: "50% 100%" }}>
      <svg viewBox="0 0 220 140" width={w} height={h} style={{ display: "block", overflow: "visible" }}>
        {id === "cap" && (() => { const c = body(CLAY); return (<g>
          {/* the PEAK is the whole silhouette: it juts a third of the width */}
          <path d="M112 118 C 168 118, 214 112, 214 100 C 214 92, 160 92, 112 96 Z" fill={D(c)} />
          <path d="M30 118 C 26 66, 56 40, 106 40 C 152 40, 178 66, 176 118 Z" fill={c} />
          <path d="M30 118 C 26 66, 56 40, 106 40 C 132 40, 150 52, 160 70 L 40 96 Z" fill={M(c)} />
          <rect x="28" y="110" width="150" height="14" rx="6" fill={D(c)} />
          <circle cx="103" cy="42" r="10" fill={D(c)} />
        </g>); })()}

        {id === "phones" && (() => { const c = body(TEAL); return (<g>
          {/* headband arc + two cups + a boom mic: three features, one outline */}
          <path d="M34 122 L34 74 C34 32, 186 32, 186 74 L186 122" fill="none"
                stroke={D(c)} strokeWidth="18" strokeLinecap="round" />
          <path d="M40 76 C46 44, 174 44, 180 76" fill="none" stroke={M(c)} strokeWidth="7" strokeLinecap="round" />
          <rect x="10" y="76" width="52" height="66" rx="18" fill={c} />
          <rect x="158" y="76" width="52" height="66" rx="18" fill={c} />
          <rect x="20" y="86" width="32" height="46" rx="13" fill={D(c)} />
          <rect x="168" y="86" width="32" height="46" rx="13" fill={D(c)} />
          <path d="M62 118 C 96 118, 110 128, 112 140" fill="none" stroke={D(c)} strokeWidth="10" strokeLinecap="round" />
          <circle cx="114" cy="140" r="13" fill={M(c)} />
        </g>); })()}

        {id === "beret" && (() => { const c = body(PLUM); return (<g>
          {/* a slumped disc with a nib, tilted — nothing else has that outline */}
          <path d="M22 120 C 6 100, 22 46, 92 40 C 172 33, 214 62, 208 88 C 204 108, 150 128, 22 120 Z" fill={c} />
          <path d="M40 68 C 74 46, 140 42, 190 62 C 160 46, 96 44, 40 68 Z" fill={M(c)} />
          <rect x="24" y="112" width="176" height="16" rx="8" fill={D(c)} />
          <circle cx="106" cy="34" r="12" fill={D(c)} />
          <rect x="100" y="22" width="12" height="16" rx="5" fill={D(c)} />
        </g>); })()}

        {id === "visor" && (() => { const c = body(GREEN); return (<g>
          {/* the accountant's eyeshade: a flat translucent brim under a band */}
          <path d="M14 96 C 14 62, 206 62, 206 96 C 206 130, 156 140, 110 140 C 64 140, 14 130, 14 96 Z" fill={c} />
          <path d="M20 92 C 30 74, 190 74, 200 92 C 150 82, 70 82, 20 92 Z" fill={M(c)} />
          <rect x="16" y="60" width="188" height="24" rx="11" fill={D(c)} />
          <rect x="28" y="66" width="164" height="7" rx="3" fill={mxh(BRASS, 0.1)} />
          <rect x="88" y="46" width="44" height="18" rx="7" fill={dkh(BRASS, 0.16)} />
        </g>); })()}

        {id === "wig" && (() => { const c = body("#E8E2D4"); return (<g>
          {/* the barrister's wig: rolled curls across, two tails down the back */}
          <path d="M22 128 C 10 74, 46 30, 110 30 C 174 30, 210 74, 198 128 Z" fill={c} />
          {[0, 1, 2].map(r => (
            <g key={r}>
              {Array.from({ length: 6 }, (_, i) => (
                <circle key={i} cx={36 + i * 30} cy={62 + r * 26} r={15} fill={r % 2 ? D(c) : M(c)} />
              ))}
            </g>
          ))}
          <rect x="34" y="118" width="30" height="22" rx="10" fill={D(c)} />
          <rect x="156" y="118" width="30" height="22" rx="10" fill={D(c)} />
        </g>); })()}
      </svg>
    </div>
  );
};

/** ⭐ THE HAT TOWER — the hook. `n` hats stacked on one head, each on its own
    settle clock so the stack is never rigid, and the whole column leans as it
    grows. ⛔ Every hat has its OWN arrival frame: an entrance that ends at 1 is
    a freeze, so each keeps a damped settle running after it lands. */
export const HatTower: React.FC<{ f: number; x: number; headY: number; s?: number;
  ats: number[]; z?: number; ids?: HatId[]; lift?: number; step?: number; splay?: number }> =
  ({ f, x, headY, s = 1, ats, z = 78, ids = ["cap", "phones", "beret", "visor", "wig"],
     lift = 0, step: stepIn, splay = 0 }) => {
  /* ⛔ THE STEP IS A PROP, NOT `84 * s`. The tower has to fit between the head and
     the fascia, and the two are set by the HERO's size, not the hat's — tying the
     pitch to `s` meant every attempt to make the hats read (bigger) pushed the top
     hat off the top of the panel. */
  const step = stepIn ?? 84 * s;
  return (<>{ats.map((at, i) => {
    const lf = f - at;
    if (lf < -1) return null;
    const drop = E(lf, 0, 9, -640, 0, IO);
    /* the settle NEVER stops dead: a damped ring that outlives the arrival */
    const ring = lf > 9 ? Math.sin((lf - 9) * 0.52) * 5.6 * Math.exp(-(lf - 9) / 15) : 0;
    /* ⭐ THE STACK SPLAYS. A neat vertical column reads as a design; a pile that
       leans further the higher it goes reads as ABOUT TO GO, which is the beat.
       It also buys back the height the step gives up. */
    const side = i % 2 ? 1 : -1;
    const arm = Math.ceil(i / 2);   /* 0,1,1,2,2 — a balanced fan, not a lean */
    const lean = Math.sin(f / 26 + i * 0.9) * (1.1 + i * 0.85) + ring + side * splay * arm * 4.6;
    const sag = i * 2.2;
    return (
      <JobHat key={"ht" + i} id={ids[i % ids.length]}
        x={x + Math.sin(f / 31 + i) * (1 + i * 1.5) + side * splay * arm * 22}
        y={headY - i * step + drop + sag - lift * (1 + i * 0.24)} s={s} z={z + i} rot={lean} />
    );
  })}</>);
};

/** ⭐ A WAVE OF PAPERWORK — big, bright, arriving. §1: "many large bright
    objects travelling" is one of only two shapes that register, and this one is
    also the claim: every department you take on is more work on your counter.
    ⛔ Each sheet is 96x72 — above the ~52px floor that survives 1012->240. */
export const PaperWave: React.FC<{ f: number; at: number; n: number; x: number; y: number;
  spread?: number; z?: number; s?: number; sweep?: number }> =
  ({ f, at, n, x, y, spread = 400, z = 80, s = 1, sweep = 0 }) => (
  <>{Array.from({ length: n }, (_, i) => {
    const lf = f - at - i * 2;
    if (lf < 0) return null;
    const k = E(lf, 0, 11, 0, 1, OUT);
    const land = lf > 11 ? Math.sin((lf - 11) * 0.6) * 4 * Math.exp(-(lf - 11) / 10) : 0;
    const tx = x + (rnd(i + at, 3) - 0.5) * spread;
    const ty = y - (i % 3) * 15 * s;
    return (
      <div key={"pw" + at + i} style={{ position: "absolute",
        left: tx - 48 * s + sweep * (300 + i * 40),
        top: ty - 380 * (1 - k) + land, width: 96 * s, height: 72 * s, zIndex: z + i,
        opacity: 1 - sweep, borderRadius: 3,
        transform: `rotate(${(1 - k) * (i % 2 ? 54 : -46) + (rnd(i, 8) - 0.5) * 22 + sweep * 40}deg)`,
        background: `linear-gradient(160deg,#FAF4E4 0%,#E4DAC0 100%)`, boxShadow: SH }}>
        {[0, 1, 2].map(j => (
          <div key={j} style={{ position: "absolute", left: 10 * s, top: (14 + j * 16) * s,
            width: (34 + rnd(i * 3 + j, 4) * 42) * s, height: 6 * s, borderRadius: 2,
            background: hexa("#4A4234", 0.44) }} />
        ))}
      </div>
    );
  })}</>
);

/* ---------------------------------------------------------------------------
   SPLIT-FLAP — a number that MOVES to its value. `ANIMATION-QUALITY` §4: a
   number is never typeset at its value.
   ⛔ PRE-SEED IT FAR ENOUGH BACK TO HAVE SETTLED. Reel 115 caught frame 0 with
      half-rolled cells because its counter started 13 frames earlier, not 40.
------------------------------------------------------------------------- */
export const Flap: React.FC<{ f: number; x: number; y: number; s?: number;
  z?: number; c?: string; fg?: string; label?: string;
  /** ⛔ ONE COMPONENT, N VALUES. v1 stacked three `Flap`s and rendered two of
      them at once, so frame 0 read "70" instead of "05". A split-flap has ONE
      set of cells; what changes is which value they are rolled to. */
  steps: Array<{ v: string; at: number }> }> =
  ({ f, x, y, s = 1, z = 74, c = "#171A20", fg = "#F6EFDD", label, steps }) => {
  let cur = steps[0];
  for (const st of steps) if (f >= st.at) cur = st;
  const v = cur.v;
  const lf = f - cur.at;
  const cw = 46 * s, ch = 66 * s;
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: z, display: "flex", gap: 4 * s }}>
      {v.split("").map((ch2, i) => {
        const roll = E(lf, i * 2, i * 2 + 9, 1, 0, OUT);
        return (
          <div key={i} style={{ width: cw, height: ch, borderRadius: 4 * s, background: c,
            overflow: "hidden", position: "relative", boxShadow: SH,
            border: `${2 * s}px solid ${dkh(c, -0.5)}` }}>
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center",
              justifyContent: "center", ...mono(38 * s, 800), color: fg,
              transform: `translateY(${roll * -ch}px)` }}>{ch2}</div>
            {roll > 0.01 && (
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center",
                justifyContent: "center", ...mono(38 * s, 800), color: hexa(fg, 0.5),
                transform: `translateY(${(1 - roll) * ch}px)` }}>{"0123456789"[(i * 3 + 7) % 10]}</div>
            )}
            <div style={{ position: "absolute", left: 0, right: 0, top: ch / 2 - 1, height: 2,
              background: hexa("#000", 0.55) }} />
          </div>
        );
      })}
      {label && (
        <div style={{ position: "absolute", left: 0, top: ch + 6 * s, ...mono(13 * s, 800),
          letterSpacing: "0.20em", color: hexa(fg, 0.72), whiteSpace: "nowrap" }}>{label}</div>
      )}
    </div>
  );
};

/** ⭐ A TALLY THAT COUNTS UP TO ITS VALUE — used wherever the VO gives a count.
    ⛔ MOTION BLUR SMEARS A CHANGING VALUE, so the number is quantised with
       round(), never floor(), which would straddle the frame. */
export const Tally: React.FC<{ f: number; at: number; dur: number; to: number; x: number; y: number;
  s?: number; z?: number; c?: string; label?: string; pad?: number }> =
  ({ f, at, dur, to, x, y, s = 1, z = 80, c = BONE, label, pad = 2 }) => {
  const k = E(f, at, at + dur, 0, 1, OUT);
  const n = Math.round(k * to);
  const pop = f >= at + dur - 3 && f < at + dur + 8 ? E(f, at + dur - 3, at + dur + 6, 1.24, 1, BACK) : 1;
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: z, transform: `scale(${pop})`,
      transformOrigin: "0% 50%" }}>
      <div style={{ ...mono(64 * s, 800), color: c, lineHeight: 1,
        textShadow: "0 3px 10px rgba(0,0,0,0.55)" }}>{String(n).padStart(pad, "0")}</div>
      {label && <div style={{ ...mono(15 * s, 800), letterSpacing: "0.22em",
        color: hexa(c, 0.66), marginTop: 4 }}>{label}</div>}
    </div>
  );
};

/* ---------------------------------------------------------------------------
   THE SHOP — S0's set. The FASCIA carries frame 0's luma and the claim plate,
   so the hero never has to. `THE-OPEN` : a gate carried by the wrong object
   deforms that object.
------------------------------------------------------------------------- */
export const Fascia: React.FC<{ f: number; y?: number; t: string; sub: string }> =
  ({ f, y = 74, t, sub }) => (
  <>
    {/* the lit box sign: the single largest bright object at frame 0 */}
    <div style={{ position: "absolute", left: 42, top: y, width: 928, height: 178, zIndex: 30,
      borderRadius: 10, background: "linear-gradient(180deg,#FFF6DE 0%,#F6E3B2 52%,#E2C88C 100%)",
      border: "7px solid #6A4C2A", boxShadow: SH_D }}>
      <div style={{ position: "absolute", left: 0, right: 0, top: 22, textAlign: "center",
        ...ui(62, 900), letterSpacing: "-0.02em", color: "#2A1B10" }}>{t}</div>
      {/* ⛔ the sub-line is set to FIT: v1 lost "LEGAL" off the right edge because
          0.22em of tracking on 26px is 40px wider than the box. */}
      <div style={{ position: "absolute", left: 18, right: 18, top: 98, textAlign: "center",
        ...mono(23, 800), letterSpacing: "0.10em", color: "#7A5326", whiteSpace: "nowrap",
        overflow: "hidden" }}>{sub}</div>
      {/* two housing lamps, matte discs + a low-alpha ring (never a glow blur) */}
      {[124, 806].map((lx, i) => (
        <div key={i} style={{ position: "absolute", left: lx - 13, top: -26, width: 26, height: 26,
          borderRadius: "50%", background: "#FFE9B4", border: `4px solid ${hexa("#FFE9B4", 0.28)}` }} />
      ))}
    </div>
    {/* the wash the sign throws onto the room under it */}
    <div style={{ position: "absolute", left: 0, top: y + 150, width: W, height: 300, zIndex: 8,
      background: `linear-gradient(180deg, ${hexa("#F7E2AE", 0.52)} 0%, ${hexa("#C08E4E", 0.26)} 58%, ${hexa("#C08E4E", 0)} 100%)` }} />
  </>
);

/** the swing price ticket that flips to $0 */
export const PriceTicket: React.FC<{ f: number; at: number; x: number; y: number; s?: number; z?: number }> =
  ({ f, at, x, y, s = 1, z = 86 }) => {
  const lf = f - at;
  const flip = E(lf, 0, 11, 0, 1, IO);
  const swing = lf > 11 ? Math.sin((lf - 11) * 0.42) * 7 * Math.exp(-(lf - 11) / 13) : 0;
  const face = flip > 0.5;
  const w = 300 * s, h = 176 * s;
  return (
    <div style={{ position: "absolute", left: x - w / 2, top: y, width: w, height: h, zIndex: z,
      transform: `rotate(${swing}deg) rotateX(${flip * 180}deg)`, transformOrigin: "50% 0%",
      transformStyle: "preserve-3d" }}>
      <div style={{ position: "absolute", inset: 0, borderRadius: 10 * s,
        background: face ? "#F8F1DE" : "#E5D8B8", border: `${5 * s}px solid #6A4C2A`,
        boxShadow: SH, transform: face ? "rotateX(180deg)" : undefined,
        display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
        <div style={{ ...ui(face ? 108 * s : 52 * s, 900), color: face ? "#1E4C36" : "#7A2B22",
          lineHeight: 1 }}>{face ? "$0" : "HIRING"}</div>
        <div style={{ ...mono(17 * s, 800), letterSpacing: "0.2em", marginTop: 8 * s,
          color: face ? "#3E7A5C" : "#A9563F" }}>{face ? "TO STAFF IT" : "5 ROLES"}</div>
      </div>
      {/* the string it hangs on */}
      <div style={{ position: "absolute", left: w / 2 - 2, top: -34 * s, width: 4, height: 36 * s,
        background: "#6A4C2A" }} />
    </div>
  );
};

/* ---------------------------------------------------------------------------
   THE FIVE BAYS — S1 and S16. One component, two states: dark (lamp off, empty)
   and lit (lamp struck, named, staffed).
   ⛔ AN EMPTY CONTAINER MUST STILL READ. An unlit bay is a bright-edged recess,
      not a black hole (reel 108's rule), or the arrival has nothing to fill.
------------------------------------------------------------------------- */
export const Bay: React.FC<{ x: number; y: number; w?: number; h?: number; z?: number;
  on: number; key0: string; lamp: string; no: string; name: string; f: number; unified?: string }> =
  ({ x, y, w: ww = 176, h: hh = 236, z = 24, on, key0, lamp, no, name, f, unified }) => {
  const K = unified ?? key0;
  const L = unified ? mxh(unified, 0.34) : lamp;
  return (<>
    {/* the recess */}
    <div style={{ position: "absolute", left: x, top: y, width: ww, height: hh, zIndex: z,
      borderRadius: 6, overflow: "hidden",
      background: `linear-gradient(180deg, ${dkh(K, 0.72 - on * 0.30)} 0%, ${dkh(K, 0.86 - on * 0.34)} 100%)`,
      border: `5px solid ${dkh(K, 0.62)}`, boxShadow: SH }}>
      {/* the back wall takes the lamp */}
      <div style={{ position: "absolute", inset: 0, opacity: on,
        background: `linear-gradient(180deg, ${hexa(L, 0.72)} 0%, ${hexa(K, 0.42)} 62%, ${hexa("#05070C", 0.30)} 100%)` }} />
      {/* three shelf rails so an empty bay still has content */}
      {[0.30, 0.54, 0.78].map((p, i) => (
        <div key={i} style={{ position: "absolute", left: 10, right: 10, top: hh * p, height: 7,
          background: hexa(on > 0.4 ? mxh(K, 0.42) : "#8E97A4", 0.30 + on * 0.34) }} />
      ))}
    </div>
    {/* the lamp housing above it — a matte disc, never a blur */}
    <div style={{ position: "absolute", left: x + ww / 2 - 30, top: y - 30, width: 60, height: 20,
      borderRadius: 5, background: "#2A2F36", zIndex: z + 2, boxShadow: SH }} />
    <div style={{ position: "absolute", left: x + ww / 2 - 22, top: y - 13, width: 44, height: 9,
      borderRadius: 4, zIndex: z + 3,
      background: on > 0.05 ? L : "#3A3F46", opacity: 0.4 + on * 0.6 }} />
    {on > 0.05 && (
      <div style={{ position: "absolute", left: x + ww / 2 - (ww + 90) / 2, top: y - 6,
        width: ww + 90, height: hh + 96, zIndex: z + 1, opacity: on * 0.5,
        clipPath: `polygon(${50 - 26}% 0, ${50 + 26}% 0, 100% 100%, 0 100%)`,
        background: `linear-gradient(180deg, ${hexa(L, 0.44)} 0%, ${hexa(L, 0)} 100%)` }} />
    )}
    {/* the name plate strikes ON with the lamp */}
    <div style={{ position: "absolute", left: x - 6, top: y + hh + 12, width: ww + 12, zIndex: z + 6,
      opacity: on, transform: `translateY(${(1 - on) * 14}px)`,
      background: on > 0.5 ? mxh(K, 0.18) : "#3A3F46", borderRadius: 4,
      border: `3px solid ${dkh(K, 0.5)}`, padding: "5px 4px", boxShadow: SH }}>
      <div style={{ textAlign: "center", ...ui(21, 900), color: "#20170F", letterSpacing: "0.04em" }}>
        <span style={{ ...mono(17, 800), opacity: 0.62, marginRight: 7 }}>{no}</span>{name}
      </div>
    </div>
  </>);
};

/* ---------------------------------------------------------------------------
   ⭐⭐ THE SKILL SHEET — the reel's HERO ARTIFACT. The same physical object all
   the way through: unrolled (S2), walked on (S2b), choked (S14), re-cut (S15).

   ⛔ IT IS NOT A DOCUMENT TO READ. `memory/slide-graphics-must-be-abstract`: the
      markdown body is drawn as GREY RULE BARS; only the filename and the `##`
      marks are set as type, so the prop reads as "a markdown file" at 104px and
      never asks the viewer to read anything.
------------------------------------------------------------------------- */
export const SkillSheet: React.FC<{ f: number; x: number; y: number; w: number; h: number;
  z?: number; open?: number; tint?: string; title?: string; rows?: number; custom?: number;
  rot?: number; grey?: number }> =
  ({ f, x, y, w: ww, h: hh, z = 60, open = 1, tint = CLAY, title = "SKILL.md", rows = 7,
     custom = 0, rot = 0, grey = 0 }) => {
  const paper = grey > 0.5 ? "#B9B7AE" : "#F7F2E4";
  const rule = grey > 0.5 ? "#8C8A82" : "#CFC6AE";
  return (
    <div style={{ position: "absolute", left: x, top: y, width: ww * open, height: hh, zIndex: z,
      overflow: "hidden", transform: `rotate(${rot}deg)`, transformOrigin: "0% 50%",
      background: `linear-gradient(180deg, ${paper} 0%, ${dkh(paper, 0.09)} 100%)`,
      borderRadius: 5, boxShadow: SH_D }}>
      {/* the customised spine — the visible difference S15 makes */}
      {custom > 0.02 && (
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 26 * custom,
          background: `linear-gradient(180deg, ${tint} 0%, ${dkh(tint, 0.28)} 100%)` }} />
      )}
      <div style={{ position: "absolute", left: 34, top: 18, ...mono(Math.round(hh * 0.115), 800),
        color: custom > 0.5 ? dkh(tint, 0.24) : "#5C554A", letterSpacing: "0.02em" }}>
        <span style={{ opacity: 0.45 }}># </span>{title}
      </div>
      {/* ⛔ REV 3 — at 11 rows of 8px bars on a 922px sheet this read as an EMPTY
          CREAM SLAB, which is "grey + rectangular" with a different hue. The body
          is now a real two-column file: taller bars, longer runs, a rule under the
          heading. Still NOT WORDS — a markdown file has to be recognisable at
          104px, not readable. */}
      <div style={{ position: "absolute", left: 34, top: 18 + hh * 0.155, width: ww * 0.42,
        height: Math.max(3, hh * 0.018), background: hexa(custom > 0.5 ? tint : "#6E6658", 0.55) }} />
      {Array.from({ length: rows }, (_, i) => {
        const head = i % 4 === 0;
        const col = ww > 520 && i % 2 === 1 ? 1 : 0;
        const wobble = custom > 0.02 && i % 3 === 1 ? custom : 0;
        const cw = ww > 520 ? ww * 0.44 : ww;
        return (
          <div key={"rw" + i} style={{ position: "absolute",
            left: (col ? ww * 0.52 : 0) + (head ? 34 : 58),
            top: 18 + hh * 0.225 + Math.floor(i / (ww > 520 ? 2 : 1)) * (hh * (ww > 520 ? 0.125 : 0.088)),
            width: (head ? 0.46 : 0.42 + rnd(i, 3) * 0.48) * cw,
            height: head ? hh * 0.062 : hh * 0.046, borderRadius: 3,
            background: head ? (custom > 0.5 ? hexa(tint, 0.9) : "#6E6658")
                             : hexa(wobble ? tint : rule, wobble ? 0.6 + wobble * 0.3 : 0.95) }} />
        );
      })}
      {/* the bullet dots that make a markdown list read as a list */}
      {Array.from({ length: Math.min(rows, 8) }, (_, i) => {
        if (i % 4 === 0) return null;
        const col = ww > 520 && i % 2 === 1 ? 1 : 0;
        return (
          <div key={"bl" + i} style={{ position: "absolute",
            left: (col ? ww * 0.52 : 0) + 38,
            top: 18 + hh * 0.225 + Math.floor(i / (ww > 520 ? 2 : 1)) * (hh * (ww > 520 ? 0.125 : 0.088)) + hh * 0.012,
            width: Math.max(4, hh * 0.026), height: Math.max(4, hh * 0.026), borderRadius: "50%",
            background: hexa(custom > 0.5 ? tint : "#8C8474", 0.9) }} />
        );
      })}
      {/* the fenced block every skill file has, drawn as a block not as code */}
      <div style={{ position: "absolute", left: 56, bottom: hh * 0.10, width: ww * 0.52,
        height: hh * 0.16, borderRadius: 4, background: hexa(custom > 0.5 ? tint : "#3E3A33", 0.16),
        border: `2px solid ${hexa(custom > 0.5 ? tint : "#3E3A33", 0.34)}` }} />
      {/* the index tabs that only exist once it is YOURS */}
      {custom > 0.4 && [0, 1, 2, 3].map(i => (
        <div key={"tb" + i} style={{ position: "absolute", right: -14 * (custom - 0.4) / 0.6,
          top: hh * (0.20 + i * 0.17), width: 30, height: hh * 0.12, borderRadius: "0 5px 5px 0",
          background: [tint, GOLD, GREEN, SKY][i], boxShadow: SH }} />
      ))}
    </div>
  );
};

/* ---------------------------------------------------------------------------
   TOOL TILES + THE RACKS. ⛔ EACH DEPARTMENT'S COUNT SEATS INTO A DIFFERENT
   MECHANISM — reel 120 shipped five scenes sharing one hero prop and got six
   "boring" timestamps back. 45 into a WALL RACK, 17 onto a BELT-SIDE RAIL,
   8 as BRASS LEVERS, 9 as WAX SEALS.
------------------------------------------------------------------------- */
export const ToolTile: React.FC<{ x: number; y: number; s?: number; z?: number; c: string;
  i: number; o?: number; rot?: number }> =
  ({ x, y, s = 74, z = 56, c, i, o = 1, rot = 0 }) => {
  const kind = i % 5;
  return (
    <div style={{ position: "absolute", left: x, top: y, width: s, height: s * 0.86, zIndex: z,
      opacity: o, transform: `rotate(${rot}deg)`, borderRadius: 6,
      background: `linear-gradient(160deg, ${mxh(c, 0.16)} 0%, ${c} 46%, ${dkh(c, 0.22)} 100%)`,
      border: `3px solid ${dkh(c, 0.44)}`, boxShadow: SH, overflow: "hidden" }}>
      <svg viewBox="0 0 74 64" width={s} height={s * 0.86} style={{ display: "block" }}>
        {kind === 0 && <g fill={hexa("#1A140E", 0.62)}><rect x="14" y="14" width="46" height="8" rx="4" />
          <rect x="14" y="30" width="34" height="8" rx="4" /><rect x="14" y="46" width="42" height="8" rx="4" /></g>}
        {kind === 1 && <g fill={hexa("#1A140E", 0.62)}><circle cx="37" cy="32" r="17" />
          <rect x="33" y="6" width="8" height="14" rx="4" /><rect x="33" y="44" width="8" height="14" rx="4" /></g>}
        {kind === 2 && <path d="M14 50 L30 22 L44 40 L60 12 L60 50 Z" fill={hexa("#1A140E", 0.62)} />}
        {kind === 3 && <g fill={hexa("#1A140E", 0.62)}><rect x="16" y="12" width="42" height="40" rx="5" />
          <rect x="24" y="20" width="26" height="6" rx="3" fill={hexa("#FFF", 0.5)} /></g>}
        {kind === 4 && <g fill={hexa("#1A140E", 0.62)}><path d="M22 52 L22 16 L52 34 Z" />
          <rect x="12" y="10" width="7" height="44" rx="3" /></g>}
      </svg>
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: s * 0.16,
        background: hexa("#FFFFFF", 0.16) }} />
    </div>
  );
};

/** ⭐ THE WALL RACK — 45 tiles land into a countable 9x5 grid, one at a time,
    spread across the FULL duration. §9: arrivals bunched in the first third
    leave the rest of the scene dead. */
export const WallRack: React.FC<{ f: number; x: number; y: number; cols: number; rows: number;
  cell: number; gap: number; at: number; per: number; c: string; z?: number }> =
  ({ f, x, y, cols, rows, cell, gap, at, per, c, z = 46 }) => (
  <>
    {/* the rack carcass — it reads while EMPTY, which is the promise */}
    <div style={{ position: "absolute", left: x - 14, top: y - 14, zIndex: z - 2,
      width: cols * (cell + gap) - gap + 28, height: rows * (cell * 0.86 + gap) - gap + 28,
      borderRadius: 8, background: `linear-gradient(180deg, ${dkh(c, 0.62)} 0%, ${dkh(c, 0.78)} 100%)`,
      border: `5px solid ${dkh(c, 0.5)}`, boxShadow: SH_D }} />
    {Array.from({ length: rows }, (_, r) => (
      <div key={"sh" + r} style={{ position: "absolute", left: x - 10, top: y + r * (cell * 0.86 + gap) + cell * 0.86,
        width: cols * (cell + gap) - gap + 20, height: 6, zIndex: z - 1,
        background: hexa(mxh(c, 0.30), 0.42) }} />
    ))}
    {Array.from({ length: cols * rows }, (_, i) => {
      const r = Math.floor(i / cols), cx = i % cols;
      const a = at + i * per;
      const lf = f - a;
      if (lf < 0) return null;
      const fly = E(lf, 0, 7, 1, 0, OUT);
      const sq = 1 + Math.max(0, 1 - Math.abs(lf - 7) / 4) * 0.12;
      return (
        <ToolTile key={"tt" + i} i={i} c={mxh(c, ((r * 7 + cx) % 4) * 0.07 - 0.06)}
          x={x + cx * (cell + gap) - fly * (240 + cx * 26)}
          y={y + r * (cell * 0.86 + gap) + fly * (120 - r * 30)}
          s={cell} z={z + (rows - r)} o={1} rot={fly * -22} />
      );
    })}
  </>
);

/* ---------------------------------------------------------------------------
   THE CONTENT BELT — S5. A blank 9:16 frame enters and leaves finished.
   ⛔ THE OBJECT MUST CHANGE, not just travel: a belt of identical crates is
      furniture. This one gains a script, then a thumbnail, then an ID tag.
------------------------------------------------------------------------- */
export const ContentFrame: React.FC<{ x: number; y: number; s?: number; z?: number;
  stage: number; f: number }> = ({ x, y, s = 1, z = 50, stage, f }) => {
  const w = 96 * s, h = 168 * s;
  return (
    <div style={{ position: "absolute", left: x, top: y, width: w, height: h, zIndex: z,
      borderRadius: 8 * s, background: stage >= 2 ? "#F6F0DF" : "#D8D2C2",
      border: `${4 * s}px solid #2B3238`, boxShadow: SH, overflow: "hidden" }}>
      {/* stage 2: the THUMBNAIL — a real picture card, the brightest thing on it */}
      {stage >= 2 && (
        <div style={{ position: "absolute", left: 6 * s, top: 6 * s, right: 6 * s, height: h * 0.42,
          borderRadius: 5 * s, background: `linear-gradient(150deg, ${CLAY} 0%, ${GOLD} 100%)` }}>
          <div style={{ position: "absolute", left: "50%", top: "50%", marginLeft: -9 * s,
            marginTop: -11 * s, width: 0, height: 0, borderLeft: `${18 * s}px solid #FFF6E2`,
            borderTop: `${11 * s}px solid transparent`, borderBottom: `${11 * s}px solid transparent` }} />
        </div>
      )}
      {/* stage 1: the SCRIPT — grey rule bars, never words */}
      {stage >= 1 && Array.from({ length: 5 }, (_, i) => (
        <div key={i} style={{ position: "absolute", left: 10 * s, top: (stage >= 2 ? h * 0.50 : 18 * s) + i * 14 * s,
          width: (36 + rnd(i, 9) * 44) * s, height: 7 * s, borderRadius: 3,
          background: hexa("#3B3730", 0.68) }} />
      ))}
      {/* stage 3: the ID tag, clipped to the corner */}
      {stage >= 3 && (
        <div style={{ position: "absolute", right: 5 * s, bottom: 5 * s, padding: `${3 * s}px ${7 * s}px`,
          borderRadius: 4 * s, background: TEAL, ...mono(12 * s, 800), color: "#0B2026" }}>ID</div>
      )}
    </div>
  );
};

/* ---------------------------------------------------------------------------
   THE SHUTTER — S6. A ratchet cranks and a roll door lifts on a lit room.
   ⭐ ANTICIPATION IS A PROMISED EVENT WHOSE RESOLUTION IS WITHHELD: the light
      arrives before the room does.
------------------------------------------------------------------------- */
export const Shutter: React.FC<{ f: number; x: number; y: number; w: number; h: number;
  open: number; z?: number; c?: string }> =
  ({ f, x, y, w: ww, h: hh, open, z = 62, c = "#5C6570" }) => (
  <>
    <div style={{ position: "absolute", left: x - 18, top: y - 34, width: ww + 36, height: 34,
      zIndex: z + 2, borderRadius: 5, background: dkh(c, 0.42), boxShadow: SH }} />
    <div style={{ position: "absolute", left: x, top: y, width: ww, height: hh, zIndex: z,
      overflow: "hidden" }}>
      <div style={{ position: "absolute", left: 0, top: -hh * open, width: ww, height: hh,
        background: `linear-gradient(180deg, ${mxh(c, 0.10)} 0%, ${c} 40%, ${dkh(c, 0.30)} 100%)` }}>
        {Array.from({ length: 13 }, (_, i) => (
          <div key={i} style={{ position: "absolute", left: 0, right: 0, top: i * (hh / 13),
            height: hh / 13 - 4, background: i % 2 ? hexa("#000", 0.12) : hexa("#FFF", 0.05),
            borderBottom: `4px solid ${hexa("#000", 0.34)}` }} />
        ))}
      </div>
    </div>
    {/* the bottom rail of the door is the thing your eye tracks */}
    <div style={{ position: "absolute", left: x - 6, top: y + hh * (1 - open) - 16, width: ww + 12,
      height: 18, zIndex: z + 3, borderRadius: 4, background: dkh(c, 0.5),
      borderTop: `4px solid ${mxh(c, 0.24)}`, boxShadow: SH }} />
  </>
);

/* ---------------------------------------------------------------------------
   THE PLUGIN PLATES — S7. ⛔ IDENTITY COMES FROM SHAPE **AND** COLOUR. Reel 115
   put the same white tile on five plates and the five identical bright squares
   became the loudest thing in frame. These two are different proportions,
   different colours and different glyphs.
------------------------------------------------------------------------- */
export const PluginPlate: React.FC<{ f: number; at: number; x: number; y: number; kind: 0 | 1;
  t: string; sub: string; z?: number; s?: number }> =
  ({ f, at, x, y, kind, t, sub, z = 70, s = 1 }) => {
  const lf = f - at;
  if (lf < -1) return null;
  const inK = E(lf, 0, 8, 0, 1, BACK);
  const drop = E(lf, 0, 8, -240, 0, IO);
  const ring = lf > 8 ? Math.sin((lf - 8) * 0.5) * 2.6 * Math.exp(-(lf - 8) / 12) : 0;
  const w = (kind === 0 ? 230 : 300) * s, h = (kind === 0 ? 290 : 210) * s;
  const c = kind === 0 ? SKY : GOLD;
  return (
    <div style={{ position: "absolute", left: x - w / 2, top: y - h + drop, width: w, height: h,
      zIndex: z, transform: `scale(${inK}) rotate(${ring}deg)`, transformOrigin: "50% 100%",
      borderRadius: 10 * s, boxShadow: SH_D,
      background: `linear-gradient(165deg, ${mxh(c, 0.22)} 0%, ${c} 52%, ${dkh(c, 0.26)} 100%)`,
      border: `${5 * s}px solid ${dkh(c, 0.46)}` }}>
      <svg viewBox="0 0 100 100" width={w * 0.54} height={w * 0.54}
        style={{ position: "absolute", left: w * 0.23, top: h * 0.10 }}>
        {kind === 0
          /* UI UX PRO — a wireframe: a header bar, a sidebar, three blocks */
          ? <g fill={hexa("#0E2036", 0.72)}>
              <rect x="8" y="10" width="84" height="13" rx="4" />
              <rect x="8" y="30" width="24" height="60" rx="4" />
              <rect x="38" y="30" width="54" height="26" rx="4" />
              <rect x="38" y="62" width="24" height="28" rx="4" />
              <rect x="68" y="62" width="24" height="28" rx="4" />
            </g>
          /* TASTE — a swatch fan, four leaves off one pivot */
          : <g>
              {[-34, -12, 10, 32].map((a, i) => (
                <rect key={i} x="44" y="18" width="15" height="58" rx="6"
                  fill={[CLAY, OXBLOOD, GREEN, PLUM][i]} stroke={hexa("#2A1A10", 0.5)} strokeWidth="3"
                  transform={`rotate(${a} 50 84)`} />
              ))}
              <circle cx="50" cy="84" r="8" fill={hexa("#2A1A10", 0.8)} />
            </g>}
      </svg>
      <div style={{ position: "absolute", left: 0, right: 0, bottom: h * 0.15, textAlign: "center",
        ...ui(kind === 0 ? 34 * s : 42 * s, 900), color: "#17120C" }}>{t}</div>
      <div style={{ position: "absolute", left: 0, right: 0, bottom: h * 0.06, textAlign: "center",
        ...mono(13 * s, 800), letterSpacing: "0.12em", color: hexa("#17120C", 0.62) }}>{sub}</div>
    </div>
  );
};

/* ---------------------------------------------------------------------------
   ⭐⭐⭐ THE GENERIC PAGE — the villain. S8.
   ⛔⛔ IT IS GENUINELY HANDSOME. `feedback_villain_is_sameness_not_ugliness`:
      Lovable and Replit do not emit grey wireframes, they emit a perfectly
      attractive landing page. Drawing it ugly is a dead frame AND a false claim.
      The claim is that they are all THE SAME, so the picture is repetition.
------------------------------------------------------------------------- */
export const PressPage: React.FC<{ x: number; y: number; w: number; z?: number;
  variant?: number; o?: number; rot?: number; s?: number }> =
  ({ x, y, w: ww, z = 50, variant = 0, o = 1, rot = 0, s = 1 }) => {
  const hh = ww * 1.28;
  /* variant 0 = the generic. variants 1+ = what it looks like when it is YOURS. */
  const SETS = [
    { a: "#5B4CC4", b: "#8C6BE0", cta: "#F0793A", cards: ["#4FBFA8", "#E7B24C", "#E2708A"], round: 14, hero: 0.40 },
    { a: "#1F3A34", b: CLAY,      cta: "#F2E4C6", cards: [GOLD, BONE, EMBER],               round: 3,  hero: 0.26 },
    { a: "#F3ECDD", b: "#E4D6B6", cta: OXBLOOD,   cards: [PLUM, TEAL, MOSS],                round: 26, hero: 0.54 },
  ];
  const S = SETS[Math.min(variant, SETS.length - 1)];
  return (
    <div style={{ position: "absolute", left: x, top: y, width: ww, height: hh, zIndex: z, opacity: o,
      transform: `rotate(${rot}deg) scale(${s})`, transformOrigin: "50% 50%",
      borderRadius: 7, overflow: "hidden", background: variant === 2 ? S.a : "#FFFFFF",
      border: `3px solid ${hexa("#151018", 0.5)}`, boxShadow: SH }}>
      {/* hero */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: hh * S.hero,
        background: `linear-gradient(${variant === 1 ? 90 : 150}deg, ${S.a} 0%, ${S.b} 100%)` }}>
        <div style={{ position: "absolute", left: ww * 0.09, top: hh * 0.09, width: ww * 0.54,
          height: hh * 0.055, borderRadius: 4, background: hexa("#FFFFFF", 0.9) }} />
        <div style={{ position: "absolute", left: ww * 0.09, top: hh * 0.155, width: ww * 0.36,
          height: hh * 0.032, borderRadius: 3, background: hexa("#FFFFFF", 0.55) }} />
        <div style={{ position: "absolute", left: ww * 0.09, top: hh * 0.215, width: ww * 0.26,
          height: hh * 0.052, borderRadius: S.round, background: S.cta }} />
      </div>
      {/* three cards */}
      {S.cards.map((c, i) => (
        <div key={i} style={{ position: "absolute", left: ww * (0.07 + i * 0.30), top: hh * (S.hero + 0.08),
          width: ww * 0.26, height: hh * 0.30, borderRadius: S.round * 0.7,
          background: variant === 2 ? hexa("#FFFFFF", 0.7) : "#F4F2F7",
          border: `2px solid ${hexa("#151018", 0.12)}` }}>
          <div style={{ position: "absolute", left: "18%", top: "12%", width: "34%", height: "24%",
            borderRadius: variant === 1 ? 2 : "50%", background: c }} />
          <div style={{ position: "absolute", left: "12%", right: "12%", top: "50%", height: 5,
            borderRadius: 3, background: hexa("#151018", 0.28) }} />
          <div style={{ position: "absolute", left: "12%", right: "34%", top: "64%", height: 5,
            borderRadius: 3, background: hexa("#151018", 0.16) }} />
        </div>
      ))}
      {/* footer band */}
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: hh * 0.10,
        background: variant === 2 ? hexa("#151018", 0.16) : hexa(S.a, 0.14) }} />
    </div>
  );
};

/** the press itself: a head that descends, a bed, and two columns. */
export const Press: React.FC<{ f: number; x: number; y: number; w: number; z?: number;
  stroke: number; c?: string; tooled?: number }> =
  ({ f, x, y, w: ww, z = 54, stroke, c = "#59636E", tooled = 0 }) => {
  const headH = 116, travel = 128;
  return (<>
    {[x - ww / 2 - 26, x + ww / 2 - 12].map((cx, i) => (
      <div key={"cl" + i} style={{ position: "absolute", left: cx, top: y - 330, width: 38, height: 330,
        zIndex: z - 1, background: `linear-gradient(90deg, ${mxh(c, 0.18)} 0%, ${dkh(c, 0.30)} 100%)`,
        boxShadow: SH }} />
    ))}
    {/* the crown */}
    <div style={{ position: "absolute", left: x - ww / 2 - 40, top: y - 360, width: ww + 78, height: 46,
      zIndex: z, borderRadius: 5, background: dkh(c, 0.22), boxShadow: SH_D }} />
    {/* the ram */}
    <div style={{ position: "absolute", left: x - ww / 2 - 6, top: y - 300 + stroke * travel,
      width: ww + 12, height: headH, zIndex: z + 2, borderRadius: 5,
      background: `linear-gradient(180deg, ${mxh(c, 0.22)} 0%, ${c} 54%, ${dkh(c, 0.34)} 100%)`,
      boxShadow: SH_D }}>
      {/* the dies. They visibly CHANGE when the plugins are seated. */}
      <div style={{ position: "absolute", left: 16, right: 16, bottom: 10, height: 26, borderRadius: 3,
        background: tooled > 0.5 ? `linear-gradient(90deg, ${SKY} 0%, ${GOLD} 100%)` : dkh(c, 0.52) }} />
      {tooled > 0.05 && [0.22, 0.5, 0.78].map((p, i) => (
        <div key={i} style={{ position: "absolute", left: `${p * 100}%`, bottom: 8, width: 18, height: 30,
          marginLeft: -9, borderRadius: 3, background: [SKY, GOLD, SKY][i], opacity: tooled }} />
      ))}
    </div>
    {/* the bed */}
    <div style={{ position: "absolute", left: x - ww / 2 - 34, top: y, width: ww + 74, height: 40,
      zIndex: z + 1, borderRadius: 4, background: dkh(c, 0.40), boxShadow: SH }} />
  </>);
};

/* ---------------------------------------------------------------------------
   FINANCE — S10. Eight brass levers, then a variance board where the bars SNAP
   to their values. ⛔ A number MOVES to its value; it is never typeset at it.
------------------------------------------------------------------------- */
export const LeverBank: React.FC<{ f: number; x: number; y: number; n: number; at: number;
  per: number; z?: number; c?: string }> =
  ({ f, x, y, n, at, per, z = 58, c = BRASS }) => (
  <>
    <div style={{ position: "absolute", left: x - 18, top: y, width: n * 52 + 36, height: 46,
      zIndex: z - 1, borderRadius: 5, background: dkh("#4A4238", 0.18), boxShadow: SH }} />
    {Array.from({ length: n }, (_, i) => {
      const lf = f - (at + i * per);
      const seat = E(lf, 0, 8, 0, 1, OUT);
      const kick = lf > 8 ? Math.sin((lf - 8) * 0.7) * 5 * Math.exp(-(lf - 8) / 9) : 0;
      if (lf < -1) return null;
      return (
        <div key={"lv" + i} style={{ position: "absolute", left: x + i * 52, top: y - 118,
          width: 22, height: 122, zIndex: z, transformOrigin: "50% 100%",
          transform: `rotate(${(1 - seat) * -46 + kick}deg)`,
          background: `linear-gradient(90deg, ${mxh(c, 0.24)} 0%, ${dkh(c, 0.22)} 100%)`,
          borderRadius: 6, boxShadow: SH }}>
          <div style={{ position: "absolute", left: -8, top: -18, width: 38, height: 30, borderRadius: 8,
            background: `linear-gradient(160deg, ${mxh(c, 0.32)} 0%, ${dkh(c, 0.12)} 100%)` }} />
        </div>
      );
    })}
  </>
);

export const VarianceBoard: React.FC<{ f: number; x: number; y: number; w: number; h: number;
  at: number; per: number; z?: number; vals?: number[] }> =
  ({ f, x, y, w: ww, h: hh, at, per, z = 60, vals = [0.42, 0.78, 0.30, 0.92, 0.58, 0.70] }) => {
  const bw = ww / (vals.length * 1.55);
  return (<>
    <div style={{ position: "absolute", left: x, top: y, width: ww, height: hh, zIndex: z - 1,
      borderRadius: 6, background: "linear-gradient(180deg,#F5F0E1 0%,#E2DAC4 100%)",
      border: "5px solid #2E2A22", boxShadow: SH_D }} />
    {[0.25, 0.5, 0.75].map((p, i) => (
      <div key={"gl" + i} style={{ position: "absolute", left: x + 12, width: ww - 24, top: y + hh * p,
        height: 2, zIndex: z, background: hexa("#2E2A22", 0.16) }} />
    ))}
    {vals.map((v, i) => {
      const lf = f - (at + i * per);
      /* ⛔ a SNAP, not a ramp: a hard edge lands inside one audit sample */
      const k = E(lf, 0, 4, 0, 1, OUT);
      const over = lf >= 4 && lf < 12 ? Math.sin((lf - 4) * 0.8) * 0.05 * Math.exp(-(lf - 4) / 5) : 0;
      const bh = (hh - 34) * v * k * (1 + over);
      return (
        <div key={"bar" + i} style={{ position: "absolute", left: x + 20 + i * bw * 1.55, top: y + hh - 17 - bh,
          width: bw, height: Math.max(0, bh), zIndex: z + 1, borderRadius: "3px 3px 0 0",
          background: v > 0.66 ? GREEN : v > 0.4 ? GOLD : RED }} />
      );
    })}
  </>);
};

/** the needle dial — one value, huge, hitting its state */
export const Dial: React.FC<{ f: number; x: number; y: number; r: number; at: number;
  to: number; z?: number; c?: string }> =
  ({ f, x, y, r, at, to, z = 64, c = BRASS }) => {
  const lf = f - at;
  const k = E(lf, 0, 13, -0.82, to, IO);
  const ring = lf > 13 ? Math.sin((lf - 13) * 0.62) * 0.06 * Math.exp(-(lf - 13) / 11) : 0;
  const ang = (k + ring) * 78;
  return (
    <div style={{ position: "absolute", left: x - r, top: y - r, width: r * 2, height: r * 2, zIndex: z }}>
      <svg viewBox="0 0 200 200" width={r * 2} height={r * 2}>
        <circle cx="100" cy="100" r="94" fill="#F3ECDA" stroke={dkh(c, 0.34)} strokeWidth="10" />
        <path d="M28 132 A 82 82 0 0 1 172 132" fill="none" stroke={hexa(GREEN, 0.5)} strokeWidth="15" />
        <path d="M140 60 A 82 82 0 0 1 172 132" fill="none" stroke={hexa(RED, 0.72)} strokeWidth="15" />
        {Array.from({ length: 9 }, (_, i) => {
          const a = (-78 + i * 19.5) * Math.PI / 180;
          return <line key={i} x1={100 + Math.sin(a) * 66} y1={100 - Math.cos(a) * 66}
            x2={100 + Math.sin(a) * 78} y2={100 - Math.cos(a) * 78}
            stroke="#2E2A22" strokeWidth="5" />;
        })}
        <g transform={`rotate(${ang} 100 100)`}>
          <path d="M100 22 L107 104 L93 104 Z" fill={RED} />
        </g>
        <circle cx="100" cy="100" r="14" fill="#2E2A22" />
      </svg>
    </div>
  );
};

/* ---------------------------------------------------------------------------
   LEGAL — S12. Nine wax seals into a rail, then a contract that unrolls the
   full width under a stamping arm. A full-width travelling action.
------------------------------------------------------------------------- */
export const Seal: React.FC<{ x: number; y: number; s?: number; z?: number; c?: string;
  press?: number }> = ({ x, y, s = 1, z = 66, c = OXBLOOD, press = 0 }) => (
  <div style={{ position: "absolute", left: x - 30 * s, top: y - 30 * s, width: 60 * s, height: 60 * s,
    zIndex: z, transform: `scale(${1 + press * 0.14})` }}>
    <svg viewBox="0 0 60 60" width={60 * s} height={60 * s}>
      <path d="M30 3 L38 9 L48 8 L52 17 L58 24 L54 33 L57 43 L48 47 L43 56 L33 55 L30 60 L24 55 L14 56 L9 47 L1 43 L4 33 L0 24 L7 17 L11 8 L21 9 Z"
        fill={c} stroke={dkh(c, 0.36)} strokeWidth="2" />
      <circle cx="30" cy="30" r="15" fill="none" stroke={mxh(c, 0.34)} strokeWidth="3" />
      <path d="M22 30 L28 37 L39 23" fill="none" stroke={mxh(c, 0.5)} strokeWidth="4" strokeLinecap="round" />
    </svg>
  </div>
);

export const Contract: React.FC<{ f: number; x: number; y: number; w: number; h: number;
  open: number; z?: number; seals: number }> =
  ({ f, x, y, w: ww, h: hh, open, z = 58, seals }) => (
  <>
    <div style={{ position: "absolute", left: x, top: y, width: ww * open, height: hh, zIndex: z,
      overflow: "hidden", borderRadius: 4, boxShadow: SH_D,
      background: "linear-gradient(180deg,#F6EFDC 0%,#E6DCC0 100%)" }}>
      {Array.from({ length: 9 }, (_, i) => (
        <div key={"cl" + i} style={{ position: "absolute", left: 26 + (i % 3) * 20,
          top: 20 + i * (hh * 0.092), width: (0.16 + rnd(i, 5) * 0.52) * ww, height: hh * 0.038,
          borderRadius: 3, background: hexa("#4A4234", 0.55) }} />
      ))}
    </div>
    {/* the roll it comes off */}
    <div style={{ position: "absolute", left: x - 22, top: y - 10, width: 34, height: hh + 20,
      zIndex: z + 2, borderRadius: 17, background: `linear-gradient(90deg,#C7B893 0%,#9A8B68 100%)`,
      boxShadow: SH }} />
    {Array.from({ length: seals }, (_, i) => {
      const px = x + 74 + i * ((ww - 130) / 8);
      if (px > x + ww * open - 20) return null;
      return <Seal key={"sl" + i} x={px} y={y + hh * 0.68} s={0.78} z={z + 4} />;
    })}
  </>
);

/* ---------------------------------------------------------------------------
   S14 — THE HOPPER. Fifty tiles in, one blank slab out. The villain wins.
------------------------------------------------------------------------- */
export const Hopper: React.FC<{ f: number; x: number; y: number; w: number; z?: number;
  shake?: number; c?: string }> = ({ f, x, y, w: ww, z = 50, shake = 0, c = "#6B6E5C" }) => {
  const j = shake ? Math.sin(f * 2.3) * 3.4 * shake : 0;
  return (
    <div style={{ position: "absolute", left: x - ww / 2 + j, top: y - 250, width: ww, height: 250, zIndex: z }}>
      {/* the funnel */}
      <div style={{ position: "absolute", left: 0, top: 0, width: ww, height: 118,
        background: `linear-gradient(180deg, ${mxh(c, 0.16)} 0%, ${dkh(c, 0.22)} 100%)`,
        clipPath: "polygon(0 0, 100% 0, 68% 100%, 32% 100%)", boxShadow: SH_D }} />
      {/* the body */}
      <div style={{ position: "absolute", left: ww * 0.28, top: 112, width: ww * 0.44, height: 138,
        borderRadius: 6, background: `linear-gradient(90deg, ${mxh(c, 0.12)} 0%, ${dkh(c, 0.28)} 100%)`,
        border: `5px solid ${dkh(c, 0.44)}`, boxShadow: SH }}>
        <div style={{ position: "absolute", left: "18%", top: "20%", width: "64%", height: 16,
          borderRadius: 4, background: hexa("#0A0C08", 0.44) }} />
        <div style={{ position: "absolute", left: "26%", bottom: -8, width: "48%", height: 18,
          borderRadius: 4, background: dkh(c, 0.52) }} />
      </div>
    </div>
  );
};

/* ---------------------------------------------------------------------------
   S17 — THE CTA BOARD. `DEPARTMENT` struck in letter by letter, in its OWN
   column. ⛔ The ship gate passes a buried CTA happily; nothing crosses this.
------------------------------------------------------------------------- */
export const LetterBoard: React.FC<{ f: number; at: number; per: number; word: string;
  x: number; y: number; w: number; z?: number; c?: string }> =
  ({ f, at, per, word, x, y, w: ww, z = 84, c = BONE }) => {
  const n = word.length;
  const cw = (ww - (n - 1) * 6) / n;
  return (<>
    <div style={{ position: "absolute", left: x - 20, top: y - 20, width: ww + 40, height: cw * 1.42 + 40,
      zIndex: z - 2, borderRadius: 8, background: "linear-gradient(180deg,#241B14 0%,#140E0A 100%)",
      border: `6px solid ${dkh(CLAY, 0.42)}`, boxShadow: SH_D }} />
    {word.split("").map((ch, i) => {
      const lf = f - (at + i * per);
      if (lf < 0) return null;
      const k = E(lf, 0, 5, 0, 1, BACK);
      const kick = lf < 12 ? Math.sin(lf * 0.9) * 4 * Math.exp(-lf / 6) : 0;
      return (
        <div key={"lt" + i} style={{ position: "absolute", left: x + i * (cw + 6), top: y + kick,
          width: cw, height: cw * 1.42, zIndex: z, borderRadius: 4,
          transform: `scale(${k})`, transformOrigin: "50% 100%",
          background: `linear-gradient(180deg, ${mxh(CLAY, 0.16)} 0%, ${dkh(CLAY, 0.10)} 100%)`,
          display: "flex", alignItems: "center", justifyContent: "center",
          border: `3px solid ${dkh(CLAY, 0.42)}`, boxShadow: SH }}>
          <div style={{ ...ui(cw * 0.78, 900), color: "#241108" }}>{ch}</div>
        </div>
      );
    })}
  </>);
};

/** the comment chip that names the action */
export const CommentChip: React.FC<{ f: number; at: number; x: number; y: number; t: string;
  z?: number; s?: number }> = ({ f, at, x, y, t, z = 88, s = 1 }) => {
  const lf = f - at;
  if (lf < 0) return null;
  const k = E(lf, 0, 9, 0, 1, BACK);
  const bob = Math.sin(lf / 14) * 3.6;
  return (
    <div style={{ position: "absolute", left: x, top: y + bob, zIndex: z,
      transform: `scale(${k})`, transformOrigin: "0% 100%" }}>
      <div style={{ padding: `${13 * s}px ${28 * s}px`, borderRadius: 16 * s, background: "#F6F1E4",
        border: `${4 * s}px solid #241B14`, boxShadow: SH_D, ...ui(38 * s, 900), color: "#241B14",
        whiteSpace: "nowrap" }}>{t}</div>
      <div style={{ position: "absolute", left: 34 * s, bottom: -16 * s, width: 0, height: 0,
        borderLeft: `${18 * s}px solid transparent`, borderRight: `${6 * s}px solid transparent`,
        borderTop: `${18 * s}px solid #241B14` }} />
    </div>
  );
};

/* ---------------------------------------------------------------------------
   FURNITURE — the background processes each bay needs. §5: every shot needs one.
------------------------------------------------------------------------- */
/** the marketing press's flywheel + a poster ejecting */
export const Poster: React.FC<{ x: number; y: number; w: number; z?: number; k: number; c: string }> =
  ({ x, y, w: ww, z = 52, k, c }) => (
  <div style={{ position: "absolute", left: x, top: y - k * 34, width: ww, height: ww * 1.34, zIndex: z,
    opacity: Math.min(1, k * 2), borderRadius: 4, boxShadow: SH,
    background: `linear-gradient(170deg, ${mxh(c, 0.3)} 0%, ${c} 60%, ${dkh(c, 0.24)} 100%)`,
    transform: `rotate(${(1 - k) * -12}deg)`, transformOrigin: "50% 100%" }}>
    <div style={{ position: "absolute", left: "10%", top: "10%", width: "62%", height: "9%",
      borderRadius: 3, background: hexa("#1E1208", 0.66) }} />
    <div style={{ position: "absolute", left: "10%", top: "26%", width: "80%", height: "38%",
      borderRadius: 4, background: hexa("#FFF3DC", 0.82) }} />
    <div style={{ position: "absolute", left: "10%", bottom: "12%", width: "40%", height: "12%",
      borderRadius: 5, background: hexa("#1E1208", 0.8) }} />
  </div>
);

/** the legal wall of bound volumes — 14 drawn parts, not brown boxes */
export const Volumes: React.FC<{ x: number; y: number; w: number; h: number; n?: number;
  z?: number; seed?: number }> = ({ x, y, w: ww, h: hh, n = 11, z = 20, seed = 3 }) => (
  <>
    <div style={{ position: "absolute", left: x - 10, top: y - 10, width: ww + 20, height: hh + 20,
      zIndex: z - 1, borderRadius: 4, background: "#33201C", boxShadow: SH }} />
    {Array.from({ length: n }, (_, i) => {
      const bw = ww / n;
      const hgt = hh * (0.80 + rnd(i, seed) * 0.20);
      const c = [OXBLOOD, "#5C3B2E", "#7A5240", "#42302A", "#8E5A44"][i % 5];
      return (
        <div key={"vo" + i} style={{ position: "absolute", left: x + i * bw + 2, top: y + hh - hgt,
          width: bw - 5, height: hgt, zIndex: z,
          background: `linear-gradient(90deg, ${mxh(c, 0.18)} 0%, ${c} 34%, ${dkh(c, 0.28)} 100%)`,
          borderRadius: "2px 2px 0 0" }}>
          <div style={{ position: "absolute", left: 2, right: 2, top: hgt * 0.18, height: 5,
            background: hexa(BRASS, 0.72) }} />
          <div style={{ position: "absolute", left: 2, right: 2, top: hgt * 0.30, height: 3,
            background: hexa(BRASS, 0.44) }} />
          <div style={{ position: "absolute", left: 3, right: 3, top: hgt * 0.46, height: hgt * 0.20,
            background: hexa("#F0E4C6", 0.16) }} />
        </div>
      );
    })}
  </>
);
