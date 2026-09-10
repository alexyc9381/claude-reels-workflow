import React from "react";
import {
  AbsoluteFill,
  Img,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { premium } from "./design";

export const glass: React.CSSProperties = {
  background:
    "linear-gradient(135deg,rgba(255,255,255,.34),rgba(255,255,255,.09))",
  backdropFilter: "blur(24px) saturate(135%)",
  border: "1px solid rgba(255,255,255,.65)",
  boxShadow:
    "inset 0 1px 0 #ffffffaa,inset 0 -1px 0 #ffffff22,0 24px 65px #25366622",
  borderRadius: 32,
};
export const GlassPanel: React.FC<{
  children: React.ReactNode;
  style?: React.CSSProperties;
  smoked?: boolean;
}> = ({ children, style, smoked = false }) => (
  <div
    style={{
      ...glass,
      ...(smoked
        ? {
            background: "linear-gradient(140deg,#213345a0,#151d344d)",
            color: "#fff",
            borderColor: "#ffffff55",
          }
        : {}),
      ...style,
    }}
  >
    {children}
  </div>
);
export const GlassBackdrop = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: "#c9d8e6", overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          width: 1300,
          height: 950,
          left: -150 + Math.sin(f / 110) * 65,
          top: 300,
          background: "radial-gradient(ellipse,#71c7da,transparent 65%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 1500,
          height: 1100,
          left: 800,
          top: -370 + Math.sin(f / 130) * 55,
          background: "radial-gradient(ellipse,#dfa29d,transparent 65%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 1400,
          height: 1200,
          left: 700,
          top: 350,
          background: "radial-gradient(ellipse,#9a9bd2,transparent 67%)",
        }}
      />
      <svg
        width="1920"
        height="1080"
        style={{ position: "absolute", inset: 0, opacity: 0.55 }}
      >
        <path
          d="M-100 870 C450 290 710 1210 1290 390 S1810 170 2060 20"
          fill="none"
          stroke="#ffffff"
          strokeWidth="2"
        />
        <path
          d="M-100 930 C450 350 710 1270 1290 450 S1810 230 2060 80"
          fill="none"
          stroke="#ffffff"
          strokeWidth="1"
        />
      </svg>
    </AbsoluteFill>
  );
};
export type GlassKind =
  | "definition"
  | "callout"
  | "workflow"
  | "chapter"
  | "comparison"
  | "screen";
export const glassKinds: GlassKind[] = [
  "definition",
  "callout",
  "workflow",
  "chapter",
  "comparison",
  "screen",
];
const titles: Record<GlassKind, string> = {
  definition: "Explain the unfamiliar.",
  callout: "Focus on the next action.",
  workflow: "Make the process visible.",
  chapter: "Give each chapter a moment.",
  comparison: "Make the choice clear.",
  screen: "Keep the screen in charge.",
};
const labels: Record<GlassKind, string> = {
  definition: "01 / DEFINITION CARD",
  callout: "02 / UI CALLOUT",
  workflow: "03 / WORKFLOW",
  chapter: "04 / CHAPTER TRANSITION",
  comparison: "05 / COMPARISON",
  screen: "06 / SCREEN FRAME",
};
const eyebrow: React.CSSProperties = {
  fontSize: 18,
  fontWeight: 650,
  letterSpacing: 3,
  color: "#485775",
};

export const GlassContent: React.FC<{ kind: GlassKind; progress?: number }> = ({
  kind,
  progress = 1,
}) => {
  const panel = (style: React.CSSProperties) => ({
    ...style,
    position: "absolute" as const,
    boxSizing: "border-box" as const,
  });
  return (
    <>
      {kind === "definition" && (
        <>
          <div
            style={{
              position: "absolute",
              left: 200,
              top: 410,
              fontSize: 130,
              fontWeight: 650,
              color: "#ffffff80",
              letterSpacing: -5,
            }}
          >
            Context matters.
          </div>
          <GlassPanel
            style={panel({
              left: 325,
              top: 680,
              width: 1270,
              padding: "30px 42px",
              transform: `translateY(${(1 - progress) * 28}px)`,
              opacity: progress,
            })}
          >
            <div style={eyebrow}>IN PLAIN ENGLISH</div>
            <div style={{ fontSize: 42, fontWeight: 600, marginTop: 13 }}>
              Context window
            </div>
            <div
              style={{
                fontSize: 29,
                lineHeight: 1.45,
                marginTop: 12,
                color: "#273349",
              }}
            >
              The information an AI can consider at one time.
            </div>
          </GlassPanel>
        </>
      )}
      {kind === "callout" && (
        <>
          <GlassPanel
            style={panel({
              left: 210,
              top: 360,
              width: 1070,
              height: 485,
              padding: 45,
            })}
          >
            <div style={eyebrow}>EXAMPLE INTERFACE</div>
            <div style={{ fontSize: 38, marginTop: 35 }}>
              How should Claude respond?
            </div>
            <div
              style={{
                marginTop: 35,
                padding: 24,
                borderRadius: 17,
                background: "#ffffff28",
                border: "1px solid #ffffff77",
                fontSize: 26,
              }}
            >
              Explain it clearly. Show your sources.
            </div>
            <div
              style={{
                marginTop: 30,
                display: "inline-block",
                padding: "18px 36px",
                background: "#27364c",
                borderRadius: 20,
                color: "white",
                fontSize: 26,
              }}
            >
              Save instructions
            </div>
          </GlassPanel>
          <svg
            width="1920"
            height="1080"
            style={{ position: "absolute", inset: 0 }}
          >
            <path
              d="M765 747 L1260 747 L1360 627"
              fill="none"
              stroke="#fbf5ec"
              strokeWidth="3"
              strokeDasharray="1000"
              strokeDashoffset={(1 - progress) * 1000}
            />
            <circle cx="765" cy="747" r="8" fill="#fff" />
          </svg>
          <GlassPanel
            smoked
            style={panel({
              left: 1320,
              top: 442,
              width: 425,
              padding: 34,
              opacity: progress,
              transform: `translateX(${(1 - progress) * 24}px)`,
            })}
          >
            <div style={{ ...eyebrow, color: "#e3d3c1" }}>
              THE IMPORTANT PART
            </div>
            <div style={{ fontSize: 35, lineHeight: 1.25, marginTop: 22 }}>
              Save the rule once.
            </div>
            <div
              style={{
                fontSize: 25,
                lineHeight: 1.45,
                marginTop: 20,
                color: "#eef2fb",
              }}
            >
              Reuse it in your next conversation.
            </div>
          </GlassPanel>
        </>
      )}
      {kind === "workflow" &&
        ["Your brief", "A clear plan", "A useful result"].map((s, i) => (
          <React.Fragment key={s}>
            {i > 0 && (
              <div
                style={{
                  position: "absolute",
                  left: 585 + (i - 1) * 570,
                  top: 622,
                  width: 180,
                  height: 2,
                  background: "#ffffffbb",
                }}
              />
            )}
            <GlassPanel
              style={panel({
                left: 155 + i * 570,
                top: 397 + (1 - progress) * (20 + i * 12),
                width: 470,
                height: 445,
                padding: 38,
                opacity: progress,
              })}
            >
              <div style={eyebrow}>0{i + 1}</div>
              <div style={{ fontSize: 40, letterSpacing: -1, marginTop: 50 }}>
                {s}
              </div>
              <div
                style={{
                  fontSize: 25,
                  lineHeight: 1.5,
                  marginTop: 27,
                  color: "#45516a",
                }}
              >
                {
                  [
                    "Define the task and the information it needs.",
                    "Break the work into small, reviewable steps.",
                    "Check the output before you use it.",
                  ][i]
                }
              </div>
              <div
                style={{
                  position: "absolute",
                  left: 38,
                  right: 38,
                  bottom: 40,
                  height: 6,
                  borderRadius: 8,
                  background: "#ffffff55",
                }}
              >
                <div
                  style={{
                    width: `${progress * (i === 2 ? 100 : 75)}%`,
                    height: 6,
                    borderRadius: 8,
                    background: "#637ba1",
                  }}
                />
              </div>
            </GlassPanel>
          </React.Fragment>
        ))}
      {kind === "chapter" && (
        <>
          <GlassPanel
            style={panel({
              left: 555,
              top: 355,
              width: 810,
              height: 560,
              padding: 62,
              transform: `scale(${0.97 + 0.03 * progress})`,
              opacity: progress,
            })}
          >
            <div style={eyebrow}>CHAPTER 02</div>
            <div
              style={{
                fontSize: 89,
                letterSpacing: -4,
                lineHeight: 1.04,
                marginTop: 54,
              }}
            >
              Build it.
              <br />
              Then make it yours.
            </div>
            <div style={{ fontSize: 26, marginTop: 35, color: "#53627a" }}>
              From a working draft to your own workflow.
            </div>
          </GlassPanel>
        </>
      )}
      {kind === "comparison" &&
        ["Clear glass", "Smoked glass"].map((s, i) => (
          <GlassPanel
            key={s}
            smoked={i === 1}
            style={panel({
              left: 225 + i * 780,
              top: 372,
              width: 690,
              height: 485,
              padding: 46,
              opacity: progress,
            })}
          >
            <div style={{ ...eyebrow, color: i ? "#d7e1ed" : "#485775" }}>
              0{i + 1} / SURFACE OPTION
            </div>
            <div style={{ fontSize: 53, letterSpacing: -2, marginTop: 53 }}>
              {s}
            </div>
            <div
              style={{
                fontSize: 28,
                lineHeight: 1.55,
                marginTop: 30,
                color: i ? "#edf0f8" : "#42516b",
              }}
            >
              {i
                ? "More separation over bright or visually busy footage."
                : "Light, airy surfaces for designed explanations and calmer backgrounds."}
            </div>
            <div
              style={{
                display: "inline-block",
                padding: "12px 19px",
                marginTop: 27,
                borderRadius: 25,
                border: "1px solid #ffffff77",
                fontSize: 19,
              }}
            >
              Same motion. Different contrast.
            </div>
          </GlassPanel>
        ))}
      {kind === "screen" && (
        <>
          <GlassPanel
            style={panel({
              left: 52,
              top: 310,
              width: 1816,
              height: 710,
              padding: 12,
              borderRadius: 24,
            })}
          >
            <Img
              src={staticFile("screen-still.jpg")}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "50% 30%",
                borderRadius: 15,
              }}
            />
          </GlassPanel>
          <GlassPanel
            smoked
            style={panel({
              left: 1015,
              top: 813,
              width: 760,
              padding: 27,
              opacity: progress,
            })}
          >
            <div style={{ ...eyebrow, color: "#dbe3ec" }}>SCREEN DEMO</div>
            <div style={{ fontSize: 29, marginTop: 12 }}>
              A small callout. The real interface stays visible.
            </div>
          </GlassPanel>
        </>
      )}
    </>
  );
};
export const GlassScene: React.FC<{ kind: GlassKind; still?: boolean }> = ({
  kind,
  still = false,
}) => {
  const f = useCurrentFrame(),
    { fps } = useVideoConfig(),
    p = still ? 1 : premium(f, 0, fps * 1.3);
  return (
    <AbsoluteFill
      style={{
        fontFamily: "-apple-system,BlinkMacSystemFont,sans-serif",
        color: "#233044",
      }}
    >
      <GlassBackdrop />
      <div style={{ position: "absolute", left: 110, top: 69, ...eyebrow }}>
        NO CODE ALEX / GLASS STUDIES
      </div>
      <div
        style={{
          position: "absolute",
          left: 110,
          top: 156,
          fontSize: 66,
          fontWeight: 600,
          letterSpacing: -2,
          opacity: p,
        }}
      >
        {titles[kind]}
      </div>
      <div
        style={{
          position: "absolute",
          right: 100,
          top: 78,
          fontSize: 17,
          color: "#57657c",
        }}
      >
        {labels[kind]}
      </div>
      <GlassContent kind={kind} progress={p} />
    </AbsoluteFill>
  );
};
export const GlassGallery = () => (
  <AbsoluteFill>
    {glassKinds.map((kind, i) => (
      <Sequence key={kind} from={i * 150} durationInFrames={150}>
        <GlassScene kind={kind} />
      </Sequence>
    ))}
  </AbsoluteFill>
);
export const GlassOverview = () => (
  <AbsoluteFill
    style={{
      background: "#e4eaf0",
      fontFamily: "-apple-system,sans-serif",
      color: "#25334a",
    }}
  >
    <div
      style={{
        position: "absolute",
        left: 75,
        top: 48,
        fontSize: 47,
        fontWeight: 600,
        letterSpacing: -1,
      }}
    >
      No Code Alex · Glass editing components
    </div>
    <div
      style={{
        position: "absolute",
        left: 77,
        top: 112,
        fontSize: 24,
        color: "#5c6b82",
      }}
    >
      Six reusable components. Clear and smoked glass. Preview direction, not
      final approval.
    </div>
    {glassKinds.map((kind, i) => (
      <div
        key={kind}
        style={{
          position: "absolute",
          left: 75 + (i % 3) * 605,
          top: 200 + Math.floor(i / 3) * 408,
          width: 560,
          height: 356,
        }}
      >
        <div
          style={{
            position: "relative",
            width: 560,
            height: 315,
            borderRadius: 18,
            overflow: "hidden",
            boxShadow: "0 15px 35px #20304a18",
          }}
        >
          <div
            style={{
              width: 1920,
              height: 1080,
              transform: "scale(.2916666667)",
              transformOrigin: "top left",
            }}
          >
            <GlassScene kind={kind} still />
          </div>
        </div>
        <div style={{ fontSize: 21, marginTop: 15, fontWeight: 550 }}>
          {labels[kind]}
        </div>
      </div>
    ))}
  </AbsoluteFill>
);
