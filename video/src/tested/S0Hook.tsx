import React from "react";
import { Actor, Room, Vignette, GOLD, mono, over, seed, M } from "./chassis";
import { Easing } from "remotion";

/* ============================================================ S0 — THE CONSPIRACY WALL (the hook)
   PLACE: a home office at 4am, three days deep. FLOOR: bare boards banked with loose printouts.
   BACK WALL: plum, carrying a 2.5m corkboard of 50 index cards on the left, and — right of it — the
   working wall: a calendar with the days struck out, scratched tally gates, a taped-over hole, a
   cable run, a light switch, and a narrow pre-dawn sash window.
   LIGHT: ONE warm work-lamp on a tripod, LOW-LEFT (x≈110, y≈410). Every highlight in this scene sits
   on the object's upper-LEFT and every contact shadow falls down-RIGHT. The window is a cool
   counter-rim only, never a key.
   ⛔ CAMERA LOCKED. The framing change at B.fin is a HARD CUT to a second locked framing, not a push.

   ⛔ PATTERN INTERRUPT (rebuilt — the pin-tap read as too soft three times):
      f0-11   ORDINARY — he is up on the office chair pressing the 50th card home. Nothing else moves
              except texture (printer feeding, fan, motes, a steam wisp).
      f14     THE CHAIR GOES. The column snaps under him. He falls 85px in six frames.
      f20     IMPACT — floor shock, the whole paper drift launches, the board rattles, the chair
              cartwheels into the desk and takes the load with it.
      f20+    PERMANENT: he finishes the reel standing on the FLOOR, the chair is on its side with a
              caster still spinning, the monitor is canted and cracked, the keyboard hangs off the
              desk edge swinging, two mugs are down, one is on the floor, the lamp is knocked askew.
      Frame 0 and the last frame are not the same picture in any respect.

   ⛔ SCALE: sprite is the reference at H=330 (hero drawn at 312). Every prop through M():
      mug M(0.14), monitor M(0.60)×M(0.40), desk 0.75m, chair seat 0.45m, window 0.6×0.93m. */

const HERO = 312;
const FLOOR_Y = 700;                 // the boards
const DESK_Y = 558;                  // 0.75m up from the floor
const SEAT_Y = 615;                  // 0.45m — the chair seat he starts on
const HX = 420;                      // hero, dead in front of the wall of 50
const MUG = M(0.14);                 // 26
const MON_W = M(0.60), MON_H = M(0.40);

/* ---- the corkboard: 10 × 5 index cards, frame x8..486 y224..624 (everything above y240 is
        decoration only — the white hook title card sits over the top of the panel). */
const BX = 8, BY = 224, BW = 478, BH = 400;
const COLS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => 20 + i * 45);
const ROWS = [0, 1, 2, 3, 4].map((r) => 238 + r * 78);
const SW = 38, SH = 66;
const PIN_C = 5, PIN_R = 2;                                   // the card under his hand at frame 0
const GOLD_AT: [number, number][] = [[3, 1], [7, 1], [4, 3], [3, 4]];
const isGold = (c: number, r: number) => GOLD_AT.some(([a, b]) => a === c && b === r);
const gIdx = (c: number, r: number) => GOLD_AT.findIndex(([a, b]) => a === c && b === r);
const GXY = GOLD_AT.map(([c, r]) => [COLS[c] + SW / 2, ROWS[r] + SH / 2] as [number, number]);
const cardNo = (c: number, r: number) => (c === PIN_C && r === PIN_R ? 50 : c === 9 && r === 4 ? 26 : r * 10 + c + 1);

export const B = { num: 14, land: 20, plate: 26, xui: 35, xuiOut: 105, fin: 105, stamp: 126, xcas: 148, gold: 180, card: 210 };

export const S0Hook: React.FC<{ lf: number }> = ({ lf }) => {
  /* ---------- the violation ---------- */
  const drop = over(lf, B.num, 6, Easing.in(Easing.quad));            // he falls
  const groundY = SEAT_Y + drop * (FLOOR_Y - SEAT_Y);
  const broke = lf >= B.num;
  const landed = lf >= B.land;
  const landP = Math.max(0, 1 - Math.abs(lf - B.land) / 4);
  const squashY = 1 - landP * 0.10;
  const jolt = Math.max(0, 1 - Math.abs(lf - B.land) / 9);
  const shakeX = Math.sin(lf * 3.3) * jolt * 9;
  const shakeY = Math.cos(lf * 2.7) * jolt * 7;
  const shock = over(lf, B.num, 4) * (1 - over(lf, B.land + 16, 14));
  const ring = over(lf, B.land, 16, Easing.out(Easing.quad));
  const ringOn = lf >= B.land && lf < B.land + 18;
  const floorJump = Math.max(0, 1 - Math.abs(lf - B.land - 2) / 10);
  const boardJmp = 1 + Math.max(0, 1 - Math.abs(lf - B.land - 1) / 6) * 0.09;
  const chairP = over(lf, B.num, 12, Easing.out(Easing.quad));        // the seat snaps off and fells right
  const baseP = over(lf, B.num, 14, Easing.out(Easing.quad));         // the star base skitters left
  const casterSpin = landed ? (lf - B.land) * 5.6 : 0;
  const bfall = over(lf, B.num, 13, Easing.out(Easing.back(1.4)));    // the board tears its top fixing out
  const bRot = -2.6 * bfall, bTy = 19 * bfall;
  const burst = over(lf, B.land, 44, Easing.out(Easing.quad));        // the desk load goes over
  const kbHang = over(lf, B.land + 1, 8, Easing.out(Easing.back(1.1)));
  const kbSway = Math.sin((lf - B.land) / 6.4) * Math.max(0.14, 1 - Math.max(0, lf - B.land) / 80) * 13 * (landed ? 1 : 0);
  const monRot = -13 * over(lf, B.land, 7, Easing.out(Easing.back(1.4)));
  const seat = over(lf, B.num - 2, 3);                                // the 50th card seats
  const flash = Math.max(0, 1 - Math.abs(lf - B.land) / 6);

  /* ---------- the rest of the beats ---------- */
  const plateIn = over(lf, B.plate, 9, Easing.out(Easing.back(2.2)));
  const finStamp = over(lf, B.stamp, 7, Easing.out(Easing.back(2)));
  const stampPulse = Math.max(0, 1 - Math.abs(lf - B.stamp - 3) / 9);
  const cold = over(lf, B.fin, 7) * (1 - over(lf, B.xcas, 8));
  const rant = over(lf, B.xcas, 10);
  const wash = over(lf, B.xcas, 34);
  const sweepX = over(lf, B.xcas, 34, Easing.inOut(Easing.quad)) * 540;
  const cardIn = over(lf, B.card, 8, Easing.out(Easing.back(1.8)));
  const lampBoost = 1 + over(lf, B.card, 10) * 0.20 + flash * 0.26;
  const swing = Math.sin((lf - B.land) / 4.4) * Math.max(0, 1 - Math.max(0, lf - B.land) / 66) * 8 * (landed ? 1 : 0);
  const lampCant = broke ? -6 * over(lf, B.num, 10) : 0;
  const feed = lf * 1.9;
  const folds = 7 + Math.floor(feed / 26);
  const gaze = Math.round(over(lf, B.stamp + 4, 12) * 4 - over(lf, B.num, 8) * 3);
  const xAt = (c: number, r: number) => B.xcas + (c * 5 + r * 2) * 0.60;
  const shotB = lf >= B.fin;
  const cutFlash = lf >= B.fin ? Math.max(0, 1 - (lf - B.fin) / 5) : 0;

  return (
    <>
      <div style={{ position: "absolute", left: 0, top: 0, width: 1012, height: 792, transformOrigin: "0 0",
        transform: shotB ? `translate(${-132 + shakeX}px,${-253 + shakeY}px) scale(1.32)` : `translate(${shakeX}px,${shakeY}px)` }}>
        <svg viewBox="0 0 1012 792" width={1012} height={792} style={{ position: "absolute", left: 0, top: 0 }}>
          <defs>
            <linearGradient id="s0lamp2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#FFCE7A" stopOpacity=".46" /><stop offset="1" stopColor="#FFCE7A" stopOpacity="0" /></linearGradient>
            <radialGradient id="s0pool" cx=".5" cy=".5" r=".5"><stop offset="0" stopColor="#FFCE7A" stopOpacity=".88" /><stop offset=".42" stopColor="#E79A3F" stopOpacity=".30" /><stop offset="1" stopColor="#E79A3F" stopOpacity="0" /></radialGradient>
            <radialGradient id="s0gold" cx=".5" cy=".5" r=".5"><stop offset="0" stopColor="#FFD98A" stopOpacity=".9" /><stop offset="1" stopColor="#E7A93F" stopOpacity="0" /></radialGradient>
            <linearGradient id="s0dawn" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#44628C" /><stop offset="1" stopColor="#1C2A44" /></linearGradient>
            <linearGradient id="s0cork" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#57392A" /><stop offset="1" stopColor="#3B2620" /></linearGradient>
            <linearGradient id="s0desk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#7A5335" /><stop offset="1" stopColor="#4C331E" /></linearGradient>
          </defs>

          <Room wall1="#332234" wall2="#241823" floor1="#5A3D28" floor2="#2E1D0E" floorY={FLOOR_Y} />

          {/* ═══ P6 far — the wall itself: picture rail, a peeling seam, a water stain, a patched hole */}
          <rect x={0} y={212} width={1012} height={7} fill="#3E2B3E" />
          <rect x={0} y={219} width={1012} height={3} fill="#1C121C" opacity={0.6} />
          <path d="M486 224 L486 546" stroke="#241726" strokeWidth={3} opacity={0.7} />
          <path d="M612 232 q16 60 -8 122 q-18 46 6 92" stroke="#3E2A3E" strokeWidth={5} fill="none" opacity={0.75} />
          <path d="M812 236 q26 46 10 96 q-12 40 12 74" stroke="#3E2A3E" strokeWidth={4} fill="none" opacity={0.6} />
          <ellipse cx={930} cy={262} rx={62} ry={34} fill="#3B2A38" opacity={0.55} />
          <ellipse cx={930} cy={262} rx={40} ry={21} fill="#452F40" opacity={0.5} />
          {/* the patched hole — someone put a fist or a shelf through it and taped cardboard over it */}
          <g transform="translate(736,340)">
            <rect width={60} height={50} fill="#2A1C2A" />
            <rect width={60} height={50} fill="#6B5232" opacity={0.75} />
            <rect x={-9} y={12} width={78} height={12} fill="#C9BFA6" opacity={0.55} transform="rotate(-7 30 18)" />
            <rect x={-9} y={30} width={78} height={12} fill="#C9BFA6" opacity={0.45} transform="rotate(5 30 36)" />
          </g>
          {/* a taped cable run climbing the wall to the ceiling */}
          <path d="M792 548 L800 430 L806 300 L806 224" stroke="#16101A" strokeWidth={6} fill="none" />
          <path d="M792 548 L800 430 L806 300 L806 224" stroke="#4A3A50" strokeWidth={2} fill="none" />
          {[452, 372, 292].map((y, i) => <rect key={i} x={794} y={y} width={20} height={11} fill="#CFC3A6" opacity={0.4} />)}
          {/* light switch, at 1.2m */}
          <g transform="translate(846,452)">
            <rect width={26} height={32} rx={3} fill="#0F0A12" opacity={0.4} transform="translate(3,4)" />
            <rect width={26} height={32} rx={3} fill="#CFC6B6" />
            <rect x={7} y={7} width={12} height={17} rx={2} fill="#8E8676" />
          </g>
          {/* scratched tally gates — three days, counted on the plaster */}
          <g stroke="#7E6B84" strokeWidth={3} opacity={0.6}>
            {[0, 1, 2].map((g) => (
              <g key={g} transform={`translate(${500 + g * 34},420)`}>
                {[0, 1, 2, 3].map((k) => <line key={k} x1={k * 6} y1={0} x2={k * 6 + 2} y2={28} />)}
                <line x1={-2} y1={26} x2={24} y2={2} />
              </g>))}
          </g>

          {/* ═══ P6 — the pre-dawn sash window (0.6m × 0.93m), the ONLY cool source */}
          <g>
            <rect x={880} y={346} width={124} height={188} fill="#0D1424" />
            <rect x={888} y={354} width={108} height={172} fill="url(#s0dawn)" />
            {/* the block opposite, three windows still lit */}
            <rect x={888} y={430} width={108} height={96} fill="#16203A" />
            {[[898, 446], [934, 452], [960, 440]].map(([x, y], i) => (
              <rect key={i} x={x} y={y} width={13} height={17} fill="#C9A45E" opacity={0.5} />))}
            {/* a distant aerial light, blinking */}
            <circle cx={968} cy={378} r={3.4} fill="#E8776A" opacity={lf % 46 < 12 ? 0.85 : 0.12} />
            {/* fire-escape rail crossing the glass */}
            <rect x={888} y={476} width={108} height={5} fill="#0D1424" />
            <rect x={936} y={354} width={6} height={172} fill="#0D1424" />
            <rect x={888} y={436} width={108} height={5} fill="#0D1424" />
            <rect x={874} y={526} width={136} height={12} fill="#3A2A38" />
            <rect x={874} y={526} width={136} height={4} fill="#544050" />
          </g>

          {/* ═══ P5 — the working wall: calendar, DAY 3 card, the pin plate, the tally card */}
          <g transform="translate(500,246)">
            <rect x={4} y={5} width={92} height={102} fill="#0C060E" opacity={0.4} />
            <rect width={92} height={102} fill="#DED6C4" />
            <rect width={92} height={22} fill="#8C4A57" />
            <rect x={8} y={6} width={22} height={10} fill="#E7D3D6" opacity={0.7} />
            {Array.from({ length: 28 }, (_, i) => {
              const cx = 9 + (i % 7) * 12, cy = 32 + Math.floor(i / 7) * 17;
              return (<g key={i}>
                <rect x={cx} y={cy} width={9} height={11} fill="#C6BCA6" />
                {i > 21 && (<g stroke="#B23A2C" strokeWidth={3} strokeLinecap="round">
                  <line x1={cx} y1={cy} x2={cx + 9} y2={cy + 11} /><line x1={cx + 9} y1={cy} x2={cx} y2={cy + 11} />
                </g>)}
              </g>);
            })}
          </g>
          {/* the DAY 3 card, taped up crooked */}
          <g transform="translate(616,348) rotate(-4)">
            <rect x={4} y={5} width={M(0.21)} height={M(0.14)} rx={3} fill="#0C060E" opacity={0.4} />
            <rect width={M(0.21)} height={M(0.14)} rx={3} fill="#C8A87A" />
            <text x={M(0.21) / 2} y={17} fontFamily={mono} fontSize={16} fontWeight={700} fill="#3A2A16" textAnchor="middle">DAY 3</text>
            <text x={M(0.21) / 2} y={32} fontFamily={mono} fontSize={11} fontWeight={700} fill="#5B4322" textAnchor="middle">NO SLEEP</text>
            <rect x={M(0.21) / 2 - 16} y={-7} width={32} height={11} fill="#CFC3A6" opacity={0.5} />
          </g>

          {/* ═══ the hero's shadow thrown up the wall by the low-left lamp (ONE light direction) */}
          <g opacity={0.19} transform={`translate(${broke ? 34 : 0},${broke ? 96 : 0})`}>
            <path d="M508 560 L546 300 q46 -34 96 0 L678 560 Z" fill="#0B060E" />
            <ellipse cx={594} cy={300} rx={64} ry={52} fill="#0B060E" />
            <path d="M642 344 l58 -22 l10 26 l-62 26 z" fill="#0B060E" opacity={broke ? 0 : 1} />
          </g>

          {/* the fixing the board ripped out of when he grabbed it — stays torn for the rest of the reel */}
          {broke && (<g>
            <path d="M436 210 l58 -4 l10 26 l-24 12 l-30 -8 z" fill="#1B0F1B" />
            <path d="M444 216 l40 -3 l6 15 l-16 7 l-22 -6 z" fill="#553B52" />
            <rect x={462} y={222} width={30} height={9} rx={3} fill="#5E6473" transform="rotate(24 462 226)" />
            {Array.from({ length: 6 }, (_, i) => { const sd = seed(i * 61.3), p = over(lf, B.num, 20, Easing.out(Easing.quad));
              const x = 466 + (sd - 0.2) * 240 * p, y = 218 - Math.sin(p * Math.PI) * (60 + sd * 60) + p * 120;
              return <rect key={`s${i}`} x={x} y={y} width={5} height={12} fill="#8A8FA0"
                           transform={`rotate(${p * 520 * (sd - 0.5)} ${x} ${y})`} opacity={(1 - p) * 0.9} />; })}
          </g>)}

          {/* ═══ P4 — THE CORKBOARD OF 50 (hangs crooked off one fixing after the break) */}
          <g transform={`translate(0,${bTy}) rotate(${bRot} ${BX} ${BY}) translate(${BX + BW / 2},${BY + BH / 2}) scale(${boardJmp}) translate(${-(BX + BW / 2)},${-(BY + BH / 2)})`}>
            <rect x={BX + 5} y={BY + 7} width={BW} height={BH} fill="#0C060E" opacity={0.45} />
            <rect x={BX} y={BY} width={BW} height={BH} fill="url(#s0cork)" />
            <rect x={BX} y={BY} width={BW} height={BH} fill="none" stroke="#6B4A34" strokeWidth={9} />
            <rect x={BX + 4} y={BY + 4} width={BW - 8} height={5} fill="#8A6242" opacity={0.7} />
            {/* cork grain */}
            {Array.from({ length: 46 }, (_, i) => {
              const sd = seed(i * 4.3);
              return <circle key={`k${i}`} cx={BX + 14 + sd * (BW - 28)} cy={BY + 14 + seed(i * 7.1) * (BH - 28)}
                             r={2 + seed(i * 2.7) * 4} fill="#2E1D1A" opacity={0.32} />; })}

            {ROWS.map((y, r) => COLS.map((x, c) => {
              const g = isGold(c, r);
              const n = cardNo(c, r);
              const sd = seed(n * 3.1);
              const tilt = (sd - 0.5) * 4.4;
              const isPinned = c === PIN_C && r === PIN_R;
              const xp = g ? 0 : over(lf, xAt(c, r), 5, Easing.out(Easing.quad));
              const fs = xAt(c, r) + 10 + seed(n * 2.9) * 14;
              const fp = g ? 0 : over(lf, fs, 34, Easing.in(Easing.quad));
              const fy = fp * (420 + seed(n * 5.5) * 150);
              const fx = fp * (seed(n * 8.1) - 0.5) * 150;
              const frot = fp * ((seed(n * 3.3) - 0.5) * 220);
              const fop = 1 - over(lf, fs + 26, 14);
              const lit = g ? over(lf, B.gold + gIdx(c, r) * 6, 9) : 0;
              const lift = isPinned ? (1 - seat) * 5 : 0;
              return (
                <g key={`${c}-${r}`} opacity={g ? 1 : fop}
                   transform={`translate(${x + fx},${y + fy - lift}) rotate(${tilt + frot} ${SW / 2} ${SH / 2})`}>
                  {g && <rect x={-48} y={-48} width={SW + 96} height={SH + 96} fill="url(#s0gold)" opacity={lit} />}
                  <rect x={2} y={4} width={SW} height={SH} fill="#0C060E" opacity={0.4} />
                  <rect width={SW} height={SH} fill={lit > 0.5 ? "#F7EBD0" : "#E4DCCA"} />
                  <rect width={SW} height={4} fill={lit > 0.5 ? "#FFF6DF" : "#F1EADA"} />
                  <rect x={4} y={9} width={19} height={4} fill={lit > 0.5 ? "#8A6416" : "#A79F8E"} />
                  {[18, 26, 34, 42, 50].map((yy, k) => (
                    <rect key={k} x={4} y={yy} width={16 + Math.round(seed(n * (k + 2) * 1.7) * 15)} height={3}
                          fill={lit > 0.5 ? "#C6A96A" : "#C0B8A6"} />))}
                  <text x={SW - 3} y={SH - 4} fontFamily={mono} fontSize={10} fontWeight={700}
                        fill={g ? "#8A6416" : "#8F8878"} textAnchor="end">{String(n).padStart(2, "0")}</text>
                  {/* the pin head */}
                  <circle cx={SW / 2} cy={5} r={3.4} fill={g ? "#E7B24C" : "#B23A2C"} />
                  <circle cx={SW / 2 - 1} cy={4} r={1.2} fill="#FFE7CC" opacity={0.8} />
                  {!g && xp > 0 && (<g stroke="#B23A2C" strokeWidth={4} strokeLinecap="round">
                    <line x1={5} y1={9} x2={5 + 28 * Math.min(1, xp * 2)} y2={9 + 48 * Math.min(1, xp * 2)} />
                    <line x1={33} y1={9} x2={33 - 28 * Math.max(0, xp * 2 - 1)} y2={9 + 48 * Math.max(0, xp * 2 - 1)} />
                  </g>)}
                  {g && lit > 0 && <ellipse cx={SW / 2} cy={SH / 2} rx={24} ry={38} fill="none" stroke="#D9A227" strokeWidth={5}
                                            strokeDasharray={200} strokeDashoffset={200 * (1 - lit)} />}
                </g>);
            }))}

            {/* the red string web between the four gold cards */}
            {(() => { const p = over(lf, B.gold + 14, 10, Easing.out(Easing.back(1.2))); if (p <= 0) return null;
              const E: [number, number][][] = [[GXY[0], GXY[1]], [GXY[1], GXY[2]], [GXY[2], GXY[3]], [GXY[3], GXY[0]], [GXY[0], GXY[2]]];
              return (<g opacity={p}>
                {E.map(([a, b], i) => { const sag = (1 - p) * 30;
                  return <path key={i} d={`M${a[0]} ${a[1]} Q${(a[0] + b[0]) / 2} ${(a[1] + b[1]) / 2 + sag} ${b[0]} ${b[1]}`} stroke="#C0392B" strokeWidth={4} fill="none" />; })}
                {GXY.map(([x, y], i) => <circle key={i} cx={x} cy={y} r={6} fill={GOLD} />)}
              </g>); })()}

            {/* the wall goes cold, then the cascade's sweep bar burns across it */}
            {cold > 0 && <rect x={BX} y={BY} width={BW} height={BH} fill="#101A2E" opacity={cold * 0.42} />}
            {wash > 0 && wash < 1 && (<>
              <rect x={BX} y={BY} width={Math.max(0, sweepX)} height={BH} fill="#B23A2C" opacity={0.16} />
              <rect x={BX + sweepX - 20} y={BY} width={78} height={BH} fill="#FFD9C0" opacity={0.5} />
              <rect x={BX + sweepX + 62} y={BY} width={40} height={BH} fill="#FFF2E4" opacity={0.26} />
            </>)}
            {/* the tally card, pinned into the gap the 46 left behind */}
            {cardIn > 0 && (
              <g transform={`translate(238,292) rotate(-3) scale(${0.86 + cardIn * 0.14})`} opacity={cardIn}>
                <rect x={-8} y={-5} width={152} height={92} rx={5} fill="#0C060E" opacity={0.45} />
                <rect x={-12} y={-9} width={152} height={92} rx={5} fill="#F2EADA" />
                <text x={4} y={32} fontFamily={mono} fontSize={40} fontWeight={700} fill="#B23A2C">46</text>
                <text x={52} y={32} fontFamily={mono} fontSize={19} fontWeight={700} fill="#8E7062">JUNK</text>
                <text x={4} y={66} fontFamily={mono} fontSize={40} fontWeight={700} fill="#C08A16">4</text>
                <text x={36} y={66} fontFamily={mono} fontSize={19} fontWeight={700} fill="#9A7A32">REAL</text>
                <circle cx={64} cy={-3} r={5} fill="#B23A2C" />
              </g>)}
          </g>

          {/* the 50/50 plate stamped onto the wall after he lands */}
          {plateIn > 0 && (
            <g transform={`translate(700,280) rotate(5) scale(${0.62 + plateIn * 0.38})`} opacity={plateIn}>
              <rect x={-92} y={-34} width={184} height={68} rx={9} fill="#1A1220" stroke={GOLD} strokeWidth={4} />
              <text x={0} y={12} fontFamily={mono} fontSize={34} fontWeight={700} fill={GOLD} textAnchor="middle">50 / 50</text>
              <text x={0} y={-42} fontFamily={mono} fontSize={16} fontWeight={700} fill="#B79A62" textAnchor="middle" letterSpacing="2">PINNED</text>
            </g>)}

          {/* ═══ P3 — THE DESK (0.75m), right of the board: slab, apron, legs, drawer bank, footwell */}
          <g>
            <rect x={528} y={592} width={172} height={108} fill="#150D14" opacity={0.62} />
            {/* the cable nest and a taped-down power strip living in the footwell */}
            <g opacity={0.9}>
              <path d="M556 700 q22 -34 58 -18 q40 12 22 -24" stroke="#0F0A12" strokeWidth={6} fill="none" />
              <path d="M600 700 q30 -26 62 -10" stroke="#0F0A12" strokeWidth={5} fill="none" />
              <rect x={578} y={676} width={92} height={18} rx={4} fill="#23202B" />
              <rect x={578} y={676} width={92} height={5} rx={2} fill="#39343F" />
              {[0, 1, 2].map((i) => (
                <circle key={i} cx={590 + i * 22} cy={686} r={3.4}
                        fill={(lf + i * 19) % (30 + i * 11) < 12 ? "#3F9E74" : "#1B3A2C"} />))}
            </g>
            <rect x={508} y={592} width={22} height={108} fill="#2C1D10" />
            <rect x={982} y={592} width={22} height={108} fill="#2C1D10" />
            <g>
              <rect x={700} y={566} width={170} height={134} fill="#33220F" />
              {[0, 1, 2].map((i) => (<g key={i} transform={`translate(706,${572 + i * 43})`}>
                <rect width={158} height={37} rx={3} fill="#4A3320" />
                <rect width={158} height={4} rx={2} fill="#63472C" />
                <rect x={58} y={16} width={42} height={7} rx={3} fill="#96825F" />
              </g>))}
            </g>
            <rect x={500} y={562} width={512} height={32} fill="#3E2A18" />
            <rect x={494} y={546} width={518} height={16} fill="url(#s0desk)" />
            <rect x={494} y={546} width={518} height={5} fill="#93673F" />
            <rect x={494} y={560} width={518} height={5} fill="#000" opacity={0.35} />
          </g>

          {/* loose printouts strewn over the desk top — never a dead brown band */}
          {Array.from({ length: 11 }, (_, i) => { const sd = seed(i * 11.3 + 2);
            const x = 506 + sd * 470, y = 520 - seed(i * 5.9) * 12, w = 26 + seed(i * 3.1) * 20;
            const sl = burst > 0 && x > 560 && x < 700 ? burst * (46 + sd * 40) : 0;
            return <rect key={`d${i}`} x={x} y={y + sl} width={w} height={w * 0.7} fill={i % 3 ? "#D5CCB9" : "#E6DFCE"}
                         transform={`rotate(${(seed(i * 7.7) - 0.5) * 50 + sl} ${x + w / 2} ${y + w * 0.35})`} opacity={0.9} />; })}

          {/* the mug graveyard — 0.14m each; two go over on the impact, one clears the desk entirely */}
          {[506, 538, 570, 762].map((x, i) => {
            const knocked = landed && i < 2;
            const tipP = knocked ? over(lf, B.land + 1 + i * 2, 6, Easing.out(Easing.quad)) : 0;
            return (
              <g key={i} transform={`rotate(${tipP * (i ? 88 : -84)} ${x + MUG / 2} ${DESK_Y - 12})`}>
                <ellipse cx={x + MUG / 2} cy={DESK_Y - 10} rx={MUG * 0.62} ry={4} fill="#000" opacity={0.35} />
                <path d={`M${x + MUG + 1} ${DESK_Y - MUG - 8} q8 1 8 7 t-8 7`} stroke="#EDE6D6" strokeWidth={4} fill="none" />
                <rect x={x} y={DESK_Y - MUG - 12} width={MUG} height={MUG} rx={2} fill="#EDE6D6" />
                <rect x={x} y={DESK_Y - MUG - 12} width={MUG} height={4} rx={2} fill="#FBF6EA" />
              </g>);
          })}
          {/* the steam wisp off the last hot one — dies the moment the room does */}
          {!broke && (<g opacity={0.2}>
            {[0, 1, 2].map((i) => (
              <path key={i} d={`M${776 + i * 5} ${DESK_Y - 40} q${Math.sin((lf + i * 20) / 11) * 9} -14 0 -28`}
                    stroke="#EFE3CC" strokeWidth={3} fill="none" />))}
          </g>)}
          {/* the noodle pot and its fork — tipped over for good on the impact */}
          <g transform={`translate(600,${DESK_Y - 40}) rotate(${landed ? 74 * over(lf, B.land + 2, 7) : 0} 18 40)`}>
            <rect x={-4} y={38} width={44} height={6} fill="#000" opacity={0.3} />
            <path d="M2 0 l32 0 l-4 40 l-24 0 z" fill="#C9542F" />
            <path d="M2 0 l32 0 l-1 8 l-30 0 z" fill="#E27A4B" />
            <rect x={22} y={-22} width={5} height={26} fill="#BFB6A2" transform="rotate(15 24 -10)" />
          </g>
          {/* a pen jar; its pens end up across the desk */}
          <g transform="translate(742,506)">
            <rect x={0} y={30} width={26} height={5} fill="#000" opacity={0.3} />
            <rect width={26} height={34} rx={3} fill="#2C3B58" />
            <rect width={26} height={5} rx={2} fill="#3E5279" />
            {[0, 1, 2].map((i) => {
              const out = landed ? over(lf, B.land + 3, 8, Easing.out(Easing.quad)) : 0;
              return <rect key={i} x={4 + i * 7} y={-16 + out * 44} width={4} height={22} fill={["#C0392B", "#E7B24C", "#3F9E74"][i]}
                           transform={`rotate(${(i - 1) * 9 + out * (70 + i * 22)} ${6 + i * 7} ${-6 + out * 44})`} />; })}
          </g>

          {/* THE MONITOR — 0.60 × 0.40m. Cants and cracks on the impact and stays that way. */}
          <g transform={`rotate(${monRot} 696 546)`}>
            <g transform={`translate(640,${546 - MON_H - 18})`}>
              <rect x={-5} y={-5} width={MON_W + 10} height={MON_H + 10} rx={6} fill="#0E1626" />
              <rect width={MON_W} height={MON_H} rx={4} fill="#1C2942" />
              <rect x={7} y={7} width={MON_W - 14} height={10} rx={3} fill="#2B3D5E" />
              <g fill="#3C5279">
                <rect x={7} y={22} width={76} height={6} rx={2} /><rect x={7} y={34} width={58} height={6} rx={2} />
                <rect x={7} y={46} width={84} height={6} rx={2} />
              </g>
              <rect x={7} y={58} width={Math.round(20 + ((lf * 0.7) % 74))} height={5} rx={2} fill="#3F9E74" opacity={0.75} />
              <rect x={94} y={34} width={7} height={9} fill="#7FA0D0" opacity={lf % 28 < 14 ? 0.85 : 0.15} />
              {landed && (<g stroke="#B9C9E6" strokeWidth={2} fill="none" opacity={0.7}>
                <path d="M16 8 L44 34 L36 56 L60 70" /><path d="M44 34 L78 26" /><path d="M36 56 L12 62" />
              </g>)}
              <rect x={MON_W / 2 - 12} y={MON_H} width={24} height={16} fill="#141E32" />
              <rect x={MON_W / 2 - 34} y={MON_H + 16} width={68} height={7} rx={4} fill="#141E32" />
              {finStamp > 0 && (
                <g transform={`translate(${MON_W / 2},${MON_H / 2}) rotate(-9) scale(${0.6 + finStamp * 0.4})`} opacity={finStamp}>
                  <rect x={-56} y={-15} width={112} height={30} rx={4} fill="none" stroke="#C0392B" strokeWidth={4} />
                  <text x={0} y={7} fontFamily={mono} fontSize={17} fontWeight={700} fill="#D9503C" textAnchor="middle">0 FINISHED</text>
                </g>)}
            </g>
          </g>

          {/* the keyboard — on the desk at frame 0, hanging by its cable and swinging afterwards */}
          <g transform={`translate(${540 - kbHang * 34},${534 + kbHang * 26}) rotate(${kbHang * 78 + kbSway} 4 6)`}>
            <path d={`M4 6 q${-18 - kbSway} 26 ${-26 - kbSway * 1.4} 58`} stroke="#16101A" strokeWidth={4} fill="none" opacity={kbHang} />
            <rect x={2} y={4} width={96} height={16} rx={3} fill="#0C060E" opacity={0.35} />
            <rect width={96} height={16} rx={3} fill="#2A3852" />
            <rect width={96} height={5} rx={2} fill="#3E5175" />
            {Array.from({ length: 16 }, (_, i) => <rect key={i} x={4 + (i % 8) * 11} y={6 + Math.floor(i / 8) * 5} width={8} height={3} fill="#586E96" />)}
          </g>

          {/* THE PRINTER — still feeding at frame 0; the fanfold buckles when the desk takes the hit */}
          <g transform={`translate(806,${546 - M(0.30)})`}>
            {Array.from({ length: Math.min(13, folds) }, (_, i) => {
              const ph = (feed % 26) / 26, k = i + ph, y = -34 + k * 12, w = 82 - k * 2.6;
              return <rect key={i} x={6 + k * 1.3} y={y} width={Math.max(18, w)} height={9}
                           fill={i % 2 ? "#DCD3C0" : "#EFE8D8"} transform={`rotate(${(i % 2 ? -3 : 3) + (landed ? 6 : 0)} 48 ${y + 4})`} />; })}
            <rect x={0} y={0} width={94} height={10} fill="#E8E1D2" />
            <rect x={-4} y={9} width={102} height={M(0.30) - 9} rx={5} fill="#2A3852" />
            <rect x={-4} y={9} width={102} height={6} rx={3} fill="#3E5175" />
            <rect x={10} y={26} width={54} height={7} rx={3} fill="#1B2537" />
            <circle cx={84} cy={30} r={5} fill={landed ? (lf % 22 < 11 ? "#D9503C" : "#4A2018") : (lf % 40 < 20 ? "#3F9E74" : "#1F4A38")} />
          </g>

          {/* a small desk fan, turning all scene — dim, low-contrast texture */}
          <g transform="translate(944,494)">
            <rect x={16} y={50} width={26} height={4} fill="#000" opacity={0.3} />
            <rect x={24} y={34} width={10} height={18} fill="#2C3B58" />
            <circle cx={29} cy={26} r={25} fill="#1B2537" />
            <circle cx={29} cy={26} r={25} fill="none" stroke="#3E5175" strokeWidth={3} />
            <g transform={`rotate(${lf * 11} 29 26)`} fill="#46587C" opacity={0.9}>
              {[0, 120, 240].map((a) => (
                <path key={a} d="M29 26 q13 -6 17 -15 q-9 -4 -17 15 z" transform={`rotate(${a} 29 26)`} />))}
            </g>
            <circle cx={29} cy={26} r={5} fill="#6A7FA6" />
            {[0, 1].map((i) => <circle key={i} cx={10 + i * 12} cy={49} r={2.6} fill={(lf + i * 17) % (26 + i * 9) < 10 ? "#3F9E74" : "#1B3A2C"} />)}
          </g>

          {/* ═══ P2 — THE OFFICE CHAIR. Whole at frame 0. At f14 the gas column SNAPS: the seat is felled
                 to the right and the star base skitters left, and both stay where they land. */}
          {/* the base + casters + the stub of column left standing in it */}
          <g transform={`translate(${baseP * 152},${-baseP * 3}) rotate(${baseP * 9} 420 700)`}>
            <ellipse cx={420} cy={FLOOR_Y - 3} rx={80} ry={12} fill="#000" opacity={0.4} />
            <g stroke="#2A3852" strokeWidth={11} strokeLinecap="round">
              <line x1={420} y1={FLOOR_Y - 15} x2={356} y2={FLOOR_Y - 6} />
              <line x1={420} y1={FLOOR_Y - 15} x2={484} y2={FLOOR_Y - 6} />
              <line x1={420} y1={FLOOR_Y - 15} x2={392} y2={FLOOR_Y - 1} />
              <line x1={420} y1={FLOOR_Y - 15} x2={452} y2={FLOOR_Y - 1} />
            </g>
            <g transform={`rotate(${casterSpin} 356 ${FLOOR_Y - 2})`}>
              <circle cx={356} cy={FLOOR_Y - 2} r={11} fill="#141C29" />
              <rect x={354} y={FLOOR_Y - 13} width={4} height={22} fill="#4B5F86" />
            </g>
            <circle cx={484} cy={FLOOR_Y - 2} r={11} fill="#141C29" />
            <circle cx={484} cy={FLOOR_Y - 2} r={4} fill="#3D5074" />
            <rect x={412} y={FLOOR_Y - 42} width={16} height={28} fill="#232F44" />
            <rect x={412} y={FLOOR_Y - 42} width={5} height={28} fill="#3D5074" />
            {broke && <path d="M412 658 l5 -7 l4 6 l4 -8 l3 9 z" fill="#6E7E9E" />}
          </g>
          {/* the seat, the upper column and the backrest — felled to the right */}
          <g transform={`translate(${chairP * 104},0) rotate(${chairP * 84} 420 700)`}>
            <rect x={412} y={SEAT_Y + 22} width={16} height={FLOOR_Y - SEAT_Y - 60} fill="#232F44" />
            <rect x={412} y={SEAT_Y + 22} width={5} height={FLOOR_Y - SEAT_Y - 60} fill="#3D5074" />
            {broke && <path d="M412 658 l5 8 l4 -6 l4 8 l3 -9 z" fill="#6E7E9E" />}
            {/* the armrest — the most chair-shaped thing on it, and the part that reads once it's down */}
            <path d={`M356 ${SEAT_Y + 4} q-16 -14 -14 -34 q2 -18 24 -18 l52 0`} stroke="#233046" strokeWidth={11} fill="none" strokeLinecap="round" />
            <path d={`M366 ${SEAT_Y - 48} l50 0`} stroke="#4A5F86" strokeWidth={5} fill="none" strokeLinecap="round" />
            <rect x={350} y={SEAT_Y} width={140} height={26} rx={8} fill="#2C3B54" />
            <rect x={350} y={SEAT_Y} width={140} height={8} rx={4} fill="#4A5F86" />
            <rect x={350} y={SEAT_Y + 20} width={140} height={6} rx={3} fill="#1A2434" />
            <rect x={352} y={SEAT_Y - 68} width={19} height={72} rx={6} fill="#232F44" />
            <rect x={326} y={SEAT_Y - 122} width={48} height={62} rx={10} fill="#2C3B54" />
            <rect x={326} y={SEAT_Y - 122} width={48} height={9} rx={4} fill="#4A5F86" />
          </g>

          {/* ═══ THE LAMP — the one motivated key, low-left on a tripod. Knocked askew on the impact. */}
          <g transform={`rotate(${swing + lampCant} 111 742)`}>
            <path d="M111 742 L58 748 M111 742 L164 748 M111 742 L111 752" stroke="#1F2A3E" strokeWidth={9} strokeLinecap="round" />
            <rect x={104} y={412} width={14} height={332} fill="#1F2A3E" />
            <rect x={104} y={412} width={5} height={332} fill="#33415E" />
            <path d={`M111 420 q0 -34 46 -34`} stroke="#1F2A3E" strokeWidth={11} fill="none" />
            <path d="M62 430 l106 -44 l14 46 l-106 44 z" fill="#2B3B58" />
            <path d="M62 430 l106 -44 l4 12 l-106 44 z" fill="#3E5279" />
            <rect x={72} y={430} width={M(0.44)} height={8} rx={4} fill="#FFE3A8" opacity={Math.min(1, 0.85 * lampBoost)} />
          </g>
          <polygon points={`74,436 172,428 1012,792 -80,792`} fill="url(#s0lamp2)" opacity={(0.72 + 0.14 * Math.sin(lf / 7)) * lampBoost} />
          <ellipse cx={230 + swing * 8} cy={600} rx={330} ry={250} fill="url(#s0pool)" opacity={Math.min(1, 0.85 * lampBoost)} />
          {/* dust motes hanging in the cone */}
          {Array.from({ length: 13 }, (_, i) => { const sd = seed(i * 13.7);
            const x = 150 + sd * 700 + Math.sin((lf + i * 23) / 34) * 24;
            const y = 320 + ((lf * (0.30 + sd * 0.5) + sd * 430) % 440);
            return <circle key={`m${i}`} cx={x} cy={y} r={1.5 + sd * 1.7} fill="#FFE3AE" opacity={0.14 + sd * 0.12} />; })}
          {/* one moth working the shade */}
          <rect x={112 + Math.cos(lf / 8.5) * 52} y={402 + Math.sin(lf / 6.1) * 22} width={6} height={4}
                fill="#E4D3AE" opacity={0.42} transform={`rotate(${Math.sin(lf / 4) * 40} 115 404)`} />

          {/* ═══ THE FLOOR — the paper drift, the bin, the fallen mug, the spill from the desk */}
          <g>
            <path d={`M0 792 L0 ${FLOOR_Y + 4} Q120 ${FLOOR_Y - 18} 246 ${FLOOR_Y + 2} Q392 ${FLOOR_Y + 20} 520 ${FLOOR_Y} Q680 ${FLOOR_Y - 22} 812 ${FLOOR_Y + 4} Q928 ${FLOOR_Y + 22} 1012 ${FLOOR_Y + 8} L1012 792 Z`} fill="#3A2E20" opacity={0.85} />
            {Array.from({ length: 22 + Math.round(over(lf, B.xcas + 16, 46) * 18) }, (_, i) => {
              const sd = seed(i * 9.7), x = 8 + sd * 960, y = FLOOR_Y - 12 + seed(i * 4.1) * 88;
              const w = 34 + seed(i * 2.3) * 26, rot = (seed(i * 6.2) - 0.5) * 46;
              const jy = -floorJump * (14 + seed(i * 3.7) * 34);
              return <rect key={i} x={x} y={y + jy} width={w} height={w * 0.72} fill={i % 3 ? "#E1D9C8" : "#EEE7D7"}
                           transform={`rotate(${rot + jy * 0.9} ${x + w / 2} ${y + w * 0.36})`} opacity={0.94} />; })}
            {/* the sheaf he dragged off the desk on the way down — settles and stays */}
            {burst > 0 && Array.from({ length: 15 }, (_, i) => { const sd = seed(i * 21.3);
              const t = Math.min(1, burst * (0.7 + sd * 0.6));
              const x = 588 + (sd - 0.5) * 300 * t - t * 90;
              const y = 520 + t * 190 - Math.sin(t * Math.PI) * 130;
              return <rect key={`b${i}`} x={x} y={y} width={30 + sd * 16} height={22 + sd * 10} fill={i % 2 ? "#E6DFCE" : "#F0E9D9"}
                           transform={`rotate(${(sd - 0.5) * 500 * t} ${x + 18} ${y + 12})`} opacity={0.95} />; })}
            {/* the mug that cleared the desk entirely */}
            {landed && (() => { const p = over(lf, B.land + 2, 9, Easing.out(Easing.quad));
              const x = 592 + p * 34, y = 552 + p * 174;
              return (<g transform={`translate(${x},${y}) rotate(${96 * p})`}>
                <ellipse cx={13} cy={30} rx={20} ry={5} fill="#000" opacity={0.35 * p} />
                <rect width={MUG} height={MUG} rx={2} fill="#EDE6D6" />
                <rect width={MUG} height={4} rx={2} fill="#FBF6EA" />
              </g>); })()}
            {/* the overflowing bin, in front of the desk's right leg */}
            <g transform="translate(902,630)">
              <path d="M4 8 l58 0 l-8 66 l-42 0 z" fill="#26313F" />
              <path d="M4 8 l58 0 l-1 8 l-56 0 z" fill="#37455A" />
              {[0, 1, 2, 3].map((i) => { const sd = seed(i * 5.1);
                return <rect key={i} x={6 + i * 13} y={-8 - sd * 12} width={20} height={17} fill="#E1D9C8"
                             transform={`rotate(${(sd - 0.5) * 70} ${16 + i * 13} ${0 - sd * 12})`} />; })}
            </g>
          </g>

          {/* loose sheets always drifting down through the room */}
          <g opacity={0.42}>
            {Array.from({ length: 3 }, (_, i) => { const sd = seed(i * 17.3);
              const yy = 380 + ((lf * (0.9 + sd * 0.7) + sd * 300) % 330);
              const xx = 210 + sd * 620 + Math.sin((lf + i * 40) / 22) * 26;
              return <rect key={i} x={xx} y={yy} width={22} height={17} fill="#E4DCCB"
                           transform={`rotate(${Math.sin((lf + i * 30) / 15) * 40} ${xx + 11} ${yy + 8})`} />; })}
          </g>

          {/* ═══ THE IMPACT — dust ring, chips, plaster sifting off the wall for a good while after */}
          {ringOn && (<>
            <ellipse cx={HX} cy={FLOOR_Y} rx={44 + ring * 300} ry={12 + ring * 54} fill="none"
                     stroke="#E4D6BC" strokeWidth={Math.max(2, 15 - ring * 13)} opacity={(1 - ring) * 0.55} />
            <ellipse cx={HX} cy={FLOOR_Y} rx={20 + ring * 170} ry={6 + ring * 30} fill="none"
                     stroke="#FFF3D8" strokeWidth={Math.max(1, 8 - ring * 7)} opacity={(1 - ring) * 0.4} />
          </>)}
          {landed && lf < B.land + 26 && Array.from({ length: 11 }, (_, i) => { const sd = seed(i * 31.7);
            const p = over(lf, B.land, 22, Easing.out(Easing.quad));
            const x = HX + (sd - 0.5) * 460 * p, y = FLOOR_Y - Math.sin(p * Math.PI) * (70 + sd * 90) + p * 24;
            return <rect key={`c${i}`} x={x} y={y} width={7 + sd * 7} height={5 + sd * 5} fill="#7C6A52"
                         transform={`rotate(${p * 400 * (sd - 0.5)} ${x} ${y})`} opacity={(1 - p) * 0.85} />; })}
          {landed && lf < B.land + 70 && (<g opacity={0.3}>
            {Array.from({ length: 9 }, (_, i) => { const sd = seed(i * 41.3);
              const t = ((lf - B.land) * (1.4 + sd * 1.6) + sd * 60) % 130;
              return <rect key={`p${i}`} x={120 + sd * 760} y={230 + t * 3.1} width={2.4} height={7} fill="#DCCFB4"
                           opacity={Math.max(0, 1 - t / 120)} />; })}
          </g>)}
          {stampPulse > 0 && <rect x={0} y={0} width={1012} height={792} fill="#B23A2C" opacity={stampPulse * 0.14} />}

          {/* ═══ P1 near foreground — a black stack of reams cropping bottom-left, a slung cable,
                 a banker's box corner bottom-right. Nothing here ever moves. */}
          <path d="M0 792 L0 596 L44 590 L50 634 L110 628 L116 672 L182 666 L190 714 L246 708 L252 792 Z" fill="#0A050C" />
          <path d="M50 634 L110 628 M116 672 L182 666 M190 714 L246 708" stroke="#16101A" strokeWidth={3} fill="none" />
          <path d="M-20 96 Q300 172 1032 68" stroke="#0A050C" strokeWidth={9} fill="none" opacity={0.95} />
          <path d="M902 792 L902 706 L1012 692 L1012 792 Z" fill="#0A050C" />
          <path d="M902 726 L1012 712" stroke="#17101A" strokeWidth={4} fill="none" />
          <Vignette cx={0.34} cy={0.56} a={0.66} />
        </svg>

        {/* P2 HERO — on the chair seat at frame 0, on the FLOOR from f20 on. flip so the pinning hand
            reaches the board. 312px: the reference every prop above is sized from. */}
        <div style={{ position: "absolute", left: 0, top: 0, width: 1012, height: 792,
                      transform: `scaleY(${squashY})`, transformOrigin: `${HX}px ${FLOOR_Y}px` }}>
          <Actor lf={lf} x={HX} groundY={groundY} size={HERO} gaze={gaze} rant={rant} coat={1} flip={1}
                 pin={lf < B.num ? 1 : 0} shock={shock} nodAmp={broke ? 2.2 : 3.4} nodSpeed={broke ? 13 : 8} z={9} />
        </div>
      </div>

      {cutFlash > 0 && <div style={{ position: "absolute", inset: 0, background: "#EAF2FF", opacity: cutFlash * 0.30, zIndex: 66, pointerEvents: "none" }} />}
      {flash > 0 && <div style={{ position: "absolute", inset: 0, background: "#FFE9B8", opacity: flash * 0.20, zIndex: 65, pointerEvents: "none" }} />}
      {(() => { const cf = Math.max(0, 1 - Math.abs(lf - B.card - 3) / 8);
        return cf > 0 ? <div style={{ position: "absolute", inset: 0, background: "#FFDFA0", opacity: cf * 0.24, zIndex: 65, pointerEvents: "none" }} /> : null; })()}
    </>
  );
};
