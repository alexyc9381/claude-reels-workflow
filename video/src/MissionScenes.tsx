import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { inter, fraunces } from "./fonts";
import { Bg, Panel, ProgressBar, INK, hexA } from "./SlopKit";
import {
  ControlRoom, PlanBay, CrecheBay, TestStand, ShakeBay, HopPad, DeepSpace, DishField, DawnGantry,
  GasGiant, RingWorld, RustSurface, Nebula, Stars, Moons, Cluster, SurfaceKit,
  Astro, Patch, Craft, Dish, Manual, Gauge, Flap, BarMeter, Pulse, Sweep, Trace, Tag,
  ROOM, ROOM_HI, ROOM_LO, PANEL_B, PANEL_L, PANEL_D, STEEL, STEEL_L, STEEL_D,
  DECK, DECK_L, CARD, CARD2, CARD3, RED, RED_D, AMBER, AMBER_D, GO, GO_L, TEAL,
  DAWN, DAWN_HI, DAWN_LO, CLAY, STARC, FLOOR,
  cam, E, osc, rnd, OUT, IO, IN_Q, BACK, SH, SH_D,
} from "./MissionWorld";

/* =========================================================================
   REEL 82 "BORIS" · SCENES M1..M9 — nine locations, one per beat.

   ⛔ Every scene is a DIFFERENT PLACE with its own palette. Information is
   carried by moving objects (needles, split-flaps, filling bars, a radar
   sweep), not by text. Each scene holds ONE dominant object; the header states
   the CLAIM in the product's nouns; nothing overlaps anything.
   ========================================================================= */

/** one small placard, used at most once per scene */
const Plate: React.FC<{ x: number; y: number; w?: number; kick?: string; big: string; c?: string; z?: number }> =
  ({ x, y, w = 300, kick, big, c = RED, z = 22 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: w, padding: "12px 20px 14px", borderRadius: 6,
    background: CARD, borderLeft: `12px solid ${c}`, boxShadow: SH_D, zIndex: z }}>
    {kick && <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 18, letterSpacing: "0.16em", color: c }}>{kick}</div>}
    <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 40, lineHeight: 1.04, color: INK }}>{big}</div>
  </div>
);

/* ====== M1 · THE PLAN BAY — 80% of the manual is gone (5.24) ============== */
export const M1Deleted: React.FC = () => {
  const f = useCurrentFrame();
  const pull = [8, 20, 32, 44, 56];                 // binders yanked out, one at a time
  const gone = pull.filter((t) => f >= t).length;
  return (
    <AbsoluteFill>
      <Bg /><ProgressBar />
      <Tag f={f} logo word="HE DELETED 80% OF IT" c={RED} />
      <Panel glow={hexA(RED, 0.22)}>
        <div style={{ position: "absolute", inset: 0, transform: cam(f, 108, 0), transformOrigin: "50% 56%" }}>
          <PlanBay f={f} />
          {/* the dominant object: a shelf emptying, binder by binder */}
          {Array.from({ length: 14 }, (_, i) => {
            const yanked = i < gone * 3;
            const t = yanked ? Math.min(1, (f - pull[Math.min(4, Math.floor(i / 3))]) / 12) : 0;
            return (
              <div key={i} style={{ position: "absolute", left: 82 + i * 62, top: 366 - t * 40,
                width: 46, height: 148, borderRadius: 4, opacity: 1 - t,
                background: i % 3 === 0 ? "#8E9AA2" : i % 3 === 1 ? CARD3 : "#A6B0A8",
                borderTop: `9px solid ${i % 2 ? STEEL_D : AMBER_D}`, zIndex: 9,
                transform: `rotate(${t * (i % 2 ? 26 : -26)}deg)` }} />
            );
          })}
          <div style={{ position: "absolute", left: 70, top: 514, width: 872, height: 16, background: STEEL_D, zIndex: 8 }} />
          {/* a second, higher shelf already stripped bare */}
          <div style={{ position: "absolute", left: 70, top: 236, width: 872, height: 14, background: STEEL_D, zIndex: 7 }} />
          {[0, 1, 2].map((i) => (
            <div key={`hi${i}`} style={{ position: "absolute", left: 96 + i * 250, top: 152, width: 44, height: 84,
              borderRadius: 4, background: i ? CARD3 : "#8E9AA2", borderTop: `8px solid ${STEEL_D}`, zIndex: 7 }} />
          ))}
          {/* the rolling ladder */}
          <div style={{ position: "absolute", left: 828, top: 250, width: 14, height: 268, background: STEEL_D, zIndex: 9 }} />
          <div style={{ position: "absolute", left: 906, top: 250, width: 14, height: 268, background: STEEL_D, zIndex: 9 }} />
          {Array.from({ length: 6 }, (_, i) => (
            <div key={`rr${i}`} style={{ position: "absolute", left: 828, top: 282 + i * 42, width: 92, height: 10, background: STEEL, zIndex: 9 }} />
          ))}
          {/* the pile of pulled pages on the deck */}
          {Array.from({ length: 11 }, (_, i) => (
            <div key={`pg${i}`} style={{ position: "absolute", left: 118 + i * 46 + rnd(i, 9) * 22, top: 596 + (i % 3) * 14,
              width: 74, height: 20, borderRadius: 3, background: i % 2 ? CARD2 : CARD3,
              transform: `rotate(${-22 + rnd(i, 5) * 44}deg)`, boxShadow: SH, zIndex: 12,
              opacity: gone >= Math.floor(i / 2.4) ? 1 : 0 }} />
          ))}
          {/* the meter falls as they go */}
          <BarMeter f={f} x={70} y={556} w={430} h={40} v={1 - gone * 0.2} at={0} n={10} c={RED} z={16} />
          <Gauge f={f} x={780} y={140} d={188} v={0.2} at={44} danger={0.9} c={GO} label="PROMPT" z={16} />
          <Astro f={f} x={534} y={FLOOR - 250 * 0.94} size={250} cheer={0.5} gaze={-2} nodAmp={2.2} nodSpeed={12} z={14} />
        </div>
      </Panel>
    </AbsoluteFill>
  );
};

/* ====== M2 · THE CRECHE BAY — it was written to babysit (8.86) ============ */
export const M2Babysit: React.FC = () => {
  const f = useCurrentFrame();
  const leave = E(f, 62, 104, 0, 1, IO);
  return (
    <AbsoluteFill>
      <Bg /><ProgressBar />
      <Tag f={f} logo word="OPUS 5 DOESN'T NEED IT" c={AMBER_D} />
      <Panel glow={hexA(AMBER, 0.22)}>
        <div style={{ position: "absolute", inset: 0, transform: cam(f, 139, 3), transformOrigin: "50% 58%" }}>
          <CrecheBay f={f} />
          {/* the playpen: the OLD model, still in the rails */}
          <div style={{ position: "absolute", left: 66, top: 392, width: 400, height: 214, borderRadius: 12,
            border: `13px solid #B49B72`, background: "rgba(214,196,164,0.35)", zIndex: 8 }}>
            {Array.from({ length: 7 }, (_, i) => (
              <div key={i} style={{ position: "absolute", left: 22 + i * 52, top: -6, width: 13, height: 202, borderRadius: 6, background: "#B49B72" }} />
            ))}
          </div>
          <Astro f={f} x={140} y={FLOOR - 236 * 0.94} size={236} old helmet={false}
                 shock={0.7} nodAmp={0.5} nodSpeed={30} z={10} />
          {/* training wheels + a dummy checklist, the babysitting kit */}
          <div style={{ position: "absolute", left: 96, top: 566, width: 62, height: 62, borderRadius: "50%",
            border: `11px solid #A8905F`, zIndex: 11 }} />
          <div style={{ position: "absolute", left: 372, top: 566, width: 62, height: 62, borderRadius: "50%",
            border: `11px solid #A8905F`, zIndex: 11 }} />
          {/* the NEW one walks out of frame past it */}
          <div style={{ position: "absolute", left: 604 + leave * 300, top: FLOOR - 292 * 0.94, zIndex: 15 }}>
            <Astro f={f} x={0} y={0} size={292} cheer={0.85} gaze={2} nodAmp={3} nodSpeed={9} />
          </div>
          <Gauge f={f} x={596} y={132} d={170} v={0.98} at={10} danger={1.1} c={GO} label="OPUS 5" z={16} />
          <Gauge f={f} x={806} y={148} d={138} v={0.22} at={16} danger={0.9} c={AMBER} label="OLDER" z={16} />
        </div>
      </Panel>
    </AbsoluteFill>
  );
};

/* ====== M3 · THE TEST STAND — be a scientist, not a prompt writer (13.51) = */
export const M3Scientist: React.FC = () => {
  const f = useCurrentFrame();
  const cross = E(f, 14, 26, 0, 1, OUT);
  return (
    <AbsoluteFill>
      <Bg /><ProgressBar />
      <Tag f={f} icon="🧪" word="RUN AN EXPERIMENT" c={TEAL} />
      <Panel glow={hexA(TEAL, 0.22)}>
        <div style={{ position: "absolute", inset: 0, transform: cam(f, 109, 2), transformOrigin: "50% 56%" }}>
          <TestStand f={f} />
          {/* the crossed-out prompt sheet vs the live rig */}
          <div style={{ position: "absolute", left: 96, top: 132, width: 322, height: 250, borderRadius: 6,
            background: CARD2, border: `8px solid ${CARD3}`, boxShadow: SH, zIndex: 10 }}>
            {Array.from({ length: 8 }, (_, i) => (
              <div key={i} style={{ position: "absolute", left: 22, right: 22, top: 26 + i * 26, height: 12,
                borderRadius: 3, background: "rgba(70,80,76,0.26)" }} />
            ))}
            {/* the cross, drawn on */}
            <div style={{ position: "absolute", left: 12, top: 118, width: 306 * cross, height: 14, borderRadius: 7,
              background: RED, transform: "rotate(34deg)", transformOrigin: "0% 50%" }} />
            <div style={{ position: "absolute", left: 12, top: 118, width: 306 * cross, height: 14, borderRadius: 7,
              background: RED, transform: "rotate(-34deg)", transformOrigin: "0% 50%" }} />
          </div>
          {/* the rig: a specimen on a stand, instrumented */}
          <div style={{ position: "absolute", left: 552, top: 178, width: 300, height: 208, borderRadius: 10,
            background: PANEL_D, border: `8px solid ${PANEL_L}`, boxShadow: SH_D, zIndex: 10 }} />
          <Trace f={f} x={578} y={206} w={250} h={78} c={GO_L} z={12} />
          <BarMeter f={f} x={578} y={300} w={250} h={34} v={0.82} at={12} n={10} c={GO} z={12} />
          <div style={{ position: "absolute", left: 458, top: 424, width: 120, height: 176, background: STEEL, zIndex: 9 }} />
          <div style={{ position: "absolute", left: 442, top: 410, width: 152, height: 22, borderRadius: 5, background: STEEL_D, zIndex: 9 }} />
          {/* the specimen on the stand, with the Claude mark on it */}
          <div style={{ position: "absolute", left: 452, top: 306, width: 132, height: 108, borderRadius: "10px 10px 4px 4px",
            background: CARD, boxShadow: SH_D, zIndex: 10 }} />
          <Patch x={488} y={332} d={58} c={TEAL} z={11} />
          {/* cabling from the specimen back to the rig */}
          <svg width={1012} height={792} style={{ position: "absolute", inset: 0, zIndex: 9 }}>
            <path d="M 584 360 Q 640 400 700 330" stroke={STEEL_D} strokeWidth={9} fill="none" strokeLinecap="round" />
            <path d="M 584 384 Q 648 432 712 372" stroke="#8A958F" strokeWidth={7} fill="none" strokeLinecap="round" />
          </svg>
          {/* hazard stripe across the deck */}
          <div style={{ position: "absolute", left: 0, right: 0, top: 596, height: 20, zIndex: 8, overflow: "hidden" }}>
            {Array.from({ length: 26 }, (_, i) => (
              <div key={i} style={{ position: "absolute", left: i * 44 - 20, top: 0, width: 26, height: 20,
                background: i % 2 ? AMBER : "#2E3A36", transform: "skewX(-26deg)" }} />
            ))}
          </div>
          {/* a clipboard on the wall, small and subordinate */}
          <div style={{ position: "absolute", left: 892, top: 168, width: 78, height: 104, borderRadius: 4,
            background: CARD2, border: `5px solid ${STEEL_D}`, zIndex: 10 }}>
            {[0, 1, 2].map((i) => (
              <div key={i} style={{ position: "absolute", left: 12, right: 12, top: 20 + i * 22, height: 8, borderRadius: 3, background: "rgba(70,80,76,0.3)" }} />
            ))}
          </div>
          <Astro f={f} x={632} y={FLOOR - 268 * 0.94} size={268} gaze={-2} nodAmp={2.2} nodSpeed={13} z={14} />
          <Patch x={196} y={FLOOR - 112} d={70} c={TEAL} z={16} />
        </div>
      </Panel>
    </AbsoluteFill>
  );
};

/* ====== M4 · THE RIG — a task slightly too hard, checking itself (17.15) == */
export const M4TooHard: React.FC = () => {
  const f = useCurrentFrame();
  const load = E(f, 8, 62, 0, 1, IO);
  return (
    <AbsoluteFill>
      <Bg /><ProgressBar />
      <Tag f={f} icon="⚖️" word="SLIGHTLY TOO HARD" c={AMBER_D} />
      <Panel glow={hexA(AMBER, 0.22)}>
        <div style={{ position: "absolute", inset: 0, transform: cam(f, 104, 4), transformOrigin: "50% 54%" }}>
          <TestStand f={f} />
          {/* the dominant object: a load dial pushed just past comfortable */}
          <Gauge f={f} x={352} y={112} d={310} v={0.62 + load * 0.24} at={4} danger={0.78} c={GO} label="LOAD" z={14} />
          {/* the self-check loop, drawn as a closed circuit with a tick */}
          <div style={{ position: "absolute", left: 90, top: 250, width: 210, height: 210, borderRadius: "50%",
            border: `14px solid ${GO}`, zIndex: 12 }} />
          <div style={{ position: "absolute", left: 154, top: 322, width: 26, height: 60, borderRadius: 4, background: GO,
            transform: "rotate(-42deg)", zIndex: 13 }} />
          <div style={{ position: "absolute", left: 172, top: 350, width: 26, height: 96, borderRadius: 4, background: GO,
            transform: "rotate(38deg)", zIndex: 13 }} />
          <Trace f={f} x={98} y={492} w={252} h={92} c={GO_L} break_={undefined} z={12} />
          <BarMeter f={f} x={392} y={492} w={252} h={34} v={0.86} at={16} n={10} c={GO} z={12} />
          <Astro f={f} x={706} y={FLOOR - 250 * 0.94} size={250} gaze={-2} nodAmp={2} nodSpeed={14} z={15} />
        </div>
      </Panel>
    </AbsoluteFill>
  );
};

/* ====== M5 · THE SHAKE BAY — watch where it breaks (20.63) ================ */
export const M5Breaks: React.FC = () => {
  const f = useCurrentFrame();
  const BREAK = 26;
  const shake = f >= 6 && f < BREAK ? osc(f, 1.4, 12) : 0;
  const broke = f >= BREAK;
  return (
    <AbsoluteFill>
      <Bg /><ProgressBar />
      <Tag f={f} icon="📈" word="WATCH WHERE IT BREAKS" c={RED} />
      <Panel glow={hexA(RED, 0.24)}>
        <div style={{ position: "absolute", inset: 0, transform: cam(f, 60, 0), transformOrigin: "50% 54%" }}>
          <ShakeBay f={f} />
          {/* the dominant object: the trace, and the point it lets go */}
          <div style={{ position: "absolute", left: 74, top: 404, width: 864, height: 190, borderRadius: 10,
            background: PANEL_D, border: `8px solid ${PANEL_L}`, boxShadow: SH_D, zIndex: 10 }} />
          <Trace f={f} x={100} y={430} w={812} h={140} c={GO_L} break_={broke ? 0.72 : undefined} z={12} />
          {broke && <Pulse f={f} at={BREAK} x={100 + 812 * 0.72} y={500} r={230} c={RED} life={22} z={13} />}
          {/* the specimen on the shake table */}
          <div style={{ position: "absolute", left: 388 + shake, top: 300, width: 236, height: 74, borderRadius: 8,
            background: STEEL, zIndex: 11 }} />
          <div style={{ position: "absolute", left: 424 + shake, top: 176, width: 164, height: 130, borderRadius: "10px 10px 4px 4px",
            background: CARD, boxShadow: SH, zIndex: 11 }} />
          <Patch x={476 + shake} y={210} d={60} c={RED} z={12} />
          {broke && [0, 1, 2, 3].map((i) => {
            const t = Math.min(1, (f - BREAK) / 16);
            return <div key={i} style={{ position: "absolute", left: 430 + i * 44 + t * 70 * (i - 1.5),
              top: 200 - t * 60 + t * t * 150, width: 42, height: 20, borderRadius: 4, background: CARD3,
              transform: `rotate(${t * 210 * (i % 2 ? 1 : -1)}deg)`, zIndex: 13 }} />;
          })}
          <Gauge f={f} x={796} y={128} d={168} v={broke ? 1 : 0.7} at={6} danger={0.86} c={GO} label="STRESS" z={14} />
        </div>
      </Panel>
    </AbsoluteFill>
  );
};

/* ====== M6 · fix the SETUP, not the wording (22.62) ====================== */
export const M6Setup: React.FC = () => {
  const f = useCurrentFrame();
  const turn = E(f, 10, 46, 0, 1, IO);
  return (
    <AbsoluteFill>
      <Bg /><ProgressBar />
      <Tag f={f} logo word="FIX THE SETUP" c={GO} />
      <Panel glow={hexA(GO, 0.22)}>
        <div style={{ position: "absolute", inset: 0, transform: cam(f, 82, 1), transformOrigin: "50% 56%" }}>
          <ShakeBay f={f} />
          {/* the dominant object: three setup dials being TURNED, not a prompt reworded */}
          {[0, 1, 2].map((i) => (
            <div key={i} style={{ position: "absolute", left: 122 + i * 268, top: 168, width: 196, height: 196,
              borderRadius: "50%", background: PANEL_D, border: `10px solid ${PANEL_L}`, boxShadow: SH_D, zIndex: 11 }}>
              <div style={{ position: "absolute", left: 88, top: 26, width: 20, height: 84, borderRadius: 10, background: GO_L,
                transformOrigin: "50% 100%", transform: `rotate(${-120 + turn * (60 + i * 42)}deg)` }} />
              <div style={{ position: "absolute", left: 72, top: 72, width: 52, height: 52, borderRadius: "50%", background: PANEL_L }} />
              {Array.from({ length: 10 }, (_, k) => {
                const a = (-150 + k * 33) * Math.PI / 180;
                return <div key={k} style={{ position: "absolute", left: 98 + Math.cos(a) * 82 - 4, top: 98 + Math.sin(a) * 82 - 4,
                  width: 8, height: 8, borderRadius: "50%", background: "#B6C9D6" }} />;
              })}
            </div>
          ))}
          {/* the crossed-out sheet, small and subordinate */}
          <div style={{ position: "absolute", left: 776, top: 470, width: 154, height: 122, borderRadius: 5,
            background: CARD2, border: `6px solid ${CARD3}`, zIndex: 10, opacity: 0.62 }}>
            <div style={{ position: "absolute", left: 8, top: 52, width: 138, height: 10, borderRadius: 5, background: RED, transform: "rotate(28deg)" }} />
            <div style={{ position: "absolute", left: 8, top: 52, width: 138, height: 10, borderRadius: 5, background: RED, transform: "rotate(-28deg)" }} />
          </div>
          <BarMeter f={f} x={122} y={404} w={618} h={42} v={turn} at={10} n={16} c={GO} z={14} />
          <Astro f={f} x={392} y={FLOOR - 262 * 0.94} size={262} gaze={-2} cheer={0.5} nodAmp={2.2} nodSpeed={12} z={15} />
        </div>
      </Panel>
    </AbsoluteFill>
  );
};

/* ====== M7 · THE HOP PAD — the tasks are far too small (25.36) =========== */
export const M7TooSmall: React.FC = () => {
  const f = useCurrentFrame();
  const hop = Math.max(0, Math.sin(((f - 8) / 26) * Math.PI)) * (f >= 8 && f < 34 ? 1 : 0);
  return (
    <AbsoluteFill>
      <Bg /><ProgressBar />
      <Tag f={f} icon="📏" word="YOUR TASKS ARE TOO SMALL" c={AMBER_D} />
      <Panel glow={hexA(AMBER, 0.22)}>
        <div style={{ position: "absolute", inset: 0, transform: cam(f, 66, 2), transformOrigin: "50% 60%" }}>
          <HopPad f={f} />
          {/* the dominant object: a pathetically short trajectory arc */}
          <svg width={1012} height={792} style={{ position: "absolute", inset: 0, zIndex: 10 }}>
            <path d="M 300 596 Q 372 470 444 596" stroke={AMBER} strokeWidth={13} fill="none"
                  strokeDasharray="22 16" strokeLinecap="round" />
            {/* what it could have done, running off the frame */}
            <path d="M 300 596 Q 640 96 1040 300" stroke={GO} strokeWidth={9} fill="none"
                  strokeDasharray="12 20" opacity={0.75} strokeLinecap="round" />
          </svg>
          <Craft f={f} x={264 + hop * 130} y={430 - hop * 130} s={0.66} flame={hop > 0.05 ? 0.5 : 0} z={13} />
          {/* a measuring stick showing how short the hop is */}
          <div style={{ position: "absolute", left: 300, top: 630, width: 144, height: 12, background: AMBER_D, zIndex: 12 }} />
          <div style={{ position: "absolute", left: 300, top: 616, width: 10, height: 40, background: AMBER_D, zIndex: 12 }} />
          <div style={{ position: "absolute", left: 434, top: 616, width: 10, height: 40, background: AMBER_D, zIndex: 12 }} />
          <Gauge f={f} x={742} y={150} d={198} v={0.12} at={6} danger={0.9} c={GO} label="SCOPE" z={14} />
          <Astro f={f} x={556} y={FLOOR - 240 * 0.94} size={240} shock={0.4} gaze={2} nodAmp={1.4} nodSpeed={18} z={14} />
        </div>
      </Panel>
    </AbsoluteFill>
  );
};

/* ====== M8 · THE LONG BURN — one instruction, two weeks (27.56) ========== */
export const M8LongBurn: React.FC = () => {
  const f = useCurrentFrame();
  const travel = E(f, 0, 166, 0, 1, IO);
  return (
    <AbsoluteFill>
      <Bg /><ProgressBar />
      <Tag f={f} logo word="ONE INSTRUCTION, 14 DAYS" c={GO} />
      <Panel glow={hexA(TEAL, 0.26)}>
        <div style={{ position: "absolute", inset: 0, overflow: "hidden",
          transform: cam(f, 166, 1), transformOrigin: "50% 50%" }}>
          <div style={{ position: "absolute", inset: 0, background: "#0B1030" }} />
          <Stars n={100} seed={7} />
          <GasGiant f={f} cx={300} cy={700} r={430} hue="teal" />
          <Moons f={f} />
          <Cluster f={f} x={640} y={128} />
          {/* the craft crossing the frame over two weeks */}
          <Craft f={f} x={120 + travel * 660} y={330 - travel * 96} s={0.78} flame={0.3} z={16} />
          {/* the day counter rolling, flap by flap */}
          {["1", "4"].map((ch, i) => (
            <Flap key={i} f={f} at={10 + i * 6} text={ch} x={706 + i * 104} y={396} w={92} h={124}
                  c="#EAF6F7" bg="#12344A" z={18} />
          ))}
          <div style={{ position: "absolute", left: 706, top: 534, fontFamily: inter.fontFamily, fontWeight: 900,
            fontSize: 30, letterSpacing: "0.16em", color: "#9FD8DC", zIndex: 18 }}>DAYS</div>
          <BarMeter f={f} x={706} y={584} w={196} h={32} v={1} at={22} n={14} c={GO_L} z={18} />
        </div>
      </Panel>
    </AbsoluteFill>
  );
};

/* ====== M9 · THE DAWN GANTRY — comment BORIS (33.08) ===================== */
export const M9Cta: React.FC = () => {
  const f = useCurrentFrame();
  const rise = E(f, 4, 24, 0, 1, BACK);
  const stamp = E(f, 30, 42, 0, 1, BACK);
  return (
    <AbsoluteFill>
      <Bg /><ProgressBar />
      <Tag f={f} icon="💬" word='COMMENT "BORIS"' c={RED} />
      <Panel glow={hexA(DAWN, 0.3)}>
        <div style={{ position: "absolute", inset: 0, overflow: "hidden",
          transform: cam(f, 78, 4), transformOrigin: "50% 58%" }}>
          <DawnGantry f={f} />
          <Dish f={f} x={62} y={92} s={0.5} z={8} />
          {/* the guide, as a mission binder rather than a text card */}
          <div style={{ position: "absolute", left: 92, top: 232, width: 400, opacity: rise,
            transform: `translateY(${(1 - rise) * 30}px)`, zIndex: 16 }}>
            <div style={{ position: "absolute", left: -12, top: -14, right: -12, bottom: -14, borderRadius: 8,
              background: "#8A5E44", boxShadow: SH_D }} />
            <div style={{ position: "absolute", inset: 0, height: 246, background: CARD, borderRadius: 4 }} />
            <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 54, background: RED,
              borderRadius: "4px 4px 0 0", display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 24, letterSpacing: "0.18em", color: "#FFF1EE" }}>THE FULL GUIDE</div>
            {[0, 1, 2, 3].map((i) => (
              <div key={i} style={{ position: "absolute", left: 24, top: 82 + i * 40, display: "flex", alignItems: "center", gap: 14 }}>
                <span style={{ width: 20, height: 20, borderRadius: "50%", background: GO }} />
                <span style={{ width: 250 - i * 30, height: 11, borderRadius: 5, background: CARD3 }} />
              </div>
            ))}
          </div>
          {/* the stamp: the keyword, as a mission seal */}
          <div style={{ position: "absolute", left: 636, top: 286, width: 286, height: 286, zIndex: 22,
            opacity: stamp, transform: `rotate(${-9 + (1 - stamp) * 20}deg) scale(${0.7 + stamp * 0.3})` }}>
            <div style={{ position: "absolute", inset: 0, borderRadius: 20, border: `20px solid ${RED}`, background: "rgba(255,255,255,0.82)" }} />
            <div style={{ position: "absolute", left: 0, right: 0, top: 62, textAlign: "center",
              fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 30, letterSpacing: "0.2em", color: RED }}>COMMENT</div>
            <div style={{ position: "absolute", left: 0, right: 0, top: 108, textAlign: "center",
              fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 72, letterSpacing: "-0.02em", color: RED }}>BORIS</div>
          </div>
          <Astro f={f} x={356} y={FLOOR - 228 * 0.94} size={228} cheer={0.9} gaze={2} nodAmp={3} nodSpeed={9} z={15} />
        </div>
      </Panel>
    </AbsoluteFill>
  );
};
