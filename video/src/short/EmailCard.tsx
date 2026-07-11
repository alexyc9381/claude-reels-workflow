import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONT } from "../brand";

const NAVY = COLORS.navy;
const BLUE = COLORS.logoBlue;

// typewriter reveal of a string by character over [start, start+dur] local frames
const useType = (text: string, start: number, dur: number) => {
  const frame = useCurrentFrame();
  const t = interpolate(frame, [start, start + dur], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const n = Math.round(t * text.length);
  return { shown: text.slice(0, n), done: n >= text.length, started: frame >= start };
};

const Pill: React.FC<{ children: React.ReactNode; on?: boolean }> = ({ children, on = true }) => (
  <span style={{ background: on ? "rgba(36,64,189,0.14)" : "transparent", color: on ? BLUE : NAVY, fontWeight: 800, borderRadius: 8, padding: "1px 9px", boxDecorationBreak: "clone", WebkitBoxDecorationBreak: "clone" }}>{children}</span>
);

const NumBadge: React.FC<{ n: number; show: number }> = ({ n, show }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - show, fps, config: { damping: 140, stiffness: 160, mass: 0.6 } });
  return (
    <div style={{ width: 52, height: 52, borderRadius: 16, background: BLUE, color: "#fff", fontFamily: FONT.sans, fontWeight: 900, fontSize: 28, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transform: `scale(${interpolate(s, [0, 1], [0, 1])})`, boxShadow: "0 6px 16px rgba(36,64,189,0.4)" }}>{n}</div>
  );
};

const Row: React.FC<{ show: number; children: React.ReactNode; badge?: number }> = ({ show, children, badge }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - show, fps, config: { damping: 160, stiffness: 150, mass: 0.7 } });
  if (frame < show) return null;
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 18, opacity: interpolate(s, [0, 1], [0, 1]), transform: `translateY(${interpolate(s, [0, 1], [18, 0])}px)` }}>
      {badge != null && <NumBadge n={badge} show={show} />}
      <div style={{ flex: 1, fontFamily: FONT.sans, fontWeight: 600, fontSize: 36, lineHeight: 1.28, color: NAVY }}>{children}</div>
    </div>
  );
};

const Cursor: React.FC<{ on: boolean }> = ({ on }) => {
  const frame = useCurrentFrame();
  if (!on) return null;
  return <span style={{ opacity: frame % 16 < 8 ? 1 : 0, color: BLUE, fontWeight: 700 }}>|</span>;
};

// Reveal frames (LOCAL to the card sequence, which starts ~4.4s in)
const SUBJECT_AT = 6;
const LINE1_AT = 134;
const LINE2_AT = 263;
const LINE3_AT = 430;
const COUNTER_AT = 556;

export const EmailCard: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({ frame, fps, config: { damping: 150, stiffness: 120, mass: 0.8 } });
  const y = interpolate(enter, [0, 1], [80, 0]);
  const op = interpolate(enter, [0, 1], [0, 1]);

  const subj = useType("High school student, free help, 3 hrs/week", SUBJECT_AT, 95);

  return (
    <AbsoluteFill style={{ justifyContent: "flex-start", alignItems: "center", paddingTop: 350 }}>
      <div style={{ width: 960, transform: `translateY(${y}px)`, opacity: op, background: "#ffffff", borderRadius: 34, boxShadow: "0 30px 80px rgba(0,0,0,0.45)", overflow: "hidden", border: "1px solid rgba(0,0,0,0.06)" }}>
        {/* app top bar */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 28px", background: "#f6f7f9", borderBottom: "1px solid #e9edf2" }}>
          <span style={{ fontFamily: FONT.sans, fontWeight: 700, fontSize: 26, color: "#8a94a3" }}>Cancel</span>
          <span style={{ fontFamily: FONT.sans, fontWeight: 800, fontSize: 28, color: NAVY }}>New Message</span>
          <div style={{ width: 46, height: 46, borderRadius: 23, background: BLUE, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#fff"><path d="M2 21l21-9L2 3v7l15 2-15 2z" /></svg>
          </div>
        </div>
        <div style={{ padding: "8px 30px" }}>
          {/* To */}
          <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px 0", borderBottom: "1px solid #eef1f5" }}>
            <span style={{ fontFamily: FONT.sans, fontWeight: 600, fontSize: 30, color: "#9aa3b1", width: 96 }}>To:</span>
            <div style={{ display: "flex", alignItems: "center", gap: 12, background: "#eef2fb", borderRadius: 24, padding: "8px 16px 8px 8px" }}>
              <div style={{ width: 44, height: 44, borderRadius: 22, background: NAVY, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FONT.serif, fontWeight: 800, fontSize: 22 }}>R</div>
              <span style={{ fontFamily: FONT.sans, fontWeight: 700, fontSize: 30, color: NAVY }}>Prof. Reed</span>
            </div>
          </div>
          {/* Subject */}
          <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px 0", borderBottom: "1px solid #eef1f5", minHeight: 40 }}>
            <span style={{ fontFamily: FONT.sans, fontWeight: 600, fontSize: 30, color: "#9aa3b1", width: 96 }}>Subject:</span>
            <span style={{ fontFamily: FONT.sans, fontWeight: 800, fontSize: 31, color: NAVY }}>
              {subj.shown}<Cursor on={subj.started && !subj.done} />
            </span>
          </div>
          {/* Body */}
          <div style={{ display: "flex", flexDirection: "column", gap: 22, padding: "26px 0 30px" }}>
            <Row show={LINE1_AT} badge={1}>
              I read <Pill>your paper</Pill> from the <Pill>Reed Lab</Pill>.
            </Row>
            <Row show={LINE2_AT} badge={2}>
              I can help with <Pill>coding</Pill>, <Pill>data</Pill>, or <Pill>lab work</Pill>.
            </Row>
            <Row show={LINE3_AT} badge={3}>
              Could I get <Pill>15 minutes</Pill>, not a position?
            </Row>
          </div>
          {/* sentence counter */}
          {frame >= COUNTER_AT && (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, padding: "14px 0 22px" }}>
              <div style={{ background: "rgba(31,158,71,0.12)", border: `2px solid ${COLORS.checkGreen}`, borderRadius: 16, padding: "10px 22px", display: "flex", alignItems: "center", gap: 10 }}>
                <svg width="30" height="30" viewBox="0 0 24 24"><circle cx="12" cy="12" r="11" fill={COLORS.checkGreen} /><path d="M7 12.5l3.2 3.2L17 8.8" stroke="#fff" strokeWidth="2.6" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
                <span style={{ fontFamily: FONT.sans, fontWeight: 800, fontSize: 30, color: COLORS.checkGreen }}>Under 6 sentences</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </AbsoluteFill>
  );
};
