import React from "react";
import { AbsoluteFill } from "remotion";
import { fraunces, inter } from "./fonts";
import {
  CREAM, INK, CLAY, GOLD, GREEN, SLATE, TERM, TERM2, STAR, mono, grad, seed,
  Bloom, Dust, GodRay, CreamBg, ClaudeLogo, CrewCard, PaperGrain,
  Mascot as HouseMascot,
} from "./CarouselConcepts";
import { Mascot as PkMascot, Pokeball, EvoGlow } from "./ClaudePokeballReel";

/* ==========================================================================
   REEL GRID COVERS — 1080 x 1920
   ---------------------------------------------------------------------------
   The crop math is the whole game. A reel cover is uploaded at 9:16 but is
   almost never SEEN at 9:16:
     4:5 profile-grid tile   = centre 1080x1350  ->  y  285 .. 1635
     1:1 legacy square crop  = centre 1080x1080  ->  y  420 .. 1500
   So every load-bearing element lives inside the 1:1 band; the 285px bands
   top and bottom are bleed and atmosphere ONLY. That way the tile survives
   whichever crop Instagram applies.

   Second constraint: the tile renders ~130px wide in a 3-up grid. That kills
   the carousel formula (2-line Fraunces headline + 2-line subhead). A grid
   cover gets ONE giant claim + ONE unmistakable hero shape.

   No swipe pill and no progress dots here — those are carousel affordances
   and would be a lie on a reel tile.
   ========================================================================== */

const SAFE_TOP = 420;   // 1:1 crop top
const SAFE_BOT = 1500;  // 1:1 crop bottom

/* ⛔⭐ THE HEADER QUIET ZONE — y 336..780.
   The headline slot is IDENTICAL on every cover (line1 top 434 / giant top 514,
   measured text rows 444..652). Alex still read the set as inconsistent, and the
   measurement showed why: placement was already pixel-locked, but the HERMES
   columns rose into the band, so its type sat on architecture while the other
   two sat on clean sky. Same coordinates, different perceived position.
   ⛔ RULE: every scene keeps y < HEADER_QUIET structurally EMPTY — sky, gradient
   and soft glow only. No columns, no blocks, no props, no hard edges. Atmosphere
   is fine; geometry is not. Verify with the gutter-contrast check, not by eye. */
const HEADER_QUIET = 780;

/* ---------- shared type ---------- */

export const Eyebrow: React.FC<{ children: React.ReactNode; c?: string; top: number }> = ({ children, c = "#8F897B", top }) => (
  <div style={{
    position: "absolute", left: 0, right: 0, top, textAlign: "center",
    fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 37,
    letterSpacing: "0.2em", color: c,
  }}>{children}</div>
);

export const Giant: React.FC<{ children: React.ReactNode; top: number; c?: string; size?: number }> = ({ children, top, c = INK, size = 150 }) => (
  <div style={{
    position: "absolute", left: 0, right: 0, top, textAlign: "center",
    fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: size,
    letterSpacing: "-0.035em", lineHeight: 1.0, color: c,
  }}>{children}</div>
);

const Pill: React.FC<{ children: React.ReactNode; top: number; bg?: string; fg?: string }> = ({ children, top, bg = grad(CLAY, "#B85A38"), fg = "#FFF6EE" }) => (
  <div style={{ position: "absolute", left: 0, right: 0, top, display: "flex", justifyContent: "center" }}>
    <div style={{
      padding: "20px 44px", borderRadius: 999, background: bg,
      fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 40,
      letterSpacing: "0.03em", color: fg, whiteSpace: "nowrap",
      boxShadow: "0 20px 44px -14px rgba(150,70,40,0.66)",
    }}>{children}</div>
  </div>
);

const Handle: React.FC<{ top: number; c?: string }> = ({ top, c = "#6B675C" }) => (
  <div style={{
    position: "absolute", left: 0, right: 0, top, textAlign: "center",
    fontFamily: mono, fontWeight: 700, fontSize: 30, letterSpacing: "0.22em", color: c,
  }}>@NOCODEALEX</div>
);

/* ---------- the scene that lives inside the card's art window (500x360 ART space) ---------- */

const RouteArt: React.FC = () => (
  <>
    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,#7FC7EE 0%,#B9E6F8 54%,#D8F1E4 100%)" }} />
    <Bloom x={378} y={54} r={132} c="rgba(255,246,206,0.9)" />
    {/* far mountains */}
    <div style={{ position: "absolute", left: -30, top: 150, width: 250, height: 120, background: "#6E86A8", clipPath: "polygon(0% 100%, 26% 22%, 48% 100%)", opacity: 0.75 }} />
    <div style={{ position: "absolute", left: 150, top: 138, width: 300, height: 134, background: "#5E7796", clipPath: "polygon(0% 100%, 34% 12%, 70% 100%)", opacity: 0.8 }} />
    {/* clouds */}
    {[[54, 62, 1], [300, 44, 0.8], [420, 96, 0.62]].map(([x, y, s], i) => (
      <div key={i} style={{ position: "absolute", left: x as number, top: y as number, width: 108 * (s as number), height: 34 * (s as number), borderRadius: 999, background: "rgba(255,255,255,0.9)" }} />
    ))}
    {/* rolling hills */}
    <div style={{ position: "absolute", left: 0, right: 0, top: 236, height: 130, background: "#63B93F" }} />
    <div style={{ position: "absolute", left: -60, top: 210, width: 320, height: 130, borderRadius: "50% 50% 0 0", background: "#74C94D" }} />
    <div style={{ position: "absolute", left: 270, top: 220, width: 300, height: 130, borderRadius: "50% 50% 0 0", background: "#6CC246" }} />
    {/* the path */}
    <div style={{ position: "absolute", left: 186, top: 250, width: 128, height: 120, background: "linear-gradient(180deg,#E8CE92,#D8B975)", clipPath: "polygon(38% 0%, 62% 0%, 100% 100%, 0% 100%)" }} />
    {/* grass tufts */}
    {Array.from({ length: 14 }).map((_, i) => {
      const x = seed(i * 3 + 1) * 480, y = 250 + seed(i * 5 + 2) * 96;
      return <div key={i} style={{ position: "absolute", left: x, top: y, width: 15, height: 11, borderRadius: "50% 50% 0 0", background: i % 2 ? "#4FA332" : "#57B038" }} />;
    })}
    {/* two resting pokeballs as set dressing */}
    <Pokeball x={62} y={286} sz={34} />
    <Pokeball x={412} y={300} sz={27} />
    {/* sparkles */}
    {Array.from({ length: 9 }).map((_, i) => (
      <div key={i} style={{
        position: "absolute", left: seed(i * 7 + 3) * 470, top: 120 + seed(i * 11 + 4) * 150,
        width: 5, height: 5, borderRadius: "50%", background: "rgba(255,255,255,0.95)",
        boxShadow: "0 0 9px rgba(255,255,255,0.9)",
      }} />
    ))}
  </>
);

/* ==========================================================================
   DIRECTION A — "THE CARD"
   Cream stage + the collectible card as the hero. Speaks the same C5 language
   as carousel POST 2, so the grid reads as one system, and the card IS the
   artifact (artifact-first). Warm/bright: stands out in a grid of dark tiles.
   ========================================================================== */

/* ---------- MARIO world (reel 51 SKILLS) — 500x360 ART space ---------- */

const MarioArt: React.FC = () => (
  <>
    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,#5C94FC 0%,#7FB2FF 66%,#A8CCFF 100%)" }} />
    {/* clouds */}
    {[[40, 46, 1], [292, 32, 0.82], [412, 84, 0.62]].map(([x, y, s], i) => (
      <div key={i} style={{ position: "absolute", left: x as number, top: y as number }}>
        <div style={{ width: 96 * (s as number), height: 30 * (s as number), borderRadius: 999, background: "#FFFFFF" }} />
        <div style={{ position: "absolute", left: 20 * (s as number), top: -13 * (s as number), width: 46 * (s as number), height: 30 * (s as number), borderRadius: "50%", background: "#FFFFFF" }} />
      </div>
    ))}
    {/* hills */}
    <div style={{ position: "absolute", left: -40, top: 196, width: 250, height: 130, borderRadius: "50% 50% 0 0", background: "#00A800" }} />
    <div style={{ position: "absolute", left: 300, top: 214, width: 200, height: 110, borderRadius: "50% 50% 0 0", background: "#00A800" }} />
    {/* ⛔ The centred mascot covers ART x154..346 — every focal prop must sit
        OUTSIDE that box or it is invisible. v1 put the ? block dead centre and
        the single most iconic Mario object vanished behind Claude's head. */}
    <div style={{ position: "absolute", left: 48, top: 150, width: 62, height: 62, borderRadius: 6, background: "linear-gradient(180deg,#FCA044,#E07314)", border: "4px solid #7A3B08", boxShadow: "inset 0 3px 0 rgba(255,255,255,0.34)" }}>
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 38, color: "#FFF3D6" }}>?</div>
    </div>
    {[[44, 84, 26], [92, 58, 30], [138, 92, 24]].map(([x, y, d], i) => (
      <div key={i} style={{ position: "absolute", left: x as number, top: y as number, width: d as number, height: d as number, borderRadius: "50%", background: "linear-gradient(180deg,#FCE84C,#E0A81E)", border: "3px solid #9A6E10", boxShadow: "0 0 14px rgba(252,232,76,0.75)" }} />
    ))}
    {/* warp pipe */}
    <div style={{ position: "absolute", left: 386, top: 226, width: 84, height: 26, borderRadius: 5, background: "linear-gradient(180deg,#5CE05C,#008C00)", border: "4px solid #005A00" }} />
    <div style={{ position: "absolute", left: 396, top: 250, width: 64, height: 74, background: "linear-gradient(90deg,#3FCC3F,#008C00)", border: "4px solid #005A00", borderTop: "none" }} />
    {/* brick ground */}
    <div style={{ position: "absolute", left: 0, right: 0, top: 322, height: 38, background: "#C86428" }} />
    {Array.from({ length: 17 }).map((_, i) => (
      <div key={i} style={{ position: "absolute", left: i * 30, top: 322, width: 28, height: 38, border: "2px solid #7A3B08", background: i % 2 ? "#D2703A" : "#C05E24" }} />
    ))}
  </>
);

/* ---------- GREEK world (HERMES) — 500x360 ART space ---------- */

const GreekArt: React.FC = () => (
  <>
    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,#F4D9A8 0%,#E9B98C 40%,#8FC6D8 78%,#5FA3BE 100%)" }} />
    <Bloom x={392} y={70} r={124} c="rgba(255,244,206,0.95)" />
    {/* distant sea + far island */}
    <div style={{ position: "absolute", left: 0, right: 0, top: 214, height: 46, background: "linear-gradient(180deg,#4E93AE,#3C7A94)" }} />
    <div style={{ position: "absolute", left: 330, top: 190, width: 150, height: 30, background: "#7D8FA6", clipPath: "polygon(0% 100%, 40% 12%, 100% 100%)", opacity: 0.7 }} />
    {/* ⛔ v1 centred the temple and the mascot ate ALL of it — pediment centre,
        middle columns and the scroll. Worse, tan-on-cream meant the hero had no
        contrast. Both fixed by opening a wide central DOORWAY: the columns move
        outside the mascot's box (ART x154..346) and the dark cella behind it
        becomes the contrast card the light figure stands against. */}
    {/* the dark cella the figure stands in */}
    <div style={{ position: "absolute", left: 140, top: 108, width: 220, height: 196, background: "linear-gradient(180deg,#4A3A28 0%,#241B12 58%,#160F09 100%)", boxShadow: "inset 0 10px 26px rgba(0,0,0,0.6)" }} />
    <div style={{ position: "absolute", left: 140, top: 108, width: 220, height: 26, background: "linear-gradient(180deg,rgba(0,0,0,0.55),transparent)" }} />
    {/* temple pediment — sits ABOVE the mascot's head (ART y<116) so it survives */}
    <div style={{ position: "absolute", left: 78, top: 34, width: 344, height: 56, background: "linear-gradient(180deg,#F6EEDC,#DCCFB4)", clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)", filter: "drop-shadow(0 4px 5px rgba(0,0,0,0.22))" }} />
    <div style={{ position: "absolute", left: 66, top: 88, width: 368, height: 20, background: "linear-gradient(180deg,#F2E8D2,#D6C7A8)" }} />
    {/* fluted columns — flanking pairs only, clear of the mascot box */}
    {[74, 122, 348, 396].map((x, i) => (
      <div key={i} style={{ position: "absolute", left: x, top: 108, width: 32, height: 152, background: "linear-gradient(90deg,#F8F2E2,#D3C3A4 62%,#B7A688)", borderRadius: 3 }}>
        <div style={{ position: "absolute", left: -3, right: -3, top: -8, height: 10, background: "#FBF6E8", borderRadius: 2 }} />
        {[8, 16, 24].map((fx, j) => <div key={j} style={{ position: "absolute", left: fx, top: 4, width: 2, bottom: 4, background: "rgba(120,102,74,0.34)" }} />)}
      </div>
    ))}
    {/* steps */}
    <div style={{ position: "absolute", left: 60, right: 60, top: 260, height: 16, background: "#E6D9BE" }} />
    <div style={{ position: "absolute", left: 42, right: 42, top: 276, height: 17, background: "#D6C7A8" }} />
    <div style={{ position: "absolute", left: 24, right: 24, top: 293, height: 18, background: "#C4B492" }} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 311, height: 49, background: "linear-gradient(180deg,#B5A484,#9C8B6C)" }} />
    {/* laurel sprigs flanking the steps */}
    {[[38, 300, 1], [462, 300, -1]].map(([x, y, dir], i) => (
      <div key={i} style={{ position: "absolute", left: x as number, top: y as number }}>
        {Array.from({ length: 6 }).map((_, j) => (
          <div key={j} style={{
            position: "absolute", left: (dir as number) * j * 7, top: -j * 8,
            width: 15, height: 8, borderRadius: "50%", background: "#5E7B45",
            transform: `rotate(${(dir as number) * (28 + j * 6)}deg)`,
          }} />
        ))}
      </div>
    ))}
    {/* the memory artifact: an unrolled scroll, off-centre so it stays visible */}
    <div style={{ position: "absolute", left: 74, top: 268, width: 96, height: 28, borderRadius: 4, background: "linear-gradient(180deg,#FBF3E0,#E7D9BC)", border: "2px solid #B49B6E", boxShadow: "0 4px 7px rgba(0,0,0,0.3)", transform: "rotate(-4deg)" }}>
      {[6, 12, 18].map((ly, j) => <div key={j} style={{ position: "absolute", left: 8, right: 20, top: ly, height: 2.5, background: "rgba(120,96,58,0.52)", borderRadius: 2 }} />)}
    </div>
    {/* motes in the god-light */}
    {Array.from({ length: 10 }).map((_, i) => (
      <div key={i} style={{
        position: "absolute", left: seed(i * 9 + 5) * 470, top: 60 + seed(i * 13 + 6) * 170,
        width: 5, height: 5, borderRadius: "50%", background: "rgba(255,246,214,0.95)",
        boxShadow: "0 0 10px rgba(255,240,190,0.9)",
      }} />
    ))}
  </>
);

/* ==========================================================================
   THE SHARED CHASSIS
   One cream card-cover, three reels. Per the house "clone the chassis
   verbatim" rule the chrome is identical every time — only the two headline
   lines, the costume, the world inside the art window, and the card strings
   change. That sameness is the point: the grid reads as a collectible SET,
   each reel being Claude in a different form.
   ========================================================================== */

type CardSpec = {
  name: string; role: string; num: string; chip: string;
  mascot: React.ReactNode; art: React.ReactNode;
  stats: { label: string; val: number; c: string }[];
};

export const CardCover: React.FC<{ line1: React.ReactNode; giant: React.ReactNode; card: CardSpec }> = ({ line1, giant, card }) => (
  <AbsoluteFill style={{ background: CREAM }}>
    <CreamBg />
    {/* Claude sunburst behind everything — the reel's own outer stage */}
    <div style={{ position: "absolute", left: 540, top: 1010, width: 0, height: 0 }}>
      {Array.from({ length: 20 }).map((_, i) => (
        <div key={i} style={{
          position: "absolute", left: 0, top: 0, width: 1600, height: 104,
          transformOrigin: "0 50%", transform: `rotate(${i * 18}deg) translateY(-52px)`,
          background: "linear-gradient(90deg, rgba(217,119,87,0.13), rgba(217,119,87,0))",
        }} />
      ))}
    </div>
    <Bloom x={540} y={340} r={540} c="rgba(232,163,127,0.34)" />
    <Bloom x={900} y={1560} r={430} c="rgba(210,114,78,0.24)" />
    <Dust n={26} w={1080} h={1920} c="rgba(120,100,80,0.30)" s={3} />

    {/* ---------- headline block ----------
        A promise, not a lament. Both lines are full-weight Fraunces in INK —
        a small muted eyebrow is invisible at grid size and does no work. A
        cream halo lifts the block off the sunburst so the type keeps contrast. */}
    <div style={{
      position: "absolute", left: 30, top: 396, width: 1020, height: 330,
      background: "radial-gradient(ellipse at 50% 50%, rgba(249,244,236,0.95) 0%, rgba(249,244,236,0.70) 48%, rgba(249,244,236,0) 76%)",
    }} />
    <Giant top={434} size={78}>{line1}</Giant>
    <Giant top={514} size={158}>{giant}</Giant>

    {/* ---------- the hero card ----------
        Sized so the WHOLE card clears the 1:1 crop. The gold ability chip
        carries the payoff line — it is the highest-contrast element on the
        card, so it survives the downscale that eats the stat rows. */}
    <div style={{ position: "absolute", left: 242, top: 716, transform: "rotate(-2.2deg)" }}>
      <CrewCard {...card} w={596} h={768} />
    </div>

    <PaperGrain />
  </AbsoluteFill>
);

/* ==========================================================================
   SCENE COVERS — the shipping direction (Alex, 2026-07-18: "for each cover
   slide it shouldn't be just like a card design, that's too bland and basic,
   needs to be more unique for each")
   ---------------------------------------------------------------------------
   The card chassis above put every reel in the SAME frame, so the concept was
   miniaturised inside a generic UI container and all three tiles read alike.
   Inverted here: the ART goes full-bleed and is bespoke per reel; what stays
   constant is the TYPE SYSTEM (line1 78 / giant 158, clay accent, same slot)
   and the warm palette. Cohesion now comes from the typography, not a border.
   Safe-area discipline is unchanged: type 434..672, hero 850..1400.
   ========================================================================== */

export const SceneCover: React.FC<{
  scene: React.ReactNode;
  line1: React.ReactNode;
  giant: React.ReactNode;
  c1?: string; c2?: string; scrim?: string;
  /* ⛔ OPTICAL FIT. The slot is fixed but the WIDTH is not: at 158px a 9-letter
     giant runs 1012px on a 1080 canvas, leaving 31px of air, and Alex called it
     ("too close to the edges"). Long giants pass a smaller giantSize so every
     cover keeps >=110px margin. The SLOT (top 434 / 514) never moves, which is
     the actual consistency requirement — same position, optically fitted size.
     Verify with the margin scan after ANY copy change; do not trust arithmetic. */
  giantSize?: number;
}> = ({ scene, line1, giant, c1 = INK, c2 = INK, scrim = "rgba(250,244,234,0.90)", giantSize = 158 }) => (
  <AbsoluteFill style={{ background: CREAM, overflow: "hidden" }}>
    {scene}
    {/* the type always needs its own ground, whatever the art is doing */}
    <div style={{
      position: "absolute", left: -40, right: -40, top: 336, height: 420,
      background: `radial-gradient(ellipse at 50% 46%, ${scrim} 0%, ${scrim.replace(/[\d.]+\)$/, "0.66)")} 44%, ${scrim.replace(/[\d.]+\)$/, "0)")} 76%)`,
    }} />
    <Giant top={434} size={78} c={c1}>{line1}</Giant>
    <Giant top={514} size={giantSize} c={c2}>{giant}</Giant>
    <PaperGrain />
  </AbsoluteFill>
);

/* ---------- 51 · SKILLS — a Mario LEVEL, the ? block being headbutted ----------
   The reel's own opening beat: Claude-Mario hits the block and the skills
   burst out as coins. Countable coins = the "5" in the headline, drawn. */

const MarioScene: React.FC = () => (
  <>
    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,#F7E9CF 0%,#BFDDF7 26%,#8FC2F5 58%,#B7DCF0 100%)" }} />
    <Bloom x={840} y={900} r={340} c="rgba(255,244,206,0.9)" />
    {/* clouds — all kept BELOW the header quiet zone (780) */}
    {[[80, 850, 1.4], [716, 892, 1.05], [268, 1016, 0.82], [872, 1060, 1.2]].map(([x, y, s], i) => (
      <div key={i} style={{ position: "absolute", left: x as number, top: y as number }}>
        <div style={{ width: 150 * (s as number), height: 48 * (s as number), borderRadius: 999, background: "rgba(255,255,255,0.96)" }} />
        <div style={{ position: "absolute", left: 34 * (s as number), top: -22 * (s as number), width: 74 * (s as number), height: 50 * (s as number), borderRadius: "50%", background: "rgba(255,255,255,0.96)" }} />
      </div>
    ))}
    {/* far castle — drawn BEFORE the hills so the hills occlude its base (depth) */}
    <div style={{ position: "absolute", left: 74, top: 1080, width: 190, height: 160, background: "#8E6A4E", opacity: 0.5 }} />
    {[0, 1, 2].map((i) => <div key={i} style={{ position: "absolute", left: 74 + i * 76, top: 1040, width: 38, height: 44, background: "#8E6A4E", opacity: 0.5 }} />)}
    {/* ⛔ the two hills span -120..500 and 620..1240, leaving a 120px GAP at dead
        centre — exactly where Claude stands. Sky poured through it down to the
        brick line and read as a pale blue pillar under his feet. A solid grass
        band behind the hills closes it; never rely on two arcs to tile a floor. */}
    <div style={{ position: "absolute", left: 0, right: 0, top: 1300, height: 180, background: "#3FA83F" }} />
    <div style={{ position: "absolute", left: -120, top: 1180, width: 620, height: 300, borderRadius: "50% 50% 0 0", background: "#3FA83F" }} />
    <div style={{ position: "absolute", left: 620, top: 1220, width: 620, height: 260, borderRadius: "50% 50% 0 0", background: "#48B348" }} />
    {/* the 5 coins bursting out of the block — countable, they ARE the "5" */}
    {[[-230, 56], [-118, 4], [0, -20], [118, 4], [230, 56]].map(([dx, dy], i) => (
      <div key={i} style={{
        position: "absolute", left: 540 + (dx as number) - 30, top: 806 + (dy as number),
        width: 60, height: 60, borderRadius: "50%",
        background: "linear-gradient(180deg,#FDF08A,#E0A81E)", border: "5px solid #9A6E10",
        boxShadow: "0 0 26px rgba(252,232,76,0.9), inset 0 4px 0 rgba(255,255,255,0.6)",
      }}>
        <div style={{ position: "absolute", left: 20, top: 11, width: 14, height: 32, borderRadius: 3, background: "rgba(154,110,16,0.45)" }} />
      </div>
    ))}
    {/* impact starburst, centred on the block */}
    {Array.from({ length: 12 }).map((_, i) => (
      <div key={i} style={{
        position: "absolute", left: 540, top: 1018, width: 168, height: 9,
        transformOrigin: "0 50%", transform: `rotate(${i * 30}deg) translateY(-4px)`,
        background: "linear-gradient(90deg, rgba(255,240,170,0.9), rgba(255,240,170,0))",
      }} />
    ))}
    {/* the ? block */}
    <div style={{
      position: "absolute", left: 452, top: 930, width: 176, height: 176, borderRadius: 12,
      background: "linear-gradient(180deg,#FCB24C,#DE7412)", border: "9px solid #7A3B08",
      boxShadow: "inset 0 7px 0 rgba(255,255,255,0.36), 0 16px 30px -8px rgba(90,50,10,0.5)",
    }}>
      {[[16, 16], [16, 128], [128, 16], [128, 128]].map(([bx, by], i) => (
        <div key={i} style={{ position: "absolute", left: bx, top: by, width: 14, height: 14, borderRadius: 3, background: "rgba(122,59,8,0.8)" }} />
      ))}
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 108, color: "#FFF6E2", textShadow: "0 5px 0 rgba(122,59,8,0.65)" }}>?</div>
    </div>
    {/* warp pipe — the raised ground line swallowed all but a sliver of the rim,
        so the whole pipe moves up to sit ON 1420 with the barrel running into it */}
    <div style={{ position: "absolute", left: 838, top: 1290, width: 210, height: 60, borderRadius: 10, background: "linear-gradient(180deg,#66E066,#009000)", border: "9px solid #005A00" }} />
    <div style={{ position: "absolute", left: 862, top: 1350, width: 162, height: 190, background: "linear-gradient(90deg,#46D046,#009000)", border: "9px solid #005A00", borderTop: "none" }} />
    {/* brick ground — raised to meet the feet. v2 left a 53px sliver of bare sky
        under Claude, and because his legs are set wide it read as him standing on
        a blue pillar rather than as airspace. A block overhead plus bursting coins
        already says "just hit it"; he does not also need to be off the ground. */}
    <div style={{ position: "absolute", left: 0, right: 0, top: 1420, height: 500, background: "#C05E24" }} />
    {Array.from({ length: 9 }).map((_, r) =>
      Array.from({ length: 15 }).map((_, i) => (
        <div key={`${r}-${i}`} style={{
          position: "absolute", left: (i * 78) - (r % 2 ? 39 : 0), top: 1420 + r * 62,
          width: 76, height: 60, border: "3px solid #7A3B08",
          background: (i + r) % 2 ? "#C86428" : "#B85520",
        }} />
      ))
    )}
    <div style={{
      position: "absolute", left: 540, top: 1404, width: 260, height: 30,
      transform: "translateX(-50%)", borderRadius: "50%",
      background: "radial-gradient(ellipse, rgba(70,30,6,0.5), transparent 72%)",
      filter: "blur(7px)", zIndex: 12,
    }} />
    {/* Claude-Mario, airborne, head just under the block */}
    <div style={{ position: "absolute", left: 540, top: 1150, transform: "translateX(-50%)", zIndex: 14 }}>
      <PkMascot lf={24} size={290} mario={1} jump={1} cheer={0.7} />
    </div>
  </>
);

export const Cover51: React.FC = () => (
  <SceneCover
    scene={<MarioScene />}
    line1={<>GRAB THESE 5 <span style={{ color: CLAY }}>FREE</span></>}
    giant={<>SKILLS</>}
  />
);

/* ---------- 52 · BALL — the route, and the ball cracking open ----------
   The reel's payoff image: you don't wait for the legendary, you open it
   yourself. Warm cream sky per the reel's own v9 Claude-stage background. */

const PokeScene: React.FC = () => (
  <>
    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,#FBEBD2 0%,#F6D9AE 22%,#CFE4E8 52%,#BFE2D4 74%,#A9D9BC 100%)" }} />
    <Bloom x={540} y={840} r={560} c="rgba(255,238,190,0.95)" />
    {/* mountains */}
    <div style={{ position: "absolute", left: -60, top: 1010, width: 460, height: 260, background: "#8FA3B8", clipPath: "polygon(0% 100%, 34% 6%, 68% 100%)", opacity: 0.72 }} />
    <div style={{ position: "absolute", left: 640, top: 1040, width: 520, height: 240, background: "#9DAFC2", clipPath: "polygon(0% 100%, 42% 10%, 82% 100%)", opacity: 0.66 }} />
    {/* the town skyline: Gym tower + Pokemon Center dome */}
    <div style={{ position: "absolute", left: 168, top: 1120, width: 96, height: 150, background: "#C9CFD8", border: "5px solid #8A93A2" }} />
    <div style={{ position: "absolute", left: 178, top: 1082, width: 76, height: 44, background: "#E8B94A", clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)" }} />
    <div style={{ position: "absolute", left: 786, top: 1152, width: 150, height: 118, background: "#F0EDE6", border: "5px solid #C2BBB0" }} />
    <div style={{ position: "absolute", left: 786, top: 1102, width: 150, height: 72, borderRadius: "999px 999px 0 0", background: "linear-gradient(180deg,#E4574A,#B93A31)" }} />
    <div style={{ position: "absolute", left: 848, top: 1122, width: 26, height: 9, background: "#FFF" }} />
    <div style={{ position: "absolute", left: 852, top: 1113, width: 9, height: 27, background: "#FFF" }} />
    {/* rolling hills */}
    <div style={{ position: "absolute", left: 0, right: 0, top: 1266, height: 654, background: "linear-gradient(180deg,#79C64F,#5FAE3C)" }} />
    <div style={{ position: "absolute", left: -140, top: 1206, width: 560, height: 200, borderRadius: "50% 50% 0 0", background: "#84CE59" }} />
    <div style={{ position: "absolute", left: 700, top: 1224, width: 520, height: 190, borderRadius: "50% 50% 0 0", background: "#7CC753" }} />
    {/* the route path, receding */}
    <div style={{ position: "absolute", left: 0, right: 0, top: 1358, height: 562, background: "linear-gradient(180deg,#E9D09A,#D4B877)", clipPath: "polygon(41% 0%, 59% 0%, 100% 100%, 0% 100%)" }} />
    {/* grass tufts */}
    {Array.from({ length: 22 }).map((_, i) => {
      const x = seed(i * 3 + 1) * 1080, y = 1300 + seed(i * 5 + 2) * 560;
      const onPath = Math.abs(x - 540) < 90 + (y - 1358) * 0.4;
      return onPath ? null : <div key={i} style={{ position: "absolute", left: x, top: y, width: 34, height: 24, borderRadius: "50% 50% 0 0", background: i % 2 ? "#4E9C31" : "#57A838" }} />;
    })}
    {/* light column out of the ball */}
    <div style={{
      position: "absolute", left: 366, top: 300, width: 348, height: 1040,
      background: "linear-gradient(180deg, rgba(255,244,196,0) 0%, rgba(255,240,180,0.5) 44%, rgba(255,236,164,0.82) 100%)",
      clipPath: "polygon(34% 0%, 66% 0%, 100% 100%, 0% 100%)",
    }} />
    {Array.from({ length: 20 }).map((_, i) => (
      <div key={i} style={{
        position: "absolute", left: 540, top: 1288, width: 620, height: 16,
        transformOrigin: "0 50%", transform: `rotate(${180 + i * 18}deg) translateY(-8px)`,
        background: `linear-gradient(90deg, rgba(255,240,180,${0.5 - (i % 3) * 0.12}), rgba(255,240,180,0))`,
      }} />
    ))}
    <Bloom x={540} y={1288} r={330} c="rgba(255,246,206,0.95)" />
    {/* the ball, open */}
    <div style={{ position: "absolute", left: 400, top: 1148, width: 280, height: 142, borderRadius: "140px 140px 0 0", background: "linear-gradient(180deg,#E8443A,#B4231B)", border: "10px solid #26262A", borderBottom: "none", transform: "rotate(-9deg)", transformOrigin: "50% 100%" }} />
    <div style={{ position: "absolute", left: 400, top: 1292, width: 280, height: 142, borderRadius: "0 0 140px 140px", background: "linear-gradient(180deg,#F7F3EB,#CFC9BC)", border: "10px solid #26262A", borderTop: "none", transform: "rotate(4deg)", transformOrigin: "50% 0%" }} />
    <div style={{ position: "absolute", left: 506, top: 1256, width: 68, height: 68, borderRadius: "50%", background: "#FFFDF6", border: "10px solid #26262A", boxShadow: "0 0 34px rgba(255,246,200,0.95)", zIndex: 12 }} />
    {/* Claude-trainer, to the side, looking at it */}
    <div style={{ position: "absolute", left: 812, top: 1200, zIndex: 14 }}>
      <PkMascot lf={24} size={250} trainer={1} gaze={-6} cheer={0.5} />
    </div>
    <div style={{ position: "absolute", left: 786, top: 1420, width: 330, height: 34, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(40,60,30,0.42), transparent 72%)", filter: "blur(8px)" }} />
    {/* sparks */}
    {Array.from({ length: 16 }).map((_, i) => (
      <div key={i} style={{
        position: "absolute", left: 300 + seed(i * 7 + 3) * 480, top: 900 + seed(i * 11 + 4) * 420,
        width: 10, height: 10, borderRadius: "50%", background: "rgba(255,250,214,0.98)",
        boxShadow: "0 0 20px rgba(255,240,180,0.95)",
      }} />
    ))}
  </>
);

export const Cover52A: React.FC = () => (
  <SceneCover
    scene={<PokeScene />}
    line1={<>BUILD YOUR OWN</>}
    giant={<>FABLE <span style={{ color: CLAY }}>6</span></>}
  />
);

/* ---------- HERMES — the archive hall ----------
   ⚠️ No reel is built for this yet — only HERMES.m4a (Alex VO, 2026-07-15).
   Copy from that transcript: "Claude is a goldfish, it forgets everything the
   second you close the chat… gives your AI a real memory."
   A one-point-perspective hall of scrolls is what "real memory" LOOKS like —
   and it shares no silhouette with the other two covers. */

const HermesScene: React.FC = () => {
  /* v1 was a one-point-perspective hall. Two problems, both fatal:
     the near columns are TALL by construction, so they punched straight through
     the header quiet zone; and beige marble on a beige sky left the hero with no
     contrast. Rebuilt as an open-air ARCHIVE FACADE: warm sky owns the top band
     (calm, per HEADER_QUIET), the architecture starts at 800, and the scroll
     niches are lit so the wall reads dark-warm against the pale sky. */
  const WALL_TOP = 800, STEP_TOP = 1330, FLOOR_TOP = 1452;
  const niches = [0, 1, 2, 3, 4, 5, 6];
  return (
    <>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,#FBEEDA 0%,#F6DDB4 30%,#EFC894 54%,#E0AE78 72%,#C98F5E 100%)" }} />
      <Bloom x={540} y={880} r={520} c="rgba(255,240,196,0.95)" />
      {/* a low sun sitting just above the wall */}
      <div style={{ position: "absolute", left: 424, top: 700, width: 232, height: 232, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,250,226,1) 0%, rgba(255,238,182,0.7) 46%, rgba(255,232,170,0) 74%)" }} />

      {/* ---- the archive facade ---- */}
      <div style={{ position: "absolute", left: 0, right: 0, top: WALL_TOP, height: STEP_TOP - WALL_TOP, background: "linear-gradient(180deg,#6E5336 0%,#4E3A24 62%,#3C2C1B 100%)" }} />
      <div style={{ position: "absolute", left: 0, right: 0, top: WALL_TOP, height: 26, background: "linear-gradient(180deg,#F6EAD2,#C9B48C)" }} />
      <div style={{ position: "absolute", left: 0, right: 0, top: WALL_TOP + 26, height: 12, background: "rgba(0,0,0,0.32)" }} />

      {/* lit niches of scrolls — the memory itself */}
      {niches.map((n) => {
        const w = 128, gap = 22, total = niches.length * w + (niches.length - 1) * gap;
        const x = 540 - total / 2 + n * (w + gap);
        return (
          <div key={n} style={{ position: "absolute", left: x, top: WALL_TOP + 62, width: w, height: 232, borderRadius: "64px 64px 6px 6px", background: "linear-gradient(180deg,#241A10,#120C07)", boxShadow: "inset 0 0 26px rgba(0,0,0,0.75)", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 72%, rgba(255,214,132,0.5) 0%, rgba(255,200,110,0) 70%)" }} />
            {[0, 1, 2].map((r) => (
              <div key={r} style={{ position: "absolute", left: 14, right: 14, top: 78 + r * 50, height: 34, display: "flex", gap: 5 }}>
                {[0, 1, 2].map((c2) => (
                  <div key={c2} style={{ flex: 1, borderRadius: 3, background: "linear-gradient(180deg,#FCF0D4,#DDBE86)", boxShadow: "0 0 16px rgba(255,222,150,0.9)" }} />
                ))}
              </div>
            ))}
            <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 66, borderRadius: "64px 64px 0 0", border: "4px solid rgba(246,234,210,0.5)", borderBottom: "none" }} />
          </div>
        );
      })}

      {/* flanking columns, entirely below the quiet zone */}
      {[16, 984].map((x, i) => (
        <div key={i} style={{ position: "absolute", left: x, top: WALL_TOP + 14, width: 80, height: STEP_TOP - WALL_TOP - 14, background: "linear-gradient(90deg,#FBF4E4,#D8C7A4 58%,#AE9A76)" }}>
          <div style={{ position: "absolute", left: -12, right: -12, top: -18, height: 22, background: "#FEF8EA" }} />
          {[16, 32, 48, 64].map((fx, j) => <div key={j} style={{ position: "absolute", left: fx, top: 10, width: 4, bottom: 10, background: "rgba(120,102,74,0.3)" }} />)}
        </div>
      ))}

      {/* steps + floor */}
      <div style={{ position: "absolute", left: 60, right: 60, top: STEP_TOP, height: 40, background: "#E2D2B0" }} />
      <div style={{ position: "absolute", left: 24, right: 24, top: STEP_TOP + 40, height: 42, background: "#CDBB96" }} />
      <div style={{ position: "absolute", left: 0, right: 0, top: STEP_TOP + 82, height: 40, background: "#B9A47E" }} />
      <div style={{ position: "absolute", left: 0, right: 0, top: FLOOR_TOP, height: 1920 - FLOOR_TOP, background: "linear-gradient(180deg,#A8906A,#8A7454)" }} />

      {/* ⭐ The other two covers have a VERB — Claude hits a block, a ball bursts
          open. v2 Hermes just stood there. The scrolls now STREAM IN and converge
          on Claude: "after every job it saves what worked, then loads it all back
          before the next one." Each carries a light trail aimed at the head. */}
      {[
        [150, 1000, 0.60, -26], [286, 940, 0.72, -18], [828, 1020, 0.64, 24],
        [712, 946, 0.76, 16], [206, 1216, 0.92, -14], [790, 1250, 0.98, 13],
      ].map(([x, y, s, rot], i) => {
        const cx = (x as number) + 56 * (s as number), cy = (y as number) + 18 * (s as number);
        const dx = 540 - cx, dy = 1196 - cy;
        const len = Math.sqrt(dx * dx + dy * dy);
        const ang = (Math.atan2(dy, dx) * 180) / Math.PI;
        return (
          <React.Fragment key={i}>
            {/* the trail, pointing at Claude */}
            <div style={{
              position: "absolute", left: cx, top: cy, width: len * 0.66, height: 7 * (s as number),
              transformOrigin: "0 50%", transform: `rotate(${ang}deg)`,
              background: "linear-gradient(90deg, rgba(255,226,150,0.75), rgba(255,226,150,0))",
              borderRadius: 999, zIndex: 15,
            }} />
            {/* ⛔ These were landscape capsules with rolled end caps, which read as
                COTTON SWABS being thrown at Claude. Portrait PAGES with ruled lines
                and a folded corner read as documents instantly — the shape carries
                the meaning, the styling cannot rescue a wrong silhouette. */}
            <div style={{
              position: "absolute", left: x as number, top: y as number,
              width: 74 * (s as number), height: 96 * (s as number), borderRadius: 4,
              transform: `rotate(${rot}deg)`,
              background: "linear-gradient(160deg,#FFFBF0 0%,#F3E6C9 62%,#E2CFA4 100%)",
              boxShadow: `0 0 ${34 * (s as number)}px rgba(255,226,150,0.95), 0 10px 16px rgba(60,40,18,0.42)`,
              zIndex: 16,
            }}>
              {[16, 30, 44, 58, 72].map((ly, j) => (
                <div key={j} style={{
                  position: "absolute", left: 11 * (s as number),
                  right: (j === 4 ? 30 : 11) * (s as number),
                  top: ly * (s as number), height: 4 * (s as number),
                  background: "rgba(122,98,58,0.42)", borderRadius: 2,
                }} />
              ))}
              {/* folded corner */}
              <div style={{
                position: "absolute", right: 0, top: 0, width: 20 * (s as number), height: 20 * (s as number),
                background: "linear-gradient(225deg,#D8C296 50%,rgba(0,0,0,0) 50%)",
              }} />
            </div>
          </React.Fragment>
        );
      })}

      {/* Claude on the steps, lit against the dark archive */}
      <Bloom x={540} y={1290} r={250} c="rgba(255,232,170,0.75)" />
      <div style={{
        position: "absolute", left: 540, top: 1408, width: 400, height: 40,
        transform: "translateX(-50%)", borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(60,40,18,0.55), transparent 72%)", filter: "blur(9px)", zIndex: 18,
      }} />
      <div style={{ position: "absolute", left: 540, top: 1140, transform: "translateX(-50%)", zIndex: 20 }}>
        <HouseMascot lf={24} size={300} greek={1} cheer={0.4} />
      </div>

      {/* motes in the low sun */}
      {Array.from({ length: 18 }).map((_, i) => (
        <div key={i} style={{
          position: "absolute", left: 120 + seed(i * 9 + 5) * 840, top: 840 + seed(i * 13 + 6) * 540,
          width: 8, height: 8, borderRadius: "50%", background: "rgba(255,248,220,0.95)",
          boxShadow: "0 0 18px rgba(255,238,180,0.95)", zIndex: 22,
        }} />
      ))}
    </>
  );
};


export const CoverHermes: React.FC = () => (
  <SceneCover
    scene={<HermesScene />}
    line1={<>GIVE CLAUDE <span style={{ color: CLAY }}>REAL</span></>}
    giant={<>MEMORY</>}
  />
);

/* ==========================================================================
   DIRECTION B — "THE OPEN BALL"
   Full-dark, maximum contrast, one silhouette. Reads hardest at 130px because
   a bright burst on near-black survives any amount of downscaling. Speaks the
   C1 dark-panel language instead of C5.
   ========================================================================== */

export const Cover52B: React.FC = () => (
  <AbsoluteFill style={{ background: grad(TERM, TERM2) }}>
    <div style={{ position: "absolute", inset: 0, background: grad("#141F3A", "#080D18") }} />
    <GodRay x={300} w={300} h={1920} deg={12} c="rgba(231,178,76,0.10)" />
    <GodRay x={760} w={250} h={1920} deg={-10} c="rgba(210,114,78,0.10)" />
    <Bloom x={540} y={1010} r={520} c="rgba(231,178,76,0.34)" />
    <Dust n={34} w={1080} h={1920} c="rgba(234,217,164,0.44)" s={7} />

    {/* ---------- headline block ----------
        v1 put the NOT RELEASED stamp ACROSS the headline and destroyed both.
        The stamp now sits in its own band underneath — no overlap. */}
    <Giant top={430} size={78} c={STAR}>BUILD YOUR OWN</Giant>
    <Giant top={510} size={158} c={STAR}>
      FABLE <span style={{ color: GOLD }}>6</span>
    </Giant>

    <div style={{ position: "absolute", left: 0, right: 0, top: 690, display: "flex", justifyContent: "center" }}>
      <div style={{
        transform: "rotate(-4.5deg)",
        padding: "10px 28px", border: "5px solid #C44A3A", borderRadius: 10,
        fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 38,
        letterSpacing: "0.12em", color: "#F0705A",
        background: "rgba(196,74,58,0.16)",
        boxShadow: "0 0 44px rgba(196,74,58,0.34)",
      }}>NOT RELEASED</div>
    </div>

    {/* ---------- the hero: one giant, unmistakable silhouette ----------
        The ball was the ONE element that survived the 130px downscale in v1,
        so it becomes the hero outright. Claude stands in FRONT of it (v1
        stacked them and it read as a snowman). */}
    {/* burst behind, centred on the ball */}
    <div style={{ position: "absolute", left: 540, top: 1000, width: 0, height: 0 }}>
      {Array.from({ length: 24 }).map((_, i) => (
        <div key={i} style={{
          position: "absolute", left: 0, top: 0, width: 660, height: 30,
          transformOrigin: "0 50%", transform: `rotate(${i * 15}deg) translateY(-15px)`,
          background: `linear-gradient(90deg, rgba(255,236,180,${0.46 - (i % 3) * 0.10}), rgba(255,236,180,0))`,
        }} />
      ))}
    </div>
    <Bloom x={540} y={1000} r={330} c="rgba(255,240,196,0.72)" />

    {/* ground the whole scene sits on */}
    <div style={{
      position: "absolute", left: 150, right: 150, top: 1252, height: 3,
      background: "linear-gradient(90deg, transparent, rgba(234,217,164,0.44), transparent)",
    }} />

    {/* the ball */}
    <Pokeball x={340} y={800} sz={400} />

    {/* contact shadow — WIDER than the sprite or it reads as invisible */}
    <div style={{
      position: "absolute", left: 365, top: 1238, width: 350, height: 38,
      borderRadius: "50%",
      background: "radial-gradient(ellipse, rgba(0,0,0,0.78), transparent 72%)",
      filter: "blur(8px)", zIndex: 12,
    }} />

    {/* Claude, in front of the ball. top = groundline - size*0.92, because the
        Mascot viewBox carries ~8% empty space below the legs. */}
    <div style={{ position: "absolute", left: 540, top: 1036, transform: "translateX(-50%)", zIndex: 16 }}>
      <PkMascot lf={26} size={235} trainer={1} cheer={0.7} />
    </div>

    {/* the pill answers "how?" — it must NOT repeat the headline's verb */}
    <Pill top={1330} bg={grad(GOLD, "#C89232")} fg="#2E2108">WITH TODAY&rsquo;S CLAUDE</Pill>

    <Handle top={1466} c="#7C90B4" />
    <div style={{ position: "absolute", left: 540, top: 1536, transform: "translateX(-50%)" }}>
      <ClaudeLogo size={40} color="#8AA0C6" />
    </div>
  </AbsoluteFill>
);

/* ==========================================================================
   CROP-PROOF OVERLAY — review only, never delivered.
   Draws the 4:5 and 1:1 crop lines over a cover so the safe area can be
   verified by eye instead of by arithmetic.
   ========================================================================== */

export const cropProof = (Comp: React.FC): React.FC => () => (
  <AbsoluteFill>
    <Comp />
    <div style={{ position: "absolute", left: 0, right: 0, top: 285, height: 1350, border: "4px dashed rgba(0,200,255,0.85)" }} />
    <div style={{ position: "absolute", left: 0, right: 0, top: SAFE_TOP, height: SAFE_BOT - SAFE_TOP, border: "4px dashed rgba(255,60,120,0.9)" }} />
    <div style={{ position: "absolute", left: 12, top: 292, fontFamily: mono, fontWeight: 700, fontSize: 26, color: "rgba(0,200,255,1)" }}>4:5 GRID TILE</div>
    <div style={{ position: "absolute", left: 12, top: SAFE_TOP + 8, fontFamily: mono, fontWeight: 700, fontSize: 26, color: "rgba(255,60,120,1)" }}>1:1 SAFE</div>
  </AbsoluteFill>
);

export const Cover52AProof = cropProof(Cover52A);
export const Cover52BProof = cropProof(Cover52B);


/* ==========================================================================
   SERIES: "THE BORING MILLION" — EP. 01 (reel 65 TOOL)
   ---------------------------------------------------------------------------
   THE PICTURE: a drab institutional CASE FILE lies tilted 2.5deg across the
   tile. Its flap is covered in black redaction bars. A wedge of gold light
   blasts UP out of the seam between flap and folder, one glowing orange
   app-window levitates out of the gap, and Claude in a deerstalker leans over
   the top edge with a paw gripping the file. Underneath, the payoff: $40K/mo.

   WHY A DOSSIER: the series premise is "unglamorous thing, enormous money".
   A case file IS the boring object and it is also the mystery object — there
   is something inside and this tile is the lid. The lockup carries the same
   joke in type: BORING is flat grey, MILLION is struck gold.

   ---------------------------------------------------------------------------
   FIXED SERIES FRAME (byte-identical across EP01..EP04):
     background stack + vignette + Dust + PaperGrain + Bloom
     TBM_Lockup at top 436 · hairline at 534
     the whole TBM_CaseFile chassis (panel, tab, flap, seam, edges, the 2.5deg
     rotation, the contact shadow) · the light source · PkMascot sherlock at
     x610/top552/size366 plus the gripping paw · the CLASSIFIED stamp box ·
     the claim SLOT (top 1284, Fraunces 900 @168) · the two bleed lines ·
     and the layout law itself (3 bands, load-bearing content inside 420..1500).

   PER-EPISODE HERO (six edits, nothing else):
     (a) the EXHIBIT object in the 200x200 slot at cx460/cy810.
         HARD CONTRACT: fits the box · is the single most saturated thing on
         the tile · carries exactly one bright point · breaks the folder's top
         silhouette by >=30px · tucks >=10px behind the flap.
     (b) the tab numeral   (c) the flap label   (d) the un-redacted gold line
     (e) the claim string  (f) redaction bar widths, reseeded per episode.

   The fixed parts are all SHAPE and POSITION (what reads at 130px, what builds
   series recognition); the variable parts are all CONTENT (what only resolves
   on a tap). The grid reads as one series from across the room and four
   different stories up close.

   ---------------------------------------------------------------------------
   BAND TABLE (ink-inclusive; Fraunces 900 ink taken as 1.25x fontSize)
     B1 LOCKUP  Fraunces 900 @60          top 436   ink  430..514
     B2 RULE    hairline 3px              top 534   ink  534..537
     B3 HERO    case file + light + Claude          ink  552..1246
     B4 CLAIM   "$40K/mo" Fraunces 900 @168 top 1284 ink 1264..1474
     B5 BLEED   "FROM ONE FEATURE" @34    top 1510  (outside 1:1, carries nothing)
     B6 BLEED   @NOCODEALEX mono @30      top 1572  (outside 1:1, carries nothing)
   DISJOINTNESS: 514<534 · 537<552 · 1246<1264 · 1474<1510 · 1546<1572.
   Minimum clearance 15px. No two bands share a single y.
   SAFE BAND: B1..B4 all inside 420..1500 (top margin 10, bottom margin 26).

   130px READ: pale FILE block · GOLD light bursting out of it · the ORANGE
   EXHIBIT breaking the top silhouette · "$40K/mo" · Claude's deerstalker ·
   the REDACTION BARS (solid max-contrast blocks are the one class of small
   detail that survives a downscale, and they do the mystery work).
   ========================================================================== */

const TBM_PIVOT = "545px 986px";
const TBM_TILT = "rotate(2.5deg)";

/* every rotated layer of the file shares ONE pivot, so the parts stay welded
   together while each keeps its own z. Children are positioned in canvas
   coordinates, unrotated — the wrapper applies the tilt. */
const TBM_Tilt: React.FC<{ z: number; children: React.ReactNode }> = ({ z, children }) => (
  <div style={{ position: "absolute", inset: 0, transform: TBM_TILT, transformOrigin: TBM_PIVOT, zIndex: z }}>
    {children}
  </div>
);

const TBM_Lockup: React.FC<{ top: number; dark?: boolean }> = ({ top, dark = false }) => (
  <div style={{ position: "absolute", left: 0, right: 0, top, textAlign: "center", whiteSpace: "nowrap", zIndex: 40 }}>
    <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 70, letterSpacing: "-0.02em",
      color: dark ? "#96A2B8" : "#9A968B" }}>THE BORING </span>
    <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 70, letterSpacing: "-0.02em",
      backgroundImage: "linear-gradient(178deg,#FFF3C4 0%,#F2CC55 40%,#D69A22 100%)",
      WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent",
      filter: "drop-shadow(0 2px 0 rgba(120,80,10,0.35))" }}>MILLION</span>
  </div>
);

/* ---------- THE EXHIBIT — the per-episode object slot ----------
   200x200 at cx460/cy810. Its top 42px break the folder's top edge (which
   sits at 752 at this x) and its bottom tucks 12px behind the flap, so it
   always reads as EMERGING from the file. A shape that breaks a silhouette
   survives downscale; a shape sitting inside one does not.
   The halo is clamped to size*1.2 — an unclamped glow floods the lockup. */
const TBM_Exhibit: React.FC<{ cx: number; cy: number; size?: number }> = ({ cx, cy, size = 200 }) => (
  <>
    <div style={{ position: "absolute", left: cx - size * 0.6, top: cy - size * 0.6, width: size * 1.2, height: size * 1.2,
      borderRadius: "50%", backgroundImage: "radial-gradient(circle, rgba(255,196,120,0.55), rgba(255,196,120,0) 66%)", filter: "blur(14px)" }} />
    {/* SCREW BASE — drawn first so the glass overlaps it. Its bottom tucks
        behind the flap, which is what makes the bulb read as EMERGING. */}
    <div style={{ position: "absolute", left: cx - size * 0.19, top: cy + size * 0.19, width: size * 0.38, height: size * 0.31,
      borderRadius: "6px 6px 10px 10px", backgroundImage: "linear-gradient(180deg,#C3CAD6 0%,#8B93A1 55%,#5E6674 100%)",
      boxShadow: "0 20px 40px -14px rgba(60,40,20,0.7)" }}>
      {[0.12, 0.42, 0.72].map((t, k) => (
        <div key={k} style={{ position: "absolute", left: 0, right: 0, top: `${t * 100}%`, height: size * 0.045,
          backgroundColor: "rgba(40,46,58,0.45)" }} />
      ))}
    </div>
    {/* GLASS — the idea itself. A bulb, not a window: no chrome, no dots. */}
    <div style={{ position: "absolute", left: cx - size * 0.35, top: cy - size / 2, width: size * 0.7, height: size * 0.7,
      boxSizing: "border-box", borderRadius: "50% 50% 44% 44%",
      backgroundImage: "linear-gradient(158deg,#FFEDAE 0%,#F2AE43 46%,#C87C20 100%)",
      boxShadow: "inset 0 6px 0 rgba(255,250,224,0.85), 0 26px 52px -16px rgba(120,70,10,0.75), 0 0 62px rgba(255,196,90,0.65)",
      border: `4px solid #FFF4C8` }}>
      {/* the ONE bright point the contract asks for — the filament */}
      <div style={{ position: "absolute", left: "26%", top: "40%", width: "48%", height: "22%",
        borderRadius: "50% 50% 40% 40%", backgroundImage: "linear-gradient(180deg,#FFFFFF,#FFE07A)",
        boxShadow: "0 0 30px rgba(255,255,255,0.95), 0 0 60px rgba(255,214,120,0.9)" }} />
    </div>
  </>
);

/* ---------- CLAUDE'S GRIPPING PAW ----------
   60px of pixels that convert "a character standing behind a floating folder"
   into "a character holding this file open toward you". Drawn OVER the
   folder's top edge, so it must NOT live inside the tilted wrapper. */
const TBM_Paw: React.FC = () => (
  <div style={{ position: "absolute", left: 648, top: 748, width: 64, height: 40, zIndex: 7 }}>
    {[[0, 2, 20, 34], [22, 0, 20, 38], [44, 4, 20, 32]].map(([x, y, w, h], i) => (
      <React.Fragment key={i}>
        <div style={{ position: "absolute", left: x, top: y, width: w, height: h, borderRadius: 7, backgroundColor: "#D97757",
          boxShadow: "inset 0 3px 0 rgba(255,236,220,0.55)" }} />
        <div style={{ position: "absolute", left: x, top: (y as number) + (h as number) - 7, width: w, height: 7, borderRadius: "0 0 7px 7px", backgroundColor: "#A8512F" }} />
      </React.Fragment>
    ))}
  </div>
);

type TBM_Variant = "dark" | "cream";

type TBM_Ep = {
  ep: string;            // tab numeral
  label: string;         // flap label — names the CLASS
  gold: string;          // the one line left un-redacted
  claim: React.ReactNode;
  n: number;             // seeds the redaction bar widths
  sub: string;
};

/* ---------- THE CASE FILE CHASSIS ---------- */
const TBM_CaseFile: React.FC<{ v: TBM_Variant; ep: TBM_Ep }> = ({ v, ep }) => {
  const dark = v === "dark";
  const panel = dark ? grad("#B3AC97", "#9C9581") : grad("#E4D9BE", "#CFC3A2");
  const flap = dark ? grad("#A69E88", "#8C856F") : grad("#DACEB0", "#C2B694");
  const edge = dark ? "#6E6853" : "#A2977A";
  /* label ink pushed darker than spec: the flap label is the ONLY thing
     carrying the "boring thing" half of the claim, so it needs max separation
     from the manila. */
  const labelC = dark ? "#332F22" : "#3E3A29";
  /* (f) bar widths reseeded per episode so four tiles are not pixel-identical */
  const barA = Math.round(380 + seed(ep.n * 3) * 280);
  const barB = Math.round(380 + seed(ep.n * 7) * 280);
  return (
    <>
      {/* z6 — back panel + tab */}
      <TBM_Tilt z={6}>
        {/* TAB (holds the EP numeral diegetically, so the layout stays 3 bands) */}
        <div style={{ position: "absolute", left: 150, top: 696, width: 190, height: 60, boxSizing: "border-box",
          backgroundImage: panel, border: `4px solid ${edge}`, borderBottom: "none", borderRadius: "12px 12px 0 0",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 12 }}>
          {/* #C9D2E2 is the spec colour and it reads on the DARK tile's greyer
              manila; on the cream tile's brighter manila it disappears, so the
              cream variant takes the flap's own ink instead. */}
          <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 20, letterSpacing: "0.22em",
            color: dark ? "#C9D2E2" : "#6E6853" }}>EP</span>
          <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 44, lineHeight: 1, color: "#F7CF63",
            filter: "drop-shadow(0 2px 0 rgba(80,58,10,0.45))" }}>{ep.ep}</span>
        </div>
        {/* BACK PANEL — deliberately the lowest-saturation object on the tile */}
        <div style={{ position: "absolute", left: 130, top: 756, width: 830, height: 460, boxSizing: "border-box",
          backgroundImage: panel, border: `4px solid ${edge}`, borderRadius: 10,
          boxShadow: "inset 0 6px 0 rgba(255,255,255,0.18)" }} />
      </TBM_Tilt>

      {/* z12 — front flap + everything printed on it */}
      <TBM_Tilt z={12}>
        <div style={{ position: "absolute", left: 130, top: 902, width: 830, height: 314, boxSizing: "border-box",
          backgroundImage: flap, border: `4px solid ${edge}`, borderRadius: 10,
          boxShadow: "0 -14px 30px -10px rgba(0,0,0,0.5), inset 0 5px 0 rgba(255,255,255,0.22)" }} />

        {/* the hot line where the light is born (896..916) */}
        <div style={{ position: "absolute", left: 180, top: 896, width: 730, height: 20, borderRadius: 10,
          backgroundImage: "linear-gradient(90deg, rgba(255,214,120,0) 0%, rgba(255,236,180,0.95) 32%, rgba(255,246,210,1) 50%, rgba(255,236,180,0.95) 68%, rgba(255,214,120,0) 100%)",
          boxShadow: "0 0 30px rgba(255,206,110,0.8)" }} />

        {/* paperclip — its own x lane, right of the light */}
        <div style={{ position: "absolute", left: 830, top: 880, width: 60, height: 60 }}>
          <div style={{ position: "absolute", left: 8, top: 0, width: 40, height: 58, borderRadius: 20,
            border: "6px solid #9AA3AF", boxSizing: "border-box" }} />
          <div style={{ position: "absolute", left: 18, top: 12, width: 20, height: 40, borderRadius: 12,
            border: "6px solid #7E8794", boxSizing: "border-box" }} />
        </div>

        {/* (c) LABEL — names the CLASS (934..968) */}
        <div style={{ position: "absolute", left: 176, top: 930, fontFamily: mono, fontWeight: 800, fontSize: 36,
          letterSpacing: "0.08em", color: labelC, lineHeight: "40px" }}>{ep.label}</div>

        {/* REDACTION BARS — hide the INSTANCE (988..1020, 1032..1064).
            Solid max-contrast blocks: the one class of small detail that
            survives the 130px downscale, and they carry the mystery. */}
        <div style={{ position: "absolute", left: 176, top: 988, width: barA, height: 32, borderRadius: 3, backgroundColor: "#14161C" }} />
        <div style={{ position: "absolute", left: 176, top: 1032, width: barB, height: 32, borderRadius: 3, backgroundColor: "#14161C" }} />

        {/* (d) the ONE line left un-redacted (1078..1112) */}
        <div style={{ position: "absolute", left: 176, top: 1078, fontFamily: mono, fontWeight: 700, fontSize: 30,
          letterSpacing: "0.1em", color: "#F7CF63", lineHeight: "34px",
          textShadow: "0 2px 0 rgba(80,58,10,0.5)" }}>{ep.gold}</div>

        {/* CLASSIFIED stamp — w300 h46 at -7deg, so its ROTATED extent is
            1126..1208 (150*sin7 = 18.3 folded in on each side) */}
        <div style={{ position: "absolute", left: 580, top: 1144, width: 300, height: 46, boxSizing: "border-box",
          transform: "rotate(-7deg)", border: "5px solid #C44A3A", borderRadius: 8,
          backgroundColor: "rgba(196,74,58,0.14)", display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 26, letterSpacing: "0.12em", color: "#F0705A" }}>CLASSIFIED</div>
      </TBM_Tilt>
    </>
  );
};

/* ---------- THE SHARED COVER ---------- */
const TBM_CaseCover: React.FC<{ v: TBM_Variant; ep: TBM_Ep; exhibit?: React.ReactNode }> = ({ v, ep, exhibit }) => {
  const dark = v === "dark";
  return (
    <AbsoluteFill style={{
      backgroundColor: dark ? "#06080C" : CREAM,
      backgroundImage: dark ? "linear-gradient(168deg,#0C1018 0%,#05070B 58%,#0B0810 100%)" : undefined,
    }}>
      {!dark && <CreamBg />}
      <Bloom
        x={dark ? 460 : 380}
        y={dark ? 880 : 760}
        r={dark ? 380 : 520}
        c={dark ? "rgba(255,196,120,0.42)" : "rgba(232,163,127,0.30)"}
      />
      <Dust n={24} w={1080} h={1920} c={dark ? "rgba(234,217,164,0.40)" : "rgba(120,100,80,0.28)"} s={5} />

      {/* ---------- B1 LOCKUP (430..514) ---------- */}
      <TBM_Lockup top={404} dark={dark} />

      {/* ---------- B2 HAIRLINE (534..537) ---------- */}
      <div style={{ position: "absolute", left: 300, right: 290, top: 516, height: 3, zIndex: 40,
        backgroundColor: dark ? "rgba(247,207,99,0.18)" : "rgba(160,140,90,0.22)" }} />

      {/* ================= B3 HERO (552..1246) ================= */}
      {/* ⛔ FEED-TILE EDGE INSET (Alex: "not like too much on the edges"). Measured on the previous
          render the hero ran to x121..968 on dark and x70..1010 on cream — 70px of margin on a
          1080 tile reads cramped in the grid. The hero stack is scaled about its own centre so the
          widest element lands ~145px from each edge. The lockup and the claim are NOT in this group:
          they already carry 190px+ margins and the claim must not shrink, it is the 130px read. */}
      <div style={{ position: "absolute", inset: 0, transform: `translateY(-20px) scale(${dark ? 0.90 : 0.82})`,
        transformOrigin: "540px 900px" }}>

      {/* z1 — DESK MAT (cream only). The manila file has almost no separation
          on cream, so it needs something to sit ON; the slab is also what
          carries the "boring" read at 130px (office furniture, not a dossier).
          Ends at 1244, NOT 1270, or it would collide with the claim's ink. */}
      {!dark && (
        <div style={{ position: "absolute", left: 70, top: 700, width: 940, height: 544, borderRadius: 18, zIndex: 1,
          backgroundImage: grad("#3C4353", "#252B38"),
          boxShadow: "inset 0 3px 0 rgba(255,255,255,0.08), 0 30px 60px -20px rgba(60,50,40,0.45)" }} />
      )}

      {/* z2 — the folder's contact shadow. WIDER than the object it grounds
          (940 or 980 against the folder's 830) or it is invisible. */}
      <div style={{
        position: "absolute", left: dark ? 70 : 50, top: dark ? 1212 : 1206,
        width: dark ? 940 : 980, height: 34, borderRadius: "50%", zIndex: 2,
        background: dark
          ? "radial-gradient(ellipse, rgba(0,0,0,0.80), rgba(0,0,0,0) 72%)"
          : "radial-gradient(ellipse, rgba(90,70,50,0.55), rgba(90,70,50,0) 72%)",
        filter: "blur(10px)",
      }} />

      {/* z3 — CREAM ONLY: a crisp lamp pool. A soft gradient on a light ground
          reads as a smudge, so this one gets a defined edge. */}
      {!dark && (
        <div style={{ position: "absolute", left: 90, top: 690, width: 680, height: 420, borderRadius: "50%", zIndex: 3,
          background: "radial-gradient(ellipse, rgba(255,226,164,0.55), rgba(255,226,164,0) 70%)", filter: "blur(14px)" }} />
      )}

      {/* z4 — CLAUDE, behind the file. Visible 552..767 (59% of him): full
          deerstalker, head, shoulders, cape. The 0.92 grounding law is
          deliberately NOT applied — his base is 100% occluded, so there is no
          groundline and no snowman risk. The folder's top edge is his implied
          support and the paw makes it explicit. */}
      {/* Alex: "we dont see the claude sprites signature". At 366/top590 only ~48% cleared the
          folder edge and at 130px it read as a small brown building, not as Claude. Enlarged to 400
          and raised to 505 so ~65% shows (deerstalker + full head + shoulders), and pulled left off
          the frame edge. Spans x 560..960 and y 505..905 — both inside the 1:1 band. */}
      <div style={{ position: "absolute", left: 560, top: 552, zIndex: 4 }}>
        <PkMascot lf={22} size={400} sherlock={1} stern={0.55} gaze={-0.55} nodAmp={0} />
      </div>

      <TBM_CaseFile v={v} ep={ep} />
      <TBM_Paw />

      {/* z8 — THE LIGHT.
          DARK: one volumetric cone. A clipPath on an AXIS-ALIGNED div, never a
          rotate, so its bounding box is exactly 250..700 x 566..898 — 29px
          below the hairline and 14px inside the hero band.
          CREAM: 12 hard-edged drawn rays instead, because a blurred cone on a
          light ground reads as a smudge rather than as light. */}
      {dark ? (
        <div style={{
          position: "absolute", left: 250, top: 566, width: 450, height: 332, zIndex: 8,
          clipPath: "polygon(0% 0%, 100% 0%, 68.9% 100%, 33.3% 100%)",
          backgroundImage: "linear-gradient(0deg, rgba(255,214,120,0.55) 0%, rgba(255,206,110,0.20) 55%, rgba(255,196,100,0) 100%)",
          filter: "blur(8px)",
        }} />
      ) : (
        <div style={{ position: "absolute", left: 460, top: 880, width: 0, height: 0, zIndex: 8 }}>
          {Array.from({ length: 12 }).map((_, i) => {
            const a = -105 - i * 5.45;
            return (
              <div key={i} style={{
                position: "absolute", left: 0, top: -14, width: 320, height: 28,
                transformOrigin: "0 50%", transform: `rotate(${a}deg)`,
                clipPath: "polygon(0% 34%, 100% 0%, 100% 100%, 0% 66%)",
                /* hard LATERAL edges (that is the point on cream) but a falloff
                   along the ray — a flat-fill wedge reads as a paper fan, and
                   the far tips would wash across the folder tab's lane. */
                backgroundImage: `linear-gradient(90deg, rgba(214,150,60,${[0.30, 0.22, 0.14][i % 3]}) 0%, rgba(214,150,60,0) 100%)`,
              }} />
            );
          })}
        </div>
      )}

      {/* z10 — (a) THE PER-EPISODE EXHIBIT */}
      <div style={{ position: "absolute", inset: 0, zIndex: 10 }}>
        {exhibit ?? <TBM_Exhibit cx={460} cy={810} size={200} />}
      </div>

      {/* ---------- B4 CLAIM (1264..1474) ---------- */}
      </div>

      <Giant top={1226} size={158} c={dark ? "#F7CF63" : INK}>{ep.claim}</Giant>

      {/* ---------- B5 / B6 DECLARED BLEED (outside the 1:1 crop) ----------
          Nothing depends on these. The memory is explicit that a small eyebrow
          does no work at 130px, and the claim at 168 is the one element that
          must not shrink to make room for it. */}
      {/* Alex: "the bottom should explain what it is". Was a 34px grey bleed line OUTSIDE the 1:1
          crop, so on a tile it both whispered and got cut. Now 48px, brighter, and inside the safe
          band at 1420..1480 so it survives the crop. This is the per-episode explainer slot. */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 1420, textAlign: "center", zIndex: 40,
        fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 48, letterSpacing: "0.14em",
        color: dark ? "#C3CEE2" : "#6B675C" }}>{ep.sub}</div>
      <Handle top={1536} c={dark ? "#5C6B84" : "#6B675C"} />

      {dark && <div style={{ position: "absolute", inset: 0, zIndex: 45, pointerEvents: "none",
        boxShadow: "inset 0 0 320px rgba(0,0,0,0.75)" }} />}
      <PaperGrain />
    </AbsoluteFill>
  );
};

/* ---------- EP 01 · reel 65 TOOL ----------
   Three numbers, three jobs, no repeats:
     flap label = the boring incumbent ($30/mo app)
     gold line  = the partially-revealed method (RESOLD AT $9)
     claim      = the payoff ($40K/mo)                                        */
const TBM_EP01: TBM_Ep = {
  ep: "01",
  sub: "FROM ONE BORING APP",
  label: "SUBJECT: THE $30/MO APP",
  gold: "RESOLD AT $9",
  claim: <>$40K<span style={{ fontSize: 76, letterSpacing: 0 }}>/mo</span></>,
  n: 1,
};

/* ---------- A · DARK — "CASE FILE 01" (the primary) ----------
   Black ground + a gold burst is the hardest-hitting tile at 130px: a bright
   burst on near-black survives any amount of downscaling. */
export const Cover65A: React.FC = () => <TBM_CaseCover v="dark" ep={TBM_EP01} />;

/* ---------- B · CREAM — "THE DESK, 9:12PM" (the alternate) ----------
   Same file, opposite register: it is now sitting on a lamplit desk at night.
   Cream keeps grid cohesion with the cream carousels — that is the real A/B
   tradeoff. Same chassis, same band table, one `variant`: switching later
   costs nothing. The one palette change that must NOT be reverted is the
   claim: gold-on-cream loses too much contrast at 130px, so it goes to INK. */
export const Cover65B: React.FC = () => (
  <TBM_CaseCover v="cream" ep={{ ...TBM_EP01, claim: <>$40K<span style={{ fontSize: 76, letterSpacing: 0, color: CLAY }}>/mo</span></> }} />
);

export const Cover65AProof = cropProof(Cover65A);
export const Cover65BProof = cropProof(Cover65B);
