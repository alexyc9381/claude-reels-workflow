import React from "react";
import logo from "./data/setup145-logo-paths.json";

const inks = ["#473624", "#071E23", "#091C2F", "#1D152F", "#08262B", "#281A24"];
const cols = [
  ["#F0DDA7", "#CCA86C", "#92704B"],
  ["#387C6A", "#133A34", "#4D7963"],
  ["#376285", "#11263B", "#36566C"],
  ["#705587", "#271B3D", "#655372"],
  ["#397D82", "#0E3239", "#346765"],
  ["#A76350", "#41252D", "#87533F"],
];
export const Bolt: React.FC<{
  x: number;
  y: number;
  r?: number;
  c?: string;
}> = ({ x, y, r = 7, c = "#D7C99F" }) => (
  <g transform={`translate(${x} ${y})`}>
    <circle cy={2} r={r + 2} fill="#13252D" />
    <circle r={r} fill={c} stroke="#233B42" strokeWidth={2} />
    <path
      d={`M${-r * 0.45} ${-r * 0.45}L${r * 0.45} ${r * 0.45}`}
      stroke="#506064"
      strokeWidth={2}
    />
  </g>
);
export const Gear: React.FC<{
  x: number;
  y: number;
  r: number;
  a: number;
  c?: string;
}> = ({ x, y, r, a, c = "#BCA467" }) => (
  <g transform={`translate(${x} ${y}) rotate(${a})`}>
    {Array.from({ length: 12 }, (_, i) => (
      <path
        key={i}
        transform={`rotate(${i * 30})`}
        d={`M${-r * 0.16} ${-r}h${r * 0.32}v${r * 0.3}h${-r * 0.32}Z`}
        fill={c}
        stroke="#152B32"
        strokeWidth={2}
      />
    ))}
    <circle r={r * 0.79} fill={c} stroke="#152B32" strokeWidth={4} />
    <circle r={r * 0.57} fill="#294F55" stroke="#E3D7AE" strokeWidth={3} />
    {[0, 120, 240].map((a) => (
      <path
        key={a}
        transform={`rotate(${a})`}
        d={`M0 0V${-r * 0.61}`}
        stroke={c}
        strokeWidth={r * 0.15}
      />
    ))}
    <circle r={r * 0.18} fill="#F4D084" stroke="#18333B" strokeWidth={3} />
    <circle cx={r * 0.47} cy={-r * 0.31} r={r * 0.08} fill="#FFEEAD" />
  </g>
);
export const CraftWorld: React.FC<{ id: number; f: number }> = ({ id, f }) => {
  const p = cols[id],
    ink = inks[id],
    bright = id === 0;
  return (
    <svg
      viewBox="0 0 1012 792"
      width={1012}
      height={792}
      style={{ position: "absolute", inset: 0 }}
    >
      <defs>
        <linearGradient id={`cw${id}`} x2="0" y2="1">
          <stop stopColor={p[0]} />
          <stop offset="1" stopColor={p[1]} />
        </linearGradient>
        <linearGradient id={`cf${id}`} x2="0" y2="1">
          <stop stopColor={p[2]} />
          <stop offset={bright ? 1 : 0.48} stopColor={ink} />
        </linearGradient>
        <pattern
          id={`grain${id}`}
          width="67"
          height="59"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M9 17h2m25 20h1m18-27h2m-36 42h3"
            stroke={bright ? "#5A4930" : "#CBDBC6"}
            opacity=".10"
            strokeWidth="1.5"
          />
        </pattern>
      </defs>
      <path d="M0 0H1012V792H0Z" fill={`url(#cw${id})`} />
      {id === 4 ? (
        <g>
          <path
            d="M0 532V316L74 270L163 323V532M137 532V244H278V532M738 531V265L820 213L894 272V532M890 532V301H1012V532"
            fill="#1D5059"
          />
          {[32, 76, 189, 237, 765, 816, 939, 987].map((x, i) => (
            <g key={x}>
              {[0, 1, 2, 3].map((j) => (
                <path
                  key={j}
                  d={`M${x} ${331 + j * 43}h18v23h-18Z`}
                  fill={j === i % 4 ? "#E2C98A" : "#689E9B"}
                  opacity=".55"
                />
              ))}
            </g>
          ))}
          <path
            d="M55 155H955V562H55Z"
            fill="none"
            stroke={ink}
            strokeWidth="13"
          />
          <path d="M65 166H945" stroke="#81B2AB" strokeWidth="3" />
          <path
            d="M0 583Q172 470 355 546T702 544T1012 483V705H0Z"
            fill="#326B67"
          />
        </g>
      ) : id === 3 ? (
        <g>
          <path
            d="M122 690V310Q122 130 307 130H727Q916 130 916 310V690Z"
            fill={ink}
          />
          <path
            d="M146 689V311Q146 155 309 155H725Q892 155 892 311V689Z"
            fill={p[1]}
            stroke="#947E9F"
            strokeWidth="4"
          />
          {[55, 933].map((x) => (
            <g key={x}>
              <path d={`M${x} 199h35v489h-35Z`} fill="#261D37" />
              <path
                d={`M${x + 7} 205v470m21-470v470`}
                stroke="#997F99"
                strokeWidth="4"
              />
              <path
                d={`M${x - 11} 210h57m-57 451h57`}
                stroke="#B09AAB"
                strokeWidth="9"
              />
            </g>
          ))}
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <path
              key={i}
              d={`M${230 + i * 106} 167v39`}
              stroke="#CEB389"
              strokeWidth="5"
            />
          ))}
        </g>
      ) : id === 5 ? (
        <g>
          <path
            d="M80 171H939V645H80Z"
            fill="#3F2932"
            stroke="#D6A575"
            strokeWidth="5"
          />
          {[0, 1, 2, 3, 4].map((i) => (
            <path
              key={i}
              d={`M${146 + i * 176} 199V630`}
              stroke="#8C5148"
              strokeWidth="47"
            />
          ))}
          <path
            d="M0 0H129Q210 416 92 685H0ZM1012 0H884Q805 416 923 685H1012Z"
            fill="#9E5547"
          />
          <path
            d="M48 98Q147 430 52 625M973 98Q862 430 964 625"
            fill="none"
            stroke="#C2785C"
            strokeWidth="9"
          />
        </g>
      ) : (
        <g>
          <path d="M62 151H950V570H62Z" fill={ink} />
          <path d="M78 168H934V552H78Z" fill={bright ? "#F5E2B5" : p[0]} />
          {Array.from({ length: 9 }, (_, i) => (
            <g key={i}>
              <path
                d={`M${86 + i * 97} 552V${277 + ((i * 67) % 132)}h67V552Z`}
                fill={bright ? "#DAC38A" : p[1]}
              />
              {[0, 1, 2].map((j) => (
                <path
                  key={j}
                  d={`M${98 + i * 97} ${374 + j * 46}h16v12h-16Z`}
                  fill={bright ? "#F8EBBE" : "#BDAD76"}
                  opacity=".40"
                />
              ))}
            </g>
          ))}
          {[78, 365, 653, 927].map((x) => (
            <g key={x}>
              <path d={`M${x} 161V566`} stroke={ink} strokeWidth="14" />
              <path
                d={`M${x + 5} 169V548`}
                stroke={bright ? "#FDF0CF" : "#6D9195"}
                strokeWidth="3"
              />
            </g>
          ))}
          <path
            d="M79 552H936"
            stroke={bright ? "#9B7F4C" : "#6C9494"}
            strokeWidth="9"
          />
        </g>
      )}
      <path d="M0 680H1012V792H0Z" fill={`url(#cf${id})`} />
      <path
        d="M0 682H1012"
        stroke={bright ? "#A17D47" : "#83A09A"}
        strokeWidth="7"
      />
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <path
          key={i}
          d={`M${300 + i * 70} 683L${-240 + i * 270} 792`}
          stroke={ink}
          strokeWidth="3"
          opacity=".55"
        />
      ))}
      <path
        d="M0 735H1012M0 779H1012"
        stroke={bright ? "#A78250" : "#77908D"}
        opacity=".4"
        strokeWidth="2"
      />
      {/* Layered practical lamps and edge fixtures, anchored to the scene. */}
      {[119, 873].map((x) => (
        <g key={x}>
          <path d={`M${x} 102V185`} stroke={ink} strokeWidth="7" />
          <path
            d={`M${x - 44} 199L${x - 25} 176H${x + 25}L${x + 44} 199Z`}
            fill={ink}
          />
          <path
            d={`M${x - 32} 200H${x + 32}`}
            stroke="#FFE2A2"
            strokeWidth="6"
          />
          <path
            d={`M${x - 26} 209L${x - 94} 583H${x + 136}L${x + 27} 209Z`}
            fill="#FFF0B5"
            opacity={bright ? 0.12 : 0.055}
          />
        </g>
      ))}
      <path
        d="M-20 210H34V657M991 185V650H1038"
        fill="none"
        stroke={ink}
        strokeWidth="24"
      />
      <path
        d="M29 230V630M986 215V626"
        stroke={bright ? "#D2B276" : "#6C9592"}
        strokeWidth="3"
      />
      {[284, 449, 606].map((y) => (
        <g key={y}>
          <path
            d={`M15 ${y}h35M973 ${y - 19}h34`}
            stroke={bright ? "#8E744B" : "#37565E"}
            strokeWidth="12"
          />
          <Bolt x={32} y={y} r={5} />
        </g>
      ))}
      {id === 1 && (
        <g>
          {[86, 862].map((x) => (
            <g key={x}>
              <path
                d={`M${x} 279h65v322h-65Z`}
                fill="#102F32"
                stroke="#629080"
                strokeWidth="3"
              />
              {[0, 1, 2, 3].map((i) => (
                <g key={i}>
                  <path
                    d={`M${x + 9} ${303 + i * 69}h47v7h-47Z`}
                    fill="#997D54"
                  />
                  <path
                    d={`M${x + 16} ${318 + i * 69}v35m14-35v35m14-35v35`}
                    stroke={["#8EAE9A", "#DBAF65", "#779BA4", "#A8B17A"][i]}
                    strokeWidth="8"
                  />
                </g>
              ))}
            </g>
          ))}
        </g>
      )}
      <g
        transform={`translate(${id === 4 ? 706 : 700} 374) rotate(${f * 0.18})`}
        opacity={bright ? 0.08 : 0.09}
      >
        <svg
          x="-205"
          y="-205"
          width="410"
          height="410"
          viewBox={logo.hud.viewBox}
          fill={bright ? logo.hud.fill : "#E6CBA0"}
          dangerouslySetInnerHTML={{ __html: logo.hud.body }}
        />
      </g>
      <path d="M-20 737H19L43 792H-20ZM988 722H1036V792H969Z" fill={ink} />
      <path
        d="M4 745L19 780M996 735L982 780"
        stroke={bright ? "#B69561" : "#547773"}
        strokeWidth="4"
      />
      <path d="M0 0H1012V792H0Z" fill={`url(#grain${id})`} />
    </svg>
  );
};
