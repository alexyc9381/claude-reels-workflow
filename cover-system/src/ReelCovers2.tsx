import React from "react";
import { CLAY, GOLD, GREEN, SLATE, seed, Bloom, Mascot as HouseMascot } from "./CarouselConcepts";
import { CardCover, cropProof } from "./ReelCovers";

/* ==========================================================================
   REEL GRID COVERS — SET 2 · OS + RAMSAY
   ---------------------------------------------------------------------------
   Both clone the CardCover chassis VERBATIM (cream stage + collectible card),
   because Alex picked the light cover over the dark one on 2026-07-18 and the
   whole point of the set is that the chrome never changes — only the costume,
   the world inside the art window, and the card strings. The profile then
   reads as a collectible set: Claude in a different form per reel.

   Lives in its own file on purpose: ReelCovers.tsx was being edited by a
   concurrent session while this was written, so the only change made there is
   `export` on CardCover.

   ART SPACE CONTRACT (measured, not guessed):
     ScaledArt authors at 500 x 360 and scales into the card's art window.
     The centred mascot lands on ART x154..346, y137..360.
     => every focal prop must sit ABOVE y137, or outside the x154..346 column.
   All load-bearing cover elements sit inside the 1:1 band y 420..1500.
   ========================================================================== */

/* ---------- OPS ROOM (OS) — 500x360 ART space ----------
   The reel's system: a cheap model sweeps the project each morning, Claude
   steps in as MANAGER and hands work off, a fresh Claude inspects the result,
   and every job is graded pass/fail until the record earns it the right to run
   alone. The board of graded jobs is the artifact, so it gets the top band —
   above the mascot's head, where nothing can eat it. */

const TILE = [1, 1, 0, 1, 1, 1]; // one honest FAIL among the passes — the grading is real

const OpsRoomArt: React.FC = () => (
  <>
    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,#0C1526 0%,#152340 54%,#1A2B4A 100%)" }} />

    {/* ⛔ A lit glass partition directly behind the manager. Without it the navy
        `suit` costume vanishes into the navy room and the sprite reads as a
        floating head + arms + legs — the same no-contrast failure GreekArt hit
        with tan-on-cream. The figure is DARK here, so the fix is the inverse of
        GreekArt's dark cella: a bright panel for the silhouette to land on. */}
    <div style={{
      position: "absolute", left: 156, top: 116, width: 188, height: 188, borderRadius: 10,
      background: "linear-gradient(180deg, rgba(158,210,255,0.58) 0%, rgba(112,166,226,0.32) 60%, rgba(88,138,198,0.10) 100%)",
      border: "2px solid rgba(184,222,255,0.34)",
      filter: "blur(1.5px)",
    }} />
    <Bloom x={250} y={250} r={215} c="rgba(150,200,255,0.30)" />

    {/* ---- the graded-jobs board: the hero of this window ---- */}
    <div style={{
      position: "absolute", left: 44, top: 20, width: 412, height: 100, borderRadius: 12,
      background: "linear-gradient(180deg,#0A1322,#060D18)",
      border: "3px solid rgba(140,180,240,0.34)",
      boxShadow: "0 8px 22px rgba(0,0,0,0.5), inset 0 2px 0 rgba(255,255,255,0.07)",
    }} />
    {TILE.map((ok, i) => {
      const x = 57 + i * 66;
      return (
        <div key={i} style={{
          position: "absolute", left: x, top: 38, width: 56, height: 64, borderRadius: 9,
          background: ok ? "linear-gradient(180deg,#3FB566,#207E43)" : "linear-gradient(180deg,#D65B4A,#9E3428)",
          boxShadow: ok ? "0 0 16px rgba(63,181,102,0.55)" : "0 0 16px rgba(214,91,74,0.6)",
          border: "2px solid rgba(255,255,255,0.28)",
        }}>
          {ok ? (
            <div style={{
              position: "absolute", left: 9, top: 16, width: 38, height: 32, background: "#F2FBF4",
              clipPath: "polygon(12% 46%, 26% 32%, 40% 50%, 74% 12%, 90% 26%, 40% 82%)",
            }} />
          ) : (
            <>
              <div style={{ position: "absolute", left: 25, top: 16, width: 7, height: 32, background: "#FFF1EE", transform: "rotate(45deg)" }} />
              <div style={{ position: "absolute", left: 25, top: 16, width: 7, height: 32, background: "#FFF1EE", transform: "rotate(-45deg)" }} />
            </>
          )}
        </div>
      );
    })}

    {/* ---- left: the console that runs the sweep (clear of the mascot column) ---- */}
    <div style={{ position: "absolute", left: 12, top: 196, width: 128, height: 84, borderRadius: 8, background: "linear-gradient(180deg,#1B2942,#101B2E)", border: "2px solid rgba(140,180,240,0.3)" }}>
      {/* a record climbing to the threshold */}
      <div style={{ position: "absolute", left: 10, top: 12, right: 10, bottom: 12, background: "#08111F", borderRadius: 4 }}>
        <div style={{ position: "absolute", left: 6, right: 6, top: 16, height: 2, background: "rgba(231,178,76,0.5)" }} />
        <div style={{
          position: "absolute", left: 6, bottom: 6, width: 96, height: 40,
          background: "linear-gradient(180deg,rgba(63,181,102,0.55),rgba(63,181,102,0))",
          clipPath: "polygon(0% 100%, 0% 78%, 22% 62%, 44% 66%, 66% 34%, 88% 22%, 100% 12%, 100% 100%)",
        }} />
      </div>
    </div>
    <div style={{ position: "absolute", left: 26, top: 280, width: 100, height: 10, borderRadius: 3, background: "#0E1A2C" }} />

    {/* ---- right: the night it works through ---- */}
    <div style={{ position: "absolute", left: 358, top: 150, width: 128, height: 140, borderRadius: 8, background: "linear-gradient(180deg,#12233A,#0A1322)", border: "4px solid #22354F", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,#152A4C 0%,#0C1A33 100%)" }} />
      <div style={{ position: "absolute", left: 78, top: 18, width: 30, height: 30, borderRadius: "50%", background: "#F4E4B8", boxShadow: "0 0 22px rgba(244,228,184,0.75)" }} />
      {Array.from({ length: 7 }).map((_, i) => (
        <div key={i} style={{ position: "absolute", left: 10 + seed(i * 5 + 2) * 100, top: 12 + seed(i * 9 + 3) * 80, width: 3, height: 3, borderRadius: "50%", background: "rgba(255,255,255,0.9)" }} />
      ))}
      {/* a skyline that is asleep while the job runs */}
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 42, background: "#08121F" }} />
      {[6, 30, 52, 78, 100].map((bx, i) => (
        <div key={i} style={{ position: "absolute", left: bx, bottom: 30, width: 18, height: 16 + (i % 3) * 12, background: "#0C1A2C" }} />
      ))}
    </div>

    {/* ---- floor: lifted off near-black so the sprite lands on something ---- */}
    <div style={{ position: "absolute", left: 0, right: 0, top: 300, height: 60, background: "linear-gradient(180deg,#253956,#101C2F)" }} />
    <div style={{ position: "absolute", left: 140, top: 290, width: 220, height: 30, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(165,215,255,0.38), rgba(165,215,255,0) 70%)" }} />
    {Array.from({ length: 9 }).map((_, i) => (
      <div key={i} style={{ position: "absolute", left: seed(i * 7 + 4) * 480, top: 130 + seed(i * 11 + 5) * 150, width: 4, height: 4, borderRadius: "50%", background: "rgba(190,220,255,0.7)" }} />
    ))}
  </>
);

/* ---------- THE PASS (RAMSAY) — 500x360 ART space ----------
   A second Claude whose only job is to find what is wrong. The kitchen pass is
   the natural stage for that: heat lamps above (safely over the head), the
   range on one side, the ticket rail on the other, and one plate sitting under
   the light waiting to be torn apart. */

const KitchenPassArt: React.FC = () => (
  <>
    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,#2A1A14 0%,#3A241A 46%,#241610 100%)" }} />
    {/* tiled back wall */}
    {Array.from({ length: 5 }).map((_, r) =>
      Array.from({ length: 9 }).map((_, c) => (
        <div key={`${r}-${c}`} style={{ position: "absolute", left: c * 58 + 4, top: r * 44 + 96, width: 52, height: 38, borderRadius: 3, background: "rgba(255,224,190,0.045)", border: "1px solid rgba(255,214,170,0.05)" }} />
      ))
    )}

    {/* ---- heat lamps: full-width across the top band, above the head ---- */}
    <div style={{ position: "absolute", left: 40, top: 14, width: 420, height: 12, borderRadius: 4, background: "linear-gradient(180deg,#6E5138,#3E2C1C)" }} />
    {[92, 214, 336].map((lx, i) => (
      <React.Fragment key={i}>
        <div style={{ position: "absolute", left: lx, top: 26, width: 72, height: 26, background: "linear-gradient(180deg,#8A6338,#54381E)", clipPath: "polygon(18% 0%, 82% 0%, 100% 100%, 0% 100%)" }} />
        <div style={{ position: "absolute", left: lx + 12, top: 50, width: 48, height: 11, borderRadius: 999, background: "linear-gradient(180deg,#FFE9A8,#F2A63C)", boxShadow: "0 0 26px rgba(255,178,70,0.95)" }} />
        {/* the light it throws */}
        <div style={{
          position: "absolute", left: lx - 26, top: 58, width: 124, height: 150,
          background: "linear-gradient(180deg, rgba(255,186,92,0.30), rgba(255,186,92,0))",
          clipPath: "polygon(32% 0%, 68% 0%, 100% 100%, 0% 100%)",
        }} />
      </React.Fragment>
    ))}
    <Bloom x={250} y={70} r={190} c="rgba(255,180,90,0.30)" />

    {/* ---- left: the range, still burning ----
        ⛔ v1 AND v2 read as three CANDLES, and enlarging them did not fix it:
        the tell is the SHAPE and the SPACING, not the size. Narrow pointed
        teardrops standing apart = candles. Fire reads as fire when it is a
        single merged mass, so these are wide, squat, and overlapping — plus a
        pan, which settles the question of what is being cooked. */}
    <div style={{ position: "absolute", left: 8, top: 258, width: 136, height: 46, background: "linear-gradient(180deg,#3C4048,#22252B)" }} />
    <div style={{ position: "absolute", left: 18, top: 272, width: 116, height: 24, borderRadius: 4, background: "linear-gradient(180deg,#16181C,#0D0F12)", border: "2px solid #4A4E56" }} />
    <div style={{ position: "absolute", left: 8, top: 236, width: 136, height: 22, borderRadius: 5, background: "linear-gradient(180deg,#565B65,#2B2E34)" }} />
    {/* the fire: three wide lobes overlapping into one body */}
    {[18, 50, 82].map((fx, i) => (
      <div key={`f${i}`} style={{
        position: "absolute", left: fx, top: 180 + (i === 1 ? -12 : 0), width: 48, height: 58 + (i === 1 ? 12 : 0),
        background: "linear-gradient(180deg,#FFE18A 0%,#F98A2A 46%,#E8451B 100%)",
        clipPath: "polygon(50% 0%, 76% 26%, 92% 58%, 88% 86%, 62% 100%, 38% 100%, 12% 86%, 8% 58%, 24% 26%)",
        filter: "blur(1px)",
      }} />
    ))}
    {[30, 62, 94].map((fx, i) => (
      <div key={`c${i}`} style={{
        position: "absolute", left: fx, top: 206 + (i === 1 ? -10 : 0), width: 24, height: 30,
        background: "linear-gradient(180deg,#FFF8DC,#FFC24A)",
        clipPath: "polygon(50% 0%, 84% 40%, 92% 74%, 62% 100%, 38% 100%, 8% 74%, 16% 40%)",
      }} />
    ))}
    {/* the pan the fire is under */}
    <div style={{ position: "absolute", left: 24, top: 228, width: 100, height: 18, borderRadius: "0 0 44px 44px", background: "linear-gradient(180deg,#3A3E46,#1A1D22)", boxShadow: "0 3px 6px rgba(0,0,0,0.5)" }} />
    <div style={{ position: "absolute", left: 24, top: 226, width: 100, height: 6, borderRadius: 3, background: "#4E535C" }} />
    <div style={{ position: "absolute", left: 108, top: 230, width: 40, height: 7, borderRadius: 4, background: "linear-gradient(180deg,#2A2D33,#16181C)", transform: "rotate(-13deg)", transformOrigin: "0% 50%" }} />
    <Bloom x={72} y={210} r={124} c="rgba(255,140,50,0.55)" />

    {/* ---- right: the ticket rail — the work queued for judgement ---- */}
    <div style={{ position: "absolute", left: 352, top: 156, width: 138, height: 9, borderRadius: 4, background: "linear-gradient(180deg,#C8CCD4,#767C88)" }} />
    {[0, 1, 2, 3].map((i) => {
      const x = 358 + i * 34;
      const rot = -5 + seed(i * 13 + 7) * 10;
      return (
        <div key={i} style={{ position: "absolute", left: x, top: 164, width: 28, height: 52 + seed(i * 3 + 1) * 16, background: "linear-gradient(180deg,#FBF3E0,#DFD2B8)", transform: `rotate(${rot}deg)`, transformOrigin: "50% 0%", boxShadow: "0 3px 6px rgba(0,0,0,0.45)" }}>
          {[8, 15, 22, 29].map((ly, j) => (
            <div key={j} style={{ position: "absolute", left: 5, right: 5, top: ly, height: 2, background: "rgba(110,88,58,0.5)" }} />
          ))}
        </div>
      );
    })}

    {/* ---- the stainless pass counter = the floor ---- */}
    <div style={{ position: "absolute", left: 0, right: 0, top: 296, height: 64, background: "linear-gradient(180deg,#B9BFC9 0%,#8A9099 26%,#6B7079 62%,#4E535B 100%)" }} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 296, height: 5, background: "rgba(255,255,255,0.55)" }} />

    {/* ---- the one plate under the lamp, waiting to be torn apart ---- */}
    <div style={{ position: "absolute", left: 52, top: 286, width: 96, height: 26, borderRadius: "50%", background: "radial-gradient(ellipse at 50% 34%, #FFFFFF, #D9DDE4 62%, #A9AEB8 100%)", boxShadow: "0 5px 10px rgba(0,0,0,0.45)" }}>
      <div style={{ position: "absolute", left: 26, top: 6, width: 44, height: 13, borderRadius: "50%", background: "linear-gradient(180deg,#C4703A,#8E4522)" }} />
      <div style={{ position: "absolute", left: 36, top: 4, width: 20, height: 7, borderRadius: "50%", background: "#5E8A3E" }} />
    </div>
  </>
);

/* ==========================================================================
   THE COVERS
   ========================================================================== */

/* ---------- OS ----------
   VO: "Claude can run for hours on his own and do a week of work in a single
   night… nobody actually trusts it. So people built a system that makes it
   earn the trust." Headline takes the RESULT (Alex picked it); the chip below
   carries the mechanic so nothing is announced twice. CTA keyword OS.
   No reel number is assigned yet, so the set line is bare — same as HERMES. */

export const CoverOS: React.FC = () => (
  <CardCover
    line1={<>A <span style={{ color: CLAY }}>WEEK</span> OF WORK</>}
    giant={<>OVERNIGHT</>}
    card={{
      name: "CLAUDE", role: "MANAGER FORM", num: "OS",
      chip: "EARNS ITS OWN AUTONOMY",
      mascot: <HouseMascot lf={24} size={200} suit={1} cheer={0.35} />,
      art: <OpsRoomArt />,
      stats: [
        { label: "AUTONOMY", val: 100, c: GOLD },
        { label: "REVIEW", val: 96, c: GREEN },
        { label: "UPTIME", val: 92, c: SLATE },
      ],
    }}
  />
);

/* ---------- RAMSAY ----------
   VO: "What if Claude checked your work like Gordon Ramsay?… Never let the
   same one grade its own work." The chef costume + the pass carry the joke, so
   the headline is free to make the straight promise. The chip is Alex's own
   closing rule. EGO 0 is the stat-block joke and reads at a glance.
   CTA keyword RAMSAY. */

export const CoverRamsay: React.FC = () => (
  <CardCover
    line1={<>MAKE CLAUDE TELL YOU</>}
    giant={<>THE <span style={{ color: CLAY }}>TRUTH</span></>}
    card={{
      name: "CLAUDE", role: "RAMSAY FORM", num: "RAMSAY",
      chip: "NEVER GRADES ITSELF",
      mascot: <HouseMascot lf={24} size={200} chef={1} stern={0.7} />,
      art: <KitchenPassArt />,
      stats: [
        { label: "HONESTY", val: 100, c: GOLD },
        { label: "STANDARDS", val: 98, c: GREEN },
        { label: "EGO", val: 0, c: SLATE },
      ],
    }}
  />
);

export const CoverOSProof = cropProof(CoverOS);
export const CoverRamsayProof = cropProof(CoverRamsay);
