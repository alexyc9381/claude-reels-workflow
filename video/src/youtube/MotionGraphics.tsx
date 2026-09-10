import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { DESIGN, premium } from "./design";
import { Claude2D } from "./Claude";

export type GraphicKind = "workflow" | "context" | "sprite";
export const Definition: React.FC<{
  term: string;
  meaning: string;
  duration: number;
  side?: "left" | "right";
  label?: string;
  anchor?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}> = ({
  term,
  meaning,
  duration,
  side = "right",
  label = "IN PLAIN ENGLISH",
  anchor,
}) => {
  const f = useCurrentFrame(),
    { fps } = useVideoConfig();
  const p = premium(f, 0, fps * 0.65),
    exit = premium(f, Math.max(fps * 0.65, duration - fps * 0.4), fps * 0.4);
  return (
    <div
      style={{
        position: "absolute",
        ...(anchor?.startsWith("top") ? { top: 64 } : { bottom: 65 }),
        [anchor?.endsWith("left")
          ? "left"
          : anchor?.endsWith("right")
            ? "right"
            : side]: 64,
        width: 1070,
        boxSizing: "border-box",
        padding: "25px 34px",
        borderRadius: 23,
        background: "rgba(255,255,255,.97)",
        boxShadow: "0 16px 65px #17203620",
        border: "1px solid #ffffff",
        opacity: p * (1 - exit),
        transform: `translateY(${(1 - p) * 24 + exit * 12}px)`,
        color: DESIGN.ink,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: 20,
          fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
        }}
      >
        <span
          style={{
            fontSize: 16,
            letterSpacing: 3,
            color: DESIGN.accent,
            fontWeight: 700,
          }}
        >
          {label}
        </span>
        <strong style={{ fontSize: 32 }}>{term}</strong>
      </div>
      <div
        style={{
          fontSize: 27,
          lineHeight: 1.35,
          marginTop: 10,
          fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
        }}
      >
        {meaning}
      </div>
    </div>
  );
};

export const MotionGraphic: React.FC<{ kind: GraphicKind; title?: string }> = ({
  kind,
  title,
}) => {
  const f = useCurrentFrame(),
    { fps } = useVideoConfig();
  const p = premium(f, 0, fps * 1.3);
  const titles = {
    workflow: "One request. Useful work.",
    context: "Give Claude the context.",
    sprite: "A small assistant. A real result.",
  };
  const sub = {
    workflow: "A clear brief becomes a plan, then a finished task.",
    context: "The right information makes the next action possible.",
    sprite: "Use the familiar character to explain what happens.",
  };
  return (
    <AbsoluteFill
      style={{
        background: DESIGN.gradient,
        fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
        color: DESIGN.ink,
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 110,
          top: 76,
          fontSize: 19,
          fontWeight: 600,
          letterSpacing: 3,
        }}
      >
        NO CODE ALEX <span style={{ color: DESIGN.muted }}> / YOUTUBE</span>
      </div>
      <div
        style={{
          position: "absolute",
          left: 110,
          top: 178,
          opacity: p,
          transform: `translateY(${(1 - p) * 22}px)`,
        }}
      >
        <h1
          style={{
            fontSize: 76,
            letterSpacing: -3,
            fontWeight: 650,
            margin: 0,
          }}
        >
          {title ?? titles[kind]}
        </h1>
        <p style={{ fontSize: 27, color: DESIGN.muted, marginTop: 20 }}>
          {sub[kind]}
        </p>
      </div>
      <div
        style={{
          position: "absolute",
          left: 130,
          top: 407,
          width: 1660,
          height: 540,
          transform: `scale(${0.975 + 0.025 * p})`,
        }}
      >
        {kind === "workflow" &&
          ["Brief", "Plan", "Result"].map((label, i) => {
            const q = premium(f, fps * (0.3 + i * 0.85), fps * 0.9);
            return (
              <React.Fragment key={label}>
                {i > 0 && (
                  <div
                    style={{
                      position: "absolute",
                      left: i * 566 - 100,
                      top: 230,
                      width: 115,
                      height: 2,
                      background: "#aeb7c7",
                      transform: `scaleX(${q})`,
                      transformOrigin: "left",
                    }}
                  />
                )}
                <div
                  style={{
                    position: "absolute",
                    left: i * 566,
                    top: (1 - q) * 35,
                    width: 470,
                    height: 440,
                    borderRadius: 32,
                    background: "linear-gradient(140deg,#ffffffed,#ffffff88)",
                    border: "1px solid white",
                    boxShadow: "0 25px 50px #3d496b15",
                    opacity: q,
                    padding: 38,
                    boxSizing: "border-box",
                  }}
                >
                  <div
                    style={{
                      fontSize: 17,
                      color: DESIGN.muted,
                      letterSpacing: 2,
                    }}
                  >
                    0{i + 1}
                  </div>
                  <h2 style={{ fontSize: 39, margin: "22px 0" }}>{label}</h2>
                  {i === 0 ? (
                    <>
                      <div style={{ fontSize: 26, lineHeight: 1.5 }}>
                        Summarize the research.
                        <br />
                        Show the evidence.
                        <br />
                        Draft the next step.
                      </div>
                      <div
                        style={{
                          marginTop: 30,
                          fontSize: 18,
                          color: DESIGN.accent,
                        }}
                      >
                        A specific request →
                      </div>
                    </>
                  ) : i === 1 ? (
                    <>
                      {[
                        "Read the sources",
                        "Compare the findings",
                        "Build the answer",
                      ].map((text, j) => (
                        <div
                          key={text}
                          style={{
                            fontSize: 23,
                            marginTop: 19,
                            opacity: premium(
                              f,
                              fps * (1.3 + j * 0.23),
                              fps * 0.5,
                            ),
                          }}
                        >
                          <span style={{ color: DESIGN.accent }}>✓</span> {text}
                        </div>
                      ))}
                    </>
                  ) : (
                    <>
                      <div style={{ fontSize: 60, color: "#51826d" }}>✓</div>
                      <div style={{ fontSize: 27 }}>Ready for your review.</div>
                      <div
                        style={{
                          marginTop: 23,
                          height: 8,
                          width: "90%",
                          borderRadius: 8,
                          background: "#dfe9e3",
                        }}
                      />
                    </>
                  )}
                </div>
              </React.Fragment>
            );
          })}
        {kind === "context" && (
          <>
            {["Your brief", "Your files", "Your rules"].map((s, i) => {
              const q = premium(f, fps * (0.2 + i * 0.25), fps * 0.9);
              return (
                <div
                  key={s}
                  style={{
                    position: "absolute",
                    left: 50 + q * 120,
                    top: i * 153,
                    width: 400,
                    padding: 27,
                    background: "#ffffffc9",
                    border: "1px solid white",
                    borderRadius: 22,
                    fontSize: 29,
                    opacity: q,
                    boxShadow: "0 12px 35px #33445a12",
                  }}
                >
                  {s}
                  <span style={{ float: "right", color: DESIGN.accent }}>
                    ↗
                  </span>
                </div>
              );
            })}
            <div
              style={{
                position: "absolute",
                left: 715,
                top: 35,
                width: 700,
                height: 420,
                borderRadius: 40,
                background: "#fbfcfd",
                boxShadow: "0 30px 85px #52607b25",
                padding: 46,
                opacity: premium(f, fps * 0.8, fps * 0.8),
              }}
            >
              <div
                style={{ fontSize: 19, letterSpacing: 2, color: DESIGN.muted }}
              >
                CONTEXT WINDOW
              </div>
              <div style={{ fontSize: 44, margin: "25px 0" }}>
                Everything it can use
                <br />
                in this conversation.
              </div>
              {[0.9, 0.72, 0.81].map((v, i) => (
                <div
                  key={i}
                  style={{
                    height: 12,
                    marginTop: 21,
                    borderRadius: 10,
                    width: `${v * 100 * premium(f, fps * (1.3 + i * 0.2), fps * 0.8)}%`,
                    background: i === 0 ? "#D97757" : "#e3e7ee",
                  }}
                />
              ))}
            </div>
          </>
        )}
        {kind === "sprite" && (
          <>
            <div
              style={{
                position: "absolute",
                left: 120,
                top: 260,
                width: 1370,
                height: 12,
                borderRadius: 8,
                background: "#bcc6d2",
              }}
            />
            <div
              style={{
                position: "absolute",
                left: 200 + premium(f, 0, fps * 1.8) * 390,
                top: 28,
              }}
            >
              <Claude2D
                frame={f}
                size={270}
                cheer={premium(f, fps * 2.7, fps * 0.7)}
              />
            </div>
            <div
              style={{
                position: "absolute",
                left: 860,
                top: 10,
                width: 460,
                height: 240,
                padding: 28,
                boxSizing: "border-box",
                background: "#ffffffdd",
                borderRadius: 28,
                boxShadow: "0 20px 40px #34466520",
              }}
            >
              <div style={{ fontSize: 19, color: DESIGN.muted }}>
                RESEARCH NOTES
              </div>
              <div style={{ fontSize: 35, marginTop: 24 }}>
                Sources checked.
              </div>
              <div
                style={{
                  height: 10,
                  marginTop: 30,
                  background: DESIGN.accent,
                  borderRadius: 5,
                  width: `${premium(f, fps * 1.8, fps * 1.2) * 100}%`,
                }}
              />
            </div>
            <div
              style={{
                position: "absolute",
                top: 345,
                left: 280,
                fontSize: 32,
                color: "#51725f",
                opacity: premium(f, fps * 3, fps * 0.7),
              }}
            >
              The action finishes. The result becomes clear.
            </div>
          </>
        )}
      </div>
    </AbsoluteFill>
  );
};
