import React from "react";

/* =========================================================================
   THE FOUR ROOMS — one card face per council role, for the CTA slide.

   ⛔ v1 drew each room as a FLAT ELEVATION (a wall with things stuck on it) so
   all four read as "a picture of some stuff". Every room now sits in the same
   one-point perspective box — ceiling, two side walls, back wall, converging
   floorboards — and then gets its own furniture, its own light source and one
   thing cropped by the frame in the foreground. The shared box is what makes
   them a set; the furniture is what makes them four different places.
   ========================================================================= */

export const ROOM_W = 236, ROOM_H = 292;
/* ⛔ v1 of these cards drew each room as a FLAT ELEVATION — a wall with things
   stuck on it — so all four read as "a picture of some stuff". Every room now
   sits in the same one-point perspective box (ceiling, two side walls, back
   wall, converging floor) and then gets its own furniture, its own light and a
   foreground occluder. The shared box is what makes them a set; the furniture
   is what makes them four different places. */
type RoomPal = { ceil: string; wallL: string; wallR: string; back: string; floor: string; floorD: string; line: string; glow: string };
const BOX = { bx0: 58, bx1: 178, by0: 28, by1: 150 };
const Shell: React.FC<{ p: RoomPal }> = ({ p }) => {
  const { bx0, bx1, by0, by1 } = BOX;
  return (<>
    <path d={`M0 0 L${bx0} ${by0} L${bx1} ${by0} L${ROOM_W} 0 Z`} fill={p.ceil} />
    <path d={`M0 0 L0 ${ROOM_H} L${bx0} ${by1} L${bx0} ${by0} Z`} fill={p.wallL} />
    <path d={`M${ROOM_W} 0 L${ROOM_W} ${ROOM_H} L${bx1} ${by1} L${bx1} ${by0} Z`} fill={p.wallR} />
    <rect x={bx0} y={by0} width={bx1 - bx0} height={by1 - by0} fill={p.back} />
    <path d={`M0 ${ROOM_H} L${bx0} ${by1} L${bx1} ${by1} L${ROOM_W} ${ROOM_H} Z`} fill={p.floor} />
    {[0, 1, 2, 3, 4].map((k) => (
      <line key={k} x1={bx0 + ((bx1 - bx0) / 4) * k} y1={by1} x2={-118 + (ROOM_W + 236) / 4 * k} y2={ROOM_H} stroke={p.floorD} strokeWidth={2} />
    ))}
    <line x1={bx0} y1={by1} x2={bx1} y2={by1} stroke={p.line} strokeWidth={3} />
    <line x1={0} y1={ROOM_H} x2={bx0} y2={by1} stroke={p.line} strokeWidth={2.5} />
    <line x1={ROOM_W} y1={ROOM_H} x2={bx1} y2={by1} stroke={p.line} strokeWidth={2.5} />
    <line x1={0} y1={0} x2={bx0} y2={by0} stroke={p.line} strokeWidth={2.5} />
    <line x1={ROOM_W} y1={0} x2={bx1} y2={by0} stroke={p.line} strokeWidth={2.5} />
  </>);
};
const P_BEL: RoomPal = { ceil: "#C7DDBA", wallL: "#A8C79A", wallR: "#94B587", back: "#DCEBD2", floor: "#8FB07F", floorD: "#75946A", line: "#5C7A50", glow: "#FFF2C4" };
const P_SKE: RoomPal = { ceil: "#2C1712", wallL: "#3A211C", wallR: "#2A1610", back: "#46281F", floor: "#331B14", floorD: "#22110C", line: "#150907", glow: "#FFE0B0" };
const P_INV: RoomPal = { ceil: "#E4CE92", wallL: "#C9A24E", wallR: "#B08D3E", back: "#F0DCA4", floor: "#A8842E", floorD: "#8A6A22", line: "#6E5318", glow: "#FFEBB4" };
const P_JUD: RoomPal = { ceil: "#2B3A4E", wallL: "#33465E", wallR: "#28374A", back: "#3D5471", floor: "#22303F", floorD: "#18222E", line: "#131C26", glow: "#CFE2FF" };

export const Room: React.FC<{ i: number }> = ({ i }) => {
  const { bx0, bx1, by0, by1 } = BOX;
  if (i === 0) return (
    /* BELIEVER · the pitch room. Daylight, a board that only goes up, a lectern. */
    <svg viewBox={`0 0 ${ROOM_W} ${ROOM_H}`} preserveAspectRatio="none" style={{ display: "block", width: "100%", height: ROOM_H }}>
      <Shell p={P_BEL} />
      <path d={`M${bx0 + 14} ${by1 - 6} L${bx0 + 14} ${by0 + 30} A32 32 0 0 1 ${bx1 - 14} ${by0 + 30} L${bx1 - 14} ${by1 - 6} Z`} fill="#FBFEF6" stroke="#5C7A50" strokeWidth={4} />
      <line x1={118} y1={by0 + 6} x2={118} y2={by1 - 6} stroke="#5C7A50" strokeWidth={3} />
      <line x1={bx0 + 14} y1={by0 + 62} x2={bx1 - 14} y2={by0 + 62} stroke="#5C7A50" strokeWidth={3} />
      <circle cx={118} cy={by0 + 44} r={15} fill="#F6D179" />
      {Array.from({ length: 8 }, (_, k) => { const a = (k / 8) * Math.PI * 2; return <line key={k} x1={118 + Math.cos(a) * 20} y1={by0 + 44 + Math.sin(a) * 20} x2={118 + Math.cos(a) * 29} y2={by0 + 44 + Math.sin(a) * 29} stroke="#F6D179" strokeWidth={3.4} strokeLinecap="round" />; })}
      <path d={`M${bx0 + 14} ${by1} L${bx1 - 14} ${by1} L214 ${ROOM_H} L22 ${ROOM_H} Z`} fill="rgba(255,242,196,0.32)" />
      {/* the board */}
      <g transform="translate(6 116)">
        <rect x={0} y={0} width={58} height={46} rx={3} fill="#F4FBEE" stroke="#5C7A50" strokeWidth={3.5} />
        <path d="M8 36 L22 22 L32 28 L50 10" fill="none" stroke="#2C7A50" strokeWidth={4.5} strokeLinecap="round" strokeLinejoin="round" />
        <path d="M40 10 L50 10 L50 20" fill="none" stroke="#2C7A50" strokeWidth={4.5} strokeLinecap="round" strokeLinejoin="round" />
        <rect x={26} y={46} width={6} height={16} fill="#5C7A50" />
      </g>
      {/* the lectern, centre floor */}
      <g transform="translate(92 176)">
        <path d="M0 0 L52 0 L46 18 L6 18 Z" fill="#F4FBEE" stroke="#5C7A50" strokeWidth={3.5} />
        <path d="M14 18 L38 18 L44 66 L8 66 Z" fill="#B8D2A8" stroke="#5C7A50" strokeWidth={3.5} />
        <rect x={6} y={-9} width={40} height={12} rx={2} fill="#FBFEF6" stroke="#5C7A50" strokeWidth={2.5} transform="rotate(-4 26 -3)" />
        <path d="M20 32 L34 32 M18 42 L36 42" stroke="#5C7A50" strokeWidth={2.5} />
        <ellipse cx={26} cy={70} rx={30} ry={7} fill="rgba(60,86,50,0.32)" />
      </g>
      {/* ceiling pendant + the two prints on the side walls */}
      <line x1={118} y1={0} x2={118} y2={14} stroke="#5C7A50" strokeWidth={2.5} />
      <path d="M106 14 L130 14 L136 26 L100 26 Z" fill="#EFF7E8" stroke="#5C7A50" strokeWidth={2.5} />
      <g stroke="#5C7A50" strokeWidth={2.5} fill="#EFF7E8">
        <path d="M18 74 L44 88 L44 130 L18 122 Z" />
        <path d="M218 74 L192 88 L192 130 L218 122 Z" />
      </g>
      <path d="M24 96 L38 104 M24 108 L38 116" stroke="#8FB07F" strokeWidth={2.5} />
      <path d="M212 96 L198 104 M212 108 L198 116" stroke="#8FB07F" strokeWidth={2.5} />
      {/* the rug the lectern stands on */}
      <path d="M62 236 L174 236 L206 282 L30 282 Z" fill="#B8D2A8" stroke="#5C7A50" strokeWidth={3} />
      <path d="M76 248 L160 248 M70 262 L166 262" stroke="#8FB07F" strokeWidth={3} />
      {/* foreground plant, cropped by the frame = depth */}
      <g transform="translate(184 196)">
        <path d="M22 40 q-30 -34 2 -56 q32 22 2 56" fill="#6E9A5E" />
        <path d="M22 44 q-40 -14 -34 -44 q40 6 34 44" fill="#7FAE6A" />
        <rect x={10} y={40} width={26} height={46} rx={5} fill="#C79A5E" />
        <rect x={10} y={40} width={26} height={8} fill="#B0864C" />
      </g>
    </svg>
  );
  if (i === 1) return (
    /* SKEPTIC · the interrogation room. One lamp, one table, a mirror watching. */
    <svg viewBox={`0 0 ${ROOM_W} ${ROOM_H}`} preserveAspectRatio="none" style={{ display: "block", width: "100%", height: ROOM_H }}>
      <Shell p={P_SKE} />
      <rect x={bx0 + 16} y={by0 + 26} width={88} height={52} rx={2} fill="#5E4038" stroke="#7A4A3A" strokeWidth={3.5} />
      <path d={`M${bx0 + 16} ${by0 + 78} L${bx0 + 104} ${by0 + 26}`} stroke="rgba(255,224,176,0.2)" strokeWidth={7} />
      <line x1={118} y1={0} x2={118} y2={34} stroke="#6B4232" strokeWidth={3.5} />
      <path d="M104 34 L132 34 L140 52 L96 52 Z" fill="#C4543C" stroke="#7A2E20" strokeWidth={3} />
      <path d="M98 54 L138 54 L196 236 L40 236 Z" fill="rgba(255,224,176,0.22)" />
      <circle cx={118} cy={56} r={7} fill="#FFE6B8" />
      {/* the table, in perspective */}
      <g>
        <path d="M66 176 L170 176 L188 206 L48 206 Z" fill="#8A5A44" stroke="#4F2C1E" strokeWidth={3.5} />
        <path d="M66 176 L170 176 L166 182 L70 182 Z" fill="#A87256" />
        <rect x={62} y={206} width={11} height={40} fill="#5E3626" />
        <rect x={163} y={206} width={11} height={40} fill="#5E3626" />
        <ellipse cx={118} cy={252} rx={80} ry={10} fill="rgba(8,4,2,0.5)" />
      </g>
      {/* the file on the table, marked */}
      <g transform="translate(96 182) rotate(-5)">
        <rect x={0} y={0} width={48} height={20} rx={2} fill="#F0E2CC" stroke="#6B4232" strokeWidth={2.5} />
        <path d="M8 4 L40 16 M40 4 L8 16" stroke="#C4543C" strokeWidth={3.4} strokeLinecap="round" />
      </g>
      {/* the empty chair facing you */}
      <g transform="translate(96 206)">
        <rect x={0} y={0} width={44} height={8} rx={2} fill="#6B4232" />
        <rect x={2} y={-30} width={40} height={8} rx={2} fill="#6B4232" />
        <rect x={4} y={-30} width={5} height={30} fill="#5E3626" />
        <rect x={35} y={-30} width={5} height={30} fill="#5E3626" />
      </g>
      {/* the clock that never moves, a cup going cold, the grate in the floor */}
      <circle cx={bx1 - 26} cy={by0 + 20} r={11} fill="#3A211C" stroke="#7A4A3A" strokeWidth={3} />
      <path d={`M${bx1 - 26} ${by0 + 20} L${bx1 - 26} ${by0 + 13} M${bx1 - 26} ${by0 + 20} L${bx1 - 20} ${by0 + 23}`} stroke="#C4543C" strokeWidth={2.4} strokeLinecap="round" />
      <g transform="translate(150 178)">
        <path d="M0 0 L20 0 L17 14 L3 14 Z" fill="#E8DCC4" stroke="#6B4232" strokeWidth={2.4} />
        <path d="M20 3 q8 4 0 8" fill="none" stroke="#6B4232" strokeWidth={2.4} />
      </g>
      <g transform="translate(76 184)">
        <ellipse cx={9} cy={6} rx={11} ry={5} fill="#5E4038" stroke="#6B4232" strokeWidth={2} />
        <rect x={5} y={-8} width={3} height={10} fill="#E8DCC4" transform="rotate(18 6 -3)" />
      </g>
      <path d="M20 268 L74 268 M18 276 L76 276 M16 284 L78 284" stroke="#22110C" strokeWidth={3} />
      <path d="M118 52 L118 176" stroke="rgba(255,224,176,0.16)" strokeWidth={2} />
      {/* foreground: the back of the interrogator's chair, cropped */}
      <path d="M-8 292 L-8 246 L74 246 L74 292 Z" fill="#1A0D08" />
      <rect x={-8} y={240} width={82} height={10} rx={3} fill="#2A1610" />
    </svg>
  );
  if (i === 2) return (
    /* INVESTOR · the boardroom. A long table at you, a chart that only matters. */
    <svg viewBox={`0 0 ${ROOM_W} ${ROOM_H}`} preserveAspectRatio="none" style={{ display: "block", width: "100%", height: ROOM_H }}>
      <Shell p={P_INV} />
      <rect x={bx0 + 10} y={by0 + 12} width={100} height={62} rx={3} fill="#FBF3D8" stroke="#6E5318" strokeWidth={3.5} />
      {[0, 1, 2, 3, 4].map((k) => <rect key={k} x={bx0 + 18 + k * 18} y={by0 + 66 - (k * 9 + 10)} width={11} height={k * 9 + 10} fill="#E8B23C" />)}
      <path d={`M${bx0 + 18} ${by0 + 52} L${bx0 + 40} ${by0 + 38} L${bx0 + 62} ${by0 + 44} L${bx0 + 84} ${by0 + 24} L${bx0 + 102} ${by0 + 18}`} fill="none" stroke="#B0472F" strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />
      {/* the long table running at the viewer */}
      <path d="M84 158 L152 158 L214 268 L22 268 Z" fill="#D9B45E" stroke="#6E5318" strokeWidth={4} />
      <path d="M84 158 L152 158 L150 166 L86 166 Z" fill="#EFCE86" />
      {/* chairs down both sides */}
      {[0, 1, 2].map((k) => (<g key={k}>
        <rect x={58 - k * 16} y={168 + k * 30} width={22} height={12 + k * 3} rx={3} fill="#8A6A22" />
        <rect x={158 + k * 16} y={168 + k * 30} width={22} height={12 + k * 3} rx={3} fill="#8A6A22" />
      </g>))}
      {/* the money on the table */}
      {[0, 1, 2, 3].map((k) => <ellipse key={k} cx={92} cy={222 - k * 8} rx={20} ry={6.5} fill="#F6D179" stroke="#8A6A22" strokeWidth={2.5} />)}
      <g transform="translate(126 198)">
        <rect x={0} y={0} width={54} height={30} rx={4} fill="#FBF3D8" stroke="#6E5318" strokeWidth={3} />
        <path d="M0 12 L54 12" stroke="#6E5318" strokeWidth={3} />
        <rect x={20} y={-6} width={14} height={8} rx={2} fill="#6E5318" />
      </g>
      {/* the ticker along the back wall, a chandelier, glassware on the table */}
      <rect x={bx0 + 10} y={by1 - 22} width={100} height={13} rx={2} fill="#2C2410" />
      {[0, 1, 2, 3, 4, 5].map((k) => <rect key={k} x={bx0 + 15 + k * 16} y={by1 - 19} width={10} height={7} fill={k % 2 ? "#7FBE86" : "#E8B23C"} />)}
      <line x1={118} y1={0} x2={118} y2={12} stroke="#8A6A22" strokeWidth={2.5} />
      <g fill="#F6D179" stroke="#8A6A22" strokeWidth={2}>
        <ellipse cx={118} cy={18} rx={24} ry={7} />
        <ellipse cx={100} cy={26} rx={7} ry={5} />
        <ellipse cx={118} cy={28} rx={7} ry={5} />
        <ellipse cx={136} cy={26} rx={7} ry={5} />
      </g>
      <g transform="translate(150 196)">
        <path d="M0 0 L16 0 L14 22 L2 22 Z" fill="#FBF3D8" stroke="#6E5318" strokeWidth={2.4} />
        <rect x={20} y={8} width={9} height={14} fill="#FBF3D8" stroke="#6E5318" strokeWidth={2.2} />
        <rect x={32} y={8} width={9} height={14} fill="#FBF3D8" stroke="#6E5318" strokeWidth={2.2} />
      </g>
      <g transform="translate(196 150)">
        <path d="M14 34 q-20 -26 2 -42 q22 18 2 42" fill="#8A9E4E" />
        <rect x={4} y={34} width={22} height={30} rx={4} fill="#B08D3E" />
      </g>
      {/* foreground: the near chair back, cropped */}
      <path d="M40 292 L40 258 L196 258 L196 292 Z" fill="#7A5C18" />
      <rect x={40} y={250} width={156} height={12} rx={4} fill="#8A6A22" />
    </svg>
  );
  return (
    /* JUDGE · the courtroom. Seal, columns, the bench, the gavel on it. */
    <svg viewBox={`0 0 ${ROOM_W} ${ROOM_H}`} preserveAspectRatio="none" style={{ display: "block", width: "100%", height: ROOM_H }}>
      <Shell p={P_JUD} />
      <circle cx={118} cy={by0 + 44} r={26} fill="none" stroke="#C6A45E" strokeWidth={4.5} />
      <circle cx={118} cy={by0 + 44} r={17} fill="none" stroke="rgba(198,164,94,0.55)" strokeWidth={3} />
      {Array.from({ length: 10 }, (_, k) => { const a = (k / 10) * Math.PI * 2; return <circle key={k} cx={118 + Math.cos(a) * 22} cy={by0 + 44 + Math.sin(a) * 22} r={2.6} fill="#C6A45E" />; })}
      <rect x={bx0 + 6} y={by0 + 6} width={14} height={by1 - by0 - 12} fill="#4A5F7C" />
      <rect x={bx1 - 20} y={by0 + 6} width={14} height={by1 - by0 - 12} fill="#4A5F7C" />
      <rect x={bx0 + 2} y={by0 + 6} width={22} height={7} fill="#6C87A8" />
      <rect x={bx1 - 24} y={by0 + 6} width={22} height={7} fill="#6C87A8" />
      {/* the raised bench, in perspective */}
      <path d="M56 176 L180 176 L200 214 L36 214 Z" fill="#4A5F7C" stroke="#131C26" strokeWidth={4} />
      <path d="M56 176 L180 176 L177 184 L59 184 Z" fill="#8FA6C4" />
      <path d="M36 214 L200 214 L200 250 L36 250 Z" fill="#3A4C64" stroke="#131C26" strokeWidth={3.5} />
      {[0, 1].map((k) => <rect key={k} x={82 + k * 48} y={214} width={4} height={36} fill="rgba(10,16,24,0.4)" />)}
      {/* the gavel and block, sitting on it */}
      <g transform="translate(126 158)">
        <rect x={0} y={16} width={40} height={9} rx={3} fill="#C6A45E" />
        <g transform="rotate(-24 20 8)">
          <rect x={4} y={0} width={34} height={11} rx={4} fill="#8A6A3E" />
          <rect x={18} y={9} width={7} height={18} fill="#8A6A3E" />
        </g>
      </g>
      <ellipse cx={118} cy={258} rx={92} ry={9} fill="rgba(8,12,18,0.45)" />
      {/* two flags, the witness box off to one side, the books on the bench */}
      <g>
        <rect x={bx0 - 6} y={by0 + 4} width={4} height={by1 - by0} fill="#8A6A3E" />
        <path d={`M${bx0 - 2} ${by0 + 8} L${bx0 + 26} ${by0 + 16} L${bx0 - 2} ${by0 + 40} Z`} fill="#7A3B32" />
        <rect x={bx1 + 2} y={by0 + 4} width={4} height={by1 - by0} fill="#8A6A3E" />
        <path d={`M${bx1 + 2} ${by0 + 8} L${bx1 - 26} ${by0 + 16} L${bx1 + 2} ${by0 + 40} Z`} fill="#7A3B32" />
      </g>
      <g>
        <path d="M6 168 L44 162 L48 206 L2 210 Z" fill="#3A4C64" stroke="#131C26" strokeWidth={3} />
        <path d="M6 168 L44 162 L44 168 L7 174 Z" fill="#6C87A8" />
      </g>
      <g transform="translate(64 160)">
        <rect x={0} y={4} width={9} height={16} fill="#7A3B32" />
        <rect x={10} y={0} width={9} height={20} fill="#4A5F7C" />
        <rect x={20} y={6} width={9} height={14} fill="#8A6A3E" />
      </g>
      {[0, 1, 2, 3].map((k) => <rect key={k} x={bx0 + 26 + k * 18} y={by1 - 26} width={12} height={20} rx={2} fill="rgba(140,170,205,0.18)" />)}
      <path d="M44 250 L192 250 L196 262 L40 262 Z" fill="#33465E" stroke="#131C26" strokeWidth={3} />
      {/* foreground: the courtroom rail, cropped */}
      <rect x={-8} y={268} width={252} height={9} rx={4} fill="#6C87A8" />
      {[0, 1, 2, 3, 4].map((k) => <rect key={k} x={2 + k * 56} y={274} width={9} height={18} fill="#4A5F7C" />)}
    </svg>
  );
};
