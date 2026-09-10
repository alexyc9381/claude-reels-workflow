import React from "react";
import {
  AbsoluteFill,
  Img,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { BRAND, bodyFont, displayFont } from "./brand";
import { Claude2D } from "./Claude";
import {
  clamp01,
  easeOut,
  easeInOut,
  settle,
  hop,
  relayPosition,
} from "./glass-motion";

const ink = BRAND.ink;
const label: React.CSSProperties = {
  fontFamily: bodyFont,
  fontSize: 22,
  fontWeight: 600,
  letterSpacing: 2.5,
  color: BRAND.clayDark,
};
const title: React.CSSProperties = {
  fontFamily: displayFont,
  fontWeight: 600,
  letterSpacing: -3,
  lineHeight: 1.04,
};

/** Authored studio backdrop. The lens repeats this exact geometry with a small
 * optical offset; this is an art-directed refraction approximation, not raytracing. */
export const OpticalBackdrop: React.FC<{ t: number }> = ({ t }) => {
  const drift = easeInOut(t, 0, 7) * 28;
  return (
    <AbsoluteFill style={{ background: BRAND.cream, overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 78% 56%,#CF954438,transparent 65%)",
        }}
      />
      <svg
        width={1920}
        height={1080}
        style={{
          position: "absolute",
          transform: `translate(${drift}px,${-drift / 3}px)`,
        }}
      >
        <defs>
          <linearGradient id="clay-ribbon" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#B8501F" />
            <stop offset=".48" stopColor="#D2724E" />
            <stop offset=".8" stopColor="#E2A382" />
            <stop offset="1" stopColor="#CF9544" />
          </linearGradient>
        </defs>
        <ellipse
          cx="1530"
          cy="580"
          rx="540"
          ry="320"
          fill="none"
          stroke="url(#clay-ribbon)"
          strokeWidth="220"
          transform="rotate(-31 1530 580)"
        />
        {Array.from({ length: 11 }, (_, i) => (
          <ellipse
            key={i}
            cx="1530"
            cy="580"
            rx={435 + i * 20}
            ry={215 + i * 20}
            fill="none"
            stroke={i % 2 ? "#ffffff55" : "#8F3C2320"}
            strokeWidth={i % 2 ? 2 : 3}
            transform="rotate(-31 1530 580)"
          />
        ))}
      </svg>
      <div
        style={{
          position: "absolute",
          bottom: -220,
          left: -140,
          width: 900,
          height: 640,
          borderRadius: "50%",
          background: "radial-gradient(ellipse,#D2724E42,transparent 68%)",
        }}
      />
    </AbsoluteFill>
  );
};

/** White-only optical surface: separated refraction, frost, bevel, reflection,
 * then sharp content. Coordinates refer to the fixed 1920x1080 design stage. */
export const WhiteGlassSurface: React.FC<{
  x: number;
  y: number;
  width: number;
  height: number;
  t: number;
  children?: React.ReactNode;
  radius?: number;
  frost?: number;
  studioRefraction?: boolean;
  sweepAt?: number;
  style?: React.CSSProperties;
}> = ({
  x,
  y,
  width,
  height,
  t,
  children,
  radius = 42,
  frost = 0.32,
  studioRefraction = true,
  sweepAt = 0.8,
  style,
}) => {
  const sweep = clamp01((t - sweepAt) / 1.45);
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width,
        height,
        borderRadius: radius,
        boxSizing: "border-box",
        color: ink,
        boxShadow:
          "0 32px 65px #6A3F2520,0 7px 15px #6A3F2510,inset 0 0 0 1px #ffffffd9",
        ...style,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: radius,
          overflow: "hidden",
          backdropFilter: "blur(12px) saturate(115%)",
          background: `rgba(255,255,255,${frost})`,
        }}
      >
        {studioRefraction && (
          <div
            style={{
              position: "absolute",
              left: -x,
              top: -y,
              width: 1920,
              height: 1080,
              filter: "blur(8px) saturate(110%)",
              opacity: 0.62,
              transform: `translate(9px,4px) scale(1.045)`,
              transformOrigin: `${x + width / 2}px ${y + height / 2}px`,
            }}
          >
            <OpticalBackdrop t={t} />
          </div>
        )}
        <AbsoluteFill
          style={{
            background: `linear-gradient(125deg,rgba(255,255,255,${Math.min(0.8, frost + 0.24)}),rgba(255,255,255,.12) 47%,rgba(255,255,255,${frost}))`,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: radius,
            boxShadow:
              "inset 3px 4px 3px #ffffffef,inset -3px -4px 5px #ffffff70,inset 0 0 0 7px #ffffff26,inset 0 0 0 9px #b07e5015",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 8,
            borderRadius: radius - 8,
            border: "1px solid #ffffff88",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: -height * 0.8,
            left: -width * 0.5,
            width: width * 0.3,
            height: height * 2.6,
            transform: `translateX(${sweep * width * 2}px) rotate(24deg)`,
            background:
              "linear-gradient(90deg,transparent,#ffffffaa,transparent)",
            opacity: Math.sin(sweep * Math.PI) * 0.4,
          }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: radius,
          pointerEvents: "none",
          background:
            "linear-gradient(167deg,#ffffff85,transparent 17%,transparent 86%,#ffffff5c)",
          border: "1px solid #ffffffcc",
        }}
      />
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        {children}
      </div>
    </div>
  );
};

export const SpriteActor: React.FC<{
  t: number;
  x: number;
  y: number;
  size?: number;
  scale?: number;
  angle?: number;
  cheer?: number;
  opacity?: number;
}> = ({
  t,
  x,
  y,
  size = 155,
  scale = 1,
  angle = 0,
  cheer = 0,
  opacity = 1,
}) => (
  <div
    style={{
      position: "absolute",
      left: x,
      top: y,
      width: size,
      height: size,
      opacity,
      transform: `rotate(${angle}deg) scale(${scale})`,
      transformOrigin: "50% 92%",
    }}
  >
    <div
      style={{
        position: "absolute",
        left: "22%",
        right: "22%",
        bottom: "3%",
        height: 12,
        borderRadius: "50%",
        background: "#823b2129",
        filter: "blur(8px)",
      }}
    />
    <Claude2D frame={Math.round(t * 30)} size={size} cheer={cheer} />
  </div>
);

const SceneHeader: React.FC<{ index: string; name: string }> = ({
  index,
  name,
}) => (
  <>
    <div style={{ position: "absolute", left: 100, top: 65, ...label }}>
      NO CODE ALEX{" "}
      <span style={{ color: "#867369", fontWeight: 400 }}>
        {" "}
        / OPTICAL GLASS
      </span>
    </div>
    <div
      style={{
        position: "absolute",
        right: 100,
        top: 69,
        fontFamily: bodyFont,
        fontSize: 20,
        color: BRAND.ink,
      }}
    >
      {index} — {name}
    </div>
  </>
);

export type WhiteGlassKind = "definition" | "relay" | "focus";
export const WhiteGlassScene: React.FC<{
  kind: WhiteGlassKind;
  still?: boolean;
}> = ({ kind, still = false }) => {
  const frame = useCurrentFrame(),
    { fps } = useVideoConfig();
  const t = still ? 5.4 : frame / fps;
  const out = 1 - Math.pow(clamp01((t - 7.45) / 0.5), 3);
  return (
    <AbsoluteFill
      style={{ fontFamily: bodyFont, color: ink, overflow: "hidden" }}
    >
      <OpticalBackdrop t={t} />
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: out,
          transform: `translateY(${(1 - out) * -15}px)`,
        }}
      >
        {kind === "definition" ? (
          <DefinitionStudy t={t} />
        ) : kind === "relay" ? (
          <RelayStudy t={t} />
        ) : (
          <FocusStudy t={t} />
        )}
      </div>
    </AbsoluteFill>
  );
};

const DefinitionStudy: React.FC<{ t: number }> = ({ t }) => {
  const p = easeOut(t, 0.65, 0.9),
    copy = easeOut(t, 1.1, 0.5),
    sprite = easeInOut(t, 0.18, 0.8);
  return (
    <>
      <SceneHeader index="01" name="The definition reveal" />
      <div
        style={{
          position: "absolute",
          left: 130,
          top: 205,
          ...title,
          fontSize: 112,
          transform: `translateY(${(1 - easeOut(t, 0.12, 0.8)) * 30}px)`,
        }}
      >
        A little clarity.
        <br />
        <span style={{ color: BRAND.clayDark }}>Right on cue.</span>
      </div>
      <div
        style={{
          position: "absolute",
          left: 137,
          top: 490,
          fontSize: 29,
          color: "#70584A",
        }}
      >
        One unfamiliar term. One useful explanation.
      </div>
      <WhiteGlassSurface
        x={115}
        y={637}
        width={1690}
        height={306}
        t={t}
        frost={0.38}
        sweepAt={1.05}
        style={{
          opacity: p,
          transform: `perspective(1700px) translateY(${(1 - p) * 65}px) rotateX(${(1 - p) * 9}deg) scale(${0.975 + 0.025 * p})`,
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 51,
            top: 43,
            ...label,
            fontSize: 19,
          }}
        >
          IN PLAIN ENGLISH
        </div>
        <div
          style={{
            position: "absolute",
            left: 50,
            top: 97,
            ...title,
            fontSize: 70,
            opacity: copy,
            transform: `translateY(${(1 - copy) * 18}px)`,
          }}
        >
          Context window
        </div>
        <div
          style={{
            position: "absolute",
            left: 55,
            top: 201,
            fontSize: 32,
            opacity: copy,
          }}
        >
          The information an AI can consider at one time.
        </div>
        <div
          style={{
            position: "absolute",
            right: 53,
            top: 50,
            width: 116,
            height: 116,
            borderRadius: "50%",
            border: "2px solid #ffffffdd",
            background: "#ffffff42",
            boxShadow: "inset 2px 3px 8px #ffffffaa,0 8px 20px #7d472318",
            display: "grid",
            placeItems: "center",
            fontFamily: displayFont,
            fontSize: 58,
            color: BRAND.clayDark,
          }}
        >
          Aa
        </div>
      </WhiteGlassSurface>
      <SpriteActor
        t={t}
        x={1250 + sprite * 280}
        y={481 - hop(t, 0.2, 0.9, 55)}
        size={170}
        scale={0.94 + 0.06 * settle(t, 0.95, 0.45)}
        cheer={easeOut(t, 1, 0.3) * (1 - easeOut(t, 1.6, 0.4))}
      />
      <div
        style={{
          position: "absolute",
          left: 143,
          top: 988,
          fontSize: 21,
          color: "#786258",
        }}
      >
        Claude lands → the glass opens → the definition resolves.
      </div>
    </>
  );
};

const RelayStudy: React.FC<{ t: number }> = ({ t }) => {
  const pos = relayPosition(t);
  const phase1 = easeOut(t, 0.35, 0.75),
    phase2 = easeOut(t, 2.35, 0.65),
    phase3 = easeOut(t, 4.05, 0.75);
  const travel = clamp01((pos.x - 290) / 1010);
  return (
    <>
      <SceneHeader index="02" name="The Claude hand-off" />
      <div
        style={{
          position: "absolute",
          left: 130,
          top: 184,
          ...title,
          fontSize: 102,
        }}
      >
        Give the process
        <br />
        <span style={{ color: BRAND.clayDark }}>a little personality.</span>
      </div>
      <svg
        width="1920"
        height="1080"
        style={{ position: "absolute", inset: 0 }}
      >
        <path
          d="M380 810 L380 918 L1390 918 L1390 848 M885 918 L885 787"
          stroke="#B8501F35"
          strokeWidth="3"
          fill="none"
        />
        <path
          d="M380 918 L1390 918"
          stroke={BRAND.clay}
          strokeWidth="4"
          pathLength={1}
          strokeDasharray="1"
          strokeDashoffset={1 - travel}
        />
      </svg>
      <WhiteGlassSurface
        x={130}
        y={480}
        width={510}
        height={330}
        t={t}
        frost={0.35}
        sweepAt={0.6}
        style={{
          opacity: phase1,
          transform: `translateX(${(1 - phase1) * -70}px)`,
        }}
      >
        <div style={{ padding: 43 }}>
          <div style={label}>01 / THE INPUT</div>
          <div style={{ ...title, fontSize: 49, marginTop: 28 }}>
            Your brief.
          </div>
          <div
            style={{
              fontSize: 28,
              lineHeight: 1.45,
              marginTop: 21,
              maxWidth: 355,
            }}
          >
            A clear task, with the context it needs.
          </div>
        </div>
      </WhiteGlassSurface>
      <WhiteGlassSurface
        x={745}
        y={447}
        width={340}
        height={340}
        radius={170}
        t={t}
        frost={0.2}
        sweepAt={2.45}
        style={{ opacity: phase2, transform: `scale(${0.9 + 0.1 * phase2})` }}
      >
        <div style={{ textAlign: "center", paddingTop: 60 }}>
          <div style={{ ...label, fontSize: 19 }}>02 / THINK</div>
          <div style={{ ...title, fontSize: 49, marginTop: 25 }}>A plan.</div>
          <div style={{ fontSize: 23, marginTop: 20 }}>Small, clear steps.</div>
        </div>
      </WhiteGlassSurface>
      <WhiteGlassSurface
        x={1190}
        y={412}
        width={585}
        height={436}
        t={t}
        frost={0.44}
        sweepAt={4.25}
        style={{
          opacity: phase3,
          transform: `perspective(1800px) translateY(${(1 - phase3) * 60}px) rotateY(${(1 - phase3) * -7}deg)`,
        }}
      >
        <div style={{ padding: 45 }}>
          <div style={label}>03 / THE OUTPUT</div>
          <div style={{ ...title, fontSize: 58, marginTop: 31 }}>
            Make it useful.
          </div>
          <div
            style={{
              fontSize: 29,
              lineHeight: 1.4,
              marginTop: 23,
              maxWidth: 430,
            }}
          >
            Review the result.
            <br />
            Then make it yours.
          </div>
          <div
            style={{
              marginTop: 28,
              display: "inline-flex",
              gap: 14,
              alignItems: "center",
              fontSize: 22,
              color: BRAND.clayDark,
            }}
          >
            <span style={{ fontSize: 28 }}>✓</span> Ready for your review
          </div>
        </div>
      </WhiteGlassSurface>
      <SpriteActor
        t={t}
        x={pos.x}
        y={pos.y + 135}
        size={160}
        angle={hop(t, 1.7, 1.05, 5) - hop(t, 3.35, 1.15, 5)}
        cheer={easeOut(t, 4.55, 0.3) * (1 - easeOut(t, 5.2, 0.45))}
        opacity={phase1}
      />
      <div
        style={{
          position: "absolute",
          left: 135,
          top: 995,
          fontSize: 21,
          color: "#786258",
        }}
      >
        One actor. Two purposeful hand-offs. No constant bouncing while you
        read.
      </div>
    </>
  );
};

const FocusStudy: React.FC<{ t: number }> = ({ t }) => {
  const screen = easeOut(t, 0.15, 0.8),
    callout = easeOut(t, 1.4, 0.7),
    actor = easeInOut(t, 0.85, 0.8);
  const tap = clamp01((t - 1.5) / 0.65);
  return (
    <>
      <SceneHeader index="03" name="The quiet screen companion" />
      <div
        style={{
          position: "absolute",
          left: 106,
          top: 130,
          ...title,
          fontSize: 70,
        }}
      >
        A guide, not a distraction.
      </div>
      <WhiteGlassSurface
        x={54}
        y={238}
        width={1812}
        height={726}
        t={t}
        frost={0.18}
        sweepAt={0.5}
        studioRefraction={false}
        radius={32}
        style={{ opacity: screen, transform: `scale(${0.98 + 0.02 * screen})` }}
      >
        <div
          style={{
            position: "absolute",
            inset: 12,
            borderRadius: 22,
            overflow: "hidden",
          }}
        >
          <Img
            src={staticFile("screen-still.jpg")}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "50% 30%",
            }}
          />
        </div>
      </WhiteGlassSurface>
      <WhiteGlassSurface
        x={1230}
        y={617}
        width={570}
        height={275}
        t={t}
        frost={0.76}
        studioRefraction={false}
        sweepAt={1.7}
        radius={36}
        style={{
          opacity: callout,
          transform: `translateY(${(1 - callout) * 32}px)`,
        }}
      >
        <div style={{ padding: "34px 40px" }}>
          <div style={{ ...label, fontSize: 18 }}>ONE THING TO NOTICE</div>
          <div style={{ ...title, fontSize: 44, marginTop: 18 }}>
            Keep the real UI.
          </div>
          <div style={{ fontSize: 26, lineHeight: 1.4, marginTop: 18 }}>
            A short explanation.
            <br />
            The screen stays in charge.
          </div>
        </div>
      </WhiteGlassSurface>
      <div
        style={{
          position: "absolute",
          left: 1195,
          top: 732,
          width: 55,
          height: 55,
          borderRadius: "50%",
          border: "2px solid #fff",
          transform: `scale(${1 + tap * 2})`,
          opacity: Math.sin(tap * Math.PI) * 0.6,
        }}
      />
      <SpriteActor
        t={t}
        x={950 + actor * 130}
        y={790 - hop(t, 0.85, 0.8, 45)}
        size={135}
        cheer={easeOut(t, 1.4, 0.25) * (1 - easeOut(t, 2.1, 0.3))}
      />
      <div
        style={{
          position: "absolute",
          left: 105,
          top: 1006,
          fontSize: 21,
          color: "#786258",
        }}
      >
        Existing screen reference • park the sprite outside important controls
        in the real edit.
      </div>
    </>
  );
};

export const WhiteGlassGallery = () => (
  <AbsoluteFill>
    {(["definition", "relay", "focus"] as const).map((kind, i) => (
      <Sequence key={kind} from={i * 240} durationInFrames={240}>
        <WhiteGlassScene kind={kind} />
      </Sequence>
    ))}
  </AbsoluteFill>
);
