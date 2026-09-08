import React from "react";
import { AbsoluteFill, useCurrentFrame, Img, staticFile, Audio } from "remotion";
import { inter } from "./fonts";
import { Bg, Panel, ProgressBar, HookHeader, hexA } from "./SlopKit";
import { Dev } from "./KeyWorld";
import { AChip, BRAND_TASKS, CARD, INKD, RED, GO, A1, A3 } from "./AutoWorld";
import { E, BACK } from "./MissionWorld";
import { Shot, Flash } from "./AutoHookQueue";
import { Wedges, Satellites, Shutter, lin, C1, VAR_LEN } from "./AutoVariants";

/* =========================================================================
   REEL 125 "AUTO" — OBJECT CONCEPTS, boarded off the WINNERS, not off prose.

   ⛔ The five concepts before these were invented from descriptions, which
   [[animation-concepts-need-a-real-artifact]] scores at 0 for 11. Alex:
   "these concepts are not good … way too boring hooks … horrible." Correct.

   ⭐ THE ARTIFACT I SHOULD HAVE STARTED FROM — his own top five, first 3s:
       ROAST  216k  a lightbulb tied over a bonfire, burned at the stake
       AGENCY 130k  a sealed shutter rolling up on a building
       OX     111k  an actual ox at a fuel pump with a $0 tag
       GO      77k  a battery draining overhead until he dies behind bars
       FLOW    70k  a giant cassette tape, tiny Claudes bench-pressing on it
   Every one is a WEIRD CONCRETE OBJECT with the mascot in a PREDICAMENT, and
   the object is barely related to the topic — an ox is not about free credits.
   A queue of cards, an office of desks and a city of windows are DIAGRAMS OF
   THE CLAIM, which is why all three read as boring.
   ========================================================================= */

const KRAFT = "#C08A4E", KRAFT_D = "#8E6234", KRAFT_L = "#D9A467", KRAFT_XL = "#E8BC85";

/* ⛔⛔ CRAFT PASS. Native-res side-by-side against ROAST (216k) and FLOW (70k):
   theirs are built from MANY PARTS with a warm key + rim light, a TEXTURED
   ground, and a CAST of 3-5 characters with faces. Mine was a 4-path box, one
   flat grey L, a gradient floor and one mascot — a diagram of a box.
     ROAST : brick courses · torch spears · layered flame · floor glow ring · 5 faces
     FLOW  : sprocket strips · reel spokes · knurled bar · collars · 3 faces, sweat
   Everything below exists to close that gap. */

/* a warehouse that is actually a place: corrugation, rails, racking, haze */
const Warehouse: React.FC<{ f: number; z?: number }> = ({ f, z = 3 }) => (
  <svg width={1012} height={792} viewBox="0 0 1012 792"
       style={{ position: "absolute", inset: 0, zIndex: z }}>
    <defs>
      <linearGradient id="whWall" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#131C26" /><stop offset="1" stopColor="#0A1017" />
      </linearGradient>
      <radialGradient id="whKey" cx="0.5" cy="0.42" r="0.62">
        <stop offset="0" stopColor="#2A3B4C" stopOpacity="0.85" />
        <stop offset="1" stopColor="#0A1017" stopOpacity="0" />
      </radialGradient>
    </defs>
    <rect width={1012} height={792} fill="url(#whWall)" />
    <rect width={1012} height={792} fill="url(#whKey)" />
    {/* corrugated shutter behind */}
    {Array.from({ length: 34 }, (_, i) => (
      <rect key={i} x={i * 30} y={70} width={13} height={400} fill="#182430" opacity={0.85} />
    ))}
    {/* racking uprights + beams */}
    {[70, 470, 860].map((x) => (
      <g key={x}>
        <rect x={x} y={40} width={16} height={430} fill="#1E2B38" />
        <rect x={x - 2} y={40} width={4} height={430} fill="#2A3A49" />
      </g>
    ))}
    {[150, 260, 370].map((y) => (
      <rect key={y} x={60} y={y} width={816} height={11} fill="#1B2734" />
    ))}
    {/* crates on the racks, staggered, dim */}
    {Array.from({ length: 14 }, (_, i) => {
      const row = i % 3, col = Math.floor(i / 3);
      return <rect key={i} x={92 + col * 168 + (row % 2) * 22} y={100 + row * 110}
        width={104} height={48} rx={4} fill="#243341" opacity={0.9} />;
    })}
    {/* floor + its sheen */}
    <rect x={0} y={470} width={1012} height={322} fill="#0C131B" />
    <rect x={0} y={470} width={1012} height={4} fill="#31414F" />
    <ellipse cx={506} cy={620} rx={430} ry={86} fill="#16202B" opacity={0.75} />
  </svg>
);

/* the work lamp. A warm key over the box, its cone, and the pool it throws —
   this is the single biggest difference between my frames and ROAST/FLOW. */
const WorkLamp: React.FC<{ f: number; z?: number }> = ({ f, z = 6 }) => {
  const flick = 0.94 + Math.sin(f / 17) * 0.03 + Math.sin(f / 5.5) * 0.015;
  return (
    <svg width={1012} height={792} viewBox="0 0 1012 792"
         style={{ position: "absolute", inset: 0, zIndex: z }}>
      <defs>
        <linearGradient id="cone" x1="0.5" y1="0" x2="0.5" y2="1">
          <stop offset="0" stopColor="#FFCE7A" stopOpacity={0.55 * flick} />
          <stop offset="0.62" stopColor="#FFB35C" stopOpacity={0.22 * flick} />
          <stop offset="1" stopColor="#FF9E42" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="pool" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#FFB35C" stopOpacity={0.42 * flick} />
          <stop offset="1" stopColor="#FFB35C" stopOpacity="0" />
        </radialGradient>
      </defs>
      <path d="M470 4 L546 4 L560 30 L456 30 Z" fill="#2B3641" />
      <path d="M456 30 L560 30 L800 560 L216 560 Z" fill="url(#cone)" style={{ mixBlendMode: "screen" }} />
      <ellipse cx={508} cy={556} rx={330} ry={96} fill="url(#pool)" />
      <rect x={496} y={0} width={24} height={8} fill="#1C242D" />
    </svg>
  );
};

/* ── the flatpack carton. Real faces, a taped seam, a printed panel. ── */
const FlatBox: React.FC<{ x: number; y: number; s?: number; open?: number; tear?: number; z?: number }> =
  ({ x, y, s = 1, open = 0, tear = 0, z = 20 }) => (
  <svg width={560 * s} height={400 * s} viewBox="0 0 560 400"
       style={{ position: "absolute", left: x, top: y, zIndex: z,
         filter: "drop-shadow(0 20px 22px rgba(0,0,0,0.75))" }}>
    <defs>
      <linearGradient id="kL" x1="0" y1="0" x2="1" y2="0.4">
        <stop offset="0" stopColor={KRAFT_XL} /><stop offset="1" stopColor={KRAFT} />
      </linearGradient>
      <linearGradient id="kR" x1="0" y1="0" x2="1" y2="0.3">
        <stop offset="0" stopColor={KRAFT} /><stop offset="1" stopColor={KRAFT_D} />
      </linearGradient>
      <linearGradient id="kIn" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#6B4622" /><stop offset="1" stopColor="#3A2612" />
      </linearGradient>
    </defs>
    {/* the inside, revealed as the flaps lift */}
    <path d="M80 110 L280 54 L480 110 L280 168 Z" fill="url(#kIn)" />
    {/* ⛔ FOUR FLAPS, EACH ON ITS OWN HINGE. The first build rotated both top
       flaps about the SAME point (280,82) — the centre of the top face — so
       they swung across each other and met in a peak. That inverted-V is what
       read as "the box folding IN". A real flap hinges on its own outer edge
       and falls OUTWARD, away from the box centre. Each pivot below is the
       midpoint of the edge that flap is attached to.
       Top face is the rhombus (80,110)(280,54)(480,110)(280,168):
         back-left  edge mid (180, 82)   back-right edge mid (380, 82)
         front-left edge mid (180,139)   front-right edge mid (380,139)     */}
    <g transform={`rotate(${-open * 128} 180 82)`}>
      <path d="M80 110 L280 54 L280 112 L80 168 Z" fill="url(#kL)" />
      <path d="M96 116 L272 66 L272 78 L100 128 Z" fill={KRAFT_D} opacity={0.4} />
    </g>
    <g transform={`rotate(${open * 128} 380 82)`}>
      <path d="M480 110 L280 54 L280 112 L480 168 Z" fill={KRAFT} />
      <path d="M464 116 L288 66 L288 78 L460 128 Z" fill={KRAFT_D} opacity={0.3} />
    </g>
    <g transform={`rotate(${open * 104} 380 139)`}>
      <path d="M480 110 L280 168 L280 112 L480 56 Z" fill={KRAFT_L} opacity={0.95} />
    </g>
    <g transform={`rotate(${-open * 104} 180 139)`}>
      <path d="M80 110 L280 168 L280 112 L80 56 Z" fill={KRAFT_XL} opacity={0.9} />
    </g>
    {/* body: two lit faces + a rim */}
    <path d="M80 110 L280 168 L280 330 L80 272 Z" fill="url(#kR)" />
    <path d="M480 110 L280 168 L280 330 L480 272 Z" fill="url(#kL)" />
    <path d="M278 168 L282 168 L282 330 L278 330 Z" fill="#E4D7BE" opacity={0.55} />
    {tear > 0.01 && (<>
      <path d={`M272 ${172 + (1 - tear) * 90} L288 ${172 + (1 - tear) * 90} L284 176 L276 176 Z`}
            fill="#4A2F14" opacity={0.9} />
      {[0, 1, 2, 3, 4].map((i) => (
        <path key={i} d={`M${276 - (i % 2 ? 5 : 0)} ${178 + i * 9} l${i % 2 ? 12 : -11} ${5 + i}`}
              stroke="#E4D7BE" strokeWidth={3} fill="none"
              opacity={Math.max(0, Math.min(1, tear * 5 - i * 0.8))} />
      ))}
    </>)}
    <path d="M80 110 L280 168 L280 176 L80 118 Z" fill={KRAFT_XL} opacity={0.85} />
    <path d="M480 110 L280 168 L280 176 L480 118 Z" fill="#F0CFA0" opacity={0.6} />
    <path d="M480 110 L480 272 L472 268 L472 114 Z" fill="#FFD79A" opacity={0.55} />
    <path d="M80 110 L80 272 L88 268 L88 114 Z" fill="#FFC178" opacity={0.28} />
    {/* stencilled on the crate, so the tools are readable before the label is */}
    <g transform="translate(96 190) skewY(15.7)" opacity={0.82}>
      <text x={0} y={0} fontFamily={inter.fontFamily} fontWeight={900} fontSize={30}
            letterSpacing="3" fill="#5A3A18">n8n</text>
      <text x={0} y={34} fontFamily={inter.fontFamily} fontWeight={900} fontSize={16}
            letterSpacing="2" fill="#5A3A18">350 WORKFLOWS</text>
      <rect x={0} y={50} width={160} height={4} fill="#5A3A18" />
    </g>
    {/* strapping + corner scuffs so it is a used box, not a shape */}
    <path d="M120 128 L120 288 M440 128 L440 288" stroke="#7A5228" strokeWidth={5} opacity={0.55} />
    <path d="M84 258 L120 268 L84 272 Z" fill="#7A5228" opacity={0.7} />
    <path d="M476 258 L440 268 L476 272 Z" fill="#7A5228" opacity={0.5} />
  </svg>
);

/* ── an assembled machine that walks out of it. Compound: chassis, legs,
      a screen carrying a REAL mark, an antenna. Not a rounded rect. ── */
const WalkBot: React.FC<{ f: number; x: number; y: number; s?: number; slug: string; z?: number }> =
  ({ f, x, y, s = 1, slug, z = 30 }) => {
  const g = Math.sin(f / 4.2), h = Math.abs(Math.cos(f / 4.2)) * 4;
  return (
    <div style={{ position: "absolute", left: x, top: y - h * s, zIndex: z }}>
      <svg width={132 * s} height={150 * s} viewBox="0 0 132 150"
           style={{ filter: "drop-shadow(0 7px 8px rgba(0,0,0,0.6))" }}>
        <path d={`M40 118 L${40 + g * 13} 148`} stroke="#2C3742" strokeWidth={11} strokeLinecap="round" />
        <path d={`M92 118 L${92 - g * 13} 148`} stroke="#2C3742" strokeWidth={11} strokeLinecap="round" />
        <path d="M22 44h88a12 12 0 0 1 12 12v54a12 12 0 0 1-12 12H22a12 12 0 0 1-12-12V56a12 12 0 0 1 12-12z"
              fill="#E8E2D6" stroke="#2C3742" strokeWidth={4} />
        <path d="M66 44 L66 22" stroke="#2C3742" strokeWidth={5} strokeLinecap="round" />
        <circle cx={66} cy={16} r={8} fill={GO} />
        <rect x={24} y={100} width={84} height={7} rx={3.5} fill="#B9B2A2" />
      </svg>
      <Img src={staticFile(`logos/${slug}`)}
           style={{ position: "absolute", left: 40 * s, top: 56 * s, width: 52 * s, height: 52 * s,
             objectFit: "contain", display: "block" }} />
    </div>
  );
};

const HexKey: React.FC<{ x: number; y: number; s?: number; rot?: number; z?: number }> =
  ({ x, y, s = 1, rot = 0, z = 50 }) => (
  <svg width={96 * s} height={110 * s} viewBox="0 0 96 110"
       style={{ position: "absolute", left: x, top: y, zIndex: z,
         transform: `rotate(${rot}deg)`, filter: "drop-shadow(0 4px 5px rgba(0,0,0,0.7))" }}>
    <path d="M18 12h14v72a8 8 0 0 0 8 8h44v14H40a22 22 0 0 1-22-22z" fill="#9AA7B4" />
    <path d="M18 12h14v20H18z" fill="#C3CDD8" />
  </svg>
);

/* the repo card, skewed onto the crate's lit face. This is the frame-0 signal:
   an automation person reads "n8n" and a live star count before the VO says a
   word. Modelled directly on FLOW's cassette card. */
const RepoLabel: React.FC<{ x: number; y: number; s?: number; z?: number }> =
  ({ x, y, s = 1, z = 34 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: 248 * s, zIndex: z,
    transform: `skewY(-15.7deg)`, transformOrigin: "0 0" }}>
    <div style={{ background: "#F5F1E7", borderRadius: 9 * s, padding: `${11 * s}px ${13 * s}px`,
      boxShadow: "0 6px 10px rgba(0,0,0,0.45)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 * s }}>
        <Img src={staticFile("logos/github.svg")}
             style={{ width: 26 * s, height: 26 * s, objectFit: "contain", display: "block" }} />
        <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 15 * s,
          color: INKD, letterSpacing: "-0.01em", whiteSpace: "nowrap" }}>
          awesome-n8n-templates</div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8 * s, marginTop: 8 * s }}>
        <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 19 * s,
          color: "#C9922E" }}>★</span>
        <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 19 * s,
          color: INKD }}>25,023</span>
        <span style={{ marginLeft: "auto", background: "#2E7D5B", color: "#EAFBF3",
          borderRadius: 999, padding: `${3 * s}px ${9 * s}px`, fontFamily: inter.fontFamily,
          fontWeight: 900, fontSize: 11 * s, letterSpacing: "0.08em" }}>FREE</span>
      </div>
      {/* the tools, at frame 0, so the right person recognises their own stack */}
      <div style={{ display: "flex", gap: 7 * s, marginTop: 10 * s }}>
        {["n8n.svg", "gmail.svg", "slack.svg", "notion.svg", "telegram.svg"].map((sl) => (
          <Img key={sl} src={staticFile(`logos/${sl}`)}
               style={{ width: 22 * s, height: 22 * s, objectFit: "contain", display: "block" }} />
        ))}
      </div>
    </div>
  </div>
);

const Ground: React.FC<{ f: number }> = ({ f }) => (<>
  <Warehouse f={f} z={2} />
  <Wedges f={f} z={4} /><Satellites f={f} n={5} z={5} />
  <WorkLamp f={f} z={6} />
  {/* the whole panel sits IN the light, the way ROAST's does. Without this the
      lamp is a grey cone drawn on a cold room instead of a source. */}
  <div style={{ position: "absolute", inset: 0, zIndex: 7, pointerEvents: "none",
    background: "radial-gradient(ellipse at 52% 46%, rgba(255,176,88,0.30), rgba(255,140,60,0.10) 52%, rgba(10,16,22,0) 78%)",
    mixBlendMode: "screen" }} />
  <div style={{ position: "absolute", inset: 0, zIndex: 8, pointerEvents: "none",
    background: "radial-gradient(ellipse at 50% 42%, rgba(0,0,0,0) 44%, rgba(4,7,11,0.72) 100%)" }} />
</>);

/* the light that comes out of a box that should contain flat panels */
const Shaft: React.FC<{ f: number; x: number; y: number; k: number; z?: number }> =
  ({ f, x, y, k, z = 26 }) => {
  if (k <= 0.02) return null;
  return (<>
    <svg width={520} height={420} viewBox="0 0 520 420"
         style={{ position: "absolute", left: x, top: y, zIndex: z, mixBlendMode: "screen" }}>
      <defs>
        <linearGradient id="shf" x1="0.5" y1="1" x2="0.5" y2="0">
          <stop offset="0" stopColor="#FFD98A" stopOpacity={0.85 * k} />
          <stop offset="1" stopColor="#FFB35C" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`M210 400 L310 400 L${420 - k * 60} 40 L${100 + k * 60} 40 Z`} fill="url(#shf)" />
    </svg>
    {Array.from({ length: 12 }, (_, i) => {
      const u = ((f * 1.6 + i * 31) % 190) / 190;
      return <div key={i} style={{ position: "absolute", left: x + 176 + Math.sin(i * 2.1) * 96,
        top: y + 396 - u * 330, width: 5, height: 5, borderRadius: "50%",
        background: "#EAFBF3", opacity: (1 - u) * 0.75 * k, zIndex: z + 1 }} />;
    })}
  </>);
};

const Count: React.FC<{ f: number; label: string }> = ({ f, label }) => (
  <div style={{ position: "absolute", left: 300, top: 556, width: 420, height: 106,
    borderRadius: 16, background: "#0B1017", border: `5px solid ${A3}`, zIndex: 62,
    display: "flex", alignItems: "center", justifyContent: "center", gap: 14,
    transform: `scale(${E(f, C1 + 8, C1 + 18, 0.4, 1, BACK)})` }}>
    <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 62, color: A1 }}>
      {Math.round(280 * lin(f, C1 + 8, VAR_LEN - 4))}</span>
    <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 18,
      letterSpacing: "0.16em", color: A3 }}>{label}</span>
  </div>
);

/* ══ A · THE FLATPACK ══════════════════════════════════════════════════════
   He braces for flat panels and an instruction sheet. The hex key in his hand
   IS the joke. L3: the lid cracks at 0.93s and is STILL opening at the cut.  */
export const AutoObjFlatpack: React.FC = () => {
  const f = useCurrentFrame();
  const land = Math.sin(Math.max(0, 10 - f) / 10 * Math.PI) * -14;   // settled, just settling
  const crack = lin(f, 28, C1, 0, 0.34);              // TRIGGER -> TRAVEL, no arrival
  /* something inside shoves the lid before anything opens — the BEFORE beat,
     and it keeps the crate alive between events */
  const PUSH = [10, 24, 38, 50];                       // four shoves across the shot
  const shove = PUSH.reduce((a, p) => {
    const k = f - p;
    return k >= 0 && k < 11 ? Math.max(a, Math.sin((k / 11) * Math.PI)) : a;
  }, 0);
  const rock = Math.sin(f / 9) * 0.8 + shove * 3.2;
  const strain = crack + shove * 0.20;                 // the flaps spring on each push
  const tear = Math.min(1, PUSH.filter((p) => f >= p).length / PUSH.length + crack);
  return (
    <AbsoluteFill>
      <Bg /><ProgressBar />
      <HookHeader f={f + 12} big="280 AUTOMATIONS, FREE" hot="ONE GITHUB REPO" />
      <Panel glow={hexA(RED, 0.3)}>
        <Shot f={f} a={0} b={C1} k={0} len={VAR_LEN}>
          <Ground f={f} />
          <div style={{ position: "absolute", left: 0, top: land, zIndex: 20 }}>
            <div style={{ position: "absolute", left: 300, top: 496, width: 430, height: 46,
              borderRadius: "50%", background: "#04070B", opacity: 0.62, zIndex: 12 }} />
            <div style={{ transform: `rotate(${rock * 0.5}deg) translateY(${-shove * 9}px)`,
              transformOrigin: "506px 520px" }}>
              <FlatBox x={262} y={196} s={1.02} open={strain} tear={tear} z={20} />
              <RepoLabel x={540} y={392} s={0.94} z={34} />
            </div>
          </div>
          <Shaft f={f} x={250} y={104} k={crack * 2.6} z={26} />
          {/* A CAST, not one mascot — ROAST runs five, FLOW three */}
          <Dev f={f} x={38} y={362} size={200} gaze={2} shock={crack > 0.02 ? 0.95 : 0.25}
               nodAmp={2.6} nodSpeed={crack > 0.02 ? 17 : 8} z={42} />
          {/* crouched at the seam, closest to whatever is coming out */}
          <Dev f={f + 40} x={228} y={452} size={124} gaze={1} shock={crack > 0.02 ? 0.8 : 0.15}
               nodAmp={2.2} nodSpeed={13} z={44} />
          {/* peering OVER the box — behind it, so the box occludes his legs */}
          <Dev f={f + 77} x={604} y={196} size={116} gaze={0} shock={crack > 0.02 ? 0.7 : 0.1}
               nodAmp={1.5} nodSpeed={9} z={14} />
          {/* hanging back by the sheet */}
          <Dev f={f + 23} x={838} y={470} size={104} gaze={2} cheer={0.2}
               nodAmp={1.2} nodSpeed={7} z={30} />
          <HexKey x={206} y={404} s={1.05} rot={-14 + Math.sin(f / 7) * 5} z={46} />
          {/* the instruction sheet he will not need */}
          <div style={{ position: "absolute", left: 726, top: 528, width: 118, height: 150,
            borderRadius: 5, background: "#E7E1D4", zIndex: 30,
            transform: `rotate(${8 + Math.sin(f / 26) * 2}deg)`,
            boxShadow: "0 7px 10px rgba(0,0,0,0.6)" }}>
            {Array.from({ length: 7 }, (_, i) => (
              <div key={i} style={{ position: "absolute", left: 14, top: 20 + i * 17,
                width: i % 2 ? 62 : 88, height: 5, borderRadius: 2.5, background: "#B8B1A1" }} />
            ))}
          </div>
          <AChip y={706} text="EVERY MORNING. BY HAND." c={RED} size={30} />
        </Shot>

        <Shot f={f} a={C1} b={9999} k={1} len={VAR_LEN}>
          <Ground f={f} />
          <FlatBox x={286} y={214} s={0.9} open={1} z={16} />
          {[0, 1, 2, 3, 4].map((i) => {
            const u = lin(f, C1 + 3 + i * 7, C1 + 34 + i * 7);
            if (u <= 0) return null;
            const b = BRAND_TASKS[(i * 2) % BRAND_TASKS.length];
            return <WalkBot key={i} f={f + i * 9} x={470 - u * (150 + i * 105)}
                            y={392 + i * 9} s={0.94 - i * 0.06} slug={b.slug} z={34 - i} />;
          })}
          {/* and it is not one box */}
          {[0, 1, 2, 3].map((i) => (
            <React.Fragment key={i}>
              <div style={{ position: "absolute", left: 12 + i * 300, top: 296 - i * 12,
                width: 190, height: 26, borderRadius: "50%", background: "#05080C",
                opacity: 0.55, zIndex: 7 }} />
              <FlatBox x={-40 + i * 300} y={150 - i * 12} s={0.42}
                       open={lin(f, C1 + 10 + i * 5, C1 + 26 + i * 5)} z={8} />
            </React.Fragment>
          ))}
          <Dev f={f} x={54} y={470} size={182} gaze={1} cheer={0.95} nodAmp={3.2} nodSpeed={10} z={50} />
          <Count f={f} label="ALREADY BUILT" />
          <AChip y={706} text="NOBODY BUILT THESE" c={GO} size={32} />
        </Shot>
        <Flash f={f} cuts={[C1]} /><Shutter f={f} />
      </Panel>
      <Audio src={staticFile("auto85_vo_v2.wav")} />
    </AbsoluteFill>
  );
};

/* ══ B · THE PIÑATA ════════════════════════════════════════════════════════
   L3 is the swing: the bat starts at 0.93s and is mid-arc at the cut. It
   never connects on screen — the shutter takes it.                          */
export const AutoObjPinata: React.FC = () => {
  const f = useCurrentFrame();
  const sway = Math.sin(f / 21) * 5;
  const swing = lin(f, 28, C1, 0, 0.72);
  return (
    <AbsoluteFill>
      <Bg /><ProgressBar />
      <HookHeader f={f + 12} big="280 AUTOMATIONS, FREE" hot="ONE GITHUB REPO" />
      <Panel glow={hexA(RED, 0.3)}>
        <Shot f={f} a={0} b={C1} k={0} len={VAR_LEN}>
          <Ground f={f} />
          <div style={{ position: "absolute", left: 470, top: 40, width: 5, height: 190,
            background: "#3A4552", zIndex: 14, transformOrigin: "50% 0%",
            transform: `rotate(${sway}deg)` }} />
          <div style={{ position: "absolute", left: 300, top: 214, zIndex: 20,
            transformOrigin: "50% -70%", transform: `rotate(${sway}deg)` }}>
            <svg width={356} height={286} viewBox="0 0 356 286"
                 style={{ filter: "drop-shadow(0 16px 18px rgba(0,0,0,0.7))" }}>
              <path d="M178 8 L286 62 L330 174 L246 268 L110 268 L26 174 L70 62 Z" fill="#C8674F" />
              <path d="M178 8 L286 62 L246 132 L110 132 L70 62 Z" fill="#DE8163" />
              {[0,1,2,3,4,5,6,7].map((i)=>(
                <path key={i} d={`M${34+i*40} 268 l10 20 l10 -20`} fill="#E4B45C" />
              ))}
              <text x={178} y={186} textAnchor="middle" fontFamily={inter.fontFamily}
                    fontWeight={900} fontSize={86} fill="#F3EEE3">350</text>
            </svg>
          </div>
          {/* the swing — mid-arc when the shutter takes it */}
          <div style={{ position: "absolute", left: 176, top: 486, zIndex: 46,
            transformOrigin: "14% 86%", transform: `rotate(${-96 + swing * 96}deg)` }}>
            <svg width={230} height={64} viewBox="0 0 230 64">
              <path d="M8 30a14 14 0 0 1 14-14h30v28H22A14 14 0 0 1 8 30z" fill="#3A4552" />
              <path d="M52 12h132a20 20 0 0 1 20 20 20 20 0 0 1-20 20H52z" fill={KRAFT} />
              <path d="M52 12h132a20 20 0 0 1 20 20H52z" fill={KRAFT_L} />
            </svg>
          </div>
          <Dev f={f} x={92} y={444} size={200} gaze={2} shock={swing > 0.05 ? 0.8 : 0.3}
               nodAmp={2.6} nodSpeed={14} z={40} />
          <AChip y={706} text="EVERY MORNING. BY HAND." c={RED} size={30} />
        </Shot>

        <Shot f={f} a={C1} b={9999} k={2} len={VAR_LEN}>
          <Ground f={f} />
          <div style={{ position: "absolute", left: 300, top: 168, zIndex: 16, opacity: 0.9 }}>
            <svg width={356} height={200} viewBox="0 0 356 200">
              <path d="M178 8 L286 62 L300 130 L200 96 L120 130 L70 62 Z" fill="#C8674F" />
            </svg>
          </div>
          {/* they pour out and bury him */}
          {Array.from({ length: 14 }, (_, i) => {
            const born = C1 + 1 + i * 2.6;
            const u = lin(f, born, born + 30);
            if (u <= 0) return null;
            const b = BRAND_TASKS[i % BRAND_TASKS.length];
            const x = 300 + Math.sin(i * 2.3) * 300;
            return <WalkBot key={i} f={f + i * 7} x={x + (i % 2 ? 1 : -1) * u * 70}
                            y={190 + u * (330 + (i % 4) * 42)} s={0.5 + (i % 3) * 0.08}
                            slug={b.slug} z={30 + i} />;
          })}
          <Dev f={f} x={92} y={470} size={196} gaze={2} shock={0.9} nodAmp={3.4} nodSpeed={16} z={26} />
          <Count f={f} label="POURED OUT" />
          <AChip y={706} text="NOBODY BUILT THESE" c={GO} size={32} />
        </Shot>
        <Flash f={f} cuts={[C1]} /><Shutter f={f} />
      </Panel>
      <Audio src={staticFile("auto85_vo_v2.wav")} />
    </AbsoluteFill>
  );
};
