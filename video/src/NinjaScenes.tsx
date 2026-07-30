import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { inter, fraunces } from "./fonts";
import { Bg, Panel, ProgressBar, INK, hexA } from "./SlopKit";
import {
  Rooftops, Armory, Bamboo, ScrollHall, Grounds, Range, Waterfall, Summit, Market, Torii,
  Ninja, IronTag, Shuriken, Smoke, Slash, Streaks, SpeedLines, Moon, Torch, Lantern,
  HangScroll, ShrineBell, Target, MistBand, Snowfall, Fireflies, Embers,
  Tag, Nameplate, ClipScreen,
  NIGHT, NIGHT_D, NIGHT_L, NIGHT_LL, MOON, MOON_D, TILE, TILE_D, TILE_L,
  STONE, STONE_D, STONE_L, WOOD, WOOD_D, WOOD_L, PAPER, PAPER_HI, PAPER_LO,
  CARD, CARD2, CARD3, BAMBOO_D, BAMBOO_L, WATER, WATER_D, WATER_L, SNOW, SNOW_D,
  DAWN, DAWN_HI, DAWN_LO, CLOUD, CLOUD_D, IRON, IRON_D, IRON_L,
  FLAME, FLAME_HI, SASH, SASH_D, SMOKE, SMOKE_L, CLAY,
  E, osc, rnd, OUT, IO, IN_Q, BACK, SH, SH_D,
} from "./NinjaWorld";

/* =========================================================================
   REEL 81 "DELETE" · THE NINJA SCENES — nine locations, one arc.

     N1  THE ARMORY        · the keepers strap MORE iron on. It sinks.
     N2  BAMBOO FOREST     · the master appears, one slash, every chain drops.
     N3  THE SCROLL HALL   · he is named. His clip hangs like a scroll.
     N4  TWO TRAINING YARDS· snowy 2024 needed the iron. Night 2026 does not.
     N5  THE ROOFTOP RANGE · the chain drags the throw short of the target.
     N6  THE WATERFALL     · six moons, the bell, the chains go in the water.
     N7  THE SUMMIT        · dawn, above the clouds, carrying nothing.
     N8  THE NIGHT MARKET  · a stall selling six brand new sets of iron.
     N9  THE TORII GATE    · the scroll, the bow, comment DELETE.

   Type is a label, never narration. The world does the talking.
   ========================================================================= */

const CH: [string, number][] = [
  ["CLAUDE.md", 196], ["SKILLS", 138], ["HOOKS", 132], ["MCP", 118], ["RULES", 130], ["MEMORY", 172],
];

/** a small wooden placard — used at most once per scene */
const Placard: React.FC<{ x: number; y: number; w?: number; kick?: string; big: string; sub?: string }> =
  ({ x, y, w = 250, kick, big, sub }) => (
  <div style={{ position: "absolute", left: x, top: y, width: w, background: CARD, border: `7px solid ${WOOD}`,
    borderRadius: 6, boxShadow: SH_D, padding: "12px 16px 14px", zIndex: 14 }}>
    {kick && <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 19, letterSpacing: "0.14em", color: SASH }}>{kick}</div>}
    <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 38, lineHeight: 1.04, color: INK }}>{big}</div>
    {sub && <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 20, lineHeight: 1.22, color: "#6B6355", marginTop: 4 }}>{sub}</div>}
  </div>
);

/* ============ N1 · THE ARMORY — they strap MORE iron on (4.48) ============= */
export const N1Armory: React.FC = () => {
  const f = useCurrentFrame();
  const FLOOR = 610;
  const HITS = [8, 24, 40];
  const worn = HITS.filter((h) => f >= h).length;
  const kick = HITS.reduce((a, h) => a + (f >= h && f < h + 5 ? 1 - (f - h) / 5 : 0), 0);
  const sink = worn * 15 + kick * 10;
  const shake = kick * Math.sin(f * 4.2) * 12;
  const NEW: [string, number, number, number][] = [
    ["AGENTS", 356, 300, 140], ["COMMANDS", 640, 296, 182], ["PLUGINS", 470, 244, 152],
  ];
  const hy = FLOOR - 350 * 0.94 + sink;

  return (
    <AbsoluteFill>
      <Bg /><ProgressBar />
      <Tag f={f} icon="⛓️" word="STRAP MORE ON" c={FLAME} />
      <Panel glow={hexA(FLAME, 0.24)}>
        <div style={{ position: "absolute", inset: 0, overflow: "hidden", transform: `translateX(${shake}px)` }}>
          <Armory f={f} floor={FLOOR} />

          {/* the hero, sinking under every new set */}
          <Ninja f={f} x={332} y={hy} size={350} hero shock={0.3 + Math.min(0.4, sink / 90)}
                 nodAmp={0.8} nodSpeed={26} z={9} />
          {CH.slice(0, 3).map(([l, w], i) => (
            <IronTag key={l} x={230 + i * 158} y={hy + 250 + (i % 2) * 26} label={l} w={w} chain={54} rot={i % 2 ? 5 : -5} z={8} />
          ))}

          {/* the two keepers, handing over more */}
          <Ninja f={f + 29} x={62} y={FLOOR - 196 * 0.94} size={196} wrap="#3A4152" band={SASH_D}
                 gaze={2} cheer={0.6} nodAmp={2.4} nodSpeed={9} z={7} />
          <Ninja f={f + 51} x={790} y={FLOOR - 184 * 0.94} size={184} wrap="#3A4152" band={SASH_D}
                 gaze={-2} cheer={0.6} nodAmp={2.2} nodSpeed={10} flip z={7} />

          {/* the new iron flying in and SLAMMING on */}
          {NEW.map(([l, x, y, w], i) => {
            const h = HITS[i];
            const p = E(f, h - 8, h, 0, 1, IN_Q);
            if (p <= 0) return null;
            const fromX = i === 1 ? 340 : -340;
            return (
              <div key={l} style={{ position: "absolute", zIndex: 10,
                transform: `translate(${(1 - p) * fromX}px, ${(1 - p) * -140}px)`, opacity: Math.min(1, p * 2.4) }}>
                <IronTag x={x} y={y + sink} label={l} w={w} chain={40} rot={(i % 2 ? 7 : -6)} z={10} />
              </div>
            );
          })}

          {/* dust off each slam */}
          {HITS.map((h, i) => {
            const k = f - h;
            if (k < 0 || k > 12) return null;
            const t = k / 12;
            return [0, 1, 2, 3].map((j) => (
              <div key={`${i}-${j}`} style={{ position: "absolute", left: 300 + j * 100 - t * 34 * (j - 1.5), top: FLOOR - 24 + j * 6,
                width: 54 + t * 62, height: 20, borderRadius: 11, background: SMOKE_L, opacity: (1 - t) * 0.8, zIndex: 12 }} />
            ));
          })}

          {/* the load rail: iron plates filling, no sentence needed */}
          <div style={{ position: "absolute", left: 926, top: 330, display: "flex", flexDirection: "column-reverse", gap: 8, zIndex: 14 }}>
            {[0, 1, 2, 3, 4, 5].map((i) => {
              const lit = i < 3 + worn;
              return <div key={i} style={{ width: 62, height: 20, borderRadius: 4, background: lit ? IRON : STONE_D,
                border: `3px solid ${lit ? IRON_L : STONE}`, boxShadow: lit ? SH : "none" }} />;
            })}
          </div>
        </div>
      </Panel>
    </AbsoluteFill>
  );
};

/* ====== N2 · BAMBOO FOREST — the master cuts every chain (6.78) =========== */
export const N2Master: React.FC = () => {
  const f = useCurrentFrame();
  const FLOOR = 636;
  const APPEAR = 10, DRAW = 26, CUT = 34;
  const app = E(f, APPEAR, APPEAR + 14, 0, 1, OUT);
  const blade = E(f, DRAW, CUT, 0, 1, OUT);
  const fall = E(f, CUT + 2, CUT + 18, 0, 1, IN_Q);
  const landed = f >= CUT + 15;
  const hy = FLOOR - 330 * 0.94;

  return (
    <AbsoluteFill>
      <Bg /><ProgressBar />
      <Tag f={f} icon="🗡️" word="HE SAYS CUT IT" c={SASH} />
      <Panel glow={hexA(SASH, 0.26)}>
        <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
          <Bamboo f={f} floor={FLOOR} />

          {/* the hero, still chained */}
          <Ninja f={f} x={196} y={hy} size={330} hero shock={fall > 0.5 ? 0.1 : 0.5}
                 gaze={2} nodAmp={fall > 0.5 ? 3 : 1} nodSpeed={fall > 0.5 ? 8 : 24} z={9} />
          {!landed && CH.map(([l, w], i) => {
            const t = Math.max(0, Math.min(1, (fall - i * 0.04) / (1 - i * 0.04)));
            const y0 = hy + 190 + (i % 3) * 56;
            return (
              <div key={l} style={{ position: "absolute", zIndex: 8, opacity: 1 - t * 0.25 }}>
                <IronTag x={96 + (i % 2) * 172 + t * (i - 2.5) * 54} y={y0 + t * t * (FLOOR - 40 - y0)}
                         label={l} w={w} chain={t > 0.05 ? 0 : 48} rot={t * (i % 2 ? 150 : -150)} snapped={t > 0.05} z={8} />
              </div>
            );
          })}
          {landed && CH.map(([l, w], i) => (
            <IronTag key={`g${l}`} x={64 + i * 78} y={FLOOR - 34 + (i % 3) * 15} label={l} w={Math.min(w, 128)}
                     rot={(i % 2 ? 1 : -1) * (10 + i * 4)} snapped z={7} />
          ))}

          {/* the master, stepping out of the canes */}
          <div style={{ opacity: app }}>
            <Ninja f={f} x={620 + (1 - app) * 90} y={FLOOR - 372 * 0.94} size={372} master
                   wrap="#3A3040" band="#8A7A46" stern={0.95} gaze={-2} nodAmp={1} nodSpeed={20} tails={0} z={10} />
          </div>

          {/* the drawn blade, then the slash */}
          {blade > 0.05 && f < CUT + 6 && (
            <div style={{ position: "absolute", left: 618, top: 322, width: 236 * blade, height: 14, borderRadius: 7,
              background: "#E8ECEF", transform: `rotate(${-54 + blade * 34}deg)`, transformOrigin: "0% 50%", boxShadow: SH, zIndex: 12 }} />
          )}
          <Slash f={f} at={CUT} y={324} deg={17} life={9} />
          {f >= CUT && f < CUT + 7 && (
            <div style={{ position: "absolute", inset: 0, background: PAPER_HI, opacity: (1 - (f - CUT) / 7) * 0.44, zIndex: 22 }} />
          )}
        </div>
      </Panel>
    </AbsoluteFill>
  );
};

/* ====== N3 · THE SCROLL HALL — he is named (9.24) ======================== */
export const N3Founder: React.FC = () => {
  const f = useCurrentFrame();
  const FLOOR = 640;
  const rise = E(f, 6, 24, 0, 1, BACK);
  const plate = E(f, 22, 36, 0, 1, OUT);
  return (
    <AbsoluteFill>
      <Bg /><ProgressBar />
      <Tag f={f} icon="🎴" word="HE BUILT THE ART" c="#6E4257" />
      <Panel glow={hexA(PAPER_LO, 0.3)}>
        <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
          <ScrollHall f={f} floor={FLOOR} />
          <Lantern f={f} x={22} y={92} s={0.76} />
          <Lantern f={f + 24} x={916} y={88} s={0.72} ph={1.3} />
          <HangScroll x={886} y={214} s={0.66} marks={3} />

          {/* his talk, hung on the hall wall as a scroll-screen */}
          <div style={{ position: "absolute", left: 96, top: 158, width: 620, height: 348,
            transform: `translateY(${(1 - rise) * 32}px) scale(${0.95 + rise * 0.05})`, opacity: rise }}>
            <ClipScreen f={f} x={0} y={0} w={620} h={348} />
          </div>

          {/* the name, on the founding plaque */}
          <div style={{ position: "absolute", left: 96, top: 544, opacity: plate,
            transform: `translateY(${(1 - plate) * 18}px)`, zIndex: 14 }}>
            <Nameplate x={0} y={0} s={1.02} />
          </div>

          {/* the master kneels at the side of his own hall */}
          <div style={{ opacity: E(f, 30, 46, 0, 1, OUT) }}>
            <Ninja f={f} x={742} y={FLOOR - 52 - 286 * 0.94} size={286} master
                   wrap="#3A3040" band="#8A7A46" stern={0.9} gaze={-2} nodAmp={1} nodSpeed={22} tails={0} z={10} />
          </div>
        </div>
      </Panel>
    </AbsoluteFill>
  );
};

/* == N4 · TWO TRAINING YARDS — 2024 needed it, 2026 doesn't (13.00) ======== */
export const N4Yards: React.FC = () => {
  const f = useCurrentFrame();
  const left = E(f, 6, 22, 0, 1, OUT);
  const right = E(f, 28, 46, 0, 1, OUT);
  const slip = E(f, 66, 90, 0, 1, IN_Q);
  const HALF = 506, FLOOR = 600;

  /* each yard is its own clipped half-frame with its own season, so nothing
     from one side can stray into the other (learnings §3) */
  const Yard: React.FC<{ side: 0 | 1; p: number; snow: boolean; year: string; note: string; children?: React.ReactNode }> =
    ({ side, p, snow, year, note, children }) => (
    <div style={{ position: "absolute", left: side * HALF, top: 0, width: HALF, height: 792, overflow: "hidden", opacity: p }}>
      <div style={{ position: "absolute", left: side ? -HALF : 0, top: 0, width: 1012, height: 792 }}>
        <Grounds f={f} snow={snow} floor={FLOOR} />
      </div>
      {/* the divider post between the two yards */}
      {side === 0 && <div style={{ position: "absolute", right: 0, top: 0, width: 16, height: 792, background: WOOD_D, zIndex: 20 }} />}
      {/* the year, burned into a beam across the top */}
      <div style={{ position: "absolute", left: 0, top: 108, width: HALF, height: 56, background: WOOD, zIndex: 16,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 30, letterSpacing: "0.24em", color: "#FFF3E4" }}>{year}</div>
      <div style={{ position: "absolute", left: 0, top: 164, width: HALF, height: 9, background: WOOD_D, zIndex: 16 }} />
      {children}
      <div style={{ position: "absolute", left: 34, top: 700, width: HALF - 68, height: 52, borderRadius: 6, background: CARD,
        border: `5px solid ${WOOD}`, boxShadow: SH, zIndex: 18, display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 26, color: INK }}>{note}</div>
    </div>
  );

  return (
    <AbsoluteFill>
      <Bg /><ProgressBar />
      <Tag f={f} icon="📜" word="WRITTEN FOR THE OLD ONE" c="#2F6B63" />
      <Panel glow={hexA("#2F6B63", 0.24)}>
        <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
          {/* 2024: a small ninja that genuinely cannot stand without the iron */}
          <Yard side={0} p={left} snow year="2024" note="needed the iron">
            {/* a snow-capped training post, so the yard is not an empty field */}
            <div style={{ position: "absolute", left: 46, top: FLOOR - 236, width: 34, height: 236, background: WOOD_D, zIndex: 7 }} />
            <div style={{ position: "absolute", left: 34, top: FLOOR - 248, width: 58, height: 20, borderRadius: 5, background: SNOW, zIndex: 7 }} />
            <div style={{ position: "absolute", left: 24, top: FLOOR - 214, width: 66, height: 64, borderRadius: 6, background: "#6E5A3E", zIndex: 7 }} />
            <Ninja f={f} x={HALF / 2 - 100} y={FLOOR - 200 * 0.94} size={200} wrap="#39414F" band="#8A5348"
                   shock={0.85} nodAmp={0.4} nodSpeed={30} z={9} />
            <IronTag x={128} y={FLOOR - 148} label="CLAUDE.md" w={166} chain={44} z={10} />
            <IronTag x={150} y={FLOOR - 96} label="RULES" w={128} chain={30} rot={-6} z={10} />
            <IronTag x={318} y={FLOOR - 122} label="MCP" w={112} chain={38} rot={6} z={10} />
          </Yard>

          {/* 2026: the same iron just falls off it */}
          <Yard side={1} p={right} snow={false} year="2026" note="already stronger">
            <Ninja f={f} x={HALF / 2 - 148} y={FLOOR - 296 * 0.94} size={296} hero cheer={0.85}
                   nodAmp={3.2} nodSpeed={8} z={9} />
            <div style={{ position: "absolute", left: 154 + slip * 60, top: FLOOR - 210 + slip * slip * 200, zIndex: 10,
              opacity: 1 - slip * 0.3 }}>
              <IronTag x={0} y={0} label="CLAUDE.md" w={196} chain={slip > 0.06 ? 0 : 40}
                       rot={slip * 62} snapped={slip > 0.06} z={10} />
            </div>
          </Yard>
        </div>
      </Panel>
    </AbsoluteFill>
  );
};

/* == N5 · THE ROOFTOP RANGE — the chain drags the throw short (17.10) ====== */
export const N5Short: React.FC = () => {
  const f = useCurrentFrame();
  const FLOOR = 588;
  const WIND = 8, THROW = 22, PULL = 28, STICK = 44;
  const wind = E(f, WIND, THROW, 0, 1, IO);
  const thr = E(f, THROW, STICK, 0, 1, OUT);
  const pull = E(f, PULL, STICK, 0, 1, IN_Q);
  const stuck = f >= STICK;
  const shk = stuck && f < STICK + 12 ? (1 - (f - STICK) / 12) * Math.sin(f * 4.6) * 12 : 0;

  /* the star's path: out toward the target, then yanked into the tiles */
  const sx = 348 + thr * 300 - pull * 40;
  const sy = 330 - wind * 26 + pull * pull * 250;

  return (
    <AbsoluteFill>
      <Bg /><ProgressBar />
      <Tag f={f} icon="🎯" word="IT PULLS YOU SHORT" c={SASH} />
      <Panel glow={hexA(SASH, 0.24)}>
        <div style={{ position: "absolute", inset: 0, overflow: "hidden", transform: `translateX(${shk}px)` }}>
          <Range f={f} floor={FLOOR} />

          {/* the target it was aiming at, never touched */}
          <Target x={806} y={FLOOR - 316} s={1.06} />
          <Placard x={700} y={168} w={268} kick="TARGET" big="untouched" />

          {/* the hero, mid-throw, still chained at the wrist */}
          <Ninja f={f} x={196} y={FLOOR - 340 * 0.94} size={340} hero
                 rot={wind * -4 + thr * 5} shock={stuck ? 0.6 : 0.15} nodAmp={1.1} nodSpeed={22} z={9} />
          <IronTag x={168} y={FLOOR - 172} label="RULES" w={140} chain={70} rot={-6} z={8} />

          {/* the line it should have taken, and the line the iron gave it */}
          {thr > 0.04 && (
            <svg width={1012} height={792} style={{ position: "absolute", inset: 0, zIndex: 11 }}>
              <path d="M 380 330 L 856 300" stroke={PAPER_HI} strokeWidth={8} strokeLinecap="round" fill="none"
                opacity={0.42} strokeDasharray="16 22" />
              <path d={`M 380 330 Q ${470 + thr * 60} ${306 - wind * 16} ${sx} ${sy}`}
                stroke={SASH} strokeWidth={14} strokeLinecap="round" fill="none" opacity={0.6 + thr * 0.28} />
            </svg>
          )}
          {/* the star, and the chain that owns it */}
          {thr > 0.04 && (<>
            <Shuriken f={f} x={sx} y={sy} s={0.94} spin={stuck ? 0 : 26} z={13} />
            {/* the iron cuffed to the star — this is what pulled it down */}
            <IronTag x={sx - 62} y={sy + 22} label="MCP" w={124} rot={10 + pull * 18} chain={22} z={12} />
          </>)}

          {/* it lands in the tiles instead */}
          {stuck && (<>
            {[0, 1, 2].map((i) => (
              <div key={i} style={{ position: "absolute", left: 552 + i * 76, top: FLOOR + 4 + i * 12, width: 148, height: 20,
                borderRadius: "50%", background: TILE_D, opacity: 0.6, zIndex: 6 }} />
            ))}
            {Array.from({ length: 9 }, (_, i) => {
              const t = Math.min(1, (f - STICK) / 14);
              return <div key={`d${i}`} style={{ position: "absolute", left: 520 + i * 44 + t * 32 * (i % 3), top: FLOOR - 16 + (i % 3) * 12,
                width: 40 + t * 44, height: 15, borderRadius: 8, background: SMOKE_L, opacity: (1 - t) * 0.85, zIndex: 12 }} />;
            })}
          </>)}
        </div>
      </Panel>
    </AbsoluteFill>
  );
};

/* == N6 · THE WATERFALL — six moons, the bell, the chains go in (19.90) ==== */
export const N6Reset: React.FC = () => {
  const f = useCurrentFrame();
  const FLOOR = 618;
  const T0 = 16, STEP = 9;
  const gone = (i: number) => f >= T0 + i * STEP;
  const count = [0, 1, 2, 3, 4, 5].filter(gone).length;
  const struck = f >= 76 && f < 96;
  const free = E(f, 82, 112, 0, 1, OUT);
  const hy = FLOOR - 116 - 356 * 0.94;

  return (
    <AbsoluteFill>
      <Bg /><ProgressBar />
      <Tag f={f} icon="🌙" word="EVERY SIX MONTHS" c={WATER} />
      <Panel glow={hexA(WATER, 0.26)}>
        <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
          <Waterfall f={f} floor={FLOOR} />
          {/* the training rock under the falls — the iconic place to stand */}
          <div style={{ position: "absolute", left: 208, top: FLOOR - 116, width: 300, height: 74, borderRadius: 14,
            background: "#5A564A", boxShadow: SH_D, zIndex: 6 }} />
          <div style={{ position: "absolute", left: 208, top: FLOOR - 116, width: 300, height: 15, borderRadius: 8, background: "#78735F", zIndex: 6 }} />
          {[0, 1, 2].map((i) => (
            <div key={`rk${i}`} style={{ position: "absolute", left: 168 + i * 122, top: FLOOR - 56 + (i % 2) * 14,
              width: 118, height: 42, borderRadius: 16, background: "#4C4940", zIndex: 6 }} />
          ))}
          <ShrineBell f={f} x={44} y={FLOOR - 396} s={0.94} struck={struck} />

          {/* six moon phases carved on the cliff: the counter, no sentence */}
          <div style={{ position: "absolute", left: 742, top: 150, display: "flex", flexDirection: "column", gap: 12, zIndex: 14 }}>
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div key={i} style={{ width: 56, height: 56, borderRadius: "50%",
                background: gone(i) ? MOON : "#3A3729", border: `4px solid ${gone(i) ? MOON_D : "#2C2A20"}`, boxShadow: SH }} />
            ))}
          </div>

          {/* the hero stands on the ledge and lets the whole bundle go */}
          <Ninja f={f} x={318} y={hy} size={356} hero shock={free > 0.3 ? 0 : 0.3}
                 cheer={free > 0.3 ? 0.95 : 0} nodAmp={free > 0.3 ? 3.6 : 1} nodSpeed={free > 0.3 ? 7 : 24} z={9} />
          {CH.map(([l, w], i) => {
            const t = gone(i) ? Math.min(1, (f - (T0 + i * STEP)) / 16) : 0;
            const y0 = hy + 210 + (i % 3) * 52;
            return (
              <div key={l} style={{ position: "absolute", zIndex: 8, opacity: 1 - t }}>
                <IronTag x={228 + (i % 2) * 168 + t * (i - 2.5) * 40} y={y0 + t * t * (FLOOR + 60 - y0)}
                         label={l} w={w} chain={t > 0.04 ? 0 : 50} rot={t * (i % 2 ? 130 : -130)} snapped={t > 0.04} z={8} />
              </div>
            );
          })}
          {/* splash rings where each one hit the pool */}
          {[0, 1, 2, 3, 4, 5].filter(gone).map((i) => {
            const t = Math.min(1, (f - (T0 + i * STEP) - 14) / 20);
            if (t <= 0) return null;
            return <div key={`sp${i}`} style={{ position: "absolute", left: 250 + i * 66 - t * 40, top: FLOOR - 24 + (i % 3) * 12,
              width: 80 + t * 130, height: 22 + t * 12, borderRadius: "50%", border: `6px solid ${WATER_L}`,
              opacity: 1 - t, zIndex: 10 }} />;
          })}

          {free > 0.25 && (<>
            <SpeedLines f={f} cx={496} cy={hy + 150} n={16} on={free} />
            {[-66, 64].map((dx, i) => (
              <Ninja key={i} f={f - 3 - i * 3} x={318 + dx} y={hy} size={356} cheer={0.95} nodAmp={3.6} nodSpeed={7} z={5} />
            ))}
          </>)}
          {struck && <div style={{ position: "absolute", inset: 0, background: PAPER_HI, opacity: (1 - (f - 76) / 20) * 0.3, zIndex: 20 }} />}
        </div>
      </Panel>
    </AbsoluteFill>
  );
};

/* == N7 · THE SUMMIT — dawn, above the clouds, carrying nothing (24.34) === */
export const N7Summit: React.FC = () => {
  const f = useCurrentFrame();
  const FLOOR = 604;
  const rise = E(f, 4, 22, 0, 1, OUT);
  const banner = E(f, 16, 34, 0, 1, BACK);
  return (
    <AbsoluteFill>
      <Bg /><ProgressBar />
      <Tag f={f} icon="⛰️" word="TRY IT ON OPUS 5" c={DAWN_LO} />
      <Panel glow={hexA(DAWN, 0.3)}>
        <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
          <Summit f={f} floor={FLOOR} />
          {/* the banner planted at the peak */}
          <div style={{ position: "absolute", left: 664, top: 176, opacity: banner,
            transform: `translateY(${(1 - banner) * 24}px)`, zIndex: 12 }}>
            <div style={{ position: "absolute", left: 0, top: 0, width: 13, height: FLOOR - 176, background: WOOD_D }} />
            <div style={{ position: "absolute", left: 13, top: 8, width: 72, height: 268, background: SASH, boxShadow: SH_D,
              clipPath: "polygon(0 0, 100% 0, 100% 92%, 50% 100%, 0 92%)" }}>
              <div style={{ padding: "22px 0 0", fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 34,
                lineHeight: 1.14, color: "#FFF3E4", textAlign: "center", letterSpacing: "0.08em" }}>O<br />P<br />U<br />S<br />5</div>
            </div>
          </div>
          {/* the hero, on the peak, unloaded */}
          <div style={{ opacity: rise, transform: `translateY(${(1 - rise) * 30}px)` }}>
            <Ninja f={f} x={286} y={FLOOR - 376 * 0.94} size={376} hero cheer={0.95} gaze={2}
                   nodAmp={3.6} nodSpeed={7} z={9} />
          </div>
          <SpeedLines f={f} cx={474} cy={FLOOR - 220} n={12} on={rise * 0.55} c={CLOUD} />
        </div>
      </Panel>
    </AbsoluteFill>
  );
};

/* == N8 · THE NIGHT MARKET — a stall selling brand new iron (26.32) ======== */
export const N8Market: React.FC = () => {
  const f = useCurrentFrame();
  const FLOOR = 626;
  const stall = E(f, 6, 24, 0, 1, BACK);
  const BUY = [34, 62];
  const bought = BUY.map((b) => f >= b);
  const walk = E(f, 76, 122, 0, 1, IO);
  const PACKS = ["SKILL", "HOOK", "AGENT", "MCP", "RULE", "PLUGIN"];

  return (
    <AbsoluteFill>
      <Bg /><ProgressBar />
      <Tag f={f} icon="🏮" word="SIX MORE, EVERY WEEK" c="#6E4257" />
      <Panel glow={hexA("#6E4257", 0.26)}>
        <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
          <Market f={f} floor={FLOOR} />

          {/* the stall */}
          <div style={{ position: "absolute", left: 96, top: 250, width: 470, height: 334, opacity: stall,
            transform: `translateY(${(1 - stall) * 26}px)`, zIndex: 8 }}>
            <div style={{ position: "absolute", left: -22, top: -46, width: 514, height: 52, background: SASH, borderRadius: 4,
              clipPath: "polygon(3% 0, 97% 0, 100% 100%, 0 100%)", boxShadow: SH_D }} />
            <div style={{ position: "absolute", left: -22, top: -46, width: 514, height: 52, display: "flex",
              alignItems: "center", justifyContent: "center", fontFamily: inter.fontFamily, fontWeight: 900,
              fontSize: 29, letterSpacing: "0.2em", color: "#FFF3E4" }}>NEW IRON</div>
            <div style={{ position: "absolute", inset: 0, background: WOOD, border: `10px solid ${WOOD_D}`, borderRadius: 5, boxShadow: SH_D }} />
            {PACKS.map((p, i) => {
              const sold = (i === 0 && bought[0]) || (i === 4 && bought[1]);
              const sweep = ((f * 6 + i * 40) % 220) - 50;
              return (
                <div key={p} style={{ position: "absolute", left: 26 + (i % 3) * 146, top: 30 + Math.floor(i / 3) * 150,
                  width: 128, height: 122, opacity: sold ? 0.2 : 1, overflow: "hidden", borderRadius: 6 }}>
                  <div style={{ position: "absolute", inset: 0, borderRadius: 6, background: IRON_D, border: `4px solid ${IRON_L}` }} />
                  <div style={{ position: "absolute", left: 14, top: 18, right: 14, height: 26, borderRadius: 4, background: IRON }} />
                  <div style={{ position: "absolute", left: 14, top: 52, right: 14, height: 26, borderRadius: 4, background: IRON }} />
                  <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 26, background: SASH,
                    fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 17, letterSpacing: "0.1em",
                    color: "#FFF3E4", textAlign: "center", lineHeight: "26px" }}>{p}</div>
                  {!sold && <div style={{ position: "absolute", left: sweep, top: 0, width: 30, height: "100%",
                    background: "rgba(255,246,223,0.44)", transform: "skewX(-18deg)" }} />}
                </div>
              );
            })}
          </div>

          {/* buyers, sagging the moment they pick a set up */}
          {BUY.map((b, i) => {
            const p = E(f, b, b + 18, 0, 1, OUT);
            if (p <= 0) return null;
            return (
              <div key={i} style={{ position: "absolute", left: 596 + i * 132, top: FLOOR - 186 * 0.94 + p * 28, zIndex: 9 }}>
                <Ninja f={f + i * 33} x={0} y={0} size={186} wrap="#3A4152" band={SASH_D}
                       shock={0.3 + p * 0.45} nodAmp={0.6} nodSpeed={28} z={9} />
                <IronTag x={20} y={150} label={i ? "HOOK" : "SKILL"} w={122} chain={34} rot={i ? 5 : -5} z={10} />
              </div>
            );
          })}

          {/* the hero walks straight past, carrying nothing */}
          <div style={{ position: "absolute", left: 640 + walk * 240, top: FLOOR - 330 * 0.94, zIndex: 12 }}>
            <Ninja f={f} x={0} y={0} size={330} hero cheer={0.9} gaze={2} nodAmp={3.4} nodSpeed={7} z={12} />
          </div>
          {walk > 0.2 && <Streaks f={f} on={walk * 0.6} n={9} c={PAPER_HI} />}
        </div>
      </Panel>
    </AbsoluteFill>
  );
};

/* == N9 · THE TORII GATE — the scroll, the bow, comment DELETE (30.74) ==== */
export const N9Gate: React.FC = () => {
  const f = useCurrentFrame();
  const FLOOR = 626;
  const unroll = E(f, 6, 28, 0, 1, OUT);
  const brand = E(f, 26, 38, 0, 1, OUT);
  const card = E(f, 40, 56, 0, 1, BACK);
  const flash = f >= 26 && f < 33 ? 1 - (f - 26) / 7 : 0;
  return (
    <AbsoluteFill>
      <Bg /><ProgressBar />
      <Tag f={f} icon="💬" word='COMMENT "DELETE"' c={SASH} />
      <Panel glow={hexA(DAWN_HI, 0.3)}>
        <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
          <Torii f={f} floor={FLOOR} />

          {/* the scroll unrolls under the gate */}
          <div style={{ position: "absolute", left: 92, top: 336, width: 420, zIndex: 13 }}>
            <div style={{ position: "absolute", left: -14, top: 0, width: 448, height: 24, borderRadius: 5, background: WOOD_D, boxShadow: SH }} />
            <div style={{ position: "absolute", left: 0, top: 22, width: 420, height: unroll * 232, background: PAPER,
              boxShadow: SH_D, overflow: "hidden" }}>
              <div style={{ padding: "26px 28px" }}>
                <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 20, letterSpacing: "0.16em", color: SASH }}>THE ONE WORD</div>
                <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 92, lineHeight: 1,
                  color: brand > 0.5 ? INK : PAPER_LO, letterSpacing: "-0.02em" }}>DELETE</div>
                <div style={{ marginTop: 14, height: 6, borderRadius: 3, background: CARD3 }} />
                <div style={{ marginTop: 12, fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 22,
                  lineHeight: 1.24, color: "#6B6355" }}>the six month reset, one page</div>
              </div>
            </div>
            <div style={{ position: "absolute", left: -14, top: 22 + unroll * 232, width: 448, height: 24, borderRadius: 5, background: WOOD_D, boxShadow: SH }} />
          </div>

          {/* the hero bows under the gate */}
          <div style={{ position: "absolute", left: 606, top: FLOOR - 330 * 0.94, zIndex: 12,
            transform: `rotate(${E(f, 44, 62, 0, 11, IO)}deg)`, transformOrigin: "50% 96%" }}>
            <Ninja f={f} x={0} y={0} size={330} hero cheer={0.9} nodAmp={3} nodSpeed={9} z={12} />
          </div>

          {/* a red seal stamped on the scroll once the word is burned in */}
          {card > 0.05 && (
            <div style={{ position: "absolute", left: 392, top: 452, width: 92, height: 92, borderRadius: 10,
              border: `11px solid ${SASH}`, opacity: card, transform: `rotate(${-9 + (1 - card) * 22}deg) scale(${0.7 + card * 0.3})`, zIndex: 16 }}>
              <div style={{ position: "absolute", inset: 12, borderRadius: 4, background: SASH, opacity: 0.9 }} />
            </div>
          )}
          {flash > 0.02 && <div style={{ position: "absolute", inset: 0, background: PAPER_HI, opacity: flash * 0.36, zIndex: 20 }} />}
        </div>
      </Panel>
    </AbsoluteFill>
  );
};
