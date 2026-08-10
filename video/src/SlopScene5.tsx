import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";
import { inter } from "./fonts";
import {
  Bg, ProgressBar, Panel, CaptionLine, Mascot,
  grad, hexA, over, CO, GOLD, GREEN, RED, SKY, MONO,
} from "./SlopKit";

/* =========================================================================
   SLOP · Scene 5 · THE VIDEO-EDITING SUITE
   A dark editing bay: a big editor monitor with a waveform TIMELINE, a
   second scope screen, an editing keyboard, a mug, headphones, moody glow.
   The beat: on the timeline only the "um"/"uh" clips get a small red x and
   are surgically cut, while the messy real sentences keep a small green
   check. Cohesive with the reel: clay Mascot editor plus the cold grey AI
   SLOP robot sidelined on a shelf. Panel-local ~1012x792, everything off f.
   ========================================================================= */

// timeline clips left to right. kind s = real sentence (kept, green check),
// kind f = filler "um"/"uh" (cut, red x). x/w are panel-local pixels.
type Clip = { kind: "s" | "f"; x: number; w: number; label: string; del: number; chk: number };
const CLIPS: Clip[] = [
  { kind: "s", x: 180, w: 120, label: "so here's", del: 0, chk: 40 },
  { kind: "f", x: 310, w: 54, label: "um", del: 44, chk: 0 },
  { kind: "s", x: 374, w: 140, label: "what I meant", del: 0, chk: 56 },
  { kind: "f", x: 524, w: 54, label: "uh", del: 62, chk: 0 },
  { kind: "s", x: 588, w: 120, label: "was really", del: 0, chk: 74 },
  { kind: "f", x: 718, w: 54, label: "um", del: 80, chk: 0 },
  { kind: "s", x: 782, w: 130, label: "this thing", del: 0, chk: 92 },
];

export const Scene5: React.FC = () => {
  const f = useCurrentFrame();

  // moody screen breathing + playhead sweeping across the timeline
  const glowPulse = 0.5 + 0.5 * Math.sin(f / 22);
  const playX = interpolate(f, [22, 150], [180, 912], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.quad) });
  const steam = (i: number) => Math.sin(f / 7 + i) * 6;
  const cutN = CLIPS.filter((c) => c.kind === "f" && c.del <= f).length;
  const keepN = CLIPS.filter((c) => c.kind === "s" && c.chk <= f).length;

  return (
    <AbsoluteFill>
      <Bg />
      <ProgressBar />

      <Panel glow={hexA(SKY, 0.28)} pushIn>
        {/* ============ panel-local diorama (1012 x 792) ============ */}
        <div style={{ position: "absolute", inset: 0 }}>

          {/* ---- FAR BG: dark studio wall + moody monitor glow ---- */}
          <div style={{ position: "absolute", inset: 0, background: grad("#12161F", "#090C13") }} />
          <div style={{ position: "absolute", left: 220, top: 90, width: 640, height: 480, borderRadius: "50%", background: `radial-gradient(circle, ${hexA(SKY, 0.20 + glowPulse * 0.10)}, transparent 66%)`, filter: "blur(30px)" }} />
          <div style={{ position: "absolute", left: 40, top: 320, width: 380, height: 360, borderRadius: "50%", background: `radial-gradient(circle, ${hexA(CO, 0.14)}, transparent 68%)`, filter: "blur(26px)" }} />
          {/* acoustic-foam wall lines for depth */}
          {Array.from({ length: 7 }, (_, r) => (
            <div key={`fw${r}`} style={{ position: "absolute", left: 0, right: 0, top: 40 + r * 42, height: 2, background: hexA("#2A3244", 0.5) }} />
          ))}

          {/* ---- FAR shelf: the cold grey AI SLOP robot, sidelined + dim ---- */}
          <div style={{ position: "absolute", left: 60, top: 150, width: 150, height: 12, background: grad("#232A38", "#161B26"), borderRadius: 3, boxShadow: "0 8px 14px rgba(0,0,0,0.4)" }} />
          <div style={{ position: "absolute", left: 78, top: 44, opacity: 0.5, filter: "grayscale(1) brightness(0.75)", transform: "scale(0.86)" }}>
            <Mascot lf={f * 0.4} size={110} tint="#8E8A80" stern={0.6} nodAmp={1.1} nodSpeed={16} gaze={-1} />
          </div>
          <div style={{ position: "absolute", left: 128, top: 40, width: 12, height: 12, borderRadius: "50%", background: "#5B93C4", boxShadow: `0 0 ${8 + glowPulse * 4}px #5B93C4`, opacity: 0.35 + glowPulse * 0.25 }} />

          {/* ---- MID: second scope screen (angled) ---- */}
          <div style={{ position: "absolute", left: 18, top: 300, width: 150, height: 210, borderRadius: 12, background: "#05070C", border: "6px solid #1B2230", transform: "perspective(600px) rotateY(20deg)", boxShadow: "0 18px 30px rgba(0,0,0,0.5)", overflow: "hidden" }}>
            <div style={{ position: "absolute", left: 12, top: 12, right: 12, height: 70, borderRadius: 6, background: hexA(GREEN, 0.08), border: `1px solid ${hexA(GREEN, 0.35)}` }}>
              <svg width={122} height={68} style={{ display: "block" }}>
                {Array.from({ length: 26 }, (_, i) => { const h = 6 + Math.abs(Math.sin(i * 0.8 + f / 5)) * 46; return <rect key={i} x={4 + i * 4.5} y={58 - h} width={2.4} height={h} rx={1} fill={GREEN} opacity={0.5 + 0.4 * Math.abs(Math.sin(i + f / 6))} />; })}
              </svg>
            </div>
            <div style={{ position: "absolute", left: 12, top: 94, right: 12, bottom: 12, borderRadius: 6, background: hexA(SKY, 0.06), border: `1px solid ${hexA(SKY, 0.28)}` }}>
              <div style={{ position: "absolute", left: "50%", top: "50%", width: 56, height: 56, transform: "translate(-50%,-50%)", borderRadius: "50%", border: `1px solid ${hexA(SKY, 0.4)}` }} />
              <div style={{ position: "absolute", left: "50%", top: "50%", width: 2, height: 44 * (0.5 + glowPulse * 0.5), transform: `translate(-50%,-100%) rotate(${f * 3}deg)`, transformOrigin: "50% 100%", background: SKY, opacity: 0.7 }} />
            </div>
          </div>

          {/* headphones hanging on a wall hook, upper mid-left */}
          <div style={{ position: "absolute", left: 210, top: 100 }}>
            <div style={{ position: "absolute", left: 50, top: -10, width: 6, height: 16, background: "#3A4353", borderRadius: 2 }} />
            <svg width={110} height={110} viewBox="0 0 110 110" style={{ overflow: "visible" }}>
              <path d="M22 62 A34 34 0 0 1 88 62" fill="none" stroke="#252C3A" strokeWidth={10} strokeLinecap="round" />
              <rect x={12} y={58} width={22} height={38} rx={9} fill="#2E3546" />
              <rect x={76} y={58} width={22} height={38} rx={9} fill="#2E3546" />
              <rect x={16} y={64} width={14} height={26} rx={6} fill={hexA(CO, 0.45)} />
              <rect x={80} y={64} width={14} height={26} rx={6} fill={hexA(CO, 0.45)} />
            </svg>
          </div>

          {/* ---- HERO: the big editor MONITOR ---- */}
          <div style={{ position: "absolute", left: 150, top: 108, width: 838, height: 486, borderRadius: 18, background: "#05070C", border: "10px solid #171E2B", boxShadow: `0 26px 54px rgba(0,0,0,0.6), 0 0 ${34 + glowPulse * 20}px ${hexA(SKY, 0.22)}`, overflow: "hidden" }}>
            {/* editor top bar */}
            <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 40, background: grad("#141A26", "#0C111B"), display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 18px", borderBottom: "1px solid #1E2634" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                {[0, 1, 2].map((i) => <div key={i} style={{ width: 10, height: 10, borderRadius: "50%", background: "#4E5A70" }} />)}
                <span style={{ marginLeft: 12, fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 17, color: "#7C879B" }}>voicemail_take.proj</span>
              </div>
              <span style={{ fontFamily: MONO, fontSize: 16, color: hexA(CO, 0.9) }}>00:00:{String((12 + Math.floor(f / 3)) % 60).padStart(2, "0")}:14</span>
            </div>

            {/* program preview (top-left): the video frame being edited */}
            <div style={{ position: "absolute", left: 20, top: 56, width: 452, height: 250, borderRadius: 10, background: grad("#0D1420", "#070B12"), border: "1px solid #1C2432", overflow: "hidden" }}>
              <div style={{ position: "absolute", left: 120, top: 110, width: 320, height: 200, borderRadius: "50%", background: `radial-gradient(circle, ${hexA(CO, 0.22)}, transparent 66%)`, filter: "blur(18px)" }} />
              <div style={{ position: "absolute", left: "50%", bottom: -6, transform: "translateX(-50%)" }}>
                <Mascot lf={f} size={190} glasses={1} gaze={Math.sin(f / 24) * 2} nodAmp={2.2} nodSpeed={11} />
              </div>
              <div style={{ position: "absolute", left: 14, top: 12, display: "flex", alignItems: "center", gap: 7 }}>
                <span style={{ width: 12, height: 12, borderRadius: "50%", background: RED, boxShadow: `0 0 8px ${RED}`, opacity: 0.5 + 0.5 * Math.abs(Math.sin(f / 5)) }} />
                <span style={{ fontFamily: MONO, fontSize: 15, color: "#B9C2D2" }}>0:{String((30 + Math.floor(f / 2)) % 60).padStart(2, "0")}</span>
              </div>
            </div>

            {/* right-side inspector: cut vs kept summary */}
            <div style={{ position: "absolute", right: 18, top: 56, width: 306, height: 250, borderRadius: 10, background: grad("#0C121C", "#080C14"), border: "1px solid #1C2432", padding: "16px 18px" }}>
              <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 18, color: "#8C97AB", letterSpacing: 1, marginBottom: 16 }}>CLIP INSPECTOR</div>
              {[
                { c: RED, k: "filler", n: cutN, of: 3, sym: "✕", tag: "cut" },
                { c: GREEN, k: "sentences", n: keepN, of: 4, sym: "✓", tag: "kept" },
              ].map((row, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                  <div style={{ width: 34, height: 34, borderRadius: 9, background: hexA(row.c, 0.16), border: `2px solid ${row.c}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 18, color: row.c }}>{row.sym}</div>
                  <div>
                    <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 20, color: "#D7DEEA" }}>{row.n}/{row.of} {row.k}</div>
                    <div style={{ fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 15, color: row.c }}>{row.tag}</div>
                  </div>
                </div>
              ))}
              <svg width={270} height={54} style={{ display: "block", marginTop: 6 }}>
                {Array.from({ length: 46 }, (_, i) => { const h = 4 + Math.abs(Math.sin(i * 0.6 + f / 5)) * 42; return <rect key={i} x={i * 5.8} y={48 - h} width={2.6} height={h} rx={1} fill={hexA(SKY, 0.55)} />; })}
              </svg>
            </div>

            {/* ---- THE TIMELINE ---- */}
            <div style={{ position: "absolute", left: 20, right: 18, top: 322, height: 140, borderRadius: 10, background: grad("#0B1019", "#070A11"), border: "1px solid #1A2130" }}>
              {/* ruler ticks */}
              {Array.from({ length: 30 }, (_, i) => (
                <div key={`tk${i}`} style={{ position: "absolute", left: 20 + i * 26, top: 8, width: 1, height: i % 5 === 0 ? 12 : 7, background: hexA("#4A5468", 0.7) }} />
              ))}
              <div style={{ position: "absolute", left: 12, top: 96, fontFamily: MONO, fontSize: 12, color: "#586173" }}>A1</div>

              {/* clips */}
              {CLIPS.map((clip, i) => {
                const isFiller = clip.kind === "f";
                const del = isFiller ? over(f, clip.del, 10, Easing.in(Easing.cubic)) : 0;
                const kept = !isFiller ? over(f, clip.chk, 8, Easing.out(Easing.back(2))) : 0;
                const localX = clip.x - 150 - 20;      // monitor local, then timeline pad
                const c = isFiller ? RED : GREEN;
                const collapse = isFiller ? 1 - del * 0.86 : 1;
                const op = isFiller ? 1 - del * 0.82 : 1;
                const xpop = over(f, clip.del - 6, 6);
                const nbars = Math.max(4, Math.floor(clip.w / 8));
                return (
                  <div key={i} style={{ position: "absolute", left: 20 + localX, top: 42, width: clip.w * collapse, height: 70, opacity: op }}>
                    <div style={{ position: "absolute", inset: 0, borderRadius: 7, background: isFiller ? grad(hexA(RED, 0.28), hexA(RED, 0.14)) : grad(hexA(GREEN, 0.26), hexA(GREEN, 0.12)), border: `2px solid ${hexA(c, 0.8 - del * 0.5)}`, overflow: "hidden", boxShadow: del > 0.1 ? "none" : "0 4px 10px rgba(0,0,0,0.35)" }}>
                      <svg width={clip.w} height={70} style={{ display: "block" }}>
                        {Array.from({ length: nbars }, (_, j) => { const h = 6 + Math.abs(Math.sin(j * 0.9 + i * 2 + f / 6)) * (isFiller ? 22 : 46); return <rect key={j} x={4 + j * 8} y={35 - h / 2} width={3} height={h} rx={1.5} fill={hexA(c, 0.85)} />; })}
                      </svg>
                      <div style={{ position: "absolute", left: 6, top: 4, fontFamily: MONO, fontSize: 12, color: hexA("#EAF0F8", 0.9 - del) }}>{clip.label}</div>
                    </div>
                    {isFiller
                      ? (xpop > 0.02 && (
                          <div style={{ position: "absolute", left: "50%", top: -30, transform: `translateX(-50%) scale(${interpolate(xpop, [0, 1], [1.8, 1])})`, opacity: Math.min(1, xpop * 1.4) * (1 - del * 0.7), width: 30, height: 30, borderRadius: "50%", background: RED, boxShadow: `0 0 12px ${RED}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 18, color: "#fff", zIndex: 6 }}>{"✕"}</div>
                        ))
                      : (kept > 0.02 && (
                          <div style={{ position: "absolute", left: "50%", top: -30, transform: `translateX(-50%) scale(${kept})`, opacity: Math.min(1, kept), width: 30, height: 30, borderRadius: "50%", background: GREEN, boxShadow: `0 0 12px ${GREEN}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 17, color: "#fff", zIndex: 6 }}>{"✓"}</div>
                        ))}
                  </div>
                );
              })}

              {/* playhead sweeping across */}
              <div style={{ position: "absolute", left: 20 + (playX - 150 - 20), top: 6, width: 2, height: 128, background: hexA(GOLD, 0.95), boxShadow: `0 0 10px ${GOLD}` }}>
                <div style={{ position: "absolute", left: -6, top: -4, width: 14, height: 12, background: GOLD, clipPath: "polygon(50% 100%, 0 0, 100% 0)" }} />
              </div>
            </div>
          </div>

          {/* ---- NEAR: desk surface ---- */}
          <div style={{ position: "absolute", left: 0, right: 0, top: 610, height: 200, background: grad("#1A212E", "#10141C"), boxShadow: "inset 0 3px 14px rgba(0,0,0,0.5)" }} />
          <div style={{ position: "absolute", left: 0, right: 0, top: 610, height: 4, background: hexA(SKY, 0.14) }} />

          {/* editing keyboard (cut + keep keys colour-coded) */}
          <div style={{ position: "absolute", left: 300, top: 648, width: 430, height: 118, borderRadius: 14, background: grad("#20283A", "#141A28"), border: "2px solid #2B3448", boxShadow: "0 14px 26px rgba(0,0,0,0.5)", transform: "perspective(700px) rotateX(34deg)", transformOrigin: "50% 100%", padding: 12 }}>
            {Array.from({ length: 3 }, (_, r) => (
              <div key={r} style={{ display: "flex", gap: 7, marginBottom: 7, justifyContent: "center" }}>
                {Array.from({ length: 10 }, (_, cN) => {
                  const isCut = r === 1 && cN === 3;
                  const isKeep = r === 1 && cN === 6;
                  const bg = isCut ? RED : isKeep ? GREEN : "#39435A";
                  return <div key={cN} style={{ width: 34, height: 26, borderRadius: 6, background: bg, boxShadow: "0 2px 3px rgba(0,0,0,0.4)", border: "1px solid rgba(0,0,0,0.3)", opacity: isCut || isKeep ? 0.9 : 0.85 }} />;
                })}
              </div>
            ))}
          </div>

          {/* coffee mug with rising steam, near-right */}
          <div style={{ position: "absolute", left: 792, top: 640 }}>
            {[0, 1, 2].map((i) => (
              <div key={i} style={{ position: "absolute", left: 20 + i * 12 + steam(i), top: -20 - i * 14, width: 8, height: 26, borderRadius: 6, background: hexA("#B9C6DA", 0.16 - i * 0.03), filter: "blur(2px)" }} />
            ))}
            <div style={{ position: "absolute", left: 0, top: 8, width: 66, height: 58, borderRadius: "8px 8px 14px 14px", background: grad("#C96442", "#9E4A2C"), boxShadow: "0 8px 16px rgba(0,0,0,0.4)" }} />
            <div style={{ position: "absolute", left: 60, top: 20, width: 22, height: 30, borderRadius: "0 12px 12px 0", border: "6px solid #B85631", borderLeft: "none" }} />
            <div style={{ position: "absolute", left: 8, top: 12, width: 50, height: 10, borderRadius: "50%", background: hexA("#2A1810", 0.6) }} />
          </div>

          {/* the clay Mascot editor, near-left at the desk (glasses, headphones, focused) */}
          <div style={{ position: "absolute", left: 84, top: 470 }}>
            <svg width={190} height={190} viewBox="0 0 190 190" style={{ position: "absolute", left: 0, top: -6, zIndex: 6, overflow: "visible" }}>
              <path d="M34 96 A62 62 0 0 1 156 96" fill="none" stroke="#232B3A" strokeWidth={12} strokeLinecap="round" />
              <rect x={20} y={90} width={26} height={44} rx={11} fill="#2E3648" />
              <rect x={144} y={90} width={26} height={44} rx={11} fill="#2E3648" />
              <rect x={25} y={98} width={16} height={28} rx={7} fill={hexA(CO, 0.5)} />
              <rect x={149} y={98} width={16} height={28} rx={7} fill={hexA(CO, 0.5)} />
            </svg>
            <Mascot lf={f} size={172} glasses={1} gaze={2} nodAmp={2.4} nodSpeed={10} />
          </div>

          {/* subtle desk key-light rim from the monitor */}
          <div style={{ position: "absolute", left: 150, top: 596, width: 838, height: 60, background: `linear-gradient(180deg, ${hexA(SKY, 0.14)}, transparent)`, filter: "blur(8px)" }} />

        </div>
      </Panel>

      <CaptionLine words={["cut", "ONLY", "the", "ums"]} hot={1} top={1240} />
    </AbsoluteFill>
  );
};

export const Scene5Scene: React.FC = () => <Scene5 />;
