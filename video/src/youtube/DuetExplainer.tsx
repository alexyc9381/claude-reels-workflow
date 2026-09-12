import React from "react";
import {
  AbsoluteFill,
  Audio,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { BRAND, bodyFont, displayFont } from "./brand";
import { SpriteActor } from "./WhiteGlass";
import { facePresets, blendFace, hopFace } from "./face-motion";
import { smooth } from "./explainer-motion";
import { arrive, windowAt } from "./refined-motion";
import { duetState } from "./duet-motion";
import { kineticState, KINETIC_RATE } from "./kinetic-motion";
import { castMotion, dressedPose, characterFace } from "./cast-motion";
import {
  hierarchyState,
  hierarchyFocus,
  hierarchyGestures,
} from "./hierarchy-motion";
import {
  boldState,
  boldFocus,
  boldGestures,
  settle,
  sourceResponse,
  BOLD_SIZES,
  CAST_ACCENTS,
} from "./bold-motion";
import {
  DispatchStamp,
  FilingIntake,
  FilingBookmark,
  DISPATCH_RATE,
} from "./DispatchProps";

const Portrait: React.FC<{ size: number; colorful?: boolean }> = ({
  size,
  colorful = false,
}) => (
  <svg width={size} height={size} viewBox="0 0 120 120">
    <defs>
      <linearGradient id="duet-portrait" x2="1" y2="1">
        <stop stopColor={colorful ? CAST_ACCENTS.mint : "#F2C5A1"} />
        <stop
          offset="1"
          stopColor={colorful ? CAST_ACCENTS.teal : BRAND.clay}
        />
      </linearGradient>
    </defs>
    <circle
      cx="60"
      cy="60"
      r="58"
      fill="url(#duet-portrait)"
      stroke="#FFF9EF"
      strokeWidth="3"
    />
    <circle
      cx="60"
      cy="42"
      r="16"
      fill="none"
      stroke="#FFF8EB"
      strokeWidth="5"
    />
    <path
      d="M29 96C29 59 91 59 91 96"
      stroke="#FFF8EB"
      strokeWidth="5"
      fill="none"
      strokeLinecap="round"
    />
  </svg>
);

/** Warm, code-native paper/glass stage. Environmental shapes stay BEHIND the
 * action; no orbit ring, particle confetti, extra headers or generated raster. */
const Studio: React.FC<{ t: number; active?: boolean; clear?: boolean }> = ({
  t,
  active = false,
  clear = false,
}) => (
  <>
    <svg width="1920" height="1080" style={{ position: "absolute" }}>
      <defs>
        <linearGradient id="studio-fold" x1="0" y1="0" x2="1" y2=".5">
          <stop stopColor="#B8501F" />
          <stop offset=".38" stopColor="#D2724E" />
          <stop offset=".8" stopColor="#E8B397" />
          <stop offset="1" stopColor="#EBD6BE" />
        </linearGradient>
        <linearGradient id="studio-rib">
          <stop stopColor="#945131" stopOpacity=".22" />
          <stop offset=".43" stopColor="#FFEFDA" stopOpacity=".35" />
          <stop offset="1" stopColor="#B76C46" stopOpacity=".03" />
        </linearGradient>
        <linearGradient id="stage-side" x2="0" y2="1">
          <stop stopColor="#E2C4A6" />
          <stop offset=".45" stopColor="#CA9B75" />
          <stop offset="1" stopColor="#B98561" />
        </linearGradient>
        <linearGradient id="stage-top" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#FFF9EF" />
          <stop offset="1" stopColor="#E5D4BD" />
        </linearGradient>
        <clipPath id="rib-clip">
          <path d="M292 643V292Q290 168 430 165H680Q756 165 781 238L895 550Q930 634 1058 659L1360 715H405Q292 715 292 643Z" />
        </clipPath>
        <filter id="floor-soft">
          <feGaussianBlur stdDeviation="15" />
        </filter>
      </defs>
      <g display={clear ? "none" : undefined}>
        <path
          d="M292 643V292Q290 168 430 165H680Q756 165 781 238L895 550Q930 634 1058 659L1360 715H405Q292 715 292 643Z"
          fill="url(#studio-fold)"
          opacity=".63"
        />
        <g
          clipPath="url(#rib-clip)"
          opacity=".7"
          transform={`translate(${(active ? 22 : 5) * Math.sin(t * 0.65)} 0)`}
        >
          {Array.from({ length: 15 }, (_, i) => (
            <path
              key={i}
              d={`M${280 + i * 42} 155C${280 + i * 42} 430 ${265 + i * 45} 630 ${470 + i * 63} 750`}
              stroke="url(#studio-rib)"
              strokeWidth="42"
              fill="none"
            />
          ))}
        </g>
        {active && (
          <g clipPath="url(#rib-clip)" opacity={0.15 + 0.1 * Math.sin(t * 0.7)}>
            <path
              d={`M${280 + 70 * t} 155L${450 + 70 * t} 750`}
              stroke="#FFF9ED"
              strokeWidth="95"
              filter="url(#floor-soft)"
            />
          </g>
        )}
        <path
          d="M792 225Q960 192 1026 302L1135 491Q1217 625 1559 653"
          stroke="#FFF9EE"
          strokeWidth="70"
          fill="none"
          opacity=".30"
        />
      </g>
      <ellipse
        cx="960"
        cy="900"
        rx="641"
        ry="34"
        fill="#926A4628"
        filter="url(#floor-soft)"
      />
      <path
        d="M266 793Q266 756 380 744H1530Q1660 755 1660 793V843Q1660 884 1518 894H410Q266 884 266 843Z"
        fill="url(#stage-side)"
      />
      <path
        d="M266 793Q266 756 380 744H1530Q1660 755 1660 793Q1660 834 1518 844H410Q266 834 266 793Z"
        fill="url(#stage-top)"
        stroke="#FFFAEF"
        strokeWidth="3"
      />
      <path
        d="M290 856Q342 875 410 876H1518Q1588 874 1634 856"
        fill="none"
        stroke="#FFF7E6"
        strokeWidth="2"
        opacity=".55"
      />
    </svg>
    {!clear && (
      <div
        style={{
          position: "absolute",
          left: 1010,
          top: 160,
          width: 670,
          height: 510,
          background: "radial-gradient(ellipse,#FFFDF477,transparent 68%)",
          filter: "blur(20px)",
        }}
      />
    )}
  </>
);

const Letter: React.FC<{
  s: ReturnType<typeof duetState>;
  t: number;
  clear?: boolean;
  cast?: boolean;
  bold?: boolean;
  dispatch?: boolean;
}> = ({
  s,
  t,
  clear = false,
  cast = false,
  bold = false,
  dispatch = false,
}) => (
  <div
    style={{
      position: "absolute",
      left: s.letter.x - 145,
      top: s.letter.y - 80,
      width: 290,
      height: 160,
      transform: `rotate(${s.letter.rotation}deg) scale(${s.letter.scale})`,
      opacity: s.letter.opacity,
      borderRadius: 13,
      background: "linear-gradient(135deg,#FFFCF5,#F5E5D1)",
      border: bold
        ? `3px solid ${CAST_ACCENTS.teal}`
        : clear
          ? "2px solid #C4A68C"
          : "2px solid #FFFEF8",
      boxSizing: "border-box",
      boxShadow: "0 14px 24px #794A2E28",
    }}
  >
    <div
      style={{
        position: "absolute",
        left: 23,
        top: 20,
        fontSize: 27,
        fontWeight: clear ? 600 : 500,
        letterSpacing: -0.8,
      }}
    >
      sam@example.com
    </div>
    <svg
      width="60"
      height="46"
      viewBox="0 0 60 46"
      style={{ position: "absolute", left: 27, top: 79 }}
    >
      <path
        d={`M2 9H55V39H2ZM2 9L28 ${27 - (cast ? 25 * windowAt(t, 1.9, 2.8) : 0)}L55 9`}
        fill="none"
        stroke={bold ? CAST_ACCENTS.teal : BRAND.clayDark}
        strokeWidth="3"
        strokeLinejoin="round"
      />
    </svg>
    <div
      style={{
        position: "absolute",
        right: 24,
        top: 80,
        fontFamily: displayFont,
        fontSize: 35,
        color: bold ? CAST_ACCENTS.teal : BRAND.clayDark,
        opacity: dispatch ? 0 : 1,
      }}
    >
      @
    </div>
    {dispatch && <DispatchStamp t={t} />}
    <div
      style={{
        position: "absolute",
        left: 13,
        right: 13,
        bottom: 10,
        height: 1,
        background: "#B0794633",
      }}
    />
  </div>
);

export const DuetExplainer: React.FC<{
  active?: boolean;
  clear?: boolean;
  cast?: boolean;
  hierarchy?: boolean;
  bold?: boolean;
  dispatch?: boolean;
}> = ({
  active = false,
  clear = false,
  cast = false,
  hierarchy = false,
  bold = false,
  dispatch = false,
}) => {
  const f = useCurrentFrame(),
    { fps } = useVideoConfig(),
    t = (f / fps) * (dispatch ? DISPATCH_RATE : active ? KINETIC_RATE : 1),
    k = bold ? boldState(t) : hierarchy ? hierarchyState(t) : kineticState(t),
    s = active ? k : duetState(t);
  const c = bold
    ? boldGestures(t)
    : hierarchy
      ? hierarchyGestures(t)
      : castMotion(t);
  if (dispatch) c.courier -= 0.8 * windowAt(t, 2.5, 2.85);
  const focus = bold ? boldFocus(t) : hierarchyFocus(t);
  const sizes = bold
    ? BOLD_SIZES
    : { courier: 190, archivist: 220, operator: 130 };
  const intro = arrive(t, 0.1, 0.7);
  let aFace = blendFace(
    facePresets.curious,
    hopFace(t, 0.8, 0.65),
    windowAt(t, 0.5, 2.9),
  );
  aFace = blendFace(aFace, facePresets.focused, windowAt(t, 3, 5));
  aFace = blendFace(aFace, facePresets.alert, windowAt(t, 4.9, 5.9));
  aFace = blendFace(aFace, facePresets.pleased, smooth(t, 5.9, 0.4));
  aFace = blendFace(aFace, hopFace(t, 9.3, 0.65), windowAt(t, 9.1, 11.4));
  let bFace = blendFace(
    facePresets.curious,
    facePresets.alert,
    windowAt(t, 4.55, 5.7),
  );
  bFace = blendFace(bFace, facePresets.impact, windowAt(t, 5.7, 5.88));
  bFace = blendFace(bFace, facePresets.focused, windowAt(t, 6, 7.7));
  bFace = blendFace(bFace, facePresets.pleased, smooth(t, 7.8, 0.3));
  bFace = blendFace(bFace, hopFace(t, 9.55, 0.7), windowAt(t, 9.35, 11.7));
  // Actors look toward their partner/the letter rather than sharing idle gaze.
  aFace = { ...aFace, gazeX: 2 * (1 - smooth(t, 10.8, 0.4)) };
  bFace = { ...bFace, gazeX: -2 * (1 - smooth(t, 10.8, 0.4)) };
  return (
    <AbsoluteFill
      style={{
        background: BRAND.cream,
        fontFamily: bodyFont,
        color: BRAND.ink,
        overflow: "hidden",
      }}
    >
      <Studio t={t} active={active} clear={clear} />
      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: `translateY(${16 * (1 - intro)}px)`,
          opacity: intro,
        }}
      >
        {/* The source is an actual envelope, not a card containing an envelope. */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            transformOrigin: "540px 490px",
            opacity: hierarchy ? focus.source : 1,
            transform: active
              ? `translateY(${30 * k.closing}px) rotate(${-7 * k.closing + (bold ? sourceResponse(t).rotation : 0)}deg) scale(${1 - 0.1 * k.closing + (bold ? sourceResponse(t).scaleOffset : 0)})`
              : "none",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 330,
              top: 350,
              width: 420,
              height: 275,
              perspective: 1500,
            }}
          >
            <div
              style={{
                position: "absolute",
                left: 26,
                top: 258,
                width: 366,
                height: 30,
                borderRadius: "50%",
                background: "#75452825",
                filter: "blur(13px)",
              }}
            />
            <svg
              width="420"
              height="275"
              style={{
                position: "absolute",
                transform: `rotateX(${-163 * s.flap}deg)`,
                transformOrigin: "50% 0%",
                overflow: "visible",
              }}
            >
              <path
                d="M0 0H420L210 175Z"
                fill={bold ? "#EDB050" : "#E7B997"}
                stroke="#FFF8E9"
                strokeWidth="4"
              />
            </svg>
          </div>
          {/* The source letter stays behind its pocket until it has been lifted. */}
          {t < 2.25 && (
            <Letter
              s={s}
              t={t}
              clear={clear}
              cast={cast}
              bold={bold}
              dispatch={dispatch}
            />
          )}
          <div
            style={{
              position: "absolute",
              left: 330,
              top: 350,
              width: 420,
              height: 275,
              backdropFilter: "blur(4px) saturate(110%)",
              clipPath: "polygon(0 0,50% 60%,100% 0,100% 100%,0 100%)",
            }}
          />
          <svg
            width="420"
            height="275"
            style={{
              position: "absolute",
              left: 330,
              top: 350,
              filter: "drop-shadow(0 17px 18px #7F4A3524)",
            }}
          >
            <defs>
              <linearGradient id="duet-envelope" x1="0" y1="0" x2="1" y2="1">
                <stop stopColor={clear ? "#FFFFFFE8" : "#FFFFFFBB"} />
                <stop
                  offset=".46"
                  stopColor={clear ? "#FFFDF2A8" : "#FFF8EC65"}
                />
                <stop
                  offset="1"
                  stopColor={clear ? "#FFFFFFF0" : "#FFFFFFD9"}
                />
              </linearGradient>
            </defs>
            <path
              d="M0 0L210 166L420 0V241Q420 272 387 272H33Q0 272 0 241Z"
              fill="url(#duet-envelope)"
              stroke={clear ? "#C4A68C" : "#FFFCF5"}
              strokeWidth="4"
            />
            <path
              d="M7 257L145 111M413 257L275 111"
              fill="none"
              stroke={clear ? "#A9775299" : "#B0815D50"}
              strokeWidth="2"
            />
            <path
              d="M12 17V237Q12 258 36 258H382"
              fill="none"
              stroke="#FFFFFFB5"
              strokeWidth="2"
              strokeDasharray={cast ? "100 560" : undefined}
              strokeDashoffset={cast ? -460 * smooth(t, 1.1, 1.5) : undefined}
            />
          </svg>
          <div
            style={{
              position: "absolute",
              left: 471,
              top: 531,
              width: 138,
              height: 65,
              borderRadius: "50%",
              background: bold
                ? "linear-gradient(130deg,#F3AA52,#DE7140)"
                : "linear-gradient(130deg,#E8B28C,#C97049)",
              boxShadow: "inset 0 2px 2px #FFF5DFB0,0 7px 12px #8D4F3425",
              display: "grid",
              placeItems: "center",
              fontFamily: displayFont,
              fontSize: 35,
              color: "#FFFAF1",
              transform: cast
                ? `rotate(${c.sealTurn}deg) scale(${1 - c.seal * 0.1},${1 + c.seal * 0.07})`
                : undefined,
            }}
          >
            Sam
          </div>
        </div>

        {/* Contact folio: rolled paper edge, inset glass field and a real hinged
          identity leaf. The finished record opens; no extra success panel. */}
        <div
          style={{
            position: "absolute",
            left: 1080,
            top: 242,
            width: 475,
            height: 378,
            perspective: 1500,
            opacity: hierarchy ? focus.book : 1,
          }}
        >
          <div
            style={{
              position: "absolute",
              left: -300,
              top: 0,
              width: 300,
              height: 378,
              transformOrigin: "100% 50%",
              transform: `rotateY(${90 * (1 - s.book)}deg)`,
              opacity: smooth(t, hierarchy ? 5.85 : active ? 1.25 : 7.8, 0.15),
              borderRadius: "26px 0 0 26px",
              background: clear
                ? "linear-gradient(110deg,#FFFEF9,#F2E4D5)"
                : "linear-gradient(110deg,#FFFEF1,#E8CFB5)",
              boxShadow: "inset -12px 0 18px #A97E5B22,0 16px 25px #83523220",
              border: clear ? "2px solid #C4A68C" : "2px solid #FFF8ED",
              boxSizing: "border-box",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: 65,
                top: 65,
                opacity: hierarchy
                  ? focus.portrait
                  : active
                    ? smooth(t, 2.85, 0.2)
                    : 1,
                transform: hierarchy
                  ? `translateY(${14 * (1 - focus.portrait)}px) scale(${0.92 + 0.08 * focus.portrait})`
                  : undefined,
              }}
            >
              <Portrait size={170} colorful={bold} />
            </div>
            <div
              style={{
                position: "absolute",
                top: 263,
                width: 300,
                textAlign: "center",
                fontFamily: displayFont,
                fontSize: 39,
                opacity: hierarchy
                  ? focus.name
                  : active
                    ? smooth(t, 3.5, 0.2)
                    : 1,
              }}
            >
              Sam
            </div>
          </div>
          {[2, 1].map((i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                inset: 0,
                transform: `translate(${i * 5}px,${i * 7}px) rotate(${active ? i * 5 * k.tabs + 2 * i * k.pageTurn + (cast ? c.crank * i * 3 : 0) : 0}deg)`,
                transformOrigin: "0% 95%",
                borderRadius: "5px 27px 27px 5px",
                background: bold
                  ? i === 2
                    ? CAST_ACCENTS.teal
                    : CAST_ACCENTS.gold
                  : i === 2
                    ? "#D59B72"
                    : "#F3DFC5",
                border: "1px solid #FFF3E2",
              }}
            />
          ))}
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "5px 27px 27px 5px",
              background: clear
                ? "linear-gradient(112deg,#E8D6C3,#FFFEF9 12%,#FFFEF9 85%,#EBD5BD)"
                : "linear-gradient(112deg,#EEE0CB,#FFFCF1 12%,#FFFBF0 85%,#E2C6A6)",
              boxShadow: "0 23px 38px #7B512024,inset 0 2px 2px #FFFFFF",
              border: clear ? "2px solid #C4A68C" : "2px solid #FFF9ED",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: 34,
                top: 31,
                fontFamily: displayFont,
                fontSize: 52,
                fontWeight: 600,
                opacity: hierarchy
                  ? focus.name
                  : active
                    ? smooth(t, cast ? 3.85 : 3.5, 0.2)
                    : 1,
              }}
            >
              Sam
            </div>
            <div
              style={{
                position: "absolute",
                right: 30,
                top: 49,
                fontSize: clear ? 25 : 22,
                fontWeight: clear ? 600 : 400,
                color: BRAND.clayDark,
                opacity: dispatch ? 0 : s.filled,
              }}
            >
              Contact
            </div>
            <div
              style={{
                position: "absolute",
                left: 33,
                top: 131,
                fontSize: 27,
                color: clear ? BRAND.ink : "#7A604B",
                fontWeight: clear ? 600 : 400,
              }}
            >
              Email
            </div>
            <div
              style={{
                position: "absolute",
                left: 30,
                right: 30,
                top: 186,
                height: 90,
                borderRadius: 18,
                border: bold
                  ? `3px solid ${CAST_ACCENTS.teal}`
                  : clear
                    ? "2px solid #CAB49E"
                    : "2px solid #FFFFFFD0",
                transform: bold
                  ? `scale(${1 + 0.045 * settle(t, 7.65)})`
                  : undefined,
                background: "linear-gradient(130deg,#FFFFFF9C,#FFFFFF39)",
                boxShadow: "inset 0 -2px 2px #C59A7445,0 10px 20px #A87C4C15",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: 23,
                  top: 20,
                  fontSize: 35,
                  color: BRAND.clayDark,
                  opacity: 1 - s.filled,
                }}
              >
                —
              </div>
              <div
                style={{
                  position: "absolute",
                  left: 20,
                  top: 25,
                  fontSize: clear ? 34 : 32,
                  letterSpacing: -0.8,
                  fontWeight: clear ? 600 : 500,
                  opacity: s.filled,
                  transform: `translateY(${15 * (1 - s.filled)}px)`,
                }}
              >
                sam@example.com
              </div>
              {cast && (
                <div
                  style={{
                    position: "absolute",
                    inset: -40,
                    pointerEvents: "none",
                    background:
                      "linear-gradient(110deg,transparent 38%,#FFFFFFDD 48%,#FFFFFF99 52%,transparent 62%)",
                    transform: `translateX(${-500 + c.sheen * 1000}px)`,
                    opacity: windowAt(t, 7.6, 8.7),
                  }}
                />
              )}
            </div>
            <div
              style={{
                position: "absolute",
                left: 34,
                bottom: 26,
                fontSize: 24,
                fontWeight: clear ? 600 : 400,
                color: BRAND.clayDark,
                opacity: active ? smooth(t, dispatch ? 8.4 : 8.1, 0.4) : s.book,
              }}
            >
              Saved
            </div>
            {dispatch && (
              <>
                <FilingIntake t={t} />
                <FilingBookmark t={t} />
              </>
            )}
          </div>
          <div
            style={{
              position: "absolute",
              left: -8,
              top: 13,
              bottom: 13,
              width: 15,
              borderRadius: 8,
              background: "linear-gradient(90deg,#B2764B,#F3CFA5,#BE8258)",
              boxShadow: "1px 0 2px #875C3630",
            }}
          />
          <div
            style={{
              position: "absolute",
              right: -14,
              top: 43,
              width: 28,
              height: 91,
              borderRadius: "0 10px 10px 0",
              background: bold
                ? `linear-gradient(90deg,${CAST_ACCENTS.blue},${CAST_ACCENTS.teal})`
                : "linear-gradient(90deg,#B45C33,#D9986C)",
              zIndex: -1,
            }}
          />
        </div>

        {active && (
          <>
            <div
              style={{
                position: "absolute",
                left: k.portrait.x - k.portrait.size / 2,
                top: k.portrait.y - k.portrait.size / 2,
                opacity: k.portrait.opacity,
                transform: `rotate(${-12 * Math.sin(Math.PI * k.portrait.p)}deg)`,
                filter: "drop-shadow(0 12px 14px #894E332A)",
              }}
            >
              <Portrait size={k.portrait.size} />
            </div>
            <div
              style={{
                position: "absolute",
                left: k.name.x - 80,
                top: k.name.y - 35,
                width: 160,
                height: 70,
                borderRadius: 35,
                fontFamily: displayFont,
                fontSize: 43 + 9 * k.name.p,
                display: "grid",
                placeItems: "center",
                color: BRAND.clayDark,
                background: "linear-gradient(130deg,#FFFDF1DF,#FFFFFF66)",
                border: clear ? "2px solid #C4A68C" : "2px solid #FFFCF4",
                boxShadow: "0 12px 20px #9F624326",
                opacity: k.name.opacity,
                transform: `rotate(${8 * Math.sin(Math.PI * k.name.p)}deg)`,
              }}
            >
              Sam
            </div>
            <SpriteActor
              t={t + 0.22}
              x={k.third.x}
              y={820 - sizes.operator * 0.92}
              size={sizes.operator}
              colorful={bold}
              opacity={hierarchy ? focus.operator : 1}
              pose={
                cast
                  ? dressedPose(k.third.pose, c.operator, t, 2)
                  : k.third.pose
              }
              outfit={cast ? "operator" : undefined}
              gesture={c.operator}
              face={
                cast
                  ? characterFace(
                      blendFace(
                        facePresets.focused,
                        facePresets.pleased,
                        s.filled,
                      ),
                      t,
                      2,
                    )
                  : blendFace(
                      facePresets.focused,
                      facePresets.pleased,
                      s.filled,
                    )
              }
              gait={{ phase: t * 23, amount: k.third.walk }}
              angle={
                hierarchy
                  ? 2 * windowAt(t, 6, 7.2)
                  : -7 * windowAt(t, 1, 2) + 6 * windowAt(t, 7, 8)
              }
            />
          </>
        )}

        <SpriteActor
          t={t}
          x={s.ax}
          y={820 - sizes.courier * 0.92}
          size={sizes.courier}
          colorful={bold}
          opacity={hierarchy ? focus.courier : 1}
          pose={cast ? dressedPose(s.aPose, c.courier, t, 0) : s.aPose}
          face={cast ? characterFace(aFace, t, 0) : aFace}
          outfit={cast ? "courier" : undefined}
          gesture={c.courier}
          gait={{ phase: t * 21, amount: s.aWalk }}
          angle={-5 * windowAt(t, 4.55, 5.1) + 3 * windowAt(t, 5.4, 5.9)}
        />
        <SpriteActor
          t={t + 0.11}
          x={s.bx}
          y={820 - sizes.archivist * 0.92}
          size={sizes.archivist}
          colorful={bold}
          opacity={hierarchy ? focus.archivist : 1}
          pose={cast ? dressedPose(s.bPose, c.archivist, t, 1) : s.bPose}
          face={cast ? characterFace(bFace, t, 1) : bFace}
          outfit={cast ? "archivist" : undefined}
          gesture={c.archivist}
          gait={active ? { phase: t * 20, amount: k.bWalk } : undefined}
          angle={-4 * windowAt(t, 4.6, 5.55)}
        />
        {t >= 2.25 && (
          <Letter
            s={s}
            t={t}
            clear={clear}
            cast={cast}
            bold={bold}
            dispatch={dispatch}
          />
        )}
      </div>
    </AbsoluteFill>
  );
};
export const DuetExplainerSound: React.FC = () => (
  <>
    <DuetExplainer />
    <Audio src={staticFile("sfx-duet/glass-mix.wav")} />
  </>
);
export const KineticExplainer: React.FC = () => <DuetExplainer active />;
export const ClearExplainer: React.FC = () => <DuetExplainer active clear />;
export const CastExplainer: React.FC = () => (
  <DuetExplainer active clear cast />
);
export const HierarchyExplainer: React.FC = () => (
  <DuetExplainer active clear cast hierarchy />
);
export const BoldExplainer: React.FC = () => (
  <DuetExplainer active clear cast hierarchy bold />
);
export const BoldExplainerSound: React.FC = () => (
  <>
    <BoldExplainer />
    <Audio src={staticFile("sfx-hierarchy/glass-mix.wav")} />
  </>
);
export const DispatchExplainer: React.FC = () => (
  <DuetExplainer active clear cast hierarchy bold dispatch />
);
export const DispatchExplainerSound: React.FC = () => (
  <>
    <DispatchExplainer />
    <Audio src={staticFile("sfx-dispatch/glass-mix.wav")} />
  </>
);
export const HierarchyExplainerSound: React.FC = () => (
  <>
    <HierarchyExplainer />
    <Audio src={staticFile("sfx-hierarchy/glass-mix.wav")} />
  </>
);
export const CastExplainerSound: React.FC = () => (
  <>
    <CastExplainer />
    <Audio src={staticFile("sfx-kinetic/glass-mix.wav")} />
  </>
);
export const ClearExplainerSound: React.FC = () => (
  <>
    <ClearExplainer />
    <Audio src={staticFile("sfx-kinetic/glass-mix.wav")} />
  </>
);
export const KineticExplainerSound: React.FC = () => (
  <>
    <DuetExplainer active />
    <Audio src={staticFile("sfx-kinetic/glass-mix.wav")} />
  </>
);
