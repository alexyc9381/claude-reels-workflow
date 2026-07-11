import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, Easing, staticFile, Img } from "remotion";
import { fraunces, inter } from "./fonts";

// XRAY dual-screen structure TEST: two stacked panels (Fable chat / real statement) that INTERACT —
// the typed prompt fires a scan beam down into the statement panel and rows flip to FOUND.
const CREAM = "#ECE9E2", INK = "#1A1813", CLAY = "#D2724E", GOLD = "#E7B24C", GREEN = "#3F9E74", TERM = "#0E1626", TERM2 = "#0A1120";
const mono = "ui-monospace,'SF Mono',Menlo,monospace";
const fr = (s: number) => Math.round(s * 30);
const over = (f: number, start: number, dur: number, ease = Easing.out(Easing.cubic)) =>
  interpolate(f, [start, start + dur], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease });
const grad = (a: string, b: string) => `linear-gradient(158deg, ${a} 0%, ${b} 100%)`;

const PROMPT = "read my bank statements and find every subscription I'm still paying for but barely use";

export const XrayDualTest: React.FC = () => {
  const f = useCurrentFrame();
  const typed = Math.floor(over(f, fr(0.4), fr(2.2), Easing.linear) * PROMPT.length);
  const sent = over(f, fr(2.9), fr(0.25), Easing.out(Easing.back(1.6)));
  const beam = over(f, fr(3.1), fr(0.5), Easing.inOut(Easing.cubic)) * (1 - over(f, fr(5.6), fr(0.5)));
  const finds = [
    { y: 356, amt: "$23.00/mo", t: 3.5 },
    { y: 458, amt: "$14.99/mo", t: 4.3 },
    { y: 560, amt: "$9.99/mo", t: 5.1 },
  ];
  const total = finds.filter(x => f > fr(x.t) + 8).length;
  return (
    <AbsoluteFill style={{ backgroundColor: CREAM, fontFamily: inter.fontFamily }}>
      {/* mute header */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 140, textAlign: "center", zIndex: 5 }}>
        <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 62, color: INK }}>IT FINDS THE <span style={{ color: CLAY }}>MONEY</span> YOU'RE LOSING</span>
      </div>
      {/* ===== TOP SCREEN: Fable chat ===== */}
      <div style={{ position: "absolute", left: 40, right: 40, top: 300, height: 640, borderRadius: 30, background: grad(TERM, TERM2), border: "2px solid rgba(120,150,210,0.25)", boxShadow: "0 30px 60px -20px rgba(18,28,58,0.5)", overflow: "hidden", zIndex: 3 }}>
        <div style={{ position: "absolute", left: 26, top: 22, display: "flex", gap: 11 }}>{["#C44A3A", "#CF9544", "#3F9E74"].map((c, i) => <div key={i} style={{ width: 14, height: 14, borderRadius: "50%", background: c }} />)}</div>
        <div style={{ position: "absolute", left: 0, right: 0, top: 20, textAlign: "center", fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 19, color: "rgba(190,205,235,0.7)" }}>Fable 5</div>
        {/* prompt bubble typing */}
        <div style={{ position: "absolute", left: 34, right: 34, top: 90 }}>
          <div style={{ marginLeft: "auto", maxWidth: 700, padding: "20px 24px", borderRadius: 20, borderTopRightRadius: 6, background: "#22304A", border: "1px solid rgba(140,170,220,0.3)" }}>
            <span style={{ fontFamily: mono, fontSize: 26, lineHeight: 1.5, color: "#DCE7F7" }}>{PROMPT.slice(0, typed)}<span style={{ opacity: f % 16 < 8 ? 1 : 0.15, color: GOLD }}>▍</span></span>
          </div>
        </div>
        {/* Fable reply chip */}
        {sent > 0.05 && (
          <div style={{ position: "absolute", left: 34, top: 330, transform: `scale(${sent})`, transformOrigin: "0% 50%" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 12, padding: "16px 22px", borderRadius: 20, borderTopLeftRadius: 6, background: "rgba(63,158,116,0.14)", border: "1px solid rgba(63,158,116,0.45)" }}>
              <span style={{ width: 14, height: 14, borderRadius: "50%", background: GREEN, boxShadow: `0 0 10px ${GREEN}`, opacity: 0.5 + 0.5 * Math.sin(f / 4) }} />
              <span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 26, color: "#A9E3C8" }}>scanning your statements{".".repeat(1 + (Math.floor(f / 8) % 3))}</span>
            </div>
          </div>
        )}
        {/* found counter — fed BY the bottom screen */}
        {total > 0 && (
          <div style={{ position: "absolute", left: 34, top: 440, display: "inline-flex", alignItems: "center", gap: 12, padding: "14px 22px", borderRadius: 16, background: grad("#F0CB63", "#D39A2A"), boxShadow: `0 0 24px ${GOLD}88` }}>
            <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 30, color: "#3a2a05" }}>{total} forgotten subscription{total > 1 ? "s" : ""} found</span>
          </div>
        )}
      </div>
      {/* ===== INTERACTION: scan beam crossing the seam ===== */}
      {beam > 0.02 && <>
        <div style={{ position: "absolute", left: 505, top: 905, width: 70, height: interpolate(beam, [0, 1], [0, 160]), marginLeft: -35, background: `linear-gradient(180deg, ${GOLD}ee, ${GOLD}55)`, filter: "blur(4px)", zIndex: 6 }} />
        <div style={{ position: "absolute", left: 505, top: 905 + interpolate(beam, [0, 1], [0, 160]), width: 26, height: 26, marginLeft: -13, borderRadius: "50%", background: "#FFF6D8", boxShadow: `0 0 30px ${GOLD}`, zIndex: 7 }} />
      </>}
      {/* ===== BOTTOM SCREEN: the REAL (censored) statement ===== */}
      <div style={{ position: "absolute", left: 40, right: 40, top: 1050, height: 660, borderRadius: 30, background: "#fff", border: "2px solid #DDD5C6", boxShadow: "0 30px 60px -20px rgba(18,28,58,0.4)", overflow: "hidden", zIndex: 3 }}>
        <Img src={staticFile("refs/stmt_tx.png")} style={{ position: "absolute", left: -30, top: -40, width: 1060, opacity: 0.96 }} />
        {/* scan line sweeping the statement */}
        {beam > 0.02 && <div style={{ position: "absolute", left: 0, right: 0, top: interpolate((f % 40) / 40, [0, 1], [40, 600]), height: 5, background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`, boxShadow: `0 0 18px ${GOLD}`, zIndex: 5 }} />}
        {/* FOUND flags snapping onto rows */}
        {finds.map((x, i) => { const p = over(f, fr(x.t), fr(0.35), Easing.out(Easing.back(2))); if (p <= 0.02) return null; return (
          <div key={i} style={{ position: "absolute", left: 40, right: 40, top: x.y, height: 74, borderRadius: 12, border: `4px solid ${i === 0 ? CLAY : GOLD}`, background: "rgba(231,178,76,0.13)", transform: `scale(${p})`, zIndex: 4 }}>
            <div style={{ position: "absolute", right: 14, top: -22, padding: "6px 16px", borderRadius: 999, background: grad("#E9825C", "#C7541F"), boxShadow: "0 6px 14px rgba(0,0,0,0.3)", display: "flex", gap: 8, alignItems: "center" }}>
              <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 21, color: "#fff" }}>FOUND · {x.amt}</span>
            </div>
          </div>); })}
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 90, background: "linear-gradient(180deg, transparent, rgba(255,255,255,0.95))" }} />
      </div>
      {/* mascot perched on the seam looking down into the statement */}
      <div style={{ position: "absolute", left: 830, top: 962, zIndex: 8, transform: `rotate(${Math.sin(f / 12) * 3}deg)` }}>
        <svg width="92" height="92" viewBox="0 0 200 200" shapeRendering="crispEdges"><rect x={8} y={86} width={26} height={26} fill="#D97757" /><rect x={166} y={86} width={26} height={26} fill="#D97757" /><rect x={34} y={44} width={132} height={102} fill="#D97757" /><rect x={34} y={44} width={132} height={10} fill="rgba(255,255,255,0.16)" /><rect x={70} y={78} width={15} height={20} fill="#151312" /><rect x={116} y={78} width={15} height={20} fill="#151312" /><rect x={48} y={146} width={18} height={26} fill="#D97757" /><rect x={82} y={146} width={18} height={26} fill="#D97757" /><rect x={116} y={146} width={18} height={26} fill="#D97757" /><rect x={150} y={146} width={18} height={26} fill="#D97757" /></svg>
      </div>
    </AbsoluteFill>
  );
};
