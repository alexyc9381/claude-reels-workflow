import React from "react";
import {
  W, E, OUT, IO, BACK, LIN, hexa, dkh, mxh, rnd, SH, SH_D, mono, ui, Crew,
  CLAY, CLAYD, GOLD, GREEN, RED, PAPER, CREAMB, INK, MUTE, TEAL, STEEL,
  BRASS, SODIUM, VIOLET, EMBER, OXIDE, SLATE, COPPER, OXBLOOD, WIG, INDIGO, MAG, R,
} from "./JudgeWorld";

/* ===========================================================================
   REEL 132 · "JUDGE" — THE PROPS.  Board: storyboards/132-judge.md.

   ⛔⛔ DRAW, DON'T STACK (memory `reel-draw-dont-stack`). Every object a viewer
   has to NAME is one inline <svg> with real paths, not a pile of divs: the
   brief, the polygraph, the dial, the gavel, the flag, the seal. Stacked CSS
   rectangles render manufactured faces fine (a rack, a door, a plinth) and turn
   organic or mechanical shapes into mush.
   ⛔ THE SILHOUETTE TEST: flat black on white, nameable from the outline alone.
   ⛔ VALUE SEPARATION: hero and ground differ in LIGHTNESS, never only in hue.
   ⛔ Flat + one shade + one highlight, ONE light direction (high right).
   ⛔ NO `boxShadow: 0 0 Npx` — matte only, house-wide.
   ========================================================================= */

/* =========================================================================
   THE HERO ARTIFACT — THE BRIEF.  One object, five states, and the state IS
   the story.  `s` runs 0..1 across the reel:

     0.00  the LIE       oxblood board, gilt rule, a pressed gold seal, a green
                         tick, reading DONE. The handsomest object in the reel.
     0.25  FLAGGED       the same board with red flags driven into it and light
                         coming through the holes behind them
     0.50  CRACKED       the gold seal split across its face
     0.75  REBUILT       banded steel over the board, one bright corner left
     1.00  BULLETPROOF   a solid dark chamfered plate with no gold on it at all

   ⛔ AND IT IS NEVER DRAWN UGLY AT s=0 (docs/ANIMATION-QUALITY §23). The claim
   the script makes is that the output is DISHONEST, not that it is shabby. A
   grey wireframe would be a dead frame and a false statement at the same time.
   ====================================================================== */
export const Brief: React.FC<{
  x: number; y: number; w?: number; s?: number; z?: number; f?: number;
  holes?: number; flags?: number; rot?: number; lit?: number; crack?: number;
  /** ⛔ a per-cut seed: dHash reads GEOMETRY, so the flags and the holes they
      open have to land in DIFFERENT PLACES in each trial cut, not the same
      places under a different grade. */
  seed?: number;
}> = ({ x, y, w: ww = 250, s = 0, z = 60, f = 0, holes = 0, flags = 0, rot = 0,
        lit = 0, crack = 0, seed = 0 }) => {
  const hh = ww * 1.30;
  /* the board darkens and thickens as it is rebuilt */
  /* ⛔ VALUE SEPARATION: the finished plate shipped at #2E3238 into the
     darkest set in the reel and the payoff object was invisible against its own
     room. Steel reads as steel at #55636E with a bright top chamfer. */
  const board = s < 0.5 ? OXBLOOD : s < 0.8 ? "#5A463A" : "#55636E";
  const rule = s < 0.5 ? GOLD : s < 0.8 ? "#C0A468" : "#C2CCD4";
  const gold = 1 - Math.min(1, s * 1.6);          /* the seal fades out as it is rebuilt */
  const armour = Math.max(0, (s - 0.5) * 2);      /* the steel banding comes in */
  return (
    <div style={{ position: "absolute", left: x - ww / 2, top: y - hh, width: ww, height: hh,
      zIndex: z, transform: `rotate(${rot}deg)`, transformOrigin: "50% 100%" }}>
      {/* the backlight that shows through the holes — BEHIND the board, so the
          holes are real holes and not painted dots (memory: a hole has to be a
          HOLE — draw the fill AROUND the opening) */}
      {lit > 0.01 && (
        <div style={{ position: "absolute", inset: -10, zIndex: 0,
          background: hexa("#EAF2FF", 0.9 * lit) }} />
      )}
      <svg viewBox="0 0 200 260" width={ww} height={hh}
        style={{ position: "absolute", left: 0, top: 0, zIndex: 1, overflow: "visible" }}>
        <defs>
          <mask id={`bh${z}${Math.round(x)}`}>
            <rect x={0} y={0} width={200} height={260} fill="#fff" />
            {Array.from({ length: 14 }, (_, i) => {
              const on = i < holes;
              if (!on) return null;
              const hx = 26 + ((i + seed) % 4) * 44 + rnd(i + seed * 5, 3) * 16;
              const hy = 34 + Math.floor(i / 4) * 54 + rnd(i + seed * 5, 7) * 20;
              const r = 7 + rnd(i + seed * 5, 11) * 6;
              return <circle key={i} cx={hx} cy={hy} r={r} fill="#000" />;
            })}
          </mask>
        </defs>
        <g mask={`url(#bh${z}${Math.round(x)})`}>
          {/* the board */}
          <rect x={0} y={0} width={200} height={260} rx={4} fill={board} />
          <rect x={0} y={0} width={200} height={9} fill={mxh(board, 0.26)} />
          <rect x={0} y={251} width={200} height={9} fill={dkh(board, 0.30)} />
          {/* the gilt double rule — the thing that makes it look expensive */}
          <rect x={12} y={12} width={176} height={236} fill="none" stroke={rule} strokeWidth={3} />
          <rect x={19} y={19} width={162} height={222} fill="none" stroke={hexa(rule, 0.55)} strokeWidth={1.5} />
          {/* ⭐ THE ONE MUTE-READABLE STRING IN THE HOOK. Every Claude Code user
              has been handed this word on work that was not finished, which is
              what makes it recognition rather than decoration (THE-OPEN law 3).
              It is stencilled INTO the board, at the size a case title is. */}
          {gold > 0.01 && (
            <text x={100} y={41} textAnchor="middle" fill={hexa("#F4E6C6", 0.94 * gold)}
              style={{ ...mono(30, 800), letterSpacing: 5 }}>{R.lie}</text>
          )}
          {/* the page block: ruled lines, drawn as real content, never as text */}
          {Array.from({ length: 9 }, (_, i) => (
            <rect key={i} x={32} y={62 + i * 15} rx={2}
              width={i === 8 ? 74 : 136 - (i % 3) * 18} height={7}
              fill={hexa(s < 0.5 ? "#E8DCC8" : "#B8C0C8", 0.30 + (i % 3) * 0.10)} />
          ))}
          {/* the steel banding of the rebuilt states */}
          {armour > 0.01 && (<>
            <rect x={-4} y={44} width={208} height={17} fill="#6E767E" opacity={armour} />
            <rect x={-4} y={44} width={208} height={5} fill="#98A0A8" opacity={armour} />
            <rect x={-4} y={192} width={208} height={17} fill="#6E767E" opacity={armour} />
            <rect x={-4} y={192} width={208} height={5} fill="#98A0A8" opacity={armour} />
            {[24, 176].map((bx, i) => (
              <g key={i} opacity={armour}>
                <rect x={bx - 8} y={40} width={16} height={174} fill="#5A6068" />
                <rect x={bx - 8} y={40} width={5} height={174} fill="#828A92" />
              </g>
            ))}
          </>)}
        </g>
        {/* ⭐ THE SEAL. This is the villain, and it is beautiful: a scalloped
            wax disc with a raised device and a pressed rim. It survives every
            attack until S12's first loop pass, where `crack` splits it. */}
        {gold > 0.01 && (
          <g opacity={gold} transform="translate(100,206)">
            {Array.from({ length: 18 }, (_, i) => {
              const a = (i / 18) * Math.PI * 2;
              return <circle key={i} cx={Math.cos(a) * 30} cy={Math.sin(a) * 30} r={7.5} fill="#C08A2E" />;
            })}
            <circle cx={0} cy={0} r={30} fill={GOLD} />
            <circle cx={0} cy={0} r={30} fill="none" stroke="#8E6218" strokeWidth={2.4} />
            <circle cx={0} cy={0} r={21} fill="none" stroke="#8E6218" strokeWidth={2} />
            <path d="M -11 1 L -3 10 L 12 -8" fill="none" stroke="#4A3208"
              strokeWidth={5.5} strokeLinecap="round" strokeLinejoin="round" />
            <circle cx={-9} cy={-11} r={7} fill={hexa("#FFF0C8", 0.5)} />
            {crack > 0.01 && (<>
              <path d="M -30 -8 L -8 2 L 4 -6 L 18 8 L 31 4" fill="none"
                stroke="#2A1C04" strokeWidth={3.4 * crack} strokeLinecap="round" />
              <path d="M -6 -28 L 0 -4 L -8 12 L 2 29" fill="none"
                stroke="#2A1C04" strokeWidth={2.8 * crack} strokeLinecap="round" />
            </>)}
          </g>
        )}
        {/* the green tick and the one word the lie says on its face */}
        {gold > 0.01 && (
          <g opacity={gold}>
            <rect x={36} y={190} width={44} height={44} rx={9} fill={GREEN} />
            <path d="M 46 212 L 55 222 L 71 200" fill="none" stroke="#04241C"
              strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" />
          </g>
        )}
        {/* the chamfer of the final plate — a structural feature, so the last
            state reads as MACHINED rather than as the same board repainted */}
        {s > 0.85 && (<>
          <path d="M 0 22 L 22 0 L 0 0 Z" fill="#98A6B2" />
          <path d="M 200 22 L 178 0 L 200 0 Z" fill="#98A6B2" />
          <path d="M 0 238 L 22 260 L 0 260 Z" fill="#2A323A" />
          <path d="M 200 238 L 178 260 L 200 260 Z" fill="#2A323A" />
          <rect x={0} y={0} width={200} height={7} fill="#B4C0CA" />
          <rect x={78} y={112} width={44} height={44} rx={7} fill="#8A98A4" />
          <rect x={86} y={120} width={28} height={28} rx={4} fill="#2A323A" />
        </>)}
      </svg>
      {/* the flags the prosecutor drives in — separate so they can be animated
          one at a time by the scene, each with its own strike */}
      {Array.from({ length: 14 }, (_, i) => {
        if (i >= flags) return null;
        const hx = (26 + ((i + seed) % 4) * 44 + rnd(i + seed * 5, 3) * 16) / 200 * ww;
        const hy = (34 + Math.floor(i / 4) * 54 + rnd(i + seed * 5, 7) * 20) / 260 * hh;
        return (
          <div key={"fl" + i} style={{ position: "absolute", left: hx - 3, top: hy - 40,
            width: 46, height: 46, zIndex: 3 }}>
            <svg viewBox="0 0 46 46" width={46} height={46} style={{ overflow: "visible" }}>
              <rect x={4} y={2} width={4} height={42} fill="#2C2A26" />
              <path d="M 8 4 L 38 12 L 8 22 Z" fill={RED} />
              <path d="M 8 4 L 38 12 L 8 13 Z" fill="#E06A56" />
            </svg>
          </div>
        );
      })}
    </div>
  );
};

/* =========================================================================
   THE POLYGRAPH — the hook's colossal object.  A drum recorder: the cylinder,
   the ribs, the paper running out of it with an ink trace already drawn, the
   pen arm, the needle, and a red lamp hood on top.

   ⭐ IT IS ALSO THE HIGHEST-VALUE MOTION SHAPE IN THE TABLE: the paper is a
   full-width high-contrast travelling band and the trace is real content
   arriving. The mechanism and the motion are the same object.
   ====================================================================== */
export const Polygraph: React.FC<{
  /** the BODY: base sits on `y`, drum near the top of `h` */
  x: number; y: number; h?: number; f: number; spin?: number; z?: number;
  /** the PAPER, in panel coords — deliberately explicit so it can run FULL
      BLEED across the frame without being tied to the body's own box */
  paperX: number; paperY: number; paperW: number; paperH?: number; penX: number;
  /** the needle as a FUNCTION OF FRAME, so the ink laid down at every point of
      the trace is the value the needle actually held when that paper passed
      under the pen. ⭐ The trace is then a real recording rather than a shape,
      and it SCROLLS, which is what makes it motion instead of a picture. */
  nAt: (g: number) => number;
  speed?: number; tear?: number; lamp?: number;
}> = ({ x, y, h: hh = 560, f, spin = 1, z = 40, paperX, paperY, paperW, paperH = 126,
        penX, nAt, speed = 9, tear = 0, lamp = 0 }) => {
  const ww = hh * 0.50;
  const L0 = x - ww / 2;
  const needle = nAt(f);
  const mid = paperH * 0.52;
  /* ⛔ THE INK STOPS AT THE PEN. Paper to the RIGHT of the nib has not been
     written on yet, so drawing a trace there would be a machine recording its
     own future — and it is also the blank feed that makes the pen's position
     legible at a glance. */
  const inked = penX - paperX;
  const pts: string[] = [];
  const N = 104;
  for (let i = 0; i <= N; i++) {
    const px = (i / N) * inked;
    const age = (inked - px) / speed;              /* frames since the pen wrote it */
    const nv = nAt(f - age);
    const amp = nv * (paperH * 0.36);
    const wob = Math.sin((px - f * speed) * 0.42) * amp;
    const peg = nv > 0.88 ? -paperH * 0.24 : 0;
    pts.push(`${px.toFixed(1)},${(mid + wob + peg).toFixed(1)}`);
  }
  /* the tear rides the paper, so it travels LEFT out of frame after it is cut */
  const tearX = inked - 26 - tear * speed * 22;
  return (<>
    {/* ⛔⛔ MOTION IS GREYSCALE, SO A LIGHT THING CROSSING A LIGHT WALL SCORES
        ~0 (reel 124). The paper needs a DARK value to travel against, so the
        recorder carries its own guide plate — which is what a real chart
        recorder has under its paper anyway. Swept area is only half of it; the
        other half is naming the VALUE the thing is read against. */}
    <div style={{ position: "absolute", left: paperX - 24, top: paperY - 22, width: paperW + 48,
      height: paperH + 46, zIndex: z + 1, background: "#12181E" }}>
      <div style={{ position: "absolute", left: 0, top: 0, width: "100%", height: 11,
        background: "#3E4954" }} />
      <div style={{ position: "absolute", left: 0, bottom: 0, width: "100%", height: 15,
        background: "#070B0F" }} />
    </div>
    {/* ⛔ A LIT RECTANGLE IN A DARK FRAME READS AS A SCREEN. The sheet curls up
        out of the drum on the left and over the plate's lip, and it carries
        sprocket holes and rules — three structural features that say PAPER. */}
    <div style={{ position: "absolute", left: paperX - 34, top: paperY - 30, width: 96,
      height: paperH + 40, zIndex: z + 3,
      background: `linear-gradient(96deg, ${dkh(PAPER, 0.16)} 0%, ${PAPER} 62%)`,
      clipPath: "polygon(38% 0%, 100% 8%, 100% 92%, 22% 100%, 0% 54%)" }} />
    {/* THE PAPER — a high-contrast band travelling out of the machine: the
        highest-value shape in the motion table, mounted as the thing the room
        actually contains rather than as a stripe generator. */}
    <div style={{ position: "absolute", left: paperX, top: paperY, width: paperW, height: paperH,
      zIndex: z + 2, background: PAPER, overflow: "hidden" }}>
      <svg viewBox={`0 0 ${paperW} ${paperH}`} width={paperW} height={paperH}
        style={{ position: "absolute", left: 0, top: 0 }}>
        {Array.from({ length: 9 }, (_, i) => (
          <rect key={i} x={0} y={12 + i * 12} width={paperW} height={1.2} fill={hexa("#8C8578", 0.26)} />
        ))}
        {/* ⭐⭐⭐ THE VERTICAL TIME GRID IS WHAT MAKES THE SCROLL *MEASURE*.
            `motion ~= (fraction of panel repainted per 0.1s) x (luma delta)`, and
            a UNIFORM field translating repaints NOTHING — only its edges change.
            Horizontal rules moving horizontally are invisible to that. Vertical
            rules crossing the panel at 9px/frame are a real luma delta over the
            whole band, and a time grid is exactly what chart paper carries. */}
        {Array.from({ length: Math.ceil(paperW / 46) + 2 }, (_, i) => {
          const gx = ((i * 92 - f * speed) % (paperW + 92) + paperW + 92) % (paperW + 92) - 92;
          return (<g key={"vg" + i}>
            {/* ⛔ A HAIRLINE MOVING IS NOT A BAND MOVING. Thin rules shifted 27px
                per 0.1s sample repaint ~7% of the band at ~30 luma and the hook
                measured 4.84 with the busiest picture in the reel. A chart's
                alternating minute BLOCKS are 46px of real tone, so the same
                shift repaints ~60% of the band — and it is what chart paper
                actually looks like. */}
            <rect x={gx} y={0} width={46} height={paperH} fill={hexa("#6E6656", 0.10)} />
            <rect x={gx} y={0} width={2.4} height={paperH} fill={hexa("#5E5648", 0.26)} />
            <rect x={gx + 46} y={0} width={1.4} height={paperH} fill={hexa("#7A7264", 0.16)} />
          </g>);
        })}
        {/* the sprocket edge SCROLLS — structure that also carries the motion */}
        {Array.from({ length: Math.ceil(paperW / 34) + 2 }, (_, i) => (
          <rect key={"s" + i} x={((i * 34 - f * speed) % (paperW + 34) + paperW + 34) % (paperW + 34) - 34}
            y={paperH - 12} width={13} height={7} rx={2} fill={hexa("#9A9184", 0.48)} />
        ))}
        {/* ⛔ AND THE TRACE HAS TO OUT-RANK THE GRID. At 0.52 the block rules
            were the loudest thing on the paper and the ink — the ONE line the
            whole hook exists to show — got lost in them. The grid dropped to a
            sixth of its contrast and the trace went to 10px black. */}
        <polyline points={pts.join(" ")} fill="none" stroke="#0E0C0A" strokeWidth={10}
          strokeLinejoin="round" strokeLinecap="round" />
        {/* ⭐ THE TEAR TRAVELS WITH THE PAPER. A 300px change of SHAPE is worth
            more than any amount of needle wobble, and it is what makes the
            arrival COST something rather than merely arrive. */}
        {/* ⛔ A RIP IS A SEPARATION, NOT A LINE. The two halves part by up to
            18px, so the guide plate shows THROUGH the sheet — which is why it
            reads as torn rather than as drawn on. */}
        {tear > 0.01 && tearX > -70 && (<>
          <path d={`M ${tearX} -10 l 20 22 l -16 20 l 22 22 l -18 20 l 20 22 l -14 20 l 16 20`}
            fill="none" stroke="#12181E" strokeWidth={9 + tear * 16} strokeLinejoin="round" />
          <path d={`M ${tearX} -10 l 20 22 l -16 20 l 22 22 l -18 20 l 20 22 l -14 20 l 16 20`}
            fill="none" stroke={hexa("#05070B", 0.9)} strokeWidth={5} strokeLinejoin="round" />
        </>)}
      </svg>
    </div>

    {/* ⭐⭐ THE PEN CARRIAGE — a hero object, not a detail. It sits at the NEW
        end of the paper, so the eye finishes reading the trace exactly where the
        thing drawing it is, and the RED STOP above the pivot says where this is
        going before it gets there (§25: anticipation is a promised event whose
        resolution is withheld). */}
    {/* ⛔ THE POST SITS **BEHIND** THE PAPER. Drawn in front it cut a 34px dark
        stripe down the cream band, which is exactly the severing that makes a
        plate measure far below its own area. */}
    <div style={{ position: "absolute", left: penX - 176, top: paperY + mid - 132, width: 250,
      height: 264, zIndex: z }}>
      <svg viewBox="0 0 250 264" width={250} height={264} style={{ overflow: "visible" }}>
        <rect x={162} y={124} width={34} height={150} fill="#2A323A" />
        <rect x={162} y={124} width={10} height={150} fill="#454F59" />
      </svg>
    </div>
    <div style={{ position: "absolute", left: penX - 176, top: paperY + mid - 132, width: 250,
      height: 264, zIndex: z + 4 }}>
      <svg viewBox="0 0 250 264" width={250} height={264} style={{ overflow: "visible" }}>
        {/* ⛔ THE SCALE IS DRAWN FROM COMPUTED POINTS, NOT FROM AN ARC FLAG.
            v1 put the red stop on the FIRST third of the sweep — i.e. the needle
            passed through the danger zone on its way to safety, which is the
            opposite of what the shot is promising. The red is the LAST 28% of
            the travel, at the top, where the needle is heading. */}
        {(() => {
          const P = (t: number) => {
            const th = (180 + t * 40) * Math.PI / 180;
            return [176 + Math.cos(th) * 96, 132 + Math.sin(th) * 96];
          };
          const pl = (a: number, b: number) => Array.from({ length: 13 }, (_, i) => {
            const [px, py] = P(a + (b - a) * (i / 12)); return `${px.toFixed(1)},${py.toFixed(1)}`;
          }).join(" ");
          return (<>
            <polyline points={pl(0, 0.72)} fill="none" stroke="#4A545E" strokeWidth={10} strokeLinecap="round" />
            <polyline points={pl(0.72, 1)} fill="none" stroke="#B4342A" strokeWidth={15} strokeLinecap="round" />
            {Array.from({ length: 7 }, (_, i) => {
              const th = (180 + (i / 6) * 40) * Math.PI / 180;
              return <line key={i} x1={176 + Math.cos(th) * 82} y1={132 + Math.sin(th) * 82}
                x2={176 + Math.cos(th) * 96} y2={132 + Math.sin(th) * 96}
                stroke="#78848F" strokeWidth={3} />;
            })}
          </>);
        })()}
        {/* ⛔ AND THE ARM GOES **UP** TOWARD THE STOP. `rotate(180 - n*64)` sends
            the tip DOWN in SVG's y-down space; the sign was inverted for a whole
            round and the needle read as falling while the trace read as rising. */}
        <g transform={`translate(176,132) rotate(${180 + needle * 40})`}>
          <rect x={-16} y={-9} width={122} height={18} rx={8} fill="#59636D" />
          <rect x={-16} y={-9} width={122} height={5} rx={2} fill="#A0ACB8" />
          <path d="M 98 -15 L 126 0 L 98 15 Z" fill="#141210" />
          <circle cx={0} cy={0} r={23} fill="#39434D" />
          <circle cx={0} cy={0} r={8} fill="#0B0E13" />
        </g>
      </svg>
    </div>

    {/* THE BODY — drum, column, base, lamp */}
    <div style={{ position: "absolute", left: L0, top: y - hh, width: ww, height: hh, zIndex: z }}>
      <svg viewBox="0 0 200 380" width={ww} height={hh}
        style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}>
        <path d="M 18 350 L 182 350 L 200 380 L 0 380 Z" fill="#0B0E13" />
        <rect x={42} y={252} width={116} height={100} fill="#1E262E" />
        <rect x={42} y={252} width={116} height={8} fill="#38424C" />
        {[62, 138].map((cx, i) => (
          <circle key={i} cx={cx} cy={296} r={13} fill="#0F1419" />
        ))}
        <rect x={74} y={166} width={52} height={90} fill="#242C34" />
        <rect x={74} y={166} width={14} height={90} fill="#39434D" />
        {/* THE DRUM — five wide bands with lit leading edges read as a cylinder
            turning; eleven thin ribs read as fan blades. */}
        <ellipse cx={100} cy={68} rx={94} ry={27} fill="#3E4954" />
        <rect x={6} y={68} width={188} height={94} fill="#232B33" />
        <ellipse cx={100} cy={162} rx={94} ry={27} fill="#171D24" />
        {Array.from({ length: 5 }, (_, i) => {
          const a = ((i / 5) + (f * 0.013 * spin)) % 1;
          const px = 6 + a * 188;
          const near = Math.sin(a * Math.PI);
          return (<g key={i}>
            <rect x={px} y={68} width={19} height={94} fill={hexa("#7E8C99", 0.10 + near * 0.30)} />
            <rect x={px} y={68} width={4} height={94} fill={hexa("#C4D0DA", 0.20 + near * 0.62)} />
          </g>);
        })}
        <ellipse cx={100} cy={68} rx={94} ry={27} fill="none" stroke="#080C10" strokeWidth={3.6} />
        <ellipse cx={100} cy={68} rx={36} ry={12} fill="#080C10" />
        <ellipse cx={100} cy={68} rx={36} ry={12} fill="none" stroke="#66727E" strokeWidth={2.6} />
        {/* ⛔ THE LAMP IS A LAMP, NOT A FUNNEL. v1 drew a trapezoid straight on
            top of the drum and it read as a chimney. */}
        <rect x={96} y={-4} width={8} height={24} fill="#2A323A" />
        <path d="M 64 40 L 136 40 L 120 20 L 80 20 Z" fill="#20272E" />
        <path d="M 64 40 L 136 40 L 132 46 L 68 46 Z" fill="#39434D" />
        <ellipse cx={100} cy={48} rx={19} ry={9}
          fill={lamp > 0.01 ? hexa("#FF5A46", 0.30 + lamp * 0.70) : "#4A545E"} />
      </svg>
    </div>

    {/* the lamp's SHAPED CONE — never a full-frame fill (THE-OPEN, reel 78) */}
    {lamp > 0.01 && (
      <div style={{ position: "absolute", left: x - ww * 1.15, top: y - hh + 46, width: ww * 2.3,
        height: hh * 0.90, zIndex: z - 2, opacity: 0.30 * lamp,
        clipPath: "polygon(45% 0%, 55% 0%, 100% 100%, 0% 100%)",
        background: `linear-gradient(180deg, ${hexa("#FF6A50", 0.9)} 0%, ${hexa("#FF6A50", 0)} 100%)` }} />
    )}
  </>);
};

/** the oak witness box the hero stands in — a manufactured face, so divs */
export const WitnessBox: React.FC<{ x: number; y: number; w?: number; h?: number; z?: number }> =
  ({ x, y, w: ww = 300, h: hh = 210, z = 62 }) => (
  <div style={{ position: "absolute", left: x - ww / 2, top: y - hh, width: ww, height: hh, zIndex: z }}>
    <div style={{ position: "absolute", left: 0, top: 26, width: ww, height: hh - 26,
      background: `linear-gradient(178deg, #7A5230 0%, #4E3218 100%)`, boxShadow: SH_D }} />
    <div style={{ position: "absolute", left: 0, top: 26, width: ww, height: 10, background: "#9C6C40" }} />
    {[0, 1, 2].map(i => (
      <div key={i} style={{ position: "absolute", left: 18 + i * (ww - 36) / 3, top: 54,
        width: (ww - 36) / 3 - 14, height: hh - 96, background: "#5E3C1E",
        border: "3px solid #8A5E34" }} />
    ))}
    {/* the brass rail across the top — one bright horizontal that makes the box
        read as a BOX rather than a panel */}
    <div style={{ position: "absolute", left: -12, top: 0, width: ww + 24, height: 15,
      borderRadius: 7, background: `linear-gradient(180deg, #F0CE86 0%, #A57A32 100%)` }} />
    {[26, ww - 26].map((px, i) => (
      <div key={"p" + i} style={{ position: "absolute", left: px - 6, top: 8, width: 12, height: 30,
        background: "#A57A32" }} />
    ))}
  </div>
);

/* =========================================================================
   THE ACCURACY DIAL — 410px of brass. `CATEGORY IS STRUCTURE, NOT HUE`: what
   makes a thing read as a GAUGE is a bezel, a graduated arc, a segment ring, a
   hub, a stamped face and a counterweighted needle. All six are drawn.
   ⛔ THE NEEDLE RIDES A LINEAR RAMP, never the ease of the thing it counts —
   an IO cubic is 0.61 a third of the way in and a readout wired to it lies.
   ====================================================================== */
export const AccuracyDial: React.FC<{
  x: number; y: number; d?: number; k: number; z?: number; f?: number;
}> = ({ x, y, d = 410, k, z = 56, f = 0 }) => {
  const seg = 12;
  const lit = Math.floor(k * seg + 0.001);
  const ang = -128 + k * 256;
  return (
    <div style={{ position: "absolute", left: x - d / 2, top: y - d / 2, width: d, height: d, zIndex: z }}>
      <svg viewBox="0 0 200 200" width={d} height={d} style={{ overflow: "visible" }}>
        <circle cx={100} cy={100} r={96} fill="#6E4E1C" />
        <circle cx={100} cy={100} r={96} fill="none" stroke="#3A2808" strokeWidth={5} />
        <circle cx={100} cy={100} r={86} fill={BRASS} />
        <circle cx={100} cy={100} r={78} fill="#F2EADA" />
        {/* the segment ring — the percentage as SEGMENTS, per the translation
            table: ten segments, four lit, no numeral needed to read it */}
        {Array.from({ length: seg }, (_, i) => {
          const a0 = (-128 + (i / seg) * 256) * Math.PI / 180;
          const a1 = (-128 + ((i + 0.72) / seg) * 256) * Math.PI / 180;
          const rr = 70, ri = 56;
          const p = (a: number, r: number) => `${100 + Math.sin(a) * r},${100 - Math.cos(a) * r}`;
          return (
            <path key={i} d={`M ${p(a0, ri)} L ${p(a0, rr)} A ${rr} ${rr} 0 0 1 ${p(a1, rr)} L ${p(a1, ri)} Z`}
              fill={i < lit ? (i > seg * 0.72 ? GREEN : SODIUM) : "#D8D0BE"} />
          );
        })}
        {/* graduations — inboard of the segment ring so nothing crosses the
            readout window */}
        {Array.from({ length: 25 }, (_, i) => {
          const a = (-128 + (i / 24) * 256) * Math.PI / 180;
          const big = i % 4 === 0;
          const r0 = big ? 34 : 40, r1 = 50;
          return <line key={i} x1={100 + Math.sin(a) * r0} y1={100 - Math.cos(a) * r0}
            x2={100 + Math.sin(a) * r1} y2={100 - Math.cos(a) * r1}
            stroke="#3A3226" strokeWidth={big ? 3 : 1.5} />;
        })}
        {/* ⭐ THE STAMPED FACE IS FREE REAL ESTATE FOR THE ONE SPOKEN NUMBER — a
            dial number lives in a dial, which is why this is not "text".
            ⛔ BUT IT NEEDS ITS OWN WINDOW. v1 set it straight on the face and the
            graduations and the needle crossed it: 73 rendered as an unreadable
            tangle. It now sits in a recessed cream plate nothing else enters. */}
        <rect x={62} y={108} width={76} height={40} rx={5} fill="#241F16" />
        <rect x={65} y={111} width={70} height={34} rx={4} fill="#EFE8D6" />
        <text x={100} y={139} textAnchor="middle" fill="#241F16"
          style={{ ...mono(30, 800) }}>{Math.round(k * R.accuracy)}%</text>
        <text x={100} y={166} textAnchor="middle" fill="#7A6E56"
          style={{ ...mono(10, 700), letterSpacing: 3 }}>ACCURACY</text>
        {/* the needle, counterweighted, with a real hub. Shorter than the
            segment ring's inner edge so it never crosses the window. */}
        <g transform={`translate(100,100) rotate(${ang})`}>
          <path d="M -3.6 6 L 3.6 6 L 1.6 -66 L -1.6 -66 Z" fill="#B4342A" />
          <circle cx={0} cy={16} r={8} fill="#7A2018" />
        </g>
        <circle cx={100} cy={100} r={11} fill="#3A2808" />
        <circle cx={100} cy={100} r={5} fill={BRASS} />
        <circle cx={82} cy={74} r={16} fill={hexa("#FFF8E0", 0.16)} />
      </svg>
    </div>
  );
};

/** the brass minute timer — a flag drops, one hand sweeps one revolution */
export const MinuteTimer: React.FC<{ x: number; y: number; d?: number; k: number; flag: number; z?: number }> =
  ({ x, y, d = 250, k, flag, z = 58 }) => (
  <div style={{ position: "absolute", left: x - d / 2, top: y - d / 2, width: d, height: d, zIndex: z }}>
    <svg viewBox="0 0 200 200" width={d} height={d} style={{ overflow: "visible" }}>
      <rect x={78} y={168} width={44} height={40} fill="#4E3A16" />
      <circle cx={100} cy={100} r={92} fill="#5E4414" />
      <circle cx={100} cy={100} r={84} fill={BRASS} />
      <circle cx={100} cy={100} r={74} fill="#1C2018" />
      {Array.from({ length: 12 }, (_, i) => {
        const a = (i / 12) * Math.PI * 2;
        return <rect key={i} x={99} y={30} width={2.4} height={11} fill="#C8BFA4"
          transform={`rotate(${(i / 12) * 360} 100 100)`} />;
      })}
      <text x={100} y={150} textAnchor="middle" fill={SODIUM}
        style={{ ...mono(17, 800), letterSpacing: 2 }}>{R.setup}</text>
      <g transform={`translate(100,100) rotate(${k * 360})`}>
        <path d="M -2.6 6 L 2.6 6 L 1.2 -64 L -1.2 -64 Z" fill={SODIUM} />
      </g>
      <circle cx={100} cy={100} r={7} fill={BRASS} />
      {/* the throat the token drops into, and the flag that falls when it lands */}
      <rect x={150} y={54} width={30} height={12} rx={5} fill="#2A2418" />
      <g transform={`translate(165,48) rotate(${flag * 86})`} style={{ transformOrigin: "0 0" }}>
        <rect x={-3} y={-40} width={6} height={42} fill="#7A6A44" />
        <path d="M 3 -40 L 34 -32 L 3 -22 Z" fill={GREEN} />
      </g>
    </svg>
  </div>
);

/** a roller shutter door. `k` 0 shut, 1 fully up. The opening behind it is a
    PLACE (children), never a tan rectangle — reel 131 learned that one. */
export const RollerDoor: React.FC<{
  x: number; y: number; w?: number; h?: number; k: number; z?: number; c?: string;
  children?: React.ReactNode;
}> = ({ x, y, w: ww = 250, h: hh = 330, k, z = 30, c = "#8A9099", children }) => (
  <div style={{ position: "absolute", left: x - ww / 2, top: y - hh, width: ww, height: hh, zIndex: z }}>
    <div style={{ position: "absolute", left: -14, top: -16, width: ww + 28, height: hh + 16,
      background: "#2A3038" }} />
    <div style={{ position: "absolute", left: 0, top: 0, width: ww, height: hh, overflow: "hidden",
      background: "#0A0E12" }}>
      {children}
    </div>
    {/* the shutter itself — slats, so it reads as a shutter and not a lid */}
    <div style={{ position: "absolute", left: 0, top: 0, width: ww, height: hh * (1 - k),
      overflow: "hidden", background: c }}>
      {Array.from({ length: 16 }, (_, i) => (
        <div key={i} style={{ position: "absolute", left: 0, top: i * 22, width: ww, height: 22,
          borderBottom: `3px solid ${dkh(c, 0.34)}`,
          background: `linear-gradient(180deg, ${mxh(c, 0.20)} 0%, ${dkh(c, 0.12)} 100%)` }} />
      ))}
    </div>
    <div style={{ position: "absolute", left: -6, top: hh * (1 - k) - 9, width: ww + 12, height: 12,
      background: "#39424C" }} />
  </div>
);

/* --- the three goods. THREE DIFFERENT MACHINES FINISHING THREE DIFFERENT
   JOBS. A door that opens on a box carries one bit; a door that opens on a job
   being finished is a depiction (§3). ------------------------------------- */
export const AppShell: React.FC<{ x: number; y: number; f: number; k: number; z?: number; s?: number }> =
  ({ x, y, f, k, z = 44, s = 1 }) => {
  const rows = Math.min(6, Math.floor(k * 7));
  return (
    <div style={{ position: "absolute", left: x - 92 * s, top: y - 300 * s, width: 184 * s,
      height: 300 * s, zIndex: z }}>
      <div style={{ position: "absolute", inset: 0, borderRadius: 22 * s, background: "#1C222A",
        border: `${5 * s}px solid #39434D`, boxShadow: SH_D }} />
      <div style={{ position: "absolute", left: 14 * s, top: 22 * s, width: 156 * s, height: 256 * s,
        borderRadius: 10 * s, background: "#F4F1E8", overflow: "hidden" }}>
        <div style={{ position: "absolute", left: 0, top: 0, width: "100%", height: 30 * s, background: CLAY }} />
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} style={{ position: "absolute", left: 12 * s, top: (42 + i * 36) * s,
            width: (i < rows ? 132 : 0) * s, height: 26 * s, borderRadius: 5 * s,
            background: i % 2 ? "#DCE6DE" : "#E8E2D4", transition: "none" }}>
            <div style={{ position: "absolute", left: 5 * s, top: 5 * s, width: 16 * s, height: 16 * s,
              borderRadius: 4 * s, background: i % 3 === 0 ? GREEN : i % 3 === 1 ? SODIUM : TEAL }} />
          </div>
        ))}
      </div>
    </div>
  );
};

export const PageSlab: React.FC<{ x: number; y: number; f: number; k: number; z?: number; s?: number }> =
  ({ x, y, f, k, z = 44, s = 1 }) => {
  const p = (i: number) => Math.max(0, Math.min(1, k * 4 - i));
  return (
    <div style={{ position: "absolute", left: x - 150 * s, top: y - 230 * s, width: 300 * s,
      height: 230 * s, zIndex: z }}>
      <div style={{ position: "absolute", inset: 0, background: "#F6F3EC", boxShadow: SH_D }} />
      <div style={{ position: "absolute", left: 0, top: 0, width: "100%", height: 22 * s,
        background: "#2A3038", opacity: p(0) }} />
      <div style={{ position: "absolute", left: 0, top: 22 * s, width: "100%", height: 92 * s,
        opacity: p(1), background: `linear-gradient(120deg, ${INDIGO} 0%, ${VIOLET} 100%)` }}>
        <div style={{ position: "absolute", left: 18 * s, top: 24 * s, width: 150 * s, height: 16 * s,
          borderRadius: 3, background: hexa("#FFFFFF", 0.86) }} />
        <div style={{ position: "absolute", left: 18 * s, top: 48 * s, width: 96 * s, height: 10 * s,
          borderRadius: 3, background: hexa("#FFFFFF", 0.52) }} />
        <div style={{ position: "absolute", left: 18 * s, top: 66 * s, width: 74 * s, height: 22 * s,
          borderRadius: 5, background: EMBER }} />
      </div>
      {[0, 1, 2].map(i => (
        <div key={i} style={{ position: "absolute", left: (14 + i * 96) * s, top: 128 * s,
          width: 80 * s, height: 84 * s, background: "#EAE5D8", opacity: p(2 + i * 0.34) }}>
          <div style={{ position: "absolute", left: 10 * s, top: 10 * s, width: 26 * s, height: 26 * s,
            borderRadius: 7 * s, background: [TEAL, SODIUM, "#D96A88"][i] }} />
          <div style={{ position: "absolute", left: 10 * s, top: 46 * s, width: 58 * s, height: 8 * s, background: "#C8C2B2" }} />
          <div style={{ position: "absolute", left: 10 * s, top: 60 * s, width: 40 * s, height: 8 * s, background: "#D4CEC0" }} />
        </div>
      ))}
    </div>
  );
};

export const BenchTool: React.FC<{ x: number; y: number; f: number; k: number; z?: number; s?: number }> =
  ({ x, y, f, k, z = 44, s = 1 }) => (
  <div style={{ position: "absolute", left: x - 130 * s, top: y - 210 * s, width: 260 * s,
    height: 210 * s, zIndex: z }}>
    <svg viewBox="0 0 260 210" width={260 * s} height={210 * s} style={{ overflow: "visible" }}>
      <rect x={10} y={168} width={240} height={30} rx={4} fill="#3A2E20" />
      <rect x={10} y={168} width={240} height={7} fill="#5E4A32" />
      <rect x={34} y={54} width={44} height={116} fill="#4A545E" />
      <rect x={34} y={54} width={13} height={116} fill="#6E7A86" />
      <rect x={26} y={30} width={200} height={30} rx={6} fill="#59636D" />
      <rect x={26} y={30} width={200} height={8} rx={4} fill="#8C98A4" />
      {/* the spindle actually turns, and a real part is being cut */}
      <g transform={`translate(150,120) rotate(${f * 9 * k})`}>
        <circle cx={0} cy={0} r={40} fill="#2A323A" />
        {Array.from({ length: 6 }, (_, i) => (
          <rect key={i} x={-4} y={-40} width={8} height={22} fill="#98A4B0"
            transform={`rotate(${i * 60})`} />
        ))}
        <circle cx={0} cy={0} r={12} fill={SODIUM} />
      </g>
      <rect x={196} y={104} width={44} height={44} fill={COPPER} opacity={k} />
      <rect x={196} y={104} width={44} height={11} fill={mxh(COPPER, 0.3)} opacity={k} />
      {Array.from({ length: 5 }, (_, i) => (
        <circle key={i} cx={168 + i * 7} cy={100 - i * 9 - k * 20} r={3.4 - i * 0.4}
          fill={hexa(SODIUM, 0.8 - i * 0.14)} opacity={k} />
      ))}
    </svg>
  </div>
);

/** the seal press that strikes a mark into brass. `drop` 0 up, 1 struck. */
export const SealPress: React.FC<{
  x: number; y: number; f: number; drop: number; struck: number; z?: number; s?: number;
  children?: React.ReactNode;
}> = ({ x, y, f, drop, struck, z = 52, s = 1, children }) => (
  <div style={{ position: "absolute", left: x - 190 * s, top: y - 470 * s, width: 380 * s,
    height: 470 * s, zIndex: z }}>
    {/* the frame — two uprights and a crown, so the ram reads as GUIDED */}
    {/* ⛔ VALUE SEPARATION: the frame was #3A2E1E on a #4E2018 floor — one stop
        apart, so a 470px machine vanished into its own room. Brass uprights with
        a lit leading edge put it two full stops above the wall behind it. */}
    <div style={{ position: "absolute", left: 0, top: 0, width: 52 * s, height: 470 * s,
      background: `linear-gradient(90deg, #E0BE7E 0%, #7A5A22 100%)` }} />
    <div style={{ position: "absolute", left: 328 * s, top: 0, width: 52 * s, height: 470 * s,
      background: `linear-gradient(90deg, #7A5A22 0%, #E0BE7E 100%)` }} />
    <div style={{ position: "absolute", left: 0, top: 0, width: 380 * s, height: 62 * s,
      background: `linear-gradient(180deg, #7A5E2E 0%, #4A3818 100%)` }} />
    {/* the ram */}
    <div style={{ position: "absolute", left: 96 * s, top: (56 + drop * 214) * s, width: 188 * s,
      height: 150 * s, background: `linear-gradient(180deg, #C9A15A 0%, #7A5A22 100%)`, boxShadow: SH_D }}>
      <div style={{ position: "absolute", left: 0, top: 0, width: "100%", height: 12 * s, background: "#E4C486" }} />
      <div style={{ position: "absolute", left: 30 * s, top: 118 * s, width: 128 * s, height: 30 * s,
        background: "#5E4414" }} />
    </div>
    {/* the anvil the brass plate sits on */}
    <div style={{ position: "absolute", left: 60 * s, top: 396 * s, width: 260 * s, height: 74 * s,
      background: "#241C12" }} />
    <div style={{ position: "absolute", left: 60 * s, top: 396 * s, width: 260 * s, height: 9 * s,
      background: "#4A3A24" }} />
    <div style={{ position: "absolute", left: 92 * s, top: (372 - struck * 6) * s, width: 196 * s,
      height: 34 * s, zIndex: 3, background: `linear-gradient(180deg, #E0BE7E 0%, #A5802E 100%)` }} />
    {children}
  </div>
);

/* =========================================================================
   THE LOOP RAIL — planted at S5 and paid off at S12. A great circular rail
   with a carriage on it that carries the brief down into the pit and back up.
   ⭐ It is one drawn object, and the carriage's position is a single parameter,
   so the "loop" is literally a loop in the code as well as in the picture.
   ====================================================================== */
export const LoopRail: React.FC<{
  cx: number; cy: number; r?: number; k: number; z?: number; c?: string;
  pass?: string; children?: React.ReactNode;
}> = ({ cx, cy, r = 250, k, z = 34, c = "#5A6672", pass, children }) => {
  const a = k * Math.PI * 2 - Math.PI / 2;
  const px = cx + Math.cos(a) * r, py = cy + Math.sin(a) * r * 0.46;
  return (<>
    <div style={{ position: "absolute", left: cx - r - 16, top: cy - r * 0.46 - 16,
      width: (r + 16) * 2, height: (r * 0.46 + 16) * 2, zIndex: z }}>
      <svg viewBox={`0 0 ${(r + 16) * 2} ${(r * 0.46 + 16) * 2}`} width={(r + 16) * 2}
        height={(r * 0.46 + 16) * 2} style={{ overflow: "visible" }}>
        {/* ⛔ A WIRE HOOP IS NOT A RAIL. v1 drew a 13px stroke and it read as a
            thin grey wire on the contact sheet — a rail has a WEB, a lit top
            flange and sleepers, and at 26px it is also wide enough to survive
            the audit's 1012->240 downsample. */}
        <ellipse cx={r + 16} cy={r * 0.46 + 16} rx={r} ry={r * 0.46} fill="none"
          stroke={dkh(c, 0.42)} strokeWidth={30} />
        <ellipse cx={r + 16} cy={r * 0.46 + 16} rx={r} ry={r * 0.46} fill="none"
          stroke={mxh(c, 0.30)} strokeWidth={9} />
        {Array.from({ length: 22 }, (_, i) => {
          const th = (i / 22) * Math.PI * 2;
          return <rect key={"sl" + i} x={r + 16 + Math.cos(th) * r - 7}
            y={r * 0.46 + 16 + Math.sin(th) * r * 0.46 - 4} width={14} height={9} rx={2}
            fill={dkh(c, 0.60)} />;
        })}
        {/* hangers up to the roof, so the rail is CARRIED and not floating */}
        {[-0.82, -0.36, 0.36, 0.82].map((t, i) => (
          <line key={i} x1={r + 16 + t * r} y1={r * 0.46 + 16 - Math.sqrt(Math.max(0, 1 - t * t)) * r * 0.46}
            x2={r + 16 + t * r} y2={-120} stroke={dkh(c, 0.42)} strokeWidth={7} />
        ))}
      </svg>
    </div>
    {/* the carriage */}
    <div style={{ position: "absolute", left: px - 68, top: py - 44, width: 136, height: 94, zIndex: z + 2 }}>
      <svg viewBox="0 0 136 94" width={136} height={94} style={{ overflow: "visible" }}>
        <rect x={6} y={16} width={124} height={52} rx={8} fill="#39434D" />
        <rect x={6} y={16} width={124} height={12} rx={6} fill="#8A96A2" />
        <circle cx={34} cy={12} r={15} fill="#98A4B0" />
        <circle cx={102} cy={12} r={15} fill="#98A4B0" />
        <circle cx={34} cy={12} r={6} fill="#1A2026" />
        <circle cx={102} cy={12} r={6} fill="#1A2026" />
        <rect x={62} y={66} width={12} height={30} fill="#2A323A" />
        {pass && (
          <text x={68} y={56} textAnchor="middle" fill={SODIUM}
            style={{ ...mono(24, 800), letterSpacing: 2 }}>{pass}</text>
        )}
      </svg>
    </div>
    <div style={{ position: "absolute", left: px, top: py, width: 0, height: 0, zIndex: z + 1 }}>
      {children}
    </div>
  </>);
};

/** the three-rung prompt rack. Rung 3 is the only hot one — and the rungs carry
    NO TEXT: the HOW is gated, so what is shown is a position, not a prompt. */
export const PromptRack: React.FC<{
  x: number; y: number; w?: number; z?: number; seat: number; bow: number; lit: number;
}> = ({ x, y, w: ww = 420, z = 46, seat, bow, lit }) => (
  <div style={{ position: "absolute", left: x - ww / 2, top: y - 320, width: ww, height: 320, zIndex: z }}>
    {/* two cast uprights */}
    {[0, ww - 34].map((px, i) => (
      <div key={i} style={{ position: "absolute", left: px, top: 0, width: 34, height: 320,
        background: `linear-gradient(90deg, #2E3A42 0%, #18222A 100%)` }} />
    ))}
    {[0, 1, 2].map(i => {
      const hot = i === 2;
      const on = hot ? lit : 0;
      const dy = hot ? (1 - seat) * -150 : 0;
      const bw = hot ? bow * 12 : 0;
      return (
        <div key={"r" + i} style={{ position: "absolute", left: 20, top: 44 + i * 86 + dy,
          width: ww - 40, height: 52,
          transform: `translateY(${bw}px) scaleY(${1 - bw * 0.02})`, opacity: hot ? (seat > 0.01 ? 1 : 0) : 1 }}>
          <div style={{ position: "absolute", inset: 0, borderRadius: 5,
            background: hot
              ? `linear-gradient(180deg, ${mxh(SODIUM, 0.34 * on)} 0%, ${dkh("#8A5A18", 0.10)} 100%)`
              : `linear-gradient(180deg, #6E767E 0%, #454D55 100%)` }} />
          <div style={{ position: "absolute", left: 0, top: 0, width: "100%", height: 9,
            background: hot ? mxh(SODIUM, 0.55) : "#98A0A8" }} />
          {/* the rung's own ribs — three notches, so an empty rung still reads */}
          {[0.18, 0.5, 0.82].map((t, j) => (
            <div key={j} style={{ position: "absolute", left: (ww - 40) * t - 7, top: 12, width: 14,
              height: 28, borderRadius: 3, background: hot ? hexa("#4A3208", 0.45) : "#343C44" }} />
          ))}
          {hot && on > 0.01 && (
            <div style={{ position: "absolute", left: -10, top: -8, width: ww - 20, height: 68,
              background: hexa(SODIUM, 0.18 * on) }} />
          )}
        </div>
      );
    })}
    {/* the counter down the side: 1 2 3, the only numerals here and they are a
        POSITION, which is exactly what the VO says */}
    {[0, 1, 2].map(i => (
      <div key={"n" + i} style={{ position: "absolute", left: -38, top: 56 + i * 86, width: 30,
        textAlign: "right", color: i === 2 ? SODIUM : "#5E666E", ...mono(26, 800) }}>{i + 1}</div>
    ))}
  </div>
);

/** a lit alcove with a plinth and a 17px stencil — the size a role plate is */
export const Alcove: React.FC<{
  x: number; y: number; w?: number; h?: number; z?: number; c: string; on: number; t: string;
  children?: React.ReactNode;
}> = ({ x, y, w: ww = 250, h: hh = 400, z = 22, c, on, t, children }) => (
  <div style={{ position: "absolute", left: x - ww / 2, top: y - hh, width: ww, height: hh, zIndex: z }}>
    <div style={{ position: "absolute", inset: 0, borderRadius: `${ww / 2}px ${ww / 2}px 0 0`,
      background: `linear-gradient(180deg, ${dkh(c, 0.62)} 0%, ${dkh(c, 0.34)} 100%)` }} />
    <div style={{ position: "absolute", left: 12, top: 12, right: 12, bottom: 0,
      borderRadius: `${ww / 2}px ${ww / 2}px 0 0`,
      background: `linear-gradient(180deg, ${mxh(c, 0.10 + on * 0.42)} 0%, ${dkh(c, 0.50 - on * 0.30)} 100%)` }} />
    {on > 0.01 && (
      <div style={{ position: "absolute", left: ww * 0.14, top: -18, width: ww * 0.72, height: 26,
        borderRadius: 12, background: mxh(c, 0.55), opacity: on }} />
    )}
    {children}
    <div style={{ position: "absolute", left: ww * 0.18, bottom: -26, width: ww * 0.64, height: 26,
      background: "#1E1A16", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <span style={{ color: on > 0.4 ? c : "#5E5A52", ...mono(13, 800), letterSpacing: 3 }}>{t}</span>
    </div>
  </div>
);

/** the backlit evidence board. Its light GROWS as the brief is emptied. */
export const EvidenceBoard: React.FC<{
  x: number; y: number; w?: number; h?: number; z?: number; glow: number; f: number;
  children?: React.ReactNode;
}> = ({ x, y, w: ww = 760, h: hh = 470, z = 20, glow, f, children }) => (
  <div style={{ position: "absolute", left: x - ww / 2, top: y - hh, width: ww, height: hh, zIndex: z }}>
    <div style={{ position: "absolute", left: -18, top: -18, width: ww + 36, height: hh + 36,
      background: "#141A20" }} />
    <div style={{ position: "absolute", inset: 0,
      background: `linear-gradient(178deg, ${mxh("#B8CCE0", 0.10 + glow * 0.72)} 0%, ${mxh("#8CA4BC", glow * 0.5)} 100%)` }} />
    {/* the tube bars behind the diffuser — they make it a LIGHT BOX */}
    {Array.from({ length: 6 }, (_, i) => (
      <div key={i} style={{ position: "absolute", left: 20, top: 26 + i * (hh - 52) / 6, width: ww - 40,
        height: 9, background: hexa("#FFFFFF", 0.10 + glow * 0.44) }} />
    ))}
    {/* the clamps that hold the exhibit */}
    {[0.16, 0.84].map((t, i) => (
      <div key={"c" + i} style={{ position: "absolute", left: ww * t - 16, top: 8, width: 32, height: 56,
        borderRadius: 5, background: "#39434D" }} />
    ))}
    {children}
  </div>
);

/** the gavel and its block. `k` 0 up, 1 struck. A real distance, not a nudge. */
export const Gavel: React.FC<{ x: number; y: number; k: number; z?: number; s?: number }> =
  ({ x, y, k, z = 70, s = 1 }) => {
  const ang = -62 + k * 62;
  return (
    <div style={{ position: "absolute", left: x - 60 * s, top: y - 40 * s, width: 240 * s,
      height: 80 * s, zIndex: z }}>
      {/* the block first, so the head lands ON it */}
      <div style={{ position: "absolute", left: -6 * s, top: 26 * s, width: 132 * s, height: 34 * s,
        borderRadius: 6 * s, background: `linear-gradient(180deg, #8A5E34 0%, #4E3218 100%)` }} />
      <div style={{ position: "absolute", left: -6 * s, top: 26 * s, width: 132 * s, height: 7 * s,
        background: "#A87A46" }} />
      <div style={{ position: "absolute", left: 60 * s, top: 34 * s, width: 0, height: 0, zIndex: 2,
        transform: `rotate(${ang}deg)`, transformOrigin: "0 100%" }}>
        <svg viewBox="0 0 210 90" width={210 * s} height={90 * s}
          style={{ position: "absolute", left: -54 * s, top: -74 * s, overflow: "visible" }}>
          <rect x={54} y={38} width={148} height={15} rx={7} fill="#6E4A24" />
          <rect x={54} y={38} width={148} height={4} rx={2} fill="#9E7440" />
          <rect x={186} y={30} width={22} height={30} rx={7} fill="#8A5E34" />
          <rect x={6} y={12} width={64} height={68} rx={9} fill="#5E3E1E" />
          <rect x={6} y={12} width={64} height={13} rx={6} fill="#8A5E34" />
          <rect x={6} y={12} width={12} height={68} fill="#4A2E14" />
          <rect x={0} y={20} width={10} height={52} rx={4} fill="#C9A15A" />
        </svg>
      </div>
    </div>
  );
};

/** ⭐ THE PROVING HAMMER. `k` 0 = up, 1 = struck.
    ⛔ v1 WAS ONE COLUMN AND A TRAPEZOID AND IT READ AS A STREET LAMP. What makes
    something read as a drop hammer is four structural features, none of which is
    colour: TWO heavy guide columns straddling the work, a crown beam tying them,
    a MASS between them that is wider than it is tall, and tie rods. All four are
    drawn, and the whole thing is lit from the furnace BELOW so it is a dark
    silhouette against a hot floor rather than a dark shape on a dark wall. */
export const ProvingRam: React.FC<{ x: number; y: number; k: number; z?: number; drop?: number;
  w?: number; h?: number }> =
  ({ x, y, k, z = 66, drop = 210, w: ww = 360, h: hh = 470 }) => (
  <div style={{ position: "absolute", left: x - ww / 2, top: y - hh, width: ww, height: hh, zIndex: z }}>
    {/* the two guide columns */}
    {[0, ww - 56].map((cx, i) => (
      <div key={i} style={{ position: "absolute", left: cx, top: 0, width: 56, height: hh,
        background: `linear-gradient(90deg, #3A424A 0%, #171D24 100%)` }}>
        <div style={{ position: "absolute", left: 0, top: 0, width: 13, height: "100%",
          background: "#5A646E" }} />
        {Array.from({ length: 6 }, (_, j) => (
          <div key={j} style={{ position: "absolute", left: 6, top: 34 + j * 70, width: 44, height: 10,
            background: "#0E1318" }} />
        ))}
      </div>
    ))}
    {/* the crown beam */}
    <div style={{ position: "absolute", left: -18, top: -6, width: ww + 36, height: 58,
      background: `linear-gradient(180deg, #56606A 0%, #232B33 100%)` }}>
      <div style={{ position: "absolute", left: 0, top: 0, width: "100%", height: 11,
        background: "#828E9A" }} />
    </div>
    {/* the tie rods the hammer hangs from — they SHORTEN as it drops */}
    {[ww * 0.34, ww * 0.66].map((rx, i) => (
      <div key={"r" + i} style={{ position: "absolute", left: rx - 8, top: 46, width: 16,
        height: 40 + k * drop, background: "#39434D" }} />
    ))}
    {/* THE MASS — wider than it is tall, which is what says HAMMER */}
    <div style={{ position: "absolute", left: 44, top: 78 + k * drop, width: ww - 88, height: 128 }}>
      <svg viewBox="0 0 272 128" width={ww - 88} height={128} style={{ overflow: "visible" }}>
        <path d="M 8 0 L 264 0 L 246 96 L 26 96 Z" fill="#454F59" />
        <path d="M 8 0 L 264 0 L 258 20 L 14 20 Z" fill="#8A96A2" />
        <path d="M 26 96 L 246 96 L 232 126 L 40 126 Z" fill="#1A2026" />
        <rect x={70} y={34} width={132} height={13} fill="#2A323A" />
        <rect x={70} y={58} width={132} height={13} fill="#2A323A" />
      </svg>
    </div>
  </div>
);

/** the fuel column. ⛔ NO NUMERALS ANYWHERE ON IT — no quantity is spoken. */
export const FuelColumn: React.FC<{ x: number; y: number; h?: number; w?: number; level: number;
  z?: number; f: number }> =
  ({ x, y, h: hh = 480, w: ww = 214, level, z = 40, f }) => (
  <div style={{ position: "absolute", left: x - ww / 2, top: y - hh, width: ww, height: hh, zIndex: z }}>
    {/* ⛔ A LEVEL IS A BOUNDARY, AND A BOUNDARY NEEDS TWO SIDES. v1 painted the
        empty part #1A1410 inside an orange room — the same value as the wall —
        so the column read as a dark stack and the level as nothing. The empty
        part is now a lit bone standpipe, which puts the fuel line between two
        legible fields. */}
    <div style={{ position: "absolute", inset: 0, borderRadius: 12,
      background: `linear-gradient(90deg, #2A241C 0%, #5A5044 34%, #322C24 100%)`,
      border: "10px solid #170F0A" }} />
    <div style={{ position: "absolute", left: 11, bottom: 11, right: 11, height: (hh - 22) * level,
      background: `linear-gradient(180deg, #FFD07A 0%, ${EMBER} 100%)` }} />
    <div style={{ position: "absolute", left: 11, bottom: 11 + (hh - 22) * level - 12, right: 11,
      height: 14, background: "#FFF0C8" }} />
    {/* the sight-glass hoops — structure, so it reads as a TANK, not a bar */}
    {/* ⛔ SEVEN HOOPS ON A 520px TUBE READ AS STACKED DRUMS. Four, thinner, and
        the pipe reads as one vessel with a level in it. */}
    {[0.06, 0.36, 0.66, 0.94].map((t, i) => (
      <div key={i} style={{ position: "absolute", left: -12, top: 20 + t * (hh - 60), right: -12,
        height: 11, borderRadius: 4, background: "#3A2A18" }} />
    ))}
    <div style={{ position: "absolute", left: 22, top: 26, width: 16, bottom: 26, borderRadius: 8,
      background: hexa("#FFFFFF", 0.22) }} />
  </div>
);

/** a full-height lever the hero throws with his whole body */
export const BigLever: React.FC<{ x: number; y: number; k: number; z?: number; h?: number }> =
  ({ x, y, k, z = 50, h: hh = 330 }) => (
  <div style={{ position: "absolute", left: x - 60, top: y - hh - 40, width: 120, height: hh + 40, zIndex: z }}>
    <div style={{ position: "absolute", left: 22, top: hh - 14, width: 76, height: 54, borderRadius: 7,
      background: "#2A323A" }} />
    <div style={{ position: "absolute", left: 22, top: hh - 14, width: 76, height: 10, background: "#4A545E" }} />
    <div style={{ position: "absolute", left: 56, top: hh - 6, width: 0, height: 0,
      transform: `rotate(${-24 + k * 96}deg)`, transformOrigin: "0 0" }}>
      <div style={{ position: "absolute", left: -9, top: -hh + 8, width: 18, height: hh,
        borderRadius: 9, background: `linear-gradient(90deg, #8C98A4 0%, #4A545E 100%)` }} />
      <div style={{ position: "absolute", left: -25, top: -hh - 16, width: 50, height: 50,
        borderRadius: "50%", background: `linear-gradient(160deg, ${RED} 0%, #7A2018 100%)` }} />
      <div style={{ position: "absolute", left: -15, top: -hh - 8, width: 18, height: 18,
        borderRadius: "50%", background: hexa("#FFFFFF", 0.28) }} />
    </div>
  </div>
);

/** the brass step plate the keyword is stamped into, letter by letter */
export const StepPlate: React.FC<{ x: number; y: number; w?: number; hit: number; z?: number }> =
  ({ x, y, w: ww = 620, hit, z = 60 }) => {
  const L = R.keyword.split("");
  return (
    <div style={{ position: "absolute", left: x - ww / 2, top: y - 130, width: ww, height: 130, zIndex: z }}>
      <div style={{ position: "absolute", inset: 0, borderRadius: 5,
        background: `linear-gradient(180deg, #D8B876 0%, #8A6626 100%)`, boxShadow: SH_D }} />
      <div style={{ position: "absolute", left: 0, top: 0, width: "100%", height: 11,
        background: "#F0D89E" }} />
      <div style={{ position: "absolute", left: 14, top: 14, right: 14, bottom: 14,
        border: "3px solid #6E4E14" }} />
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center",
        justifyContent: "center", gap: ww * 0.026 }}>
        {L.map((ch, i) => (
          <span key={i} style={{
            color: i < hit ? "#3A2A08" : hexa("#3A2A08", 0.10),
            transform: `scale(${i < hit ? 1 : 1.5})`,
            ...mono(Math.round(ww * 0.115), 800), letterSpacing: 2 }}>{ch}</span>
        ))}
      </div>
    </div>
  );
};

/** a counter-folder hurled across the court floor */
export const Folder: React.FC<{ x: number; y: number; rot?: number; c?: string; s?: number; z?: number }> =
  ({ x, y, rot = 0, c = TEAL, s = 1, z = 64 }) => (
  <div style={{ position: "absolute", left: x - 46 * s, top: y - 34 * s, width: 92 * s, height: 68 * s,
    zIndex: z, transform: `rotate(${rot}deg)` }}>
    <svg viewBox="0 0 92 68" width={92 * s} height={68 * s} style={{ overflow: "visible" }}>
      <path d="M 2 12 L 34 12 L 42 2 L 90 2 L 90 66 L 2 66 Z" fill={dkh(c, 0.34)} />
      <path d="M 6 20 L 86 20 L 86 62 L 6 62 Z" fill="#F2EEE2" />
      <path d="M 2 24 L 90 24 L 90 66 L 2 66 Z" fill={c} />
      <rect x={14} y={34} width={44} height={5} fill={hexa("#04241C", 0.3)} />
      <rect x={14} y={44} width={30} height={5} fill={hexa("#04241C", 0.22)} />
    </svg>
  </div>
);

/** the wig that makes the JUDGE a different SILHOUETTE, not a labelled twin */
export const Wig: React.FC<{ x: number; y: number; s?: number; z?: number }> =
  ({ x, y, s = 1, z = 61 }) => (
  <div style={{ position: "absolute", left: x - 92 * s, top: y - 96 * s, width: 184 * s,
    height: 140 * s, zIndex: z }}>
    <svg viewBox="0 0 184 140" width={184 * s} height={140 * s} style={{ overflow: "visible" }}>
      <path d="M 24 56 Q 24 6 92 6 Q 160 6 160 56 L 160 74 Q 150 66 138 74 L 138 56 Q 138 30 92 30 Q 46 30 46 56 L 46 74 Q 34 66 24 74 Z"
        fill={WIG} />
      <path d="M 22 72 q -8 34 8 54 q 16 8 26 -4 q 8 -22 2 -50 z" fill={WIG} />
      <path d="M 162 72 q 8 34 -8 54 q -16 8 -26 -4 q -8 -22 -2 -50 z" fill={WIG} />
      {Array.from({ length: 6 }, (_, i) => (
        <path key={i} d={`M ${30 + i * 26} 20 q 10 12 0 26`} fill="none" stroke="#C8C2B0" strokeWidth={3} />
      ))}
    </svg>
  </div>
);

/* =========================================================================
   ⭐⭐⭐ THE LOAD.  Rebuilt after Alex: *"the begining scene needs to be way
   more interesting like OX UNLAZY BOSS"*.

   Frame-stripped all three rather than reasoning from memory, and the shape is
   the same in every one: **a CLAUDE is the subject and physical work is being
   done through his body against a LOAD.** OX ropes a charging bull. UNLAZY has
   a pipe in his mouth inflating a giant DONE balloon until it bursts. BOSS puts
   a colossal boss over a small Claude holding work up at him.

   v1 of this hook made a chart recorder the subject and left the Claude
   standing in the corner watching it. Nothing happened TO him, so nothing
   happened. That is not a polish problem and no amount of tuning the machine
   would have reached it.

   THE SEAL is the villain of this reel made liftable: the gold `DONE` he is
   holding over his head, cracking under its own weight because the claim cannot
   carry itself.
   ⛔ WEIGHT IS DEFORMATION. It BOWS on a sampled centre-line, the cracks spread
   on their own clock, and the shards fall before it goes.
   ====================================================================== */
export const BigSeal: React.FC<{
  x: number; y: number; d?: number; z?: number; f: number;
  /** 0..1 — how far the failure has progressed. Drives cracks, bow and sag. */
  fail?: number;
  /** 0..1 — the shatter itself */
  burst?: number;
  bow?: number; rot?: number;
}> = ({ x, y, d = 460, z = 62, f, fail = 0, burst = 0, bow = 0, rot = 0 }) => {
  const cracks = Math.min(11, Math.floor(fail * 12));
  const gone = burst > 0.02;
  return (
    <div style={{ position: "absolute", left: x - d / 2, top: y - d / 2, width: d, height: d,
      zIndex: z, transform: `rotate(${rot}deg) scaleY(${1 - bow * 0.06}) scaleX(${1 + bow * 0.04})`,
      transformOrigin: "50% 100%", opacity: gone ? Math.max(0, 1 - burst * 3.2) : 1 }}>
      <svg viewBox="0 0 200 200" width={d} height={d} style={{ overflow: "visible" }}>
        {/* the scalloped rim — 22 lobes, which is what makes a disc read as a SEAL */}
        {Array.from({ length: 22 }, (_, i) => {
          const a = (i / 22) * Math.PI * 2;
          return <circle key={i} cx={100 + Math.cos(a) * 82} cy={100 + Math.sin(a) * 82} r={19}
            fill="#B8842A" />;
        })}
        <circle cx={100} cy={100} r={84} fill="#C89A38" />
        <circle cx={100} cy={100} r={78} fill={GOLD} />
        <circle cx={100} cy={100} r={78} fill="none" stroke="#8E6218" strokeWidth={6} />
        <circle cx={100} cy={100} r={60} fill="none" stroke="#8E6218" strokeWidth={4} />
        {/* the device pressed into it: the tick, and the word it is lying about */}
        <path d="M 72 100 L 90 120 L 132 74" fill="none" stroke="#4A3208" strokeWidth={15}
          strokeLinecap="round" strokeLinejoin="round" />
        <text x={100} y={158} textAnchor="middle" fill="#4A3208"
          style={{ ...mono(25, 800), letterSpacing: 5 }}>{R.lie}</text>
        {/* the highlight, so it reads as cast metal and not a flat disc */}
        <ellipse cx={70} cy={62} rx={30} ry={20} fill={hexa("#FFF0C8", 0.34)}
          transform="rotate(-28 70 62)" />
        {/* ⭐ THE CRACKS ARE THE ANTICIPATION. They spread from the rim inward on
            their own clock, each one longer than the last, so at any frame the
            viewer can see how much is left. */}
        {Array.from({ length: 11 }, (_, i) => {
          if (i >= cracks) return null;
          const a = (i / 11) * Math.PI * 2 + 0.4;
          /* ⛔ A CRACK THAT STOPS AT THE RIM IS A SCRATCH. These run to the hub. */
          const r0 = 84, r1 = 84 - (34 + rnd(i, 3) * 52) * Math.min(1, fail * 1.6);
          const mx = 100 + Math.cos(a + 0.16) * ((r0 + r1) / 2);
          const my = 100 + Math.sin(a + 0.16) * ((r0 + r1) / 2);
          return (
            <path key={"ck" + i}
              d={`M ${100 + Math.cos(a) * r0} ${100 + Math.sin(a) * r0} Q ${mx} ${my} ${100 + Math.cos(a - 0.2) * r1} ${100 + Math.sin(a - 0.2) * r1}`}
              fill="none" stroke="#3A2606" strokeWidth={3 + fail * 4} strokeLinecap="round" />
          );
        })}
      </svg>
      {/* the shatter: 34 shards of real gold, not a puff */}
      {gone && Array.from({ length: 52 }, (_, i) => {
        const a = (i / 52) * Math.PI * 2 + rnd(i, 7) * 0.5;
        /* ⛔ THE BLAST WAS LEAVING FRAME BEFORE IT COULD BE SEEN. 200-540px of
           throw plus 620 of drop put most of 52 shards off-panel within four
           frames of the break, so the payoff read as the seal simply vanishing.
           Half the throw, and they stay in the picture while they fall. */
        const sp = 110 + rnd(i, 11) * 210;
        const px = d / 2 + Math.cos(a) * sp * burst;
        const py = d / 2 + Math.sin(a) * sp * burst + burst * burst * 380;
        const s = 26 + rnd(i, 5) * 46;
        return (
          <div key={"sh" + i} style={{ position: "absolute", left: px - s / 2, top: py - s / 2,
            width: s, height: s * 0.8, zIndex: z + 2, opacity: Math.max(0, 1 - burst * 0.55),
            transform: `rotate(${i * 47 + burst * 420}deg)`,
            clipPath: "polygon(0% 30%, 46% 0%, 100% 22%, 78% 100%, 18% 84%)",
            background: i % 3 === 0 ? "#B8842A" : i % 3 === 1 ? GOLD : "#F0D07A" }} />
        );
      })}
    </div>
  );
};

/** what was UNDER the seal all along: the real work, unfinished. Raw frame,
    visible fixings, holes you can see the room through.
    ⛔ IT IS NOT DRAWN UGLY — it is drawn UNFINISHED. Bright bare timber and
    clean metal, honestly half-built, which is a different claim from shabby. */
export const RawWork: React.FC<{ x: number; y: number; w?: number; z?: number; k: number; f: number }> =
  ({ x, y, w: ww = 330, z = 58, k, f }) => {
  const hh = ww * 0.78;
  return (
    <div style={{ position: "absolute", left: x - ww / 2, top: y - hh / 2, width: ww, height: hh,
      zIndex: z, opacity: k, transform: `scale(${0.86 + k * 0.14}) rotate(${(1 - k) * -7}deg)` }}>
      {/* ⛔⛔ NOT A WIREFRAME. v1 drew this as a grid of bare struts and that is
          reel 124's exact rejected shape — a grey outline standing in for a
          thing. What is under the gold seal is REAL WORK, honestly half-built:
          solid finished panels on one side, bright bare metal that IS done, and
          open bays you can see the room through on the other. Unfinished is a
          different claim from ugly, and it has to be drawn as one. */}
      <svg viewBox="0 0 330 258" width={ww} height={hh} style={{ overflow: "visible" }}>
        <rect x={6} y={6} width={318} height={246} rx={5} fill="#5A4A34" />
        <rect x={6} y={6} width={318} height={13} fill="#8A7450" />
        {/* the half that is genuinely FINISHED — solid, painted, working */}
        <rect x={18} y={30} width={140} height={210} fill="#3F6E5E" />
        <rect x={18} y={30} width={140} height={11} fill="#6EA492" />
        <rect x={32} y={54} width={112} height={54} rx={4} fill="#8AC4B0" />
        {[0, 1, 2].map(i => (
          <rect key={"r" + i} x={32} y={124 + i * 30} width={112 - i * 22} height={13} rx={3}
            fill={hexa("#CFE8DE", 0.62 - i * 0.14)} />
        ))}
        <rect x={32} y={214} width={62} height={16} rx={4} fill="#E7B24C" />
        {/* the half that is NOT — open bays, exposed studs, a cable hanging */}
        {[0, 1, 2].map(i => (
          <rect key={"s" + i} x={176 + i * 52} y={30} width={16} height={210} fill="#8A7450" />
        ))}
        {[0, 1].map(i => (
          <rect key={"b" + i} x={192 + i * 52} y={40 + i * 30} width={36} height={190 - i * 40}
            fill="#1E2A26" />
        ))}
        <rect x={168} y={120} width={148} height={12} fill="#8A7450" />
        <path d="M 240 132 q 18 44 -8 74 q -20 22 4 34" fill="none" stroke="#2E3A36"
          strokeWidth={7} strokeLinecap="round" />
        {/* the fixings, showing, because nobody has covered them yet */}
        {[[24, 24], [306, 24], [24, 234], [306, 234], [166, 24], [166, 234]].map(([cx, cy], i) => (
          <circle key={"f" + i} cx={cx} cy={cy} r={8} fill="#C9A15A" />
        ))}
      </svg>
    </div>
  );
};

/* =========================================================================
   ⭐⭐⭐ THE TWO DEVICES THAT MAKE OX / UNLAZY / BOSS LOOK DENSE.

   Measured off their own delivered body frames rather than remembered: BOSS
   carries **8 to 12 Claudes in a band across the bottom of EVERY body frame**
   plus a back wall of real UI; OX fills a floor with hundreds of coins and a
   60-tile grid; UNLAZY runs six terminals with real code and five red X marks.

   This reel shipped body scenes with ONE object on an empty floor and 0-2
   sprites, and Alex: *"the animations quality is just not anywhere near as good
   nor interesting."* It is not a polish gap, it is a DENSITY gap, and it has
   exactly two shapes. Both are on-theme here for free: a court has a public
   GALLERY and it has WALLS OF CASE FILES.
   ====================================================================== */

/** ⭐ THE GALLERY BAND. N Claudes across the frame in R ranks, back ranks in
    progressively darker clay — size alone is a texture, the VALUE RAMP is what
    makes depth readable, and it is the axis the greyscale audit can see.
    ⛔ Pitch is arithmetic: `spacing >= 0.85 x size`, computed here, not guessed. */
export const Gallery: React.FC<{
  f: number; x0?: number; x1?: number; y: number; n?: number; ranks?: number;
  size?: number; z?: number; at?: number; react?: number; seed?: number;
}> = ({ f, x0 = -30, x1 = 1042, y, n = 9, ranks = 2, size = 116, z = 26, at = -24,
        react = 0, seed = 0 }) => (
  <>{Array.from({ length: ranks }, (_, r) => {
    const per = Math.ceil(n / ranks);
    const sz = size * (1 - r * 0.20);
    const span = (x1 - x0) * (1 - r * 0.06);
    const pitch = span / (per + 1);
    return Array.from({ length: per }, (_, i) => {
      const idx = r * per + i;
      const tint = r === 0 ? undefined : r === 1 ? "#A85A38" : "#7E4028";
      return (
        <Crew key={`gal${seed}${r}${i}`} f={f + idx * 7} i={idx + seed * 3}
          x={x0 + pitch * (i + 1) + (r % 2) * pitch * 0.5}
          y={y - r * sz * 0.34} size={sz} z={z - r * 3} at={at + idx * 2}
          loop={react > 0.5 ? 2 : (idx + seed) % 4} tint={tint}
          cheer={react > 0.5 ? react : 0} />
      );
    });
  })}</>
);

/** ⭐ THE EXHIBIT WALL. Rows of real case files with readable rulings, tabs and
    reference marks — countable multiplicity, which is the other half of what
    the reference reels do. `lit` runs a light down it so the wall is also the
    scene's background process. */
export const ExhibitWall: React.FC<{
  x: number; y: number; w?: number; h?: number; z?: number; f: number;
  cols?: number; rows?: number; c?: string; lit?: number; flagged?: number;
}> = ({ x, y, w: ww = 980, h: hh = 320, z = 16, f, cols = 8, rows = 3,
        c = "#7A5230", lit = 0.4, flagged = 0 }) => {
  const cw = ww / cols, ch = hh / rows;
  const sweep = ((f * 7) % (ww + 300)) - 150;
  return (
    <div style={{ position: "absolute", left: x - ww / 2, top: y - hh, width: ww, height: hh,
      zIndex: z, overflow: "hidden" }}>
      {/* ⛔ THE WALL MUST NOT COMPETE WITH THE HERO. v1 ran 24 pale tiles at the
          same value as the gold, and on the strip the wall was the second thing
          you saw. The carcass is now near-black, the files sit INSIDE
          pigeonholes with a lip and a shadow, and the whole thing reads as
          storage the seal is lit against. */}
      {/* ⛔ AND THE CARCASS CANNOT BE BLACK EITHER. At 0.62/0.80 the wall took
          frame-0 luma from 153.7 to 140.5 — passing with no margin — and left
          the claim plate as nothing but the header pill. A mid oak carcass keeps
          the files reading against it and gives the frame its brightness back. */}
      <div style={{ position: "absolute", inset: 0,
        background: `linear-gradient(180deg, ${dkh(c, 0.18)} 0%, ${dkh(c, 0.44)} 100%)` }} />
      {Array.from({ length: cols * rows }, (_, i) => {
        const cx = (i % cols) * cw, cy = Math.floor(i / cols) * ch;
        const flag = i < flagged;
        const face = flag ? "#B4342A" : [ "#C9B48C", "#B8A279", "#D6C4A0" ][i % 3];
        const lean = (rnd(i, 5) - 0.5) * 5;
        const nf = 3 + (i % 2);
        return (
          <div key={"ex" + i} style={{ position: "absolute", left: cx + 5, top: cy + 5,
            width: cw - 10, height: ch - 10, background: dkh(c, 0.56),
            boxShadow: "inset 0 6px 12px rgba(0,0,0,0.5)" }}>
            {/* three or four bound files standing in the hole, at real depth */}
            {Array.from({ length: nf }, (_, j) => (
              <div key={j} style={{ position: "absolute", bottom: 3,
                left: 6 + j * ((cw - 22) / nf),
                width: (cw - 26) / nf - 3, height: ch - 22 - (j % 2) * 7,
                transform: `rotate(${lean * (j % 2 ? 1 : -0.6)}deg)`, transformOrigin: "50% 100%",
                background: flag ? ["#B4342A", "#8E2A22"][j % 2] : ["#DCC9A2", "#C2AA80", "#EADCBE"][j % 3] }}>
                <div style={{ position: "absolute", left: 0, top: "22%", width: "100%", height: 3,
                  background: hexa("#3A2E18", 0.34) }} />
                <div style={{ position: "absolute", left: 0, top: "46%", width: "100%", height: 3,
                  background: hexa("#3A2E18", 0.22) }} />
              </div>
            ))}
            {/* the hole's own lip, so it reads as JOINERY and not a painted square */}
            <div style={{ position: "absolute", left: -3, bottom: -4, width: cw - 4, height: 7,
              background: mxh(c, 0.24) }} />
          </div>
        );
      })}
      {/* the light running the wall — the background process, and it is what a
          clerk's lamp on a runner actually does */}
      <div style={{ position: "absolute", left: sweep, top: -20, width: 190, height: hh + 40,
        background: `linear-gradient(90deg, ${hexa("#FFE8B8", 0)} 0%, ${hexa("#FFE8B8", 0.30 * lit)} 50%, ${hexa("#FFE8B8", 0)} 100%)` }} />
    </div>
  );
};

/** a gold DONE plaque — the lie in a unit you can stack, throw and scatter.
    Landscape, because a stack of portrait cards is a tower of edges. */
export const Plaque: React.FC<{
  x: number; y: number; w?: number; rot?: number; z?: number; crack?: number; hollow?: number;
}> = ({ x, y, w: ww = 190, rot = 0, z = 60, crack = 0, hollow = 0 }) => {
  const hh = ww * 0.62;
  return (
    <div style={{ position: "absolute", left: x - ww / 2, top: y - hh, width: ww, height: hh,
      zIndex: z, transform: `rotate(${rot}deg)`, transformOrigin: "50% 100%" }}>
      <svg viewBox="0 0 190 118" width={ww} height={hh} style={{ overflow: "visible" }}>
        <rect x={0} y={0} width={190} height={118} rx={4} fill={hollow > 0.5 ? "#3A3026" : "#5E2320"} />
        <rect x={0} y={0} width={190} height={7} fill={hollow > 0.5 ? "#5A4E3E" : "#7A342E"} />
        <rect x={7} y={7} width={176} height={104} fill="none" stroke={GOLD} strokeWidth={5}
          opacity={1 - hollow} />
        <circle cx={38} cy={59} r={24} fill={GOLD} opacity={1 - hollow} />
        <path d="M 27 59 L 35 69 L 51 47" fill="none" stroke="#4A3208" strokeWidth={6}
          strokeLinecap="round" strokeLinejoin="round" opacity={1 - hollow} />
        <text x={116} y={72} textAnchor="middle" fill={hollow > 0.5 ? "#6E6252" : "#F4E6C6"}
          style={{ ...mono(31, 800), letterSpacing: 4 }}>{R.lie}</text>
        {crack > 0.02 && (
          <path d="M 14 8 L 52 46 L 30 70 L 78 104" fill="none" stroke="#2A1C04"
            strokeWidth={4 * crack} strokeLinecap="round" />
        )}
        {hollow > 0.5 && [30, 78, 126, 162].map((cx, i) => (
          <circle key={i} cx={cx} cy={40 + (i % 2) * 38} r={13} fill="#14100C" />
        ))}
      </svg>
    </div>
  );
};

/** the gold FACE of a seal, as a shell that can fall away and leave a carcass */
export const SealShell: React.FC<{ x: number; y: number; d?: number; z?: number; off: number }> =
  ({ x, y, d = 420, z = 64, off }) => (
  <div style={{ position: "absolute", left: x - d / 2, top: y - d / 2 + off * 300, width: d,
    height: d, zIndex: z, opacity: Math.max(0, 1 - off * 0.7),
    transform: `rotate(${off * 46}deg) scale(${1 - off * 0.12})` }}>
    <svg viewBox="0 0 200 200" width={d} height={d} style={{ overflow: "visible" }}>
      {Array.from({ length: 22 }, (_, i) => {
        const a = (i / 22) * Math.PI * 2;
        return <circle key={i} cx={100 + Math.cos(a) * 82} cy={100 + Math.sin(a) * 82} r={19}
          fill="#B8842A" />;
      })}
      <circle cx={100} cy={100} r={84} fill="#C89A38" />
      <circle cx={100} cy={100} r={78} fill={GOLD} />
      <circle cx={100} cy={100} r={78} fill="none" stroke="#8E6218" strokeWidth={6} />
      <path d="M 72 100 L 90 120 L 132 74" fill="none" stroke="#4A3208" strokeWidth={15}
        strokeLinecap="round" strokeLinejoin="round" />
      <text x={100} y={158} textAnchor="middle" fill="#4A3208"
        style={{ ...mono(25, 800), letterSpacing: 5 }}>{R.lie}</text>
      <ellipse cx={70} cy={62} rx={30} ry={20} fill={hexa("#FFF0C8", 0.34)}
        transform="rotate(-28 70 62)" />
    </svg>
  </div>
);

/** what the gold was covering: a bare carcass, ribs and empty bays */
export const SealCarcass: React.FC<{ x: number; y: number; d?: number; z?: number; k: number }> =
  ({ x, y, d = 420, z = 60, k }) => (
  <div style={{ position: "absolute", left: x - d / 2, top: y - d / 2, width: d, height: d,
    zIndex: z, opacity: k }}>
    <svg viewBox="0 0 200 200" width={d} height={d} style={{ overflow: "visible" }}>
      <circle cx={100} cy={100} r={84} fill="#2A2620" />
      <circle cx={100} cy={100} r={84} fill="none" stroke="#4E463A" strokeWidth={9} />
      {Array.from({ length: 10 }, (_, i) => {
        const a = (i / 10) * Math.PI * 2;
        return <line key={i} x1={100} y1={100} x2={100 + Math.cos(a) * 80} y2={100 + Math.sin(a) * 80}
          stroke="#4E463A" strokeWidth={7} />;
      })}
      <circle cx={100} cy={100} r={26} fill="#171410" />
      <circle cx={100} cy={100} r={26} fill="none" stroke="#5E5648" strokeWidth={5} />
      {[[62, 62], [138, 62], [62, 138], [138, 138]].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r={15} fill="#100E0A" />
      ))}
    </svg>
  </div>
);
