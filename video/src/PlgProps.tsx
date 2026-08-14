import React from "react";
import { Img, staticFile } from "remotion";
import { MONO, Mascot } from "./SlopKit";
import { inter, fraunces } from "./fonts";
import {
  W, H, E, OUT, IO, BACK, IN_Q, LIN, hexa, mxh, dkh, SH, SH_D, rnd, Contact,
  CLAY, GOLD, GREEN, RED, SKY, PAPER, INK, MUTE,
  STEEL, STEELD, STEELL, CREAMP, CREAMD, CREAML, RUBBER, RUBBERL, HAZARD,
  COPPER, COPPERL, PEG, PEGD, LAMPC, BOLT,
  MODULES, APIS, TOOLS, PROVIDERS, ADD_CMD, TRAYS, TOTAL_STARS, Tile, RepoPlate,
} from "./PlgWorld";
import type { Module } from "./PlgWorld";

/* ===========================================================================
   REEL 104 "PLUGIN" · THE PROPS.  Board: storyboards/104-plugin.md.

   ⛔ EVERY PROP HERE IS A THING, NOT A SYMBOL. The board's mapping table has no
      row that reads "stands for", and this file is where that promise is either
      kept or lost. A prop that needs translating gets cut, not restyled
      ([[feedback_real_marks_are_the_props]] — two worlds died learning this).

   ⛔ NO `0 0 Npx <colour>` ANYWHERE ([[feedback_reel_matte_palette]]). Practical
      light is a solid disc, a shaped cone, or a low-alpha ring. The ship gate
      greps this file for emissive blur and a hit is a hard fail.

   ⛔ IDLES ARE CEILING'D BUT VISIBLE. 1.15deg / 1.7px measured as "never static"
      and READ as static; 2.6deg / 4.6px with a second slower harmonic is the
      amplitude that actually registers ([[feedback_scene_needs_an_arc]]).
   ========================================================================= */

/** a damped rock — ⛔ nothing in this reel lands and STOPS. */
export const rock = (lf: number, at: number, amp = 5.5, k = 26) =>
  lf < at ? 0 : Math.sin((lf - at) / 3.1) * amp * Math.exp(-(lf - at) / k);

/** the ceiling'd component idle, two harmonics so it never looks like a loop */
export const sway = (f: number, seed: number, amp = 1) => ({
  r: (Math.sin(f / 41 + seed * 2.3) * 2.6 + Math.sin(f / 97 + seed) * 0.9) * amp,
  y: (Math.sin(f / 37 + seed * 1.7) * 4.6 + Math.sin(f / 89 + seed * 3) * 1.6) * amp,
});

/** a short impact shake on the whole shot */
export const shake = (lf: number, at: number, amp = 12, n = 11) => {
  if (lf < at || lf > at + n) return { x: 0, y: 0 };
  const k = 1 - (lf - at) / n;
  const d = k * k * amp;
  return { x: Math.sin(lf * 2.7) * d, y: Math.cos(lf * 3.4) * d * 0.7 };
};

/** the house sprite wrapper — one costume lever per scene, never repeated */
export const Guy: React.FC<{ x: number; y: number; s?: number; z?: number; f: number;
  costume: Record<string, number | string>; gaze?: number; cheer?: number; shock?: number;
  stern?: number; nodAmp?: number; nodSpeed?: number; o?: number }> =
  ({ x, y, s = 1, z = 78, f, costume, gaze = 0.5, cheer = 0, shock = 0, stern = 0,
     nodAmp = 3.2, nodSpeed = 11, o = 1 }) => {
  const SZ = 196 * s;
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: z, opacity: o }}>
      <Contact x={SZ * 0.13} y={SZ * 0.90} w={SZ * 0.74} z={-1} o={0.34} />
      <Mascot lf={f} size={SZ} gaze={gaze} cheer={cheer} shock={shock} stern={stern}
        nodAmp={nodAmp} nodSpeed={nodSpeed} {...(costume as any)} />
    </div>
  );
};

/** a sweeping highlight across a surface — a component idle that costs nothing */
export const Sheen: React.FC<{ x: number; y: number; w: number; h: number; f: number;
  period?: number; z?: number; o?: number }> =
  ({ x, y, w, h, f, period = 150, z = 92, o = 0.16 }) => {
  const k = (f % period) / period;
  return (
    <div style={{ position: "absolute", left: x, top: y, width: w, height: h, zIndex: z,
      overflow: "hidden", pointerEvents: "none", borderRadius: 12 }}>
      <div style={{ position: "absolute", top: -h * 0.4, left: -w * 0.5 + k * w * 1.9,
        width: w * 0.30, height: h * 1.8, transform: "rotate(16deg)", opacity: o,
        background: `linear-gradient(90deg, transparent 0%, #FFFFFF 50%, transparent 100%)` }} />
    </div>
  );
};

/* =========================================================================
   ⭐⭐ THE TWO TRAVELLING PRIMITIVES — the motion audit's actual currency.

   Measured on this reel: with identical pushes, `press` scored 10.44 and
   `vault-marks` scored 2.83. The only structural difference is that the press
   has a full-width belt and four spools TRAVELLING across the frame every
   frame, and the marks scene has three tiles swinging 3 degrees in place.
   [[feedback_scene_needs_an_arc]] measured the same thing on three other reels:
   a bar filling is +0.11, a 30x38 cursor travelling is ~0, and "36 tiles
   scrolling continuously across the frame" is +1.90.

   ⛔ So the rule these two exist to enforce: EVERY SCENE GETS ONE LARGE, BRIGHT
      THING CROSSING IT. Small props never add up, however many you add.
   ⛔ And they are FURNITURE — they travel behind the hero and never compete for
      first place ([[feedback_hook_simplicity]]: reduce IDEAS, not LAYERS).
   ====================================================================== */

/** a bright band crossing the full panel on a loop — an inspection light */
export const ScanBar: React.FC<{ y: number; h: number; f: number; period?: number;
  z?: number; c?: string; o?: number; w?: number; phase?: number }> =
  ({ y, h, f, period = 96, z = 34, c = "#FFFFFF", o = 0.20, w = 230, phase = 0 }) => {
  const k = (((f + phase) % period) / period) * (W + w * 2) - w;
  return (
    <div style={{ position: "absolute", left: k - w / 2, top: y, width: w, height: h, zIndex: z,
      pointerEvents: "none", transform: "skewX(-9deg)",
      background: `linear-gradient(90deg, ${hexa(c, 0)} 0%, ${hexa(c, o)} 46%, ${hexa(c, o * 1.3)} 52%, ${hexa(c, 0)} 100%)` }} />
  );
};

/** ⭐ A HIGH-CONTRAST REPEATING BAND TRAVELLING THE FULL WIDTH.
    This is the single most efficient honest motion in the reel and it was found
    by measurement, not taste: the press's conveyor is nothing but this, and that
    scene scored 10.42 while its neighbours sat at 5. A repeating gradient moving
    a few px per frame changes a high-contrast edge across the entire panel every
    single frame, which is exactly what the audit integrates.
    ⛔ It must be DIEGETIC in every scene that uses it — a gantry chain, a cable
       run, a shelf rail, a conveyor. It is never an abstract stripe overlay. */
export const TravelBand: React.FC<{ y: number; h: number; f: number; speed?: number;
  z?: number; a: string; b: string; pitch?: number; o?: number; cap?: boolean }> =
  ({ y, h, f, speed = 3.0, z = 25, a, b, pitch = 38, o = 1, cap = true }) => (<>
    <div style={{ position: "absolute", left: -60, right: -60, top: y, height: h, zIndex: z,
      opacity: o,
      background: `repeating-linear-gradient(90deg, ${a} 0 ${pitch / 2}px, ${b} ${pitch / 2}px ${pitch}px)`,
      transform: `translateX(${-((f * speed) % pitch)}px)` }} />
    {cap && (<>
      <div style={{ position: "absolute", left: -60, right: -60, top: y - 5, height: 6,
        zIndex: z + 1, opacity: o, background: mxh(a, 0.22) }} />
      <div style={{ position: "absolute", left: -60, right: -60, top: y + h, height: 7,
        zIndex: z + 1, opacity: o, background: dkh(b, 0.36) }} />
    </>)}
  </>);

/** a carriage running a rail across the whole frame — a gantry trolley, a
    rolling library ladder, a parts cart. Large, solid, and it never stops. */
export const Trolley: React.FC<{ y: number; f: number; period?: number; z?: number;
  w?: number; h?: number; c?: string; dir?: number; phase?: number; hang?: number }> =
  ({ y, f, period = 210, z = 22, w = 132, h = 54, c = "#AFB7BE", dir = 1, phase = 0, hang = 0 }) => {
  const t = (((f + phase) % period) / period);
  const x = dir > 0 ? t * (W + w * 2) - w : (W + w) - t * (W + w * 2);
  const sw = Math.sin((f + phase) / 29) * 2.8;
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: z }}>
      <div style={{ width: w, height: h, borderRadius: 7,
        background: `linear-gradient(174deg, ${mxh(c, 0.18)} 0%, ${dkh(c, 0.24)} 100%)`,
        border: `3px solid ${dkh(c, 0.40)}`, boxShadow: SH }} />
      {/* the two rail wheels */}
      {[0.22, 0.78].map((p, i) => (
        <div key={"w" + i} style={{ position: "absolute", left: w * p - 11, top: -13,
          width: 22, height: 22, borderRadius: "50%", background: dkh(c, 0.34),
          border: `3px solid ${dkh(c, 0.52)}` }} />
      ))}
      {/* what it is carrying, swinging under it */}
      {hang > 0 && (
        <div style={{ position: "absolute", left: w / 2 - 3, top: h,
          transformOrigin: "50% 0%", transform: `rotate(${sw}deg)` }}>
          <div style={{ width: 6, height: hang, background: dkh(c, 0.44) }} />
          <div style={{ position: "absolute", left: -26, top: hang, width: 58, height: 40,
            borderRadius: 6, background: dkh(c, 0.16), border: `3px solid ${dkh(c, 0.42)}` }} />
        </div>
      )}
    </div>
  );
};

/** the big number plate — one value, huge, in the display face */
export const NumPlate: React.FC<{ x: number; y: number; v: string; label: string; s?: number;
  z?: number; c?: string; p?: number }> =
  ({ x, y, v, label, s = 1, z = 88, c = GOLD, p = 1 }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z, opacity: p,
    transform: `scale(${0.9 + p * 0.1})`, transformOrigin: "0% 50%" }}>
    <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 96 * s,
      lineHeight: 0.94, letterSpacing: "-0.03em", color: c,
      textShadow: "0 4px 14px rgba(0,0,0,0.45)" }}>{v}</div>
    <div style={{ fontFamily: MONO, fontWeight: 800, fontSize: 15 * s, letterSpacing: "0.20em",
      color: "#E6DDCA", marginTop: 5 * s, opacity: 0.9 }}>{label}</div>
  </div>
);

/* =========================================================================
   ⭐⭐ THE BAY PLATE — THE HERO ARTIFACT.

   One cream faceplate with three module bays across it. Frame 0: three bays
   EMPTY and dark. Final frame: three modules SEATED and lit. Everything else in
   this reel is staging for that one object changing state, and the board
   forbids showing the full plate before 27.4s ([[feedback_scene_needs_an_arc]]:
   the payoff must not be spent early — draft 1 teased the seated plate at frame
   0 and that was cut).

   ⭐ IT IS ALSO THE FRAME-0 CLAIM PLATE. [[feedback_frame0_claim_plate]] is the
      only MEASURED IG-performance rule in memory: the AGENCY cuts that performed
      opened with a contiguous cream region >= 18% of the panel starting below
      y=120, carrying the Claude mark on a white tile >= 130px and a number in
      Fraunces >= 74px. At s=1 this plate is 648 x 342 = 27.6% of the panel, and
      it carries both. One object satisfies the hero artifact AND the cover.
   ====================================================================== */
export const BayPlate: React.FC<{
  x: number; y: number; f: number; s?: number; z?: number;
  /** per-bay fill: 0 empty · 0..1 module sliding in · >=1 seated */
  seat?: [number, number, number];
  /** per-bay contact light 0..1 */
  lit?: [number, number, number];
  title?: string; sub?: string; markS?: number;
}> = ({ x, y, f, s = 1, z = 70, seat = [0, 0, 0], lit = [0, 0, 0],
        title = "3 PLUGINS", sub = "CLAUDE CODE", markS = 152 }) => {
  const PW = 648 * s, PH = 342 * s;
  const BW = 172 * s, BH = 132 * s, GAP = 22 * s;
  const bx0 = (PW - (BW * 3 + GAP * 2)) / 2;
  const by = PH - BH - 30 * s;
  return (
    <div style={{ position: "absolute", left: x, top: y, width: PW, height: PH, zIndex: z }}>
      {/* the plate itself — the contiguous cream region the cover rule measures */}
      <div style={{ position: "absolute", inset: 0, borderRadius: 20 * s, background:
        `linear-gradient(172deg, ${CREAML} 0%, ${CREAMP} 58%, ${mxh(CREAMD, 0.34)} 100%)`,
        border: `${5 * s}px solid ${CREAMD}`, boxShadow: SH_D }} />
      {/* the corner fasteners — it is a machine face, not a card */}
      {/* ⛔ PW/PH ALREADY CARRY `s` — the inset constants are the only thing that
          still needs scaling, or the fasteners walk off the plate at s != 1. */}
      {[[18 * s, 18 * s], [PW - 34 * s, 18 * s], [18 * s, PH - 34 * s], [PW - 34 * s, PH - 34 * s]].map(([cx, cy], i) => (
        <div key={"fs" + i} style={{ position: "absolute", left: cx, top: cy,
          width: 16 * s, height: 16 * s, borderRadius: "50%", background: mxh(STEEL, 0.10),
          border: `${2.5 * s}px solid ${dkh(STEEL, 0.34)}`, zIndex: 4 }} />
      ))}
      {/* the Claude mark on a white tile — the audience filter, big and early */}
      <div style={{ position: "absolute", left: 26 * s, top: 24 * s, zIndex: 6,
        width: markS * s, height: markS * s, borderRadius: markS * s * 0.24,
        background: "#FFFFFF", border: `${3 * s}px solid ${CREAMD}`, boxShadow: SH,
        display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Img src={staticFile("claude_logo.png")}
          style={{ width: markS * s * 0.78, height: markS * s * 0.78, objectFit: "contain" }} />
      </div>
      {/* ⛔ THE CLAIM IS A NUMBER PLUS A WORD, NOT A SENTENCE. v1 set the whole
          string in Fraunces at 88px beside a 152px mark: "PLUGINS" ran off the
          plate and collided with bay 3. The cover rule wants the NUMBER in
          Fraunces >= 74px — it does not want the label there too — so the
          numeral carries the display face at 116px and the word sits beside it
          in the UI face, which fits the 648px plate with room to spare. */}
      <div style={{ position: "absolute", left: (40 + markS) * s, top: 30 * s, zIndex: 6,
        display: "flex", alignItems: "baseline", gap: 14 * s }}>
        <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 116 * s,
          lineHeight: 0.86, letterSpacing: "-0.045em", color: "#24201A" }}>{title}</span>
        <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 44 * s,
          letterSpacing: "-0.01em", color: "#3A3226" }}>PLUGINS</span>
      </div>
      <div style={{ position: "absolute", left: (42 + markS) * s, top: 132 * s, zIndex: 6,
        fontFamily: MONO, fontWeight: 800, fontSize: 19 * s, letterSpacing: "0.14em",
        color: "#6A6052", whiteSpace: "nowrap" }}>{sub}</div>
      {/* the three bays */}
      {[0, 1, 2].map((i) => {
        const sx = bx0 + i * (BW + GAP);
        const st = Math.min(1, Math.max(0, seat[i]));
        const li = Math.min(1, Math.max(0, lit[i]));
        return (
          <div key={"by" + i} style={{ position: "absolute", left: sx, top: by, width: BW, height: BH, zIndex: 5 }}>
            {/* the recess — dark, with a hard inner top edge so it reads as a HOLE */}
            <div style={{ position: "absolute", inset: 0, borderRadius: 11 * s,
              background: `linear-gradient(180deg, ${dkh(STEEL, 0.74)} 0%, ${dkh(STEEL, 0.58)} 100%)`,
              border: `${3 * s}px solid ${dkh(CREAMD, 0.28)}` }} />
            <div style={{ position: "absolute", left: 3 * s, right: 3 * s, top: 3 * s, height: 8 * s,
              borderRadius: 5 * s, background: dkh(STEEL, 0.82), opacity: 0.8 }} />
            {/* the contact pins at the back of the bay */}
            <div style={{ position: "absolute", left: 16 * s, right: 16 * s, bottom: 12 * s,
              height: 12 * s, display: "flex", gap: 7 * s, alignItems: "flex-end" }}>
              {Array.from({ length: 8 }, (_, k) => (
                <div key={"pn" + k} style={{ flex: 1, height: 12 * s, borderRadius: 2 * s,
                  background: li > 0.05 ? mxh(CLAY, 0.30) : mxh(STEELD, 0.10),
                  opacity: li > 0.05 ? 0.55 + li * 0.45 : 0.5 }} />
              ))}
            </div>
            {/* the module, sliding home */}
            {st > 0.01 && (
              <div style={{ position: "absolute", left: 8 * s, top: 8 * s + (1 - st) * 150 * s,
                width: BW - 16 * s, height: BH - 16 * s, borderRadius: 8 * s, zIndex: 3,
                opacity: Math.min(1, st * 2.4),
                background: `linear-gradient(168deg, ${mxh(MODULES[i].accent, 0.28)} 0%, ${MODULES[i].accent} 62%, ${dkh(MODULES[i].accent, 0.30)} 100%)`,
                border: `${3 * s}px solid ${dkh(MODULES[i].accent, 0.42)}`, boxShadow: SH }}>
                <div style={{ position: "absolute", left: 0, right: 0, top: 12 * s, textAlign: "center",
                  fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 19 * s,
                  letterSpacing: "0.05em", color: "#FFFFFF" }}>{MODULES[i].spoken}</div>
                <div style={{ position: "absolute", left: 0, right: 0, top: 40 * s, textAlign: "center",
                  fontFamily: MONO, fontWeight: 700, fontSize: 14 * s, color: "#FFFFFF", opacity: 0.82 }}>
                  ★ {MODULES[i].stars}
                </div>
                {/* the grip ribs */}
                <div style={{ position: "absolute", left: 18 * s, right: 18 * s, bottom: 13 * s,
                  height: 22 * s, borderRadius: 4 * s, display: "flex", gap: 5 * s }}>
                  {Array.from({ length: 6 }, (_, k) => (
                    <div key={"rb" + k} style={{ flex: 1, borderRadius: 2 * s,
                      background: dkh(MODULES[i].accent, 0.30), opacity: 0.85 }} />
                  ))}
                </div>
              </div>
            )}
            {/* the seated indicator — a solid lamp + one low-alpha ring, never a blur */}
            <div style={{ position: "absolute", left: BW / 2 - 9 * s, top: -22 * s,
              width: 18 * s, height: 18 * s, borderRadius: "50%", zIndex: 6,
              background: li > 0.05 ? CLAY : dkh(CREAMD, 0.34),
              border: `${2.5 * s}px solid ${li > 0.05 ? dkh(CLAY, 0.30) : dkh(CREAMD, 0.48)}` }} />
            {li > 0.05 && (
              <div style={{ position: "absolute", left: BW / 2 - 22 * s, top: -35 * s,
                width: 44 * s, height: 44 * s, borderRadius: "50%", zIndex: 5,
                background: hexa(CLAY, 0.16 * li) }} />
            )}
            {/* the shaped contact cone up the plate — ⛔ a cone, never a full tint */}
            {li > 0.05 && (
              <div style={{ position: "absolute", left: BW / 2 - 86 * s, top: -168 * s,
                width: 172 * s, height: 172 * s, zIndex: 2, opacity: 0.30 * li,
                background: `linear-gradient(0deg, ${hexa(CLAY, 0.60)} 0%, transparent 78%)`,
                clipPath: "polygon(42% 100%, 58% 100%, 100% 0%, 0% 0%)" }} />
            )}
          </div>
        );
      })}
      <Sheen x={0} y={0} w={PW} h={PH} f={f} period={190} z={9} o={0.13} />
    </div>
  );
};

/* =========================================================================
   THE CAPABILITY BANK — the VO's *"only using about 40%"*, drawn as an
   IGNORANCE picture.

   ⛔⛔ IT CARRIES NO RECEIPT. No source line, no ★, no benchmark plate. The
      claim is unbackable and this reel's receipts are reserved for the three
      numbers that are real ([[trade-reel]]: the gauge is graduated to the VO's
      number so audio and picture agree, and the real figures over-deliver
      later rather than contradict here).
   ⭐ AND THE ABSENCE HAS TO BEHAVE. [[apple-reel]]: six blank sheets were the
      CORRECT logic and a dead picture. So the lit twelve PULSE IN SEQUENCE
      while the dark eighteen never answer — the shot is never static and what
      it shows is an absence that is doing something.
   ====================================================================== */
export const CapabilityBank: React.FC<{ x: number; y: number; f: number; s?: number;
  z?: number; lit?: number; total?: number; sweep?: number }> =
  ({ x, y, f, s = 1, z = 40, lit = 12, total = 30, sweep = 1 }) => {
  const COLS = 6, CW = 78 * s, CH = 54 * s, G = 11 * s;
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: z }}>
      {/* the housing */}
      <div style={{ position: "absolute", left: -18 * s, top: -18 * s,
        width: COLS * CW + (COLS - 1) * G + 36 * s,
        height: Math.ceil(total / COLS) * CH + (Math.ceil(total / COLS) - 1) * G + 36 * s,
        borderRadius: 14 * s, background: dkh(STEELD, 0.30),
        border: `${4 * s}px solid ${dkh(STEELD, 0.48)}`, boxShadow: SH_D }} />
      {Array.from({ length: total }, (_, i) => {
        const on = i < lit;
        /* the lit ones pulse in sequence; the dark ones never answer */
        const ph = (f * 2.3 - (i % 6) * 9 - Math.floor(i / 6) * 5) % 78;
        const k = on && sweep > 0 ? Math.max(0, 1 - Math.abs(ph - 22) / 26) : 0;
        const base = on ? 0.72 : 0.16;
        return (
          <div key={"cb" + i} style={{ position: "absolute",
            left: (i % COLS) * (CW + G), top: Math.floor(i / COLS) * (CH + G),
            width: CW, height: CH, borderRadius: 7 * s, zIndex: 2,
            background: on ? mxh(GOLD, 0.02 + k * 0.62) : dkh(STEELD, 0.44),
            border: `${2.5 * s}px solid ${on ? dkh(GOLD, 0.34) : dkh(STEELD, 0.56)}`,
            opacity: base + k * 0.30 }} />
        );
      })}
    </div>
  );
};

/** the bank's needle gauge — it ROCKS on arrival, it never parks */
export const Gauge: React.FC<{ x: number; y: number; f: number; at: number; to: number;
  s?: number; z?: number; label?: string }> =
  ({ x, y, f, at, to, s = 1, z = 86, label = "IN USE" }) => {
  const v = E(f, at, at + 20, 0, to, OUT);
  const ang = -118 + (v / 100) * 236 + rock(f, at + 20, 4.2, 30)
    + (f > at + 20 ? Math.sin(f / 7.3) * 1.9 + Math.sin(f / 17.1) * 1.1 : 0);
  const R = 96 * s;
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: z }}>
      <div style={{ position: "absolute", left: -R, top: -R, width: R * 2, height: R * 2,
        borderRadius: "50%", background: `linear-gradient(168deg, ${CREAML} 0%, ${mxh(CREAMD, 0.30)} 100%)`,
        border: `${6 * s}px solid ${dkh(CREAMD, 0.30)}`, boxShadow: SH_D }} />
      {/* the graduations */}
      {Array.from({ length: 11 }, (_, i) => {
        const a = (-118 + i * 23.6) * Math.PI / 180;
        return (
          <div key={"gr" + i} style={{ position: "absolute",
            left: Math.sin(a) * (R - 20 * s) - 2 * s, top: -Math.cos(a) * (R - 20 * s) - 8 * s,
            width: 4 * s, height: 16 * s, background: i % 5 === 0 ? "#3A342A" : "#8C8474",
            borderRadius: 2 * s, transform: `rotate(${-118 + i * 23.6}deg)` }} />
        );
      })}
      {/* the needle */}
      <div style={{ position: "absolute", left: -3 * s, top: -R + 20 * s, width: 6 * s,
        height: R - 14 * s, background: RED, borderRadius: 3 * s, zIndex: 4,
        transformOrigin: "50% 100%", transform: `rotate(${ang}deg)` }} />
      <div style={{ position: "absolute", left: -13 * s, top: -13 * s, width: 26 * s, height: 26 * s,
        borderRadius: "50%", background: "#3A342A", zIndex: 5 }} />
      {/* ⛔ THE READOUT AND ITS LABEL COLLIDED. v1 put the number at R*0.30 in a
          54px face and the label at R*0.72: 0.30R + 54 overruns 0.72R at every
          scale, so "40%" and "IN USE" printed on top of each other in both
          scenes that use this dial. Both are now placed from one stack origin. */}
      <div style={{ position: "absolute", left: -R, top: R * 0.22, width: R * 2, textAlign: "center",
        fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 46 * s, lineHeight: 1.0,
        color: "#24201A", zIndex: 6 }}>
        {Math.round(v)}%
      </div>
      <div style={{ position: "absolute", left: -R, top: R * 0.22 + 50 * s, width: R * 2,
        textAlign: "center", fontFamily: MONO, fontWeight: 800, fontSize: 13 * s,
        letterSpacing: "0.16em", color: "#6A6052", zIndex: 6 }}>{label}</div>
    </div>
  );
};

/* =========================================================================
   MODULE 1 · THE KEY WALL — 134+ free API keys across 40+ providers.
   The cascade crosses the FULL panel width, not a corner: LARGE x BRIGHT x FAST
   is the only motion that registers ([[feedback_scene_needs_an_arc]]).
   ====================================================================== */
export const KeyWall: React.FC<{ x: number; y: number; w: number; h: number; f: number;
  fill: number; z?: number; seed?: number }> =
  ({ x, y, w, h, f, fill, z = 24, seed = 5 }) => {
  const COLS = 13, ROWS = 6, N = COLS * ROWS;
  const CW = w / COLS;
  return (
    <div style={{ position: "absolute", left: x, top: y, width: w, height: h, zIndex: z }}>
      {/* the board */}
      <div style={{ position: "absolute", inset: 0, borderRadius: 10,
        background: `linear-gradient(176deg, ${mxh("#39406B", 0.12)} 0%, #262C4C 100%)`,
        border: `4px solid ${dkh("#39406B", 0.34)}`, boxShadow: SH_D }} />
      {Array.from({ length: N }, (_, i) => {
        const col = i % COLS, row = Math.floor(i / COLS);
        /* left-to-right cascade: a key's own threshold is its column position */
        const thr = col / COLS + row * 0.012;
        const k = Math.min(1, Math.max(0, (fill - thr) * 7));
        if (k <= 0.01) return (
          <div key={"hk" + i} style={{ position: "absolute", left: 14 + col * CW, top: 26 + row * (h - 44) / ROWS,
            width: 9, height: 9, borderRadius: "50%", background: dkh("#39406B", 0.44), zIndex: 2 }} />
        );
        const sw = Math.sin(f / 33 + i) * 3.1;
        return (
          <div key={"hk" + i} style={{ position: "absolute", left: 14 + col * CW,
            top: 26 + row * (h - 44) / ROWS, zIndex: 3, opacity: k,
            transformOrigin: "50% 0%", transform: `rotate(${sw}deg) translateY(${(1 - k) * -30}px)` }}>
            <div style={{ width: 9, height: 9, borderRadius: "50%", background: mxh("#39406B", 0.22) }} />
            <div style={{ position: "absolute", left: 3, top: 8, width: 3, height: 20,
              background: mxh(STEEL, 0.06) }} />
            {/* the key bit */}
            <div style={{ position: "absolute", left: -6, top: 27, width: 21, height: 26,
              borderRadius: "4px 4px 6px 6px",
              background: `linear-gradient(166deg, ${GOLD} 0%, ${dkh(GOLD, 0.34)} 100%)`,
              border: `2px solid ${dkh(GOLD, 0.44)}` }} />
          </div>
        );
      })}
    </div>
  );
};

/** a hanging provider key: the real mark on a white tile, on a ring, swinging */
export const KeyHook: React.FC<{ x: number; y: number; f: number; seed: number;
  p: { t: string; logo: string }; s?: number; z?: number; on?: number }> =
  ({ x, y, f, seed, p, s = 1, z = 82, on = 1 }) => {
  const sw = Math.sin(f / 39 + seed * 1.9) * 3.4 + Math.sin(f / 91 + seed) * 1.2;
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: z, opacity: on,
      transformOrigin: "50% 0%", transform: `rotate(${sw}deg)` }}>
      {/* the hook + ring */}
      <div style={{ position: "absolute", left: -4 * s, top: 0, width: 8 * s, height: 30 * s,
        background: mxh(STEEL, 0.04), borderRadius: 4 * s }} />
      <div style={{ position: "absolute", left: -16 * s, top: 24 * s, width: 32 * s, height: 32 * s,
        borderRadius: "50%", border: `${5 * s}px solid ${GOLD}` }} />
      {/* the tile */}
      <div style={{ position: "absolute", left: -56 * s, top: 56 * s }}>
        <Tile x={0} y={0} src={p.logo} s={112 * s} z={2} label={p.t} pad={0.22} />
      </div>
    </div>
  );
};

/** the brass tag that swings on the ring — the repo's own free-tier wording */
export const FreeTag: React.FC<{ x: number; y: number; f: number; s?: number; z?: number;
  t?: string; sub?: string; at?: number }> =
  ({ x, y, f, s = 1, z = 90, t = APIS.tier, sub = APIS.card, at = 0 }) => {
  const drop = E(f, at, at + 14, 0, 1, BACK);
  const sw = Math.sin((f - at) / 27) * 5.2 * Math.exp(-Math.max(0, f - at) / 90) +
             Math.sin((f - at) / 63) * 1.6;
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: z, opacity: drop,
      transformOrigin: "50% 0%", transform: `rotate(${sw}deg) translateY(${(1 - drop) * -34}px)` }}>
      <div style={{ position: "absolute", left: -3 * s, top: 0, width: 6 * s, height: 26 * s,
        background: dkh(GOLD, 0.20) }} />
      <div style={{ position: "absolute", left: -128 * s, top: 24 * s, width: 256 * s,
        padding: `${12 * s}px ${10 * s}px`, borderRadius: 10 * s, textAlign: "center",
        background: `linear-gradient(168deg, ${mxh(GOLD, 0.34)} 0%, ${GOLD} 100%)`,
        border: `${3 * s}px solid ${dkh(GOLD, 0.36)}`, boxShadow: SH }}>
        <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 25 * s,
          letterSpacing: "0.03em", color: "#2A2113" }}>{t}</div>
        <div style={{ fontFamily: MONO, fontWeight: 800, fontSize: 16 * s, letterSpacing: "0.10em",
          color: "#4A3A1C", marginTop: 4 * s }}>{sub}</div>
      </div>
    </div>
  );
};

/* =========================================================================
   THE LOOM — one seated module, three tools taking the config in one sweep.
   ⛔ THIS IS WHAT "ONE CLICK SETUP" HONESTLY LOOKS LIKE. The repo ships
      "ready-to-copy snippets for Claude Code, Cursor, Codex" — so the picture
      is a config landing in three tools, not an installer running.
   ====================================================================== */
export const Loom: React.FC<{ x: number; y: number; f: number; at: number; s?: number;
  z?: number; targets: { x: number; y: number }[] }> =
  ({ x, y, f, at, s = 1, z = 56, targets }) => (<>
    {targets.map((t, i) => {
      const k = E(f, at + i * 5, at + i * 5 + 16, 0, 1, OUT);
      const dx = t.x - x, dy = t.y - y;
      const len = Math.sqrt(dx * dx + dy * dy);
      const ang = Math.atan2(dy, dx) * 180 / Math.PI;
      return (
        <div key={"lm" + i} style={{ position: "absolute", left: x, top: y, width: len * k,
          height: 7 * s, zIndex: z, transformOrigin: "0% 50%", transform: `rotate(${ang}deg)`,
          borderRadius: 4 * s, background: `linear-gradient(90deg, ${dkh(CLAY, 0.18)} 0%, ${CLAY} 100%)`,
          opacity: 0.92 }} />
      );
    })}
  </>);

/** a tool socket the loom plugs into: real mark on a white tile + a cream tab */
export const Socket: React.FC<{ x: number; y: number; f: number; at: number;
  tool: { t: string; logo: string }; s?: number; z?: number }> =
  ({ x, y, f, at, tool, s = 1, z = 84 }) => {
  const take = E(f, at, at + 9, 0, 1, OUT);
  const pop = 1 + E(f, at, at + 6, 0, 1, OUT) * 0.10 - E(f, at + 6, at + 16, 0, 1, OUT) * 0.10;
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: z,
      transform: `scale(${pop})`, transformOrigin: "50% 50%" }}>
      <Tile x={0} y={0} src={tool.logo} s={92 * s} z={2} pad={tool.t === "CODEX" ? 0.26 : 0.20} />
      <div style={{ marginTop: 8 * s, padding: `${5 * s}px ${9 * s}px`, borderRadius: 8 * s,
        background: take > 0.5 ? CREAMP : dkh(CREAMD, 0.44),
        border: `${2.5 * s}px solid ${take > 0.5 ? CREAMD : dkh(CREAMD, 0.58)}`,
        textAlign: "center", boxShadow: take > 0.5 ? SH : undefined }}>
        <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 15 * s,
          letterSpacing: "0.05em", color: take > 0.5 ? "#26221B" : "#7A7263", whiteSpace: "nowrap" }}>
          {tool.t}
        </span>
      </div>
    </div>
  );
};

/* =========================================================================
   MODULE 2 · THE STACKS.
   ⛔⛔ THIS IS THE SCENE THAT STOPS AT THE EDGE OF THE CLAIM. The VO says
      find-skills "finds AND INSTALLS ... automatically". It does not: it
      searches the open skills ecosystem, scores candidates by install count and
      source reputation, and RECOMMENDS. Installing is a separate
      `npx skills add`. So this file draws the SEARCH and the RANKING, and the
      install arrives as a card that is HANDED OVER. Nothing installs itself.
   ⭐ And the honest mechanism is the better picture: "it installs it" is one
      motionless event; "it sweeps a library, scores everything and hands you the
      winner" is a scene with an arc.
   ====================================================================== */
export const SpineWall: React.FC<{ x: number; y: number; w: number; h: number; f: number;
  beam: number; z?: number; seed?: number }> =
  ({ x, y, w, h, f, beam, z = 20, seed = 11 }) => {
  const ROWS = 4, PER = 22;
  return (
    <div style={{ position: "absolute", left: x, top: y, width: w, height: h, zIndex: z }}>
      {Array.from({ length: ROWS }, (_, r) => (
        <div key={"sh" + r} style={{ position: "absolute", left: 0, top: r * (h / ROWS),
          width: w, height: h / ROWS - 12 }}>
          {/* the shelf board */}
          <div style={{ position: "absolute", left: -14, right: -14, bottom: -12, height: 14,
            background: dkh("#5E2B30", 0.30), borderRadius: 3, boxShadow: SH_D, zIndex: 4 }} />
          {Array.from({ length: PER }, (_, i) => {
            const sw = w / PER;
            const hh = (h / ROWS - 22) * (0.72 + rnd(seed + r, i) * 0.28);
            /* the beam lights a spine as it passes over it */
            const pos = (i + 0.5) / PER;
            const k = Math.max(0, 1 - Math.abs(beam - pos) * 5);
            return (
              <div key={"sp" + i} style={{ position: "absolute", left: i * sw + 3,
                bottom: 0, width: sw - 6, height: hh, borderRadius: "3px 3px 1px 1px", zIndex: 3,
                background: k > 0.02
                  ? mxh("#C9843C", 0.05 + k * 0.42)
                  : `linear-gradient(174deg, ${mxh("#7A3A38", rnd(seed, i) * 0.16)} 0%, ${dkh("#7A3A38", 0.22)} 100%)`,
                border: `2px solid ${k > 0.02 ? dkh("#C9843C", 0.28) : dkh("#7A3A38", 0.36)}`,
                transform: k > 0.02 ? `translateY(${-k * 9}px)` : undefined }} />
            );
          })}
        </div>
      ))}
    </div>
  );
};

/** the search beam sweeping the shelf width — the only cold thing in the frame */
export const SearchBeam: React.FC<{ x: number; y: number; w: number; h: number; pos: number;
  z?: number; o?: number }> = ({ x, y, w, h, pos, z = 60, o = 1 }) => (
  <div style={{ position: "absolute", left: x + pos * w - 105, top: y, width: 210, height: h,
    zIndex: z, opacity: o, pointerEvents: "none",
    background: `linear-gradient(90deg, transparent 0%, ${hexa("#CFE4F2", 0.30)} 44%, ${hexa("#EAF4FB", 0.42)} 50%, ${hexa("#CFE4F2", 0.30)} 56%, transparent 100%)` }} />
);

/** the rank rail: candidates re-ordering themselves by install count.
    ⛔ The bar is the tool's OWN quality signal, not an invented score. */
export const RankRail: React.FC<{ x: number; y: number; f: number; at: number; s?: number;
  z?: number }> = ({ x, y, f, at, s = 1, z = 86 }) => {
  /* six candidates; `installs` is the ranking key the tool actually uses */
  const C = [
    { n: "pdf-tools",     v: 0.34 }, { n: "test-runner",  v: 0.52 },
    { n: "api-scaffold",  v: 0.88 }, { n: "lint-fixer",   v: 0.41 },
    { n: "db-migrate",    v: 0.66 }, { n: "docs-writer",  v: 0.23 },
  ];
  const order = [...C].sort((a, b) => b.v - a.v);
  const mix = E(f, at, at + 26, 0, 1, IO);          /* they RE-ORDER, live */
  const RH = 42 * s, G = 9 * s;
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: z }}>
      {C.map((c, i) => {
        const to = order.indexOf(c);
        const row = i + (to - i) * mix;
        const win = to === 0;
        const bar = E(f, at - 6 + i * 2, at + 14 + i * 2, 0, c.v, OUT);
        /* ⭐ THEY FLY OUT OF THE SHELVES. The board said "six candidates fly out
           and land on a rank rail" and v1 shipped them as a fade — which is both
           the wrong picture and, measured, worth almost nothing: six large cards
           crossing the frame is the +1.90 shape, a cross-fade is ~0. Each starts
           at the shelf it came off and decelerates into its slot. */
        const fly = E(f, at - 22 + i * 3, at + 2 + i * 3, 0, 1, OUT);
        const fx = (1 - fly) * (240 + i * 96) * s;
        const fy = (1 - fly) * (-150 - (i % 3) * 74) * s;
        return (
          <div key={"rk" + c.n} style={{ position: "absolute", left: 0, top: row * (RH + G),
            width: 430 * s, height: RH, zIndex: win && mix > 0.7 ? 4 : 2, opacity: Math.min(1, fly * 3),
            transform: `translate(${fx + (win && mix > 0.7 ? E(f, at + 26, at + 38, 0, 26 * s, OUT) : 0)}px, ${fy}px) rotate(${(1 - fly) * 9}deg)` }}>
            <div style={{ position: "absolute", inset: 0, borderRadius: 8 * s,
              background: win && mix > 0.7 ? CREAMP : mxh("#5E2B30", 0.14),
              border: `${2.5 * s}px solid ${win && mix > 0.7 ? GOLD : dkh("#5E2B30", 0.20)}`,
              boxShadow: win && mix > 0.7 ? SH : undefined }} />
            {/* the install-count bar */}
            <div style={{ position: "absolute", left: 10 * s, top: RH / 2 - 7 * s,
              width: (250 * s) * bar, height: 14 * s, borderRadius: 7 * s, zIndex: 3,
              background: win && mix > 0.7 ? GOLD : mxh("#C9843C", 0.02), opacity: 0.9 }} />
            <div style={{ position: "absolute", left: 272 * s, top: RH / 2 - 12 * s, zIndex: 4,
              fontFamily: MONO, fontWeight: 700, fontSize: 19 * s,
              color: win && mix > 0.7 ? "#2A2419" : "#EBD9C4" }}>{c.n}</div>
          </div>
        );
      })}
      <div style={{ position: "absolute", left: 0, top: -30 * s, fontFamily: MONO, fontWeight: 800,
        fontSize: 15 * s, letterSpacing: "0.16em", color: "#F0DCC2", opacity: 0.85 }}>
        RANKED BY INSTALLS
      </div>
    </div>
  );
};

/** the card the tool HANDS YOU. ⛔ The real command, and it never runs itself. */
export const HandCard: React.FC<{ x: number; y: number; f: number; at: number; s?: number;
  z?: number }> = ({ x, y, f, at, s = 1, z = 94 }) => {
  const k = E(f, at, at + 14, 0, 1, BACK);
  const rk = rock(f, at + 14, 3.4, 24);
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: z, opacity: Math.min(1, k * 1.8),
      transform: `translateY(${(1 - k) * 40}px) rotate(${rk * 0.5}deg)`, transformOrigin: "20% 50%" }}>
      <div style={{ padding: `${14 * s}px ${20 * s}px`, borderRadius: 12 * s, background: CREAML,
        border: `${3 * s}px solid ${CREAMD}`, boxShadow: SH_D, whiteSpace: "nowrap" }}>
        <div style={{ fontFamily: MONO, fontWeight: 800, fontSize: 13 * s, letterSpacing: "0.18em",
          color: "#8A8071", marginBottom: 6 * s }}>YOU RUN THIS</div>
        <div style={{ fontFamily: MONO, fontWeight: 800, fontSize: 27 * s, color: "#221E17" }}>
          <span style={{ color: CLAY }}>$ </span>{ADD_CMD}
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   MODULE 3 · THE COLD ROOM — claude-mem, in the repo's own three verbs:
   CAPTURES what the session did, COMPRESSES it, INJECTS it into the next one.
   ====================================================================== */
export const Spool: React.FC<{ x: number; y: number; f: number; s?: number; z?: number;
  spin?: number; c?: string }> = ({ x, y, f, s = 1, z = 50, spin = 1, c = "#DCEFDF" }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z,
    transform: `rotate(${f * 2.4 * spin}deg)`, transformOrigin: "50% 50%" }}>
    <div style={{ width: 62 * s, height: 62 * s, borderRadius: "50%",
      background: `linear-gradient(160deg, ${c} 0%, ${dkh(c, 0.26)} 100%)`,
      border: `${4 * s}px solid ${dkh(c, 0.40)}`, boxShadow: SH }} />
    {Array.from({ length: 4 }, (_, i) => (
      <div key={"sk" + i} style={{ position: "absolute", left: 29 * s, top: 8 * s,
        width: 4 * s, height: 46 * s, background: dkh(c, 0.34), opacity: 0.7,
        transformOrigin: "50% 50%", transform: `rotate(${i * 45}deg)` }} />
    ))}
  </div>
);

export const Press: React.FC<{ x: number; y: number; f: number; at: number; s?: number;
  z?: number }> = ({ x, y, f, at, s = 1, z = 46 }) => {
  /* the ram comes down hard and returns slow — the weight is the whole point */
  const down = E(f, at, at + 8, 0, 1, IN_Q) - E(f, at + 16, at + 34, 0, 1, OUT);
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: z }}>
      {/* the frame */}
      <div style={{ position: "absolute", left: -14 * s, top: -18 * s, width: 28 * s, height: 250 * s,
        background: dkh(STEELD, 0.34), borderRadius: 5 * s }} />
      <div style={{ position: "absolute", left: 236 * s, top: -18 * s, width: 28 * s, height: 250 * s,
        background: dkh(STEELD, 0.34), borderRadius: 5 * s }} />
      <div style={{ position: "absolute", left: -22 * s, top: -34 * s, width: 294 * s, height: 30 * s,
        background: dkh(STEELD, 0.22), borderRadius: 6 * s, boxShadow: SH_D }} />
      {/* the ram */}
      <div style={{ position: "absolute", left: 14 * s, top: 4 * s + down * 96 * s,
        width: 222 * s, height: 76 * s, borderRadius: 7 * s, zIndex: 4,
        background: `linear-gradient(176deg, ${mxh(STEEL, 0.16)} 0%, ${dkh(STEEL, 0.30)} 100%)`,
        border: `${4 * s}px solid ${dkh(STEEL, 0.46)}`, boxShadow: SH_D }} />
      {/* the anvil */}
      <div style={{ position: "absolute", left: 6 * s, top: 190 * s, width: 238 * s, height: 42 * s,
        borderRadius: 6 * s, background: dkh(STEELD, 0.20), border: `${4 * s}px solid ${dkh(STEELD, 0.42)}`,
        zIndex: 3 }} />
    </div>
  );
};

/** the compressed wafer — the one warm object in a cold room */
export const Wafer: React.FC<{ x: number; y: number; f: number; s?: number; z?: number;
  o?: number }> = ({ x, y, f, s = 1, z = 88, o = 1 }) => {
  const b = 1 + Math.sin(f / 19) * 0.035;
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: z, opacity: o,
      transform: `scale(${b})`, transformOrigin: "50% 50%" }}>
      <div style={{ width: 128 * s, height: 30 * s, borderRadius: 6 * s,
        background: `linear-gradient(168deg, ${LAMPC} 0%, ${GOLD} 100%)`,
        border: `${3 * s}px solid ${dkh(GOLD, 0.34)}`, boxShadow: SH }} />
      <div style={{ position: "absolute", left: 12 * s, top: 10 * s, width: 104 * s, height: 4 * s,
        borderRadius: 2 * s, background: hexa("#FFFFFF", 0.5) }} />
    </div>
  );
};

/** the tray rack: what claude-mem keeps, in the VO's own three words, plus the
    NEXT session's tray — the repo's verb is "injects into future sessions" */
export const TrayRack: React.FC<{ x: number; y: number; f: number; at: number; s?: number;
  z?: number; nextLit?: number }> = ({ x, y, f, at, s = 1, z = 70, nextLit = 0 }) => {
  const RW = 260 * s, RH = 62 * s, G = 14 * s;
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: z }}>
      {TRAYS.map((t, i) => {
        const fill = E(f, at + i * 9, at + i * 9 + 15, 0, 1, OUT);
        return (
          <div key={"tr" + t} style={{ position: "absolute", left: 0, top: i * (RH + G),
            width: RW, height: RH }}>
            <div style={{ position: "absolute", inset: 0, borderRadius: 8 * s,
              background: dkh("#2A5C48", 0.24), border: `${3 * s}px solid ${dkh("#2A5C48", 0.40)}` }} />
            {/* what filled it */}
            <div style={{ position: "absolute", left: 5 * s, top: 5 * s, bottom: 5 * s,
              width: (RW - 10 * s) * fill, borderRadius: 6 * s,
              background: `linear-gradient(90deg, ${mxh(GREEN, 0.24)} 0%, ${mxh(GREEN, 0.44)} 100%)`,
              opacity: 0.62 }} />
            <div style={{ position: "absolute", left: 16 * s, top: RH / 2 - 13 * s, zIndex: 3,
              fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 22 * s, letterSpacing: "0.05em",
              color: fill > 0.4 ? "#F0FAF2" : "#8FB6A2" }}>{t}</div>
          </div>
        );
      })}
      {/* tomorrow's session — empty, then the wafer drops in and it lights */}
      <div style={{ position: "absolute", left: 0, top: 3 * (RH + G) + 18 * s, width: RW, height: RH }}>
        <div style={{ position: "absolute", inset: 0, borderRadius: 8 * s,
          background: nextLit > 0.4 ? mxh(GOLD, 0.16) : dkh("#2A5C48", 0.34),
          border: `${3 * s}px ${nextLit > 0.4 ? "solid" : "dashed"} ${nextLit > 0.4 ? GOLD : dkh("#2A5C48", 0.48)}` }} />
        <div style={{ position: "absolute", left: 16 * s, top: RH / 2 - 13 * s, zIndex: 3,
          fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 20 * s, letterSpacing: "0.05em",
          color: nextLit > 0.4 ? "#2A2113" : "#7FA894" }}>YOUR NEXT CHAT</div>
      </div>
    </div>
  );
};

/* =========================================================================
   THE CTA — the keyword as a STAMPED OBJECT, never a caption
   ([[feedback_graphical_over_textual]]).
   ====================================================================== */
export const JobCard: React.FC<{ x: number; y: number; f: number; at: number; s?: number;
  z?: number; word?: string }> = ({ x, y, f, at, s = 1, z = 92, word = "PLUGIN" }) => {
  const drop = E(f, at, at + 7, 0, 1, IN_Q);
  const rk = rock(f, at + 7, 4.6, 22);
  const ink = E(f, at + 6, at + 13, 0, 1, OUT);
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: z,
      transform: `translateY(${(1 - drop) * -120}px) rotate(${-2 + rk * 0.6}deg)`,
      transformOrigin: "50% 100%" }}>
      <div style={{ width: 520 * s, padding: `${26 * s}px ${28 * s}px`, borderRadius: 14 * s,
        background: CREAML, border: `${4 * s}px solid ${CREAMD}`, boxShadow: SH_D }}>
        <div style={{ fontFamily: MONO, fontWeight: 800, fontSize: 17 * s, letterSpacing: "0.20em",
          color: "#8A8071" }}>COMMENT</div>
        <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 108 * s,
          lineHeight: 1.0, letterSpacing: "-0.03em", color: CLAY, opacity: ink,
          transform: `scale(${0.94 + ink * 0.06})`, transformOrigin: "0% 50%" }}>{word}</div>
      </div>
    </div>
  );
};

/** the receipt at the peak — three real marks, the honest combined figure */
export const Receipt: React.FC<{ x: number; y: number; f: number; at: number; s?: number;
  z?: number }> = ({ x, y, f, at, s = 1, z = 90 }) => {
  const rise = E(f, at, at + 18, 0, 1, BACK);
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: z, opacity: Math.min(1, rise * 1.7),
      transform: `translateY(${(1 - rise) * 70}px)` }}>
      <div style={{ padding: `${18 * s}px ${24 * s}px`, borderRadius: 16 * s, background: CREAML,
        border: `${4 * s}px solid ${CREAMD}`, boxShadow: SH_D, textAlign: "center" }}>
        <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 82 * s,
          lineHeight: 1.0, letterSpacing: "-0.03em", color: "#24201A" }}>★ {TOTAL_STARS}</div>
        <div style={{ fontFamily: MONO, fontWeight: 800, fontSize: 17 * s, letterSpacing: "0.13em",
          color: "#6A6052", marginTop: 6 * s }}>MIT · MIT · APACHE-2.0</div>
      </div>
    </div>
  );
};
