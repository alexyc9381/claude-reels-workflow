import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { BRAND, bodyFont, displayFont } from "./brand";
import { WhiteGlassSurface, SpriteActor } from "./WhiteGlass";
import { blendFace, facePresets, hopFace } from "./face-motion";
import { smooth } from "./explainer-motion";
import { stageState } from "./stage-motion";

const appear = (t: number, a: number, b: number) =>
  smooth(t, a, 0.4) * (1 - smooth(t, b, 0.4));
const Glass: React.FC<{
  x: number;
  y: number;
  w: number;
  h: number;
  t: number;
  children?: React.ReactNode;
  radius?: number;
  opacity?: number;
}> = ({ x, y, w, h, t, children, radius = 40, opacity = 1 }) => (
  <WhiteGlassSurface
    x={x}
    y={y}
    width={w}
    height={h}
    t={t}
    studioRefraction={false}
    frost={0.38}
    radius={radius}
    style={{ opacity }}
  >
    {children}
  </WhiteGlassSurface>
);
const Person: React.FC<{ size: number }> = ({ size }) => (
  <svg viewBox="0 0 200 200" width={size} height={size}>
    <defs>
      <linearGradient id="stage-avatar" x2="1" y2="1">
        <stop stopColor="#E6B497" />
        <stop offset="1" stopColor="#D2724E" />
      </linearGradient>
    </defs>
    <circle
      cx="100"
      cy="100"
      r="95"
      fill="url(#stage-avatar)"
      stroke="#FFF7EB"
      strokeWidth="4"
    />
    <circle
      cx="100"
      cy="72"
      r="27"
      fill="none"
      stroke="#FFF7EB"
      strokeWidth="9"
    />
    <path
      d="M49 157 C49 102 151 102 151 157"
      fill="none"
      stroke="#FFF7EB"
      strokeWidth="9"
      strokeLinecap="round"
    />
  </svg>
);
const MailIcon: React.FC<{ size?: number }> = ({ size = 90 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    stroke={BRAND.clayDark}
    strokeWidth={5}
  >
    <rect x={8} y={20} width={84} height={61} rx={11} />
    <path d="M10 27 L50 54 L90 27" strokeLinejoin="round" />
  </svg>
);
const Place: React.FC<{
  x: number;
  y: number;
  w: number;
  h: number;
  scale?: number;
  rotate?: number;
  opacity?: number;
  children: React.ReactNode;
}> = ({ x, y, w, h, scale = 1, rotate = 0, opacity = 1, children }) => (
  <div
    style={{
      position: "absolute",
      left: 0,
      top: 0,
      width: w,
      height: h,
      opacity,
      transform: `translate(${x - w / 2}px,${y - h / 2}px) rotate(${rotate}deg) scale(${scale})`,
    }}
  >
    {children}
  </div>
);

export const ExplainerStage: React.FC = () => {
  const f = useCurrentFrame(),
    { fps } = useVideoConfig(),
    t = f / fps,
    s = stageState(t);
  const intro = smooth(t, 0, 0.65);
  const bookOpen = smooth(t, 11.3, 1.1);
  const envelope = appear(t, 5.7, 11.4);
  const flap = smooth(t, 7.2, 0.65);
  const reply = smooth(t, 8.2, 1.45);
  const close = smooth(t, 16.2, 0.65);
  let face = blendFace(
    facePresets.curious,
    hopFace(t, 0.85, 0.9),
    1 - smooth(t, 2.75, 0.3),
  );
  face = blendFace(face, facePresets.focused, smooth(t, 3.35, 0.4));
  face = blendFace(face, facePresets.alert, appear(t, 7.2, 9.7));
  face = blendFace(face, facePresets.pleased, smooth(t, 9.7, 0.4));
  face = blendFace(face, hopFace(t, 15.05, 0.85), appear(t, 14.7, 17.7));
  const avatarSize = 250;
  return (
    <AbsoluteFill
      style={{
        background: BRAND.cream,
        fontFamily: bodyFont,
        color: BRAND.ink,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: -100,
          top: 800,
          width: 2120,
          height: 500,
          background:
            "radial-gradient(ellipse at 50% 0%,#D2724E3C,transparent 70%)",
          borderRadius: "50%",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 70,
          top: 930,
          width: 1780,
          height: 22,
          borderRadius: "50%",
          background: "#72462D1B",
          filter: "blur(15px)",
        }}
      />

      {/* Large initial form; its actual subparts become the next scene. */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: `translateY(${28 * (1 - intro)}px)`,
          opacity: intro * (1 - smooth(t, 2.55, 0.65)),
        }}
      >
        <Glass x={75} y={85} w={1770} h={650} t={t} radius={52}>
          <div
            style={{
              height: 66,
              borderBottom: "2px solid #B8501F19",
              display: "flex",
              alignItems: "center",
              gap: 13,
              paddingLeft: 34,
            }}
          >
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                style={{
                  width: 13,
                  height: 13,
                  borderRadius: "50%",
                  background: BRAND.clay,
                  opacity: 0.3 + i * 0.2,
                }}
              />
            ))}
          </div>
        </Glass>
      </div>

      {/* Hinged folio: pages unfold to receive the same pieces. No generic success check. */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          perspective: 1800,
          opacity: bookOpen,
        }}
      >
        {[-1, 1].map((side) => (
          <div
            key={side}
            style={{
              position: "absolute",
              left: side < 0 ? 90 : 960,
              top: 120,
              width: 870,
              height: 660,
              transformOrigin: side < 0 ? "right center" : "left center",
              transform: `rotateY(${side * 86 * (1 - bookOpen)}deg)`,
              boxShadow: "0 30px 65px #72462D25",
              borderRadius:
                side < 0 ? "46px 12px 12px 46px" : "12px 46px 46px 12px",
              background: "linear-gradient(120deg,#FFFFFFC9,#FFFFFF60)",
              border: "2px solid #FFFDF6",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 14,
                border: "1px solid #B8501F20",
                borderRadius: 30,
              }}
            />
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  bottom: 8 + i * 5,
                  left: 20,
                  right: 20,
                  height: 1,
                  background: "#AD8E7438",
                }}
              />
            ))}
          </div>
        ))}
        <div
          style={{
            position: "absolute",
            left: 950,
            top: 135,
            width: 20,
            height: 626,
            borderRadius: 7,
            background: "linear-gradient(90deg,#A981593A,#FFFDF5,#A9815940)",
          }}
        />
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: 1821,
              top: 245 + i * 128,
              width: 42,
              height: 95,
              borderRadius: "0 16px 16px 0",
              background: [BRAND.clay, BRAND.amber, "#DDB494"][i],
              transform: `translateX(${-55 * (1 - smooth(t, 12 + i * 0.12, 0.45))}px)`,
              zIndex: -1,
            }}
          />
        ))}
      </div>

      <Place
        x={s.avatar.x}
        y={s.avatar.y}
        w={avatarSize}
        h={avatarSize}
        scale={1 + 0.2 * s.book}
        rotate={-8 * s.split * (1 - s.book)}
        opacity={intro}
      >
        <div style={{ filter: "drop-shadow(0 24px 22px #B8501F24)" }}>
          <Person size={avatarSize} />
        </div>
      </Place>
      <Place
        x={s.name.x}
        y={s.name.y}
        w={1080}
        h={166}
        scale={s.name.scale}
        rotate={-4 * s.split * (1 - s.book)}
        opacity={intro}
      >
        <Glass
          x={0}
          y={0}
          w={1080}
          h={166}
          t={t}
          radius={34}
          opacity={1 - s.book * 0.8}
        />
        <div
          style={{
            position: "absolute",
            left: 55,
            top: 28,
            fontFamily: displayFont,
            fontSize: 84,
          }}
        >
          Sam
        </div>
        <div
          style={{
            position: "absolute",
            right: 50,
            top: 48,
            fontSize: 47,
            color: BRAND.clayDark,
            opacity: s.split * (1 - s.book),
          }}
        >
          Name
        </div>
      </Place>
      <Place
        x={s.email.x}
        y={s.email.y}
        w={1000}
        h={210}
        scale={s.email.scale}
        rotate={4 * s.split * (1 - s.book)}
        opacity={intro}
      >
        <Glass x={0} y={0} w={1000} h={210} t={t - 2.2} radius={36} />
        <div style={{ position: "absolute", left: 42, top: 52 }}>
          <MailIcon size={108} />
        </div>
        <div
          style={{
            position: "absolute",
            left: 184,
            top: 35,
            fontSize: 31,
            color: "#796558",
          }}
        >
          Email
        </div>
        <div
          style={{
            position: "absolute",
            left: 184,
            top: 87,
            fontSize: 52,
            fontWeight: 500,
            color: s.replied ? BRAND.ink : BRAND.clayDark,
          }}
        >
          {s.replied ? "sam@example.com" : "—"}
        </div>
        <div
          style={{
            position: "absolute",
            right: 43,
            top: 52,
            width: 82,
            height: 82,
            border: "3px dashed #B8501F77",
            borderRadius: 22,
            opacity: (1 - smooth(t, 9.65, 0.35)) * s.split,
            display: "grid",
            placeItems: "center",
            fontSize: 47,
            color: BRAND.clayDark,
          }}
        >
          ?
        </div>
        <div
          style={{
            position: "absolute",
            inset: 5,
            borderRadius: 31,
            border: "3px solid #D2724E",
            opacity: appear(t, 9.65, 10.6),
          }}
        />
      </Place>

      {/* An opened envelope + supplied reply, with the same person above it. */}
      <div
        style={{
          position: "absolute",
          left: 95,
          top: 440,
          width: 580,
          height: 350,
          opacity: envelope,
          transform: `translateX(${-140 * (1 - smooth(t, 5.7, 0.65))}px)`,
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 25,
            top: 40,
            width: 530,
            height: 295,
            borderRadius: 32,
            background: "#FDF8F0",
            boxShadow: "0 30px 50px #89503227",
            border: "3px solid #FFFFFF",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 27,
            top: 43,
            width: 526,
            height: 275,
            transformOrigin: "top center",
            transform: `perspective(900px) rotateX(${-165 * flap}deg)`,
            clipPath: "polygon(0 0,100% 0,50% 87%)",
            background: "linear-gradient(180deg,#F7EADF,#DCAB8A)",
            borderRadius: 14,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 35,
            top: 75,
            width: 510,
            height: 235,
            transform: `translateY(${-95 * flap}px)`,
            background: "#FFFEF8",
            borderRadius: 22,
            boxShadow: "0 10px 20px #A0775920",
            display: "grid",
            placeItems: "center",
            fontSize: 39,
            color: BRAND.clayDark,
          }}
        >
          {t < 7.7 ? "Email?" : "sam@example.com"}
        </div>
        <svg
          width={580}
          height={350}
          style={{ position: "absolute", inset: 0 }}
        >
          <path
            d="M27 58 L290 230 L553 58 L553 316 Q553 336 533 336 L47 336 Q27 336 27 316 Z"
            fill="#FFF6E9"
            stroke="#E4C1A6"
            strokeWidth={3}
          />
          <path
            d="M27 315 L205 195 M553 315 L375 195"
            stroke="#DDB497"
            strokeWidth={3}
          />
        </svg>
      </div>
      {/* Reply sweeps across the full frame into the vacant field. */}
      <Place
        x={370 + 1175 * reply}
        y={465 + 280 * reply - 350 * Math.sin(Math.PI * reply)}
        w={240}
        h={150}
        scale={1 - 0.52 * reply}
        rotate={-12 + 24 * reply}
        opacity={appear(t, 8.05, 9.64)}
      >
        <Glass x={0} y={0} w={240} h={150} t={t - 8} radius={28} />
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "grid",
            placeItems: "center",
            fontSize: 96,
            fontFamily: displayFont,
            color: BRAND.clayDark,
          }}
        >
          @
        </div>
      </Place>

      {/* Two physical controls, struck by Claude on their actual contact frames. */}
      <div
        style={{
          position: "absolute",
          left: 595,
          top: 870 + s.press,
          width: 310,
          height: 76,
          borderRadius: "24px 24px 35px 35px",
          background: "linear-gradient(180deg,#E6A07A,#B8501F)",
          boxShadow: "0 15px 0 #8D4525,0 26px 33px #B8501F28",
          opacity: 1 - smooth(t, 4.9, 0.45),
        }}
      >
        <svg
          width={70}
          height={50}
          viewBox="0 0 80 50"
          style={{ position: "absolute", left: 210, top: 9 }}
        >
          <path
            d="M7 25 H63 M46 7 L66 25 L46 43"
            fill="none"
            stroke="#FFF9EF"
            strokeWidth={5}
            strokeLinecap="round"
          />
        </svg>
      </div>
      <div
        style={{
          position: "absolute",
          left: 1460,
          top: 870 + s.savePress,
          width: 360,
          height: 76,
          borderRadius: 24,
          background: "linear-gradient(180deg,#E6A07A,#B8501F)",
          boxShadow: "0 15px 0 #8D4525,0 26px 33px #B8501F28",
          opacity: smooth(t, 13.7, 0.5),
        }}
      >
        <div
          style={{
            position: "absolute",
            right: 35,
            top: 13,
            fontSize: 36,
            color: "#FFF8EC",
          }}
        >
          Save
        </div>
      </div>
      {/* Save payoff: a clasp travels onto the folio and locks it, leaving an embossed seal. */}
      <div
        style={{
          position: "absolute",
          left: 1080,
          top: 710,
          width: 405,
          height: 94,
          opacity: smooth(t, 16.12, 0.2),
          transform: `translateY(${125 * (1 - close)}px)`,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 24,
            background: "linear-gradient(135deg,#EDD0A8,#CF9544,#E4B978)",
            boxShadow: "inset 0 3px 2px #FFF3D5,0 13px 23px #926A2D25",
            display: "grid",
            placeItems: "center",
            fontFamily: displayFont,
            fontSize: 49,
            color: "#634221",
          }}
        >
          Saved
        </div>
        <div
          style={{
            position: "absolute",
            left: 30,
            right: 30,
            top: 12,
            bottom: 12,
            border: "2px solid #996A2B55",
            borderRadius: 15,
          }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          left: 200,
          top: 595,
          width: 580,
          textAlign: "center",
          fontFamily: displayFont,
          fontSize: 54,
          color: BRAND.clayDark,
          opacity: smooth(t, 13, 0.5),
        }}
      >
        Contact
      </div>
      <SpriteActor
        t={t}
        x={s.sprite.x}
        y={s.sprite.y}
        size={240}
        opacity={intro}
        pose={s.sprite.pose}
        angle={s.sprite.lean}
        face={face}
        gait={{ phase: t * 20, amount: s.sprite.walk }}
      />
    </AbsoluteFill>
  );
};
