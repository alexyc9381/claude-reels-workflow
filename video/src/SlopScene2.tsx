import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";
import { fraunces, inter } from "./fonts";
import {
  Bg, ProgressBar, Panel, CaptionLine, SlopBrick, hexA, CO, CLAY, GOLD, GREEN, RED, SKY, MUTE, INK, MONO, AMBER, grad, SectionHeader,
} from "./SlopKit";

/* =========================================================================
   SLOP - S2 "WHY IT SOUNDS FAKE"  (its OWN setting: a COLD AI WRITING FACTORY)
   VO: "AI sounds like AI because it knows how every sentence ends before it
        begins."
   Now cranked to a REDLINING production hall: a PACKED conveyor streams a
   continuous river of identical grey "slop" pages that spill into a toppling
   pile, THREE stamp presses hammer in offset rhythm (recoil + spark bursts +
   screen-shake on every hit), spinning rollers/gears, big swinging REDLINE
   gauges, drooping cables, steam vents, red + amber alarm beacons sweeping.
   The cold grey AI-SLOP robot bustles in the middle - big head turns, points
   up at the autocue, grabs pages, feeds the stamper - with a second worker-bot
   scurrying the exit. The autocue's ENDING glows AHEAD of the read-head (it
   knows the ending before it starts). Midway a retention COUNTDOWN badge tees
   up the tutorial. Everything rides off f. Karaoke caption carries the words.
   ========================================================================= */
export const Scene2: React.FC = () => {
  const f = useCurrentFrame();

  // deterministic pseudo-random (NO Math.random) for scattering props
  const rnd = (i: number) => { const x = Math.sin(i * 91.7 + 3.13) * 43758.5453; return x - Math.floor(x); };

  // the teleprompter cycles through several pre-written grey-slop sentences over the scene,
  // each one glowing its ENDING before the read-head gets there ("it knows how every sentence
  // ends before it begins"). Cycling text keeps the 11s beat alive instead of one frozen line.
  const SENTENCES = [
    ["In", "modern", "times", "we", "leverage", "synergy", "to", "unlock", "peak", "potential"],
    ["Furthermore", "it", "is", "crucial", "to", "note", "the", "key", "takeaways", "here"],
    ["In", "conclusion", "the", "possibilities", "are", "truly", "endless", "going", "forward"],
  ];
  const SENT_FRAMES = 112;                                      // dwell per sentence
  const sIdx = Math.min(SENTENCES.length - 1, Math.floor(f / SENT_FRAMES));
  const localS = f - sIdx * SENT_FRAMES;
  const words = SENTENCES[sIdx];
  const lastIdx = words.length - 1;
  const readHead = Math.min(lastIdx, Math.floor(localS / 8));   // read-head sweeps this sentence
  const sentIn = Math.min(1, localS / 8);                       // fresh sentence fades/slides in

  // the identical short line every monitor echoes
  const echo = ["In", "modern", "times", "we"];

  // animated drivers
  const led = 0.5 + 0.5 * Math.sin(f / 15);                     // rack LED breathe
  const endPulse = 0.6 + 0.4 * Math.abs(Math.sin(f / 8));       // the KNOWN ending glow
  const mouth = 5 + Math.abs(Math.sin(f / 3)) * 11;             // robot jaw reciting
  const smug = Math.sin(f / 12) * 4 + Math.sin(f / 33) * 3;     // BIG readable head turns
  const beam = 0.2 + 0.16 * Math.abs(Math.sin(f / 9));          // eyeline beam breathe
  const belt = (f * 3.6) % 168;                                 // FAST conveyor scroll

  // ---- MULTIPLE STAMP PRESSES: 3 hammers pounding the belt in offset rhythm ----
  // each one punches HARD (sharp recoil + sparks). Whole-hall shake rides the biggest hit.
  const STX = 792;                                              // main stamp station x (over the belt)
  const STAMPS: { x: number; cyc: number; off: number; restY: number; travel: number }[] = [
    { x: STX, cyc: 34, off: 0, restY: 356, travel: 184 },      // main tall gantry (keeps pistons+gears)
    { x: 300, cyc: 42, off: 15, restY: 428, travel: 112 },     // left press
    { x: 600, cyc: 28, off: 9, restY: 434, travel: 106 },      // centre-right press (fastest)
  ];
  const stampState = STAMPS.map((st) => {
    const sp = ((f + st.off) % st.cyc) / st.cyc;                // 0..1 through this hammer's cycle
    const punch = Math.pow(Math.max(0, Math.sin(sp * Math.PI)), 3); // very sharp at the bottom
    const headY = st.restY + punch * st.travel;                 // stamp head travel down to the belt
    const impact = punch > 0.8 ? (punch - 0.8) / 0.2 : 0;       // 0..1, spikes at the hit
    const recoil = impact * 8;                                  // gantry frame kicks up on the hit
    const sparkAge = ((f + st.off) % st.cyc) - Math.round(st.cyc / 2); // frames since the mid-cycle hit
    return { ...st, punch, headY, impact, recoil, sparkAge };
  });
  const maxImpact = Math.max(0, ...stampState.map((s) => s.impact)); // biggest live hit

  // harder stamps = recoil + screen-shake spiking on the biggest hit
  const shakeX = Math.sin(f * 3.7) * maxImpact * 5;             // whole-hall jolt on impact
  const shakeY = Math.cos(f * 4.3) * maxImpact * 4;

  // the cold grey robot is more alive: smug bobbing + a scan-line sweeping its glowing eyes
  const bobY = Math.sin(f / 9) * 3 + Math.max(0, Math.sin(f / 40)) * 4;
  const startle = Math.max(0, Math.sin(f / 47)) > 0.985 ? 1 : 0; // occasional readable jolt
  const eyeScan = (f * 2.2) % 14;                              // eye scan-line (eye box is 14 tall)
  const faceScan = 8 + ((f * 3) % 78);                         // face-screen scan-line sweep

  // MASS-PRODUCTION tally + the stacking / toppling pile at the belt's exit
  const withComma = (n: number) => (n >= 1000 ? Math.floor(n / 1000) + "," + String(n % 1000).padStart(3, "0") : String(n));
  const slopCount = Math.min(9999, 1204 + Math.floor(f * 44));  // REDLINING output rate
  const slopStr = slopCount >= 9999 ? "9,999+" : withComma(slopCount);
  const stackN = Math.min(11, Math.floor(f / 20));             // pages piling up FAST

  // rows of receding rack towers (far wall), each a cool steel cabinet of LEDs
  const RACKS = [
    [40, 150, 0.62], [150, 150, 0.62], [258, 150, 0.62],       // back row (small, dim)
    [706, 150, 0.62], [814, 150, 0.62], [922, 150, 0.62],
  ] as [number, number, number][];
  // a deeper, dimmer back row further into the haze (busier far layer)
  const RACKS_BACK = [
    [12, 118, 0.34], [96, 118, 0.34], [180, 118, 0.34], [264, 118, 0.34],
    [664, 118, 0.34], [748, 118, 0.34], [832, 118, 0.34], [916, 118, 0.34],
  ] as [number, number, number][];

  // amber + RED alarm beacons sweeping on the flanking walls (redline strobes up top)
  const BEACONS: [number, number, string, number][] = [
    [52, 214, AMBER, 5], [906, 214, AMBER, -5],
    [140, 150, RED, 9], [828, 150, RED, -9],
  ];

  // slow cinematic camera: a gentle push + drift across the hall so the 11s never sits still.
  // scale gives overscan so the pan never reveals a panel edge. Impact shake rides on top.
  const camX = Math.max(-20, Math.min(26, 26 - (f / 340) * 46)) + shakeX;
  const camY = -6 + (f / 340) * 16 + shakeY;
  const camS = 1.06 + Math.min(1, f / 340) * 0.05;

  // ---- the SLOP-robot is now ACTIVE: on a 260f PATROL it recites + points up at the
  // autocue, grabs a fresh slop page, scurries it over to the stamp station, feeds the
  // stamper, then scurries back. Everything below rides off f (no randomness). ----
  const CYC = 260;
  const cp = (f % CYC) / CYC;                                   // 0..1 through the patrol
  const eio = Easing.inOut(Easing.cubic);
  const kf = (pts: number[], vals: number[]) => interpolate(cp, pts, vals, { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: eio });
  const roverX = kf([0, 0.30, 0.44, 0.70, 0.88, 1], [0, 0, 300, 300, 0, 0]); // slide toward the stamp station
  const dir = (cp > 0.30 && cp < 0.44) ? 1 : (cp > 0.70 && cp < 0.88) ? -1 : 0; // travel direction
  const moving = dir !== 0;
  const waddle = moving ? Math.sin(f / 3.4) * 4 : 0;           // scurry bounce
  const lean = dir * 6;                                        // lean into the run
  const atStamp = cp >= 0.44 && cp <= 0.70;                    // parked at the stamper, feeding
  const recF = interpolate(cp, [0, 0.28, 0.38, 0.86, 0.96, 1], [1, 1, 0, 0, 1, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }); // eyeline-beam only while reading
  const armBase = kf([0, 0.28, 0.44, 0.70, 0.88, 1], [-140, -140, -20, 46, 0, -140]); // point up -> reach down -> point up
  const armGes = cp < 0.28 ? Math.sin(f / 6) * 14 : atStamp ? Math.sin(f / 4) * 20 : 0; // BIG point jab / feed slam
  const armAngle = armBase + armGes;
  const carry = (cp > 0.28 && cp < 0.66) ? 1 : 0;             // a grey page is in its hand across the carry

  return (
    <AbsoluteFill style={{ fontFamily: inter.fontFamily }}>
      <Bg />
      <ProgressBar />
      <SectionHeader f={f} badge="🤖" l1={<>WHY IT</>} l2={<span style={{ color: CLAY }}>SOUNDS FAKE</span>} />

      <Panel glow={hexA(SKY, 0.3)} pushIn>
      <div style={{ position: "absolute", inset: 0, transform: `translate(${camX}px, ${camY}px) scale(${camS})`, transformOrigin: "50% 46%", willChange: "transform" }}>
        {/* ================= FAR LAYER - cold steel server hall ================= */}
        <div style={{ position: "absolute", left: 0, top: 0, right: 0, height: 480, overflow: "hidden", zIndex: 0 }}>
          <div style={{ position: "absolute", inset: 0, background: grad("#1B2734", "#0A1018") }} />
          {/* receding floor lines converging to a cold vanishing point (perspective) */}
          <svg width={1012} height={480} style={{ position: "absolute", left: 0, bottom: 0 }}>
            {Array.from({ length: 9 }, (_, i) => {
              const x = (i / 8) * 1012;
              return <line key={i} x1={x} y1={480} x2={506} y2={196} stroke={hexA(SKY, 0.12)} strokeWidth={1.5} />;
            })}
            {[300, 360, 410, 448].map((y, i) => (
              <line key={i} x1={0} y1={y} x2={1012} y2={y} stroke={hexA(SKY, 0.08)} strokeWidth={1} />
            ))}
            {/* deep aisle plate seams for extra density */}
            {[240, 268].map((y, i) => (
              <line key={`s${i}`} x1={330} y1={y} x2={682} y2={y} stroke={hexA(SKY, 0.06)} strokeWidth={1} />
            ))}
          </svg>
          {/* cold blue volumetric haze rolling across the hall (drifting) */}
          <div style={{ position: "absolute", left: -60 + Math.sin(f / 60) * 24, top: 60, width: 720, height: 440, background: `radial-gradient(ellipse at 40% 45%, ${hexA(SKY, 0.2)}, transparent 64%)`, mixBlendMode: "screen" }} />
          <div style={{ position: "absolute", right: -60 - Math.sin(f / 54) * 24, top: 40, width: 700, height: 460, background: `radial-gradient(ellipse at 60% 45%, ${hexA("#4E7FB5", 0.18)}, transparent 66%)`, mixBlendMode: "screen" }} />
          {/* far bokeh orbs drifting deep in the haze */}
          {Array.from({ length: 7 }, (_, i) => {
            const bx = rnd(i * 3 + 1) * 1012;
            const by = 70 + rnd(i * 3 + 2) * 300;
            const drift = Math.sin(f / (40 + i * 7) + i) * 18;
            const s = 26 + rnd(i * 3 + 3) * 40;
            const op = 0.05 + rnd(i + 5) * 0.07;
            const c = i % 2 ? "#6FA8DE" : "#8FC0F0";
            return <div key={`bk${i}`} style={{ position: "absolute", left: bx + drift, top: by, width: s, height: s, borderRadius: "50%", background: `radial-gradient(circle, ${hexA(c, op)}, transparent 70%)`, filter: "blur(3px)", mixBlendMode: "screen" }} />;
          })}
          <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 120, background: "linear-gradient(180deg, rgba(0,0,0,0.55), transparent)" }} />
        </div>

        {/* deep back row of racks, far into the cold haze */}
        {RACKS_BACK.map(([rx, rh, dim], i) => (
          <div key={`rb${i}`} style={{ position: "absolute", left: rx, top: 118, width: 70, height: rh, borderRadius: 6, background: grad("#18212B", "#0C1219"), border: "2px solid #212B37", boxShadow: `0 0 16px ${hexA(SKY, 0.08)}`, zIndex: 1, padding: 6, opacity: dim, overflow: "hidden", filter: "blur(0.6px)" }}>
            {Array.from({ length: 5 }, (_, r) => {
              const lit = (0.5 + 0.5 * Math.sin(f / 6 + i * 0.9 + r)) > 0.6;
              return <div key={r} style={{ height: 12, marginBottom: 5, borderRadius: 2, background: "#111922", display: "flex", alignItems: "center", gap: 3, padding: "0 4px" }}>
                <span style={{ width: 4, height: 4, borderRadius: "50%", background: lit ? SKY : "#1A2733", boxShadow: lit ? `0 0 5px ${SKY}` : "none" }} />
                <div style={{ flex: 1, height: 2, borderRadius: 2, background: hexA(SKY, 0.18) }} />
              </div>;
            })}
          </div>
        ))}

        {/* drooping power cables strung across the hall (subtle sway) */}
        <svg width={1012} height={220} style={{ position: "absolute", left: 0, top: 66, zIndex: 3, pointerEvents: "none" }}>
          {[[90, 360], [360, 700], [640, 946], [200, 540]].map(([x1, x2], i) => {
            const droop = 70 + Math.sin(f / 40 + i) * 9;
            return <path key={`cb${i}`} d={`M ${x1} 2 Q ${(x1 + x2) / 2} ${droop} ${x2} 2`} fill="none" stroke={i % 2 ? "#25313E" : "#2E3C4A"} strokeWidth={4} opacity={0.7} />;
          })}
        </svg>

        {/* ceiling pipes running across the hall + steam vents puffing */}
        <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 96, zIndex: 3, pointerEvents: "none" }}>
          {/* two parallel pipes */}
          {[26, 42].map((py, i) => (
            <div key={`pp${i}`} style={{ position: "absolute", left: 0, right: 0, top: py, height: i ? 8 : 11, background: grad("#2A3644", "#161E28"), boxShadow: "0 3px 6px rgba(0,0,0,0.4)", borderTop: `1px solid ${hexA("#7FA6D0", 0.25)}` }} />
          ))}
          {/* pipe joints / valves */}
          {[150, 430, 700, 900].map((jx, i) => (
            <div key={`jt${i}`} style={{ position: "absolute", left: jx, top: 20, width: 20, height: 30, borderRadius: 4, background: grad("#31404F", "#1A232E"), border: "1px solid #3C4A5A" }} />
          ))}
          {/* steam vents: rising, fading puffs (busier + faster) */}
          {[120, 300, 430, 600, 700, 900].map((vx, vi) => (
            <div key={`vt${vi}`}>
              {/* nozzle */}
              <div style={{ position: "absolute", left: vx - 5, top: 50, width: 10, height: 10, background: "#2A3644", borderRadius: 2 }} />
              {[0, 1, 2, 3].map((k) => {
                const period = 46;
                const ph = ((f + vi * 15 + k * 12) % period) / period; // 0..1
                const pyy = 50 - ph * 66;
                const size = 16 + ph * 54;
                const op = (1 - ph) * 0.17;
                return <div key={k} style={{ position: "absolute", left: vx - size / 2 + Math.sin(f / 10 + k) * 7, top: pyy - size / 2, width: size, height: size, borderRadius: "50%", background: `radial-gradient(circle, ${hexA("#CFE6FF", op)}, transparent 70%)`, mixBlendMode: "screen" }} />;
              })}
            </div>
          ))}
        </div>

        {/* rotating amber + RED warning beacons on the flanking walls */}
        {BEACONS.map(([bx, by, col, spd], i) => {
          const glowP = 0.35 + 0.55 * Math.abs(Math.sin(f / 6 + i * 1.7));
          return (
            <div key={`bc${i}`} style={{ position: "absolute", left: bx, top: by, width: 42, height: 54, zIndex: 3 }}>
              {/* sweeping cone of light */}
              <div style={{ position: "absolute", left: 21, top: 26, width: 150, height: 150, transform: `translate(-50%,-50%) rotate(${(f * spd + i * 180) % 360}deg)`, background: `conic-gradient(from 0deg, ${hexA(col, 0.22)} 0deg, transparent 40deg, transparent 320deg, ${hexA(col, 0.22)} 360deg)`, borderRadius: "50%", mixBlendMode: "screen", filter: "blur(2px)" }} />
              {/* dome */}
              <div style={{ position: "absolute", left: 6, top: 14, width: 30, height: 26, borderRadius: "16px 16px 6px 6px", background: `radial-gradient(circle at 40% 35%, ${hexA(col, 0.6 + 0.4 * glowP)}, ${hexA("#8A5A1A", 0.7)})`, border: "2px solid #4A3A1E", boxShadow: `0 0 ${10 + 18 * glowP}px ${hexA(col, glowP)}` }} />
              {/* base */}
              <div style={{ position: "absolute", left: 4, top: 38, width: 34, height: 14, borderRadius: 4, background: grad("#2A3644", "#161E28"), border: "1px solid #3A4656" }} />
            </div>
          );
        })}

        {/* ---- big swinging REDLINE GAUGES on the flank walls (needles racing into the red) ---- */}
        {([[64, 380, 0], [858, 380, 1]] as [number, number, number][]).map(([gx, gy, gi]) => {
          const v = 0.5 + 0.5 * Math.sin(f / (11 + gi * 4) + gi * 2);  // 0..1 needle
          const red = v > 0.72;
          const ang = -120 + v * 240;                                  // -120..120 sweep
          const S = 132;
          return (
            <div key={`gg${gi}`} style={{ position: "absolute", left: gx, top: gy, width: S, height: S, zIndex: 3, pointerEvents: "none" }}>
              <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: grad("#141B26", "#080C13"), border: `3px solid ${red ? hexA(RED, 0.85) : "#2A3644"}`, boxShadow: red ? `0 0 24px ${hexA(RED, 0.6)}` : `0 0 14px ${hexA(SKY, 0.2)}` }} />
              <svg width={S} height={S} viewBox="0 0 132 132" style={{ position: "absolute", inset: 0 }}>
                <path d="M 24 108 A 54 54 0 1 1 108 108" fill="none" stroke={hexA(SKY, 0.25)} strokeWidth={5} />
                <path d="M 78 30 A 54 54 0 0 1 108 108" fill="none" stroke={hexA(RED, 0.85)} strokeWidth={6} />
                {Array.from({ length: 9 }, (_, k) => {
                  const ta = (-120 + (k / 8) * 240) * Math.PI / 180;
                  return <line key={k} x1={66 + Math.sin(ta) * 45} y1={66 - Math.cos(ta) * 45} x2={66 + Math.sin(ta) * 54} y2={66 - Math.cos(ta) * 54} stroke={hexA("#BFD8F4", 0.5)} strokeWidth={2} />;
                })}
                <g transform={`rotate(${ang} 66 66)`}>
                  <polygon points="66,66 62,66 66,22 70,66" fill={red ? "#FFB4A2" : "#F6E4A0"} />
                  <circle cx={66} cy={66} r={7} fill="#F6E4A0" stroke="#C5603C" strokeWidth={2} />
                </g>
              </svg>
              <div style={{ position: "absolute", left: 0, right: 0, bottom: 12, textAlign: "center", fontFamily: MONO, fontSize: 11, fontWeight: 900, letterSpacing: 1, color: red ? RED : hexA("#BFD8F4", 0.7) }}>{red ? "REDLINE" : "LOAD"}</div>
            </div>
          );
        })}

        {/* far receding rack towers on both flanks */}
        {RACKS.map(([rx, rh, dim], i) => (
          <div key={i} style={{ position: "absolute", left: rx, top: 96, width: 92, height: rh, borderRadius: 8, background: grad("#1E2833", "#10161F"), border: "3px solid #2A3644", boxShadow: `0 12px 24px rgba(0,0,0,0.5), 0 0 20px ${hexA(SKY, 0.12)}`, zIndex: 2, padding: 8, opacity: dim, overflow: "hidden" }}>
            {Array.from({ length: 6 }, (_, r) => {
              const lit = (0.5 + 0.5 * Math.sin(f / 5 + i * 1.4 + r)) > 0.5;
              return (
                <div key={r} style={{ height: 16, marginBottom: 5, borderRadius: 3, background: "#161E28", border: "1px solid #26313E", display: "flex", alignItems: "center", gap: 3, padding: "0 5px" }}>
                  <span style={{ width: 5, height: 5, borderRadius: "50%", background: lit ? SKY : "#20303E", boxShadow: lit ? `0 0 6px ${SKY}` : "none" }} />
                  <span style={{ width: 5, height: 5, borderRadius: "50%", background: (r % 3 === 0) ? GREEN : "#1E2A34", boxShadow: (r % 3 === 0) ? `0 0 5px ${GREEN}` : "none" }} />
                  <div style={{ flex: 1, height: 3, borderRadius: 2, background: hexA(SKY, 0.25) }} />
                </div>
              );
            })}
            {/* a scanning LED bead sweeping down the rack edge */}
            <div style={{ position: "absolute", right: 3, top: `${8 + ((f * 2 + i * 30) % 90)}%`, width: 4, height: 10, borderRadius: 2, background: GREEN, boxShadow: `0 0 6px ${GREEN}` }} />
          </div>
        ))}

        {/* ---- wall grid of MONITORS, every one echoing the identical sentence ---- */}
        <div style={{ position: "absolute", left: 356, top: 40, width: 300, height: 150, zIndex: 3, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridTemplateRows: "repeat(2, 1fr)", gap: 8 }}>
          {Array.from({ length: 6 }, (_, i) => (
            <div key={i} style={{ borderRadius: 5, background: grad("#0E1A28", "#081019"), border: "2px solid #24313F", boxShadow: `inset 0 0 14px rgba(0,0,0,0.6), 0 0 12px ${hexA(SKY, 0.18)}`, overflow: "hidden", position: "relative" }}>
              {/* the same line, identical on every screen */}
              <div style={{ position: "absolute", left: 6, right: 6, top: 8, display: "flex", flexWrap: "wrap", gap: "3px 4px" }}>
                {echo.map((w, k) => (
                  <span key={k} style={{ fontFamily: MONO, fontSize: 9, color: hexA("#BFD8F4", 0.9), textShadow: `0 0 6px ${hexA(SKY, 0.5)}` }}>{w}</span>
                ))}
              </div>
              {[0, 1].map((r) => <div key={r} style={{ position: "absolute", left: 6, right: 8, top: 26 + r * 7, height: 2.5, borderRadius: 2, background: hexA(SKY, 0.3), width: r === 1 ? "50%" : undefined }} />)}
              {/* a tiny blinking cursor, identical timing on every screen */}
              <div style={{ position: "absolute", left: 6, top: 40, width: 4, height: 6, background: hexA("#BFD8F4", (f % 20) < 11 ? 0.8 : 0.1) }} />
              {/* scanline sweep */}
              <div style={{ position: "absolute", left: 0, right: 0, top: `${(f * 3 + i * 14) % 100}%`, height: 6, background: "linear-gradient(180deg, transparent, rgba(120,170,230,0.14), transparent)" }} />
            </div>
          ))}
        </div>

        {/* ---- cold ceiling light bars washing the racks ---- */}
        {[120, 420, 720].map((lx, i) => (
          <div key={i} style={{ position: "absolute", left: lx, top: 10, width: 180, height: 12, borderRadius: 6, background: `linear-gradient(90deg, transparent, ${hexA("#CFE6FF", 0.5 + 0.15 * Math.sin(f / 10 + i))}, transparent)`, boxShadow: `0 0 30px ${hexA(SKY, 0.4)}`, zIndex: 3 }} />
        ))}

        {/* ================= MID LAYER - the TELEPROMPTER (hero prop) ================= */}
        {/* eyeline beam: robot reads AHEAD, cone rising to the glowing ending */}
        <svg width={1012} height={792} style={{ position: "absolute", left: 0, top: 0, zIndex: 5, pointerEvents: "none" }}>
          <defs>
            <linearGradient id="s2beam" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0" stopColor={hexA(SKY, 0)} />
              <stop offset="1" stopColor={hexA(SKY, beam * recF)} />
            </linearGradient>
          </defs>
          <polygon points="470,486 560,486 690,318 360,318" fill="url(#s2beam)" />
        </svg>

        {/* teleprompter frame */}
        <div style={{ position: "absolute", left: 236, top: 108, width: 560, height: 232, zIndex: 6, transform: "perspective(900px) rotateX(6deg)", transformOrigin: "50% 100%" }}>
          <div style={{ position: "absolute", inset: 0, borderRadius: 16, background: grad("#0B131F", "#060B13"), border: "7px solid #26313E", boxShadow: `0 20px 40px rgba(0,0,0,0.55), 0 0 46px ${hexA(SKY, 0.26)}, inset 0 0 30px rgba(0,0,0,0.6)`, overflow: "hidden" }}>
            {/* prompter scanlines */}
            <div style={{ position: "absolute", inset: 0, backgroundImage: `repeating-linear-gradient(180deg, ${hexA(SKY, 0.05)} 0 2px, transparent 2px 5px)` }} />
            {/* autocue creep: the whole page of faint pre-written text scrolling up behind the live line */}
            <div style={{ position: "absolute", left: 26, right: 26, top: 0, bottom: 0, overflow: "hidden", opacity: 0.14 }}>
              <div style={{ position: "absolute", left: 0, right: 0, top: 120 - ((f * 0.6) % 120) }}>
                {Array.from({ length: 8 }, (_, r) => (
                  <div key={r} style={{ height: 5, borderRadius: 3, marginBottom: 12, width: r % 3 === 2 ? "58%" : "100%", background: hexA("#BFD4F0", 0.7) }} />
                ))}
              </div>
            </div>
            {/* screen inner glow */}
            <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 50% 40%, ${hexA(SKY, 0.14)}, transparent 72%)` }} />
            {/* status dot only, no banner text */}
            <div style={{ position: "absolute", left: 18, top: 14, display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ width: 9, height: 9, borderRadius: "50%", background: GREEN, boxShadow: `0 0 8px ${GREEN}` }} />
              <span style={{ width: 30, height: 4, borderRadius: 2, background: hexA("#BFD8F4", 0.4) }} />
            </div>
            {/* the pre-printed sentence, glowing AHEAD of the read head */}
            <div style={{ position: "absolute", left: 26, right: 26, top: 56, display: "flex", flexWrap: "wrap", gap: "10px 14px", opacity: 0.35 + 0.65 * sentIn, transform: `translateY(${(1 - sentIn) * 8}px)` }}>
              {words.map((w, i) => {
                const isPast = i < readHead;
                const isNow = i === readHead;
                const isEnd = i === lastIdx;
                const col = isEnd ? GOLD : isNow ? "#EAF4FF" : isPast ? hexA("#7E8CA2", 0.55) : hexA("#BFD4F0", 0.95);
                const glow = isEnd
                  ? `0 0 ${18 * endPulse}px ${hexA(GOLD, 0.9)}, 0 0 ${40 * endPulse}px ${hexA(GOLD, 0.5)}`
                  : isNow ? `0 0 12px ${hexA(SKY, 0.7)}`
                  : isPast ? "none" : `0 0 8px ${hexA(SKY, 0.35)}`;
                return (
                  <span key={i} style={{
                    position: "relative",
                    fontFamily: fraunces.fontFamily, fontWeight: isEnd ? 900 : 700,
                    fontSize: isEnd ? 44 : 38, lineHeight: 1.15,
                    color: col, textShadow: glow,
                    transform: isEnd ? `scale(${1 + 0.05 * endPulse})` : "none",
                    display: "inline-block",
                  }}>
                    {/* the read-head cursor box on the current word */}
                    {isNow && <span style={{ position: "absolute", left: -6, top: -4, right: -6, bottom: -2, border: `2px solid ${hexA(SKY, 0.85)}`, borderRadius: 6, background: hexA(SKY, 0.12) }} />}
                    {w}
                  </span>
                );
              })}
            </div>
            {/* the ending is already known: a gold ring pulsing on the last word, no words */}
            <div style={{ position: "absolute", right: 22, bottom: 16, width: 14, height: 14, borderRadius: "50%", background: GOLD, boxShadow: `0 0 ${8 + 14 * endPulse}px ${hexA(GOLD, endPulse)}` }} />
          </div>
          {/* prompter tripod neck */}
          <div style={{ position: "absolute", left: 268, top: 228, width: 22, height: 40, background: grad("#26303C", "#151B22"), zIndex: -1 }} />
        </div>

        {/* teleprompter mount to the floor */}
        <div style={{ position: "absolute", left: 480, top: 364, width: 74, height: 14, borderRadius: 7, background: grad("#2C3542", "#191F27"), zIndex: 5 }} />

        {/* ================= steel floor / server aisle ================= */}
        <div style={{ position: "absolute", left: 0, right: 0, top: 480, height: 130, background: grad("#28313C", "#161C24"), zIndex: 4 }} />
        <div style={{ position: "absolute", left: 0, right: 0, top: 480, height: 7, background: hexA("#BFD8F4", 0.22), zIndex: 4 }} />
        {/* cold grid floor: perspective tiles + mirror-streak reflections of the lights above */}
        <svg width={1012} height={130} style={{ position: "absolute", left: 0, top: 480, zIndex: 4, pointerEvents: "none" }}>
          {Array.from({ length: 11 }, (_, i) => {
            const x0 = (i / 10) * 1012;
            const x1 = 506 + (x0 - 506) * 2.1;
            return <line key={i} x1={x0} y1={0} x2={x1} y2={130} stroke={hexA(SKY, 0.09)} strokeWidth={1} />;
          })}
          {[26, 58, 96].map((y, i) => <line key={`h${i}`} x1={0} y1={y} x2={1012} y2={y} stroke={hexA(SKY, 0.06)} strokeWidth={1} />)}
        </svg>
        {/* cold reflection streaks under the ceiling light bars + monitors */}
        {[210, 510, 810, 420, 620].map((rx, i) => (
          <div key={`rf${i}`} style={{ position: "absolute", left: rx - 26, top: 486, width: 52, height: 96, background: `linear-gradient(180deg, ${hexA(SKY, 0.14 + 0.06 * Math.abs(Math.sin(f / 12 + i)))}, transparent 78%)`, filter: "blur(4px)", mixBlendMode: "screen", zIndex: 4 }} />
        ))}
        {/* cold floor sheen under the prompter */}
        <div style={{ position: "absolute", left: 300, top: 500, width: 420, height: 70, borderRadius: "50%", background: `radial-gradient(ellipse, ${hexA(SKY, 0.22)}, transparent 70%)`, zIndex: 4 }} />

        {/* ================= the cold grey AI-SLOP robot, reciting up at the prompter ================= */}
        <div style={{ position: "absolute", left: 372, top: 356, zIndex: 8, filter: "saturate(0.4) brightness(0.92)", transform: `translate(${roverX}px, ${bobY + waddle - startle * 10}px) rotate(${smug + lean}deg)`, transformOrigin: "50% 100%" }}>
          {/* cold cyan rim halo */}
          <div style={{ position: "absolute", left: -46, top: -30, width: 260, height: 260, background: `radial-gradient(ellipse at 55% 40%, ${hexA(SKY, 0.24)}, transparent 64%)`, mixBlendMode: "screen", pointerEvents: "none" }} />
          {/* boxy grey body */}
          <div style={{ position: "absolute", left: 30, top: 118, width: 108, height: 78, borderRadius: 12, background: grad("#3E434C", "#252931"), border: "3px solid #4E535D", boxShadow: "0 14px 24px rgba(0,0,0,0.5)" }}>
            {/* chest status readout: perfectly steady, predictable */}
            <div style={{ position: "absolute", left: 12, top: 14, width: 40, height: 40, borderRadius: 6, background: "#121820", border: "1px solid #2E3744" }}>
              {[0, 1, 2].map((r) => <div key={r} style={{ position: "absolute", left: 6, top: 8 + r * 10, height: 4, width: 28, borderRadius: 2, background: hexA(SKY, 0.5) }} />)}
            </div>
            <div style={{ position: "absolute", right: 12, top: 20, width: 26, height: 8, borderRadius: 3, background: hexA(SKY, 0.3) }} />
            <div style={{ position: "absolute", right: 12, top: 36, width: 20, height: 8, borderRadius: 3, background: hexA(GREEN, 0.45) }} />
          </div>
          {/* neck */}
          <div style={{ position: "absolute", left: 74, top: 100, width: 18, height: 24, background: "#343841" }} />
          {/* teleprompter HEAD tilted up, smug — with a BIG readable side-to-side turn */}
          <div style={{ position: "absolute", left: 30, top: 8, width: 108, height: 96, borderRadius: 14, background: grad("#464B54", "#2A2E37"), border: "3px solid #545963", boxShadow: `0 12px 22px rgba(0,0,0,0.5), inset 0 0 16px rgba(0,0,0,0.5)`, overflow: "hidden", transformOrigin: "50% 100%", transform: `rotate(${Math.sin(f / 8) * 5}deg)` }}>
            {/* face screen */}
            <div style={{ position: "absolute", inset: 8, borderRadius: 8, background: "#0F141E" }} />
            {/* face-screen scan-line sweeping down (alive/processing) */}
            <div style={{ position: "absolute", left: 10, right: 10, top: faceScan, height: 4, background: `linear-gradient(180deg, transparent, ${hexA(SKY, 0.4)}, transparent)`, pointerEvents: "none" }} />
            {/* eyes reflecting the whole glowing line, gold pip = the known ending, scan-line sweeping */}
            <div style={{ position: "absolute", left: 20, top: 30, width: 28, height: 14, borderRadius: 4, background: hexA(SKY, 0.85), boxShadow: `0 0 12px ${hexA(SKY, 0.8)}`, overflow: "hidden" }}>
              <div style={{ position: "absolute", left: 0, right: 0, top: eyeScan, height: 3, background: hexA("#EAF6FF", 0.95), boxShadow: `0 0 6px ${SKY}` }} />
              <div style={{ position: "absolute", right: 4, top: 3, width: 8, height: 8, borderRadius: "50%", background: hexA(GOLD, endPulse) }} />
            </div>
            <div style={{ position: "absolute", right: 20, top: 30, width: 28, height: 14, borderRadius: 4, background: hexA(SKY, 0.85), boxShadow: `0 0 12px ${hexA(SKY, 0.8)}`, overflow: "hidden" }}>
              <div style={{ position: "absolute", left: 0, right: 0, top: eyeScan, height: 3, background: hexA("#EAF6FF", 0.95), boxShadow: `0 0 6px ${SKY}` }} />
              <div style={{ position: "absolute", right: 4, top: 3, width: 8, height: 8, borderRadius: "50%", background: hexA(GOLD, endPulse) }} />
            </div>
            {/* reciting mouth (jaw moving in sync with the read) */}
            <div style={{ position: "absolute", left: "50%", top: 60, transform: "translateX(-50%)", width: 40, height: mouth + startle * 8, borderRadius: 4, background: "#080C12", border: `2px solid ${hexA(SKY, 0.5)}` }}>
              {Array.from({ length: 4 }, (_, i) => <div key={i} style={{ position: "absolute", left: 4 + i * 8, top: 1, bottom: 1, width: 2, background: hexA(SKY, 0.4) }} />)}
            </div>
          </div>
          {/* tidy antenna reading the future */}
          <div style={{ position: "absolute", left: 80, top: -18, width: 4, height: 26, background: "#4E535D" }} />
          <div style={{ position: "absolute", left: 74, top: -30, width: 16, height: 16, borderRadius: "50%", background: hexA(SKY, 0.85), boxShadow: `0 0 12px ${hexA(SKY, 0.8)}` }} />
          {/* shoulder joint on the body */}
          <div style={{ position: "absolute", left: 118, top: 122, width: 20, height: 20, borderRadius: "50%", background: "#3A3F48", border: "2px solid #565B65", zIndex: 8 }} />
          {/* the gesturing / feeding ARM: points UP at the autocue, then reaches DOWN to feed the stamper */}
          <div style={{ position: "absolute", left: 120, top: 124, width: 18, height: 78, zIndex: 9, transformOrigin: "9px 9px", transform: `rotate(${armAngle}deg)` }}>
            <div style={{ position: "absolute", left: 3, top: 6, width: 12, height: 44, borderRadius: 6, background: grad("#4A4F58", "#2C3038"), border: "2px solid #565B65" }} />
            <div style={{ position: "absolute", left: 1, top: 44, width: 16, height: 16, borderRadius: "50%", background: "#33373F", border: "2px solid #565B65" }} />
            <div style={{ position: "absolute", left: 2, top: 56, width: 14, height: 20, borderRadius: 4, background: grad("#565B65", "#33373F"), border: "2px solid #61707F" }} />
            {/* glowing pointer pip at the fingertip while pointing at the autocue */}
            {carry === 0 && <div style={{ position: "absolute", left: 5, top: 74, width: 8, height: 8, borderRadius: "50%", background: hexA(SKY, 0.85), boxShadow: `0 0 8px ${hexA(SKY, 0.8)}` }} />}
            {/* the grey SLOP page it carries from the autocue to the stamper (kept roughly upright) */}
            {carry > 0 && (
              <div style={{ position: "absolute", left: -8, top: 60, width: 30, height: 36, borderRadius: 3, background: grad("#3A3F49", "#262B33"), border: "1px solid #474D58", transform: `rotate(${-armAngle + 8}deg)`, boxShadow: "0 3px 8px rgba(0,0,0,0.35)" }}>
                {[0, 1, 2].map((r) => <div key={r} style={{ position: "absolute", left: 4, right: 6, top: 6 + r * 8, height: 2.5, borderRadius: 2, background: hexA("#8E8A80", 0.85) }} />)}
              </div>
            )}
          </div>
        </div>

        {/* ================= an overhead CLAW on a rail shuttling pages over the left racks ================= */}
        {(() => {
          const rc = (f % 132) / 132;                                 // grab..carry..drop..return
          const clawX = 56 + (0.5 - 0.5 * Math.cos(rc * Math.PI * 2)) * 150; // 56..206, stays left of the prompter
          const dropY = 40 + Math.max(0, Math.sin(rc * Math.PI * 2)) * 150;  // dips down on the outbound half
          const hasPage = rc > 0.14 && rc < 0.6;
          const pinch = hasPage ? 0 : 14;                             // pincers clamp shut on the page
          return (
            <>
              {/* the rail beam */}
              <div style={{ position: "absolute", left: 40, top: 84, width: 190, height: 10, borderRadius: 4, background: grad("#39485A", "#1F2A36"), border: "1px solid #46586C", zIndex: 7 }} />
              {/* trolley + telescoping arm + claw */}
              <div style={{ position: "absolute", left: clawX, top: 82, zIndex: 8, pointerEvents: "none" }}>
                <div style={{ position: "absolute", left: -14, top: -6, width: 28, height: 16, borderRadius: 4, background: grad("#4A5A6C", "#26313E"), border: "1px solid #55697D" }} />
                <div style={{ position: "absolute", left: -2, top: 8, width: 4, height: dropY, background: grad("#7E8FA1", "#3C4A5A") }} />
                <div style={{ position: "absolute", left: -13, top: 8 + dropY, width: 26, height: 12, borderRadius: 3, background: grad("#525F6E", "#2A3542"), border: "1px solid #61707F" }}>
                  <div style={{ position: "absolute", left: 2, top: 10, width: 5, height: 13, background: "#3A4653", transformOrigin: "2px 0", transform: `rotate(${-8 - pinch}deg)` }} />
                  <div style={{ position: "absolute", right: 2, top: 10, width: 5, height: 13, background: "#3A4653", transformOrigin: "3px 0", transform: `rotate(${8 + pinch}deg)` }} />
                </div>
                {hasPage && (
                  <div style={{ position: "absolute", left: -12, top: 22 + dropY, width: 24, height: 30, borderRadius: 3, background: grad("#3A3F49", "#262B33"), border: "1px solid #474D58", boxShadow: "0 3px 8px rgba(0,0,0,0.35)" }}>
                    {[0, 1, 2].map((r) => <div key={r} style={{ position: "absolute", left: 4, right: 5, top: 5 + r * 7, height: 2, background: hexA("#8E8A80", 0.8) }} />)}
                  </div>
                )}
              </div>
            </>
          );
        })()}

        {/* ================= a SECOND small worker-bot scurrying by the exit pile, tidying + waving ================= */}
        {(() => {
          const wx = 92 + Math.sin(f / 24) * 34;                      // scurry along the exit end
          const wy = 452 + Math.abs(Math.sin(f / 5)) * 4;            // little step bounce
          const wLean = Math.sin(f / 24) * 6;                        // lean into the scurry
          const wa1 = -30 + Math.sin(f / 4) * 46;                    // left arm waving at the toppling pile
          const wa2 = 30 + Math.sin(f / 4 + Math.PI) * 40;           // right arm waving
          return (
            <div style={{ position: "absolute", left: wx, top: wy, zIndex: 11, filter: "saturate(0.4) brightness(0.9)", transform: `rotate(${wLean}deg)`, transformOrigin: "50% 100%", pointerEvents: "none" }}>
              {/* cyan rim */}
              <div style={{ position: "absolute", left: -18, top: -14, width: 108, height: 120, background: `radial-gradient(ellipse at 50% 40%, ${hexA(SKY, 0.18)}, transparent 66%)`, mixBlendMode: "screen" }} />
              {/* legs stepping */}
              <div style={{ position: "absolute", left: 16, top: 74 - (Math.sin(f / 5) > 0 ? 4 : 0), width: 10, height: 20, borderRadius: 3, background: "#2C3038" }} />
              <div style={{ position: "absolute", left: 32, top: 74 - (Math.sin(f / 5) < 0 ? 4 : 0), width: 10, height: 20, borderRadius: 3, background: "#2C3038" }} />
              {/* body */}
              <div style={{ position: "absolute", left: 8, top: 40, width: 42, height: 40, borderRadius: 8, background: grad("#3E434C", "#252931"), border: "2px solid #4E535D", boxShadow: "0 8px 14px rgba(0,0,0,0.45)" }}>
                <div style={{ position: "absolute", left: 8, top: 10, width: 20, height: 4, borderRadius: 2, background: hexA(SKY, 0.5) }} />
                <div style={{ position: "absolute", left: 8, top: 20, width: 14, height: 4, borderRadius: 2, background: hexA(GREEN, 0.5) }} />
              </div>
              {/* head + single scanning eye */}
              <div style={{ position: "absolute", left: 13, top: 6, width: 32, height: 34, borderRadius: 8, background: grad("#464B54", "#2A2E37"), border: "2px solid #545963", overflow: "hidden" }}>
                <div style={{ position: "absolute", left: 6, top: 12, width: 20, height: 9, borderRadius: 3, background: hexA(SKY, 0.85), boxShadow: `0 0 8px ${hexA(SKY, 0.8)}`, overflow: "hidden" }}>
                  <div style={{ position: "absolute", left: (f * 1.5) % 16, top: 1, width: 3, bottom: 1, background: hexA("#EAF6FF", 0.95) }} />
                </div>
              </div>
              {/* antenna */}
              <div style={{ position: "absolute", left: 28, top: -8, width: 3, height: 14, background: "#4E535D" }} />
              <div style={{ position: "absolute", left: 25, top: -16, width: 9, height: 9, borderRadius: "50%", background: hexA(SKY, 0.85), boxShadow: `0 0 8px ${hexA(SKY, 0.8)}` }} />
              {/* waving arms */}
              <div style={{ position: "absolute", left: 4, top: 44, width: 8, height: 26, borderRadius: 4, background: grad("#4A4F58", "#2C3038"), transformOrigin: "4px 4px", transform: `rotate(${wa1}deg)` }} />
              <div style={{ position: "absolute", left: 46, top: 44, width: 8, height: 26, borderRadius: 4, background: grad("#4A4F58", "#2C3038"), transformOrigin: "4px 4px", transform: `rotate(${wa2}deg)` }} />
            </div>
          );
        })()}

        {/* ================= MID/NEAR - CONVEYOR of identical grey slop text blocks ================= */}
        {/* the belt bed, running left across the aisle in front of the robot */}
        <div style={{ position: "absolute", left: -10, top: 566, width: 1032, height: 60, background: grad("#20272F", "#10151B"), borderTop: "3px solid #323C48", borderBottom: "3px solid #0C1016", zIndex: 9, overflow: "hidden" }}>
          {/* belt tread marks scrolling */}
          {Array.from({ length: 32 }, (_, i) => (
            <div key={i} style={{ position: "absolute", left: (i * 36 - belt * 0.9) % 1080, top: 0, bottom: 0, width: 18, background: hexA("#0A0E13", 0.5), transform: "skewX(-18deg)" }} />
          ))}
          {/* belt roller cogs spinning at each end (faster now) */}
          {[6, 992].map((cx, ci) => (
            <div key={`cg${ci}`} style={{ position: "absolute", left: cx, top: 14, width: 30, height: 30, borderRadius: "50%", border: "3px dashed #3A4653", transform: `rotate(${(f * 12 * (ci ? -1 : 1)) % 360}deg)` }} />
          ))}
        </div>
        {/* a PACKED river of identical grey text blocks riding the belt (mass produced sentences) */}
        {Array.from({ length: 15 }, (_, i) => {
          const x = ((i * 78 - belt * 1.2) % 1240) - 100;
          const wob = Math.sin(f / 9 + i) * 1.5;
          return <SlopBrick key={i} x={x} y={512 + wob} w={120} lines={4} c="#8E8A80" rot={-1} o={0.96} />;
        })}
        {/* belt front rail highlight + hazard stripe apron */}
        <div style={{ position: "absolute", left: 0, right: 0, top: 566, height: 4, background: hexA("#7FA6D0", 0.3), zIndex: 10 }} />
        <div style={{ position: "absolute", left: 0, right: 0, top: 620, height: 8, background: "repeating-linear-gradient(45deg, #C9A23A 0 12px, #1C232C 12px 24px)", opacity: 0.55, zIndex: 10 }} />
        {/* a row of spinning drive rollers under the belt front (constant motion) */}
        {Array.from({ length: 10 }, (_, i) => (
          <div key={`rl${i}`} style={{ position: "absolute", left: 30 + i * 102, top: 604, width: 26, height: 26, borderRadius: "50%", border: "3px dashed #3A4653", transform: `rotate(${(f * 11 * (i % 2 ? -1 : 1)) % 360}deg)`, zIndex: 10, pointerEvents: "none" }} />
        ))}

        {/* ---- extra pumping pistons flanking the main stamp gantry ---- */}
        {[STX - 98, STX + 98].map((gx, gi) => {
          const pump = (0.5 + 0.5 * Math.sin(f / 5 + gi * Math.PI)) * 26;
          return (
            <div key={`ps${gi}`} style={{ position: "absolute", left: gx - 9, top: 300, width: 18, height: 130, zIndex: 10, pointerEvents: "none" }}>
              <div style={{ position: "absolute", left: 0, top: 0, width: 18, height: 40, borderRadius: 4, background: grad("#3A485A", "#1E2833"), border: "1px solid #4A5A6C" }} />
              <div style={{ position: "absolute", left: 4, top: 34 + pump, width: 10, height: Math.max(6, 74 - pump), background: grad("#7E8FA1", "#3C4A5A"), boxShadow: "inset -2px 0 3px rgba(0,0,0,0.4)" }} />
              <div style={{ position: "absolute", left: -2, top: 104 + pump, width: 22, height: 12, borderRadius: 3, background: grad("#525F6E", "#2A3542"), border: "1px solid #61707F" }} />
            </div>
          );
        })}
        {/* ---- spinning drive gears at the main stamp station ---- */}
        {[[STX - 132, 520], [STX + 128, 512]].map(([gx, gy], gi) => (
          <div key={`gr${gi}`} style={{ position: "absolute", left: gx, top: gy, width: 46, height: 46, zIndex: 10, transform: `rotate(${(f * 6 * (gi ? -1 : 1)) % 360}deg)`, pointerEvents: "none" }}>
            <svg width={46} height={46} viewBox="-23 -23 46 46">
              {Array.from({ length: 10 }, (_, i) => <rect key={i} x={-3} y={-23} width={6} height={9} fill="#3A4653" transform={`rotate(${i * 36})`} />)}
              <circle r={15} fill="none" stroke="#3A4653" strokeWidth={5} />
              <circle r={4} fill="#2A3644" />
            </svg>
          </div>
        ))}

        {/* ---- THREE robotic STAMP presses punching grey blocks on the belt in offset rhythm ---- */}
        {stampState.map((s, si) => {
          const gantryTop = s.restY - 56;
          return (
            <div key={`stamp${si}`} style={{ position: "absolute", left: s.x - 60, top: 0, width: 120, height: 620, zIndex: 11, pointerEvents: "none" }}>
              {/* ceiling gantry mount (kicks UP on the hit) */}
              <div style={{ position: "absolute", left: 10, top: gantryTop, width: 100, height: 16, borderRadius: 4, background: grad("#39485A", "#1F2A36"), border: "1px solid #46586C", boxShadow: "0 4px 10px rgba(0,0,0,0.4)", transform: `translateY(${-s.recoil}px)` }} />
              {/* hazard stripe on the mount */}
              <div style={{ position: "absolute", left: 12, top: gantryTop + 3, width: 96, height: 6, background: "repeating-linear-gradient(45deg, #C9A23A 0 6px, #1C232C 6px 12px)", opacity: 0.85, transform: `translateY(${-s.recoil}px)` }} />
              {/* upper hinge */}
              <div style={{ position: "absolute", left: 52, top: gantryTop + 12, width: 16, height: 16, borderRadius: "50%", background: "#2A3644", border: "2px solid #4A5A6C", transform: `translateY(${-s.recoil}px)` }} />
              {/* hydraulic cylinder (compresses on punch) */}
              <div style={{ position: "absolute", left: 48, top: gantryTop + 26, width: 24, height: 40 - s.punch * 10, borderRadius: 5, background: grad("#4A5A6C", "#26313E"), border: "2px solid #55697D" }} />
              {/* piston shaft */}
              <div style={{ position: "absolute", left: 55, top: s.restY, width: 10, height: Math.max(2, s.headY - s.restY), background: grad("#7E8FA1", "#3C4A5A"), boxShadow: `inset -2px 0 3px rgba(0,0,0,0.4)` }} />
              {/* the stamp head */}
              <div style={{ position: "absolute", left: 36, top: s.headY, width: 48, height: 34, borderRadius: 6, background: grad("#525F6E", "#2A3542"), border: "2px solid #61707F", boxShadow: `0 6px 12px rgba(0,0,0,0.5), 0 0 ${6 + s.punch * 22}px ${hexA(SKY, 0.35 * s.punch)}` }}>
                {/* the die face (SLOP mold) */}
                <div style={{ position: "absolute", left: 6, right: 6, bottom: 3, height: 8, borderRadius: 2, background: hexA(RED, 0.7 + 0.3 * s.punch), boxShadow: `0 0 ${4 + s.punch * 14}px ${hexA(RED, s.punch)}` }} />
                {/* warning stripes on the head */}
                <div style={{ position: "absolute", left: 6, top: 5, right: 6, height: 6, background: "repeating-linear-gradient(45deg, #C9A23A 0 5px, #1C232C 5px 10px)", borderRadius: 2, opacity: 0.8 }} />
              </div>
            </div>
          );
        })}
        {/* impact flash + sparks where EACH stamp hits the belt */}
        {stampState.map((s, si) => (s.sparkAge >= 0 && s.sparkAge < 11) ? (
          <React.Fragment key={`spk${si}`}>
            {/* bright core flash */}
            <div style={{ position: "absolute", left: s.x - 56, top: 546, width: 112, height: 44, borderRadius: "50%", background: `radial-gradient(ellipse, ${hexA("#FFF4D6", Math.max(0, 0.7 - s.sparkAge * 0.08))}, transparent 70%)`, mixBlendMode: "screen", zIndex: 11 }} />
            {/* impact shock ring */}
            <div style={{ position: "absolute", left: s.x - s.sparkAge * 9, top: 566 - s.sparkAge * 4, width: s.sparkAge * 18, height: s.sparkAge * 8, borderRadius: "50%", border: `2px solid ${hexA(GOLD, Math.max(0, 0.6 - s.sparkAge * 0.06))}`, mixBlendMode: "screen", zIndex: 11 }} />
            {Array.from({ length: 16 }, (_, i) => {
              const a = -Math.PI + (i / 15) * Math.PI;                 // fan upward/outward
              const dist = s.sparkAge * (6 + (i % 4) * 2.6);
              const g = s.sparkAge * s.sparkAge * 0.18;                // gravity
              const px = s.x + Math.cos(a) * dist;
              const py = 566 + Math.sin(a) * dist * 0.7 + g;
              const op = Math.max(0, 1 - s.sparkAge / 10);
              const c = i % 3 === 0 ? "#FFF1C4" : GOLD;
              return <div key={i} style={{ position: "absolute", left: px, top: py, width: 3, height: 9, borderRadius: 2, background: c, boxShadow: `0 0 6px ${c}`, opacity: op, transform: `rotate(${a}rad)`, zIndex: 12 }} />;
            })}
          </React.Fragment>
        ) : null)}

        {/* ---- the mass-produced pages PILING + TOPPLING at the belt's exit (left end) ---- */}
        {Array.from({ length: stackN }, (_, k) => {
          const plean = Math.sin(f / 30 + k * 0.5) * (k * 0.9);       // higher pages lean more
          const px = 14 + Math.sin(f / 40 + k) * 2;
          const py = 556 - k * 15;
          return (
            <div key={`stk${k}`} style={{ position: "absolute", left: px, top: py, width: 74, height: 18, borderRadius: 3, background: grad("#3A3F49", "#262B33"), border: "1px solid #474D58", transform: `rotate(${-2 + plean}deg)`, transformOrigin: "0% 100%", zIndex: 10, boxShadow: "0 3px 8px rgba(0,0,0,0.35)" }}>
              <div style={{ position: "absolute", left: 6, right: 20, top: 6, height: 3, borderRadius: 2, background: hexA("#8E8A80", 0.8) }} />
              <div style={{ position: "absolute", left: 6, right: 34, top: 11, height: 3, borderRadius: 2, background: hexA("#8E8A80", 0.6) }} />
            </div>
          );
        })}
        {/* pages that keep toppling off the top of the overloaded pile */}
        {[0, 1].map((tk) => {
          if (stackN < 4) return null;
          const tp = ((f + tk * 48) % 96) / 96;                       // 0..1, offset second page
          const tx = 20 - tp * 76;
          const ty = 556 - stackN * 15 - Math.sin(tp * Math.PI) * 42 + tp * tp * 34;
          const trot = -tp * 96;
          const op = Math.max(0, 1 - tp / 0.9);
          return <div key={`top${tk}`} style={{ position: "absolute", left: tx, top: ty, width: 74, height: 18, borderRadius: 3, background: grad("#3A3F49", "#262B33"), border: "1px solid #474D58", transform: `rotate(${trot}deg)`, opacity: op, zIndex: 10, boxShadow: "0 3px 8px rgba(0,0,0,0.35)" }} />;
        })}

        {/* ---- identical grey SLOP pages falling through the cold haze ---- */}
        {Array.from({ length: 9 }, (_, i) => {
          const period = 130 + (i % 3) * 22;
          const ph = ((f + i * 33) % period) / period;                // 0..1
          const py = -50 + ph * 700;
          const px = 80 + i * 104 + Math.sin(f / 22 + i) * 16;
          const rot = Math.sin(f / 15 + i * 1.3) * 10;
          const op = 0.5 * (1 - Math.max(0, (ph - 0.82) / 0.18));      // fade near the belt
          return (
            <div key={`pg${i}`} style={{ position: "absolute", left: px, top: py, width: 46, height: 58, borderRadius: 4, background: grad("#3A3F49", "#262B33"), border: "1px solid #474D58", transform: `rotate(${rot}deg)`, opacity: op, boxShadow: "0 4px 10px rgba(0,0,0,0.35)", zIndex: 10 }}>
              {[0, 1, 2, 3].map((r) => <div key={r} style={{ position: "absolute", left: 6, right: 6, top: 9 + r * 11, height: 3, borderRadius: 2, background: hexA("#8E8A80", 0.8), width: r === 3 ? "60%" : undefined }} />)}
            </div>
          );
        })}

        {/* ================= FOREGROUND - out-of-focus pillars framing the edges ================= */}
        <div style={{ position: "absolute", left: -30, top: 60, width: 96, height: 620, borderRadius: 10, background: grad("#232C36", "#0E141B"), borderRight: `3px solid ${hexA("#7FA6D0", 0.2)}`, filter: "blur(6px)", opacity: 0.9, zIndex: 12 }} />
        <div style={{ position: "absolute", right: -30, top: 40, width: 104, height: 640, borderRadius: 10, background: grad("#232C36", "#0E141B"), borderLeft: `3px solid ${hexA("#7FA6D0", 0.2)}`, filter: "blur(6px)", opacity: 0.9, zIndex: 12 }} />

        {/* ================= FOREGROUND - steel console lip + vignette ================= */}
        <div style={{ position: "absolute", left: 0, right: 0, top: 632, height: 160, background: grad("#1E252E", "#0C1017"), zIndex: 12, boxShadow: "0 -14px 30px rgba(0,0,0,0.45)" }}>
          <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 6, background: hexA("#7FA6D0", 0.3) }} />
          <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 40, background: `linear-gradient(180deg, ${hexA(SKY, 0.22 * (0.5 + led))}, transparent)`, mixBlendMode: "screen" }} />
          {/* a strip of cold server LEDs on the console lip */}
          <div style={{ position: "absolute", left: 60, top: 60, right: 60, display: "flex", justifyContent: "space-between" }}>
            {Array.from({ length: 26 }, (_, i) => {
              const on = (0.5 + 0.5 * Math.sin(f / 5 + i * 0.7)) > 0.55;
              const c = i % 7 === 0 ? GREEN : SKY;
              return <span key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: on ? c : "#1A2530", boxShadow: on ? `0 0 7px ${c}` : "none" }} />;
            })}
          </div>
          {/* small etched gauges on the console face (needles swinging) */}
          <div style={{ position: "absolute", left: 60, top: 96, right: 60, display: "flex", gap: 22 }}>
            {Array.from({ length: 5 }, (_, i) => (
              <div key={i} style={{ flex: 1, height: 5, borderRadius: 3, background: "#141C24", overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${40 + 30 * Math.abs(Math.sin(f / 9 + i * 1.2))}%`, background: hexA(i % 2 ? GREEN : SKY, 0.6) }} />
              </div>
            ))}
          </div>
        </div>

        {/* drifting cold dust motes across the whole depth (ambient life) */}
        {Array.from({ length: 16 }, (_, i) => {
          const bx = rnd(i * 5 + 2) * 1012;
          const speed = 0.25 + rnd(i * 5 + 3) * 0.4;
          const by = (700 - ((f * speed + rnd(i) * 700) % 720));       // slow upward drift
          const sway = Math.sin(f / (18 + i) + i) * 10;
          const s = 2 + rnd(i * 5 + 4) * 3;
          const op = 0.12 + rnd(i * 5 + 5) * 0.18;
          return <div key={`dm${i}`} style={{ position: "absolute", left: bx + sway, top: by, width: s, height: s, borderRadius: "50%", background: hexA("#DCEBFF", op), boxShadow: `0 0 4px ${hexA(SKY, op)}`, zIndex: 13, pointerEvents: "none" }} />;
        })}

      </div>
        {/* panel-wide cold vignette to seat the depth (fixed frame, outside the camera) */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 14, background: "radial-gradient(ellipse 92% 72% at 50% 46%, transparent 52%, rgba(4,8,12,0.46) 100%)" }} />
        {/* redline ALARM wash - the whole hall flashes on the biggest hits (fixed frame) */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 15, mixBlendMode: "screen", background: `radial-gradient(ellipse 84% 62% at 50% 56%, ${hexA(RED, 0.05 + 0.10 * maxImpact + 0.035 * Math.abs(Math.sin(f / 6)))}, transparent 70%)` }} />

        {/* ================= LIVE SLOP OUTPUT tally (fixed frame, sells mass-production) ================= */}
        <div style={{ position: "absolute", left: 24, top: 20, zIndex: 40, padding: "10px 16px", borderRadius: 12, background: grad("#0E1A28", "#060C14"), border: `2px solid ${hexA(SKY, 0.4)}`, boxShadow: `0 8px 20px rgba(0,0,0,0.5), 0 0 20px ${hexA(SKY, 0.2)}` }}>
          <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 15, letterSpacing: 2, color: hexA("#BFD8F4", 0.85), marginBottom: 4, display: "flex", alignItems: "center", gap: 7 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: RED, boxShadow: `0 0 8px ${RED}`, opacity: 0.5 + 0.5 * Math.abs(Math.sin(f / 4)) }} /> SLOP OUTPUT
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
            <span style={{ fontFamily: MONO, fontWeight: 900, fontSize: 44, color: GOLD, textShadow: `0 0 12px ${hexA(GOLD, 0.6)}`, letterSpacing: 1 }}>{slopStr}</span>
            <span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 15, color: GREEN }}>▲ /min</span>
          </div>
        </div>

        {/* ================= retention COUNTDOWN badge — TEASES THE TUTORIAL (5..1) ================= */}
        {f >= 92 && (() => {
          const cd = Math.max(1, Math.min(5, 5 - Math.floor((f - 95) / 30)));
          const cdRing = Math.max(0, Math.min(1, (f - 95) / 150));   // gold ring fills over the count
          const sinceTick = (f - 95) - Math.floor((f - 95) / 30) * 30;
          const cdPop = 1 + 0.35 * Math.max(0, 1 - Math.max(0, sinceTick) / 6); // number ticks/scales on change
          const R = 66, CIRC = 2 * Math.PI * R;
          return (
            <div style={{ position: "absolute", left: 818, top: 232, transform: "translate(-50%,-50%)", zIndex: 60, display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
              <div style={{ position: "relative", width: 164, height: 164 }}>
                {/* dark disc */}
                <div style={{ position: "absolute", inset: 12, borderRadius: "50%", background: grad("#141B26", "#080C13"), border: "2px solid #2A3644", boxShadow: `0 12px 30px rgba(0,0,0,0.6), 0 0 34px ${hexA(GOLD, 0.35)}, inset 0 0 22px rgba(0,0,0,0.6)` }} />
                {/* gold progress ring */}
                <svg width={164} height={164} style={{ position: "absolute", inset: 0, transform: "rotate(-90deg)" }}>
                  <circle cx={82} cy={82} r={R} fill="none" stroke={hexA("#3A2F14", 0.9)} strokeWidth={9} />
                  <circle cx={82} cy={82} r={R} fill="none" stroke={GOLD} strokeWidth={9} strokeLinecap="round" strokeDasharray={CIRC} strokeDashoffset={CIRC * (1 - cdRing)} style={{ filter: `drop-shadow(0 0 6px ${hexA(GOLD, 0.85)})` }} />
                </svg>
                {/* the big white number, ticking on each change */}
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 86, color: "#fff", textShadow: `0 0 18px ${hexA(GOLD, 0.7)}, 0 3px 6px rgba(0,0,0,0.55)`, transform: `scale(${cdPop})` }}>{cd}</div>
              </div>
              {/* TUTORIAL IN pill */}
              <div style={{ padding: "8px 24px", borderRadius: 999, background: grad("#E7896A", "#C5603C"), border: "3px solid #F3C7B4", fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 24, letterSpacing: 2, color: "#fff", boxShadow: `0 8px 20px rgba(197,96,60,0.5)` }}>TUTORIAL IN</div>
            </div>
          );
        })()}
      </Panel>

      <CaptionLine words={["it", "KNOWS", "the", "ending"]} hot={1} top={1240} />
    </AbsoluteFill>
  );
};
