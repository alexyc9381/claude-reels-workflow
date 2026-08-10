import React from "react";
import { AbsoluteFill, useCurrentFrame, Img, staticFile } from "remotion";
import { inter } from "./fonts";
import { Bg, Panel, ProgressBar, HookHeader, Caption, AssemblyCtx, hexA, Mascot } from "./SlopKit";
import { Dev, Meter, Chip, PW, PH, INKD,
         RED, RED_D, AMBER, GO, GO_L, GOLD, E, osc, rnd, OUT, IO, BACK, SH, SH_D } from "./KeyWorld";

const SoloCap: React.FC<{ words: string[]; hot?: number }> = (p) =>
  React.useContext(AssemblyCtx) ? null : <Caption {...p} />;

/* =========================================================================
   REEL 83 "KEY" · THE RELIC.

   The brief: "a golden gem kind of thing glowing on a pedestal, people trying
   to get it" — and MORE HIERARCHICAL.

   Hierarchy is the whole build here. Every shot has ONE object that is biggest,
   brightest, highest and centred, and everything else is deliberately smaller,
   darker and lower: the crowd are silhouettes, the stone is mid-tone, the rope
   line sits below the eyeline. The relic is the only saturated gold in frame.

   ⛔ It cannot actually GLOW. `feedback_reel_matte_palette` bans coloured
   `0 0 Npx` glow and low-opacity washes, and it has been re-flagged repeatedly.
   So the light is done the way hand-drawn animation does it: SOLID flat cel
   rays radiating from behind the object, a hard-edged light shaft, and solid
   sparkle diamonds. Full opacity, no blur anywhere.

   The story: the repo is a relic almost nobody has reached. A crowd is held
   back at a rope, paying at a turnstile. The hero gets to it.
   ========================================================================= */

/* A BLACK ROOM. The gem is the only light source, so every stone value is
   pulled right down and every blue in frame belongs to the relic. */
const STONE = "#1B2230", STONE_L = "#28313F", STONE_D = "#141A24", STONE_XD = "#0B0F16";
const FLOOR = "#151B26", FLOOR_L = "#232C3A";
const SHAFT = "#BFE9FF", SHAFT_D = "#8FD3F5";
/* the relic, in blue */
export const G1 = "#EAF9FF", G2 = "#8FD8FA", G3 = "#4FB8ED", G4 = "#2A8CC8", G5 = "#17608F";
export const KEY_BLUE = "#3FA9DC";
/* the cel-glow halo steps out from the gem in SOLID paint, never a blur */
const H1 = "#2F6E96", H2 = "#245A80", H3 = "#1B4767", H4 = "#14364F";
const VELVET = "#6E2836", BRASS = "#8A6E30";

/* ------------------------------------------------------------------ light -- */

/** THE GLOW — a real falloff, not stacked rings.
 *
 *  ⛔ Two rewrites here. First was a spinning ray fan ("i dont like the spinning
 *  yellow thing"). Second was four hard concentric ellipses, which banded into
 *  visible circles ("more natural looking glow rather than like circles").
 *
 *  This is a radial falloff, which IS a soft gradient — a deliberate, requested
 *  departure from `feedback_reel_matte_palette`. The rule exists to stop neon
 *  glow and low-opacity washes over flat art; here the subject is a light source
 *  in a black room, which is the one case where a falloff reads as light rather
 *  than as haze. It breathes slowly and does not rotate. */
export const Halo: React.FC<{ f: number; cx: number; cy: number; r?: number; z?: number }> =
  ({ f, cx, cy, r = 300, z = 6 }) => {
  const pulse = 1 + Math.sin(f * 0.08) * 0.05;
  const R = r * pulse;
  return (
    <div style={{ position: "absolute", left: cx - R, top: cy - R * 0.96, width: R * 2, height: R * 1.92,
      zIndex: z, pointerEvents: "none",
      background: `radial-gradient(circle at 50% 50%,
        rgba(190,236,255,0.95) 0%,
        rgba(112,196,240,0.72) 12%,
        rgba(58,140,200,0.44) 27%,
        rgba(28,86,136,0.24) 44%,
        rgba(16,50,84,0.10) 62%,
        rgba(11,17,25,0) 78%)` }} />
  );
};

/** REAL provider marks orbiting the relic, with depth.
 *
 *  Asked for directly: "even the beginning should show the logos spinning
 *  around". This does the work of three things at once — it puts the brands in
 *  the first second, it is the motion the open was short of, and it says
 *  "40+ providers" without a line of type.
 *
 *  Depth is the detail that sells it: a tile at the BACK of the ellipse is
 *  smaller and renders BEHIND the gem, one at the front is larger and in front,
 *  so it reads as a ring in space rather than a flat circle of icons. */
export const PROVIDER_LOGOS = [
  "googlegemini.svg", "x.svg", "nvidia.svg", "mistralai.svg", "huggingface.svg",
  "deepseek.svg", "perplexity.svg", "ollama.svg", "openrouter.svg", "replicate.svg",
];

export const Orbit: React.FC<{
  f: number; cx: number; cy: number; rx?: number; ry?: number; n?: number;
  speed?: number; d?: number; phase?: number; gemZ?: number;
}> = ({ f, cx, cy, rx = 380, ry = 132, n = 8, speed = 0.016, d = 96, phase = 0, gemZ = 20 }) => (<>
  {Array.from({ length: n }, (_, i) => {
    const a = (i / n) * Math.PI * 2 + f * speed + phase;
    const depth = Math.sin(a);                    // -1 back, +1 front
    const k = 0.62 + ((depth + 1) / 2) * 0.5;     // size by depth
    const w = d * k;
    return (
      <div key={i} style={{ position: "absolute", left: cx + Math.cos(a) * rx - w / 2,
        top: cy + depth * ry - w / 2, width: w, height: w, borderRadius: w * 0.22,
        background: "#F6FAFD", zIndex: depth > 0 ? gemZ + 6 : gemZ - 14,
        filter: `drop-shadow(0 ${6 * k}px ${7 * k}px rgba(0,0,0,0.55))` }}>
        <Img src={staticFile(`logos/${PROVIDER_LOGOS[i % PROVIDER_LOGOS.length]}`)}
          style={{ position: "absolute", left: w * 0.19, top: w * 0.19, width: w * 0.62,
            height: w * 0.62, objectFit: "contain" }} />
      </div>
    );
  })}
</>);

/** solid sparkle diamonds */
export const Sparks: React.FC<{ f: number; cx: number; cy: number; r?: number; n?: number; z?: number }> =
  ({ f, cx, cy, r = 250, n = 7, z = 22 }) => (<>
  {Array.from({ length: n }, (_, i) => {
    const t = ((f * 0.022 + i / n) % 1);
    const a = (i / n) * Math.PI * 2 + f * 0.012;
    const rad = r * (0.5 + t * 0.6);
    const s = (1 - Math.abs(t - 0.5) * 2) * 26 + 6;
    return (
      <div key={i} style={{ position: "absolute", left: cx + Math.cos(a) * rad - s / 2,
        top: cy + Math.sin(a) * rad * 0.7 - s / 2, width: s, height: s, background: G1,
        transform: "rotate(45deg)", zIndex: z }} />
    );
  })}
</>);

/* ------------------------------------------------------------------ relic -- */

/** THE RELIC: a faceted gold gem. Rotates, and its facets read as flat cels. */
export const Gem: React.FC<{ f: number; x: number; y: number; s?: number; z?: number }> =
  ({ f, x, y, s = 1, z = 20 }) => {
  const spin = Math.sin(f * 0.05);
  return (
    <div style={{ position: "absolute", left: x, top: y, width: 260 * s, height: 300 * s, zIndex: z,
      transform: `translateY(${osc(f, 26, 10)}px) scaleX(${0.86 + Math.abs(spin) * 0.14})`,
      filter: "drop-shadow(0 14px 12px rgba(46,36,16,0.45))" }}>
      <svg viewBox="0 0 260 300" width={260 * s} height={300 * s} style={{ overflow: "visible" }}>
        {/* crown */}
        <polygon points="130,4 34,96 226,96" fill={G1} />
        <polygon points="130,4 34,96 92,96" fill={G2} />
        <polygon points="130,4 226,96 168,96" fill={G3} />
        {/* girdle */}
        <polygon points="34,96 226,96 208,128 52,128" fill={G2} />
        <polygon points="34,96 92,96 74,128 52,128" fill={G1} />
        {/* pavilion */}
        <polygon points="52,128 208,128 130,296" fill={G3} />
        <polygon points="52,128 130,128 130,296" fill={G2} />
        <polygon points="130,128 208,128 130,296" fill={G4} />
        {/* facet lines */}
        <polygon points="92,96 130,4 168,96" fill={G1} opacity={0.9} />
        <polygon points="100,128 130,296 160,128" fill={G1} opacity={0.55} />
        <polygon points="52,128 208,128 130,182" fill={G5} opacity={0.35} />
      </svg>
    </div>
  );
};

/** a stepped stone plinth */
export const Pedestal: React.FC<{ x: number; y: number; s?: number; label?: string;
  logo?: string; z?: number }> = ({ x, y, s = 1, label, logo, z = 14 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: 300 * s, height: 300 * s, zIndex: z,
    filter: "drop-shadow(0 12px 12px rgba(30,26,20,0.42))" }}>
    <div style={{ position: "absolute", left: 66 * s, top: 0, width: 168 * s, height: 26 * s,
      borderRadius: 5 * s, background: STONE_L }} />
    <div style={{ position: "absolute", left: 90 * s, top: 26 * s, width: 120 * s, height: 180 * s,
      background: STONE }} />
    <div style={{ position: "absolute", left: 90 * s, top: 26 * s, width: 30 * s, height: 180 * s,
      background: STONE_L }} />
    <div style={{ position: "absolute", left: 40 * s, top: 206 * s, width: 220 * s, height: 34 * s,
      borderRadius: 5 * s, background: STONE_L }} />
    <div style={{ position: "absolute", left: 12 * s, top: 240 * s, width: 276 * s, height: 40 * s,
      borderRadius: 5 * s, background: STONE_D }} />
    {/* ⛔ The plinth used to carry the product NAME as type. A name is not the
           product — the same note that rebuilt reel 84's tool rack. `logo` mounts
           the OFFICIAL mark on a cream placard, black-on-cream because the room
           is near-black and eighteen brand palettes read as confetti at this size.
           Marks are LOCAL (public/logos), so a render never depends on the CDN. */}
    {label && !logo && (
      <div style={{ position: "absolute", left: 30 * s, top: 250 * s, width: 240 * s, textAlign: "center",
        fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 24 * s, letterSpacing: "0.1em",
        color: G2 }}>{label}</div>
    )}
    {logo && (
      <div style={{ position: "absolute", left: 24 * s, top: 238 * s, width: 252 * s, height: 58 * s,
        borderRadius: 9 * s, background: "#F7F3EA", display: "flex", alignItems: "center",
        justifyContent: "center", gap: 11 * s, boxShadow: "0 6px 10px rgba(6,10,16,0.55)" }}>
        <Img src={staticFile(`logos/${logo}`)}
             style={{ width: 30 * s, height: 30 * s, objectFit: "contain", display: "block" }} />
        <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 21 * s,
          letterSpacing: "0.04em", color: "#241F1A", whiteSpace: "nowrap" }}>{label}</div>
      </div>
    )}
  </div>
);

/** THE ROOM — near enough black, and that is the whole point.
 *
 *  ⛔ Stripped on request: "less detailed background just mostly black". The
 *  earlier version had wall courses, pier joints, two columns and three steps,
 *  all of which competed with the relic. What is left is a black field, one
 *  barely-there floor line to sit the pedestal on, and nothing else. The crowd
 *  and the velvet rope are gone entirely. */
export const Room: React.FC<{ f: number; horizon?: number }> = ({ f, horizon = 596 }) => (<>
  <div style={{ position: "absolute", inset: 0, background: "#070A0F" }} />
  <div style={{ position: "absolute", left: 0, right: 0, top: horizon, bottom: 0,
    background: "#0C1119", zIndex: 1 }} />
  <div style={{ position: "absolute", left: 0, right: 0, top: horizon, height: 3,
    background: "#1A2430", zIndex: 2 }} />
</>);

/* ---------------------------------------------------------------- the hook */

const HEAD = { big: "134 FREE AI APIS", hot: "ONE REPO NOBODY KNOWS" };
const PROV = ["GEMINI", "GROK", "NVIDIA"];

const Shot: React.FC<{ f: number; a: number; b: number; k?: number; children: React.ReactNode }> =
  ({ f, a, b, k = 0, children }) => {
  if (f < a || f >= b) return null;
  /* the push is spread over 30 frames now — a 1.3s shot wants a slow move under
     it, or it arrives and then sits there for a second doing nothing */
  const t = Math.min(1, (f - a) / 30), e = t * t * (3 - 2 * t);
  const z = [1.07 - e * 0.06, 1.02 + e * 0.05, 1.05 - e * 0.04, 1.02 + e * 0.05][k % 4];
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden",
      transform: `scale(${z})`, transformOrigin: "50% 56%" }}>{children}</div>
  );
};

const Flash: React.FC<{ f: number; cuts: number[] }> = ({ f, cuts }) => (<>
  {cuts.map((cf) => {
    const k = f - cf;
    if (k < 0 || k > 2) return null;
    return <div key={cf} style={{ position: "absolute", inset: 0, background: "#DFF3FF",
      opacity: (1 - k / 2) * 0.26, zIndex: 44 }} />;
  })}
</>);

/* FOUR shots at 1.33s each, not six at 0.8s.
   ⛔ "too fast" — and this is the third re-cut of an open on this project, so it
   is worth writing down: the 0.7s floor is a FLOOR for a busy frame. A near-empty
   frame with one object in it needs longer, because there is nothing to scan. */
export const KEY_REL_CUTS = [40, 79, 118];

export const KeyRelicHook: React.FC = () => {
  const f = useCurrentFrame();
  const [C1, C2, C3] = KEY_REL_CUTS;
  return (
    <AbsoluteFill>
      <Bg /><ProgressBar />
      <HookHeader f={f + 12} big={HEAD.big} hot={HEAD.hot} />
      <Panel glow={hexA(KEY_BLUE, 0.34)}>

        {/* 1 · THE RELIC. Black, one object, let it breathe. */}
        <Shot f={f} a={0} b={C1} k={0}>
          <Room f={f} horizon={614} />
          <Halo f={f} cx={506} cy={330} r={330} z={6} />
          <Orbit f={f} cx={506} cy={334} rx={392} ry={128} n={8} speed={0.018} d={104} gemZ={20} />
          <Pedestal x={356} y={520} s={1.0} z={14} />
          <Gem f={f} x={356} y={186} s={1.16} z={20} />
          <Sparks f={f} cx={506} cy={330} r={280} n={4} z={22} />
          <Chip y={716} text="ONE REPO NOBODY HAS" c={RED} />
        </Shot>

        {/* 2 · CLOSE. 134, and whose. */}
        <Shot f={f} a={C1} b={C2} k={1}>
          <Room f={f} horizon={700} />
          <Halo f={f} cx={506} cy={392} r={410} z={6} />
          <Orbit f={f} cx={506} cy={398} rx={438 - E(f, C1, C1 + 34, 0, 70, OUT)} ry={150}
                 n={10} speed={0.030} d={92} phase={0.4} gemZ={20} />
          <Gem f={f} x={330} y={228} s={1.42} z={20} />
          <Sparks f={f} cx={506} cy={392} r={340} n={4} z={22} />
          <div style={{ position: "absolute", left: 0, right: 0, top: 74, textAlign: "center",
            fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 124, lineHeight: 1,
            letterSpacing: "-0.04em", color: G2, zIndex: 26 }}>134</div>
          {PROV.map((p, i) => (
            <div key={p} style={{ position: "absolute", left: 96 + i * 286, top: 690, padding: "9px 18px",
              borderRadius: 7, background: "#12202E", zIndex: 28, fontFamily: inter.fontFamily,
              fontWeight: 900, fontSize: 25, color: G2,
              transform: `scale(${0.7 + E(f, C1 + 6 + i * 6, C1 + 22 + i * 6, 0, 0.3, BACK)})` }}>{p}</div>
          ))}
        </Shot>

        {/* 3 · THREE PLINTHS. Where it installs. */}
        <Shot f={f} a={C2} b={C3} k={2}>
          <Room f={f} horizon={604} />
          {[["CURSOR", "cursor.svg"], ["CLAUDE CODE", "claude.svg"], ["CODEX", "openai.png"]].map(([t, lg], i) => {
            /* ⛔ all three land BY frame 90 = 3.00s, which is where the logos were asked
                   for. The old i*7 stagger finished at 117, the shot's last frame. */
            const dy = (1 - E(f, C2 + 1 + i * 2, C2 + 8 + i * 2, 0, 1, BACK)) * 430;
            return (
              <React.Fragment key={t}>
                <Halo f={f + i * 9} cx={172 + i * 330} cy={392 + dy} r={168} z={5} />
                <Pedestal x={22 + i * 330} y={470 + dy} s={0.78} label={t} logo={lg} z={14 + i} />
                <Gem f={f + i * 11} x={70 + i * 330} y={262 + dy} s={0.56} z={20 + i} />
              </React.Fragment>
            );
          })}
          <Chip y={116} text="ONE CLICK SETUP" c={AMBER} />
        </Shot>

        {/* 4 · HE HAS IT. */}
        <Shot f={f} a={C3} b={9999} k={3}>
          <Room f={f} horizon={620} />
          <Halo f={f} cx={636} cy={330} r={300} z={6} />
          <Orbit f={f} cx={636} cy={336} rx={330} ry={116} n={7} speed={0.022} d={88} phase={1.1} gemZ={20} />
          <Gem f={f} x={506} y={196} s={1.0} z={20} />
          <Sparks f={f} cx={636} cy={330} r={250} n={4} z={22} />
          <Dev f={f} x={40} y={378} size={300} gaze={2} cheer={0.9} nodAmp={3.2} nodSpeed={9} z={24} />
          <Meter f={f} x={62} y={128} s={0.62} stop label="YOUR BILL" z={30} />
          <Chip y={716} text="SAME MODELS. ZERO." c={GO} />
        </Shot>

        <Flash f={f} cuts={KEY_REL_CUTS} />
      </Panel>
      <SoloCap words={["Because", "of", "one", "GitHub"]} hot={2} />
    </AbsoluteFill>
  );
};
