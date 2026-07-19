import React from "react";
import { fraunces, inter } from "./fonts";
import { CLAY, INK, mono, seed, Bloom, Dust, Mascot as HouseMascot } from "./CarouselConcepts";
import { Mascot as PkMascot } from "./ClaudePokeballReel";
import { SceneCover, cropProof } from "./ReelCovers";

/* ==========================================================================
   ⛔⛔ DRAW, DON'T STACK — real SVG path geometry, not piles of divs.
   ---------------------------------------------------------------------------
   Alex on the first pass: "the sun image doesn't look good, it looks low
   quality... same with the yes man slide, the graphics for those don't look
   good." He was right, and it is a documented house failure I failed to put in
   the build contract: stacked CSS divs CANNOT draw a recognisable object.
   The sun was a CSS circle ringed by 12 DETACHED rounded rectangles pushed out
   to translateX(88px) from a 76px body — twelve px of daylight between the body
   and every ray, so it read as a blob surrounded by floating tic-tacs. The
   "impact bursts" were the same trick and read as scattered pills.
   Rebuilt below as ONE inline <svg> each, with rays that ORIGINATE INSIDE the
   body and a star drawn as a single closed path. Shading is four deliberate
   values (base + one shade + one highlight + contour), never six stacked
   gradients. One light direction throughout these scenes: upper-left.
   ========================================================================== */

const SunSvg: React.FC<{ cx: number; cy: number; r: number; uid: string; face?: boolean }> = ({ cx, cy, r, uid, face = true }) => {
  const N = 12, C = 200, BODY = 96, IN = 74, OUT = 178, HW = 9.5;
  const rad = (d: number) => (d * Math.PI) / 180;
  const pt = (a: number, rr: number) => `${(C + rr * Math.cos(rad(a))).toFixed(1)} ${(C + rr * Math.sin(rad(a))).toFixed(1)}`;
  let rays = "";
  for (let i = 0; i < N; i++) {
    const a = (i * 360) / N - 90;
    rays += `M${pt(a - HW, IN)} L${pt(a, OUT)} L${pt(a + HW, IN)} Z `;
  }
  return (
    <svg width={r * 2} height={r * 2} viewBox="0 0 400 400"
      style={{ position: "absolute", left: cx - r, top: cy - r, overflow: "visible" }}>
      <defs>
        <radialGradient id={`sb${uid}`} cx="36%" cy="30%">
          <stop offset="0%" stopColor="#FFF4D6" />
          <stop offset="48%" stopColor="#F3C462" />
          <stop offset="100%" stopColor="#DFA232" />
        </radialGradient>
        <clipPath id={`sc${uid}`}><circle cx={C} cy={C} r={BODY} /></clipPath>
      </defs>
      {/* rays start INSIDE the body (IN=74 < BODY=96) so they read as attached */}
      <path d={rays} fill="#F0BE55" stroke="#BF8420" strokeWidth={5} strokeLinejoin="round" />
      <circle cx={C} cy={C} r={BODY} fill={`url(#sb${uid})`} stroke="#BF8420" strokeWidth={6} />
      {/* the shade must stay a RIM crescent. At offset (60,66) it covered half
          the face and swallowed the right eye, which read as a bruise. Pushing
          the offset out to (96,104) leaves a thin terminator at the lower-right
          rim and keeps both eyes on lit body. */}
      <g clipPath={`url(#sc${uid})`}>
        <circle cx={C + 96} cy={C + 104} r={BODY} fill="#D8992B" />
      </g>
      <ellipse cx={C - 34} cy={C - 40} rx={26} ry={17} fill="#FFF6DC" transform={`rotate(-24 ${C - 34} ${C - 40})`} />
      {face && (<>
        <ellipse cx={C - 31} cy={C - 2} rx={13} ry={16} fill="#2E2A22" />
        <ellipse cx={C + 31} cy={C - 2} rx={13} ry={16} fill="#2E2A22" />
      </>)}
    </svg>
  );
};

const BurstSvg: React.FC<{ cx: number; cy: number; r: number; c?: string; n?: number }> = ({ cx, cy, r, c = "#E7B24C", n = 10 }) => {
  const C = 100, OUT = 96, IN = 34;
  const rad = (d: number) => (d * Math.PI) / 180;
  let d = "";
  for (let i = 0; i < n * 2; i++) {
    const a = (i * 180) / n - 90;
    const rr = i % 2 === 0 ? OUT : IN;
    d += (i === 0 ? "M" : "L") + `${(C + rr * Math.cos(rad(a))).toFixed(1)} ${(C + rr * Math.sin(rad(a))).toFixed(1)} `;
  }
  return (
    <svg width={r * 2} height={r * 2} viewBox="0 0 200 200"
      style={{ position: "absolute", left: cx - r, top: cy - r, overflow: "visible" }}>
      <path d={d + "Z"} fill={c} />
      <circle cx={C} cy={C} r={15} fill="#FFF6DC" />
    </svg>
  );
};

/* ==========================================================================
   REEL GRID COVERS, SET 3 — 1080x1920, composed for the 4:5 grid tile.
   Same locked header slot as sets 1 and 2 (SceneCover is imported, never
   duplicated). Bespoke full-bleed art per reel; cohesion via typography only.

   ⛔ EVERY COUNTDOWN STRIPPED. BLUEPRINT, CLONE, MINT, CREW and VAULT all
   originally opened on the free-Fable-5 window, which expired 2026-07-12.
   A cover is evergreen, so each leads with the payoff instead of the clock.

   ⚠️ FACTORY and SOL are OpenAI / ChatGPT reels, not Claude. They carry NO
   Claude mascot at all — a drawn sun and crescent moon in ChatGPT teal.
   ⚠️ WORTHY frames a CHECK the viewer runs, never an accusation: the routing
   story behind that reel is unverified and the reel itself hedges it.
   ========================================================================== */


/* ---------- POWERS (reel 47) ----------
   Fourth pass, and the one that came out of a 15-agent audit. The complaint was
   "doesn't look as polished as the other covers", and the measured reason was
   structural: every strong cover in this set depicts a PLACE built around ONE
   dark framed object on a warm page (MINT's browser, CALLBACK's ATS machine).
   POWERS had a sprite and confetti on a bare gradient.
   This stages the reel's CTA payoff INSIDE that house panel — which also fixes
   the contrast problem, since a violet hero on cream had nothing to read against.
   ⛔ Defects the judges caught and this fixes: the numbered 1-5 gem apron (the
   client already killed skill chips once — "those text things that shouldn't be
   there"), the title-strip mono text, a forearm drawn as three colour bands that
   read as two floating bars, a 5th gem in pale cream on a gold plate so the
   count read as four, and a violet page-spill so strong it looked like a smear.
   ONE LIGHT DIRECTION: upper-left, plus the in-panel shaft from top-centre. */

const PwGauntlet: React.FC<{ x: number; y: number; s: number }> = ({ x, y, s }) => (
  <svg width={s} height={(s * 340) / 300} viewBox="0 0 300 340"
    style={{ position: "absolute", left: x, top: y, overflow: "visible" }}>
    {/* four CURLED digits — short and wide, seated on the band, each creased */}
    {[[26, 56], [92, 52], [158, 48], [224, 44]].map(([fx, fy], i) => (
      <g key={i}>
        <rect x={fx} y={fy} width={58} height={124 - fy} rx={20} fill="#E7B24C" stroke="#8E6318" strokeWidth={6} />
        <rect x={fx + 7} y={fy + 7} width={44} height={17} rx={8} fill="#F6DD9E" />
        <rect x={fx + 3} y={fy + 36} width={52} height={7} rx={3} fill="#B5852A" />
        <rect x={fx + 4} y={fy + 26} width={10} height={92 - fy} rx={5} fill="#B5852A" />
      </g>
    ))}
    <rect x={16} y={112} width={268} height={50} rx={15} fill="#F0C264" stroke="#8E6318" strokeWidth={6} />
    <rect x={26} y={120} width={248} height={14} rx={7} fill="#F6DD9E" />
    <path d="M282 124 L300 132 L300 196 L282 190 Z" fill="#DCA53E" stroke="#8E6318" strokeWidth={6} strokeLinejoin="round" />
    <rect x={20} y={154} width={260} height={86} rx={14} fill="#E0AE55" stroke="#8E6318" strokeWidth={6} />
    {/* FIVE gems — the only thing carrying the number.
        ⛔ Gem 5 was #F2E4B0 at size 28: pale cream on a gold plate, so it
        vanished and the count read as FOUR. Now orange at full size. */}
    {([["#9A78D1", 60, 206, 40], ["#4F9DE5", 110, 198, 40], ["#C93E31", 160, 190, 40], ["#35AC78", 210, 182, 40], ["#F0803C", 256, 174, 40]] as [string, number, number, number][]).map(
      ([c, gx, gy, gs], i) => (
        <g key={i} transform={`rotate(45 ${gx} ${gy})`}>
          <rect x={gx - gs / 2} y={gy - gs / 2} width={gs} height={gs} rx={3} fill={c} stroke="#7E5A14" strokeWidth={4} />
          <rect x={gx - gs / 6} y={gy - gs / 6} width={gs / 3} height={gs / 3} rx={2} fill="#FFFFFF" />
        </g>
      )
    )}
    <rect x={24} y={238} width={252} height={32} rx={10} fill="#BD8D35" stroke="#8E6318" strokeWidth={6} />
    <rect x={58} y={268} width={192} height={68} rx={13} fill="#B5852A" stroke="#7E5A14" strokeWidth={6} />
    <rect x={70} y={276} width={168} height={11} rx={5} fill="#D6A85A" />
  </svg>
);

/* ⛔ The forearm was THREE stacked colour bands of similar value, which at grid
   size separated into two floating lavender bars. One solid limb + one narrow
   top highlight, run 190 long so it starts inside the torso and finishes well
   inside the cuff rather than stopping in mid-air. */
const PwForearm: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <svg width={210} height={150} viewBox="0 0 210 150" style={{ position: "absolute", left: x, top: y, overflow: "visible" }}>
    <path d="M0 44 L0 112 L190 66 L190 -2 Z" fill="#9A4FE8" />
    <path d="M0 44 L0 58 L190 12 L190 -2 Z" fill="#C68CF7" />
  </svg>
);

const PwRays: React.FC<{ cx: number; cy: number; r: number; c: string; n?: number }> = ({ cx, cy, r, c, n = 14 }) => {
  const C = 100, OUT = 96, IN = 34;
  const rad = (d: number) => (d * Math.PI) / 180;
  let d = "";
  for (let i = 0; i < n * 2; i++) {
    const ang = (i * 180) / n - 90;
    const rr = i % 2 === 0 ? OUT : IN;
    d += (i === 0 ? "M" : "L") + `${(C + rr * Math.cos(rad(ang))).toFixed(1)} ${(C + rr * Math.sin(rad(ang))).toFixed(1)} `;
  }
  return (
    <svg width={r * 2} height={r * 2} viewBox="0 0 200 200" style={{ position: "absolute", left: cx - r, top: cy - r, overflow: "visible" }}>
      <path d={d + "Z"} fill={c} />
    </svg>
  );
};

const PowersScene: React.FC = () => (
  <>
    {/* L0 · warm page — quiet above y780 */}
    <div style={{ position: "absolute", left: 0, top: 0, width: 1080, height: 1920, background: "linear-gradient(180deg,#FDF7EC 0%,#FBEEDA 26%,#F6DDB4 56%,#EFC894 82%,#E5B98A 100%)" }} />
    <Bloom x={540} y={280} r={560} c="rgba(255,249,232,0.95)" />
    <Bloom x={860} y={200} r={300} c="rgba(255,230,178,0.62)" />

    {/* L1 · violet spill. ⛔ Was 0.34 in five places and read as a magenta smear
        with no source. Cut to a tight warm-violet rim under the panel only. */}
    <Bloom x={540} y={1452} r={300} c="rgba(150,80,235,0.16)" />

    {/* L2 · THE PANEL — children are PANEL-LOCAL: screen = local + (108, 800) */}
    <div style={{
      position: "absolute", left: 108, top: 800, width: 864, height: 620, borderRadius: 38,
      overflow: "hidden", boxSizing: "border-box", background: "#152C46",
      boxShadow: "0 46px 92px -26px rgba(74,46,22,0.60), 0 14px 30px rgba(74,46,22,0.26), inset 0 0 0 10px #2E5074",
    }}>
      {/* chrome — traffic lights only. ⛔ The mono "GAUNTLET · 5 / 5 GEMS SET"
          strip was more of the text the client removed. */}
      <div style={{ position: "absolute", left: 0, top: 0, width: 864, height: 66, background: "linear-gradient(180deg,#3C648E 0%,#274866 100%)" }} />
      <div style={{ position: "absolute", left: 0, top: 64, width: 864, height: 3, background: "#0C1B2C" }} />
      {[["#D2724E", 34], ["#E7B24C", 66], ["#3F9E74", 98]].map(([c, cx], i) => (
        <div key={i} style={{ position: "absolute", left: cx as number, top: 24, width: 19, height: 19, borderRadius: "50%", background: c as string }} />
      ))}

      <div style={{ position: "absolute", left: 0, top: 67, width: 864, height: 553, background: "linear-gradient(180deg,#0B1A2C 0%,#12283F 48%,#1A3552 100%)" }} />
      {[62, 176, 290, 574, 688, 802].map((px, i) => (
        <div key={i} style={{ position: "absolute", left: px, top: 67, width: 44, height: 433, background: "rgba(86,132,180,0.16)", borderRadius: 4 }} />
      ))}

      <svg width={864} height={553} viewBox="0 0 864 553" style={{ position: "absolute", left: 0, top: 67 }}>
        <defs>
          <linearGradient id="pwray" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(255,232,168,0.66)" />
            <stop offset="52%" stopColor="rgba(255,214,132,0.30)" />
            <stop offset="100%" stopColor="rgba(255,206,120,0.00)" />
          </linearGradient>
          <linearGradient id="pwray2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(255,250,226,0.72)" />
            <stop offset="100%" stopColor="rgba(255,240,190,0.00)" />
          </linearGradient>
        </defs>
        <path d="M436 -8 L604 -8 L836 470 L214 470 Z" fill="url(#pwray)" />
        <path d="M486 -8 L560 -8 L672 420 L392 420 Z" fill="url(#pwray2)" />
      </svg>

      {/* interior floor — one solid band to the panel bottom, no gap */}
      <div style={{ position: "absolute", left: 0, top: 500, width: 864, height: 120, background: "linear-gradient(180deg,#27465F 0%,#152E46 100%)" }} />
      <div style={{ position: "absolute", left: 0, top: 500, width: 864, height: 7, background: "#4E80AC" }} />
      <Bloom x={372} y={512} r={250} c="rgba(255,236,186,0.34)" />

      {Array.from({ length: 40 }).map((_, i) => {
        const c = ["#9A78D1", "#4F9DE5", "#C93E31", "#35AC78", "#E9B33B", "#E08A4A", "#F6EFDD"][i % 7];
        const sz = 10 + seed(i * 5 + 3) * 13;
        const cx = 120 + seed(i * 7 + 2) * 690;
        const cy = 92 + seed(i * 11 + 5) * 392;
        if (cx > 430 && cx < 760 && cy > 40 && cy < 370) return null;   // keep the fist clean
        if (cx > 210 && cx < 500 && cy > 260 && cy < 480) return null;  // keep the hero clean
        return <div key={i} style={{ position: "absolute", left: cx, top: cy, width: sz, height: sz, background: c, borderRadius: 3, transform: `rotate(${(seed(i * 3) * 90).toFixed(0)}deg)` }} />;
      })}

      <PwRays cx={598} cy={216} r={186} n={14} c="rgba(247,214,126,0.40)" />
      <PwRays cx={598} cy={216} r={112} n={14} c="rgba(255,240,186,0.58)" />

      {/* ⛔ ORDER: bounce first, contact shadow ON TOP, or the 0.30 bounce erases
          the shadow and the hero floats. */}
      <Bloom x={372} y={504} r={170} c="rgba(168,92,255,0.30)" />
      <div style={{
        position: "absolute", left: 192, top: 478, width: 360, height: 50, borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.62) 48%, rgba(0,0,0,0) 76%)",
        filter: "blur(6px)",
      }} />

      {/* THE HERO — hue = (lf*15)%360, so lf 18 = 270deg violet.
          Feet land at top + size*0.92 = 242 + 258 = local 500 = the floor line. */}
      <div style={{ position: "absolute", left: 232, top: 242, filter: "drop-shadow(0 0 40px rgba(168,92,255,0.95)) drop-shadow(0 0 84px rgba(150,70,240,0.60))" }}>
        <PkMascot lf={18} size={280} rainbow={1} cheer={0.7} />
      </div>
      <PwForearm x={448} y={272} />
      {/* the fist. Scaled 230 -> 206 so the violet hero stays the largest
          saturated mass rather than being out-massed by its own prop. */}
      <div style={{
        position: "absolute", left: 496, top: 96, width: 206, height: 234,
        transform: "rotate(-8deg)", transformOrigin: "50% 96%",
        filter: "drop-shadow(0 16px 30px rgba(4,10,20,0.75))",
      }}>
        <PwGauntlet x={0} y={0} s={206} />
      </div>

      {/* front lip for depth — the numbered gem sockets that sat on it are gone */}
      <div style={{ position: "absolute", left: 0, top: 538, width: 864, height: 82, background: "linear-gradient(180deg,#16293D 0%,#0C1A2A 100%)" }} />
      <div style={{ position: "absolute", left: 0, top: 538, width: 864, height: 6, background: "#37608A" }} />
      <div style={{ position: "absolute", left: 0, top: 0, width: 864, height: 620, boxShadow: "inset 0 0 150px rgba(4,10,20,0.80)" }} />
    </div>

    {/* L3 · cream page floor — height 420 so top+height = 1920, reaches the frame bottom */}
    <div style={{ position: "absolute", left: 0, top: 1500, width: 1080, height: 420, background: "linear-gradient(180deg,#E3C79C 0%,#D2AF7C 42%,#BE9761 100%)" }} />
    <div style={{ position: "absolute", left: 0, top: 1493, width: 1080, height: 9, background: "#F4E0BA" }} />

    {/* L4 · ordinary Claudes watching. ⛔ Were four in a 2 + gap + 2 split with
        the bright horizon line cutting them at chest height. Now three, varied
        sizes, asymmetric, standing WELL below the horizon so the line reads as
        ground behind them — and they fill what was a dead bottom third. */}
    {([[206, 118, 30, 0.55], [372, 100, 47, 0.5], [880, 110, 61, -0.5]] as [number, number, number, number][]).map(
      ([cx, sz, lf, gz], i) => (
        <React.Fragment key={i}>
          <div style={{
            position: "absolute", left: cx - sz * 0.72, top: 1598, width: sz * 1.44, height: 30, borderRadius: "50%",
            background: "radial-gradient(ellipse, rgba(92,60,30,0.6), rgba(92,60,30,0) 72%)", filter: "blur(6px)",
          }} />
          <div style={{ position: "absolute", left: cx - sz / 2, top: 1612 - sz * 0.92 }}>
            <PkMascot lf={lf} size={sz} gaze={gz} />
          </div>
        </React.Fragment>
      )
    )}

    {([[92, 1462, 20, "#9A78D1"], [1006, 1436, 18, "#4F9DE5"], [58, 1338, 16, "#E9B33B"], [1030, 1288, 17, "#C93E31"], [612, 1612, 19, "#35AC78"], [510, 1556, 16, "#E9B33B"], [790, 1580, 18, "#9A78D1"]] as [number, number, number, string][]).map(
      ([x, y, sz, c], i) => (
        <div key={i} style={{ position: "absolute", left: x, top: y, width: sz, height: sz, background: c, borderRadius: 3, transform: `rotate(${(seed(i * 9) * 90).toFixed(0)}deg)` }} />
      )
    )}

    <div style={{ position: "absolute", left: 0, top: 1740, width: 1080, height: 180, background: "linear-gradient(180deg, rgba(96,66,34,0) 0%, rgba(96,66,34,0.34) 100%)" }} />
  </>
);

export const CoverPowers: React.FC = () => (
  <SceneCover
    scene={<PowersScene />}
    line1={<>THE <span style={{ color: CLAY }}>5</span> CLAUDE CODE</>}
    giant={<>SUPERPOWERS</>}
    giantSize={103}
  />
);

/* ---------- EVOLVE ---------- */

/* ==========================================================================
   EVOLVE — scene body · 1080 x 1920 full-bleed still
   Headline "CLAUDE FIXES ITS OWN / MISTAKES" is composited over the top band
   later, so EVERY pixel above y780 is wall gradient + radial glow only.
   Topmost drawn element = the RUN 2 report card, y=872.

   THE VERB: a new rule is being WRITTEN into CLAUDE.md. A gold pen is mid
   stroke, the underline it has laid down stops short of the end of the line,
   and there is a burst of light where the nib is. The two run reports on the
   wall are the before and after: RUN 1 low and red, RUN 2 high and green,
   with gold chevrons carrying the eye left -> file -> right.

   GEOMETRY CONTRACT
     header quiet zone   y <  780   wall gradient / radial glow ONLY
     topmost geometry    y =  872   (RUN 2 card)
     RUN 1 card          y 1020..1206   x  180..430
     CLAUDE.md mat       y  976..1420   x  486..846
     CLAUDE.md page      y  998..1398   x  508..824
     RUN 2 card          y  872..1058   x  894..1064
     wall/floor cove     y = 1300
     hero feet           y = 1465  (sprite top 1240 + 250*0.92 - cheer lift)
   The hero is pushed hard LEFT to x62 and his head starts at y1240, which is
   34px BELOW the bottom of RUN 1 — so he covers neither report and he is
   nowhere near the file. The mat behind the page is deliberately dark: a
   cream page on a cream wall has no edge, and the page is the whole point.
   ========================================================================== */

const EvolveScene: React.FC = () => (
  <>
    {/* ================= L0 · WALL — quiet zone (gradient + glow ONLY) ====== */}
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: 1080,
        height: 1320,
        background:
          "linear-gradient(180deg,#FEFAF2 0%,#FBEEDA 32%,#F6DDB4 70%,#EDC58C 100%)",
      }}
    />
    <Bloom x={512} y={272} r={600} c="rgba(255,251,236,0.95)" />
    <Bloom x={962} y={356} r={330} c="rgba(255,229,176,0.58)" />
    <Bloom x={104} y={286} r={300} c="rgba(255,241,208,0.55)" />

    {/* ================= L1 · FAR — light shafts + haze ===================== */}
    {[
      [286, 168, 12],
      [700, 190, -12],
      [40, 118, 8],
    ].map(([sx, sw, sk], i) => (
      <div
        key={i}
        style={{
          position: "absolute",
          left: sx,
          top: 856,
          width: sw,
          height: 448,
          background:
            "linear-gradient(180deg, rgba(255,247,224,0.52), rgba(255,247,224,0))",
          transform: `skewX(${sk}deg)`,
          filter: "blur(19px)",
        }}
      />
    ))}
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 1116,
        width: 1080,
        height: 196,
        background:
          "linear-gradient(180deg, rgba(223,189,141,0) 0%, rgba(218,181,129,0.50) 60%, rgba(207,166,112,0.88) 100%)",
      }}
    />

    {/* ================= L2 · FLOOR — one solid full-width band ============= */}
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 1300,
        width: 1080,
        height: 620,
        background:
          "linear-gradient(180deg,#E1C497 0%,#CBA572 34%,#B38856 72%,#997044 100%)",
      }}
    />
    <div style={{ position: "absolute", left: 0, top: 1300, width: 1080, height: 7, background: "#F4E2C1" }} />
    {/* light aperture behind the hero */}
    <Bloom x={187} y={1288} r={330} c="rgba(255,251,234,0.95)" />
    <Bloom x={168} y={1442} r={250} c="rgba(255,236,196,0.85)" />

    {/* ================= L3 · THE TWO RUN REPORTS ==========================
        RUN 1 sits LOW and RUN 2 sits HIGH — the progress is read off the
        height before a single word is read.                               */}

    {/* ---- RUN 1 — the failure ---- */}
    <div
      style={{
        position: "absolute",
        left: 180,
        top: 1020,
        width: 250,
        height: 186,
        borderRadius: 16,
        boxSizing: "border-box",
        border: "3px solid #D9CDB5",
        background: "linear-gradient(180deg,#FBF6EA 0%,#F0E7D5 100%)",
        boxShadow: "0 20px 40px -12px rgba(96,68,42,0.45)",
      }}
    />
    <div style={{ position: "absolute", left: 183, top: 1023, width: 244, height: 52, borderRadius: "13px 13px 0 0", background: "#EBE1CB" }} />
    <div style={{ position: "absolute", left: 183, top: 1073, width: 244, height: 2, background: "#D9CDB5" }} />
    <div
      style={{
        position: "absolute",
        left: 200,
        top: 1036,
        fontFamily: mono,
        fontWeight: 700,
        fontSize: 22,
        letterSpacing: "0.10em",
        color: "#4A4438",
      }}
    >
      RUN 1
    </div>
    <div
      style={{
        position: "absolute",
        left: 362,
        top: 1030,
        width: 42,
        height: 42,
        borderRadius: "50%",
        background: "#C44A3A",
        boxShadow: "0 4px 12px rgba(150,50,38,0.50)",
      }}
    >
      <div style={{ position: "absolute", left: 8, top: 19, width: 26, height: 5, borderRadius: 3, background: "#FFF0EC", transform: "rotate(45deg)" }} />
      <div style={{ position: "absolute", left: 8, top: 19, width: 26, height: 5, borderRadius: 3, background: "#FFF0EC", transform: "rotate(-45deg)" }} />
    </div>
    <div
      style={{
        position: "absolute",
        left: 202,
        top: 1104,
        width: 206,
        height: 52,
        borderRadius: 11,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(180deg,#D25946,#B03E2F)",
        boxShadow: "0 6px 16px rgba(150,50,38,0.50)",
        fontFamily: inter.fontFamily,
        fontWeight: 900,
        fontSize: 22,
        letterSpacing: "0.05em",
        color: "#FFFFFF",
      }}
    >
      BUILD BROKE
    </div>
    <div style={{ position: "absolute", left: 202, top: 1172, width: 152, height: 9, borderRadius: 5, background: "#CFC5B0" }} />
    <div style={{ position: "absolute", left: 202, top: 1188, width: 104, height: 8, borderRadius: 4, background: "#DBD2BF" }} />

    {/* ---- RUN 2 — the pass ---- */}
    <div
      style={{
        position: "absolute",
        left: 894,
        top: 872,
        width: 170,
        height: 186,
        borderRadius: 16,
        boxSizing: "border-box",
        border: "3px solid #D9CDB5",
        background: "linear-gradient(180deg,#FBF6EA 0%,#F0E7D5 100%)",
        boxShadow: "0 20px 40px -12px rgba(96,68,42,0.45)",
      }}
    />
    <div style={{ position: "absolute", left: 897, top: 875, width: 164, height: 50, borderRadius: "13px 13px 0 0", background: "#EBE1CB" }} />
    <div style={{ position: "absolute", left: 897, top: 923, width: 164, height: 2, background: "#D9CDB5" }} />
    <div
      style={{
        position: "absolute",
        left: 914,
        top: 887,
        fontFamily: mono,
        fontWeight: 700,
        fontSize: 21,
        letterSpacing: "0.10em",
        color: "#4A4438",
      }}
    >
      RUN 2
    </div>
    <div
      style={{
        position: "absolute",
        left: 1006,
        top: 882,
        width: 38,
        height: 38,
        borderRadius: "50%",
        background: "#3F9E74",
        boxShadow: "0 4px 12px rgba(52,120,90,0.55)",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 8,
          top: 11,
          width: 22,
          height: 17,
          background: "#FFFFFF",
          clipPath: "polygon(10% 46%, 25% 30%, 41% 51%, 78% 8%, 92% 23%, 41% 84%)",
        }}
      />
    </div>
    <div
      style={{
        position: "absolute",
        left: 914,
        top: 954,
        width: 130,
        height: 50,
        borderRadius: 11,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(180deg,#4CB183,#3A8F68)",
        boxShadow: "0 6px 16px rgba(52,120,90,0.55)",
        fontFamily: inter.fontFamily,
        fontWeight: 900,
        fontSize: 21,
        letterSpacing: "0.05em",
        color: "#FFFFFF",
      }}
    >
      SHIPPED
    </div>
    <div style={{ position: "absolute", left: 914, top: 1020, width: 118, height: 9, borderRadius: 5, background: "#CFC5B0" }} />
    <div style={{ position: "absolute", left: 914, top: 1036, width: 78, height: 8, borderRadius: 4, background: "#DBD2BF" }} />

    {/* ---- gold chevrons: RUN 1 -> the file -> RUN 2 ---- */}
    {[
      [432, 1096],
      [451, 1096],
      [470, 1096],
    ].map(([gx, gy], i) => (
      <div
        key={i}
        style={{
          position: "absolute",
          left: gx,
          top: gy,
          width: 14,
          height: 26,
          background: "#E7B24C",
          clipPath: "polygon(0% 0%, 100% 50%, 0% 100%)",
          boxShadow: "0 0 14px rgba(231,178,76,0.75)",
        }}
      />
    ))}
    {[
      [849, 990],
      [866, 990],
      [883, 990],
    ].map(([gx, gy], i) => (
      <div
        key={i}
        style={{
          position: "absolute",
          left: gx,
          top: gy,
          width: 13,
          height: 24,
          background: "#E7B24C",
          clipPath: "polygon(0% 0%, 100% 50%, 0% 100%)",
          boxShadow: "0 0 14px rgba(231,178,76,0.75)",
        }}
      />
    ))}

    {/* ================= L4 · THE HERO ARTIFACT — CLAUDE.md ================= */}
    {/* dark mat: the page is cream and so is the wall, so the page needs an
        edge of its own or it simply is not there                            */}
    <Bloom x={666} y={1160} r={300} c="rgba(255,236,190,0.72)" />
    <div
      style={{
        position: "absolute",
        left: 486,
        top: 976,
        width: 360,
        height: 444,
        borderRadius: 22,
        boxSizing: "border-box",
        border: "3px solid #96794F",
        background: "linear-gradient(180deg,#7C6446 0%,#57432F 100%)",
        boxShadow: "0 34px 64px -16px rgba(84,56,30,0.62)",
      }}
    />
    {/* plinth — the board stands on the floor */}
    <div
      style={{
        position: "absolute",
        left: 470,
        top: 1420,
        width: 392,
        height: 50,
        borderRadius: 10,
        background: "linear-gradient(180deg,#6B5539 0%,#4B3A26 100%)",
        boxShadow: "0 18px 34px -10px rgba(70,46,24,0.60)",
      }}
    />
    <div
      style={{
        position: "absolute",
        left: 452,
        top: 1456,
        width: 430,
        height: 44,
        borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(84,54,28,0.62), rgba(88,58,30,0) 70%)",
        filter: "blur(9px)",
      }}
    />

    {/* the page */}
    <div
      style={{
        position: "absolute",
        left: 508,
        top: 998,
        width: 316,
        height: 400,
        background: "linear-gradient(168deg,#FDFAF2 0%,#F7F0E0 62%,#F1E8D3 100%)",
        clipPath: "polygon(0% 0%, 85.4% 0%, 100% 11.5%, 100% 100%, 0% 100%)",
        boxShadow: "0 14px 30px -10px rgba(60,40,20,0.45)",
      }}
    />
    {/* folded corner */}
    <div
      style={{
        position: "absolute",
        left: 778,
        top: 998,
        width: 46,
        height: 46,
        background: "linear-gradient(135deg,#DCD1B7 0%,#C9BC9E 100%)",
        clipPath: "polygon(0% 0%, 100% 100%, 0% 100%)",
      }}
    />

    <div
      style={{
        position: "absolute",
        left: 532,
        top: 1024,
        fontFamily: mono,
        fontWeight: 700,
        fontSize: 23,
        letterSpacing: "0.03em",
        color: "#3A342A",
      }}
    >
      CLAUDE.md
    </div>
    <div style={{ position: "absolute", left: 532, top: 1060, width: 258, height: 3, background: "#E7B24C" }} />

    {[
      [1090, 244],
      [1122, 206],
      [1154, 252],
      [1186, 172],
    ].map(([ly, lw], i) => (
      <div key={i} style={{ position: "absolute", left: 532, top: ly, width: lw, height: 9, borderRadius: 5, background: "#D3C9B4" }} />
    ))}

    {/* ---- the new rule, mid-write ---- */}
    <div style={{ position: "absolute", left: 530, top: 1212, width: 272, height: 86, borderRadius: 6, background: "#CDEBD9" }} />
    <div style={{ position: "absolute", left: 530, top: 1212, width: 7, height: 86, borderRadius: "6px 0 0 6px", background: "#3F9E74" }} />
    <div
      style={{
        position: "absolute",
        left: 548,
        top: 1222,
        fontFamily: mono,
        fontWeight: 700,
        fontSize: 18,
        letterSpacing: "0.005em",
        color: "#1F6047",
        whiteSpace: "nowrap",
      }}
    >
      + never ship without
    </div>
    <div
      style={{
        position: "absolute",
        left: 562,
        top: 1252,
        fontFamily: mono,
        fontWeight: 700,
        fontSize: 18,
        letterSpacing: "0.005em",
        color: "#1F6047",
        whiteSpace: "nowrap",
      }}
    >
      a test run
    </div>

    {[
      [1320, 228],
      [1352, 196],
    ].map(([ly, lw], i) => (
      <div key={i} style={{ position: "absolute", left: 532, top: ly, width: lw, height: 9, borderRadius: 5, background: "#D3C9B4" }} />
    ))}

    {/* ================= L5 · THE VERB — the stroke being laid down ========= */}
    <div
      style={{
        position: "absolute",
        left: 548,
        top: 1282,
        width: 170,
        height: 8,
        borderRadius: 4,
        background: "linear-gradient(90deg,#E7B24C 0%,#F6CE7C 78%,#FFE3A8 100%)",
        boxShadow: "0 0 18px rgba(231,178,76,0.90)",
      }}
    />
    <Bloom x={724} y={1286} r={128} c="rgba(255,214,132,0.85)" />
    {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
      <div
        key={i}
        style={{
          position: "absolute",
          left: 721,
          top: 1286 - (i % 2 === 0 ? 46 : 30),
          width: 6,
          height: i % 2 === 0 ? 46 : 30,
          transform: `rotate(${i * 45}deg)`,
          transformOrigin: "50% 100%",
          background: "linear-gradient(180deg, rgba(255,217,138,0) 0%, #E7B24C 100%)",
        }}
      />
    ))}
    {[
      [746, 1246, 12, 24],
      [700, 1240, 10, -22],
      [752, 1312, 11, 36],
      [686, 1316, 9, 12],
    ].map(([fx, fy, fs, fr], i) => (
      <div
        key={i}
        style={{
          position: "absolute",
          left: fx,
          top: fy,
          width: fs,
          height: fs,
          borderRadius: 3,
          transform: `rotate(${fr}deg)`,
          background: ["#E7B24C", "#FFD98A", "#D2724E", "#E7B24C"][i],
          boxShadow: "0 0 18px rgba(231,178,76,0.90)",
        }}
      />
    ))}
    {/* the pen */}
    <div
      style={{
        position: "absolute",
        left: 726,
        top: 1196,
        width: 16,
        height: 82,
        borderRadius: "5px 5px 0 0",
        background: "linear-gradient(180deg,#F3D28A 0%,#D8A343 62%,#B8862E 100%)",
        transform: "rotate(26deg)",
        transformOrigin: "50% 190%",
        boxShadow: "0 6px 14px rgba(90,60,24,0.45)",
      }}
    />
    <div
      style={{
        position: "absolute",
        left: 726,
        top: 1278,
        width: 16,
        height: 22,
        background: "#3A2F1C",
        clipPath: "polygon(0% 0%, 100% 0%, 50% 100%)",
        transform: "rotate(26deg)",
        transformOrigin: "50% 64%",
      }}
    />

    {/* ================= L6 · HERO — Claude, hard left ====================== */}
    <div
      style={{
        position: "absolute",
        left: 21,
        top: 1443,
        width: 332,
        height: 48,
        borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(84,54,28,0.72), rgba(88,58,30,0) 70%)",
        filter: "blur(8px)",
      }}
    />
    <div style={{ position: "absolute", left: 62, top: 1240 }}>
      <PkMascot lf={24} size={250} brainHat={1} cheer={0.5} />
    </div>

    {/* ================= L7 · FOREGROUND — bench edge + motes =============== */}
    <div style={{ position: "absolute", left: 0, top: 872, width: 1080, height: 700 }}>
      <Dust n={24} w={1080} h={700} c="rgba(255,247,224,0.95)" s={5} />
    </div>
    <div style={{ position: "absolute", left: 0, top: 1180, width: 1080, height: 450 }}>
      <Dust n={13} w={1080} h={450} c="rgba(214,150,80,0.85)" s={31} />
    </div>
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 1584,
        width: 1080,
        height: 92,
        background: "linear-gradient(180deg,#BE9260 0%,#8B6740 100%)",
        filter: "blur(2px)",
      }}
    />
    <div style={{ position: "absolute", left: 0, top: 1584, width: 1080, height: 8, background: "#DCB988", filter: "blur(2px)" }} />
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 1656,
        width: 1080,
        height: 264,
        background: "linear-gradient(180deg, rgba(116,82,46,0) 0%, rgba(108,74,40,0.48) 100%)",
      }}
    />
  </>
);

export const CoverEvolve: React.FC = () => (
  <SceneCover
    scene={<EvolveScene />}
    line1={<>CLAUDE FIXES ITS <span style={{ color: CLAY }}>OWN</span></>}
    giant={<>MISTAKES</>}
    giantSize={153}
  />
);

/* ---------- STACK ---------- */

/* ==========================================================================
   STACK — scene body · 1080 x 1920 full-bleed still
   Headline "THE AI MODEL / TIER LIST" is composited over the top band later,
   so EVERY pixel above y780 is sky gradient + radial glow only.
   Topmost drawn element = the spotlight shaft over the top tier, y=840.

   THE VERB: an escalation is going THROUGH the gold gate. A token is mid
   flight in the arch mouth with a trail under it, the threshold has burst,
   and the light coming out of the aperture is pooling forward onto the
   middle tier. Cheap work never gets up there; only what passes does.

   GEOMETRY CONTRACT
     header quiet zone   y <  780   sky gradient / radial glow ONLY
     topmost geometry    y =  840   (spotlight shaft, blurred)
     tier C  face        y 1060..1160  surface y 1018..1060   x  410..656
     tier B  face        y 1204..1304  surface y 1160..1204   x  270..840
     tier A  face        y 1348..1458  surface y 1304..1348   x  120..960
     gate arch           y 1052..1192                          x  470..626
     stage floor         y 1400..1920  (solid, full width)
   Every tier is ONE solid slab plus ONE solid top surface running the full
   width of that step — there is no seam anywhere for the sky to pour
   through. Figures stand on the surfaces, so each one is naturally in front
   of the step above it; the judge is parked RIGHT and the price tags LEFT so
   nothing sits behind the gate.

   NOTE: the hard-hat workers use HouseMascot, not PkMascot — `constr` is a
   HouseMascot prop and does not exist on PkMascot, so PkMascot would not
   compile. Same sprite language, same lf/size grounding maths.
   ========================================================================== */

const StackScene: React.FC = () => (
  <>
    {/* ================= L0 · SKY — quiet zone (gradient + glow ONLY) ======= */}
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: 1080,
        height: 1430,
        background:
          "linear-gradient(180deg,#FEFAF1 0%,#FBEEDA 26%,#F6DDB4 60%,#EFC894 88%,#E4B77F 100%)",
      }}
    />
    <Bloom x={534} y={266} r={620} c="rgba(255,251,236,0.95)" />
    <Bloom x={912} y={402} r={330} c="rgba(255,228,172,0.58)" />
    <Bloom x={132} y={330} r={300} c="rgba(255,241,208,0.55)" />

    {/* ================= L1 · SPOTLIGHT on the top tier ===================== */}
    <div
      style={{
        position: "absolute",
        left: 396,
        top: 840,
        width: 280,
        height: 250,
        background:
          "linear-gradient(180deg, rgba(255,246,216,0.62), rgba(255,246,216,0))",
        clipPath: "polygon(38% 0%, 62% 0%, 100% 100%, 0% 100%)",
        filter: "blur(20px)",
      }}
    />
    {[
      [172, 132, 12],
      [828, 150, -12],
    ].map(([sx, sw, sk], i) => (
      <div
        key={i}
        style={{
          position: "absolute",
          left: sx,
          top: 900,
          width: sw,
          height: 440,
          background:
            "linear-gradient(180deg, rgba(255,247,224,0.48), rgba(255,247,224,0))",
          transform: `skewX(${sk}deg)`,
          filter: "blur(19px)",
        }}
      />
    ))}
    <Bloom x={534} y={1046} r={300} c="rgba(255,240,198,0.82)" />

    {/* ================= L2 · STAGE FLOOR — one solid full-width band ======= */}
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 1400,
        width: 1080,
        height: 520,
        background:
          "linear-gradient(180deg,#DFC195 0%,#C8A170 36%,#B08454 74%,#966D42 100%)",
      }}
    />
    <div style={{ position: "absolute", left: 0, top: 1400, width: 1080, height: 6, background: "#F2E0BF" }} />

    {/* ================= L3 · TIER A — the cheap models ($) ================= */}
    <div
      style={{
        position: "absolute",
        left: 100,
        top: 1440,
        width: 880,
        height: 56,
        borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(92,62,34,0.50), rgba(92,62,34,0) 70%)",
        filter: "blur(10px)",
      }}
    />
    <div
      style={{
        position: "absolute",
        left: 120,
        top: 1348,
        width: 840,
        height: 110,
        background: "linear-gradient(180deg,#CBB086 0%,#BC9F73 62%,#A98A5F 100%)",
        boxShadow: "0 16px 30px -10px rgba(92,62,34,0.45)",
      }}
    />
    {[220, 340, 460, 580, 700, 820].map((gx, i) => (
      <div key={i} style={{ position: "absolute", left: gx, top: 1348, width: 3, height: 110, background: "#9C7F55" }} />
    ))}
    <div style={{ position: "absolute", left: 120, top: 1402, width: 840, height: 3, background: "#9C7F55" }} />
    <div
      style={{
        position: "absolute",
        left: 120,
        top: 1304,
        width: 840,
        height: 44,
        background: "linear-gradient(180deg,#B49871 0%,#E4D0AA 44%,#EFDFBE 100%)",
      }}
    />
    <div style={{ position: "absolute", left: 120, top: 1341, width: 840, height: 7, background: "#FCF6E8" }} />
    <div style={{ position: "absolute", left: 120, top: 1304, width: 840, height: 4, background: "#8E7350" }} />

    {/* ================= L4 · TIER B — the judge ($$) ======================= */}
    <div
      style={{
        position: "absolute",
        left: 270,
        top: 1204,
        width: 570,
        height: 100,
        background: "linear-gradient(180deg,#D6BC93 0%,#C6AA7F 62%,#B3946A 100%)",
        boxShadow: "0 16px 28px -10px rgba(92,62,34,0.42)",
      }}
    />
    {[390, 510, 630, 750].map((gx, i) => (
      <div key={i} style={{ position: "absolute", left: gx, top: 1204, width: 3, height: 100, background: "#A6875C" }} />
    ))}
    <div style={{ position: "absolute", left: 270, top: 1253, width: 570, height: 3, background: "#A6875C" }} />
    <div
      style={{
        position: "absolute",
        left: 270,
        top: 1160,
        width: 570,
        height: 44,
        background: "linear-gradient(180deg,#BE9F76 0%,#EBD8B3 44%,#F5E6C8 100%)",
      }}
    />
    <div style={{ position: "absolute", left: 270, top: 1197, width: 570, height: 7, background: "#FDF8EC" }} />
    <div style={{ position: "absolute", left: 270, top: 1160, width: 570, height: 4, background: "#987C56" }} />

    {/* ================= L5 · TIER C — the flagship ($$$$) ================== */}
    <div
      style={{
        position: "absolute",
        left: 410,
        top: 1060,
        width: 246,
        height: 100,
        background: "linear-gradient(180deg,#E0C89F 0%,#CFB68C 62%,#BC9F76 100%)",
        boxShadow: "0 16px 26px -10px rgba(92,62,34,0.40)",
      }}
    />
    <div style={{ position: "absolute", left: 410, top: 1109, width: 246, height: 3, background: "#AE9165" }} />
    <div
      style={{
        position: "absolute",
        left: 410,
        top: 1018,
        width: 246,
        height: 42,
        background: "linear-gradient(180deg,#C6A97F 0%,#F0DDBB 44%,#FAECD3 100%)",
      }}
    />
    <div style={{ position: "absolute", left: 410, top: 1053, width: 246, height: 7, background: "#FFFCF2" }} />
    <div style={{ position: "absolute", left: 410, top: 1018, width: 246, height: 4, background: "#A0855C" }} />

    {/* ================= L6 · PRICE TAGS — beside each tier, all clear ====== */}
    {/* leader ticks binding the two floating tags to their step */}
    <div style={{ position: "absolute", left: 400, top: 1105, width: 12, height: 5, background: "#A98442" }} />
    <div style={{ position: "absolute", left: 260, top: 1249, width: 12, height: 5, background: "#A98442" }} />
    {[
      { p: "$$$$", x: 288, y: 1084, w: 112 },
      { p: "$$", x: 148, y: 1228, w: 112 },
      { p: "$", x: 150, y: 1376, w: 112 },
    ].map((t) => (
      <div
        key={t.p}
        style={{
          position: "absolute",
          left: t.x,
          top: t.y,
          width: t.w,
          height: 48,
          borderRadius: 10,
          boxSizing: "border-box",
          border: "3px solid #A98442",
          background: "linear-gradient(180deg,#3A3227 0%,#282116 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: mono,
          fontWeight: 700,
          fontSize: 25,
          letterSpacing: "0.06em",
          color: "#F2C868",
          boxShadow: "0 8px 18px -6px rgba(80,52,26,0.55)",
        }}
      >
        {t.p}
      </div>
    ))}

    {/* ================= L7 · THE GATE + THE VERB =========================== */}
    {/* light pooling forward out of the aperture onto tier B's surface */}
    <div
      style={{
        position: "absolute",
        left: 428,
        top: 1168,
        width: 240,
        height: 56,
        borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(255,238,186,0.95), rgba(255,238,186,0) 70%)",
        filter: "blur(9px)",
      }}
    />
    <Bloom x={548} y={1132} r={220} c="rgba(255,216,140,0.72)" />
    <div
      style={{
        position: "absolute",
        left: 470,
        top: 1052,
        width: 156,
        height: 140,
        borderRadius: "78px 78px 6px 6px",
        boxSizing: "border-box",
        border: "5px solid #A87C28",
        background: "linear-gradient(180deg,#F5D68F 0%,#E7B24C 48%,#C08F31 100%)",
        boxShadow: "0 0 44px rgba(231,178,76,0.75), 0 16px 28px -10px rgba(92,62,34,0.50)",
      }}
    />
    <div
      style={{
        position: "absolute",
        left: 492,
        top: 1074,
        width: 112,
        height: 118,
        borderRadius: "56px 56px 4px 4px",
        background:
          "radial-gradient(circle at 50% 84%, #FFFAEC 0%, #FFE7B4 34%, #F0C468 66%, #CE9A38 100%)",
      }}
    />
    {/* the threshold burst */}
    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
      <div
        key={i}
        style={{
          position: "absolute",
          left: 545,
          top: 1150 - (i % 2 === 0 ? 78 : 52),
          width: 7,
          height: i % 2 === 0 ? 78 : 52,
          transform: `rotate(${i * 36}deg)`,
          transformOrigin: "50% 100%",
          background: "linear-gradient(180deg, rgba(255,224,158,0) 0%, #E7B24C 100%)",
        }}
      />
    ))}
    {/* the escalation passing through, plus its trail */}
    <div
      style={{
        position: "absolute",
        left: 541,
        top: 1122,
        width: 15,
        height: 76,
        borderRadius: 7,
        background: "linear-gradient(180deg,#FFD880 0%, rgba(255,214,132,0) 100%)",
        filter: "blur(3px)",
      }}
    />
    <div
      style={{
        position: "absolute",
        left: 526,
        top: 1086,
        width: 44,
        height: 44,
        borderRadius: 8,
        transform: "rotate(45deg)",
        background: "linear-gradient(150deg,#FFF0CC 0%,#E7B24C 60%,#C08F31 100%)",
        boxShadow: "0 0 34px rgba(255,214,132,0.95)",
      }}
    />
    {[
      [636, 1088, 13, 22],
      [452, 1104, 11, -26],
      [624, 1178, 12, 40],
      [462, 1186, 10, 14],
    ].map(([fx, fy, fs, fr], i) => (
      <div
        key={i}
        style={{
          position: "absolute",
          left: fx,
          top: fy,
          width: fs,
          height: fs,
          borderRadius: 3,
          transform: `rotate(${fr}deg)`,
          background: ["#E7B24C", "#FFD98A", "#D2724E", "#E7B24C"][i],
          boxShadow: "0 0 20px rgba(231,178,76,0.90)",
        }}
      />
    ))}

    {/* ================= L8 · THE THREE TIERS OF FIGURES ==================== */}
    {/* --- tier A: the cheap workers, on the bottom surface --- */}
    {[320, 570, 820].map((wx, i) => (
      <div key={i}>
        <div
          style={{
            position: "absolute",
            left: wx - 20,
            top: 1320,
            width: 150,
            height: 30,
            borderRadius: "50%",
            background: "radial-gradient(ellipse, rgba(88,58,30,0.62), rgba(90,60,32,0) 70%)",
            filter: "blur(8px)",
          }}
        />
        <div style={{ position: "absolute", left: wx, top: 1235 }}>
          <HouseMascot lf={24} size={110} constr={1} />
        </div>
      </div>
    ))}

    {/* --- tier B: the judge, parked RIGHT so the gate stays open --- */}
    <div
      style={{
        position: "absolute",
        left: 640,
        top: 1174,
        width: 200,
        height: 34,
        borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(88,58,30,0.62), rgba(90,60,32,0) 70%)",
        filter: "blur(8px)",
      }}
    />
    <div style={{ position: "absolute", left: 665, top: 1054 }}>
      <PkMascot lf={24} size={150} judge={1} stern={0.5} />
    </div>

    {/* --- tier C: the flagship, spotlit, with the gold scroll --- */}
    <Bloom x={400} y={984} r={124} c="rgba(255,222,152,0.88)" />
    <div
      style={{
        position: "absolute",
        left: 356,
        top: 966,
        width: 106,
        height: 38,
        boxSizing: "border-box",
        border: "2px solid #C9A65E",
        background: "linear-gradient(180deg,#FDF7E7 0%,#EDDFC0 100%)",
      }}
    />
    <div style={{ position: "absolute", left: 372, top: 977, width: 60, height: 4, background: "#B99A5E" }} />
    <div style={{ position: "absolute", left: 372, top: 990, width: 42, height: 4, background: "#B99A5E" }} />
    {[344, 452].map((rx, i) => (
      <div
        key={i}
        style={{
          position: "absolute",
          left: rx,
          top: 962,
          width: 24,
          height: 46,
          borderRadius: 8,
          background: "linear-gradient(180deg,#F5D68F 0%,#E7B24C 56%,#C08F31 100%)",
          boxShadow: "0 0 22px rgba(231,178,76,0.85)",
        }}
      />
    ))}
    <div
      style={{
        position: "absolute",
        left: 413,
        top: 1032,
        width: 240,
        height: 36,
        borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(88,58,30,0.60), rgba(90,60,32,0) 70%)",
        filter: "blur(8px)",
      }}
    />
    <div style={{ position: "absolute", left: 446, top: 890 }}>
      <PkMascot lf={24} size={175} wizard={1} cheer={0.6} />
    </div>

    {/* ================= L9 · FOREGROUND — stage lip + motes ================ */}
    <div style={{ position: "absolute", left: 0, top: 860, width: 1080, height: 700 }}>
      <Dust n={24} w={1080} h={700} c="rgba(255,247,224,0.95)" s={17} />
    </div>
    <div style={{ position: "absolute", left: 0, top: 1200, width: 1080, height: 440 }}>
      <Dust n={13} w={1080} h={440} c="rgba(214,150,80,0.85)" s={41} />
    </div>
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 1600,
        width: 1080,
        height: 96,
        background: "linear-gradient(180deg,#BC9160 0%,#8A663E 100%)",
        filter: "blur(2px)",
      }}
    />
    <div style={{ position: "absolute", left: 0, top: 1600, width: 1080, height: 8, background: "#DBB786", filter: "blur(2px)" }} />
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 1672,
        width: 1080,
        height: 248,
        background: "linear-gradient(180deg, rgba(114,80,44,0) 0%, rgba(106,72,38,0.48) 100%)",
      }}
    />
  </>
);

export const CoverStack: React.FC = () => (
  <SceneCover
    scene={<StackScene />}
    line1={<>THE AI MODEL</>}
    giant={<><span style={{ color: CLAY }}>TIER</span> LIST</>}
  />
);

/* ---------- ARENA ---------- */

/* ==========================================================================
   ARENA — scene body · 1080 x 1920 full-bleed still
   Headline "20 VERSIONS. ONE / CHAMPION" is composited over the top band
   later, so EVERY pixel above y780 is sky gradient + radial glow only.
   Topmost drawn element = the stands backing slab, y=820.

   THE VERB: the final has just been called. Light bursts from behind the
   champion card on its pedestal, a crown is coming down on it, confetti is
   in the air, and the one surviving path through the bracket has gone gold
   while every card it beat carries a red X.

   Warm DAYLIGHT, not night: pale blue at the very top, cream stone stands,
   sunlit sand, gold banners. The torches read as small gold flames, not as
   the light source.

   GEOMETRY CONTRACT
     header quiet zone   y <  780   sky gradient / radial glow ONLY
     topmost geometry    y =  820   (stands backing)
     stands              y  820..1044   (arcade 832..900, 3 curved rows)
     arena wall          y 1040..1100  (solid, full width)
     sand                y 1096..1920  (solid, full width)
     round of 8          y 1104..1170   round of 4  y 1190..1256
     round of 2          y 1276..1352   champion    y 1256..1408
     pedestal            y 1408..1522
     hero feet           y = 1478  (sprite top 1262 + 240*0.92 - cheer lift)
   The bracket funnels down the LEFT two thirds (x96..791) and the judge
   stands at x806 — his head starts at y1262, which is 6px below the bottom
   of the round of 4, so he covers no card, and the champion at x346..542 is
   nowhere near him.
   ========================================================================== */

const ArenaScene: React.FC = () => (
  <>
    {/* ================= L0 · SKY — quiet zone (gradient + glow ONLY) ======= */}
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: 1080,
        height: 1120,
        background:
          "linear-gradient(180deg,#D3E7FA 0%,#E2EDF4 20%,#F7EFDF 46%,#FBEEDA 66%,#F6DDB4 86%,#EFC894 100%)",
      }}
    />
    <Bloom x={846} y={244} r={520} c="rgba(255,250,230,0.95)" />
    <Bloom x={862} y={228} r={230} c="rgba(255,236,182,0.85)" />
    <Bloom x={168} y={330} r={330} c="rgba(255,243,214,0.60)" />

    {/* ================= L1 · THE STANDS — one solid backing, then rows ===== */}
    <div
      style={{
        position: "absolute",
        left: -40,
        top: 820,
        width: 1160,
        height: 224,
        background: "linear-gradient(180deg,#EFE2C4 0%,#E2D0AC 54%,#D2BC94 100%)",
      }}
    />
    {/* upper arcade — the colosseum signature */}
    {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
      <div
        key={i}
        style={{
          position: "absolute",
          left: -30 + i * 128,
          top: 832,
          width: 78,
          height: 68,
          borderRadius: "39px 39px 0 0",
          background: "linear-gradient(180deg,#AF9570 0%,#8E7757 100%)",
        }}
      />
    ))}
    {/* curved seating rows — bottom edge bows into a bowl */}
    {[0, 1, 2].map((i) => (
      <div
        key={i}
        style={{
          position: "absolute",
          left: -70,
          top: 900 + i * 48,
          width: 1220,
          height: 44,
          borderRadius: "0 0 50% 50% / 0 0 56px 56px",
          background:
            i % 2 === 0
              ? "linear-gradient(180deg,#F6ECD6 0%,#E4D2AC 68%,#BDA47B 100%)"
              : "linear-gradient(180deg,#EADCBA 0%,#D6BF97 68%,#B09772 100%)",
          boxShadow: "0 5px 10px -2px rgba(112,84,50,0.38)",
        }}
      />
    ))}
    {/* seating ticks — without these the rows read as cables, not tiers */}
    {[0, 1, 2].map((i) =>
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19].map((j) => (
        <div
          key={`${i}-${j}`}
          style={{
            position: "absolute",
            left: 58 + j * 49,
            top: 908 + i * 48,
            width: 3,
            height: 22,
            background: "#C2A87F",
          }}
        />
      ))
    )}
    {/* gold banners */}
    {[60, 210, 360, 510, 660, 810, 960].map((bx, i) => (
      <div key={i}>
        <div style={{ position: "absolute", left: bx - 4, top: 942, width: 54, height: 8, borderRadius: 4, background: "#A87C28" }} />
        <div
          style={{
            position: "absolute",
            left: bx,
            top: 948,
            width: 46,
            height: 94,
            clipPath: "polygon(0% 0%, 100% 0%, 100% 74%, 50% 100%, 0% 74%)",
            background: "linear-gradient(180deg,#F1CB80 0%,#E7B24C 52%,#C08F31 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: bx + 15,
            top: 972,
            width: 16,
            height: 16,
            borderRadius: 4,
            transform: "rotate(45deg)",
            background: "#8B6620",
          }}
        />
      </div>
    ))}

    {/* ================= L2 · ARENA WALL — solid, full width ================ */}
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 1040,
        width: 1080,
        height: 60,
        background: "linear-gradient(180deg,#F2E6CB 0%,#E2CFAA 62%,#D2BA92 100%)",
      }}
    />
    <div style={{ position: "absolute", left: 0, top: 1040, width: 1080, height: 6, background: "#FCF5E4" }} />

    {/* torches — small gold flames, this is daylight */}
    {[38, 1002].map((tx, i) => (
      <div key={i}>
        <Bloom x={tx + 17} y={1024} r={110} c="rgba(255,214,132,0.75)" />
        <div style={{ position: "absolute", left: tx + 8, top: 1046, width: 18, height: 34, borderRadius: 4, background: "linear-gradient(180deg,#7A6141 0%,#54402A 100%)" }} />
        <div
          style={{
            position: "absolute",
            left: tx,
            top: 1000,
            width: 34,
            height: 52,
            borderRadius: "50% 50% 50% 50% / 62% 62% 38% 38%",
            background: "linear-gradient(180deg,#FFEFC4 0%,#E7B24C 48%,#D2724E 100%)",
          }}
        />
      </div>
    ))}

    {/* ================= L3 · SAND — one solid full-width band ============== */}
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 1096,
        width: 1080,
        height: 824,
        background:
          "linear-gradient(180deg,#F4E0B4 0%,#E5C990 28%,#D4B274 62%,#BE9757 100%)",
      }}
    />
    {[
      [-60, 1226, 640, 30],
      [520, 1330, 700, 34],
      [-120, 1470, 760, 40],
    ].map(([rx, ry, rw, rh], i) => (
      <div
        key={i}
        style={{
          position: "absolute",
          left: rx,
          top: ry,
          width: rw,
          height: rh,
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(178,138,86,0.42), rgba(178,138,86,0) 70%)",
          filter: "blur(9px)",
        }}
      />
    ))}
    {/* light aperture behind the hero */}
    <Bloom x={930} y={1298} r={310} c="rgba(255,251,232,0.95)" />
    <Bloom x={918} y={1444} r={244} c="rgba(255,236,196,0.85)" />

    {/* ================= L4 · BRACKET CONNECTORS =========================== */}
    {[0, 1, 2, 3].map((p) => (
      <div key={p}>
        <div style={{ position: "absolute", left: 130 + p * 178, top: 1152, width: 4, height: 8, background: "#B39C7C" }} />
        <div style={{ position: "absolute", left: 219 + p * 178, top: 1152, width: 4, height: 8, background: "#B39C7C" }} />
        <div style={{ position: "absolute", left: 132 + p * 178, top: 1160, width: 89, height: 4, background: "#B39C7C" }} />
        <div style={{ position: "absolute", left: 174 + p * 178, top: 1160, width: 4, height: 10, background: "#B39C7C" }} />
      </div>
    ))}
    {[0, 1].map((p) => (
      <div key={p}>
        <div style={{ position: "absolute", left: 174 + p * 356, top: 1226, width: 4, height: 8, background: "#B39C7C" }} />
        <div style={{ position: "absolute", left: 352 + p * 356, top: 1226, width: 4, height: 8, background: "#B39C7C" }} />
        <div style={{ position: "absolute", left: 176 + p * 356, top: 1234, width: 178, height: 4, background: "#B39C7C" }} />
        <div style={{ position: "absolute", left: 263 + p * 356, top: 1234, width: 4, height: 10, background: "#B39C7C" }} />
      </div>
    ))}
    <div style={{ position: "absolute", left: 263, top: 1306, width: 4, height: 8, background: "#B39C7C" }} />
    <div style={{ position: "absolute", left: 619, top: 1306, width: 4, height: 8, background: "#B39C7C" }} />
    <div style={{ position: "absolute", left: 265, top: 1314, width: 356, height: 4, background: "#B39C7C" }} />

    {/* the one surviving path, lit gold */}
    {[
      [308, 1152, 4, 8],
      [310, 1160, 46, 4],
      [352, 1160, 4, 10],
      [352, 1226, 4, 8],
      [265, 1234, 89, 4],
      [263, 1234, 4, 10],
      [263, 1306, 4, 8],
      [265, 1314, 179, 4],
      [442, 1314, 4, 14],
    ].map(([gx, gy, gw, gh], i) => (
      <div
        key={i}
        style={{
          position: "absolute",
          left: gx,
          top: gy,
          width: gw,
          height: gh,
          background: "#E7B24C",
          boxShadow: "0 0 12px rgba(231,178,76,0.85)",
        }}
      />
    ))}

    {/* ================= L5 · THE FIELD — round of 8 ======================= */}
    {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
      const cx = 96 + i * 89;
      const dead = [1, 0, 0, 1, 0, 1, 1, 0][i] === 1;
      const gold = i === 2;
      return (
        <div key={i}>
          <div
            style={{
              position: "absolute",
              left: cx,
              top: 1096,
              width: 72,
              height: 56,
              borderRadius: 8,
              boxSizing: "border-box",
              border: gold ? "2px solid #E7B24C" : "2px solid #D9CDB5",
              background: dead
                ? "linear-gradient(180deg,#EFE8DA 0%,#DFD6C4 100%)"
                : "linear-gradient(180deg,#FBF6EA 0%,#F1E9D8 100%)",
              boxShadow: gold
                ? "0 0 16px rgba(231,178,76,0.70), 0 8px 16px -6px rgba(96,68,42,0.40)"
                : "0 8px 16px -6px rgba(96,68,42,0.40)",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: cx + 8,
              top: 1104,
              width: 20,
              height: 15,
              borderRadius: 4,
              background: ["#3A5C84", "#D2724E", "#3F9E74", "#E7B24C", "#C44A3A", "#4E7EA8", "#B08A3E", "#7A6BA8"][i],
            }}
          />
          <div style={{ position: "absolute", left: cx + 34, top: 1106, width: 26, height: 5, borderRadius: 3, background: "#B9AF9B" }} />
          <div style={{ position: "absolute", left: cx + 34, top: 1117, width: 19, height: 4, borderRadius: 2, background: "#CCC3B0" }} />
          <div
            style={{
              position: "absolute",
              left: cx + 8,
              top: 1126,
              fontFamily: mono,
              fontWeight: 700,
              fontSize: 14,
              letterSpacing: "0.04em",
              color: "#6B6355",
            }}
          >
            {["v03", "v17", "v08", "v11", "v02", "v14", "v06", "v19"][i]}
          </div>
          {dead && (
            <>
              <div style={{ position: "absolute", left: cx + 20, top: 1108, width: 32, height: 5, borderRadius: 3, background: "#C44A3A", transform: "rotate(45deg)" }} />
              <div style={{ position: "absolute", left: cx + 20, top: 1108, width: 32, height: 5, borderRadius: 3, background: "#C44A3A", transform: "rotate(-45deg)" }} />
            </>
          )}
        </div>
      );
    })}

    {/* ---- round of 4 ---- */}
    {[0, 1, 2, 3].map((i) => {
      const cx = [130, 308, 486, 664][i];
      const dead = [1, 0, 0, 1][i] === 1;
      const gold = i === 1;
      return (
        <div key={i}>
          <div
            style={{
              position: "absolute",
              left: cx,
              top: 1170,
              width: 92,
              height: 56,
              borderRadius: 9,
              boxSizing: "border-box",
              border: gold ? "3px solid #E7B24C" : "2px solid #D9CDB5",
              background: dead
                ? "linear-gradient(180deg,#EFE8DA 0%,#DFD6C4 100%)"
                : "linear-gradient(180deg,#FBF6EA 0%,#F1E9D8 100%)",
              boxShadow: gold
                ? "0 0 18px rgba(231,178,76,0.75), 0 8px 16px -6px rgba(96,68,42,0.40)"
                : "0 8px 16px -6px rgba(96,68,42,0.40)",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: cx + 10,
              top: 1178,
              width: 24,
              height: 16,
              borderRadius: 4,
              background: ["#D2724E", "#3F9E74", "#C44A3A", "#7A6BA8"][i],
            }}
          />
          <div style={{ position: "absolute", left: cx + 42, top: 1180, width: 36, height: 6, borderRadius: 3, background: "#B9AF9B" }} />
          <div style={{ position: "absolute", left: cx + 42, top: 1192, width: 25, height: 5, borderRadius: 3, background: "#CCC3B0" }} />
          <div
            style={{
              position: "absolute",
              left: cx + 10,
              top: 1200,
              fontFamily: mono,
              fontWeight: 700,
              fontSize: 16,
              letterSpacing: "0.04em",
              color: "#6B6355",
            }}
          >
            {["v17", "v08", "v02", "v19"][i]}
          </div>
          {dead && (
            <>
              <div style={{ position: "absolute", left: cx + 29, top: 1183, width: 34, height: 6, borderRadius: 3, background: "#C44A3A", transform: "rotate(45deg)" }} />
              <div style={{ position: "absolute", left: cx + 29, top: 1183, width: 34, height: 6, borderRadius: 3, background: "#C44A3A", transform: "rotate(-45deg)" }} />
            </>
          )}
        </div>
      );
    })}

    {/* ---- round of 2 ---- */}
    {[0, 1].map((i) => {
      const cx = [207, 563][i];
      const dead = i === 1;
      return (
        <div key={i}>
          <div
            style={{
              position: "absolute",
              left: cx,
              top: 1244,
              width: 116,
              height: 62,
              borderRadius: 11,
              boxSizing: "border-box",
              border: dead ? "2px solid #D9CDB5" : "3px solid #E7B24C",
              background: dead
                ? "linear-gradient(180deg,#EFE8DA 0%,#DFD6C4 100%)"
                : "linear-gradient(180deg,#FBF6EA 0%,#F1E9D8 100%)",
              boxShadow: dead
                ? "0 10px 18px -6px rgba(96,68,42,0.42)"
                : "0 0 22px rgba(231,178,76,0.75), 0 10px 18px -6px rgba(96,68,42,0.42)",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: cx + 12,
              top: 1254,
              width: 30,
              height: 19,
              borderRadius: 5,
              background: ["#3F9E74", "#C44A3A"][i],
            }}
          />
          <div style={{ position: "absolute", left: cx + 50, top: 1256, width: 46, height: 7, borderRadius: 4, background: "#B9AF9B" }} />
          <div style={{ position: "absolute", left: cx + 50, top: 1270, width: 32, height: 6, borderRadius: 3, background: "#CCC3B0" }} />
          <div
            style={{
              position: "absolute",
              left: cx + 12,
              top: 1280,
              fontFamily: mono,
              fontWeight: 700,
              fontSize: 19,
              letterSpacing: "0.04em",
              color: "#5C5446",
            }}
          >
            {["v08", "v02"][i]}
          </div>
          {dead && (
            <>
              <div style={{ position: "absolute", left: cx + 38, top: 1260, width: 40, height: 7, borderRadius: 4, background: "#C44A3A", transform: "rotate(45deg)" }} />
              <div style={{ position: "absolute", left: cx + 38, top: 1260, width: 40, height: 7, borderRadius: 4, background: "#C44A3A", transform: "rotate(-45deg)" }} />
            </>
          )}
        </div>
      );
    })}

    {/* ================= L6 · THE CHAMPION + THE VERB ======================= */}
    {/* pedestal first — the card stands on it */}
    <div
      style={{
        position: "absolute",
        left: 276,
        top: 1548,
        width: 336,
        height: 46,
        borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(88,58,30,0.60), rgba(90,60,32,0) 70%)",
        filter: "blur(9px)",
      }}
    />
    <div style={{ position: "absolute", left: 322, top: 1462, width: 244, height: 48, background: "linear-gradient(180deg,#C2A87F 0%,#A0855C 100%)", boxShadow: "0 12px 22px -8px rgba(92,62,34,0.50)" }} />
    <div style={{ position: "absolute", left: 296, top: 1510, width: 296, height: 50, background: "linear-gradient(180deg,#AC9066 0%,#8B7149 100%)", boxShadow: "0 12px 22px -8px rgba(92,62,34,0.50)" }} />
    <div style={{ position: "absolute", left: 322, top: 1462, width: 244, height: 7, background: "#EFE0C2" }} />
    <div style={{ position: "absolute", left: 296, top: 1510, width: 296, height: 5, background: "#D9C39C" }} />

    {/* the burst, behind the card */}
    <Bloom x={444} y={1394} r={310} c="rgba(255,214,132,0.92)" />
    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => (
      <div
        key={i}
        style={{
          position: "absolute",
          left: 438,
          top: 1394 - (i % 2 === 0 ? 156 : 112),
          width: 11,
          height: i % 2 === 0 ? 156 : 112,
          transform: `rotate(${i * 30}deg)`,
          transformOrigin: "50% 100%",
          background: "linear-gradient(180deg, rgba(255,232,178,0) 0%, #F0C264 62%, #FFE1A6 100%)",
        }}
      />
    ))}

    {/* the crown, dropped into the gap between the round-of-4 cards */}
    <Bloom x={444} y={1286} r={132} c="rgba(255,222,152,0.90)" />
    <div
      style={{
        position: "absolute",
        left: 400,
        top: 1254,
        width: 88,
        height: 60,
        background: "linear-gradient(180deg,#FBE3A6 0%,#E7B24C 56%,#C08F31 100%)",
        clipPath:
          "polygon(0% 100%, 0% 26%, 18% 60%, 36% 0%, 50% 34%, 64% 0%, 82% 60%, 100% 26%, 100% 100%)",
      }}
    />
    {[414, 440, 466].map((gx, i) => (
      <div key={i} style={{ position: "absolute", left: gx, top: 1296, width: 10, height: 10, borderRadius: 2, background: "#C44A3A" }} />
    ))}

    {/* the champion card */}
    <div
      style={{
        position: "absolute",
        left: 346,
        top: 1326,
        width: 196,
        height: 136,
        borderRadius: 16,
        boxSizing: "border-box",
        border: "5px solid #E7B24C",
        background: "linear-gradient(180deg,#FEFAF0 0%,#F5EBD6 100%)",
        boxShadow: "0 0 46px rgba(231,178,76,0.85), 0 18px 34px -10px rgba(96,68,42,0.50)",
      }}
    />
    <div style={{ position: "absolute", left: 368, top: 1346, width: 152, height: 58, borderRadius: 8, background: "linear-gradient(150deg,#3F9E74 0%,#2E7C59 100%)" }} />
    <div style={{ position: "absolute", left: 380, top: 1357, width: 74, height: 8, borderRadius: 4, background: "#CFEBDD" }} />
    <div style={{ position: "absolute", left: 380, top: 1371, width: 52, height: 7, borderRadius: 4, background: "#A8D6C2" }} />
    <div style={{ position: "absolute", left: 380, top: 1384, width: 90, height: 7, borderRadius: 4, background: "#A8D6C2" }} />
    <div
      style={{
        position: "absolute",
        left: 368,
        top: 1410,
        fontFamily: mono,
        fontWeight: 700,
        fontSize: 30,
        letterSpacing: "0.05em",
        color: "#3A342A",
      }}
    >
      v08
    </div>
    <div
      style={{
        position: "absolute",
        left: 472,
        top: 1406,
        width: 44,
        height: 44,
        borderRadius: "50%",
        background: "#E7B24C",
        boxShadow: "0 0 18px rgba(231,178,76,0.90)",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 10,
          top: 13,
          width: 24,
          height: 19,
          background: "#2E2618",
          clipPath: "polygon(10% 46%, 25% 30%, 41% 51%, 78% 8%, 92% 23%, 41% 84%)",
        }}
      />
    </div>

    {/* confetti — kept off the card face */}
    {[
      [300, 1268, 16, 24],
      [604, 1258, 12, -30],
      [268, 1336, 15, 18],
      [630, 1330, 11, 44],
      [286, 1400, 14, -12],
      [612, 1396, 17, 32],
      [258, 1462, 12, 8],
      [628, 1456, 15, -24],
      [330, 1492, 13, 38],
      [566, 1498, 16, -16],
      [364, 1238, 11, 22],
      [528, 1230, 13, -34],
      [300, 1530, 14, 10],
      [596, 1536, 12, 28],
    ].map(([fx, fy, fs, fr], i) => (
      <div
        key={i}
        style={{
          position: "absolute",
          left: fx,
          top: fy,
          width: fs,
          height: fs * 0.62,
          borderRadius: 2,
          transform: `rotate(${fr}deg)`,
          background: ["#E7B24C", "#D2724E", "#C44A3A", "#B8873A"][i % 4],
          boxShadow: "0 0 12px rgba(231,178,76,0.65)",
        }}
      />
    ))}

    {/* ================= L7 · HERO — Claude the judge, right of the funnel == */}
    <div
      style={{
        position: "absolute",
        left: 769,
        top: 1456,
        width: 314,
        height: 46,
        borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(84,54,28,0.72), rgba(88,58,30,0) 70%)",
        filter: "blur(8px)",
      }}
    />
    <div style={{ position: "absolute", left: 806, top: 1262 }}>
      <PkMascot lf={24} size={240} judge={1} cheer={0.5} />
    </div>

    {/* ================= L8 · FOREGROUND — sand + motes ===================== */}
    <div style={{ position: "absolute", left: 0, top: 860, width: 1080, height: 700 }}>
      <Dust n={24} w={1080} h={700} c="rgba(255,247,224,0.95)" s={13} />
    </div>
    <div style={{ position: "absolute", left: 0, top: 1200, width: 1080, height: 440 }}>
      <Dust n={13} w={1080} h={440} c="rgba(214,150,80,0.85)" s={37} />
    </div>
    <div
      style={{
        position: "absolute",
        left: -80,
        top: 1590,
        width: 1240,
        height: 200,
        borderRadius: "50%",
        background: "linear-gradient(180deg,#C89C66 0%,#A87F4E 100%)",
        filter: "blur(3px)",
      }}
    />
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 1680,
        width: 1080,
        height: 240,
        background: "linear-gradient(180deg, rgba(116,82,46,0) 0%, rgba(108,74,40,0.48) 100%)",
      }}
    />
  </>
);

export const CoverArena: React.FC = () => (
  <SceneCover
    scene={<ArenaScene />}
    line1={<>20 VERSIONS. <span style={{ color: CLAY }}>ONE</span></>}
    giant={<>CHAMPION</>}
    giantSize={142}
  />
);

/* ---------- VAULT ---------- */

/* ==========================================================================
   VAULT — scene body · 1080 x 1920 full-bleed static still
   Headline "CLAUDE LEARNS YOUR / JUDGMENT" is composited over the top band
   later, so EVERY pixel above y780 is sky gradient + radial glow only.
   Topmost drawn element = the study wall cornice, y=856.

   THE FIX vs the original reel: reel 38 died because the payoff was abstract.
   Here the payoff is a THING you could screenshot — one portrait file card
   titled `judgment.md` carrying four literal, readable rules, each ticked
   gold, lit in a glass display case on a plinth. That card is the hero.

   THE VERB (reads left -> right): a floor pile of past-decision cards lifts
   off along a rising gold trail, one card is caught mid-flight already half
   rewritten, and it lands in a burst on the left edge of the rules file.
   Cause (decisions you already made) -> effect (the file that encodes them).

   DEPTH: sky · study wall + rail + shafts · dark alcove (the aperture) ·
          floor · plinth · decision pile + trail + flying card · the FILE +
          glass case · Claude (hero) · desk edge + motes.
   Claude is pushed off-centre LEFT to x51..277 so he covers neither the
   alcove (starts x540) nor the pile (starts x296). Nothing load-bearing sits
   behind him — the alcove is the contrasting aperture, and it is off to the
   RIGHT where he cannot reach it.
   Floor is ONE solid full-width band — never two shapes with a gap.
   ⛔ no vault door, no dial, no countdown, no clock.
   ========================================================================== */

const VaultScene: React.FC = () => (
  <>
    {/* ================= L0 · SKY — quiet zone (gradient + glow ONLY) ======= */}
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: 1080,
        height: 1346,
        background:
          "linear-gradient(180deg,#FDF8EE 0%,#FBEEDA 26%,#F6DDB4 60%,#EFC894 100%)",
      }}
    />
    <Bloom x={540} y={300} r={560} c="rgba(255,248,226,0.95)" />
    <Bloom x={828} y={470} r={340} c="rgba(255,230,176,0.62)" />
    <Bloom x={140} y={250} r={300} c="rgba(255,240,206,0.55)" />

    {/* ================= L1 · THE STUDY WALL ===============================
        Topmost geometry in the whole scene: the cornice at y=856.          */}
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 856,
        width: 1080,
        height: 490,
        background:
          "linear-gradient(180deg,#F7E7CA 0%,#EFD8AE 52%,#E4C79A 100%)",
      }}
    />
    <div style={{ position: "absolute", left: 0, top: 856, width: 1080, height: 15, background: "#FCF2DE" }} />
    <div style={{ position: "absolute", left: 0, top: 871, width: 1080, height: 7, background: "rgba(92,64,34,0.28)" }} />
    {/* picture rail — drawn BEFORE the alcove so the alcove reads as inset */}
    <div style={{ position: "absolute", left: 0, top: 1186, width: 1080, height: 9, background: "#DCC195" }} />
    <div style={{ position: "absolute", left: 0, top: 1195, width: 1080, height: 6, background: "rgba(92,64,34,0.20)" }} />
    {/* light shafts — start well below the quiet-zone line */}
    {[
      [676, 172, -12],
      [286, 126, 10],
      [946, 100, -15],
    ].map(([sx, sw, sk], i) => (
      <div
        key={i}
        style={{
          position: "absolute",
          left: sx,
          top: 880,
          width: sw,
          height: 466,
          background:
            "linear-gradient(180deg, rgba(255,243,210,0.52), rgba(255,243,210,0))",
          transform: `skewX(${sk}deg)`,
          filter: "blur(17px)",
        }}
      />
    ))}

    {/* ================= L2 · THE ALCOVE — dark aperture, OFF-CENTRE RIGHT ==
        A cream document on a cream wall vanishes. The file needs somewhere
        dark to sit, and it must be somewhere the centred-left hero can never
        stand in front of.                                                   */}
    <div
      style={{
        position: "absolute",
        left: 540,
        top: 880,
        width: 520,
        height: 466,
        borderRadius: "26px 26px 0 0",
        background: "linear-gradient(180deg,#F9EDD5,#D9BE93)",
        boxShadow: "0 24px 46px -16px rgba(70,46,20,0.45)",
      }}
    />
    <div
      style={{
        position: "absolute",
        left: 552,
        top: 892,
        width: 496,
        height: 454,
        borderRadius: "18px 18px 0 0",
        background:
          "linear-gradient(180deg,#3B2C1F 0%,#2E2217 58%,#241A11 100%)",
        overflow: "hidden",
      }}
    >
      {/* back battens so the recess has a surface instead of being a hole */}
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} style={{ position: "absolute", left: 26 + i * 88, top: 0, width: 5, height: 454, background: "#4A3524" }} />
      ))}
      <div style={{ position: "absolute", left: 0, top: 0, width: 496, height: 88, background: "linear-gradient(180deg, rgba(14,9,4,0.42), rgba(14,9,4,0))" }} />
      <div style={{ position: "absolute", left: 0, top: 250, width: 496, height: 204, background: "linear-gradient(180deg, rgba(255,204,128,0) 0%, rgba(255,200,116,0.22) 100%)" }} />
    </div>
    {/* the display spotlight falling into the alcove */}
    <Bloom x={800} y={1050} r={280} c="rgba(255,226,158,0.70)" />

    {/* ================= L3 · FLOOR — one solid full-width band ============= */}
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 1346,
        width: 1080,
        height: 574,
        background:
          "linear-gradient(180deg,#D7B589 0%,#C49C6D 30%,#AE8556 72%,#9A7147 100%)",
      }}
    />
    <div style={{ position: "absolute", left: 0, top: 1346, width: 1080, height: 7, background: "#EBD2AB" }} />
    {/* contrasting pool under the hero — a warm sprite on warm ground dies */}
    <Bloom x={164} y={1392} r={330} c="rgba(255,247,224,0.93)" />
    <Bloom x={164} y={1440} r={228} c="rgba(255,233,192,0.74)" />

    {/* ================= L4 · THE PLINTH ==================================== */}
    <div
      style={{
        position: "absolute",
        left: 552,
        top: 1382,
        width: 496,
        height: 52,
        borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(96,64,36,0.55), rgba(96,64,36,0) 70%)",
        filter: "blur(9px)",
      }}
    />
    <div
      style={{
        position: "absolute",
        left: 566,
        top: 1304,
        width: 468,
        height: 96,
        borderRadius: 10,
        background: "linear-gradient(180deg,#8A6844 0%,#6B4E32 62%,#5A4029 100%)",
      }}
    />
    <div style={{ position: "absolute", left: 566, top: 1304, width: 468, height: 11, background: "#A98461" }} />
    <div
      style={{
        position: "absolute",
        left: 542,
        top: 1372,
        width: 516,
        height: 34,
        borderRadius: 9,
        background: "linear-gradient(180deg,#7A5B3A,#57402A)",
      }}
    />

    {/* ================= L5 · THE VERB ======================================
        A floor pile of decisions you already made, lifting off along a gold
        trail into the file. Drawn bottom-card-first so the pile reads as a
        pile, and the trail is drawn OVER the cards so they read as leaving. */}
    <div
      style={{
        position: "absolute",
        left: 258,
        top: 1408,
        width: 320,
        height: 46,
        borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(96,64,36,0.55), rgba(96,64,36,0) 70%)",
        filter: "blur(8px)",
      }}
    />
    {[
      [306, 1356, 206, 76, 5],
      [318, 1300, 202, 76, -4],
      [302, 1244, 208, 76, 6],
      [316, 1188, 204, 76, -3],
    ].map(([cx, cy, cw, ch, rot], i) => (
      <div
        key={i}
        style={{
          position: "absolute",
          left: cx,
          top: cy,
          width: cw,
          height: ch,
          borderRadius: 10,
          transform: `rotate(${rot}deg)`,
          background: "linear-gradient(180deg,#FBF6EA,#EFE7D4)",
          boxSizing: "border-box",
          border: "3px solid #D8CCB4",
          boxShadow: "0 12px 24px -6px rgba(96,68,42,0.45)",
        }}
      >
        <div style={{ position: "absolute", left: 18, top: 19, width: 62, height: 13, borderRadius: 7, background: "#A9A08C" }} />
        <div style={{ position: "absolute", left: 18, top: 42, width: 94, height: 9, borderRadius: 5, background: "#C6BDAA" }} />
        <div
          style={{
            position: "absolute",
            left: cw - 62,
            top: 18,
            width: 38,
            height: 38,
            borderRadius: 11,
            background: "linear-gradient(180deg,#4CB183,#3A8F68)",
            boxShadow: "0 4px 11px rgba(52,120,90,0.5)",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 9,
              top: 11,
              width: 21,
              height: 17,
              background: "#FFFFFF",
              clipPath: "polygon(10% 46%, 25% 30%, 41% 51%, 78% 8%, 92% 23%, 41% 84%)",
            }}
          />
        </div>
      </div>
    ))}

    {/* the rising gold trail — GOLD, never pale: a cream trail on cream is
        the same value and renders invisible */}
    {Array.from({ length: 11 }).map((_, i) => {
      const t = i / 10;
      const x = 320 + 250 * t;
      const y = 1210 - 176 * t - 54 * Math.sin(Math.PI * t);
      const ang =
        (Math.atan2(-176 - 54 * Math.PI * Math.cos(Math.PI * t), 250) * 180) / Math.PI;
      const w = 26 + 16 * t;
      return (
        <div
          key={i}
          style={{
            position: "absolute",
            left: x - w / 2,
            top: y - 6,
            width: w,
            height: 12,
            borderRadius: 6,
            transform: `rotate(${ang}deg)`,
            background: i % 3 === 0 ? "#F0C066" : "#E7B24C",
            boxShadow: "0 0 18px rgba(231,178,76,0.85)",
          }}
        />
      );
    })}

    {/* the card caught in flight — left half is still the raw decision,
        right half has already become a rule */}
    <div
      style={{
        position: "absolute",
        left: 407,
        top: 1010,
        width: 116,
        height: 90,
        borderRadius: 10,
        transform: "rotate(-14deg)",
        boxSizing: "border-box",
        border: "3px solid #E0D5BC",
        background:
          "linear-gradient(90deg,#E4DBC7 0%,#EAE1CD 42%,#FFFCF3 54%,#FFFDF7 100%)",
        boxShadow: "0 0 40px rgba(255,214,140,0.9), 0 12px 24px -6px rgba(90,66,42,0.45)",
      }}
    >
      <div style={{ position: "absolute", left: 11, top: 18, width: 34, height: 8, borderRadius: 4, background: "#A79E8C" }} />
      <div style={{ position: "absolute", left: 11, top: 34, width: 26, height: 8, borderRadius: 4, background: "#B3AA97" }} />
      <div style={{ position: "absolute", left: 11, top: 50, width: 31, height: 8, borderRadius: 4, background: "#A79E8C" }} />
      <div style={{ position: "absolute", left: 53, top: 8, width: 4, height: 68, background: "#E7B24C" }} />
      <div style={{ position: "absolute", left: 66, top: 16, width: 36, height: 11, borderRadius: 6, background: "#3A5C84" }} />
      <div style={{ position: "absolute", left: 66, top: 35, width: 38, height: 7, borderRadius: 4, background: "#C6BCA8" }} />
      <div
        style={{
          position: "absolute",
          left: 66,
          top: 52,
          width: 21,
          height: 18,
          background: "#3F9E74",
          clipPath: "polygon(10% 46%, 25% 30%, 41% 51%, 78% 8%, 92% 23%, 41% 84%)",
        }}
      />
    </div>

    {/* the landing burst — centred ON the file's left edge so it haloes out
        from BEHIND the card. Painted over the card it would crisscross the
        artifact with streaks and it would stop reading as a document. */}
    <Bloom x={566} y={1034} r={210} c="rgba(255,226,152,0.85)" />
    <div style={{ position: "absolute", left: 566, top: 1034, width: 0, height: 0 }}>
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: 0,
            top: -6,
            width: 42 + (i % 3) * 20,
            height: 12,
            borderRadius: 6,
            transformOrigin: "0 50%",
            transform: `rotate(${i * 30 + 10}deg) translateX(58px)`,
            background:
              i % 2 === 0
                ? "linear-gradient(90deg,#E7B24C,rgba(231,178,76,0.40))"
                : "linear-gradient(90deg,#4FD69A,rgba(79,214,154,0.40))",
          }}
        />
      ))}
    </div>

    {/* ================= L6 · THE HERO ARTIFACT — judgment.md =============== */}
    <div
      style={{
        position: "absolute",
        left: 570,
        top: 916,
        width: 460,
        height: 400,
        borderRadius: 14,
        boxSizing: "border-box",
        border: "5px solid #E2D6BC",
        background: "linear-gradient(180deg,#FFFDF6,#F4EDDC)",
        boxShadow:
          "0 24px 46px -12px rgba(60,40,20,0.55), 0 0 64px rgba(255,214,140,0.50)",
      }}
    >
      {/* title bar */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 450,
          height: 76,
          borderRadius: "9px 9px 0 0",
          background: "linear-gradient(180deg,#48688F,#33517A)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 22,
          top: 22,
          fontFamily: mono,
          fontWeight: 700,
          fontSize: 30,
          letterSpacing: "0.03em",
          color: "#EAF1FA",
        }}
      >
        judgment.md
      </div>
      {["#E7B24C", "#D2724E", "#3F9E74"].map((dc, i) => (
        <div
          key={i}
          style={{ position: "absolute", left: 344 + i * 26, top: 32, width: 14, height: 14, borderRadius: "50%", background: dc }}
        />
      ))}

      {/* the four rules — the whole point of the reel, made readable */}
      {[
        "> price on value, not hours",
        "> say no to scope creep",
        "> refund fast, never argue",
        "> ship weekly, not monthly",
      ].map((line, i) => (
        <div key={i}>
          <div
            style={{
              position: "absolute",
              left: 22,
              top: 111 + i * 70,
              width: 38,
              height: 38,
              borderRadius: 10,
              background: "linear-gradient(180deg,#F0C066,#DFA43C)",
              boxShadow: "0 4px 10px rgba(150,110,40,0.45)",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: 9,
                top: 11,
                width: 21,
                height: 17,
                background: "#FFF8E8",
                clipPath: "polygon(10% 46%, 25% 30%, 41% 51%, 78% 8%, 92% 23%, 41% 84%)",
              }}
            />
          </div>
          <div
            style={{
              position: "absolute",
              left: 74,
              top: 118 + i * 70,
              fontFamily: mono,
              fontWeight: 700,
              fontSize: 22,
              letterSpacing: "-0.02em",
              color: "#2C2820",
            }}
          >
            {line}
          </div>
          {i < 3 && (
            <div
              style={{ position: "absolute", left: 22, top: 162 + i * 70, width: 406, height: 2, background: "#E4DAC4" }}
            />
          )}
        </div>
      ))}

      {/* sheen across the sheet */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 450,
          height: 390,
          borderRadius: 9,
          background:
            "linear-gradient(118deg, rgba(255,255,255,0.42) 0%, rgba(255,255,255,0.12) 26%, rgba(255,255,255,0) 44%)",
        }}
      />
    </div>

    {/* the glass display case — the reflection the brief asked for */}
    <div
      style={{
        position: "absolute",
        left: 552,
        top: 898,
        width: 496,
        height: 436,
        borderRadius: 18,
        boxSizing: "border-box",
        border: "4px solid rgba(255,246,220,0.58)",
        background:
          "linear-gradient(140deg, rgba(255,252,240,0.22) 0%, rgba(255,252,240,0.05) 38%, rgba(255,252,240,0.18) 100%)",
      }}
    />
    <div
      style={{
        position: "absolute",
        left: 592,
        top: 906,
        width: 96,
        height: 420,
        transform: "skewX(-16deg)",
        background:
          "linear-gradient(180deg, rgba(255,252,240,0.38), rgba(255,252,240,0.06))",
        filter: "blur(3px)",
      }}
    />

    {/* ================= L7 · HERO — Claude, off-centre LEFT ================
        feet land at 1254 + 240*0.92 - cheer*10 = y1470.                    */}
    <div
      style={{
        position: "absolute",
        left: 9,
        top: 1428,
        width: 310,
        height: 46,
        borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(88,56,30,0.74), rgba(92,60,32,0) 70%)",
        filter: "blur(8px)",
      }}
    />
    <div style={{ position: "absolute", left: 44, top: 1254 }}>
      <PkMascot lf={24} size={240} brainHat={1} cheer={0.45} />
    </div>

    {/* ================= L8 · FOREGROUND — desk edge + gold motes =========== */}
    <div style={{ position: "absolute", left: 0, top: 880, width: 1080, height: 640 }}>
      <Dust n={26} w={1080} h={640} c="rgba(255,240,206,0.95)" s={5} />
    </div>
    <div style={{ position: "absolute", left: 0, top: 1180, width: 1080, height: 420 }}>
      <Dust n={13} w={1080} h={420} c="rgba(212,146,74,0.88)" s={19} />
    </div>
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 1556,
        width: 1080,
        height: 20,
        background: "linear-gradient(180deg, rgba(96,66,38,0) 0%, rgba(96,66,38,0.34) 100%)",
      }}
    />
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 1576,
        width: 1080,
        height: 62,
        background: "linear-gradient(180deg,#B48D5C 0%,#96703F 100%)",
      }}
    />
    <div style={{ position: "absolute", left: 0, top: 1576, width: 1080, height: 8, background: "#DDBB86" }} />
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 1638,
        width: 1080,
        height: 282,
        background: "linear-gradient(180deg,#7E5C36 0%,#5E4327 100%)",
      }}
    />
  </>
);

export const CoverVault: React.FC = () => (
  <SceneCover
    scene={<VaultScene />}
    line1={<>CLAUDE LEARNS <span style={{ color: CLAY }}>YOUR</span></>}
    giant={<>JUDGMENT</>}
    giantSize={142}
  />
);

/* ---------- MINT ---------- */

/* ==========================================================================
   MINT — scene body · 1080 x 1920 full-bleed static still
   Headline "CLAUDE RUNS YOUR / BROWSER" is composited over the top band
   later, so EVERY pixel above y780 is sky gradient + radial glow only.
   Topmost drawn element = the browser window's chrome, y=880.

   THE VERB: a gold cursor has just clicked into the fourth field of a form.
   Three rows above it are already filled and ticked green; the fourth is
   mid-type with a caret and a gold focus ring; a click ripple bursts out of
   the pointer tip and a gold motion trail records the hop it just made down
   from row three. To the right, on the desk, three finished task cards.

   DEPTH: sky · haze + shafts · desk plane · monitor stand · the browser
          panel (the artifact) · cursor + ripple + trail (the verb) ·
          finished task cards · Claude (hero) · desk rail + motes.
   The browser frame is deliberately dark slate: a cream panel on a cream
   page has no silhouette, and the white viewport needs something to sit in.
   Claude is off-centre LEFT (sprite x47..283). His crown is at y1305, which
   only ever reaches the panel's empty footer strip (y1292..1330) — no field,
   no check and no cursor is behind him.
   Desk is ONE solid full-width band — never two shapes with a gap.
   ⛔ no countdown, no timer, no alarm-red clock.
   ========================================================================== */

const MintScene: React.FC = () => (
  <>
    {/* ================= L0 · SKY — quiet zone (gradient + glow ONLY) ======= */}
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: 1080,
        height: 1348,
        background:
          "linear-gradient(180deg,#FDF8EE 0%,#FBEEDA 28%,#F6DDB4 62%,#EFC894 100%)",
      }}
    />
    <Bloom x={540} y={290} r={560} c="rgba(255,248,226,0.95)" />
    <Bloom x={880} y={430} r={330} c="rgba(255,228,172,0.62)" />
    <Bloom x={150} y={280} r={300} c="rgba(255,240,206,0.55)" />

    {/* ================= L1 · FAR — light shafts + haze ===================== */}
    {[
      [640, 176, -12],
      [246, 128, 10],
      [928, 104, -15],
    ].map(([sx, sw, sk], i) => (
      <div
        key={i}
        style={{
          position: "absolute",
          left: sx,
          top: 900,
          width: sw,
          height: 448,
          background:
            "linear-gradient(180deg, rgba(255,243,210,0.52), rgba(255,243,210,0))",
          transform: `skewX(${sk}deg)`,
          filter: "blur(17px)",
        }}
      />
    ))}
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 1048,
        width: 1080,
        height: 300,
        background:
          "linear-gradient(180deg, rgba(226,190,140,0) 0%, rgba(223,186,134,0.55) 52%, rgba(213,172,116,0.95) 100%)",
      }}
    />

    {/* ================= L2 · DESK — one solid full-width band ============== */}
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 1348,
        width: 1080,
        height: 572,
        background:
          "linear-gradient(180deg,#D8B78B 0%,#C49D6F 32%,#AE8557 74%,#986F45 100%)",
      }}
    />
    <div style={{ position: "absolute", left: 0, top: 1348, width: 1080, height: 7, background: "#EAD1AA" }} />
    {/* contrasting pool under the hero — warm sprite on warm desk dies */}
    <Bloom x={162} y={1394} r={330} c="rgba(255,248,226,0.93)" />
    <Bloom x={162} y={1444} r={228} c="rgba(255,233,192,0.74)" />

    {/* ================= L3 · MONITOR STAND ================================= */}
    <div
      style={{
        position: "absolute",
        left: 375,
        top: 1392,
        width: 330,
        height: 42,
        borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(96,64,36,0.55), rgba(96,64,36,0) 70%)",
        filter: "blur(9px)",
      }}
    />
    <div
      style={{
        position: "absolute",
        left: 496,
        top: 1326,
        width: 88,
        height: 58,
        background: "linear-gradient(90deg,#2A4058,#3E5A80 42%,#22364C 100%)",
      }}
    />
    <div
      style={{
        position: "absolute",
        left: 420,
        top: 1376,
        width: 240,
        height: 38,
        borderRadius: 12,
        background: "linear-gradient(180deg,#3E5A80,#243A52)",
      }}
    />

    {/* ================= L4 · THE BROWSER WINDOW — the artifact ============= */}
    <div
      style={{
        position: "absolute",
        left: 120,
        top: 880,
        width: 840,
        height: 450,
        borderRadius: 22,
        background: "linear-gradient(180deg,#3E5A80,#2A4058)",
        boxShadow: "0 30px 60px -20px rgba(70,48,26,0.55)",
      }}
    >
      {/* tab strip */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 840,
          height: 66,
          borderRadius: "22px 22px 0 0",
          background: "linear-gradient(180deg,#4A6890,#36527A)",
        }}
      />
      {["#D2724E", "#E7B24C", "#3F9E74"].map((dc, i) => (
        <div key={i} style={{ position: "absolute", left: 24 + i * 30, top: 25, width: 16, height: 16, borderRadius: "50%", background: dc }} />
      ))}
      <div
        style={{
          position: "absolute",
          left: 128,
          top: 14,
          width: 250,
          height: 52,
          borderRadius: "10px 10px 0 0",
          background: "#E9EEF5",
        }}
      >
        <div style={{ position: "absolute", left: 16, top: 16, width: 20, height: 20, borderRadius: 5, background: "#3A5C84" }} />
        <div style={{ position: "absolute", left: 46, top: 20, width: 132, height: 12, borderRadius: 6, background: "#93A3B8" }} />
      </div>
      <div
        style={{
          position: "absolute",
          left: 388,
          top: 22,
          width: 210,
          height: 44,
          borderRadius: "10px 10px 0 0",
          background: "#40608C",
        }}
      >
        <div style={{ position: "absolute", left: 18, top: 17, width: 120, height: 11, borderRadius: 6, background: "#7C97BA" }} />
      </div>

      {/* url row */}
      <div style={{ position: "absolute", left: 0, top: 66, width: 840, height: 66, background: "#33507A" }} />
      {[22, 58, 94].map((nx, i) => (
        <div key={i} style={{ position: "absolute", left: nx, top: 86, width: 28, height: 28, borderRadius: "50%", background: "#5A7CA6" }} />
      ))}
      <div
        style={{
          position: "absolute",
          left: 140,
          top: 82,
          width: 560,
          height: 42,
          borderRadius: 21,
          boxSizing: "border-box",
          border: "2px solid #DCD6C8",
          background: "#F2F0E9",
        }}
      >
        <div style={{ position: "absolute", left: 16, top: 12, width: 18, height: 18, borderRadius: 4, background: "#3F9E74" }} />
        <div
          style={{
            position: "absolute",
            left: 46,
            top: 8,
            fontFamily: mono,
            fontWeight: 700,
            fontSize: 21,
            letterSpacing: "0.01em",
            color: "#4A4438",
          }}
        >
          apply.yourcompany.com/form
        </div>
      </div>
      {[726, 770].map((ix, i) => (
        <div key={i} style={{ position: "absolute", left: ix, top: 88, width: 28, height: 28, borderRadius: 8, background: "#5A7CA6" }} />
      ))}

      {/* viewport */}
      <div
        style={{
          position: "absolute",
          left: 14,
          top: 138,
          width: 812,
          height: 274,
          borderRadius: 10,
          background: "linear-gradient(180deg,#FFFDF7,#F6F1E4)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 30,
            top: 20,
            fontFamily: mono,
            fontWeight: 700,
            fontSize: 20,
            letterSpacing: "0.17em",
            color: "#7A705E",
          }}
        >
          APPLICATION FORM
        </div>
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: 640 + i * 32,
              top: 26,
              width: 24,
              height: 10,
              borderRadius: 5,
              background: i < 3 ? "#3F9E74" : "#E7B24C",
            }}
          />
        ))}

        {["NAME", "EMAIL", "ROLE", "RESUME"].map((lab, i) => (
          <div key={i}>
            <div
              style={{
                position: "absolute",
                left: 30,
                top: 75 + i * 52,
                fontFamily: mono,
                fontWeight: 700,
                fontSize: 19,
                letterSpacing: "0.09em",
                color: "#8A8071",
              }}
            >
              {lab}
            </div>
            <div
              style={{
                position: "absolute",
                left: 158,
                top: 64 + i * 52,
                width: 520,
                height: 40,
                borderRadius: 8,
                boxSizing: "border-box",
                border: i < 3 ? "2px solid #DDD5C4" : "3px solid #E7B24C",
                background: "#FFFFFF",
                boxShadow:
                  i < 3
                    ? undefined
                    : "0 0 0 5px rgba(231,178,76,0.38), 0 0 26px rgba(231,178,76,0.55)",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: 16,
                  top: 13,
                  width: [312, 388, 244, 190][i],
                  height: 13,
                  borderRadius: 7,
                  background: "#9AA5B4",
                }}
              />
              {i === 3 && (
                <div style={{ position: "absolute", left: 216, top: 8, width: 4, height: 24, background: "#2C3B4F" }} />
              )}
            </div>
            {i < 3 ? (
              <div
                style={{
                  position: "absolute",
                  left: 700,
                  top: 66 + i * 52,
                  width: 38,
                  height: 38,
                  borderRadius: 11,
                  background: "linear-gradient(180deg,#4CB183,#3A8F68)",
                  boxShadow: "0 4px 11px rgba(52,120,90,0.5)",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    left: 9,
                    top: 11,
                    width: 21,
                    height: 17,
                    background: "#FFFFFF",
                    clipPath: "polygon(10% 46%, 25% 30%, 41% 51%, 78% 8%, 92% 23%, 41% 84%)",
                  }}
                />
              </div>
            ) : (
              <div
                style={{
                  position: "absolute",
                  left: 700,
                  top: 66 + i * 52,
                  width: 38,
                  height: 38,
                  borderRadius: "50%",
                  boxSizing: "border-box",
                  border: "6px solid #E7B24C",
                }}
              />
            )}
          </div>
        ))}
      </div>

      {/* empty status strip — the only part of the window Claude ever
          overlaps, kept deliberately free of content */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 412,
          width: 840,
          height: 38,
          borderRadius: "0 0 22px 22px",
          background: "linear-gradient(180deg,#33507A,#28405E)",
        }}
      />
    </div>

    {/* ================= L5 · THE VERB — cursor, ripple, trail ==============
        ⭐ everything in motion is GOLD: a pale trail is the same value as
        cream and renders invisible.                                        */}
    {Array.from({ length: 7 }).map((_, i) => {
      const t = i / 6;
      const x = 398 + 168 * t;
      const y = 1146 + 80 * t + 22 * Math.sin(Math.PI * t);
      const ang =
        (Math.atan2(80 + 22 * Math.PI * Math.cos(Math.PI * t), 168) * 180) / Math.PI;
      const w = 16 + 18 * t;
      return (
        <div
          key={i}
          style={{
            position: "absolute",
            left: x - w / 2,
            top: y - 5,
            width: w,
            height: 11,
            borderRadius: 6,
            transform: `rotate(${ang}deg)`,
            background: i % 2 === 0 ? "#E7B24C" : "#DFA43C",
            boxShadow: "0 0 16px rgba(231,178,76,0.8)",
          }}
        />
      );
    })}

    <Bloom x={596} y={1244} r={190} c="rgba(255,222,152,0.78)" />
    {[32, 54, 76].map((r, i) => (
      <div
        key={i}
        style={{
          position: "absolute",
          left: 596 - r,
          top: 1244 - r,
          width: r * 2,
          height: r * 2,
          borderRadius: "50%",
          boxSizing: "border-box",
          border: `${6 - i}px solid ${["#E7B24C", "#E2A957", "#DFA43C"][i]}`,
        }}
      />
    ))}
    <div style={{ position: "absolute", left: 596, top: 1244, width: 0, height: 0 }}>
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: 0,
            top: -5,
            width: 34,
            height: 10,
            borderRadius: 5,
            transformOrigin: "0 50%",
            transform: `rotate(${i * 45 + 14}deg) translateX(88px)`,
            background: "linear-gradient(90deg,#E7B24C,rgba(231,178,76,0.42))",
          }}
        />
      ))}
    </div>
    {/* the pointer — dark plate first so the gold arrow has an outline */}
    <div
      style={{
        position: "absolute",
        left: 592,
        top: 1240,
        width: 78,
        height: 91,
        background: "#2A2118",
        clipPath: "polygon(0% 0%, 0% 76%, 21% 58%, 38% 100%, 56% 92%, 39% 51%, 66% 49%)",
      }}
    />
    <div
      style={{
        position: "absolute",
        left: 596,
        top: 1244,
        width: 70,
        height: 82,
        background: "linear-gradient(155deg,#F5CF80,#DFA43C)",
        clipPath: "polygon(0% 0%, 0% 76%, 21% 58%, 38% 100%, 56% 92%, 39% 51%, 66% 49%)",
      }}
    />

    {/* ================= L6 · FINISHED TASK CARDS, on the desk ============== */}
    <div
      style={{
        position: "absolute",
        left: 756,
        top: 1522,
        width: 300,
        height: 46,
        borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(96,64,36,0.55), rgba(96,64,36,0) 70%)",
        filter: "blur(8px)",
      }}
    />
    {/* ⛔ v1 sat these at x828..1070 on a 48px pitch: the top two green checks
        were clipped by the frame edge and by the card below. Pulled left to
        end at x1026 and opened the pitch to 58 so all three checks clear. */}
    {[
      [790, 1340, 220, 96, -2],
      [804, 1398, 212, 94, 4],
      [784, 1456, 216, 96, -5],
    ].map(([cx, cy, cw, ch, rot], i) => (
      <div
        key={i}
        style={{
          position: "absolute",
          left: cx,
          top: cy,
          width: cw,
          height: ch,
          borderRadius: 12,
          transform: `rotate(${rot}deg)`,
          background: "linear-gradient(180deg,#FBF6EA,#EFE7D4)",
          boxSizing: "border-box",
          border: "3px solid #D9CDB5",
          boxShadow: "0 12px 26px -6px rgba(96,68,42,0.45)",
        }}
      >
        <div style={{ position: "absolute", left: 20, top: 20, width: 100, height: 16, borderRadius: 8, background: "#4A4438" }} />
        <div style={{ position: "absolute", left: 20, top: 46, width: 132, height: 10, borderRadius: 5, background: "#C3BAA7" }} />
        <div style={{ position: "absolute", left: 20, top: 66, width: 92, height: 10, borderRadius: 5, background: "#D0C7B4" }} />
        <div
          style={{
            position: "absolute",
            left: cw - 70,
            top: 14,
            width: 44,
            height: 44,
            borderRadius: 13,
            background: "linear-gradient(180deg,#4CB183,#3A8F68)",
            boxShadow: "0 5px 13px rgba(52,120,90,0.5)",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 10,
              top: 13,
              width: 25,
              height: 20,
              background: "#FFFFFF",
              clipPath: "polygon(10% 46%, 25% 30%, 41% 51%, 78% 8%, 92% 23%, 41% 84%)",
            }}
          />
        </div>
      </div>
    ))}

    {/* ================= L7 · HERO — Claude, off-centre LEFT ================
        feet land at 1250 + 250*0.92 = y1480.                               */}
    <div
      style={{
        position: "absolute",
        left: 5,
        top: 1450,
        width: 320,
        height: 46,
        borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(88,56,30,0.74), rgba(92,60,32,0) 70%)",
        filter: "blur(8px)",
      }}
    />
    <div style={{ position: "absolute", left: 40, top: 1250 }}>
      <HouseMascot lf={24} size={250} suit={1} cheer={0.55} />
    </div>

    {/* ================= L8 · FOREGROUND — desk rail + gold motes =========== */}
    <div style={{ position: "absolute", left: 0, top: 890, width: 1080, height: 630 }}>
      <Dust n={26} w={1080} h={630} c="rgba(255,242,210,0.95)" s={11} />
    </div>
    <div style={{ position: "absolute", left: 0, top: 1190, width: 1080, height: 410 }}>
      <Dust n={13} w={1080} h={410} c="rgba(214,150,80,0.88)" s={27} />
    </div>
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 1562,
        width: 1080,
        height: 20,
        background: "linear-gradient(180deg, rgba(96,66,38,0) 0%, rgba(96,66,38,0.34) 100%)",
      }}
    />
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 1582,
        width: 1080,
        height: 62,
        background: "linear-gradient(180deg,#B48D5C 0%,#96703F 100%)",
      }}
    />
    <div style={{ position: "absolute", left: 0, top: 1582, width: 1080, height: 8, background: "#DDBB86" }} />
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 1644,
        width: 1080,
        height: 276,
        background: "linear-gradient(180deg,#7E5C36 0%,#5E4327 100%)",
      }}
    />
  </>
);

export const CoverMint: React.FC = () => (
  <SceneCover
    scene={<MintScene />}
    line1={<>CLAUDE RUNS <span style={{ color: CLAY }}>YOUR</span></>}
    giant={<>BROWSER</>}
    giantSize={155}
  />
);

/* ---------- CREW ---------- */

/* ==========================================================================
   CREW — scene body · 1080 x 1920 full-bleed static still
   Headline "ONE CLAUDE. / SIX HIRES" is composited over the top band later,
   so EVERY pixel above y780 is sky gradient + radial glow only.
   Topmost drawn element = the stage cornice, y=884.

   THE VERB: one plain Claude stands lit on a podium and three gold trails
   split out from under him and fan DOWN into a line-up of six costumed
   copies — the whole C-suite, each on its own mark, each with a name plate.

   GEOMETRY CONTRACT
     cornice            y = 884   (topmost geometry in the scene)
     stage backdrop     y  902..1440
     big Claude         container top 867, feet 1084 (867 + 236*0.92)
     podium slab        y 1084..1120  ·  column 1120..1158  ·  base 1152..1174
     split node         y = 1172
     trails             y 1176 -> 1328
     line-up sprite top y = 1344
     line-up feet       y = 1462  (1307 + 168*0.92)
     riser top face     y 1440..1478   ·   riser front face 1478..1570
     name plates        y 1490..1552

   ⛔ THE SIX MUST NOT OVERLAP. size=190 at 170px pitch is geometrically
   impossible: the sprite silhouette is 0.92*size wide (arms at viewBox
   x8..x192), so 190 gives 174.8px of sprite against a 170px pitch — they
   MERGE. Solved by size=168 (154.56px silhouette) on a 175px pitch, which
   leaves 20.4px of daylight between every pair and keeps the row inside
   x24.7..1054.3. Centres 102/277/452/627/802/977.
   Costumes read as silhouettes (tux, spy, pirate are near-black), so each
   figure stands in its OWN column of light — a dark costume on a dark stage
   is invisible, and a warm mascot on a warm cream stage is equally invisible.
   Riser is ONE solid full-width band — never two shapes with a gap.
   ⛔ no countdown, no clock.
   ========================================================================== */

const CrewScene: React.FC = () => (
  <>
    {/* ================= L0 · SKY — quiet zone (gradient + glow ONLY) ======= */}
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: 1080,
        height: 1440,
        background:
          "linear-gradient(180deg,#FDF8EE 0%,#FBEEDA 30%,#F6DDB4 66%,#EFC894 100%)",
      }}
    />
    <Bloom x={540} y={300} r={560} c="rgba(255,248,226,0.95)" />
    <Bloom x={860} y={430} r={320} c="rgba(255,228,172,0.58)" />
    <Bloom x={180} y={330} r={300} c="rgba(255,240,206,0.55)" />

    {/* ================= L1 · THE STAGE BOX ================================
        Topmost geometry in the whole scene: the cornice at y=884.          */}
    <div style={{ position: "absolute", left: 0, top: 884, width: 1080, height: 18, background: "linear-gradient(180deg,#FCF2DE,#DCC094)" }} />
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 902,
        width: 1080,
        height: 538,
        background:
          "linear-gradient(180deg,#3A2A1D 0%,#46331F 44%,#523A26 100%)",
        overflow: "hidden",
      }}
    >
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} style={{ position: "absolute", left: 34 + i * 92, top: 0, width: 5, height: 538, background: "#5E442D" }} />
      ))}
      <div style={{ position: "absolute", left: 0, top: 0, width: 1080, height: 96, background: "linear-gradient(180deg, rgba(12,8,4,0.45), rgba(12,8,4,0))" }} />
    </div>

    {/* ================= L2 · SIX COLUMNS OF LIGHT ==========================
        One pool per mark. Without these the black tux and the black spy
        turtleneck disappear into the backdrop entirely.                    */}
    {[102, 277, 452, 627, 802, 977].map((c, i) => (
      <div
        key={i}
        style={{
          position: "absolute",
          left: c - 79,
          top: 1104,
          width: 158,
          height: 336,
          background:
            "linear-gradient(180deg, rgba(255,236,190,0) 0%, rgba(255,230,172,0.42) 46%, rgba(255,224,158,0.72) 100%)",
          filter: "blur(6px)",
        }}
      />
    ))}
    {[102, 277, 452, 627, 802, 977].map((c, i) => (
      <Bloom key={i} x={c} y={1416} r={128} c="rgba(255,232,176,0.62)" />
    ))}

    {/* ================= L3 · THE ONE — podium + plain Claude =============== */}
    <Bloom x={540} y={980} r={280} c="rgba(255,240,200,0.76)" />
    {/* ⛔ ORDER MATTERS. v1 drew this shadow BEFORE the slab, so the slab
        painted straight over it and the one Claude read as floating. The
        slab goes down first, the shadow lands ON it, then the sprite.
        The column is also kept mid-tan: a dark pedestal on a dark stage is
        not a pedestal, it is a gap between two planks. */}
    {/* ⛔ v2 built this as cap + column + foot and the three pale bars merged
        into one shape that read as a hanging sign, not a plinth. ONE bright
        cap over ONE dark tapered body is what makes it a pedestal. */}
    <div
      style={{
        position: "absolute",
        left: 396,
        top: 1084,
        width: 288,
        height: 34,
        borderRadius: 7,
        background: "linear-gradient(180deg,#F4E0BA,#D6B784)",
      }}
    />
    <div style={{ position: "absolute", left: 396, top: 1112, width: 288, height: 8, background: "rgba(50,30,12,0.45)" }} />
    <div
      style={{
        position: "absolute",
        left: 424,
        top: 1118,
        width: 232,
        height: 60,
        background: "linear-gradient(180deg,#7E5D3B 0%,#5C4229 100%)",
      }}
    />
    {/* ⭐ a contact shadow on a BRIGHT cap has to be genuinely dark or it is
        the same value as the cap and the sprite reads as floating. */}
    <div
      style={{
        position: "absolute",
        left: 420,
        top: 1082,
        width: 240,
        height: 30,
        borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(52,28,8,0.88), rgba(52,28,8,0) 74%)",
        filter: "blur(5px)",
      }}
    />
    <div style={{ position: "absolute", left: 422, top: 877 }}>
      <HouseMascot lf={24} size={236} gaze={0} />
    </div>

    {/* ================= L4 · THE SPLIT — one becomes six ===================
        ⭐ everything in motion is GOLD: a pale trail is the same value as
        cream and renders invisible.                                        */}
    <Bloom x={540} y={1180} r={158} c="rgba(255,224,150,0.85)" />
    <div
      style={{
        position: "absolute",
        left: 522,
        top: 1162,
        width: 36,
        height: 36,
        borderRadius: "50%",
        background: "radial-gradient(circle at 38% 32%, #FFF7E2 12%, #F0C066 52%, #DFA43C 100%)",
        boxShadow: "0 0 30px rgba(231,178,76,0.95)",
      }}
    />
    {Array.from({ length: 27 }).map((_, i) => {
      const k = Math.floor(i / 9);
      const t = (i % 9) / 8;
      const x0 = [486, 540, 594][k];
      const x1 = [150, 540, 930][k];
      const bow = [34, 8, 34][k];
      const x = x0 + (x1 - x0) * t;
      const y = 1184 + 146 * t + bow * Math.sin(Math.PI * t);
      const ang =
        (Math.atan2(146 + bow * Math.PI * Math.cos(Math.PI * t), x1 - x0) * 180) /
        Math.PI;
      const w = 30 - 12 * t;
      return (
        <div
          key={i}
          style={{
            position: "absolute",
            left: x - w / 2,
            top: y - 6,
            width: w,
            height: 12,
            borderRadius: 6,
            transform: `rotate(${ang}deg)`,
            background: i % 3 === 0 ? "#F0C066" : "#E7B24C",
            boxShadow: "0 0 18px rgba(231,178,76,0.88)",
          }}
        />
      );
    })}

    {/* ================= L5 · THE RISER — one solid full-width band ========= */}
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 1440,
        width: 1080,
        height: 480,
        background:
          "linear-gradient(180deg,#D9BB90 0%,#C29C6C 22%,#A67F52 62%,#8C6942 100%)",
      }}
    />
    <div style={{ position: "absolute", left: 0, top: 1440, width: 1080, height: 9, background: "#F4DCAE" }} />
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 1478,
        width: 1080,
        height: 92,
        background: "linear-gradient(180deg,#C9A87A 0%,#A9855A 100%)",
      }}
    />
    <div style={{ position: "absolute", left: 0, top: 1478, width: 1080, height: 6, background: "#E4C692" }} />

    {/* ================= L6 · THE SIX ======================================= */}
    {[102, 277, 452, 627, 802, 977].map((c, i) => (
      <div
        key={i}
        style={{
          position: "absolute",
          left: c - 100,
          top: 1442,
          width: 200,
          height: 38,
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(78,48,24,0.78), rgba(82,52,28,0) 70%)",
          filter: "blur(8px)",
        }}
      />
    ))}
    <div style={{ position: "absolute", left: 18, top: 1307 }}>
      <HouseMascot lf={24} size={168} ironman={1} />
    </div>
    <div style={{ position: "absolute", left: 193, top: 1307 }}>
      <HouseMascot lf={24} size={168} suit={1} />
    </div>
    <div style={{ position: "absolute", left: 368, top: 1307 }}>
      <HouseMascot lf={24} size={168} tux={1} />
    </div>
    <div style={{ position: "absolute", left: 543, top: 1307 }}>
      <HouseMascot lf={24} size={168} pirate={1} />
    </div>
    <div style={{ position: "absolute", left: 718, top: 1307 }}>
      <HouseMascot lf={24} size={168} greek={1} />
    </div>
    <div style={{ position: "absolute", left: 893, top: 1307 }}>
      <HouseMascot lf={24} size={168} spy={1} />
    </div>

    {/* ================= L7 · NAME PLATES on the riser face ================= */}
    {[
      [102, "MIA"],
      [277, "JACK"],
      [452, "MAX"],
      [627, "BEN"],
      [802, "KATE"],
      [977, "LEO"],
    ].map(([c, name], i) => (
      <div
        key={i}
        style={{
          position: "absolute",
          left: (c as number) - 76,
          top: 1490,
          width: 152,
          height: 62,
          borderRadius: 11,
          boxSizing: "border-box",
          border: "3px solid #CDB68C",
          background: "linear-gradient(180deg,#F7EDD9,#E6D6B6)",
          boxShadow: "0 8px 18px -5px rgba(80,54,28,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            fontFamily: mono,
            fontWeight: 700,
            fontSize: 27,
            letterSpacing: "0.13em",
            color: "#3A2E1F",
          }}
        >
          {name}
        </div>
      </div>
    ))}

    {/* ================= L8 · FOREGROUND — riser lip + gold motes =========== */}
    <div style={{ position: "absolute", left: 0, top: 940, width: 1080, height: 560 }}>
      <Dust n={26} w={1080} h={560} c="rgba(255,236,196,0.95)" s={7} />
    </div>
    <div style={{ position: "absolute", left: 0, top: 1220, width: 1080, height: 400 }}>
      <Dust n={13} w={1080} h={400} c="rgba(214,150,80,0.88)" s={23} />
    </div>
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 1570,
        width: 1080,
        height: 22,
        background: "linear-gradient(180deg, rgba(96,66,38,0) 0%, rgba(96,66,38,0.38) 100%)",
      }}
    />
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 1592,
        width: 1080,
        height: 60,
        background: "linear-gradient(180deg,#B08858 0%,#916B3D 100%)",
      }}
    />
    <div style={{ position: "absolute", left: 0, top: 1592, width: 1080, height: 8, background: "#DAB782" }} />
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 1652,
        width: 1080,
        height: 268,
        background: "linear-gradient(180deg,#7A5834 0%,#5A4025 100%)",
      }}
    />
  </>
);

export const CoverCrew: React.FC = () => (
  <SceneCover
    scene={<CrewScene />}
    line1={<>ONE CLAUDE.</>}
    giant={<><span style={{ color: CLAY }}>SIX</span> HIRES</>}
  />
);

/* ---------- BLUEPRINT ---------- */

/* ==========================================================================
   BLUEPRINT — scene body · 1080 x 1920 full-bleed static still
   Headline "YOUR BACKLOG, SPEC'D / OVERNIGHT" is composited over the top
   band later, so EVERY pixel above y780 is sky gradient + radial glow only.
   Topmost drawn element = the workshop wall cornice, y=872.

   THE VERB (reads left -> right): a scrappy pile of backlog notes on the
   bench throws one note up along a gold conversion arc; the note is caught
   at the apex mid-change — its left half still a grey scribble, its right
   half already a titled spec with a green check — and it lands in a burst
   behind a fanned stack of finished build specs, the top one crisp and lit.

   DEPTH: dusk sky · workshop wall + cornice + shafts · dark pegboard
          (the aperture) · bench plane · messy pile · spec fan · gold arc +
          transforming note (the verb) · Claude (hero) · bench edge + motes.
   The pegboard is OFF-CENTRE RIGHT so the centred hero can never stand in
   front of it, and it is dark on purpose: cream spec sheets on a cream wall
   have no edge at all.
   Claude's silhouette runs x438..658 (wand included). Measured: the messy
   pile stops at x410 and the fan's nearest corner is x617 at y1077 / x665 at
   y1417 — so he occludes NEITHER pile. He sits below the arc's apex (y998).
   Bench is ONE solid full-width band — never two shapes with a gap.
   ⛔ no clock, no countdown, no "expires" badge.
   ========================================================================== */

const BlueprintScene: React.FC = () => (
  <>
    {/* ================= L0 · DUSK SKY — quiet zone (gradient + glow ONLY) == */}
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: 1080,
        height: 1400,
        background:
          "linear-gradient(180deg,#FDF6E9 0%,#FBEEDA 24%,#F6DDB4 54%,#EFC894 78%,#E3B27E 100%)",
      }}
    />
    <Bloom x={540} y={320} r={560} c="rgba(255,246,220,0.95)" />
    <Bloom x={862} y={500} r={340} c="rgba(255,226,164,0.66)" />
    <Bloom x={170} y={300} r={300} c="rgba(255,238,200,0.55)" />

    {/* ================= L1 · WORKSHOP WALL =================================
        Topmost geometry in the whole scene: the cornice at y=872.          */}
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 872,
        width: 1080,
        height: 528,
        background:
          "linear-gradient(180deg,#F4E2C2 0%,#EBD3A6 55%,#DFC191 100%)",
      }}
    />
    <div style={{ position: "absolute", left: 0, top: 872, width: 1080, height: 16, background: "#FCF2DE" }} />
    <div style={{ position: "absolute", left: 0, top: 888, width: 1080, height: 8, background: "rgba(92,64,34,0.28)" }} />
    {[
      [704, 172, -12],
      [268, 126, 10],
      [968, 100, -15],
    ].map(([sx, sw, sk], i) => (
      <div
        key={i}
        style={{
          position: "absolute",
          left: sx,
          top: 900,
          width: sw,
          height: 500,
          background:
            "linear-gradient(180deg, rgba(255,243,210,0.52), rgba(255,243,210,0))",
          transform: `skewX(${sk}deg)`,
          filter: "blur(17px)",
        }}
      />
    ))}

    {/* ================= L2 · THE PEGBOARD — dark aperture, OFF-CENTRE ====== */}
    <div
      style={{
        position: "absolute",
        left: 556,
        top: 940,
        width: 508,
        height: 470,
        borderRadius: 16,
        background: "linear-gradient(180deg,#E9D3A8,#CBAE7E)",
        boxShadow: "0 24px 46px -16px rgba(70,46,20,0.45)",
      }}
    />
    <div
      style={{
        position: "absolute",
        left: 570,
        top: 954,
        width: 480,
        height: 442,
        borderRadius: 10,
        background:
          "linear-gradient(180deg,#463124 0%,#38271C 60%,#2E2016 100%)",
        overflow: "hidden",
      }}
    >
      {Array.from({ length: 42 }).map((_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: 34 + (i % 7) * 66,
            top: 40 + Math.floor(i / 7) * 66,
            width: 10,
            height: 10,
            borderRadius: "50%",
            background: "#241A12",
          }}
        />
      ))}
      <div style={{ position: "absolute", left: 0, top: 0, width: 480, height: 92, background: "linear-gradient(180deg, rgba(14,9,4,0.45), rgba(14,9,4,0))" }} />
      <div style={{ position: "absolute", left: 0, top: 240, width: 480, height: 202, background: "linear-gradient(180deg, rgba(255,204,128,0) 0%, rgba(255,200,116,0.22) 100%)" }} />
    </div>

    {/* ================= L3 · BENCH — one solid full-width band ============= */}
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 1400,
        width: 1080,
        height: 520,
        background:
          "linear-gradient(180deg,#D9B98D 0%,#C49E70 30%,#AC8354 72%,#966D44 100%)",
      }}
    />
    <div style={{ position: "absolute", left: 0, top: 1400, width: 1080, height: 8, background: "#EFD6AC" }} />
    {/* contrasting pool under the hero — warm sprite on warm bench dies */}
    <Bloom x={540} y={1442} r={330} c="rgba(255,248,226,0.92)" />
    <Bloom x={540} y={1506} r={240} c="rgba(255,234,192,0.75)" />

    {/* ================= L4 · THE MESSY PILE — the "before" ================= */}
    <div
      style={{
        position: "absolute",
        left: 46,
        top: 1414,
        width: 400,
        height: 52,
        borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(96,64,36,0.55), rgba(96,64,36,0) 70%)",
        filter: "blur(9px)",
      }}
    />
    {[
      [92, 1352, 176, 94, -8, 0],
      [128, 1296, 158, 88, 7, 1],
      [82, 1244, 170, 92, -4, 0],
      [160, 1368, 166, 90, 5, 1],
      [104, 1198, 152, 84, 9, 0],
      [218, 1310, 160, 90, -6, 0],
      [236, 1240, 148, 84, 4, 1],
      [196, 1372, 172, 88, -3, 0],
      [258, 1360, 152, 86, 8, 0],
    ].map(([nx, ny, nw, nh, rot, torn], i) => (
      <div
        key={i}
        style={{
          position: "absolute",
          left: nx,
          top: ny,
          width: nw,
          height: nh,
          borderRadius: torn ? 0 : 8,
          transform: `rotate(${rot}deg)`,
          background: "linear-gradient(180deg,#EFE8D8,#DED5C0)",
          boxSizing: "border-box",
          border: "3px solid #CFC3AB",
          boxShadow: "0 10px 20px -6px rgba(90,66,42,0.40)",
          clipPath: torn
            ? "polygon(0% 0%, 93% 0%, 86% 14%, 96% 31%, 84% 49%, 94% 67%, 85% 84%, 95% 100%, 0% 100%)"
            : undefined,
        }}
      >
        <div style={{ position: "absolute", left: 16, top: 17, width: nw * 0.36, height: 11, borderRadius: 6, background: "#A79E8C" }} />
        <div style={{ position: "absolute", left: 16, top: 38, width: nw * 0.52, height: 8, borderRadius: 4, background: "#BAB19E" }} />
        <div style={{ position: "absolute", left: 16, top: 54, width: nw * 0.42, height: 8, borderRadius: 4, background: "#C4BBA8" }} />
        {i % 3 === 0 && (
          <div
            style={{
              position: "absolute",
              left: nw - 58,
              top: 16,
              width: 34,
              height: 18,
              borderRadius: 9,
              background: ["#C08A6E", "#B08A3E", "#9AA7B6"][i % 3],
            }}
          />
        )}
      </div>
    ))}

    {/* ================= L5 · THE LANDING BURST =============================
        Drawn BEFORE the sheets so it haloes out from behind their left edge.
        Painted over them it would crisscross the artifact with streaks and
        the spec would stop reading as a document.                          */}
    <Bloom x={690} y={1090} r={196} c="rgba(255,226,152,0.85)" />
    <div style={{ position: "absolute", left: 690, top: 1090, width: 0, height: 0 }}>
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: 0,
            top: -6,
            width: 40 + (i % 3) * 20,
            height: 12,
            borderRadius: 6,
            transformOrigin: "0 50%",
            transform: `rotate(${i * 30 + 12}deg) translateX(62px)`,
            background:
              i % 2 === 0
                ? "linear-gradient(90deg,#E7B24C,rgba(231,178,76,0.42))"
                : "linear-gradient(90deg,#4FD69A,rgba(79,214,154,0.42))",
          }}
        />
      ))}
    </div>

    {/* ================= L6 · THE SPEC FAN — the "after" ==================== */}
    <div
      style={{
        position: "absolute",
        left: 606,
        top: 1372,
        width: 440,
        height: 54,
        borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(96,64,36,0.55), rgba(96,64,36,0) 70%)",
        filter: "blur(9px)",
      }}
    />
    <Bloom x={890} y={1140} r={258} c="rgba(255,232,172,0.70)" />
    {[
      [640, 1058, 246, 344, -8, 0],
      [690, 1054, 248, 344, -3, 0],
      [734, 1050, 252, 344, 2, 0],
      [764, 1044, 258, 352, 6, 1],
    ].map(([sx, sy, sw, sh, rot, isTop], i) => (
      <div
        key={i}
        style={{
          position: "absolute",
          left: sx,
          top: sy,
          width: sw,
          height: sh,
          borderRadius: 12,
          transform: `rotate(${rot}deg)`,
          boxSizing: "border-box",
          border: "4px solid #E0D5BC",
          background: isTop
            ? "linear-gradient(180deg,#FFFDF6,#F5EEDD)"
            : "linear-gradient(180deg,#F8F2E4,#E9E1CE)",
          boxShadow: isTop
            ? "0 22px 44px -12px rgba(60,40,20,0.55), 0 0 60px rgba(255,214,140,0.60)"
            : "0 16px 32px -10px rgba(70,48,26,0.45)",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: sw - 8,
            height: 60,
            borderRadius: "7px 7px 0 0",
            background: isTop
              ? "linear-gradient(180deg,#48688F,#33517A)"
              : "linear-gradient(180deg,#8B9CB2,#6F819A)",
          }}
        />
        {isTop ? (
          <div
            style={{
              position: "absolute",
              left: 18,
              top: 17,
              fontFamily: mono,
              fontWeight: 700,
              fontSize: 23,
              letterSpacing: "0.13em",
              color: "#EAF1FA",
            }}
          >
            BUILD SPEC
          </div>
        ) : (
          <div style={{ position: "absolute", left: 18, top: 22, width: 118, height: 16, borderRadius: 8, background: "#C3CEDC" }} />
        )}
        {[0, 1, 2, 3, 4].map((j) => (
          <div
            key={j}
            style={{
              position: "absolute",
              left: 20,
              top: 78 + j * 28,
              width: (sw as number) - 8 - [40, 72, 52, 86, 46][j],
              height: 8,
              borderRadius: 4,
              background: "#CFC5B0",
            }}
          />
        ))}
        <div style={{ position: "absolute", left: 20, top: 208, width: 100, height: 12, borderRadius: 6, background: "#A8B7C9" }} />
        {[0, 1, 2].map((j) => (
          <div key={j}>
            <div
              style={{
                position: "absolute",
                left: 20,
                top: 236 + j * 34,
                width: 26,
                height: 26,
                borderRadius: 7,
                background: "linear-gradient(180deg,#4CB183,#3A8F68)",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: 6,
                  top: 7,
                  width: 15,
                  height: 13,
                  background: "#FFFFFF",
                  clipPath: "polygon(10% 46%, 25% 30%, 41% 51%, 78% 8%, 92% 23%, 41% 84%)",
                }}
              />
            </div>
            <div
              style={{
                position: "absolute",
                left: 56,
                top: 244 + j * 34,
                width: (sw as number) - 8 - [116, 140, 98][j],
                height: 9,
                borderRadius: 5,
                background: "#C6BCA8",
              }}
            />
          </div>
        ))}
        {isTop === 1 && (
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: sw - 8,
              height: sh - 8,
              borderRadius: 7,
              background:
                "linear-gradient(120deg, rgba(255,255,255,0.40) 0%, rgba(255,255,255,0.10) 24%, rgba(255,255,255,0) 42%)",
            }}
          />
        )}
      </div>
    ))}

    {/* ================= L7 · THE CONVERSION ARC ============================
        ⭐ everything in motion is GOLD: a pale arc is the same value as cream
        and renders invisible. The arc stops at x634 — clear of the fan's
        nearest edge (x663 at that height) — so it never streaks the specs. */}
    {Array.from({ length: 13 }).map((_, i) => {
      const t = (i / 12) * 0.86;
      const x = 230 + 470 * t;
      const y = 1200 - 104 * t - 150 * Math.sin(Math.PI * t);
      const ang =
        (Math.atan2(-104 - 150 * Math.PI * Math.cos(Math.PI * t), 470) * 180) /
        Math.PI;
      const w = 24 + 12 * Math.sin(Math.PI * t);
      return (
        <div
          key={i}
          style={{
            position: "absolute",
            left: x - w / 2,
            top: y - 6,
            width: w,
            height: 12,
            borderRadius: 6,
            transform: `rotate(${ang}deg)`,
            background: i % 3 === 0 ? "#F0C066" : "#E7B24C",
            boxShadow: "0 0 18px rgba(231,178,76,0.85)",
          }}
        />
      );
    })}

    {/* the note caught at the apex, half scribble / half spec */}
    <div
      style={{
        position: "absolute",
        left: 399,
        top: 946,
        width: 132,
        height: 104,
        borderRadius: 10,
        transform: "rotate(-10deg)",
        boxSizing: "border-box",
        border: "3px solid #E0D5BC",
        background:
          "linear-gradient(90deg,#DBD2BE 0%,#E2D9C5 44%,#FFFCF3 56%,#FFFDF7 100%)",
        boxShadow: "0 0 46px rgba(255,214,140,0.92), 0 12px 24px -6px rgba(90,66,42,0.45)",
      }}
    >
      <div style={{ position: "absolute", left: 12, top: 18, width: 40, height: 9, borderRadius: 5, background: "#A79E8C" }} />
      <div style={{ position: "absolute", left: 12, top: 36, width: 30, height: 9, borderRadius: 5, background: "#B3AA97" }} />
      <div style={{ position: "absolute", left: 12, top: 54, width: 36, height: 9, borderRadius: 5, background: "#A79E8C" }} />
      <div style={{ position: "absolute", left: 61, top: 8, width: 4, height: 82, background: "#E7B24C" }} />
      <div style={{ position: "absolute", left: 74, top: 16, width: 42, height: 12, borderRadius: 6, background: "#3A5C84" }} />
      <div style={{ position: "absolute", left: 74, top: 36, width: 44, height: 8, borderRadius: 4, background: "#C6BCA8" }} />
      <div style={{ position: "absolute", left: 74, top: 50, width: 34, height: 8, borderRadius: 4, background: "#CFC5B0" }} />
      <div
        style={{
          position: "absolute",
          left: 74,
          top: 66,
          width: 22,
          height: 19,
          background: "#3F9E74",
          clipPath: "polygon(10% 46%, 25% 30%, 41% 51%, 78% 8%, 92% 23%, 41% 84%)",
        }}
      />
    </div>

    {/* ================= L8 · HERO — Claude, centre, BELOW the arc ==========
        feet land at 1307 + 215*0.92 - cheer*10 = y1500.                    */}
    <div
      style={{
        position: "absolute",
        left: 394,
        top: 1478,
        width: 290,
        height: 44,
        borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(88,56,30,0.74), rgba(92,60,32,0) 70%)",
        filter: "blur(8px)",
      }}
    />
    <div style={{ position: "absolute", left: 432, top: 1307 }}>
      <PkMascot lf={24} size={215} wizard={1} cheer={0.5} />
    </div>

    {/* ================= L9 · FOREGROUND — bench edge + gold motes ========== */}
    <div style={{ position: "absolute", left: 0, top: 900, width: 1080, height: 620 }}>
      <Dust n={26} w={1080} h={620} c="rgba(255,240,206,0.95)" s={13} />
    </div>
    <div style={{ position: "absolute", left: 0, top: 1200, width: 1080, height: 400 }}>
      <Dust n={13} w={1080} h={400} c="rgba(212,146,74,0.88)" s={31} />
    </div>
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 1564,
        width: 1080,
        height: 20,
        background: "linear-gradient(180deg, rgba(96,66,38,0) 0%, rgba(96,66,38,0.34) 100%)",
      }}
    />
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 1584,
        width: 1080,
        height: 62,
        background: "linear-gradient(180deg,#B48D5C 0%,#96703F 100%)",
      }}
    />
    <div style={{ position: "absolute", left: 0, top: 1584, width: 1080, height: 8, background: "#DDBB86" }} />
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 1646,
        width: 1080,
        height: 274,
        background: "linear-gradient(180deg,#7E5C36 0%,#5E4327 100%)",
      }}
    />
  </>
);

export const CoverBlueprint: React.FC = () => (
  <SceneCover
    scene={<BlueprintScene />}
    line1={<>YOUR <span style={{ color: CLAY }}>BACKLOG</span>, SPEC&rsquo;D</>}
    giant={<>OVERNIGHT</>}
    giantSize={131}
  />
);

/* ---------- CLONE ---------- */

/* ==========================================================================
   CLONE — scene body · 1080 x 1920 full-bleed static still
   Headline "CLONE THE EXPENSIVE / MODEL" is composited over the top band
   later, so EVERY pixel above y780 is sky gradient + radial glow only.
   Topmost drawn element = the CLAUDE.md file card riding the top lane, y=930.

   THE VERB (reads left -> right): the flagship wizard's wand feeds a gold
   distribution bus; three lanes carry FILE cards (skill.md / CLAUDE.md) across
   the workshop and drop into a burst on the head of each cheap copy, which is
   already wearing the gold badge it was handed.

   TOPOLOGY NOTE — the three lanes never cross. Each lane runs horizontally to
   its own drop x, and every lane TERMINATES before the next lane's drop:
     lane1 y1275 ends x670 · lane2 y1142 ends x810 · lane3 y1010 ends x950.
   An earlier fan-from-one-origin version slashed beam 2 straight through
   copy 1's head; the bus fixes that by keeping all horizontals above y1275
   and all heads below y1365.

   DEPTH: sky · far haze + shafts · ground plane + aperture · dais + aura ·
          wizard (hero) · bus + cards + bursts · copies · bench (foreground).
   Floor is ONE solid full-width band — never two shapes with a gap.
   ========================================================================== */

const CloneScene: React.FC = () => (
  <>
    {/* ================= L0 · SKY — quiet zone (gradient + glow ONLY) ======= */}
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: 1080,
        height: 1345,
        background:
          "linear-gradient(180deg,#FDF8EE 0%,#FBEEDA 28%,#F6DDB4 60%,#EFC894 100%)",
      }}
    />
    <Bloom x={520} y={300} r={560} c="rgba(255,248,226,0.95)" />
    <Bloom x={886} y={250} r={320} c="rgba(255,230,176,0.62)" />
    <Bloom x={150} y={430} r={300} c="rgba(255,240,204,0.55)" />

    {/* ================= L1 · FAR — haze band + workshop light shafts ======= */}
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 970,
        width: 1080,
        height: 295,
        background:
          "linear-gradient(180deg, rgba(224,188,138,0) 0%, rgba(221,183,131,0.55) 52%, rgba(211,169,114,0.95) 100%)",
      }}
    />
    {[
      [560, 172, -12],
      [140, 118, 10],
      [880, 100, -15],
    ].map(([sx, sw, sk], i) => (
      <div
        key={i}
        style={{
          position: "absolute",
          left: sx,
          top: 820,
          width: sw,
          height: 445,
          background:
            "linear-gradient(180deg, rgba(255,243,210,0.52), rgba(255,243,210,0))",
          transform: `skewX(${sk}deg)`,
          filter: "blur(17px)",
        }}
      />
    ))}

    {/* ================= L2 · GROUND PLANE — one solid full-width band ====== */}
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 1265,
        width: 1080,
        height: 655,
        background:
          "linear-gradient(180deg,#D8B78B 0%,#C49D6F 32%,#AE8557 74%,#986F45 100%)",
      }}
    />
    <div style={{ position: "absolute", left: 0, top: 1265, width: 1080, height: 7, background: "#EAD1AA" }} />
    {/* contrasting aperture: the warm wizard would sink into the warm ground,
        so the whole pedestal end is opened up with light */}
    <Bloom x={232} y={1352} r={330} c="rgba(255,249,230,0.95)" />
    <Bloom x={232} y={1452} r={240} c="rgba(255,234,192,0.80)" />

    {/* ================= L3 · PEDESTAL + AURA (behind the hero) ============= */}
    <Bloom x={232} y={1320} r={300} c="rgba(255,222,150,0.85)" />
    {/* aura ring — r152 so its widest point (x375 at y1282) stays clear of the
        bus riser at x384 */}
    <div
      style={{
        position: "absolute",
        left: 80,
        top: 1100,
        width: 304,
        height: 304,
        borderRadius: "50%",
        boxSizing: "border-box",
        border: "6px solid #E7B24C",
      }}
    />
    <div
      style={{
        position: "absolute",
        left: 56,
        top: 1414,
        width: 352,
        height: 58,
        borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(96,64,36,0.55), rgba(96,64,36,0) 70%)",
        filter: "blur(9px)",
      }}
    />
    <div
      style={{
        position: "absolute",
        left: 96,
        top: 1394,
        width: 272,
        height: 48,
        borderRadius: 10,
        background: "linear-gradient(180deg,#3A5C84 0%,#26405F 100%)",
      }}
    />
    <div
      style={{
        position: "absolute",
        left: 78,
        top: 1368,
        width: 308,
        height: 48,
        borderRadius: "50%",
        background: "linear-gradient(180deg,#F0C86E,#CE9A34)",
      }}
    />
    <div
      style={{
        position: "absolute",
        left: 92,
        top: 1372,
        width: 280,
        height: 14,
        borderRadius: "50%",
        background: "#FBE3A8",
      }}
    />

    {/* ================= L4 · HERO — the flagship, feet on the dais at y1470  */}
    {/* contact shadow: WIDER than the 239px visible sprite or it disappears */}
    <div
      style={{
        position: "absolute",
        left: 108,
        top: 1376,
        width: 248,
        height: 32,
        borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(74,46,18,0.70), rgba(74,46,18,0) 70%)",
        filter: "blur(6px)",
      }}
    />
    <div style={{ position: "absolute", left: 74, top: 1100 }}>
      <PkMascot lf={24} size={315} wizard={1} cheer={0.5} />
    </div>

    {/* ================= L5 · THE GOLD BUS — riser, 3 lanes, 3 drops ========
        The riser starts at x384: the wizard's wand star tops out at x378, so
        the bus reads as being fed by the wand without colliding with it.   */}
    <Bloom x={396} y={1150} r={150} c="rgba(255,226,152,0.72)" />
    <div
      style={{
        position: "absolute",
        left: 384,
        top: 923,
        width: 16,
        height: 279,
        borderRadius: 8,
        background: "linear-gradient(180deg,#FFF0C8,#E7B24C 40%,#C9922F 100%)",
        boxShadow: "0 0 26px rgba(231,178,76,0.85)",
      }}
    />
    {[
      [386, 1003, 564],
      [386, 1135, 424],
      [386, 1268, 284],
    ].map(([lx, ly, lw], i) => (
      <div
        key={i}
        style={{
          position: "absolute",
          left: lx,
          top: ly,
          width: lw,
          height: 14,
          borderRadius: 7,
          background:
            "linear-gradient(90deg,#C9922F 0%,#E7B24C 30%,#FFF0C8 78%,#E7B24C 100%)",
          boxShadow: "0 0 24px rgba(231,178,76,0.80)",
        }}
      />
    ))}
    {[
      [943, 1010, 338],
      [803, 1142, 206],
      [663, 1275, 73],
    ].map(([dx, dy, dh], i) => (
      <div
        key={i}
        style={{
          position: "absolute",
          left: dx,
          top: dy,
          width: 14,
          height: dh,
          borderRadius: 7,
          background: "linear-gradient(180deg,#E7B24C,#FFF0C8 70%,#E7B24C 100%)",
          boxShadow: "0 0 24px rgba(231,178,76,0.80)",
        }}
      />
    ))}

    {/* ---------- the FILE cards riding the bus ---------------------------- */}
    {[
      [406, 930, "CLAUDE.md"],
      [546, 1062, "skill.md"],
      [406, 1195, "skill.md"],
    ].map(([cx, cy, title], i) => (
      <div
        key={i}
        style={{
          position: "absolute",
          left: cx as number,
          top: cy as number,
          width: 128,
          height: 160,
          borderRadius: 8,
          background: "linear-gradient(180deg,#FFFDF6,#F2EBDB)",
          boxSizing: "border-box",
          border: "4px solid #E0D6C0",
          boxShadow: "0 14px 26px -6px rgba(90,64,38,0.45)",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 100,
            top: 0,
            width: 28,
            height: 28,
            background: "#DCCFB0",
            clipPath: "polygon(0 0, 100% 0, 100% 100%)",
          }}
        />
        <div style={{ position: "absolute", left: 14, top: 44, width: 94, height: 6, borderRadius: 3, background: "#E7B24C" }} />
        <div
          style={{
            position: "absolute",
            left: 14,
            top: 58,
            fontFamily: mono,
            fontWeight: 700,
            fontSize: 16,
            color: "#2E2A22",
          }}
        >
          {title}
        </div>
        {[92, 74, 86, 66].map((w, j) => (
          <div
            key={j}
            style={{ position: "absolute", left: 14, top: 90 + j * 17, width: w, height: 6, borderRadius: 3, background: "#CBC1AA" }}
          />
        ))}
      </div>
    ))}

    {/* ---------- the landing bursts, drawn BEHIND the copies so the spokes
         halo past their heads instead of crisscrossing them --------------- */}
    {[670, 810, 950].map((bx, i) => (
      <div key={i} style={{ position: "absolute", left: bx, top: 1268, width: 0, height: 0 }}>
        {Array.from({ length: 12 }).map((_, j) => (
          <div
            key={j}
            style={{
              position: "absolute",
              left: 0,
              top: -6,
              width: 24 + (j % 3) * 12,
              height: 12,
              borderRadius: 6,
              transformOrigin: "0 50%",
              transform: `rotate(${j * 30 + 12}deg) translateX(22px)`,
              background: j % 2 === 0 ? "#E7B24C" : "#FFF0C8",
            }}
          />
        ))}
      </div>
    ))}
    {[670, 810, 950].map((bx, i) => (
      <Bloom key={i} x={bx} y={1348} r={112} c="rgba(255,226,152,0.85)" />
    ))}

    {/* ================= L6 · THE THREE COPIES — same floor line, y1470 =====
        centres 140px apart; 0.85*(69+69)=117 is the merge limit, so they read
        as three sprites and not one blob. */}
    {[670, 810, 950].map((cx, i) => (
      <div
        key={i}
        style={{
          position: "absolute",
          left: cx - 104,
          top: 1372,
          width: 208,
          height: 36,
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(88,56,30,0.72), rgba(92,60,32,0) 70%)",
          filter: "blur(7px)",
        }}
      />
    ))}
    {[578, 718, 858].map((lx, i) => (
      <div key={i} style={{ position: "absolute", left: lx, top: 1221 }}>
        <PkMascot lf={24} size={184} />
      </div>
    ))}
    {/* the gold badge each copy already carries — y1406 sits under the eye row
        (eyes end y1404 at this scale) and on the torso, never on the face */}
    {[670, 810, 950].map((cx, i) => (
      <div
        key={i}
        style={{
          position: "absolute",
          left: cx - 18,
          top: 1326,
          width: 36,
          height: 36,
          borderRadius: 9,
          background: "linear-gradient(180deg,#F0C86E,#CE9A34)",
          boxSizing: "border-box",
          border: "3px solid #A9761F",
          boxShadow: "0 0 18px rgba(231,178,76,0.85)",
        }}
      >
        <div style={{ position: "absolute", left: 8, top: 6, width: 14, height: 18, borderRadius: 2, background: "#FFF6E2" }} />
        <div style={{ position: "absolute", left: 10, top: 11, width: 10, height: 3, background: "#A9761F" }} />
        <div style={{ position: "absolute", left: 10, top: 17, width: 7, height: 3, background: "#A9761F" }} />
      </div>
    ))}

    {/* ================= L7 · FOREGROUND — workbench + gold motes =========== */}
    <div style={{ position: "absolute", left: 0, top: 800, width: 1080, height: 620 }}>
      <Dust n={26} w={1080} h={620} c="rgba(255,242,210,0.95)" s={7} />
    </div>
    <div style={{ position: "absolute", left: 0, top: 1080, width: 1080, height: 400 }}>
      <Dust n={13} w={1080} h={400} c="rgba(214,150,80,0.85)" s={23} />
    </div>
    <div
      style={{
        position: "absolute",
        left: -20,
        top: 1420,
        width: 1120,
        height: 42,
        borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(84,54,26,0.42), rgba(84,54,26,0) 72%)",
        filter: "blur(12px)",
      }}
    />
    <div style={{ position: "absolute", left: -20, top: 1444, width: 1120, height: 18, background: "#C08B52" }} />
    <div
      style={{
        position: "absolute",
        left: -20,
        top: 1462,
        width: 1120,
        height: 458,
        background: "linear-gradient(180deg,#A97844 0%,#8A6038 46%,#6F4B2A 100%)",
      }}
    />
    {[1576, 1616].map((gy, i) => (
      <div key={i} style={{ position: "absolute", left: 40, top: gy, width: 1000, height: 3, background: "#93683A" }} />
    ))}
    {[
      [96, 1486, 22],
      [928, 1492, 17],
      [512, 1478, 14],
    ].map(([fx, fy, fs], i) => (
      <div
        key={i}
        style={{
          position: "absolute",
          left: fx,
          top: fy,
          width: fs,
          height: fs,
          borderRadius: 4,
          transform: `rotate(${seed(i * 3.3 + 2) * 60 - 30}deg)`,
          background: "#E2A455",
        }}
      />
    ))}
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 1580,
        width: 1080,
        height: 340,
        background: "linear-gradient(180deg, rgba(96,66,36,0) 0%, rgba(88,60,32,0.45) 100%)",
      }}
    />
  </>
);

export const CoverClone: React.FC = () => (
  <SceneCover
    scene={<CloneScene />}
    line1={<>CLONE THE <span style={{ color: CLAY }}>EXPENSIVE</span></>}
    giant={<>MODEL</>}
  />
);

/* ---------- WORTHY ---------- */

/* ==========================================================================
   WORTHY — scene body · 1080 x 1920 full-bleed static still
   Headline "CHECK WHICH MODEL / YOU GOT" is composited over the top band
   later, so EVERY pixel above y780 is sky gradient + radial glow only.
   Topmost drawn element = the terminal panel's top edge, y=900.

   THE VERB: a magnifier drops onto the one row that answers the question and
   fires a gold burst — the check RESOLVING, not an accusation.

   !!  FRAMING GUARD: the underlying "routing swap" story is UNVERIFIED, so this
   scene draws a CHECK the viewer runs, never a claim about anyone. There is no
   DOWNGRADED stamp, no villain, no red X. The two shelf chips with a neutral
   mono "?" pose the QUESTION; the boxed row is simply the answer the command
   prints. Claude wears the deerstalker because he is INVESTIGATING.

   DEPTH: sky · far haze + shafts · desk plane + aperture · monitor stand ·
          terminal panel (hero artifact) · lens + burst · chips on a shelf ·
          Claude (hero) · desk rail + motes (foreground).
   Claude is pushed off-centre to x852 so that only the panel's EMPTY bottom
   strip falls behind his head — every printed row ends by x616, and the lens
   assembly stops at x725, well clear of his silhouette at x739.
   Desk is ONE solid full-width band — never two shapes with a gap.
   ========================================================================== */

const WorthyScene: React.FC = () => (
  <>
    {/* ================= L0 · SKY — quiet zone (gradient + glow ONLY) ======= */}
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: 1080,
        height: 1345,
        background:
          "linear-gradient(180deg,#FDF8EE 0%,#FBEEDA 30%,#F6DDB4 62%,#EFC894 100%)",
      }}
    />
    <Bloom x={540} y={290} r={560} c="rgba(255,247,224,0.95)" />
    <Bloom x={150} y={250} r={300} c="rgba(255,236,198,0.60)" />
    <Bloom x={920} y={440} r={330} c="rgba(255,228,172,0.62)" />

    {/* ================= L1 · FAR — haze band + soft shafts ================= */}
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 1045,
        width: 1080,
        height: 300,
        background:
          "linear-gradient(180deg, rgba(226,190,140,0) 0%, rgba(223,186,134,0.55) 52%, rgba(213,172,116,0.95) 100%)",
      }}
    />
    {[
      [46, 130, 11],
      [1000, 108, -14],
      [640, 90, -9],
    ].map(([sx, sw, sk], i) => (
      <div
        key={i}
        style={{
          position: "absolute",
          left: sx,
          top: 900,
          width: sw,
          height: 445,
          background:
            "linear-gradient(180deg, rgba(255,242,206,0.52), rgba(255,242,206,0))",
          transform: `skewX(${sk}deg)`,
          filter: "blur(17px)",
        }}
      />
    ))}

    {/* ================= L2 · DESK PLANE — one solid full-width band ======== */}
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 1345,
        width: 1080,
        height: 575,
        background:
          "linear-gradient(180deg,#D7B589 0%,#C49C6D 30%,#AE8556 72%,#9A7147 100%)",
      }}
    />
    <div style={{ position: "absolute", left: 0, top: 1345, width: 1080, height: 7, background: "#EBD2AB" }} />
    {/* contrasting aperture behind the hero — a warm sprite on a warm desk
        vanishes, so the right side is opened up with light */}
    <Bloom x={866} y={1330} r={340} c="rgba(255,249,230,0.95)" />
    <Bloom x={852} y={1460} r={250} c="rgba(255,234,192,0.80)" />

    {/* ================= L3 · MONITOR STAND ================================ */}
    <div style={{ position: "absolute", left: 620, top: 1286, width: 84, height: 50, background: "linear-gradient(90deg,#3B4A63,#26324A)" }} />
    <div
      style={{
        position: "absolute",
        left: 546,
        top: 1336,
        width: 236,
        height: 28,
        borderRadius: 9,
        background: "linear-gradient(180deg,#42536E,#26324A)",
      }}
    />
    <div
      style={{
        position: "absolute",
        left: 522,
        top: 1352,
        width: 288,
        height: 40,
        borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(96,64,36,0.52), rgba(96,64,36,0) 70%)",
        filter: "blur(8px)",
      }}
    />

    {/* ================= L4 · THE TERMINAL PANEL (hero artifact) ============ */}
    <div
      style={{
        position: "absolute",
        left: 140,
        top: 900,
        width: 800,
        height: 390,
        borderRadius: 26,
        background: "linear-gradient(180deg,#1B2231 0%,#121826 100%)",
        boxSizing: "border-box",
        border: "5px solid #2E3B52",
        boxShadow: "0 34px 62px -18px rgba(70,50,32,0.55)",
      }}
    />
    <div
      style={{
        position: "absolute",
        left: 145,
        top: 905,
        width: 790,
        height: 56,
        borderRadius: "21px 21px 0 0",
        background: "linear-gradient(180deg,#2B3852,#222D42)",
      }}
    />
    {["#C44A3A", "#E7B24C", "#3F9E74"].map((c, i) => (
      <div
        key={i}
        style={{
          position: "absolute",
          left: 175 + i * 36,
          top: 922,
          width: 22,
          height: 22,
          borderRadius: "50%",
          background: c,
        }}
      />
    ))}
    <div
      style={{
        position: "absolute",
        left: 300,
        top: 920,
        fontFamily: mono,
        fontWeight: 700,
        fontSize: 24,
        letterSpacing: "0.10em",
        color: "#8FA6C4",
      }}
    >
      claude · status
    </div>

    {/* the command */}
    <div style={{ position: "absolute", left: 186, top: 996, fontFamily: mono, fontWeight: 700, fontSize: 34, color: "#E7B24C" }}>
      $
    </div>
    <div style={{ position: "absolute", left: 218, top: 996, fontFamily: mono, fontWeight: 700, fontSize: 34, color: "#EDE7DA" }}>
      /status
    </div>

    {/* the result block — every row ends by x436 so the burst zone (x484+) and
        Claude's silhouette (x739+) never collide with printed text */}
    <div style={{ position: "absolute", left: 186, top: 1042, fontFamily: mono, fontWeight: 700, fontSize: 26, color: "#7E93AE" }}>
      account&nbsp;&nbsp;&nbsp;active
    </div>
    <div style={{ position: "absolute", left: 186, top: 1186, fontFamily: mono, fontWeight: 700, fontSize: 26, color: "#7E93AE" }}>
      context&nbsp;&nbsp;&nbsp;long
    </div>
    <div style={{ position: "absolute", left: 186, top: 1234, fontFamily: mono, fontWeight: 700, fontSize: 30, color: "#E7B24C" }}>
      $
    </div>
    <div style={{ position: "absolute", left: 218, top: 1232, width: 20, height: 32, background: "#E7B24C" }} />

    {/* THE highlighted row */}
    <div
      style={{
        position: "absolute",
        left: 176,
        top: 1082,
        width: 440,
        height: 78,
        borderRadius: 14,
        background: "linear-gradient(180deg,#33301F,#26241A)",
        boxSizing: "border-box",
        border: "4px solid #E7B24C",
        boxShadow: "0 0 34px rgba(231,178,76,0.55)",
      }}
    />
    <div style={{ position: "absolute", left: 200, top: 1102, fontFamily: mono, fontWeight: 700, fontSize: 30, color: "#CBD8E8" }}>
      Model:
    </div>
    <div style={{ position: "absolute", left: 340, top: 1102, fontFamily: mono, fontWeight: 700, fontSize: 30, color: "#F3CE7C" }}>
      opus-4.8
    </div>

    {/* ---------- THE VERB: burst + magnifier over the answer -------------- */}
    <div style={{ position: "absolute", left: 600, top: 1120, width: 0, height: 0 }}>
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: 0,
            top: -6,
            width: 26 + (i % 3) * 14,
            height: 12,
            borderRadius: 6,
            transformOrigin: "0 50%",
            transform: `rotate(${i * 30 + 14}deg) translateX(66px)`,
            background: i % 2 === 0 ? "#E7B24C" : "#FFF0C8",
          }}
        />
      ))}
    </div>
    <Bloom x={600} y={1120} r={150} c="rgba(255,226,152,0.80)" />
    <div
      style={{
        position: "absolute",
        left: 633,
        top: 1164,
        width: 22,
        height: 84,
        borderRadius: 11,
        transformOrigin: "50% 0%",
        transform: "rotate(45deg)",
        background: "linear-gradient(180deg,#E7B24C,#A9761F)",
      }}
    />
    <div
      style={{
        position: "absolute",
        /* ⛔ The lens magnifies the Model row, so its text length is coupled to
           that row. When the row went "opus" -> "opus-4.8" the string outgrew the
           100px inner circle, wrapped to two lines and burst out of the lens.
           Widened the lens and pinned nowrap so the coupling can't break silently. */
        left: 522,
        top: 1044,
        width: 152,
        height: 152,
        borderRadius: "50%",
        background: "radial-gradient(circle at 36% 30%, #3E4759 0%, #1B2130 72%)",
        boxSizing: "border-box",
        border: "12px solid #E7B24C",
        boxShadow: "0 0 32px rgba(231,178,76,0.75)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <div style={{ fontFamily: mono, fontWeight: 700, fontSize: 24, color: "#F3CE7C", whiteSpace: "nowrap" }}>opus-4.8</div>
    </div>

    {/* ================= L5 · THE TWO CHIPS ON A SHELF — the QUESTION =======
        neutral by construction: gold chip, slate chip, a mono "?" between. No
        arrow, no cross, nothing that claims one was swapped for the other. */}
    <div
      style={{
        position: "absolute",
        left: 150,
        top: 1454,
        width: 420,
        height: 32,
        borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(96,64,36,0.50), rgba(96,64,36,0) 72%)",
        filter: "blur(8px)",
      }}
    />
    <div
      style={{
        position: "absolute",
        left: 168,
        top: 1330,
        width: 150,
        height: 86,
        borderRadius: 16,
        background: "linear-gradient(180deg,#F0C86E,#D79A32)",
        boxSizing: "border-box",
        border: "4px solid #A9761F",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ fontFamily: mono, fontWeight: 700, fontSize: 26, letterSpacing: "0.06em", color: "#2E2510" }}>FABLE 5</div>
    </div>
    <div
      style={{
        position: "absolute",
        left: 340,
        top: 1332,
        fontFamily: mono,
        fontWeight: 700,
        fontSize: 56,
        color: "#3A5C84",
      }}
    >
      ?
    </div>
    <div
      style={{
        position: "absolute",
        left: 394,
        top: 1330,
        width: 150,
        height: 86,
        borderRadius: 16,
        background: "linear-gradient(180deg,#4A6E96,#33506F)",
        boxSizing: "border-box",
        border: "4px solid #24405F",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ fontFamily: mono, fontWeight: 700, fontSize: 24, letterSpacing: "0.06em", color: "#E6EDF6" }}>OPUS 4.8</div>
    </div>
    <div
      style={{
        position: "absolute",
        left: 140,
        top: 1416,
        width: 440,
        height: 30,
        borderRadius: 8,
        background: "linear-gradient(180deg,#4A5A70,#2F3B4C)",
      }}
    />
    <div style={{ position: "absolute", left: 140, top: 1446, width: 440, height: 12, borderRadius: "0 0 8px 8px", background: "#26303E" }} />

    {/* ================= L6 · HERO — Claude, off-centre at x852 ============= */}
    {/* contact shadow: WIDER than the 225px visible sprite or it disappears */}
    <div
      style={{
        position: "absolute",
        left: 692,
        top: 1438,
        width: 320,
        height: 44,
        borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(88,56,30,0.74), rgba(92,60,32,0) 70%)",
        filter: "blur(8px)",
      }}
    />
    <div style={{ position: "absolute", left: 730, top: 1235 }}>
      <PkMascot lf={24} size={245} sherlock={1} gaze={-5} />
    </div>

    {/* ================= L7 · FOREGROUND — desk rail + motes ================ */}
    <div style={{ position: "absolute", left: 0, top: 880, width: 1080, height: 620 }}>
      <Dust n={26} w={1080} h={620} c="rgba(255,240,206,0.95)" s={13} />
    </div>
    <div style={{ position: "absolute", left: 0, top: 1180, width: 1080, height: 400 }}>
      <Dust n={12} w={1080} h={400} c="rgba(212,146,74,0.85)" s={31} />
    </div>
    <div style={{ position: "absolute", left: -20, top: 1556, width: 1120, height: 20, background: "#C08B52" }} />
    <div
      style={{
        position: "absolute",
        left: -20,
        top: 1576,
        width: 1120,
        height: 344,
        background: "linear-gradient(180deg,#A97844 0%,#8A6038 46%,#6F4B2A 100%)",
      }}
    />
    <div style={{ position: "absolute", left: 40, top: 1622, width: 1000, height: 3, background: "#93683A" }} />
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 1680,
        width: 1080,
        height: 240,
        background: "linear-gradient(180deg, rgba(96,66,36,0) 0%, rgba(88,60,32,0.45) 100%)",
      }}
    />
  </>
);

export const CoverWorthy: React.FC = () => (
  <SceneCover
    scene={<WorthyScene />}
    line1={<>ARE YOU <span style={{ color: CLAY }}>ACTUALLY</span> ON</>}
    giant={<>FABLE 5?</>}
  />
);

/* ---------- ATTACK ---------- */

/* ==========================================================================
   ATTACK — scene body · 1080 x 1920 full-bleed static still
   Headline "ONE LINE KILLS THE / YES-MAN" is composited over the top band
   later, so EVERY pixel above y780 is sky gradient + radial glow only.
   Topmost drawn element = the ATTACK panel's top edge (and the topmost spoke
   of the landing burst, which stops on that same line), y=900.

   THE VERB: a gold FLIP arc leaves the limp "Looks great!" card, swings up the
   corridor between Claude and the panel, and detonates on the ATTACK MODE
   title bar. BEFORE is small, pale and low; AFTER is large, dark and red.

   DEPTH: sky · far haze + shafts · floor plane + aperture · pale BEFORE card ·
          flip arc + burst · ATTACK panel (hero artifact) · Claude (hero) ·
          floor band + motes (foreground).
   Claude is pushed off-centre to x158 (visible x43..273) so the corridor the
   arc travels (x398..536) and the panel (x480+) are both completely clear of
   his silhouette. He wears NO costume — this reel used the plain mascot.
   Floor is ONE solid full-width band — never two shapes with a gap.
   ========================================================================== */

const AttackScene: React.FC = () => (
  <>
    {/* ================= L0 · SKY — quiet zone (gradient + glow ONLY) ======= */}
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: 1080,
        height: 1345,
        background:
          "linear-gradient(180deg,#FDF7EC 0%,#FBEEDA 30%,#F6DDB4 62%,#EFC894 100%)",
      }}
    />
    <Bloom x={520} y={296} r={560} c="rgba(255,247,224,0.95)" />
    <Bloom x={904} y={300} r={330} c="rgba(255,226,168,0.60)" />
    <Bloom x={130} y={430} r={300} c="rgba(255,238,200,0.55)" />

    {/* ================= L1 · FAR — haze band + studio shafts =============== */}
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 1050,
        width: 1080,
        height: 295,
        background:
          "linear-gradient(180deg, rgba(224,188,138,0) 0%, rgba(221,183,131,0.55) 52%, rgba(211,169,114,0.95) 100%)",
      }}
    />
    {[
      [176, 128, 10],
      [700, 168, -12],
      [948, 92, -15],
    ].map(([sx, sw, sk], i) => (
      <div
        key={i}
        style={{
          position: "absolute",
          left: sx,
          top: 900,
          width: sw,
          height: 445,
          background:
            "linear-gradient(180deg, rgba(255,243,210,0.52), rgba(255,243,210,0))",
          transform: `skewX(${sk}deg)`,
          filter: "blur(17px)",
        }}
      />
    ))}

    {/* ================= L2 · FLOOR PLANE — one solid full-width band ======= */}
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 1345,
        width: 1080,
        height: 575,
        background:
          "linear-gradient(180deg,#D8B78B 0%,#C49D6F 32%,#AE8557 74%,#986F45 100%)",
      }}
    />
    <div style={{ position: "absolute", left: 0, top: 1345, width: 1080, height: 7, background: "#EAD1AA" }} />
    {/* contrasting aperture behind the hero — a warm sprite on a warm floor
        vanishes, so the left side is opened up with light */}
    <Bloom x={158} y={1338} r={330} c="rgba(255,249,230,0.95)" />
    <Bloom x={158} y={1462} r={240} c="rgba(255,234,192,0.80)" />

    {/* ================= L3 · THE BEFORE — small, pale, limp ================
        140x148 and dropped low on purpose: the weak thing has to LOSE the
        size contest against the panel before a single word is read. */}
    <div
      style={{
        position: "absolute",
        left: 306,
        top: 1454,
        width: 190,
        height: 34,
        borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(96,64,36,0.52), rgba(96,64,36,0) 72%)",
        filter: "blur(7px)",
      }}
    />
    <div
      style={{
        position: "absolute",
        left: 120,
        top: 990,
        width: 190,
        height: 200,
        borderRadius: 12,
        transform: "rotate(-6deg)",
        transformOrigin: "50% 100%",
        background: "linear-gradient(180deg,#F3EEE2,#E4DDCB)",
        boxSizing: "border-box",
        border: "4px solid #D5CCB8",
        boxShadow: "0 12px 22px -8px rgba(90,66,42,0.38)",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 20,
          top: 24,
          width: 150,
          height: 104,
          borderRadius: 18,
          background: "#EAE4D6",
          boxSizing: "border-box",
          border: "3px solid #CFC6B2",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 46,
          top: 128,
          width: 32,
          height: 26,
          background: "#EAE4D6",
          clipPath: "polygon(0 0, 100% 0, 22% 100%)",
        }}
      />
      <div style={{ position: "absolute", left: 58, top: 50, fontFamily: mono, fontWeight: 700, fontSize: 25, color: "#6E675A" }}>
        Looks
      </div>
      <div style={{ position: "absolute", left: 50, top: 84, fontFamily: mono, fontWeight: 700, fontSize: 25, color: "#6E675A" }}>
        great!
      </div>
      <div
        style={{
          position: "absolute",
          left: 80,
          top: 150,
          width: 30,
          height: 24,
          background: "#B0A796",
          clipPath: "polygon(10% 46%, 25% 30%, 41% 51%, 78% 8%, 92% 23%, 41% 84%)",
        }}
      />
    </div>

    {/* ================= L4 · THE FLIP ARC — the verb =======================
        six gold chevrons on a quadratic sweep from the pale card's shoulder up
        into the panel's title bar. Motion is GOLD; a pale trail would vanish
        against the cream. */}
    {[
      [410, 1240, -100, 34],
      [399, 1177, -85, 38],
      [404, 1118, -69, 42],
      [425, 1064, -54, 46],
      [461, 1015, -41, 50],
      [513, 970, -32, 54],
    ].map(([cx, cy, rot, w], i) => (
      <div
        key={i}
        style={{
          position: "absolute",
          left: (cx as number) - (w as number) / 2,
          top: (cy as number) - 7,
          width: w as number,
          height: 14,
          borderRadius: 7,
          transform: `rotate(${rot}deg)`,
          background: "linear-gradient(90deg,#C9922F,#E7B24C 55%,#FFF0C8 100%)",
          boxShadow: "0 0 22px rgba(231,178,76,0.80)",
        }}
      />
    ))}

    {/* ================= L5 · THE AFTER — the ATTACK panel (hero artifact) == */}
    <div
      style={{
        position: "absolute",
        left: 480,
        top: 1290,
        width: 510,
        height: 46,
        borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(96,64,36,0.55), rgba(96,64,36,0) 70%)",
        filter: "blur(9px)",
      }}
    />
    <div
      style={{
        position: "absolute",
        left: 512,
        top: 1268,
        width: 446,
        height: 30,
        borderRadius: 8,
        background: "linear-gradient(180deg,#3A1F1A,#241412)",
      }}
    />
    <div
      style={{
        position: "absolute",
        left: 480,
        top: 838,
        width: 510,
        height: 430,
        borderRadius: 26,
        background: "linear-gradient(180deg,#241C19 0%,#191310 100%)",
        boxSizing: "border-box",
        border: "6px solid #C44A3A",
        boxShadow: "0 34px 62px -18px rgba(70,44,30,0.60)",
      }}
    />
    <div
      style={{
        position: "absolute",
        left: 486,
        top: 844,
        width: 498,
        height: 74,
        borderRadius: "20px 20px 0 0",
        background: "linear-gradient(180deg,#3F211B,#2B1613)",
      }}
    />
    <div
      style={{
        position: "absolute",
        left: 616,
        top: 862,
        fontFamily: mono,
        fontWeight: 700,
        fontSize: 34,
        letterSpacing: "0.14em",
        color: "#F3A791",
      }}
    >
      ATTACK MODE
    </div>

    {/* the burst where the flip lands — sits LEFT of the title so it never
        eats a letter */}
    <BurstSvg cx={548} cy={916} r={42} n={10} />
    <Bloom x={548} y={916} r={58} c="rgba(255,226,152,0.72)" />

    {/* three red flag rows */}
    {[
      [948, "no price anchor"],
      [1050, "no guarantee"],
      [1152, "wall of text"],
    ].map(([ry, label], i) => (
      <div key={i}>
        <div
          style={{
            position: "absolute",
            left: 506,
            top: ry as number,
            width: 458,
            height: 86,
            borderRadius: 14,
            background: "linear-gradient(180deg,#33241F,#281B17)",
            boxSizing: "border-box",
            border: "2px solid #4A2B23",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 526,
            top: (ry as number) + 41,
            width: 44,
            height: 10,
            borderRadius: 5,
            transform: "rotate(45deg)",
            background: "#E5654F",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 526,
            top: (ry as number) + 41,
            width: 44,
            height: 10,
            borderRadius: 5,
            transform: "rotate(-45deg)",
            background: "#E5654F",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 596,
            top: (ry as number) + 24,
            fontFamily: mono,
            fontWeight: 700,
            fontSize: 32,
            color: "#F2DED6",
          }}
        >
          {label}
        </div>
      </div>
    ))}

    {/* ================= L6 · HERO — Claude, off-centre at x158 ============= */}
    {/* contact shadow: WIDER than the 230px visible sprite or it disappears */}
    <div
      style={{
        position: "absolute",
        left: -2,
        top: 1446,
        width: 320,
        height: 46,
        borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(88,56,30,0.74), rgba(92,60,32,0) 70%)",
        filter: "blur(8px)",
      }}
    />
    <div style={{ position: "absolute", left: 96, top: 1194 }}>
      <PkMascot lf={24} size={300} stern={0.8} />
    </div>

    {/* ================= L7 · FOREGROUND — floor band + gold motes ========== */}
    <div style={{ position: "absolute", left: 0, top: 880, width: 1080, height: 620 }}>
      <Dust n={26} w={1080} h={620} c="rgba(255,242,210,0.95)" s={17} />
    </div>
    <div style={{ position: "absolute", left: 0, top: 1170, width: 1080, height: 410 }}>
      <Dust n={13} w={1080} h={410} c="rgba(214,150,80,0.85)" s={41} />
    </div>
    <div style={{ position: "absolute", left: -20, top: 1546, width: 1120, height: 22, background: "#C08B52" }} />
    <div
      style={{
        position: "absolute",
        left: -20,
        top: 1568,
        width: 1120,
        height: 352,
        background: "linear-gradient(180deg,#A97844 0%,#8A6038 46%,#6F4B2A 100%)",
      }}
    />
    <div style={{ position: "absolute", left: 40, top: 1614, width: 1000, height: 3, background: "#93683A" }} />
    {[
      [128, 1500, 20],
      [886, 1512, 16],
      [604, 1494, 13],
    ].map(([fx, fy, fs], i) => (
      <div
        key={i}
        style={{
          position: "absolute",
          left: fx,
          top: fy,
          width: fs,
          height: fs,
          borderRadius: 4,
          transform: `rotate(${seed(i * 4.1 + 3) * 60 - 30}deg)`,
          background: "#E2A455",
        }}
      />
    ))}
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 1672,
        width: 1080,
        height: 248,
        background: "linear-gradient(180deg, rgba(96,66,36,0) 0%, rgba(88,60,32,0.45) 100%)",
      }}
    />
  </>
);

export const CoverAttack: React.FC = () => (
  <SceneCover
    scene={<AttackScene />}
    line1={<><span style={{ color: CLAY }}>ONE LINE</span> KILLS THE</>}
    giant={<>YES-MAN</>}
  />
);

/* ---------- FACTORY ---------- */

/* ==========================================================================
   FACTORY — scene body · 1080 x 1920 full-bleed static still
   Headline "ONE SPEC BUILDS / 50 UNITS" is composited over the top band later,
   so EVERY pixel above y780 is sky gradient + radial glow only.
   Topmost drawn element = the SUN's twelve-o'clock corona ray tip, y=840.

   !!  THIS IS AN OPENAI / CHATGPT REEL. There is ZERO Claude mascot in this
   file — no PkMascot, no HouseMascot. The cast is a drawn gold SUN (corona of
   rounded rays + two dark dot eyes) and a small silver-blue CRESCENT MOON.
   The working accent is ChatGPT teal #10A37F beside warm gold; clay/orange is
   deliberately absent so this never reads as the Claude lane. The page ground
   stays warm cream so the tile still sits in the grid.

   THE VERB: the QA stamp lands on the finished pallet with a burst — the top
   tier coming back as inspector at the end of its own line.

   THE LINE (left -> right): spec sheet feeds in · press stamps a unit ·
   queued units ride the belt · pallet stacks · 50 / 50 counter · QA lands.

   DEPTH: sky · haze + shafts · sun + moon · ground plane · conveyor + press +
          spec (mid) · pallet + counter + QA stamp (near) · floor band + motes.
   Floor is ONE solid full-width band — never two shapes with a gap.
   ========================================================================== */

const FactoryScene: React.FC = () => (
  <>
    {/* ================= L0 · SKY — quiet zone (gradient + glow ONLY) ======= */}
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: 1080,
        height: 1345,
        background:
          "linear-gradient(180deg,#FDF8EE 0%,#FBEEDA 28%,#F6DDB4 60%,#EFC894 100%)",
      }}
    />
    <Bloom x={540} y={300} r={560} c="rgba(255,248,226,0.95)" />
    <Bloom x={900} y={520} r={340} c="rgba(255,228,168,0.60)" />
    <Bloom x={200} y={380} r={300} c="rgba(255,240,204,0.55)" />

    {/* ================= L1 · FAR — haze band + shafts ======================
        shafts are parked clear of x248..344 so nothing bleeds through the
        crescent moon's cut-out disc. */}
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 1050,
        width: 1080,
        height: 295,
        background:
          "linear-gradient(180deg, rgba(224,188,138,0) 0%, rgba(221,183,131,0.55) 52%, rgba(211,169,114,0.95) 100%)",
      }}
    />
    {[
      [40, 120, 11],
      [520, 168, -12],
      [770, 92, -15],
    ].map(([sx, sw, sk], i) => (
      <div
        key={i}
        style={{
          position: "absolute",
          left: sx,
          top: 900,
          width: sw,
          height: 445,
          background:
            "linear-gradient(180deg, rgba(255,243,210,0.52), rgba(255,243,210,0))",
          transform: `skewX(${sk}deg)`,
          filter: "blur(17px)",
        }}
      />
    ))}

    {/* ================= L2 · THE MOON — small, left ======================== */}
    <Bloom x={296} y={966} r={150} c="rgba(200,224,248,0.55)" />
    {/* a REAL crescent (clip polygon = outer disc minus an offset disc). The
        two-disc "body + background-coloured bite" trick left a visible tan
        disc wherever a bloom or a gradient stop sat under the bite. */}
    <div
      style={{
        position: "absolute",
        left: 250,
        top: 920,
        width: 92,
        height: 92,
        background: "linear-gradient(120deg,#EDF4FC 0%,#BFD5EC 54%,#93B4D7 100%)",
        clipPath:
          "polygon(54.2px 0.7px, 47.8px 0.0px, 41.3px 0.2px, 35.0px 1.3px, 28.9px 3.3px, 23.1px 6.1px, 17.7px 9.7px, 12.9px 14.0px, 8.8px 18.9px, 5.4px 24.4px, 2.8px 30.3px, 1.0px 36.5px, 0.1px 42.8px, 0.1px 49.3px, 1.0px 55.6px, 2.8px 61.8px, 5.4px 67.7px, 8.9px 73.1px, 13.0px 78.1px, 17.8px 82.3px, 23.2px 85.9px, 29.0px 88.7px, 35.1px 90.7px, 41.4px 91.8px, 47.9px 92.0px, 54.3px 91.3px, 60.5px 89.7px, 66.4px 87.2px, 72.0px 84.0px, 66.2px 83.3px, 60.6px 81.9px, 55.3px 79.8px, 50.2px 77.0px, 45.6px 73.6px, 41.4px 69.6px, 37.8px 65.0px, 34.8px 60.1px, 32.6px 54.8px, 31.0px 49.2px, 30.1px 43.5px, 30.1px 37.7px, 30.7px 32.0px, 32.2px 26.4px, 34.3px 21.0px, 37.1px 16.0px, 40.6px 11.4px, 44.6px 7.2px, 49.2px 3.7px)",
      }}
    />
    {[
      [368, 916],
      [238, 1058],
    ].map(([sx, sy], i) => (
      <div key={i}>
        <div style={{ position: "absolute", left: (sx as number) - 11, top: (sy as number) - 3, width: 22, height: 6, borderRadius: 3, background: "#D7E6F5" }} />
        <div style={{ position: "absolute", left: (sx as number) - 3, top: (sy as number) - 11, width: 6, height: 22, borderRadius: 3, background: "#D7E6F5" }} />
      </div>
    ))}

    {/* ================= L3 · THE SUN — above the QA end ====================
        body r76 + a 12-ray corona from r88 to r128, so the highest ray tip
        lands at y840 and the header quiet zone is never touched. */}
    <Bloom x={900} y={968} r={270} c="rgba(255,226,160,0.60)" />
    {/* real SVG sun — same centre and body radius as the div version it replaced */}
    <SunSvg cx={900} cy={968} r={158} uid="fac" />

    {/* ================= L4 · FACTORY FLOOR — one solid full-width band ===== */}
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 1345,
        width: 1080,
        height: 575,
        background:
          "linear-gradient(180deg,#D8B78B 0%,#C49D6F 32%,#AE8557 74%,#986F45 100%)",
      }}
    />
    <div style={{ position: "absolute", left: 0, top: 1345, width: 1080, height: 7, background: "#EAD1AA" }} />

    {/* ================= L5 · THE SPEC SHEET — spotlit, feeding in ========== */}
    <Bloom x={140} y={1040} r={250} c="rgba(255,248,222,0.90)" />
    <div
      style={{
        position: "absolute",
        left: 60,
        top: 966,
        width: 160,
        height: 230,
        borderRadius: 8,
        transform: "rotate(-4deg)",
        transformOrigin: "50% 100%",
        background: "linear-gradient(180deg,#FFFDF6,#F2EBDB)",
        boxSizing: "border-box",
        border: "4px solid #E0D6C0",
        boxShadow: "0 18px 32px -10px rgba(90,64,38,0.45)",
      }}
    >
      <div style={{ position: "absolute", left: 16, top: 18, width: 128, height: 44, borderRadius: 8, background: "#10A37F" }} />
      <div
        style={{
          position: "absolute",
          left: 30,
          top: 30,
          fontFamily: mono,
          fontWeight: 700,
          fontSize: 20,
          letterSpacing: "0.10em",
          color: "#EAF7F2",
        }}
      >
        SPEC
      </div>
      {[124, 100, 116, 88, 108, 78].map((w, i) => (
        <div key={i} style={{ position: "absolute", left: 16, top: 82 + i * 21, width: w, height: 7, borderRadius: 4, background: "#CBC1AA" }} />
      ))}
    </div>

    {/* ================= L6 · THE CONVEYOR ================================== */}
    {[120, 520, 900].map((lx, i) => (
      <div
        key={i}
        style={{
          position: "absolute",
          left: lx - 24,
          top: 1414,
          width: 78,
          height: 30,
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(96,64,36,0.55), rgba(96,64,36,0) 72%)",
          filter: "blur(7px)",
        }}
      />
    ))}
    {[120, 520, 900].map((lx, i) => (
      <div key={i}>
        <div style={{ position: "absolute", left: lx, top: 1250, width: 30, height: 178, background: "linear-gradient(90deg,#46566A,#2A3440)" }} />
        <div style={{ position: "absolute", left: lx - 15, top: 1412, width: 60, height: 16, borderRadius: 5, background: "#22303C" }} />
      </div>
    ))}
    {Array.from({ length: 9 }).map((_, i) => (
      <div
        key={i}
        style={{
          position: "absolute",
          left: -40 + i * 140,
          top: 1270,
          width: 60,
          height: 60,
          borderRadius: "50%",
          background: "radial-gradient(circle at 34% 30%, #8496AB, #414F5F 72%)",
        }}
      />
    ))}
    <div style={{ position: "absolute", left: -20, top: 1150, width: 1120, height: 58, background: "linear-gradient(180deg,#647890,#465768)" }} />
    <div style={{ position: "absolute", left: -20, top: 1150, width: 1120, height: 11, background: "#10A37F" }} />
    <div style={{ position: "absolute", left: -20, top: 1208, width: 1120, height: 84, background: "linear-gradient(180deg,#33404E,#212A35)" }} />
    {Array.from({ length: 12 }).map((_, i) => (
      <div
        key={i}
        style={{
          position: "absolute",
          left: -10 + i * 94,
          top: 1222,
          width: 44,
          height: 56,
          transform: "skewX(-18deg)",
          background: "#41505F",
        }}
      />
    ))}
    <div style={{ position: "absolute", left: -20, top: 1282, width: 1120, height: 10, background: "#10A37F" }} />

    {/* ================= L7 · THE PRESS — units being stamped out =========== */}
    {[430, 592].map((cx, i) => (
      <div key={i} style={{ position: "absolute", left: cx, top: 950, width: 14, height: 200, background: "linear-gradient(90deg,#46566A,#2A3440)" }} />
    ))}
    <div style={{ position: "absolute", left: 424, top: 892, width: 182, height: 62, borderRadius: 12, background: "linear-gradient(180deg,#54677E,#37455A)" }} />
    <div style={{ position: "absolute", left: 424, top: 892, width: 182, height: 12, borderRadius: "12px 12px 0 0", background: "#10A37F" }} />
    <div style={{ position: "absolute", left: 496, top: 954, width: 38, height: 62, background: "linear-gradient(90deg,#8496AB,#56677C)" }} />
    <div style={{ position: "absolute", left: 452, top: 1016, width: 126, height: 46, borderRadius: 8, background: "linear-gradient(180deg,#46566A,#2A3646)" }} />
    <Bloom x={515} y={1060} r={120} c="rgba(255,226,152,0.78)" />
    {[
      [462, 1054, 18],
      [566, 1046, 15],
      [492, 1036, 13],
      [548, 1030, 11],
    ].map(([fx, fy, fs], i) => (
      <div
        key={i}
        style={{
          position: "absolute",
          left: fx,
          top: fy,
          width: fs,
          height: fs,
          borderRadius: 3,
          transform: `rotate(${seed(i * 2.7 + 1) * 70 - 35}deg)`,
          background: i % 2 === 0 ? "#E7B24C" : "#FFF0C8",
        }}
      />
    ))}

    {/* the identical units queued on the belt */}
    {[268, 479, 616, 700].map((ux, i) => (
      <div
        key={i}
        style={{
          position: "absolute",
          left: ux,
          top: 1062,
          width: 72,
          height: 88,
          borderRadius: 8,
          background: "linear-gradient(180deg,#FBF5E7,#EFE4CC)",
          boxSizing: "border-box",
          border: "3px solid #DCCFB4",
          boxShadow: "0 10px 18px -6px rgba(90,64,38,0.38)",
        }}
      >
        <div style={{ position: "absolute", left: 9, top: 9, width: 48, height: 14, borderRadius: 4, background: "#10A37F" }} />
        <div style={{ position: "absolute", left: 9, top: 34, width: 44, height: 6, borderRadius: 3, background: "#CBC1AA" }} />
        <div style={{ position: "absolute", left: 9, top: 48, width: 34, height: 6, borderRadius: 3, background: "#CBC1AA" }} />
        <div style={{ position: "absolute", left: 9, top: 62, width: 40, height: 6, borderRadius: 3, background: "#CBC1AA" }} />
      </div>
    ))}

    {/* ================= L8 · THE 50 / 50 COUNTER ========================== */}
    <div
      style={{
        position: "absolute",
        left: 636,
        top: 1494,
        width: 148,
        height: 30,
        borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(96,64,36,0.52), rgba(96,64,36,0) 72%)",
        filter: "blur(7px)",
      }}
    />
    <div style={{ position: "absolute", left: 682, top: 1450, width: 56, height: 46, background: "linear-gradient(90deg,#3B4A5A,#243039)" }} />
    <div style={{ position: "absolute", left: 654, top: 1490, width: 112, height: 18, borderRadius: 6, background: "#22303C" }} />
    <div
      style={{
        position: "absolute",
        left: 596,
        top: 1348,
        width: 228,
        height: 104,
        borderRadius: 16,
        background: "linear-gradient(180deg,#16303A,#0E2029)",
        boxSizing: "border-box",
        border: "5px solid #10A37F",
        boxShadow: "0 0 30px rgba(16,163,127,0.45)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ fontFamily: mono, fontWeight: 700, fontSize: 44, letterSpacing: "0.04em", color: "#59DDB6" }}>50 / 50</div>
    </div>

    {/* ================= L9 · THE PALLET + THE QA STAMP LANDING ============= */}
    <div
      style={{
        position: "absolute",
        left: 818,
        top: 1498,
        width: 266,
        height: 44,
        borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(96,64,36,0.55), rgba(96,64,36,0) 70%)",
        filter: "blur(9px)",
      }}
    />
    <div style={{ position: "absolute", left: 838, top: 1468, width: 226, height: 44, borderRadius: 6, background: "linear-gradient(180deg,#77613F,#4D3D2A)" }} />
    <div style={{ position: "absolute", left: 848, top: 1500, width: 206, height: 12, borderRadius: 4, background: "#3C301F" }} />

    {/* the stamp, then the impact. ORDER MATTERS: a first pass put the burst
        behind both the stamp AND the stack and it vanished into the 20px of
        air between them. The flash now sits at the stamp's LOWEST corner
        (882,1301), fires only into the lower hemisphere so it can never cross
        the QA face, and is drawn last so it actually reads. */}
    {/* NO motion streaks above the stamp: they sat directly under the sun and
        read as gold dripping off IT, not as the stamp travelling. The contact
        flash alone carries the strike. */}
    <div
      style={{
        position: "absolute",
        left: 924,
        top: 1156,
        width: 52,
        height: 48,
        borderRadius: 8,
        transform: "rotate(-7deg)",
        background: "linear-gradient(180deg,#54677E,#37455A)",
      }}
    />
    <div
      style={{
        position: "absolute",
        left: 876,
        top: 1196,
        width: 148,
        height: 96,
        borderRadius: 12,
        transform: "rotate(-7deg)",
        background: "linear-gradient(180deg,#33404E,#1E2833)",
        boxSizing: "border-box",
        border: "4px solid #10A37F",
        boxShadow: "0 16px 30px -8px rgba(70,50,32,0.55)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ fontFamily: mono, fontWeight: 700, fontSize: 42, letterSpacing: "0.12em", color: "#59DDB6" }}>QA</div>
    </div>
    <Bloom x={896} y={1300} r={160} c="rgba(255,226,152,0.82)" />

    {[1420, 1370, 1320].map((ry, r) =>
      [852, 920, 988].map((cx, c) => (
        <div
          key={`${r}-${c}`}
          style={{
            position: "absolute",
            left: cx,
            top: ry,
            width: 62,
            height: 46,
            borderRadius: 6,
            background: "linear-gradient(180deg,#FBF5E7,#EFE4CC)",
            boxSizing: "border-box",
            border: "3px solid #DCCFB4",
          }}
        >
          <div style={{ position: "absolute", left: 7, top: 7, width: 34, height: 9, borderRadius: 3, background: "#10A37F" }} />
          <div style={{ position: "absolute", left: 7, top: 24, width: 26, height: 5, borderRadius: 3, background: "#CBC1AA" }} />
        </div>
      ))
    )}

    <div style={{ position: "absolute", left: 896, top: 1300, width: 0, height: 0 }}>
      {Array.from({ length: 9 }).map((_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: 0,
            top: -6,
            width: 26 + (i % 3) * 16,
            height: 12,
            borderRadius: 6,
            transformOrigin: "0 50%",
            transform: `rotate(${8 + i * 20}deg) translateX(28px)`,
            background: i % 2 === 0 ? "#E7B24C" : "#FFF0C8",
          }}
        />
      ))}
    </div>

    {/* ================= L10 · FOREGROUND — floor band + gold motes ========= */}
    <div style={{ position: "absolute", left: 0, top: 880, width: 1080, height: 620 }}>
      <Dust n={26} w={1080} h={620} c="rgba(255,242,210,0.95)" s={19} />
    </div>
    <div style={{ position: "absolute", left: 0, top: 1180, width: 1080, height: 400 }}>
      <Dust n={12} w={1080} h={400} c="rgba(214,150,80,0.85)" s={47} />
    </div>
    <div style={{ position: "absolute", left: -20, top: 1560, width: 1120, height: 24, background: "#C79256" }} />
    <div
      style={{
        position: "absolute",
        left: -20,
        top: 1584,
        width: 1120,
        height: 336,
        background: "linear-gradient(180deg,#B0803F 0%,#8A6230 48%,#6C4A22 100%)",
      }}
    />
    <div style={{ position: "absolute", left: 40, top: 1630, width: 1000, height: 3, background: "#95682F" }} />
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 1690,
        width: 1080,
        height: 230,
        background: "linear-gradient(180deg, rgba(96,66,36,0) 0%, rgba(88,60,32,0.45) 100%)",
      }}
    />
  </>
);

export const CoverFactory: React.FC = () => (
  <SceneCover
    scene={<FactoryScene />}
    line1={<>ONE SPEC BUILDS</>}
    giant={<><span style={{ color: CLAY }}>50</span> UNITS</>}
  />
);

/* ---------- SOL ---------- */

/* ==========================================================================
   SOL — scene body · 1080 x 1920 full-bleed static still
   Headline "STOP USING SOL LIKE / A CHATBOT" is composited over the top band
   later, so EVERY pixel above y780 is sky gradient + radial glow only.
   Topmost drawn element = the SUN's twelve-o'clock corona ray tip, y=828.

   !!  THIS IS AN OPENAI REEL. There is ZERO Claude mascot in this file — no
   PkMascot, no HouseMascot. The cast is a drawn gold SUN (corona of rounded
   rays + two dark dot eyes) and a small silver-blue CRESCENT MOON. The working
   accent is ChatGPT teal #10A37F beside warm gold; clay/orange is deliberately
   absent so this never reads as the Claude lane. Page ground stays warm cream.

   THE VERB: a gold beam leaves the tipped-over chat bubble and detonates on
   the workflow fan — the demotion of "chatbot" into three real workflows.

   THE FAN (back to front P1, P3, P2 so the centre card wins): 2x2 parallel
   subagent panes · a 3-step tier ladder · a browser window under a cursor.
   Every emblem is inset 26px, which is more than the 22px each neighbour
   overlaps, so no panel ever eats another panel's meaning.

   DEPTH: sky · haze + shafts · moon · sun · stage plane · chat bubble (mid) ·
          panel fan (hero) · beam + burst · stage lip + motes (foreground).
   Stage is ONE solid full-width band — never two shapes with a gap.
   ========================================================================== */

const SolScene: React.FC = () => (
  <>
    {/* ================= L0 · SKY — quiet zone (gradient + glow ONLY) ======= */}
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: 1080,
        height: 1345,
        background:
          "linear-gradient(180deg,#FDF8EE 0%,#FBEEDA 28%,#F6DDB4 60%,#EFC894 100%)",
      }}
    />
    <Bloom x={560} y={290} r={560} c="rgba(255,248,226,0.95)" />
    <Bloom x={140} y={430} r={310} c="rgba(255,238,200,0.58)" />
    <Bloom x={940} y={380} r={330} c="rgba(255,228,168,0.60)" />

    {/* ================= L1 · FAR — haze band + stage shafts ================
        shafts stay clear of x100..192 so nothing bleeds through the crescent
        moon's cut-out disc. */}
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 1050,
        width: 1080,
        height: 295,
        background:
          "linear-gradient(180deg, rgba(224,188,138,0) 0%, rgba(221,183,131,0.55) 52%, rgba(211,169,114,0.95) 100%)",
      }}
    />
    {[
      [380, 128, 10],
      [640, 168, -12],
      [990, 92, -15],
    ].map(([sx, sw, sk], i) => (
      <div
        key={i}
        style={{
          position: "absolute",
          left: sx,
          top: 900,
          width: sw,
          height: 445,
          background:
            "linear-gradient(180deg, rgba(255,243,210,0.52), rgba(255,243,210,0))",
          transform: `skewX(${sk}deg)`,
          filter: "blur(17px)",
        }}
      />
    ))}

    {/* ================= L2 · THE MOON — small, lower left ================== */}
    <Bloom x={146} y={1030} r={140} c="rgba(200,224,248,0.52)" />
    {/* a REAL crescent (clip polygon = outer disc minus an offset disc). The
        two-disc "body + background-coloured bite" trick left a visible tan
        disc wherever a bloom or a gradient stop sat under the bite. */}
    <div
      style={{
        position: "absolute",
        left: 100,
        top: 984,
        width: 92,
        height: 92,
        background: "linear-gradient(120deg,#EDF4FC 0%,#BFD5EC 54%,#93B4D7 100%)",
        clipPath:
          "polygon(54.2px 0.7px, 47.8px 0.0px, 41.3px 0.2px, 35.0px 1.3px, 28.9px 3.3px, 23.1px 6.1px, 17.7px 9.7px, 12.9px 14.0px, 8.8px 18.9px, 5.4px 24.4px, 2.8px 30.3px, 1.0px 36.5px, 0.1px 42.8px, 0.1px 49.3px, 1.0px 55.6px, 2.8px 61.8px, 5.4px 67.7px, 8.9px 73.1px, 13.0px 78.1px, 17.8px 82.3px, 23.2px 85.9px, 29.0px 88.7px, 35.1px 90.7px, 41.4px 91.8px, 47.9px 92.0px, 54.3px 91.3px, 60.5px 89.7px, 66.4px 87.2px, 72.0px 84.0px, 66.2px 83.3px, 60.6px 81.9px, 55.3px 79.8px, 50.2px 77.0px, 45.6px 73.6px, 41.4px 69.6px, 37.8px 65.0px, 34.8px 60.1px, 32.6px 54.8px, 31.0px 49.2px, 30.1px 43.5px, 30.1px 37.7px, 30.7px 32.0px, 32.2px 26.4px, 34.3px 21.0px, 37.1px 16.0px, 40.6px 11.4px, 44.6px 7.2px, 49.2px 3.7px)",
      }}
    />
    {[
      [222, 972],
      [96, 1112],
    ].map(([sx, sy], i) => (
      <div key={i}>
        <div style={{ position: "absolute", left: (sx as number) - 11, top: (sy as number) - 3, width: 22, height: 6, borderRadius: 3, background: "#D7E6F5" }} />
        <div style={{ position: "absolute", left: (sx as number) - 3, top: (sy as number) - 11, width: 6, height: 22, borderRadius: 3, background: "#D7E6F5" }} />
      </div>
    ))}

    {/* ================= L3 · THE SUN — above the fan =======================
        body r76 + a 12-ray corona from r88 to r128, so the highest ray tip
        lands at y828 and the header quiet zone is never touched. Its lower
        rim tucks behind the centre panel, which is what makes it read as
        RISING behind the work rather than pasted on top of it. */}
    <Bloom x={730} y={956} r={280} c="rgba(255,226,160,0.62)" />
    {/* real SVG sun: body r=0.48*158=76 (unchanged), ray tips at y815 — still
        clear of the 780 header quiet zone */}
    <SunSvg cx={730} cy={956} r={158} uid="sol" />

    {/* ================= L4 · STAGE PLANE — one solid full-width band ======= */}
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 1345,
        width: 1080,
        height: 575,
        background:
          "linear-gradient(180deg,#D8B78B 0%,#C49D6F 32%,#AE8557 74%,#986F45 100%)",
      }}
    />
    <div style={{ position: "absolute", left: 0, top: 1345, width: 1080, height: 7, background: "#EAD1AA" }} />

    {/* ================= L5 · THE DISCARDED CHAT BUBBLE — small, dull ======= */}
    <div
      style={{
        position: "absolute",
        left: 66,
        top: 1372,
        width: 260,
        height: 38,
        borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(96,64,36,0.48), rgba(96,64,36,0) 72%)",
        filter: "blur(8px)",
      }}
    />
    <div
      style={{
        position: "absolute",
        left: 96,
        top: 1160,
        width: 212,
        height: 206,
        borderRadius: 18,
        transform: "rotate(-13deg)",
        transformOrigin: "50% 100%",
        background: "linear-gradient(180deg,#E8E4DA,#D6D1C4)",
        boxSizing: "border-box",
        border: "4px solid #BEB8AA",
        boxShadow: "0 14px 26px -8px rgba(90,66,42,0.38)",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 24,
          top: 30,
          width: 164,
          height: 108,
          borderRadius: 20,
          background: "#D8D3C8",
          boxSizing: "border-box",
          border: "4px solid #ADA79A",
        }}
      />
      {/* the tail has to CLEAR the bubble's bottom edge by a real margin or the
          card stops reading as a speech bubble at all */}
      <div
        style={{
          position: "absolute",
          left: 44,
          top: 130,
          width: 44,
          height: 38,
          background: "#D8D3C8",
          clipPath: "polygon(0 0, 100% 0, 10% 100%)",
        }}
      />
      {[
        [52, 118],
        [78, 96],
        [104, 74],
      ].map(([ly, lw], i) => (
        <div key={i} style={{ position: "absolute", left: 44, top: ly, width: lw, height: 10, borderRadius: 5, background: "#8E887B" }} />
      ))}
      <div style={{ position: "absolute", left: 24, top: 178, width: 108, height: 14, borderRadius: 7, background: "#A49E91" }} />
    </div>

    {/* ================= L6 · THE WORKFLOW FAN — hero ======================= */}
    {[
      [412, 1356, 236, 42],
      [812, 1356, 236, 42],
      [618, 1318, 224, 40],
    ].map(([sx, sy, sw, sh], i) => (
      <div
        key={i}
        style={{
          position: "absolute",
          left: sx,
          top: sy,
          width: sw,
          height: sh,
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(96,64,36,0.52), rgba(96,64,36,0) 72%)",
          filter: "blur(9px)",
        }}
      />
    ))}

    {/* ---- P1 · parallel subagent panes ---------------------------------- */}
    <div
      style={{
        position: "absolute",
        left: 430,
        top: 1035,
        width: 200,
        height: 330,
        borderRadius: 22,
        transform: "rotate(-8deg)",
        background: "linear-gradient(180deg,#FFFDF6,#F2EBDB)",
        boxSizing: "border-box",
        border: "5px solid #DED3BC",
        boxShadow: "0 24px 46px -14px rgba(90,64,38,0.48)",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 5,
          top: 5,
          width: 190,
          height: 54,
          borderRadius: "17px 17px 0 0",
          background: "#10A37F",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ fontFamily: mono, fontWeight: 700, fontSize: 17, letterSpacing: "0.08em", color: "#EAF7F2" }}>SUBAGENTS</div>
      </div>
      {[
        [28, 88],
        [106, 88],
        [28, 176],
        [106, 176],
      ].map(([px, py], i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: px,
            top: py,
            width: 66,
            height: 74,
            borderRadius: 8,
            background: "#EFF4F9",
            boxSizing: "border-box",
            border: "3px solid #B9C8D8",
          }}
        >
          <div style={{ position: "absolute", left: 7, top: 7, width: 40, height: 10, borderRadius: 3, background: "#10A37F" }} />
          <div style={{ position: "absolute", left: 7, top: 27, width: 46, height: 6, borderRadius: 3, background: "#C6D2DE" }} />
          <div style={{ position: "absolute", left: 7, top: 41, width: 32, height: 6, borderRadius: 3, background: "#C6D2DE" }} />
        </div>
      ))}
      <div style={{ position: "absolute", left: 28, top: 268, width: 144, height: 12, borderRadius: 6, background: "#CFC5B0" }} />
    </div>

    {/* ---- P3 · drive the browser ---------------------------------------- */}
    <div
      style={{
        position: "absolute",
        left: 830,
        top: 1035,
        width: 200,
        height: 330,
        borderRadius: 22,
        transform: "rotate(8deg)",
        background: "linear-gradient(180deg,#FFFDF6,#F2EBDB)",
        boxSizing: "border-box",
        border: "5px solid #DED3BC",
        boxShadow: "0 24px 46px -14px rgba(90,64,38,0.48)",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 5,
          top: 5,
          width: 190,
          height: 54,
          borderRadius: "17px 17px 0 0",
          background: "#10A37F",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ fontFamily: mono, fontWeight: 700, fontSize: 17, letterSpacing: "0.08em", color: "#EAF7F2" }}>BROWSER</div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 26,
          top: 92,
          width: 148,
          height: 152,
          borderRadius: 10,
          background: "#FFFFFF",
          boxSizing: "border-box",
          border: "3px solid #B9C8D8",
        }}
      />
      <div style={{ position: "absolute", left: 29, top: 95, width: 142, height: 26, borderRadius: "7px 7px 0 0", background: "#E3EAF2" }} />
      {[38, 54, 70].map((dx, i) => (
        <div key={i} style={{ position: "absolute", left: dx, top: 103, width: 10, height: 10, borderRadius: "50%", background: "#B6C2D0" }} />
      ))}
      <div style={{ position: "absolute", left: 88, top: 101, width: 74, height: 14, borderRadius: 7, background: "#C4D0DE" }} />
      {[
        [140, 116],
        [164, 92],
        [188, 104],
      ].map(([ly, lw], i) => (
        <div key={i} style={{ position: "absolute", left: 42, top: ly, width: lw, height: 10, borderRadius: 5, background: "#D2DAE4" }} />
      ))}
      <div style={{ position: "absolute", left: 42, top: 210, width: 60, height: 22, borderRadius: 6, background: "#10A37F" }} />
      <div
        style={{
          position: "absolute",
          left: 100,
          top: 186,
          width: 44,
          height: 44,
          borderRadius: "50%",
          boxSizing: "border-box",
          border: "4px solid #E7B24C",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 116,
          top: 194,
          width: 30,
          height: 40,
          background: "#1A1813",
          clipPath: "polygon(0 0, 0 78%, 24% 58%, 44% 100%, 64% 90%, 44% 50%, 78% 46%)",
        }}
      />
      <div style={{ position: "absolute", left: 26, top: 268, width: 148, height: 12, borderRadius: 6, background: "#CFC5B0" }} />
    </div>

    {/* ---- P2 · the tier stack (drawn last so the centre card wins) ------- */}
    <div
      style={{
        position: "absolute",
        left: 630,
        top: 1005,
        width: 200,
        height: 330,
        borderRadius: 22,
        background: "linear-gradient(180deg,#FFFDF6,#F2EBDB)",
        boxSizing: "border-box",
        border: "5px solid #DED3BC",
        boxShadow: "0 28px 52px -14px rgba(90,64,38,0.52)",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 5,
          top: 5,
          width: 190,
          height: 54,
          borderRadius: "17px 17px 0 0",
          background: "#10A37F",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ fontFamily: mono, fontWeight: 700, fontSize: 17, letterSpacing: "0.08em", color: "#EAF7F2" }}>TIERS</div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 46,
          top: 90,
          width: 34,
          height: 28,
          background: "#10A37F",
          clipPath: "polygon(50% 0, 100% 100%, 0 100%)",
        }}
      />
      <div style={{ position: "absolute", left: 28, top: 128, width: 72, height: 44, borderRadius: 8, background: "#E7B24C" }} />
      <div style={{ position: "absolute", left: 28, top: 180, width: 108, height: 44, borderRadius: 8, background: "#10A37F" }} />
      <div style={{ position: "absolute", left: 28, top: 232, width: 144, height: 44, borderRadius: 8, background: "#3A5C84" }} />
      <div style={{ position: "absolute", left: 28, top: 292, width: 144, height: 12, borderRadius: 6, background: "#CFC5B0" }} />
    </div>

    {/* ================= L7 · THE BEAM + BURST — the verb ===================
        drawn AFTER the fan so the landing reads as ON the cards. Motion is
        GOLD; a pale trail would vanish against the cream. */}
    <div
      style={{
        position: "absolute",
        left: 312,
        top: 1254,
        width: 177,
        height: 28,
        borderRadius: 14,
        transformOrigin: "0 50%",
        transform: "rotate(-41.8deg)",
        background: "linear-gradient(90deg,#C9922F 0%,#E7B24C 46%,#FFF0C8 100%)",
        boxShadow: "0 0 30px rgba(231,178,76,0.80)",
      }}
    />
    <div style={{ position: "absolute", left: 444, top: 1150, width: 0, height: 0 }}>
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: 0,
            top: -6,
            width: 24 + (i % 3) * 12,
            height: 12,
            borderRadius: 6,
            transformOrigin: "0 50%",
            transform: `rotate(${i * 30 + 14}deg) translateX(24px)`,
            background: i % 2 === 0 ? "#E7B24C" : "#FFF0C8",
          }}
        />
      ))}
    </div>
    <Bloom x={444} y={1150} r={140} c="rgba(255,226,152,0.80)" />

    {/* ================= L8 · FOREGROUND — stage lip + gold motes =========== */}
    <div style={{ position: "absolute", left: 0, top: 880, width: 1080, height: 620 }}>
      <Dust n={26} w={1080} h={620} c="rgba(255,242,210,0.95)" s={29} />
    </div>
    <div style={{ position: "absolute", left: 0, top: 1180, width: 1080, height: 400 }}>
      <Dust n={12} w={1080} h={400} c="rgba(214,150,80,0.85)" s={53} />
    </div>
    <div style={{ position: "absolute", left: -20, top: 1540, width: 1120, height: 24, background: "#D9A85E" }} />
    <div
      style={{
        position: "absolute",
        left: -20,
        top: 1564,
        width: 1120,
        height: 356,
        background: "linear-gradient(180deg,#BE8B4A 0%,#94682F 48%,#74501F 100%)",
      }}
    />
    <div style={{ position: "absolute", left: 40, top: 1612, width: 1000, height: 3, background: "#9E7133" }} />
    {[
      [156, 1494, 20],
      [910, 1504, 16],
      [560, 1486, 13],
    ].map(([fx, fy, fs], i) => (
      <div
        key={i}
        style={{
          position: "absolute",
          left: fx,
          top: fy,
          width: fs,
          height: fs,
          borderRadius: 4,
          transform: `rotate(${seed(i * 3.9 + 6) * 60 - 30}deg)`,
          background: "#E2A455",
        }}
      />
    ))}
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 1670,
        width: 1080,
        height: 250,
        background: "linear-gradient(180deg, rgba(96,66,36,0) 0%, rgba(88,60,32,0.45) 100%)",
      }}
    />
  </>
);

export const CoverSol: React.FC = () => (
  <SceneCover
    scene={<SolScene />}
    line1={<><span style={{ color: CLAY }}>STOP</span> USING SOL LIKE</>}
    giant={<>A CHATBOT</>}
    giantSize={137}
  />
);

export const CoverPowersProof = cropProof(CoverPowers);
export const CoverEvolveProof = cropProof(CoverEvolve);
export const CoverStackProof = cropProof(CoverStack);
export const CoverArenaProof = cropProof(CoverArena);
export const CoverVaultProof = cropProof(CoverVault);
export const CoverMintProof = cropProof(CoverMint);
export const CoverCrewProof = cropProof(CoverCrew);
export const CoverBlueprintProof = cropProof(CoverBlueprint);
export const CoverCloneProof = cropProof(CoverClone);
export const CoverWorthyProof = cropProof(CoverWorthy);
export const CoverAttackProof = cropProof(CoverAttack);
export const CoverFactoryProof = cropProof(CoverFactory);
export const CoverSolProof = cropProof(CoverSol);
