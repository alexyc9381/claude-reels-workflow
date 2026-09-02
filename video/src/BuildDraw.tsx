import React from "react";
import { Img, staticFile } from "remotion";
import {
  E, OUT, IO, BACK, IN_Q, LIN, hexa, dkh, mxh, rnd, SH, SH_D, mono, ui, Crew,
  CLAY, GOLD, GREEN, RED, PAPER, CREAMB, INK, TEAL, STEEL, BRASS, SODIUM,
  VIOLET, EMBER, OXIDE, SLATE, COPPER, BONE, R,
} from "./BuildWorld";

/* ===========================================================================
   REEL 133 · "BUILD" — THE DRAWN OBJECTS.

   ⛔⛔⛔ WHY THIS FILE EXISTS. Alex on rev 2: *"each of the scenes are not good
   whatsoever, these scenes are just too much relying on shapes and the
   animations are not good, needs to be redone significantly."*

   He is right and it is COUNTABLE. Measured across `BuildProps.tsx`:

       4 of 35 props used ANY inline <svg>.  The other 31 are stacked divs.
       median drawn elements per prop: 6.
       the hero objects: RepoPlate 6 · ShortScreen 9 · VoiceBank 6 · MeshTurn 8

   `feedback_props_need_real_drawing`: reel 106 got the identical note
   (*"everything just reads as a whole lot of nothing even though there's more
   stuff"*) and cleared it by taking ONE object from 4 elements to ~22. A
   rounded rect with a logo on it is a STICKER, however real the logo is.

   ⭐ THE THREE MOVES, IN THE VALUE ORDER THAT MEMORY GIVES:
     1 A VISIBLE THIRD FACE — front + a top lip in a lighter tone is a SOLID;
       a front rect alone is a sticker. Cheapest gain available.
     2 FINE REPEATED DETAIL AT THE EDGE OF RESOLUTION — grille slots, sprocket
       holes, key rows, ruling. It survives the downsample as TEXTURE even when
       no single line does, and it is what reads as craft.
     3 SILHOUETTE VARIETY — and at least one CURVED object among the rectangles.

   ⛔ THE SILHOUETTE TEST governs every object here: flat black on white, is it
   nameable from the outline alone? A typewriter, a studio mic, a film strip, a
   tape deck and a chair all pass. An "AI video machine" never could, which is
   why rev 1's invented machines had to go.

   ⛔ ONE LIGHT DIRECTION, UPPER-LEFT, on every object in this file.
   ========================================================================= */

const LI = (c: string, k = 0.26) => mxh(c, k);      /* the lit face  */
const SH_ = (c: string, k = 0.30) => dkh(c, k);     /* the shade     */
const ED = hexa("#000", 0.52);                      /* the contour   */

/* =========================================================================
   1 · THE TYPEWRITER — "it writes a script"
   Nameable from its outline: a sloped key basket, a round platen, a sheet
   standing up out of it. 30+ drawn elements, and the KEYS ARE INDIVIDUAL so
   the eye is rewarded for looking closer.
   ====================================================================== */
export const Typewriter: React.FC<{ x: number; y: number; s?: number; f: number;
  hit?: number; page?: number; z?: number }> =
  ({ x, y, s = 1, f, hit = 0, page = 0, z = 60 }) => {
  const W0 = 300 * s, H0 = 210 * s;
  const strike = Math.max(0, Math.sin(f / 3.2)) * hit;   /* which bar is up */
  return (
    <div style={{ position: "absolute", left: x - W0 / 2, top: y - H0, width: W0,
      height: H0 + 200 * s, zIndex: z }}>
      {/* the sheet, feeding UP and curling over — drawn before the body so the
          platen overlaps it, which is how a real one reads */}
      {page > 0 && (
        <svg width={150 * s} height={200 * s} viewBox="0 0 150 200"
          style={{ position: "absolute", left: 74 * s, top: -112 * s + (1 - page) * 120 * s }}>
          <path d="M8 196 L8 40 Q8 8 42 10 L136 16 Q146 17 144 30 L136 196 Z"
            fill={PAPER} stroke={ED} strokeWidth="3" />
          {Array.from({ length: 9 }, (_, i) => (
            <rect key={"rl" + i} x={20} y={44 + i * 16} width={i % 3 === 2 ? 62 : 104}
              height="4" rx="2" fill={hexa("#2A241C", 0.34)} />
          ))}
          <path d="M8 40 Q8 8 42 10 L46 26 Q16 26 18 46 Z" fill={hexa("#000", 0.10)} />
        </svg>
      )}
      {/* the platen — one CURVED object among the rectangles */}
      <svg width={W0} height={H0} viewBox="0 0 300 210" style={{ position: "absolute", left: 0, top: 0 }}>
        {/* body: front face, top lip (the THIRD FACE), and a side cheek */}
        <path d="M24 200 L14 118 Q12 104 28 104 L272 104 Q288 104 286 118 L276 200 Z"
          fill={SH_(STEEL, 0.34)} stroke={ED} strokeWidth="4" />
        <path d="M28 104 L272 104 L262 84 L38 84 Z" fill={LI(STEEL, 0.16)} stroke={ED} strokeWidth="4" />
        {/* the platen roller + its knobs */}
        <rect x="46" y="52" width="208" height="34" rx="17" fill={SH_(INK, -0.22)} stroke={ED} strokeWidth="4" />
        <rect x="52" y="58" width="196" height="9" rx="4" fill={hexa("#FFFFFF", 0.16)} />
        {[38, 250].map((cx, i) => (
          <g key={"kn" + i}>
            <circle cx={cx + (i ? 12 : 0)} cy="69" r="20" fill={SH_(BRASS, 0.14)} stroke={ED} strokeWidth="4" />
            <circle cx={cx + (i ? 12 : 0)} cy="69" r="7" fill={SH_(BRASS, 0.4)} />
          </g>
        ))}
        {/* the paper bail */}
        <path d="M60 92 L240 92" stroke={SH_(STEEL, 0.5)} strokeWidth="5" strokeLinecap="round" />
        {/* ⭐ THE TYPE BARS — the one that is UP is the one being struck */}
        {Array.from({ length: 9 }, (_, i) => {
          const up = strike > 0.5 && i === Math.floor(f / 4) % 9;
          return (
            <path key={"tb" + i}
              d={`M${86 + i * 16} 108 L${140 + (i - 4) * 4} ${up ? 66 : 96}`}
              stroke={SH_(STEEL, 0.46)} strokeWidth="4" strokeLinecap="round" />
          );
        })}
        {/* ⭐ FINE REPEATED DETAIL: three rows of INDIVIDUAL round keys */}
        {Array.from({ length: 24 }, (_, i) => {
          const r0 = Math.floor(i / 8), c0 = i % 8;
          const kx = 58 + c0 * 26 + r0 * 8, ky = 130 + r0 * 22;
          const down = strike > 0.5 && i === Math.floor(f / 4) % 24;
          return (
            <g key={"k" + i}>
              <circle cx={kx} cy={ky + (down ? 4 : 0)} r="10" fill={LI(CREAMB, 0.04)}
                stroke={ED} strokeWidth="3" />
              <circle cx={kx} cy={ky + (down ? 4 : 0) - 2} r="6" fill={hexa("#FFFFFF", 0.5)} />
            </g>
          );
        })}
        {/* ribbon spools, and the maker's badge — where the mark goes */}
        {[54, 246].map((cx, i) => (
          <circle key={"sp" + i} cx={cx} cy="112" r="13" fill={SH_(OXIDE, 0.2)}
            stroke={ED} strokeWidth="3" />
        ))}
        <rect x="118" y="176" width="64" height="16" rx="4" fill={SH_(BRASS, 0.1)} stroke={ED} strokeWidth="3" />
        {/* four feet, so it SITS */}
        {[34, 96, 204, 266].map((fx, i) => (
          <rect key={"ft" + i} x={fx} y="196" width="16" height="10" rx="3" fill={SH_(INK, -0.1)} />
        ))}
      </svg>
    </div>
  );
};

/* =========================================================================
   2 · THE STUDIO MICROPHONE — "records the voiceover"
   The single most recognisable object in audio: a ribbon body in a shock mount
   with a circular pop shield. 28 drawn elements.
   ====================================================================== */
export const StudioMic: React.FC<{ x: number; y: number; s?: number; f: number;
  live?: number; z?: number }> = ({ x, y, s = 1, f, live = 0, z = 60 }) => {
  const bob = Math.sin(f / 9) * 2 * live;
  return (
    <svg width={230 * s} height={300 * s} viewBox="0 0 230 300"
      style={{ position: "absolute", left: x - 115 * s, top: y - 300 * s, zIndex: z }}>
      {/* the boom arm coming in from off-frame */}
      <path d="M228 22 L150 42" stroke={SH_(STEEL, 0.5)} strokeWidth="12" strokeLinecap="round" />
      <circle cx="150" cy="42" r="10" fill={SH_(STEEL, 0.3)} stroke={ED} strokeWidth="3" />
      {/* the shock mount: a ring and SIX suspension cords — fine detail */}
      <ellipse cx="112" cy={150 + bob} rx="78" ry="86" fill="none" stroke={SH_(STEEL, 0.4)} strokeWidth="7" />
      {Array.from({ length: 6 }, (_, i) => {
        const a = (i / 6) * Math.PI * 2 + 0.5;
        return (
          <path key={"cd" + i}
            d={`M${112 + Math.cos(a) * 78} ${150 + bob + Math.sin(a) * 86}
                L${112 + Math.cos(a) * 40} ${150 + bob + Math.sin(a) * 44}`}
            stroke={SH_(BONE, 0.24)} strokeWidth="4" />
        );
      })}
      <path d={`M112 64 L150 46`} stroke={SH_(STEEL, 0.4)} strokeWidth="7" />
      {/* the mic body: a lozenge with a third face down its left edge */}
      <rect x="80" y={96 + bob} width="64" height="112" rx="30" fill={SH_(SLATE, 0.18)}
        stroke={ED} strokeWidth="4" />
      <rect x="80" y={96 + bob} width="20" height="112" rx="10" fill={LI(SLATE, 0.20)} />
      {/* ⭐ THE GRILLE — sixteen slots, the detail that says "microphone" */}
      {Array.from({ length: 8 }, (_, i) => (
        <rect key={"gr" + i} x="88" y={110 + bob + i * 11} width="48" height="5" rx="2.5"
          fill={hexa("#000", 0.44)} />
      ))}
      <rect x="88" y={110 + bob} width="48" height="5" rx="2.5" fill={hexa("#FFFFFF", 0.28)} />
      {/* the live lamp on its face */}
      <circle cx="112" cy={192 + bob} r="8" fill={live > 0.5 ? RED : SH_(SLATE, 0.4)}
        stroke={ED} strokeWidth="2" />
      {/* ⭐ THE POP SHIELD — the curved silhouette that names the object */}
      <ellipse cx="42" cy={158 + bob} rx="34" ry="46" fill={hexa("#DCD6C8", 0.30)}
        stroke={SH_(STEEL, 0.4)} strokeWidth="5" />
      {Array.from({ length: 5 }, (_, i) => (
        <path key={"ms" + i} d={`M12 ${132 + bob + i * 13} L72 ${132 + bob + i * 13}`}
          stroke={hexa("#DCD6C8", 0.5)} strokeWidth="2" />
      ))}
      <path d={`M76 ${158 + bob} L96 ${158 + bob}`} stroke={SH_(STEEL, 0.4)} strokeWidth="6" />
      {/* the stand base, so it is not floating */}
      <rect x="104" y={208 + bob} width="16" height="60" fill={SH_(STEEL, 0.44)} />
      <ellipse cx="112" cy="272" rx="56" ry="14" fill={SH_(INK, -0.14)} stroke={ED} strokeWidth="3" />
    </svg>
  );
};

/* =========================================================================
   3 · THE FILM RUN — "edits the final video"
   A film strip is pure silhouette: sprocket holes down BOTH edges and visible
   frames between them. It is also a travelling band, which is the highest-value
   shape in the motion table, so this prop pays twice.
   ====================================================================== */
export const FilmRun: React.FC<{ y: number; f: number; rate?: number; s?: number;
  z?: number; w?: number }> = ({ y, f, rate = 5.2, s = 1, z = 40, w: ww = 1120 }) => {
  const H0 = 118 * s, FR = 96 * s;
  const off = ((f * rate) % FR + FR) % FR;
  const n = Math.ceil(ww / FR) + 2;
  return (
    <svg width={ww} height={H0} viewBox={`0 0 ${ww} ${H0}`}
      style={{ position: "absolute", left: -60, top: y, zIndex: z }}>
      <rect x="0" y="0" width={ww} height={H0} fill="#1A1610" />
      {Array.from({ length: n }, (_, i) => {
        const fx = i * FR - off;
        return (
          <g key={"fm" + i}>
            {/* the frame — a tiny picture, so the strip carries CONTENT */}
            <rect x={fx + 8} y={22 * s} width={FR - 16} height={H0 - 44 * s}
              fill={["#3E6E8E", "#6E4A72", "#8E6A3A", "#2E6E5A"][i % 4]} />
            <rect x={fx + 8} y={H0 - 46 * s} width={FR - 16} height={24 * s}
              fill={hexa("#000", 0.30)} />
            <circle cx={fx + FR / 2} cy={H0 / 2 - 4 * s} r={13 * s} fill={hexa("#F2E6C8", 0.72)} />
            {/* ⭐ SPROCKET HOLES, both edges — the detail that names it */}
            {[8 * s, H0 - 20 * s].map((hy, k) => (
              <g key={"sh" + k}>
                <rect x={fx + 12} y={hy} width={14 * s} height={12 * s} rx="2" fill="#F4EEDC" />
                <rect x={fx + FR - 26} y={hy} width={14 * s} height={12 * s} rx="2" fill="#F4EEDC" />
              </g>
            ))}
            <rect x={fx + FR - 3} y="0" width="3" height={H0} fill={hexa("#000", 0.5)} />
          </g>
        );
      })}
    </svg>
  );
};

/* =========================================================================
   4 · THE TAPE DECK — "one minute of your voice"
   Two reels, spokes, a real tape path with a capstan and a head. The reels
   TURN and the tape MOVES, so the minute is visibly being consumed.
   ====================================================================== */
export const TapeDeck: React.FC<{ x: number; y: number; s?: number; f: number;
  run?: number; z?: number }> = ({ x, y, s = 1, f, run = 0, z = 60 }) => {
  const a = f * 4.6 * (run > 0 ? 1 : 0.15);
  const Reel = ({ cx, cy, r0, dir }: { cx: number; cy: number; r0: number; dir: number }) => (
    <g>
      <circle cx={cx} cy={cy} r={r0} fill={SH_(INK, -0.16)} stroke={ED} strokeWidth="4" />
      <circle cx={cx} cy={cy} r={r0 - 10} fill={SH_(OXIDE, 0.36)} />
      <g transform={`rotate(${a * dir} ${cx} ${cy})`}>
        {Array.from({ length: 6 }, (_, i) => (
          <path key={"sk" + i}
            d={`M${cx} ${cy} L${cx + Math.cos((i / 6) * 6.283) * (r0 - 6)} ${cy + Math.sin((i / 6) * 6.283) * (r0 - 6)}`}
            stroke={SH_(BONE, 0.18)} strokeWidth="7" strokeLinecap="round" />
        ))}
        <circle cx={cx} cy={cy} r="12" fill={SH_(BRASS, 0.12)} stroke={ED} strokeWidth="3" />
      </g>
    </g>
  );
  return (
    <svg width={420 * s} height={260 * s} viewBox="0 0 420 260"
      style={{ position: "absolute", left: x - 210 * s, top: y - 260 * s, zIndex: z }}>
      {/* the deck plate: front face + top lip */}
      <path d="M10 254 L10 60 L410 60 L410 254 Z" fill={SH_(SLATE, 0.24)} stroke={ED} strokeWidth="4" />
      <path d="M10 60 L410 60 L392 40 L28 40 Z" fill={LI(SLATE, 0.18)} stroke={ED} strokeWidth="4" />
      <Reel cx={112} cy={132} r0={62} dir={1} />
      <Reel cx={306} cy={132} r0={62} dir={1} />
      {/* the tape path — over the head, round the capstan */}
      <path d="M112 70 L200 70 L200 96 L306 70" fill="none" stroke={SH_(OXIDE, 0.5)} strokeWidth="5" />
      <rect x="186" y="72" width="28" height="34" rx="4" fill={SH_(STEEL, 0.3)} stroke={ED} strokeWidth="3" />
      <circle cx="242" cy="82" r="9" fill={SH_(BRASS, 0.2)} stroke={ED} strokeWidth="3" />
      {/* ⭐ the VU meter, and its needle actually swings on the signal */}
      <rect x="150" y="188" width="120" height="52" rx="5" fill={CREAMB} stroke={ED} strokeWidth="4" />
      {Array.from({ length: 7 }, (_, i) => (
        <path key={"tk" + i} d={`M${164 + i * 15} 226 L${164 + i * 15} 218`}
          stroke={i > 4 ? RED : hexa("#2A241C", 0.5)} strokeWidth="3" />
      ))}
      <path d={`M210 236 L${210 + Math.sin(f / 3.4) * 34 * run} 202`}
        stroke={RED} strokeWidth="4" strokeLinecap="round" />
      <circle cx="210" cy="236" r="5" fill="#2A241C" />
      {/* the minute label, stencilled on the deck the way a machine carries one */}
      <text x="40" y="228" fill={hexa(BONE, 0.62)} fontSize="26" fontFamily="monospace"
        fontWeight="700" letterSpacing="2">{R.tools[1].input}</text>
    </svg>
  );
};

/* =========================================================================
   5 · THE CHAIR — "one flat photo into a real 3D model"
   ⭐ THE SILHOUETTE-VARIETY OBJECT, and the whole reason the beat reads: a
   chair is nameable from its outline by anyone, so FLAT vs SOLID is legible
   without a caption. `solid` 0 draws a paper cut-out, 1 draws a real object
   with a seat top, a side face and four legs in perspective.
   ====================================================================== */
export const Chair: React.FC<{ x: number; y: number; s?: number; solid?: number;
  spin?: number; lit?: number; z?: number }> =
  ({ x, y, s = 1, solid = 0, spin = 0, lit = 0.3, z = 70 }) => {
  const k = Math.max(0, Math.min(1, solid));
  /* ⛔ never through edge-on: the depth of the seat is what turns, and it is
     clamped so the chair can never collapse to a line */
  const d = 26 + Math.abs(Math.cos(spin * Math.PI * 2)) * 40;
  const face = mxh(CLAY, 0.06 + lit * 0.26);
  const top = mxh(CLAY, 0.30 + lit * 0.28);
  const side = dkh(CLAY, 0.34);
  return (
    <svg width={280 * s} height={340 * s} viewBox="0 0 280 340"
      style={{ position: "absolute", left: x - 140 * s, top: y - 340 * s, zIndex: z }}>
      {k < 1 && (
        /* the FLAT cut-out — a photo print of a chair, white border and all */
        <g opacity={1 - k}>
          <rect x="26" y="18" width="228" height="300" rx="4" fill={PAPER} stroke={ED} strokeWidth="4" />
          <rect x="42" y="34" width="196" height="238" fill="#2E3A42" />
          <path d="M92 250 L92 96 Q92 78 112 78 L172 78 Q192 78 192 96 L192 250"
            fill="none" stroke={hexa(CLAY, 0.8)} strokeWidth="12" strokeLinecap="round" />
          <path d="M84 176 L200 176" stroke={hexa(CLAY, 0.8)} strokeWidth="12" strokeLinecap="round" />
          <text x="140" y="298" textAnchor="middle" fill="#2A241C" fontSize="20"
            fontFamily="monospace" fontWeight="700" letterSpacing="3">{R.tools[2].input}</text>
        </g>
      )}
      {k > 0 && (
        <g opacity={k}>
          {/* back legs, drawn first so the seat overlaps them */}
          <path d={`M${96 + d * 0.5} 300 L${96 + d * 0.5} ${214 - d * 0.4}`} stroke={side} strokeWidth="12" strokeLinecap="round" />
          <path d={`M${186 + d * 0.5} 300 L${186 + d * 0.5} ${214 - d * 0.4}`} stroke={side} strokeWidth="12" strokeLinecap="round" />
          {/* the BACK: uprights + three slats — fine repeated detail */}
          <path d={`M96 ${214} L96 76 Q96 60 116 60 L${166} 60 Q186 60 186 76 L186 214`}
            fill="none" stroke={face} strokeWidth="15" strokeLinecap="round" />
          {[92, 124, 156].map((sy, i) => (
            <path key={"sl" + i} d={`M100 ${sy} L182 ${sy}`} stroke={face} strokeWidth="11" strokeLinecap="round" />
          ))}
          {/* the SEAT — front face, and the TOP FACE that makes it a solid */}
          <path d={`M84 214 L198 214 L${198 + d} ${214 - d * 0.42} L${84 + d} ${214 - d * 0.42} Z`}
            fill={top} stroke={ED} strokeWidth="3" />
          <path d="M84 214 L198 214 L198 236 L84 236 Z" fill={face} stroke={ED} strokeWidth="3" />
          <path d={`M198 214 L${198 + d} ${214 - d * 0.42} L${198 + d} ${236 - d * 0.42} L198 236 Z`}
            fill={side} stroke={ED} strokeWidth="3" />
          {/* front legs + a stretcher between them */}
          <path d="M96 236 L96 306" stroke={face} strokeWidth="14" strokeLinecap="round" />
          <path d="M186 236 L186 306" stroke={face} strokeWidth="14" strokeLinecap="round" />
          <path d="M96 282 L186 282" stroke={side} strokeWidth="9" strokeLinecap="round" />
          {/* the highlight down the lit edge — one light direction, upper-left */}
          <path d="M100 76 L100 206" stroke={hexa("#FFFFFF", 0.26)} strokeWidth="4" strokeLinecap="round" />
        </g>
      )}
    </svg>
  );
};

/* =========================================================================
   6 · THE PLINTH — a turntable a chair can stand on and be pushed around
   ====================================================================== */
export const Plinth: React.FC<{ x: number; y: number; s?: number; f: number;
  spin?: number; z?: number }> = ({ x, y, s = 1, f, spin = 0, z = 40 }) => (
  <svg width={420 * s} height={140 * s} viewBox="0 0 420 140"
    style={{ position: "absolute", left: x - 210 * s, top: y - 70 * s, zIndex: z }}>
    <ellipse cx="210" cy="60" rx="196" ry="50" fill={SH_(BONE, 0.28)} stroke={ED} strokeWidth="5" />
    <ellipse cx="210" cy="52" rx="196" ry="50" fill={LI(BONE, 0.10)} stroke={ED} strokeWidth="5" />
    {/* radial marks, so the TURN is readable on the deck itself */}
    <g transform={`rotate(${spin * 360} 210 52)`}>
      {Array.from({ length: 12 }, (_, i) => (
        <path key={"rm" + i} d="M210 52 L210 8" stroke={hexa("#000", 0.20)} strokeWidth="4"
          transform={`rotate(${i * 30} 210 52)`} />
      ))}
    </g>
    <ellipse cx="210" cy="52" rx="26" ry="8" fill={SH_(BRASS, 0.14)} stroke={ED} strokeWidth="3" />
  </svg>
);

/* =========================================================================
   7 · THE ENAMEL SIGN — the real mark, demoted from HERO to FITTING.
   ⛔ In rev 2 the repo plate WAS the scene, which is how the reel became a
   slideshow of rectangles. A real workshop carries its maker's plate bolted to
   the machine, small and off to one side, and that is where it goes now.
   ====================================================================== */
export const EnamelSign: React.FC<{ x: number; y: number; i: number; s?: number;
  z?: number; on?: number }> = ({ x, y, i, s = 1, z = 74, on = 1 }) => {
  const t = R.tools[i];
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: z, opacity: on,
      display: "flex", alignItems: "center", gap: 9 * s,
      padding: `${7 * s}px ${12 * s}px`, borderRadius: 6 * s,
      background: `linear-gradient(176deg, ${mxh(t.c, 0.22)} 0%, ${dkh(t.c, 0.28)} 100%)`,
      border: `${3 * s}px solid ${hexa("#000", 0.5)}`, boxShadow: SH,
      transform: `rotate(${-1.5}deg)` }}>
      <div style={{ width: 34 * s, height: 34 * s, borderRadius: 8 * s, background: "#FFFFFF",
        border: `2px solid #E8DCC0`, display: "flex", alignItems: "center",
        justifyContent: "center", flexShrink: 0 }}>
        <Img src={staticFile("logos/github.svg")}
          style={{ width: 24 * s, height: 24 * s, objectFit: "contain" }} />
      </div>
      <div>
        <div style={{ ...mono(19 * s, 900), color: "#14100A", whiteSpace: "nowrap",
          lineHeight: 1.05 }}>{t.n}</div>
        <div style={{ ...mono(17 * s, 900), color: "#3A2A08", marginTop: 3 * s }}>
          {"★ " + t.stars}{t.lic ? "  " + t.lic : ""}
        </div>
      </div>
      {/* two bolts, so it is FIXED to something */}
      {[6, -6].map((o, k) => (
        <div key={"eb" + k} style={{ position: "absolute", left: k ? undefined : 5 * s,
          right: k ? 5 * s : undefined, top: "50%", marginTop: -4 * s, width: 8 * s,
          height: 8 * s, borderRadius: "50%", background: "#6E6656" }} />
      ))}
    </div>
  );
};

/* =========================================================================
   8 · THE CLONE POP — "enough to clone it"
   ⭐ NOT a rank of speaker boxes (which is what rev 2 drew, and which is four
   more rectangles). The thing being cloned is the CLAUDE, so the clone is
   drawn as Claudes: a ring of light snaps out and a copy is standing in it.
   ====================================================================== */
export const ClonePop: React.FC<{ x: number; y: number; f: number; at: number;
  s?: number; z?: number }> = ({ x, y, f, at, s = 1, z = 52 }) => {
  const lf = f - at;
  if (lf < 0 || lf > 26) return null;
  const k = E(lf, 0, 16, 0, 1, OUT);
  return (
    <svg width={260 * s} height={120 * s} viewBox="0 0 260 120"
      style={{ position: "absolute", left: x - 130 * s, top: y - 60 * s, zIndex: z }}>
      <ellipse cx="130" cy="60" rx={40 + k * 96} ry={12 + k * 28} fill="none"
        stroke={hexa("#D8BEFF", 0.8 * (1 - k))} strokeWidth={9 * (1 - k) + 2} />
      {Array.from({ length: 8 }, (_, i) => {
        const a = (i / 8) * 6.283;
        return (
          <circle key={"pt" + i} cx={130 + Math.cos(a) * (30 + k * 100)}
            cy={60 + Math.sin(a) * (10 + k * 32)} r={5 * (1 - k) + 1}
            fill={hexa("#E8D8FF", 1 - k)} />
        );
      })}
    </svg>
  );
};

/* =========================================================================
   9 · THE LOADED BARROW — what he actually made, on a barrow.
   ⛔ The old `Trolley` carried a grey sphere, a purple disc and a teal box:
   three primitives, on the reel's PAYOFF beat, undercutting every drawn object
   before it. A barrow at the gate has to carry THE THREE THINGS THE REEL JUST
   WATCHED HIM MAKE — a film can, a cut disc and the chair.
   ====================================================================== */
export const LoadedBarrow: React.FC<{ x: number; y: number; f: number; tip?: number;
  s?: number; z?: number }> = ({ x, y, f, tip = 0, s = 1, z = 58 }) => {
  const rock = Math.sin(f / 3.4) * tip;
  return (
    <div style={{ position: "absolute", left: x - 190 * s, top: y - 330 * s, width: 380 * s,
      height: 330 * s, zIndex: z, transformOrigin: "50% 100%",
      transform: `rotate(${tip}deg)` }}>
      <svg width={380 * s} height={330 * s} viewBox="0 0 380 330">
        {/* the barrow: tray with a lip, two struts, two spoked wheels */}
        <path d="M14 236 L366 236 L344 268 L36 268 Z" fill={SH_(OXIDE, 0.22)} stroke={ED} strokeWidth="5" />
        <path d="M14 236 L366 236 L360 226 L20 226 Z" fill={LI(OXIDE, 0.14)} />
        <path d="M52 268 L64 300 M328 268 L316 300" stroke={SH_(STEEL, 0.4)} strokeWidth="10" strokeLinecap="round" />
        {[70, 310].map((cx, i) => (
          <g key={"wh" + i} transform={`rotate(${f * 4} ${cx} 300)`}>
            <circle cx={cx} cy="300" r="26" fill="#15130E" stroke={SH_(BONE, 0.3)} strokeWidth="7" />
            {[0, 60, 120].map(a => (
              <path key={"sp" + a} d={`M${cx - 18} 300 L${cx + 18} 300`}
                stroke={SH_(BONE, 0.34)} strokeWidth="4"
                transform={`rotate(${a} ${cx} 300)`} />
            ))}
          </g>
        ))}
        {/* ⭐ 1 · THE FILM CAN — the thing the mill made */}
        <g transform={`rotate(${rock * 1.4} 84 196)`}>
          <ellipse cx="84" cy="196" rx="62" ry="20" fill={SH_(STEEL, 0.30)} stroke={ED} strokeWidth="4" />
          <rect x="22" y="152" width="124" height="44" fill={SH_(STEEL, 0.22)} stroke={ED} strokeWidth="4" />
          <ellipse cx="84" cy="152" rx="62" ry="20" fill={LI(STEEL, 0.14)} stroke={ED} strokeWidth="4" />
          <ellipse cx="84" cy="152" rx="24" ry="8" fill={SH_(SODIUM, 0.16)} />
          <rect x="42" y="168" width="52" height="12" rx="3" fill={SH_(SODIUM, 0.1)} />
        </g>
        {/* ⭐ 2 · THE CUT DISC — the thing the lathe made */}
        <g transform={`rotate(${-rock * 1.8} 196 190)`}>
          <circle cx="196" cy="190" r="44" fill={SH_(VIOLET, 0.36)} stroke={ED} strokeWidth="4" />
          {[34, 26, 18].map((r0, i) => (
            <circle key={"gv" + i} cx="196" cy="190" r={r0} fill="none"
              stroke={hexa("#D8BEFF", 0.34)} strokeWidth="2" />
          ))}
          <circle cx="196" cy="190" r="9" fill={BONE} />
        </g>
        {/* ⭐ 3 · THE CHAIR — the thing the studio made, small and unmistakable */}
        <g transform={`translate(268 96) scale(0.40) rotate(${rock * 1.2} 140 300)`}>
          <path d="M96 214 L96 76 Q96 60 116 60 L166 60 Q186 60 186 76 L186 214"
            fill="none" stroke={mxh(CLAY, 0.08)} strokeWidth="15" strokeLinecap="round" />
          {[92, 124, 156].map((sy, i) => (
            <path key={"cs" + i} d={`M100 ${sy} L182 ${sy}`} stroke={mxh(CLAY, 0.08)}
              strokeWidth="11" strokeLinecap="round" />
          ))}
          <path d="M84 214 L198 214 L226 194 L112 194 Z" fill={mxh(CLAY, 0.32)} stroke={ED} strokeWidth="3" />
          <path d="M84 214 L198 214 L198 236 L84 236 Z" fill={mxh(CLAY, 0.08)} stroke={ED} strokeWidth="3" />
          <path d="M96 236 L96 306 M186 236 L186 306" stroke={mxh(CLAY, 0.08)} strokeWidth="14" strokeLinecap="round" />
        </g>
      </svg>
    </div>
  );
};

/* =========================================================================
   10 · THE FILM SHELF — a wall of cans, so the mill's room is a PLACE.
   The mid-band of T1 was bare brick between the overhead film run and the
   bench; a film workshop stores what it makes, and a wall of cans is both the
   set dressing and the proof the shop has been working.
   ====================================================================== */
export const FilmShelf: React.FC<{ x: number; y: number; w: number; f: number;
  rows?: number; z?: number }> = ({ x, y, w: ww, f, rows = 2, z = 18 }) => (
  <>{Array.from({ length: rows }, (_, r) => (
    <React.Fragment key={"sr" + r}>
      <div style={{ position: "absolute", left: x, top: y + r * 132, width: ww, height: 12,
        zIndex: z, background: dkh(OXIDE, 0.42) }} />
      <div style={{ position: "absolute", left: x, top: y + r * 132 + 12, width: ww, height: 7,
        zIndex: z, background: hexa("#000", 0.34) }} />
      {Array.from({ length: Math.floor(ww / 96) }, (_, i) => {
        const lean = ((i + r) % 5 === 0);
        return (
          <svg key={"cn" + r + i} width="88" height="112" viewBox="0 0 88 112"
            style={{ position: "absolute", left: x + 10 + i * 96, top: y + r * 132 - 106,
              zIndex: z + 1, transform: lean ? "rotate(-7deg)" : undefined }}>
            <rect x="10" y="8" width="68" height="100" rx="5"
              fill={dkh(["#8E7A4A", "#6E5A3A", "#9E8A56"][(i + r) % 3], 0.18)}
              stroke={hexa("#000", 0.5)} strokeWidth="3" />
            <rect x="10" y="8" width="16" height="100" rx="5" fill={hexa("#FFFFFF", 0.10)} />
            <circle cx="44" cy="58" r="17" fill="none" stroke={hexa("#F0DCA8", 0.36)} strokeWidth="4" />
            <circle cx="44" cy="58" r="5" fill={hexa("#F0DCA8", 0.36)} />
            <rect x="20" y="88" width="48" height="9" rx="2" fill={hexa("#F0DCA8", 0.22)} />
          </svg>
        );
      })}
    </React.Fragment>
  ))}</>
);

/* =========================================================================
   11 · THE FOREGROUND MASS — a dark object CROPPED BY THE PANEL EDGE, in
   front of the action.

   ⛔ `look_audit` blocked rev 3 on `BODY_BLACK p10 35.7` (bar <=35), with the
   three bright sets at 39-50. The banned fix is lifting or dropping the
   palette's stops; the doc's own answer is that **hierarchy needs DARKNESS**,
   and the cheapest honest darkness is a real object between the camera and the
   scene. It is also exactly what `look_audit`'s DEPTH note asks for by eye:
   *"is there a mass cropped by the panel edge, in front of the action? If not,
   the camera is pointed at a backdrop."*

   Every kind below is a thing the room it stands in would actually contain.
   ====================================================================== */
export const ForeMass: React.FC<{ side?: "l" | "r"; kind?: "stand" | "flag" | "desk";
  c?: string; z?: number; s?: number }> =
  ({ side = "l", kind = "stand", c = "#14110E", z = 90, s = 1 }) => {
  const L0 = side === "l";
  if (kind === "stand") {
    /* a C-stand: column, knuckle, two arms, and a splayed leg — the silhouette
       of every photo studio ever, and it is nearly black */
    return (
      <svg width={300 * s} height={880} viewBox="0 0 300 880"
        style={{ position: "absolute", [L0 ? "left" : "right"]: -46, top: -60, zIndex: z,
          transform: L0 ? undefined : "scaleX(-1)" } as React.CSSProperties}>
        <rect x="96" y="0" width="34" height="720" fill={c} />
        <circle cx="113" cy="196" r="30" fill={c} />
        <rect x="113" y="176" width="150" height="22" rx="8" fill={c} />
        <circle cx="256" cy="187" r="20" fill={c} />
        <rect x="113" y="382" width="112" height="18" rx="7" fill={c} />
        <path d="M113 700 L18 862 M113 700 L113 872 M113 700 L214 862" stroke={c}
          strokeWidth="26" strokeLinecap="round" />
        <rect x="86" y="150" width="54" height="14" rx="5" fill={c} />
      </svg>
    );
  }
  if (kind === "flag") {
    /* a cutter/flag on its arm — a big flat black rectangle is CORRECT here,
       because that is literally what the object is */
    return (
      <svg width={340 * s} height={880} viewBox="0 0 340 880"
        style={{ position: "absolute", [L0 ? "left" : "right"]: -60, top: -40, zIndex: z,
          transform: L0 ? undefined : "scaleX(-1)" } as React.CSSProperties}>
        <rect x="18" y="60" width="196" height="470" rx="8" fill={c} />
        <rect x="34" y="76" width="164" height="438" rx="4" fill="none"
          stroke={hexa("#FFFFFF", 0.05)} strokeWidth="6" />
        <rect x="196" y="286" width="128" height="18" rx="7" fill={c} />
        <rect x="96" y="530" width="30" height="350" fill={c} />
        <path d="M111 792 L30 880 M111 792 L192 880" stroke={c} strokeWidth="24" strokeLinecap="round" />
      </svg>
    );
  }
  /* a mixing desk edge — a sloped face with faders and knobs, cropped */
  return (
    <svg width={420 * s} height={330} viewBox="0 0 420 330"
      style={{ position: "absolute", [L0 ? "left" : "right"]: -70, bottom: -30, zIndex: z,
        transform: L0 ? undefined : "scaleX(-1)" } as React.CSSProperties}>
      <path d="M0 330 L0 96 L400 40 L420 330 Z" fill={c} />
      {Array.from({ length: 7 }, (_, i) => (
        <g key={"fd" + i}>
          <rect x={40 + i * 50} y={150 - i * 6} width="9" height="104" rx="4"
            fill={hexa("#FFFFFF", 0.07)} />
          <rect x={32 + i * 50} y={190 - i * 6 - (i % 3) * 16} width="26" height="16" rx="4"
            fill={hexa("#FFFFFF", 0.13)} />
          <circle cx={44 + i * 50} cy={116 - i * 6} r="10" fill={hexa("#FFFFFF", 0.09)} />
        </g>
      ))}
    </svg>
  );
};

/* =========================================================================
   12 · THE LIVE WAVEFORM WALL — a booth's own readout, scrolling.
   ⛔ T2's anticipation fix (a charge ring under each empty spot) moved its
   motion 4.49 -> 4.53, i.e. nothing: a 184px ring outline repaints almost no
   area. `reference_motion_arithmetic` — motion is (fraction of panel repainted
   per 0.1s) x luma delta — so the lever has to be LARGE and CONTINUOUS. A live
   waveform scrolling across the booth wall is both, and it is the one readout a
   recording booth actually has on the wall.
   ====================================================================== */
export const WaveWall: React.FC<{ x: number; y: number; w: number; h?: number; f: number;
  live?: number; z?: number }> = ({ x, y, w: ww, h: hh = 132, f, live = 1, z = 22 }) => {
  const bars = Math.ceil(ww / 14);
  return (
    <div style={{ position: "absolute", left: x, top: y, width: ww, height: hh, zIndex: z,
      overflow: "hidden", borderRadius: 8, background: "#140F22",
      border: `5px solid ${hexa("#000", 0.5)}` }}>
      {/* the centre line the trace is drawn about */}
      <div style={{ position: "absolute", left: 0, top: hh / 2 - 1, width: "100%", height: 2,
        background: hexa("#D8BEFF", 0.20) }} />
      {Array.from({ length: bars }, (_, i) => {
        /* the trace SCROLLS: each bar's height is a function of (i + time), so
           the whole wall repaints every frame instead of pulsing in place */
        const t = i + f * 0.9;
        const a = (Math.sin(t * 0.42) * Math.cos(t * 0.17) + Math.sin(t * 0.91) * 0.5);
        const bh = (10 + Math.abs(a) * (hh * 0.42)) * (0.25 + live * 0.75);
        return (
          <div key={"wb" + i} style={{ position: "absolute", left: i * 14 + 3, top: hh / 2 - bh / 2,
            width: 8, height: bh, borderRadius: 4,
            background: mxh(VIOLET, 0.30 + Math.abs(a) * 0.34) }} />
        );
      })}
      {/* the playhead, crossing */}
      <div style={{ position: "absolute", left: ((f * 6) % ww), top: 0, width: 3, height: "100%",
        background: hexa("#F2E6FF", 0.7) }} />
    </div>
  );
};

/* =========================================================================
   13 · THE FREE LOAD — the hook's colossal object.

   ⛔⛔⛔ WHY THIS EXISTS. Alex: *"focus on the hook scenes specifically, it needs
   to be way better, elevated and more interesting, reference the OX video and
   the UNLAZY videos to see how it works, each word needs to have animations."*

   ⭐ I FRAME-STRIPPED BOTH RATHER THAN REASONING FROM MEMORY, and the two hooks
   do the identical three things:

     | | OX 119 | UNLAZY 120 | BUILD rev3 hook |
     | ONE COLOSSAL OBJECT   | a black ox, ~55% of the panel | a balloon grown to ~45% | none |
     | IT ENTERS OR GROWS    | walks in from frame right     | inflates across frame   | a shutter rises in place |
     | THE WORD IS ON IT     | `FREE` branded on its flank   | `DONE` on the balloon   | on a small awning |

   and in both, the Claude is SMALL beside it — that scale gap is the whole
   image. A shutter going up in a wall is a hole changing size; it is not an
   object arriving, so there is nothing to be dwarfed by.

   ⛔ AND THIS DOES NOT BREAK `feedback_hook_simplicity`. That rule says ONE
   dominant object and an empty stage, which is exactly what the ox is. The
   count of IDEAS stays at one — a colossal free delivery — while the count of
   BEATS on it goes to seven, one per spoken word.
   ====================================================================== */
export const FreeLoad: React.FC<{ x: number; y: number; f: number; s?: number; z?: number;
  brand?: number; mark?: number; open?: number; lurch?: number }> =
  ({ x, y, f, s = 1, z = 60, brand = 0, mark = 0, open = 0, lurch = 0 }) => {
  const W0 = 780 * s, H0 = 470 * s;
  /* each crate front drops on its own hinge, staggered, so "plugins" reveals
     three machines rather than one lid */
  const lid = (i: number) => E(open * 3 - i, 0, 1, 0, 1, OUT);
  return (
    <div style={{ position: "absolute", left: x - W0 / 2, top: y - H0, width: W0, height: H0,
      zIndex: z, transform: `rotate(${lurch * 1.2}deg)`, transformOrigin: "50% 100%" }}>
      <svg width={W0} height={H0 + 90 * s} viewBox="0 0 780 560">
        {/* the pallet the load rides on — a real one, with stringers */}
        <path d="M8 512 L772 512 L756 548 L24 548 Z" fill={SH_(OXIDE, 0.44)} stroke={ED} strokeWidth="5" />
        {[60, 300, 540].map((px, i) => (
          <rect key={"st" + i} x={px} y="512" width="120" height="36" fill={SH_(OXIDE, 0.58)} />
        ))}
        {/* ⭐ THREE CRATES, COUNTABLE — the "three" beat lands on their number */}
        {[0, 1, 2].map(i => {
          const cx0 = 24 + i * 250, cw = 232;
          return (
            <g key={"cr" + i}>
              {/* the crate body: front face + a top lip = a SOLID */}
              <path d={`M${cx0} 512 L${cx0} 150 L${cx0 + cw} 150 L${cx0 + cw} 512 Z`}
                fill={SH_(SODIUM, 0.30 - i * 0.04)} stroke={ED} strokeWidth="5" />
              <path d={`M${cx0} 150 L${cx0 + cw} 150 L${cx0 + cw - 26} 112 L${cx0 + 26} 112 Z`}
                fill={LI(SODIUM, 0.40)} stroke={ED} strokeWidth="5" />
              {/* slats — fine repeated detail that survives the downsample */}
              {[0, 1, 2, 3, 4].map(j => (
                <rect key={"sl" + j} x={cx0 + 10} y={172 + j * 68} width={cw - 20} height="12"
                  fill={hexa("#000", 0.20)} />
              ))}
              {/* corner braces */}
              {[[cx0 + 6, 156], [cx0 + cw - 26, 156], [cx0 + 6, 470], [cx0 + cw - 26, 470]].map(([bx, by], k) => (
                <rect key={"cb" + k} x={bx} y={by} width="20" height="42" rx="3"
                  fill={SH_(OXIDE, 0.30)} stroke={ED} strokeWidth="3" />
              ))}
              {/* ⭐ THE FRONT DROPS on "plugins" and a machine is inside */}
              {open > 0 && (
                <g>
                  <rect x={cx0 + 14} y="168" width={cw - 28} height="332"
                    fill={dkh(["#E7A94C", "#8B72B0", "#7FC0C9"][i], 0.66)} />
                  <rect x={cx0 + 40} y="212" width={cw - 80} height="120" rx="6"
                    fill={dkh(["#E7A94C", "#8B72B0", "#7FC0C9"][i], 0.34)} stroke={ED} strokeWidth="4" />
                  {/* a real machine face — a dial with a moving needle and a
                      slot, the same vocabulary as the bench machines */}
                  <circle cx={cx0 + cw / 2} cy="400" r="46"
                    fill={dkh(["#E7A94C", "#8B72B0", "#7FC0C9"][i], 0.5)}
                    stroke={mxh(["#E7A94C", "#8B72B0", "#7FC0C9"][i], 0.3)} strokeWidth="8" />
                  {[-60, -30, 0, 30, 60].map(a => (
                    <path key={"tk" + a} d={`M${cx0 + cw / 2} 366 L${cx0 + cw / 2} 376`}
                      stroke={mxh(["#E7A94C", "#8B72B0", "#7FC0C9"][i], 0.5)} strokeWidth="4"
                      transform={`rotate(${a} ${cx0 + cw / 2} 400)`} />
                  ))}
                  <path d={`M${cx0 + cw / 2} 400 L${cx0 + cw / 2} 368`}
                    stroke="#FFF3D6" strokeWidth="6" strokeLinecap="round"
                    transform={`rotate(${Math.sin(f / 7 + i) * 58} ${cx0 + cw / 2} 400)`} />
                  <circle cx={cx0 + cw / 2} cy="400" r="8" fill="#FFF3D6" />
                  <rect x={cx0 + 46} y="452" width={cw - 92} height="18" rx="4"
                    fill={mxh(["#E7A94C", "#8B72B0", "#7FC0C9"][i], 0.42)} />
                  {/* the front panel, hinged open at the bottom */}
                  <path d={`M${cx0 + 4} 512 L${cx0 + cw - 4} 512 L${cx0 + cw - 4} ${512 - 350 * (1 - lid(i))} L${cx0 + 4} ${512 - 350 * (1 - lid(i))} Z`}
                    fill={SH_(SODIUM, 0.34)} stroke={ED} strokeWidth="5" />
                </g>
              )}
            </g>
          );
        })}
        {/* ⭐⭐ THE WORD, BRANDED ACROSS THE LOAD — this is the ox's flank.
            It is drawn as a burnt-in stencil, not a label: it belongs to the
            object, which is why it reads at a glance and at thumbnail size. */}
        {brand > 0 && (
          <g opacity={brand}>
            <rect x="70" y="236" width={640 * Math.min(1, brand * 1.4)} height="132" rx="8"
              fill={hexa("#2A1C04", 0.34)} />
            <text x="390" y="344" textAnchor="middle" fill="#FFF3D6" fontSize={140}
              fontFamily="Georgia, serif" fontWeight="900" letterSpacing="6"
              stroke={hexa("#7A4A10", 0.9)} strokeWidth="5"
              transform={`scale(${0.86 + brand * 0.14} 1) translate(${(1 - brand) * 60} 0)`}>FREE</text>
          </g>
        )}
        {/* the Claude mark, stamped on the end crate on its own word */}
        {mark > 0 && (
          <g opacity={mark} transform={`translate(390 232) scale(${0.7 + mark * 0.3})`}>
            <rect x="-52" y="-52" width="104" height="104" rx="22" fill="#FFFFFF"
              stroke="#E8DCC0" strokeWidth="5" />
          </g>
        )}
      </svg>
      {mark > 0 && (
        <Img src={staticFile("claude_logo.png")}
          style={{ position: "absolute", left: 362 * s, top: 194 * s, width: 84 * s,
            height: 84 * s, objectFit: "contain", opacity: mark,
            transform: `scale(${0.7 + mark * 0.3})` }} />
      )}
    </div>
  );
};

/** the two marketplace marks, slapped on as SHIPPING LABELS on their own words */
export const ShipLabel: React.FC<{ x: number; y: number; src: string; k: number;
  s?: number; z?: number; rot?: number }> = ({ x, y, src, k, s = 1, z = 92, rot = -5 }) => {
  if (k <= 0) return null;
  return (
    <div style={{ position: "absolute", left: x - 84 * s, top: y - 60 * s, width: 168 * s,
      height: 120 * s, zIndex: z, opacity: Math.min(1, k * 2),
      transform: `scale(${0.4 + k * 0.6}) rotate(${rot * k}deg)`, transformOrigin: "50% 50%",
      background: "#FBF6EA", borderRadius: 8 * s, border: `${5 * s}px solid #2A241C`,
      boxShadow: SH_D, display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "center", gap: 6 * s }}>
      <Img src={staticFile("logos/" + src)}
        style={{ width: 56 * s, height: 56 * s, objectFit: "contain" }} />
      {/* the perforation strip that makes it a LABEL and not a card */}
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 22 * s, height: 3 * s,
        background: `repeating-linear-gradient(90deg, ${hexa("#2A241C", 0.4)} 0 7px, transparent 7px 14px)` }} />
    </div>
  );
};

/* ===========================================================================
   PRICE TAG · the rev-6 hook object.

   ⛔⛔⛔ WHY THIS REPLACES `FreeLoad`. Alex on rev 5: *"hook scene seems too
   cluttered and not straightforward enough."* Counted on the shipped payoff
   frame, the defect is not object count, it is REPEATS:

       "FREE" / "$0"      said FOUR times   (header · band chip · plate · crates)
       "FIVERR"/"UPWORK"  said THREE times  (header · band chip · two ship labels)
       five separate boxes of type, none of them the hero

   `feedback_hook_simplicity`: ONE dominant object, at most ONE supporting.
   `feedback_illustrate_the_sentence_not_the_set`: the VO verb is **SELL** — a
   pallet being dragged in is DELIVERY. A price tag is the object of selling,
   and its two faces carry the whole sentence: `$0` on the front, the
   marketplace on the back.
   `feedback_eyecatch_is_value_structure`: it is NEAR-BLACK on a pale COOL
   ground, and it ARRIVES rather than sitting in frame 0, which is how OX and
   BOSS hold luma >= 140 and still get a dark mass.

   ⛔ THE TURN IS DRAWN, NOT `rotateY`. `feedback_never_let_a_face_pass_through_
   edge_on` — a face at 90deg is a 3px line. The front is clamped to >= 0.46 of
   its width and the side edge swaps across the half-turn.
   ========================================================================= */
export const PriceTag: React.FC<{
  x: number; y: number;   /* ⭐ THE EYELET, not the card centre — a swing tag
                             hangs from its grommet, so that is the pivot AND
                             where the chain has to meet it. */
  s?: number; z?: number; rot?: number;
  turn?: number;          /* 0 = the $0 face · 1 = the marketplace face */
  zero?: number;          /* the $0 stamping on */
  mark?: string;          /* the logo file for the reverse */
  markC?: string;         /* the marketplace's own colour, used as the ACCENT */
  mark2?: string;         /* ⭐ the SECOND marketplace, on its own spoken word */
  two?: number;           /* 0..1 — mark2 landing */
}> = ({ x, y, s = 1, z = 62, rot = 0, turn = 0, zero = 1, mark, markC = "#1DBF73",
        mark2, two = 0 }) => {
  const W = 620 * s, H = 452 * s;
  const EX = 86 * s, EY = 226 * s;          /* the eyelet inside the card */
  const a = turn * Math.PI;
  const c = Math.cos(a);
  const front = c >= 0;
  /* ⛔ the clamp: never thinner than 0.46, so the card is always a CARD.
     `feedback_never_let_a_face_pass_through_edge_on` — 90deg is a 3px line. */
  const k = Math.max(0.46, Math.abs(c));
  /* ⛔⛔ BOTH FACES STAY NEAR-BLACK. The first build set the reverse to the
     marketplace's own colour and put the marketplace's logo on it — and
     `si_fiverr.svg` ships `fill="#1DBF73"`, the identical green, so the mark
     rendered INVISIBLE. Exactly the `shopify.svg` on a white tile trap already
     in memory. Keeping the card black also holds the OX/BOSS value structure
     right through the turn: near-black mass, one hot accent, and the accent is
     the brand green itself. */
  const CARD = "#22252C", CARD2 = "#3A3F49", EDGE = "#0C0E12";

  return (
    <div style={{ position: "absolute", left: x - EX, top: y - EY, width: W, height: H,
      zIndex: z, transformOrigin: `${EX}px ${EY}px`, transform: `rotate(${rot}deg)` }}>
      {/* the side edge — the card has THICKNESS, and which side of the eyelet
          you see it on swaps across the half-turn. That is what sells a turn
          you are not allowed to do with rotateY. */}
      <div style={{ position: "absolute", top: 8 * s, height: H - 16 * s, width: 13 * s,
        left: front ? EX + (W - EX - 14 * s) * k : EX - (EX - 1 * s) * k,
        background: `linear-gradient(90deg, ${EDGE} 0%, ${CARD2} 100%)`, zIndex: 1 }} />

      <svg width={W} height={H} viewBox="0 0 620 452" style={{ position: "absolute", left: 0, top: 0,
        zIndex: 2, transform: `scaleX(${k})`, transformOrigin: "86px 226px" }}>
        <defs>
          <clipPath id={"tc" + (mark || "f") + z}>
            <path d="M150 8 L588 8 Q612 8 612 32 L612 420 Q612 444 588 444 L150 444 L10 226 Z" />
          </clipPath>
        </defs>
        {/* the card body — the angled corner is what makes it a SWING TAG and
            not a rectangle, and it points straight at the eyelet */}
        <path d="M150 8 L588 8 Q612 8 612 32 L612 420 Q612 444 588 444 L150 444 L10 226 Z"
          fill={CARD} stroke={EDGE} strokeWidth="10" />
        {/* the fold-lit top edge — the third face that makes it a solid */}
        <path d="M150 8 L588 8 Q612 8 612 32 L612 46 L150 46 Z"
          fill={hexa("#FFFFFF", 0.17)} clipPath={`url(#tc${mark || "f"}${z})`} />
        {/* the stitched border a real tag carries — it takes the marketplace's
            hue on the reverse, so the turn reads even before the mark lands */}
        <path d="M154 40 L586 40 L586 412 L154 412 L44 226 Z" fill="none"
          stroke={hexa(front ? "#FFFFFF" : markC, front ? 0.28 : 0.9)} strokeWidth="4"
          strokeDasharray="15 13" />
        {/* the brass eyelet, with its own inner ring and a worn highlight */}
        <circle cx="86" cy="226" r="42" fill="#0E1014" stroke={EDGE} strokeWidth="9" />
        <circle cx="86" cy="226" r="27" fill="none" stroke="#C9A15A" strokeWidth="11" />
        <circle cx="86" cy="226" r="27" fill="none" stroke={hexa("#FFE9B8", 0.85)}
          strokeWidth="4" strokeDasharray="30 56" />

        {front ? (
          /* ⭐ ONE WORD ON THE OBJECT. The `$0` is the whole claim, and it is the
             only type in the frame that is not the header. */
          <g transform={`translate(378 296) scale(${0.62 + zero * 0.38})`}
             opacity={Math.min(1, zero * 1.6)} style={{ transformOrigin: "378px 296px" }}>
            <text x="0" y="0" textAnchor="middle" fill="#F6EFDC" fontSize="236"
              fontFamily="Georgia, serif" fontWeight="900">$0</text>
          </g>
        ) : null}
      </svg>

      {/* ⭐⭐ BOTH MARKETPLACES LIVE ON THE ONE CARD. The first build hung Upwork
          as a SECOND tag beside this one and there is simply no room: a 570px
          card on a 1012px panel leaves 113px, so the second tag was clipped to
          the word "up". Two marks on one card is one OBJECT, gives Upwork its
          own spoken beat, and is strictly simpler — which was the note.
          ⛔ Each logo keeps its OWN pixels; a marketplace mark is never redrawn. */}
      {!front && mark ? (
        <div style={{ position: "absolute", left: EX + (W - EX) * 0.5 * k - 168 * s * k,
          top: EY - (mark2 ? 128 : 62) * s, width: 336 * s * k, height: 124 * s,
          zIndex: 3, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Img src={staticFile("logos/" + mark)}
            style={{ width: 320 * s * k, height: 116 * s, objectFit: "contain" }} />
        </div>
      ) : null}
      {!front && mark2 && two > 0 ? (
        <>
          {/* the hairline that makes them a LIST and not two stray stickers */}
          <div style={{ position: "absolute", left: EX + (W - EX) * 0.5 * k - 150 * s * k * two,
            top: EY + 6 * s, width: 300 * s * k * two, height: 3 * s, zIndex: 3,
            background: hexa(markC, 0.55) }} />
          <div style={{ position: "absolute", left: EX + (W - EX) * 0.5 * k - 168 * s * k,
            top: EY + 34 * s, width: 336 * s * k, height: 124 * s, zIndex: 3,
            opacity: Math.min(1, two * 1.8),
            transform: `scale(${0.72 + two * 0.28})`, transformOrigin: "50% 50%",
            display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Img src={staticFile("logos/" + mark2)}
              style={{ width: 320 * s * k, height: 116 * s, objectFit: "contain" }} />
          </div>
        </>
      ) : null}
    </div>
  );
};

/* THE CHAIN it swings on — real interlocking links, alternating orientation.
   ⛔ a repeating-linear-gradient reads as a hazard stripe, which is the note
   the rev-4 tow strap already collected. */
export const TagChain: React.FC<{ x: number; y: number; len: number; s?: number;
  z?: number; rot?: number }> = ({ x, y, len, s = 1, z = 58, rot = 0 }) => {
  const P = 30 * s, n = Math.max(0, Math.ceil(len / P));
  return (
    <div style={{ position: "absolute", left: x - 15 * s, top: y, width: 30 * s, height: len,
      zIndex: z, transformOrigin: "50% 0%", transform: `rotate(${rot}deg)` }}>
      {Array.from({ length: n }).map((_, i) => {
        const side = i % 2 === 0;
        return (
          <div key={"lk" + i} style={{ position: "absolute", top: i * P * 0.78,
            left: side ? 4 * s : 8 * s, width: side ? 22 * s : 14 * s, height: 34 * s,
            borderRadius: "50%",
            border: `${side ? 7 * s : 6 * s}px solid ${side ? "#9C8446" : "#6B5A32"}`,
            background: "transparent",
            boxSizing: "border-box" }} />
        );
      })}
    </div>
  );
};

/* ===========================================================================
   THE TWO DENSITY SHAPES · rev 7.

   ⛔⛔⛔ Alex: *"still not enough motion, a bit too static, interesting
   components needs to be elevated a lot."* `feedback_the_crowd_is_a_near_band`
   says this exact note is a DENSITY note with exactly two shapes, and reel 132
   took it at a HIGHER score than this reel is at (8.92 vs 7.22).

   Counted off the contact sheet, the deficit is not subtle:

       sprites per body frame   OX 3-6 · UNLAZY 2-5 · BOSS 8-12 · MINE **1**
       near-camera crowd band   BOSS every frame   · MINE only T2
       countable wall content   all three          · MINE T3's wall is BLANK

   ⛔ THIS IS A **BODY** RULE. The hook stays one object on an empty stage.
   ========================================================================= */

/* ⭐⭐⭐ THE NEAR-CAMERA CROWD BAND — a rank across the full width, IN FRONT of
   the action, legs cropped by the bottom edge. It is also the depth cue the
   look audit asks for (a mass cropped by the panel edge in front of the
   action), so it pays twice.
   ⛔ A crowd that means nothing is wallpaper: every call must give it the
   room's own reason. */
export const NearBand: React.FC<{
  f: number; n?: number; y?: number; size?: number; z?: number;
  x0?: number; pitch?: number; at?: number; seed?: number; dx?: number;
}> = ({ f, n = 5, y = 862, size = 238, z = 84, x0 = 24, pitch = 214, at = 0,
        seed = 0, dx = 0 }) => (
  <>{Array.from({ length: n }, (_, i) => {
    /* ⛔ each one gets its OWN loop and its own arrival, or the rank reads as a
       single object translating — which repaints nothing (`feedback_uniform_
       field_repaints_nothing`).
       ⛔⛔ AND ONLY THE **BIG** LOOPS. The first build let the loop fall out of
       `(i+seed)%5`, so three of five members drew WORK — a 7deg lean that
       repaints its own outline and nothing else. `Crew` loop 0 is PACE (travels
       0.30 x size) and loop 2 is HOP (0.24 x size vertically); on a 238px
       sprite that is 71px and 57px of real travel. Measured, the mixed-loop
       band moved the reel 7.22 -> 7.49; that is what a sway is worth. */
    const jitter = ((i * 37 + seed * 13) % 9) - 4;
    /* ⛔⛔ COSTUME 6 (`girl`) AND 7 (`fro`) ARE BROWN HAIR — `#6E4A2C` and
       `#6B4A2F`. On a band cropped by the bottom edge the HAIR is most of what
       survives the crop, so those two read as a brown lump sitting on a clay
       sprite, which is the note Alex already gave once. `costumeFor` cycles all
       twelve by `i`, so the band picks its own index off a curated workwear
       list instead: builder, engineer, glasses, suit, chef, beard, cop, stern. */
    const WEAR = [0, 1, 2, 3, 6, 8, 9, 10, 11];
    const ci = WEAR[(i + seed) % WEAR.length];
    return (
      <Crew key={"nb" + seed + i} f={f} i={ci} loop={(i + seed) % 2 === 0 ? 0 : 2}
        x={x0 + i * pitch + jitter * 6 + dx} y={y + ((i + seed) % 3) * 9}
        size={size + ((i * 5 + seed) % 3) * 14} z={z + (i % 2)}
        at={at + i * 3} flip={(i + seed) % 2 === 1} />
    );
  })}</>
);

/* ⭐⭐ COUNTABLE REAL CONTENT ON THE WALL — things a viewer could COUNT, not
   texture, and they ARRIVE one at a time so the wall is a mover for the whole
   scene instead of three point events at the stations.
   ⛔ Each kind is genuinely a different object, not one prop restyled
   (`feedback_one_prop_five_scenes`). */
export const ContentWall: React.FC<{
  x: number; y: number; w: number; rows?: number; cols?: number; k: number;
  kind: "thumb" | "take" | "model"; c?: string; z?: number; f: number;
  /* ⭐⭐⭐ WHERE EACH ONE FLIES FROM — the machine that made it. Without this the
     items POP IN PLACE, and a 152px card appearing repaints 2% of the panel
     once. Flying it 500px across the frame repaints that area on EVERY frame of
     the trip, and "large bright objects on crossing arcs" is the TOP ROW of the
     motion table (reel 132's jester measured 10.90 first time out on it). */
  fromX?: number; fromY?: number; arc?: number; zFly?: number;
  /* ⭐⭐⭐ WHERE THE WALL EMPTIES TO. `feedback_motion_needs_a_destination`: a
     wall that fills and then parks is a wall that stops paying. Given a target,
     the same cards LEAVE — last-in-first-out — and the wall emptying is a
     second act on content already drawn. */
  outX?: number; outY?: number; out?: number;
  /* ⛔ a single target puts every card BETWEEN the two slots instead of into
     either one. Alternating destinations is what makes the posting read. */
  outX2?: number; outY2?: number;
}> = ({ x, y, w: ww, rows = 2, cols = 6, k, kind, c = "#E7B24C", z = 20, f,
        fromX, fromY, arc = 190, zFly = 78, outX, outY, out = 0, outX2, outY2 }) => {
  const cw = ww / cols, ch = cw * 0.74, total = rows * cols;
  return (
    <>
      {/* the rail each row sits on — a wall of things needs something to sit ON */}
      {Array.from({ length: rows }, (_, r) => (
        <div key={"cr" + r} style={{ position: "absolute", left: x - 8, top: y + r * (ch + 20) + ch,
          width: ww + 16, height: 9, zIndex: z, background: hexa("#000", 0.42) }} />
      ))}
      {Array.from({ length: total }, (_, i) => {
        const q = Math.min(1, Math.max(0, k * (total + 3) - i));
        if (q <= 0) return null;
        /* the exit: cards leave in the order they arrived, one at a time */
        const o = outX === undefined ? 0
          : Math.min(1, Math.max(0, out * (total + 3) - (total - 1 - i)));
        if (o >= 1) return null;
        const r = Math.floor(i / cols), cIdx = i % cols;
        const cx = x + cIdx * cw, cy = y + r * (ch + 20);
        /* ⛔ NOTHING ON THE WALL MAY BE DARKER THAN THE WALL. The first build
           cycled `dkh(c, 0.22)`, so a third of T1's finished shorts rendered
           dark gold on a dark amber mill — invisible, and the exact "beige on
           tan on brown" mush `feedback_eyecatch_is_value_structure` names. */
        const hue = [c, mxh(c, 0.34), mxh(c, 0.62)][i % 3];
        /* the flight: eased across, a real arc up, and it lands and PARKS. Each
           one leaves on its own beat, so the paths cross rather than convoy. */
        const fly = fromX !== undefined && q < 1;
        const e = q * q * (3 - 2 * q);                       /* smoothstep */
        const px = fly ? (fromX as number) + (cx - (fromX as number)) * e : cx;
        const py = fly
          ? (fromY ?? cy) + (cy - (fromY ?? cy)) * e - Math.sin(e * Math.PI) * arc
          : cy;
        const spin = fly ? (1 - e) * ((i % 2 ? -1 : 1) * 26)
          : o > 0 ? o * ((i % 2 ? 1 : -1) * 34) : 0;
        const oe = o * o * (3 - 2 * o);
        const tX = (i % 2 === 1 && outX2 !== undefined) ? outX2 : (outX as number);
        const tY = (i % 2 === 1 && outY2 !== undefined) ? outY2 : (outY ?? cy);
        const gx = o > 0 ? px + (tX - px) * oe : px;
        const gy = o > 0 ? py + (tY - py) * oe - Math.sin(oe * Math.PI) * 130 : py;
        return (
          <div key={"cw" + i} style={{ position: "absolute", left: gx, top: gy,
            width: cw - 12, height: ch, zIndex: fly || o > 0 ? zFly : z + 1,
            opacity: Math.min(1, q * 3) * (1 - o * 0.15),
            transform: `scale(${(0.62 + q * 0.38) * (1 - o * 0.42)}) rotate(${spin}deg)`,
            transformOrigin: "50% 100%",
            background: `linear-gradient(172deg, ${mxh(hue, 0.12)} 0%, ${dkh(hue, 0.40)} 100%)`,
            border: `4px solid ${hexa("#000", 0.5)}`, overflow: "hidden" }}>
            {kind === "thumb" ? (<>
              {/* a finished short: a play triangle and a scrub bar that runs */}
              <div style={{ position: "absolute", left: "50%", top: "42%", width: 0, height: 0,
                marginLeft: -9, marginTop: -12,
                borderTop: "12px solid transparent", borderBottom: "12px solid transparent",
                borderLeft: `20px solid ${hexa("#FFF6E4", 0.92)}` }} />
              <div style={{ position: "absolute", left: 6, right: 6, bottom: 7, height: 5,
                background: hexa("#000", 0.44) }} />
              <div style={{ position: "absolute", left: 6, bottom: 7, height: 5,
                width: `${18 + ((f * 1.6 + i * 29) % 74)}%`, background: hexa("#FFF6E4", 0.9) }} />
            </>) : kind === "take" ? (<>
              {/* a take card: its own little waveform, and a take number */}
              {Array.from({ length: 11 }, (_, b) => (
                <div key={"bw" + b} style={{ position: "absolute", left: 8 + b * ((cw - 30) / 11),
                  width: Math.max(3, (cw - 30) / 18), bottom: 16,
                  height: 8 + Math.abs(Math.sin(b * 1.9 + i * 0.7 + f / 9)) * (ch * 0.42),
                  background: hexa("#F2E8FF", 0.86) }} />
              ))}
              <div style={{ position: "absolute", left: 7, top: 6, ...mono(13, 900),
                color: hexa("#F2E8FF", 0.8) }}>{String(i + 1).padStart(2, "0")}</div>
            </>) : (<>
              {/* a finished model on its own mini turntable, each at its own angle */}
              <div style={{ position: "absolute", left: "50%", top: "26%", width: cw * 0.40,
                height: cw * 0.40, marginLeft: -cw * 0.20,
                border: `4px solid ${hexa("#EAFBFF", 0.85)}`,
                transform: `perspective(240px) rotateY(${(f * 1.5 + i * 47) % 60 - 30}deg) rotateX(16deg)`,
                background: hexa("#EAFBFF", 0.14) }} />
              <div style={{ position: "absolute", left: "50%", bottom: 10, width: cw * 0.52,
                height: 9, marginLeft: -cw * 0.26, borderRadius: "50%",
                background: hexa("#EAFBFF", 0.5) }} />
            </>)}
          </div>
        );
      })}
    </>
  );
};

/* ⭐⭐⭐ THE PLUGINS ARE GEMS — and rev 9 cuts them properly.

   A gem says the whole thing without a word: obviously VALUABLE, obviously
   COUNTABLE, readable at thumbnail size. The header already says "3 FREE AI
   TOOLS", so the stone never repeats the price.

   ⛔ THE FIRST CUT WAS TWELVE FLAT FACETS AND IT READ AS A COLOURED ARROWHEAD.
   What makes a stone look like a stone is not the outline, it is that light
   does FOUR different things inside it, and all four have to be drawn:

     1  FACETS at many angles — six crown, six pavilion, five lower-girdle,
        each on its own tint off the tool's colour, so no two neighbours match.
     2  DISPERSION (the "fire") — thin spectral slivers where facets meet.
        This is the single thing that separates a gem from a plastic bead.
     3  BRILLIANCE — internal facets that FLASH, out of phase with each other,
        so the stone is never the same twice.
     4  A CAUSTIC — the coloured light it throws onto the surface under it. A
        gem is a light SOURCE in a shot, not a shape sitting in one.

   Thirty-one drawn elements. `feedback_props_need_real_drawing`: reel 106's
   note cleared by taking one object from 4 elements to ~22. */
export const PluginGem: React.FC<{ x: number; y: number; s?: number; i: number; f: number;
  z?: number; rot?: number; label?: boolean; glow?: number; flash?: number;
  labelDy?: number }> =
  ({ x, y, s = 1, i, f, z = 60, rot = 0, label = true, glow = 1, flash = 0,
     labelDy = 0 }) => {
  const t = R.tools[i % R.tools.length];
  const W0 = 200, H0 = 214;
  const hot = mxh(t.c, 0.86), lit = mxh(t.c, 0.58), md = mxh(t.c, 0.20);
  const dk = dkh(t.c, 0.26), dp = dkh(t.c, 0.50), dpp = dkh(t.c, 0.66);
  const ph = i * 2.1;
  /* two speculars at different rates — one slow sweep, one quick glint */
  const sweep = ((f * 2.4 + i * 61) % 300) - 50;
  const glint = 0.5 + 0.5 * Math.sin(f / 4.3 + ph);
  /* the brilliance: three facets flashing out of phase */
  const br = (k: number) => 0.5 + 0.5 * Math.sin(f / (3.6 + k * 1.7) + ph + k * 2.2);
  const CID = `g${i}_${z}`;
  return (
    <div style={{ position: "absolute", left: x - (W0 / 2) * s, top: y - H0 * s,
      width: W0 * s, height: (H0 + (label ? 46 : 0)) * s, zIndex: z,
      transform: `rotate(${rot}deg)`, transformOrigin: "50% 88%" }}>
      <svg width={W0 * s} height={H0 * s} viewBox="0 0 200 214" style={{ overflow: "visible" }}>
        <defs>
          <clipPath id={CID}><path d="M58 16 H142 L188 70 L100 206 L12 70 Z" /></clipPath>
        </defs>

        {/* ---- 4 · THE CAUSTIC it throws on the surface beneath it -------- */}
        <ellipse cx="100" cy="203" rx={92 * (0.86 + glow * 0.2)} ry={17 * (0.86 + glow * 0.2)}
          fill={hexa(t.c, 0.30 * glow)} />
        <ellipse cx="100" cy="203" rx={46 * (0.86 + glow * 0.2)} ry={9}
          fill={hexa(mxh(t.c, 0.7), 0.34 * glow)} />
        {/* the halo in the air around it */}
        <ellipse cx="100" cy="112" rx={104 * (0.9 + glow * 0.18)} ry={112 * (0.9 + glow * 0.18)}
          fill={hexa(t.c, (0.13 + flash * 0.2) * glow)} />

        {/* ---- 1 · THE PAVILION: six mains converging on the culet ------- */}
        <path d="M12 70 L46 70 L100 206 Z" fill={dpp} />
        <path d="M46 70 L73 70 L100 206 Z" fill={dp} />
        <path d="M73 70 L100 70 L100 206 Z" fill={dk} />
        <path d="M100 70 L127 70 L100 206 Z" fill={md} />
        <path d="M127 70 L154 70 L100 206 Z" fill={dp} />
        <path d="M154 70 L188 70 L100 206 Z" fill={dpp} />
        {/* the lower-girdle facets — the row that makes a pavilion read deep */}
        {[[12, 46], [46, 73], [73, 100], [100, 127], [127, 154], [154, 188]].map((g, k) => (
          <path key={"lg" + k}
            d={`M${g[0]} 70 L${g[1]} 70 L${(g[0] + g[1]) / 2} ${104 + (k % 2) * 12} Z`}
            fill={hexa(k % 2 ? lit : md, 0.34 + br(k) * 0.40)} />
        ))}
        {/* ---- 3 · BRILLIANCE: internal flashes, out of phase ------------- */}
        <path d="M73 70 L100 70 L100 150 Z" fill={hexa(hot, 0.16 + br(0) * 0.5)} />
        <path d="M100 70 L127 70 L100 168 Z" fill={hexa(hot, 0.12 + br(1) * 0.42)} />
        <path d="M46 70 L73 70 L100 190 Z" fill={hexa(lit, 0.08 + br(2) * 0.30)} />

        {/* ---- 1 · THE CROWN: six facets between table and girdle -------- */}
        <path d="M58 16 L44 48 L12 70 Z" fill={dk} />
        <path d="M142 16 L156 48 L188 70 Z" fill={dp} />
        <path d="M44 48 L100 48 L100 70 L12 70 Z" fill={md} />
        <path d="M100 48 L156 48 L188 70 L100 70 Z" fill={lit} />
        {/* the table, split into two star facets so the top is not one slab */}
        <path d="M58 16 L100 16 L100 48 L44 48 Z" fill={hexa(hot, 0.9)} />
        <path d="M100 16 L142 16 L156 48 L100 48 Z" fill={mxh(t.c, 0.68)} />

        {/* ---- 2 · DISPERSION — the fire. Thin spectral slivers where the
             facets meet, which is the one thing that stops a stone reading as
             a plastic bead. Warm on one side, cool on the other. */}
        <g clipPath={`url(#${CID})`} opacity={0.5 + glint * 0.5}>
          <path d="M62 72 L74 72 L100 188 L94 190 Z" fill={hexa("#FF7A4A", 0.5)} />
          <path d="M74 72 L82 72 L100 186 L100 194 Z" fill={hexa("#FFD65E", 0.46)} />
          <path d="M120 72 L130 72 L104 188 L100 182 Z" fill={hexa("#5EE0FF", 0.44)} />
          <path d="M130 72 L140 72 L110 176 L104 178 Z" fill={hexa("#9B7BFF", 0.38)} />
          <path d="M46 52 L60 52 L52 68 L38 68 Z" fill={hexa("#FF9E5E", 0.34)} />
          <path d="M142 52 L156 52 L166 68 L150 68 Z" fill={hexa("#6EF0E4", 0.32)} />
        </g>

        {/* the girdle, and the bright line along it */}
        <path d="M12 70 H188" stroke={hexa("#FFFFFF", 0.62)} strokeWidth="5" />
        <path d="M44 48 H156" stroke={hexa("#FFFFFF", 0.30)} strokeWidth="3" />

        {/* the travelling specular, clipped to the stone */}
        <g clipPath={`url(#${CID})`}>
          <path d={`M${sweep} 214 L${sweep + 42} 0 L${sweep + 80} 0 L${sweep + 38} 214 Z`}
            fill={hexa("#FFFFFF", 0.16 + glint * 0.24)} />
        </g>
        {/* the rim light down the lit edge — a polished stone has a hard edge */}
        <path d="M58 16 L142 16 L188 70" fill="none" stroke={hexa("#FFFFFF", 0.72)}
          strokeWidth="5" strokeLinecap="round" />

        {/* the cut outline last, so every facet reads against it */}
        <path d="M58 16 H142 L188 70 L100 206 L12 70 Z" fill="none"
          stroke="#15171C" strokeWidth="8" strokeLinejoin="round" />

        {/* sparkles: a four-point star with a cross flare, on their own phases */}
        {[[24, 44, 1.0], [178, 92, 0.78], [150, 22, 0.6], [46, 132, 0.5]].map((sp, k) => {
          const tw = Math.max(0, Math.sin(f / (6 + k * 2.4) + ph + k * 1.7));
          if (tw < 0.05) return null;
          const r = (sp[2] as number) * 20 * tw, X = sp[0] as number, Y = sp[1] as number;
          return (
            <g key={"sk" + k} opacity={0.45 + tw * 0.55}>
              <path d={`M${X} ${Y - r} Q${X} ${Y} ${X + r} ${Y} Q${X} ${Y} ${X} ${Y + r}
                        Q${X} ${Y} ${X - r} ${Y} Q${X} ${Y} ${X} ${Y - r} Z`}
                fill={hexa("#FFFFFF", 0.95)} />
              <path d={`M${X - r * 1.5} ${Y} H${X + r * 1.5} M${X} ${Y - r * 1.5} V${Y + r * 1.5}`}
                stroke={hexa("#FFFFFF", 0.5)} strokeWidth={1.6} />
            </g>
          );
        })}
      </svg>

      {/* ⛔ ONE line of type: WHICH tool it is. No stars, no licence, no price —
          the header carries the price and repeating it is the clutter note.
          ⛔ AND `labelDy` STAGGERS IT. Three labelled objects moving down one
          belt put three 420px plates on the same baseline, and they overlapped
          into "MONEY PRINTER TURBO | 3D | SoVITS". Each stone takes its own row. */}
      {label ? (
        <div style={{ position: "absolute", left: -110 * s, top: (H0 + 4 + labelDy) * s,
          width: 420 * s, display: "flex", justifyContent: "center" }}>
          <div style={{ padding: `${5 * s}px ${13 * s}px`, background: "#15171C",
            borderRadius: 6 * s, border: `${3 * s}px solid ${hexa(t.c, 0.85)}`,
            ...mono(16 * s, 900), color: "#F6EFDC", whiteSpace: "nowrap" }}>{t.n}</div>
        </div>
      ) : null}
    </div>
  );
};


/* ===========================================================================
   HIERARCHY · rev 10.  *"each scene is not interesting / hierarchical enough,
   main focus not interesting."*

   ⛔⛔⛔ THE DENSITY PASS BOUGHT MOTION AND SPENT HIERARCHY TO GET IT. Reel 90's
   note names this exactly: *"that is not hierarchy, that is a crowded frame
   with no first place."* Counted off the contact sheet, in eight of eleven body
   scenes the hero object sits at 15-25% of the panel — the SAME visual weight
   as the crowd band, the wall content and the room behind it.

   ⭐⭐⭐ AND THE CROWD IS THE PART THAT IS WRONGLY LIT. `feedback_eyecatch_is_
   value_structure` says the reference reels run a pale ground, a NEAR-BLACK
   mass and ONE hot accent. My crowd band is bright clay orange — the same value
   as the hero, so it competes for first place instead of framing it.

   ⛔ BUT THE FIX IS **NOT** A DARK TINT ON THE SPRITE. That renders black Claude
   mascots and already collected *"wtf why are there black claude sprites"*.
   A crowd standing between the camera and the light is IN SHADOW, so the honest
   fix is to draw the shadow they are standing in — a foreground shade over the
   band's own region, above the band and below nothing else. The sprites keep
   their own colour; the region gets darker, which is what actually happens. */
export const NearShade: React.FC<{ top?: number; z?: number; k?: number }> =
  ({ top = 596, z = 88, k = 0.62 }) => (
  <>
    <div style={{ position: "absolute", left: -80, right: -80, top, bottom: -140, zIndex: z,
      pointerEvents: "none",
      background: `linear-gradient(180deg, ${hexa("#0B0F16", 0)} 0%, ${hexa("#0B0F16", k * 0.55)} 42%, ${hexa("#0B0F16", k)} 100%)` }} />
    {/* the warm bounce that keeps them from going flat black */}
    <div style={{ position: "absolute", left: -80, right: -80, top: top + 40, bottom: -140,
      zIndex: z + 1, pointerEvents: "none", mixBlendMode: "overlay",
      background: `linear-gradient(180deg, ${hexa("#FFCF8E", 0)} 0%, ${hexa("#FFCF8E", 0.10)} 100%)` }} />
  </>
);

/* ⭐⭐⭐ THE HERO KEY — the pool of light that makes ONE object first.
   Hierarchy is not only size: `feedback_hook_simplicity` says striking comes
   from SCALE and REAL COLOUR, and the hook's gem is first because it is the
   BRIGHTEST thing in its frame, not merely the biggest. Every body scene gets
   the same treatment: a soft key on the subject, so the eye has somewhere to
   land before it reads anything else. */
export const HeroKey: React.FC<{ x: number; y: number; r?: number; c?: string;
  z?: number; k?: number }> = ({ x, y, r = 300, c = "#FFF3D6", z = 26, k = 1 }) => (
  <>
    <div style={{ position: "absolute", left: x - r, top: y - r, width: r * 2, height: r * 2,
      zIndex: z, pointerEvents: "none", borderRadius: "50%",
      background: `radial-gradient(circle, ${hexa(c, 0.30 * k)} 0%, ${hexa(c, 0.12 * k)} 42%, ${hexa(c, 0)} 72%)` }} />
    <div style={{ position: "absolute", left: x - r * 0.44, top: y - r * 0.44,
      width: r * 0.88, height: r * 0.88, zIndex: z, pointerEvents: "none", borderRadius: "50%",
      background: `radial-gradient(circle, ${hexa(c, 0.26 * k)} 0%, ${hexa(c, 0)} 70%)` }} />
  </>
);

/* ===========================================================================
   THE THREE TOOLS, EACH DRAWN AS WHAT IT ACTUALLY DOES · rev 11.

   ⛔⛔⛔ *"instead of the gems we should see objects that represent each of the
   plugins or repos actually."*  He is right and the gem's weakness is precise:
   three gems in three colours are ONE object recolored three times, so the
   picture says "three valuable things" and stops. It cannot say WHICH three,
   and the whole reel is about which three.

   Each tool now gets the object of its own job, and each one ANIMATES as the
   thing it is, which is also the answer to "the animations need to be way more
   interesting" — the object is not decorated, it is RUNNING:

     video  MoneyPrinterTurbo · one topic -> a finished short
            a vertical player: sprocket edges, a frame that CUTS between shots,
            a scrub bar that runs, a play head, a render counter.
     voice  GPT-SoVITS · one minute -> a cloned voice
            a capsule mic over a live waveform, with the clone rings emitting
            outward — the waveform is real per-bar animation, not a texture.
     mesh   Hunyuan3D · one photo -> a 3D model
            a wireframe solid TURNING on a turntable, its vertices picked out,
            with a scan line climbing it.

   ⛔ AND EACH ONE STILL HAS TO TRAVEL. `feedback_a_sway_is_not_motion`: seating
   a beautiful static hero cost this reel 0.4 of motion once already. Every one
   of these carries a breathing halo, which is a ~300x320 field and repaints far
   more than the object itself does.
   ========================================================================= */
export const ToolObject: React.FC<{
  x: number; y: number; s?: number; i: number; f: number; z?: number;
  rot?: number; label?: boolean; glow?: number; live?: number; labelDy?: number;
}> = ({ x, y, s = 1, i, f, z = 60, rot = 0, label = true, glow = 1, live = 1,
       labelDy = 0 }) => {
  const t = R.tools[i % R.tools.length];
  const kind = (["video", "voice", "mesh"] as const)[i % 3];
  const W0 = 230, H0 = 250;
  const lit = mxh(t.c, 0.56), md = mxh(t.c, 0.18), dk = dkh(t.c, 0.34), dp = dkh(t.c, 0.58);

  return (
    <div style={{ position: "absolute", left: x - (W0 / 2) * s, top: y - H0 * s,
      width: W0 * s, height: (H0 + (label ? 46 : 0)) * s, zIndex: z,
      transform: `rotate(${rot}deg)`, transformOrigin: "50% 88%" }}>
      <svg width={W0 * s} height={H0 * s} viewBox="0 0 230 250" style={{ overflow: "visible" }}>
        {/* the halo and the pool it throws — the hero has to be the brightest
            thing in its frame, and a breathing field is also the repaint */}
        <ellipse cx="115" cy="120" rx={122 * (0.9 + glow * 0.18)} ry={128 * (0.9 + glow * 0.18)}
          fill={hexa(t.c, 0.14 * glow)} />
        <ellipse cx="115" cy="242" rx={98 * (0.86 + glow * 0.2)} ry={16}
          fill={hexa(t.c, 0.30 * glow)} />

        {kind === "video" ? (<>
          {/* ---- the short-form player, mid-render ---------------------- */}
          <rect x="30" y="10" width="170" height="216" rx="18" fill={dp} stroke="#15171C" strokeWidth="8" />
          <rect x="44" y="26" width="142" height="164" rx="6" fill="#0D1116" />
          {/* the shot currently on screen — it CUTS every 11 frames */}
          {(() => {
            const shot = Math.floor(f / 11) % 3;
            const C = [lit, md, dk][shot];
            return (<>
              <rect x="44" y="26" width="142" height="164" fill={hexa(C, 0.55)} />
              <rect x={54 + shot * 12} y={54 + shot * 16} width={62 + shot * 10}
                height={44 + shot * 8} rx="4" fill={hexa("#FFF6E4", 0.5)} />
              <circle cx={150 - shot * 14} cy={70 + shot * 20} r={16 + shot * 4}
                fill={hexa("#FFF6E4", 0.34)} />
            </>);
          })()}
          {/* the play head, and the scrub bar that RUNS */}
          <path d="M104 96 L104 132 L136 114 Z" fill={hexa("#FFF6E4", 0.94)} />
          <rect x="52" y="176" width="126" height="7" rx="3" fill={hexa("#FFFFFF", 0.24)} />
          <rect x="52" y="176" height="7" rx="3" fill="#FFF6E4"
            width={6 + ((f * 2.1) % 120)} />
          {/* the render counter ticking up */}
          <rect x="52" y="196" width="126" height="20" rx="4" fill={hexa("#000", 0.5)} />
          <text x="115" y="212" textAnchor="middle" fill={hexa("#FFF6E4", 0.9)} fontSize="15"
            fontFamily="ui-monospace, monospace" fontWeight="800">
            {`RENDER ${String(Math.floor((f * 1.7) % 100)).padStart(2, "0")}%`}</text>
          {/* sprocket edges — it is FILM, not a phone */}
          {Array.from({ length: 9 }, (_, k) => (
            <React.Fragment key={"sp" + k}>
              <rect x="14" y={16 + k * 24} width="12" height="14" rx="2" fill={hexa("#F6EFDC", 0.7)} />
              <rect x="204" y={16 + k * 24} width="12" height="14" rx="2" fill={hexa("#F6EFDC", 0.7)} />
            </React.Fragment>
          ))}
        </>) : kind === "voice" ? (<>
          {/* ---- the capsule mic over a live waveform ------------------- */}
          <rect x="74" y="8" width="82" height="112" rx="41" fill={dk} stroke="#15171C" strokeWidth="8" />
          {Array.from({ length: 7 }, (_, k) => (
            <rect key={"gr" + k} x="84" y={22 + k * 13} width="62" height="6" rx="3"
              fill={hexa("#0B0E12", 0.7)} />
          ))}
          <rect x="106" y="118" width="18" height="26" fill={dp} />
          <rect x="76" y="142" width="78" height="12" rx="5" fill={dp} stroke="#15171C" strokeWidth="6" />
          {/* the live waveform — every bar its own value, every frame */}
          <rect x="18" y="158" width="194" height="62" rx="7" fill="#0D1116"
            stroke={hexa("#15171C", 0.9)} strokeWidth="5" />
          {Array.from({ length: 21 }, (_, k) => {
            const h = 6 + Math.abs(Math.sin(k * 1.7 + f / 4.2)) * 44 * (0.35 + live * 0.65);
            return (
              <rect key={"wv" + k} x={26 + k * 8.6} y={189 - h / 2} width="5" height={h} rx="2"
                fill={hexa(k % 3 ? lit : "#FFF6E4", 0.9)} />
            );
          })}
          {/* the clone rings emitting outward */}
          {[0, 1, 2].map((k) => {
            const tt = ((f / 26) + k / 3) % 1;
            return (
              <ellipse key={"rg" + k} cx="115" cy="64" rx={44 + tt * 96} ry={30 + tt * 66}
                fill="none" stroke={hexa(lit, (1 - tt) * 0.6 * live)} strokeWidth={5 - tt * 3} />
            );
          })}
          <rect x="18" y="228" width="194" height="14" rx="6" fill={dp} />
        </>) : (<>
          {/* ---- the wireframe solid, TURNING on its table -------------- */}
          {(() => {
            const a = f * 0.055;                       /* the turn */
            const R1 = 74, R2 = 50, CY = 104, DY = 52;
            const P = (r: number, cy: number) =>
              [0, 1, 2, 3, 4, 5].map((k) => {
                const th = a + (k * Math.PI) / 3;
                return [115 + Math.cos(th) * r, cy + Math.sin(th) * r * 0.34];
              });
            const top = P(R1, CY - DY), bot = P(R2, CY + DY);
            const poly = (pts: number[][]) => pts.map((q) => q.join(",")).join(" ");
            return (<>
              <polygon points={poly(top)} fill={hexa(lit, 0.34)} stroke={hexa("#EAFBFF", 0.9)} strokeWidth="4" />
              <polygon points={poly(bot)} fill={hexa(dp, 0.6)} stroke={hexa("#EAFBFF", 0.7)} strokeWidth="4" />
              {top.map((q, k) => (
                <line key={"ed" + k} x1={q[0]} y1={q[1]} x2={bot[k][0]} y2={bot[k][1]}
                  stroke={hexa("#EAFBFF", 0.66)} strokeWidth="3.5" />
              ))}
              {/* the vertices, picked out — a mesh is POINTS and edges */}
              {[...top, ...bot].map((q, k) => (
                <circle key={"vt" + k} cx={q[0]} cy={q[1]} r="5.5" fill="#EAFBFF" />
              ))}
            </>);
          })()}
          {/* the scan line climbing it */}
          <rect x="26" y={30 + ((f * 2.4) % 150)} width="178" height="5"
            fill={hexa("#BFE8F0", 0.8)} />
          {/* the turntable */}
          <ellipse cx="115" cy="196" rx="92" ry="24" fill={dk} stroke="#15171C" strokeWidth="7" />
          <ellipse cx="115" cy="192" rx="70" ry="17" fill={hexa("#EAFBFF", 0.18)} />
          {Array.from({ length: 12 }, (_, k) => {
            const th = f * 0.06 + (k * Math.PI) / 6;
            return (
              <circle key={"tk" + k} cx={115 + Math.cos(th) * 76} cy={194 + Math.sin(th) * 20}
                r="3.5" fill={hexa("#EAFBFF", 0.7)} />
            );
          })}
          <rect x="86" y="212" width="58" height="26" rx="5" fill={dp} stroke="#15171C" strokeWidth="6" />
        </>)}
      </svg>

      {label ? (
        <div style={{ position: "absolute", left: -110 * s, top: (H0 + 4 + labelDy) * s,
          width: 450 * s, display: "flex", justifyContent: "center" }}>
          <div style={{ padding: `${5 * s}px ${13 * s}px`, background: "#15171C",
            borderRadius: 6 * s, border: `${3 * s}px solid ${hexa(t.c, 0.85)}`,
            ...mono(16 * s, 900), color: "#F6EFDC", whiteSpace: "nowrap" }}>{t.n}</div>
        </div>
      ) : null}
    </div>
  );
};

/* ===========================================================================
   SHOTS · rev 12.  *"not enough switching in between scenes … it shows up and
   then nothing happens afterwards."*

   ⛔⛔⛔ MEASURED, AND IT IS NOT A TASTE NOTE. Cut-detected on the panel crop:

       reel 133      10 cuts / 29.9s   =  ONE SHOT EVERY 3.0 SECONDS
       and the three TOOL scenes are 5.17s / 5.04s / 4.90s — **half the reel is
       three shots that never change framing once**, while every other scene in
       it runs 1.2-2.7s.

   A five-second locked-off frame is exactly what "it shows up and then nothing
   happens afterwards" feels like: the event lands two seconds in and the camera
   has nowhere else to go, so the remaining three seconds are the same picture
   with a smaller thing moving in it.

   This cuts INSIDE a scene. Each shot is a hard cut to a new framing — a wide,
   a push on the station that is working, a close on the detail — so the same
   staging yields three pictures instead of one.

   ⛔ `feedback_shot_count_is_a_floor`: NO SHOT UNDER 0.7s (21 frames).
   ⛔ `feedback_transform_order_multiplies_translate`: `scale(k) translate(tx)`
      multiplies tx by k. Translate FIRST, scale second.
   ⛔ `feedback_no_flashing_transitions`: a cut is a cut. No flash, no dip.
   ⭐ Each shot gets a 10-frame settle — a real camera does not stop dead — so
      the frame is still moving after the object has landed, which is the other
      half of the note. */
export type Shot = { at: number; s: number; x?: number; y?: number; drift?: number };
export const Shots: React.FC<{ f: number; shots: Shot[]; children: React.ReactNode }> =
  ({ f, shots, children }) => {
  let i = 0;
  for (let k = 0; k < shots.length; k++) if (f >= shots[k].at) i = k;
  const sh = shots[i];
  const lf = f - sh.at;
  /* the settle: the framing eases the last few percent into place after the
     cut, and then keeps drifting slowly for the rest of the shot */
  const settle = E(lf, 0, 10, 0, 1, OUT);
  const drift = (sh.drift ?? 0.05) * (lf / 60);
  const s = sh.s * (0.965 + settle * 0.035) + drift;
  const x = (sh.x ?? 0) * (0.9 + settle * 0.1);
  const y = (sh.y ?? 0) * (0.9 + settle * 0.1);
  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 2,
      transform: `translate(${x}px, ${y}px) scale(${s})`, transformOrigin: "50% 54%" }}>
      {children}
    </div>
  );
};


/* ⭐⭐⭐ A MARKETPLACE DISPATCH SLOT — rev 14.  *"the animation at 16 seconds
   needs to be completely replaced with a better concept."*

   At 16s the VO is **"so sell narration services ON FIVERR AND UPWORK"** — a
   SELLING beat — and the picture was still the cloning booth with the two marks
   as 40px chips in a corner. The scene's concept ("the clone is drawn as more
   Claudes") belongs to the first half of that line and nothing answered the
   second half.

   ⛔ The hook already ends on two big static marketplace boards, so repeating
   that here would be the same picture twice. This is the same marks doing a
   different JOB: a posting slot with a mouth the finished takes go INTO, a
   counter that ticks with each one, and a lamp that fires on arrival. The
   motion is the POSTING, not the board arriving. */
export const DispatchSlot: React.FC<{ x: number; y: number; w?: number; mark: string;
  k: number; hits?: number; f: number; z?: number; c?: string }> =
  ({ x, y, w = 292, mark, k, hits = 0, f, z = 90, c = "#1DBF73" }) => {
  if (k <= 0) return null;
  const h = w * 0.66;
  const flash = Math.max(0, 1 - (hits % 1) * 3);
  return (
    <div style={{ position: "absolute", left: x - w / 2, top: y - h / 2, width: w, height: h,
      zIndex: z, opacity: Math.min(1, k * 2.4),
      transform: `translateY(${(1 - k) * 90}px) scale(${0.82 + k * 0.18})`,
      background: "linear-gradient(168deg,#2A2E36 0%,#171A20 100%)",
      border: "8px solid #0B0D11", borderRadius: 14 }}>
      {/* the mark, large, on its own board */}
      <div style={{ position: "absolute", left: 0, right: 0, top: h * 0.10, height: h * 0.36,
        display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Img src={staticFile("logos/" + mark)}
          style={{ width: w * 0.56, height: h * 0.32, objectFit: "contain" }} />
      </div>
      {/* THE MOUTH the takes are posted into — a real slot with a lip */}
      <div style={{ position: "absolute", left: w * 0.12, right: w * 0.12, top: h * 0.53,
        height: h * 0.17, borderRadius: 5, background: "#05070A",
        border: `4px solid ${hexa(c, 0.55 + flash * 0.45)}` }} />
      <div style={{ position: "absolute", left: w * 0.12, right: w * 0.12, top: h * 0.53,
        height: 5, background: hexa("#FFFFFF", 0.22) }} />
      {/* the arrival lamp, and the count of what has gone in */}
      <div style={{ position: "absolute", left: w * 0.12, top: h * 0.78, width: 17, height: 17,
        borderRadius: "50%", background: hexa(c, 0.3 + flash * 0.7),
        border: "3px solid rgba(0,0,0,0.5)" }} />
      <div style={{ position: "absolute", right: w * 0.12, top: h * 0.75, ...mono(23, 900),
        color: hexa("#F6EFDC", 0.92) }}>{String(Math.floor(hits)).padStart(2, "0")}</div>
    </div>
  );
};
