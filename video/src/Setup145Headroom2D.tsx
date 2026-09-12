import React from "react";
import { Gear, Bolt } from "./Setup145Craft";
import { Img, staticFile } from "remotion";
import {
  P,
  E,
  S,
  L,
  H,
  pop,
  Svg,
  Stage,
  Actor,
  Mark,
  Impact,
  jingle,
} from "./Setup145FlatKit";
import { inter } from "./fonts";

const ribbonColors = [P.orange, P.blue, P.gold];
// Preserve all three colored strands as redundancy is squeezed out.
const Ribbon: React.FC<{
  x: number;
  y: number;
  compact: number;
  scale?: number;
  angle?: number;
  phase?: number;
  roll?: number;
}> = ({ x, y, compact, scale = 1, angle = 0, phase = 0, roll = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${angle}) scale(${scale})`}>
    {ribbonColors.map((color, k) => {
      const points = Array.from({ length: 85 }, (_, i) => {
        const t = i / 84,
          a = t * Math.PI * 6 + k * 0.55;
        const px =
          (t - 0.5) * 260 + (1 - compact) * Math.sin(a + phase * 0.3) * 76;
        const py =
          (1 - compact) * Math.sin(a * 1.45 + phase + k * 0.8) * 98 +
          Math.sin(a + phase) * 6 +
          k * 12 -
          12;
        const ra = t * Math.PI * 6 + phase * 0.15;
        const rx = Math.cos(ra) * (60 - k * 12 + t * 8),
          ry = Math.sin(ra) * (60 - k * 12 + t * 8);
        return `${i ? "L" : "M"}${(px * (1 - roll) + rx * roll).toFixed(2)} ${(py * (1 - roll) + ry * roll).toFixed(2)}`;
      }).join(" ");
      return (
        <g key={k}>
          <path
            d={points}
            fill="none"
            stroke={P.ink}
            strokeWidth={22}
            strokeLinecap="round"
          />
          <path
            d={points}
            fill="none"
            stroke={color}
            strokeWidth={15}
            strokeLinecap="round"
          />
        </g>
      );
    })}
  </g>
);
const Bulb: React.FC<{
  x: number;
  y: number;
  on: number;
  scale?: number;
  f: number;
  angle?: number;
}> = ({ x, y, on, scale = 1, f, angle = 0 }) => (
  <g
    transform={`translate(${x} ${y - 205}) rotate(${angle}) translate(0 205) scale(${scale})`}
    strokeLinejoin="round"
  >
    <path d="M0-233V-146" stroke={P.ink} strokeWidth={6} />
    <path
      d="M-17-229Q0-245 17-229"
      fill="none"
      stroke={P.ink}
      strokeWidth={6}
    />
    <path
      d="M-61 63C-134 10-136-88-63-126C0-164 87-132 108-73C130-15 93 27 59 62L50 109H-50Z"
      fill={on > 0.05 ? "#FFE19A" : "#FFF9DB"}
      stroke={P.ink}
      strokeWidth={7}
    />
    <path
      d="M-75-71Q-62-103-23-111"
      stroke="#FFFDF2"
      strokeWidth={15}
      fill="none"
      strokeLinecap="round"
    />
    <path
      d="M-49 107H49V151Q0 177-49 151Z"
      fill="#C0C7A9"
      stroke={P.ink}
      strokeWidth={6}
    />
    <path
      d="M-51 116L50 124M-51 135L50 143"
      fill="none"
      stroke={P.ink}
      strokeWidth={5}
    />
    <path d="M-24 160Q0 185 25 160" fill={P.ink} />
    {ribbonColors.map((color, k) => (
      <path
        key={k}
        d={`M${-27 + k * 27} 105V${10 - k * 13}l-18-25l18-23l18 23l-18 25`}
        fill="none"
        stroke={color}
        strokeWidth={7}
        opacity={0.25 + 0.75 * on}
      />
    ))}
    {on > 0 &&
      Array.from({ length: 9 }, (_, i) => {
        const a = ((-180 + i * 27) * Math.PI) / 180,
          rr = 139 + H(f, 124, 17) * 18;
        return (
          <path
            key={i}
            d={`M${Math.cos(a) * rr} ${-30 + Math.sin(a) * rr}l${Math.cos(a) * 22} ${Math.sin(a) * 22}`}
            stroke={P.gold}
            strokeWidth={7}
            opacity={on * 0.8}
            strokeLinecap="round"
          />
        );
      })}
  </g>
);
const Coin: React.FC<{
  x: number;
  y: number;
  angle?: number;
  scale?: number;
}> = ({ x, y, angle = 0, scale = 1 }) => (
  <g transform={`translate(${x} ${y}) rotate(${angle}) scale(${scale})`}>
    <circle r={23} fill="#C28A28" stroke={P.ink} strokeWidth={4} />
    <circle
      cx={-2}
      cy={-3}
      r={21}
      fill={P.gold}
      stroke={P.ink}
      strokeWidth={3}
    />
    <circle
      cx={-2}
      cy={-3}
      r={15}
      fill="none"
      stroke="#FFF0AF"
      strokeWidth={3}
    />
    <path d="M-2-15L2-7L10-3L2 1L-2 9L-6 1L-14-3L-6-7Z" fill="#AB7225" />
  </g>
);
const Pouch: React.FC<{
  x: number;
  y: number;
  closed: number;
  angle: number;
  full?: number;
  held?: number;
}> = ({ x, y, closed, angle, full = 0, held = 0 }) => (
  <g
    transform={`translate(${x} ${y}) rotate(${angle}) scale(${1 + full * 0.45} 1)`}
    strokeLinejoin="round"
  >
    {held > 0 && (
      <path
        d={`M-32-47Q-50 ${-55 - held * 128} 6 ${-55 - held * 110}Q49 ${-55 - held * 70} 28-47`}
        fill="none"
        stroke={P.ink}
        strokeWidth={6}
      />
    )}
    <path
      d={`M${-43 + closed * 12}-55Q0 ${-71 + closed * 13} ${43 - closed * 12}-55L43-25Q88 6 82 61Q74 98 0 95Q-72 96-82 61Q-88 9-43-25Z`}
      fill="#76B99B"
      stroke={P.ink}
      strokeWidth={6}
    />
    <path
      d="M-46-25Q0-15 45-25M-24-24Q-45 28-33 64M25-22Q43 20 35 62"
      stroke="#3B8066"
      strokeWidth={5}
      fill="none"
    />
    <path d="M-39-32Q0-21 40-32" stroke="#FFE6A4" strokeWidth={7} fill="none" />
    <path
      d={`M${-37 + closed * 10}-55Q0-70 ${37 - closed * 10}-55`}
      stroke={P.ink}
      strokeWidth={6}
      fill="none"
    />
    <path
      d="M-6-28Q13-53 27-34Q21-21-6-28Q-33-45-32-27Q-24-14-6-28L13-3M-6-28L-19 0"
      stroke="#FFF0C9"
      strokeWidth={5}
      fill="none"
    />
    <path
      d="M-27 40l19 17L28 16"
      stroke="#FFF0C9"
      strokeWidth={9}
      strokeLinecap="round"
      fill="none"
    />
  </g>
);

export const HeadroomContinuation: React.FC<{
  f: number;
  variant?: number;
}> = ({ f, variant = 0 }) => {
  const squeeze = S(f, 35, 29),
    release = E(f, 77, 17),
    exit = E(f, 99, 19);
  const pressX = 387 - exit * 780,
    pressY = 448;
  const receive = H(f, 94, 12),
    step = E(f, 104, 18),
    bagLift = E(f, 214, 19),
    carry = E(f, 222, 17),
    catchShake = Array.from(
      { length: 8 },
      (_, i) => H(f, 169 + i * 4, 7) * (i % 2 ? 1 : -1) * 3,
    ).reduce((a, b) => a + b, 0);
  const heroX = 645 - step * 270 - carry * 170,
    heroY =
      405 - step * 7 + receive * 10 + H(f, 35, 30) * 8 - H(f, 217, 17) * 9;
  const bagX = 623 - carry * 170,
    bagY = 646 - bagLift * 26;
  const wind = E(f, 64, 13);
  const light = E(f, 123, 7);
  const pendulum = (at: number, amp: number) =>
    f < at ? 0 : Math.sin((f - at) * 0.2) * Math.exp(-(f - at) / 32) * amp;
  const leftSwing = pendulum(106, 23) + pendulum(144, -19) + pendulum(170, 12);
  const rightSwing = pendulum(108, -22) + pendulum(161, 23) + pendulum(166, 14);
  return (
    <>
      <Stage variant={variant} claudeRotation={(f + 109) * 0.3} />
      <Svg>
        {/* The hook clamp becomes a cast-iron workshop press. */}
        <g transform={`translate(${pressX} ${pressY})`}>
          <path
            d="M-188-170Q-188-224-133-224H135Q163-222 163-193V-169H-113V113Q-113 151-73 151H137Q170 151 170 185V206H-188Z"
            fill="#4D9F83"
            stroke={P.ink}
            strokeWidth={7}
          />
          <path
            d="M-200 206H190V236H-211Z"
            fill="#2E715D"
            stroke={P.ink}
            strokeWidth={6}
          />
          <path
            d="M-177-77V150M-176 187H141"
            fill="none"
            stroke="#98DAB7"
            strokeWidth={8}
          />
          <path
            d={`M9-172H38V${-103 + squeeze * 58}H9Z`}
            fill="#B5C4B5"
            stroke={P.ink}
            strokeWidth={4}
          />
          {Array.from({ length: 9 }, (_, i) => (
            <path
              key={`thread${i}`}
              d={`M8 ${-166 + i * 10 + squeeze * 3}l31 8`}
              stroke={P.ink}
              strokeWidth={3}
            />
          ))}
          {[
            [-154, -192],
            [128, -192],
            [-161, 178],
            [143, 184],
          ].map(([x, y], i) => (
            <g key={`bolt${i}`} transform={`translate(${x} ${y})`}>
              <circle r={10} fill="#CFD9BB" stroke={P.ink} strokeWidth={3} />
              <path d="M-5-5L5 5" stroke={P.ink} strokeWidth={3} />
            </g>
          ))}
          <path
            d="M-156-156V115Q-156 175-98 177"
            fill="none"
            stroke="#347D66"
            strokeWidth={13}
            strokeLinecap="round"
          />
          <path d="M-230 6H-115M-228 27H-113" stroke={P.ink} strokeWidth={8} />
          {Array.from({ length: 7 }, (_, i) => (
            <path
              key={i}
              d={`M${-221 + i * 15} 1l9 33`}
              stroke="#B5BEB2"
              strokeWidth={5}
            />
          ))}
          <g
            transform={`translate(-245 16) rotate(${-35 + E(f, 0, 24) * 95 + squeeze * 240})`}
          >
            <circle r={64} fill="#D7E4CE" stroke={P.ink} strokeWidth={6} />
            {[0, 60, 120].map((a) => (
              <path
                key={a}
                d="M-55 0H55"
                transform={`rotate(${a})`}
                stroke="#4D9F83"
                strokeWidth={14}
              />
            ))}
            <path d="M0-69V69" stroke={P.ink} strokeWidth={9} />
            <circle
              cy={-70}
              r={15}
              fill={P.gold}
              stroke={P.ink}
              strokeWidth={4}
            />
            <circle
              cy={70}
              r={15}
              fill={P.gold}
              stroke={P.ink}
              strokeWidth={4}
            />
            <circle r={12} fill="#4D9F83" />
          </g>
          <Gear
            x={-156}
            y={99}
            r={45}
            a={E(f, 0, 24) * 125 + squeeze * 280 + wind * 45}
            c="#AFC4AD"
          />
          <Gear
            x={-196}
            y={137}
            r={38}
            a={-E(f, 0, 24) * 148 - squeeze * 330 - wind * 54}
            c="#D9B674"
          />
          <path
            d="M-179-123V-88M-171-123V-88M-163-123V-88M-155-123V-88"
            stroke="#174E43"
            strokeWidth={4}
          />
          <path
            d="M-127 197H129M-125 214H150"
            stroke="#77AA88"
            strokeWidth={3}
          />
          {[-82, -23, 36, 95].map((x) => (
            <Bolt key={x} x={x} y={221} r={5} />
          ))}
          <path
            d="M-203 179H-236Q-264 181-264 216V229"
            fill="none"
            stroke="#172C34"
            strokeWidth={13}
          />
          <path
            d="M-203 177H-236Q-266 179-266 216"
            fill="none"
            stroke="#94ABA1"
            strokeWidth={3}
          />
          {f < 78 && (
            <Ribbon
              x={-25 - (1 - E(f, 0, 24)) * 200}
              y={-28}
              phase={Math.min(f, 64) * 0.23}
              compact={squeeze}
              roll={wind}
              scale={1 - squeeze * 0.38 + wind * 0.38}
              angle={jingle(f, 57) * 0.25}
            />
          )}
          <g transform={`translate(0 ${-103 + squeeze * 58 - wind * 70})`}>
            <path
              d="M-130-32H158V0H-130Z"
              fill={P.mint}
              stroke={P.ink}
              strokeWidth={6}
            />
            <path d="M-115-26H143" stroke="#B8F3CA" strokeWidth={7} />
            <path
              d="M-109 0H139V12H-109Z"
              fill="#E3D4AA"
              stroke={P.ink}
              strokeWidth={4}
            />
            <Mark kind="headroom" x={24} y={-34} size={59} />
          </g>
          <g transform={`translate(0 ${64 - squeeze * 58 + wind * 50})`}>
            <path
              d="M-130 0H158V34H-130Z"
              fill={P.mint}
              stroke={P.ink}
              strokeWidth={6}
            />
            <path
              d="M-109-12H139V0H-109Z"
              fill="#E3D4AA"
              stroke={P.ink}
              strokeWidth={4}
            />
          </g>
          <Impact x={12} y={-17} t={L(f, 64, 12)} color={P.mint} size={150} />
        </g>
        {f >= 78 && f < 111 && (
          <Ribbon
            x={387 + release * 209}
            y={420 - Math.sin(release * Math.PI) * 95 + release * 112}
            phase={f * 0.18}
            compact={1}
            roll={1}
            scale={1 - E(f, 101, 8)}
            angle={-18 + release * 18}
          />
        )}
        {f >= 105 && (
          <>
            <g opacity={E(f, 105, 12)}>
              <Bulb
                x={238 - (1 - E(f, 106, 13)) * 270}
                y={350}
                on={light}
                scale={0.88}
                f={f}
                angle={leftSwing}
              />
              <Bulb
                x={757 + (1 - E(f, 108, 13)) * 230}
                y={350}
                on={light}
                scale={0.88}
                f={f}
                angle={rightSwing}
              />
            </g>
            {f >= 128 && f < 150 && (
              <path
                d="M390 338l22 23l41-51"
                fill="none"
                stroke="#3B9068"
                strokeWidth={12}
                strokeLinecap="round"
                strokeDasharray={100}
                strokeDashoffset={(1 - E(f, 128, 9)) * 100}
              />
            )}
          </>
        )}
      </Svg>
      <Actor
        f={f + 109}
        x={heroX}
        y={heroY}
        size={310 - step * 15}
        angle={
          -4 +
          step * 4 +
          receive * 5 -
          H(f, 35, 30) * 5 -
          bagLift * 4 +
          H(f, 217, 17) * 5
        }
        sx={1 + receive * 0.08 + H(f, 35, 30) * 0.04}
        sy={1 - receive * 0.06 - H(f, 35, 30) * 0.04}
        shock={H(f, 88, 9) * 0.3}
        cheer={0.25 + step * 0.35 + bagLift * 0.28}
        stern={(1 - step) * 0.35}
        gaze={-1 + step * 1.7}
      />
      <Svg>
        {f >= 123 && (
          <>
            <g opacity={E(f, 142, 10)}>
              <Pouch
                x={bagX}
                y={bagY}
                closed={E(f, 195, 12)}
                full={E(f, 167, 34)}
                held={bagLift}
                angle={
                  jingle(f, 197) * 0.45 +
                  catchShake -
                  bagLift * 6 +
                  H(f, 218, 12) * 7
                }
              />
            </g>
            {Array.from({ length: 10 }, (_, i) => {
              const enter = pop(f, 123 + i * 0.8, 7),
                paid = i < 2;
              const go = E(f, paid ? 145 + i * 5 : 154 + (i - 2) * 4, 15);
              const x0 = 86 + (i % 5) * 80,
                y0 = 563 + Math.floor(i / 5) * 79;
              const x1 = paid ? 756 : bagX,
                y1 = paid ? 482 : bagY - 52;
              if (go >= 1) return null;
              return (
                <Coin
                  key={i}
                  x={x0 + (x1 - x0) * go}
                  y={
                    y0 +
                    (y1 - y0) * go -
                    Math.sin(go * Math.PI) * (paid ? 70 : 135)
                  }
                  scale={enter * 1.75 * (1 - E(go, 0.9, 0.1) * 0.7)}
                  angle={go * (paid ? 240 : 400)}
                />
              );
            })}
            <Impact
              x={758}
              y={472}
              t={L(f, 161, 10)}
              color={P.gold}
              size={82}
            />
            {f >= 164 &&
              f < 203 &&
              Array.from({ length: 8 }, (_, i) => (
                <Coin
                  key={i}
                  x={bagX - 43 + (i % 4) * 27}
                  y={bagY - 62 - Math.floor(i / 4) * 22}
                  scale={0.57 * E(f, 166 + i * 4, 5)}
                  angle={-15 + i * 5}
                />
              ))}
            <Impact
              x={bagX}
              y={bagY - 48}
              t={L(f, 199, 11)}
              color={P.mint}
              size={94}
            />
          </>
        )}
        {f >= 218 && f < 233 && (
          <foreignObject x={681} y={133} width={285} height={64}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                background: P.paper,
                border: `3px solid ${P.ink}`,
                borderRadius: 16,
                padding: "7px 12px",
                fontFamily: inter.fontFamily,
                fontSize: 30,
                fontWeight: 900,
                color: P.ink,
              }}
            >
              <Img
                src={staticFile("logos/github.svg")}
                style={{ width: 35, height: 35 }}
              />
              66K+ ★
            </div>
          </foreignObject>
        )}
      </Svg>
    </>
  );
};
