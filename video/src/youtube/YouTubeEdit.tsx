import React from "react";
import {
  AbsoluteFill,
  Audio,
  Img,
  OffthreadVideo,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import type { EditSegment, YouTubeEditManifest } from "./types";
import { DESIGN } from "./design";
import { Definition, MotionGraphic } from "./MotionGraphics";
import { Claude3D } from "./Claude";
import { GlowingClaude, ContactLight } from "./GlowingClaude";
import { editTimeline, openingScale } from "./timing";
export { durationInOutputFrames } from "./timing";

const Clip: React.FC<{
  manifest: YouTubeEditManifest;
  segment: EditSegment;
  outputFrom: number;
}> = ({ manifest: m, segment, outputFrom }) => {
  const f = useCurrentFrame(),
    { fps } = useVideoConfig(),
    globalFrame = outputFrom + f;
  const p = m.presenter,
    sourceSeconds = segment.sourceStartFrame / m.sourceFps;
  const presenterSeconds = sourceSeconds + (p?.offsetSeconds ?? 0);
  if (p && presenterSeconds < 0)
    throw new Error("Presenter offset starts before source");
  const presenterFrame = Math.floor(
    (presenterSeconds + f / fps) * (p?.fps ?? fps) + 0.00001,
  );
  const opening = globalFrame < (m.openingSeconds ?? 8) * fps;
  const fullPresenter = !!p && (opening || m.profile === "talking-head");
  const box = fullPresenter
    ? { left: 28, top: 28, width: 1864, height: 1024 }
    : {
        left: p?.side === "right" ? 1434 : 54,
        top: 666,
        width: 432,
        height: 360,
      };
  const master = m.audioMaster ?? "source";
  if (master === "presenter" && !p)
    throw new Error("Presenter audio requires presenter media");
  if (p?.backgroundBlur && !p.foregroundFrames)
    throw new Error(
      "Background-only blur needs a source-matched RGBA person sequence",
    );
  if (m.cgi && (!p || m.cgi.source !== p.source))
    throw new Error("CGI tracking does not match presenter source");
  const foreground = p?.foregroundFrames?.[presenterFrame];
  if (p?.foregroundFrames && !foreground)
    throw new Error(`Missing person matte frame ${presenterFrame}`);
  const point = m.cgi?.points.find((q) => q.frame === presenterFrame);
  if (m.cgi && !point)
    throw new Error(`Missing CGI source track frame ${presenterFrame}`);
  if (m.cgi?.layer === "behind-person" && !foreground)
    throw new Error("Behind-person CGI requires an RGBA person sequence");
  const action = m.cgi?.actions?.find(
    (a) =>
      globalFrame >= a.fromFrame &&
      globalFrame < a.fromFrame + a.durationInFrames,
  );
  const presenterScale = p
    ? (fullPresenter && p.width < p.height ? Math.min : Math.max)(
        box.width / p.width,
        box.height / p.height,
      )
    : 1;
  const sw = m.sourceWidth ?? 1920,
    sh = m.sourceHeight ?? 1080,
    c = m.chromeCrop ?? { top: 0, right: 0, bottom: 0, left: 0 };
  const cw = sw - c.left - c.right,
    ch = sh - c.top - c.bottom;
  if (cw <= 0 || ch <= 0) throw new Error("Chrome crop removes entire frame");
  const fit = Math.min(DESIGN.screen.width / cw, DESIGN.screen.height / ch);
  const focus = segment.focus ?? { scale: 1, x: 0.5, y: 0.5 };
  const sprite =
    m.cgi && point && p ? (
      <>
        {m.cgi.appearance !== "graphic" && (
          <div
            style={{
              position: "absolute",
              left: point.x * p.width,
              top: point.y * p.height,
            }}
          >
            <ContactLight
              size={m.cgi.size}
              frame={action ? globalFrame - action.fromFrame : globalFrame}
              fps={fps}
              action={action?.action}
            />
          </div>
        )}
        <div
          style={{
            position: "absolute",
            left: point.x * p.width - m.cgi.size * 0.14,
            top: point.y * p.height - 4,
            width: m.cgi.size * 0.28,
            height: 13,
            borderRadius: "50%",
            background: "#21180d66",
            filter: "blur(5px)",
            opacity:
              m.cgi.appearance === "graphic"
                ? action?.action === "hop"
                  ? 0.3
                  : 0.7
                : 0,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: point.x * p.width - m.cgi.size / 2,
            top: point.y * p.height - m.cgi.size / 2,
            width: m.cgi.size,
            height: m.cgi.size,
          }}
        >
          {m.cgi.appearance === "graphic" ? (
            <Claude3D
              size={m.cgi.size}
              frame={action ? globalFrame - action.fromFrame : globalFrame}
              fps={fps}
              action={action?.action}
            />
          ) : (
            <GlowingClaude
              size={m.cgi.size}
              frame={action ? globalFrame - action.fromFrame : globalFrame}
              fps={fps}
              action={action?.action}
              form={m.cgi.appearance === "glowing-ember" ? "ember" : "cube"}
            />
          )}
        </div>
      </>
    ) : null;
  return (
    <AbsoluteFill style={{ background: DESIGN.gradient }}>
      <div
        style={{
          position: "absolute",
          left: 28 + (1864 - cw * fit) / 2,
          top: 28 + (1024 - ch * fit) / 2,
          width: cw * fit,
          height: ch * fit,
          borderRadius: DESIGN.screen.radius,
          overflow: "hidden",
          background: "#15171c",
          boxShadow: "0 18px 45px #24314730",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            width: cw * fit,
            height: ch * fit,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: cw,
              height: ch,
              transform: `scale(${fit})`,
              transformOrigin: "top left",
            }}
          >
            <div
              style={{
                width: cw,
                height: ch,
                overflow: "hidden",
                transform: `scale(${focus.scale})`,
                transformOrigin: `${focus.x * 100}% ${focus.y * 100}%`,
              }}
            >
              <OffthreadVideo
                src={staticFile(m.source)}
                startFrom={Math.round(sourceSeconds * fps)}
                muted={master !== "source"}
                style={{
                  position: "absolute",
                  width: sw,
                  height: sh,
                  left: -c.left,
                  top: -c.top,
                }}
              />
            </div>
          </div>
        </div>
      </div>
      {p && (
        <div
          style={{
            position: "absolute",
            ...box,
            background: fullPresenter ? DESIGN.gradient : undefined,
            borderRadius: 26,
            overflow: "hidden",
            boxShadow: "0 18px 55px #19243648",
            border: "2px solid #ffffffaa",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              transform: `scale(${opening ? openingScale(globalFrame / fps) : 1})`,
              transformOrigin: "50% 40%",
            }}
          >
            <div
              style={{
                position: "absolute",
                width: p.width,
                height: p.height,
                left: (box.width - p.width * presenterScale) / 2,
                top:
                  (box.height - p.height * presenterScale) *
                  (fullPresenter ? 0.5 : (p.positionY ?? 0.3)),
                transform: `scale(${presenterScale})`,
                transformOrigin: "top left",
              }}
            >
              <OffthreadVideo
                src={staticFile(p.source)}
                startFrom={Math.round(presenterSeconds * fps)}
                muted={master !== "presenter"}
                style={{
                  width: p.width,
                  height: p.height,
                  filter: p.backgroundBlur
                    ? `blur(${p.backgroundBlur}px)`
                    : undefined,
                }}
              />
              {m.cgi?.layer === "behind-person" && sprite}
              {foreground && (
                <Img
                  src={staticFile(foreground)}
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                  }}
                />
              )}
              {m.cgi?.layer !== "behind-person" && sprite}
            </div>
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};

export const YouTubeEdit: React.FC<{ manifest: YouTubeEditManifest }> = ({
  manifest: m,
}) => {
  const { width, height, fps } = useVideoConfig();
  if (fps !== m.outputFps || width / height !== 16 / 9)
    throw new Error("Use manifest fps and 16:9 output");
  return (
    <AbsoluteFill
      style={{
        background: DESIGN.gradient,
        fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: 1920,
          height: 1080,
          transform: `scale(${width / 1920})`,
          transformOrigin: "top left",
        }}
      >
        {editTimeline(m).map(({ segment, from, duration }, i) => (
          <Sequence key={i} from={from} durationInFrames={duration}>
            <Clip manifest={m} segment={segment} outputFrom={from} />
          </Sequence>
        ))}
        {(m.graphics ?? []).map((g, i) => (
          <Sequence
            key={`g${i}`}
            from={g.fromFrame}
            durationInFrames={g.durationInFrames}
          >
            <MotionGraphic kind={g.kind} title={g.title} />
          </Sequence>
        ))}
        {(m.overlays ?? []).map((e, i) => (
          <Sequence
            key={`o${i}`}
            from={e.fromFrame}
            durationInFrames={e.durationInFrames}
          >
            <Definition
              label={
                e.type === "definition"
                  ? "IN PLAIN ENGLISH"
                  : e.type.toUpperCase()
              }
              term={e.title}
              anchor={e.anchor}
              meaning={e.detail ?? ""}
              duration={e.durationInFrames}
              side={m.presenter?.side === "right" ? "left" : "right"}
            />
          </Sequence>
        ))}
        {(m.cgi?.actions ?? [])
          .filter((a) => a.sound)
          .map((a, i) => (
            <Sequence
              key={`s${i}`}
              from={a.fromFrame}
              durationInFrames={a.durationInFrames}
            >
              <Audio src={staticFile(a.sound!)} volume={a.volume ?? 0.2} />
            </Sequence>
          ))}
      </div>
    </AbsoluteFill>
  );
};
