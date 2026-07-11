import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONT } from "../brand";

const NAVY = COLORS.navy;
const BLUE = COLORS.logoBlue;
const W: React.CSSProperties = { fontFamily: FONT.sans, color: "#fff" };

const useExit = (dur: number, len = 8) => {
  const f = useCurrentFrame();
  return interpolate(f, [dur - len, dur], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
};

// bottom edge sits in the upper-third (short graphics: not too high, not hugging his head)
const TopZone: React.FC<{ children: React.ReactNode; pb?: number }> = ({ children, pb = 1080 }) => (
  <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: pb }}>{children}</AbsoluteFill>
);

// HOOK — "the cold email that got a 16-year-old into a research lab"
export const HookGraphic: React.FC<{ dur: number }> = ({ dur }) => {
  // Header is fully present from frame 0 (no animate-in). Only fades out at the end.
  const exit = useExit(dur);
  return (
    <TopZone>
      <div style={{ textAlign: "center", opacity: exit }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 14, background: BLUE, borderRadius: 18, padding: "12px 26px", marginBottom: 22 }}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="#fff"><path d="M3 6l9 6 9-6" fill="none" stroke="#fff" strokeWidth="2" /><path d="M3 5h18v14H3z" fill="none" stroke="#fff" strokeWidth="2" /></svg>
          <span style={{ ...W, fontWeight: 900, fontSize: 40, letterSpacing: 1 }}>THE COLD EMAIL</span>
        </div>
        <div style={{ background: "rgba(3,46,88,0.92)", borderRadius: 28, padding: "28px 40px", boxShadow: "0 24px 60px rgba(0,0,0,0.5)" }}>
          <div style={{ ...W, fontWeight: 700, fontSize: 38, opacity: 0.9 }}>that got a</div>
          <div style={{ ...W, fontWeight: 900, fontSize: 150, lineHeight: 1, color: COLORS.boxFill }}>16</div>
          <div style={{ ...W, fontWeight: 800, fontSize: 46 }}>year-old into a</div>
          <div style={{ ...W, fontWeight: 900, fontSize: 52, color: COLORS.boxFill }}>research lab</div>
        </div>
      </div>
    </TopZone>
  );
};

// EMAIL 20, NOT 2
export const TwentyProfs: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const exit = useExit(dur);
  const cols = 5, rows = 4, total = 20;
  return (
    <TopZone>
      <div style={{ textAlign: "center", opacity: exit }}>
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols},1fr)`, gap: 20, marginBottom: 28 }}>
          {Array.from({ length: total }).map((_, i) => {
            const op = interpolate(frame, [2 + i * 1.4, 8 + i * 1.4], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            const sc = interpolate(frame, [2 + i * 1.4, 10 + i * 1.4], [0.4, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            return (
              <div key={i} style={{ width: 92, height: 92, borderRadius: 22, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", opacity: op, transform: `scale(${sc})`, boxShadow: "0 10px 24px rgba(0,0,0,0.3)" }}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke={BLUE} strokeWidth="2"><path d="M3 6h18v12H3z" /><path d="M3 7l9 6 9-6" /></svg>
              </div>
            );
          })}
        </div>
        <div style={{ display: "inline-block", background: "rgba(3,46,88,0.92)", borderRadius: 18, padding: "14px 30px", boxShadow: "0 18px 50px rgba(0,0,0,0.45)" }}>
          <span style={{ ...W, fontWeight: 900, fontSize: 64 }}>
            EMAIL <span style={{ color: COLORS.boxFill }}>20</span>, NOT <span style={{ color: "#ff8a8a", textDecoration: "line-through" }}>2</span>
          </span>
        </div>
      </div>
    </TopZone>
  );
};

// CTA — comment "research"
export const CTAComment: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 140, stiffness: 140, mass: 0.7 } });
  const exit = useExit(dur);
  const pulse = 1 + 0.03 * Math.sin(frame / 6);
  return (
    <TopZone>
      <div style={{ textAlign: "center", transform: `scale(${interpolate(s, [0, 1], [0.8, 1])})`, opacity: interpolate(s, [0, 1], [0, 1]) * exit, width: 900 }}>
        <div style={{ ...W, fontWeight: 900, fontSize: 56, marginBottom: 8, textShadow: "0 4px 18px rgba(0,0,0,0.5)" }}>Comment</div>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 16, background: "#fff", borderRadius: 40, padding: "16px 16px 16px 34px", transform: `scale(${pulse})`, boxShadow: "0 18px 50px rgba(0,0,0,0.45)", marginBottom: 22 }}>
          <span style={{ fontFamily: FONT.sans, fontWeight: 900, fontSize: 58, color: BLUE }}>"research"</span>
          <div style={{ width: 70, height: 70, borderRadius: 35, background: BLUE, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="#fff"><path d="M2 21l21-9L2 3v7l15 2-15 2z" /></svg>
          </div>
        </div>
        <div style={{ ...W, fontWeight: 800, fontSize: 40, textShadow: "0 4px 18px rgba(0,0,0,0.6)" }}>and I'll send you the exact template</div>
      </div>
    </TopZone>
  );
};
