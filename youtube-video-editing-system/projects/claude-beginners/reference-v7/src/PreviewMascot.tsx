import React from 'react';
const H=250;
// Reused from the existing Claude reels tested/chassis.tsx character.
export const Mascot: React.FC<{ lf: number; size?: number; gaze?: number; nodAmp?: number; nodSpeed?: number;
  shock?: number; rant?: number; pin?: number; cheer?: number; stern?: number; coat?: number; glasses?: number; constr?: number;
  outfit?: "bare" | "shirt" | "suit"; point?: number; flip?: number }> =
({ lf, size = H, gaze = 0, nodAmp = 3.5, nodSpeed = 10, shock = 0, rant = 0, pin = 0, cheer = 0, stern = 0,
   outfit = "shirt", coat = 0, glasses = 0, constr = 0, point = 0, flip = 0 }) => {
  const C = "#D97757";
  const hopP = Math.max(0, Math.sin(lf / (nodSpeed * 0.6)));
  const hop = hopP * nodAmp * 2.2 * (1 - shock);
  const squash = 1 - hopP * 0.045 * (1 - shock) + shock * 0.03;
  const blink = ((lf + 41) % 84) < 5 && shock < 0.3 ? 0.15 : 1;   // ⛔ never closed at frame 0
  const eyeH = (26 + shock * 16) * blink * (1 - stern * 0.45);
  const armY = 86 - rant * 26 - cheer * 24 - pin * 4;
  return (
    <div style={{ width: size, height: size, position: "relative",
                  transform: `translateY(${-hop}px) scaleY(${squash}) scaleX(${flip ? -1 : 1})`, transformOrigin: "50% 100%" }}>
      <svg viewBox="0 0 200 200" width={size} height={size} shapeRendering="crispEdges" style={{ overflow: "visible" }}>
        {/* arms stay ATTACHED (x+26 = 34 / x = 166); rotation <=20deg or they read as floating diamonds */}
        <rect x={8} y={armY} width={26} height={26} fill={C} transform={(rant || cheer) > 0.2 ? `rotate(${-(rant + cheer) * 20} 21 ${armY + 13})` : undefined} />
        <rect x={8} y={armY + 24} width={26} height={26} fill={C} opacity={(rant || cheer) > 0.2 ? 1 : 0} />
        {/* the raised/pointing arm stays ATTACHED and short — a long limb reads as a stray slab */}
        <rect x={166} y={pin > 0.2 ? 58 : armY} width={point > 0.2 ? 44 : 26} height={pin > 0.2 ? 30 : 26}
              fill={pin > 0.2 ? "#C4664A" : C}
              transform={(rant || cheer) > 0.2 ? `rotate(${(rant + cheer) * 20} 179 ${armY + 13})` : undefined} />
        <rect x={166} y={armY + 24} width={26} height={26} fill={C} opacity={(rant || cheer) > 0.2 ? 1 : 0} />
        <rect x={34} y={44} width={132} height={102} fill={C} />
        <rect x={34} y={44} width={132} height={10} fill="rgba(255,255,255,0.16)" />
        {outfit === 'bare' ? null : outfit === 'suit' ? (<>
          <rect x={34} y={102} width={132} height={44} fill="#303943"/>
          <path d="M81 102h38l-19 42z" fill="#F4EEE2"/>
          <path d="M91 108l9-7 9 7-5 27h-8z" fill="#8C4A57"/>
          <path d="M74 102l19 35-24-17 7-7-9-9M126 102l-19 35 24-17-7-7 9-9" fill="#52606B"/>
          <rect x={139} y={114} width={17} height={8} fill="#D9B878"/>
          <rect x={37} y={138} width={126} height={8} fill="#232C36"/>
        </>) : coat > 0 ? (<>
          <rect x={34} y={100} width={132} height={46} fill="#EDE6D6" />
          <rect x={34} y={100} width={132} height={6} fill="#CFC6B2" />
          <polygon points="80,100 100,124 120,100" fill={C} />
          <rect x={96} y={112} width={8} height={34} fill="#CFC6B2" />
        </>) : (<>
          <rect x={34} y={102} width={132} height={44} fill="#EDE6D6" />
          <rect x={34} y={102} width={132} height={5} fill="#CFC6B2" />
          <polygon points="82,102 100,126 118,102" fill={C} />
          <path d="M92 118 l8 -8 l8 8 l-4 30 h-8 z" fill="#8C4A57" />
          <rect x={42} y={128} width={22} height={5} fill="#CFC6B2" /><rect x={136} y={120} width={24} height={5} fill="#CFC6B2" />
        </>)}
        <rect x={52} y={146} width={17} height={38} fill={C} /><rect x={77} y={146} width={17} height={38} fill={C} />
        <rect x={124} y={146} width={17} height={38} fill={C} /><rect x={149} y={146} width={17} height={38} fill={C} />
        {outfit === 'suit' && [52,77,124,149].map(x=><rect key={x} x={x} y={165} width={17} height={19} fill="#303943"/>)}
        <rect x={66 + gaze} y={70 + (26 - eyeH) / 2} width={21} height={eyeH} fill="#151312" />
        <rect x={113 + gaze} y={70 + (26 - eyeH) / 2} width={21} height={eyeH} fill="#151312" />
        {glasses > 0 && (<>
          <rect x={58} y={64} width={38} height={34} rx={5} fill="none" stroke="#2B2622" strokeWidth={6} />
          <rect x={104} y={64} width={38} height={34} rx={5} fill="none" stroke="#2B2622" strokeWidth={6} />
          <rect x={96} y={76} width={8} height={6} fill="#2B2622" />
        </>)}
        {constr > 0 && (<>
          <path d="M34 44 q66 -40 132 0 z" fill="#E7B24C" />
          <rect x={24} y={38} width={152} height={12} rx={5} fill="#F0CB63" />
        </>)}
      </svg>
    </div>
  );
};
