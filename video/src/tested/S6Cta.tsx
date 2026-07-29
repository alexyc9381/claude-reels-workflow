import React from "react";
import { CLAY, GOLD, CREAM, INK, ramp, seed, fraunces, inter, H, M, Actor, Room } from "./chassis";

/* ============================================================================
   REEL 77 "TESTED" — S6Cta · THE HANDOVER  (window 39.600–42.946, 100f @30fps)

   PLACE .... THE DISPATCH BENCH at the mouth of the warehouse aisle. The S5 rack
              is still there, now 2px soft behind us — we have walked to the end of it.
              This is where a parcel gets weighed, stamped, tied and sent: a wall of
              pigeonholes on the left, a sorting ledge across their top, shelving with
              numbered boxes and a hook rail on the right, the bench itself carrying a
              brass parcel scale, a service bell, a spike file and a wrapped parcel.
   FLOOR .... sealed concrete, deliberately DARK + COOL (#2B2A23 -> #0D0D0A) so the
              warm clay sprite separates from it by LIGHTNESS, not by hue alone.
              Worn dispatch tape line, old stains, scuff arcs, litter.
   BACK WALL. the racking aisle itself: uprights, shelf beams, dull crates, a chain
              of house lamps running back to the lit far end, and a chain hoist creeping
              a load across the far end for the whole scene.
   LIGHT .... ONE motivated source: the tin-shade PENDANT hung on a cord from y=40.
              It SWINGS on that cord for the whole scene — cord, pull-chain, shade, bulb,
              cone and the floor pool are one rigid group rotating about (500,40), so the
              lit area itself is never still. Everything casts down and AWAY from it — the
              hero, the pigeonhole bank and the clay sign (all LEFT of it) throw left-down,
              the chart, the shelving and the bench (right of it) throw right-down. The
              bank's shadow band is DRAGGED across it by the swing. No second key anywhere:
              the little bench lamp on the ledge is dark, it only catches a rim.
   CAMERA ... LOCKED. Nothing pans, pushes, zooms or drifts. One framing, whole scene.

   DEPTH .... 6 planes, each with content, none a bare gradient:
              1 near  — pallet of wrapped parcels bottom-right + overhead joists, duct,
                        louvre fan and a hanging hook chain cropping the top corners (soft)
              2 hero  — the tester, the clay TESTED sign, the comment slab, the brand
              3 mid   — the dispatch bench and everything standing on it, the hanging guide
              4 mid-far — pigeonhole wall + sorting ledge (L), shelving + hook rail (R)
              5 far   — the aisle: uprights, bays, lamp chain, hand truck, chain hoist
              6 atmos — cone dust, gold motes, the swinging shadow band, the light pool

   AMBIENT (all BELOW the hero in contrast — texture, never the event): the pull-chain
   swaying with lag, the pigeonhole shadow band drifting, the scale needle twitching, the
   twine spool turning, spike dockets and a taped notice corner fluttering, hook-rail tags
   swaying, a clipboard docket lifting, the louvre fan turning, the ceiling hook chain
   swinging, the far chain hoist creeping, cone dust rising, the shelf pilot blinking.

   ⛔ THE FIX (measured dead air: 2.6 / 1.8 / 2.4 / 0.1 — bar is 4.0). Two things run
      CONTINUOUSLY under every beat as texture and both ESCALATE to the last frame:
        1. the PENDANT SWING — a growing sinusoid that drags the cone and the floor
           pool across a third of the panel and takes a hard kick on each impact;
        2. the RANKED LIST SCROLLS — the 50 rows crawl up through the sheet the whole
           scene, starting at ~1px/f and ending near 4px/f, so a 260x500 band of the
           frame is always changing and the guide always reads as ALL fifty.

   BEATS (sequential, one LARGE mover each, escalating) — and NOTHING happens alone:
     A f02–f26  the kraft wrapper is YANKED off the hanging chart — a 380x700 sheet
                sails DOWN-LEFT across the whole panel and out of frame. The gust rocks
                every hanging tag and knocks a docket off the spike file — it lands on
                the bench and STAYS there.
     B f22–f42  a full-height gold sweep bar runs the entire 500px of the ranked list,
                certifying every row as it passes: numerals punch in, rows band gold;
                the brass scale nudges as it passes.
     C f36–f48  the comment slab DROPS a full frame-height onto the concrete, bounces,
                the floor rings; the bell hops and rings, the ledge stamps rattle, the
                pendant takes a kick and the concrete KEEPS three chips and a scuff.
     D f52–f80  he raises the 1.25 m dispatch BRAND out from behind the sign through an
                84-degree arc and drives it into the chart; the gold seal slams in at
                3.6x, the sheet flexes, the parcel jumps, a shelf box is shunted out and
                STAYS out, a tag is shaken off the hook rail and lies on the bench.
     E f87–100  the seal LIFTS off the chart and flies 540px across the panel onto the
                clay sign; the sign punches, a gold ring blows out past the frame edge,
                warm light blooms, motes rise, the aisle lamps surge away down the rack,
                a fifth tally stroke is chalked on the slate and the bench pilot lights.
                Nothing has settled when the reel cuts.
   ========================================================================== */

/* ---- scale contract: every prop below is sized through M(metres). H = 330 = the sprite. */
const GY = 556;                              // hero's ground on the concrete
const FLOORY = 470;                          // near floor meets the aisle floor
const LAMP_X = 500;                          // the ONE light
const PIVOT_Y = 40;                          // the cord anchor it swings about
const SHADE_W = M(0.38);                     // 72 pendant shade

const BENCH_H = M(0.95);                     // 179 — dispatch bench
const BENCH_BASE = 679;
const BENCH_TOP = BENCH_BASE - BENCH_H;      // 500
const BENCH_X = 559;

/* the hanging RANKED GUIDE — 1.38 m wide, hung from a rack rail, its tail running
   off the bottom of the frame so the list reads as ALL 50, not as six things. */
const SH_X = 596, SH_W = M(1.38);            // 260 -> 596..856
const SH_Y = 198, SH_BOT = 792;
const RAIL_Y = 186;
const BAND_Y = 292, BAND_H = 500;            // the scrolling row band
const ROW0 = 296, ROWP = 24, NVIS = 23;
const SEAL_D = M(0.70);                      // 132 — the gold approval seal
const SEAL_CX = 666, SEAL_CY = 424;
const LAND_X = 126, LAND_Y = 568;            // where the seal ends up on the clay sign (clear of the letterforms)

/* the clay KEYWORD SIGN (near plane) + the comment slab under it */
const SIGN_W = M(2.55), SIGN_H = M(0.67);    // 481 x 126 at the near plane
const SIGN_X = 92, SIGN_Y = 578;
const PILL_W = M(2.20), PILL_H = M(0.38);    // 415 x 72 — door-scale, not a chip
const PILL_X = 152, PILL_Y = 706;

const IRON_L = M(1.25), IRON_HD = M(0.20);   // 236 long-handled brand, 38 head
const HAND_X = 422, HAND_Y = 416;            // his right hand, measured off the sprite

/* ---- THE PIGEONHOLE WALL (left, standing on the aisle floor) ---- */
const PG_X = 6, PG_Y = 212, PG_W = M(1.34), PG_H = M(1.43);   // 253 x 270 sorting bank
const PG_C0X = 14, PG_C0Y = 222, PG_CW = 39, PG_CH = 50, PG_HW = 33, PG_HH = 41;
const PG_NUM = ["07", "12", "18", "24", "31", "39", "44", "50"];

/* ---- THE RIGHT-HAND DISPATCH FURNITURE ---- */
const SHF_X = 866, SHF_W = M(0.77), SHF_Y = 206;         // 145 — shelving, numbered boxes
const SHELF_Y = [254, 303, 352];
const BOX_NUM = ["03", "11", "26", "38", "47"];
const HOOK_Y = 364;                          // the hook rail the tags hang from
const SPOOL_X = 880, SPOOL_Y = 414, SPOOL_R = M(0.09);   // 17 — the twine spool
const SCALE_X = 866, SCALE_W = M(0.26), SCALE_TOP = 442; // 49 wide, 0.31 m tall brass scale
const BELL_CX = 936, BELL_D = M(0.14);       // 26 — the service bell
const PCL_X = 954, PCL_W = M(0.31), PCL_H = M(0.27);     // 58 x 51 wrapped parcel
const SPK_X = 572, SPK_BASE = 500;           // the spike file, on the bench's left end
/* the hand truck parked in the aisle mouth — just under a metre of frame, plus its load */
const TRK_X = 466, TRK_BASE = 538, TRK_H = M(0.99), TRK_LD = M(0.48);   // 187 / 91

/* aisle perspective helpers: t = depth 0(near)…0.9(far) */
const AX = (t: number) => t * 446;
const AY0 = (t: number) => FLOORY - t * 100;
const AY1 = (t: number) => 64 + t * 246;
const TS = [0, 0.3, 0.56, 0.76, 0.9];

const sm = (t: number) => t * t * (3 - 2 * t);
const KEY = ["T", "E", "S", "T", "E", "D"];

export const S6Cta: React.FC<{ lf: number }> = ({ lf }) => {
  /* ---- BEAT A: the wrapper comes off, DOWN-LEFT across the whole panel -------- */
  const unwrap = ramp(lf, 2, 26);
  const uA = unwrap * unwrap;                          // accelerating yank
  const gust = Math.max(0, 1 - Math.abs(lf - 15) / 13); // the draught it drags with it

  /* ---- BEAT B: the full-height sweep certifies the list ----------------------- */
  const swp = sm(ramp(lf, 22, 42));
  const barY = BAND_Y + swp * (BAND_H + 40);

  /* ---- continuous mover 2: the ranked list crawls up, escalating -------------- */
  const scroll = 1.0 * lf + 0.030 * Math.pow(Math.max(0, lf - 40), 2);
  const rowOff = scroll % ROWP;
  const rowBase = Math.floor(scroll / ROWP);

  /* ---- BEAT C: the comment slab falls a full frame-height, then types --------- */
  const drop = ramp(lf, 36, 48);
  const dA = drop * drop;
  const bounce = lf >= 48 ? Math.max(0, 1 - ramp(lf, 48, 60)) * Math.sin((lf - 48) * 0.74) * 22 : 0;
  const dropY = -(1 - dA) * (PILL_Y + PILL_H + 90) + bounce;
  const slabRing = ramp(lf, 48, 62);
  const typed = Math.max(0, Math.min(6, Math.floor((lf - 49) / 2.6) + 1));
  const fillW = ramp(lf, 49, 72) * PILL_W;

  /* ---- BEAT D: the brand rises through 84 deg, then drives home --------------- */
  const raise = sm(ramp(lf, 52, 80));
  const recoil = 1 - 0.62 * sm(ramp(lf, 82, 94));
  const strike = raise * recoil;
  const armUp = lf >= 50 && lf < 92;
  const cheerV = Math.max(0, ramp(lf, 90, 99)) * 0.9;
  const handX = HAND_X - 6 * strike;
  const handY = HAND_Y - 52 * strike - 44 * cheerV;
  const ironAng = 76 - 84 * strike;                    // rested head-down behind the sign -> driven into the page
  const sealT = ramp(lf, 80, 88);
  const sealOp = ramp(lf, 80, 83);
  const ringT = ramp(lf, 80, 96);
  const flex = lf >= 80 ? Math.max(0, 1 - ramp(lf, 80, 96)) * Math.sin((lf - 80) * 0.95) * 2.6 : 0;

  /* ---- BEAT E: the seal flies the width of the panel and the room blooms ------ */
  const fly = sm(ramp(lf, 87, 96));
  const sealX = SEAL_CX + (LAND_X - SEAL_CX) * fly;
  const sealY = SEAL_CY + (LAND_Y - SEAL_CY) * fly - Math.sin(fly * Math.PI) * 168;
  const sealSc = (1 + 2.6 * (1 - sm(sealT))) * (1 - 0.42 * fly);
  const sealRot = -13 + fly * 402;
  const landRing = ramp(lf, 96, 108);
  const bloom = sm(ramp(lf, 90, 104));
  const surge = ramp(lf, 88, 100);

  /* impacts — every hit kicks the sign, the pendant AND the bench, nothing settles */
  const hit1 = lf >= 48 ? Math.max(0, 1 - ramp(lf, 48, 60)) * Math.sin((lf - 48) * 1.5) : 0;
  const hit2 = lf >= 80 ? Math.max(0, 1 - ramp(lf, 80, 92)) * Math.sin((lf - 80) * 1.35) : 0;
  const hit3 = lf >= 96 ? Math.max(0, 1 - ramp(lf, 96, 110)) * Math.sin((lf - 96) * 1.45) : 0;
  const wShake = hit1 * 6 + hit3 * 9;
  const wS = 1 + 0.14 * (sm(ramp(lf, 96, 100)) - sm(ramp(lf, 100, 109)));
  const jolt = Math.abs(hit1) + Math.abs(hit2) + Math.abs(hit3);

  /* ---- continuous mover 1: the pendant swings, harder as the scene runs ------- */
  const swAmp = 2.1 + 3.3 * ramp(lf, 6, 96);
  const sw = Math.sin(lf / 6.6) * swAmp + hit1 * 2.4 + hit2 * 3.4 + hit3 * 4.6;
  const cordLag = (Math.sin((lf - 5) / 6.6) * swAmp - Math.sin(lf / 6.6) * swAmp) * 1.7;
  const flare = ramp(lf, 22, 34) * 0.16 + ramp(lf, 80, 86) * 0.20 + bloom * 0.34;

  /* ---- AMBIENT LIFE — twelve small, dim, soft movers. None is ever the event. -- */
  const needle = Math.sin(lf / 5.3) * 2.4 + hit1 * 7 + hit2 * 9 + swp * 3;  // scale needle
  const spoolRot = lf * 1.15;                                              // twine spool
  const fanRot = lf * 2.6;                                                 // louvre fan
  const hoistX = 452 + lf * 1.3;                                           // far chain hoist
  const chainSw = Math.sin(lf / 9.4) * 2.6 + gust * 3;                     // ceiling hook chain
  const notice = Math.sin(lf / 4.3) * 3.4 + gust * 5;                      // taped-notice corner
  const clip = Math.sin(lf / 5.9) * 2.8 + gust * 6;                        // clipboard docket
  const pilotOn = ramp(lf, 94, 99);
  const pilotBlink = 0.26 + 0.16 * (Math.sin(lf / 7.5) > 0.3 ? 1 : 0);

  /* ---- PERSISTENT RESULTS — the bench is materially different at the end ------ */
  const lostDocket = Math.min(1, Math.max(0, (lf - 14) / 11));   // knocked off the spike, stays down
  const chipMark = ramp(lf, 48, 55);                             // chips + scuff under the slab
  const boxOut = ramp(lf, 82, 90);                               // a shelf box shunted out, stays out
  const tagDown = Math.min(1, Math.max(0, (lf - 82) / 10));      // a tag shaken off the rail
  const tally5 = ramp(lf, 96, 99);                               // the fifth chalk stroke

  /* ⛔ eyes: attitude comes from GAZE + posture only. stern is never used here. */
  const gaze = 3 + 6 * ramp(lf, 4, 20) - 9 * ramp(lf, 88, 96);
  const bulb = 0.94 + 0.05 * Math.sin(lf / 9) + flare;

  return (
    <>
      {/* ================= THE SET ================= */}
      <svg viewBox="0 0 1012 792" width={1012} height={792} style={{ position: "absolute", left: 0, top: 0 }}>
        <defs>
          <filter id="s6soft" x="-12%" y="-12%" width="124%" height="124%">
            <feGaussianBlur stdDeviation="2" />
          </filter>
          <filter id="s6fg" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur stdDeviation="1.6" />
          </filter>
          <clipPath id="s6sheet">
            <rect x={SH_X} y={SH_Y} width={SH_W} height={SH_BOT - SH_Y} />
          </clipPath>
          <clipPath id="s6rows">
            <rect x={SH_X} y={BAND_Y} width={SH_W} height={BAND_H} />
          </clipPath>
          <clipPath id="s6bank">
            <rect x={PG_X} y={PG_Y} width={PG_W} height={PG_H} />
          </clipPath>
          <linearGradient id="s6aisle" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#221A0E" /><stop offset="1" stopColor="#4E3A1C" />
          </linearGradient>
          <linearGradient id="s6aiflo" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#493819" /><stop offset="1" stopColor="#211705" />
          </linearGradient>
          <radialGradient id="s6far" cx="0.5" cy="0.5" r="0.6">
            <stop offset="0" stopColor="#F3CE8A" /><stop offset="1" stopColor="#A2762F" />
          </radialGradient>
          <linearGradient id="s6cone" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#FFD489" stopOpacity="0.26" />
            <stop offset="1" stopColor="#FFD489" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="s6pool" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#C08C3C" stopOpacity="0.34" />
            <stop offset="1" stopColor="#C08C3C" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="s6benchtop" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#8A6636" /><stop offset="1" stopColor="#5E441F" />
          </linearGradient>
          <linearGradient id="s6oak" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#1B1206" /><stop offset="1" stopColor="#33240E" />
          </linearGradient>
          <linearGradient id="s6brass" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#5C4A22" /><stop offset="0.5" stopColor="#A5843C" />
            <stop offset="1" stopColor="#4A3A18" />
          </linearGradient>
          {/* the chart's paper: bright at the top under the pendant, falling off downward */}
          <linearGradient id="s6paper" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#F8F1DE" />
            <stop offset="0.42" stopColor="#E1D2AE" />
            <stop offset="1" stopColor="#8E7E60" />
          </linearGradient>
          <linearGradient id="s6kraft" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#B58F58" /><stop offset="1" stopColor="#7E6134" />
          </linearGradient>
          {/* the full-height certification sweep */}
          <linearGradient id="s6sweep" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#FFD489" stopOpacity="0" />
            <stop offset="1" stopColor="#FFE7B4" stopOpacity="0.62" />
          </linearGradient>
        </defs>

        {/* PLANE 6 — the aisle behind, 2px soft. Floor pushed DARK + COOL. */}
        <Room wall1="#4A3A20" wall2="#150F08" floor1="#2B2A23" floor2="#0D0D0A" floorY={FLOORY} />
        <g filter="url(#s6soft)">
          <rect x={0} y={40} width={1012} height={FLOORY - 40} fill="url(#s6aisle)" />
          {/* the aisle floor running back */}
          <polygon points={`0,${FLOORY} 1012,${FLOORY} ${1012 - AX(0.9)},${AY0(0.9)} ${AX(0.9)},${AY0(0.9)}`} fill="url(#s6aiflo)" />
          {/* the lit far end of the aisle — it OPENS UP in the finale as the rack lights away */}
          <rect x={496 - 34 * surge} y={292 - 24 * surge} width={136 + 68 * surge} height={88 + 46 * surge} fill="url(#s6far)" />
          <rect x={496 - 34 * surge} y={292 - 24 * surge} width={136 + 68 * surge} height={7} fill="#FFE7AE" opacity={0.8} />
          {/* rack bays: shelf beams + dull crates, both sides */}
          {[0, 1, 2, 3].map((i) => {
            const t0 = TS[i], t1 = TS[i + 1];
            const xL0 = AX(t0), xL1 = AX(t1), xR0 = 1012 - xL0, xR1 = 1012 - xL1;
            return [0.3, 0.58, 0.82].map((f, k) => {
              const y0 = AY1(t0) + f * (AY0(t0) - AY1(t0));
              const y1 = AY1(t1) + f * (AY0(t1) - AY1(t1));
              const ch = 34 * (1 - t1 * 0.6);
              return (
                <g key={`s6b${i}${k}`}>
                  <polygon points={`${xL0 + 16},${y0 - ch} ${xL1 - 6},${y1 - ch * 0.8} ${xL1 - 6},${y1} ${xL0 + 16},${y0}`} fill="#6A4E24" opacity={0.9} />
                  <polygon points={`${xR0 - 16},${y0 - ch} ${xR1 + 6},${y1 - ch * 0.8} ${xR1 + 6},${y1} ${xR0 - 16},${y0}`} fill="#5E451F" opacity={0.9} />
                  <polygon points={`${xL0},${y0} ${xL1},${y1} ${xL1},${y1 + 8} ${xL0},${y0 + 13}`} fill="#33240F" />
                  <polygon points={`${xR0},${y0} ${xR1},${y1} ${xR1},${y1 + 8} ${xR0},${y0 + 13}`} fill="#33240F" />
                </g>
              );
            });
          })}
          {/* rack uprights — the dark verticals the hero is read against */}
          {TS.map((t, i) => {
            const w = 26 * (1 - t * 0.72);
            return (
              <g key={`s6u${i}`}>
                <rect x={AX(t) - w / 2} y={AY1(t)} width={w} height={AY0(t) - AY1(t)} fill="#241806" />
                <rect x={1012 - AX(t) - w / 2} y={AY1(t)} width={w} height={AY0(t) - AY1(t)} fill="#1F1505" />
              </g>
            );
          })}
          {/* FAR PLANE, legible: an overhead chain hoist creeps a slung pallet across the
              lit far end for the whole scene — small, dim, and never stops */}
          <rect x={430} y={286} width={176} height={5} fill="#2A1C0A" />
          <g transform={`translate(${hoistX} 0)`}>
            <rect x={-11} y={280} width={22} height={11} rx={2} fill="#191006" />
            <rect x={-2} y={291} width={4} height={19} fill="#231708" />
            <path d="M -6 310 q 6 9 12 0" stroke="#241808" strokeWidth={4} fill="none" />
            <rect x={-17} y={312} width={34} height={19} fill="#2E2009" />
            <rect x={-17} y={312} width={34} height={4} fill="#54401A" />
          </g>
          {/* the house lamp chain running back down the aisle — in the finale it lights
              AWAY from us, one lamp at a time, so the depth of the rack reads at the end */}
          {[0.18, 0.44, 0.66, 0.84].map((t, i) => {
            const ly = AY1(t) + 22, r = 17 * (1 - t * 0.7);
            const s = Math.max(0, ramp(lf, 88 + i * 2.6, 95 + i * 2.6));
            return (
              <g key={`s6l${i}`}>
                <rect x={563} y={AY1(t)} width={2} height={22} fill="#2A1C0A" />
                <ellipse cx={564} cy={ly} rx={r * (1 + 0.5 * s)} ry={r * 0.5 * (1 + 0.5 * s)} fill="#FFD489" opacity={0.9} />
                <ellipse cx={564} cy={ly} rx={r * (2.6 + 2.8 * s)} ry={r * (1.5 + 1.7 * s)} fill="#FFC469" opacity={0.18 + 0.3 * s} />
              </g>
            );
          })}
        </g>

        {/* ============ PLANE 4a — THE PIGEONHOLE WALL + its sorting ledge ============
            30 numbered holes, some stuffed with rolled dockets and small parcels, some
            empty and black, one taped shut. It exists to say this place SORTS things.
            Light is at x=500, so its right-hand edges catch and it throws left-down. */}
        <g>
          <ellipse cx={PG_X + 104} cy={PG_Y + PG_H + 10} rx={172} ry={19} fill="#080604" opacity={0.5} />
          <rect x={PG_X} y={PG_Y} width={PG_W} height={PG_H} fill="url(#s6oak)" />
          <rect x={PG_X} y={PG_Y} width={PG_W} height={6} fill="#3A2A12" />
          <rect x={PG_X + PG_W - 8} y={PG_Y} width={8} height={PG_H} fill="#4E3A19" />

          <g clipPath="url(#s6bank)">
            {Array.from({ length: 30 }, (_, n) => {
              const c = n % 6, r = Math.floor(n / 6);
              const x = PG_C0X + c * PG_CW, y = PG_C0Y + r * PG_CH;
              const s = seed(n * 2.3 + 5);
              const kind = Math.floor(s * 4);
              return (
                <g key={`s6pg${n}`}>
                  <rect x={x} y={y} width={PG_HW} height={PG_HH} fill="#0E0803" />
                  <rect x={x} y={y + PG_HH - 3} width={PG_HW} height={3} fill="#3E2C12" />
                  <rect x={x + PG_HW - 2} y={y} width={2} height={PG_HH} fill="#2C1F0C" />
                  {kind === 0 && (
                    <g>
                      <rect x={x + 5} y={y + 12} width={PG_HW - 12} height={PG_HH - 14} rx={3} fill="#6E6045" />
                      <rect x={x + 5} y={y + 12} width={PG_HW - 12} height={4} rx={2} fill="#8C7B58" />
                      <rect x={x + 8} y={y + 22} width={12} height={3} fill="#4A3F2C" />
                    </g>
                  )}
                  {kind === 1 && (
                    <g>
                      <rect x={x + 4} y={y + 16} width={PG_HW - 9} height={PG_HH - 18} fill="#5A431F" />
                      <rect x={x + 4} y={y + 16} width={PG_HW - 9} height={3} fill="#7A5D2C" />
                      <rect x={x + 13} y={y + 16} width={3} height={PG_HH - 18} fill="#3A2A12" />
                    </g>
                  )}
                  {kind === 3 && (
                    <g>
                      <rect x={x + 3} y={y + 26} width={PG_HW - 7} height={12} fill="#5E5238" />
                      <rect x={x + 3} y={y + 26} width={PG_HW - 7} height={3} fill="#7D6E4C" />
                      <rect x={x + 6} y={y + 22} width={PG_HW - 14} height={5} fill="#6B5D40" />
                    </g>
                  )}
                  {/* the little brass number plate under a third of the holes */}
                  {n % 3 === 0 && (
                    <g>
                      <rect x={x + 1} y={y + PG_HH + 1} width={19} height={8} rx={1} fill="#4A3A18" />
                      <text x={x + 3} y={y + PG_HH + 8} fontFamily={inter.fontFamily} fontWeight={700} fontSize={7}
                            fill="#B49B6C" opacity={0.75}>{PG_NUM[(n / 3) % 8]}</text>
                    </g>
                  )}
                </g>
              );
            })}

            {/* aged: a rust streak, a chipped patch of old paint, a scuffed corner */}
            <path d="M 236 224 q 5 40 -2 84" stroke="#5A3A16" strokeWidth={4} fill="none" opacity={0.45} />
            <path d="M 60 470 q 40 8 90 2" stroke="#3E2C12" strokeWidth={3} fill="none" opacity={0.5} />
            <rect x={90} y={326} width={26} height={16} fill="#3E2E14" opacity={0.6} />

            {/* a taped notice over one dead hole — redacted bars only, its corner flutters */}
            <g transform={`translate(${PG_C0X + 4 * PG_CW - 2} ${PG_C0Y + PG_CH - 4})`}>
              <rect x={0} y={0} width={38} height={44} fill="#B9AC8C" />
              <rect x={0} y={0} width={38} height={5} fill="#D3C7A8" />
              <g filter="url(#s6soft)">
                <rect x={5} y={12} width={26} height={5} rx={2} fill="#5B4F38" />
                <rect x={5} y={22} width={20} height={5} rx={2} fill="#6B5F45" />
                <rect x={5} y={32} width={23} height={5} rx={2} fill="#6B5F45" />
              </g>
              <rect x={-5} y={-4} width={20} height={9} fill="#8E8266" opacity={0.8} transform="rotate(-16)" />
              <path d={`M 38 44 l -13 0 l 13 ${-13 - notice}`} fill="#8A7D60" />
            </g>
          </g>

          {/* the plinth it stands on, kicked and scuffed */}
          <rect x={PG_X - 4} y={PG_Y + PG_H - 14} width={PG_W + 8} height={14} fill="#170F05" />
          <rect x={PG_X - 4} y={PG_Y + PG_H - 14} width={PG_W + 8} height={3} fill="#4A3517" opacity={0.85} />
          <rect x={PG_X + 60} y={PG_Y + PG_H - 10} width={30} height={6} fill="#2E2109" />

          {/* AMBIENT: the swinging pendant DRAGS a soft shadow band across the whole bank */}
          <g clipPath="url(#s6bank)">
            <rect x={PG_X + 52 + sw * 8} y={PG_Y} width={78} height={PG_H} fill="#000" opacity={0.16} />
            <rect x={PG_X + 168 + sw * 12} y={PG_Y} width={42} height={PG_H} fill="#000" opacity={0.1} />
          </g>

          {/* ---- THE SORTING LEDGE across the top of the bank: stamps, ink pad,
                  a bundle of labels, a chipped mug, and a dark little bench lamp ---- */}
          <rect x={PG_X - 4} y={200} width={PG_W + 8} height={13} fill="#3A2A12" />
          <rect x={PG_X - 4} y={200} width={PG_W + 8} height={4} fill="#6A5024" />

          {/* the stamp rack — four rubber stamps, they rattle on every impact */}
          <g transform={`translate(0 ${-Math.abs(hit1) * 2 - Math.abs(hit2) * 2})`}>
            <rect x={26} y={190} width={68} height={11} rx={2} fill="#2C1F0C" />
            {[0, 1, 2, 3].map((i) => (
              <g key={`s6st${i}`} transform={`translate(${30 + i * 16} 0)`}>
                <rect x={0} y={176} width={11} height={12} rx={3} fill="#4A3517" />
                <rect x={0} y={176} width={11} height={3} rx={1} fill="#7A5D2C" />
                <rect x={-1} y={188} width={13} height={4} fill="#241708" />
              </g>
            ))}
          </g>
          {/* the ink pad, lid ajar */}
          <g>
            <rect x={102} y={188} width={34} height={13} rx={2} fill="#2E2109" />
            <rect x={102} y={188} width={34} height={3} fill="#5A431C" />
            <g transform="rotate(-28 102 188)">
              <rect x={102} y={178} width={34} height={9} rx={2} fill="#241708" />
              <rect x={102} y={178} width={34} height={3} rx={1} fill="#4A3517" />
            </g>
            <rect x={106} y={192} width={26} height={5} fill="#120B03" />
          </g>
          {/* a tied bundle of blank labels */}
          <g>
            <rect x={144} y={182} width={36} height={19} fill="#8A7C5C" />
            <rect x={144} y={182} width={36} height={4} fill="#A89A78" />
            <rect x={144} y={190} width={36} height={2} fill="#6B5F45" />
            <rect x={158} y={180} width={5} height={23} fill="#463A1E" />
          </g>
          {/* a chipped enamel mug — M(0.10) */}
          <g>
            <rect x={188} y={182} width={19} height={19} rx={2} fill="#5E5238" />
            <rect x={188} y={182} width={19} height={4} fill="#8A7C5C" />
            <path d="M 207 187 q 8 4 0 10" stroke="#5E5238" strokeWidth={4} fill="none" />
            <rect x={196} y={182} width={5} height={4} fill="#2A2216" />
          </g>
          {/* the bench lamp — DARK. There is only one light in this room; this one just
              catches a rim off it. Its pilot lights on the final beat and stays lit. */}
          <g>
            <ellipse cx={236} cy={200} rx={15} ry={5} fill="#241708" />
            <rect x={234} y={176} width={4} height={24} fill="#2C1F0C" />
            <path d="M 220 176 l 32 0 l -6 -14 l -20 0 z" fill="#33240E" />
            <path d="M 226 162 l 20 0 l 1 3 l -22 0 z" fill="#54401A" />
            <ellipse cx={236} cy={177} rx={9} ry={3} fill="#4A3F2C" opacity={0.6} />
            <circle cx={246} cy={198} r={3} fill={GOLD} opacity={pilotOn * 0.85} />
          </g>

          {/* a slate leaning on the plinth with the day's tally — a fifth stroke is
              chalked on at the finale and stays there */}
          <g transform="rotate(-4 16 546)">
            <rect x={14} y={488} width={78} height={62} rx={3} fill="#171310" />
            <rect x={14} y={488} width={78} height={62} rx={3} fill="none" stroke="#3E3428" strokeWidth={4} />
            {[0, 1, 2, 3].map((g) => (
              <g key={`s6ty${g}`} transform={`translate(${22 + (g % 2) * 34} ${500 + Math.floor(g / 2) * 26})`}>
                {[0, 1, 2, 3].map((k) => (
                  <rect key={`s6tk${k}`} x={k * 6} y={0} width={2} height={15} fill="#C7BCA2" opacity={0.62} />
                ))}
                <rect x={-2} y={6} width={26} height={2} fill="#C7BCA2" opacity={0.62} transform="rotate(-18 10 7)" />
              </g>
            ))}
            <rect x={22} y={526} width={2} height={15 * tally5} fill="#EDE6D6" opacity={0.85} />
          </g>
        </g>

        {/* PLANE 5b — a hand truck parked in the aisle mouth with a parcel still on it.
            Pure dark silhouette against the lit far end: it is a depth cue, not an event. */}
        <g>
          <ellipse cx={TRK_X + 34} cy={548} rx={54} ry={11} fill="#080604" opacity={0.45} />
          <rect x={TRK_X + 6} y={TRK_BASE - TRK_H} width={9} height={TRK_H} fill="#1A1206" />
          <rect x={TRK_X + 52} y={TRK_BASE - TRK_H} width={9} height={TRK_H} fill="#1A1206" />
          <rect x={TRK_X + 6} y={TRK_BASE - TRK_H} width={55} height={8} fill="#3E2C12" />
          <rect x={TRK_X + 6} y={TRK_BASE - TRK_H + 60} width={55} height={6} fill="#241708" />
          <rect x={TRK_X - 6} y={TRK_BASE - 6} width={80} height={9} fill="#150E05" />
          <circle cx={TRK_X + 4} cy={TRK_BASE - 10} r={15} fill="#0F0A04" />
          <circle cx={TRK_X + 4} cy={TRK_BASE - 10} r={5} fill="#2E2109" />
          <rect x={TRK_X + 12} y={TRK_BASE - TRK_LD - 5} width={52} height={TRK_LD} fill="#1F1508" />
          <rect x={TRK_X + 12} y={TRK_BASE - TRK_LD - 5} width={52} height={5} fill="#423014" />
          <rect x={TRK_X + 34} y={TRK_BASE - TRK_LD - 5} width={4} height={TRK_LD} fill="#382713" />
        </g>

        {/* ---- the NEAR CONCRETE: a worn dispatch tape line, old stains, litter, and
             the chips the comment slab leaves when it lands ---- */}
        <g>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <rect key={`s6tp${i}`} x={i * 172 + 8} y={540 - i * 4} width={128} height={7}
                  fill="#8A6B26" opacity={0.24 - i * 0.015} />
          ))}
          <ellipse cx={640} cy={520} rx={78} ry={14} fill="#000" opacity={0.22} />
          <ellipse cx={168} cy={512} rx={54} ry={10} fill="#000" opacity={0.18} />
          <path d="M 300 566 q 90 -14 176 -2" stroke="#3A362C" strokeWidth={3} fill="none" opacity={0.5} />
          <path d="M 690 556 q 70 10 150 0" stroke="#3A362C" strokeWidth={3} fill="none" opacity={0.4} />
          {/* a crumpled label and a twine offcut somebody dropped */}
          <path d="M 44 556 l 15 -8 l 13 6 l -6 11 l -16 3 z" fill="#4E4636" />
          <path d="M 44 556 l 15 -8 l 4 9 z" fill="#665C46" />
          <path d="M 300 552 q 16 -9 30 -1 q 13 8 27 1" stroke="#4A4232" strokeWidth={3} fill="none" />
          {chipMark > 0.02 && (
            <g opacity={chipMark}>
              <ellipse cx={PILL_X + PILL_W / 2} cy={PILL_Y + PILL_H + 6} rx={196} ry={16} fill="#000" opacity={0.3} />
              <path d="M 176 782 l 13 -7 l 7 9 z" fill="#54503F" />
              <path d="M 520 776 l 11 -8 l 9 8 z" fill="#54503F" />
              <path d="M 352 786 l 15 -6 l 4 9 z" fill="#4A4636" />
            </g>
          )}
        </g>

        {/* PLANE 5 — THE ONE LIGHT, swinging on its cord. Pendant + pull-chain + cone +
            floor pool are one rigid group rotating about (LAMP_X, PIVOT_Y): the lit area
            on the concrete never stops travelling, and it swings hardest at the end. */}
        <g transform={`rotate(${sw} ${LAMP_X} ${PIVOT_Y})`}>
          <ellipse cx={640} cy={706} rx={358} ry={110} fill="url(#s6pool)" />
          <polygon points={`${LAMP_X - 28},214 ${LAMP_X + 28},214 ${LAMP_X + 360},792 ${LAMP_X - 362},792`} fill="url(#s6cone)" style={{ mixBlendMode: "screen" }} />
          <rect x={LAMP_X - 2} y={PIVOT_Y} width={4} height={128} fill="#241708" />
          <path d={`M ${LAMP_X - SHADE_W / 2} 205 L ${LAMP_X + SHADE_W / 2} 205 L ${LAMP_X + SHADE_W / 2 - 13} 167 L ${LAMP_X - SHADE_W / 2 + 13} 167 Z`} fill="#4E3818" />
          <path d={`M ${LAMP_X - SHADE_W / 2 + 13} 167 L ${LAMP_X + SHADE_W / 2 - 13} 167 L ${LAMP_X + SHADE_W / 2 - 13} 174 L ${LAMP_X - SHADE_W / 2 + 13} 174 Z`} fill="#7C5A2A" />
          <rect x={LAMP_X - SHADE_W / 2} y={202} width={SHADE_W} height={4} fill="#E0B265" opacity={0.9} />
          {/* AMBIENT: the pull-chain, hanging off the shade and always a beat behind it */}
          <g transform={`rotate(${cordLag} ${LAMP_X + 24} 203)`}>
            <rect x={LAMP_X + 23} y={203} width={2} height={86} fill="#2A1C0A" />
            {[0, 1, 2, 3, 4, 5, 6].map((i) => (
              <circle key={`s6pc${i}`} cx={LAMP_X + 24} cy={210 + i * 12} r={2.4} fill="#6A5024" opacity={0.75} />
            ))}
            <circle cx={LAMP_X + 24} cy={296} r={6} fill="none" stroke="#6A5024" strokeWidth={3} />
          </g>
          <ellipse cx={LAMP_X} cy={212} rx={14} ry={11} fill="#FFF7DE" opacity={Math.min(1, bulb)} />
          <ellipse cx={LAMP_X} cy={212} rx={48 + flare * 46} ry={39 + flare * 38} fill="#FFC469" opacity={0.26 + flare * 0.7} />
        </g>

        {/* ============ PLANE 4b — THE RIGHT WALL: shelving with numbered boxes, a hook
             rail of swinging tags, the twine spool and a clipboard. All of it BEHIND the
             bench and dimmer than the bench top, so it never competes. ============ */}
        <g>
          <rect x={SHF_X - 4} y={SHF_Y} width={SHF_W + 8} height={SHELF_Y[2] - SHF_Y + 10} fill="#1B1305" />
          {SHELF_Y.map((sy, r) => (
            <g key={`s6sh${r}`}>
              {[0, 1, 2].map((c) => {
                const n = r * 3 + c;
                if (n > 7) return null;
                const s = seed(n * 3.1 + 2);
                const out = c === 2 && r === 1 ? boxOut * 9 : 0;
                const tilt = (s - 0.5) * 5;
                return (
                  <g key={`s6bx${n}`} transform={`translate(${SHF_X + 4 + c * 47 + out} ${sy - 42}) rotate(${tilt} 20 42)`}>
                    <rect x={0} y={0} width={42} height={42} fill="#39280F" />
                    <rect x={0} y={0} width={42} height={5} fill="#5C431B" />
                    <rect x={0} y={22} width={42} height={3} fill="#241708" />
                    <rect x={7} y={9} width={26} height={13} rx={2} fill="#9C8F6E" opacity={0.85} />
                    <text x={11} y={19} fontFamily={inter.fontFamily} fontWeight={800} fontSize={10} fill="#2A2216">
                      {BOX_NUM[n % 5]}
                    </text>
                  </g>
                );
              })}
              <rect x={SHF_X - 4} y={sy} width={SHF_W + 8} height={8} fill="#4A3517" />
              <rect x={SHF_X - 4} y={sy} width={SHF_W + 8} height={3} fill="#6A5024" />
            </g>
          ))}
          {/* a rolled bundle and a tin left on the top shelf */}
          <rect x={SHF_X + 100} y={SHELF_Y[0] - 20} width={44} height={20} rx={9} fill="#5E5238" />
          <rect x={SHF_X + 100} y={SHELF_Y[0] - 20} width={44} height={5} rx={3} fill="#7D6E4C" />
          {/* the shelf pilot — the only thing that lights at the end, and it is tiny */}
          <circle cx={SHF_X + 8} cy={SHELF_Y[2] - 10} r={4} fill={GOLD} opacity={pilotBlink + pilotOn * 0.6} />

          {/* the hook rail — four blank shipping tags, all swaying, one shaken loose */}
          <rect x={SHF_X - 4} y={HOOK_Y} width={SHF_W + 8} height={7} rx={3} fill="#3E382E" />
          <rect x={SHF_X - 4} y={HOOK_Y} width={SHF_W + 8} height={2} rx={1} fill="#8A8070" />
          {[0, 1, 2, 3].map((i) => {
            const tx = SHF_X + 14 + i * 36;
            const a = Math.sin(lf / (7.2 + i * 0.8) + i * 1.3) * (2.4 + i * 0.5) + gust * (3 + i);
            const gone = i === 2 ? tagDown : 0;
            return (
              <g key={`s6tg${i}`} transform={`translate(${tx + gone * 16} ${HOOK_Y + 7 + gone * 118}) rotate(${a * (1 - gone) + gone * 78})`}>
                <path d="M -2 0 q 6 -6 10 0" stroke="#6A6053" strokeWidth={3} fill="none" />
                <path d="M 0 4 l 16 0 l 0 22 l -8 6 l -8 -6 z" fill="#8A7C5C" />
                <path d="M 0 4 l 16 0 l 0 4 l -16 0 z" fill="#A89A78" />
                <rect x={4} y={13} width={9} height={2} fill="#5B4F38" />
              </g>
            );
          })}

          {/* the twine spool, always turning, its slack running down to the parcel */}
          <path d={`M ${SPOOL_X + 12} ${SPOOL_Y + 6} q 34 26 62 34`} stroke="#8A7C5C" strokeWidth={3} fill="none" opacity={0.75} />
          <g transform={`rotate(${spoolRot} ${SPOOL_X} ${SPOOL_Y})`}>
            <circle cx={SPOOL_X} cy={SPOOL_Y} r={SPOOL_R} fill="#7A6B4C" />
            <circle cx={SPOOL_X} cy={SPOOL_Y} r={SPOOL_R} fill="none" stroke="#5B4F38" strokeWidth={2} />
            <path d={`M ${SPOOL_X - SPOOL_R} ${SPOOL_Y} a ${SPOOL_R} ${SPOOL_R} 0 0 1 ${SPOOL_R * 2} 0`} stroke="#9C8F6E" strokeWidth={3} fill="none" />
            <circle cx={SPOOL_X} cy={SPOOL_Y} r={4} fill="#2C1F0C" />
          </g>
          <rect x={SPOOL_X - 3} y={SPOOL_Y - 26} width={6} height={26} fill="#3E382E" />

          {/* a clipboard on a nail, its top docket lifting in the draught */}
          <g transform={`translate(${SHF_X + 96} 396)`}>
            <rect x={0} y={0} width={46} height={56} rx={3} fill="#2E2109" />
            <rect x={4} y={8} width={38} height={44} fill="#7A6D50" />
            <g transform={`rotate(${-clip} 4 10)`}>
              <rect x={4} y={8} width={38} height={20} fill="#8A7C5C" />
              <g filter="url(#s6soft)">
                <rect x={9} y={13} width={22} height={4} rx={2} fill="#5B4F38" />
                <rect x={9} y={20} width={16} height={4} rx={2} fill="#6B5F45" />
              </g>
            </g>
            <rect x={12} y={-4} width={22} height={9} rx={2} fill="#655B4E" />
          </g>
        </g>

        {/* PLANE 4 — the DISPATCH BENCH */}
        <polygon points={`${BENCH_X},${BENCH_TOP} 1012,${BENCH_TOP} 1012,${BENCH_TOP + 34} ${BENCH_X - 26},${BENCH_TOP + 34}`} fill="url(#s6benchtop)" />
        <rect x={BENCH_X - 26} y={BENCH_TOP + 32} width={1038 - BENCH_X} height={7} fill="#A57C42" />
        <rect x={BENCH_X - 26} y={BENCH_TOP + 39} width={1038 - BENCH_X} height={62} fill="#33240F" />
        <rect x={BENCH_X - 26} y={BENCH_TOP + 39} width={1038 - BENCH_X} height={5} fill="#4A3517" />
        {/* the front edge is chipped and taped from twenty years of parcels */}
        <rect x={620} y={BENCH_TOP + 33} width={54} height={6} fill="#6E5028" opacity={0.9} />
        <rect x={880} y={BENCH_TOP + 33} width={38} height={6} fill="#6E5028" opacity={0.7} />
        <rect x={700} y={BENCH_TOP + 46} width={62} height={9} fill="#4A3517" opacity={0.6} />
        <rect x={604} y={BENCH_TOP + 101} width={24} height={BENCH_BASE - BENCH_TOP - 101} fill="#1E1408" />
        <rect x={936} y={BENCH_TOP + 101} width={24} height={BENCH_BASE - BENCH_TOP - 101} fill="#1E1408" />
        <ellipse cx={800} cy={BENCH_BASE + 4} rx={230} ry={20} fill="#0A0502" opacity={0.55} />

        {/* ---- ON THE BENCH: the brass parcel scale, the service bell, a wrapped
             parcel, and (left of the chart) the spike file. Everything here reacts to
             the beats, and two things are permanently different by the last frame. ---- */}
        {/* the scale — its needle twitches all scene and slams on every impact */}
        <g>
          <rect x={SCALE_X} y={BENCH_TOP - 7} width={SCALE_W} height={7} rx={2} fill="#4A3A18" />
          <rect x={SCALE_X + 21} y={SCALE_TOP + 14} width={8} height={BENCH_TOP - SCALE_TOP - 21} fill="url(#s6brass)" />
          <rect x={SCALE_X} y={SCALE_TOP} width={SCALE_W} height={16} rx={7} fill="#54421C" />
          <rect x={SCALE_X + 2} y={SCALE_TOP + 2} width={SCALE_W - 4} height={5} rx={2} fill="#A5843C" opacity={0.8} />
          <g transform={`rotate(${needle} ${SCALE_X + 25} ${SCALE_TOP + 13})`}>
            <rect x={SCALE_X + 24} y={SCALE_TOP + 1} width={2} height={13} fill="#E7D2A0" />
          </g>
          <path d={`M ${SCALE_X + 6} ${SCALE_TOP + 16} l 0 12 M ${SCALE_X + 44} ${SCALE_TOP + 16} l 0 12`} stroke="#4A3A18" strokeWidth={2} />
          <rect x={SCALE_X + 2} y={SCALE_TOP + 28} width={46} height={6} rx={2} fill="#7A6128" />
          <rect x={SCALE_X + 2} y={SCALE_TOP + 28} width={46} height={2} rx={1} fill="#B4923F" />
        </g>
        {/* the service bell — it hops and RINGS on the slab landing and on the strike */}
        <g transform={`translate(0 ${-Math.abs(hit1) * 7 - Math.abs(hit2) * 5})`}>
          <ellipse cx={BELL_CX} cy={BENCH_TOP - 1} rx={BELL_D / 2 + 2} ry={4} fill="#3E2E12" />
          <path d={`M ${BELL_CX - BELL_D / 2} ${BENCH_TOP - 3} a ${BELL_D / 2} ${BELL_D / 2} 0 0 1 ${BELL_D} 0 z`} fill="#7A6128" />
          <path d={`M ${BELL_CX - BELL_D / 2 + 4} ${BENCH_TOP - 8} a ${BELL_D / 2 - 5} ${BELL_D / 2 - 5} 0 0 1 8 -6`} stroke="#D8B463" strokeWidth={3} fill="none" />
          <rect x={BELL_CX - 2} y={BENCH_TOP - BELL_D / 2 - 8} width={4} height={7} fill="#54421C" />
        </g>
        {(Math.abs(hit1) > 0.12 || Math.abs(hit2) > 0.12) && (
          <g opacity={Math.min(0.55, Math.abs(hit1) * 0.5 + Math.abs(hit2) * 0.4)}>
            <path d={`M ${BELL_CX - 22} ${BENCH_TOP - 22} q -8 8 0 16`} stroke="#D8B463" strokeWidth={2} fill="none" />
            <path d={`M ${BELL_CX + 22} ${BENCH_TOP - 22} q 8 8 0 16`} stroke="#D8B463" strokeWidth={2} fill="none" />
          </g>
        )}
        {/* the wrapped parcel — twine cross, a blank label, and it JUMPS on the strike */}
        <g transform={`translate(0 ${-Math.abs(hit2) * 9})`}>
          <rect x={PCL_X} y={BENCH_TOP - PCL_H} width={PCL_W} height={PCL_H} fill="#5E4722" />
          <rect x={PCL_X} y={BENCH_TOP - PCL_H} width={PCL_W} height={6} fill="#8A6636" />
          <rect x={PCL_X + PCL_W / 2 - 3} y={BENCH_TOP - PCL_H} width={5} height={PCL_H} fill="#B9AC8C" opacity={0.7} />
          <rect x={PCL_X} y={BENCH_TOP - PCL_H / 2 - 2} width={PCL_W} height={5} fill="#B9AC8C" opacity={0.6} />
          <rect x={PCL_X + 6} y={BENCH_TOP - PCL_H + 11} width={22} height={13} rx={2} fill="#B9AC8C" />
          <rect x={PCL_X + 9} y={BENCH_TOP - PCL_H + 15} width={14} height={3} fill="#5B4F38" />
        </g>
        {/* the spike file — six impaled dockets, the top one flutters, and beat A's
             draught takes one off it. It stays lying on the bench for the rest of the reel. */}
        <g>
          <ellipse cx={SPK_X + 9} cy={SPK_BASE - 2} rx={15} ry={5} fill="#3E2E12" />
          <rect x={SPK_X + 1} y={SPK_BASE - 7} width={17} height={6} rx={2} fill="#655B4E" />
          <rect x={SPK_X + 8} y={SPK_BASE - 44} width={3} height={38} fill="#A2957F" />
          {[0, 1, 2, 3, 4].map((i) => {
            const a = -8 + i * 5 + (i === 4 ? Math.sin(lf / 4.1) * 4 + gust * 6 : 0);
            return (
              <g key={`s6sp${i}`} transform={`rotate(${a} ${SPK_X + 9} ${SPK_BASE - 8})`}>
                <rect x={SPK_X - 3} y={SPK_BASE - 12 - i * 5} width={25} height={11} fill="#8A7C5C" opacity={0.92} />
                <rect x={SPK_X - 3} y={SPK_BASE - 12 - i * 5} width={25} height={3} fill="#A89A78" />
              </g>
            );
          })}
          <g transform={`translate(${-6 - lostDocket * 22} ${lostDocket * 34}) rotate(${lostDocket * 82} ${SPK_X + 9} ${SPK_BASE - 30})`}
             opacity={lostDocket > 0.02 ? 1 : 0}>
            <rect x={SPK_X - 3} y={SPK_BASE - 38} width={25} height={11} fill="#7A6D50" />
            <rect x={SPK_X - 3} y={SPK_BASE - 38} width={25} height={3} fill="#9C8F6E" />
          </g>
        </g>

        {/* the hero's cast shadow — he stands LEFT of the lamp, so it lays left-down */}
        <ellipse cx={214} cy={GY + 10} rx={152} ry={26} fill="#080604" opacity={0.42} />

        {/* ===== THE RANKED GUIDE — hung from the rack rail, running off the frame ===== */}
        <g transform={`rotate(${flex} ${SH_X + SH_W / 2} ${SH_Y})`}>
          {/* the sheet throws its shadow right-down, away from the pendant */}
          <polygon points={`${SH_X + SH_W},206 ${SH_X + SH_W + 44},224 ${SH_X + SH_W + 44},792 ${SH_X + SH_W},792`} fill="#0A0502" opacity={0.4} />
          {/* the rail it hangs from + two clips */}
          <rect x={556} y={RAIL_Y - 6} width={348} height={10} rx={3} fill="#3E382E" />
          <rect x={556} y={RAIL_Y - 6} width={348} height={3} rx={2} fill="#8A8070" />
          <rect x={632} y={180} width={26} height={44} rx={5} fill="#2C2820" />
          <rect x={794} y={180} width={26} height={44} rx={5} fill="#2C2820" />
          {/* the paper */}
          <rect x={SH_X} y={SH_Y} width={SH_W} height={SH_BOT - SH_Y} fill="url(#s6paper)" />
          <rect x={SH_X} y={SH_Y} width={SH_W} height={6} fill="#FFFBF0" opacity={0.55} />
          <rect x={SH_X} y={SH_Y} width={3} height={SH_BOT - SH_Y} fill="#7C6B4C" opacity={0.5} />
          <rect x={SH_X + SH_W - 3} y={SH_Y} width={3} height={SH_BOT - SH_Y} fill="#5E5137" opacity={0.6} />

          <g clipPath="url(#s6sheet)">
            {/* header: the COUNT — this is all 50, not six things */}
            <rect x={612} y={216} width={86} height={56} rx={10} fill={CLAY} />
            <rect x={612} y={216} width={86} height={7} rx={4} fill="#EE9C79" />
            <text x={655} y={259} textAnchor="middle" fontFamily={fraunces.fontFamily} fontWeight={900} fontSize={40} fill={CREAM}>50</text>
            {/* the guide's own title, blurred like everything we trade for the comment */}
            <g filter="url(#s6soft)">
              <rect x={712} y={226} width={122} height={14} rx={4} fill="#463A28" />
              <rect x={712} y={248} width={78} height={9} rx={3} fill="#645640" />
            </g>
            <rect x={612} y={282} width={226} height={3} fill={GOLD} opacity={0.9} />
          </g>

          {/* the ranked rows — every tip line REDACTED, the rank numerals sharp.
              The band SCROLLS the whole scene (continuous mover 2) and the list runs
              straight off the bottom edge of the frame. */}
          <g clipPath="url(#s6rows)">
            {Array.from({ length: NVIS }, (_, i) => {
              const idx = rowBase + i;
              const y = ROW0 + i * ROWP - rowOff;
              const on = y < barY - 6;
              const w1 = 30 + Math.round(seed(idx * 3 + 1) * 24);
              const w2 = 22 + Math.round(seed(idx * 5 + 2) * 20);
              const w3 = 16 + Math.round(seed(idx * 7 + 3) * 16);
              return (
                <g key={`s6r${i}`}>
                  {on && <rect x={SH_X + 8} y={y - 2} width={SH_W - 16} height={20} rx={4} fill={GOLD} opacity={0.17} />}
                  <g filter="url(#s6soft)" opacity={on ? 1 : 0.28}>
                    <rect x={656} y={y + 5} width={w1} height={8} rx={3} fill="#463A28" />
                    <rect x={656 + w1 + 9} y={y + 5} width={w2} height={8} rx={3} fill="#53452C" />
                    <rect x={656 + w1 + w2 + 18} y={y + 5} width={w3} height={8} rx={3} fill="#645640" />
                  </g>
                  <text x={612} y={y + 16} fontFamily={fraunces.fontFamily} fontWeight={900} fontSize={17}
                        fill="#2A2216" opacity={on ? 1 : 0.2}>
                    {String((idx % 50) + 1).padStart(2, "0")}
                  </text>
                  {on && (
                    <path d={`M ${SH_X + SH_W - 34} ${y + 9} l 6 7 l 13 -15`} stroke="#B9821F" strokeWidth={4}
                          fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  )}
                </g>
              );
            })}

            {/* BEAT B — the full-height sweep bar: 500px of travel down the whole list */}
            {swp > 0.001 && swp < 0.999 && (
              <g>
                <rect x={SH_X} y={barY - 78} width={SH_W} height={78} fill="url(#s6sweep)" />
                <rect x={SH_X} y={barY - 8} width={SH_W} height={8} fill="#FFF3D2" opacity={0.95} />
                <rect x={SH_X - 14} y={barY - 3} width={SH_W + 28} height={3} fill={GOLD} opacity={0.85} />
              </g>
            )}
          </g>

          {/* the embossed impression the seal leaves behind when it lifts off */}
          {fly > 0.02 && (
            <g opacity={0.5 * fly}>
              <circle cx={SEAL_CX} cy={SEAL_CY} r={SEAL_D / 2} fill="none" stroke="#8A6A2A" strokeWidth={5} />
              <circle cx={SEAL_CX} cy={SEAL_CY} r={SEAL_D / 2 - 12} fill="none" stroke="#A98C4E" strokeWidth={2} />
            </g>
          )}
        </g>

        {/* ===== the KRAFT WRAPPER — beat A: a 380x700 sheet yanked DOWN-LEFT, right
             across the panel and out of frame. He is left of the chart, so the pull
             reads as his. ===== */}
        {uA < 0.995 && (
          <g transform={`translate(${-uA * 1010} ${uA * 250}) rotate(${-uA * 44} 726 420)`}>
            <rect x={560} y={96} width={380} height={700} rx={10} fill="url(#s6kraft)" />
            <rect x={560} y={96} width={380} height={13} fill="#C9A268" opacity={0.7} />
            <path d="M 600 100 L 660 790" stroke="#6B5027" strokeWidth={4} opacity={0.5} fill="none" />
            <path d="M 906 100 L 848 790" stroke="#6B5027" strokeWidth={4} opacity={0.4} fill="none" />
            <rect x={716} y={96} width={30} height={700} fill="#5E4722" />
            <rect x={560} y={392} width={380} height={26} fill="#5E4722" />
            <rect x={706} y={378} width={54} height={54} rx={10} fill="#7A5D2C" />
            <rect x={706} y={378} width={54} height={10} rx={4} fill="#9A7A3E" />
          </g>
        )}

        {/* the clay sign's own cast shadow on the concrete — left-down, away from the lamp */}
        <ellipse cx={244} cy={712} rx={232} ry={26} fill="#080604" opacity={0.5} />

        {/* ===== PLANE 1 — the NEAR FOREGROUND, soft, cropping three edges =====
             bottom-right: a pallet of wrapped parcels waiting to go out;
             top corners: the roof joists, a duct, an extractor fan and a hook chain. */}
        <g filter="url(#s6fg)">
          <rect x={856} y={636} width={206} height={62} fill="#150E05" />
          <rect x={856} y={636} width={206} height={7} fill="#3A2A12" opacity={0.8} />
          <rect x={922} y={636} width={7} height={62} fill="#2E2109" />
          <rect x={856} y={664} width={206} height={5} fill="#2E2109" />
          <rect x={872} y={698} width={190} height={64} fill="#100A04" />
          <rect x={872} y={698} width={190} height={6} fill="#33240E" opacity={0.8} />
          <rect x={952} y={698} width={7} height={64} fill="#241708" />
          <rect x={890} y={712} width={46} height={26} rx={2} fill="#241708" />
          <rect x={856} y={762} width={206} height={12} fill="#0C0703" />
          <rect x={856} y={776} width={206} height={16} fill="#120C05" />
          {/* the overhead structure */}
          <polygon points="-10,44 196,58 196,98 -10,96" fill="#100A04" />
          <rect x={-10} y={104} width={200} height={11} fill="#1B1206" />
          <rect x={62} y={98} width={10} height={12} fill="#241708" />
          <rect x={150} y={98} width={10} height={12} fill="#241708" />
          <path d="M 168 115 q 22 22 4 46" stroke="#1B1206" strokeWidth={7} fill="none" />
          {/* the louvre fan, turning slowly in the corner */}
          <rect x={18} y={112} width={88} height={66} rx={5} fill="#150E05" />
          <rect x={18} y={112} width={88} height={5} rx={2} fill="#33240E" />
          <g transform={`rotate(${fanRot} 62 145)`}>
            {[0, 1, 2, 3].map((i) => (
              <rect key={`s6fn${i}`} x={60} y={120} width={5} height={50} rx={2} fill="#2E2109"
                    transform={`rotate(${i * 45} 62 145)`} />
            ))}
          </g>
          <circle cx={62} cy={145} r={9} fill="#1B1206" />
          <polygon points="816,54 1022,40 1022,90 816,100" fill="#100A04" />
          <rect x={844} y={100} width={178} height={26} fill="#160F06" />
          <rect x={844} y={100} width={178} height={4} fill="#2E2109" />
          {[0, 1, 2, 3].map((i) => (
            <rect key={`s6dt${i}`} x={856 + i * 42} y={100} width={5} height={26} fill="#0C0703" />
          ))}
          <g transform={`rotate(${chainSw} 946 126)`}>
            <rect x={944} y={126} width={4} height={62} fill="#1B1206" />
            {[0, 1, 2, 3].map((i) => (
              <rect key={`s6ch${i}`} x={941} y={130 + i * 14} width={10} height={9} rx={4} fill="none" stroke="#2E2109" strokeWidth={3} />
            ))}
            <path d="M 940 188 q 6 16 14 4" stroke="#2E2109" strokeWidth={6} fill="none" />
          </g>
        </g>
      </svg>

      {/* ================= THE TESTER — co-lead, full H, key lifted so he reads
           lighter than the concrete he stands on (⛔ no stern: gaze + posture only) */}
      <div style={{ position: "absolute", left: 0, top: 0, width: 1012, height: 792, zIndex: 12, filter: "brightness(1.17) saturate(1.05)", pointerEvents: "none" }}>
        <Actor
          lf={lf}
          x={292}
          groundY={GY}
          size={H}
          nodAmp={1.8}
          nodSpeed={11}
          coat={1}
          gaze={gaze}
          cheer={cheerV}
          pin={lf < 26 || armUp ? 1 : 0}
          z={12}
        />
      </div>

      {/* the long-handled dispatch BRAND, anchored in his right hand.
          zIndex 20 = over the sprite, UNDER the clay sign, so at rest its head tucks
          behind the sign instead of crossing the pendant. 236px swung through 84 deg
          is the biggest single mover between the slab landing and the seal. */}
      <svg viewBox="0 0 1012 792" width={1012} height={792} style={{ position: "absolute", left: 0, top: 0, zIndex: 20, pointerEvents: "none", overflow: "visible" }}>
        <g transform={`translate(${handX} ${handY}) rotate(${ironAng})`}>
          <rect x={-10} y={-9} width={52} height={18} rx={7} fill="#6E5030" />
          <rect x={-10} y={-9} width={52} height={5} rx={2} fill="#9C7745" />
          <rect x={42} y={-4} width={IRON_L - 70} height={8} fill="#655B4E" />
          <rect x={42} y={-4} width={IRON_L - 74} height={3} fill="#A2957F" />
          <rect x={IRON_L - 34} y={-11} width={10} height={22} rx={2} fill="#463E33" />
          <rect x={IRON_L - 26} y={-IRON_HD / 2} width={24} height={IRON_HD} rx={3} fill="#3B342B" />
          <rect x={IRON_L - 26} y={-IRON_HD / 2} width={24} height={5} rx={2} fill="#6A6053" />
          <rect x={IRON_L - 5} y={-IRON_HD / 2 + 5} width={7} height={IRON_HD - 10} rx={2} fill={GOLD} opacity={0.94} />
        </g>
      </svg>

      {/* ================= THE CLAY KEYWORD SIGN — the dominant object ================= */}
      <div
        style={{
          position: "absolute", left: SIGN_X, top: SIGN_Y, width: SIGN_W, height: SIGN_H,
          boxSizing: "border-box", zIndex: 24,
          transform: `rotate(-1.4deg) scale(${wS}) translateX(${wShake}px)`, transformOrigin: "50% 100%",
          borderRadius: 16,
          background: `linear-gradient(202deg, #E98A62 0%, ${CLAY} 48%, #9F4527 100%)`,
          border: "6px solid #F3D3C1",
          boxShadow: "0 26px 46px rgba(0,0,0,0.62), inset 0 5px 0 rgba(255,255,255,0.20)",
          display: "flex", alignItems: "center", justifyContent: "flex-end", paddingRight: 32,
          overflow: "hidden",
        }}
      >
        <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 88, lineHeight: 1, color: CREAM, letterSpacing: 3, whiteSpace: "nowrap", textShadow: "0 3px 0 rgba(116,42,18,0.55)" }}>TESTED</span>
      </div>

      {/* ================= the COMMENT SLAB — beat C, a 415x72 board dropped a full
           frame-height onto the concrete under the sign, then filled left-to-right ==== */}
      <div
        style={{
          position: "absolute", left: PILL_X, top: PILL_Y + dropY, width: PILL_W, height: PILL_H,
          boxSizing: "border-box", borderRadius: 12, background: `linear-gradient(180deg, #2A251E, ${INK})`,
          boxShadow: "0 16px 32px rgba(0,0,0,0.6)", borderLeft: `10px solid ${CLAY}`, zIndex: 56,
          overflow: "hidden",
        }}
      >
        {/* the fill wipe — a wide clay-to-gold band sweeping the whole slab */}
        <div style={{ position: "absolute", left: 0, top: 0, width: fillW, height: PILL_H, background: `linear-gradient(90deg, rgba(210,114,78,0.55), rgba(231,178,76,0.32))` }} />
        {fillW > 4 && fillW < PILL_W - 2 && (
          <div style={{ position: "absolute", left: fillW - 12, top: 0, width: 12, height: PILL_H, background: "#FFE7B4", opacity: 0.8 }} />
        )}
        <div style={{ position: "absolute", left: 2, top: PILL_H - 8, width: 0, height: 0, borderTop: `19px solid ${INK}`, borderRight: "21px solid transparent" }} />
        {KEY.map((c, i) => {
          const t0 = 49 + i * 2.6;
          if (typed <= i) return null;
          const pop = 1 + 0.7 * Math.max(0, 1 - (lf - t0) / 3);
          return (
            <div
              key={`s6k${i}`}
              style={{
                position: "absolute", left: 52 + i * 48, top: 10, width: 42, textAlign: "center",
                fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 46, color: CREAM,
                transform: `scale(${pop})`, transformOrigin: "50% 60%",
              }}
            >
              {c}
            </div>
          );
        })}
        <div style={{ position: "absolute", left: 56 + typed * 48, top: 12, width: 11, height: 46, background: CREAM, opacity: lf % 16 < 9 ? 0.95 : 0.15 }} />
      </div>

      {/* dust turning in the pendant cone — texture only, never the event; it speeds up
          with the light as the scene escalates, and a second, slower drift runs deeper
          in the aisle so the air itself is never still */}
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((i) => {
        const s = seed(i * 4.7 + 3);
        const near = i < 8;
        const sp = (0.6 + s * 0.8) * (1 + 1.1 * ramp(lf, 40, 100)) * (near ? 1 : 0.45);
        const span = near ? 320 : 210;
        const y = (near ? 560 : 452) - (((lf * sp + s * span) % span));
        return (
          <div
            key={`s6d${i}`}
            style={{
              position: "absolute",
              left: near ? 330 + s * 330 + Math.sin(lf / 20 + i) * 9 + sw * 5
                         : 452 + s * 148 + Math.sin(lf / 26 + i) * 6,
              top: y,
              width: near ? 4 : 3, height: near ? 4 : 3, borderRadius: "50%", background: "#FFE0A8",
              opacity: (near ? 0.20 + s * 0.24 : 0.12 + s * 0.12), zIndex: 8,
            }}
          />
        );
      })}

      {/* one soft warm vignette, centred on the lamp — no ids, so nothing can collide */}
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(88% 76% at 46% 52%, rgba(0,0,0,0) 40%, rgba(10,6,2,0.62) 100%)", zIndex: 46, pointerEvents: "none" }} />

      {/* ===== BEAT E — the warm light BLOOMS out of the signed keyword, growing to
           the last frame so the reel never cuts on a still image ===== */}
      {bloom > 0.01 && (
        <div
          style={{
            position: "absolute", inset: 0, zIndex: 58, pointerEvents: "none", mixBlendMode: "screen",
            background: `radial-gradient(${44 + bloom * 54}% ${40 + bloom * 46}% at 24% 74%, rgba(255,216,146,${0.40 * bloom}) 0%, rgba(255,176,84,${0.18 * bloom}) 44%, rgba(0,0,0,0) 74%)`,
          }}
        />
      )}

      {/* gold motes lifting off the signed sign — launched on the landing, still rising
          when the scene ends */}
      {lf > 91 && Array.from({ length: 14 }, (_, i) => {
        const s = seed(i * 6.1 + 9);
        const t = (lf - 92 - i * 0.45) / 16;
        if (t <= 0) return null;
        const sz = 5 + s * 7;
        return (
          <div
            key={`s6m${i}`}
            style={{
              position: "absolute", left: 108 + s * 440 + Math.sin(lf / 7 + i) * 12,
              top: 690 - t * (210 + s * 150), width: sz, height: sz, borderRadius: "50%",
              background: "#FFD98A", opacity: Math.max(0, 0.85 - t * 0.7), zIndex: 60,
            }}
          />
        );
      })}

      {/* the dust the impacts shake loose — small, dim, and it settles on its own */}
      {jolt > 0.06 && Array.from({ length: 9 }, (_, i) => {
        const s = seed(i * 8.3 + 17);
        return (
          <div
            key={`s6j${i}`}
            style={{
              position: "absolute", left: 150 + s * 420, top: 700 - jolt * (30 + s * 90),
              width: 3 + s * 3, height: 3 + s * 3, borderRadius: "50%", background: "#C9B48A",
              opacity: Math.min(0.4, jolt * 0.5) * (0.4 + s * 0.6), zIndex: 44,
            }}
          />
        );
      })}

      {/* ===== the GOLD SEAL — slams onto the chart (D), then flies the width of the
           panel onto the clay sign (E). The landing ring blows past the frame edge. ==== */}
      <svg viewBox="0 0 1012 792" width={1012} height={792} style={{ position: "absolute", left: 0, top: 0, zIndex: 62, pointerEvents: "none", overflow: "visible" }}>
        {slabRing > 0.01 && slabRing < 1 && (
          <ellipse cx={PILL_X + PILL_W / 2} cy={PILL_Y + PILL_H} rx={70 + slabRing * 330} ry={12 + slabRing * 46}
                   fill="none" stroke="#C9A76A" strokeWidth={2 + 12 * (1 - slabRing)} opacity={(1 - slabRing) * 0.5} />
        )}
        {ringT > 0.01 && ringT < 1 && (
          <circle cx={SEAL_CX} cy={SEAL_CY} r={48 + ringT * 240} fill="none" stroke={GOLD} strokeWidth={2 + 14 * (1 - ringT)} opacity={(1 - ringT) * 0.55} />
        )}
        {landRing > 0.01 && landRing < 1 && (
          <>
            <circle cx={LAND_X} cy={LAND_Y} r={30 + landRing * 860} fill="none" stroke={GOLD}
                    strokeWidth={Math.max(3, 30 - landRing * 27)} opacity={(1 - landRing) * 0.7} />
            <circle cx={LAND_X} cy={LAND_Y} r={14 + landRing * 520} fill="none" stroke="#FFF0C6"
                    strokeWidth={Math.max(2, 14 - landRing * 12)} opacity={(1 - landRing) * 0.5} />
          </>
        )}
        {sealOp > 0.01 && (
          <g opacity={sealOp} transform={`translate(${sealX} ${sealY}) rotate(${sealRot}) scale(${sealSc})`}>
            <circle cx={0} cy={0} r={SEAL_D / 2 + 11} fill={GOLD} opacity={0.18} />
            <circle cx={0} cy={0} r={SEAL_D / 2} fill="#F6DFA4" opacity={0.14} />
            <circle cx={0} cy={0} r={SEAL_D / 2} fill="none" stroke="#B9821F" strokeWidth={8} opacity={0.96} />
            <circle cx={0} cy={0} r={SEAL_D / 2 - 13} fill="none" stroke={GOLD} strokeWidth={3} />
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((k) => (
              <rect key={`s6t${k}`} x={-2.5} y={-SEAL_D / 2 + 4} width={5} height={6} fill="#B9821F" transform={`rotate(${(k / 12) * 360})`} />
            ))}
            <path d="M -25 3 L -7 23 L 27 -23" fill="none" stroke={GOLD} strokeWidth={13} strokeLinecap="round" strokeLinejoin="round" />
          </g>
        )}
      </svg>
    </>
  );
};
