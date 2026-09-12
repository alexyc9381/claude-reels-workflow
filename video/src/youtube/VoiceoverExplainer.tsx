import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { BRAND, bodyFont, displayFont } from "./brand";
import { OpticalBackdrop, WhiteGlassSurface, SpriteActor } from "./WhiteGlass";
import { blendFace, facePresets, hopFace } from "./face-motion";
import { naturalHop } from "./glass-motion";
import { beats, formState, smooth } from "./explainer-motion";

const micro: React.CSSProperties = {
  fontSize: 23,
  fontWeight: 600,
  letterSpacing: 2,
  color: BRAND.clayDark,
};
const Path: React.FC<{
  d: string;
  progress: number;
  opacity?: number;
  dashed?: boolean;
}> = ({ d, progress, opacity = 1, dashed = false }) => (
  <path
    d={d}
    pathLength={1}
    fill="none"
    stroke={BRAND.clayDark}
    strokeWidth={4}
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeDasharray={dashed ? "0.018 0.02" : 1}
    strokeDashoffset={dashed ? 0 : 1 - progress}
    opacity={opacity * (dashed ? progress : 1)}
  />
);

const TextBeat: React.FC<{ t: number; bottom?: boolean }> = ({
  t,
  bottom = false,
}) => (
  <>
    {beats.map((beat) => {
      const opacity =
        smooth(t, beat.start + 0.15, 0.35) *
        (1 - smooth(t, beat.end - 0.25, 0.22));
      return (
        <div
          key={beat.start}
          style={{
            position: "absolute",
            left: bottom ? 180 : 96,
            right: bottom ? 180 : 80,
            top: bottom ? 976 : 135,
            opacity,
            fontFamily: bottom ? bodyFont : displayFont,
            fontWeight: bottom ? 400 : 600,
            fontSize: bottom ? 34 : 72,
            letterSpacing: bottom ? -0.5 : -2.5,
            lineHeight: 1.14,
            textAlign: bottom ? "center" : "left",
            transform: `translateY(${bottom ? 0 : 16 * (1 - smooth(t, beat.start + 0.15, 0.7))}px)`,
          }}
        >
          {bottom ? beat.line : beat.heading}
        </div>
      );
    })}
  </>
);

export const VoiceoverExplainer: React.FC = () => {
  const frame = useCurrentFrame(),
    { fps } = useVideoConfig(),
    t = frame / fps;
  const form = formState(t);
  const network = smooth(t, 3.8, 0.7);
  const branch = smooth(t, 9.25, 0.8);
  const warn = smooth(t, 7, 0.35) * (1 - smooth(t, 15.35, 0.4));
  const recap = smooth(t, 23.3, 0.8);
  let face = blendFace(
    facePresets.curious,
    facePresets.focused,
    smooth(t, 5.9, 0.6),
  );
  face = blendFace(face, facePresets.alert, smooth(t, 7.2, 0.5));
  face = blendFace(face, facePresets.focused, smooth(t, 12.8, 0.6));
  face = blendFace(face, facePresets.pleased, smooth(t, 18.6, 0.6));
  face = blendFace(
    face,
    hopFace(t, 22.15, 0.65),
    smooth(t, 21.7, 0.2) * (1 - smooth(t, 24, 0.4)),
  );
  const spriteX = 590;
  const spriteY = 575;
  const scan = smooth(t, 6.3, 0.7);
  const email = "sam@example.com";
  const typed = email.slice(
    0,
    Math.floor(smooth(t, 14.2, 1.15) * email.length),
  );
  return (
    <AbsoluteFill
      style={{ fontFamily: bodyFont, color: BRAND.ink, overflow: "hidden" }}
    >
      <OpticalBackdrop t={t / 4} />
      <AbsoluteFill style={{ background: "rgba(236,233,226,.4)" }} />
      <div style={{ position: "absolute", left: 96, top: 58, ...micro }}>
        NO CODE ALEX{" "}
        <span style={{ color: "#796558", fontWeight: 400 }}>
          {" "}
          / HOW IT WORKS
        </span>
      </div>
      <div
        style={{
          position: "absolute",
          right: 96,
          top: 61,
          fontSize: 22,
          color: "#796558",
        }}
      >
        SCHEMATIC EXAMPLE · VISUAL PREVIEW
      </div>
      <TextBeat t={t} />

      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: `translateY(${-26 * recap}px)`,
        }}
      >
        <svg
          width={1920}
          height={1080}
          style={{ position: "absolute", inset: 0 }}
        >
          <Path d="M 555 490 L 744 490" progress={smooth(t, 4, 0.75)} />
          <Path d="M 735 482 L 744 490 L 735 498" progress={network} />
          <Path
            d="M 1176 490 L 1345 490"
            progress={network}
            opacity={0.3 + 0.7 * smooth(t, 18.6, 0.5)}
          />
          <Path
            d="M 1336 482 L 1345 490 L 1336 498"
            progress={network}
            opacity={0.3 + 0.7 * smooth(t, 18.6, 0.5)}
          />
          <Path d="M 920 612 L 920 672" progress={branch} />
          <Path d="M 912 663 L 920 672 L 928 663" progress={branch} />
          <Path
            d="M 1145 775 L 1228 775 Q 1255 775 1255 748 L 1255 609 Q 1255 587 1233 587 L 1176 587"
            progress={smooth(t, 16.2, 0.7)}
            dashed
          />
          <Path
            d="M 1185 579 L 1176 587 L 1185 595"
            progress={smooth(t, 16.8, 0.25)}
          />
        </svg>
        {[
          { x: 350, n: "01", name: "Form submitted" },
          { x: 960, n: "02", name: "Required fields?" },
          { x: 1550, n: "03", name: "Create contact" },
        ].map((station, i) => (
          <div
            key={station.n}
            style={{
              position: "absolute",
              top: 266,
              left: station.x - 220,
              width: 440,
              textAlign: "center",
              opacity: i === 0 ? 1 : network,
            }}
          >
            <div style={{ ...micro, marginBottom: 12 }}>
              {station.n} / {i === 0 ? "TRIGGER" : i === 1 ? "CHECK" : "ACTION"}
            </div>
            <div style={{ fontFamily: displayFont, fontSize: 39 }}>
              {station.name}
            </div>
          </div>
        ))}

        <WhiteGlassSurface
          x={740}
          y={367}
          width={440}
          height={250}
          t={t / 4}
          frost={0.18}
          radius={60}
          sweepAt={1.1}
          style={{ opacity: network }}
        >
          <div
            style={{
              position: "absolute",
              inset: 18,
              border: `2px solid ${BRAND.clay}55`,
              borderRadius: 46,
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 25,
              borderRadius: 42,
              background:
                "linear-gradient(90deg,transparent,#D2724E30,transparent)",
              transform: `scaleX(${Math.sin(scan * Math.PI)})`,
              opacity: t < 7.1 ? 1 : 0,
            }}
          />
        </WhiteGlassSurface>
        <div
          style={{
            position: "absolute",
            left: 1350,
            top: 370,
            width: 400,
            height: 242,
            border: `2px dashed ${BRAND.clayDark}55`,
            borderRadius: 36,
            opacity: network,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#796558",
            fontSize: 30,
          }}
        >
          <span style={{ opacity: 1 - smooth(t, 20, 0.4) }}>
            Waiting for valid input
          </span>
        </div>
        <div
          style={{
            position: "absolute",
            left: 175,
            top: 403,
            width: 350,
            height: 174,
            border: `2px dashed ${BRAND.clayDark}40`,
            borderRadius: 26,
            opacity: smooth(t, 5.5, 0.5),
            display: "grid",
            placeItems: "center",
            fontSize: 30,
            color: "#796558",
          }}
        >
          Same form →
        </div>
        <div
          style={{
            position: "absolute",
            left: 765,
            top: 638,
            width: 126,
            fontSize: 26,
            color: BRAND.clayDark,
            opacity: branch,
          }}
        >
          NO ↓
        </div>
        <div
          style={{
            position: "absolute",
            left: 1200,
            top: 429,
            fontSize: 26,
            color: BRAND.clayDark,
            opacity: network * (0.4 + 0.6 * smooth(t, 18.6, 0.4)),
          }}
        >
          YES →
        </div>
        <div
          style={{
            position: "absolute",
            left: 700,
            top: 718,
            width: 520,
            height: 162,
            background: "#FFFFFF38",
            border: "2px solid #FFFFFFBB",
            borderRadius: 32,
            opacity: branch,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 130,
            top: 737,
            width: 480,
            opacity: branch,
          }}
        >
          <div style={{ ...micro, marginBottom: 10 }}>EXCEPTION PATH</div>
          <div style={{ fontFamily: displayFont, fontSize: 42 }}>
            Ask for the missing email.
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            left: 1276,
            top: 798,
            fontSize: 25,
            color: BRAND.clayDark,
            opacity: smooth(t, 16.2, 0.5),
          }}
        >
          Recheck the form
        </div>

        {/* The document never remounts or swaps identity between stations. */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: 420,
            height: 240,
            transform: `translate(${form.x - 210}px,${form.y - 120}px) scale(${form.scale})`,
            opacity: smooth(t, 0.2, 0.6),
          }}
        >
          <WhiteGlassSurface
            x={0}
            y={0}
            width={420}
            height={240}
            t={t}
            studioRefraction={false}
            frost={0.76}
            radius={30}
            sweepAt={0.5}
          >
            <div style={{ padding: "23px 28px" }}>
              <div
                style={{
                  fontSize: 22,
                  letterSpacing: 1.5,
                  fontWeight: 700,
                  color: BRAND.clayDark,
                  marginBottom: 18,
                }}
              >
                FORM 001{" "}
                <span style={{ float: "right", color: BRAND.ink }}>
                  {form.delivered ? "SAVED ✓" : ""}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 30,
                  paddingBottom: 16,
                  borderBottom: "1px solid #B8501F22",
                }}
              >
                <span style={{ color: "#796558" }}>Name</span>
                <span>Sam</span>
              </div>
              <div
                style={{
                  position: "relative",
                  marginTop: 14,
                  padding: "8px 10px",
                  marginLeft: -10,
                  marginRight: -10,
                  borderRadius: 12,
                  border: `2px solid ${warn > 0.5 ? BRAND.clayDark : "transparent"}`,
                  background: `rgba(210,114,78,${warn * 0.14})`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  fontSize: 28,
                }}
              >
                <span style={{ color: "#796558" }}>Email</span>
                <span
                  style={{
                    fontSize: typed ? 25 : 28,
                    color: typed ? BRAND.ink : BRAND.clayDark,
                  }}
                >
                  {typed || "— empty"}
                </span>
              </div>
            </div>
          </WhiteGlassSurface>
        </div>
        <div
          style={{
            position: "absolute",
            left: 824,
            top: 570,
            width: 270,
            padding: "11px 0",
            borderRadius: 30,
            textAlign: "center",
            background: BRAND.clayDark,
            color: BRAND.cream,
            fontSize: 25,
            fontWeight: 600,
            opacity: warn * (1 - smooth(t, 10.1, 0.25)),
          }}
        >
          Email is missing
        </div>
        <div
          style={{
            position: "absolute",
            left: 825,
            top: 570,
            width: 270,
            padding: "11px 0",
            borderRadius: 30,
            textAlign: "center",
            background: BRAND.clayDark,
            color: BRAND.cream,
            fontSize: 25,
            fontWeight: 600,
            opacity: smooth(t, 18.6, 0.3),
          }}
        >
          Required fields ✓
        </div>
        <SpriteActor
          t={t}
          x={spriteX}
          y={spriteY}
          size={142}
          opacity={smooth(t, 6.8, 0.5) * (1 - 0.45 * recap)}
          face={face}
          pose={naturalHop(t, 22.15, 0.65, 34)}
        />
      </div>
      <div
        style={{
          position: "absolute",
          left: 96,
          right: 96,
          top: 939,
          height: 1,
          background: "#B8501F33",
        }}
      />
      <TextBeat t={t} bottom />
      <div
        style={{
          position: "absolute",
          left: 0,
          bottom: 0,
          width: 1920,
          height: 5,
          background: BRAND.clay,
          transform: `scaleX(${Math.min(1, t / 28)})`,
          transformOrigin: "left",
        }}
      />
    </AbsoluteFill>
  );
};
