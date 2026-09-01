import React from "react";
import { Img, staticFile } from "remotion";
import {
  E, OUT, IO, BACK, IN_Q, LIN, hexa, dkh, mxh, rnd, SH, SH_D, mono, ui,
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
