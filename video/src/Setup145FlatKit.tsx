import React from "react";
import { CraftWorld } from "./Setup145Craft";
import { Img, staticFile, useCurrentFrame } from "remotion";
import { Mascot } from "./SlopKit";
import { inter } from "./fonts";
import logoPaths from "./data/setup145-logo-paths.json";
export const P = {
  ink: "#142a32",
  paper: "#FFF0C9",
  cream: "#F9E8BF",
  orange: "#EA714B",
  red: "#D95142",
  mint: "#62CF9A",
  blue: "#54AAD9",
  gold: "#F3BD47",
  muted: "#8EABAA",
};
export const L = (f: number, a: number, d: number) =>
  Math.max(0, Math.min(1, (f - a) / d));
export const E = (f: number, a: number, d: number) =>
  1 - Math.pow(1 - L(f, a, d), 3);
export const S = (f: number, a: number, d: number) => {
  const t = L(f, a, d);
  return t * t * (3 - 2 * t);
};
export const H = (f: number, a: number, d: number) =>
  Math.sin(L(f, a, d) * Math.PI);
export const pop = (f: number, a: number, d = 14) => {
  const t = L(f, a, d);
  return 1 - Math.pow(1 - t, 3) + Math.sin(t * Math.PI) * 0.15;
};
export const xy = (
  x: number,
  y: number,
  w?: number,
  h?: number,
): React.CSSProperties => ({
  position: "absolute",
  left: x,
  top: y,
  width: w,
  height: h,
});
export const brands: Record<string, string> = {
  headroom: "setup145-r2/headroom.svg",
  hud: "logos/claude.svg",
  aisa: "setup145-r2/aisa.svg",
  similarweb: "setup145-r2/similarweb.png",
  semrush: "setup145-r2/semrush.svg",
};
export const Mark: React.FC<{
  kind: string;
  x: number;
  y: number;
  size?: number;
  label?: string;
  rotate?: number;
}> = ({ kind, x, y, size = 76, label, rotate = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${rotate})`}>
    <circle r={size * 0.61} fill={P.paper} stroke={P.ink} strokeWidth={4} />
    {kind in logoPaths ? (
      <svg
        x={-size * 0.43}
        y={-size * 0.43}
        width={size * 0.86}
        height={size * 0.86}
        viewBox={logoPaths[kind as keyof typeof logoPaths].viewBox}
        fill={logoPaths[kind as keyof typeof logoPaths].fill}
        preserveAspectRatio="xMidYMid meet"
        dangerouslySetInnerHTML={{
          __html: logoPaths[kind as keyof typeof logoPaths].body,
        }}
      />
    ) : (
      <foreignObject
        x={-size * 0.43}
        y={-size * 0.43}
        width={size * 0.86}
        height={size * 0.86}
      >
        <Img
          src={staticFile(brands[kind])}
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      </foreignObject>
    )}
    {label && (
      <text
        y={size * 0.93}
        textAnchor="middle"
        fill={P.ink}
        fontFamily={inter.fontFamily}
        fontWeight={900}
        fontSize={21}
      >
        {label}
      </text>
    )}
  </g>
);
export const Svg: React.FC<{
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ children, style }) => (
  <svg
    key={useCurrentFrame()}
    viewBox="0 0 1012 792"
    width={1012}
    height={792}
    style={{ ...xy(0, 0), overflow: "visible", ...style }}
  >
    {children}
  </svg>
);
export const Stage: React.FC<{
  variant?: number;
  claudeRotation?: number;
}> = ({ variant = 0, claudeRotation }) => (
  <CraftWorld id={variant === 0 ? 0 : 1} f={(claudeRotation ?? 0) / 0.3} />
);

export const Actor: React.FC<{
  f: number;
  x: number;
  y: number;
  size?: number;
  angle?: number;
  sx?: number;
  sy?: number;
  shock?: number;
  cheer?: number;
  stern?: number;
  gaze?: number;
}> = ({
  f,
  x,
  y,
  size = 310,
  angle = 0,
  sx = 1,
  sy = 1,
  shock = 0,
  cheer = 0,
  stern = 0,
  gaze = 0,
}) => (
  <>
    <div
      style={{
        ...xy(x + size * 0.17, y + size * 0.91, size * 0.66, 17),
        borderRadius: "50%",
        background: "#061B2E55",
      }}
    />
    <div
      style={{
        ...xy(x, y, size, size),
        transform: `rotate(${angle}deg) scale(${sx},${sy})`,
        transformOrigin: "50% 92%",
        filter: "drop-shadow(5px 7px 0 rgba(5,20,26,.22))",
      }}
    >
      <Mascot
        lf={f + 17 + Math.floor(x % 23)}
        size={size}
        nodAmp={0}
        suit={f < 109 || f >= 792 || (f >= 565 && f < 636) ? 1 : 0}
        constr={f >= 109 && f < 349 ? 1 : 0}
        prof={(f >= 349 && f < 565) || (f >= 636 && f < 792) ? 1 : 0}
        gaze={gaze * 6}
        shock={shock}
        cheer={cheer}
        stern={stern}
      />
    </div>
  </>
);
export const Title: React.FC<{
  children: React.ReactNode;
  x?: number;
  y?: number;
  s?: number;
  color?: string;
}> = ({ children, x = 66, y = 157, s = 43, color = P.ink }) => (
  <div
    style={{
      ...xy(x, y),
      fontFamily: inter.fontFamily,
      fontSize: s,
      fontWeight: 900,
      lineHeight: 1.05,
      letterSpacing: -1.2,
      color,
    }}
  >
    {children}
  </div>
);
export const Impact: React.FC<{
  x: number;
  y: number;
  t: number;
  color?: string;
  size?: number;
}> = ({ x, y, t, color = P.gold, size = 76 }) =>
  t > 0 && t < 1 ? (
    <g transform={`translate(${x} ${y})`} opacity={1 - t}>
      {Array.from({ length: 8 }, (_, i) => {
        const a = (i * Math.PI) / 4;
        const r = size * (0.36 + t * 0.5);
        return (
          <path
            key={i}
            d={`M${Math.cos(a) * r} ${Math.sin(a) * r}l${Math.cos(a) * size * 0.25} ${Math.sin(a) * size * 0.25}`}
            stroke={color}
            strokeWidth={8 * (1 - t) + 2}
            strokeLinecap="round"
          />
        );
      })}
    </g>
  ) : null;
export const Plug: React.FC<{ color?: string; scale?: number }> = ({
  color = P.muted,
  scale = 1,
}) => (
  <g
    transform={`scale(${scale})`}
    stroke={P.ink}
    strokeWidth={5}
    strokeLinejoin="round"
  >
    <path
      d="M-27 22Q-36 10-31-29Q0-43 31-29Q36 10 27 22L14 31H-14Z"
      fill={color}
    />
    <path d="M-17-31V-55H-7V-32M9-32V-55H19V-31" fill="#FFF8D7" />
    <path d="M-10 31v18h20V31" fill={P.ink} />
    <path d="M-21-11H21M-21 2H21" fill="none" opacity={0.24} />
  </g>
);
export const Wrench: React.FC<{ kind?: number; color?: string }> = ({
  kind = 0,
  color = "#CAD6C3",
}) => (
  <g stroke={P.ink} strokeWidth={5} strokeLinejoin="round">
    {kind % 3 === 0 ? (
      <>
        <path
          d="M0-13H151Q152-43 181-48L173-23L189-10L208-23L207-48Q238-28 220 5Q208 24 176 15H0Z"
          fill={color}
        />
        <path d="M19-3H143" fill="none" opacity={0.35} />
      </>
    ) : kind % 3 === 1 ? (
      <>
        <path d="M0-15H130L159-30L205-18V5L159 15L130 0H0Z" fill={color} />
        <path d="M152-12H190M153-2H190" fill="none" opacity={0.4} />
      </>
    ) : (
      <>
        <path
          d="M0-15H111V-25H140V-17H202L215-4L202 10H140V17H111V3H0Z"
          fill={color}
        />
        <path d="M168-17V10M179-17V10M190-17V10" fill="none" opacity={0.35} />
      </>
    )}
  </g>
);
export const Clamp: React.FC<{ open?: number }> = ({ open = 1 }) => (
  <g stroke={P.ink} strokeWidth={6} strokeLinejoin="round">
    <path d="M0-14H154Q171-14 176 0Q171 15 154 15H0Z" fill={P.mint} />
    <path
      d={`M116 ${-15 - open * 38}H218V${-1 - open * 38}H151V-5H116Z`}
      fill={P.mint}
    />
    <path
      d={`M116 ${15 + open * 38}H218V${1 + open * 38}H151V5H116Z`}
      fill={P.mint}
    />
    <path
      d={`M190 ${-1 - open * 38}v16h25v-16M190 ${1 + open * 38}v-16h25v16`}
      fill="#F3E3B5"
    />
    <path d="M39-2H93" stroke="#FFFFFF" strokeWidth={5} opacity={0.5} />
    <path d="M20 8H108M123-8H157" stroke="#278161" strokeWidth={3} />
    {[24, 43, 62, 81].map((x) => (
      <path key={x} d={`M${x}-10v6`} stroke="#327F67" strokeWidth={2} />
    ))}
    <circle cx={134} r={8} fill="#D6DFB9" strokeWidth={3} />
    <path d="M130-4l8 8" strokeWidth={2} />
    <path
      d={`M123 ${-11 - open * 38}H209M123 ${11 + open * 38}H209`}
      stroke="#B4EAB6"
      strokeWidth={3}
    />
    {[195, 202, 209].map((x) => (
      <path
        key={x}
        d={`M${x} ${2 - open * 38}v10M${x} ${-2 + open * 38}v-10`}
        stroke="#AE9F74"
        strokeWidth={2}
      />
    ))}
  </g>
);
export const Lens: React.FC<{ reveal?: number }> = ({ reveal = 0 }) => (
  <g stroke={P.ink} strokeWidth={6}>
    <path d="M0-13H150V13H0Z" fill={P.blue} />
    <path d="M14 8H137M23-7H117" stroke="#A8DCEC" strokeWidth={3} />
    {[32, 47, 62, 77].map((x) => (
      <path key={x} d={`M${x}-5v10`} stroke="#2C6985" strokeWidth={2} />
    ))}
    <circle cx={185} cy={0} r={55} fill="#D9F4E8" />
    <circle
      cx={185}
      cy={0}
      r={45}
      fill="none"
      stroke={P.blue}
      strokeWidth={14}
    />
    <path
      d="M162-27q16-18 35-5"
      fill="none"
      stroke="#fffdf0"
      strokeWidth={6}
      strokeLinecap="round"
    />
    {reveal > 0 && (
      <g opacity={reveal} strokeWidth={5}>
        <path
          d="M159 19h52M163 9V-3m13 12V-13m13 22V-6m13 15V-20"
          stroke="#258062"
        />
      </g>
    )}
  </g>
);
export const Key: React.FC = () => (
  <g stroke={P.ink} strokeWidth={6} strokeLinejoin="round">
    <path d="M0-14H151V14H118V37H99V14H72V30H53V14H0Z" fill={P.gold} />
    <circle cx={182} cy={0} r={46} fill={P.gold} />
    <circle cx={182} cy={0} r={21} fill={P.paper} />
    <circle cx={182} r={35} fill="none" stroke="#FFDC7B" strokeWidth={3} />
    <path
      d="M152-22A37 37 0 0 1 209-26M15 10H46M75 9H93M108 31V18"
      fill="none"
      stroke="#A4752B"
      strokeWidth={3}
    />
    {[39, 63, 87, 111].map((x) => (
      <path key={x} d={`M${x}-11v5`} stroke="#A97C31" strokeWidth={2} />
    ))}
    <path d="M15-3H126" stroke="#FFF0AF" strokeWidth={5} />
  </g>
);
export const Prompt: React.FC<{
  x: number;
  y: number;
  scale?: number;
  compress?: number;
  angle?: number;
  result?: boolean;
  hud?: number;
  id?: string;
}> = ({
  x,
  y,
  scale = 1,
  compress = 0,
  angle = 0,
  result = false,
  hud = 0,
  id = "prompt",
}) => {
  const w = 280 - 135 * compress,
    h = 168 - 66 * compress;
  return (
    <g
      transform={`translate(${x} ${y}) rotate(${angle}) scale(${scale})`}
      strokeLinejoin="round"
    >
      <path
        d={`M${-w / 2} ${-h / 2 + 24}Q${-w / 2 - 8} ${-h / 2 - 3} ${-w / 2 + 26} ${-h / 2}H${w / 2 - 25}Q${w / 2 + 6} ${-h / 2} ${w / 2} ${-h / 2 + 28}V${h / 2 - 28}Q${w / 2} ${h / 2} ${w / 2 - 26} ${h / 2}H-30L-73 ${h / 2 + 34}L-65 ${h / 2}H${-w / 2 + 22}Q${-w / 2 - 6} ${h / 2} ${-w / 2} ${h / 2 - 26}Z`}
        fill={result ? "#BDEAC1" : "#FFFCDF"}
        stroke={P.ink}
        strokeWidth={6}
      />
      {result ? (
        <path
          d="M-36 0l24 23L40-30"
          fill="none"
          stroke="#23784D"
          strokeWidth={12}
          strokeLinecap="round"
        />
      ) : (
        <>
          {[-1, 0, 1].map((k) => (
            <g key={k} transform={`translate(0 ${k * (33 - 10 * compress)})`}>
              <circle
                cx={-w * 0.33}
                r={7}
                fill={[P.orange, P.blue, P.gold][k + 1]}
              />
              <path
                d={`M${-w * 0.21} 0H${w * 0.32}`}
                stroke={[P.orange, P.blue, P.gold][k + 1]}
                strokeWidth={10}
                strokeLinecap="round"
              />
              {compress < 0.95 && (
                <path
                  d={`M${-w * 0.21} 11H${w * 0.2}`}
                  stroke="#9FADA4"
                  strokeWidth={4}
                  opacity={1 - compress}
                />
              )}
            </g>
          ))}
        </>
      )}
      {hud > 0 && (
        <g opacity={hud}>
          <path
            d={`M${-w / 2 + 15} ${h / 2 - 10}H${w / 2 - 15}`}
            stroke={P.ink}
            strokeWidth={15}
            strokeLinecap="round"
          />
          <path
            d={`M${-w / 2 + 24} ${h / 2 - 10}h${(w - 55) * hud}`}
            stroke={P.mint}
            strokeWidth={6}
            strokeLinecap="round"
          />
        </g>
      )}
    </g>
  );
};
export const Cursor: React.FC = () => (
  <g stroke={P.ink} strokeWidth={7} strokeLinejoin="round">
    <path d="M0 0L18-141L111-26L64-25L92 32L59 49L31-12Z" fill="#FFFCDF" />
    <path d="M23-98L64-46" stroke="#D4C4A7" strokeWidth={5} />
  </g>
);

// The rank award is an earned prop: it travels from the completed tool to Claude.
export const RankCrown: React.FC<{
  x: number;
  y: number;
  scale: number;
  angle: number;
  shine: number;
}> = ({ x, y, scale, angle, shine }) => (
  <g
    transform={`translate(${x} ${y}) rotate(${angle}) scale(${scale})`}
    strokeLinejoin="round"
  >
    <path
      d="M-124-4L-149-108L-77-71L-40-141L0-81L65-147L93-68L153-109L126-4Q0 15-124-4Z"
      fill="#F3BD47"
      stroke={P.ink}
      strokeWidth={7}
    />
    <path
      d="M-121-16L-137-87L-72-49L-36-116L1-55L63-121L90-45L139-86L123-16Z"
      fill="#FFDA77"
    />
    <path
      d="M-124-22Q0-7 128-24L126-4Q0 15-124-4Z"
      fill="#D99924"
      stroke={P.ink}
      strokeWidth={5}
    />
    <path
      d="M-11-45L1-66L15-46L2-27Z"
      fill="#D97757"
      stroke={P.ink}
      strokeWidth={4}
    />
    <path
      d="M-84-38l10-11l10 11l-10 9Z M78-38l10-11l10 11l-10 9Z"
      fill="#FFF0C9"
      stroke={P.ink}
      strokeWidth={3}
    />
    <path
      d="M-105-17Q-57-10-22-13"
      stroke="#FFF8D5"
      strokeWidth={5}
      fill="none"
      strokeLinecap="round"
    />
    {shine > 0 && shine < 1 && (
      <g
        transform={`translate(${-122 + shine * 260} ${-26 - Math.sin(shine * Math.PI) * 30}) scale(${Math.sin(shine * Math.PI)})`}
      >
        <path
          d="M0-26L7-7L26 0L7 7L0 26L-7 7L-26 0L-7-7Z"
          fill="#FFFAE1"
          stroke={P.ink}
          strokeWidth={2}
        />
      </g>
    )}
  </g>
);
export const RankLaurel: React.FC<{ f: number; x: number; y: number }> = ({
  f,
  x,
  y,
}) => (
  <g transform={`translate(${x} ${y}) scale(0.8 0.82)`} strokeLinejoin="round">
    {[-1, 1].map((side) => (
      <g key={side} transform={`scale(${side} 1)`}>
        <path
          d="M0 221C-245 222-326-65-150-201"
          fill="none"
          stroke="#BA852B"
          strokeWidth={7}
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={1 - E(f, 76, 24)}
        />
        {Array.from({ length: 9 }, (_, i) => {
          const t = i / 8,
            a = ((105 + t * 137) * Math.PI) / 180;
          const px = Math.cos(a) * 245,
            py = Math.sin(a) * 226;
          const unfurl = pop(f, 77 + i * 2, 9);
          return (
            <g
              key={i}
              transform={`translate(${px} ${py}) rotate(${-23 - i * 12}) scale(${unfurl})`}
            >
              <path
                d="M0 0C-44-2-71-30-70-62C-20-65 9-25 0 0Z"
                fill={i % 2 ? "#F7C65B" : "#E4AA32"}
                stroke={P.ink}
                strokeWidth={3}
              />
              <path
                d="M-4-4L-53-48"
                fill="none"
                stroke="#FFF0AF"
                strokeWidth={3}
              />
              <path
                d="M2 1C18-29 43-40 61-35C61-7 31 14 2 1Z"
                fill="#F7CE71"
                stroke={P.ink}
                strokeWidth={3}
              />
            </g>
          );
        })}
      </g>
    ))}
  </g>
);

export const jingle = (f: number, at: number) =>
  f < at ? 0 : Math.sin((f - at) * 1.12) * Math.exp(-(f - at) / 7) * 7;
export const ToolActivation: React.FC<{
  f: number;
  at: number;
  color: string;
  x: number;
}> = ({ f, at, color, x }) => {
  const t = L(f, at, 19);
  if (f < at || t >= 1) return null;
  return (
    <g>
      <circle
        cx={x}
        cy={0}
        r={52 + t * 35}
        fill="none"
        stroke={color}
        strokeWidth={16 * (1 - t)}
        opacity={(1 - t) * 0.4}
      />
      <path
        d={`M${8 + t * 180} -12l22-4`}
        stroke="#FFF9CE"
        strokeWidth={9}
        strokeLinecap="round"
        opacity={Math.sin(t * Math.PI)}
      />
      {[-1, 1].map((k, i) => (
        <g
          key={k}
          transform={`translate(${x + k * (45 + t * 25)} ${k * (54 + t * 8)}) scale(${Math.sin(t * Math.PI) * (i ? 0.65 : 1)})`}
        >
          <path
            d="M0-22L6-6L22 0L6 6L0 22L-6 6L-22 0L-6-6Z"
            fill="#FFF9DA"
            stroke={color}
            strokeWidth={4}
          />
        </g>
      ))}
    </g>
  );
};
