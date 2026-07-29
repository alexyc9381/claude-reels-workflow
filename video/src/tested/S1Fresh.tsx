import React from "react";
import { Actor, Room, H, M, CLAY, mono, inter, seed } from "./chassis";

/* ══════════════════════════════════════════════════════════════════════════════
   REEL 77 · S1 "THE BLIND BOOTH"   (7.900–15.060 · 215f @30)

   PLACE ...... a competition JUDGING BOOTH — a working machine room that happens
                to be clinical. FLOOR: grey ceramic tile with a sunk floor DRAIN,
                scuff arcs, a discarded crumpled sheet and a spreading wet stain.
                BACK WALL: acoustic panels over a steel rail and a DARK steel
                wainscot carrying a ROTA/TALLY BOARD, the HANDLESS CLOCK and a
                SECOND pass-through BOLTED AND CHAINED SHUT. CEILING: a services
                run — duct, conduit, hanger flanges, a sprinkler head, a swinging
                pull-chain. Camera-right the wainscot opens into a dark inspection
                ALCOVE holding a backlit viewbox, a parts shelf, an extract fan and
                a cycling indicator panel. A chrome service counter runs the width;
                sunk into its top is the booth's INTAKE CONVEYOR feeding a
                never-ending queue of marked-up sheets in from frame-left; its front
                face carries the intake gauge, the sheet counter, an E-stop and a
                fire point. A steel PASS-THROUGH HATCH stands on the counter.
   LIGHT ...... ONE motivated source: a recessed ceiling fluorescent trough, high
                CAMERA-LEFT (x 70..370), and its ballast is DYING — the whole room
                breathes with it and restrikes hard at f106, after which ONE tube
                segment never comes back. Every cast shadow is offset DOWN and RIGHT
                from it. Practicals only: the hatch intake lamp (f30), the wall
                viewbox (f156), and the alcove indicator.
   CAMERA ..... LOCKED WIDE, dead-on. Zero pushes/pans/zooms/drift. One framing.
   DEPTH ...... 6 planes: (1) NEAR — black counter lip + a wire REJECT BIN of
                crumpled sheets cropping frame-bottom-left · (2) the two Claudes on
                the tile, the drain, the drip · (3) chrome counter + running belt +
                control cluster + bell · (4) the hatch · (5) acoustic wall, rota
                board, handless clock, sealed hatch, dark alcove · (6) ceiling
                services, viewbox, alcove shelf/fan/indicator + drifting motes
                threaded through all of it.

   ⛔ MOTION LAW.
        TEXTURE  the belt NEVER stops, the room's light NEVER stops breathing, and
                 UNDER both runs a bed of AMBIENT LIFE — 9 motes, a condensation
                 drip, an extract fan, a cycling indicator, a twitching gauge, two
                 swinging cables, a fluttering notice. All of it is small, dim and
                 low-contrast: none of it may out-read the beat.
        BEATS    5 sequential events, each a LARGE mover, each with SECONDARY
                 consequence and each LEAVING A MARK (see the persistence list).

   ⛔ PERSISTENCE (the room is materially different at f215 than at f0):
        shutter stays up · intake lamp stays on · soot halo burned round the slot ·
        hatch status lamp flips clay->white · one ceiling tube segment dead ·
        the pinned notice swings loose and hangs by one corner · the mug tips and
        leaves a spill ring · the tray stack is knocked askew · the sheet counter
        increments · two paper offcuts settle on the counter · the viewbox stays
        lit · a new clay tally stroke on the rota board · the wet stain has grown.

   ⛔ VALUE LADDER. Darkest -> lightest, and NOTHING is allowed above the paper:
        #05080A  reject bin / near lip                <- NEAREST + DARKEST
        #080C0F  slot interior / hatch mouth          <- and the paper sits on it
        #12181C  rubber flaps, alcove, sealed hatch
        #232B31  wainscot bottom, counter FRONT face, belt bed, alcove props
        #4E585F  floor near camera, chrome shade
        #8B97A0  acoustic wall, floor at the seam     <- MID (the walls live here)
        #B2BEC6  belt slats, queue sheets, notice     <- deliberately BELOW the hero
        #CBD5DC  counter TOP slab, chrome highlights
        #FFFFFF  THE SHEET                            <- BRIGHTEST OBJECT IN FRAME
   ══════════════════════════════════════════════════════════════════════════════ */

/* ── local easing (chassis' over() carries its own ease; these keep beats crisp) ── */
const cl01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const seg = (f: number, a: number, b: number) => cl01((f - a) / Math.max(1, b - a));
const ease = (t: number) => 1 - Math.pow(1 - t, 3);
const easeIO = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const tri = (f: number, c: number, w: number) => Math.max(0, 1 - Math.abs(f - c) / w);
const per = (f: number, p: number) => ((f % p) + p) % p;

/* ── palette: bleached clinical steel, but built on the ladder above ── */
const WALL_T = "#A6B2BA", WALL_B = "#8B97A0";
const PANEL_A = "#96A3AC", PANEL_B = "#A1AEB7", PANEL_E = "#78858E", PANEL_HI = "#B4C0C8";
const RAIL = "#6C7880", RAIL_HI = "#A6B2BA", RAIL_SH = "#414C54";
const DADO_T = "#2F383F", DADO_B = "#222A30", DADO_SEAM = "#171D22";
const FLOOR_A = "#8B97A0", FLOOR_B = "#4E585F";
const ALCOVE = "#12181C", ALCOVE_F = "#232B31";
const CH_HI = "#DCE5EB", CH = "#A6B1B9", CH_MID = "#7C8891", CH_SH = "#48525A", CH_DK = "#232B31";
const TOP_HI = "#CBD5DC", TOP_LO = "#96A2AA";
const FACE_T = "#3A444B", FACE_B = "#232B31";
const SLOT_IN = "#080C0F", MOUTH = "#12181C", CORRIDOR = "#39434A";
const FG = "#0A0E11", FG_HI = "#1B2329";
const PAPER = "#FFFFFF", PAPER_E = "#E1E9EE", PAPER_ST = "#8E99A1";
const BAR = "#8E99A1", BAR_D = "#5F6A72";
const BOX_OFF = "#1B2328";
const RUST = "#5A4A3E", AMB_D = "#8A7340", CLAY_D = "#A2604A", FIRE = "#6E3226";
/* the belt */
const BELT_BED = "#232B31", BELT_SLAT = "#B2BEC6", BELT_SLAT_SH = "#68747C", BELT_RAIL = "#5B666E";
const QUEUE = "#D2DAE1", QUEUE_HI = "#E4EBEF", QUEUE_SH = "#9CA8B0";

/* ── THE HERO PROP. Contents are REDACTED BARS only (gate-the-how). ──
   0.78 m × 1.00 m -> 147 × 189 px: 57% of the 330px sprite, i.e. a poster-sized
   review sheet, NOT a note. It is pure white on a near-black slot, so it is the
   single brightest object in the frame at every moment of the scene. */
const SHEET_W = M(0.78), SHEET_H = M(1.0);
const Sheet: React.FC<{ x: number; y: number; rot: number; marks: number; ring: number; lit: number; hot: number }> =
({ x, y, rot, marks, ring, lit, hot }) => {
  const w = SHEET_W, h = SHEET_H;
  const bars: [number, number][] = [[46, 112], [74, 98], [102, 110], [130, 90], [158, 104]];
  const RC = 320;  /* approx circumference of the ring ellipse, for the draw-on */
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot} ${w / 2} ${h / 2})`}>
      {/* cast shadow, down-right from the ceiling trough */}
      <rect x={9} y={11} width={w} height={h} fill="#05080A" opacity={0.36} />
      {/* the brightest value in frame — no tint, no gradient, nothing above it */}
      <rect x={0} y={0} width={w} height={h} fill={PAPER} stroke={PAPER_ST} strokeWidth={3} />
      <rect x={w - 8} y={0} width={8} height={h} fill={PAPER_E} />
      <rect x={0} y={h - 8} width={w} height={8} fill={PAPER_E} />
      {/* header block + redacted body bars — backlighting drives them dark, never legible */}
      <rect x={18} y={18} width={66} height={12} fill={lit > 0.5 ? "#2C343A" : BAR_D} />
      {bars.map(([by, bw], i) => (
        <rect key={i} x={18} y={by} width={bw} height={12}
              fill={i === 3 && hot > 0.5 ? CLAY : lit > 0.5 ? "#39424A" : BAR} />
      ))}
      <rect x={18} y={176} width={52} height={7} fill={lit > 0.5 ? "#2C343A" : BAR_D} />

      {/* HIS OWN NOTES — hand annotation, present only until the wipe. Deliberately
          NOTHING lands on the bar at y130: that is the one he walked past. */}
      {marks > 0.02 && (
        <g stroke={CLAY} fill="none" strokeLinecap="round" opacity={marks}>
          <path d="M18 40 q11 -8 22 0 t22 0 t22 0 t22 0" strokeWidth={3.5} />
          <ellipse cx={62} cy={80} rx={54} ry={15} strokeWidth={3} />
          <path d="M44 110 l10 -13 l10 13" strokeWidth={3.5} />
          <path d="M110 24 l14 14 M124 24 l-14 14" strokeWidth={3.5} />
          <path d="M134 74 l-16 9 l16 9" strokeWidth={3.5} />
          <path d="M20 96 q11 -9 22 0 t22 0 t20 0" strokeWidth={3} />
          <path d="M16 176 l104 -5" strokeWidth={3.5} />
        </g>
      )}

      {/* THE MISS — ONE clay ring on the one line the tester walked past. Nothing else
          lands on the sheet: a second mark would stop this reading as "he found it". */}
      {ring > 0.01 && (
        <ellipse cx={68} cy={136} rx={68} ry={26} fill="none" stroke={CLAY} strokeWidth={9}
                 strokeLinecap="round" strokeDasharray={`${RC * ring} ${RC}`} transform="rotate(-3 68 136)" />
      )}
    </g>
  );
};

export const S1Fresh: React.FC<{ lf: number }> = ({ lf }) => {
  /* ── set geometry · EVERY prop sized through M(metres) off the 330px hero ── */
  const FLOORY = 452;                        // wall / floor seam
  const G = 640;                             // the tile both heroes stand on — raised
                                             // 60px so neither sprite touches the near lip
  const CT_B = FLOORY, CT_F = CT_B + M(0.38);// counter top slab in perspective (452 -> 524)
  const CT_FH = M(0.30);                     // its front face (524 -> 581), a SHADED vertical
  const TX0 = 344, TX1 = TX0 + M(1.62);      // pass-through hatch: 1.62 m × 1.56 m, standing
  const TY1 = 458, TY0 = TY1 - M(1.56);      // on the belt rail -> its slot sits ABOVE the
  const SLX0 = TX0 + 26, SLX1 = TX1 - 26;    // eye line, so the hero sheet never crosses a
  const SLY0 = TY0 + 34, SLY1 = TY1 - 50;    // face (370..624 × 198..408)
  const ALX0 = 666;                          // the dark inspection alcove starts here
  const VBX0 = 684, VBX1 = VBX0 + M(1.30);   // wall viewbox: 1.30 m × 1.42 m
  const VBY0 = 64, VBY1 = VBY0 + M(1.42);
  const CLK_R = M(0.57) / 2;                 // the handless wall clock, 0.57 m across
  const BELL_R = M(0.28) / 2;                // counter bell, 0.28 m across
  const BX0 = 0, BX1 = 636;                  // THE BELT: sunk into the counter top, 3.4 m of
  const BY0 = 458, BY1 = 520;                // it, running frame-left out of shot
  const SLAT = 58;                           // slat pitch — never let speed near 19.3 px/f
  const CLK_X = 132, CLK_Y = 318;            // clock moved DOWN onto the dark wainscot so the
                                             // white title card (y36..150) never eats it
  const SH2X = 206, SH2Y = 268;              // the SECOND pass-through — bolted + chained shut
  const RBX = 10, RBY = 118, RBW = 176, RBH = 88;   // the rota / tally board
  const DRN_X = 326;                         // floor drain + where the condensation lands

  /* ══ CONTINUOUS MOVER 1 — THE INTAKE BELT ══════════════════════════════════
     Never stops for one frame of the scene. Speed climbs 8 -> ~13 px/f and takes
     three surges (the intake accepting work) so the last second runs hardest. */
  const beltSpeed = (i: number) =>
    8 + 2.6 * (i / 215)
    + 3.4 * tri(i, 26, 20)
    + 2.8 * tri(i, 132, 16)
    + 2.6 * cl01((i - 184) / 18);
  let beltPos = 0;
  for (let i = 0; i < lf; i++) beltPos += beltSpeed(i);

  /* ══ CONTINUOUS MOVER 2 — THE DYING OVERHEAD ═══════════════════════════════
     The trough's ballast breathes the WHOLE room (a large lit area modulating,
     not a jitter): amplitude escalates 0.060 -> 0.105 across the scene, with a
     small ripple riding on it. At lf 0 the room is at FULL brightness so frame 0
     is the clean, complete read. f106–134 it restrikes: five hard stutters, and
     the far tube segment never comes back. */
  const esc = cl01(lf / 215);
  const dipSlow = (1 - Math.cos(lf * (Math.PI / 8))) / 2;      // 16f period
  const dipFast = (1 - Math.cos(lf * (Math.PI * 2 / 9))) / 2;  // 9f period
  const baseDim = dipSlow * (0.060 + 0.045 * esc) + dipFast * (0.012 + 0.016 * esc);
  const strikeOn = lf >= 106 && lf < 134 && Math.floor((lf - 106) / 6) % 2 === 0;
  const dim = Math.min(0.34, strikeOn ? 0.20 + baseDim : baseDim);
  const lit = 1 - dim * 2.4;                                    // what the tube/cone read

  /* ── 5 SEQUENTIAL EVENTS, one LARGE mover each, each still progressing when the
        next starts, each with a SECONDARY consequence ─────────────────────────
     E1  f  8– 40  OPEN    the hatch's chrome intake shutter (306 × 244) rolls UP
                           off the slot and the intake lamp floods a 700px wedge.
                           …and the counter's control cluster wakes: gauge kicks.
     E1b f 24– 66  HEAVE   the tester lifts his marked-up sheet 340px. Overlaps E1.
     E2  f 66– 96  WIPE    it feeds into the slot; the whole 254×210 throat BLAZES,
                           then a 6-frame flash + a 16-frame afterglow. Every hand
                           note is gone. …and a soot halo burns in round the slot,
                           the hatch status lamp flips clay -> white, for good.
     E3  f 96–134  RESTRIKE  a shock ring rolls out of the hatch, the booth stutters
                           five times whole-frame, GRIT rains from the ceiling, the
                           mug tips, the trays knock askew, the pinned notice tears
                           loose and hangs by one corner, one tube segment dies.
     E4  f134–178  EJECT   the sheet SHOOTS a third of the frame out the far mouth
                           and mounts the viewbox; the box ignites and throws a
                           room-high wedge. …two offcuts scatter onto the counter
                           and the sheet counter clicks over.
     E5  f178–215  RING    a clay ring draws on the one bar he missed, the bell
                           rings out two 420px shockwaves, the room washes clay
                           twice, a fresh clay tally stroke lands on the rota board
                           and the alcove indicator locks steady. */
  const shutter = ease(seg(lf, 8, 34));
  const intake = ease(seg(lf, 26, 46)) * (1 - 0.55 * seg(lf, 96, 116));
  const post = ease(seg(lf, 24, 66));
  const feed = easeIO(seg(lf, 70, 92));
  const eject = easeIO(seg(lf, 134, 152));
  const mount = ease(seg(lf, 152, 178));
  const ignite = ease(seg(lf, 156, 176));
  const ring = seg(lf, 182, 206);
  const surge = tri(lf, 200, 15);
  const FLASH_CURVE = [0.98, 0.94, 0.76, 0.52, 0.30, 0.14];
  const flash = lf >= 90 && lf < 96 ? FLASH_CURVE[lf - 90] || 0 : 0;
  const after = Math.max(0, 1 - seg(lf, 96, 118)) * (lf >= 96 ? 1 : 0) * 0.34;
  const pulse = seg(lf, 74, 90) * (1 - seg(lf, 96, 108));   // the slot blazes around the wipe
  const bell = seg(lf, 186, 210);
  const clayWash = 0.26 * Math.max(tri(lf, 198, 9), tri(lf, 209, 7) * 0.85);
  const shockR = seg(lf, 92, 118);

  /* ══ PERSISTENT MARKS — each one is the residue of a beat and never resets ══ */
  const soot = seg(lf, 92, 108);                    // E2 burns a halo round the slot
  const lampFlip = lf >= 93 ? 1 : 0;                // E2 flips the hatch status lamp
  const deadTube = seg(lf, 122, 132);               // E3 kills the far tube segment
  const mugTip = ease(seg(lf, 116, 128));           // E3 tips the mug…
  const spill = cl01(seg(lf, 126, 170));            // …and the spill ring stays
  const trayKnock = ease(seg(lf, 116, 128)) * 6;    // E3 knocks the tray stack askew
  const noticeDrop = ease(seg(lf, 118, 132));       // E3 tears the notice loose
  const wob = lf > 132 ? Math.exp(-(lf - 132) / 24) * 6.5 * Math.sin((lf - 132) / 3.4) : 0;
  const noticeRot = (1 - noticeDrop) * Math.sin(lf / 9) * 2.4 + noticeDrop * (46 + wob);
  const counted = lf >= 150 ? 1 : 0;                // E4 clicks the sheet counter over
  const tally = seg(lf, 196, 208);                  // E5 adds a clay tally stroke
  const stain = 6 + 12 * cl01(lf / 190);            // the drip's puddle, always growing

  /* ══ AMBIENT LIFE — all of it dim, small and BELOW the beat in contrast ══ */
  const swayA = Math.sin(lf / 21) * 3.4;                       // hanging cable
  const swayB = Math.sin(lf / 17 + 1.2) * 2.6;                 // pull chain
  const fanRot = lf * 2.6;                                     // alcove extract fan
  const ledI = lf >= 180 ? 3 : Math.floor(lf / 11) % 4;        // indicator cycling, then locked
  const gauge = -40 + Math.sin(lf / 7) * 3.5                   // intake gauge needle
    + 30 * tri(lf, 94, 12) + 16 * tri(lf, 150, 10) + 20 * tri(lf, 200, 12);
  const dt = per(lf, 54);                                      // condensation drip cycle
  const bead = dt < 38 ? 1.4 + (dt / 38) * 3.2 : 0;
  const fallT = dt >= 38 && dt < 48 ? (dt - 38) / 10 : -1;
  const splashT = dt >= 48 ? (dt - 48) / 6 : -1;

  /* nine motes drifting DOWN the light cone — 2-4px, never above 0.42 opacity */
  const motes: React.ReactElement[] = [];
  for (let i = 0; i < 9; i++) {
    const a = seed(i * 3 + 1), b = seed(i * 7 + 5), c = seed(i * 11 + 2);
    const y = 46 + per(lf * (0.26 + c * 0.42) + a * 720, 720);
    const x = 108 + b * 520 + Math.sin(lf / 30 + i) * 11 + (y - 46) * 0.16;
    motes.push(<circle key={`mt${i}`} cx={x} cy={y} r={1.6 + a * 1.6} fill="#E6EEF4"
                       opacity={(0.18 + c * 0.22) * cl01(0.4 + lit)} />);
  }

  /* E3's grit shower — ceiling dirt shaken loose by the restrike, gone by f150 */
  const grit: React.ReactElement[] = [];
  for (let i = 0; i < 8; i++) {
    const s = seed(i * 5 + 3);
    const t = cl01((lf - (106 + i * 4)) / (22 + s * 12));
    if (t > 0 && t < 1) {
      grit.push(<rect key={`gr${i}`} x={92 + s * 262} y={36 + (450 - 36) * t * t} width={2.5}
                      height={5 + s * 3} fill="#6C7880" opacity={0.55 * (1 - t * 0.35)} />);
    }
  }

  /* E4's offcuts — two paper chips shed as the sheet clears the mouth. They land
     on the counter in the gap left of the fresh Claude and STAY there. */
  const chips: React.ReactElement[] = [];
  for (let i = 0; i < 3; i++) {
    const s = seed(i * 9 + 2);
    const t = cl01((lf - (146 + i * 5)) / 24);
    if (t > 0) {
      const cx = 706 - (52 + s * 34) * t, cy = 214 + (286 + s * 16) * t * t;
      chips.push(<rect key={`cp${i}`} x={cx} y={cy} width={11 + s * 5} height={7} fill="#B2BEC6"
                       transform={`rotate(${s * 90 + t * 210} ${cx} ${cy})`} opacity={0.9} />);
    }
  }

  /* ── the sheet's single continuous path through the scene ── */
  let sx: number, sy: number, srot: number;
  if (lf < 70) {              /* E1b: heaved 340px, from below the counter line to the mouth */
    sx = 128 + (276 - 128) * post;
    sy = 548 + (208 - 548) * post - Math.sin(post * Math.PI) * 40;
    srot = -9 * (1 - post);
  } else if (lf < 134) {      /* E2 + hold: fed to dead centre of the lit slot, and parked */
    sx = 276 + (423 - 276) * feed; sy = 208; srot = 0;
  } else if (lf < 152) {      /* E4a: driven a third of the frame out of the far mouth */
    sx = 423 + (712 - 423) * eject; sy = 208 - 26 * seg(lf, 142, 152); srot = 5 * eject;
  } else {                    /* E4b: lifted onto the viewbox */
    sx = 712 + (733 - 712) * mount; sy = 182 + (103 - 182) * mount; srot = 5 * (1 - mount);
  }
  const marks = lf < 91 ? 1 : 0;   /* every hand-note dies inside the flash */

  /* ── heroes ── */
  const testerX = 190 + 46 * post;
  const freshX = 838 - 30 * ease(seg(lf, 134, 168));
  const tPin = seg(lf, 30, 48) * (1 - seg(lf, 66, 80));
  const fPoint = seg(lf, 110, 128) * (1 - seg(lf, 152, 162));
  const fPin = seg(lf, 158, 176);
  /* blank white eyes have to ride the sprite's own bob, so replicate it exactly */
  const F_SIZE = H, fs = F_SIZE / 200, F_NOD = 2.0;
  const fLeft = freshX - F_SIZE / 2, fTop = G - F_SIZE * 0.92;
  const hopP = Math.max(0, Math.sin(lf / 6));
  const fHop = hopP * F_NOD * 2.2, fSquash = 1 - hopP * 0.045;

  const acoustic: React.ReactElement[] = [];
  for (let c = 0; c < 8; c++) for (let r = 0; r < 3; r++) {
    const px = -22 + c * 96, py = 24 + r * 64;
    acoustic.push(<rect key={`ap${c}-${r}`} x={px} y={py} width={92} height={58}
      fill={(c + r) % 2 ? PANEL_A : PANEL_B} stroke={PANEL_E} strokeWidth={2} />);
    acoustic.push(<rect key={`ah${c}-${r}`} x={px + 8} y={py + 5} width={76} height={3} fill={PANEL_HI} />);
  }

  /* the belt's slats — one coherent machine surface travelling frame-left */
  const slatOff = ((beltPos % SLAT) + SLAT) % SLAT;
  const slats: React.ReactElement[] = [];
  for (let i = 0; i * SLAT < BX1 + SLAT * 2; i++) {
    const x = BX1 + SLAT - i * SLAT - slatOff;
    slats.push(
      <g key={`sl${i}`}>
        <polygon points={`${x},${BY0} ${x + 32},${BY0} ${x + 22},${BY1} ${x - 10},${BY1}`} fill={BELT_SLAT} />
        <polygon points={`${x + 32},${BY0} ${x + 38},${BY0} ${x + 28},${BY1} ${x + 22},${BY1}`} fill={BELT_SLAT_SH} />
      </g>);
  }
  /* …and the QUEUE: four more of his own marked-up sheets riding in, endlessly */
  const QP = 214, QSPAN = BX1 + 320;
  const queue: React.ReactElement[] = [];
  for (let k = 0; k < 5; k++) {
    const raw = (((beltPos + k * QP) % QSPAN) + QSPAN) % QSPAN;
    const x = BX1 + 150 - raw;
    queue.push(
      <g key={`q${k}`}>
        <polygon points={`${x},${BY0 + 4} ${x + 132},${BY0 + 4} ${x + 118},${BY1 - 3} ${x - 14},${BY1 - 3}`} fill={QUEUE} />
        <polygon points={`${x},${BY0 + 4} ${x + 132},${BY0 + 4} ${x + 130},${BY0 + 12} ${x - 2},${BY0 + 12}`} fill={QUEUE_HI} />
        <polygon points={`${x - 14},${BY1 - 3} ${x + 118},${BY1 - 3} ${x + 117},${BY1} ${x - 15},${BY1} `} fill={QUEUE_SH} />
        <g stroke={CLAY} strokeWidth={3} fill="none" strokeLinecap="round" opacity={0.9}>
          <path d={`M${x + 14} ${BY0 + 24} q10 -6 20 0 t20 0`} />
          <path d={`M${x + 74} ${BY0 + 20} l12 12 M${x + 86} ${BY0 + 20} l-12 12`} />
          <path d={`M${x + 8} ${BY0 + 44} l64 -2`} />
        </g>
      </g>);
  }

  return (
    <>
      {/* ══════ THE SET ══════ */}
      <svg viewBox="0 0 1012 792" width={1012} height={792} style={{ position: "absolute", left: 0, top: 0 }}>
        <defs>
          <linearGradient id="s1fCounterTop" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={TOP_LO} /><stop offset="1" stopColor={TOP_HI} />
          </linearGradient>
          <linearGradient id="s1fCounterFace" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={FACE_T} /><stop offset="1" stopColor={FACE_B} />
          </linearGradient>
          <linearGradient id="s1fHatch" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#93A0A8" /><stop offset="0.6" stopColor="#76828B" /><stop offset="1" stopColor="#5B666E" />
          </linearGradient>
          <linearGradient id="s1fShut" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#C2CDD4" /><stop offset="1" stopColor="#8E9AA3" />
          </linearGradient>
          <linearGradient id="s1fDado" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={DADO_T} /><stop offset="1" stopColor={DADO_B} />
          </linearGradient>
          <radialGradient id="s1fBoxGlow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.5" /><stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="s1fSoot" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0.62" stopColor="#05080A" stopOpacity="0" /><stop offset="1" stopColor="#05080A" stopOpacity="0.85" />
          </radialGradient>
          <radialGradient id="s1fVig" cx="0.5" cy="0.44" r="0.76">
            <stop offset="0.46" stopColor="#05080A" stopOpacity="0" /><stop offset="1" stopColor="#05080A" stopOpacity="0.55" />
          </radialGradient>
          <linearGradient id="s1fCone" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#EAF3F9" stopOpacity="0.16" /><stop offset="1" stopColor="#EAF3F9" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="s1fIntake" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#E8F2F8" stopOpacity="0.62" /><stop offset="1" stopColor="#E8F2F8" stopOpacity="0" />
          </linearGradient>
          <clipPath id="s1fBeltClip"><rect x={BX0 - 200} y={BY0 - 12} width={BX1 - BX0 + 200} height={BY1 - BY0 + 12} /></clipPath>
        </defs>

        {/* PLANE 5/6 — room shell: acoustic wall over tile floor */}
        <Room wall1={WALL_T} wall2={WALL_B} floor1={FLOOR_A} floor2={FLOOR_B} floorY={FLOORY} lf={lf} />

        {/* the tile floor's cross-grout — darkening toward camera with the floor */}
        {[608, 648, 696, 740].map((y) => (
          <line key={`tg${y}`} x1={0} y1={y} x2={1012} y2={y} stroke="#39434A" strokeWidth={2} opacity={0.5} />
        ))}

        {/* ── FLOOR DETAIL: a sunk DRAIN, scuff arcs, a discarded crumpled sheet and
              the wet stain the condensation drip has been growing all scene ── */}
        <ellipse cx={DRN_X + 4} cy={706} rx={stain + 14} ry={stain * 0.42 + 5} fill="#3A444B" opacity={0.5} />
        <ellipse cx={DRN_X} cy={704} rx={stain} ry={stain * 0.36} fill="#2B343A" opacity={0.75} />
        <rect x={DRN_X - 42} y={686} width={84} height={40} rx={4} fill="#1B2329" stroke="#39434A" strokeWidth={3} />
        {[0, 1, 2, 3].map((i) => (
          <rect key={`dg${i}`} x={DRN_X - 34} y={692 + i * 9} width={68} height={5} fill="#0A0E11" />
        ))}
        <path d="M404 676 q76 -18 154 -2" fill="none" stroke="#39434A" strokeWidth={3} opacity={0.55} />
        <path d="M418 692 q66 -14 132 -1" fill="none" stroke="#39434A" strokeWidth={2} opacity={0.4} />
        <path d="M596 716 l16 -14 l20 4 l12 16 l-18 10 l-22 -4 z" fill="#7C8891" />
        <path d="M596 716 l16 -14 l20 4 l-14 12 z" fill="#9CA8B0" />
        <path d="M612 702 l6 14 M632 706 l-14 10" stroke="#5B666E" strokeWidth={2} fill="none" />
        {/* a coiled hose flaked on the tile, right of the drain */}
        <path d="M672 664 q46 -16 76 6 q22 18 -6 30 q-34 12 -58 -6" fill="none" stroke="#1B2329" strokeWidth={11} strokeLinecap="round" />
        <path d="M672 664 q46 -16 76 6" fill="none" stroke="#39434A" strokeWidth={3} strokeLinecap="round" />

        {/* acoustic panel field (stops at the alcove) */}
        {acoustic}

        {/* ── CEILING SERVICES (plane 6). Everything here is clear of the title band:
              it lives above y36, or right of x816. ── */}
        <rect x={392} y={0} width={620} height={24} fill="#4E585F" />
        <rect x={392} y={0} width={620} height={5} fill="#7C8891" />
        <rect x={392} y={21} width={620} height={4} fill="#2F383F" />
        {[452, 546, 640, 734, 828, 922].map((x) => (
          <rect key={`dr${x}`} x={x} y={2} width={7} height={20} fill="#3B454C" />
        ))}
        {/* conduit + junction box, frame-left, dropping down the wall */}
        <rect x={0} y={6} width={72} height={13} fill="#5B666E" />
        <rect x={18} y={2} width={38} height={26} fill="#6C7880" stroke="#2F383F" strokeWidth={2} />
        <rect x={30} y={19} width={11} height={192} fill="#6C7880" />
        <rect x={30} y={19} width={4} height={192} fill="#8B97A0" />
        {[68, 128, 188].map((y) => <rect key={`cc${y}`} x={26} y={y} width={19} height={7} fill="#48525A" />)}
        {/* sprinkler head, camera-right of the card */}
        <rect x={898} y={24} width={9} height={18} fill="#7C8891" />
        <circle cx={902} cy={46} r={7} fill="#A6B1B9" stroke="#48525A" strokeWidth={2} />
        <rect x={890} y={50} width={25} height={4} fill="#48525A" />
        {/* a pull-chain swinging off the duct, far right — slow, dim ambient */}
        <path d={`M998 24 q${2 + swayB} 34 ${swayB} 70 q${-1 + swayB * 0.6} 22 ${swayB * 1.4} 34`}
              fill="none" stroke="#6C7880" strokeWidth={3} />
        <rect x={996 + swayB * 1.4} y={126} width={9} height={16} rx={3} fill="#8B97A0" />

        {/* PLANE 5 — the ROTA / TALLY BOARD, frame-left, below the HUD and clear of
            the card. Rows are REDACTED bars; the tally is what the booth remembers. */}
        <rect x={RBX + 5} y={RBY + 6} width={RBW} height={RBH} fill="#05080A" opacity={0.35} />
        <rect x={RBX} y={RBY} width={RBW} height={RBH} fill="#6E7A83" stroke="#414C54" strokeWidth={3} />
        <rect x={RBX + 8} y={RBY + 6} width={RBW - 16} height={10} fill="#46525A" />
        {[0, 1, 2, 3].map((i) => (
          <g key={`rr${i}`}>
            <rect x={RBX + 8} y={RBY + 24 + i * 15} width={54 + (i % 2) * 18} height={7} fill={BAR} opacity={0.75} />
            <rect x={RBX + 70 + (i % 2) * 10} y={RBY + 24 + i * 15} width={18} height={7} fill={BAR_D} opacity={0.8} />
          </g>
        ))}
        <rect x={RBX + 100} y={RBY + 22} width={2} height={58} fill="#414C54" />
        {[0, 1, 2].map((g) => (
          <g key={`tl${g}`} stroke={CLAY_D} strokeWidth={3} strokeLinecap="round" opacity={0.85}>
            {[0, 1, 2, 3].map((s) => (
              <line key={s} x1={RBX + 110 + g * 24 + s * 5} y1={RBY + 28 + g * 18}
                    x2={RBX + 108 + g * 24 + s * 5} y2={RBY + 44 + g * 18} />
            ))}
            <line x1={RBX + 106 + g * 24} y1={RBY + 44 + g * 18} x2={RBX + 128 + g * 24} y2={RBY + 28 + g * 18} />
          </g>
        ))}
        {/* E5's persistent mark — the fresh one's catch goes on the board and stays */}
        {tally > 0.01 && (
          <line x1={RBX + 136} y1={RBY + 64} x2={RBX + 134} y2={RBY + 64 + 16 * tally}
                stroke={CLAY} strokeWidth={4} strokeLinecap="round" />
        )}
        {/* steel rail + DARK wainscot — this is what the clay heroes read against */}
        <rect x={0} y={210} width={1012} height={22} fill={RAIL} />
        <rect x={0} y={210} width={1012} height={4} fill={RAIL_HI} />
        <rect x={0} y={228} width={1012} height={4} fill={RAIL_SH} />
        <rect x={0} y={232} width={1012} height={220} fill="url(#s1fDado)" />
        {[92, 260, 428, 596].map((x) => (
          <rect key={`ds${x}`} x={x} y={232} width={3} height={220} fill={DADO_SEAM} />
        ))}
        {/* AGE: a riveted repair plate, chipped paint along the floor seam, tape */}
        <rect x={470} y={392} width={104} height={54} fill="#39434A" stroke="#1B2329" strokeWidth={2} />
        {[0, 1].map((r) => [0, 1, 2, 3].map((c) => (
          <circle key={`rp${r}-${c}`} cx={482 + c * 27} cy={404 + r * 30} r={3.5} fill="#5B666E" />
        )))}
        <path d="M60 448 l14 -10 l18 6 l16 -8 l22 8 l-6 12 l-40 4 z" fill="#3F4A52" opacity={0.9} />
        <path d="M622 450 l20 -12 l16 8 l-8 10 z" fill="#3F4A52" opacity={0.85} />
        <rect x={124} y={244} width={54} height={13} fill="#8A929A" opacity={0.35} transform="rotate(-3 124 244)" />
        <rect x={0} y={442} width={1012} height={10} fill="#151B20" />

        {/* the rota board's pinned notice: it flutters all scene, then E3 tears one
            pin out and it swings down over the rail and hangs there for good. Drawn
            after the wainscot so the hang actually reads. */}
        <g transform={`rotate(${noticeRot} ${RBX + 140} ${RBY + 74})`}>
          <rect x={RBX + 140} y={RBY + 74} width={44} height={54} fill="#B2BEC6" stroke="#7C8891" strokeWidth={2} />
          {[0, 1, 2].map((i) => (
            <rect key={`nb${i}`} x={RBX + 146} y={RBY + 82 + i * 11} width={30 - i * 6} height={5} fill="#68747C" />
          ))}
          <circle cx={RBX + 141} cy={RBY + 75} r={4} fill="#48525A" />
        </g>

        {/* PLANE 5 — the SECOND pass-through: BOLTED AND CHAINED SHUT. It says the
            booth has one way in, and this is not it. */}
        <rect x={SH2X + 7} y={SH2Y + 8} width={124} height={124} fill="#05080A" opacity={0.4} />
        <rect x={SH2X} y={SH2Y} width={124} height={124} fill="#1B2329" stroke="#0E1418" strokeWidth={3} />
        <rect x={SH2X + 10} y={SH2Y + 10} width={104} height={104} fill="#232B31" stroke="#12181C" strokeWidth={2} />
        <rect x={SH2X + 10} y={SH2Y + 10} width={104} height={5} fill="#48525A" />
        {[0, 1].map((r) => [0, 1].map((c) => (
          <circle key={`b2${r}-${c}`} cx={SH2X + 24 + c * 76} cy={SH2Y + 24 + r * 76} r={6} fill="#5B666E" stroke="#0E1418" strokeWidth={2} />
        )))}
        <path d={`M${SH2X - 6} ${SH2Y + 54} q62 22 136 -4`} fill="none" stroke="#48525A" strokeWidth={7} />
        <path d={`M${SH2X - 6} ${SH2Y + 54} q62 22 136 -4`} fill="none" stroke="#6C7880" strokeWidth={2.5} strokeDasharray="7 9" />
        <rect x={SH2X + 52} y={SH2Y + 62} width={22} height={18} rx={3} fill="#7C8891" stroke="#12181C" strokeWidth={2} />
        <path d={`M${SH2X + 58} ${SH2Y + 62} a7 7 0 0 1 12 0`} fill="none" stroke="#A6B1B9" strokeWidth={3} />
        {/* warning decal — dim amber, never competing with the clay accent */}
        <path d={`M${SH2X + 92} ${SH2Y + 90} l16 26 h-32 z`} fill="none" stroke={AMB_D} strokeWidth={3} />
        <rect x={SH2X + 99} y={SH2Y + 99} width={3} height={9} fill={AMB_D} />
        {/* rust streaking out of the bolt heads */}
        {[SH2X + 24, SH2X + 100].map((x) => (
          <rect key={`rs${x}`} x={x - 2} y={SH2Y + 30} width={4} height={40} fill={RUST} opacity={0.45} />
        ))}

        {/* PLANE 5 — the WALL CLOCK WITH NO HANDS (this reviewer has no history).
            Mid-value face on the dark wainscot: legible, but never above the paper. */}
        <circle cx={CLK_X + 5} cy={CLK_Y + 5} r={CLK_R} fill="#05080A" opacity={0.4} />
        <rect x={CLK_X - 7} y={CLK_Y - CLK_R - 12} width={14} height={16} fill="#48525A" />
        <circle cx={CLK_X} cy={CLK_Y} r={CLK_R} fill="#5B666E" />
        <circle cx={CLK_X} cy={CLK_Y} r={CLK_R - 7} fill="#94A0A8" stroke="#39434A" strokeWidth={2} />
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i / 12) * Math.PI * 2 - Math.PI / 2, big = i % 3 === 0;
          const tx = CLK_X + Math.cos(a) * (CLK_R - 15), ty = CLK_Y + Math.sin(a) * (CLK_R - 15);
          return <rect key={`ck${i}`} x={tx - (big ? 3.5 : 2)} y={ty - (big ? 6 : 4)}
            width={big ? 7 : 4} height={big ? 12 : 8} fill="#39434A" transform={`rotate(${(i / 12) * 360} ${tx} ${ty})`} />;
        })}
        <circle cx={CLK_X} cy={CLK_Y} r={5} fill="#39434A" />
        <path d={`M${CLK_X - 30} ${CLK_Y - 26} q26 -12 54 -2`} fill="none" stroke="#B4C0C8" strokeWidth={3} opacity={0.28} />

        {/* PLANE 5 — the DARK INSPECTION ALCOVE camera-right. It gives the fresh
            Claude a near-black backdrop and frames the viewbox. */}
        <rect x={ALX0} y={40} width={1012 - ALX0} height={452 - 40} fill={ALCOVE} />
        <rect x={ALX0 + 14} y={54} width={1012 - ALX0 - 14} height={452 - 54} fill={ALCOVE_F} />
        <rect x={ALX0} y={40} width={10} height={452 - 40} fill={CH_MID} />
        <rect x={ALX0} y={40} width={1012 - ALX0} height={12} fill={CH_MID} />
        <rect x={ALX0} y={40} width={1012 - ALX0} height={4} fill={CH_HI} />
        {/* condensation beading along the alcove's cold chrome edge */}
        {[86, 122, 158, 208, 262, 318, 372].map((y, i) => (
          <circle key={`cd${y}`} cx={ALX0 + 5} cy={y} r={i % 2 ? 2 : 2.8} fill="#C8D2D8" opacity={0.38} />
        ))}

        {/* PLANE 6 — ALCOVE FITTINGS: a swinging feed cable, an extract fan turning
            behind its grille, and a 4-lamp indicator cycling until E5 locks it. */}
        <path d={`M${ALX0 + 20} 56 q${44 + swayA} 40 ${86 + swayA * 1.6} 34`} fill="none" stroke="#48525A" strokeWidth={4} />
        <rect x={936} y={96} width={68} height={68} fill="#10161A" stroke="#2A343B" strokeWidth={3} />
        <g transform={`rotate(${fanRot} 970 130)`}>
          {[0, 1, 2, 3, 4].map((i) => (
            <path key={`fb${i}`} d="M970 130 l25 -8 a26 26 0 0 0 -21 -13 z" fill="#2E383F"
                  transform={`rotate(${i * 72} 970 130)`} />
          ))}
        </g>
        <circle cx={970} cy={130} r={6} fill="#48525A" />
        {[0, 1, 2, 3, 4].map((i) => (
          <rect key={`fg${i}`} x={938} y={100 + i * 13} width={64} height={3} fill="#0A0E11" opacity={0.8} />
        ))}
        <rect x={958} y={52} width={10} height={46} fill="#3B454C" />
        <rect x={940} y={200} width={62} height={50} fill="#161D22" stroke="#2A343B" strokeWidth={2} />
        {[0, 1, 2, 3].map((i) => (
          <circle key={`ld${i}`} cx={954 + (i % 2) * 32} cy={216 + Math.floor(i / 2) * 22} r={7}
                  fill={ledI === i ? (i === 3 ? "#C8D8DE" : "#7E9C88") : "#242D33"} opacity={ledI === i ? 0.95 : 1} />
        ))}
        {/* the parts SHELF: mug, two tins, a short tray stack — dark silhouettes,
            rim-lit only, so the alcove stays the darkest backdrop in the room */}
        <rect x={676} y={384} width={224} height={11} fill="#39434A" />
        <rect x={676} y={384} width={224} height={3} fill="#68747C" />
        <rect x={686} y={378} width={8} height={12} fill="#2A343B" />
        <rect x={886} y={378} width={8} height={12} fill="#2A343B" />
        {/* the shelf MUG (0.10 m) — E3 tips it over and the spill stays on the board */}
        {spill > 0.01 && (
          <ellipse cx={716} cy={385} rx={8 + spill * 15} ry={2 + spill * 3} fill="#0A0E11" opacity={0.75 * spill} />
        )}
        <g transform={`rotate(${-84 * mugTip} 704 384)`}>
          <rect x={694} y={365} width={19} height={19} fill="#3F4A52" />
          <path d="M713 369 a6 6 0 0 1 0 11" fill="none" stroke="#5B666E" strokeWidth={3} />
          <rect x={694} y={365} width={19} height={3} fill="#68747C" />
        </g>
        {[736, 768].map((x, i) => (
          <g key={`tin${x}`}>
            <rect x={x} y={358 + i * 6} width={26} height={26 - i * 6} fill="#39434A" stroke="#1B2329" strokeWidth={2} />
            <rect x={x} y={358 + i * 6} width={26} height={3} fill="#68747C" />
          </g>
        ))}
        {[0, 1, 2].map((i) => (
          <g key={`atr${i}`}>
            <rect x={806} y={374 - i * 9} width={72} height={8} fill="#2E383F" stroke="#1B2329" strokeWidth={1.5} />
            <rect x={806} y={374 - i * 9} width={72} height={2} fill="#5B666E" />
          </g>
        ))}

        {/* PLANE 6 — the ceiling fluorescent trough: the ONE light in this room, and
            its ballast is failing. Kept entirely above the title band. */}
        <rect x={70} y={0} width={300} height={30} fill={CH_SH} />
        <rect x={78} y={4} width={284} height={20} fill="#E6EEF4" />
        <rect x={78} y={4} width={284} height={20} fill="#0B1116" opacity={cl01(1 - lit) * 0.85} />
        {[118, 178, 238, 298].map((x, i) => (
          <rect key={`ft${x}`} x={x} y={7} width={4} height={14} fill="#C3D3DE"
                opacity={cl01(lit) * (i === 3 ? 1 - deadTube : 1)} />
        ))}
        {/* E3's permanent casualty — the far third of the tube never restrikes */}
        <rect x={284} y={4} width={78} height={20} fill="#0B1116" opacity={deadTube * 0.74} />
        <rect x={70} y={30} width={300} height={6} fill="#5A646C" />

        {/* PLANE 6 — the wall INSPECTION VIEWBOX (1.30 m × 1.42 m). Dead dark until E4. */}
        <rect x={VBX0 + 12} y={VBY0 + 14} width={VBX1 - VBX0} height={VBY1 - VBY0} fill="#05080A" opacity={0.4} />
        <rect x={VBX0} y={VBY0} width={VBX1 - VBX0} height={VBY1 - VBY0} fill={CH_MID} stroke={CH_SH} strokeWidth={4} />
        <rect x={VBX0 + 6} y={VBY0 + 6} width={VBX1 - VBX0 - 12} height={10} fill={CH_HI} />
        <rect x={VBX0 + 16} y={VBY0 + 16} width={VBX1 - VBX0 - 32} height={VBY1 - VBY0 - 32}
              fill={BOX_OFF} stroke="#0E1418" strokeWidth={2} />
        {ignite > 0.02 && (
          <>
            <rect x={VBX0 + 16} y={VBY0 + 16} width={VBX1 - VBX0 - 32} height={VBY1 - VBY0 - 32}
                  fill="#A8C6DA" opacity={ignite * (0.88 + surge * 0.12)} />
            <rect x={VBX0 + 16} y={VBY0 + 16} width={VBX1 - VBX0 - 32} height={VBY1 - VBY0 - 32}
                  fill={CLAY} opacity={ring > 0.6 ? (ring - 0.6) * 0.9 + surge * 0.25 : 0} />
            <rect x={VBX0 - 70} y={VBY0 - 70} width={VBX1 - VBX0 + 140} height={VBY1 - VBY0 + 140}
                  fill="url(#s1fBoxGlow)" opacity={ignite * (0.7 + surge * 0.3)} />
          </>
        )}
        {/* two spring clips + a rocker switch: it is a fixture, not a screen */}
        <rect x={VBX0 + 46} y={VBY0 - 12} width={34} height={26} fill={CH} stroke={CH_DK} strokeWidth={2} />
        <rect x={VBX1 - 80} y={VBY0 - 12} width={34} height={26} fill={CH} stroke={CH_DK} strokeWidth={2} />
        <rect x={VBX1 - 30} y={VBY1 - 44} width={20} height={28} fill={ignite > 0.5 ? "#DCE9F1" : CH_SH} stroke={CH_DK} strokeWidth={2} />

        {/* PLANE 4 — THE PASS-THROUGH HATCH. Shadow first, down-right off the trough. */}
        <rect x={TX0 + 16} y={TY0 + 16} width={TX1 - TX0} height={TY1 - TY0} fill="#05080A" opacity={0.4} />
        <rect x={TX0} y={TY0} width={TX1 - TX0} height={TY1 - TY0} fill="url(#s1fHatch)" stroke={CH_DK} strokeWidth={3} />
        {/* its cap is a horizontal face, so it is the one lit surface on the hatch */}
        <rect x={TX0 - 8} y={TY0 - 12} width={TX1 - TX0 + 16} height={16} fill={TOP_HI} />
        <rect x={TX0 - 8} y={TY0 + 4} width={TX1 - TX0 + 16} height={6} fill={CH_MID} />
        {/* condensation on the cold cap */}
        {[382, 430, 496, 560, 612].map((x, i) => (
          <circle key={`hc${x}`} cx={x} cy={TY0 - 4} r={i % 2 ? 2 : 2.6} fill="#EFF5F8" opacity={0.4} />
        ))}
        {/* the extract vents live BELOW the slot: the shutter's roller housing owns the top */}
        {[380, 428, 476, 524, 572, 616].map((x) => (
          <g key={`vt${x}`}>
            <rect x={x} y={SLY1 + 12} width={26} height={12} fill="#3B454C" />
            <rect x={x + 8} y={SLY1 + 24} width={4} height={24} fill={RUST} opacity={0.4} />
          </g>
        ))}
        {/* status lamp: clay while the booth still holds his notes, white once wiped */}
        <circle cx={TX1 - 40} cy={TY0 + 22} r={9} fill={lampFlip ? "#E4EDF2" : CLAY_D} stroke="#232B31" strokeWidth={2} />
        <rect x={TX1 - 58} y={TY0 + 34} width={36} height={4} fill="#4E585F" />
        <path d={`M${TX0 + 40} ${TY0 + 14} l14 24 h-28 z`} fill="none" stroke={AMB_D} strokeWidth={2.5} />
        <rect x={TX0 + 45} y={TY0 + 22} width={3} height={8} fill={AMB_D} />
        <rect x={TX0} y={TY1 - 16} width={TX1 - TX0} height={16} fill={CH_DK} />
        {/* rubber flap mouths, one each side (0.11 m collars) — the darkest solids in frame */}
        {[[TX0 - 14, TX0 + 10], [TX1 - 10, TX1 + 14]].map(([mx0, mx1], k) => (
          <g key={`mo${k}`}>
            <rect x={mx0} y={SLY0 - 4} width={mx1 - mx0} height={SLY1 - SLY0 + 8} fill={MOUTH} stroke="#05080A" strokeWidth={2} />
            {[0, 1, 2, 3].map((i) => <rect key={i} x={mx0 + 3} y={SLY0 + 2 + i * 53} width={mx1 - mx0 - 6} height={46} fill="#1D242A" />)}
          </g>
        ))}
        {/* THE LIT SLOT — the darkest hole in the picture. The white sheet parks here.
            A ribbed throat receding to a cold seam: no bright shapes are allowed in
            here, or the paper stops being the brightest thing in frame. */}
        <rect x={SLX0} y={SLY0} width={SLX1 - SLX0} height={SLY1 - SLY0} fill={SLOT_IN} />
        {[0, 1, 2].map((i) => (
          <rect key={`th${i}`} x={SLX0 + 14 + i * 16} y={SLY0 + 12 + i * 16} width={SLX1 - SLX0 - 28 - i * 32}
                height={SLY1 - SLY0 - 24 - i * 32} fill="none" stroke={i === 2 ? CORRIDOR : "#141A1F"} strokeWidth={3} />
        ))}
        <rect x={(SLX0 + SLX1) / 2 - 5} y={SLY0 + 62} width={10} height={SLY1 - SLY0 - 124} fill="#46525A" />
        <rect x={SLX0} y={SLY0} width={SLX1 - SLX0} height={8} fill="#161D22" />

        {/* ⭐ E2's LARGE MOVER — the whole 254 × 210 throat blazes for the wipe */}
        {pulse > 0.01 && (
          <rect x={SLX0} y={SLY0} width={SLX1 - SLX0} height={SLY1 - SLY0} fill="#F4FAFF" opacity={pulse * 0.92} />
        )}
        <rect x={SLX0} y={SLY0} width={SLX1 - SLX0} height={SLY1 - SLY0} fill="none" stroke={CH_DK} strokeWidth={6} />
        {pulse > 0.01 && (
          <rect x={TX0} y={TY0} width={TX1 - TX0} height={TY1 - TY0} fill="none" stroke="#FFFFFF" strokeWidth={5} opacity={pulse} />
        )}
        {/* E2's PERSISTENT MARK — the wipe burns a soot halo into the hatch face */}
        {soot > 0.01 && (
          <rect x={SLX0 - 30} y={SLY0 - 30} width={SLX1 - SLX0 + 60} height={SLY1 - SLY0 + 60}
                fill="url(#s1fSoot)" opacity={soot * 0.8} />
        )}

        {/* ⭐ E1's LARGE MOVER — the chrome INTAKE SHUTTER (306 × 244) rolling UP off
            the slot, its corrugations riding with it, into a roller housing. */}
        {shutter < 0.995 && (() => {
          const h = (SLY1 - SLY0) * (1 - shutter);
          return (
            <g>
              <rect x={SLX0 - 4} y={SLY0} width={SLX1 - SLX0 + 8} height={h} fill="url(#s1fShut)" stroke={CH_DK} strokeWidth={3} />
              {Array.from({ length: 9 }, (_, i) => {
                const yy = SLY0 + 12 + i * 24;
                return yy < SLY0 + h - 6
                  ? <rect key={`cor${i}`} x={SLX0} y={yy} width={SLX1 - SLX0} height={5} fill="#6E7A83" />
                  : null;
              })}
              <rect x={SLX0 - 4} y={SLY0 + h - 10} width={SLX1 - SLX0 + 8} height={10} fill="#4A555D" />
            </g>);
        })()}
        <rect x={SLX0 - 12} y={SLY0 - 22} width={SLX1 - SLX0 + 24} height={22} fill={CH_MID} stroke={CH_DK} strokeWidth={3} />
        <rect x={SLX0 - 12} y={SLY0 - 22} width={SLX1 - SLX0 + 24} height={5} fill={CH_HI} />
        {[TX0 + 13, TX1 - 13].map((x) => [TY0 + 44, TY1 - 36].map((y) =>
          <circle key={`rv${x}-${y}`} cx={x} cy={y} r={5} fill={CH} stroke={CH_DK} strokeWidth={2} />))}

        {/* PLANE 3 — the chrome SERVICE COUNTER (1.05 m tall). TOP slab is a lit
            horizontal; the FRONT face is a shaded vertical. */}
        <polygon points={`92,${CT_B} 920,${CT_B} 1000,${CT_F} 12,${CT_F}`} fill="url(#s1fCounterTop)" />

        {/* ══ THE INTAKE BELT — the mover that never stops ══ */}
        <g clipPath="url(#s1fBeltClip)">
          <rect x={BX0 - 200} y={BY0} width={BX1 + 200} height={BY1 - BY0} fill={BELT_BED} />
          {slats}
          {queue}
        </g>
        <rect x={BX0} y={BY0 - 7} width={BX1 + 16} height={9} fill={BELT_RAIL} />
        <rect x={BX0} y={BY0 - 7} width={BX1 + 16} height={3} fill={CH_HI} />
        <rect x={BX0} y={BY1 - 3} width={BX1 + 16} height={10} fill="#151B20" />
        {/* the belt's end guard: sheets ride out from behind it, frame-left */}
        <rect x={BX1} y={BY0 - 16} width={30} height={BY1 - BY0 + 26} fill={CH_MID} stroke={CH_DK} strokeWidth={3} />
        <rect x={BX1 + 4} y={BY0 - 12} width={6} height={BY1 - BY0 + 18} fill={CH_HI} />

        {/* E4's PERSISTENT MARK — offcuts shed by the ejected sheet, left on the slab */}
        {chips}

        <rect x={12} y={CT_F} width={988} height={CT_FH} fill="url(#s1fCounterFace)" />
        <rect x={12} y={CT_F} width={988} height={5} fill={CH_HI} />
        <rect x={12} y={CT_F + CT_FH - 4} width={988} height={4} fill="#12181C" />
        {/* panel joints — they stop the front face reading as one long conveyor band */}
        {[168, 356, 544, 732, 900].map((x) => <rect key={`cs${x}`} x={x} y={CT_F + 5} width={3} height={CT_FH - 9} fill="#12181C" />)}
        {[150, 330, 510, 690, 870].map((x) => <circle key={`bo${x}`} cx={x} cy={CT_F + 28} r={6} fill={CH_SH} stroke="#12181C" strokeWidth={2} />)}

        {/* ── THE CONTROL CLUSTER on the counter front: the intake GAUGE (needle
              twitching all scene, kicking on every beat), the SHEET COUNTER that
              clicks over at E4, an E-STOP under its guard, a toggle bank, and a
              riveted repair plate frame-left. ── */}
        <circle cx={378} cy={552} r={21} fill="#12181C" stroke="#6C7880" strokeWidth={3} />
        <circle cx={378} cy={552} r={16} fill="#39434A" />
        {[-60, -20, 20, 60].map((a) => (
          <rect key={`gt${a}`} x={377} y={538} width={2} height={5} fill="#8B97A0" transform={`rotate(${a} 378 552)`} />
        ))}
        <rect x={377} y={540} width={2.5} height={13} fill="#D2DAE1" transform={`rotate(${gauge} 378 552)`} />
        <circle cx={378} cy={552} r={3} fill="#8B97A0" />
        <rect x={402} y={534} width={86} height={36} fill="#1B2329" stroke="#4E585F" strokeWidth={2} />
        {[0, 1, 2].map((i) => (
          <rect key={`dw${i}`} x={408 + i * 27} y={540} width={23} height={24} fill="#0A0E11" />
        ))}
        {["0", "4", counted ? "8" : "7"].map((d, i) => (
          <text key={`dg${i}`} x={419 + i * 27} y={559} textAnchor="middle" fill="#8E99A1"
                fontFamily={mono} fontSize={17} fontWeight={700}>{d}</text>
        ))}
        <circle cx={496} cy={552} r={20} fill="#232B31" stroke="#4E585F" strokeWidth={3} />
        <circle cx={496} cy={550} r={13} fill="#7A3527" stroke="#0E1418" strokeWidth={2} />
        <path d="M488 545 a10 10 0 0 1 14 -3" fill="none" stroke="#A65340" strokeWidth={3} strokeLinecap="round" />
        <rect x={556} y={538} width={46} height={28} fill="#1B2329" stroke="#4E585F" strokeWidth={2} />
        {[0, 1, 2].map((i) => (
          <rect key={`sw${i}`} x={562 + i * 14} y={i === 1 ? 550 : 542} width={7} height={12} fill="#8B97A0" />
        ))}
        {/* fire point — dim, desaturated, never fighting the clay accent */}
        <rect x={626} y={530} width={62} height={46} fill={FIRE} stroke="#0E1418" strokeWidth={2} />
        <rect x={626} y={530} width={62} height={4} fill="#8C4636" />
        <rect x={648} y={540} width={17} height={28} rx={4} fill="#2A343B" />
        <rect x={653} y={534} width={7} height={8} fill="#48525A" />
        <path d="M648 548 h17" stroke="#5B666E" strokeWidth={2} />
        {/* riveted repair plate + scuffing, frame-left on the face */}
        <rect x={34} y={532} width={82} height={42} fill="#39434A" stroke="#12181C" strokeWidth={2} />
        {[0, 1].map((r) => [0, 1, 2].map((c) => (
          <circle key={`fp${r}-${c}`} cx={46 + c * 29} cy={542 + r * 22} r={3} fill="#5B666E" />
        )))}
        <path d="M132 566 q40 -10 78 -2 M144 574 q34 -8 64 -2" fill="none" stroke="#4E585F" strokeWidth={2} opacity={0.6} />
        <rect x={12} y={CT_F + CT_FH} width={988} height={14} fill="#0E1418" opacity={0.9} />
        {/* dim hazard chevrons along the kick */}
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <path key={`hz${i}`} d={`M${712 + i * 30} 595 l14 -14 h13 l-14 14 z`} fill={AMB_D} opacity={0.45} />
        ))}

        {/* ── the condensation DRIP off the counter lip into the drain (ambient) ── */}
        <circle cx={DRN_X - 4} cy={596} r={bead} fill="#B6C4CC" opacity={0.65} />
        {fallT >= 0 && (
          <ellipse cx={DRN_X - 4} cy={598 + fallT * fallT * 104} rx={3} ry={6 + fallT * 5}
                   fill="#C8D6DE" opacity={0.6} />
        )}
        {splashT >= 0 && splashT < 1 && (
          <ellipse cx={DRN_X - 4} cy={704} rx={7 + splashT * 16} ry={3 + splashT * 5} fill="none"
                   stroke="#8FA0AA" strokeWidth={2} opacity={(1 - splashT) * 0.6} />
        )}

        {/* the counter BELL (0.28 m) — booth furniture; it takes a hard specular on the ring */}
        <ellipse cx={690} cy={516} rx={BELL_R + 4} ry={7} fill="#12181C" opacity={0.7} />
        <path d={`M${690 - BELL_R} 516 a${BELL_R} ${BELL_R} 0 0 1 ${BELL_R * 2} 0 z`} fill={CH} stroke={CH_DK} strokeWidth={2} />
        <path d="M674 510 a18 18 0 0 1 15 -17" fill="none" stroke={CH_HI} strokeWidth={4} strokeLinecap="round" opacity={bell > 0.05 ? 1 : 0.65} />
        <rect x={686} y={483} width={8} height={9} fill={CH_MID} />

        {/* the TRAY STACK on the slab, camera-right — E3 knocks it askew, for good */}
        {[0, 1, 2].map((i) => (
          <g key={`tr${i}`} transform={`translate(${trayKnock * ((i + 1) / 3)} 0)`}>
            <rect x={880} y={500 - i * 11} width={72} height={10} fill="#8B97A0" stroke="#414C54" strokeWidth={2} />
            <rect x={880} y={500 - i * 11} width={72} height={3} fill="#B4C0C8" />
          </g>
        ))}

        {/* ⭐ E5's LARGE MOVER — two 420px shockwaves off the bell, sweeping the room */}
        {bell > 0.02 && bell < 1 && [0, 0.34].map((d, i) => {
          const t = cl01((bell - d) / (1 - d));
          return t > 0 && t < 1 ? (
            <circle key={`bw${i}`} cx={690} cy={500} r={30 + t * 430} fill="none" stroke="#FFFFFF"
                    strokeWidth={Math.max(2, 16 - t * 13)} opacity={(1 - t) * 0.5} />
          ) : null;
        })}
        {/* ⭐ E3's LARGE MOVER — the wipe's shock ring rolling out of the hatch */}
        {shockR > 0.001 && shockR < 1 && (
          <>
            <circle cx={(SLX0 + SLX1) / 2} cy={(SLY0 + SLY1) / 2} r={40 + shockR * 640} fill="none"
                    stroke="#EFF7FF" strokeWidth={Math.max(2, 22 - shockR * 19)} opacity={(1 - shockR) * 0.6} />
            <circle cx={(SLX0 + SLX1) / 2} cy={(SLY0 + SLY1) / 2} r={20 + shockR * 380} fill="none"
                    stroke="#FFFFFF" strokeWidth={Math.max(1, 10 - shockR * 9)} opacity={(1 - shockR) * 0.4} />
          </>
        )}
        {/* E3's grit shower, shaken out of the ceiling by the restrike */}
        {grit}

        {/* ⭐ E1's second half — the intake lamp's spill, thrown OUT of the hatch's lower
            lip and down over belt, counter and tile. ⛔ It starts below SLY1 on purpose:
            nothing is allowed to lift the slot off the bottom of the value ladder. */}
        {intake > 0.02 && (
          <polygon points={`${TX0 - 16},${TY1 - 6} ${TX1 + 16},${TY1 - 6} ${TX1 + 300},780 ${TX0 - 340},780`}
                   fill="url(#s1fIntake)" opacity={intake * 0.85} />
        )}

        {/* light pool the viewbox throws onto the counter once it is on */}
        {ignite > 0.02 && (
          <polygon points={`660,${CT_B} 1012,${CT_B} 1012,${CT_F + CT_FH} 620,${CT_F + CT_FH}`}
                   fill="#D8E8F4" opacity={ignite * (0.24 + surge * 0.12)} />
        )}

        {/* ⭐ E4's LARGE MOVER — the wedge the viewbox throws across the ENTIRE right
            side of the booth. Drawn LAST of the room so wall, alcove, hatch edge,
            counter, belt and floor all change value together — one big lit area,
            not a patch behind the furniture. */}
        {ignite > 0.02 && (
          <polygon points={`598,40 1012,40 1012,792 428,792`} fill="#CFE4F4"
                   opacity={ignite * (0.20 + surge * 0.14)} />
        )}

        {/* the trough's cone, falling down-and-right across wall, counter and tile —
            the one light direction, and it breathes with the failing ballast */}
        <polygon points="112,36 356,36 748,792 -70,792" fill="url(#s1fCone)" opacity={cl01(0.35 + 0.65 * lit)} />
        {/* dust threaded through the cone — the smallest, dimmest layer in the room */}
        {motes}

        {/* PLANE 1 — the near counter lip, near-black, cropping the bottom of frame.
            It sits 108px BELOW the ground line, so it can never clip a sprite. */}
        <rect x={0} y={748} width={1012} height={44} fill={FG} />
        <rect x={0} y={748} width={1012} height={4} fill="#2A343B" />
        <rect x={0} y={770} width={1012} height={8} fill="#05080A" />

        <rect x={0} y={0} width={1012} height={792} fill="url(#s1fVig)" />
      </svg>

      {/* ══════ THE TESTER — scorched coat, standing clear of the bottom edge ══════ */}
      <Actor lf={lf} x={testerX} groundY={G} size={H} z={20} coat={1} nodAmp={3.2}
             gaze={4} pin={tPin} shock={seg(lf, 186, 202) * 0.8} />

      {/* ══════ THE FRESH CLAUDE — no coat, no history ══════ */}
      <Actor lf={lf} x={freshX} groundY={G} size={F_SIZE} z={20} flip={1} nodAmp={F_NOD}
             point={fPoint} pin={fPin} />
      {/* …and his blank white eyes, riding the sprite's own bob */}
      <div style={{
        position: "absolute", left: fLeft, top: fTop, width: F_SIZE, height: F_SIZE, zIndex: 24,
        transform: `translateY(${-fHop}px) scaleY(${fSquash}) scaleX(-1)`, transformOrigin: "50% 100%", pointerEvents: "none",
      }}>
        {[63, 110].map((ex) => (
          <div key={ex} style={{
            position: "absolute", left: ex * fs, top: 66 * fs, width: 27 * fs, height: 34 * fs,
            background: flash > 0.2 ? "#FFFFFF" : "#E9F0F4",
            boxShadow: flash > 0.2 ? "0 0 18px rgba(255,255,255,0.9)" : "inset 0 -4px 0 rgba(150,164,174,0.9)",
          }} />
        ))}
      </div>

      {/* ══════ THE SHEET — one continuous prop, clipped so the hatch truly swallows it ══════ */}
      <svg viewBox="0 0 1012 792" width={1012} height={792}
           style={{ position: "absolute", left: 0, top: 0, zIndex: 30, pointerEvents: "none" }}>
        <defs>
          <clipPath id="s1fSheetClip">
            <rect x={-60} y={0} width={TX0 - 14 + 60} height={792} />
            <rect x={SLX0} y={SLY0} width={SLX1 - SLX0} height={SLY1 - SLY0} />
            <rect x={TX1} y={0} width={1072 - TX1} height={792} />
          </clipPath>
        </defs>
        <g clipPath="url(#s1fSheetClip)">
          <Sheet x={sx} y={sy} rot={srot} marks={marks} ring={ring} lit={ignite} hot={ring > 0.85 ? 1 : 0} />
        </g>
      </svg>

      {/* ══════ PLANE 1 — THE NEAREST THING IN THE ROOM: the wire REJECT BIN, heaped
          with crumpled sheets, cropping frame-bottom-left. Drawn ABOVE the sprites so
          it truly reads as near, and kept the darkest mass in the picture. ══════ */}
      <svg viewBox="0 0 1012 792" width={1012} height={792}
           style={{ position: "absolute", left: 0, top: 0, zIndex: 34, pointerEvents: "none" }}>
        {/* the heap first, so the mesh reads in front of it */}
        <g>
          <path d="M-30 700 l40 -26 l44 12 l30 -22 l40 16 l24 -10 l14 22 l-16 26 l-176 6 z" fill="#39434A" />
          <path d="M-30 700 l40 -26 l44 12 l-18 20 z" fill="#4E585F" />
          <path d="M84 664 l40 16 l24 -10 l6 16 l-58 12 z" fill="#2E383F" />
          <path d="M10 674 l24 22 M78 668 l-14 22 M124 680 l-10 18" stroke="#1B2329" strokeWidth={2.5} fill="none" />
        </g>
        <path d="M-60 692 l208 -8 l-22 108 l-186 0 z" fill={FG} />
        <path d="M-60 692 l208 -8 l-3 14 l-206 8 z" fill={FG_HI} />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <path key={`bm${i}`} d={`M${-46 + i * 34} 690 l${-4 - i} 102`} stroke="#1B2329" strokeWidth={4} fill="none" opacity={0.9} />
        ))}
        {[0, 1].map((i) => (
          <path key={`bh${i}`} d={`M-58 ${722 + i * 30} l204 -7`} stroke="#1B2329" strokeWidth={4} fill="none" opacity={0.9} />
        ))}
        <path d="M-60 692 l208 -8" stroke="#2A343B" strokeWidth={7} fill="none" />
      </svg>

      {/* ══════ THE ROOM'S LIGHT — the failing ballast, applied to EVERYTHING in the
          booth (set, sprites, sheet and foreground alike) so it reads as light, not
          as a filter. Never on at frame 0: the opening read is the clean one. ══════ */}
      {dim > 0.002 && (
        <div style={{ position: "absolute", inset: 0, background: "#060A0D", opacity: dim, zIndex: 40, pointerEvents: "none" }} />
      )}

      {/* ══════ E5 — the room washes CLAY when the miss is found ══════ */}
      {clayWash > 0.002 && (
        <div style={{ position: "absolute", inset: 0, background: "#C0563A", opacity: clayWash, zIndex: 42, pointerEvents: "none" }} />
      )}

      {/* ══════ HUD — the reel's recurring plate (short status label, never VO) ══════ */}
      <div style={{
        position: "absolute", left: 30, top: 74, height: 42, padding: "0 16px", zIndex: 60,
        display: "flex", alignItems: "center", gap: 12, borderRadius: 8,
        background: "rgba(10,14,17,0.9)", border: `2px solid ${CLAY}`,
      }}>
        <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 19, letterSpacing: 3, color: "#EFE9E2" }}>TESTED</span>
        <span style={{ fontFamily: mono, fontWeight: 700, fontSize: 19, color: CLAY }}>01/04</span>
      </div>

      {/* ══════ THE WIPE — the memory goes, and the sheet comes back clean ══════ */}
      {flash > 0 && (
        <div style={{ position: "absolute", inset: 0, background: "#F2F8FF", opacity: flash, zIndex: 90, pointerEvents: "none" }} />
      )}
      {after > 0.002 && (
        <div style={{ position: "absolute", inset: 0, background: "#E6F1FB", opacity: after, zIndex: 88, pointerEvents: "none" }} />
      )}
    </>
  );
};
