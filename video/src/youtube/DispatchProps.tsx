import React from "react";
import { smooth } from "./explainer-motion";
import { windowAt } from "./refined-motion";
import { settle, CAST_ACCENTS as C } from "./bold-motion";

export const DISPATCH_RATE = 1.7;
export const DISPATCH_SECONDS = 7;
export const dispatchMotion = (t: number) => ({
  stampIn: smooth(t, 2.3, 0.35),
  stampOut: smooth(t, 2.85, 0.45),
  stampVisible: windowAt(t, 2.12, 3.18),
  ink: smooth(t, 2.67, 0.08),
  intake: windowAt(t, 5.95, 8.0),
  roller: 720 * smooth(t, 6.25, 1.45),
  bookmark: smooth(t, 8.1, 0.5),
});

/** Letter-local coordinates: the postmark and stamp plate share a contact point. */
export const DispatchStamp: React.FC<{ t: number }> = ({ t }) => {
  const m = dispatchMotion(t);
  return (
    <>
      <svg
        width="100"
        height="64"
        viewBox="0 0 100 64"
        style={{
          position: "absolute",
          right: 14,
          top: 76,
          opacity: m.ink,
          transform: "rotate(-10deg)",
        }}
      >
        <circle
          cx="37"
          cy="31"
          r="24"
          fill="none"
          stroke={C.orange}
          strokeWidth="3"
        />
        <circle
          cx="37"
          cy="31"
          r="19"
          fill="none"
          stroke={C.orange}
          strokeWidth="1.5"
        />
        <path
          d="M23 24H50V39H23ZM23 24L36 34L50 24M64 20Q74 13 90 20M64 31Q74 24 90 31M64 42Q74 35 90 42"
          fill="none"
          stroke={C.orange}
          strokeWidth="2.5"
        />
      </svg>
      <svg
        width="126"
        height="115"
        viewBox="0 0 126 115"
        style={{
          position: "absolute",
          left: 146,
          top: 5,
          overflow: "visible",
          opacity: m.stampVisible,
          transform: `translate(${55 * (1 - m.stampIn) + 75 * m.stampOut}px,${-110 * (1 - m.stampIn) - 135 * m.stampOut}px) rotate(${65 + 18 * (1 - m.stampIn) - 20 * m.stampOut}deg) scaleY(${1 - 0.07 * settle(t, 2.67)})`,
          transformOrigin: "50% 100%",
          filter: "drop-shadow(0 9px 8px #66472C35)",
        }}
      >
        <defs>
          <linearGradient id="dispatch-wood">
            <stop stopColor="#7F442A" />
            <stop offset=".45" stopColor="#D89A54" />
            <stop offset="1" stopColor="#985532" />
          </linearGradient>
        </defs>
        <path
          d="M45 61L49 32H77L81 61Z"
          fill="url(#dispatch-wood)"
          stroke="#713B29"
          strokeWidth="2"
        />
        <path
          d="M34 23Q35 6 63 6Q91 6 92 23Q89 36 63 36Q38 36 34 23Z"
          fill="url(#dispatch-wood)"
          stroke="#713B29"
          strokeWidth="2"
        />
        <path
          d="M44 15Q61 8 80 15"
          fill="none"
          stroke="#F4C57D"
          strokeWidth="3"
        />
        <path
          d="M25 63Q63 49 101 63L110 91H16Z"
          fill={C.teal}
          stroke="#185A57"
          strokeWidth="3"
        />
        <path
          d="M26 65Q63 54 100 65"
          stroke="#C5E4D5"
          strokeWidth="3"
          fill="none"
        />
        <rect x="14" y="90" width="98" height="15" rx="5" fill="#223D3E" />
        <rect x="21" y="105" width="84" height="6" rx="2" fill={C.orange} />
      </svg>
    </>
  );
};

/** Fits below the existing email field; no extra copy, no decoration in its text lane. */
export const FilingIntake: React.FC<{ t: number }> = ({ t }) => {
  const m = dispatchMotion(t);
  return (
    <svg
      width="420"
      height="82"
      viewBox="0 0 420 82"
      style={{
        position: "absolute",
        left: 28,
        top: 272,
        opacity: m.intake,
        transform: `translateY(${22 * (1 - m.intake)}px)`,
        filter: "drop-shadow(0 8px 6px #2B544625)",
      }}
    >
      <defs>
        <linearGradient id="dispatch-steel" x2="0" y2="1">
          <stop stopColor="#E0F1E8" />
          <stop offset=".4" stopColor="#70A79F" />
          <stop offset=".62" stopColor="#D4ECE2" />
          <stop offset="1" stopColor="#518A84" />
        </linearGradient>
      </defs>
      <path
        d="M12 17Q210 -3 408 17L403 66H17Z"
        fill="#FDF7E9"
        stroke={C.teal}
        strokeWidth="3"
      />
      <rect
        x="32"
        y="26"
        width="353"
        height="26"
        rx="13"
        fill="url(#dispatch-steel)"
        stroke="#266660"
        strokeWidth="2"
      />
      {Array.from({ length: 18 }, (_, i) => (
        <path
          key={i}
          d={`M${42 + i * 19} 28V49`}
          stroke="#F0FFF4"
          strokeWidth="3"
          opacity={
            0.3 +
            0.6 * Math.pow(Math.sin(((m.roller + i * 20) * Math.PI) / 180), 2)
          }
        />
      ))}
      {[31, 389].map((x, i) => (
        <g key={x} transform={`rotate(${m.roller * (i ? 1 : -1)} ${x} 39)`}>
          <circle
            cx={x}
            cy="39"
            r="22"
            fill={C.gold}
            stroke="#A46F28"
            strokeWidth="3"
          />
          {[0, 60, 120].map((a) => (
            <path
              key={a}
              d={`M${x - 15} 39H${x + 15}`}
              transform={`rotate(${a} ${x} 39)`}
              stroke="#FFF4CA"
              strokeWidth="4"
            />
          ))}
          <circle cx={x} cy="39" r="6" fill={C.teal} />
        </g>
      ))}
    </svg>
  );
};

export const FilingBookmark: React.FC<{ t: number }> = ({ t }) => {
  const m = dispatchMotion(t);
  return (
    <svg
      width="74"
      height="146"
      viewBox="0 0 74 146"
      style={{
        position: "absolute",
        right: 35,
        top: -10,
        opacity: m.bookmark,
        transform: `translateY(${-115 * (1 - m.bookmark)}px) rotate(${8 * settle(t, 8.6)}deg)`,
        transformOrigin: "50% 0",
      }}
    >
      <path
        d="M12 0H61V124L37 107L12 124Z"
        fill={C.gold}
        stroke="#BB812B"
        strokeWidth="2"
      />
      <path d="M21 0V102M52 0V102" stroke="#FFE4A0" strokeWidth="2" />
      <rect x="22" y="30" width="29" height="23" rx="4" fill="#FFF8E9" />
      <path
        d="M24 34L36 43L49 34"
        stroke={C.teal}
        fill="none"
        strokeWidth="3"
      />
    </svg>
  );
};
