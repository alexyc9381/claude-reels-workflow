import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";
import { inter, fraunces } from "./fonts";
import { loadFont as loadMono } from "@remotion/google-fonts/JetBrainsMono";
import {
  Bg, ProgressBar, Panel, CaptionLine, hexA, CO, GREEN, RED, SectionHeader, CLAY, Mascot,
} from "./SlopKit";

const mono = loadMono("normal", { weights: ["400", "500", "700"] });
const MONO = mono.fontFamily, UI = inter.fontFamily;
const APP_BG = "#FAF9F5", INK = "#2B2824", DIM = "#8C877D", LINE = "#EAE6DC";
const Traffic = () => (<div style={{ display: "flex", gap: 9 }}>{[["#FF5F57","#E0443E"],["#FEBC2E","#DDA123"],["#28C840","#1DA92E"]].map(([c,b],i)=><div key={i} style={{width:14,height:14,borderRadius:"50%",background:c as string,border:`0.5px solid ${b}`}}/>)}</div>);
const Spark: React.FC<{s:number;c?:string}> = ({s,c=CO}) => (<svg width={s} height={s} viewBox="-20 -20 40 40">{Array.from({length:12},(_,i)=>{const l=i%2?12:15.5,t=i%2?1.5:1.9;return <path key={i} d={`M -1.1 -2.6 L 1.1 -2.6 L ${t} ${-l} L ${-t} ${-l} Z`} fill={c} transform={`rotate(${i*30})`}/>;})}<circle r="3.2" fill={c}/></svg>);

/* a clay-colored REACHING ARM with a pointing finger, so a co-host can physically ACT on the
   on-screen element (poke the REC chip / point at the live waveform). Anchored at the shoulder
   (x,y), extends `len` px at `ang` degrees; `poke` (0..1) jabs the fingertip toward the target. */
const PointArm: React.FC<{ x: number; y: number; len: number; ang: number; c: string; poke?: number; sleeve?: string; z?: number }> = ({ x, y, len, ang, c, poke = 0, sleeve = "#26324A", z = 41 }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z, transformOrigin: "0 50%", transform: `rotate(${ang}deg) translateX(${poke * 9}px)` }}>
    <div style={{ position: "absolute", left: 0, top: -14, width: 26, height: 28, borderRadius: 8, background: sleeve }} />
    <div style={{ position: "absolute", left: 6, top: -11, width: len, height: 22, borderRadius: 11, background: c, boxShadow: "0 4px 10px rgba(0,0,0,0.25)" }} />
    <div style={{ position: "absolute", left: len - 4, top: -16, width: 32, height: 32, borderRadius: 12, background: c, boxShadow: "0 4px 10px rgba(0,0,0,0.25)" }} />
    <div style={{ position: "absolute", left: len + 18, top: -6, width: 24, height: 12, borderRadius: 6, background: c }} />
  </div>
);

/* A LEGIT full Claude DESKTOP APP screen recording (fills the panel, natural proportions). */
export const ClaudeDeskApp: React.FC = () => {
  const f = useCurrentFrame();
  const userIn = interpolate(f, [6, 16], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const thinking = f >= 30 && f < 52;
  const reply = "umm ok so, what I actually wanted to say is... look, most people just tell it to write the thing, and yeah it comes out clean but it sounds like a robot. so, don't. here's the thing that fixed it for me, you just, like, talk it out first.";
  const budget = Math.max(0, Math.floor((f - 52) * 1.6));
  const shown = reply.slice(0, budget);
  const typing = budget < reply.length;
  const chats: [string, boolean][] = [["Voicemail draft", true], ["Landing page copy", false], ["Cold email rewrite", false], ["Blog intro", false]];
  // ---- two clay Claude PODCAST CO-HOSTS following along + reacting (recording begins at f>=52) ----
  const CL = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
  const watch = interpolate(f, [4, 14], [0, 1], CL);                        // perk up when the ask lands
  const lean = interpolate(f, [30, 42], [0, 1], CL);                        // lean in during "thinking"
  const startPop = interpolate(f, [50, 55, 66], [0, 0.9, 0], CL);          // BIG double-take when REC starts
  const dbl = interpolate(f, [64, 68, 74], [0, 0.7, 0], CL);               // a second little double-take as words flow
  const point = interpolate(f, [58, 72], [0, 1], CL);                       // fling an arm toward the waveform
  const pumpEnv = interpolate(f, [76, 86], [0, 1], CL);                     // then celebrate the human transcript
  const pumpA = Math.max(0, Math.sin((f - 76) / 4.5)) * pumpEnv;            // host arm-pump (never NaN)
  const pumpB = Math.max(0, Math.sin((f - 76) / 4.5 + 1.5)) * pumpEnv;     // sidekick pumps on the off-beat
  const pokeEnv = interpolate(f, [54, 62], [0, 1], CL);                     // host starts jabbing the REC chip when recording begins
  const poke = Math.max(0, Math.sin((f - 54) / 3.0)) * pokeEnv;             // host finger-tap oscillation (never NaN)
  const pokeBEnv = interpolate(f, [70, 80], [0, 1], CL);                    // co-host starts pointing once words flow
  const pokeB = Math.max(0, Math.sin((f - 70) / 3.4)) * pokeBEnv;           // co-host point oscillation (never NaN)
  const cheerHost = Math.min(1, point * 0.7 + pumpA * 0.7 + lean * 0.15);
  const cheerSide = Math.min(1, 0.2 + point * 0.4 + pumpB * 0.7);
  const shockHost = Math.min(1, Math.max(startPop, dbl));
  const shockSide = Math.min(1, startPop * 0.65);
  const bubbleIn = interpolate(f, [60, 68, 100, 108], [0, 1, 1, 0], CL);    // host: "no script, baby"
  const bubble2In = interpolate(f, [86, 94, 124, 132], [0, 1, 1, 0], CL);   // sidekick: "less robot!"
  const nodBoost = 2 + watch * 1 + lean * 1.4;                             // nod harder as they get into it
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
                  <div style={{ maxWidth: 520, background: "#EFEAE0", border: `1px solid ${LINE}`, borderRadius: "18px 18px 5px 18px", padding: "14px 18px", fontFamily: UI, fontSize: 20, lineHeight: 1.45, color: INK }}>Don't write it. Leave me a <b>90-second voicemail</b> explaining what I wanted to say. Ramble, false starts and all. Then only cut the <i>ums</i>.</div>
                </div>
                {f >= 30 && (<div style={{ display: "flex", gap: 13 }}>
                  <div style={{ marginTop: 3, flexShrink: 0 }}><Spark s={28} /></div>
                  <div style={{ flex: 1 }}>
                    {thinking && <div style={{ display: "flex", gap: 7, paddingTop: 9 }}>{[0,1,2].map(i=><div key={i} style={{ width: 11, height: 11, borderRadius: "50%", background: DIM, opacity: 0.35 + 0.65 * Math.abs(Math.sin((f-30)/6 + i*0.7)) }}/>)}</div>}
                    {!thinking && f >= 52 && <>
                      <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#F1E9DC", borderRadius: 999, padding: "5px 12px", marginBottom: 12 }}><span style={{ width: 9, height: 9, borderRadius: "50%", background: RED, opacity: 0.6 + 0.4 * Math.abs(Math.sin(f/5)) }} /><span style={{ fontFamily: UI, fontWeight: 700, fontSize: 15, color: "#8A5A44" }}>recording voicemail · 0:{String(Math.min(90, 12 + Math.floor((f-52)/2))).padStart(2,"0")}</span></div>
                      <svg width={520} height={40} style={{ display: "block", marginBottom: 12 }}>{Array.from({length:64},(_,i)=>{const h=4+Math.abs(Math.sin(i*0.7+f/4))*(i<(f-52)*1.1?30:4);return <rect key={i} x={i*8} y={20-h/2} width={4} height={h} rx={2} fill={i<(f-52)*1.1?CO:"#E0D8C8"}/>;})}</svg>
                      <p style={{ fontFamily: fraunces.fontFamily, fontSize: 22, lineHeight: 1.5, color: INK, margin: 0 }}>{shown}{typing && <span style={{ opacity: (f%16)<9?1:0, color: CO }}>▍</span>}</p>
                    </>}
                  </div>
                </div>)}
              </div>
            </div>
            {/* input box */}
            <div style={{ position: "absolute", left: 44, right: 44, bottom: 22, maxWidth: 640, margin: "0 auto", background: "#fff", border: `1.5px solid ${LINE}`, borderRadius: 16, padding: "13px 16px", display: "flex", alignItems: "center", boxShadow: "0 4px 14px rgba(0,0,0,0.04)" }}>
              <span style={{ fontFamily: UI, fontSize: 18, color: DIM, flex: 1 }}>Reply to Claude…</span>
              <span style={{ fontFamily: UI, fontSize: 14, color: DIM, fontWeight: 600, background: "#F0ECE3", padding: "5px 11px", borderRadius: 999, marginRight: 10 }}>Opus 4.8 ⌄</span>
              <div style={{ width: 40, height: 40, borderRadius: "50%", background: CO, display: "flex", alignItems: "center", justifyContent: "center" }}><svg width={20} height={20} viewBox="0 0 24 24"><path d="M12 20V5M6 11l6-6 6 6" stroke="#fff" strokeWidth="2.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
            </div>
          </div>
        </div>
      </AbsoluteFill>
      {/* two clay Claude PODCAST CO-HOSTS peeking IN FROM THE SIDE EDGES (bodies well above the
          new bottom TUTORIAL status bar) and physically ACTING ON the screen: the HOST reaches in
          from the left and POKES the red "recording voicemail" chip; the CO-HOST leans in from the
          right and points up at the LIVE WAVEFORM while reacting to the human transcript. Varied
          outfits — HOST = glasses + suit; CO-HOST = afro + tweed blazer. */}
      {/* a podcast desk mic tucked at the host's side (sets the scene, well off the transcript) */}
      <div style={{ position: "absolute", left: 132, top: 372, zIndex: 39, transform: `rotate(${-6 + point * 4}deg)` }}>
        <div style={{ width: 10, height: 46, background: "#2A2E38", borderRadius: 4, margin: "0 auto" }} />
        <div style={{ width: 30, height: 40, borderRadius: "14px 14px 12px 12px", background: "linear-gradient(160deg,#3A404C,#20242E)", border: "2px solid #4A5160", marginTop: -50, boxShadow: `0 0 ${8 + point * 10}px ${hexA(CO, 0.35)}` }} />
      </div>
      {/* a pulse where the host's finger taps the REC chip */}
      {poke > 0.03 && (
        <div style={{ position: "absolute", left: 452, top: 224, zIndex: 41, transform: "translate(-50%,-50%)", width: 30 + poke * 26, height: 30 + poke * 26, borderRadius: "50%", border: `3px solid ${RED}`, opacity: 0.5 * poke, pointerEvents: "none" }} />
      )}
      {/* HOST (glasses + suit) peeking from the LEFT edge, reaching in to POKE the recording chip */}
      <div style={{ position: "absolute", left: -6, top: 214, zIndex: 40, transform: `rotate(${2 + point * 3 + poke * 2}deg)`, transformOrigin: "70% 90%" }}>
        <Mascot lf={f} size={150} gaze={5} nodAmp={nodBoost} nodSpeed={6.5} shock={shockHost} cheer={cheerHost * 0.5} glasses={1} suit={1} tint="#D97757" />
      </div>
      <PointArm x={118} y={302} len={315} ang={-13} c="#D97757" poke={poke} />
      {/* CO-HOST (afro + tweed blazer) peeking from the RIGHT edge, pointing up at the LIVE WAVEFORM */}
      <div style={{ position: "absolute", right: -10, top: 300, zIndex: 40, transform: `rotate(${-(2 + point * 3) - pokeB * 2}deg)`, transformOrigin: "30% 90%" }}>
        <Mascot lf={f} size={140} gaze={-5} nodAmp={nodBoost + 1.2} nodSpeed={6} shock={shockSide} cheer={cheerSide} fro={1} prof={1} tint="#C96442" />
      </div>
      <PointArm x={868} y={360} len={72} ang={-99} c="#C96442" poke={pokeB} sleeve="#6E5A3C" />
      {/* HOST speech bubble (top-left, clear of the right-aligned prompt + the transcript) */}
      {bubbleIn > 0.02 && (
        <div style={{ position: "absolute", left: 36, top: 150, zIndex: 42, opacity: bubbleIn, transform: `translateY(${(1 - bubbleIn) * 10}px) rotate(-3deg) scale(${0.88 + bubbleIn * 0.12})` }}>
          <div style={{ position: "relative", padding: "8px 16px", borderRadius: 16, background: "#FAF9F5", border: `2px solid ${hexA(CO, 0.5)}`, boxShadow: "0 8px 18px rgba(0,0,0,0.28)", fontFamily: fraunces.fontFamily, fontWeight: 700, fontSize: 24, color: "#8A5A44", whiteSpace: "nowrap" }}>
            no script, baby
            <div style={{ position: "absolute", left: 24, bottom: -11, width: 0, height: 0, borderLeft: "10px solid transparent", borderRight: "10px solid transparent", borderTop: "12px solid #FAF9F5" }} />
          </div>
        </div>
      )}
      {/* CO-HOST speech bubble (top-right margin, over empty chrome, off the transcript) */}
      {bubble2In > 0.02 && (
        <div style={{ position: "absolute", right: 24, top: 194, zIndex: 42, opacity: bubble2In, transform: `translateY(${(1 - bubble2In) * 10}px) rotate(3deg) scale(${0.88 + bubble2In * 0.12})` }}>
          <div style={{ position: "relative", padding: "8px 16px", borderRadius: 16, background: "#FAF9F5", border: `2px solid ${hexA(GREEN, 0.55)}`, boxShadow: "0 8px 18px rgba(0,0,0,0.28)", fontFamily: fraunces.fontFamily, fontWeight: 700, fontSize: 24, color: "#2E7B58", whiteSpace: "nowrap" }}>
            zero robot!
            <div style={{ position: "absolute", right: 26, bottom: -11, width: 0, height: 0, borderLeft: "10px solid transparent", borderRight: "10px solid transparent", borderTop: "12px solid #FAF9F5" }} />
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};

export const ClaudeRec: React.FC = () => {
  const f = useCurrentFrame();
  return (<AbsoluteFill><Bg /><ProgressBar /><SectionHeader f={f} badge="🎙️" l1={<>ASK FOR A</>} l2={<span style={{ color: CLAY }}>VOICEMAIL</span>} /><Panel><ClaudeDeskApp /></Panel><CaptionLine words={["ask", "for", "a", "VOICEMAIL"]} hot={3} top={1240} /></AbsoluteFill>);
};
