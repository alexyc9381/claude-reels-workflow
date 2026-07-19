import React from "react";
import { fraunces, inter } from "./fonts";
import { CLAY, INK, mono, seed, Bloom, Dust, Mascot as HouseMascot } from "./CarouselConcepts";
import { Mascot as PkMascot } from "./ClaudePokeballReel";
import { SceneCover, cropProof } from "./ReelCovers";

/* ==========================================================================
   REEL GRID COVERS, SET 2 — 1080x1920, composed for the 4:5 grid tile.
   ---------------------------------------------------------------------------
   Lives in its OWN file because ReelCovers.tsx has a concurrent editor; keeping
   these here means neither session clobbers the other. The header slot is NOT
   duplicated — SceneCover and Giant are imported from ReelCovers.tsx so there
   is exactly ONE definition of where the type sits. That is the whole point of
   the ask: identical placement on every cover.

   House rules these scenes are built to:
     - header quiet zone: nothing structural above y=780
     - safe area: everything meaningful in y 800..1500 (tile crop is 285..1635)
     - light/warm palette only, one hero, a visible verb, 4+ depth layers
     - copy is the promise formula: line1 78px / giant 158px, clay on the
       entice word. Giants are capped at 9 characters, because a 10-character
       word wraps at 158px and breaks the locked slot.
   Premises are taken from Alex's own VO recordings in ~/Downloads.
   ========================================================================== */


/* ---------- OS ----------
   Agentic OS. A week of work overnight, but only once it has EARNED the right:
   every job graded pass/fail, 20 passes at 95% and it runs alone. CTA OS.
   No reel is built for this yet - VO only (OS.m4a). */

/* ==========================================================================
   OS — "A WEEK OF WORK / OVERNIGHT"
   The night-shift operations room, seen at dawn. The premise is that Claude
   does not get trusted, it EARNS trust: every job is graded pass/fail, and
   twenty clean passes at a 95% record buys the right to run unsupervised.
   So the artifact on screen is a LEDGER, not a dashboard — a scoreboard of
   pass tiles with a threshold meter, and the twentieth tile is landing right
   now. Claude stands beside it in a suit: the shift is over, the record holds.

   GEOMETRY CONTRACT
     header quiet zone   y <  780   sky gradient / radial glow / sun ONLY
     topmost geometry    y =  862   (tallest skyline tower)
     horizon             y = 1180
     board               y  940..1372  (+ stand to 1420)   x   40..672
     rack                y 1080..1440                      x  700..1044
     hero feet           y = 1470  (sprite top 1194 + 300*0.92)
     foreground rail     y = 1556
   The board sits LEFT and the hero RIGHT so the 95% readout is never behind
   the sprite, and the rack is the dark aperture that stops a warm mascot from
   dissolving into a warm sky.
   ========================================================================== */

const OsScene: React.FC = () => (
  <>
    {/* ======================================================================
        LAYER 1 · SKY — the only thing permitted above y=780.
        Pure gradient + radial glow + a soft-edged low sun. No geometry, no
        hard edges, nothing for the composited headline to sit on top of.
        ====================================================================== */}
    <div style={{
      position: "absolute", inset: 0,
      background: "linear-gradient(180deg,#FDF5E8 0%,#FBEEDA 14%,#F6DDB4 31%,#EFC894 47%,#E6B589 61%,#D89C6E 78%,#CB8A5F 100%)",
    }} />
    {/* the low dawn sun — a radial falloff with NO rim, so it never reads as a
        shape. Its core sits at y≈918, entirely below the quiet line. */}
    <div style={{
      position: "absolute", left: 700, top: 768, width: 300, height: 300, borderRadius: "50%",
      background: "radial-gradient(circle, rgba(255,251,232,1) 0%, rgba(255,238,184,0.78) 40%, rgba(255,226,158,0) 72%)",
    }} />
    <Bloom x={850} y={930} r={340} c="rgba(255,228,164,0.80)" />
    <Bloom x={286} y={1030} r={380} c="rgba(255,238,198,0.55)" />

    {/* ======================================================================
        LAYER 2 · FAR — the city, still lit from the night shift.
        Base of every tower is at the horizon (1180) so the ground plane
        occludes it: that is what buys the depth read.
        ====================================================================== */}
    {[
      [-24, 128, 1002], [92, 96, 934], [176, 84, 1052], [248, 118, 890],
      [352, 92, 986], [432, 106, 862], [524, 88, 1010], [600, 112, 916],
      [700, 96, 1044], [784, 124, 872], [896, 92, 968], [976, 128, 902],
    ].map(([bx, bw, bt], i) => (
      <div key={i} style={{
        position: "absolute", left: bx, top: bt, width: bw, height: 1180 - bt,
        background: i % 2 ? "#A67F60" : "#94704F",
      }}>
        {/* a cornice so the towers do not read as bare bars */}
        <div style={{ position: "absolute", left: -5, right: -5, top: 0, height: 9, background: i % 2 ? "#B78E6C" : "#A57E5B" }} />
        {/* lit windows — snapped to a grid, deterministically lit */}
        {Array.from({ length: 15 }).map((_, w) => (
          <div key={w} style={{
            position: "absolute",
            left: 10 + Math.floor(seed(i * 31 + w * 7 + 1) * Math.max(1, Math.floor((bw - 26) / 22))) * 22,
            top: 20 + Math.floor(seed(i * 17 + w * 5 + 3) * Math.max(1, Math.floor((1180 - bt - 34) / 30))) * 30,
            width: 12, height: 17,
            background: seed(i * 13 + w * 3 + 5) > 0.44
              ? (seed(i * 5 + w * 11 + 7) > 0.6 ? "#FFF6D8" : "#F0BE58")
              : "#7E5E42",
            boxShadow: seed(i * 13 + w * 3 + 5) > 0.44 ? "0 0 12px rgba(255,214,130,0.85)" : "none",
          }} />
        ))}
      </div>
    ))}

    {/* atmospheric haze that eats the base of the skyline into the ground */}
    <div style={{
      position: "absolute", left: 0, right: 0, top: 1084, height: 96,
      background: "linear-gradient(180deg, rgba(247,222,186,0) 0%, rgba(245,220,182,0.78) 52%, #EFDCBA 100%)",
    }} />

    {/* ======================================================================
        LAYER 3 · GROUND — one SOLID full-width band. Never tiled out of two
        shapes: a seam at dead centre is exactly where the hero stands.
        ====================================================================== */}
    <div style={{
      position: "absolute", left: 0, right: 0, top: 1180, height: 740,
      background: "linear-gradient(180deg,#EFDCBA 0%,#E4CCA0 26%,#D5B98F 58%,#C6A87C 100%)",
    }} />
    {/* deck planks, spaced wider as they come forward = perspective */}
    {[16, 40, 74, 120, 180, 256, 350, 462].map((k, i) => (
      <div key={i} style={{ position: "absolute", left: 0, right: 0, top: 1180 + k, height: 3, background: "#CBAF87" }} />
    ))}

    {/* ======================================================================
        LAYER 4a · THE RACK — the dark aperture behind the hero.
        A warm mascot on a warm sky disappears; this is what it stands against.
        It is also the room: the machines that ran all night.
        ====================================================================== */}
    <div style={{ position: "absolute", left: 872 - 210, top: 1428, width: 420, height: 36, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(74,50,26,0.50), transparent 72%)", filter: "blur(8px)" }} />
    <div style={{
      position: "absolute", left: 700, top: 1080, width: 344, height: 360, borderRadius: 10,
      background: "linear-gradient(180deg,#33455F 0%,#26374E 46%,#1D2C40 100%)",
      boxShadow: "0 22px 44px -14px rgba(50,34,18,0.55)",
    }}>
      {/* sun-side rim light on the top edge — the dawn is behind it */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 5, borderRadius: "10px 10px 0 0", background: "linear-gradient(90deg,#B98A5E,#F2CE9A 62%,#D8A874)" }} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 5, height: 14, background: "#3D5170" }} />
      {[0, 1, 2, 3, 4, 5].map((u) => (
        <div key={u} style={{
          position: "absolute", left: 14, top: 24 + u * 54, width: 316, height: 48, borderRadius: 5,
          background: "linear-gradient(180deg,#3B5070 0%,#2C3F5A 100%)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.14)",
        }}>
          {/* vent grille */}
          {Array.from({ length: 9 }).map((_, g) => (
            <div key={g} style={{ position: "absolute", left: 16 + g * 13, top: 12, width: 5, height: 24, borderRadius: 3, background: "#22334A" }} />
          ))}
          {/* status lamps — kept to the far right so the hero never covers them */}
          <div style={{ position: "absolute", left: 268, top: 19, width: 11, height: 11, borderRadius: "50%", background: "#4FD79B", boxShadow: "0 0 14px rgba(79,215,155,0.95)" }} />
          <div style={{ position: "absolute", left: 290, top: 19, width: 11, height: 11, borderRadius: "50%", background: seed(u * 3 + 2) > 0.55 ? "#E7B24C" : "#3F9E74", boxShadow: "0 0 12px rgba(231,178,76,0.7)" }} />
        </div>
      ))}
    </div>

    {/* ======================================================================
        LAYER 4b · THE GRADING BOARD — the artifact that proves the premise.
        Kept hard LEFT: the 95% readout must never sit behind the sprite.
        ====================================================================== */}
    {/* Splayed A-frame legs + a cross brace, foot at 1420 so the board reads
        BEHIND the hero. ⛔ v1 used a centre post on a wide oval foot and the
        whole artifact read as a DESKTOP MONITOR — the silhouette overrode
        every bit of styling on it. A standing board needs two splayed legs. */}
    <div style={{ position: "absolute", left: 96, top: 1404, width: 520, height: 38, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(74,50,26,0.52), transparent 72%)", filter: "blur(8px)" }} />
    <div style={{ position: "absolute", left: 150, top: 1368, width: 26, height: 56, transformOrigin: "50% 0%", transform: "rotate(-10deg)", background: "linear-gradient(90deg,#33455F,#1B2739)" }} />
    <div style={{ position: "absolute", left: 496, top: 1368, width: 26, height: 56, transformOrigin: "50% 0%", transform: "rotate(10deg)", background: "linear-gradient(90deg,#33455F,#1B2739)" }} />
    <div style={{ position: "absolute", left: 154, top: 1394, width: 364, height: 13, borderRadius: 6, background: "linear-gradient(180deg,#3B5070,#22314A)" }} />
    <div style={{ position: "absolute", left: 122, top: 1414, width: 74, height: 14, borderRadius: 7, background: "#1B2739" }} />
    <div style={{ position: "absolute", left: 478, top: 1414, width: 74, height: 14, borderRadius: 7, background: "#1B2739" }} />

    <div style={{
      position: "absolute", left: 40, top: 940, width: 632, height: 432, borderRadius: 22,
      background: "linear-gradient(180deg,#233150 0%,#1A2438 58%,#141C2E 100%)",
      boxShadow: "0 30px 60px -18px rgba(60,38,18,0.60), inset 0 0 0 3px #37496A",
    }}>
      {/* header strip */}
      <div style={{ position: "absolute", left: 0, top: 0, width: 632, height: 72, borderRadius: "22px 22px 0 0", background: "linear-gradient(180deg,#2E4160,#243350)" }} />
      <div style={{ position: "absolute", left: 0, top: 72, width: 632, height: 3, background: "#3E5478" }} />
      <div style={{
        position: "absolute", left: 32, top: 24, fontFamily: mono, fontWeight: 700, fontSize: 24,
        letterSpacing: "0.14em", color: "#93B4D8",
      }}>OVERNIGHT JOB LEDGER</div>
      <div style={{ position: "absolute", left: 446, top: 30, width: 13, height: 13, borderRadius: "50%", background: "#4FD79B", boxShadow: "0 0 16px rgba(79,215,155,0.95)" }} />
      <div style={{
        position: "absolute", left: 470, top: 24, fontFamily: mono, fontWeight: 800, fontSize: 24,
        letterSpacing: "0.12em", color: "#E7B24C",
      }}>20 / 20</div>

      {/* the number the whole reel is about */}
      <div style={{
        position: "absolute", left: 32, top: 78, fontFamily: fraunces.fontFamily, fontWeight: 900,
        fontSize: 136, lineHeight: 1, letterSpacing: "-0.03em", color: "#E7B24C",
        textShadow: "0 0 46px rgba(231,178,76,0.55)",
      }}>95%</div>

      <div style={{
        position: "absolute", left: 332, top: 116, fontFamily: mono, fontWeight: 700, fontSize: 24,
        letterSpacing: "0.18em", color: "#84A7CB",
      }}>PASS RATE</div>
      <div style={{
        position: "absolute", left: 332, top: 154, display: "inline-flex", alignItems: "center",
        height: 46, padding: "0 22px", borderRadius: 999,
        background: "linear-gradient(180deg,#4AAE81,#3F9E74)",
        fontFamily: mono, fontWeight: 800, fontSize: 24, letterSpacing: "0.06em", color: "#F0FBF5",
        boxShadow: "0 0 28px rgba(63,158,116,0.60)",
      }}>&#10003; RUNS SOLO</div>

      {/* the demotion threshold — drop under 90 and the privilege is revoked */}
      <div style={{
        position: "absolute", left: 496, top: 210, fontFamily: mono, fontWeight: 800, fontSize: 18,
        letterSpacing: "0.14em", color: "#D2724E",
      }}>MIN 90</div>

      {/* threshold meter */}
      <div style={{ position: "absolute", left: 32, top: 236, width: 568, height: 34, borderRadius: 17, background: "#111B2E", boxShadow: "inset 0 0 0 2px #33486A" }} />
      <div style={{
        position: "absolute", left: 32, top: 236, width: 540, height: 34, borderRadius: 17,
        background: "linear-gradient(90deg,#3F9E74 0%,#63C79A 76%,#93E4C0 100%)",
        boxShadow: "0 0 30px rgba(99,199,154,0.70)",
      }} />
      <div style={{ position: "absolute", left: 543, top: 226, width: 5, height: 54, borderRadius: 3, background: "#D2724E" }} />

      {/* 24 slots · 20 graded PASS, 4 still open */}
      {Array.from({ length: 24 }).map((_, t) => (
        <div key={t} style={{
          position: "absolute", left: 33 + (t % 8) * 72, top: 288 + Math.floor(t / 8) * 46,
          width: 62, height: 38, borderRadius: 8,
          background: t < 19 ? "linear-gradient(180deg,#56BC8C 0%,#3F9E74 100%)" : "#16223A",
          boxShadow: t < 19 ? "inset 0 0 0 2px #77D2A9, 0 4px 10px rgba(10,20,34,0.5)" : "inset 0 0 0 2px #33486A",
        }}>
          {t < 19 && (
            <div style={{
              position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 23, color: "#EDFBF4",
            }}>&#10003;</div>
          )}
        </div>
      ))}
    </div>

    {/* ======================================================================
        THE VERB · the twentieth pass is landing right now.
        Slot 19 is drawn empty above; the tile itself is caught mid-drop,
        tilted, glowing, on an impact starburst.
        ====================================================================== */}
    {Array.from({ length: 14 }).map((_, i) => (
      <div key={i} style={{
        position: "absolute", left: 316, top: 1321, width: 84, height: 7,
        transformOrigin: "0 50%", transform: `rotate(${i * (360 / 14)}deg) translateY(-3.5px)`,
        borderRadius: 999, zIndex: 6,
        background: "linear-gradient(90deg, rgba(178,255,214,0.92), rgba(178,255,214,0))",
      }} />
    ))}
    <Bloom x={316} y={1321} r={130} c="rgba(140,244,196,0.55)" />
    <div style={{
      position: "absolute", left: 285, top: 1302, width: 62, height: 38, borderRadius: 8, zIndex: 7,
      transform: "rotate(-6deg)",
      background: "linear-gradient(180deg,#9CF2C6 0%,#43A97C 100%)",
      boxShadow: "inset 0 0 0 3px #CFF9E4, 0 0 46px rgba(120,240,180,0.95), 0 0 96px rgba(90,220,160,0.55)",
    }}>
      <div style={{
        position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 24, color: "#0F3D2A",
      }}>&#10003;</div>
    </div>

    {/* more graded work still inbound — pass chips streaming toward the board */}
    {[[712, 918, 1, 130], [858, 992, 0.82, 110], [988, 1052, 0.68, 92]].map(([cx, cy, s, tl], i) => (
      <React.Fragment key={i}>
        <div style={{
          position: "absolute", left: cx as number, top: cy as number,
          width: tl as number, height: 7 * (s as number),
          transformOrigin: "0 50%", transform: "rotate(-34deg)", borderRadius: 999,
          background: "linear-gradient(90deg, rgba(105,206,158,0.85), rgba(105,206,158,0))",
        }} />
        <div style={{
          position: "absolute", left: (cx as number) - 30 * (s as number), top: (cy as number) - 20 * (s as number),
          width: 60 * (s as number), height: 40 * (s as number), borderRadius: 9,
          transform: `rotate(${-9 + i * 7}deg)`,
          background: "linear-gradient(180deg,#63C79A 0%,#3F9E74 100%)",
          boxShadow: "inset 0 0 0 3px #8ADCB8, 0 0 30px rgba(99,199,154,0.75), 0 8px 16px rgba(60,40,18,0.35)",
        }}>
          <div style={{
            position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 24 * (s as number), color: "#EDFBF4",
          }}>&#10003;</div>
        </div>
      </React.Fragment>
    ))}

    {/* ======================================================================
        LAYER 5 · HERO — Claude in a suit, the shift signed off.
        Sprite 300px at top 1194 ⇒ feet land on 1470 (top + 300*0.92).
        Contact shadow is 400 wide — WIDER than the sprite, or it floats.
        ====================================================================== */}
    <div style={{
      position: "absolute", left: 657, top: 1446, width: 430, height: 50, borderRadius: "50%",
      background: "radial-gradient(ellipse, rgba(64,40,16,0.68), transparent 70%)", filter: "blur(9px)", zIndex: 14,
    }} />
    <div style={{ position: "absolute", left: 722, top: 1194, zIndex: 16 }}>
      <HouseMascot lf={24} size={300} suit={1} cheer={0.35} />
    </div>

    {/* ======================================================================
        LAYER 6 · FOREGROUND — the console rail we are standing behind.
        ====================================================================== */}
    <div style={{
      position: "absolute", left: 0, right: 0, top: 1500, height: 56, zIndex: 20,
      background: "linear-gradient(180deg, rgba(120,78,42,0) 0%, rgba(116,74,40,0.38) 100%)",
    }} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 1556, height: 13, background: "linear-gradient(180deg,#F2D5A6,#D6AC79)", zIndex: 21 }} />
    <div style={{
      position: "absolute", left: 0, right: 0, top: 1569, height: 351, zIndex: 21,
      background: "linear-gradient(180deg,#B98254 0%,#9A6740 46%,#7E5232 100%)",
    }} />
    {[90, 198, 306, 414, 522, 630, 738, 846, 954].map((lx, i) => (
      <div key={i} style={{
        position: "absolute", left: lx, top: 1590, width: 16, height: 16, borderRadius: "50%", zIndex: 22,
        background: i % 3 === 0 ? "#E7B24C" : "#4FD79B",
        boxShadow: i % 3 === 0 ? "0 0 16px rgba(231,178,76,0.9)" : "0 0 16px rgba(79,215,155,0.85)",
      }} />
    ))}
    <div style={{ position: "absolute", left: 0, right: 0, top: 1626, height: 6, background: "#6C4529", zIndex: 22 }} />

    {/* warm motes — clipped so NOTHING is drawn into the header quiet zone */}
    <div style={{ position: "absolute", left: 0, top: 860, width: 1080, height: 1060, overflow: "hidden", zIndex: 24 }}>
      <Dust n={30} w={1080} h={1060} c="rgba(255,240,200,0.85)" s={5} />
    </div>
    {Array.from({ length: 12 }).map((_, i) => (
      <div key={i} style={{
        position: "absolute", left: 120 + seed(i * 9 + 5) * 840, top: 900 + seed(i * 13 + 6) * 480,
        width: 9, height: 9, borderRadius: "50%", background: "rgba(255,248,222,0.96)",
        boxShadow: "0 0 20px rgba(255,236,178,0.95)", zIndex: 25,
      }} />
    ))}
  </>
);

export const CoverOSv2: React.FC = () => (
  <SceneCover
    scene={<OsScene />}
    line1={<>BUILD A CLAUDE</>}
    giant={<>AGENTIC <span style={{ color: CLAY }}>OS</span></>}
    giantSize={130}
  />
);

/* ---------- TAKES ----------
   You have only ever seen Claude's first take. One command runs the job 5 times
   blind, then a 6th agent grades them with the names off. CTA TAKES.
   No reel is built for this yet - VO only (TAKES.m4a). */

/* ==========================================================================
   TAKES — "NEVER SHIP THE / FIRST TAKE"
   Five copies of the same job, written blind, mounted in a row. A sixth agent
   grades them with the names stripped off — so every card carries a REDACTED
   name bar and a letter, never an author. One is under the light: the pick.
   Claude is the judge, centre, mid-gavel-strike.

   GEOMETRY CONTRACT
     header quiet zone   y <  780   sky gradient / radial glow ONLY
     topmost geometry    y =  848   (wall cornice)
     niche recess        y  872..1348   x  56..1024
     panel row (arc)     y  908..1224   tops 936 / 920 / 908 / 920 / 936
     niche sill          y = 1274
     hero feet           y = 1420  (sprite top 1153 + 290*0.92)
     foreground rail     y = 1572
   Two hard problems solved here:
   (1) the sprite is centred, so the CENTRE card is pushed highest and its
       bottom (1170) clears the wig top (1188) — nothing is hidden;
   (2) the winner is card D, deliberately OFF-CENTRE, because anything behind
       a centred mascot is not in the shot at all.
   The recess is dark on purpose: a warm mascot and cream pages both vanish on
   a warm wall, and the spotlight needs somewhere to land.
   ========================================================================== */

const TakesScene: React.FC = () => (
  <>
    {/* ======================================================================
        LAYER 1 · SKY — the only thing permitted above y=780.
        ====================================================================== */}
    <div style={{
      position: "absolute", inset: 0,
      background: "linear-gradient(180deg,#FEF7EB 0%,#FBEEDA 18%,#F8E3C0 36%,#F6DDB4 52%,#EFC894 72%,#E7BB88 100%)",
    }} />
    <Bloom x={540} y={880} r={520} c="rgba(255,240,198,0.92)" />
    <Bloom x={846} y={960} r={330} c="rgba(255,232,172,0.60)" />

    {/* ======================================================================
        LAYER 2 · THE HALL — back wall + cornice. Topmost geometry: y=848.
        ====================================================================== */}
    <div style={{
      position: "absolute", left: 0, right: 0, top: 848, height: 500,
      background: "linear-gradient(180deg,#F5E4C6 0%,#EED8AC 48%,#E3C79B 100%)",
    }} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 848, height: 16, background: "linear-gradient(180deg,#FBF0DA,#DCC094)" }} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 864, height: 8, background: "rgba(88,62,32,0.30)" }} />

    {/* ======================================================================
        LAYER 3 · THE RECESS — the dark aperture. Cream pages pop out of it,
        the gold winner burns in it, and the hero separates from it.
        ====================================================================== */}
    <div style={{
      position: "absolute", left: 56, top: 872, width: 968, height: 476, borderRadius: "34px 34px 0 0",
      background: "linear-gradient(180deg,#F9EDD5 0%,#D9BE93 100%)",
      boxShadow: "0 26px 50px -18px rgba(70,46,20,0.45)",
    }} />
    <div style={{
      position: "absolute", left: 68, top: 884, width: 944, height: 464, borderRadius: "26px 26px 0 0",
      background: "linear-gradient(180deg,#3E2E20 0%,#2F2318 56%,#241A12 100%)",
      overflow: "hidden",
    }}>
      {/* back battens, so the recess has a surface instead of being a hole */}
      {Array.from({ length: 11 }).map((_, i) => (
        <div key={i} style={{ position: "absolute", left: i * 88, top: 0, width: 5, height: 390, background: "#4A3524" }} />
      ))}
      {/* ⛔ v1 ran this at 0.60 over 130px and the recess grew a hard black
          letterbox bar above the cards. Shallower + weaker keeps the depth
          without the bar. */}
      <div style={{ position: "absolute", left: 0, top: 0, width: 944, height: 92, background: "linear-gradient(180deg, rgba(14,9,4,0.42), rgba(14,9,4,0))" }} />
      <div style={{ position: "absolute", left: 0, top: 240, width: 944, height: 150, background: "linear-gradient(180deg, rgba(255,204,128,0) 0%, rgba(255,198,118,0.18) 100%)" }} />
    </div>

    {/* ======================================================================
        THE VERB (1) · the spotlight cone. Drawn BEFORE the cards so it reads
        as light in the air, visible above the winner and pooling below it.
        ====================================================================== */}
    {/* a wide soft halo first, then the hard shaft inside it — one flat cone
        rendered almost invisibly against the recess in v1 */}
    <div style={{
      position: "absolute", left: 548, top: 884, width: 400, height: 464,
      clipPath: "polygon(40% 0%, 60% 0%, 100% 100%, 0% 100%)",
      background: "linear-gradient(180deg, rgba(255,240,190,0.34) 0%, rgba(255,232,168,0.20) 60%, rgba(255,226,152,0.08) 100%)",
      filter: "blur(14px)",
    }} />
    <div style={{
      position: "absolute", left: 604, top: 884, width: 288, height: 464,
      clipPath: "polygon(38.2% 0%, 61.8% 0%, 100% 100%, 0% 100%)",
      background: "linear-gradient(180deg, rgba(255,248,214,0.80) 0%, rgba(255,238,182,0.46) 55%, rgba(255,230,164,0.20) 100%)",
    }} />

    {/* the niche sill the cards stand on */}
    <div style={{ position: "absolute", left: 68, top: 1274, width: 944, height: 74, background: "linear-gradient(180deg,#C9A87A 0%,#AD8A5F 46%,#8E7048 100%)" }} />
    <div style={{ position: "absolute", left: 68, top: 1274, width: 944, height: 11, background: "linear-gradient(180deg,#EBD2A6,#CBAB7E)" }} />
    {/* the pool of light where the cone lands */}
    <div style={{
      position: "absolute", left: 578, top: 1258, width: 340, height: 78, borderRadius: "50%",
      background: "radial-gradient(ellipse, rgba(255,238,180,0.85) 0%, rgba(255,228,156,0.34) 46%, rgba(255,222,148,0) 74%)",
    }} />

    {/* ======================================================================
        LAYER 4 · THE LINE-UP — stands first, cards over the post tops.
        Bases step forward A/E → B/D → C so the row reads as an arc, not a bar.
        ====================================================================== */}
    {[
      [115, 24, 1224, 1316, 96], [332, 22, 1192, 1302, 88], [540, 20, 1170, 1290, 80],
      [748, 22, 1192, 1302, 88], [965, 24, 1224, 1316, 96],
    ].map(([cx, pw, ptop, base, fw], i) => (
      <React.Fragment key={i}>
        <div style={{
          position: "absolute", left: (cx as number) - (pw as number) / 2, top: ptop as number,
          width: pw as number, height: (base as number) - 14 - (ptop as number),
          background: "linear-gradient(90deg,#8A6A46,#6B5133 60%,#543F28)",
        }} />
        <div style={{
          position: "absolute", left: (cx as number) - (fw as number) / 2, top: (base as number) - 14,
          width: fw as number, height: 14, borderRadius: 5,
          background: "linear-gradient(180deg,#9A784F,#5E4630)",
        }} />
      </React.Fragment>
    ))}

    {[
      { k: "A", x: 22, w: 186, y: 936, h: 288, nl: 7, win: false },
      { k: "B", x: 243, w: 178, y: 920, h: 272, nl: 6, win: false },
      { k: "C", x: 455, w: 170, y: 908, h: 262, nl: 6, win: false },
      { k: "D", x: 659, w: 178, y: 920, h: 272, nl: 6, win: true },
      { k: "E", x: 872, w: 186, y: 936, h: 288, nl: 7, win: false },
    ].map((p) => (
      <div key={p.k} style={{
        position: "absolute", left: p.x, top: p.y, width: p.w, height: p.h, borderRadius: 10,
        background: p.win
          ? "linear-gradient(165deg,#FFF7DE 0%,#F6D98E 100%)"
          : "linear-gradient(165deg,#DCD3C0 0%,#C3B8A0 100%)",
        boxShadow: p.win
          ? "inset 0 0 0 5px #E7B24C, 0 0 76px rgba(255,214,120,0.95), 0 0 150px rgba(255,198,88,0.55), 0 20px 36px rgba(34,22,10,0.50)"
          : "inset 0 0 0 3px #A99B82, 0 16px 30px rgba(28,18,8,0.55)",
      }}>
        {/* folded corner — the silhouette is what makes this read DOCUMENT */}
        <div style={{
          position: "absolute", right: 0, top: 0, width: 26, height: 26,
          background: p.win
            ? "linear-gradient(225deg,#DDB973 50%, rgba(0,0,0,0) 50%)"
            : "linear-gradient(225deg,#AEA189 50%, rgba(0,0,0,0) 50%)",
        }} />
        {/* the author's name — struck out. This is the whole "blind" mechanic. */}
        <div style={{ position: "absolute", left: 18, top: 22, width: p.w - 76, height: 20, borderRadius: 3, background: "#2C231A" }} />
        {/* ruled body copy */}
        {Array.from({ length: p.nl }).map((_, l) => (
          <div key={l} style={{
            position: "absolute", left: 18, top: 62 + l * 22,
            width: l === p.nl - 1 ? (p.w - 36) * 0.54 : p.w - 36, height: 5, borderRadius: 3,
            background: p.win ? "rgba(142,106,40,0.60)" : "rgba(92,78,56,0.52)",
          }} />
        ))}
        {/* a letter, never a name */}
        <div style={{
          position: "absolute", left: (p.w - 52) / 2, top: p.h - 50, width: 52, height: 36, borderRadius: 7,
          background: p.win ? "linear-gradient(180deg,#4AAE81,#3F9E74)" : "#2C231A",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: mono, fontWeight: 800, fontSize: 24, letterSpacing: "0.08em", color: "#F2ECDE",
        }}>{p.k}</div>
      </div>
    ))}

    {/* the pick, marked — straddling D's corner so it cannot be mistaken */}
    <div style={{
      position: "absolute", left: 782, top: 1142, width: 76, height: 76, borderRadius: "50%",
      background: "linear-gradient(180deg,#4AAE81,#3F9E74)",
      boxShadow: "inset 0 0 0 6px #F4EEE0, 0 0 48px rgba(79,200,150,0.90), 0 10px 22px rgba(30,20,8,0.50)",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 40, color: "#F6FCF8", zIndex: 8,
    }}>&#10003;</div>

    {/* ======================================================================
        THE VERB (2) · the gavel comes down. The burst is centred on the gavel
        head at (660,1226) — computed from the sprite, not eyeballed — and is
        drawn UNDER the hero so it blooms out from behind the mallet.
        ====================================================================== */}
    {Array.from({ length: 16 }).map((_, i) => (
      <div key={i} style={{
        position: "absolute", left: 660, top: 1226, width: 66, height: 8,
        transformOrigin: "0 50%", transform: `rotate(${i * 22.5}deg) translateY(-4px)`,
        borderRadius: 999, zIndex: 9,
        background: "linear-gradient(90deg, rgba(255,231,163,0.92), rgba(255,231,163,0))",
      }} />
    ))}

    {/* ======================================================================
        LAYER 5 · THE ROOM FLOOR — one solid full-width band, never tiled.
        ====================================================================== */}
    <div style={{
      position: "absolute", left: 0, right: 0, top: 1348, height: 572, zIndex: 10,
      background: "linear-gradient(180deg,#E3CBA4 0%,#D2B68C 34%,#C2A377 66%,#B08F63 100%)",
    }} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 1348, height: 26, zIndex: 11, background: "linear-gradient(180deg, rgba(74,48,22,0.42), rgba(74,48,22,0))" }} />
    {[26, 48, 78, 120, 176, 248, 338, 448].map((k, i) => (
      <div key={i} style={{ position: "absolute", left: 0, right: 0, top: 1348 + k, height: 3, background: "#C5A97F", zIndex: 11 }} />
    ))}

    {/* ======================================================================
        LAYER 6 · HERO — Claude presiding. Sprite 290 at top 1153 ⇒ feet 1420.
        Contact shadow 400 wide, WIDER than the sprite, or he floats.
        ====================================================================== */}
    <div style={{
      position: "absolute", left: 340, top: 1400, width: 400, height: 44, borderRadius: "50%",
      background: "radial-gradient(ellipse, rgba(62,40,16,0.55), transparent 72%)", filter: "blur(9px)", zIndex: 14,
    }} />
    <div style={{ position: "absolute", left: 395, top: 1153, zIndex: 16 }}>
      <PkMascot lf={24} size={290} judge={1} stern={0.6} />
    </div>
    {/* strike flash, over the mallet */}
    <div style={{
      position: "absolute", left: 628, top: 1194, width: 64, height: 64, borderRadius: "50%", zIndex: 18,
      background: "radial-gradient(circle, rgba(255,246,206,0.95) 0%, rgba(255,226,150,0.45) 44%, rgba(255,220,140,0) 72%)",
    }} />

    {/* ======================================================================
        LAYER 7 · FOREGROUND — the gallery rail we are standing behind.
        ====================================================================== */}
    <div style={{ position: "absolute", left: 0, right: 0, top: 1516, height: 56, zIndex: 20, background: "linear-gradient(180deg, rgba(96,62,30,0) 0%, rgba(94,60,28,0.40) 100%)" }} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 1572, height: 13, background: "linear-gradient(180deg,#EFCD9C,#D2A672)", zIndex: 21 }} />
    <div style={{
      position: "absolute", left: 0, right: 0, top: 1585, height: 335, zIndex: 21,
      background: "linear-gradient(180deg,#C08E5C 0%,#A06F42 58%,#875932 100%)",
    }} />
    {[96, 292, 488, 684, 880].map((sx, i) => (
      <div key={i} style={{
        position: "absolute", left: sx, top: 1606, width: 18, height: 18, borderRadius: "50%", zIndex: 22,
        background: "linear-gradient(180deg,#F0D19E,#B98B54)", boxShadow: "0 3px 6px rgba(50,30,12,0.5)",
      }} />
    ))}
    <div style={{ position: "absolute", left: 0, right: 0, top: 1642, height: 6, background: "#7A5130", zIndex: 22 }} />

    {/* motes riding the spotlight, plus general room dust — both clipped so
        NOTHING is drawn into the header quiet zone */}
    {Array.from({ length: 16 }).map((_, i) => (
      <div key={i} style={{
        position: "absolute", left: 618 + seed(i * 7 + 2) * 254, top: 916 + seed(i * 11 + 3) * 372,
        width: 8, height: 8, borderRadius: "50%", background: "rgba(255,246,214,0.96)",
        boxShadow: "0 0 20px rgba(255,232,166,0.95)", zIndex: 24,
      }} />
    ))}
    <div style={{ position: "absolute", left: 0, top: 880, width: 1080, height: 1040, overflow: "hidden", zIndex: 24 }}>
      <Dust n={26} w={1080} h={1040} c="rgba(255,238,196,0.85)" s={9} />
    </div>
  </>
);

export const CoverTakes: React.FC = () => (
  <SceneCover
    scene={<TakesScene />}
    line1={<>SHIP THE BEST OF</>}
    giant={<><span style={{ color: CLAY }}>5</span> TAKES</>}
  />
);

/* ---------- CAROUSEL ----------
   One prompt builds a whole 10-slide deck as a live preview - a month of posting
   in one sitting. CTA CAROUSEL. Reel 63 shipped. */

/* ==========================================================================
   CAROUSEL — full-bleed 1080x1920 scene (headline composited above)
   ---------------------------------------------------------------------------
   VO: "Claude designs perfect Instagram carousels without you designing a
   slide. Drop in one prompt and your topic, it builds a whole 10-slide deck as
   a live preview you click through."

   THE PICTURE: one prompt bar at the bottom, a fan of TEN designed slides
   erupting out of it. The deck is the artifact and it gets the whole mid-band.

   Load-bearing decisions:
   · y < 780 is sky gradient + radial glow ONLY. Topmost drawn geometry is a
     blurred ghost card at y 838. The giant headline lands on clean sky.
   · The 10 cards all share ONE header colour, ONE gold accent, ONE type rhythm
     — that consistency IS the product claim, so it must be visible at a glance.
   · ⛔ The hero sits at x 206 and the prompt bar starts at x 330, so Claude
     never covers the bar or the centre "live preview" cards.
   · ⭐ A #D97757 mascot on warm cream vanishes, so a cool slate wall-shade is
     poured behind him — the cheapest aperture that buys a silhouette.
   ========================================================================== */

const CarouselScene: React.FC = () => (
  <>
    {/* ══ 1 · SKY / WALL — above 780 this is gradient + glow and nothing else ══ */}
    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,#FDF5E8 0%,#FBEEDA 26%,#F6DDB4 54%,#EFC894 78%,#E4B482 100%)" }} />
    <Bloom x={600} y={1000} r={430} c="rgba(255,242,198,0.92)" />
    <Bloom x={150} y={1360} r={330} c="rgba(255,230,182,0.55)" />

    {/* ⭐⭐ FIGURE/GROUND. v1 put a soft slate blob behind the hero and it did
        nothing — a #D97757 sprite on warm cream still vanished. The fix is two
        opposing moves: the wall COOLS AND DEEPENS toward the floor (full width,
        so it reads as the room's shadow rather than a blob parked behind him),
        and a warm halo is lit directly behind the sprite. Dark-cool surround +
        light warm core is the only thing that reliably cuts an orange mascot
        out of an orange scene. It also makes the cream prompt pill pop. */}
    {/* ⛔ v2 used a slate-blue shadow at 0.46 and it turned the bottom third
        GREY — a dirty band across a palette that is required to stay light and
        warm. The separation was never coming from the cool tone anyway, it was
        coming from the halo below. So this is now a WARM deepening at roughly
        half strength: enough ground for the sprite, no grey. */}
    <div style={{
      position: "absolute", left: 0, right: 0, top: 1150, height: 350, zIndex: 1,
      background: "linear-gradient(180deg, rgba(126,84,48,0) 0%, rgba(126,84,48,0.11) 44%, rgba(126,84,48,0.24) 100%)",
    }} />
    <div style={{ position: "absolute", inset: 0, zIndex: 2 }}>
      <Bloom x={206} y={1356} r={215} c="rgba(255,240,200,0.95)" />
    </div>

    {/* ══ 2 · FAR — ghost decks stacked behind the fan. Blurred and tan so they
           read as depth ("a month of posts"), never as competing artifacts. ══ */}
    {[
      { x: 332, y: 858, w: 214, h: 268, r: -9 },
      { x: 598, y: 852, w: 214, h: 268, r: 8 },
      { x: 190, y: 962, w: 184, h: 230, r: -19 },
      { x: 782, y: 974, w: 184, h: 230, r: 17 },
    ].map((g, i) => (
      <div key={i} style={{
        position: "absolute", left: g.x, top: g.y, width: g.w, height: g.h,
        borderRadius: 18, transform: `rotate(${g.r}deg)`, filter: "blur(9px)", zIndex: 2,
        background: "linear-gradient(180deg,#F2E1BF,#E2CB9F)",
      }} />
    ))}

    {/* ══ 3 · THE BURST — light erupting off the prompt bar into the fan.
           This is the verb: the deck is being MADE, right now, by the bar.
           ⛔ v1 used pale #FFE092 rays and they were INVISIBLE — at 0.9 alpha
           that is the same VALUE as the cream wall, so 11 rays rendered as
           nothing. Everything here is GOLD (#E7B24C), which is genuinely darker
           than the ground. The cone is what ties bar to fan; the rays alone
           read as a sunburst floating in space with no source. ══ */}
    <div style={{
      position: "absolute", left: 275, top: 1000, width: 760, height: 340, zIndex: 3,
      background: "linear-gradient(0deg, rgba(231,178,76,0.62) 0%, rgba(231,178,76,0.17) 62%, rgba(231,178,76,0) 100%)",
      clipPath: "polygon(48% 100%, 52% 100%, 100% 0%, 0% 0%)", filter: "blur(10px)",
    }} />
    {Array.from({ length: 11 }).map((_, j) => (
      <div key={j} style={{
        position: "absolute", left: 655, top: 1330,
        width: 190 + seed(j * 7 + 3) * 150, height: 10,
        transformOrigin: "0 50%", transform: `rotate(${-158 + j * 13.6}deg)`,
        background: "linear-gradient(90deg, rgba(231,178,76,0.95), rgba(231,178,76,0))",
        borderRadius: 999, zIndex: 5,
      }} />
    ))}
    <Bloom x={655} y={1332} r={210} c="rgba(255,224,150,0.85)" />

    {/* ══ 4 · THE FAN — ten 4:5 slides on an arc, centre pair biggest/brightest.
           Parametric so the spacing can't drift: t sweeps -1..1, the scale peaks
           at the centre, and zIndex tiers inward so the preview sits on top. ══ */}
    {Array.from({ length: 10 }).map((_, i) => {
      const t = (i - 4.5) / 4.5;
      const a = Math.abs(t);
      const s = 0.72 + 0.34 * Math.pow(1 - a, 1.5);
      const w = 214 * s, h = w * 1.25;
      const cx = 620 + t * 350, cy = 998 + a * a * 156;
      const hero = i === 4 || i === 5;
      return (
        <div key={i} style={{
          position: "absolute", left: cx - w / 2, top: cy - h / 2, width: w, height: h,
          transform: `rotate(${t * 24}deg)`, borderRadius: 18 * s, overflow: "hidden",
          background: hero ? "linear-gradient(180deg,#FFFFFF,#FFF7E6)" : "linear-gradient(180deg,#FFFBF1,#F4E9D2)",
          border: `${3 * s}px solid ${hero ? "rgba(210,114,78,0.55)" : "rgba(124,102,70,0.26)"}`,
          boxShadow: hero
            ? "0 26px 52px -14px rgba(120,72,34,0.52), 0 0 48px rgba(255,224,156,0.9)"
            : "0 16px 32px -12px rgba(120,72,34,0.42)",
          zIndex: 10 + Math.round((1 - a) * 8),
        }}>
          {/* header bar — IDENTICAL clay on all ten. The sameness is the point. */}
          <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: "22%", background: "linear-gradient(180deg,#D2724E,#BC5C3C)" }} />
          <div style={{ position: "absolute", left: "8%", top: "6.4%", width: "11%", height: "8.8%", borderRadius: "18%", background: "#E7B24C" }} />
          <div style={{ position: "absolute", left: "25%", top: "9.2%", width: "46%", height: "3.6%", borderRadius: 999, background: "rgba(255,246,232,0.92)" }} />
          {/* title, two lines, ranged left */}
          <div style={{ position: "absolute", left: "10%", top: "30%", width: "74%", height: "7.4%", borderRadius: 4, background: "#2A2419" }} />
          <div style={{ position: "absolute", left: "10%", top: "40.5%", width: "50%", height: "7.4%", borderRadius: 4, background: "#2A2419" }} />
          <div style={{ position: "absolute", left: "10%", top: "51.5%", width: "22%", height: "2.2%", borderRadius: 999, background: "#E7B24C" }} />
          {/* three ruled body lines */}
          {[["57.5%", "76%"], ["65.5%", "70%"], ["73.5%", "52%"]].map(([ty, tw], k) => (
            <div key={k} style={{ position: "absolute", left: "10%", top: ty, width: tw, height: "3%", borderRadius: 999, background: "rgba(92,76,52,0.42)" }} />
          ))}
          <div style={{
            position: "absolute", left: "10%", top: "83.5%",
            fontFamily: mono, fontWeight: 700, fontSize: 0.085 * h,
            letterSpacing: "0.14em", color: "rgba(92,76,52,0.78)",
          }}>{i < 9 ? `0${i + 1}` : "10"}</div>
        </div>
      );
    })}

    {/* ══ 5 · IN FLIGHT — three slides still tumbling up out of the bar, each
           trailing back toward it, so the fan reads as erupting not arranged. ══ */}
    {[
      { cx: 544, cy: 1214, s: 0.42, rot: -32, ang: 46.3, len: 118 },
      { cx: 776, cy: 1190, s: 0.38, rot: 27, ang: 130.8, len: 128 },
      { cx: 930, cy: 1260, s: 0.33, rot: 43, ang: 165.7, len: 190 },
    ].map((f, i) => {
      const w = 214 * f.s, h = w * 1.25;
      return (
        <React.Fragment key={i}>
          <div style={{
            position: "absolute", left: f.cx, top: f.cy, width: f.len, height: 8,
            transformOrigin: "0 50%", transform: `rotate(${f.ang}deg)`, borderRadius: 999,
            background: "linear-gradient(90deg, rgba(231,178,76,0.95), rgba(231,178,76,0))", zIndex: 23,
          }} />
          <div style={{
            position: "absolute", left: f.cx - w / 2, top: f.cy - h / 2, width: w, height: h,
            transform: `rotate(${f.rot}deg)`, borderRadius: 12, overflow: "hidden",
            background: "linear-gradient(180deg,#FFFDF6,#F4E9D2)",
            border: "2px solid rgba(124,102,70,0.28)",
            boxShadow: "0 14px 26px -8px rgba(120,72,34,0.5), 0 0 26px rgba(255,226,150,0.7)",
            zIndex: 24,
          }}>
            <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: "22%", background: "linear-gradient(180deg,#D2724E,#BC5C3C)" }} />
            <div style={{ position: "absolute", left: "10%", top: "32%", width: "70%", height: "8%", borderRadius: 3, background: "#2A2419" }} />
            <div style={{ position: "absolute", left: "10%", top: "50%", width: "74%", height: "4%", borderRadius: 999, background: "rgba(92,76,52,0.42)" }} />
            <div style={{ position: "absolute", left: "10%", top: "62%", width: "56%", height: "4%", borderRadius: 999, background: "rgba(92,76,52,0.42)" }} />
          </div>
        </React.Fragment>
      );
    })}

    {/* sparks in the gap between the bar and the fan */}
    {Array.from({ length: 13 }).map((_, i) => {
      const sz = 6 + seed(i * 5 + 9) * 6;
      return (
        <div key={i} style={{
          position: "absolute", left: 380 + seed(i * 3 + 2) * 560, top: 1150 + seed(i * 11 + 4) * 170,
          width: sz, height: sz, borderRadius: "50%", background: "rgba(255,250,218,0.98)",
          boxShadow: "0 0 20px rgba(255,236,168,0.95)", zIndex: 25,
        }} />
      );
    })}

    {/* ══ 6 · THE PROMPT BAR — one input, one topic, one send. The whole
           mechanic of the reel sits in this 650px pill. ══ */}
    <div style={{
      position: "absolute", left: 330, top: 1330, width: 650, height: 86, borderRadius: 43,
      background: "linear-gradient(180deg,#FFFDF6,#F3E7D1)",
      border: "3px solid rgba(124,102,70,0.30)",
      boxShadow: "0 18px 36px -12px rgba(120,72,34,0.48), inset 0 3px 0 rgba(255,255,255,0.85)",
      zIndex: 26,
    }}>
      <div style={{ position: "absolute", left: 34, top: 24, width: 5, height: 38, background: "#1A1813" }} />
      <div style={{
        position: "absolute", left: 52, top: 26, fontFamily: mono, fontWeight: 600,
        fontSize: 31, color: "#7A7263", whiteSpace: "nowrap",
      }}>10 slides on cold email</div>
      <div style={{
        position: "absolute", left: 520, top: 15, width: 96, height: 56, borderRadius: 28,
        background: "linear-gradient(158deg,#D2724E,#B85A38)",
        boxShadow: "0 10px 20px -6px rgba(150,70,40,0.7)",
      }}>
        <div style={{ position: "absolute", left: 34, top: 12, width: 28, height: 16, background: "#FFF6EE", clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)" }} />
        <div style={{ position: "absolute", left: 44, top: 20, width: 8, height: 24, background: "#FFF6EE" }} />
      </div>
    </div>

    {/* the click-through affordance on the live preview card */}
    <div style={{ position: "absolute", left: 710, top: 1058, width: 54, height: 66, background: "#FFFDF6", clipPath: "polygon(0% 0%, 0% 76%, 20% 58%, 34% 96%, 52% 88%, 38% 51%, 64% 50%)", zIndex: 30 }} />
    <div style={{ position: "absolute", left: 714, top: 1062, width: 46, height: 58, background: "#241F17", clipPath: "polygon(0% 0%, 0% 76%, 20% 58%, 34% 96%, 52% 88%, 38% 51%, 64% 50%)", zIndex: 31 }} />

    {/* ══ 7 · FOREGROUND — a solid full-width desk band. ⛔ never tile a floor
           out of two shapes; one band, edge to edge, no seams to leak sky. ══ */}
    <div style={{ position: "absolute", left: 0, right: 0, top: 1500, height: 420, background: "linear-gradient(180deg,#D9B588 0%,#C0966A 38%,#A87C50 100%)", zIndex: 28 }} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 1500, height: 6, background: "rgba(255,242,214,0.60)", zIndex: 29 }} />

    {/* ══ 8 · HERO — off-centre left, clear of the bar and the preview cards.
           ⭐ contact shadow is 330 wide against a 230 sprite, or he floats.
           ⛔ v1's 0.50-alpha shadow with a 72% falloff was invisible on tan;
           it needs a dense core to register at all. No costume: `glasses` on a
           230px sprite buries the eyes behind two black frames and the face
           stops reading — cheer alone is the stronger silhouette here. ══ */}
    <div style={{
      position: "absolute", left: 206, top: 1476, width: 340, height: 46,
      transform: "translateX(-50%)", borderRadius: "50%",
      background: "radial-gradient(ellipse, rgba(74,44,16,0.62), transparent 66%)",
      filter: "blur(8px)", zIndex: 32,
    }} />
    <div style={{ position: "absolute", left: 206, top: 1288, transform: "translateX(-50%)", zIndex: 34 }}>
      <PkMascot lf={24} size={230} cheer={0.6} />
    </div>

    {/* motes — wrapper starts at 820 so nothing scatters into the quiet zone */}
    <div style={{ position: "absolute", left: 0, top: 820, width: 1080, height: 1100, zIndex: 40 }}>
      <Dust n={26} w={1080} h={1100} c="rgba(255,246,214,0.9)" s={5} />
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1720, height: 200, background: "linear-gradient(180deg, rgba(92,58,28,0) 0%, rgba(92,58,28,0.28) 100%)", zIndex: 42 }} />
  </>
);

export const CoverCarousel: React.FC = () => (
  <SceneCover
    scene={<CarouselScene />}
    line1={<>10 SLIDES FROM</>}
    giant={<><span style={{ color: CLAY }}>1</span> PROMPT</>}
  />
);

/* ---------- DESIGN ----------
   You can spot an AI-built site in a second. AI has terrible taste by default;
   the fix is a set of sites that hand it taste. CTA DESIGN. Reel 16 shipped. */

/* ==========================================================================
   DESIGN — full-bleed 1080x1920 scene (headline composited above)
   ---------------------------------------------------------------------------
   VO: "You can spot an AI-built website in a second — same fonts, same purple
   gradient, same lifeless design. AI has terrible taste by default. The fix
   isn't a better prompt, it's a set of sites that hand your AI great taste."

   THE PICTURE: a studio. On the easel, a mockup that is genuinely well made.
   In the bin, the purple-gradient slop. Flying in from the other side, the
   taste itself — real components, arriving.

   Load-bearing decisions:
   · y < 780 is wall gradient + radial glow ONLY. Topmost drawn thing is an
     incoming card's light trail at y 811; the board frame starts at 846.
   · ⛔ The joke only lands if BOTH mockups share a silhouette — same browser
     shape, opposite quality. The purple one's blocks are all IDENTICAL and its
     text bars are the same width twice; the good one varies everything.
   · The purple is quarantined to that one tipped sheet so the cover stays warm.
   · ⛔ Claude stands BESIDE the easel at x 926. The mockup occupies x 318..766
     and his drawn silhouette starts at 793 — he never covers the artifact.
   ========================================================================== */

const DesignScene: React.FC = () => (
  <>
    {/* ══ 1 · WALL — above 780 this is gradient + glow and nothing else ══ */}
    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,#FDF5E8 0%,#FBEEDA 30%,#F7E2C0 58%,#F2D5A9 82%,#EAC894 100%)" }} />
    <Bloom x={520} y={980} r={470} c="rgba(255,244,206,0.90)" />
    {/* ⛔ this sat at (150,1300) and haloed the PURPLE sheet — the one thing in
        frame that must not look precious. Moved down onto the bin's base. */}
    <Bloom x={110} y={1520} r={215} c="rgba(255,228,180,0.50)" />

    {/* ⭐⭐ FIGURE/GROUND. v1 relied on a soft slate corner-shade and the hero
        still vanished into the wall. Two opposing moves instead: the wall COOLS
        AND DEEPENS toward the floor across the full width (the room's shadow,
        not a blob behind the hero), and a warm halo is lit directly behind the
        sprite. Dark-cool surround + light warm core is the only thing that
        reliably cuts an orange mascot out of an orange scene. */}
    {/* z4: must paint OVER the wainscot band (z3) or the darkening stops dead
        at 1322 and the hero's legs get no separation at all. It ends at 1440
        where the floor begins, so the two never fight. */}
    {/* ⛔ v2 used a slate-blue shadow at 0.42 and it turned the whole lower wall
        GREY — a concrete stripe across a palette required to stay light and
        warm. Separation comes from the halo below, not the cool tone, so this
        is now a WARM deepening at roughly half strength. */}
    <div style={{
      position: "absolute", left: 0, right: 0, top: 1090, height: 350, zIndex: 4,
      background: "linear-gradient(180deg, rgba(126,84,48,0) 0%, rgba(126,84,48,0.10) 44%, rgba(126,84,48,0.22) 100%)",
    }} />
    <div style={{ position: "absolute", inset: 0, zIndex: 5 }}>
      <Bloom x={930} y={1310} r={235} c="rgba(255,240,200,0.95)" />
    </div>

    {/* ══ 2 · FAR — picture rail + wainscot. Full-width solid bands: they give
           the wall a horizon and give the hero's legs something to sit on. ══ */}
    <div style={{ position: "absolute", left: 0, right: 0, top: 1306, height: 11, background: "#E0C296", zIndex: 3 }} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 1317, height: 5, background: "#D6B486", zIndex: 3 }} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 1322, height: 118, background: "linear-gradient(180deg,#F0DCB6,#E9D0A4)", zIndex: 3 }} />

    {/* ⛔ studio floor: ONE solid band edge to edge, no tiling, no seams */}
    <div style={{ position: "absolute", left: 0, right: 0, top: 1440, height: 480, background: "linear-gradient(180deg,#D6B489 0%,#C29769 42%,#A87C50 100%)", zIndex: 4 }} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 1440, height: 6, background: "rgba(255,244,218,0.60)", zIndex: 5 }} />

    {/* grounding pools for the standing objects */}
    {[{ x: 316, w: 150 }, { x: 768, w: 150 }, { x: 156, w: 240 }].map((g, i) => (
      <div key={i} style={{
        position: "absolute", left: g.x - g.w / 2, top: 1466, width: g.w, height: 30, borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(96,58,26,0.45), transparent 72%)", filter: "blur(7px)", zIndex: 6,
      }} />
    ))}

    {/* ══ 3 · THE BIN — mouth drawn behind, front rim drawn in front, so the
           tipped sheet genuinely disappears INTO it rather than onto it. ══ */}
    <div style={{ position: "absolute", left: 76, top: 1294, width: 160, height: 22, borderRadius: 11, background: "#454D57", zIndex: 5 }} />
    <div style={{ position: "absolute", left: 74, top: 1310, width: 164, height: 176, background: "linear-gradient(180deg,#9AA3AE,#6E7783)", clipPath: "polygon(6% 0%, 94% 0%, 84% 100%, 16% 100%)", zIndex: 6 }} />
    {[118, 152, 186].map((rx, i) => (
      <div key={i} style={{ position: "absolute", left: rx, top: 1326, width: 6, height: 130, background: "rgba(60,68,78,0.45)", zIndex: 7 }} />
    ))}

    {/* ══ 4 · THE SLOP — same browser silhouette, opposite quality. Flat purple,
           three identical grey blocks, two identical bars. Going in the bin. ══ */}
    <div style={{
      position: "absolute", left: 54, top: 1124, width: 208, height: 152, borderRadius: 6,
      transform: "rotate(-34deg)", overflow: "hidden", zIndex: 8,
      background: "linear-gradient(160deg,#7C5CE0 0%,#B49BF0 100%)",
      boxShadow: "0 16px 30px -10px rgba(60,40,120,0.55)",
    }}>
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 22, background: "#5B44A8" }} />
      {[16, 76, 136].map((bx, i) => (
        <div key={i} style={{ position: "absolute", left: bx, top: 40, width: 56, height: 44, borderRadius: 6, background: "#B8B4C6" }} />
      ))}
      <div style={{ position: "absolute", left: 16, top: 98, width: 176, height: 9, borderRadius: 4, background: "#B8B4C6" }} />
      <div style={{ position: "absolute", left: 16, top: 116, width: 176, height: 9, borderRadius: 4, background: "#B8B4C6" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(118deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0) 34%, rgba(0,0,0,0.18) 64%, rgba(0,0,0,0) 100%)" }} />
    </div>
    <div style={{ position: "absolute", left: 62, top: 1302, width: 188, height: 26, borderRadius: 13, background: "linear-gradient(180deg,#B4BCC6,#8B949F)", zIndex: 12 }} />

    {/* the puff it kicks up — the verb on this side of the frame */}
    {[{ x: 248, y: 1274, s: 46 }, { x: 270, y: 1234, s: 34 }, { x: 226, y: 1212, s: 28 }, { x: 206, y: 1252, s: 22 }].map((p, i) => (
      <div key={i} style={{
        position: "absolute", left: p.x - p.s / 2, top: p.y - p.s / 2, width: p.s, height: p.s,
        borderRadius: "50%", background: "rgba(226,208,178,0.62)", filter: "blur(6px)", zIndex: 13,
      }} />
    ))}
    {[{ x: 274, y: 1188, s: 14, r: 20 }, { x: 250, y: 1160, s: 11, r: -14 }, { x: 284, y: 1214, s: 9, r: 34 }].map((p, i) => (
      <div key={i} style={{
        position: "absolute", left: p.x, top: p.y, width: p.s, height: p.s, borderRadius: 2,
        transform: `rotate(${p.r}deg)`, background: i === 1 ? "#7C5CE0" : "#B49BF0", zIndex: 14,
      }} />
    ))}

    {/* ══ 5 · THE EASEL — legs, brace and ledge, so the silhouette says EASEL
           before anything on it is legible. ══ */}
    <div style={{ position: "absolute", left: 560, top: 1252, width: 18, height: 236, background: "#8E6A40", transform: "rotate(2deg)", transformOrigin: "50% 0%", zIndex: 6 }} />
    <div style={{ position: "absolute", left: 340, top: 1268, width: 22, height: 226, background: "linear-gradient(90deg,#C79A66,#9A7145)", transform: "rotate(-9deg)", transformOrigin: "50% 0%", zIndex: 7 }} />
    <div style={{ position: "absolute", left: 722, top: 1268, width: 22, height: 226, background: "linear-gradient(90deg,#C79A66,#9A7145)", transform: "rotate(9deg)", transformOrigin: "50% 0%", zIndex: 7 }} />
    <div style={{ position: "absolute", left: 322, top: 1396, width: 440, height: 16, borderRadius: 3, background: "#A87B4C", zIndex: 7 }} />

    {/* the drafting board */}
    <div style={{
      position: "absolute", left: 296, top: 846, width: 492, height: 412, borderRadius: 10,
      background: "linear-gradient(180deg,#B98F5E,#966D42)",
      boxShadow: "0 34px 64px -20px rgba(96,62,26,0.55)", zIndex: 8,
    }} />

    {/* ══ 6 · THE GOOD MOCKUP — asymmetric hero, a real image block, two-weight
           CTAs, generous whitespace, a three-card row on a consistent grid. ══ */}
    <div style={{
      position: "absolute", left: 318, top: 868, width: 448, height: 368, borderRadius: 6, overflow: "hidden",
      background: "linear-gradient(180deg,#FFFDF7,#FDF4E4)",
      boxShadow: "0 8px 18px rgba(80,52,20,0.30)", zIndex: 9,
    }}>
      {/* nav */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 46, background: "rgba(255,255,255,0.75)" }} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 46, height: 2, background: "#E7DAC2" }} />
      <div style={{ position: "absolute", left: 22, top: 14, width: 20, height: 20, borderRadius: 6, background: "#D2724E" }} />
      <div style={{ position: "absolute", left: 50, top: 20, width: 54, height: 9, borderRadius: 4, background: "#3A342A" }} />
      {[{ x: 214, w: 40 }, { x: 266, w: 36 }, { x: 314, w: 32 }].map((n, i) => (
        <div key={i} style={{ position: "absolute", left: n.x, top: 21, width: n.w, height: 8, borderRadius: 4, background: "rgba(92,76,52,0.45)" }} />
      ))}
      <div style={{ position: "absolute", left: 360, top: 12, width: 66, height: 24, borderRadius: 12, background: "#D2724E" }} />

      {/* hero: headline, sub, two CTAs */}
      <div style={{ position: "absolute", left: 34, top: 82, width: 252, height: 27, borderRadius: 4, background: "#241F17" }} />
      <div style={{ position: "absolute", left: 34, top: 120, width: 176, height: 27, borderRadius: 4, background: "#241F17" }} />
      <div style={{ position: "absolute", left: 34, top: 162, width: 214, height: 10, borderRadius: 5, background: "rgba(92,76,52,0.45)" }} />
      <div style={{ position: "absolute", left: 34, top: 180, width: 168, height: 10, borderRadius: 5, background: "rgba(92,76,52,0.45)" }} />
      <div style={{ position: "absolute", left: 34, top: 208, width: 120, height: 36, borderRadius: 18, background: "linear-gradient(158deg,#D2724E,#B85A38)" }} />
      <div style={{ position: "absolute", left: 166, top: 208, width: 104, height: 36, borderRadius: 18, border: "3px solid #E7B24C" }} />

      {/* hero image block — the asymmetry that makes it look art-directed */}
      <div style={{ position: "absolute", left: 306, top: 78, width: 118, height: 168, borderRadius: 14, background: "linear-gradient(158deg,#E7B24C,#D2724E)" }}>
        <div style={{ position: "absolute", left: 24, top: 26, width: 34, height: 34, borderRadius: "50%", background: "rgba(255,250,238,0.92)" }} />
        <div style={{ position: "absolute", left: 18, top: 120, width: 82, height: 10, borderRadius: 5, background: "rgba(255,250,238,0.78)" }} />
        <div style={{ position: "absolute", left: 18, top: 138, width: 58, height: 10, borderRadius: 5, background: "rgba(255,250,238,0.78)" }} />
      </div>

      {/* three-card row */}
      {[{ x: 30, c: "#D2724E" }, { x: 165, c: "#E7B24C" }, { x: 300, c: "#3F9E74" }].map((cd, i) => (
        <div key={i} style={{ position: "absolute", left: cd.x, top: 268, width: 118, height: 74, borderRadius: 10, background: "#FFF8EA", border: "2px solid #E7DAC2" }}>
          <div style={{ position: "absolute", left: 12, top: 12, width: 22, height: 22, borderRadius: 6, background: cd.c }} />
          <div style={{ position: "absolute", left: 12, top: 44, width: 84, height: 7, borderRadius: 4, background: "rgba(92,76,52,0.42)" }} />
          <div style={{ position: "absolute", left: 12, top: 56, width: 62, height: 7, borderRadius: 4, background: "rgba(92,76,52,0.42)" }} />
        </div>
      ))}
      <div style={{ position: "absolute", left: 30, top: 356, width: 388, height: 3, borderRadius: 2, background: "#E7DAC2" }} />
    </div>

    {/* ledge + lip, holding the board */}
    <div style={{ position: "absolute", left: 284, top: 1258, width: 508, height: 22, borderRadius: 4, background: "linear-gradient(180deg,#C79A66,#A87B4C)", zIndex: 10 }} />
    <div style={{ position: "absolute", left: 284, top: 1276, width: 508, height: 10, borderRadius: 3, background: "#8E6A40", zIndex: 10 }} />

    {/* ══ 7 · INCOMING TASTE — four real components flying in from the other
           side, trails behind them. This is the fix arriving, in shot. ══ */}
    {/* ⛔ v1 drew these in pale #FFE296 and they were INVISIBLE — at that alpha
        it is the same VALUE as the cream wall. GOLD is genuinely darker than
        the ground, which is the whole reason the motion registers. */}
    {/* ⭐ lengths matter: the inner half of every trail is hidden UNDER its own
        card (cards are z16), so a 92px trail on a 138px card showed ~16px and
        read as nothing. These are sized so a clear tail emerges past the edge,
        and capped so the topmost one still lands at y 812, below the quiet zone. */}
    {[{ x: 866, y: 930, l: 150 }, { x: 990, y: 1004, l: 200 }, { x: 872, y: 1132, l: 190 }, { x: 986, y: 1168, l: 190 }].map((f, i) => (
      <div key={i} style={{
        position: "absolute", left: f.x, top: f.y, width: f.l, height: 12, borderRadius: 999,
        transformOrigin: "0 50%", transform: `rotate(${(Math.atan2(f.y - 1050, f.x - 760) * 180) / Math.PI}deg)`,
        background: "linear-gradient(90deg, rgba(231,178,76,0.95), rgba(231,178,76,0))", zIndex: 15,
      }} />
    ))}

    {/* a chart */}
    <div style={{
      position: "absolute", left: 797, top: 876, width: 138, height: 108, borderRadius: 12, transform: "rotate(-9deg)",
      background: "#FFFCF4", border: "3px solid #E7DAC2", boxShadow: "0 14px 28px -8px rgba(120,72,34,0.45)", zIndex: 16,
    }}>
      <div style={{ position: "absolute", left: 14, top: 12, width: 60, height: 8, borderRadius: 4, background: "rgba(92,76,52,0.45)" }} />
      {[{ x: 14, h: 26, c: "#E7B24C" }, { x: 44, h: 40, c: "#D2724E" }, { x: 74, h: 32, c: "#E7B24C" }, { x: 104, h: 54, c: "#3F9E74" }].map((b, i) => (
        <div key={i} style={{ position: "absolute", left: b.x, top: 88 - b.h, width: 22, height: b.h, borderRadius: 3, background: b.c }} />
      ))}
      <div style={{ position: "absolute", left: 12, top: 88, width: 114, height: 3, borderRadius: 2, background: "#E7DAC2" }} />
    </div>

    {/* a pricing card */}
    <div style={{
      position: "absolute", left: 926, top: 925, width: 128, height: 158, borderRadius: 12, overflow: "hidden", transform: "rotate(11deg)",
      background: "#FFFCF4", border: "3px solid #E7DAC2", boxShadow: "0 14px 28px -8px rgba(120,72,34,0.45)", zIndex: 16,
    }}>
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 30, background: "#D2724E" }} />
      <div style={{ position: "absolute", left: 14, top: 11, width: 52, height: 8, borderRadius: 4, background: "rgba(255,246,232,0.92)" }} />
      <div style={{ position: "absolute", left: 14, top: 44, width: 70, height: 20, borderRadius: 4, background: "#241F17" }} />
      {[{ y: 76, w: 88 }, { y: 92, w: 76 }, { y: 108, w: 62 }].map((l, i) => (
        <div key={i} style={{ position: "absolute", left: 14, top: l.y, width: l.w, height: 7, borderRadius: 4, background: "rgba(92,76,52,0.42)" }} />
      ))}
      <div style={{ position: "absolute", left: 14, top: 126, width: 100, height: 22, borderRadius: 11, background: "#3F9E74" }} />
    </div>

    {/* a button */}
    <div style={{
      position: "absolute", left: 796, top: 1102, width: 152, height: 60, borderRadius: 30, transform: "rotate(-7deg)",
      background: "linear-gradient(158deg,#D2724E,#B85A38)", boxShadow: "0 14px 26px -6px rgba(150,70,40,0.6)", zIndex: 16,
    }}>
      <div style={{ position: "absolute", left: 34, top: 25, width: 66, height: 10, borderRadius: 5, background: "rgba(255,246,232,0.92)" }} />
      <div style={{ position: "absolute", left: 110, top: 23, width: 14, height: 14, background: "rgba(255,246,232,0.92)", clipPath: "polygon(0% 0%, 100% 50%, 0% 100%)" }} />
    </div>

    {/* a nav pill */}
    <div style={{
      position: "absolute", left: 908, top: 1142, width: 156, height: 52, borderRadius: 26, transform: "rotate(13deg)",
      background: "#FFFCF4", border: "3px solid #E7DAC2", boxShadow: "0 14px 26px -8px rgba(120,72,34,0.45)", zIndex: 16,
    }}>
      <div style={{ position: "absolute", left: 18, top: 17, width: 16, height: 16, borderRadius: 8, background: "#D2724E" }} />
      {[{ x: 44, w: 32 }, { x: 84, w: 26 }, { x: 118, w: 20 }].map((n, i) => (
        <div key={i} style={{ position: "absolute", left: n.x, top: 21, width: n.w, height: 8, borderRadius: 4, background: "rgba(92,76,52,0.45)" }} />
      ))}
    </div>

    {/* ══ 8 · HERO — beside the easel, never in front of it. ⭐ 400-wide contact
           shadow against a 290 sprite, or he floats off the floor. ══ */}
    <div style={{
      position: "absolute", left: 926, top: 1416, width: 410, height: 48,
      transform: "translateX(-50%)", borderRadius: "50%",
      background: "radial-gradient(ellipse, rgba(74,44,16,0.62), transparent 66%)",
      filter: "blur(9px)", zIndex: 20,
    }} />
    <div style={{ position: "absolute", left: 926, top: 1173, transform: "translateX(-50%)", zIndex: 22 }}>
      <HouseMascot lf={24} size={290} glasses={1} cheer={0.4} />
    </div>

    {/* ══ 9 · FOREGROUND — swatch chips on the studio floor, then motes ══ */}
    {[{ x: 380, y: 1552, c: "#D2724E", r: -9 }, { x: 452, y: 1528, c: "#E7B24C", r: 7 }, { x: 524, y: 1568, c: "#3F9E74", r: -15 }, { x: 600, y: 1538, c: "#3A5C84", r: 12 }].map((s, i) => (
      <div key={i} style={{
        position: "absolute", left: s.x, top: s.y, width: 52, height: 52, borderRadius: 9,
        transform: `rotate(${s.r}deg)`, background: s.c, border: "3px solid rgba(255,248,232,0.72)",
        boxShadow: "0 8px 16px -4px rgba(96,58,26,0.5)", zIndex: 26,
      }} />
    ))}
    <div style={{ position: "absolute", left: 0, top: 820, width: 1080, height: 1100, zIndex: 28 }}>
      <Dust n={24} w={1080} h={1100} c="rgba(255,246,214,0.9)" s={9} />
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1720, height: 200, background: "linear-gradient(180deg, rgba(92,58,28,0) 0%, rgba(92,58,28,0.28) 100%)", zIndex: 30 }} />
  </>
);

export const CoverDesign: React.FC = () => (
  <SceneCover
    scene={<DesignScene />}
    line1={<>FIX YOUR AI&rsquo;S <span style={{ color: CLAY }}>BAD</span></>}
    giant={<>TASTE</>}
  />
);

/* ---------- CALLBACK ----------
   Reel 58. A screener bot bins the resume before a human reads it; Claude
   rewrites it through. The state-flip AUTO-REJECTED -> INTERVIEW is the hook. */

/* ==========================================================================
   CALLBACK — scene body · 1080 x 1920 full-bleed static still
   Headline "FROM REJECTED TO / INTERVIEW" is composited over the top band
   later, so EVERY pixel above y780 is sky gradient + radial glow only.
   Topmost drawn element = the page standing in the intake slot, bbox y≈854.

   THE VERB (reads left -> right):
     a resume is fed into the top slot of an applicant-screening machine, the
     scan bar reads it, the old copy is flung out of the reject chute on the
     LEFT onto a discard pile, and the rewritten copy leans out of the output
     tray on the RIGHT wearing a green INTERVIEW stamp mid-impact.

   DEPTH: sky · far haze + light shafts · ground plane · machine + pages
          (mid) · Claude (hero) · motes (foreground).
   Claude is pushed off-centre to x250 so he covers neither the machine's
   output, the INTERVIEW stamp, nor the REJECTED stamp. His visible crown
   starts at y1261, so every load-bearing prop is parked above that line or
   outside x123..377.
   Floor is ONE solid full-width band — never two shapes with a gap.
   ========================================================================== */

const CallbackScene: React.FC = () => (
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
    <Bloom x={540} y={300} r={560} c="rgba(255,247,224,0.95)" />
    <Bloom x={862} y={196} r={310} c="rgba(255,228,172,0.70)" />
    <Bloom x={150} y={430} r={330} c="rgba(255,236,198,0.60)" />

    {/* ================= L1 · FAR — haze, shafts, the aperture behind Claude = */}
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
      [612, 176, -11],
      [222, 128, 9],
      [900, 104, -14],
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
            "linear-gradient(180deg, rgba(255,242,206,0.55), rgba(255,242,206,0))",
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
        top: 1345,
        width: 1080,
        height: 575,
        background:
          "linear-gradient(180deg,#D7B589 0%,#C49C6D 30%,#AE8556 72%,#9A7147 100%)",
      }}
    />
    <div
      style={{ position: "absolute", left: 0, top: 1345, width: 1080, height: 7, background: "#EBD2AB" }}
    />
    {/* contrasting aperture: a bright pool so the warm sprite never sinks into
        the warm ground. Claude's crown lands dead in the middle of it. */}
    <Bloom x={250} y={1372} r={330} c="rgba(255,246,220,0.92)" />
    <Bloom x={250} y={1404} r={224} c="rgba(255,232,190,0.72)" />

    {/* ================= L3 · THE SCREENING MACHINE ========================= */}
    {/* machine contact shadow (on the ground, before the plinth) */}
    <div
      style={{
        position: "absolute",
        left: 290,
        top: 1378,
        width: 520,
        height: 54,
        borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(96,64,36,0.55), rgba(96,64,36,0) 70%)",
        filter: "blur(9px)",
      }}
    />
    {/* plinth + base flare (solid, no gap for sky to pour through) */}
    <div
      style={{
        position: "absolute",
        left: 350,
        top: 1275,
        width: 390,
        height: 130,
        borderRadius: 10,
        background: "linear-gradient(180deg,#2F4A6C 0%,#22354F 100%)",
      }}
    />
    <div
      style={{
        position: "absolute",
        left: 322,
        top: 1372,
        width: 446,
        height: 34,
        borderRadius: 9,
        background: "linear-gradient(180deg,#3A5678,#243A54)",
      }}
    />

    {/* body */}
    <div
      style={{
        position: "absolute",
        left: 300,
        top: 930,
        width: 490,
        height: 355,
        borderRadius: 28,
        background:
          "linear-gradient(180deg,#5C81AC 0%,#446791 26%,#335075 70%,#2B4365 100%)",
        boxShadow: "0 28px 56px -18px rgba(72,52,34,0.55)",
      }}
    />
    <div
      style={{
        position: "absolute",
        left: 300,
        top: 930,
        width: 490,
        height: 15,
        borderRadius: "28px 28px 0 0",
        background: "#7699C1",
      }}
    />
    <div
      style={{
        position: "absolute",
        left: 300,
        top: 1256,
        width: 490,
        height: 29,
        borderRadius: "0 0 28px 28px",
        background: "#263D5C",
      }}
    />

    {/* intake slot on the top face */}
    <div
      style={{
        position: "absolute",
        left: 348,
        top: 936,
        width: 210,
        height: 28,
        borderRadius: 8,
        background: "linear-gradient(180deg,#0E1C2F,#1D3352)",
        boxShadow: "inset 0 4px 7px rgba(0,0,0,0.65)",
      }}
    />
    {/* the resume standing in the slot — TOPMOST DRAWN ELEMENT, bbox y≈854 */}
    <div
      style={{
        position: "absolute",
        left: 392,
        top: 858,
        width: 150,
        height: 106,
        borderRadius: 5,
        transform: "rotate(-3deg)",
        transformOrigin: "50% 100%",
        background: "linear-gradient(180deg,#FEFBF3,#F1E9D7)",
        boxSizing: "border-box", border: "3px solid #DACEB5",
        boxShadow: "0 9px 18px rgba(80,60,40,0.32)",
      }}
    >
      <div style={{ position: "absolute", left: 16, top: 15, width: 66, height: 15, borderRadius: 4, background: "#50719A" }} />
      {[40, 58, 76].map((ly, i) => (
        <div
          key={i}
          style={{ position: "absolute", left: 16, top: ly, width: [104, 78, 92][i], height: 8, borderRadius: 4, background: "#C7BEAB" }}
        />
      ))}
    </div>

    {/* scan window + beam */}
    <div
      style={{
        position: "absolute",
        left: 334,
        top: 1000,
        width: 424,
        height: 84,
        borderRadius: 15,
        background: "linear-gradient(180deg,#152740,#0D1A2C)",
        boxSizing: "border-box", border: "4px solid #24405F",
        boxShadow: "inset 0 4px 11px rgba(0,0,0,0.6)",
      }}
    />
    <Bloom x={546} y={1042} r={200} c="rgba(255,226,152,0.62)" />
    {[1016, 1064].map((ly, i) => (
      <div key={i} style={{ position: "absolute", left: 350, top: ly, width: 392, height: 5, borderRadius: 3, background: "#3D6C9F" }} />
    ))}
    <div
      style={{
        position: "absolute",
        left: 346,
        top: 1034,
        width: 400,
        height: 15,
        borderRadius: 8,
        background:
          "linear-gradient(90deg,#F4D392 0%,#FFF6E2 22%,#FFFFFF 50%,#FFF6E2 78%,#F4D392 100%)",
        boxShadow: "0 0 30px rgba(255,232,172,0.95)",
      }}
    />

    {/* indicator lamps — red -> gold -> green -> green, the same left-to-right
        transformation the paper makes */}
    {["#C44A3A", "#E7B24C", "#3F9E74", "#3F9E74"].map((c, i) => (
      <div
        key={i}
        style={{
          position: "absolute",
          left: 340 + i * 50,
          top: 1108,
          width: 36,
          height: 36,
          borderRadius: "50%",
          background: `radial-gradient(circle at 36% 30%, #FFFFFF 5%, ${c} 48%, ${c} 100%)`,
          boxSizing: "border-box", border: "3px solid #24405F",
          boxShadow: `0 0 24px ${c}`,
        }}
      />
    ))}

    {/* grille */}
    {[0, 1, 2, 3].map((i) => (
      <div
        key={i}
        style={{ position: "absolute", left: 340, top: 1170 + i * 22, width: 190, height: 10, borderRadius: 5, background: "#2C4A72" }}
      />
    ))}

    {/* verdict monitor */}
    <div
      style={{
        position: "absolute",
        left: 566,
        top: 1096,
        width: 196,
        height: 150,
        borderRadius: 15,
        background: "linear-gradient(180deg,#23415F,#16293F)",
        boxSizing: "border-box", border: "5px solid #4E7098",
      }}
    />
    <div
      style={{
        position: "absolute",
        left: 578,
        top: 1110,
        width: 172,
        height: 122,
        borderRadius: 9,
        background: "linear-gradient(180deg,#123B2C,#0B2620)",
      }}
    />
    <div
      style={{
        position: "absolute",
        left: 594,
        top: 1128,
        width: 58,
        height: 50,
        background: "#4FD69A",
        clipPath: "polygon(11% 47%, 26% 31%, 42% 52%, 77% 9%, 91% 24%, 42% 85%)",
      }}
    />
    <div style={{ position: "absolute", left: 666, top: 1136, width: 66, height: 12, borderRadius: 6, background: "#4FD69A" }} />
    <div style={{ position: "absolute", left: 666, top: 1158, width: 44, height: 12, borderRadius: 6, background: "#358665" }} />
    <div
      style={{
        position: "absolute",
        left: 596,
        top: 1192,
        fontFamily: mono,
        fontWeight: 700,
        fontSize: 22,
        letterSpacing: "0.16em",
        color: "#82EDC0",
      }}
    >
      PASS
    </div>

    {/* machine nameplate */}
    <div
      style={{
        position: "absolute",
        left: 566,
        top: 941,
        fontFamily: mono,
        fontWeight: 700,
        fontSize: 24,
        letterSpacing: "0.16em",
        color: "#BDD8F2",
      }}
    >
      ATS SCREEN
    </div>

    {/* reject chute on the left flank + output slot / tray gusset on the right */}
    <div
      style={{
        position: "absolute",
        left: 270,
        top: 998,
        width: 44,
        height: 86,
        borderRadius: "9px 0 0 9px",
        background: "linear-gradient(90deg,#0E1C2F,#23415F)",
        boxSizing: "border-box", border: "3px solid #40628A",
      }}
    />
    <div
      style={{
        position: "absolute",
        left: 766,
        top: 1150,
        width: 48,
        height: 90,
        borderRadius: "0 9px 9px 0",
        background: "linear-gradient(90deg,#23415F,#0E1C2F)",
        boxSizing: "border-box", border: "3px solid #40628A",
      }}
    />

    {/* ---------- the discarded copy, flung out of the reject chute ---------- */}
    <div
      style={{
        position: "absolute",
        left: 105,
        top: 1005,
        width: 168,
        height: 198,
        borderRadius: 6,
        transform: "rotate(-20deg)",
        background: "linear-gradient(180deg,#EFE9DA,#DCD4C1)",
        boxSizing: "border-box", border: "4px solid #CEC4AD",
        boxShadow: "0 14px 26px -6px rgba(90,66,42,0.42)",
      }}
    >
      <div style={{ position: "absolute", left: 18, top: 18, width: 82, height: 22, borderRadius: 5, background: "#93A0AF" }} />
      <div style={{ position: "absolute", left: 18, top: 46, width: 54, height: 10, borderRadius: 5, background: "#B4AC9B" }} />
      {[118, 96, 126, 88, 112, 74].map((w, i) => (
        <div
          key={i}
          style={{ position: "absolute", left: 18, top: 72 + i * 18, width: w, height: 7, borderRadius: 4, background: "#C1B8A6" }}
        />
      ))}
      {/* REJECTED — net rotation ≈ -8deg once the page's -20 is applied */}
      <div
        style={{
          position: "absolute",
          left: 9,
          top: 84,
          width: 150,
          height: 48,
          borderRadius: 9,
          transform: "rotate(12deg)",
          boxSizing: "border-box", border: "5px solid #C4675A",
          background: "#F4E3DE",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            fontFamily: inter.fontFamily,
            fontWeight: 900,
            fontSize: 21,
            letterSpacing: "0.05em",
            color: "#B3503F",
          }}
        >
          REJECTED
        </div>
      </div>
    </div>
    {/* fall path down to the pile — kept left of Claude's silhouette */}
    {[
      [128, 1246, 14],
      [108, 1288, 12],
      [92, 1324, 10],
      [80, 1354, 8],
    ].map(([dx, dy, ds], i) => (
      <div
        key={i}
        style={{ position: "absolute", left: dx, top: dy, width: ds, height: ds, borderRadius: "50%", background: "#B9A98C" }}
      />
    ))}

    {/* the discard pile on the floor */}
    <div
      style={{
        position: "absolute",
        left: 2,
        top: 1408,
        width: 226,
        height: 42,
        borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(96,64,36,0.55), rgba(96,64,36,0) 70%)",
        filter: "blur(7px)",
      }}
    />
    <div
      style={{
        position: "absolute",
        left: 26,
        top: 1398,
        width: 156,
        height: 42,
        borderRadius: 6,
        transform: "rotate(-7deg)",
        background: "linear-gradient(180deg,#E7E0D0,#D4CCB9)",
        boxSizing: "border-box", border: "3px solid #C7BDA6",
      }}
    />
    <div
      style={{
        position: "absolute",
        left: 40,
        top: 1384,
        width: 152,
        height: 42,
        borderRadius: 6,
        transform: "rotate(6deg)",
        background: "linear-gradient(180deg,#EDE7D8,#DBD3C0)",
        boxSizing: "border-box", border: "3px solid #CCC2AB",
      }}
    />
    <div
      style={{
        position: "absolute",
        left: 28,
        top: 1366,
        width: 158,
        height: 44,
        borderRadius: 6,
        transform: "rotate(-3deg)",
        background: "linear-gradient(180deg,#F2ECDD,#E0D8C5)",
        boxSizing: "border-box", border: "3px solid #D2C8B1",
      }}
    >
      <div style={{ position: "absolute", left: 20, top: 12, width: 62, height: 19, borderRadius: 5, boxSizing: "border-box", border: "3px solid #C4675A" }} />
      <div style={{ position: "absolute", left: 96, top: 15, width: 44, height: 8, borderRadius: 4, background: "#BDB3A0" }} />
    </div>

    {/* ---------- the rewritten copy leaning out of the output tray ---------- */}
    <Bloom x={901} y={1115} r={230} c="rgba(255,238,186,0.78)" />
    {/* the stamp landing. These sit BEHIND the sheet on purpose: painted over
        it they crisscrossed the resume with gold/green streaks and the artifact
        stopped reading as a document. Behind it they halo past its edges. */}
    <div style={{ position: "absolute", left: 901, top: 1115, width: 0, height: 0 }}>
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: 0,
            top: -5,
            width: 40 + (i % 3) * 18,
            height: 10,
            borderRadius: 5,
            transformOrigin: "0 50%",
            transform: `rotate(${i * 30 + 8}deg) translateX(64px)`,
            background:
              i % 2 === 0
                ? "linear-gradient(90deg,#E7B24C,rgba(231,178,76,0.38))"
                : "linear-gradient(90deg,#4FD69A,rgba(79,214,154,0.38))",
          }}
        />
      ))}
    </div>
    <div
      style={{
        position: "absolute",
        left: 770,
        top: 930,
        width: 236,
        height: 306,
        borderRadius: 7,
        transform: "rotate(6deg)",
        transformOrigin: "0% 100%",
        background: "linear-gradient(180deg,#FFFDF7,#F3EDDF)",
        boxSizing: "border-box", border: "4px solid #E1D7C1",
        boxShadow: "0 18px 34px -8px rgba(88,62,38,0.45)",
      }}
    >
      <div style={{ position: "absolute", left: 24, top: 26, width: 116, height: 30, borderRadius: 6, background: "#3A5C84" }} />
      <div style={{ position: "absolute", left: 24, top: 62, width: 76, height: 12, borderRadius: 6, background: "#93A9C6" }} />
      <div style={{ position: "absolute", left: 168, top: 26, width: 44, height: 46, borderRadius: 9, background: "#DBD2BE" }} />
      {[150, 186, 122, 172, 140, 190, 108, 164].map((w, i) => (
        <div
          key={i}
          style={{ position: "absolute", left: 24, top: 96 + i * 24, width: w, height: 9, borderRadius: 5, background: "#C8BFAC" }}
        />
      ))}
      {/* INTERVIEW — net rotation ≈ -8deg once the page's +6 is applied */}
      <div
        style={{
          position: "absolute",
          left: 13,
          top: 139,
          width: 210,
          height: 66,
          borderRadius: 11,
          transform: "rotate(-14deg)",
          boxSizing: "border-box", border: "6px solid #3F9E74",
          background: "#E4F3EA",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            fontFamily: inter.fontFamily,
            fontWeight: 900,
            fontSize: 30,
            letterSpacing: "0.05em",
            color: "#2F8C63",
          }}
        >
          INTERVIEW
        </div>
      </div>
    </div>

    {/* output tray + cantilever gusset, drawn over the page's bottom edge so
        the sheet reads as slotted INTO it */}
    <div
      style={{
        position: "absolute",
        left: 762,
        top: 1236,
        width: 274,
        height: 30,
        borderRadius: 7,
        background: "linear-gradient(180deg,#5C81AC,#335075)",
      }}
    />
    <div
      style={{
        position: "absolute",
        left: 766,
        top: 1266,
        width: 92,
        height: 56,
        clipPath: "polygon(0% 0%, 100% 0%, 0% 100%)",
        background: "#2E4A6E",
      }}
    />
    <div style={{ position: "absolute", left: 1012, top: 1208, width: 20, height: 34, borderRadius: 5, background: "#446791" }} />

    {[
      [742, 1010], [768, 1178], [836, 1290], [960, 1300],
      [1030, 1196], [1046, 1010], [952, 900], [838, 906],
    ].map(([sx, sy], i) => (
      <div
        key={i}
        style={{
          position: "absolute",
          left: sx,
          top: sy,
          width: 9 + seed(i * 2.9 + 1) * 8,
          height: 9 + seed(i * 2.9 + 1) * 8,
          borderRadius: 3,
          transform: `rotate(${seed(i * 3.7 + 5) * 70 - 35}deg)`,
          background: i % 2 === 0 ? "#E7B24C" : "#5BD3A0",
        }}
      />
    ))}

    {/* ================= L4 · HERO — Claude, off-centre at x250 ============= */}
    {/* contact shadow: WIDER than the 254px visible sprite or it disappears */}
    <div
      style={{
        position: "absolute",
        left: 76,
        top: 1428,
        width: 348,
        height: 46,
        borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(88,56,30,0.74), rgba(92,60,32,0) 70%)",
        filter: "blur(8px)",
      }}
    />
    <div style={{ position: "absolute", left: 115, top: 1202 }}>
      <HouseMascot lf={24} size={270} suit={1} cheer={0.5} />
    </div>

    {/* ================= L5 · FOREGROUND — motes ============================ */}
    <div style={{ position: "absolute", left: 0, top: 880, width: 1080, height: 640 }}>
      <Dust n={26} w={1080} h={640} c="rgba(255,240,206,0.95)" s={5} />
    </div>
    <div style={{ position: "absolute", left: 0, top: 1180, width: 1080, height: 420 }}>
      <Dust n={12} w={1080} h={420} c="rgba(212,146,74,0.85)" s={19} />
    </div>
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 1620,
        width: 1080,
        height: 300,
        background: "linear-gradient(180deg, rgba(120,86,50,0) 0%, rgba(112,78,44,0.45) 100%)",
      }}
    />
  </>
);

export const CoverCallback: React.FC = () => (
  <SceneCover
    scene={<CallbackScene />}
    line1={<>MAKE YOUR RESUME</>}
    giant={<><span style={{ color: CLAY }}>UNREJECTABLE</span></>}
    giantSize={101}
  />
);

/* ---------- PURGE ----------
   Claude hunts every account you forgot - logins from 10 years ago still holding
   your name, address and card - then closes them one by one. CTA PURGE.
   No reel is built for this yet - VO only (PURGE.m4a). */

/* ==========================================================================
   PURGE — scene body · 1080 x 1920 full-bleed static still
   Headline "FIND EVERY ACCOUNT / YOU FORGOT" is composited over the top band
   later, so EVERY pixel above y780 is sky gradient + radial glow only.
   Topmost drawn element = the highest ember of the dissolve plume, y=870
   (measured; the plume lives in a container pinned at y840 so no random
   position can ever escape upward into the headline band).

   THE VERB: a leaning stack of seven forgotten account cards is being closed
   from the top down. The bottom four still wear a red OPEN chip; the next two
   have flipped to a green CLOSED chip with a check; and the card on top has
   already been wiped — its number is gone, its right edge has torn open, and
   it is coming apart into embers that stream up and to the right.

   DEPTH: sky · far haze · ground plane · light aperture · the stack (mid) ·
          ember plume · Claude (hero) · motes (foreground).
   Claude is pushed off-centre to x830 — the stack's widest card stops at x668
   and his silhouette starts at x706, so the whole column stays readable.
   Floor is ONE solid full-width band — never two shapes with a gap.
   ========================================================================== */

const PurgeScene: React.FC = () => (
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
          "linear-gradient(180deg,#FDF8EE 0%,#FBEEDA 28%,#F7E2BE 60%,#F1CE9A 100%)",
      }}
    />
    <Bloom x={520} y={286} r={560} c="rgba(255,248,226,0.95)" />
    <Bloom x={930} y={430} r={330} c="rgba(255,226,168,0.62)" />
    <Bloom x={112} y={220} r={280} c="rgba(255,238,200,0.55)" />

    {/* ================= L1 · FAR — haze band + soft shafts ================= */}
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
      [742, 168, -12],
      [318, 122, 10],
      [962, 96, -15],
    ].map(([sx, sw, sk], i) => (
      <div
        key={i}
        style={{
          position: "absolute",
          left: sx,
          top: 920,
          width: sw,
          height: 425,
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
        top: 1345,
        width: 1080,
        height: 575,
        background:
          "linear-gradient(180deg,#D8B78B 0%,#C49D6F 32%,#AE8557 74%,#986F45 100%)",
      }}
    />
    <div style={{ position: "absolute", left: 0, top: 1345, width: 1080, height: 7, background: "#EAD1AA" }} />
    {/* contrasting aperture behind the hero: a warm sprite on a warm ground
        vanishes, so the whole right side gets opened up with light */}
    <Bloom x={850} y={1290} r={340} c="rgba(255,249,230,0.95)" />
    <Bloom x={830} y={1450} r={260} c="rgba(255,234,192,0.82)" />

    {/* ================= L3 · THE STACK ====================================
        Rendered bottom card first so each sheet is overlapped by the one
        above it — that is what makes a pile read as a pile.               */}
    <div
      style={{
        position: "absolute",
        left: 18,
        top: 1382,
        width: 700,
        height: 54,
        borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(96,64,36,0.55), rgba(96,64,36,0) 70%)",
        filter: "blur(9px)",
      }}
    />

    {[6, 5, 4, 3, 2, 1, 0].map((i) => {
      const W = 540 + i * 10;
      const L = 80 - i * 2;
      const T = 878 + i * 72;
      const rot = [0, -1.6, 1.5, -2.2, 1.8, -1.3, 2.2][i];
      const closed = i <= 2;
      const isTop = i === 0;
      const last4 = ["4417", "2093", "8850", "1176", "6321", "5504", "9082"][i];
      const av = ["#3A5C84", "#D2724E", "#3F9E74", "#E7B24C", "#C44A3A", "#4E7EA8", "#B08A3E"][i];
      const chipL = isTop ? 196 : W - 178;
      return (
        <div
          key={i}
          style={{
            position: "absolute",
            left: L,
            top: T,
            width: W,
            height: 96,
            borderRadius: 18,
            transform: `rotate(${rot}deg)`,
            background: isTop
              ? "linear-gradient(100deg,#FBF6EA 0%,#F7EDD7 50%,#F4DDAC 76%,#EFC578 100%)"
              : "linear-gradient(180deg,#FBF6EA 0%,#F1E9D8 100%)",
            boxSizing: "border-box", border: "3px solid #D9CDB5",
            boxShadow: isTop
              ? "0 0 40px rgba(231,178,76,0.75), 0 12px 26px -6px rgba(96,68,42,0.42)"
              : "0 12px 26px -6px rgba(96,68,42,0.45)",
            clipPath: isTop
              ? "polygon(0% 0%, 80% 0%, 72% 15%, 81% 31%, 70% 48%, 78% 64%, 71% 81%, 77% 100%, 0% 100%)"
              : undefined,
          }}
        >
          {/* avatar block */}
          <div
            style={{
              position: "absolute",
              left: 26,
              top: 22,
              width: 52,
              height: 52,
              borderRadius: 13,
              background: av,
              boxShadow: "inset 0 3px 0 rgba(255,255,255,0.35)",
            }}
          />
          {/* redacted name */}
          <div
            style={{ position: "absolute", left: 92, top: 26, width: isTop ? 88 : 100, height: 20, borderRadius: 10, background: "#4A4438" }}
          />
          <div
            style={{ position: "absolute", left: 92, top: 54, width: isTop ? 62 : 72, height: 13, borderRadius: 7, background: "#8C8373" }}
          />
          {/* the card on file — already wiped on the top card */}
          {!isTop && (
            <div
              style={{
                position: "absolute",
                left: 210,
                top: 36,
                fontFamily: mono,
                fontWeight: 700,
                fontSize: 22,
                letterSpacing: "0.09em",
                color: "#5C5346",
              }}
            >
              {`•••• ${last4}`}
            </div>
          )}
          {/* status chip */}
          <div
            style={{
              position: "absolute",
              left: chipL,
              top: 28,
              width: 156,
              height: 42,
              borderRadius: 21,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 11,
              background: closed
                ? "linear-gradient(180deg,#4CB183,#3A8F68)"
                : "linear-gradient(180deg,#D25946,#B03E2F)",
              boxShadow: closed ? "0 5px 14px rgba(52,120,90,0.55)" : "0 5px 14px rgba(150,50,38,0.5)",
            }}
          >
            {closed ? (
              <div
                style={{
                  width: 22,
                  height: 19,
                  background: "#FFFFFF",
                  clipPath: "polygon(10% 46%, 25% 30%, 41% 51%, 78% 8%, 92% 23%, 41% 84%)",
                }}
              />
            ) : (
              <div style={{ width: 17, height: 17, borderRadius: "50%", boxSizing: "border-box", border: "4px solid #FFE8E2" }} />
            )}
            <div
              style={{
                fontFamily: inter.fontFamily,
                fontWeight: 900,
                fontSize: 20,
                letterSpacing: "0.07em",
                color: "#FFFFFF",
              }}
            >
              {closed ? "CLOSED" : "OPEN"}
            </div>
          </div>
        </div>
      );
    })}

    {/* ================= L4 · THE DISSOLVE ================================== */}
    <Bloom x={560} y={970} r={190} c="rgba(255,216,146,0.80)" />
    <Bloom x={800} y={930} r={150} c="rgba(255,234,184,0.68)" />

    {/* the chunks that have just broken off the torn edge */}
    {[
      [466, 890, 30, 14],
      [498, 926, 26, -22],
      [476, 952, 22, 31],
      [520, 898, 18, -9],
    ].map(([fx, fy, fs, fr], i) => (
      <div
        key={i}
        style={{
          position: "absolute",
          left: fx,
          top: fy,
          width: fs,
          height: fs,
          borderRadius: 4,
          transform: `rotate(${fr}deg)`,
          background: ["#F2E2BE", "#E7B24C", "#EFC894", "#D2724E"][i],
          boxShadow: "0 0 26px rgba(231,178,76,0.85)",
        }}
      />
    ))}

    {/* the plume — clamped inside a container that starts at y840, so nothing
        can ever escape into the headline band */}
    <div style={{ position: "absolute", left: 0, top: 840, width: 1080, height: 420 }}>
      {Array.from({ length: 46 }).map((_, i) => {
        const t = i / 45;
        const x = 480 + t * 500 + (seed(i * 3.1 + 1) - 0.5) * 120;
        const y = 150 - t * 70 + (seed(i * 5.7 + 2) - 0.5) * 122;
        const s = 21 - t * 13 + seed(i * 2.3 + 3) * 7;
        const c = ["#E7B24C", "#D2724E", "#F1DFBC", "#EFC894"][i % 4];
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: s,
              height: s,
              borderRadius: 3,
              background: c,
              transform: `rotate(${seed(i * 1.7 + 4) * 64 - 32}deg)`,
              boxShadow: `0 0 ${10 + s}px ${c}`,
            }}
          />
        );
      })}
    </div>

    {/* ================= L5 · HERO — Claude, off-centre at x830 ============= */}
    {/* contact shadow: WIDER than the 248px visible sprite or it disappears */}
    <div
      style={{
        position: "absolute",
        left: 655,
        top: 1448,
        width: 350,
        height: 46,
        borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(88,56,30,0.74), rgba(92,60,32,0) 70%)",
        filter: "blur(8px)",
      }}
    />
    <div style={{ position: "absolute", left: 695, top: 1222 }}>
      <PkMascot lf={24} size={270} cop={1} stern={0.5} />
    </div>

    {/* ================= L6 · FOREGROUND — motes + drifting embers ========== */}
    <div style={{ position: "absolute", left: 0, top: 880, width: 1080, height: 640 }}>
      <Dust n={26} w={1080} h={640} c="rgba(255,242,210,0.95)" s={11} />
    </div>
    <div style={{ position: "absolute", left: 0, top: 1160, width: 1080, height: 440 }}>
      <Dust n={13} w={1080} h={440} c="rgba(214,150,80,0.85)" s={27} />
    </div>
    {[
      [96, 1508, 17, 24],
      [988, 1470, 14, -18],
      [292, 1560, 20, 8],
    ].map(([fx, fy, fs, fr], i) => (
      <div
        key={i}
        style={{
          position: "absolute",
          left: fx,
          top: fy,
          width: fs,
          height: fs,
          borderRadius: 4,
          transform: `rotate(${fr}deg)`,
          background: "#E2A455",
          filter: "blur(2px)",
        }}
      />
    ))}
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 1620,
        width: 1080,
        height: 300,
        background: "linear-gradient(180deg, rgba(120,86,50,0) 0%, rgba(112,78,44,0.45) 100%)",
      }}
    />
  </>
);

export const CoverPurge: React.FC = () => (
  <SceneCover
    scene={<PurgeScene />}
    line1={<><span style={{ color: CLAY }}>ERASE</span> YOUR DIGITAL</>}
    giant={<>IDENTITY</>}
    giantSize={148}
  />
);

/* ---------- PLUGINS ----------
   The 5 Claude plugins almost nobody uses: Chrome DevTools, Firecrawl, Figma,
   Blender, ElevenLabs. CTA PLUGINS. No reel is built for this yet - VO only. */

/* ==========================================================================
   PLUGINS — scene body · 1080 x 1920 full-bleed static still
   Headline "THE 5 BEST CLAUDE / PLUGINS" is composited over the top band
   later, so EVERY pixel above y780 is sky gradient + radial glow only.
   Topmost drawn element = the centre cartridge, bbox top y=829.

   THE VERB: five plugin cartridges arc over a console hub, each riding its
   own light trail down into one of the five sockets on the hub's upper edge.
   The centre one (FIGMA) is mid-SNAP — its socket is throwing an impact
   starburst and the hub's own readout still says 4 / 5 LOADED.

   DEPTH: sky · far haze + shafts · ground plane · hub glow · hub + plinth
          (mid) · trails · cartridges · impact · Claude (hero) · motes.
   Claude may be centred here because every cartridge lives above y1078 and
   his crown does not start until y1298 — nothing he could hide is behind him
   except the plinth, which is 92px wider than his silhouette on each side.
   Floor is ONE solid full-width band — never two shapes with a gap.
   ========================================================================== */

const PluginsScene: React.FC = () => (
  <>
    {/* ================= L0 · SKY — quiet zone (gradient + glow ONLY) ======= */}
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: 1080,
        height: 1352,
        background:
          "linear-gradient(180deg,#FDF8EF 0%,#FBEEDA 30%,#F4DEBB 62%,#EBC894 100%)",
      }}
    />
    <Bloom x={540} y={300} r={580} c="rgba(255,248,228,0.95)" />
    <Bloom x={126} y={214} r={300} c="rgba(255,232,182,0.58)" />
    <Bloom x={952} y={214} r={300} c="rgba(255,232,182,0.58)" />

    {/* ================= L1 · FAR — haze band + soft shafts ================= */}
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 1055,
        width: 1080,
        height: 297,
        background:
          "linear-gradient(180deg, rgba(224,188,138,0) 0%, rgba(221,183,131,0.55) 52%, rgba(210,168,113,0.95) 100%)",
      }}
    />
    {[
      [148, 140, 11],
      [880, 150, -12],
      [512, 118, -6],
    ].map(([sx, sw, sk], i) => (
      <div
        key={i}
        style={{
          position: "absolute",
          left: sx,
          top: 930,
          width: sw,
          height: 422,
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
        top: 1352,
        width: 1080,
        height: 568,
        background:
          "linear-gradient(180deg,#D8B78B 0%,#C49D6F 32%,#AE8557 74%,#986F45 100%)",
      }}
    />
    <div style={{ position: "absolute", left: 0, top: 1352, width: 1080, height: 7, background: "#EAD1AA" }} />
    <Bloom x={540} y={1462} r={280} c="rgba(255,238,198,0.85)" />

    {/* ================= L3 · THE HUB ====================================== */}
    <div
      style={{
        position: "absolute",
        left: 260,
        top: 1378,
        width: 560,
        height: 52,
        borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(96,64,36,0.55), rgba(96,64,36,0) 70%)",
        filter: "blur(9px)",
      }}
    />
    {/* plinth + base flare (solid, no gap for sky to pour through) */}
    <div
      style={{
        position: "absolute",
        left: 320,
        top: 1270,
        width: 440,
        height: 130,
        borderRadius: 10,
        background: "linear-gradient(180deg,#2F4A6C 0%,#22354F 100%)",
      }}
    />
    <div
      style={{
        position: "absolute",
        left: 292,
        top: 1366,
        width: 496,
        height: 40,
        borderRadius: 10,
        background: "linear-gradient(180deg,#3A5678,#243A54)",
      }}
    />

    {/* the warm glow the hub throws before the body is laid over it */}
    <Bloom x={540} y={1150} r={310} c="rgba(255,224,162,0.72)" />

    {/* console body */}
    <div
      style={{
        position: "absolute",
        left: 290,
        top: 1060,
        width: 500,
        height: 210,
        borderRadius: 30,
        background: "linear-gradient(180deg,#4E7099 0%,#3A5C84 34%,#2C4568 100%)",
        boxShadow: "0 28px 56px -18px rgba(72,52,34,0.55)",
      }}
    />
    <div
      style={{
        position: "absolute",
        left: 290,
        top: 1060,
        width: 500,
        height: 16,
        borderRadius: "30px 30px 0 0",
        background: "#6E93BE",
      }}
    />

    {/* faceplate + status readout */}
    <div
      style={{
        position: "absolute",
        left: 330,
        top: 1120,
        width: 420,
        height: 120,
        borderRadius: 16,
        background: "linear-gradient(180deg,#F3ECDD,#E1D7C2)",
        boxShadow: "inset 0 3px 8px rgba(90,66,42,0.35)",
      }}
    />
    {["#3A5C84", "#3F9E74", "#B9AE99", "#E7B24C", "#C44A3A"].map((c, i) => (
      <div
        key={i}
        style={{
          position: "absolute",
          left: 367 + i * 80,
          top: 1147,
          width: 26,
          height: 26,
          borderRadius: "50%",
          background: `radial-gradient(circle at 36% 30%, #FFFFFF 6%, ${c} 50%, ${c} 100%)`,
          boxSizing: "border-box", border: "3px solid #C6BAA1",
          boxShadow: i === 2 ? "none" : `0 0 18px ${c}`,
        }}
      />
    ))}
    <div
      style={{
        position: "absolute",
        left: 330,
        top: 1194,
        width: 420,
        textAlign: "center",
        fontFamily: mono,
        fontWeight: 700,
        fontSize: 26,
        letterSpacing: "0.14em",
        color: "#5C5346",
      }}
    >
      4 / 5 LOADED
    </div>
    {/* vents under the faceplate */}
    {[0, 1, 2, 3, 4, 5].map((i) => (
      <div
        key={i}
        style={{ position: "absolute", left: 340 + i * 66, top: 1248, width: 44, height: 10, borderRadius: 5, background: "#22405F" }}
      />
    ))}

    {/* the five sockets along the upper edge */}
    {[350, 445, 540, 635, 730].map((cx, i) => (
      <div
        key={i}
        style={{
          position: "absolute",
          left: cx - 29,
          top: 1032,
          width: 58,
          height: 40,
          borderRadius: 9,
          background: "linear-gradient(180deg,#0E1C2F,#20395A)",
          boxSizing: "border-box", border: "3px solid #5C81AC",
          boxShadow: i === 2 ? "0 0 30px rgba(255,226,158,0.95)" : "inset 0 4px 7px rgba(0,0,0,0.6)",
        }}
      />
    ))}

    {/* ================= L4 · LIGHT TRAILS — socket -> cartridge =========== */}
    {[
      [350, -169.1, 200, "#3A5C84"],
      [445, -128.7, 168, "#3F9E74"],
      [540, -90, 156, "#D2724E"],
      [635, -51.3, 168, "#E7B24C"],
      [730, -10.9, 200, "#C44A3A"],
    ].map(([sx, ang, len, c], i) => (
      <div key={i} style={{ position: "absolute", left: sx as number, top: 1046, width: 0, height: 0 }}>
        <div
          style={{
            position: "absolute",
            left: 0,
            top: i === 2 ? -17 : -13,
            width: len as number,
            height: i === 2 ? 34 : 26,
            borderRadius: 14,
            transformOrigin: "0 50%",
            transform: `rotate(${ang}deg)`,
            background: `linear-gradient(90deg, #FFF7E4 0%, ${c} 30%, rgba(255,243,212,0.72) 64%, rgba(255,243,212,0) 100%)`,
            filter: "blur(2px)",
          }}
        />
      </div>
    ))}

    {/* ================= L5 · THE FIVE CARTRIDGES ==========================
        160 x 122 modules, arced x60..1020 and every one parked above y1078 so
        the centred sprite cannot eat a single emblem.                     */}
    {[
      {
        cx: 153, cy: 1008, rot: -12, sc: 0.92, face: "#3A5C84", dk: "#22405F", lt: "#6E93BE", tx: "#FFF6E6", label: "BROWSER",
        em: (
          <>
            <div style={{ position: "absolute", left: 8, top: 5, width: 108, height: 42, borderRadius: 6, background: "#FFFFFF", boxSizing: "border-box", border: "2px solid #8FA8C4" }} />
            <div style={{ position: "absolute", left: 10, top: 7, width: 104, height: 13, borderRadius: "4px 4px 0 0", background: "#C9D7E7" }} />
            <div style={{ position: "absolute", left: 14, top: 9, width: 26, height: 9, borderRadius: 2, background: "#3A5C84" }} />
            <div style={{ position: "absolute", left: 44, top: 9, width: 26, height: 9, borderRadius: 2, background: "#9BB2CC" }} />
            <div style={{ position: "absolute", left: 74, top: 9, width: 26, height: 9, borderRadius: 2, background: "#9BB2CC" }} />
            <div style={{ position: "absolute", left: 14, top: 28, width: 12, height: 12, borderRadius: "50%", background: "#C44A3A" }} />
            <div style={{ position: "absolute", left: 32, top: 30, width: 48, height: 7, borderRadius: 4, background: "#B4C4D6" }} />
            <div style={{ position: "absolute", left: 32, top: 40, width: 32, height: 5, borderRadius: 3, background: "#C9D5E2" }} />
          </>
        ),
      },
      {
        cx: 340, cy: 915, rot: -6, sc: 1, face: "#3F9E74", dk: "#2A7355", lt: "#63C199", tx: "#FFF6E6", label: "CRAWL",
        em: (
          <>
            <div style={{ position: "absolute", left: 8, top: 6, width: 108, height: 11, borderRadius: 3, background: "#2A7355" }} />
            {[0, 1, 2].map((r) =>
              [0, 1, 2].map((c) => (
                <div
                  key={`${r}-${c}`}
                  style={{ position: "absolute", left: 8 + c * 37, top: 21 + r * 10, width: 33, height: 7, borderRadius: 2, background: c === 0 ? "#4E9A79" : "#A9CBBB" }}
                />
              ))
            )}
          </>
        ),
      },
      {
        cx: 540, cy: 890, rot: 0, sc: 1, face: "#D2724E", dk: "#A34F30", lt: "#E89774", tx: "#FFF6E6", label: "FIGMA",
        em: (
          <>
            <div style={{ position: "absolute", left: 32, top: 3, width: 32, height: 32, borderRadius: "50%", background: "#D2724E" }} />
            <div style={{ position: "absolute", left: 58, top: 3, width: 32, height: 32, borderRadius: "50%", background: "#E7B24C" }} />
            <div style={{ position: "absolute", left: 45, top: 17, width: 32, height: 32, borderRadius: "50%", background: "#3A5C84" }} />
          </>
        ),
      },
      {
        cx: 740, cy: 915, rot: 6, sc: 1, face: "#E7B24C", dk: "#B0812A", lt: "#F5CE79", tx: "#4A3812", label: "3D",
        em: (
          <svg width={68} height={50} viewBox="0 0 68 50" style={{ position: "absolute", left: 28, top: 1 }}>
            <polygon points="10,15 34,4 58,15 34,26" fill="none" stroke="#7A5A18" strokeWidth={3.4} strokeLinejoin="round" />
            <polyline points="10,15 10,36 34,47 58,36 58,15" fill="none" stroke="#7A5A18" strokeWidth={3.4} strokeLinejoin="round" />
            <line x1={34} y1={26} x2={34} y2={47} stroke="#7A5A18" strokeWidth={3.4} />
          </svg>
        ),
      },
      {
        cx: 927, cy: 1008, rot: 12, sc: 0.92, face: "#C44A3A", dk: "#97321F", lt: "#DE7867", tx: "#FFF6E6", label: "VOICE",
        em: (
          <>
            {[14, 26, 38, 20, 44, 24, 34, 16, 26].map((h, i) => (
              <div
                key={i}
                style={{ position: "absolute", left: 10 + i * 13, top: 26 - h / 2, width: 8, height: h, borderRadius: 4, background: i % 2 === 0 ? "#C44A3A" : "#E28D7C" }}
              />
            ))}
          </>
        ),
      },
    ].map((P, i) => (
      <div
        key={i}
        style={{
          position: "absolute",
          left: P.cx - 80,
          top: P.cy - 61,
          width: 160,
          height: 122,
          borderRadius: 20,
          transform: `rotate(${P.rot}deg) scale(${P.sc})`,
          background: `linear-gradient(180deg, ${P.lt} 0%, ${P.face} 32%, ${P.dk} 100%)`,
          boxSizing: "border-box", border: `4px solid ${P.dk}`,
          boxShadow:
            i === 2
              ? `0 0 42px rgba(255,222,152,0.95), 0 16px 30px -8px rgba(78,54,32,0.5)`
              : `0 16px 30px -8px rgba(78,54,32,0.5)`,
        }}
      >
        <div style={{ position: "absolute", left: 0, top: 0, width: 152, height: 13, borderRadius: "16px 16px 0 0", background: P.lt }} />
        <div style={{ position: "absolute", left: 18, top: 22, width: 124, height: 52, borderRadius: 9, background: "#F5EEDF", overflow: "hidden" }}>
          {P.em}
        </div>
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 84,
            width: 152,
            textAlign: "center",
            fontFamily: mono,
            fontWeight: 700,
            fontSize: 19,
            letterSpacing: "0.13em",
            color: P.tx,
          }}
        >
          {P.label}
        </div>
        {/* connector tab — the silhouette that says "cartridge", pointed at
            the hub by the module's own tilt */}
        <div style={{ position: "absolute", left: 39, top: 104, width: 74, height: 18, borderRadius: "0 0 8px 8px", background: P.dk }} />
        {[0, 1, 2].map((p) => (
          <div key={p} style={{ position: "absolute", left: 51 + p * 20, top: 108, width: 8, height: 10, borderRadius: 2, background: "#E7CE9B" }} />
        ))}
        <div
          style={{
            position: "absolute",
            left: 46,
            top: 122,
            width: 60,
            height: 6,
            borderRadius: "0 0 4px 4px",
            background: i === 2 ? "#FFE9AE" : P.dk,
            boxShadow: i === 2 ? "0 0 22px rgba(255,226,158,0.95)" : "none",
          }}
        />
      </div>
    ))}

    {/* ================= L6 · THE SNAP — impact at socket 3 ================= */}
    <Bloom x={540} y={1046} r={175} c="rgba(255,232,170,0.85)" />
    <div style={{ position: "absolute", left: 540, top: 1046, width: 0, height: 0 }}>
      {Array.from({ length: 14 }).map((_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: 0,
            top: -5,
            width: 34 + (i % 3) * 23,
            height: 10,
            borderRadius: 5,
            transformOrigin: "0 50%",
            transform: `rotate(${i * 25.7 + 6}deg) translateX(26px)`,
            background:
              i % 2 === 0
                ? "linear-gradient(90deg,#FFE9AE,rgba(255,233,174,0.40))"
                : "linear-gradient(90deg,#E7B24C,rgba(231,178,76,0.40))",
          }}
        />
      ))}
      <div
        style={{
          position: "absolute",
          left: -42,
          top: -42,
          width: 84,
          height: 84,
          borderRadius: "50%",
          boxSizing: "border-box", border: "5px solid #F6D089",
        }}
      />
    </div>
    {Array.from({ length: 8 }).map((_, i) => (
      <div
        key={i}
        style={{
          position: "absolute",
          left: 540 + Math.cos(i * 0.9 + 0.3) * (118 + seed(i * 4.3 + 2) * 40),
          top: 1046 + Math.sin(i * 0.9 + 0.3) * (108 + seed(i * 6.1 + 3) * 40),
          width: 8 + seed(i * 2.9 + 1) * 8,
          height: 8 + seed(i * 2.9 + 1) * 8,
          borderRadius: 3,
          transform: `rotate(${seed(i * 3.7 + 5) * 70 - 35}deg)`,
          background: i % 2 === 0 ? "#E7B24C" : "#FFEAB4",
        }}
      />
    ))}

    {/* ================= L7 · HERO — Claude at the console ================== */}
    {/* contact shadow: WIDER than the 256px visible sprite or it disappears */}
    <div
      style={{
        position: "absolute",
        left: 370,
        top: 1458,
        width: 340,
        height: 46,
        borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(88,56,30,0.74), rgba(92,60,32,0) 70%)",
        filter: "blur(8px)",
      }}
    />
    {/* top 1247 (not 1241): PkMascot lifts itself 6px when cheer=0.6, so the
        feet still land exactly on y1480 */}
    <div style={{ position: "absolute", left: 410, top: 1247 }}>
      <PkMascot lf={24} size={260} glasses={1} cheer={0.6} />
    </div>

    {/* ================= L8 · FOREGROUND — motes =========================== */}
    <div style={{ position: "absolute", left: 0, top: 880, width: 1080, height: 640 }}>
      <Dust n={26} w={1080} h={640} c="rgba(255,242,210,0.95)" s={7} />
    </div>
    <div style={{ position: "absolute", left: 0, top: 1180, width: 1080, height: 430 }}>
      <Dust n={12} w={1080} h={430} c="rgba(214,150,80,0.85)" s={23} />
    </div>
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 1620,
        width: 1080,
        height: 300,
        background: "linear-gradient(180deg, rgba(120,86,50,0) 0%, rgba(112,78,44,0.45) 100%)",
      }}
    />
  </>
);

export const CoverPlugins: React.FC = () => (
  <SceneCover
    scene={<PluginsScene />}
    line1={<>THE <span style={{ color: CLAY }}>5</span> BEST CLAUDE</>}
    giant={<>PLUGINS</>}
  />
);

/* crop-proof variants - review only, never delivered */
export const CoverOSv2Proof = cropProof(CoverOSv2);
export const CoverTakesProof = cropProof(CoverTakes);
export const CoverCarouselProof = cropProof(CoverCarousel);
export const CoverDesignProof = cropProof(CoverDesign);
export const CoverCallbackProof = cropProof(CoverCallback);
export const CoverPurgeProof = cropProof(CoverPurge);
export const CoverPluginsProof = cropProof(CoverPlugins);
