import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { BRAND, bodyFont, displayFont } from "./brand";
import { WhiteGlassSurface, SpriteActor } from "./WhiteGlass";
import { blendFace, facePresets, hopFace } from "./face-motion";
import { naturalHop } from "./glass-motion";
import { smooth } from "./explainer-motion";

const clamp = (p: number) => Math.max(0, Math.min(1, p));
const out = (t: number, a: number, d: number) =>
  1 - Math.pow(1 - clamp((t - a) / d), 4);
const windowAt = (t: number, a: number, b: number) =>
  smooth(t, a, 0.3) * (1 - smooth(t, b, 0.25));
export const visualState = (t: number) => {
  const extract = smooth(t, 6.1, 0.75);
  const reinsert = smooth(t, 11.2, 0.8);
  const focus = extract - reinsert;
  const convert = smooth(t, 14.1, 0.85);
  const recoil =
    t > 3.05
      ? Math.sin((t - 3.05) * 17) *
        Math.exp(-(t - 3.05) * 6) *
        24 *
        (1 - smooth(t, 3.8, 0.2))
      : 0;
  return {
    focus,
    convert,
    x:
      960 -
      900 * (1 - out(t, 0, 0.8)) +
      90 * smooth(t, 2.6, 0.45) -
      90 * smooth(t, 3.05, 0.35) +
      recoil,
    y: 510 - 18 * smooth(t, 2.6, 0.45) + 18 * smooth(t, 3.05, 0.35),
    angle: -9 * (1 - out(t, 0, 0.85)) + recoil * 0.07,
    completed: t >= 10.1,
    checked: t >= 12.6,
    saved: t >= 15.2,
  };
};

const Icon: React.FC<{
  kind: "person" | "mail" | "check" | "send";
  size?: number;
  color?: string;
  progress?: number;
}> = ({ kind, size = 70, color = BRAND.clayDark, progress = 1 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 80 80"
    fill="none"
    stroke={color}
    strokeWidth={5}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {kind === "person" && (
      <>
        <circle cx={40} cy={24} r={13} />
        <path d="M15 68 C15 41 65 41 65 68" />
      </>
    )}
    {kind === "mail" && (
      <>
        <rect x={8} y={17} width={64} height={46} rx={8} />
        <path d="M10 23 L40 44 L70 23" />
      </>
    )}
    {kind === "check" && (
      <path
        d="M15 42 L32 58 L66 22"
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1 - progress}
      />
    )}
    {kind === "send" && (
      <>
        <path d="M10 12 L72 40 L10 68 L22 40 Z" />
        <path d="M22 40 L69 40" />
      </>
    )}
  </svg>
);

const Glass: React.FC<{
  width: number;
  height: number;
  t: number;
  children?: React.ReactNode;
  radius?: number;
}> = ({ width, height, t, children, radius = 42 }) => (
  <WhiteGlassSurface
    x={0}
    y={0}
    width={width}
    height={height}
    t={t}
    radius={radius}
    studioRefraction={false}
    frost={0.5}
    sweepAt={0.4}
  >
    {children}
  </WhiteGlassSurface>
);
const Avatar: React.FC<{ size: number }> = ({ size }) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: "50%",
      background: "linear-gradient(145deg,#E4AD8E,#D2724E)",
      boxShadow: "inset 0 3px 2px #ffffffaa,0 15px 30px #B8501F20",
      display: "grid",
      placeItems: "center",
    }}
  >
    <Icon kind="person" size={size * 0.6} color="#FFF9EF" />
  </div>
);

const EmailRow: React.FC<{
  t: number;
  complete: boolean;
  progress?: number;
}> = ({ t, complete, progress = 1 }) => (
  <>
    <div style={{ position: "absolute", left: 28, top: 27 }}>
      <Icon kind="mail" size={60} />
    </div>
    <div
      style={{
        position: "absolute",
        left: 112,
        top: 19,
        fontSize: 23,
        color: "#796558",
      }}
    >
      Email
    </div>
    <div
      style={{
        position: "absolute",
        left: 112,
        top: 52,
        fontSize: 35,
        fontWeight: 500,
        color: complete ? BRAND.ink : BRAND.clayDark,
        whiteSpace: "nowrap",
      }}
    >
      {complete ? "sam@example.com" : "—"}
    </div>
    <div
      style={{
        position: "absolute",
        right: 25,
        top: 35,
        opacity: out(t, complete ? 10.1 : 4.3, 0.35),
        transform: `scale(${0.8 + 0.2 * progress})`,
      }}
    >
      {complete ? (
        <Icon kind="check" size={48} progress={out(t, 10.1, 0.35)} />
      ) : (
        <div
          style={{
            border: `3px solid ${BRAND.clay}`,
            borderRadius: "50%",
            width: 42,
            height: 42,
            display: "grid",
            placeItems: "center",
            fontSize: 29,
            fontWeight: 600,
          }}
        >
          !
        </div>
      )}
    </div>
  </>
);

export const VisualExplainer: React.FC = () => {
  const frame = useCurrentFrame(),
    { fps } = useVideoConfig(),
    t = frame / fps;
  const s = visualState(t);
  const fieldY = 515 - 82 * s.focus;
  const fieldX = s.x - 290 + 105 * s.focus;
  const fieldScale = 1 + 0.16 * s.focus;
  const reply = smooth(t, 8.9, 1.2);
  const morph = s.convert;
  const formOpacity = 1 - morph;
  const scan = smooth(t, 4, 1.45);
  const magOpacity = windowAt(t, 3.6, 6);
  const magX = 855 + 270 * scan;
  const magY = 393 + 190 * scan;
  const human = windowAt(t, 6.5, 11);
  const tokenX = 502 + 558 * reply;
  const tokenY = 389 + 107 * reply - 230 * Math.sin(reply * Math.PI);
  const press =
    smooth(t, 2.4, 0.13) -
    smooth(t, 2.65, 0.4) +
    smooth(t, 13.3, 0.13) -
    smooth(t, 13.5, 0.4);
  const pointerOpacity = windowAt(t, 1.5, 3.05) + windowAt(t, 12.7, 13.9);
  const pointer = out(t, t < 10 ? 1.5 : 12.7, 0.75);
  let face = blendFace(
    facePresets.curious,
    facePresets.alert,
    smooth(t, 3, 0.25),
  );
  face = blendFace(face, facePresets.focused, smooth(t, 4.2, 0.4));
  face = blendFace(face, facePresets.curious, smooth(t, 6.5, 0.4));
  face = blendFace(face, facePresets.pleased, smooth(t, 10.1, 0.4));
  face = blendFace(face, hopFace(t, 16.1, 0.7), windowAt(t, 15.7, 18.1));
  return (
    <AbsoluteFill
      style={{
        background: BRAND.cream,
        color: BRAND.ink,
        fontFamily: bodyFont,
        overflow: "hidden",
      }}
    >
      {/* Clear central field. Light stays below the reading area; no decorative ring. */}
      <div
        style={{
          position: "absolute",
          left: -300,
          top: 745,
          width: 2520,
          height: 900,
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse at 50% 10%,#D2724E38,transparent 63%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 440,
          top: 790,
          width: 1100,
          height: 70,
          borderRadius: "50%",
          background: "#8150381C",
          filter: "blur(28px)",
          transform: `scaleX(${1 - morph * 0.24})`,
        }}
      />

      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 680,
          height: 470,
          transform: `translate(${s.x - 340}px,${s.y - 235}px) rotate(${s.angle}deg) scale(${1 - s.focus * 0.045 - morph * 0.15})`,
          opacity: formOpacity,
        }}
      >
        <Glass width={680} height={470} t={t}>
          <div style={{ opacity: 1 - s.focus * 0.75 }}>
            <div style={{ position: "absolute", left: 45, top: 40 }}>
              <Avatar size={106} />
            </div>
            <div
              style={{
                position: "absolute",
                left: 180,
                top: 50,
                fontFamily: displayFont,
                fontSize: 60,
              }}
            >
              Sam
            </div>
            <div
              style={{
                position: "absolute",
                left: 182,
                top: 125,
                width: 200,
                height: 9,
                borderRadius: 8,
                background: "#B8501F18",
              }}
            />
            <div
              style={{
                position: "absolute",
                left: 42,
                top: 221,
                width: 596,
                height: 139,
                border: "2px dashed #B8501F33",
                borderRadius: 25,
              }}
            />
            <div
              style={{
                position: "absolute",
                right: 43,
                bottom: 32,
                width: 128,
                height: 72,
                background: BRAND.clayDark,
                borderRadius: 23,
                display: "grid",
                placeItems: "center",
                transform: `scale(${1 - 0.09 * press})`,
                boxShadow: "0 12px 23px #B8501F26,inset 0 2px 1px #ffffff77",
              }}
            >
              <Icon kind="send" size={45} color="#FFF9EF" />
            </div>
          </div>
        </Glass>
      </div>

      {/* Lift the actual field out of its form, fill it, then return to the same slot. */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 580,
          height: 120,
          opacity: formOpacity,
          transform: `translate(${fieldX}px,${fieldY}px) scale(${fieldScale})`,
          transformOrigin: "50% 50%",
        }}
      >
        <Glass width={580} height={120} t={t - 6.1} radius={24}>
          <EmailRow t={t} complete={s.completed} />
        </Glass>
      </div>

      {/* House short-form inspection pattern: a lens sweeps onto the actual missing field. */}
      <div
        style={{
          position: "absolute",
          left: magX - 85,
          top: magY - 85,
          opacity: magOpacity,
          transform: `rotate(${-12 + scan * 23}deg) scale(${0.7 + 0.3 * out(t, 3.6, 0.4)})`,
        }}
      >
        <svg width={260} height={270} viewBox="0 0 260 270">
          <defs>
            <linearGradient id="lens-metal">
              <stop stopColor="#FFF9F3" />
              <stop offset=".38" stopColor="#D2724E" />
              <stop offset=".7" stopColor="#F5D0BA" />
              <stop offset="1" stopColor="#B8501F" />
            </linearGradient>
          </defs>
          <path
            d="M143 145 L225 227"
            stroke="#B8501F"
            strokeWidth={27}
            strokeLinecap="round"
          />
          <path
            d="M148 145 L224 222"
            stroke="#E9AD85"
            strokeWidth={9}
            strokeLinecap="round"
          />
          <circle
            cx={88}
            cy={88}
            r={75}
            fill="#FFFFFF19"
            stroke="url(#lens-metal)"
            strokeWidth={13}
          />
          <path
            d="M34 72 A57 57 0 0 1 101 32"
            fill="none"
            stroke="#FFFFFFDD"
            strokeWidth={7}
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* A person supplies the missing value. Claude observes; he does not invent it. */}
      <div
        style={{
          position: "absolute",
          left: 370,
          top: 286,
          opacity: human,
          transform: `translateX(${-50 * (1 - out(t, 6.5, 0.5))}px)`,
        }}
      >
        <Avatar size={132} />
        <div
          style={{
            position: "absolute",
            left: -50,
            top: 153,
            width: 340,
            height: 105,
          }}
        >
          <Glass width={340} height={105} t={t - 6.5} radius={32}>
            <div style={{ fontSize: 30, textAlign: "center", paddingTop: 33 }}>
              {t < 8.2 ? "Email?" : "sam@example.com"}
            </div>
          </Glass>
          <div
            style={{
              position: "absolute",
              top: -12,
              left: 76,
              width: 24,
              height: 24,
              background: "#F8F6F1",
              transform: "rotate(45deg)",
            }}
          />
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: tokenX - 47,
          top: tokenY - 47,
          opacity: windowAt(t, 8.65, 10.07),
          transform: `rotate(${-16 + 32 * reply}deg) scale(${0.75 + 0.25 * out(t, 8.65, 0.3)})`,
          width: 94,
          height: 94,
          borderRadius: 26,
          background: "linear-gradient(135deg,#E9B38D,#D2724E)",
          boxShadow: "0 15px 35px #B8501F33,inset 0 3px 1px #FFFFFF99",
          display: "grid",
          placeItems: "center",
          fontSize: 61,
          color: "#FFF9F1",
        }}
      >
        @
      </div>

      <div
        style={{
          position: "absolute",
          left: 1220 + 200 * (1 - pointer),
          top: 685 + 130 * (1 - pointer),
          opacity: pointerOpacity,
          transform: `scale(${1 - 0.12 * press})`,
        }}
      >
        <svg width={75} height={82} viewBox="0 0 75 82">
          <path
            d="M8 4 L11 62 L28 49 L40 75 L53 69 L40 43 L62 41 Z"
            fill={BRAND.ink}
            stroke="#FFFCF7"
            strokeWidth={4}
          />
        </svg>
      </div>
      <div
        style={{
          position: "absolute",
          left: 1322,
          top: 348,
          opacity: windowAt(t, 3, 4),
          transform: `scale(${0.65 + 0.35 * out(t, 3, 0.18)}) rotate(-9deg)`,
          fontFamily: displayFont,
          fontSize: 66,
          color: BRAND.clayDark,
        }}
      >
        Wait.
      </div>
      <div
        style={{
          position: "absolute",
          left: 1250,
          top: 330,
          opacity: windowAt(t, 12.5, 13.65),
        }}
      >
        <Icon kind="check" size={130} progress={out(t, 12.6, 0.45)} />
      </div>

      {/* The same name/email resolve into a contact-book entry, not another flowchart node. */}
      <div
        style={{
          position: "absolute",
          left: 695,
          top: 263,
          width: 550,
          height: 514,
          opacity: morph,
          transform: `perspective(1400px) rotateY(${-22 * (1 - morph)}deg) translateY(${42 * (1 - morph)}px) scale(${0.83 + 0.17 * morph})`,
        }}
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              right: -18,
              top: 91 + i * 93,
              width: 43,
              height: 66,
              borderRadius: "0 12px 12px 0",
              background: [BRAND.clay, BRAND.amber, "#E2B99C"][i],
              transform: `translateX(${(1 - out(t, 14.8 + i * 0.1, 0.45)) * -35}px)`,
            }}
          />
        ))}
        <Glass width={550} height={514} t={t - 14.1} radius={46}>
          <div
            style={{
              position: "absolute",
              left: 23,
              top: 30,
              bottom: 30,
              width: 10,
              borderRadius: 8,
              background: "#B8501F22",
            }}
          />
          <div style={{ position: "absolute", left: 192, top: 58 }}>
            <Avatar size={166} />
          </div>
          <div
            style={{
              position: "absolute",
              left: 55,
              right: 35,
              top: 255,
              textAlign: "center",
              fontFamily: displayFont,
              fontSize: 70,
            }}
          >
            Sam
          </div>
          <div
            style={{
              position: "absolute",
              left: 55,
              right: 35,
              top: 355,
              textAlign: "center",
              fontSize: 34,
            }}
          >
            sam@example.com
          </div>
          <div
            style={{
              position: "absolute",
              left: 187,
              top: 423,
              display: "flex",
              gap: 9,
              alignItems: "center",
              opacity: out(t, 15.2, 0.3),
              fontSize: 30,
              color: BRAND.clayDark,
            }}
          >
            Saved <Icon kind="check" size={37} progress={out(t, 15.2, 0.4)} />
          </div>
        </Glass>
      </div>
      <SpriteActor
        t={t}
        x={350}
        y={650}
        size={225}
        opacity={out(t, 0.15, 0.4)}
        face={face}
        angle={-6 * windowAt(t, 3, 4)}
        pose={naturalHop(t, 16.1, 0.7, 57)}
      />
    </AbsoluteFill>
  );
};
