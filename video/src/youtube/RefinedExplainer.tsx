import React from "react";
import {
  AbsoluteFill,
  Audio,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { BRAND, bodyFont, displayFont } from "./brand";
import { WhiteGlassSurface, SpriteActor } from "./WhiteGlass";
import { blendFace, facePresets, hopFace } from "./face-motion";
import { smooth } from "./explainer-motion";
import { arrive, refinedState, windowAt } from "./refined-motion";

const Glass: React.FC<{
  x: number;
  y: number;
  w: number;
  h: number;
  t: number;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  radius?: number;
}> = ({ x, y, w, h, t, children, style, radius = 36 }) => (
  <WhiteGlassSurface
    x={x}
    y={y}
    width={w}
    height={h}
    t={t}
    studioRefraction={false}
    frost={0.24}
    radius={radius}
    sweepAt={12.95}
    style={style}
  >
    {children}
  </WhiteGlassSurface>
);

const Person: React.FC<{ size: number }> = ({ size }) => (
  <svg viewBox="0 0 100 100" width={size} height={size}>
    <defs>
      <linearGradient id="refined-person" x2="1" y2="1">
        <stop stopColor="#EFC6A5" />
        <stop offset="1" stopColor={BRAND.clay} />
      </linearGradient>
    </defs>
    <circle
      cx="50"
      cy="50"
      r="47"
      fill="url(#refined-person)"
      stroke="#FFF9EF"
      strokeWidth="2"
    />
    <circle
      cx="50"
      cy="37"
      r="12"
      stroke="#FFF9EF"
      strokeWidth="4"
      fill="none"
    />
    <path
      d="M26 76C26 50 74 50 74 76"
      stroke="#FFF9EF"
      strokeWidth="4"
      fill="none"
      strokeLinecap="round"
    />
  </svg>
);
const Mail: React.FC<{ size?: number; color?: string }> = ({
  size = 54,
  color = BRAND.clayDark,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 80 80"
    fill="none"
    stroke={color}
    strokeWidth="3.5"
  >
    <rect x="7" y="17" width="66" height="47" rx="9" />
    <path d="M9 22L40 43L71 22" strokeLinejoin="round" />
  </svg>
);

export const RefinedExplainerSound: React.FC = () => (
  <>
    <RefinedExplainer />
    <Audio src={staticFile("sfx-refined/glass-mix.wav")} />
  </>
);

/** A continuous, centered request/reply mechanism. No new title or diagram copy.
 * Foreground safe area: x=260..1660, y=170..930. Source and record share one
 * baseline; the only traveling packet terminates at the actual email socket. */
export const RefinedExplainer: React.FC = () => {
  const frame = useCurrentFrame(),
    { fps } = useVideoConfig(),
    t = frame / fps,
    s = refinedState(t);
  const entry = arrive(t, 0.2, 0.9),
    flap = smooth(t, 7.1, 0.7),
    paper = arrive(t, 7.8, 0.9);
  const packetRelease = smooth(t, 9.05, 0.18);
  let face = blendFace(
    facePresets.curious,
    facePresets.focused,
    smooth(t, 4, 0.4),
  );
  face = blendFace(face, hopFace(t, 5.8, 0.85), windowAt(t, 5.55, 7.65));
  face = blendFace(face, facePresets.alert, windowAt(t, 8, 10.3));
  face = blendFace(face, facePresets.pleased, smooth(t, 10.3, 0.6));
  const fieldY = 230;
  return (
    <AbsoluteFill
      style={{
        background: BRAND.cream,
        color: BRAND.ink,
        fontFamily: bodyFont,
        overflow: "hidden",
      }}
    >
      {/* A warm light pool, not a ring or a competing graphic behind lettering. */}
      <div
        style={{
          position: "absolute",
          left: 220,
          top: 340,
          width: 1480,
          height: 590,
          background:
            "radial-gradient(ellipse at 50% 55%,#D2724E32,transparent 70%)",
          filter: "blur(26px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 390,
          top: 880,
          width: 1140,
          height: 30,
          borderRadius: "50%",
          background: "#80523918",
          filter: "blur(21px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: entry,
          transform: `translateY(${20 * (1 - entry)}px) scale(${0.96 + 0.04 * entry})`,
          transformOrigin: "960px 530px",
        }}
      >
        {/* Source opens from behind the record, rather than appearing as an unrelated card. */}
        <div
          style={{
            opacity: s.source.opacity,
            transform: `translateX(${s.source.x}px) translateY(215px)`,
            position: "absolute",
            width: 420,
            height: 500,
          }}
        >
          <Glass
            x={0}
            y={0}
            w={420}
            h={500}
            t={t}
            style={{
              transform: `perspective(1600px) rotateY(${12 * (1 - s.open)}deg)`,
              transformOrigin: "100% 50%",
            }}
          >
            <div style={{ position: "absolute", left: 150, top: 22 }}>
              <Person size={120} />
            </div>
            <div
              style={{
                position: "absolute",
                top: 150,
                width: 420,
                textAlign: "center",
                fontFamily: displayFont,
                fontWeight: 600,
                fontSize: 36,
                lineHeight: "44px",
              }}
            >
              Sam
            </div>
            {/* Envelope built in depth: flap behind the rising reply, then the translucent pocket. */}
            <div
              style={{
                position: "absolute",
                left: 48,
                top: 312,
                width: 324,
                height: 150,
                perspective: 1100,
              }}
            >
              <svg
                width="324"
                height="150"
                style={{
                  position: "absolute",
                  top: 0,
                  overflow: "visible",
                  transform: `rotateX(${-165 * flap}deg)`,
                  transformOrigin: "50% 0%",
                }}
              >
                <path
                  d="M0 0H324L162 109Z"
                  fill="#F2D1B7"
                  stroke="#FFFAEE"
                  strokeWidth="3"
                />
              </svg>
              <div
                style={{
                  position: "absolute",
                  left: 18,
                  top: 14 - 95 * paper,
                  width: 288,
                  height: 139,
                  borderRadius: 14,
                  background: "linear-gradient(135deg,#FFFCF5,#F4E9DA)",
                  boxShadow: "0 5px 14px #875A3520",
                  border: "2px solid #FFFFFF",
                  boxSizing: "border-box",
                  opacity: 1 - packetRelease,
                }}
              >
                <div
                  style={{
                    marginTop: 18,
                    textAlign: "center",
                    fontSize: 26,
                    fontWeight: 500,
                    opacity: paper,
                  }}
                >
                  sam@example.com
                </div>
                <div
                  style={{
                    margin: "20px auto",
                    width: 190,
                    height: 4,
                    borderRadius: 3,
                    background: "#D2724E3C",
                  }}
                />
              </div>
              <svg
                width="324"
                height="150"
                style={{
                  position: "absolute",
                  top: 0,
                  filter: "drop-shadow(0 14px 12px #8C58321F)",
                }}
              >
                <defs>
                  <linearGradient id="envelope-white" x2="0" y2="1">
                    <stop stopColor="#FFFFFF99" />
                    <stop offset="1" stopColor="#FFF8ECCF" />
                  </linearGradient>
                </defs>
                <path
                  d="M0 0L162 97L324 0V127Q324 150 301 150H23Q0 150 0 127Z"
                  fill="url(#envelope-white)"
                  stroke="#FFFDFA"
                  strokeWidth="3"
                />
                <path
                  d="M0 141L112 64M324 141L212 64"
                  stroke="#C193713D"
                  strokeWidth="2"
                />
              </svg>
              <div
                style={{
                  position: "absolute",
                  left: 132,
                  top: 76,
                  width: 60,
                  height: 60,
                  borderRadius: 18,
                  background: "linear-gradient(145deg,#EAB28B,#D2724E)",
                  boxShadow: "inset 0 1px 2px #FFFFFFBB,0 6px 10px #B8501F23",
                  transform: `scale(${1 - 0.15 * flap})`,
                  opacity: 1 - flap,
                }}
              >
                <Mail size={60} color="#FFF7EB" />
              </div>
            </div>
          </Glass>
        </div>

        {/* The SAME record stays in view through expansion and reunion. */}
        <div
          style={{
            position: "absolute",
            left: s.record.x,
            top: s.record.y,
            width: s.record.w,
            height: 500,
          }}
        >
          {[2, 1].map((i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: 38,
                transform: `translate(${-i * 12 * s.close}px,${i * 10 * s.close}px)`,
                opacity: s.close,
                background: i === 2 ? "#DDA47F" : "#FBF4E8",
                border: "2px solid #FFF7EF",
                boxShadow: "0 12px 25px #91684612",
              }}
            />
          ))}
          <Glass x={0} y={0} w={s.record.w} h={500} t={t}>
            <div style={{ position: "absolute", left: 45, top: 45 }}>
              <Person size={110} />
            </div>
            <div
              style={{
                position: "absolute",
                left: 183,
                top: 52,
                fontFamily: displayFont,
                fontSize: 62,
                fontWeight: 600,
                letterSpacing: -1.4,
              }}
            >
              Sam
            </div>
            <div
              style={{
                position: "absolute",
                left: 186,
                top: 135,
                fontSize: 26,
                color: BRAND.clayDark,
                opacity: s.saved,
              }}
            >
              Contact
            </div>
            {/* Structured state indicator is attached to the record, never a floating badge. */}
            <div
              style={{
                position: "absolute",
                right: 46,
                top: 78,
                width: 112,
                height: 8,
                display: "flex",
                gap: 7,
              }}
            >
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  style={{
                    height: 6,
                    flex: 1,
                    borderRadius: 5,
                    background:
                      i === 0 || s.filled > i / 3 ? BRAND.clay : "#B68D7328",
                  }}
                />
              ))}
            </div>
            <div
              style={{
                position: "absolute",
                left: 46,
                right: 46,
                top: 200,
                height: 2,
                background: "#B27F581E",
              }}
            />
            <div
              style={{
                position: "absolute",
                left: 42,
                top: fieldY,
                width: s.record.w - 84,
                height: 175,
                borderRadius: 26,
                background: "linear-gradient(130deg,#FFFFFF8C,#FFFFFF3D)",
                boxShadow: `inset 0 1px 0 #FFFFFF,inset 0 -2px 1px #D2B79C50,0 ${8 + 8 * windowAt(t, 1.5, 10.3)}px 25px #B77E4313`,
                border: `2px solid ${s.filled > 0.5 ? "#FFFFFF" : "#E3BF9B"}`,
                boxSizing: "border-box",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: 26,
                  top: 58,
                  width: 72,
                  height: 72,
                  borderRadius: 19,
                  background: "#D2724E13",
                  display: "grid",
                  placeItems: "center",
                }}
              >
                <Mail size={50} />
              </div>
              <div
                style={{
                  position: "absolute",
                  left: 127,
                  top: 27,
                  fontSize: 27,
                  fontWeight: 500,
                  color: "#776352",
                }}
              >
                Email
              </div>
              <div
                style={{
                  position: "absolute",
                  left: 127,
                  right: 32,
                  top: 79,
                  height: 54,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    opacity: 1 - s.filled,
                    fontSize: 40,
                    color: BRAND.clayDark,
                  }}
                >
                  —
                </div>
                <div
                  style={{
                    position: "absolute",
                    fontSize: 38,
                    fontWeight: 500,
                    letterSpacing: -0.8,
                    opacity: s.filled,
                    transform: `translateY(${22 * (1 - s.filled)}px)`,
                  }}
                >
                  sam@example.com
                </div>
              </div>
              <div
                style={{
                  position: "absolute",
                  left: 128,
                  right: 32,
                  bottom: 15,
                  height: 3,
                  background: "#D2724E",
                  borderRadius: 4,
                  opacity: windowAt(t, 1.5, 10.4),
                  transform: `scaleX(${arrive(t, 1.5, 0.5)})`,
                  transformOrigin: "left",
                }}
              />
            </div>
            {/* Completed contact acquires a real filing edge and an embossed tab. */}
            <div
              style={{
                position: "absolute",
                left: 24,
                top: 43,
                bottom: 43,
                width: 4,
                borderRadius: 4,
                background: "#D2724E77",
                opacity: s.close,
              }}
            />
            <div
              style={{
                position: "absolute",
                right: -21,
                top: 52,
                width: 42,
                height: 108,
                borderRadius: "0 13px 13px 0",
                background: "linear-gradient(90deg,#B8501F,#E5A578)",
                boxShadow: "inset 1px 1px 1px #FFF7EF77,0 4px 7px #89492425",
                opacity: s.saved,
                transform: `translateX(${-20 * (1 - s.saved)}px)`,
                zIndex: -1,
              }}
            />
            <div
              style={{
                position: "absolute",
                left: 47,
                bottom: 30,
                fontSize: 23,
                color: "#80644E",
                opacity: s.saved,
              }}
            >
              Saved
            </div>
          </Glass>
        </div>

        {/* A reply is visibly supplied by Sam; this is not Claude guessing an address. */}
        <div
          style={{
            position: "absolute",
            left: s.reply.x - 95,
            top: s.reply.y - 52,
            width: 190,
            height: 104,
            opacity: s.reply.opacity,
            transform: `scale(${s.reply.scale})`,
            filter: `drop-shadow(0 ${16 * s.reply.scale}px 14px #96573424)`,
          }}
        >
          <Glass x={0} y={0} w={190} h={104} t={t} radius={25}>
            <div
              style={{
                textAlign: "center",
                fontSize: 68,
                fontFamily: displayFont,
                color: BRAND.clayDark,
                lineHeight: "99px",
              }}
            >
              @
            </div>
          </Glass>
        </div>

        <div
          style={{
            position: "absolute",
            left: 875,
            top: 858 + s.press,
            width: 240,
            height: 43,
            borderRadius: 16,
            opacity: windowAt(t, 4.05, 7.75),
            background: "linear-gradient(150deg,#EDB491,#D2724E)",
            boxShadow:
              "inset 0 2px 1px #FFF2DDAA,0 8px 0 #A85231,0 12px 18px #9D65322A",
          }}
        >
          <div style={{ position: "absolute", right: 15, top: -2 }}>
            <Mail size={45} color="#FFF9EF" />
          </div>
        </div>
        <SpriteActor
          t={t}
          x={s.sprite.x}
          y={s.sprite.y}
          size={200}
          pose={s.sprite.pose}
          face={face}
          gait={{ phase: t * 19, amount: s.sprite.walk }}
        />
      </div>
    </AbsoluteFill>
  );
};
