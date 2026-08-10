import React from "react";
import { AbsoluteFill } from "remotion";
import { fraunces, inter } from "./fonts";

/* =========================================================================
   @nocodealex  ·  "AI Founders Guild"  ·  LOGO
   The mark is the guild SEAL: an "AFG" monogram (same cipher engraved on the
   cover's table). Simple + bold so it survives a 128x128 Skool icon.
   GuildLogoIcon = solid tile + seal (no transparent corners).
   GuildLogoLockup = clay-ring seal badge + wordmark.
   ========================================================================= */

const CREAM = "#F3EDDE", INK = "#1A1813", CLAY = "#D97757", MUTE = "#8B8578", GOLD = "#B8934A";

/* the cream seal disc with the AFG monogram (reused at any size) */
const SealDisc: React.FC<{ d: number }> = ({ d }) => (
  <div style={{
    width: d, height: d, borderRadius: "50%", background: CREAM,
    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: d * 0.02,
    boxShadow: `inset 0 0 0 ${Math.round(d * 0.022)}px ${GOLD}, inset 0 0 0 ${Math.round(d * 0.03)}px ${CREAM}, inset 0 0 0 ${Math.round(d * 0.035)}px rgba(26,24,19,0.16), 0 ${Math.round(d * 0.02)}px ${Math.round(d * 0.05)}px rgba(80,45,22,0.26)`,
  }}>
    <div style={{ width: d * 0.05, height: d * 0.05, background: GOLD, transform: "rotate(45deg)", marginBottom: d * 0.008 }} />
    <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 700, fontSize: d * 0.34, lineHeight: 0.84, color: INK, letterSpacing: "0.015em", paddingLeft: "0.015em" }}>AFG</div>
    <div style={{ width: d * 0.36, height: Math.max(2, d * 0.004), background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`, marginTop: d * 0.006 }} />
  </div>
);

/* clay-ring badge for use on a light background */
const SealBadge: React.FC<{ d: number }> = ({ d }) => (
  <div style={{ width: d, height: d, borderRadius: "50%", background: CLAY, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 24px 54px rgba(80,45,22,0.3), inset 0 0 0 4px rgba(26,24,19,0.78)" }}>
    <SealDisc d={d * 0.84} />
  </div>
);

/* ------------------------------------------------------ square group icon */
export const GuildLogoIcon: React.FC = () => (
  <AbsoluteFill style={{ background: "radial-gradient(circle at 50% 38%, #E28C68 0%, #CD6D3C 100%)", alignItems: "center", justifyContent: "center" }}>
    <SealDisc d={848} />
  </AbsoluteFill>
);

/* ------------------------------------------------------- horizontal lockup */
export const GuildLogoLockup: React.FC = () => (
  <AbsoluteFill style={{ fontFamily: inter.fontFamily, background: "linear-gradient(152deg, #F0ECE4 0%, #E4DDD0 100%)" }}>
    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", gap: 88 }}>
      <SealBadge d={520} />
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
        <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 700, fontSize: 134, lineHeight: 0.94, letterSpacing: "0.02em", color: INK }}>AI FOUNDERS</div>
        <div style={{ display: "flex", alignItems: "center", gap: 18, marginTop: 18 }}>
          <div style={{ width: 104, height: 3, background: `linear-gradient(90deg, transparent, ${GOLD})` }} />
          <div style={{ width: 12, height: 12, background: GOLD, transform: "rotate(45deg)" }} />
          <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 600, fontSize: 52, letterSpacing: "0.46em", color: INK, paddingLeft: "0.46em" }}>GUILD</div>
          <div style={{ width: 12, height: 12, background: GOLD, transform: "rotate(45deg)" }} />
          <div style={{ width: 104, height: 3, background: `linear-gradient(90deg, ${GOLD}, transparent)` }} />
        </div>
        <div style={{ fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 24, letterSpacing: "0.36em", color: MUTE, marginTop: 20, paddingLeft: "0.36em" }}>EST · 2026</div>
      </div>
    </div>
  </AbsoluteFill>
);
