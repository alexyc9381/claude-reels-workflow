import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";
import { inter, fraunces } from "./fonts";
import { loadFont as loadMono } from "@remotion/google-fonts/JetBrainsMono";
import {
  Bg, ProgressBar, Panel, CaptionLine, Mascot, hexA, CO, GREEN, RED, CLAY, GOLD, APP_BG, APP_INK, APP_DIM, APP_LINE, TrafficLights, ClaudeSpark, SectionHeader,
} from "./SlopKit";

const mono = loadMono("normal", { weights: ["400", "500", "700"] });
const MONO = mono.fontFamily, UI = inter.fontFamily;

const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
const ease = (f: number, a: number, b: number, ea = Easing.out(Easing.cubic)) =>
  interpolate(f, [a, b], [0, 1], { ...clamp, easing: ea });

// the transcript rows, in order. k=1 is a real kept sentence, k=0 is a filler word to cut.
type Row = { k: 1; ts: string; text: string } | { k: 0; fill: string };
const ROWS: Row[] = [
  { k: 1, ts: "0:02", text: "Nobody tells you this about AI writing:" },
  { k: 0, fill: "um" },
  { k: 1, ts: "0:05", text: "it always sounds a little too clean." },
  { k: 0, fill: "like" },
  { k: 1, ts: "0:09", text: "Real people trail off and repeat." },
  { k: 1, ts: "0:13", text: "They restart sentences halfway through." },
  { k: 0, fill: "uh" },
  { k: 1, ts: "0:17", text: "That mess is what sounds human." },
  { k: 1, ts: "0:22", text: "So keep the rambles, cut the filler." },
];
const FILLER_DEL = [34, 58, 82];               // frame each filler collapses out
const KEPT_TICK = [22, 46, 70, 78, 100, 108];  // frame each kept sentence gets its green tick

// a tiny waveform-clip glyph for the sidebar rows
const ClipWave: React.FC<{ c: string }> = ({ c }) => (
  <svg width={26} height={20} viewBox="0 0 26 20">
    {[6, 12, 17, 11, 5, 14, 8].map((h, i) => (
      <rect key={i} x={i * 4} y={10 - h / 2} width={2.4} height={h} rx={1.2} fill={c} />
    ))}
  </svg>
);

// a real pair of scissors the editor mascot holds and reaches into the transcript with.
// `open` is the half-angle of the blades: small = shut (mid-snip / cutting), large = open (idle).
const ScissorProp: React.FC<{ open: number }> = ({ open }) => (
  <svg width={200} height={138} viewBox="0 0 130 90" style={{ overflow: "visible", filter: "drop-shadow(0 3px 5px rgba(0,0,0,0.35))" }}>
    {/* upper blade + finger loop */}
    <g transform={`rotate(${-open} 50 45)`}>
      <path d="M50 45 L118 39 L118 45 Z" fill="#D8DCE2" stroke="#9AA0A9" strokeWidth={1.4} />
      <rect x={30} y={41.5} width={22} height={7} rx={3.5} fill="#3A404C" />
      <circle cx={22} cy={45} r={12} fill="none" stroke="#3A404C" strokeWidth={7} />
    </g>
    {/* lower blade + finger loop */}
    <g transform={`rotate(${open} 50 45)`}>
      <path d="M50 45 L118 51 L118 45 Z" fill="#C7CCD4" stroke="#9AA0A9" strokeWidth={1.4} />
      <rect x={30} y={41.5} width={22} height={7} rx={3.5} fill="#4A505C" />
      <circle cx={22} cy={45} r={12} fill="none" stroke="#4A505C" strokeWidth={7} />
    </g>
    <circle cx={50} cy={45} r={4.5} fill="#20242E" />
  </svg>
);

// the legit audio/text editor app, filling the panel edge to edge (panel-local 1012x792)
const EditorApp: React.FC = () => {
  const f = useCurrentFrame();

  // running counters
  const fCut = FILLER_DEL.filter((d) => f >= d).length;
  const kShown = KEPT_TICK.filter((t) => f >= t).length;
  const lastCut = FILLER_DEL.filter((d) => f >= d).slice(-1)[0] ?? -999; // frame of the most-recent cut (drives the snip beat)

  // bottom timeline scrub position (playhead 0..1) — drives the right mascot's gaze too
  const play = ease(f, 10, 118, Easing.inOut(Easing.quad));
  const MARK = [0.17, 0.43, 0.71];

  // ---- the two peeking editor mascots' choreography, timed to the scene's own beats ----
  // LEFT = the film EDITOR (glasses + suit). On every cut it snaps its scissors shut + hops.
  const snipWin = FILLER_DEL.some((d) => f >= d && f < d + 15);
  const leftNod = snipWin ? 8.5 : 3;
  const leftLine = snipWin ? "SNIP!" : fCut >= 3 ? "all clean" : "on it, boss";
  const sinceCut = f - lastCut;
  // scissor blade half-angle: snaps SHUT (~3°) right on each cut, springs back open; idle = held open
  const scOpen = snipWin ? 3 + 13 * Math.abs(Math.sin(sinceCut * 1.7)) : 15 + 2.5 * Math.sin(f / 12);

  // RIGHT = the WATCHER: follows the playhead, DOUBLE-TAKES on each cut, arm-pumps on each keep.
  const nearCut = FILLER_DEL.reduce((a, d) => (Math.abs(f - d) < Math.abs(f - a) ? d : a), -999);
  const rShock = interpolate(f - nearCut, [-3, 1, 9], [0, 0.72, 0], clamp);      // double-take
  const lastTick = KEPT_TICK.filter((t) => f >= t).slice(-1)[0] ?? -999;
  const rCheer = interpolate(f - lastTick, [0, 3, 13], [0, 0.7, 0], clamp);      // yay, kept!
  const rNod = rCheer > 0.12 ? 7.5 : 2.6;
  const rGaze = rShock > 0.2 ? 0 : interpolate(play, [0, 1], [-3, 3], clamp);
  const rightLine = rShock > 0.2 ? "gone! 👈" : rCheer > 0.2 ? "keep that!" : play > 0.9 ? "so human" : "watching 👀";

  const clips: [string, string, boolean][] = [
    ["voicemail_raw.m4a", "0:23", true],
    ["take_02.m4a", "0:41", false],
    ["intro_vo.m4a", "0:12", false],
    ["outro_cta.m4a", "0:08", false],
  ];

  let fi = -1, ki = -1; // running indices into FILLER_DEL / KEPT_TICK

  return (
    <AbsoluteFill style={{ background: APP_BG }}>
      {/* mac title bar */}
      <div style={{ height: 44, background: "#EDE9DF", display: "flex", alignItems: "center", padding: "0 16px", borderBottom: `1px solid ${APP_LINE}`, position: "relative" }}>
        <TrafficLights pad={0} />
        <div style={{ flex: 1, textAlign: "center", fontFamily: UI, fontSize: 15, fontWeight: 600, color: "#9A958B" }}>Loomcut Audio Editor</div>
        <div style={{ width: 60 }} />
        {/* a tiny Mascot sitting on the title bar, peeking down at the edit */}
        <div style={{ position: "absolute", right: 150, top: -14, zIndex: 40 }}>
          <Mascot lf={f} size={52} nodAmp={2.2} nodSpeed={7} gaze={-1} glasses={1} />
        </div>
      </div>

      <div style={{ position: "absolute", top: 44, left: 0, right: 0, bottom: 0, display: "flex" }}>
        {/* sidebar: the clip list */}
        <div style={{ width: 244, background: "#F1ECE1", borderRight: `1px solid ${APP_LINE}`, padding: "16px 12px", display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "0 6px 14px" }}>
            <ClaudeSpark s={18} />
            <span style={{ fontFamily: UI, fontWeight: 700, fontSize: 17, color: APP_INK }}>Clips</span>
          </div>
          {clips.map(([n, d, a], i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 11px", borderRadius: 10, marginBottom: 4, background: a ? "#E4DCCC" : "transparent", border: a ? `1px solid ${hexA(CO, 0.4)}` : "1px solid transparent" }}>
              <ClipWave c={a ? CO : "#B4AE9F"} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: UI, fontSize: 14, fontWeight: a ? 700 : 500, color: a ? APP_INK : "#6E6A60", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{n}</div>
              </div>
              <span style={{ fontFamily: MONO, fontSize: 12, color: APP_DIM }}>{d}</span>
            </div>
          ))}
          <div style={{ marginTop: "auto", padding: "10px 11px", borderRadius: 10, background: "#fff", border: `1px solid ${APP_LINE}`, display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ width: 9, height: 9, borderRadius: "50%", background: GREEN }} />
            <span style={{ fontFamily: UI, fontSize: 13, fontWeight: 600, color: "#6E6A60" }}>Filler removal on</span>
          </div>
        </div>

        {/* main: transcript + counter + timeline */}
        <div style={{ flex: 1, position: "relative", display: "flex", flexDirection: "column" }}>
          {/* toolbar with the live counter */}
          <div style={{ height: 58, borderBottom: `1px solid ${APP_LINE}`, display: "flex", alignItems: "center", padding: "0 26px", gap: 14 }}>
            <span style={{ fontFamily: UI, fontWeight: 700, fontSize: 17, color: APP_INK }}>Transcript</span>
            <span style={{ fontFamily: MONO, fontSize: 13, color: APP_DIM }}>voicemail_raw.m4a</span>
            <div style={{ flex: 1 }} />
            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 14px", borderRadius: 999, background: hexA(CO, 0.1), border: `1px solid ${hexA(CO, 0.3)}` }}>
              <span style={{ fontFamily: UI, fontSize: 14, fontWeight: 700, color: RED }}>fillers cut {fCut}/3</span>
              <span style={{ fontFamily: UI, fontSize: 14, color: APP_DIM }}>·</span>
              <span style={{ fontFamily: UI, fontSize: 14, fontWeight: 700, color: GREEN }}>sentences kept {kShown}/6</span>
            </div>
          </div>

          {/* the transcript body, rows close up as fillers are cut */}
          <div style={{ flex: 1, padding: "22px 30px", overflow: "hidden" }}>
            {ROWS.map((r, idx) => {
              if (r.k === 0) {
                fi += 1;
                const del = FILLER_DEL[fi];
                const p = interpolate(f, [del, del + 12], [1, 0], clamp); // 1 -> 0 collapse
                const appear = ease(f, 8 + idx, 8 + idx + 8);
                const cut = interpolate(f, [del - 1, del + 1, del + 8], [0, 1, 0], clamp); // the snip flash, ON the word
                return (
                  <div key={idx} style={{ overflow: "hidden", maxHeight: 52 * p * appear + 0.01, opacity: p * appear, transform: `translateX(${(1 - p) * 44}px)`, marginBottom: 12 * p }}>
                    <div style={{ position: "relative", display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px", borderRadius: 10, background: hexA(RED, 0.13), border: `1.5px solid ${hexA(RED, 0.55)}` }}>
                      <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 700, fontSize: 24, color: RED, textDecoration: p < 0.85 ? "line-through" : "none" }}>{r.fill}</span>
                      <svg width={16} height={16} viewBox="0 0 16 16"><path d="M3 3 L13 13 M13 3 L3 13" stroke={RED} strokeWidth={2.4} strokeLinecap="round" /></svg>
                      {/* the scissors' piercing CUT lands right here on the word */}
                      {cut > 0.02 && <>
                        <div style={{ position: "absolute", left: -6, right: -6, top: "50%", height: 4, background: GOLD, transform: `translateY(-50%) rotate(-14deg) scaleX(${cut})`, transformOrigin: "left center", borderRadius: 2, boxShadow: `0 0 10px ${hexA(GOLD, 0.9)}`, zIndex: 3 }} />
                        <div style={{ position: "absolute", right: -10, top: "50%", transform: `translate(50%,-50%) scale(${0.5 + cut * 0.9})`, zIndex: 4 }}>
                          <svg width={46} height={46} viewBox="-23 -23 46 46" style={{ overflow: "visible" }}>
                            {[0, 60, 120, 180, 240, 300].map((a) => <line key={a} x1={6} y1={0} x2={17} y2={0} transform={`rotate(${a})`} stroke={GOLD} strokeWidth={3.2} strokeLinecap="round" opacity={cut} />)}
                          </svg>
                        </div>
                      </>}
                    </div>
                  </div>
                );
              }
              ki += 1;
              const appear = ease(f, 8 + idx, 8 + idx + 8);
              const tick = KEPT_TICK[ki];
              const tk = ease(f, tick, tick + 8, Easing.out(Easing.back(2)));
              // a soft highlight sweep as the playhead reaches this kept row
              const sweep = 1 - Math.min(1, Math.abs(play * ROWS.length - idx) * 1.4);
              return (
                <div key={idx} style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 14, opacity: appear, transform: `translateY(${(1 - appear) * 10}px)`, background: sweep > 0 ? hexA(GOLD, 0.1 * sweep) : "transparent", borderRadius: 10, padding: "3px 8px" }}>
                  <span style={{ fontFamily: MONO, fontSize: 15, color: APP_DIM, marginTop: 8, flexShrink: 0, width: 42 }}>{r.ts}</span>
                  <span style={{ flex: 1, fontFamily: fraunces.fontFamily, fontSize: 27, lineHeight: 1.4, color: APP_INK }}>{r.text}</span>
                  <div style={{ flexShrink: 0, marginTop: 5, width: 30, height: 30, borderRadius: "50%", background: tk > 0.02 ? GREEN : "#EDE7DB", display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${tk})`, boxShadow: tk > 0.5 ? `0 0 12px ${hexA(GREEN, 0.6)}` : "none" }}>
                    <svg width={16} height={16} viewBox="0 0 16 16"><path d="M3 8.5 L7 12 L13 4" stroke="#fff" strokeWidth={2.6} fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </div>
                </div>
              );
            })}
          </div>

          {/* bottom timeline: waveform track, filler markers that clear, a scrubbing playhead */}
          <div style={{ height: 118, borderTop: `1px solid ${APP_LINE}`, background: "#F6F1E7", padding: "18px 30px", position: "relative" }}>
            <div style={{ position: "relative", height: 62, borderRadius: 12, background: "#EFE9DD", border: `1px solid ${APP_LINE}`, overflow: "hidden" }}>
              {/* filler regions (red) that fade once that filler is cut */}
              {MARK.map((m, i) => {
                const gone = interpolate(f, [FILLER_DEL[i], FILLER_DEL[i] + 12], [1, 0], clamp);
                return <div key={i} style={{ position: "absolute", left: `${m * 100}%`, top: 0, bottom: 0, width: 34, background: hexA(RED, 0.28 * gone), borderLeft: `2px solid ${hexA(RED, 0.7 * gone)}`, borderRight: `2px solid ${hexA(RED, 0.7 * gone)}` }} />;
              })}
              {/* the waveform */}
              <svg width="100%" height={62} preserveAspectRatio="none" viewBox="0 0 700 62" style={{ position: "absolute", inset: 0 }}>
                {Array.from({ length: 88 }, (_, i) => {
                  const near = MARK.some((m, k) => Math.abs(i / 88 - m) < 0.03 && f < FILLER_DEL[k] + 12);
                  const h = 6 + Math.abs(Math.sin(i * 0.6 + 1.3)) * 42;
                  const lit = i / 88 <= play;
                  return <rect key={i} x={i * 8 + 3} y={31 - h / 2} width={4} height={h} rx={2} fill={near ? RED : lit ? CO : "#CFC7B6"} opacity={near ? 0.85 : lit ? 0.9 : 0.7} />;
                })}
              </svg>
              {/* playhead */}
              <div style={{ position: "absolute", top: -4, bottom: -4, left: `${play * 100}%`, width: 2.5, background: APP_INK }}>
                <div style={{ position: "absolute", top: -6, left: -6, width: 14, height: 14, borderRadius: "50%", background: APP_INK }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== the two editor mascots reach in from the SIDE edges (well above the tutorial status bar at the panel bottom) ===== */}
      {/* LEFT = the film EDITOR (glasses + suit): peeks from the left edge, holds SCISSORS that reach into the
          filler-word column and SNAP SHUT on each cut frame — physically snipping the ums out of the transcript. */}
      <div style={{ position: "absolute", left: -10, top: 372, zIndex: 58 }}>
        <Mascot lf={f} size={126} nodAmp={leftNod} nodSpeed={6} gaze={2} glasses={1} suit={1} />
      </div>
      {/* the scissors it wields — anchored at its hand, blades reaching right toward the transcript's filler column */}
      <div style={{ position: "absolute", left: 96, top: 366, zIndex: 59, transform: "rotate(-7deg)" }}>
        <ScissorProp open={scOpen} />
        {snipWin && scOpen < 6 && (
          <div style={{ position: "absolute", left: 178, top: 69, transform: "translate(-50%,-50%)" }}>
            <svg width={44} height={44} viewBox="-22 -22 44 44" style={{ overflow: "visible" }}>
              {[0, 60, 120, 180, 240, 300].map((a) => <line key={a} x1={6} y1={0} x2={16} y2={0} transform={`rotate(${a})`} stroke={GOLD} strokeWidth={3} strokeLinecap="round" />)}
            </svg>
          </div>
        )}
      </div>
      {/* the editor's tiny call-out, tucked at the far-left edge over the sidebar — never over the transcript */}
      <div style={{ position: "absolute", left: 8, top: 338, zIndex: 60, display: "flex", alignItems: "center", gap: 6, padding: "5px 12px", borderRadius: 12, background: "#FBF8F1", border: `2px solid ${hexA(snipWin ? RED : CO, 0.5)}`, boxShadow: "0 6px 14px rgba(0,0,0,0.22)", transform: `scale(${snipWin ? 0.6 + ease(f - lastCut, 0, 6, Easing.out(Easing.back(2))) * 0.4 : 1}) rotate(-3deg)`, transformOrigin: "left center" }}>
        <span style={{ fontSize: 16, display: "inline-block", transform: snipWin ? `rotate(${Math.sin(sinceCut * 1.9) * 26}deg)` : "none" }}>✂️</span>
        <span style={{ fontFamily: UI, fontWeight: 800, fontSize: 14, color: snipWin ? RED : "#8A5A44", whiteSpace: "nowrap" }}>{leftLine}</span>
      </div>
      {/* RIGHT = the CHEERER (curly-haired buddy): peeks from the right edge, double-takes on each cut and
          arm-pumps every time a filler drops out. */}
      <div style={{ position: "absolute", right: -18, top: 392, zIndex: 58 }}>
        <Mascot lf={f} size={120} nodAmp={rNod} nodSpeed={6.5} cheer={Math.max(rCheer, snipWin ? 0.5 : 0.08)} shock={rShock} gaze={rGaze} fro={1} />
      </div>
      {/* the cheerer's reaction pill, hugging the far-right edge above the timeline (out of the transcript's reading path) */}
      <div style={{ position: "absolute", right: 8, top: 360, zIndex: 60, display: "flex", alignItems: "center", gap: 6, padding: "5px 12px", borderRadius: 12, background: "#FBF8F1", border: `2px solid ${hexA(rShock > 0.2 ? RED : rCheer > 0.2 ? GREEN : CO, 0.5)}`, boxShadow: "0 6px 14px rgba(0,0,0,0.22)", transform: `scale(${1 + Math.max(rShock, rCheer) * 0.12}) rotate(3deg)`, transformOrigin: "right center" }}>
        <span style={{ fontFamily: UI, fontWeight: 800, fontSize: 14, color: rShock > 0.2 ? RED : rCheer > 0.2 ? GREEN : "#8A5A44", whiteSpace: "nowrap" }}>{rightLine}</span>
      </div>
    </AbsoluteFill>
  );
};

export const Rec5Cut: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Bg />
      <ProgressBar />
      <SectionHeader f={f} badge="✂️" l1={<>CUT ONLY</>} l2={<span style={{ color: CLAY }}>THE UMS</span>} />
      <Panel>
        <EditorApp />
      </Panel>
      <CaptionLine words={["cut", "ONLY", "the", "ums"]} hot={1} top={1240} />
    </AbsoluteFill>
  );
};
