import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { inter, fraunces } from "./fonts";
import { loadFont as loadMono } from "@remotion/google-fonts/JetBrainsMono";
import {
  Bg, ProgressBar, Panel, CaptionLine, Mascot, hexA, CO, GREEN, RED, CLAY, GOLD, SectionHeader,
} from "./SlopKit";

const mono = loadMono("normal", { weights: ["400", "500", "700"] });
const MONO = mono.fontFamily, UI = inter.fontFamily;
const APP_BG = "#FAF9F5", INK = "#2B2824", DIM = "#8C877D", LINE = "#EAE6DC";

const Traffic = () => (<div style={{ display: "flex", gap: 9 }}>{[["#FF5F57", "#E0443E"], ["#FEBC2E", "#DDA123"], ["#28C840", "#1DA92E"]].map(([c, b], i) => <div key={i} style={{ width: 14, height: 14, borderRadius: "50%", background: c as string, border: `0.5px solid ${b}` }} />)}</div>);
const Spark: React.FC<{ s: number; c?: string }> = ({ s, c = CO }) => (<svg width={s} height={s} viewBox="-20 -20 40 40">{Array.from({ length: 12 }, (_, i) => { const l = i % 2 ? 12 : 15.5, t = i % 2 ? 1.5 : 1.9; return <path key={i} d={`M -1.1 -2.6 L 1.1 -2.6 L ${t} ${-l} L ${-t} ${-l} Z`} fill={c} transform={`rotate(${i * 30})`} />; })}<circle r="3.2" fill={c} /></svg>);

/* The legit Claude desktop app, mid-voicemail, transcript typing with real messy FALSE STARTS
   (a couple caught and struck through) before it lands on what it actually meant. */
const RambleApp: React.FC = () => {
  const f = useCurrentFrame();
  const userIn = interpolate(f, [6, 16], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const thinking = f >= 28 && f < 46;
  const recStart = 46;
  const recording = f >= recStart;

  // messy transcript: two struck false starts, then the real answer. types as one smooth stream.
  const segs: { t: string; strike: boolean }[] = [
    { t: "umm, wait, no. ", strike: true },
    { t: "ok so, the thing is. hold on. ", strike: true },
    { t: "what I actually meant was: don't make it write the post. you just talk it all out, mess and false starts and all, and let it ramble. then only cut the ums.", strike: false },
  ];
  const CPF = 1.85;
  const budget = Math.max(0, Math.floor((f - recStart) * CPF));
  let acc = 0;
  const rendered = segs.map((s) => { const start = acc; acc += s.t.length; const shown = Math.max(0, Math.min(s.t.length, budget - start)); return { ...s, shown, done: budget >= acc, active: budget > start && budget < acc }; });
  const total = acc;
  const typing = budget < total;

  const tsec = Math.min(90, 12 + Math.floor((f - recStart) / 2));
  const chats: [string, boolean][] = [["Voicemail draft", true], ["Landing page copy", false], ["Cold email rewrite", false], ["Blog intro", false]];

  // ---- mascot reactions, timed to the on-screen moment (all guarded, never NaN) ----
  const CL = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
  // wide-eyed DOUBLE-TAKE the instant the voicemail starts recording
  const recPop = interpolate(f, [recStart - 2, recStart + 5, recStart + 16], [0, 1, 0], CL);
  // amusement/point pulses each time a messy false start gets caught + struck through
  const strike1 = interpolate(f, [51, 58, 68], [0, 1, 0], CL);   // "umm, wait, no." struck ~f54
  const strike2 = interpolate(f, [67, 74, 86], [0, 1, 0], CL);   // "ok so... hold on." struck ~f70
  const strikeFx = Math.max(strike1, strike2);
  // big ARM-PUMP celebration when it finally lands on the real answer (last segment types out)
  const landFx = interpolate(f, [96, 108, 124, 150], [0, 1, 1, 0.5], CL);
  // a literal springy HOP on every beat (guarded, always finite)
  const beat = Math.max(0, Math.sin(f / 4));
  const beatR = Math.max(0, Math.sin(f / 4 + 1.3));
  const hopL = beat * (strikeFx * 18 + landFx * 8) + recPop * 9;
  const hopR = beatR * (strikeFx * 8 + landFx * 16) + recPop * 7;
  // LEFT chef physically JABS a finger AT the struck false starts (reaches toward the words)
  const jabX = strikeFx * (58 + beat * 16);
  const jabY = -strikeFx * (26 + beat * 10);
  // RIGHT suit reaches a THUMBS-UP IN, landing it ON the real answer as it types out
  const landReach = Math.min(1, landFx);
  const thumbX = -landReach * (50 + beatR * 14);
  const thumbY = -landReach * (18 + beatR * 8);
  // which punchy line the left buddy is shouting right now
  const leftLine = recPop > Math.max(strikeFx, landFx) ? "here we go 🎬" : strike2 > strike1 ? "so him 😂" : "cut THAT 😂";
  const leftBubbleFx = Math.max(recPop * 0.9, strikeFx);
  const rightLine = "THAT'S the one 👍";
  const rightBubbleFx = landFx;

  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <AbsoluteFill style={{ background: APP_BG }}>
        {/* mac title bar */}
        <div style={{ height: 42, background: "#EDE9DF", display: "flex", alignItems: "center", padding: "0 16px", borderBottom: `1px solid ${LINE}` }}><Traffic /><div style={{ flex: 1, textAlign: "center", fontFamily: UI, fontSize: 17, fontWeight: 600, color: "#9A958B" }}>Claude</div><div style={{ width: 60 }} /></div>
        <div style={{ position: "absolute", top: 42, left: 0, right: 0, bottom: 0, display: "flex" }}>
          {/* sidebar */}
          <div style={{ width: 262, background: "#F1ECE1", borderRight: `1px solid ${LINE}`, padding: "16px 12px", display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "0 6px 14px" }}><Spark s={20} /><span style={{ fontFamily: UI, fontWeight: 700, fontSize: 21, color: INK }}>Claude</span></div>
            <div style={{ display: "flex", alignItems: "center", gap: 9, padding: "9px 12px", borderRadius: 11, border: `1px solid ${LINE}`, background: "#fff", marginBottom: 16 }}><span style={{ fontSize: 20, color: CO, fontWeight: 700 }}>+</span><span style={{ fontFamily: UI, fontWeight: 600, fontSize: 16, color: INK }}>New chat</span></div>
            <div style={{ fontFamily: UI, fontSize: 13, fontWeight: 600, color: DIM, padding: "0 6px 8px" }}>Recents</div>
            {chats.map(([t, a], i) => <div key={i} style={{ padding: "9px 12px", borderRadius: 9, background: a ? "#E4DCCC" : "transparent", fontFamily: UI, fontSize: 15, color: a ? INK : "#6E6A60", fontWeight: a ? 600 : 400, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", marginBottom: 2 }}>{t}</div>)}
            <div style={{ marginTop: "auto", display: "flex", alignItems: "center", gap: 9, padding: "8px 6px" }}><div style={{ width: 30, height: 30, borderRadius: "50%", background: CO, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontFamily: UI, fontWeight: 700, fontSize: 15 }}>A</div><span style={{ fontFamily: UI, fontSize: 15, color: INK, fontWeight: 500 }}>Alex</span></div>
          </div>
          {/* chat area */}
          <div style={{ flex: 1, position: "relative" }}>
            <div style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 92, padding: "26px 44px", overflow: "hidden" }}>
              <div style={{ maxWidth: 640, margin: "0 auto" }}>
                <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 22, opacity: userIn, transform: `translateY(${(1 - userIn) * 14}px)` }}>
                  <div style={{ maxWidth: 520, background: "#EFEAE0", border: `1px solid ${LINE}`, borderRadius: "18px 18px 5px 18px", padding: "14px 18px", fontFamily: UI, fontSize: 20, lineHeight: 1.45, color: INK }}>Don't write it. Leave me a <b>90-second voicemail</b> of what I meant. Ramble, false starts and all.</div>
                </div>
                {f >= 28 && (<div style={{ display: "flex", gap: 13 }}>
                  <div style={{ marginTop: 3, flexShrink: 0 }}><Spark s={28} /></div>
                  <div style={{ flex: 1 }}>
                    {thinking && <div style={{ display: "flex", gap: 7, paddingTop: 9 }}>{[0, 1, 2].map(i => <div key={i} style={{ width: 11, height: 11, borderRadius: "50%", background: DIM, opacity: 0.35 + 0.65 * Math.abs(Math.sin((f - 28) / 6 + i * 0.7)) }} />)}</div>}
                    {recording && <>
                      <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: hexA(RED, 0.12), border: `1px solid ${hexA(RED, 0.4)}`, borderRadius: 999, padding: "5px 12px", marginBottom: 12 }}><span style={{ width: 9, height: 9, borderRadius: "50%", background: RED, opacity: 0.55 + 0.45 * Math.abs(Math.sin(f / 5)) }} /><span style={{ fontFamily: UI, fontWeight: 700, fontSize: 15, color: "#B44435" }}>recording voicemail · 0:{String(tsec).padStart(2, "0")}</span></div>
                      {/* live waveform */}
                      <svg width={520} height={40} style={{ display: "block", marginBottom: 12 }}>{Array.from({ length: 64 }, (_, i) => { const live = i < (f - recStart) * 1.15; const h = 4 + Math.abs(Math.sin(i * 0.7 + f / 4)) * (live ? 30 : 4); return <rect key={i} x={i * 8} y={20 - h / 2} width={4} height={h} rx={2} fill={live ? CO : "#E0D8C8"} />; })}</svg>
                      {/* messy transcript with caught false starts */}
                      <p style={{ fontFamily: fraunces.fontFamily, fontSize: 22, lineHeight: 1.5, color: INK, margin: 0 }}>
                        {rendered.map((s, i) => s.shown > 0 ? <span key={i} style={{ color: s.strike ? DIM : INK, textDecoration: s.strike && s.done ? "line-through" : "none", textDecorationColor: hexA(DIM, 0.8) }}>{s.t.slice(0, s.shown)}{s.active && typing && <span style={{ opacity: (f % 16) < 9 ? 1 : 0, color: CO }}>▍</span>}</span> : null)}
                        {!typing && <span style={{ opacity: (f % 16) < 9 ? 1 : 0, color: CO }}>▍</span>}
                      </p>
                    </>}
                  </div>
                </div>)}
              </div>
            </div>
            {/* input box */}
            <div style={{ position: "absolute", left: 44, right: 44, bottom: 22, maxWidth: 640, margin: "0 auto", background: "#fff", border: `1.5px solid ${LINE}`, borderRadius: 16, padding: "13px 16px", display: "flex", alignItems: "center", boxShadow: "0 4px 14px rgba(0,0,0,0.04)" }}>
              <span style={{ fontFamily: UI, fontSize: 18, color: DIM, flex: 1 }}>Reply to Claude…</span>
              <span style={{ fontFamily: UI, fontSize: 14, color: DIM, fontWeight: 600, background: "#F0ECE3", padding: "5px 11px", borderRadius: 999, marginRight: 10 }}>Opus 4.8 ⌄</span>
              <div style={{ width: 40, height: 40, borderRadius: "50%", background: CO, display: "flex", alignItems: "center", justifyContent: "center" }}><svg width={20} height={20} viewBox="0 0 24 24"><path d="M12 20V5M6 11l6-6 6 6" stroke="#fff" strokeWidth="2.6" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg></div>
            </div>
          </div>
        </div>

        {/* two clay Claude mascots in DIFFERENT costumes, peeking IN from the LEFT + RIGHT side edges
            (bodies sit high, above y~530 — well clear of the global TUTORIAL status bar along the panel
            bottom). They reach IN and physically ACT on the transcript for THIS step, at its edge, never
            covering the readable words: the CHEF jabs/laughs AT the struck false starts, and the SUIT
            lands a THUMBS-UP on the real answer. */}

        {/* LEFT · a CHEF buddy peeking in from the left edge: leans in and JABS a pointing finger AT the
            struck false-start words the instant each one gets caught + crossed out, laughing along */}
        <div style={{ position: "absolute", top: 402, left: -6, zIndex: 40, transform: `translateY(${-hopL}px) rotate(${strikeFx * 6}deg)`, transformOrigin: "50% 100%" }}>
          <Mascot lf={f + 8} size={108} chef={1} nodAmp={2.6 + strikeFx * 3.4} nodSpeed={6.5} gaze={2 + strikeFx * 2} cheer={0.16 + strikeFx * 0.7 + recPop * 0.3} shock={recPop * 0.5} />
        </div>
        {/* the finger physically REACHES toward the struck words (translates in + up on each catch) */}
        {strikeFx > 0.1 && (
          <div style={{ position: "absolute", top: 470, left: 98, zIndex: 41, fontSize: 46, opacity: Math.min(1, strikeFx * 1.6), transform: `translate(${jabX}px, ${jabY}px) rotate(-22deg)`, filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.28))" }}>👉</div>
        )}
        {/* a laugh burst next to the chef as the mess gets caught */}
        {strikeFx > 0.2 && (
          <div style={{ position: "absolute", top: 400, left: 88, zIndex: 41, fontSize: 34, opacity: Math.min(1, (strikeFx - 0.2) * 2), transform: `translateY(${-strikeFx * 12}px) scale(${0.85 + strikeFx * 0.3})` }}>😂</div>
        )}
        {/* the chef's punchy speech bubble — pokes fun at the false start */}
        {leftBubbleFx > 0.14 && (
          <div style={{ position: "absolute", top: 332, left: 14, zIndex: 41, opacity: Math.min(1, leftBubbleFx * 1.35), transform: `translateY(${(1 - leftBubbleFx) * 12}px) rotate(-4deg) scale(${0.9 + leftBubbleFx * 0.14})` }}>
            <div style={{ position: "relative", padding: "9px 18px", borderRadius: 16, background: "#FBF7EE", border: `2px solid ${hexA(CO, 0.45)}`, boxShadow: "0 8px 18px rgba(0,0,0,0.18)", fontFamily: fraunces.fontFamily, fontWeight: 800, fontSize: 26, color: "#8A5A44", whiteSpace: "nowrap" }}>
              {leftLine}
              <div style={{ position: "absolute", left: 28, bottom: -11, width: 0, height: 0, borderLeft: "9px solid transparent", borderRight: "9px solid transparent", borderTop: "12px solid #FBF7EE" }} />
            </div>
          </div>
        )}

        {/* RIGHT · a SUIT buddy peeking in from the right edge: leans in + reaches a THUMBS-UP that lands
            ON the real answer as the true line finally types out */}
        <div style={{ position: "absolute", top: 430, left: 902, zIndex: 40, transform: `translateY(${-hopR}px) rotate(${-landFx * 6}deg)`, transformOrigin: "50% 100%" }}>
          <Mascot lf={f + 22} size={100} suit={1} nodAmp={2 + landFx * 3.4} nodSpeed={6} gaze={-2 - landFx * 2} cheer={0.2 + landFx * 0.8} shock={recPop * 0.35} />
        </div>
        {/* the thumbs-up physically REACHES in and stamps down onto the answer line */}
        {landFx > 0.1 && (
          <div style={{ position: "absolute", top: 500, left: 852, zIndex: 41, fontSize: 44, opacity: Math.min(1, landFx * 1.5), transform: `translate(${thumbX}px, ${thumbY}px) rotate(6deg)`, filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.28))" }}>👍</div>
        )}
        {/* the suit's small approval line */}
        {rightBubbleFx > 0.16 && (
          <div style={{ position: "absolute", top: 360, left: 760, zIndex: 41, opacity: Math.min(1, rightBubbleFx * 1.4), transform: `translateY(${(1 - rightBubbleFx) * 12}px) rotate(3deg) scale(${0.9 + rightBubbleFx * 0.14})` }}>
            <div style={{ position: "relative", padding: "8px 16px", borderRadius: 15, background: "#FBF7EE", border: `2px solid ${hexA(GREEN, 0.5)}`, boxShadow: "0 8px 18px rgba(0,0,0,0.18)", fontFamily: fraunces.fontFamily, fontWeight: 800, fontSize: 24, color: "#3F7A5E", whiteSpace: "nowrap" }}>
              {rightLine}
              <div style={{ position: "absolute", right: 30, bottom: -11, width: 0, height: 0, borderLeft: "9px solid transparent", borderRight: "9px solid transparent", borderTop: "12px solid #FBF7EE" }} />
            </div>
          </div>
        )}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const Rec4Ramble: React.FC = () => {
  const f = useCurrentFrame();
  return (<AbsoluteFill><Bg /><ProgressBar /><SectionHeader f={f} badge="🗣️" l1={<>LET IT</>} l2={<span style={{ color: CLAY }}>RAMBLE</span>} /><Panel><RambleApp /></Panel><CaptionLine words={["let", "it", "RAMBLE"]} hot={2} top={1240} /></AbsoluteFill>);
};
