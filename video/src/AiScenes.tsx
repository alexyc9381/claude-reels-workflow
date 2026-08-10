import React from "react";
import { useCurrentFrame, Img, staticFile } from "remotion";
import { inter } from "./fonts";
import { Panel, SectionHeader, Mascot, hexA } from "./SlopKit";
import { PAPER, PAPER2, INKD, RED, GO, GO_L, GO_D, AMB, AMB_L, AMB_D, SH, SH_S, mix } from "./CancelWorld";
import { E, rnd, OUT, IO, BACK } from "./MissionWorld";
import { Coin, Sheet, ballistic, G } from "./AiHooks5";

/* =========================================================================
   REEL 89 "AI" — the body, 4.86s to 38.74s.

   The hook throws him off a board and buries him in the tokens every forgotten
   chat costs. The body has to get him out of that pit and into a memory that
   keeps things, so it stays the SAME physical world: solid animation paints, a
   clay Claude that has weight, and one ballistic solver shared with the hook —
   nothing here is hand-keyed to look like physics, it runs the same maths.

   Twelve rooms, no two alike, because a themed set held for 30 seconds reads
   as one long scene no matter what happens inside it.

   ⛔ ONE CLAIM IS NOT VERIFIED. The VO at 21.33 says NotebookLM gives you "free
   infographics, cinematic videos, and deep research". notebooklm.google serves
   a JS shell, so none of the three could be confirmed from here, and I asked
   twice without an answer. S8 therefore draws THREE UNNAMED OUTPUTS and puts NO
   product-feature name on screen. If Alex confirms them they can be labelled in
   one edit; until then the picture asserts nothing the research does not.
   ========================================================================= */

const W = 1012, H = 792;

/* ------------------------------------------------------------- variants ----
   A trial variant that only changes the hook measures ~2 on the panel crop for
   30 of its 34 seconds, which is noise. The rooms carry the most area in the
   reel, so the variant tints the WALLS AND FLOORS and leaves every prop, every
   product colour and the clay mascot untouched — the difference is the light in
   the room, not a filter over the picture. */
export const VarCtx = React.createContext("A");

/* ⛔ Mixing a room toward a tint colour DARKENS it — the cool blues dragged
   four rooms under the 140 luma bar, and chasing that by lifting each base
   colour would have left the untinted cut washed out. So the tint preserves
   LUMINANCE: it shifts hue and chroma, then rescales back to the original's
   brightness. A tint, not a darken. */
const hx = (c: string) => [1, 3, 5].map((i) => parseInt(c.slice(i, i + 2), 16));
const lum = ([r, g, b]: number[]) => 0.299 * r + 0.587 * g + 0.114 * b;
const tintKeepLuma = (c: string, tc: string, a: number) => {
  if (a <= 0) return c;
  const A = hx(c), B = hx(tc);
  const m = A.map((v, i) => v * (1 - a) + B[i] * a);
  const k = lum(A) / Math.max(1, lum(m));
  const out = m.map((v) => Math.max(0, Math.min(255, Math.round(v * k))));
  return "#" + out.map((v) => v.toString(16).padStart(2, "0")).join("");
};
const TINT: Record<string, [string, number]> = {
  A: ["#000000", 0],        // as shipped
  B: ["#5A8FC0", 0.42],     // cold dawn
  C: ["#C87E68", 0.40],     // dusk
  D: ["#3E7FB8", 0.44],     // deep ocean
  E: ["#3E9AA4", 0.42],     // teal
  F: ["#3A5480", 0.46],     // night
};
const NBLM = "logos/notebooklm.svg";
const CLAUDE = "claude_logo.png";

/* ⛔ Panel's `pushIn` zoom is an out-quad over frames 12-150: nearly all of the
   travel happens in the first second and then it flattens, so anything longer
   than ~3s goes dead in its back half no matter what the props do. A slow
   continuous drift on top of it keeps every scene alive without a cut. */
const Drift: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const f = useCurrentFrame();
  /* ⛔ THE SINE RETURNS TO WHERE IT STARTED. Measured on the shipped cut: every
        scene spiked 37-43 on its cut then sat at 8-14, and the trough at 17.6s
        is exactly where the eye leaves. An oscillation is not an arc — this now
        starts WIDER than the old mean and travels continuously in one direction
        for the whole scene, which moves every edge on every frame. Reel 90 took
        its median 7.12 -> 8.65 on this change alone.
        The cap keeps long scenes (S3 is 153 frames) from cropping their edges. */
  const k = Math.min(f, 112);
  return (
    <div style={{ position: "absolute", inset: 0,
      transform: `scale(${1.010 + k * 0.00044 + Math.sin(f / 44) * 0.007}) `
               + `translate(${Math.sin(f / 31) * 6 - k * 0.26}px, ${Math.cos(f / 37) * 4 - k * 0.085}px)`,
      transformOrigin: "50% 54%" }}>{children}</div>
  );
};

/** every scene is a framed panel over the house chassis */
const scene = (glow: string, body: React.ReactNode) => (
  <Panel glow={hexA(glow, 0.3)} pushIn><Drift>{body}</Drift></Panel>
);

/** a hard whip across the frame — a deliberate pattern interrupt mid-reel */
export const Whip: React.FC<{ at: number; children: React.ReactNode }> = ({ at, children }) => {
  const f = useCurrentFrame();
  const k = f - at;
  const on = k >= 0 && k < 9;
  const u = on ? k / 9 : 0;
  return (
    <div style={{ position: "absolute", inset: 0,
      transform: on ? `translateX(${Math.sin(u * Math.PI) * -190}px) skewX(${Math.sin(u * Math.PI) * -7}deg)` : undefined }}>
      {children}
    </div>
  );
};

const Head: React.FC<{ f: number; l1: string; l2: string }> = ({ f, l1, l2 }) => {
  const longest = Math.max(l1.length, l2.length);
  const size = Math.round(Math.max(34, Math.min(50, (50 * 20) / longest)));
  return (
    <SectionHeader f={f} size={size} badgeBg="#FFFFFF" badgeBorder="#EDE7DB"
      badge={<Img src={staticFile(CLAUDE)} style={{ width: 60, height: 60, objectFit: "contain" }} />}
      l1={<span>{l1}</span>} l2={<span style={{ color: "#C4603C" }}>{l2}</span>} />
  );
};

/* ------------------------------------------------------------------ rooms --
   Each is a place, not a backdrop: a floor line, something structural, and its
   own light. The palettes are 25+ luma apart so consecutive scenes cannot read
   as the same room redressed.
   ------------------------------------------------------------------------- */
const Room: React.FC<{ wall: string; floor: string; horizon?: number;
  children?: React.ReactNode }> = ({ wall, floor, horizon = 560, children }) => {
  const [tc, ta] = TINT[React.useContext(VarCtx)] ?? TINT.A;
  const w = tintKeepLuma(wall, tc, ta);
  const fl = tintKeepLuma(floor, tc, ta);
  return (<>
    <div style={{ position: "absolute", inset: 0, background: w, zIndex: 1 }} />
    <div style={{ position: "absolute", left: 0, top: horizon, width: W, height: H - horizon,
      background: fl, zIndex: 2 }} />
    <div style={{ position: "absolute", left: 0, top: horizon, width: W, height: 11,
      background: mix(fl, "#000000", 0.28), zIndex: 3 }} />
    {children}
  </>);
};

/** the far plane and the frame-edge occluders follow the room's light too */
const useTint = () => {
  const [tc, ta] = TINT[React.useContext(VarCtx)] ?? TINT.A;
  return (c: string) => tintKeepLuma(c, tc, ta);
};

/** the notebook unit — the object the whole second half is about */
const Nb: React.FC<{ x: number; y: number; s?: number; rows?: number; t?: number;
  z?: number; open?: number }> = ({ x, y, s = 1, rows = 0, t = 1, z = 26, open = 0 }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z,
    transform: `scale(${Math.max(0.02, t)})`, transformOrigin: "50% 90%" }}>
    <div style={{ width: 306 * s, height: 336 * s, borderRadius: 26 * s, background: "#241D16",
      boxShadow: SH, padding: 20 * s, display: "flex", flexDirection: "column",
      alignItems: "center", gap: 12 * s }}>
      <Img src={staticFile(NBLM)} style={{ width: 122 * s, height: 122 * s,
        objectFit: "contain", filter: "invert(1)", flexShrink: 0 }} />
      <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 9 * s }}>
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} style={{ height: 22 * s, borderRadius: 5 * s,
            width: `${[100, 84, 92, 70, 88][i]}%`, background: i < rows ? GO_L : "#3B3128" }} />
        ))}
      </div>
    </div>
    {open > 0 && (
      <div style={{ position: "absolute", left: -10 * s, top: 6 * s, width: 300 * s,
        height: 324 * s, borderRadius: 24 * s, background: "#3A2F24", boxShadow: SH,
        transformOrigin: "0% 50%", transform: `perspective(900px) rotateY(${-open * 118}deg)` }} />
    )}
  </div>
);

/** a stack of context, as a physical thing he has to carry */
const Stack: React.FC<{ x: number; y: number; n?: number; s?: number; z?: number;
  rot?: number }> = ({ x, y, n = 6, s = 1, z = 26, rot = 0 }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z,
    transform: `rotate(${rot}deg)`, transformOrigin: "50% 100%" }}>
    {Array.from({ length: n }, (_, i) => (
      <div key={i} style={{ position: "absolute", left: (i % 2) * 8 * s, top: -i * 22 * s,
        width: 172 * s, height: 27 * s, borderRadius: 5 * s,
        background: i % 2 ? PAPER : PAPER2, boxShadow: SH_S,
        transform: `rotate(${(rnd(i, 3) - 0.5) * 4}deg)` }} />
    ))}
  </div>
);

const Cl: React.FC<{ f: number; x: number; y: number; size?: number; z?: number;
  gaze?: number; shock?: number; cheer?: number; stern?: number; rot?: number;
  sq?: number }> = ({ f, x, y, size = 210, z = 30, gaze = 0, shock = 0, cheer = 0,
                      stern = 0, rot = 0, sq = 0 }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z,
    transform: `rotate(${rot}deg) scale(${1 + sq * 0.24}, ${1 - sq * 0.28})`,
    transformOrigin: "50% 97%",
    filter: `drop-shadow(0 ${Math.round(size * 0.05)}px ${Math.round(size * 0.07)}px rgba(6,9,14,0.5))` }}>
    <Mascot lf={f} size={size} gaze={gaze} shock={shock} cheer={cheer} stern={stern}
            nodAmp={shock > 0.3 ? 0 : 2.6} nodSpeed={10} />
  </div>
);
const FEET = 184 / 200;                      // his legs end at 0.92 of the box


/* ------------------------------------------------------------------- deco --
   Alex: "each of the scenes are way too little detail, needs way more detail."
   Fair — every room was a wall, a floor line and the one prop the beat needed,
   which is a diagram, not a place. This is the kit that dresses them: structure
   (beams, pipes, plates), texture (bolts, grate, tiles, scuffs) and FOREGROUND
   occluders, which are the cheapest depth there is — something cropped by the
   frame edge in front of the action reads as a camera standing inside a room
   rather than pointed at a backdrop.
   ------------------------------------------------------------------------- */
const Bolts: React.FC<{ x: number; y: number; n: number; gap: number; d?: number;
  c?: string; z?: number; vert?: boolean }> =
  ({ x, y, n, gap, d = 13, c = "#000000", z = 5, vert = false }) => (<>
  {Array.from({ length: n }, (_, i) => (
    <div key={i} style={{ position: "absolute", left: x + (vert ? 0 : i * gap),
      top: y + (vert ? i * gap : 0), width: d, height: d, borderRadius: 999,
      background: c, opacity: 0.24, zIndex: z }} />
  ))}
</>);

/** an I-beam, with flanges — structure reads as a place, a plain bar does not */
const Beam: React.FC<{ x: number; y: number; w: number; h: number; c: string;
  z?: number; vert?: boolean }> = ({ x, y, w, h, c, z = 5, vert = false }) => (<>
  <div style={{ position: "absolute", left: x, top: y, width: w, height: h,
    background: c, zIndex: z }} />
  <div style={{ position: "absolute", left: x, top: y, width: vert ? 11 : w,
    height: vert ? h : 11, background: mix(c, "#FFFFFF", 0.22), zIndex: z }} />
  <div style={{ position: "absolute", left: vert ? x + w - 11 : x,
    top: vert ? y : y + h - 13, width: vert ? 11 : w, height: vert ? h : 13,
    background: mix(c, "#000000", 0.34), zIndex: z }} />
  <Bolts x={x + (vert ? 24 : 16)} y={y + (vert ? 20 : 22)}
    n={Math.max(2, Math.floor((vert ? h : w) / 74))} gap={74} vert={vert} z={z + 1} />
</>);

const Pipe: React.FC<{ x: number; y: number; len: number; th?: number; c: string;
  z?: number; vert?: boolean }> = ({ x, y, len, th = 34, c, z = 5, vert = false }) => (<>
  <div style={{ position: "absolute", left: x, top: y, width: vert ? th : len,
    height: vert ? len : th, borderRadius: th / 2, background: c, zIndex: z }} />
  <div style={{ position: "absolute", left: x + (vert ? 5 : 0), top: y + (vert ? 0 : 5),
    width: vert ? th * 0.3 : len, height: vert ? len : th * 0.3,
    borderRadius: 99, background: mix(c, "#FFFFFF", 0.24), zIndex: z + 1 }} />
  {Array.from({ length: Math.max(2, Math.floor(len / 150)) }, (_, i) => (
    <div key={i} style={{ position: "absolute",
      left: x + (vert ? -7 : 44 + i * 150), top: y + (vert ? 44 + i * 150 : -7),
      width: vert ? th + 14 : 20, height: vert ? 20 : th + 14, borderRadius: 4,
      background: mix(c, "#000000", 0.3), zIndex: z + 1 }} />
  ))}
</>);

const Grate: React.FC<{ x: number; y: number; w: number; h: number; c: string;
  z?: number; gap?: number }> = ({ x, y, w, h, c, z = 5, gap = 22 }) => (<>
  <div style={{ position: "absolute", left: x, top: y, width: w, height: h,
    background: mix(c, "#000000", 0.2), zIndex: z }} />
  {Array.from({ length: Math.floor(w / gap) }, (_, i) => (
    <div key={i} style={{ position: "absolute", left: x + 5 + i * gap, top: y + 5,
      width: gap - 10, height: h - 10, background: mix(c, "#000000", 0.5), zIndex: z + 1 }} />
  ))}
</>);

const Hazard: React.FC<{ x: number; y: number; w: number; h?: number; z?: number;
  a?: string; b?: string }> = ({ x, y, w, h = 26, z = 6, a = AMB, b = "#2E2822" }) => (
  <div style={{ position: "absolute", left: x, top: y, width: w, height: h, zIndex: z,
    overflow: "hidden", background: b }}>
    {Array.from({ length: Math.ceil(w / 30) + 2 }, (_, i) => (
      <div key={i} style={{ position: "absolute", left: i * 30 - 24, top: -6, width: 15,
        height: h + 12, background: a, transform: "skewX(-26deg)" }} />
    ))}
  </div>
);

const Crates: React.FC<{ x: number; y: number; n?: number; s?: number; c: string;
  z?: number }> = ({ x, y, n = 3, s = 1, c, z = 8 }) => (<>
  {Array.from({ length: n }, (_, i) => {
    const w = (120 - (i % 2) * 18) * s, h = 96 * s;
    return (
      <div key={i} style={{ position: "absolute", left: x + (i % 2) * 22 * s,
        top: y - (i + 1) * h + i * 4, width: w, height: h, background: c, zIndex: z }}>
        <div style={{ position: "absolute", inset: 0, borderTop: `${5 * s}px solid ${mix(c, "#FFFFFF", 0.2)}`,
          borderBottom: `${6 * s}px solid ${mix(c, "#000000", 0.34)}` }} />
        <div style={{ position: "absolute", left: 0, top: h / 2 - 4 * s, width: w,
          height: 8 * s, background: mix(c, "#000000", 0.22) }} />
        <div style={{ position: "absolute", left: w / 2 - 4 * s, top: 0, width: 8 * s,
          height: h, background: mix(c, "#000000", 0.16) }} />
      </div>
    );
  })}
</>);

const Vent: React.FC<{ x: number; y: number; w: number; h: number; c: string; z?: number }> =
  ({ x, y, w, h, c, z = 5 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: w, height: h, zIndex: z,
    background: mix(c, "#000000", 0.16), padding: 9 }}>
    {Array.from({ length: Math.floor((h - 18) / 17) }, (_, i) => (
      <div key={i} style={{ position: "absolute", left: 9, top: 9 + i * 17, width: w - 18,
        height: 10, background: mix(c, "#000000", 0.42) }} />
    ))}
  </div>
);

const Plate: React.FC<{ x: number; y: number; w: number; h: number; c: string;
  z?: number; lit?: string }> = ({ x, y, w, h, c, z = 5, lit }) => (
  <div style={{ position: "absolute", left: x, top: y, width: w, height: h, zIndex: z,
    background: c, borderTop: `4px solid ${mix(c, "#FFFFFF", 0.22)}`,
    borderBottom: `5px solid ${mix(c, "#000000", 0.3)}` }}>
    {[[8, 8], [w - 22, 8], [8, h - 22], [w - 22, h - 22]].map(([bx, by], i) => (
      <div key={i} style={{ position: "absolute", left: bx, top: by, width: 12, height: 12,
        borderRadius: 999, background: mix(c, "#000000", 0.4) }} />
    ))}
    {lit && <div style={{ position: "absolute", left: 26, top: h / 2 - 9, width: 18,
      height: 18, borderRadius: 999, background: lit }} />}
  </div>
);

/** cables drooping across the top of frame — reads as ceiling without drawing one */
const Cables: React.FC<{ n?: number; c: string; z?: number; top?: number }> =
  ({ n = 3, c, z = 7, top = -14 }) => (
  <svg viewBox={`0 0 ${W} 300`} width={W} height={300}
    style={{ position: "absolute", left: 0, top, zIndex: z }}>
    {Array.from({ length: n }, (_, i) => (
      <path key={i} d={`M-20,${20 + i * 22} Q${W / 2},${104 + i * 42} ${W + 20},${14 + i * 26}`}
        stroke={i % 2 ? mix(c, "#000000", 0.2) : c} strokeWidth={9 - i} fill="none" />
    ))}
  </svg>
);

/** scuffs and seams on the floor, so it is a surface and not a colour */
const Floorwear: React.FC<{ y: number; c: string; z?: number; n?: number }> =
  ({ y, c, z = 4, n = 7 }) => (<>
  {Array.from({ length: n }, (_, i) => (
    <div key={i} style={{ position: "absolute", left: -40 + rnd(i, 3) * 1060,
      top: y + 26 + rnd(i, 7) * (H - y - 60), width: 90 + rnd(i, 13) * 150, height: 7,
      borderRadius: 4, background: mix(c, "#000000", 0.13), zIndex: z }} />
  ))}
  {Array.from({ length: 4 }, (_, i) => (
    <div key={`s${i}`} style={{ position: "absolute", left: -30 + i * 280, top: y,
      width: 6, height: H - y, background: mix(c, "#000000", 0.09), zIndex: z }} />
  ))}
</>);

/** the frame-edge occluder — the single biggest depth win per line of code */
const Fore: React.FC<{ side?: "l" | "r" | "b"; c: string; z?: number }> =
  ({ side = "l", c, z = 46 }) => (
  side === "b"
    ? <div style={{ position: "absolute", left: 0, bottom: -6, width: W, height: 62,
        background: c, zIndex: z, boxShadow: "0 -14px 22px rgba(6,9,14,0.4)" }} />
    : <div style={{ position: "absolute", [side === "l" ? "left" : "right"]: -18, top: -20,
        width: 108, height: H + 40, background: c, zIndex: z,
        boxShadow: `${side === "l" ? "16px" : "-16px"} 0 26px rgba(6,9,14,0.4)` }} />
);


/* ==================================================================== deco 2 ==
   PASS 2/3. The first dressing pass gave every room structure and texture and
   it still came back "way way way more detailed". Fair: structure alone is a
   set, not a lived-in place. What was missing is OBJECT DENSITY — the things
   that would actually be lying around — plus WEAR and LIGHT.

     · architecture   far wall, windows with a view, doorways, ceiling
     · objects        toolboxes, ladders, trolleys, drums, cones, clipboards
     · wear + light   stains, chips, cast shadows, floor pools, light shafts
     · life           fans that turn, lamps that blink, steam, drips

   Everything stays solid animation paint with a dark trim line. No washes.
   ========================================================================== */

/** the far plane: a wall that recedes, with seams and a dado */
const FarWall: React.FC<{ c: string; y: number; z?: number; seams?: number }> =
  ({ c: c0, y, z = 3, seams = 7 }) => { const c = useTint()(c0); return (<>
  <div style={{ position: "absolute", left: 0, top: 0, width: W, height: y,
    background: mix(c, "#FFFFFF", 0.06), zIndex: z }} />
  {Array.from({ length: seams }, (_, i) => (
    <div key={i} style={{ position: "absolute", left: (i * W) / seams, top: 0, width: 5,
      height: y, background: mix(c, "#000000", 0.13), zIndex: z }} />
  ))}
  <div style={{ position: "absolute", left: 0, top: y - 46, width: W, height: 14,
    background: mix(c, "#000000", 0.2), zIndex: z }} />
  <div style={{ position: "absolute", left: 0, top: y - 32, width: W, height: 32,
    background: mix(c, "#000000", 0.1), zIndex: z }} />
</>); };

/** a window with mullions and something outside it */
const Window: React.FC<{ x: number; y: number; w: number; h: number; frame: string;
  sky?: string; z?: number }> = ({ x, y, w, h, frame, sky = "#A8C0CE", z = 6 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: w, height: h, zIndex: z,
    background: frame, padding: 11 }}>
    <div style={{ position: "absolute", inset: 11, background: sky }} />
    <div style={{ position: "absolute", left: 11, bottom: 11, width: w - 22, height: h * 0.22,
      background: mix(sky, "#000000", 0.24) }} />
    {[0.5].map((u) => (
      <div key={u} style={{ position: "absolute", left: x_(w, u), top: 11, width: 9,
        height: h - 22, background: frame }} />
    ))}
    <div style={{ position: "absolute", left: 11, top: h / 2 - 5, width: w - 22, height: 9,
      background: frame }} />
    <div style={{ position: "absolute", left: -8, top: h - 6, width: w + 16, height: 15,
      background: mix(frame, "#000000", 0.24) }} />
  </div>
);
const x_ = (w: number, u: number) => Math.round(w * u) - 4;

/** conduit with junction boxes — the cheapest "this building has services" cue */
const Conduit: React.FC<{ x: number; y: number; len: number; c: string; z?: number;
  vert?: boolean; boxes?: number }> = ({ x, y, len, c, z = 5, vert = false, boxes = 2 }) => (<>
  <div style={{ position: "absolute", left: x, top: y, width: vert ? 13 : len,
    height: vert ? len : 13, background: c, zIndex: z }} />
  {Array.from({ length: boxes }, (_, i) => (
    <div key={i} style={{ position: "absolute",
      left: x + (vert ? -12 : 70 + i * (len / boxes)), top: y + (vert ? 70 + i * (len / boxes) : -12),
      width: 38, height: 38, borderRadius: 4, background: mix(c, "#000000", 0.22), zIndex: z + 1 }} />
  ))}
  {Array.from({ length: Math.floor(len / 96) }, (_, i) => (
    <div key={`c${i}`} style={{ position: "absolute",
      left: x + (vert ? -4 : 40 + i * 96), top: y + (vert ? 40 + i * 96 : -4),
      width: vert ? 21 : 11, height: vert ? 11 : 21, background: mix(c, "#000000", 0.3),
      zIndex: z + 1 }} />
  ))}
</>);

/** a shelving rack with mixed contents */
const Rack: React.FC<{ x: number; y: number; w: number; h: number; c: string; z?: number;
  rows?: number }> = ({ x, y, w, h, c, z = 7, rows = 3 }) => (<>
  <div style={{ position: "absolute", left: x, top: y, width: 15, height: h, background: c, zIndex: z }} />
  <div style={{ position: "absolute", left: x + w - 15, top: y, width: 15, height: h, background: c, zIndex: z }} />
  {Array.from({ length: rows }, (_, r) => (
    <React.Fragment key={r}>
      <div style={{ position: "absolute", left: x, top: y + ((r + 1) * h) / rows - 13, width: w,
        height: 13, background: mix(c, "#000000", 0.24), zIndex: z + 1 }} />
      {Array.from({ length: 4 }, (_, i) => {
        const bh = 34 + ((r + i) % 3) * 20;
        return <div key={i} style={{ position: "absolute", left: x + 22 + i * ((w - 52) / 4),
          top: y + ((r + 1) * h) / rows - 13 - bh, width: (w - 60) / 4, height: bh,
          background: [PAPER2, AMB_L, mix(c, "#FFFFFF", 0.3), PAPER][(r + i) % 4], zIndex: z + 1 }} />;
      })}
    </React.Fragment>
  ))}
</>);

const Ladder: React.FC<{ x: number; y: number; h: number; c: string; z?: number }> =
  ({ x, y, h, c, z = 8 }) => (<>
  <div style={{ position: "absolute", left: x, top: y, width: 14, height: h, background: c, zIndex: z }} />
  <div style={{ position: "absolute", left: x + 58, top: y, width: 14, height: h, background: c, zIndex: z }} />
  {Array.from({ length: Math.floor(h / 56) }, (_, i) => (
    <div key={i} style={{ position: "absolute", left: x, top: y + 26 + i * 56, width: 72, height: 11,
      background: mix(c, "#000000", 0.24), zIndex: z }} />
  ))}
</>);

const Drum: React.FC<{ x: number; y: number; s?: number; c: string; z?: number }> =
  ({ x, y, s = 1, c, z = 8 }) => (
  <div style={{ position: "absolute", left: x, top: y - 128 * s, width: 92 * s, height: 128 * s,
    zIndex: z, background: c, borderRadius: `${10 * s}px ${10 * s}px 0 0` }}>
    <div style={{ position: "absolute", left: 0, top: 0, width: 92 * s, height: 12 * s,
      background: mix(c, "#FFFFFF", 0.24) }} />
    {[0.3, 0.62].map((u, i) => (
      <div key={i} style={{ position: "absolute", left: 0, top: 128 * s * u, width: 92 * s,
        height: 13 * s, background: mix(c, "#000000", 0.28) }} />
    ))}
  </div>
);

const Toolbox: React.FC<{ x: number; y: number; s?: number; c: string; z?: number }> =
  ({ x, y, s = 1, c, z = 9 }) => (
  <div style={{ position: "absolute", left: x, top: y - 74 * s, width: 132 * s, height: 74 * s, zIndex: z }}>
    <div style={{ position: "absolute", inset: 0, background: c, borderRadius: 5 * s }} />
    <div style={{ position: "absolute", left: 0, top: 26 * s, width: 132 * s, height: 9 * s,
      background: mix(c, "#000000", 0.3) }} />
    <div style={{ position: "absolute", left: 44 * s, top: -16 * s, width: 44 * s, height: 18 * s,
      border: `${6 * s}px solid ${mix(c, "#000000", 0.34)}`, borderBottom: "none",
      borderRadius: `${10 * s}px ${10 * s}px 0 0` }} />
  </div>
);

const Cone: React.FC<{ x: number; y: number; s?: number; z?: number }> = ({ x, y, s = 1, z = 9 }) => (
  <svg viewBox="0 0 80 100" width={80 * s} height={100 * s}
    style={{ position: "absolute", left: x, top: y - 100 * s, zIndex: z }}>
    <rect x={4} y={88} width={72} height={12} fill="#B4522E" />
    <polygon points="40,4 62,88 18,88" fill="#D2662E" />
    <rect x={26} y={44} width={28} height={13} fill="#F0E6D2" transform="skewX(-3)" />
  </svg>
);

const Trolley: React.FC<{ x: number; y: number; s?: number; c: string; z?: number }> =
  ({ x, y, s = 1, c, z = 9 }) => (<>
  <div style={{ position: "absolute", left: x, top: y - 96 * s, width: 190 * s, height: 20 * s,
    background: c, zIndex: z }} />
  <div style={{ position: "absolute", left: x + 8 * s, top: y - 76 * s, width: 16 * s,
    height: 60 * s, background: mix(c, "#000000", 0.2), zIndex: z }} />
  <div style={{ position: "absolute", left: x + 166 * s, top: y - 76 * s, width: 16 * s,
    height: 60 * s, background: mix(c, "#000000", 0.2), zIndex: z }} />
  {[14, 150].map((u, i) => (
    <div key={i} style={{ position: "absolute", left: x + u * s, top: y - 22 * s, width: 30 * s,
      height: 30 * s, borderRadius: 999, background: "#3E3A34", zIndex: z }} />
  ))}
</>);

/** a fan that actually turns */
const Fan: React.FC<{ f: number; x: number; y: number; s?: number; c: string; z?: number }> =
  ({ f, x, y, s = 1, c, z = 6 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: 118 * s, height: 118 * s, zIndex: z }}>
    <div style={{ position: "absolute", inset: 0, borderRadius: 999,
      background: mix(c, "#000000", 0.24) }} />
    <div style={{ position: "absolute", inset: 8 * s, borderRadius: 999,
      background: mix(c, "#000000", 0.44) }} />
    <div style={{ position: "absolute", inset: 8 * s, transform: `rotate(${f * 13}deg)` }}>
      {[0, 60, 120].map((a) => (
        <div key={a} style={{ position: "absolute", left: "50%", top: "50%", width: 102 * s,
          height: 20 * s, marginLeft: -51 * s, marginTop: -10 * s, borderRadius: 999,
          background: mix(c, "#FFFFFF", 0.2), transform: `rotate(${a}deg)` }} />
      ))}
    </div>
    <div style={{ position: "absolute", left: "50%", top: "50%", width: 24 * s, height: 24 * s,
      marginLeft: -12 * s, marginTop: -12 * s, borderRadius: 999, background: mix(c, "#000000", 0.5) }} />
  </div>
);

/** a solid pool of floor light — matte, never a gradient wash */
const Pool: React.FC<{ x: number; y: number; w: number; h?: number; c: string; z?: number }> =
  ({ x, y, w, h = 46, c, z = 4 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: w, height: h, borderRadius: 999,
    background: c, zIndex: z }} />
);

/** a contact shadow — the thing that stops props looking pasted on */
const Cast: React.FC<{ x: number; y: number; w: number; z?: number }> = ({ x, y, w, z = 8 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: w, height: 15, borderRadius: 999,
    background: "rgba(20,16,10,0.24)", zIndex: z }} />
);

/** wear: chips out of the paint and stains on the floor */
const Wear: React.FC<{ y: number; c: string; z?: number; n?: number; seed?: number }> =
  ({ y, c, z = 4, n = 10, seed = 5 }) => (<>
  {Array.from({ length: n }, (_, i) => (
    <div key={i} style={{ position: "absolute", left: -30 + rnd(i, seed) * 1060,
      top: y + 20 + rnd(i, seed + 3) * (H - y - 50),
      width: 26 + rnd(i, seed + 7) * 62, height: 12 + rnd(i, seed + 11) * 16,
      borderRadius: 999, background: mix(c, "#000000", 0.11), zIndex: z }} />
  ))}
  {Array.from({ length: Math.floor(n / 2) }, (_, i) => (
    <div key={`ch${i}`} style={{ position: "absolute", left: rnd(i, seed + 13) * 1000,
      top: y - 40 - rnd(i, seed + 17) * 300, width: 14 + rnd(i, seed + 19) * 22,
      height: 10 + rnd(i, seed + 23) * 14, background: mix(c, "#000000", 0.16), zIndex: z,
      transform: `rotate(${rnd(i, seed + 29) * 90}deg)` }} />
  ))}
</>);

/** steam / dust puffs that keep moving */
const Puffs: React.FC<{ f: number; x: number; y: number; n?: number; c: string; z?: number;
  rise?: number }> = ({ f, x, y, n = 5, c, z = 10, rise = 150 }) => (<>
  {Array.from({ length: n }, (_, i) => {
    const q = ((f + i * 17) % 70) / 70, s = 0.4 + q * 1.1;
    return <div key={i} style={{ position: "absolute", left: x + Math.sin(q * 4 + i) * 26,
      top: y - q * rise, width: 46 * s, height: 40 * s, borderRadius: 999, background: c,
      opacity: (1 - q) * 0.55, zIndex: z }} />;
  })}
</>);

/** a clipboard / notice hanging on a wall */
const Notice: React.FC<{ x: number; y: number; s?: number; c?: string; z?: number }> =
  ({ x, y, s = 1, c = PAPER, z = 7 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: 78 * s, height: 104 * s, zIndex: z,
    background: c, boxShadow: SH_S }}>
    <div style={{ position: "absolute", left: 20 * s, top: -8 * s, width: 38 * s, height: 16 * s,
      borderRadius: 4, background: "#6E6558" }} />
    {[0, 1, 2, 3].map((i) => (
      <div key={i} style={{ position: "absolute", left: 12 * s, top: (24 + i * 18) * s,
        width: (54 - (i % 2) * 18) * s, height: 7 * s, background: mix(c, "#000000", 0.26) }} />
    ))}
  </div>
);



/* ==================================================================== deco 3 ==
   PASS 3/3. Passes 1 and 2 put everything in the BACK plane, so the rooms were
   detailed and still flat — a busy wall behind an empty middle. This pass is
   about the two planes that were missing:

     FOREGROUND  real objects cropped by the frame edge, not a coloured strip.
                 A railing, a pipe run, a counter edge with things on it. This is
                 what makes the camera feel like it is standing IN the room.
     MIDGROUND   things hanging in the space between the wall and the floor —
                 chains, a suspended lamp, a jib arm, hazard bunting.
   ========================================================================== */

/** a railing across the bottom of frame, in front of everything */
const Railing: React.FC<{ y: number; c: string; z?: number; posts?: number }> =
  ({ y, c, z = 45, posts = 6 }) => (<>
  <div style={{ position: "absolute", left: -20, top: y, width: W + 40, height: 20,
    borderRadius: 10, background: c, zIndex: z, boxShadow: "0 10px 18px rgba(6,9,14,0.34)" }} />
  <div style={{ position: "absolute", left: -20, top: y + 62, width: W + 40, height: 13,
    borderRadius: 8, background: mix(c, "#000000", 0.14), zIndex: z }} />
  {Array.from({ length: posts }, (_, i) => (
    <div key={i} style={{ position: "absolute", left: -10 + i * ((W + 20) / (posts - 1)), top: y,
      width: 24, height: 190, background: mix(c, "#000000", 0.1), zIndex: z }} />
  ))}
</>);

/** a big pipe run crossing the frame in front of the action */
const PipeFore: React.FC<{ y: number; c: string; z?: number; th?: number }> =
  ({ y, c, z = 45, th = 62 }) => (<>
  <div style={{ position: "absolute", left: -30, top: y, width: W + 60, height: th,
    borderRadius: th / 2, background: c, zIndex: z, boxShadow: "0 14px 22px rgba(6,9,14,0.36)" }} />
  <div style={{ position: "absolute", left: -30, top: y + 9, width: W + 60, height: th * 0.22,
    borderRadius: 99, background: mix(c, "#FFFFFF", 0.2), zIndex: z + 1 }} />
  {[120, 470, 830].map((x, i) => (
    <div key={i} style={{ position: "absolute", left: x, top: y - 11, width: 30, height: th + 22,
      borderRadius: 5, background: mix(c, "#000000", 0.26), zIndex: z + 1 }} />
  ))}
</>);

/** a counter/bench edge cropped by the bottom, with things standing on it */
const CounterFore: React.FC<{ y: number; c: string; z?: number; items?: string[] }> =
  ({ y, c, z = 45, items = [PAPER, AMB, PAPER2] }) => (<>
  {items.map((ic, i) => (
    <div key={i} style={{ position: "absolute", left: 64 + i * 320, top: y - 74,
      width: 96 + (i % 2) * 34, height: 80, borderRadius: 8, background: ic, zIndex: z,
      boxShadow: SH_S }} />
  ))}
  <div style={{ position: "absolute", left: -20, top: y, width: W + 40, height: 30,
    background: mix(c, "#FFFFFF", 0.18), zIndex: z + 1 }} />
  <div style={{ position: "absolute", left: -20, top: y + 26, width: W + 40, height: H - y,
    background: c, zIndex: z + 1, boxShadow: "0 -12px 20px rgba(6,9,14,0.3)" }} />
  {[70, 400, 740].map((x, i) => (
    <div key={`p${i}`} style={{ position: "absolute", left: x, top: y + 56, width: 44,
      height: H - y, background: mix(c, "#000000", 0.16), zIndex: z + 2 }} />
  ))}
</>);

/** a rack upright cropped by one side, with shelf stubs coming toward camera */
const RackFore: React.FC<{ side?: "l" | "r"; c: string; z?: number }> =
  ({ side = "l", c, z = 45 }) => (
  <div style={{ position: "absolute", [side === "l" ? "left" : "right"]: -14, top: -20,
    width: 132, height: H + 40, zIndex: z }}>
    <div style={{ position: "absolute", left: side === "l" ? 40 : 12, top: 0, width: 60,
      height: H + 40, background: c,
      boxShadow: `${side === "l" ? "18px" : "-18px"} 0 28px rgba(6,9,14,0.4)` }} />
    {[0, 1, 2, 3].map((i) => (
      <React.Fragment key={i}>
        <div style={{ position: "absolute", left: 0, top: 90 + i * 190, width: 132, height: 22,
          background: mix(c, "#000000", 0.22) }} />
        <div style={{ position: "absolute", left: side === "l" ? 4 : 26, top: 32 + i * 190,
          width: 84, height: 58, background: [PAPER2, AMB_L, PAPER, AMB][i % 4] }} />
      </React.Fragment>
    ))}
  </div>
);

/** chains hanging into frame from above */
const Chains: React.FC<{ n?: number; c: string; z?: number; xs?: number[] }> =
  ({ n = 3, c, z = 44, xs = [140, 520, 880] }) => (<>
  {xs.slice(0, n).map((x, i) => (
    <React.Fragment key={i}>
      <div style={{ position: "absolute", left: x, top: -20, width: 13,
        height: 150 + i * 62, background: c, zIndex: z }} />
      {Array.from({ length: 6 + i }, (_, k) => (
        <div key={k} style={{ position: "absolute", left: x - 5, top: 6 + k * 24, width: 23,
          height: 13, borderRadius: 6, background: mix(c, "#000000", 0.24), zIndex: z }} />
      ))}
      <div style={{ position: "absolute", left: x - 22, top: 148 + i * 62, width: 57, height: 40,
        borderRadius: 7, background: mix(c, "#000000", 0.12), zIndex: z }} />
    </React.Fragment>
  ))}
</>);

/** a jib arm / suspended lamp reaching into the middle of the room */
const Jib: React.FC<{ x: number; y: number; len: number; c: string; z?: number;
  head?: string }> = ({ x, y, len, c, z = 12, head = AMB }) => (<>
  <div style={{ position: "absolute", left: x, top: y, width: 22, height: 120,
    background: c, zIndex: z }} />
  <div style={{ position: "absolute", left: x, top: y + 98, width: len, height: 20,
    background: c, zIndex: z }} />
  <div style={{ position: "absolute", left: x + len - 30, top: y + 118, width: 13, height: 54,
    background: mix(c, "#000000", 0.22), zIndex: z }} />
  <svg viewBox="0 0 120 70" width={120} height={70}
    style={{ position: "absolute", left: x + len - 84, top: y + 168, zIndex: z }}>
    <polygon points="0,66 120,66 92,0 28,0" fill={mix(c, "#000000", 0.16)} />
    <rect x={22} y={58} width={76} height={12} fill={head} />
  </svg>
</>);

/** hazard bunting strung across the space */
const Bunting: React.FC<{ y: number; z?: number; n?: number }> = ({ y, z = 13, n = 12 }) => (
  <svg viewBox={`0 0 ${W} 200`} width={W} height={200}
    style={{ position: "absolute", left: 0, top: y, zIndex: z }}>
    <path d={`M-20,10 Q${W / 2},96 ${W + 20},4`} stroke="#6E6558" strokeWidth={6} fill="none" />
    {Array.from({ length: n }, (_, i) => {
      const u = (i + 0.5) / n, px = -20 + u * (W + 40);
      const py = 10 + 86 * (4 * u * (1 - u)) - u * 6;
      return <polygon key={i} points={`${px - 15},${py} ${px + 15},${py} ${px},${py + 40}`}
        fill={i % 2 ? AMB : "#3A342C"} />;
    })}
  </svg>
);

/* --------------------------------------------------- the dense pass, per room --
   15-25 elements each, in three layers: far plane, midground objects, then wear
   and light. Everything sits at z 3-13, under the scene's own props (18+) and
   well under the hero (30), so density never competes with the beat.
   ---------------------------------------------------------------------------- */

const DecoS2: React.FC<{ f: number }> = ({ f }) => (<>
  <FarWall c="#A89A83" y={470} seams={8} />
  <Window x={74} y={72} w={162} h={126} frame="#8E8070" sky="#9CB2BE" />
  <Window x={790} y={72} w={162} h={126} frame="#8E8070" sky="#9CB2BE" />
  <Conduit x={0} y={244} len={1012} c="#8A7C6C" boxes={3} />
  <Conduit x={286} y={252} len={216} c="#8A7C6C" vert boxes={1} />
  <Fan f={f} x={470} y={92} s={0.9} c="#948674" />
  <Ladder x={880} y={252} h={216} c="#8A7C6C" />
  <Notice x={272} y={300} s={0.9} />
  <Notice x={696} y={286} s={0.8} c={PAPER2} />
  <Drum x={64} y={468} s={0.8} c="#8A7A62" z={8} />
  <Cone x={186} y={468} s={0.6} />
  <Cone x={846} y={468} s={0.55} />
  <Pool x={60} y={430} w={230} h={34} c="#B4A68E" />
  <Pool x={730} y={430} w={230} h={34} c="#B4A68E" />
  <Wear y={300} c="#A89A83" n={9} seed={7} />
  <Cast x={62} y={462} w={96} />
  <Puffs f={f} x={196} y={462} n={4} c="#BCB0A0" rise={120} z={10} />
</>);

const DecoS3: React.FC<{ f: number }> = ({ f }) => (<>
  <FarWall c="#B4C0B8" y={548} seams={9} />
  <Window x={330} y={92} w={200} h={150} frame="#9AA69E" sky="#A6C0CE" />
  <Window x={560} y={92} w={200} h={150} frame="#9AA69E" sky="#A6C0CE" />
  <Conduit x={0} y={276} len={1012} c="#9AA69E" boxes={3} />
  <Conduit x={880} y={284} len={230} c="#9AA69E" vert boxes={1} />
  <Fan f={f} x={64} y={112} s={0.86} c="#A2AEA6" />
  <Rack x={64} y={330} w={216} h={218} c="#8E9A92" rows={3} />
  <Ladder x={914} y={330} h={218} c="#8E9A92" />
  <Notice x={300} y={300} s={0.9} />
  <Notice x={620} y={306} s={0.8} c={PAPER2} />
  <Trolley x={296} y={700} s={0.86} c="#8A968E" />
  <Drum x={606} y={716} s={0.78} c="#7E8A82" />
  <Cone x={720} y={720} s={0.6} />
  <Pool x={330} y={598} w={430} h={40} c="#A6B4AB" />
  <Wear y={548} c="#93A099" n={11} seed={11} />
  <Cast x={300} y={694} w={168} />
  <Cast x={604} y={710} w={86} />
</>);

const DecoS4: React.FC<{ f: number }> = ({ f }) => (<>
  <FarWall c="#C2B29A" y={600} seams={8} />
  <Window x={286} y={352} w={190} h={148} frame="#A08E76" sky="#A8C0CE" />
  <Conduit x={0} y={276} len={1012} c="#A2907A" boxes={3} />
  <Conduit x={946} y={284} len={260} c="#A2907A" vert boxes={1} />
  <Fan f={f} x={840} y={352} s={0.72} c="#AC9A82" />
  <Rack x={0} y={396} w={200} h={202} c="#9E8C74" rows={2} />
  <Notice x={520} y={296} s={0.9} />
  <Notice x={596} y={302} s={0.8} c={PAPER2} />
  <Toolbox x={214} y={704} s={0.9} c="#8A7A62" />
  <Drum x={700} y={730} s={0.72} c="#96866E" />
  <Trolley x={430} y={742} s={0.72} c="#9A8A72" />
  <Cone x={378} y={744} s={0.5} />
  <Pool x={186} y={614} w={430} h={42} c="#C6B69C" />
  <Wear y={600} c="#A69580" n={11} seed={17} />
  <Cast x={212} y={698} w={122} />
  <Cast x={698} y={724} w={70} />
  <Puffs f={f} x={296} y={600} n={4} c="#C8BCA6" rise={130} z={11} />
</>);

const DecoS5: React.FC<{ f: number }> = ({ f }) => (<>
  <FarWall c="#93A3B1" y={618} seams={9} />
  <Conduit x={0} y={92} len={1012} c="#8496A4" boxes={4} />
  <Conduit x={92} y={100} len={520} c="#8496A4" vert boxes={2} />
  <Conduit x={906} y={100} len={520} c="#8496A4" vert boxes={2} />
  <Fan f={f} x={26} y={110} s={0.7} c="#8CA0AE" />
  <Fan f={f} x={866} y={110} s={0.7} c="#8CA0AE" />
  <Ladder x={-8} y={300} h={318} c="#7E90A0" />
  <Notice x={140} y={264} s={0.86} />
  <Drum x={158} y={640} s={0.7} c="#7A8C9A" />
  <Cone x={806} y={646} s={0.55} />
  <Trolley x={620} y={664} s={0.7} c="#7E90A0" />
  <Pool x={252} y={632} w={500} h={40} c="#A2B2C0" />
  <Wear y={618} c="#7F8F9D" n={10} seed={23} />
  <Cast x={156} y={634} w={68} />
  <Cast x={618} y={658} w={136} />
</>);

const DecoS6: React.FC<{ f: number }> = ({ f }) => (<>
  <FarWall c="#C2C8B0" y={604} seams={8} />
  {[0, 1, 2, 3].map((i) => (
    <Window key={i} x={44 + i * 236} y={112} w={150} h={116} frame="#9EA48C" sky="#AEC4D0" />
  ))}
  <Conduit x={0} y={252} len={1012} c="#9EA48C" boxes={4} />
  <Fan f={f} x={452} y={62} s={0.62} c="#A6AC94" />
  {[0, 1, 2, 3].map((i) => <Notice key={`n${i}`} x={92 + i * 236} y={264} s={0.66} />)}
  <Trolley x={790} y={702} s={0.72} c="#98A08A" />
  <Cone x={40} y={708} s={0.52} />
  <Drum x={912} y={714} s={0.64} c="#96A088" />
  {[0, 1, 2, 3].map((i) => (
    <Pool key={`p${i}`} x={38 + i * 236} y={616} w={196} h={34} c="#BEC4AC" />
  ))}
  <Wear y={604} c="#8E947C" n={10} seed={29} />
  <Cast x={786} y={696} w={144} />
</>);

const DecoS7: React.FC<{ f: number }> = ({ f }) => (<>
  <FarWall c="#98A6B4" y={624} seams={9} />
  <Window x={64} y={106} w={172} h={132} frame="#8A98A6" sky="#A6C0CE" />
  <Conduit x={0} y={266} len={1012} c="#8A98A6" boxes={3} />
  <Conduit x={456} y={274} len={190} c="#8A98A6" vert boxes={1} />
  <Fan f={f} x={880} y={286} s={0.66} c="#A2B0BE" />
  <Ladder x={734} y={350} h={274} c="#8494A2" />
  <Notice x={276} y={286} s={0.82} />
  <Drum x={94} y={718} s={0.74} c="#8494A2" />
  <Drum x={196} y={726} s={0.66} c="#7E8E9C" />
  <Cone x={318} y={730} s={0.55} />
  <Toolbox x={560} y={734} s={0.72} c="#7E8E9C" />
  <Pool x={40} y={648} w={330} h={38} c="#A8B6C4" />
  <Wear y={624} c="#7E8C9A" n={10} seed={31} />
  <Cast x={92} y={712} w={72} />
  <Puffs f={f} x={352} y={278} n={5} c="#C0CCD6" rise={140} z={11} />
</>);

const DecoS8: React.FC<{ f: number }> = ({ f }) => (<>
  <FarWall c="#B6AC97" y={596} seams={8} />
  <Window x={636} y={92} w={180} h={140} frame="#A69C87" sky="#A8C0CE" />
  <Conduit x={0} y={258} len={620} c="#A69C87" boxes={2} />
  <Fan f={f} x={848} y={318} s={0.62} c="#ACA28D" />
  <Rack x={330} y={330} w={220} h={210} c="#A0967F" rows={3} />
  <Notice x={588} y={286} s={0.82} />
  <Notice x={866} y={430} s={0.72} c={PAPER2} />
  <Trolley x={648} y={706} s={0.78} c="#A0967F" />
  <Drum x={866} y={712} s={0.68} c="#9A9078" />
  <Cone x={274} y={714} s={0.5} />
  <Pool x={560} y={608} w={400} h={40} c="#C6BCA6" />
  <Wear y={596} c="#968C77" n={10} seed={37} />
  <Cast x={644} y={700} w={152} />
</>);

const DecoS9: React.FC<{ f: number }> = ({ f }) => (<>
  <FarWall c="#B0A08C" y={604} seams={9} />
  <Window x={806} y={112} w={168} h={128} frame="#A0907C" sky="#A8C0CE" />
  <Conduit x={0} y={252} len={1012} c="#A0907C" boxes={3} />
  <Fan f={f} x={40} y={112} s={0.7} c="#A89880" />
  <Ladder x={946} y={300} h={304} c="#96866E" />
  <Notice x={222} y={276} s={0.8} />
  <Notice x={742} y={282} s={0.72} c={PAPER2} />
  <Toolbox x={40} y={730} s={0.82} c="#8A7A62" />
  <Drum x={182} y={738} s={0.66} c="#96866E" />
  <Cone x={906} y={744} s={0.52} />
  <Pool x={210} y={618} w={500} h={40} c="#C0B098" />
  <Wear y={604} c="#94826E" n={12} seed={41} />
  <Cast x={38} y={724} w={120} />
  <Puffs f={f} x={470} y={604} n={5} c="#C6B8A2" rise={150} z={12} />
</>);

const DecoS10: React.FC<{ f: number }> = ({ f }) => (<>
  <FarWall c="#A6BAB0" y={640} seams={8} />
  <Window x={330} y={92} w={186} h={142} frame="#96AAA0" sky="#A8C4CE" />
  <Conduit x={0} y={262} len={1012} c="#96AAA0" boxes={3} />
  <Fan f={f} x={556} y={102} s={0.66} c="#9EB2A8" />
  <Rack x={62} y={352} w={214} h={200} c="#8EA298" rows={2} />
  <Notice x={300} y={292} s={0.8} />
  <Trolley x={396} y={744} s={0.78} c="#8EA298" />
  <Drum x={634} y={752} s={0.66} c="#86988E" />
  <Cone x={300} y={754} s={0.5} />
  <Pool x={330} y={652} w={430} h={40} c="#B6CAC0" />
  <Wear y={640} c="#8CA098" n={10} seed={43} />
  <Cast x={392} y={738} w={152} />
</>);

const DecoS11: React.FC<{ f: number }> = ({ f }) => (<>
  <FarWall c="#94A2AE" y={630} seams={9} />
  <Conduit x={0} y={92} len={1012} c="#84929E" boxes={4} />
  <Fan f={f} x={30} y={122} s={0.62} c="#8A98A4" />
  <Notice x={44} y={270} s={0.78} />
  <Notice x={44} y={392} s={0.7} c={PAPER2} />
  <Trolley x={296} y={720} s={0.74} c="#7E8C98" />
  <Drum x={846} y={726} s={0.62} c="#7A8894" />
  <Cone x={640} y={730} s={0.5} />
  {[0, 1, 2].map((i) => (
    <Pool key={i} x={280 + i * 240} y={644} w={200} h={34} c="#A6B4C0" />
  ))}
  <Wear y={630} c="#7E8C9A" n={10} seed={47} />
  <Cast x={292} y={714} w={144} />
</>);

const DecoS12: React.FC<{ f: number }> = ({ f }) => (<>
  {/* a deeper skyline: three planes, then roof furniture in front */}
  {[[-60, 430, 190], [180, 404, 150], [356, 424, 176], [560, 396, 160], [740, 428, 200], [930, 408, 170]]
    .map(([bx, by, bw], i) => (
    <div key={`f${i}`} style={{ position: "absolute", left: bx, top: by, width: bw,
      height: 596 - (by as number), background: "#93ABBA", zIndex: 3 }} />
  ))}
  <Conduit x={0} y={520} len={1012} c="#7E8B78" boxes={3} />
  {/* aerials on the near roofline */}
  {[[140, 300], [430, 268], [700, 288], [900, 262]].map(([ax, ay], i) => (
    <div key={`a${i}`} style={{ position: "absolute", left: ax, top: ay, width: 7,
      height: 596 - (ay as number) - 130, background: "#6E8494", zIndex: 5 }}>
      {[0, 1, 2].map((k) => (
        <div key={k} style={{ position: "absolute", left: -16, top: 14 + k * 20, width: 40,
          height: 5, background: "#6E8494" }} />
      ))}
    </div>
  ))}
  {/* a water tank and a roof vent */}
  <div style={{ position: "absolute", left: 764, top: 400, width: 146, height: 108,
    borderRadius: 10, background: "#7E96A4", zIndex: 6 }} />
  {[0, 1, 2].map((i) => (
    <div key={`lg${i}`} style={{ position: "absolute", left: 776 + i * 60, top: 508, width: 14,
      height: 58, background: "#6E8494", zIndex: 6 }} />
  ))}
  <Vent x={96} y={452} w={110} h={112} c="#88A0AE" z={6} />
  <Fan f={f} x={276} y={452} s={0.62} c="#88A0AE" />
  <Drum x={606} y={596} s={0.66} c="#74836E" />
  <Cone x={190} y={600} s={0.52} />
  <Wear y={596} c="#7E8B78" n={10} seed={53} />
  <Cast x={604} y={590} w={68} />
</>);

const DecoS13: React.FC<{ f: number }> = ({ f }) => (<>
  <FarWall c="#B6AC97" y={612} seams={8} />
  <Window x={396} y={96} w={220} h={150} frame="#A69C87" sky="#A8C0CE" />
  <Conduit x={0} y={272} len={1012} c="#A69C87" boxes={3} />
  <Fan f={f} x={286} y={110} s={0.6} c="#ACA28D" />
  <Rack x={-14} y={368} w={190} h={196} c="#A0967F" rows={2} />
  <Rack x={836} y={368} w={190} h={196} c="#A0967F" rows={2} />
  <Notice x={232} y={300} s={0.78} />
  <Notice x={718} y={306} s={0.7} c={PAPER2} />
  <Trolley x={196} y={732} s={0.7} c="#A0967F" />
  <Drum x={796} y={740} s={0.62} c="#9A9078" />
  <Pool x={330} y={624} w={360} h={38} c="#C6BCA6" />
  <Wear y={612} c="#948A75" n={10} seed={59} />
  <Cast x={192} y={726} w={134} />
</>);

/* ####################################################### S2 · OUT OF THE PIT
   4.86-5.83 · "here's the problem". He comes up out of the tokens the hook
   buried him in, and the coins come with him.
   ######################################################################### */
export const S2Surface: React.FC = () => {
  const f = useCurrentFrame();
  const SURF = 470;
  const up = E(f, 2, 20, 0, 250, OUT);
  return (<>
    <Head f={f} l1="EVERY NEW CHAT" l2="STARTS AT ZERO" />
    {scene(AMB, (<>
      <Room wall="#A89A83" floor={mix(AMB_D, "#000000", 0.16)} horizon={SURF} />
      <DecoS2 f={f} />
      {/* a concrete money pit: beams, a lip, a grate, and cable runs overhead */}
      <Beam x={-10} y={-20} w={78} h={SURF + 40} c="#8E8070" vert z={5} />
      <Beam x={944} y={-20} w={78} h={SURF + 40} c="#8E8070" vert z={5} />
      <Plate x={120} y={96} w={228} h={126} c="#9A8C7A" z={5} lit={AMB} />
      <Vent x={640} y={104} w={190} h={122} c="#9A8C7A" z={5} />
      <Grate x={392} y={252} w={230} h={122} c="#948674" z={5} gap={26} />
      <Bolts x={132} y={SURF - 44} n={12} gap={66} c="#000000" z={6} />
      <Hazard x={-20} y={SURF - 32} w={1052} h={26} z={6} />
      <Cables n={3} c="#7E7160" z={7} />
      <Chains n={3} c="#8A7C6C" xs={[92, 470, 908]} />
      <Railing y={694} c="#8E8070" posts={6} />
      <Cl f={f} x={396} y={SURF - 210 * FEET - up} size={210} gaze={1} shock={0.7} z={30} />
      {Array.from({ length: 90 }, (_, i) => {
        const d = 58 + rnd(i, 19) * 70;
        return <Coin key={i} d={d} x={-50 + rnd(i, 3) * 1100} y={SURF - 30 + rnd(i, 7) * 300}
          flat={rnd(i, 23)} rot={rnd(i, 11) * 90} z={20 + (i % 3)} dark={rnd(i, 29) > 0.72} />;
      })}
      {/* what he throws off as he surfaces — the same solver as the hook */}
      {Array.from({ length: 22 }, (_, i) => {
        const a = -Math.PI * (0.1 + 0.8 * rnd(i, 5));
        const sp = 20 * (0.5 + rnd(i, 9) * 0.8), d = 52 + rnd(i, 17) * 52;
        const fl = SURF + 10 + rnd(i, 21) * 130;
        return <Coin key={`s${i}`} d={d} x={470 + Math.cos(a) * sp * f * 0.9 - d / 2}
          y={ballistic(f, SURF - 20, Math.sin(a) * sp, G, fl, 0.34) - d / 2}
          rot={f * 9} flat={0.16} z={34} />;
      })}
    </>))}
  </>);
};

/* ################################################### S3 · THE RESET RAMP
   5.83-11.01 · "every new chat starts from zero, you burn tokens reloading the
   same context". He hauls the context up the slope; the gate at the top stamps
   NEW and puts him back at the bottom. Three laps, each one costing coins.
   ######################################################################### */
export const S3Reset: React.FC<{ alt?: boolean }> = ({ alt = false }) => {
  const f = useCurrentFrame();
  const LAP = alt ? 38 : 46;
  const lap = Math.floor(f / LAP), u = (f % LAP) / LAP;
  const climb = Math.min(1, u / 0.74);            // up the ramp
  const back = u > 0.74 ? (u - 0.74) / 0.26 : 0;  // and thrown back down
  const px = 108 + climb * 560 - back * back * 560;
  const py = 636 - climb * 300 + back * back * 300;
  return (<>
    <Head f={f} l1="YOU RE-SEND" l2="THE SAME CONTEXT" />
    {scene(RED, (<>
      <Room wall={alt ? "#C2B4A4" : "#B4C0B8"} floor={alt ? "#A2948A" : "#93A099"} horizon={548} />
      <DecoS3 f={f} />
      {/* a works hall: gantry over the ramp, racking, vents, hazard edging */}
      <Beam x={-20} y={64} w={1052} h={40} c="#9AA69E" z={4} />
      <Beam x={-20} y={-20} w={62} h={600} c="#9AA69E" vert z={4} />
      <Beam x={968} y={-20} w={62} h={600} c="#9AA69E" vert z={4} />
      <Vent x={92} y={158} w={168} h={128} c="#A6B2AA" z={4} />
      <Plate x={300} y={150} w={196} h={104} c="#A0ACA4" z={4} lit={GO_L} />
      <Pipe x={-20} y={318} len={340} th={30} c="#A2AEA6" z={4} />
      <Crates x={796} y={548} n={3} s={0.86} c="#8C9890" z={7} />
      <Floorwear y={548} c="#93A099" z={4} />
      <Cables n={2} c="#8A968E" z={6} top={30} />
      <RackFore side="l" c="#8A968E" />
      <Bunting y={172} n={13} />
      {/* the slope, built as a stepped ramp so the climb has purchase */}
      <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} shapeRendering="crispEdges"
        style={{ position: "absolute", left: 0, top: 0, zIndex: 8 }}>
        <polygon points={`70,700 700,388 700,700`} fill="#7E8A83" />
        <polygon points={`70,700 700,388 700,414 96,716`} fill="#A2AEA6" />
        {Array.from({ length: 13 }, (_, i) => (
          <rect key={i} x={92 + i * 47} y={686 - i * 23} width={30} height={9} fill="#6C7871" />
        ))}
        <rect x={700} y={300} width={168} height={400} fill="#78847B" />
        <rect x={700} y={300} width={168} height={16} fill="#94A097" />
      </svg>
      {/* the gate at the top that resets him */}
      <div style={{ position: "absolute", left: 704, top: 322, width: 160, height: 128,
        borderRadius: 12, background: back > 0 ? RED : "#5C6862", boxShadow: SH, zIndex: 22,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 40, color: "#F4EFE4" }}>NEW</div>
      <Stack x={px + 150} y={py - 8} n={6} s={1.06} z={27} rot={back > 0 ? back * 46 : -8} />
      <Cl f={f} x={px} y={py - 232 * FEET} size={232} gaze={2} stern={0.5}
          rot={back > 0 ? back * 40 : -12} z={30} />
      {/* the meter emptying a little further every lap */}
      <div style={{ position: "absolute", left: 768, top: 92, width: 146, height: 212,
        borderRadius: 12, background: "#2C2620", boxShadow: SH, overflow: "hidden", zIndex: 28 }}>
        <div style={{ position: "absolute", left: 0, bottom: 0, width: "100%",
          height: `${Math.max(0, 100 - (lap * 26 + u * 26))}%`, background: AMB }} />
      </div>
      {/* the coins it costs, falling out of the meter each lap */}
      {Array.from({ length: 12 }, (_, i) => {
        const t2 = (f - lap * LAP - 30 + i * 2) % LAP;
        if (t2 < 0) return null;
        const d = 72 + rnd(i, 13) * 48;
        return <Coin key={i} d={d} x={824 + rnd(i, 3) * 90 - d / 2}
          y={ballistic(t2, 300, -6 - rnd(i, 7) * 6, G, 700 + rnd(i, 11) * 60, 0.3) - d / 2}
          rot={t2 * 11} flat={0.3} z={29} />;
      })}
    </>))}
  </>);
};

/* ######################################################### S4 · THE CABLE
   11.01-15.40 · "but when you connect Claude to NotebookLM". A bench, a heavy
   cable that swings under its own weight, and a unit that comes alive.
   ######################################################################### */
export const S4Cable: React.FC = () => {
  const f = useCurrentFrame();
  const reach = E(f, 3, 40, 0, 1, OUT);
  const seated = f > 27;
  const swing = seated ? 0 : Math.sin(f / 5) * (1 - reach) * 26;
  const rows = seated ? Math.min(5, Math.floor((f - 29) / 7)) : 0;
  const lamp = Math.sin(f / 17) * 4.5;   // it hangs, so it swings the whole scene
  const x0 = 292, x1 = 616, y0 = 452;
  return (<>
    <Head f={f} l1="WIRE CLAUDE INTO" l2="NOTEBOOKLM" />
    {scene(GO, (<>
      <Room wall="#C2B29A" floor="#A69580" horizon={600} />
      <DecoS4 f={f} />
      {/* a workshop: pegboard, shelving, pipe runs, a parts bin under the bench */}
      <div style={{ position: "absolute", left: 604, top: 96, width: 380, height: 236,
        background: "#B49E80", zIndex: 4 }} />
      {Array.from({ length: 40 }, (_, i) => (
        <div key={`pg${i}`} style={{ position: "absolute", left: 624 + (i % 8) * 46,
          top: 116 + Math.floor(i / 8) * 44, width: 11, height: 11, borderRadius: 999,
          background: "#8A7860", zIndex: 5 }} />
      ))}
      {/* ⛔ 5.71 — the whole room only swung a lamp. Parts now ride the jib rail
             across the bench for the whole scene: large, high-contrast, moving. */}
      {Array.from({ length: 7 }, (_, i) => {
        const tx = ((i * 148 - f * 3.8) % 1036) - 120;
        const th2 = [96, 74, 108, 62, 88, 118, 70][i];
        return (
          <React.Fragment key={`tl${i}`}>
            <div style={{ position: "absolute", left: tx + 56, top: 96, width: 8,
              height: 42, background: "#6E6152", zIndex: 6 }} />
            <div style={{ position: "absolute", left: tx + 24, top: 138, width: 72,
              height: th2, borderRadius: 8, background: i % 2 ? "#7E6F5C" : "#5E5346",
              zIndex: 6 }} />
          </React.Fragment>
        );
      })}
      <Pipe x={-20} y={132} len={560} th={30} c="#A2907A" z={4} />
      <Pipe x={-20} y={196} len={420} th={22} c="#96856F" z={4} />
      <Plate x={60} y={252} w={172} h={106} c="#AC9A82" z={4} lit={GO_L} />
      <Crates x={860} y={600} n={2} s={0.8} c="#8E7C66" z={7} />
      <Floorwear y={600} c="#9A8974" z={4} />
      <CounterFore y={716} c="#8A7A62" items={[PAPER, AMB, PAPER2]} />
      <Jib x={886} y={188} len={-186} c="#9E8C74" />
      {/* a bench with a lamp over it */}
      <div style={{ position: "absolute", left: 0, top: 592, width: W, height: 34,
        background: "#B4A088", zIndex: 9 }} />
      <div style={{ position: "absolute", left: 356, top: -10, width: 30, height: 118,
        background: "#6E5F50", zIndex: 8, transform: `rotate(${lamp}deg)`,
        transformOrigin: "50% 0%" }} />
      {/* the pool of light it throws, moving with it */}
      <div style={{ position: "absolute", left: 176 + lamp * 13, top: 560, width: 420, height: 44,
        borderRadius: 999, background: "#C0AA80", zIndex: 9 }} />
      <svg viewBox="0 0 260 120" width={260} height={120}
        style={{ position: "absolute", left: 242, top: 96, zIndex: 8,
          transform: `rotate(${lamp}deg)`, transformOrigin: "50% -96px" }}>
        <polygon points="0,116 260,116 196,0 64,0" fill="#8A7A68" />
        <polygon points="16,110 244,110 188,8 72,8" fill="#C9A65E" />
      </svg>
      {[0, 1, 2].map((i) => (
        <div key={i} style={{ position: "absolute", left: 40 + i * 34, top: 250 + (i % 2) * 22,
          width: 24, height: 96, borderRadius: 4, background: "#A2917C", zIndex: 8 }} />
      ))}
      {/* a status strip on the bench, cycling from frame 0 */}
      {Array.from({ length: 7 }, (_, i) => (
        <div key={`st${i}`} style={{ position: "absolute", left: 682 + i * 40, top: 616,
          width: 28, height: 28, borderRadius: 7, zIndex: 12,
          background: (Math.floor(f / 4) + i) % 7 < 3 ? GO_L : "#3E4A44" }} />
      ))}
      {/* the cable, hanging in a catenary and swinging until it is plugged in */}
      <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H}
        style={{ position: "absolute", left: 0, top: 0, zIndex: 24 }}>
        <path d={`M${x0},${y0} Q${(x0 + x1) / 2 + swing},${y0 + 150 - reach * 96} ${x0 + (x1 - x0) * reach},${y0 + (1 - reach) * 120}`}
          stroke={GO_D} strokeWidth={17} fill="none" strokeLinecap="round" />
        <circle cx={x0 + (x1 - x0) * reach} cy={y0 + (1 - reach) * 120} r={20} fill={GO} />
      </svg>
      <Cl f={f} x={92} y={600 - 236 * FEET} size={236} gaze={2} cheer={seated ? 0.9 : 0.2} z={30} />
      <Nb x={606} y={286} s={1.02} rows={rows} t={E(f, 4, 20, 0.6, 1, BACK)} z={26} />
      {/* the connection taking, as light stepping down the wire */}
      {seated && [0, 1, 2, 3, 4, 5].map((i) => {
        const q = ((f - 27 + i * 6) % 36) / 36;
        return <div key={i} style={{ position: "absolute", left: x0 + q * (x1 - x0) - 38,
          top: y0 - 38, width: 76, height: 76, borderRadius: 20, background: GO_L,
          boxShadow: SH_S, zIndex: 27 }} />;
      })}
    </>))}
  </>);
};

/* #################################################### S5 · THE SECOND BRAIN
   15.40-17.96 · "Claude suddenly gets a second brain that never forgets".
   ######################################################################### */
export const S5Brain: React.FC = () => {
  const f = useCurrentFrame();
  const on = E(f, 6, 30, 0, 1, OUT);
  return (<>
    <Head f={f} l1="A SECOND BRAIN" l2="THAT NEVER FORGETS" />
    {scene(GO, (<>
      <Room wall="#93A3B1" floor="#7F8F9D" horizon={618} />
      <DecoS5 f={f} />
      {/* a machine room: racks framing the lattice, floor grate, cable trays */}
      <Beam x={-24} y={-20} w={86} h={700} c="#8496A4" vert z={4} />
      <Beam x={950} y={-20} w={86} h={700} c="#8496A4" vert z={4} />
      <Beam x={-20} y={-16} w={1052} h={44} c="#8CA0AE" z={4} />
      <Grate x={-20} y={640} w={1052} h={70} c="#76869A" z={4} gap={30} />
      <Pipe x={-20} y={44} len={1052} th={22} c="#8A9CAA" z={5} />
      <Bolts x={20} y={676} n={16} gap={64} z={6} />
      <Floorwear y={618} c="#7F8F9D" z={5} />
      <RackFore side="r" c="#7E90A0" />
      <PipeFore y={716} c="#8496A4" th={54} />
      {/* the lattice of everything it is holding */}
      {Array.from({ length: 42 }, (_, i) => {
        const cx = 96 + (i % 7) * 132, cy = 128 + Math.floor(i / 7) * 92;
        const wave = (Math.sin(f / 9 - (i % 7) * 0.7 - Math.floor(i / 7) * 0.5) + 1) / 2;
        const lit = on > (i % 11) / 11 && wave > 0.24;
        return <div key={i} style={{ position: "absolute", left: cx, top: cy, width: 106,
          height: 68, borderRadius: 8, background: lit ? GO_L : "#A6B4C0",
          boxShadow: lit ? SH_S : undefined, zIndex: 10,
          transform: `scale(${lit ? 1 : 0.86})` }}>
          {lit && [0, 1].map((k) => (
            <div key={k} style={{ position: "absolute", left: 12, top: 16 + k * 20,
              width: 78 - k * 26, height: 9, borderRadius: 3, background: GO_D }} />
          ))}
        </div>;
      })}
      {/* the wire from him up into it */}
      <div style={{ position: "absolute", left: 486, top: 470, width: 16,
        height: E(f, 2, 22, 0, 168, OUT), background: GO_D, zIndex: 22 }} />
      <Cl f={f} x={390} y={618 - 224 * FEET} size={224} gaze={2} cheer={0.95} z={30} />
    </>))}
  </>);
};

/* ############################################### S6 · EVERY SESSION, THE SAME
   17.96-20.15 · "persistent memory across every session".
   ######################################################################### */
export const S6Sessions: React.FC<{ whip?: boolean }> = ({ whip = false }) => {
  const f = useCurrentFrame();
  const body = (<>
    <Head f={f} l1="PERSISTENT MEMORY" l2="EVERY SESSION" />
    {scene(GO, (<>
      <Room wall="#C2C8B0" floor="#A2A890" horizon={604} />
      <DecoS6 f={f} />
      {/* a corridor of session bays: ceiling run, bay numbers, kick plates */}
      <Beam x={-20} y={-18} w={1052} h={46} c="#9EA48C" z={4} />
      <Pipe x={-20} y={46} len={1052} th={20} c="#A6AC94" z={5} />
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const bx = ((i * 236 - f * 3.4) % 1416) - 180;
        return (
          <React.Fragment key={`bay${i}`}>
            <Plate x={bx + 56} y={296} w={164} h={72} c="#A2A890" z={5}
                   lit={i % 2 ? GO_L : AMB} />
            <Vent x={bx + 196} y={410} w={30} h={188} c="#9AA088" z={4} />
          </React.Fragment>
        );
      })}
      <Hazard x={-20} y={598} w={1052} h={22} z={6} a={AMB} b="#3A4032" />
      <Floorwear y={604} c="#8E947C" z={5} />
      <Railing y={690} c="#8E947C" posts={7} />
      <Bunting y={128} n={14} />
      <Nb x={352} y={62} s={0.86} rows={5} z={26} />
      {/* ⛔ the doors used to finish by frame 40 of 59 and the scene then held.
             Each bay now travels the width of the panel and opens as it arrives,
             so something large and bright is moving on the last frame too. */}
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const dx = ((i * 236 - f * 3.4) % 1416) - 184;
        const open = Math.max(0, Math.min(1, (700 - dx) / 300));
        return (
          <React.Fragment key={i}>
            {/* a session door, opening */}
            <div style={{ position: "absolute", left: dx, top: 400, width: 176, height: 204,
              borderRadius: 10, background: "#6E7A66", boxShadow: SH, zIndex: 12 }} />
            <div style={{ position: "absolute", left: dx, top: 400, width: 176 * (1 - open),
              height: 204, borderRadius: 10, background: "#C2C8AE", zIndex: 14 }} />
            {/* wired to the one memory */}
            <div style={{ position: "absolute", left: dx + 80, top: 352,
              width: 14, height: open * 48, background: GO_D, zIndex: 16 }} />
            <div style={{ position: "absolute", left: Math.min(dx + 80, 424),
              top: 344, width: Math.abs(dx + 80 - 424) * open, height: 14,
              background: GO_D, zIndex: 15 }} />
            {[0, 1].map((k) => {
              const q = ((f + i * 7 + k * 15) % 30) / 30;
              return <div key={k} style={{ position: "absolute", left: dx + 66,
                top: 400 - q * 56, width: 42, height: 42, borderRadius: 11, background: GO_L,
                boxShadow: SH_S, zIndex: 20, opacity: open }} />;
            })}
            <Cl f={f + i * 9} x={dx + 8} y={604 - 168 * FEET} size={168} gaze={2}
                cheer={0.8} z={30} />
          </React.Fragment>
        );
      })}
    </>))}
  </>);
  return whip ? <Whip at={22}>{body}</Whip> : body;
};

/* ################################################### S7 · THE COST FALLS OFF
   20.15-21.33 · "way lower token costs". The pipe that was gushing now drips.
   ######################################################################### */
export const S7Cost: React.FC<{ punch?: boolean }> = ({ punch = false }) => {
  const f = useCurrentFrame();
  const cut = E(f, 4, 26, 1, 0.09, IO);
  const inner = (<>
    <Head f={f} l1="WAY LOWER" l2="TOKEN COST" />
    {scene(GO, (<>
      <Room wall="#98A6B4" floor="#7E8C9A" horizon={624} />
      <DecoS7 f={f} />
      {/* a plant room: a wall of pipework, gauges, grating, hazard edging */}
      <Pipe x={-20} y={64} len={1052} th={36} c="#AAB8C6" z={4} />
      <Pipe x={-20} y={430} len={1052} th={26} c="#A2B0BE" z={4} />
      <Pipe x={820} y={100} len={340} th={30} c="#A6B4C2" vert z={4} />
      <Pipe x={64} y={470} len={160} th={24} c="#9EACBA" vert z={4} />
      {[0, 1, 2].map((i) => (
        <div key={`g${i}`} style={{ position: "absolute", left: 600 + i * 92, top: 140,
          width: 76, height: 76, borderRadius: 999, background: "#E4EAF0",
          border: "7px solid #7C8A98", zIndex: 6 }}>
          <div style={{ position: "absolute", left: 30, top: 12, width: 6, height: 30,
            background: RED, transformOrigin: "50% 100%",
            transform: `rotate(${-50 + i * 42}deg)` }} />
        </div>
      ))}
      <Grate x={-20} y={636} w={1052} h={64} c="#76848E" z={4} gap={28} />
      <Hazard x={-20} y={614} w={1052} h={22} z={6} />
      <Crates x={886} y={624} n={2} s={0.76} c="#8A98A6" z={7} />
      <PipeFore y={700} c="#8A98A6" th={66} />
      <Chains n={2} c="#7E8E9C" xs={[196, 812]} />
      {/* the pipework it comes out of */}
      <div style={{ position: "absolute", left: 300, top: -10, width: 96, height: 250,
        background: "#BCC6D2", zIndex: 8 }} />
      <div style={{ position: "absolute", left: 268, top: 226, width: 160, height: 52,
        borderRadius: 10, background: "#A0AAB6", zIndex: 9 }} />
      <div style={{ position: "absolute", left: 396, top: 96, width: 300, height: 30,
        background: "#AEB8C4", zIndex: 8 }} />
      {/* the valve, closing */}
      {/* ⛔ 96px on a 1012 panel is 1.1% of frame for the thing the shot is ABOUT.
             The wheel is the subject now, and it keeps turning to the last frame. */}
      <div style={{ position: "absolute", left: 232, top: 96, width: 232, height: 232,
        borderRadius: 999, background: RED, boxShadow: SH, zIndex: 12,
        transform: `rotate(${E(f, 2, 30, 0, 300, IO)}deg)` }}>
        {[0, 1, 2].map((k) => (
          <div key={k} style={{ position: "absolute", left: 108, top: 12, width: 18,
            height: 208, borderRadius: 9, background: "#4C1E16",
            transform: `rotate(${k * 60}deg)` }} />
        ))}
        <div style={{ position: "absolute", left: 86, top: 86, width: 60, height: 60,
          borderRadius: 999, background: "#7A3226" }} />
      </div>
      {Array.from({ length: 26 }, (_, i) => {
        if (rnd(i, 31) > cut && i > 2) return null;
        const t2 = (f * 1.6 + i * 5) % 60;
        const d = 76 + rnd(i, 13) * 54;
        return <Coin key={i} d={d} x={300 + rnd(i, 3) * 92 - d / 2}
          y={ballistic(t2, 262, 2, G, 640 + rnd(i, 7) * 90, 0.28) - d / 2}
          rot={t2 * 8} flat={0.3} z={22} />;
      })}
      {Array.from({ length: 26 }, (_, i) => (
        <Coin key={`p${i}`} d={50 + rnd(i, 19) * 40} x={210 + rnd(i, 3) * 300}
          y={676 + rnd(i, 7) * 70} flat={0.7} rot={rnd(i, 11) * 90} z={21} />
      ))}
      <Cl f={f} x={654} y={624 - 214 * FEET} size={214} gaze={0} cheer={0.9} z={30} />
    </>))}
  </>);
  return punch
    ? <div style={{ position: "absolute", inset: 0,
        transform: `scale(${E(f, 0, 30, 1.16, 1.0, OUT)})`, transformOrigin: "50% 54%" }}>{inner}</div>
    : inner;
};

/* ################################################## S8 · WHAT ELSE COMES OUT
   21.33-25.40 · the VO names three NotebookLM extras. ⛔ None of the three
   could be verified, so nothing here is NAMED — three unlabelled outputs come
   off the unit and the picture claims only that things come out of it.
   ######################################################################### */
export const S8Extras: React.FC<{ only?: number; wall?: string; floor?: string;
  boost?: number; gs?: number }> = ({ only, wall = "#B6AC97", floor = "#968C77",
                                      boost = 1, gs = 1 }) => {
  const f = useCurrentFrame();
  const OUTS = only === undefined ? [0, 1, 2] : [only];
  return (<>
    <Head f={f} l1="AND IT MAKES" l2="MORE FROM IT" />
    {scene(AMB, (<>
      <Room wall={wall} floor={floor} horizon={596} />
      <DecoS8 f={f} />
      {/* a studio: a lit shelf run, a soft box, print bins under the counter */}
      <Beam x={-20} y={-18} w={1052} h={42} c="#A69C87" z={4} />
      {[0, 1].map((i) => (
        <div key={`sh${i}`} style={{ position: "absolute", left: -20, top: 132 + i * 148,
          width: 340, height: 20, background: "#A0967F", zIndex: 5 }} />
      ))}
      {Array.from({ length: 9 }, (_, i) => (
        <div key={`bk${i}`} style={{ position: "absolute", left: 6 + (i % 5) * 62,
          top: (i < 5 ? 74 : 222) + (i % 3) * 6, width: 42, height: 58 + (i % 3) * 8,
          borderRadius: 4, background: [PAPER, PAPER2, AMB_L][i % 3], zIndex: 6 }} />
      ))}
      <Plate x={846} y={110} w={150} h={196} c="#ACA28D" z={4} lit={AMB} />
      <Floorwear y={596} c="#968C77" z={5} />
      <CounterFore y={722} c="#8A8068" items={[PAPER, AMB_L, PAPER2]} />
      <Jib x={44} y={168} len={200} c="#A0967F" />
      <div style={{ position: "absolute", left: 0, top: 560, width: W, height: 40,
        background: "#7E7563", zIndex: 9 }} />
      <Nb x={64} y={252} s={0.94} rows={5} z={26} />
      {OUTS.map((i) => {
        const q = E(f, only === undefined ? 16 + i * 22 : 4,
                       only === undefined ? 54 + i * 22 : 26, 0, 1, BACK);
        const bx = only === undefined ? 396 + i * 190 - i * (boost - 1) * 90 : 392 - (gs - 1) * 130;
        const by = only === undefined ? 268 - i * 40 - i * (boost - 1) * 90 : 232 - (gs - 1) * 190;
        return (
          <div key={i} style={{ position: "absolute", left: bx, top: by, width: 180, height: 232,
            borderRadius: 12, background: PAPER, boxShadow: SH, zIndex: 24 + i,
            transform: `scale(${Math.max(0.02, q)}) rotate(${(i - 1) * 5 + Math.sin(f / 13 + i) * 1.7}deg) translateY(${Math.sin(f / 11 + i * 2) * 9}px)`,
            transformOrigin: "0% 100%", overflow: "hidden" }}>
            <div style={{ width: 180, height: 34, background: [GO, RED, AMB_D][i] }} />
            {/* three DIFFERENT unnamed shapes: bars · a frame · pages */}
            {i === 0 && [0, 1, 2, 3].map((k) => (
              <div key={k} style={{ position: "absolute", left: 20 + k * 38, bottom: 22,
                width: 26, height: 40 + k * 42, background: mix(GO, "#000000", 0.12) }} />
            ))}
            {i === 1 && (<>
              <div style={{ position: "absolute", left: 18, top: 62, width: 144, height: 96,
                background: mix(RED, "#000000", 0.2) }} />
              <div style={{ position: "absolute", left: 66, top: 96, width: 0, height: 0,
                borderLeft: `34px solid ${PAPER}`, borderTop: "24px solid transparent",
                borderBottom: "24px solid transparent" }} />
              {[0, 1, 2, 3, 4].map((k) => (
                <div key={k} style={{ position: "absolute", left: 12 + k * 33, top: 176,
                  width: 22, height: 18, background: mix(RED, "#000000", 0.3) }} />
              ))}
            </>)}
            {i === 2 && [0, 1, 2, 3, 4].map((k) => (
              <div key={k} style={{ position: "absolute", left: 20, top: 64 + k * 30,
                width: 140 - (k % 3) * 34, height: 17, borderRadius: 5,
                background: mix(AMB_D, "#FFFFFF", 0.5) }} />
            ))}
          </div>
        );
      })}
      {/* a steady flow off the unit, so the room is never still between cards */}
      {/* ⛔ 5.86 — the three outputs landed by frame 76 of 122 and then only
             breathed. A steady stream of sheets now comes off the unit and
             travels the width of the room for the whole scene. */}
      {Array.from({ length: 9 }, (_, i) => {
        const q = ((f * 1.4 + i * 12) % 108) / 108;
        return <div key={`fl${i}`} style={{ position: "absolute", left: 240 + q * 740,
          top: 372 - q * 250 + Math.sin(q * 7 + i) * 34, width: 104, height: 132,
          borderRadius: 10, background: [PAPER, PAPER2, AMB_L][i % 3], boxShadow: SH_S,
          zIndex: 22, transform: `rotate(${-18 + q * 46}deg)`,
          opacity: Math.min(1, (1 - q) * 3) }} />;
      })}
      <Cl f={f} x={110} y={596 - 176 * FEET} size={176} gaze={0} cheer={0.9} z={30} />
    </>))}
  </>);
};

/* ####################################################### S9 · THE WRAP-UP SKILL
   25.40-28.66 · "the secret is a wrap-up skill". A press that takes a whole
   session and puts out one card. The ram has weight and it lands hard.
   ######################################################################### */
export const S9Skill: React.FC = () => {
  const f = useCurrentFrame();
  const CY = 22;                                   // the beat is 1.45s now: two presses
  const c = f % CY, n = Math.floor(f / CY);
  const down = c < 7 ? E(c, 0, 7, 0, 1, IO) : c < 11 ? 1 : E(c, 11, 17, 1, 0, OUT);
  const slam = c >= 6 && c < 12 ? Math.pow(1 - (c - 6) / 6, 2) : 0;
  return (<>
    <Head f={f} l1="A WRAP-UP SKILL" l2="COMPRESSES IT" />
    {scene(RED, (<>
      <Room wall="#B0A08C" floor="#94826E" horizon={604} />
      <DecoS9 f={f} />
      {/* a machine shop around the press: hydraulics, a control desk, swarf */}
      <Beam x={-20} y={-18} w={1052} h={44} c="#A0907C" z={4} />
      <Pipe x={-20} y={60} len={1052} th={26} c="#A89880" z={4} />
      <Pipe x={110} y={92} len={200} th={22} c="#9E8E78" vert z={4} />
      <Pipe x={760} y={92} len={200} th={22} c="#9E8E78" vert z={4} />
      <Plate x={28} y={300} w={148} h={196} c="#A4947E" z={5} lit={RED} />
      {Array.from({ length: 6 }, (_, i) => (
        <div key={`btn${i}`} style={{ position: "absolute", left: 48 + (i % 3) * 42,
          top: 350 + Math.floor(i / 3) * 44, width: 26, height: 26, borderRadius: 999,
          background: [AMB, GO_L, RED][i % 3], zIndex: 6 }} />
      ))}
      <Hazard x={-20} y={582} w={1052} h={22} z={6} />
      <Floorwear y={604} c="#94826E" z={5} n={10} />
      <Railing y={706} c="#8A7A62" posts={6} />
      <Chains n={3} c="#96866E" xs={[120, 496, 890]} />
      {/* the whole session feeding in from the left, continuously */}
      {Array.from({ length: 7 }, (_, i) => {
        const q = ((f + i * 13) % 91) / 91;
        return <div key={`in${i}`} style={{ position: "absolute", left: -180 + q * 430,
          top: 452, width: 168, height: 40, borderRadius: 6, background: i % 2 ? PAPER : PAPER2,
          boxShadow: SH_S, zIndex: 18 }} />;
      })}
      <div style={{ position: "absolute", inset: 0, zIndex: 4,
        transform: `translateY(${slam * 10}px)` }}>
        {/* the frame — dark, so it reads as machinery against the lifted room */}
        <div style={{ position: "absolute", left: 196, top: 0, width: 62, height: 604,
          background: "#5E5148" }} />
        <div style={{ position: "absolute", left: 690, top: 0, width: 62, height: 604,
          background: "#5E5148" }} />
        <div style={{ position: "absolute", left: 196, top: 0, width: 556, height: 84,
          background: "#6E6055" }} />
        <div style={{ position: "absolute", left: 196, top: 72, width: 556, height: 16,
          background: "#3F362F" }} />
        {/* the guide rails the ram runs on */}
        {[248, 676].map((x, i) => (
          <div key={i} style={{ position: "absolute", left: x, top: 84, width: 18, height: 372,
            background: "#4A413A" }} />
        ))}
        {/* the ram */}
        <div style={{ position: "absolute", left: 240, top: 84 + down * 244, width: 468,
          height: 132, borderRadius: 8, background: "#D8C8B2", boxShadow: SH }} />
        <div style={{ position: "absolute", left: 240, top: 200 + down * 244, width: 468,
          height: 26, background: "#8A7864" }} />
        {[0, 1, 2, 3].map((i) => (
          <div key={`b${i}`} style={{ position: "absolute", left: 274 + i * 118,
            top: 108 + down * 244, width: 54, height: 54, borderRadius: 999,
            background: "#B0A08C" }} />
        ))}
        {/* the anvil */}
        <div style={{ position: "absolute", left: 196, top: 496, width: 556, height: 44,
          background: "#6E6055" }} />
        <div style={{ position: "absolute", left: 196, top: 496, width: 556, height: 12,
          background: "#8A7864" }} />
        {/* what is being squeezed */}
        <div style={{ position: "absolute", left: 262, top: 496 - (62 - down * 44),
          width: 428, height: 62 - down * 44, borderRadius: 6, background: PAPER2,
          boxShadow: SH_S }} />
      </div>
      {/* one card out per cycle, sliding onto the pile */}
      {[0, 1].map((i) => {
        const t2 = c - 12 + i * 5;
        if (t2 < 0 || t2 > 14) return null;
        return <div key={i} style={{ position: "absolute", left: 700 + t2 * 15, top: 462,
          width: 128, height: 44, borderRadius: 7, background: AMB, boxShadow: SH_S,
          zIndex: 22, transform: `rotate(${t2 * 2}deg)` }} />;
      })}
      {Array.from({ length: Math.min(7, n + 1) }, (_, i) => (
        <div key={`st${i}`} style={{ position: "absolute", left: 832, top: 560 - i * 28,
          width: 128, height: 44, borderRadius: 7, background: i % 2 ? AMB : AMB_L,
          boxShadow: SH_S, zIndex: 21 }} />
      ))}
      {/* the working area under the press: a parts tray, swarf, an operator rail */}
      <div style={{ position: "absolute", left: 236, top: 626, width: 472, height: 26,
        background: "#7E6E5C", zIndex: 18 }} />
      {[280, 400, 520, 640].map((lx, i) => (
        <div key={`leg${i}`} style={{ position: "absolute", left: lx, top: 652, width: 26,
          height: 78, background: "#6E6050", zIndex: 17 }} />
      ))}
      {Array.from({ length: 16 }, (_, i) => (
        <div key={`sw${i}`} style={{ position: "absolute", left: 210 + rnd(i, 3) * 520,
          top: 668 + rnd(i, 7) * 88, width: 34 + rnd(i, 13) * 30, height: 8, borderRadius: 4,
          background: i % 2 ? "#8A7A66" : AMB_D, zIndex: 19,
          transform: `rotate(${(rnd(i, 11) - 0.5) * 80}deg)` }} />
      ))}
      <div style={{ position: "absolute", left: 758, top: 640, width: 200, height: 110,
        borderRadius: 8, background: "#7A6A58", zIndex: 18 }} />
      {Array.from({ length: 6 }, (_, i) => (
        <div key={`tc${i}`} style={{ position: "absolute", left: 772 + (i % 3) * 62,
          top: 654 + Math.floor(i / 3) * 46, width: 52, height: 34, borderRadius: 5,
          background: i % 2 ? AMB : AMB_L, zIndex: 19 }} />
      ))}
      <Cl f={f} x={22} y={640 - 200 * FEET} size={200} gaze={2} cheer={0.85} z={30} />
    </>))}
  </>);
};

/* ################################################### S10 · IT SAVES ITSELF
   28.66-32.60 · "after each session it saves the entire conversation into
   NotebookLM". A chute: cards ride it and drop into the unit.
   ######################################################################### */
export const S10Save: React.FC = () => {
  const f = useCurrentFrame();
  return (<>
    <Head f={f} l1="EVERY SESSION" l2="SAVED AUTOMATICALLY" />
    {scene(GO, (<>
      <Room wall="#A6BAB0" floor="#8CA098" horizon={640} />
      <DecoS10 f={f} />
      {/* a sorting room: gantry, wall bins, a rail the chute hangs from */}
      <Beam x={-20} y={-18} w={1052} h={42} c="#96AAA0" z={4} />
      <Beam x={-24} y={-20} w={72} h={700} c="#96AAA0" vert z={4} />
      {Array.from({ length: 12 }, (_, i) => (
        <div key={`bin${i}`} style={{ position: "absolute", left: 700 + (i % 3) * 108,
          top: 76 + Math.floor(i / 3) * 62, width: 96, height: 50, background: "#9AAEA4",
          borderTop: "4px solid #B0C4BA", borderBottom: "5px solid #7C9086", zIndex: 5 }} />
      ))}
      <Pipe x={-20} y={150} len={620} th={22} c="#9EB2A8" z={4} />
      <Crates x={90} y={640} n={2} s={0.74} c="#869A90" z={7} />
      <Hazard x={-20} y={618} w={1052} h={22} z={6} a={GO_L} b="#2E3A34" />
      <Floorwear y={640} c="#8CA098" z={5} />
      <CounterFore y={730} c="#7E9288" items={[AMB, PAPER2, AMB_L]} />
      <Bunting y={148} n={12} />
      {/* the chute running down to the unit */}
      <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} shapeRendering="crispEdges"
        style={{ position: "absolute", left: 0, top: 0, zIndex: 8 }}>
        <polygon points="0,206 612,404 612,452 0,254" fill="#A8B8AE" />
        <polygon points="0,206 612,404 612,418 0,220" fill="#C4D0C8" />
        {Array.from({ length: 11 }, (_, i) => (
          <rect key={i} x={30 + i * 54} y={224 + i * 17} width={26} height={11} fill="#84948C" />
        ))}
      </svg>
      {/* ⛔ five 126x44 cards riding the chute is 3.5% of the panel and it
             measured 4.97. Eleven at 214x74, moving half again as fast, is the
             same idea at a size the eye actually registers. */}
      {/* ⛔ eleven 214px cards at 55px spacing overlapped into ONE solid ribbon,
             and a uniform band translating barely changes a pixel — the same trap
             as a smooth parameter sweep. Six separated cards with alternating
             value read as objects moving, which is what the eye measures. */}
      {Array.from({ length: 6 }, (_, i) => {
        const q = ((f * 1.5 + i * 7.4) % 44) / 44;
        const cx = q * 620 - 60, cy = 146 + q * 218;
        const drop = q > 0.84 ? (q - 0.84) / 0.16 : 0;
        return <div key={i} style={{ position: "absolute", left: cx,
          top: cy + drop * drop * 230, width: 168, height: 62, borderRadius: 10,
          background: i % 2 ? AMB : PAPER, boxShadow: SH_S, zIndex: 24,
          transform: `rotate(${18 + drop * 62}deg)`, opacity: drop > 0.9 ? 0 : 1 }} />;
      })}
      <Nb x={600} y={382} s={1.06} rows={Math.min(5, 1 + Math.floor(f / 22))} z={26} />
      <Cl f={f} x={72} y={640 - 190 * FEET} size={190} gaze={0} cheer={0.85} z={30} />
    </>))}
  </>);
};

/* ################################################# S11 · IT PULLS WHAT IT NEEDS
   32.60-34.93 · "then Claude pulls whatever it needs with semantic search".
   ######################################################################### */
export const S11Recall: React.FC = () => {
  const f = useCurrentFrame();
  const fly = E(f, 14, 62, 0, 1, IO);
  return (<>
    <Head f={f} l1="IT PULLS EXACTLY" l2="WHAT IT NEEDS" />
    {scene(GO, (<>
      <Room wall="#94A2AE" floor="#7E8C9A" horizon={630} />
      <DecoS11 f={f} />
      {/* an archive aisle: rails, a ladder, uplights, grating underfoot */}
      <Beam x={-20} y={-18} w={1052} h={40} c="#74828E" z={4} />
      <Beam x={252} y={20} w={22} h={620} c="#6E7C88" vert z={9} />
      <Beam x={954} y={20} w={22} h={620} c="#6E7C88" vert z={9} />
      {Array.from({ length: 6 }, (_, i) => (
        <div key={`rg${i}`} style={{ position: "absolute", left: 252, top: 56 + i * 78,
          width: 724, height: 9, background: "#82909C", zIndex: 9 }} />
      ))}
      <div style={{ position: "absolute", left: 140, top: 60, width: 74, height: 570,
        zIndex: 8 }}>
        <div style={{ position: "absolute", left: 0, width: 14, height: 570, background: "#76848E" }} />
        <div style={{ position: "absolute", left: 60, width: 14, height: 570, background: "#76848E" }} />
        {Array.from({ length: 9 }, (_, i) => (
          <div key={i} style={{ position: "absolute", top: 34 + i * 62, width: 74, height: 12,
            background: "#68767F" }} />
        ))}
      </div>
      <Grate x={-20} y={648} w={1052} h={64} c="#78868E" z={4} gap={28} />
      <RackFore side="l" c="#7E8C98" />
      <Railing y={716} c="#84929E" posts={5} />
      {/* the wall of everything it kept */}
      {/* ⛔ 3.87, the weakest scene in the reel: forty cards changing TINT in
             place. Each row now travels at its own rate — you are moving through
             the archive, which is also a truer picture of a search. */}
      {Array.from({ length: 48 }, (_, i) => {
        const row = Math.floor(i / 6), col = i % 6;
        if (i === 20) return null;
        const dir = row % 2 ? -1 : 1;
        const cx = ((col * 142 + f * (2.2 + row * 0.5) * dir) % 852) + 258;
        const cy = 66 + row * 78;
        const pulse = (Math.sin(f / 7 - col * 0.8 - row * 0.6) + 1) / 2;
        return <div key={i} style={{ position: "absolute", left: cx - 142, top: cy,
          width: 118, height: 58, borderRadius: 7,
          background: mix("#AEBAC4", GO_L, pulse * 0.45), zIndex: 10 }} />;
      })}
      {/* the one it wanted, coming out to him */}
      <div style={{ position: "absolute", left: 584 - fly * 430, top: 268 + fly * 210,
        width: 118 + fly * 180, height: 58 + fly * 92, borderRadius: 8, background: GO,
        boxShadow: SH, zIndex: 28, transform: `rotate(${(1 - fly) * -22}deg)` }}>
        {[0, 1].map((k) => (
          <div key={k} style={{ position: "absolute", left: 14, top: 16 + k * 22,
            width: (72 - k * 24) * (1 + fly * 0.6), height: 10, borderRadius: 3,
            background: GO_D }} />
        ))}
      </div>
      {/* the search reaching in */}
      {Array.from({ length: 3 }, (_, i) => (
        <div key={i} style={{ position: "absolute", left: 250, top: 330 + i * 8,
          width: 120 + ((f * 9 + i * 40) % 220), height: 8, borderRadius: 4,
          background: hexA(GO_L, 0.85), zIndex: 22 }} />
      ))}
      <Cl f={f} x={54} y={630 - 218 * FEET} size={218} gaze={0} cheer={0.9} z={30} />
    </>))}
  </>);
};

/* ###################################################### S12 · WHAT IT ADDS UP TO
   34.93-36.63 · "this one setup changes everything".
   ######################################################################### */
export const S12Payoff: React.FC = () => {
  const f = useCurrentFrame();
  return (<>
    <Head f={f} l1="INFINITE MEMORY" l2="FOR ALMOST NOTHING" />
    {scene(GO, (<>
      <Room wall="#9DB6C4" floor="#7E8B78" horizon={596} />
      <DecoS12 f={f} />
      {/* outside, above it: a skyline, a parapet rail, grass at the frame edge */}
      {[[-40, 372, 150], [130, 300, 118], [268, 350, 96], [382, 268, 130], [534, 336, 110],
        [660, 292, 142], [820, 348, 120], [946, 306, 140]].map(([bx, by, bw], i) => (
        <React.Fragment key={`sk${i}`}>
          <div style={{ position: "absolute", left: bx, top: by, width: bw,
            height: 596 - (by as number), background: i % 2 ? "#7E97A6" : "#88A0AE", zIndex: 4 }} />
          {Array.from({ length: 6 }, (_, k) => (
            <div key={k} style={{ position: "absolute", left: (bx as number) + 14 + (k % 2) * 46,
              top: (by as number) + 26 + Math.floor(k / 2) * 46, width: 28, height: 22,
              background: "#9CB4C2", zIndex: 5 }} />
          ))}
        </React.Fragment>
      ))}
      <div style={{ position: "absolute", left: -20, top: 566, width: 1052, height: 18,
        background: "#6E7B6A", zIndex: 6 }} />
      {Array.from({ length: 14 }, (_, i) => (
        <div key={`ps${i}`} style={{ position: "absolute", left: -10 + i * 76, top: 566,
          width: 16, height: 44, background: "#66735F", zIndex: 6 }} />
      ))}
      <Floorwear y={596} c="#7E8B78" z={5} />
      <Railing y={636} c="#6E7B6A" posts={7} />
      {[[610, 130], [700, 190]].map(([bx, by], i) => (
        <svg key={i} viewBox="0 0 60 24" width={60} height={24}
          style={{ position: "absolute", left: bx - f * 1.6, top: by + Math.sin(f / 12 + i) * 7,
            zIndex: 6 }}>
          <path d="M2 16 L16 4 L30 16 L44 4 L58 16" stroke="#6F7C8C" strokeWidth={5}
            fill="none" strokeLinecap="square" />
        </svg>
      ))}
      {/* he is standing on the archive now, not buried under the bill */}
      {Array.from({ length: 18 }, (_, i) => (
        <div key={i} style={{ position: "absolute", left: 236 + (i % 6) * 96,
          top: 500 + Math.floor(i / 6) * 34, width: 88, height: 30, borderRadius: 6,
          background: i % 2 ? GO : GO_L, boxShadow: SH_S, zIndex: 12 }} />
      ))}
      <Cl f={f} x={382} y={500 - 226 * FEET} size={226} gaze={2} cheer={0.98} z={30} />
      {/* and the whole cost is one coin */}
      <div style={{ position: "absolute", left: 92, top: 512, width: 150, height: 96,
        borderRadius: 12, background: "#3A3128", boxShadow: SH, zIndex: 22 }} />
      {[0, 1].map((k) => (
        <Coin key={k} d={62} x={136} rot={f * 7}
          y={ballistic((f + k * 13) % 26, 150, 0, G, 528, 0.4)} flat={0.2} z={24} />
      ))}
      {/* the archive still filling under him */}
      {/* the archive keeps arriving under him for the whole shot — cards fly in
          from off-panel and land on the stack rather than nudging in place */}
      {Array.from({ length: 10 }, (_, i) => {
        const q = ((f * 1.7 + i * 11) % 52) / 52;
        const land = Math.min(1, q / 0.82);
        return (
          <div key={`n${i}`} style={{ position: "absolute",
            left: (i % 2 ? 1120 : -120) + ((i % 2 ? -1 : 1) * land * (i % 2 ? 800 : 400))
                  + (i % 6) * 34,
            top: 250 + land * land * 226, width: 132, height: 44, borderRadius: 7,
            background: i % 2 ? GO_L : GO, boxShadow: SH_S, zIndex: 13,
            transform: `rotate(${(1 - land) * (i % 2 ? 34 : -34)}deg)`,
            opacity: q > 0.9 ? 0 : 1 }} />
        );
      })}
    </>))}
  </>);
};

/* ############################################################## S13 · THE CTA
   36.63-38.74 · "comment AI".
   ######################################################################### */
export const S13Cta: React.FC = () => {
  const f = useCurrentFrame();
  const pop = E(f, 4, 22, 0, 1, BACK);
  return (<>
    <Head f={f} l1="COMMENT THE WORD" l2="AI" />
    {scene(AMB, (<>
      <Room wall="#B6AC97" floor="#948A75" horizon={612} />
      <DecoS13 f={f} />
      {/* the sign-off room: a lit wall, shelf, and a floor full of what he saved */}
      <Beam x={-20} y={-18} w={1052} h={42} c="#A69C87" z={4} />
      <Plate x={40} y={116} w={186} h={130} c="#ACA28D" z={4} lit={GO_L} />
      <Plate x={800} y={116} w={186} h={130} c="#ACA28D" z={4} lit={AMB} />
      <div style={{ position: "absolute", left: -20, top: 300, width: 300, height: 18,
        background: "#A0967F", zIndex: 5 }} />
      <div style={{ position: "absolute", left: 760, top: 300, width: 300, height: 18,
        background: "#A0967F", zIndex: 5 }} />
      {Array.from({ length: 8 }, (_, i) => (
        <div key={`bk${i}`} style={{ position: "absolute", left: (i < 4 ? 8 : 786) + (i % 4) * 62,
          top: 240, width: 44, height: 60, borderRadius: 4,
          background: [PAPER, PAPER2, AMB_L][i % 3], zIndex: 6 }} />
      ))}
      <Floorwear y={612} c="#948A75" z={5} />
      <CounterFore y={718} c="#8A8068" items={[AMB_L, PAPER, PAPER2]} />
      <Chains n={2} c="#A0967F" xs={[164, 852]} />
      {/* the keyword keeps breathing rather than landing and holding */}
      <div style={{ position: "absolute", left: 268, top: 178, width: 480, height: 244,
        borderRadius: 34, background: PAPER, boxShadow: SH, zIndex: 26,
        transform: `scale(${Math.max(0.02, pop) * (1 + Math.sin(f / 7) * 0.045)})`,
        transformOrigin: "50% 100%",
        display: "flex", alignItems: "center", justifyContent: "center", gap: 22,
        fontFamily: inter.fontFamily }}>
        <Img src={staticFile(CLAUDE)} style={{ width: 88, height: 88, objectFit: "contain" }} />
        <span style={{ fontWeight: 900, fontSize: 152, color: INKD,
          letterSpacing: "-0.04em" }}>AI</span>
      </div>
      <div style={{ position: "absolute", left: 310, top: 418, width: 0, height: 0, zIndex: 26,
        borderLeft: "26px solid transparent", borderRight: "26px solid transparent",
        borderTop: `36px solid ${PAPER}`, opacity: pop }} />
      <Cl f={f} x={392} y={612 - 232 * FEET} size={232} gaze={2} cheer={0.98} z={30} />
      {/* rings off the keyword, the one big bright event in the sign-off */}
      {[0, 1, 2].map((i) => {
        const t = Math.max(0, Math.min(1, (f - (14 + i * 9)) / 26));
        if (t <= 0 || t >= 1) return null;
        const d = 300 + t * 620;
        return <div key={`r${i}`} style={{ position: "absolute", left: 508 - d / 2,
          top: 300 - d / 2, width: d, height: d, borderRadius: 999, zIndex: 24,
          border: `${Math.round(18 * (1 - t))}px solid ${AMB_L}`, opacity: 1 - t }} />;
      })}
      {Array.from({ length: 20 }, (_, i) => {
        const d = 62 + rnd(i, 19) * 52;
        return <Coin key={i} d={d} x={-30 + rnd(i, 3) * 1070}
          y={ballistic((f + i * 5) % 58, -160 - rnd(i, 7) * 120, 3, G, 640 + rnd(i, 11) * 90, 0.34)}
          rot={f * 6 + i * 30} flat={0.25} z={20} />;
      })}
    </>))}
  </>);
};
