import React from "react";
import { AbsoluteFill, useCurrentFrame, Easing } from "remotion";
import { inter, fraunces } from "./fonts";
import {
  Bg, ProgressBar, Panel, CaptionLine, Mascot,
  ClaudeSpark, TrafficLights, grad, hexA, over,
  CO, GOLD, RED, SKY, APP_BG, APP_INK, APP_LINE,
} from "./SlopKit";

/* =========================================================================
   SCENE 3 · SETTING: a warm cozy HOME-OFFICE DESK NOOK at night.
   Far bg  : night window with city bokeh + a warm wall, a shelf with the
             recurring cold grey AI-SLOP robot sidelined and dim.
   Mid     : wood desk plane, a warm desk lamp pooling light, a potted plant,
             a steaming coffee, stuck sticky notes.
   Near    : an open LAPTOP screen-recording the Claude app (user asks for a
             90-second voicemail, Claude rambles a warm human reply) and the
             clay Mascot standing beside it, pointing right at the screen.
   No text stamps or banners: the caption carries the words.
   ========================================================================= */

// the compact Claude app that lives on the laptop screen (native laptop-res, crisp)
const LaptopApp: React.FC<{ f: number }> = ({ f }) => {
  const start = 26;
  const cpf = 1.7;
  const budget = Math.max(0, Math.floor((f - start) * cpf));
  const reply =
    "umm ok so, what you actually wanted to say... look, most folks just make it write the thing, and yeah it comes out clean but it sounds like a robot, so, don't. here is the bit that worked for me...";
  const shown = reply.slice(0, budget);
  const bars = 34;
  return (
    <div style={{ position: "absolute", inset: 0, background: APP_BG, fontFamily: inter.fontFamily }}>
      {/* window bar */}
      <div style={{ height: 30, background: "#EDE9DF", display: "flex", alignItems: "center", borderBottom: `1px solid ${APP_LINE}` }}>
        <div style={{ transform: "scale(0.62)", transformOrigin: "left center" }}><TrafficLights pad={16} /></div>
      </div>
      <div style={{ padding: "18px 22px" }}>
        {/* user prompt bubble */}
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 16 }}>
          <div style={{ maxWidth: 360, background: "#EFEAE0", border: `1px solid ${APP_LINE}`, borderRadius: "14px 14px 3px 14px", padding: "11px 15px", fontSize: 17, lineHeight: 1.45, color: APP_INK }}>
            Leave me a <b>90-second voicemail</b> explaining what I wanted to say.
          </div>
        </div>
        {/* claude rambling reply */}
        <div style={{ display: "flex", gap: 11 }}>
          <div style={{ marginTop: 3, flexShrink: 0 }}><ClaudeSpark s={26} /></div>
          <div style={{ flex: 1 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "#F1E9DC", borderRadius: 999, padding: "5px 12px", marginBottom: 11 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: RED, boxShadow: `0 0 6px ${RED}`, opacity: 0.55 + 0.45 * Math.abs(Math.sin(f / 5)) }} />
              <span style={{ fontWeight: 700, fontSize: 15, color: "#8A5A44" }}>recording voicemail · 0:{String(Math.min(90, 12 + Math.floor(f / 2))).padStart(2, "0")}</span>
            </div>
            {/* live waveform */}
            <svg width={392} height={44} style={{ display: "block", marginBottom: 12 }}>
              {Array.from({ length: bars }, (_, i) => {
                const live = i < (f - start) * 0.9;
                const h = 5 + Math.abs(Math.sin(i * 0.7 + f / 4)) * (live ? 32 : 4);
                return <rect key={i} x={i * 11} y={22 - h / 2} width={5} height={h} rx={2.5} fill={live ? CO : "#E0D8C8"} />;
              })}
            </svg>
            <p style={{ fontFamily: fraunces.fontFamily, fontSize: 20, lineHeight: 1.5, color: APP_INK, margin: 0 }}>
              {shown}
              <span style={{ opacity: (f % 16) < 9 ? 1 : 0, color: CO }}>▍</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Scene3: React.FC = () => {
  const f = useCurrentFrame();

  // gentle staged entrances (everything animates off f)
  const rise = over(f, 0, 12, Easing.out(Easing.cubic));
  const propIn = over(f, 6, 14, Easing.out(Easing.cubic));
  const lampFlick = 0.82 + 0.18 * Math.abs(Math.sin(f / 34) * Math.sin(f / 11));
  const steam = (i: number) => Math.sin(f / 9 + i * 1.7) * 7;
  const pointPulse = 0.5 + 0.5 * Math.abs(Math.sin(f / 7));

  return (
    <AbsoluteFill>
      <Bg />
      <ProgressBar />
      <Panel glow={hexA(GOLD, 0.22)} pushIn>
        {/* ---------------- FAR BG: warm night wall ---------------- */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,#241D1A 0%,#1C1512 46%,#140F0C 100%)" }} />
        {/* soft warm ambient from the lamp, upper-right */}
        <div style={{ position: "absolute", right: -60, top: -40, width: 720, height: 720, borderRadius: "50%", background: `radial-gradient(circle, ${hexA(GOLD, 0.24 * lampFlick)}, transparent 62%)`, filter: "blur(8px)" }} />
        {/* cool moonlight from the window, upper-left */}
        <div style={{ position: "absolute", left: -40, top: -30, width: 560, height: 560, borderRadius: "50%", background: `radial-gradient(circle, ${hexA(SKY, 0.16)}, transparent 60%)`, filter: "blur(10px)" }} />

        {/* ---------------- NIGHT WINDOW ---------------- */}
        <div style={{ position: "absolute", left: 66, top: 46, width: 452, height: 250, borderRadius: 10, background: "linear-gradient(180deg,#0C1424 0%,#122036 58%,#1A2C46 100%)", border: "10px solid #2C231D", boxShadow: "inset 0 0 40px rgba(0,0,0,0.55), 0 10px 26px rgba(0,0,0,0.4)", overflow: "hidden", opacity: rise }}>
          {/* distant city silhouette */}
          {[[10, 150, 44, 90], [58, 120, 34, 120], [96, 168, 40, 72], [140, 100, 30, 140], [176, 158, 46, 82], [226, 128, 32, 112], [262, 176, 42, 64], [308, 112, 36, 128], [352, 150, 40, 90], [396, 168, 46, 72]].map((b, i) => (
            <div key={i} style={{ position: "absolute", left: b[0], top: b[1], width: b[2], height: b[3], background: "linear-gradient(180deg,#0A1220,#0E1A2C)" }}>
              {/* lit windows */}
              {Array.from({ length: 6 }, (_, k) => (
                <div key={k} style={{ position: "absolute", left: 5 + (k % 2) * 15, top: 8 + Math.floor(k / 2) * 20, width: 7, height: 9, background: (i * 3 + k) % 4 === 0 ? GOLD : "#2A3A54", opacity: 0.8 }} />
              ))}
            </div>
          ))}
          {/* city bokeh */}
          {Array.from({ length: 26 }, (_, i) => {
            const bx = (i * 61) % 430 + 8;
            const by = (i * 43) % 170 + 12;
            const tw = 0.4 + 0.6 * Math.abs(Math.sin(f / 12 + i));
            const c = i % 3 === 0 ? GOLD : i % 3 === 1 ? SKY : "#F6E4A0";
            return <div key={i} style={{ position: "absolute", left: bx, top: by, width: 10, height: 10, borderRadius: "50%", background: c, filter: "blur(2px)", opacity: 0.5 * tw }} />;
          })}
          {/* mullions */}
          <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 8, background: "#2C231D", transform: "translateX(-50%)" }} />
          <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: 8, background: "#2C231D", transform: "translateY(-50%)" }} />
        </div>

        {/* sticky notes stuck on the wall beside the window */}
        {[["#F6D869", 548, 70, -6], ["#8FD3B0", 566, 150, 5], ["#F3A6B4", 542, 224, -3]].map((s, i) => (
          <div key={i} style={{ position: "absolute", left: s[1] as number, top: (s[2] as number) - (1 - propIn) * 14, width: 66, height: 66, background: s[0] as string, transform: `rotate(${s[3]}deg)`, boxShadow: "0 6px 12px rgba(0,0,0,0.35)", opacity: propIn }}>
            <div style={{ position: "absolute", left: 10, top: 16, right: 10, height: 4, borderRadius: 2, background: "rgba(0,0,0,0.22)" }} />
            <div style={{ position: "absolute", left: 10, top: 28, right: 20, height: 4, borderRadius: 2, background: "rgba(0,0,0,0.16)" }} />
            <div style={{ position: "absolute", left: 10, top: 40, right: 28, height: 4, borderRadius: 2, background: "rgba(0,0,0,0.16)" }} />
          </div>
        ))}

        {/* far shelf (top-right) with the sidelined cold grey AI-SLOP robot */}
        <div style={{ position: "absolute", left: 700, top: 150, width: 250, height: 14, background: "linear-gradient(180deg,#3A2E26,#241C16)", borderRadius: 3, boxShadow: "0 8px 14px rgba(0,0,0,0.4)", opacity: rise }} />
        <div style={{ position: "absolute", left: 760, top: 34, opacity: 0.5 * rise, filter: "grayscale(1) brightness(0.8)" }}>
          <Mascot lf={f * 0.4} size={116} tint="#8E8A80" stern={1} nodAmp={0} nodSpeed={40} gaze={0} />
        </div>
        {/* its cold antenna bulb (the recurring robot cue) */}
        <div style={{ position: "absolute", left: 816, top: 40, width: 12, height: 12, borderRadius: "50%", background: "#61E0FF", boxShadow: "0 0 10px #61E0FF", opacity: (0.3 + 0.5 * Math.abs(Math.sin(f / 6))) * rise }} />

        {/* ---------------- DESK PLANE ---------------- */}
        <div style={{ position: "absolute", left: 0, right: 0, top: 486, bottom: 0, background: "linear-gradient(180deg,#5A3E28 0%,#4A3120 8%,#3A2617 100%)" }}>
          {/* front lip highlight */}
          <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 5, background: "rgba(255,220,170,0.28)" }} />
          {/* wood grain streaks */}
          {[26, 88, 150, 214, 278].map((y, i) => (
            <div key={i} style={{ position: "absolute", left: 0, right: 0, top: y, height: 2, background: "rgba(0,0,0,0.16)", opacity: 0.7 }} />
          ))}
          {/* warm pool of lamp light on the desk */}
          <div style={{ position: "absolute", right: 40, top: -10, width: 520, height: 260, borderRadius: "50%", background: `radial-gradient(ellipse, ${hexA(GOLD, 0.2 * lampFlick)}, transparent 62%)`, filter: "blur(6px)" }} />
        </div>

        {/* ---------------- DESK LAMP (right) ---------------- */}
        <div style={{ position: "absolute", left: 812, top: 250, opacity: rise }}>
          {/* base */}
          <div style={{ position: "absolute", left: 26, top: 236, width: 96, height: 16, borderRadius: 8, background: "linear-gradient(180deg,#3A3540,#22202A)", boxShadow: "0 8px 14px rgba(0,0,0,0.4)" }} />
          {/* arm */}
          <div style={{ position: "absolute", left: 70, top: 96, width: 8, height: 150, background: "#2E2B34", transform: "rotate(9deg)", transformOrigin: "bottom center" }} />
          <div style={{ position: "absolute", left: 42, top: 60, width: 8, height: 92, background: "#2E2B34", transform: "rotate(-40deg)", transformOrigin: "bottom center" }} />
          {/* head */}
          <div style={{ position: "absolute", left: 8, top: 44, width: 72, height: 40, borderRadius: "40px 40px 8px 8px", background: "linear-gradient(160deg,#4A4550,#2A2732)", transform: "rotate(28deg)", boxShadow: `0 0 26px ${hexA(GOLD, 0.5 * lampFlick)}` }} />
          {/* glowing bulb */}
          <div style={{ position: "absolute", left: 30, top: 78, width: 26, height: 26, borderRadius: "50%", background: GOLD, filter: "blur(2px)", boxShadow: `0 0 30px ${hexA(GOLD, 0.9 * lampFlick)}`, opacity: lampFlick }} />
        </div>

        {/* ---------------- POTTED PLANT (front left) ---------------- */}
        <div style={{ position: "absolute", left: 44, top: 396 - (1 - propIn) * 20, opacity: propIn }}>
          {/* leaves */}
          <svg width={200} height={210} style={{ position: "absolute", left: -18, top: -6 }}>
            {[[70, 190, -34, 150], [88, 190, 0, 176], [106, 190, 30, 150], [58, 190, -58, 120], [118, 190, 56, 118]].map((L, i) => {
              const sway = Math.sin(f / 22 + i) * 3;
              return <g key={i} transform={`rotate(${(L[2] as number) + sway} ${L[0]} ${L[1]})`}>
                <ellipse cx={L[0] as number} cy={(L[1] as number) - (L[3] as number) / 2} rx={16} ry={(L[3] as number) / 2} fill={i % 2 ? "#2F7A52" : "#3F9E74"} />
              </g>;
            })}
          </svg>
          {/* pot */}
          <div style={{ position: "absolute", left: 32, top: 150, width: 108, height: 96, borderRadius: "10px 10px 16px 16px", background: "linear-gradient(180deg,#C46A44,#9C4E2C)", boxShadow: "0 12px 20px rgba(0,0,0,0.4)" }}>
            <div style={{ position: "absolute", left: -6, right: -6, top: 0, height: 20, borderRadius: 8, background: "#D2724E" }} />
          </div>
        </div>

        {/* ---------------- LAPTOP (center hero) ---------------- */}
        <div style={{ position: "absolute", left: 0, top: 0, right: 0, bottom: 0, transform: `translateY(${(1 - rise) * 26}px)`, opacity: rise }}>
          {/* screen bezel */}
          <div style={{ position: "absolute", left: 250, top: 150, width: 516, height: 352, borderRadius: 16, background: "linear-gradient(160deg,#20222A,#111319)", border: "3px solid #33363F", boxShadow: `0 26px 48px rgba(0,0,0,0.5), 0 0 46px ${hexA(SKY, 0.14)}`, padding: 13 }}>
            {/* camera dot */}
            <div style={{ position: "absolute", left: "50%", top: 5, width: 6, height: 6, borderRadius: "50%", background: "#3A3D46", transform: "translateX(-50%)" }} />
            {/* the recorded app */}
            <div style={{ position: "relative", width: "100%", height: "100%", borderRadius: 7, overflow: "hidden", boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.05)" }}>
              <LaptopApp f={f} />
              {/* screen sheen */}
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(120deg,rgba(255,255,255,0.10) 0%,transparent 30%)", pointerEvents: "none" }} />
            </div>
          </div>
          {/* laptop deck (keyboard base) */}
          <div style={{ position: "absolute", left: 210, top: 502, width: 596, height: 66, clipPath: "polygon(8% 0%, 92% 0%, 100% 100%, 0% 100%)", background: "linear-gradient(180deg,#C8CBD2,#9AA0AB)", boxShadow: "0 16px 26px rgba(0,0,0,0.45)" }}>
            {/* hinge */}
            <div style={{ position: "absolute", left: "10%", right: "10%", top: 0, height: 5, background: "#6A6F7A" }} />
            {/* trackpad */}
            <div style={{ position: "absolute", left: "50%", bottom: 7, transform: "translateX(-50%)", width: 150, height: 20, borderRadius: 5, background: "#B4B8C0", border: "1px solid #9096A0" }} />
            {/* key hint rows */}
            {[16, 28].map((y, r) => (
              <div key={r} style={{ position: "absolute", left: "24%", right: "24%", top: y, height: 6, display: "flex", gap: 4 }}>
                {Array.from({ length: 12 }, (_, k) => <div key={k} style={{ flex: 1, background: "#8A909B", borderRadius: 1.5 }} />)}
              </div>
            ))}
          </div>
        </div>

        {/* ---------------- COFFEE MUG (front, steaming) ---------------- */}
        <div style={{ position: "absolute", left: 150, top: 560 - (1 - propIn) * 16, opacity: propIn }}>
          {/* steam */}
          <svg width={90} height={90} style={{ position: "absolute", left: 8, top: -74 }}>
            {[0, 1, 2].map((i) => (
              <path key={i} d={`M ${20 + i * 22} 84 C ${20 + i * 22 + steam(i)} 60, ${20 + i * 22 - steam(i)} 40, ${20 + i * 22 + steam(i)} 8`} fill="none" stroke="rgba(255,245,225,0.35)" strokeWidth={5} strokeLinecap="round" />
            ))}
          </svg>
          {/* mug */}
          <div style={{ position: "absolute", left: 0, top: 0, width: 88, height: 78, borderRadius: "10px 10px 18px 18px", background: "linear-gradient(180deg,#EDE9DF,#C9C3B4)", boxShadow: "0 12px 20px rgba(0,0,0,0.4)" }}>
            <div style={{ position: "absolute", left: 10, top: 8, right: 10, height: 14, borderRadius: 8, background: "#5A3A28" }} />
          </div>
          {/* handle */}
          <div style={{ position: "absolute", left: 82, top: 20, width: 30, height: 34, borderRadius: "0 16px 16px 0", border: "9px solid #D6D0C2", borderLeft: "none" }} />
        </div>

        {/* ---------------- MASCOT pointing at the screen ---------------- */}
        <div style={{ position: "absolute", left: 786, top: 336 + (1 - rise) * 30, opacity: rise }}>
          <Mascot lf={f} size={214} gaze={-5} nodAmp={2.4} nodSpeed={9} cheer={0.16} />
        </div>
        {/* pointing arm reaching toward the laptop screen */}
        <div style={{ position: "absolute", left: 690, top: 402, transform: `rotate(${-16 - pointPulse * 4}deg)`, transformOrigin: "right center", opacity: rise }}>
          <div style={{ width: 132, height: 26, borderRadius: 13, background: grad("#E29070", "#C96442"), boxShadow: "0 5px 12px rgba(0,0,0,0.3)" }} />
          {/* pointing finger tip */}
          <div style={{ position: "absolute", left: -14, top: 1, width: 24, height: 24, borderRadius: "50%", background: "#E29070", boxShadow: "0 4px 8px rgba(0,0,0,0.3)" }} />
        </div>
        {/* soft look-here glow on the screen where the finger points */}
        <div style={{ position: "absolute", left: 640, top: 372, width: 120, height: 120, borderRadius: "50%", background: `radial-gradient(circle, ${hexA(GOLD, 0.35 * pointPulse)}, transparent 68%)`, filter: "blur(3px)", opacity: rise }} />

        {/* gentle vignette to seat the nook */}
        <div style={{ position: "absolute", inset: 0, boxShadow: "inset 0 0 130px rgba(0,0,0,0.5)", pointerEvents: "none" }} />
      </Panel>

      <CaptionLine words={["ask", "for", "a", "VOICEMAIL"]} hot={3} top={1240} />
    </AbsoluteFill>
  );
};
