import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { fraunces, frauncesItalic, inter } from "./fonts";

const CREAM = "#ECE9E2", INK = "#1A1813", SLATE = "#3A5C84", SLATE2 = "#5C7CA8", CLAY = "#D2724E", MUTE = "#9A968B";
const eOut = (f: number, s: number, d = 10) =>
  interpolate(f, [s, s + d], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
const over = (f: number, s: number, d = 12) =>
  interpolate(f, [s, s + d * 0.55, s + d], [0, 1.08, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });

// First ~3 seconds — concrete-hero opening for the "Claude can now rebuild any website" reel.
export const WebsiteHookOpen: React.FC = () => {
  const f = useCurrentFrame();
  const hi1 = eOut(f, 2, 9), hi2 = eOut(f, 11, 9);
  const heroIn = over(f, 5, 17);
  const float = Math.sin(f / 22) * 5;
  const tag = over(f, 24, 12);
  const btn = over(f, 40, 10);
  const capW = eOut(f, 34, 8);
  return (
    <AbsoluteFill style={{ background: CREAM, fontFamily: inter.fontFamily, overflow: "hidden" }}>
      <AbsoluteFill style={{ backgroundImage: "linear-gradient(rgba(40,32,20,0.045) 1px,transparent 1px),linear-gradient(90deg,rgba(40,32,20,0.045) 1px,transparent 1px)", backgroundSize: "54px 54px" }} />
      <div style={{ position: "absolute", left: "50%", top: 1000, width: 1040, height: 1040, marginLeft: -520, marginTop: -520, borderRadius: "50%", background: "radial-gradient(circle, rgba(210,114,78,0.17) 0%, rgba(210,114,78,0) 60%)" }} />

      {/* HEADER — concrete value, clears the hero */}
      <div style={{ position: "absolute", left: 82, right: 82, top: 336, fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 80, lineHeight: 1.03, letterSpacing: "-0.03em", color: INK, textShadow: "0 2px 18px rgba(236,233,226,0.9)" }}>
        <div style={{ opacity: hi1, transform: `translateY(${(1 - hi1) * 22}px)` }}><span style={{ color: CLAY }}>Claude</span> built this</div>
        <div style={{ opacity: hi2, transform: `translateY(${(1 - hi2) * 22}px)` }}>from a screenshot.</div>
      </div>

      {/* HERO — a real, recognizable landing page that fills the frame */}
      <div style={{ position: "absolute", left: "50%", top: 612, marginLeft: -432, width: 864, opacity: Math.min(heroIn, 1), transform: `translateY(${(1 - heroIn) * 70 + float}px) scale(${0.82 + Math.min(heroIn, 1) * 0.18})`, transformOrigin: "center top" }}>
        <div style={{ background: "#fff", borderRadius: 26, overflow: "hidden", boxShadow: "0 44px 90px rgba(26,24,19,0.30), 0 0 70px rgba(210,114,78,0.10)", border: "1px solid rgba(40,32,20,0.05)" }}>
          <div style={{ height: 58, background: "#F0ECE3", display: "flex", alignItems: "center", gap: 13, padding: "0 26px" }}>
            <div style={{ width: 17, height: 17, borderRadius: "50%", background: "#E36A5C" }} />
            <div style={{ width: 17, height: 17, borderRadius: "50%", background: "#E8B44A" }} />
            <div style={{ width: 17, height: 17, borderRadius: "50%", background: "#5CB87E" }} />
            <div style={{ marginLeft: 16, flex: 1, height: 28, borderRadius: 14, background: "#fff", border: "1px solid rgba(40,32,20,0.06)" }} />
          </div>
          <div style={{ padding: "48px 46px 54px" }}>
            <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 62, lineHeight: 1.04, color: INK, letterSpacing: "-0.02em" }}>Grow revenue<br />on autopilot.</div>
            <div style={{ fontFamily: inter.fontFamily, fontWeight: 500, fontSize: 27, color: MUTE, marginTop: 22, lineHeight: 1.4 }}>The all-in-one platform trusted by 4,000+ teams to close more deals.</div>
            <div style={{ marginTop: 32, display: "inline-block", background: CLAY, color: "#fff", fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 27, padding: "19px 40px", borderRadius: 17, transform: `scale(${btn})`, transformOrigin: "left center" }}>Start free →</div>
            <div style={{ marginTop: 36, height: 220, borderRadius: 20, background: "linear-gradient(135deg,#3A5C84,#5C7CA8)" }} />
          </div>
        </div>
      </div>

      {/* $10k sticker on the hero */}
      <div style={{ position: "absolute", right: 150, top: 566, transform: `rotate(7deg) scale(${tag})`, transformOrigin: "center", background: "#2E2A24", color: "#fff", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 60, padding: "16px 32px", borderRadius: 18, boxShadow: "0 20px 38px rgba(0,0,0,0.34)", zIndex: 6 }}>$10k</div>

      {/* CAPTION */}
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 150, textAlign: "center", fontFamily: fraunces.fontFamily, fontWeight: 600, fontSize: 64, color: INK, opacity: capW, transform: `translateY(${(1 - capW) * 14}px)`, textShadow: "0 2px 16px rgba(236,233,226,0.9)" }}>
        in <span style={{ fontFamily: frauncesItalic.fontFamily, fontStyle: "italic", color: SLATE }}>five minutes</span>
      </div>
    </AbsoluteFill>
  );
};
