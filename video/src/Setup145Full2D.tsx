import React from "react";
import { CraftWorld, Bolt, Gear } from "./Setup145Craft";
import { Img, staticFile } from "remotion";
import { SectionHeader } from "./SlopKit";
import { inter } from "./fonts";
import {
  P,
  E,
  S,
  L,
  H,
  pop,
  jingle,
  Svg,
  Actor,
  Mark,
  Impact,
  Key,
  Clamp,
  Lens,
  ToolActivation,
} from "./Setup145FlatKit";
import logos from "./data/setup145-logo-paths.json";

const Backdrop: React.FC<{ kind: number; f: number }> = ({ kind, f }) => (
  <CraftWorld id={kind + 2} f={f} />
);
const Txt: React.FC<{
  x: number;
  y: number;
  s?: number;
  c?: string;
  children: React.ReactNode;
  anchor?: "start" | "middle";
}> = ({ x, y, s = 32, c = P.ink, children, anchor = "start" }) => (
  <text
    x={x}
    y={y}
    fill={c}
    stroke="none"
    fontSize={s}
    fontFamily={inter.fontFamily}
    fontWeight={900}
    textAnchor={anchor}
  >
    {children}
  </text>
);
const PaperPlane: React.FC<{
  x: number;
  y: number;
  s?: number;
  a?: number;
}> = ({ x, y, s = 1, a = 0 }) => (
  <g
    transform={`translate(${x} ${y}) rotate(${a}) scale(${s})`}
    stroke={P.ink}
    strokeWidth={5}
    strokeLinejoin="round"
  >
    <path d="M-107-66L134 0L-66 75L-41 10Z" fill="#FFF4D7" />
    <path d="M-107-66L-41 10L134 0L-27-12Z" fill="#B6DCCC" />
    <path d="M-41 10L-26 57L17 24L134 0Z" fill="#E5B774" />
    <path d="M-50-34L41-10" stroke={P.orange} strokeWidth={8} />
    <path d="M-57-19L-5-2" stroke={P.blue} strokeWidth={7} />
  </g>
);
const Tick: React.FC<{ x: number; y: number; t: number; s?: number }> = ({
  x,
  y,
  t,
  s = 1,
}) => (
  <path
    transform={`translate(${x} ${y}) scale(${s})`}
    d="M-24 0L-6 19L29-25"
    stroke="#237951"
    strokeWidth={10}
    strokeLinecap="round"
    fill="none"
    strokeDasharray={90}
    strokeDashoffset={(1 - t) * 90}
  />
);
const LiveStrip: React.FC<{ f: number; small?: boolean }> = ({
  f,
  small = false,
}) => (
  <g transform={`translate(100 ${small ? 238 : 260})`}>
    <path
      d="M-12-11H812V86H-12Z"
      fill="#071820"
      stroke="#789493"
      strokeWidth={3}
    />
    <path d="M0 0H800V76H0Z" fill="#162E3C" stroke="#E9F6E2" strokeWidth={3} />
    {[12, 788].map((x) => (
      <g key={x}>
        <Bolt x={x} y={9} r={3} />
        <Bolt x={x} y={67} r={3} />
      </g>
    ))}
    <path d="M233 11V64M511 11V64" stroke="#54717D" strokeWidth={2} />
    <path d="M14-6H787" stroke="#C9D6C3" strokeWidth={2} />
    <Txt x={23} y={27} s={18} c="#B5D2D8">
      CONTEXT
    </Txt>
    {Array.from({ length: 9 }, (_, i) => (
      <path
        key={i}
        d={`M${24 + i * 20} 42h14v17h-14Z`}
        fill={i < 6 ? "#7ED9AE" : "#496370"}
      />
    ))}
    <Txt x={261} y={27} s={18} c="#B5D2D8">
      TOOLS
    </Txt>
    <path
      d="M268 52l-8-8l8-8m31 0l8 8l-8 8M279 57l9-27"
      fill="none"
      stroke="#F4CF74"
      strokeWidth={4}
    />
    <path
      d={`M326 49H${345 + E(f, 20, 22) * 92}`}
      stroke="#7FCDE5"
      strokeWidth={7}
    />
    <circle cx={455} cy={48} r={7} fill="#86DAB0" />
    <Txt x={535} y={27} s={18} c="#B5D2D8">
      AGENTS
    </Txt>
    {[0, 1, 2].map((i) => (
      <g key={i} transform={`translate(${560 + i * 67} 51)`}>
        <path d="M-17-13H17V11H-17Z" fill="#D97757" />
        <path d="M-9-4v7M7-4v7" stroke={P.ink} strokeWidth={4} />
        <circle
          cx={23}
          cy={9}
          r={5}
          fill={f > 25 + i * 8 ? "#95E4AE" : "#708C98"}
        />
      </g>
    ))}
  </g>
);
const Book: React.FC<{
  x: number;
  y: number;
  open: number;
  s?: number;
  f?: number;
}> = ({ x, y, open, s = 1, f = 0 }) => (
  <g
    transform={`translate(${x} ${y + 90}) rotate(${f > 16 && f < 91 ? Math.sin(((f - 16) * Math.PI) / 24) * 25 : 0}) translate(0 -90) scale(${s})`}
    stroke={P.ink}
    strokeWidth={5}
    strokeLinejoin="round"
  >
    <path
      d={`M0-76Q${-80 * open}-118 ${-146 * open}-82V78Q${-72 * open} 40 0 83Q${72 * open} 40 ${146 * open} 78V-82Q${80 * open}-118 0-76Z`}
      fill="#FFF1C6"
    />
    <path
      d={`M${-147 * open} 78V89Q${-75 * open} 55 0 95Q${75 * open} 55 ${147 * open} 89V78`}
      fill="#A67C4D"
    />
    <path
      d={`M${-145 * open} 82Q${-70 * open} 47 0 87Q${70 * open} 47 ${145 * open} 82`}
      fill="none"
      stroke="#B6AD91"
      strokeWidth={2}
    />
    <path d="M0-76V83" fill="none" stroke="#907D5C" strokeWidth={3} />
    <path
      d={`M${-109 * open}-62L${-32 * open}-47M${27 * open}-46L${105 * open}-62`}
      stroke="#253F49"
      strokeWidth={9}
    />
    <path
      d={`M${86 * open} 47v-18h${10 * open}v18m${10 * open} 0v-33h${10 * open}v33`}
      stroke="#DE9C58"
      strokeWidth={5}
    />
    <path
      d="M12-68V-102L24-94L34-106V-64"
      fill="#D96D52"
      stroke="#9B503E"
      strokeWidth={2}
    />
    {f > 16 && f < 91 && (
      <g>
        <path
          d={`M0-76Q${Math.cos((((f - 16) % 24) / 24) * Math.PI) * 65}-122 ${Math.cos((((f - 16) % 24) / 24) * Math.PI) * 135}-87V73Q${Math.cos((((f - 16) % 24) / 24) * Math.PI) * 65} 45 0 83Z`}
          fill="#FFF9E2"
        />
        <path
          d={`M${Math.cos((((f - 16) % 24) / 24) * Math.PI) * 22}-28L${Math.cos((((f - 16) % 24) / 24) * Math.PI) * 115}-49M${Math.cos((((f - 16) % 24) / 24) * Math.PI) * 22} 8L${Math.cos((((f - 16) % 24) / 24) * Math.PI) * 111}-10M${Math.cos((((f - 16) % 24) / 24) * Math.PI) * 22} 45L${Math.cos((((f - 16) % 24) / 24) * Math.PI) * 110} 26`}
          fill="none"
          stroke="#628E9A"
          strokeWidth={7}
        />
      </g>
    )}
    <path
      d={`M${-120 * open}-38L${-25 * open}-20M${-119 * open}-6L${-36 * open} 10M${-119 * open} 26L${-26 * open} 43M${24 * open}-20L${118 * open}-38M${27 * open} 12L${109 * open}-6M${25 * open} 44L${118 * open} 26`}
      stroke="#749CA5"
      strokeWidth={7}
    />
  </g>
);
const Pencil: React.FC<{ x: number; y: number; a: number; s?: number }> = ({
  x,
  y,
  a,
  s = 1,
}) => (
  <g
    transform={`translate(${x} ${y}) rotate(${a}) scale(${s})`}
    stroke={P.ink}
    strokeWidth={5}
    strokeLinejoin="round"
  >
    <path d="M-132-18H73L119 0L73 18H-132Z" fill={P.gold} />
    <path d="M73-18L119 0L73 18Z" fill="#E9CFA2" />
    <path d="M103-6L119 0L103 6Z" fill={P.ink} />
    <path d="M-132-18H-97V18H-132Z" fill="#E8887E" />
    <path d="M-92-17V17M-71-3H63" stroke="#FFF0B0" />
  </g>
);
const SearchLens: React.FC<{
  x: number;
  y: number;
  a?: number;
  s?: number;
  color?: string;
}> = ({ x, y, a = 0, s = 1, color = P.blue }) => (
  <g
    transform={`translate(${x} ${y}) rotate(${a}) scale(${s})`}
    stroke={P.ink}
    strokeWidth={6}
  >
    <path d="M42 49L130 132L108 153L25 65Z" fill={color} />
    <path d="M49 75L104 131" stroke="#FFF0C9" strokeWidth={4} opacity={0.65} />
    {[0, 1, 2, 3].map((i) => (
      <path
        key={i}
        d={`M${62 + i * 12} ${81 + i * 12}l-12 12`}
        stroke="#173B48"
        strokeWidth={3}
      />
    ))}
    <circle r={77} fill="#F3F3D7" fillOpacity={0.78} />
    <circle r={65} fill="none" stroke={color} strokeWidth={15} />
    <circle r={54} fill="none" stroke="#DFEEDF" strokeWidth={2} />
    {[0, 120, 240].map((a) => (
      <g key={a} transform={`rotate(${a})`}>
        <Bolt x={0} y={-67} r={3} />
      </g>
    ))}
    <path
      d="M-38-31Q-20-55 11-48"
      fill="none"
      stroke="#FFFDF2"
      strokeWidth={9}
      strokeLinecap="round"
    />
  </g>
);

const HudReveal: React.FC<{ f: number }> = ({ f }) => {
  const pull = E(f, 0, 18),
    reveal = E(f, 12, 27),
    lens = E(f, 39, 16),
    hit = H(f, 76, 11);
  return (
    <>
      <Backdrop kind={0} f={f + 349} />
      <Svg>
        <Txt x={115} y={216} s={29} c="#FFF0D2">
          &gt; research competitors
        </Txt>
        <g transform={`translate(0 ${(1 - reveal) * 105})`} opacity={reveal}>
          <LiveStrip f={f} />
        </g>
        {[0, 1, 2, 3].map((i) => (
          <path
            key={i}
            d={`M100 ${250 + i * 62 - reveal * (320 + i * 62)}H900V${310 + i * 62 - reveal * (320 + i * 62)}H100Z`}
            fill={i % 2 ? "#21465C" : "#315D73"}
            stroke="#102C3D"
            strokeWidth={3}
            opacity={1}
          />
        ))}
        <g>
          <path
            d="M210 343V389Q210 415 255 415H355V522M805 344V395Q805 422 752 422H654V584"
            fill="none"
            stroke="#0A2632"
            strokeWidth={15}
          />
          <path
            d="M210 343V389Q210 415 255 415H355V522M805 344V395Q805 422 752 422H654V584"
            fill="none"
            stroke="#8FB1B3"
            strokeWidth={4}
          />
        </g>
        <Gear x={646} y={585} r={58} a={pull * 170} c="#729CB0" />
        <Gear x={565} y={615} r={38} a={-pull * 255} c="#C7B27D" />
        <g
          transform={`translate(${350 + E(f, 60, 8) * 60 - E(f, 90, 10) * 520} ${543 - E(f, 60, 8) * 43 + (1 - lens) * 155}) scale(${0.6 + lens * 0.7 + E(f, 60, 8) * 0.38})`}
          opacity={lens}
        >
          <ellipse cy={159} rx={141} ry={15} fill="#05151F" opacity={0.35} />
          <path
            d="M-142 79A166 166 0 1 1 142 79Z"
            fill="#304D5A"
            stroke="#09232E"
            strokeWidth={9}
          />
          <path
            d="M-150 29A159 159 0 0 1 127-93"
            fill="none"
            stroke="#ACC1B9"
            strokeWidth={4}
          />
          <path
            d="M-141 99L-113 149H120L142 99Z"
            fill="#E3B45D"
            stroke={P.ink}
            strokeWidth={6}
          />
          <path
            d="M-135 76A156 156 0 1 1 135 76Z"
            fill="#EAF1D7"
            stroke={P.ink}
            strokeWidth={8}
          />
          {Array.from({ length: 41 }, (_, i) => (
            <path
              key={`fine${i}`}
              transform={`rotate(${-130 + i * 6.5})`}
              d="M0-127V-120"
              stroke="#789589"
              strokeWidth={2}
            />
          ))}
          <path
            d="M-119 28A124 124 0 0 1 96-78"
            fill="none"
            stroke="#BCD5BD"
            strokeWidth={3}
          />
          {[-117, 117].map((x) => (
            <Bolt key={x} x={x} y={70} r={4} />
          ))}
          <path d="M-98 118H101M-81 132H84" stroke="#A0793C" strokeWidth={3} />
          {Array.from({ length: 11 }, (_, i) => (
            <path
              key={i}
              transform={`rotate(${-130 + i * 26})`}
              d="M0-122V-102"
              stroke={i < 7 ? "#45A17F" : "#CD9661"}
              strokeWidth={9}
            />
          ))}
          <path
            transform={`rotate(${-113 + E(f, 60, 24) * 158 + jingle(f, 84) * 0.3})`}
            d="M-9 11L0-96L9 11Z"
            fill={P.red}
            stroke={P.ink}
            strokeWidth={4}
          />
          <circle r={18} fill={P.gold} stroke={P.ink} strokeWidth={5} />
          <Txt x={0} y={60} s={26} anchor="middle">
            CONTEXT LEFT
          </Txt>
        </g>
        <g transform={`translate(646 585) rotate(${-33 + pull * 56})`}>
          <path
            d="M-12 0V-170H12V0Z"
            fill="#6BAED0"
            stroke={P.ink}
            strokeWidth={6}
          />
          <circle
            cy={-170}
            r={31}
            fill={P.gold}
            stroke={P.ink}
            strokeWidth={6}
          />
          <circle r={24} fill="#E9D6A2" stroke={P.ink} strokeWidth={6} />
        </g>
        <Impact x={641} y={432} t={L(f, 35, 12)} color={P.blue} size={92} />
      </Svg>
      <Actor
        f={f + 349}
        x={655 - pull * 31}
        y={415 + H(f, 20, 18) * 14 - hit * 5}
        size={310}
        angle={-10 + pull * 16 - hit * 4}
        stern={1 - pull}
        cheer={pull * 0.65}
        gaze={-1}
        sx={1 + H(f, 20, 18) * 0.07}
        sy={1 - H(f, 20, 18) * 0.06}
      />
    </>
  );
};
const HudWork: React.FC<{ f: number }> = ({ f }) => {
  const read = E(f, 0, 13),
    edit = E(f, 22, 24),
    search = E(f, 49, 23),
    handoff = E(f, 82, 26);
  const writing = f < 50 ? edit : E(f, 50, 24);
  const penX = 432 + writing * 136,
    penY = 572 - writing * 64 + Math.sin(writing * Math.PI * 3) * 20;
  return (
    <>
      <Backdrop kind={0} f={449 + f} />
      <Svg>
        <Txt x={112} y={210} s={27} c="#FFF0D2">
          &gt; research competitors
        </Txt>
        <LiveStrip f={f + 50} small />
        <path
          d="M45 633H967V667H45Z"
          fill="#AABAC4"
          stroke={P.ink}
          strokeWidth={6}
        />
        <path d="M79 667V751M933 667V751" stroke="#1B333E" strokeWidth={19} />
        <path d="M87 676V737M941 676V737" stroke="#729093" strokeWidth={4} />
        <path d="M50 639H961M86 724H930" stroke="#D5C7A2" strokeWidth={3} />
        {[77, 322, 657, 934].map((x) => (
          <Bolt key={x} x={x} y={651} r={5} />
        ))}
        <g opacity={0.8}>
          <path d="M112 627H890" stroke="#122D3A" strokeWidth={26} />
          {Array.from({ length: 18 }, (_, i) => (
            <g
              key={i}
              transform={`translate(${120 + i * 43} 627) rotate(${Math.min(f, 107) * 9})`}
            >
              <circle r={10} fill="#81A2A3" stroke="#16303B" strokeWidth={2} />
              <path d="M-7 0H7" stroke="#D6CCAE" strokeWidth={2} />
            </g>
          ))}
        </g>
        {[0, 1, 2].map((i) => {
          const t = L(f, 24 + i * 28, 22);
          return t > 0 && t < 1 ? (
            <g
              key={i}
              transform={`translate(${212 + t * 575} ${381 - Math.sin(t * Math.PI) * 47}) rotate(${t * 16 - 8})`}
            >
              <path
                d="M-33-25H33V25H-33Z"
                fill={i === 1 ? P.gold : "#A4D2BD"}
                stroke={P.ink}
                strokeWidth={3}
              />
              <path
                d="M-20-10H19M-20 0H19M-20 10H8"
                stroke="#3E6B68"
                strokeWidth={4}
              />
            </g>
          ) : null;
        })}
        <g transform={`translate(${(1 - E(f, 0, 10)) * -120} 0)`}>
          <Book x={204} y={495} open={0.1 + read * 0.9} s={1.08} f={f} />
        </g>
        <g
          transform={`translate(497 542) rotate(${Math.sin(writing * Math.PI) * 11})`}
        >
          <path
            d="M-106-52L84-62L110 55L-81 65Z"
            fill="#FFF1CF"
            stroke={P.ink}
            strokeWidth={5}
          />
          <path
            d="M-73-12L61-22M-69 22L38 11"
            stroke="#B2C6BE"
            strokeWidth={9}
          />
          <path
            d="M-62 30L-18-6L21 14L71-34"
            stroke={P.orange}
            strokeWidth={8}
            strokeDasharray={185}
            strokeDashoffset={(1 - edit) * 185}
            fill="none"
          />
        </g>
        <Pencil
          x={penX - 71}
          y={penY + 68}
          a={-44 + Math.sin(writing * Math.PI * 3) * 9}
          s={0.83}
        />
        <g transform="translate(798 504)">
          <path
            d="M-101-67Q-31-90 75-60L101 54L-86 67Z"
            fill="#E3EACB"
            stroke={P.ink}
            strokeWidth={5}
          />
          {[-1, 0, 1].map((i) => (
            <path
              key={i}
              d={`M-62 ${i * 33}H57`}
              stroke={i === 0 && search > 0.5 ? P.gold : "#8CAFB0"}
              strokeWidth={i === 0 ? 13 : 8}
            />
          ))}
        </g>
        <SearchLens
          x={
            850 -
            Math.sin(search * Math.PI) * 170 -
            search * 16 +
            H(f, 72, 20) * 12
          }
          y={453 + search * 51 + Math.sin(search * Math.PI) * 58}
          a={-30 + search * 28}
          s={0.95}
        />
        {f >= 74 && (
          <g
            transform={`translate(${810 - handoff * 360} ${507 - Math.sin(handoff * Math.PI) * 124 + handoff * 39}) scale(${1 - handoff * 0.35})`}
          >
            <path
              d="M-51-31H51V31H-51Z"
              fill={P.gold}
              stroke={P.ink}
              strokeWidth={5}
            />
            <Tick x={0} y={0} t={1} s={0.62} />
          </g>
        )}
        <Impact x={502} y={511} t={L(f, 45, 12)} color={P.orange} size={75} />
        <Impact x={828} y={505} t={L(f, 73, 12)} size={88} />
      </Svg>
      <Actor
        f={449 + f}
        x={90 + H(f, 0, 16) * 15}
        y={499 - H(f, 8, 18) * 12}
        size={245}
        angle={
          -9 +
          read * 15 +
          (f > 16 && f < 91
            ? Math.sin((((f - 16) % 24) / 24) * Math.PI) * 9
            : 0)
        }
        stern={1 - read}
        cheer={read * 0.55}
        gaze={1}
      />
      <Actor
        f={f + 449}
        x={395 + H(f, 25, 28) * 18}
        y={499 + H(f, 25, 28) * 8}
        size={245}
        angle={-9 + Math.sin(writing * Math.PI * 3) * 8}
        stern={0.45 * (1 - edit)}
        cheer={edit * 0.5}
        gaze={1}
      />
      <Actor
        f={f + 449}
        x={724 - search * 23}
        y={499 - H(f, 54, 20) * 15}
        size={245}
        angle={9 - search * 14}
        cheer={search * 0.8}
        gaze={-1}
      />
    </>
  );
};
const AisaAccess: React.FC<{ f: number }> = ({ f }) => {
  const arrive = E(f, 0, 14),
    hoist = E(f, 14, 16),
    turn = S(f, 30, 15),
    open = E(f, 43, 15),
    fly = E(f, 54, 17),
    retract = E(f, 47, 18);
  return (
    <>
      <Backdrop kind={1} f={565 + f} />
      <Svg>
        <path
          d="M447 677V361Q447 247 632 247Q817 247 817 361V677Z"
          fill="#466C7F"
          stroke={P.ink}
          strokeWidth={8}
        />
        <path
          d="M425 679V360Q425 224 632 224Q839 224 839 360V679Z"
          fill="none"
          stroke="#B19F78"
          strokeWidth={16}
        />
        {[0, 1, 2].map((i) => (
          <g key={i} opacity={open}>
            <path
              d={`M${511 + i * 93} 663V${345 + i * 21}L${616 + i * 40} ${290 + i * 31}`}
              fill="none"
              stroke={["#75D7BC", "#6FC8E8", "#EBC86C"][i]}
              strokeWidth={8}
            />
            {[0, 1, 2].map((j) => {
              const t = ((f - 43 + j * 6 + i * 3) % 21) / 21;
              return f > 43 ? (
                <circle
                  key={j}
                  cx={511 + i * 93}
                  cy={647 - t * 249}
                  r={5}
                  fill="#E9F7D9"
                />
              ) : null;
            })}
          </g>
        ))}
        <g transform={`translate(${open * 440} 0)`}>
          <path
            d="M447 677V361Q447 247 632 247Q817 247 817 361V677Z"
            fill="#E5B855"
            stroke={P.ink}
            strokeWidth={8}
          />
          <path
            d="M477 361Q477 280 632 280Q787 280 787 361V646H477Z"
            fill="none"
            stroke="#FFE29A"
            strokeWidth={9}
          />
          <path
            d="M456 651V369Q456 262 632 262"
            fill="none"
            stroke="#A27B3C"
            strokeWidth={7}
          />
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <path
                d={`M${438 + turn * 32} ${402 + i * 87}h45v22h-45Z`}
                fill="#A3BCB5"
                stroke={P.ink}
                strokeWidth={4}
              />
              <path
                d={`M${781 - turn * 32} ${402 + i * 87}h45v22h-45Z`}
                fill="#A3BCB5"
                stroke={P.ink}
                strokeWidth={4}
              />
            </g>
          ))}
          <Gear x={633} y={460} r={74} a={turn * 113} c="#D0A14C" />
          <circle
            cx={633}
            cy={460}
            r={42}
            fill="#F3D589"
            stroke={P.ink}
            strokeWidth={5}
          />
          <path d="M652 455A22 22 0 1 0 612 455L607 488H659Z" fill={P.ink} />
          {[494, 772].map((x) => (
            <g key={x}>
              <Bolt x={x} y={379} r={7} />
              <Bolt x={x} y={617} r={7} />
            </g>
          ))}
          <path d="M523 570H742M523 590H694" stroke="#A57D3E" strokeWidth={4} />
          <path d="M551 541H715" stroke="#FFEDBB" strokeWidth={3} />
          <Mark kind="aisa" x={633} y={332} size={91} />
        </g>
        <g
          transform={`translate(${178 + arrive * 322 + hoist * 133 - retract * 320} ${565 - hoist * 105 + (1 - arrive) * 47 + retract * 170}) rotate(${180 - H(f, 14, 16) * 24 + retract * 14}) scale(${1.65 - retract * 0.3} ${(1.65 - retract * 0.3) * (1 - 0.6 * Math.sin(turn * Math.PI))})`}
        >
          <Key />
          <ToolActivation f={f} at={43} color={P.gold} x={181} />
        </g>
        {f >= 51 && (
          <PaperPlane
            x={332 + fly * 477}
            y={470 - Math.sin(fly * Math.PI) * 130}
            s={1 + fly * 0.16}
            a={-17 + fly * 12}
          />
        )}
        <Impact x={633} y={460} t={L(f, 44, 13)} size={150} />
      </Svg>
      <Actor
        f={f + 565}
        x={-15 + arrive * 151 + turn * 53}
        y={423 + H(f, 30, 16) * 15 - fly * 17}
        size={320}
        angle={-17 + arrive * 14 + turn * 9 - fly * 5}
        stern={1 - hoist}
        cheer={hoist * 0.35 + turn * 0.45}
        gaze={1}
        sx={1 + H(f, 30, 16) * 0.08}
        sy={1 - H(f, 30, 16) * 0.07}
      />
    </>
  );
};
const Storefront: React.FC<{ x: number; y: number; s?: number; f: number }> = ({
  x,
  y,
  s = 1,
  f,
}) => (
  <g
    transform={`translate(${x} ${y}) scale(${s})`}
    stroke={P.ink}
    strokeWidth={5}
    strokeLinejoin="round"
  >
    <path d="M-112-3H129V190H-112Z" fill="#122D35" opacity={0.3} />
    <path d="M-117-13H117V177H-117Z" fill="#F9E6AE" />
    <path d="M96 34H114V171H96" fill="#C5A371" stroke="none" />
    {[0, 1, 2, 3, 4].map((i) => (
      <path
        key={i}
        d={`M-112 ${41 + i * 26}h16m-16 13h9M91 ${46 + i * 25}h20`}
        stroke="#D6BE8F"
        strokeWidth={2}
      />
    ))}
    <path d="M-129 175H124V186H-129Z" fill="#9F926F" />
    <path d="M-141 186H134V197H-141Z" fill="#C8B991" />
    <path d="M-126-19H128M-113 171H119" stroke="#FAF0CD" strokeWidth={4} />
    <path d="M-134-16L-100-79H101L134-16Z" fill="#DD7754" />
    <path
      d="M-134-16H134V17Q110 43 88 17Q66 43 44 17Q22 43 0 17Q-22 43-44 17Q-66 43-88 17Q-110 43-134 17Z"
      fill="#E99C74"
    />
    <path d="M-85 56H-15V129H-85ZM18 52H82V177H18Z" fill="#A7CDD6" />
    <path d="M-52 58V127M-84 93H-17" fill="none" />
    <path
      d="M-79 63L-63 63L-79 79M-42 63L-23 63L-42 82M24 60L45 60L24 83"
      stroke="#E1EFE7"
      strokeWidth={5}
    />
    <path d="M-94 133H-7V140H-94ZM14 174H87" fill="#B3AA85" />
    <path
      d="M-99 50H-1V147H-99M14 47H87V174"
      fill="none"
      stroke="#E1C997"
      strokeWidth={3}
    />
    <path
      d="M25 136H75V165H25Z"
      fill="#6D9FA9"
      stroke="#426773"
      strokeWidth={2}
    />
    {[0, 1, 2].map((i) => (
      <path
        key={i}
        d={`M${-86 + i * 30} 127l4-17l7 10l7-24l4 31Z`}
        fill={i === 1 ? "#D98B55" : "#67977A"}
        stroke="none"
      />
    ))}
    <path
      d="M103 64h49v7m-10 0v32"
      fill="none"
      stroke="#263F45"
      strokeWidth={4}
    />
    <path
      d="M122 96h34v38h-34Z"
      fill="#417B81"
      stroke="#F1D9A1"
      strokeWidth={2}
    />
    <path d="M129 107h20m-20 9h14" stroke="#C2DACA" strokeWidth={3} />
    <Txt x={0} y={-38} s={20} anchor="middle">
      COMPETITOR
    </Txt>
    <circle cx={66} cy={117} r={5} fill={P.ink} />
  </g>
);
const Visitor: React.FC<{ x: number; y: number; c: string; s?: number }> = ({
  x,
  y,
  c,
  s = 1,
}) => (
  <g
    transform={`translate(${x} ${y}) scale(${s})`}
    fill={c}
    stroke={P.ink}
    strokeWidth={3}
  >
    <circle cy={-17} r={10} />
    <path d="M-12 17V2Q0-9 12 2V17Z" />
    <path
      d={`M-6 17L${-8 + Math.sin(x * 0.06) * 6} 36M6 17L${8 - Math.sin(x * 0.06) * 6} 36`}
      stroke="#234854"
      strokeWidth={7}
    />
    <path
      d={`M-11 1L${-16 - Math.sin(x * 0.06) * 5} 17M11 1L${16 + Math.sin(x * 0.06) * 5} 17`}
      fill="none"
      stroke={c}
      strokeWidth={5}
    />
    <path d="M-4-15H4" stroke="#F8DBC1" strokeWidth={3} />
    <path d="M-9-21Q0-32 9-21" fill="#344D50" strokeWidth={2} />
  </g>
);
const Report: React.FC<{
  f: number;
  x: number;
  y: number;
  open: number;
  s?: number;
}> = ({ f, x, y, open, s = 1 }) => (
  <g
    transform={`translate(${x} ${y}) rotate(${-12 * (1 - E(f, 130, 22))}) scale(${s})`}
    stroke={P.ink}
    strokeWidth={5}
    strokeLinejoin="round"
  >
    <path
      d={`M0-85L${-176 * open}-115V130L0 151L${176 * open} 130V-115Z`}
      fill="#3A676B"
      stroke="#11323B"
      strokeWidth={6}
    />
    <path
      d={`M0-98L${-170 * open}-126V119L0 137L${170 * open} 119V-126Z`}
      fill="#FFF1CD"
    />
    <path d="M0-98V137" stroke="#B9A686" strokeWidth={3} />
    <path
      d={`M${-157 * open}-113L${-15 * open}-89M${15 * open}-89L${157 * open}-113`}
      stroke="#D1C8AE"
      strokeWidth={2}
    />
    {[-1, 1].map((side) => (
      <g key={side}>
        {[0, 1, 2, 3].map((i) => (
          <path
            key={i}
            d={`M${side * 153 * open} ${84 + i * 8}L${side * 18 * open} ${100 + i * 8}`}
            stroke="#C6BCA2"
            strokeWidth={2}
          />
        ))}
      </g>
    ))}
    <g opacity={E(f, 124, 8)}>
      <path
        d={`M${-144 * open} 68H${-18 * open}M${-144 * open} 34H${-18 * open}M${-144 * open} 0H${-18 * open}`}
        stroke="#D6CDB1"
        strokeWidth={2}
      />
      <path
        d={`M${25 * open} 70L${55 * open} 37L${80 * open} 52L${142 * open} 5`}
        fill="none"
        stroke="#294F5A"
        strokeWidth={3}
        strokeDasharray={180}
        strokeDashoffset={(1 - E(f, 132, 15)) * 180}
      />
      {[0, 1, 2].map((i) => (
        <circle
          key={i}
          cx={(32 + i * 40) * open}
          cy={67 - i * 19}
          r={4}
          fill="#D97C52"
        />
      ))}
      <path
        d={`M${-143 * open}-47h${53 * open}M${25 * open}-32h${88 * open}`}
        stroke="#8A998D"
        strokeWidth={3}
      />
    </g>
    <path
      d={`M${-144 * open}-72L${-23 * open}-56`}
      stroke={P.blue}
      strokeWidth={13}
    />
    <path
      d={`M${23 * open}-57L${140 * open}-73`}
      stroke={P.orange}
      strokeWidth={13}
    />
    {[0, 1, 2].map((i) => (
      <g key={i}>
        <path
          d={`M${(-137 + i * 39) * open} 64V${64 - (38 + i * 29) * E(f, 125 + i * 5, 10)}h${22 * open}V64Z`}
          fill={["#76BAA3", "#63ABC8", "#E8B45D"][i]}
        />
        <path
          d={`M${28 * open} ${-13 + i * 41}h${(86 - i * 13) * open}`}
          stroke={i === 1 ? P.gold : "#7FACA4"}
          strokeWidth={12}
          strokeDasharray={100}
          strokeDashoffset={(1 - E(f, 128 + i * 6, 12)) * 100}
        />
      </g>
    ))}
    <Tick x={0} y={113} t={E(f, 133, 14)} s={0.55} />
  </g>
);
const Research: React.FC<{ f: number }> = ({ f }) => {
  const enter = E(f, 0, 16),
    scan = E(f, 49, 31),
    collect = E(f, 91, 27),
    report = E(f, 121, 22),
    present = E(f, 132, 23);
  const sx = 520 - collect * 152,
    sy = 354 + collect * 40;
  return (
    <>
      <Backdrop kind={2} f={636 + f} />
      <Svg>
        <path
          d="M143 459Q295 382 465 469M793 391Q694 390 555 462"
          stroke="#E8E6BE"
          strokeWidth={44}
          fill="none"
        />
        <path
          d="M143 459Q295 382 465 469M793 391Q694 390 555 462"
          stroke="#6F9C86"
          strokeWidth={3}
          strokeDasharray="12 13"
          fill="none"
        />
        <g transform={`translate(${(1 - enter) * 320} 0)`}>
          <Storefront x={sx} y={sy} s={1.38 - collect * 0.48} f={f} />
        </g>
        <g
          transform={`translate(157 ${372 + (1 - E(f, 17, 12)) * 110})`}
          opacity={E(f, 17, 12)}
        >
          <path
            d="M-76 94L-50-67H50L76 94Z"
            fill="#83B4CA"
            stroke={P.ink}
            strokeWidth={6}
          />
          <path
            d="M-64-67H64V-101H-64Z"
            fill="#E6CE98"
            stroke={P.ink}
            strokeWidth={5}
          />
          <path d="M-63 73H62M-54 59H54" stroke="#3E6879" strokeWidth={4} />
          {[-42, 42].map((x) => (
            <Bolt key={x} x={x} y={71} r={5} />
          ))}
          <Mark kind="similarweb" x={0} y={-28} size={96} />
          <Gear
            x={0}
            y={83}
            r={29}
            a={Math.max(0, Math.min(f - 23, 63)) * 13}
            c="#D7C49A"
          />
        </g>
        {f >= 23 &&
          f < 109 &&
          Array.from({ length: 9 }, (_, i) => {
            const t = L(f, 23 + i * 5, 28),
              moving = f >= 23 + i * 5 && t < 1;
            if (!moving) return null;
            return (
              <Visitor
                key={i}
                x={156 + t * (sx - 130)}
                y={462 - Math.sin(t * Math.PI) * 65 + t * 60}
                c={[P.orange, P.blue, P.gold][i % 3]}
                s={1.7}
              />
            );
          })}
        <g opacity={E(f, 44, 10)}>
          <Mark kind="semrush" x={806} y={289} size={101} />
          <SearchLens
            x={766 - scan * 218 + Math.sin(scan * Math.PI) * 63}
            y={432 + Math.sin(scan * Math.PI) * 74}
            a={-31 + scan * 42}
            s={1.2}
            color={P.orange}
          />
        </g>
        {f >= 66 && (
          <g
            transform={`translate(${583 - collect * 44} ${484 - collect * 43 - Math.sin(collect * Math.PI) * 85}) rotate(${-12 + collect * 20}) scale(${pop(f, 66, 12)})`}
          >
            <path
              d="M-80-35H66L89 0L66 35H-80Z"
              fill={P.gold}
              stroke={P.ink}
              strokeWidth={5}
            />
            <Txt x={0} y={7} s={23} anchor="middle">
              KEYWORD
            </Txt>
            <circle cx={66} r={6} fill={P.paper} />
          </g>
        )}
        {f >= 84 &&
          [0, 1, 2].map((i) => {
            const t = L(f, 84 + i * 8, 34);
            if (t <= 0 || t >= 1) return null;
            return (
              <g
                key={i}
                transform={`translate(${(i === 1 ? 756 : 187) + (634 - (i === 1 ? 756 : 187)) * t} ${410 + Math.sin(t * Math.PI) * -136 + t * 117}) rotate(${t * 190})`}
              >
                <path
                  d="M-21-35H22V36H-21Z"
                  fill={[P.blue, P.orange, P.gold][i]}
                  stroke={P.ink}
                  strokeWidth={4}
                />
                <path
                  d="M-11-17H12M-11-3H12M-11 12H6"
                  stroke="#FFF3D4"
                  strokeWidth={5}
                />
              </g>
            );
          })}
        {f >= 111 && (
          <Report
            f={f}
            x={626 + present * 35}
            y={484 - (1 - report) * 90 - present * 74}
            open={0.06 + report * 0.94}
            s={0.72 + report * 0.43 + present * 0.32}
          />
        )}
        <Impact x={555} y={482} t={L(f, 68, 12)} size={108} />
        <Impact x={632} y={527} t={L(f, 121, 11)} color={P.mint} size={133} />
      </Svg>
      <Actor
        f={636 + f}
        x={195 + collect * 41 - present * 90}
        y={488 - collect * 1 + H(f, 118, 12) * 12}
        size={290}
        angle={-7 + scan * 10 - collect * 7 + H(f, 125, 13) * 6}
        stern={0.65 * (1 - collect)}
        cheer={collect * 0.9}
        gaze={1}
        sx={1 + H(f, 118, 12) * 0.08}
        sy={1 - H(f, 118, 12) * 0.07}
      />
    </>
  );
};
const Closing: React.FC<{ f: number }> = ({ f }) => {
  const throwIn = E(f, 0, 15),
    confirm = E(f, 29, 10),
    delivery = E(f, 35, 18),
    swing = Math.sin(f * 0.27) * Math.exp(-f / 50) * 12;
  return (
    <>
      <Backdrop kind={3} f={792 + f} />
      <Svg>
        <g transform={`translate(695 ${649 + (1 - E(f, 0, 13)) * 110})`}>
          <ellipse cy={76} rx={232} ry={20} fill="#170E18" opacity={0.35} />
          <path
            d="M-205-87Q-205-107-180-107H180Q205-107 205-87V63H-205Z"
            fill="#704634"
            stroke="#211F27"
            strokeWidth={7}
          />
          <path
            d="M-183-88H183V42H-183Z"
            fill="#25494D"
            stroke="#B19B67"
            strokeWidth={4}
          />
          <path
            d="M-213 41H213V83H-213Z"
            fill="#A7754B"
            stroke="#211F27"
            strokeWidth={7}
          />
          <path
            d="M-201 51H201M-170-77V28M170-77V28"
            stroke="#D5B87F"
            strokeWidth={3}
          />
          {[-151, 151].map((x) => (
            <g key={x}>
              <path
                d={`M${x - 13} 40h26v35h-26Z`}
                fill="#C3A567"
                stroke="#34434A"
                strokeWidth={3}
              />
              <Bolt x={x} y={55} r={4} />
            </g>
          ))}
        </g>
        <g
          transform={`translate(${670 - (1 - throwIn) * 324 - delivery * 35} ${412 - Math.sin(throwIn * Math.PI) * 118 - delivery * 28}) rotate(${swing}) scale(${0.48 + throwIn * 0.54 + delivery * 0.36})`}
        >
          <path
            d="M-84-66A91 91 0 1 1 68 60"
            fill="none"
            stroke={P.ink}
            strokeWidth={20}
          />
          <path
            d="M-84-66A91 91 0 1 1 68 60"
            fill="none"
            stroke="#F4CF73"
            strokeWidth={12}
          />
          <g
            transform={`translate(-79 44) rotate(${85 + jingle(f, 15) + jingle(f, 44) * 0.6}) scale(.8)`}
          >
            <Clamp />
            <Mark kind="headroom" x={146} y={0} size={54} rotate={-85} />
          </g>
          <g
            transform={`translate(0 77) rotate(${84 + jingle(f, 19) + jingle(f, 46) * 0.6}) scale(.8)`}
          >
            <Lens reveal={1} />
            <Mark kind="hud" x={185} y={0} size={57} rotate={-84} />
          </g>
          <g
            transform={`translate(76 38) rotate(${66 + jingle(f, 23) + jingle(f, 48) * 0.6}) scale(.8)`}
          >
            <Key />
            <Mark kind="aisa" x={181} y={0} size={59} rotate={-66} />
          </g>
        </g>
        <g
          transform={`translate(178 ${291 + (1 - E(f, 12, 10)) * -50})`}
          opacity={E(f, 12, 10)}
        >
          <path
            d="M-16-49H317Q346-48 344-13V59Q344 88 317 88H53L6 119L16 88H-16Q-44 88-44 59V-16Q-44-49-16-49Z"
            fill="#FFF3D6"
            stroke={P.ink}
            strokeWidth={6}
          />
          <Txt x={148} y={35} s={60} anchor="middle">
            {"SETUP".slice(
              0,
              Math.min(5, Math.max(0, Math.floor((f - 13) / 2))),
            )}
          </Txt>
          {confirm > 0 && <Tick x={299} y={43} t={confirm} s={0.53} />}
        </g>
        <Impact x={701} y={440} t={L(f, 16, 13)} size={129} />
        <Impact x={455} y={332} t={L(f, 32, 12)} color={P.mint} size={80} />
      </Svg>
      <Actor
        f={f + 792}
        x={99 + throwIn * 33}
        y={441 - H(f, 0, 17) * 25 + H(f, 35, 13) * 7}
        size={336}
        angle={-17 + throwIn * 21 - confirm * 5}
        cheer={0.4 + throwIn * 0.55}
        gaze={1 - confirm}
        sx={1 + H(f, 9, 11) * 0.07}
        sy={1 - H(f, 9, 11) * 0.06}
      />
    </>
  );
};
export const FullBody: React.FC<{ f: number }> = ({ f }) =>
  f < 449 ? (
    <HudReveal f={f - 349} />
  ) : f < 565 ? (
    <HudWork f={f - 449} />
  ) : f < 636 ? (
    <AisaAccess f={f - 565} />
  ) : f < 792 ? (
    <Research f={f - 636} />
  ) : (
    <Closing f={f - 792} />
  );
export const FullHeader: React.FC<{ f: number }> = ({ f }) => {
  const c =
    f < 565
      ? {
          name: "CLAUDE HUD",
          sub: f < 449 ? "SEE YOUR CONTEXT" : "SEE WHAT'S RUNNING",
          logo: "logos/claude.svg",
        }
      : f < 636
        ? {
            name: "AISA",
            sub: "ONE KEY. LIVE DATA.",
            logo: "setup145-r2/aisa.svg",
          }
        : f < 792
          ? {
              name: "RESEARCH COMPETITORS",
              sub:
                f < 727
                  ? "LIVE SOURCES. ONE PROMPT."
                  : "TURN SOURCES INTO REPORTS",
              logo: "setup145-r2/aisa.svg",
            }
          : {
              name: "COMMENT SETUP",
              sub: "GET ALL THREE",
              logo: "logos/claude.svg",
            };
  return (
    <SectionHeader
      f={15}
      hero
      size={Math.min(
        49,
        Math.round(1060 / Math.max(c.name.length, c.sub.length)),
      )}
      badgeBg="#FFFFFF"
      badgeBorder="#EDE7DB"
      badge={
        <Img
          src={staticFile(c.logo)}
          style={{ width: 84, height: 84, objectFit: "contain" }}
        />
      }
      l1={c.name}
      l2={<span style={{ color: "#D97757" }}>{c.sub}</span>}
    />
  );
};
