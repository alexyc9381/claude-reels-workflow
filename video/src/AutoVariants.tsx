import React from "react";
import { AbsoluteFill, useCurrentFrame, Img, staticFile, Audio } from "remotion";
import { inter } from "./fonts";
import { Bg, Panel, ProgressBar, HookHeader, Caption, hexA } from "./SlopKit";
import { Dev } from "./KeyWorld";
import { SkylineNight, AChip, BRAND_TASKS, CARD, INKD, RED, GO, A1, A3 } from "./AutoWorld";
import { E, OUT, IO, BACK } from "./MissionWorld";
import { Shot, Flash } from "./AutoHookQueue";

/* =========================================================================
   REEL 125 "AUTO" — TRIAL VARIANTS, first 3.6s (the two shots he has seen).

   The paradigm ledger this answers:
     v1 A  THE TOWER      verb: accumulate   (61,340 views)
     v1 B  THE CONVEYOR   verb: flow
     v1 C  THE OVERNIGHT  verb: elapse
     v2    the tile pile  verb: scatter      (6,078 views)
     re-cut THE QUEUE     verb: accumulate   ⛔ collides with the TOWER

   Both variants below take a verb nothing has used, and both keep the LOCKED
   VO, the chassis, the 2.03s shutter + scale jump, and the L3 rule
   (before / trigger / travel / NO arrival).
   ========================================================================= */

export const VAR_LEN = 108;                       // 3.60s — through the second shot
export const C1 = 61;                                    // the shutter, 2.03s

export const lin = (f: number, a: number, b: number, from = 0, to = 1) =>
  from + (to - from) * Math.max(0, Math.min(1, (f - a) / Math.max(1, b - a)));

export const Wedges: React.FC<{ f: number; z?: number }> = ({ f, z = 5 }) => (
  <svg width={1012} height={792} style={{ position: "absolute", inset: 0, zIndex: z }}>
    <g transform={`rotate(${f * 0.06} 250 300)`} opacity={0.5}>
      <path d="M-180 120 L360 -60 L470 220 L-120 400 Z" fill="#16202B" /></g>
    <g transform={`rotate(${-f * 0.042} 830 520)`} opacity={0.4}>
      <path d="M660 250 L1180 120 L1240 470 L720 610 Z" fill="#16202B" /></g>
  </svg>
);
export const Satellites: React.FC<{ f: number; n?: number; z?: number }> = ({ f, n = 6, z = 7 }) => (<>
  {Array.from({ length: n }, (_, i) => {
    const p = 74 + i * 13, u = ((f + i * 21) % p) / p, dir = i % 2 ? 1 : -1;
    const x = dir > 0 ? -110 + u * 1240 : 1120 - u * 1240;
    const y = (120 + ((i * 137) % 520)) - Math.sin(u * Math.PI) * (90 + i * 22);
    return <div key={i} style={{ position: "absolute", left: x, top: y, width: 58, height: 46,
      borderRadius: 9, background: "#26333F", zIndex: z, transform: `rotate(${u * 200 * dir}deg)` }}>
      <div style={{ position: "absolute", left: 9, top: 15, width: 13, height: 13,
        borderRadius: "50%", background: "#3B4C5C" }} />
      <div style={{ position: "absolute", left: 28, top: 19, width: 21, height: 6,
        borderRadius: 3, background: "#3B4C5C" }} /></div>;
  })}
</>);

export const Shutter: React.FC<{ f: number }> = ({ f }) => {
  const k = f - C1;
  if (k < -1 || k > 2) return null;
  return <div style={{ position: "absolute", inset: 0, zIndex: 90,
    background: k < 0 ? "#05080C" : "#FFF6E2", opacity: k < 0 ? 1 : 0.82 - k * 0.34 }} />;
};

/* one desk, drawn as paths — ⛔ not a stack of rounded divs */
const Desk: React.FC<{ x: number; y: number; s?: number; lit?: number; z?: number }> =
  ({ x, y, s = 1, lit = 0, z = 20 }) => (
  <svg width={210 * s} height={168 * s} viewBox="0 0 210 168"
       style={{ position: "absolute", left: x, top: y, zIndex: z }}>
    <path d="M18 62h174a8 8 0 0 1 8 8v10a8 8 0 0 1-8 8H18a8 8 0 0 1-8-8V70a8 8 0 0 1 8-8z" fill="#2A3540" />
    <path d="M26 88h12v70H26z M172 88h12v70h-12z" fill="#222C36" />
    <path d="M66 8h78a10 10 0 0 1 10 10v34a10 10 0 0 1-10 10H66a10 10 0 0 1-10-10V18A10 10 0 0 1 66 8z"
          fill={lit > 0.5 ? "#123527" : "#151C24"} stroke={lit > 0.5 ? GO : "#2C3742"} strokeWidth={3} />
    <path d="M96 62h18v10H96z M84 72h42v6H84z" fill="#222C36" />
    {lit > 0.5 && <><rect x={66} y={22} width={30} height={5} rx={2.5} fill={GO} opacity={0.9} />
      <rect x={66} y={33} width={52} height={5} rx={2.5} fill={GO} opacity={0.55} /></>}
  </svg>
);

/* ── VARIANT 2 · THE UNDERSTUDY — verb: HAND OVER ─────────────────────────
   The only paradigm whose STAKE matches what the VO actually promises: "so you
   never have to set one up yourself" is a line about being RELIEVED of work,
   not about how much work there is. Every version so far argued volume.        */
export const AutoVarUnderstudy: React.FC = () => {
  const f = useCurrentFrame();
  const walk = lin(f, 4, 30);                       // the second Claude arrives
  const tap  = f >= 28;                             // TRIGGER at 0.93s
  const turn = lin(f, 30, C1, 0, 0.55);             // he begins to turn — never completes
  return (
    <AbsoluteFill>
      <Bg /><ProgressBar />
      <HookHeader f={f + 12} big="280 AUTOMATIONS, FREE" hot="ONE GITHUB REPO" />
      <Panel glow={hexA(RED, 0.3)}>
        <Shot f={f} a={0} b={C1} k={0} len={VAR_LEN}>
          <div style={{ position: "absolute", inset: 0, background: "#080C12" }} />
          <SkylineNight f={f} z={3} />
          <div style={{ position: "absolute", inset: 0, background: "#080C12", opacity: 0.66, zIndex: 4 }} />
          <Wedges f={f} /><Satellites f={f} n={5} />
          <Desk x={300} y={330} s={1.5} lit={0} z={20} />
          {/* the task he is doing BY HAND */}
          <div style={{ position: "absolute", left: 336, top: 232, width: 250, height: 84,
            borderRadius: 10, background: CARD, zIndex: 30, display: "flex", alignItems: "center",
            gap: 12, paddingLeft: 14, boxSizing: "border-box", transform: `rotate(${-2 + Math.sin(f / 9) * 1.2}deg)`,
            boxShadow: "0 6px 10px rgba(0,0,0,0.6)" }}>
            <Img src={staticFile("logos/gmail.svg")} style={{ width: 36, height: 36, display: "block" }} />
            <div>
              <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 22, color: INKD }}>Sort inbox</div>
              <div style={{ fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 14, color: "#8E8677" }}>needs you</div>
            </div>
          </div>
          <Dev f={f} x={300} y={392} size={186} gaze={2} shock={tap ? 0.9 : 0.2}
               nodAmp={tap ? 3.4 : 1.4} nodSpeed={tap ? 17 : 8} z={40} />
          {/* the understudy walks in — and the hand lands, but the chair never changes */}
          <div style={{ position: "absolute", left: 980 - walk * 380, top: 392, zIndex: 44,
            opacity: Math.min(1, walk * 2) }}>
            <Dev f={f} x={0} y={0} size={190} gaze={1} cheer={0.5} nodAmp={2} nodSpeed={9} z={44} />
          </div>
          {tap && (
            <div style={{ position: "absolute", left: 520, top: 430, width: 74, height: 40,
              borderRadius: 12, background: "#C8674F", zIndex: 50,
              transform: `rotate(${-18 + turn * 8}deg) scale(${E(f, 28, 34, 0.4, 1, BACK)})`,
              boxShadow: "0 5px 9px rgba(0,0,0,0.6)" }} />
          )}
          <AChip y={706} text="EVERY MORNING. BY HAND." c={RED} size={30} />
        </Shot>

        <Shot f={f} a={C1} b={9999} k={1} len={VAR_LEN}>
          <div style={{ position: "absolute", inset: 0, background: "#080C12" }} />
          <SkylineNight f={f} z={3} />
          <div style={{ position: "absolute", inset: 0, background: "#080C12", opacity: 0.66, zIndex: 4 }} />
          <Wedges f={f} /><Satellites f={f} n={6} />
          {/* the room he walks out of — every desk taken, every screen green */}
          {Array.from({ length: 12 }, (_, i) => {
            const col = i % 4, row = Math.floor(i / 4);
            const on = lin(f, C1 + 2 + i * 2.4, C1 + 12 + i * 2.4);
            return (
              <React.Fragment key={i}>
                <Desk x={112 + col * 232} y={190 + row * 172} s={0.94 - row * 0.05}
                      lit={on} z={16 + row} />
                {on > 0.4 && (
                  <div style={{ position: "absolute", left: 150 + col * 232, top: 246 + row * 172,
                    opacity: on }}>
                    <Dev f={f + i * 11} x={0} y={0} size={104 - row * 6} gaze={1} cheer={0.8}
                         nodAmp={2.6} nodSpeed={9 + i} z={20 + row} />
                  </div>
                )}
              </React.Fragment>
            );
          })}
          {/* him, leaving */}
          <div style={{ position: "absolute", left: 40 + lin(f, C1 + 6, VAR_LEN, 0, -120), top: 512,
            zIndex: 60, opacity: lin(f, C1 + 6, VAR_LEN, 1, 0.15) }}>
            <Dev f={f} x={0} y={0} size={182} gaze={0} cheer={0.95} nodAmp={3} nodSpeed={10} z={60} />
          </div>
          <div style={{ position: "absolute", left: 300, top: 640, width: 420, height: 108,
            borderRadius: 16, background: "#0B1017", border: `5px solid ${A3}`, zIndex: 62,
            display: "flex", alignItems: "center", justifyContent: "center", gap: 14,
            transform: `scale(${E(f, C1 + 8, C1 + 18, 0.4, 1, BACK)})` }}>
            <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 62, color: A1 }}>
              {Math.round(280 * lin(f, C1 + 8, VAR_LEN - 4))}</span>
            <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 18,
              letterSpacing: "0.16em", color: A3 }}>ALREADY BUILT</span>
          </div>
          <AChip y={706} text="NOBODY TOUCHED IT" c={GO} size={32} />
        </Shot>
        <Flash f={f} cuts={[C1]} /><Shutter f={f} />
      </Panel>
      <Audio src={staticFile("auto85_vo_v2.wav")} />
    </AbsoluteFill>
  );
};

/* ── VARIANT 3 · THE LIGHTS COMING ON — verb: ILLUMINATE ──────────────────
   Argues volume like the others, but through SCALE rather than accumulation,
   and it reuses SkylineNight so it is the cheapest of the five to build.      */
export const AutoVarLights: React.FC = () => {
  const f = useCurrentFrame();
  const flick = f >= 22 && f < 28 ? (Math.floor(f / 2) % 2) : 0;   // the BEFORE
  const wave = lin(f, 28, 140);                                     // TRIGGER + TRAVEL, never arrives
  const W = 26, H = 9;
  return (
    <AbsoluteFill>
      <Bg /><ProgressBar />
      <HookHeader f={f + 12} big="280 AUTOMATIONS, FREE" hot="ONE GITHUB REPO" />
      <Panel glow={hexA(RED, 0.3)}>
        <Shot f={f} a={0} b={C1} k={2} len={VAR_LEN}>
          <div style={{ position: "absolute", inset: 0, background: "#05080E" }} />
          <SkylineNight f={f} z={3} />
          <Wedges f={f} /><Satellites f={f} n={4} />
          {/* the grid of windows. One flickers, then the wave starts and runs. */}
          {Array.from({ length: W * H }, (_, i) => {
            const c = i % W, r = Math.floor(i / W);
            const first = i === 148;
            const on = first ? (f >= 28 ? 1 : flick) : (wave * 1.9 > (c / W) + r * 0.02 ? 1 : 0);
            if (!on) return null;
            return <div key={i} style={{ position: "absolute", left: 22 + c * 38, top: 150 + r * 44,
              width: 22, height: 28, borderRadius: 3,
              background: first ? "#FFE9A8" : "#E8C978", opacity: first ? 1 : 0.86,
              boxShadow: first ? "0 0 22px #FFD976" : "0 0 10px rgba(232,201,120,0.55)", zIndex: 14 }} />;
          })}
          <Dev f={f} x={44} y={560} size={190} gaze={2} shock={f >= 28 ? 0.7 : 0.2}
               nodAmp={2.4} nodSpeed={12} z={40} />
          <AChip y={706} text="NOTHING RUNS ITSELF" c={RED} size={30} />
        </Shot>

        <Shot f={f} a={C1} b={9999} k={3} len={VAR_LEN}>
          <div style={{ position: "absolute", inset: 0, background: "#05080E" }} />
          <SkylineNight f={f} z={3} />
          <Wedges f={f} /><Satellites f={f} n={5} />
          {/* pulled back — the wave is still crossing, three cities deep */}
          <div style={{ position: "absolute", inset: 0, transform: "scale(0.62)",
            transformOrigin: "50% 44%", zIndex: 12 }}>
            {[0, 1, 2].map((band) =>
              Array.from({ length: W * 6 }, (_, i) => {
                const c = i % W, r = Math.floor(i / W);
                if (wave * 2.2 < (c / W) + band * 0.24) return null;
                return <div key={`${band}-${i}`} style={{ position: "absolute", left: 22 + c * 38,
                  top: 60 + band * 290 + r * 42, width: 22, height: 28, borderRadius: 3,
                  background: "#E8C978", opacity: 0.9 - band * 0.16,
                  boxShadow: "0 0 10px rgba(232,201,120,0.5)", zIndex: 14 }} />;
              }))}
          </div>
          <div style={{ position: "absolute", left: 300, top: 636, width: 420, height: 108,
            borderRadius: 16, background: "#0B1017", border: `5px solid ${A3}`, zIndex: 62,
            display: "flex", alignItems: "center", justifyContent: "center", gap: 14,
            transform: `scale(${E(f, C1 + 8, C1 + 18, 0.4, 1, BACK)})` }}>
            <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 62, color: A1 }}>
              {Math.round(280 * lin(f, C1 + 8, VAR_LEN - 4))}</span>
            <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 18,
              letterSpacing: "0.16em", color: A3 }}>ALREADY RUNNING</span>
          </div>
          <AChip y={706} text="NOBODY TOUCHED IT" c={GO} size={32} />
        </Shot>
        <Flash f={f} cuts={[C1]} /><Shutter f={f} />
      </Panel>
      <Audio src={staticFile("auto85_vo_v2.wav")} />
    </AbsoluteFill>
  );
};
