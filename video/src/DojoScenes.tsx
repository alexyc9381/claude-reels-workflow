import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { inter, fraunces } from "./fonts";
import { Bg, Panel, ProgressBar, Mascot, INK, CLAY, hexA } from "./SlopKit";
import {
  Dojo, Lantern, Shafts, Motes, Bloom, Weight, WeaponRack, HeavyBag, Scroll, Bell,
  DojoScreen, Nameplate, SpeedLines, Tag,
  BEAM, BEAM_D, BEAM_L, TATAMI, TATAMI_D, TATAMI_L, SHOJI, SHOJI_HI, SHOJI_LO,
  IRON, IRON_D, IRON_L, PAPER, PAPER2, PAPER3, SASH, GOLD_D, PLASTER, PLASTER_D,
  RED_M, RED_D, TEAL, PLUM, SH, SH_D, E, osc, OUT, IO, BACK,
} from "./DojoWorld";

/* =========================================================================
   REEL 81 "DELETE" · THE DOJO — scenes 1..8.

   The storyline (one room, one arc, pop-culture spine):
     Dragon Ball's weighted training gear meets Rocky's gym meets Karate Kid.
     Claude is a fighter buried in iron plates that everyone told it to strap
     on. The man who BUILT the dojo walks in and cuts the straps.

     D1  the strapping     · trainers ratchet MORE iron on. It sinks.
     D2  the sensei        · the door slides, one slash, every plate drops.
     D3  the founder       · his clip on the dojo screen. He built this place.
     D4  two training posts· the 2024 trainee NEEDED the iron. 2026 doesn't.
     D5  the punch short   · wrist iron drags the strike into the mat.
     D6  the six-month bell· the rack empties itself. Blur speed.
     D7  the iron shop     · a vending rack selling FRESH plates. Walk past.
     D8  the belt board    · DELETE burned into the top belt.

   No sliding transitions (root hard-cuts). Type is a label, never narration.
   ========================================================================= */

const MAT = 672;
const Ein = (t: number) => t * t;                 // gravity-ish: things DROP, they do not float

/* a small aged wood placard — the only type the room itself carries */
const Placard: React.FC<{ x: number; y: number; w?: number; s?: string; big: string; sub?: string; c?: string }> =
  ({ x, y, w = 210, s, big, sub, c = PAPER }) => (
  <div style={{ position: "absolute", left: x, top: y, width: w, background: c, border: `7px solid ${BEAM}`,
    borderRadius: 6, boxShadow: SH, padding: "12px 14px 14px" }}>
    {s && <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 20, letterSpacing: "0.1em", color: SASH }}>{s}</div>}
    <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 40, lineHeight: 1.02, color: INK }}>{big}</div>
    {sub && <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 21, lineHeight: 1.24, color: "#6B6355", marginTop: 5 }}>{sub}</div>}
  </div>
);

/* the striking post (makiwara): rope-bound timber, the thing you aim at */
const Makiwara: React.FC<{ x: number; y: number; s?: number; lean?: number }> = ({ x, y, s = 1, lean = 0 }) => (
  <div style={{ position: "absolute", left: x, top: y, transform: `scale(${s}) rotate(${lean}deg)`, transformOrigin: "50% 100%" }}>
    <div style={{ position: "absolute", left: 18, top: 0, width: 44, height: 300, background: BEAM, boxShadow: SH_D }} />
    <div style={{ position: "absolute", left: 18, top: 0, width: 13, height: 300, background: BEAM_L }} />
    <div style={{ position: "absolute", left: 0, top: 22, width: 80, height: 96, borderRadius: 8, background: TATAMI_D, boxShadow: SH }} />
    {[0, 1, 2, 3, 4].map((i) => (
      <div key={i} style={{ position: "absolute", left: 0, top: 26 + i * 19, width: 80, height: 7, background: "rgba(64,44,22,0.38)" }} />
    ))}
    <div style={{ position: "absolute", left: -14, top: 292, width: 108, height: 22, borderRadius: 5, background: BEAM_D }} />
  </div>
);

/* a peg-board belt: the dojo's rank board */
const Belt: React.FC<{ x: number; y: number; w?: number; c: string; label?: string; burn?: number }> =
  ({ x, y, w = 300, c, label, burn = 0 }) => (
  <div style={{ position: "absolute", left: x, top: y }}>
    <div style={{ position: "absolute", left: 0, top: 0, width: w, height: 42, borderRadius: 6, background: c, boxShadow: SH }} />
    <div style={{ position: "absolute", left: 0, top: 0, width: w, height: 11, borderRadius: 6, background: "rgba(255,255,255,0.22)" }} />
    <div style={{ position: "absolute", left: w - 128, top: -13, width: 52, height: 66, borderRadius: 6, background: c,
      border: "4px solid rgba(40,26,16,0.28)", boxShadow: SH }} />
    {label && (
      <div style={{ position: "absolute", left: 26, top: 2, fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 33,
        letterSpacing: "0.2em", color: burn > 0.5 ? "#FFF3E4" : "rgba(255,243,228,0.26)" }}>{label}</div>
    )}
  </div>
);

/* the iron shop: a glass-front vending rack of fresh plate packs */
const PlatePack: React.FC<{ f: number; x: number; y: number; label: string; gone?: boolean }> = ({ f, x, y, label, gone }) => {
  const sweep = ((f * 7) % 240) - 60;
  return (
    <div style={{ position: "absolute", left: x, top: y, width: 152, height: 118, opacity: gone ? 0.18 : 1 }}>
      <div style={{ position: "absolute", inset: 0, borderRadius: 8, background: IRON_D, border: `5px solid ${IRON_L}` }} />
      <div style={{ position: "absolute", left: 16, top: 20, right: 16, height: 30, borderRadius: 4, background: IRON }} />
      <div style={{ position: "absolute", left: 16, top: 58, right: 16, height: 30, borderRadius: 4, background: IRON }} />
      <div style={{ position: "absolute", left: 0, right: 0, bottom: -2, height: 26, background: SASH, borderRadius: "0 0 6px 6px",
        fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 17, letterSpacing: "0.1em", color: "#FFF3E4", textAlign: "center", lineHeight: "26px" }}>{label}</div>
      {!gone && <div style={{ position: "absolute", left: sweep, top: 0, width: 34, height: "100%", background: "rgba(255,246,223,0.5)", transform: "skewX(-18deg)" }} />}
    </div>
  );
};

/* ================= D1 · the trainers ratchet MORE iron on (4.98) ============ */
export const D1Strap: React.FC = () => {
  const f = useCurrentFrame();
  /* three plates get slammed on, 14 frames apart. It sinks with each one. */
  const HITS = [10, 26, 42];
  const on = HITS.map((h) => (f >= h ? 1 : 0));
  const kick = HITS.reduce((a, h) => a + (f >= h && f < h + 5 ? 1 - (f - h) / 5 : 0), 0);
  const sink = on.reduce((a: number, v) => a + v, 0) * 15 + kick * 9;
  const shake = kick * Math.sin(f * 4.1) * 11;

  const NEW: [string, number, number, number][] = [
    ["AGENTS", 470, 424, 138],
    ["COMMANDS", 796, 420, 176],
    ["PLUGINS", 620, 372, 158],
  ];
  const WORN: [string, number, number, number][] = [
    ["CLAUDE.md", 636, 500, 216],
    ["SKILLS", 486, 508, 126],
    ["HOOKS", 878, 504, 120],
  ];

  return (
    <AbsoluteFill>
      <Bg /><ProgressBar />
      <Tag f={f} icon="🏋️" word="STRAP MORE ON" />
      <Panel glow={hexA(GOLD_D, 0.24)}>
        <div style={{ position: "absolute", inset: 0, transform: `translateX(${shake}px)` }}>
          <Dojo f={f} matTop={MAT} />
          <Shafts f={f} n={3} from={170} />
          <Lantern f={f} x={104} y={104} s={0.74} />
          <Scroll x={952} y={116} s={0.6} marks={3} />
          <WeaponRack x={54} y={372} s={0.82} />

          {/* the fighter, sinking under every new plate */}
          <div style={{ position: "absolute", left: 552, top: MAT - 396 * 0.86 + sink, zIndex: 6,
            filter: "drop-shadow(0 20px 26px rgba(40,26,16,0.58))" }}>
            <Mascot lf={f} size={396} shock={0.4 + Math.min(0.4, sink / 90)} nodAmp={0.9} nodSpeed={22} />
          </div>

          {/* the iron it already wears */}
          {WORN.map(([l, x, y, w], i) => (
            <div key={l as string} style={{ position: "absolute", zIndex: 8 }}>
              <Weight x={x as number} y={(y as number) + sink} label={l as string} w={w as number} rot={i === 1 ? -8 : i === 2 ? 7 : 0} />
            </div>
          ))}

          {/* the trainers, handing over MORE */}
          {[[300, 176, 1], [900, 164, -1]].map(([tx, sz, dir], i) => (
            <div key={i} style={{ position: "absolute", left: tx as number, top: MAT - 54 - (sz as number) * 0.82, zIndex: 7,
              filter: "drop-shadow(0 14px 18px rgba(40,26,16,0.46))" }}>
              <Mascot lf={f + i * 31} size={sz as number} gaze={(dir as number) * 2} tint="#8E8A7E" cheer={0.7} nodAmp={2.6} nodSpeed={8 + i} />
            </div>
          ))}

          {/* the new plates fly in and SLAM on */}
          {NEW.map(([l, x, y, w], i) => {
            const h = HITS[i];
            const p = E(f, h - 8, h, 0, 1, Ein);
            if (p <= 0) return null;
            const fromX = i === 1 ? 300 : -300;
            return (
              <div key={l as string} style={{ position: "absolute", zIndex: 9,
                transform: `translate(${(1 - p) * fromX}px, ${(1 - p) * -120}px)`, opacity: Math.min(1, p * 2.4) }}>
                <Weight x={x as number} y={(y as number) + sink} label={l as string} w={w as number}
                        rot={(i % 2 ? 6 : -5) * (1 - p) * 4 + (i % 2 ? 6 : -5)} />
              </div>
            );
          })}

          {/* dust puffs off each slam */}
          {HITS.map((h, i) => {
            const k = f - h;
            if (k < 0 || k > 12) return null;
            const t = k / 12;
            return [0, 1, 2, 3].map((j) => (
              <div key={`${i}-${j}`} style={{ position: "absolute", left: 520 + j * 96 - t * 30 * (j - 1.5), top: MAT - 20 + j * 5,
                width: 52 + t * 60, height: 18, borderRadius: 10, background: TATAMI_L, opacity: (1 - t) * 0.8, zIndex: 10 }} />
            ));
          })}

          {/* the load rail: iron chips filling, no sentence needed */}
          <div style={{ position: "absolute", left: 44, top: 470, display: "flex", flexDirection: "column-reverse", gap: 9, zIndex: 12 }}>
            {[0, 1, 2, 3, 4, 5].map((i) => {
              const lit = i < 3 + on.reduce((a: number, v) => a + v, 0);
              return <div key={i} style={{ width: 74, height: 21, borderRadius: 4, background: lit ? IRON : "rgba(74,71,64,0.2)",
                border: `3px solid ${lit ? IRON_L : "rgba(74,71,64,0.28)"}`, boxShadow: lit ? SH : "none" }} />;
            })}
          </div>

          <Motes f={f} n={18} />
        </div>
      </Panel>
    </AbsoluteFill>
  );
};

/* ============= D2 · the sensei slides the door and cuts it all (7.54) ====== */
export const D2Cut: React.FC = () => {
  const f = useCurrentFrame();
  const DOOR = 8, WALK = 18, SLASH = 34, FALL = 38;
  const door = E(f, DOOR, DOOR + 12, 0, 1, IO);
  const walk = E(f, WALK, WALK + 14, 0, 1, OUT);
  const slash = f >= SLASH && f < SLASH + 7 ? 1 - (f - SLASH) / 7 : 0;
  const fall = E(f, FALL, FALL + 12, 0, 1, Ein);
  const land = f >= FALL + 10;
  const quake = land && f < FALL + 24 ? 1 - (f - FALL - 10) / 14 : 0;

  const WORN: [string, number, number, number, number][] = [
    ["CLAUDE.md", 440, 500, 216, 0],
    ["SKILLS", 294, 508, 126, -9],
    ["HOOKS", 676, 504, 120, 8],
    ["MEMORY", 452, 578, 184, 2],
  ];

  return (
    <AbsoluteFill>
      <Bg /><ProgressBar />
      <Tag f={f} icon="✂️" word="CUT THE STRAPS" c={SASH} />
      <Panel glow={hexA(SASH, 0.26)}>
        <div style={{ position: "absolute", inset: 0, transform: `translateX(${quake * Math.sin(f * 3.6) * 15}px)` }}>
          <Dojo f={f} matTop={MAT} />

          {/* the door slides open on the right and the light comes in with him */}
          <div style={{ position: "absolute", left: 700, top: 60, width: 290, height: MAT - 114, overflow: "hidden", zIndex: 3 }}>
            <div style={{ position: "absolute", inset: 0, background: SHOJI_HI }} />
            <div style={{ position: "absolute", inset: 0,
              background: `radial-gradient(ellipse at 50% 40%, #FFFFFF 0%, ${SHOJI_HI} 52%, ${SHOJI} 100%)` }} />
            {/* the sliding panel itself */}
            <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 290,
              transform: `translateX(${door * -300}px)`, background: SHOJI, borderRight: `13px solid ${BEAM}` }}>
              {[0, 1, 2].map((i) => <div key={i} style={{ position: "absolute", left: 0, right: 0, top: 84 + i * 128, height: 11, background: BEAM }} />)}
              <div style={{ position: "absolute", left: 128, top: 0, bottom: 0, width: 11, background: BEAM }} />
            </div>
          </div>
          {/* what is outside: sky band, hedge, stone lantern, threshold timber */}
          {door > 0.1 && (
            <div style={{ position: "absolute", left: 700, top: 60, width: 290, height: MAT - 114, overflow: "hidden", zIndex: 3, opacity: door }}>
              <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 232, background: SHOJI_HI }} />
              <div style={{ position: "absolute", left: 0, right: 0, top: 214, height: 86, background: "#7E8C63" }} />
              <div style={{ position: "absolute", left: 0, right: 0, top: 214, height: 16, background: "#96A377" }} />
              {[0, 1, 2, 3, 4].map((i) => (
                <div key={i} style={{ position: "absolute", left: -14 + i * 66, top: 196, width: 74, height: 62, borderRadius: "50% 50% 40% 40%", background: "#6E7C55" }} />
              ))}
              <div style={{ position: "absolute", left: 0, right: 0, top: 296, bottom: 0, background: "#B9A882" }} />
              {/* a stone lantern in the garden */}
              <div style={{ position: "absolute", left: 168, top: 168 }}>
                <div style={{ position: "absolute", left: 14, top: 0, width: 54, height: 20, background: "#77726A", borderRadius: 4 }} />
                <div style={{ position: "absolute", left: 22, top: 18, width: 38, height: 34, background: GOLD_D, borderRadius: 4 }} />
                <div style={{ position: "absolute", left: 6, top: 50, width: 70, height: 13, background: "#77726A", borderRadius: 3 }} />
                <div style={{ position: "absolute", left: 30, top: 62, width: 22, height: 74, background: "#8A857C" }} />
                <div style={{ position: "absolute", left: 14, top: 132, width: 54, height: 16, background: "#77726A", borderRadius: 3 }} />
              </div>
              {/* stepping stones */}
              {[0, 1, 2].map((i) => (
                <div key={i} style={{ position: "absolute", left: 24 + i * 88, top: 336 + i * 34, width: 78, height: 30, borderRadius: "50%", background: "#9C917C" }} />
              ))}
            </div>
          )}
          {/* the threshold timber + the light spilling in off it */}
          {door > 0.2 && (
            <div style={{ position: "absolute", left: 690, top: MAT - 66, width: 310, height: 30, background: BEAM_D, zIndex: 5, borderRadius: 3 }} />
          )}
          {door > 0.2 && (
            <div style={{ position: "absolute", left: 700, top: 60, width: 300, height: 700, zIndex: 4, opacity: door * 0.62,
              background: "linear-gradient(200deg, rgba(255,255,255,0.94) 0%, rgba(255,246,223,0.4) 46%, rgba(255,246,223,0) 84%)",
              clipPath: "polygon(0 0, 100% 0, 42% 100%, -60% 100%)" }} />
          )}
          <Shafts f={f} n={2} from={560} />

          {/* the fighter, still loaded */}
          <div style={{ position: "absolute", left: 356, top: MAT - 396 * 0.86, zIndex: 6,
            filter: "drop-shadow(0 20px 26px rgba(40,26,16,0.58))" }}>
            <Mascot lf={f} size={396} shock={fall > 0.5 ? 0.1 : 0.55} nodAmp={fall > 0.5 ? 3 : 1} nodSpeed={fall > 0.5 ? 8 : 22} />
          </div>
          {WORN.map(([l, x, y, w, r], i) => {
            const t = Math.max(0, Math.min(1, (fall - i * 0.05) / (1 - i * 0.05)));
            const fy = MAT - 30 + (i % 3) * 15;
            return (
              <div key={l} style={{ position: "absolute", zIndex: land ? 7 : 8 }}>
                <Weight x={x + t * ((i % 2 ? 1 : -1) * (30 + i * 14))} y={y + t * t * (fy - y)} label={l} w={w}
                        rot={r + t * ((i % 2 ? 1 : -1) * 24)} cracked={land} />
              </div>
            );
          })}

          {/* the sensei: samurai robes, hand raised */}
          <div style={{ position: "absolute", left: 748 + (1 - walk) * 190, top: MAT - 54 - 356 * 0.84, zIndex: 9,
            opacity: walk, filter: "drop-shadow(0 22px 28px rgba(40,26,16,0.6))" }}>
            <Mascot lf={f} size={356} samurai={1} stern={0.95} gaze={-2} nodAmp={1.1} nodSpeed={18} tint="#8E4A3C" />
          </div>
          {/* the raised hand + the plaque naming him, so the cut is a person not a prop */}


          {/* one white slash across the frame — the straps go */}
          {slash > 0.02 && (<>
            <div style={{ position: "absolute", left: 200, top: 320, width: 700, height: 17, zIndex: 14,
              background: "#FFFFFF", borderRadius: 9, transform: "rotate(17deg)", opacity: slash, boxShadow: SH }} />
            <div style={{ position: "absolute", left: 240, top: 420, width: 600, height: 11, zIndex: 14,
              background: "#FFFFFF", borderRadius: 6, transform: "rotate(-9deg)", opacity: slash * 0.8 }} />
            <div style={{ position: "absolute", inset: 0, background: SHOJI_HI, opacity: slash * 0.4, zIndex: 13 }} />
          </>)}

          {/* craters + dust */}
          {land && [0, 1, 2, 3, 4].map((i) => (
            <div key={i} style={{ position: "absolute", left: 252 + i * 86, top: MAT + 2 + (i % 3) * 13, width: 158, height: 22,
              borderRadius: "50%", background: BEAM_D, opacity: 0.48, zIndex: 6 }} />
          ))}
          {quake > 0 && Array.from({ length: 12 }, (_, i) => (
            <div key={i} style={{ position: "absolute", left: 232 + i * 50 - (1 - quake) * 26 * (i % 3), top: MAT - 22 + (i % 3) * 12,
              width: 44 + i * 4 + (1 - quake) * 40, height: 16, borderRadius: 9, background: TATAMI_L, opacity: quake * 0.9, zIndex: 10 }} />
          ))}

          <Motes f={f} n={20} />
        </div>
      </Panel>
    </AbsoluteFill>
  );
};

/* ================ D3 · he BUILT this dojo — the founder (10.10) ============ */
export const D3Founder: React.FC = () => {
  const f = useCurrentFrame();
  const rise = E(f, 6, 22, 0, 1, BACK);

  return (
    <AbsoluteFill>
      <Bg /><ProgressBar />
      <Tag f={f} icon="🥋" word="HE BUILT THE DOJO" c={PLUM} />
      <Panel glow={hexA(SHOJI_LO, 0.3)}>
        <Dojo f={f} matTop={MAT} />
        <Shafts f={f} n={3} from={150} />
        <Lantern f={f} x={38} y={104} s={0.7} />
        <Lantern f={f} x={912} y={100} s={0.68} ph={1.4} />

        {/* the founder's clip, hung on the dojo wall like a portrait */}
        <div style={{ position: "absolute", left: 56, top: 132, width: 620, height: 348,
          transform: `translateY(${(1 - rise) * 34}px) scale(${0.94 + rise * 0.06})`, opacity: rise }}>
          <Bloom x={310} y={174} r={470} o={0.5 * rise} />
          <DojoScreen f={f} x={0} y={0} w={620} h={348} />
        </div>

        {/* his name, carved on the founding plaque under the portrait */}
        <div style={{ position: "absolute", left: 56, top: 512, opacity: E(f, 18, 30, 0, 1, OUT),
          transform: `translateY(${(1 - E(f, 18, 30, 0, 1, OUT)) * 16}px)`, zIndex: 12 }}>
          <Nameplate x={0} y={0} s={1.02} />
        </div>

        {/* he bows to the room he built — the only motion besides the clip */}
        <div style={{ position: "absolute", left: 718, top: MAT - 54 - 292 * 0.84, zIndex: 9,
          opacity: E(f, 30, 46, 0, 1, OUT), transform: `rotate(${E(f, 56, 76, 0, 10, IO)}deg)`, transformOrigin: "50% 96%",
          filter: "drop-shadow(0 20px 26px rgba(40,26,16,0.56))" }}>
          <Mascot lf={f} size={292} samurai={1} stern={0.9} gaze={-2} nodAmp={1.1} nodSpeed={18} tint="#8E4A3C" />
        </div>

        {/* the room watching the portrait */}
        <div style={{ position: "absolute", left: 96, top: MAT - 54 - 138 * 0.82, zIndex: 7,
          filter: "drop-shadow(0 14px 18px rgba(40,26,16,0.44))" }}>
          <Mascot lf={f} size={138} gaze={2} shock={0.5} tint="#8E8A7E" nodAmp={1.6} nodSpeed={12} />
        </div>
        <Motes f={f} n={20} />
      </Panel>
    </AbsoluteFill>
  );
};

/* ============ D4 · two training posts: 2024 needed it, 2026 doesn't (14.40) = */
export const D4Posts: React.FC = () => {
  const f = useCurrentFrame();
  const left = E(f, 8, 24, 0, 1, BACK);
  const right = E(f, 34, 50, 0, 1, BACK);
  const slip = E(f, 70, 90, 0, 1, Ein);            // the iron slides straight off the new one

  const BW = 428, BH = 512, FLOOR = 424;           // bay box + where the feet land, bay-local

  /* one training bay. EVERYTHING inside is bay-local, so nothing can wander
     into the other bay (see REEL-BUILD-LEARNINGS §3: absolute coords + a
     transformed wrapper is how plates end up in the wrong half of the frame). */
  const Bay: React.FC<{ x: number; year: string; p: number; big: boolean; note: string; children?: React.ReactNode }> =
    ({ x, year, p, big, note, children }) => {
    const sz = big ? 330 : 196;
    return (
      <div style={{ position: "absolute", left: x, top: 132, width: BW, height: BH, opacity: p,
        transform: `translateY(${(1 - p) * 26}px) scale(${0.95 + p * 0.05})` }}>
        {/* the bay's own paper wall, timber lattice and mat */}
        <div style={{ position: "absolute", inset: 0, borderRadius: 10, background: SHOJI, border: `10px solid ${BEAM}`, boxShadow: SH_D }} />
        <div style={{ position: "absolute", left: 10, top: 56, width: BW - 30, height: FLOOR - 56,
          background: `radial-gradient(ellipse at 50% 34%, ${SHOJI_HI} 0%, ${SHOJI} 54%, ${SHOJI_LO} 100%)` }} />
        {[0, 1].map((i) => (
          <div key={`h${i}`} style={{ position: "absolute", left: 10, top: 152 + i * 132, width: BW - 30, height: 11, background: BEAM }} />
        ))}
        {[0, 1].map((i) => (
          <div key={`v${i}`} style={{ position: "absolute", left: 140 + i * 136, top: 56, width: 11, height: FLOOR - 56, background: BEAM }} />
        ))}
        <div style={{ position: "absolute", left: 10, top: FLOOR, width: BW - 30, height: 34, background: BEAM }} />
        <div style={{ position: "absolute", left: 10, top: FLOOR + 30, width: BW - 30, height: 44, background: TATAMI }} />

        {/* the year, burned into the head rail */}
        <div style={{ position: "absolute", left: 0, top: 0, width: BW, height: 56, background: BEAM,
          borderRadius: "6px 6px 0 0", display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 29, letterSpacing: "0.22em", color: "#FFF3E4" }}>{year}</div>

        {/* the trainee, standing ON the mat */}
        <div style={{ position: "absolute", left: BW / 2 - sz / 2, top: FLOOR - sz * 0.86,
          filter: "drop-shadow(0 16px 20px rgba(40,26,16,0.5))" }}>
          <Mascot lf={f} size={sz} shock={big ? 0 : 0.85} cheer={big ? 0.85 : 0}
                  nodAmp={big ? 3.2 : 0.5} nodSpeed={big ? 8 : 30} tint={big ? undefined : "#B0574A"} />
        </div>

        {children}

        {/* the verdict, on the bottom rail — two words, never a sentence */}
        <div style={{ position: "absolute", left: 18, top: BH - 68, width: BW - 46, height: 50, borderRadius: 6,
          background: PAPER, border: `5px solid ${BEAM_L}`, boxShadow: SH, display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 26, color: INK }}>{note}</div>
      </div>
    );
  };

  return (
    <AbsoluteFill>
      <Bg /><ProgressBar />
      <Tag f={f} icon="📅" word="WRITTEN FOR THE OLD ONE" c={TEAL} />
      <Panel glow={hexA(TEAL, 0.24)}>
        <Dojo f={f} matTop={MAT} />
        <Shafts f={f} n={2} from={230} />

        {/* 2024: it genuinely could not stand up without the iron */}
        <Bay x={62} year="2024" p={left} big={false} note="needed the iron">
          <Weight x={106} y={322} label="CLAUDE.md" w={172} />
          <Weight x={130} y={366} label="RULES" w={128} rot={-6} />
          <Weight x={118} y={404} label="MCP" w={110} rot={5} />
        </Bay>

        {/* 2026: the same plate just falls off it */}
        <Bay x={522} year="2026" p={right} big note="already stronger">
          <div style={{ position: "absolute", left: 112 + slip * 44, top: 300 + slip * slip * 132,
            transformOrigin: "50% 50%", opacity: 1 - slip * 0.25 }}>
            <Weight x={0} y={0} label="CLAUDE.md" w={200} rot={slip * 64} cracked={slip > 0.92} />
          </div>
        </Bay>

        <Motes f={f} n={16} />
      </Panel>
    </AbsoluteFill>
  );
};

/* ============== D5 · the wrist iron drags the punch short (18.88) ========== */
export const D5Short: React.FC = () => {
  const f = useCurrentFrame();
  const wind = E(f, 6, 18, 0, 1, IO);
  const thr = E(f, 20, 30, 0, 1, Ein);      // the strike
  const drag = E(f, 26, 40, 0, 1, OUT);           // and the iron pulls it down
  const thud = f >= 38;
  const shk = thud && f < 52 ? (1 - (f - 38) / 14) * Math.sin(f * 4.4) * 13 : 0;

  /* the fist's path: out toward the post, then yanked into the mat */
  const fx = 520 + thr * 176 - drag * 26;
  const fy = 398 - wind * 24 + drag * drag * 268;

  return (
    <AbsoluteFill>
      <Bg /><ProgressBar />
      <Tag f={f} icon="🥊" word="IT PULLS YOU SHORT" c={RED_M} />
      <Panel glow={hexA(RED_M, 0.24)}>
        <div style={{ position: "absolute", inset: 0, transform: `translateX(${shk}px)` }}>
          <Dojo f={f} matTop={MAT} />
          <Shafts f={f} n={2} from={520} />
          <Lantern f={f} x={54} y={104} s={0.7} />

          {/* the post it was aiming at — never touched */}
          <Makiwara x={806} y={MAT - 372} s={1.24} lean={0} />
          <Placard x={714} y={162} w={272} s="TARGET" big="untouched" />

          {/* the fighter, mid-strike */}
          <div style={{ position: "absolute", left: 296, top: MAT - 400 * 0.86, zIndex: 6,
            transform: `rotate(${wind * -5 + thr * 9}deg)`, transformOrigin: "50% 88%",
            filter: "drop-shadow(0 20px 26px rgba(40,26,16,0.58))" }}>
            <Mascot lf={f} size={400} shock={thud ? 0.7 : 0.2} nodAmp={1.2} nodSpeed={20} />
          </div>

          {/* the strike arc, bending down under the iron */}
          {thr > 0.05 && (
            <svg width={1012} height={792} style={{ position: "absolute", inset: 0, zIndex: 9 }}>
              {/* where it SHOULD have gone: straight into the post */}
              <path d="M 520 396 L 856 372" stroke={BEAM_D} strokeWidth={9} strokeLinecap="round" fill="none"
                opacity={0.34} strokeDasharray="16 22" />
              {/* where the iron actually took it */}
              <path d={`M 520 396 Q ${620 + thr * 40} ${376 - wind * 18} ${fx} ${fy}`}
                stroke={SASH} strokeWidth={15} strokeLinecap="round" fill="none" opacity={0.55 + thr * 0.3} />
            </svg>
          )}
          {/* the fist + the iron cuffed to it */}
          {thr > 0.05 && (<>
            <div style={{ position: "absolute", left: fx - 44, top: fy - 44, width: 88, height: 88, borderRadius: 22,
              background: CLAY, boxShadow: SH_D, zIndex: 11 }} />
            <div style={{ zIndex: 10, position: "absolute" }}>
              <Weight x={fx - 78} y={fy + 34} label="RULES" w={156} rot={drag * 22} cracked={thud} />
            </div>
          </>)}

          {/* it lands in the mat instead */}
          {thud && (<>
            {[0, 1, 2].map((i) => (
              <div key={i} style={{ position: "absolute", left: 600 + i * 78, top: MAT + 4 + i * 11, width: 150, height: 22,
                borderRadius: "50%", background: BEAM_D, opacity: 0.46, zIndex: 6 }} />
            ))}
            {Array.from({ length: 9 }, (_, i) => {
              const t = Math.min(1, (f - 38) / 14);
              return <div key={i} style={{ position: "absolute", left: 566 + i * 42 + t * 30 * (i % 3), top: MAT - 18 + (i % 3) * 12,
                width: 40 + t * 44, height: 15, borderRadius: 8, background: TATAMI_L, opacity: (1 - t) * 0.85, zIndex: 10 }} />;
            })}
          </>)}

          <Motes f={f} n={16} />
        </div>
      </Panel>
    </AbsoluteFill>
  );
};

/* ============ D6 · the six-month bell: the rack empties itself (21.82) ===== */
export const D6Bell: React.FC = () => {
  const f = useCurrentFrame();
  /* six ticks over ~50 frames matches the counter-tick cue train at 22.50 */
  const T0 = 20, STEP = 8;
  const gone = (i: number) => f >= T0 + i * STEP;
  const count = [0, 1, 2, 3, 4, 5].filter(gone).length;
  const struck = f >= 112 && f < 132;
  const free = E(f, 118, 146, 0, 1, OUT);
  const RACK: [string, number][] = [
    ["CLAUDE.md", 210], ["SKILLS", 150], ["HOOKS", 146], ["MCP", 128], ["RULES", 140], ["MEMORY", 180],
  ];

  return (
    <AbsoluteFill>
      <Bg /><ProgressBar />
      <Tag f={f} icon="🔔" word="EVERY SIX MONTHS" c={TEAL} />
      <Panel glow={hexA(TEAL, 0.26)}>
        <Dojo f={f} matTop={MAT} />
        <Shafts f={f} n={3} from={190} />
        <Bell f={f} x={452} y={92} s={1.0} struck={struck} />
        <Lantern f={f} x={906} y={98} s={0.7} ph={1.4} />
        <Scroll x={766} y={112} s={0.66} marks={3} />
        <HeavyBag f={f} x={860} y={300} s={0.72} swing={struck ? 3 : 1} />
        <WeaponRack x={368} y={366} s={0.7} />

        {/* the iron rack: six plates, each one lifting off on its tick */}
        <div style={{ position: "absolute", left: 44, top: 250, width: 300, height: 400 }}>
          <div style={{ position: "absolute", left: 0, top: 0, width: 22, bottom: 0, background: BEAM_D }} />
          <div style={{ position: "absolute", right: 0, top: 0, width: 22, bottom: 0, background: BEAM_D }} />
          {[0, 1, 2].map((i) => <div key={i} style={{ position: "absolute", left: 0, right: 0, top: 122 + i * 128, height: 15, background: BEAM }} />)}
        </div>
        {RACK.map(([l, w], i) => {
          const t = gone(i) ? Math.min(1, (f - (T0 + i * STEP)) / 12) : 0;
          const col = i % 2, row = Math.floor(i / 2);
          return (
            <div key={l} style={{ opacity: 1 - t, transform: `translateY(${-t * 120}px) scale(${1 - t * 0.2})` }}>
              <Weight x={58 + col * 150} y={272 + row * 128} label={l} w={Math.min(w, 138)} rot={col ? 4 : -4} />
            </div>
          );
        })}

        {/* six month marks burned into a wall strip — the counter, no sentence */}
        <div style={{ position: "absolute", left: 44, top: 176, display: "flex", gap: 9, zIndex: 12 }}>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div key={i} style={{ width: 60, height: 62, borderRadius: 6, background: gone(i) ? SASH : PAPER3,
              border: `5px solid ${gone(i) ? RED_D : BEAM_L}`, boxShadow: SH,
              fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 26, lineHeight: "52px", textAlign: "center",
              color: gone(i) ? "#FFF3E4" : "#9A9083" }}>{gone(i) ? "\u2713" : ""}</div>
          ))}
        </div>

        {/* the fighter: loaded, then clean, then quick */}
        <div style={{ position: "absolute", left: 566, top: MAT - 420 * 0.86, zIndex: 6,
          filter: "drop-shadow(0 20px 28px rgba(40,26,16,0.6))" }}>
          <Mascot lf={f} size={420} shock={free > 0.3 ? 0 : 0.4} cheer={free > 0.3 ? 0.95 : 0}
                  nodAmp={free > 0.3 ? 3.6 : 1} nodSpeed={free > 0.3 ? 7 : 22} />
        </div>
        {free > 0.25 && (<>
          <SpeedLines f={f} cx={776} cy={MAT - 200} n={18} on={free} />
          {[-64, 62].map((dx, i) => (
            <div key={i} style={{ position: "absolute", left: 566 + dx, top: MAT - 420 * 0.86, opacity: 0.3 * free, zIndex: 5 }}>
              <Mascot lf={f - 3 - i * 3} size={420} cheer={0.95} nodAmp={3.6} nodSpeed={7} />
            </div>
          ))}
        </>)}
        {struck && <div style={{ position: "absolute", inset: 0, background: SHOJI_HI, opacity: (1 - (f - 112) / 20) * 0.34 }} />}
        <Motes f={f} n={22} />
      </Panel>
    </AbsoluteFill>
  );
};

/* ============ D7 · the iron shop selling FRESH plates (28.44) ============== */
export const D7Shop: React.FC = () => {
  const f = useCurrentFrame();
  const rack = E(f, 6, 22, 0, 1, BACK);
  const BUY = [30, 58];
  const bought = BUY.map((b) => (f >= b ? 1 : 0));
  const walk = E(f, 74, 116, 0, 1, IO);
  const PACKS = ["SKILL", "HOOK", "AGENT", "MCP", "RULE", "PLUGIN"];

  return (
    <AbsoluteFill>
      <Bg /><ProgressBar />
      <Tag f={f} icon="🏪" word="SIX MORE, EVERY WEEK" c={PLUM} />
      <Panel glow={hexA(PLUM, 0.24)}>
        <Dojo f={f} matTop={MAT} />
        <Shafts f={f} n={2} from={200} />

        {/* the vending rack of fresh iron, bolted to the dojo wall */}
        <div style={{ position: "absolute", left: 56, top: 140, width: 512, height: 442, opacity: rack,
          transform: `translateY(${(1 - rack) * 28}px)` }}>
          <div style={{ position: "absolute", inset: 0, borderRadius: 12, background: PLASTER, border: `12px solid ${BEAM}`, boxShadow: SH_D }} />
          <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 62, background: SASH,
            borderRadius: "4px 4px 0 0", display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 30, letterSpacing: "0.18em", color: "#FFF3E4" }}>NEW IRON</div>
          {PACKS.map((p, i) => (
            <div key={p} style={{ position: "absolute", left: 30 + (i % 3) * 158, top: 92 + Math.floor(i / 3) * 172 }}>
              <PlatePack f={f + i * 17} x={0} y={0} label={p} gone={(i === 0 && !!bought[0]) || (i === 4 && !!bought[1])} />
            </div>
          ))}
          {/* the glass */}
          <div style={{ position: "absolute", left: 12, top: 74, right: 12, bottom: 12, borderRadius: 6,
            border: "5px solid rgba(255,246,223,0.5)", background: "linear-gradient(120deg, rgba(255,246,223,0.24), rgba(255,246,223,0) 46%)" }} />
        </div>

        {/* a trainer buys a pack and immediately sinks under it */}
        {BUY.map((b, i) => {
          const p = E(f, b, b + 16, 0, 1, OUT);
          if (p <= 0) return null;
          return (
            <div key={i} style={{ position: "absolute", left: 604, top: MAT - 54 - 172 * 0.82 + p * 26, zIndex: 8,
              filter: "drop-shadow(0 14px 18px rgba(40,26,16,0.46))", opacity: i === 1 ? p : 1 - (bought[1] ? 1 : 0) }}>
              <Mascot lf={f + i * 27} size={172} shock={0.3 + p * 0.4} tint="#8E8A7E" nodAmp={0.9} nodSpeed={24} />
              <div style={{ position: "absolute", left: -12, top: 96 }}>
                <Weight x={0} y={0} label={i ? "HOOK" : "SKILL"} w={122} rot={i ? 5 : -5} />
              </div>
            </div>
          );
        })}

        {/* our fighter walks straight past it, carrying nothing */}
        <div style={{ position: "absolute", left: 700 + walk * 172, top: MAT - 54 - 340 * 0.84, zIndex: 10,
          filter: "drop-shadow(0 18px 24px rgba(40,26,16,0.54))" }}>
          <Mascot lf={f} size={340} cheer={0.9} gaze={2} nodAmp={3.4} nodSpeed={7} />
        </div>
        {walk > 0.2 && <SpeedLines f={f} cx={700 + walk * 172 + 90} cy={MAT - 250} n={12} on={walk * 0.8} />}

        <Motes f={f} n={18} />
      </Panel>
    </AbsoluteFill>
  );
};

/* ================== D8 · the belt board · comment DELETE (33.14) =========== */
export const D8Belt: React.FC = () => {
  const f = useCurrentFrame();
  const board = E(f, 4, 20, 0, 1, BACK);
  const burn = E(f, 24, 34, 0, 1, OUT);
  const bubble = E(f, 40, 54, 0, 1, BACK);
  const flash = f >= 24 && f < 30 ? 1 - (f - 24) / 6 : 0;
  const BELTS: [string, string][] = [["#D8C7A2", ""], ["#A98C5E", ""], ["#5E6A5C", ""], ["#2F2C27", ""]];

  return (
    <AbsoluteFill>
      <Bg /><ProgressBar />
      <Tag f={f} icon="💬" word='COMMENT "DELETE"' c={TEAL} />
      <Panel glow={hexA(TEAL, 0.3)}>
        <Dojo f={f} matTop={MAT} />
        <Shafts f={f} n={3} from={170} />
        <Lantern f={f} x={38} y={104} s={0.68} />
        <Lantern f={f} x={912} y={100} s={0.66} ph={1.4} />

        {/* the rank board */}
        <div style={{ position: "absolute", left: 74, top: 148, width: 496, height: 448, opacity: board,
          transform: `translateY(${(1 - board) * 30}px)` }}>
          {/* the board itself: solid timber, sized, so it reads behind the belts */}
          <div style={{ position: "absolute", inset: 0, borderRadius: 12, background: PLASTER, border: `13px solid ${BEAM}`, boxShadow: SH_D }} />
          <div style={{ position: "absolute", left: 13, top: 13, right: 13, bottom: 13, background: PLASTER_D, borderRadius: 6 }} />
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} style={{ position: "absolute", left: 20, right: 20, top: 96 + i * 74, height: 9, background: BEAM_D, borderRadius: 4 }} />
          ))}
          <div style={{ position: "absolute", left: 26, top: 30 }}>
            <Belt x={0} y={0} w={418} c={SASH} label="DELETE" burn={burn} />
            {BELTS.map(([c], i) => <Belt key={i} x={0} y={74 + i * 74} w={418} c={c} />)}
          </div>
        </div>
        {burn > 0.1 && <Bloom x={310} y={172} r={330} o={0.4 * burn} />}

        {/* the doc, offered — one line, no paragraph */}
        {bubble > 0.05 && (
          <div style={{ position: "absolute", left: 604, top: 176, width: 356, opacity: bubble,
            transform: `translateY(${(1 - bubble) * 22}px) scale(${0.94 + bubble * 0.06})`, zIndex: 12 }}>
            <div style={{ background: PAPER, border: `8px solid ${BEAM}`, borderRadius: 16, boxShadow: SH_D, padding: "22px 24px 26px" }}>
              <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 21, letterSpacing: "0.14em", color: SASH }}>COMMENT</div>
              <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 63, lineHeight: 1, color: INK, letterSpacing: "-0.02em" }}>DELETE</div>
              <div style={{ marginTop: 12, height: 6, borderRadius: 3, background: PAPER3 }} />
              <div style={{ marginTop: 14, fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 24, lineHeight: 1.26, color: "#6B6355" }}>
                the six month reset, one page
              </div>
            </div>
            <div style={{ position: "absolute", left: 44, bottom: -30, width: 0, height: 0,
              borderLeft: "24px solid transparent", borderRight: "24px solid transparent", borderTop: `30px solid ${BEAM}` }} />
          </div>
        )}

        {/* the fighter bows */}
        <div style={{ position: "absolute", left: 634, top: MAT - 54 - 316 * 0.84, zIndex: 10,
          transform: `rotate(${E(f, 52, 70, 0, 9, IO)}deg)`, transformOrigin: "50% 96%",
          filter: "drop-shadow(0 18px 24px rgba(40,26,16,0.54))" }}>
          <Mascot lf={f} size={316} cheer={0.9} nodAmp={3.2} nodSpeed={8} />
        </div>

        {flash > 0.02 && <div style={{ position: "absolute", inset: 0, background: SHOJI_HI, opacity: flash * 0.4 }} />}
        <Motes f={f} n={22} />
      </Panel>
    </AbsoluteFill>
  );
};
