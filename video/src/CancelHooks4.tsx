import React from "react";
import { useCurrentFrame, Img, staticFile } from "remotion";
import { inter } from "./fonts";
import {
  PAID, TOTAL, PAPER, PAPER2, INKD, RED, GO, GO_L, AMB, AMB_L, AMB_D,
  STEEL_D, SH, SH_S, mix,
} from "./CancelWorld";
import { wrap, sfxFor, sharedTail, Shot, Hall, Pool, Chip, Cl, PAIRS, CUTS2 } from "./CancelHooks2";
import { E, OUT, IO, BACK } from "./MissionWorld";

/* =========================================================================
   REEL 86 "CANCEL" · HOOK P — "THE FLIP".

   Chosen direction after three rejected sets. The note each time, in order:

     set 1 (genre worlds)      "more hierarchical, related to the topic, simpler"
     set 2 (ranking diagrams)  "not interesting or creative enough concepts"
     set 3 (rituals that rank) "something ALSO obvious and very hierarchical
                                that it's talking about what we're speaking"

   The through-line: set 3's rituals were interesting but a boxing ring does not
   say "five apps you pay for are free on GitHub" — the app marks and the star
   count were set dressing inside somebody else's world. So here the marks ARE
   the set. Nothing has to be decoded, because the scene is the sentence:

     "5 apps you pay for every month  ->  five real logos, each wearing a $/mo
      have free versions                  which flips to FREE
      and together they have over        ->  176,656 star, already on screen,
      175,000 stars on GitHub"               the largest thing in the frame

   HIERARCHY. ⛔ Reel 84: "a flat grid of N equal cards has hierarchy ZERO by
   definition." So the tiles are NOT equal — they descend in a staircase in rank
   order, and the total sits above all of them at 3x any tile's type size. The
   staircase is a LEADERBOARD convention (rank order), not a bar chart: the true
   value is printed on each tile, so no height is claiming to be a quantity.

   THE MOMENT. Frame 0 is five things you pay for, with the number that beats
   them already sitting overhead. f12 releases it: the tags flip in sequence,
   biggest first, $/mo -> FREE.
   ========================================================================= */


/* ⛔ THE COLOUR NOTE: "the coloring is just completely off, too dark,
   unappealing, no logos, and there's big black lines around."

   Three separate causes, all real:

   1 NO LOGOS. The house plate darkens marks with `grayscale(1)
     brightness(0.12)`. HiggsField's actual mark is a LIME tile with a black
     squiggle, so that filter turned it into a solid black square — one of the
     five "logos" was a black block in every scene of every set. The filter is
     gone; marks now render as themselves. (Notion / OpenAI / Canva / Figma are
     simple-icons SVGs, already black on transparent, so nothing is lost.)
   2 BIG BLACK LINES. The rank badges were solid INKD squares and the five $/mo
     tags ran tile-to-tile as one unbroken red-on-black bar. Badges are clay
     now, and each tag is inset with its own corners.
   3 TOO DARK. The hall was a near-black navy void — right for a "hierarchy
     needs darkness" ranking object, wrong for the house look and wrong for a
     feed. Reel 84 preached the dark arena AND shipped a frame-0 luma of 236.
     This is a WARM LIT STAGE: mid-tone paint, so the near-white tiles and the
     gold total are the brightest things without the room being black. */
export type StageKey = "warm" | "cool" | "amber";
const STAGES: Record<StageKey, [string, string, string, string, string, string]> = {
  /* wall, panel, rail, floorA, floorB, lip */
  warm:  ["#8E897E", "#9C978C", "#A8A398", "#847F76", "#918C82", "#615C54"],  // ~137
  cool:  ["#9DA9B8", "#ACB7C4", "#BAC4D0", "#93A0AF", "#A2AEBB", "#6B7684"],  // ~168
  amber: ["#7E6851", "#8B745E", "#97806A", "#725F4A", "#7E6B55", "#524332"],  // ~108
};
const Studio: React.FC<{ s?: StageKey }> = ({ s = "warm" }) => (
  <svg viewBox="0 0 1012 792" width={1012} height={792} shapeRendering="crispEdges"
    style={{ position: "absolute", left: 0, top: 0, zIndex: 2 }}>
    <rect x={0} y={0} width={1012} height={792} fill={STAGES[s][0]} />
    {Array.from({ length: 9 }, (_, i) => (
      <rect key={i} x={12 + i * 112} y={104} width={72} height={468} fill={STAGES[s][1]} />
    ))}
    <rect x={0} y={104} width={1012} height={14} fill={STAGES[s][2]} />
    <polygon points="96,572 916,572 1012,792 0,792" fill={STAGES[s][3]} />
    <polygon points="176,572 836,572 946,792 66,792" fill={STAGES[s][4]} />
    <rect x={0} y={560} width={1012} height={16} fill={STAGES[s][5]} />
    <rect x={0} y={572} width={1012} height={8} fill={mix(STAGES[s][5], "#000000", 0.3)} />
    {Array.from({ length: 9 }, (_, i) => {
      const x0 = -260 + i * 190;
      return <polygon key={`b${i}`} fill={mix(STAGES[s][3], STAGES[s][2], 0.35)}
        points={`${x0},792 ${x0 + 16},792 516,572 508,572`} />;
    })}
  </svg>
);

/* ====================================================================== layout
   ⛔ "it feels so cramped." Measured, it was — the frame had no zones, just
   things placed until they touched:

     · the total plate ran 112..298 and the tallest tile started at 268, so the
       hero number and the hero row were OVERLAPPING by 30px
     · five 150px tiles on 10px gaps: the row read as one striped block
     · tile contents were centred on each tile's own half-height, so the logos
       sat at five different heights and nothing lined up
     · the mascot was wedged into the 40px left between tile 5 and the edge

   So the frame is now three bands with real air between them, and everything
   inside a band is bottom-anchored to a shared baseline:

     122..268   THE TOTAL     one dark plate, its own row
     ---- 28px of air ----
     296..636   THE ROW       five tiles, bottom-aligned, 26px apart
     636..652   the stage lip
     ---- 20px of air ----
     672..731   THE CHIP      one line, nothing else in the band
   ========================================================================= */
const X0 = 40, ROW_W = 932, N = 5, GAP = 26;
const TW = Math.floor((ROW_W - GAP * (N - 1)) / N);   // 165
const BASE = 636;
const HEIGHTS = [340, 302, 270, 244, 224];            // the staircase, rank order
/* contents are anchored to BASE, not to each tile's centre, so all five logos
   and all five names sit on the same line and only the CARD height varies */
const TAG_H = 58, TAG_T = BASE - TAG_H - 14;
const NAME_T = TAG_T - 34;
const LOGO_H = 84, LOGO_T = NAME_T - 14 - LOGO_H;

/* ============================================================== trial cuts ==
   ⛔ IG suppresses near-duplicate uploads, so trial variants have to differ
   where the platform measures — and the hook carries it, because beats 2-4 are
   shared. `OpenMode` varies ONLY the opening image, the way reel 85's G1/G2/G3
   did, so the concept Alex approved is intact in all three and what is being
   A/B'd is the representation:

     "paid"    A · the five wearing $/mo, flipping to FREE   (the approved cut)
     "free"    B · already free on frame 0, then the charges SLAM back on
     "one"     C · one tile, huge, alone — then cut to all five

   The other four axes (bed, transition kit, camera offset, caption band) are
   set per variant in ClaudeCancelReel's VARIANTS table. */
export type OpenMode = "paid" | "free" | "one";

export const makeFlipHook = (mode: OpenMode, stage: StageKey = "warm",
                            asc = false): React.FC => () => {
  const f = useCurrentFrame();
  const C1 = CUTS2[0];
  return wrap(f, AMB, sfxFor({ src: "page-turn.wav", dur: 0.90 }), (<>
    <Shot f={f} a={0} b={C1} k={0} slamAt={12}>
      <Studio s={stage} />

      {/* BAND 1 · THE TOTAL — its own row, nothing else in it */}
      <div style={{ position: "absolute", left: 168, top: 122, width: 676, height: 146,
        borderRadius: 16, background: "#33261E", border: `4px solid ${AMB_D}`,
        boxShadow: SH, zIndex: 38 }} />
      <div style={{ position: "absolute", left: 168, top: 132, width: 676, display: "flex",
        alignItems: "center", justifyContent: "center", gap: 18, zIndex: 40 }}>
        <Img src={staticFile("logos/github.svg")} style={{ width: 68, height: 68,
          objectFit: "contain", filter: "invert(1)" }} />
        <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 96, lineHeight: 1,
          letterSpacing: "-0.045em", color: AMB_L }}>{TOTAL.toLocaleString("en-US")}</span>
        <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 54,
          color: AMB }}>★</span>
      </div>
      <div style={{ position: "absolute", left: 168, top: 228, width: 676, textAlign: "center",
        zIndex: 40, fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 25, color: PAPER2,
        letterSpacing: "0.26em" }}>FREE ON GITHUB</div>

      {/* BAND 2 · THE ROW — five tiles, bottom-aligned, on one baseline */}
      {PAIRS.map((p, i) => {
        const h = HEIGHTS[asc ? N - 1 - i : i], x = X0 + i * (TW + GAP), top = BASE - h;
        /* A flips paid -> free; B opens FREE and the charge slams back on and
           off again; C holds the first tile alone until the cut at f14. */
        const t = mode === "free"
          ? E(f, 10 + i * 3, 20 + i * 3, 0, 1, IO) - E(f, 26 + i * 3, 36 + i * 3, 0, 1, IO)
          : E(f, 12 + i * 4, 24 + i * 4, 0, 1, IO);
        const sx = Math.abs(1 - Math.abs(t) * 2);
        const paid = mode === "free" ? t > 0.5 : t < 0.5;
        const solo = mode === "one";
        const hidden = solo && i > 0 && f < 24;
        return (
          <React.Fragment key={i}>
            {hidden ? null : (<>
            <div style={{ position: "absolute", left: x, top, width: TW, height: h, zIndex: 20,
              borderRadius: 12, background: PAPER, boxShadow: SH }} />
            {/* the rank rides the staircase, so the ORDER is what the eye reads */}
            <div style={{ position: "absolute", left: x + 14, top: top - 19, width: 38, height: 38,
              borderRadius: 9, zIndex: 24, background: RED, display: "flex", alignItems: "center",
              justifyContent: "center", fontFamily: inter.fontFamily, fontWeight: 900,
              fontSize: 22, color: "#FFF8ED" }}>{i + 1}</div>
            <Img src={staticFile(p.paid.file)} style={{ position: "absolute",
              left: x + TW / 2 - LOGO_H / 2, top: LOGO_T, width: LOGO_H, height: LOGO_H,
              objectFit: "contain", filter: "none", zIndex: 24 }} />
            <div style={{ position: "absolute", left: x, top: NAME_T, width: TW,
              textAlign: "center", zIndex: 24, fontFamily: inter.fontFamily, fontWeight: 900,
              fontSize: 20, color: INKD, letterSpacing: "0.05em" }}>{p.paid.short}</div>
            <div style={{ position: "absolute", left: x + 14, top: TAG_T, width: TW - 28,
              height: TAG_H, borderRadius: 10, zIndex: 26, background: paid ? RED : GO,
              boxShadow: SH_S, display: "flex", flexDirection: "column", alignItems: "center",
              justifyContent: "center", gap: 2,
              transform: `scaleX(${Math.max(0.02, sx)})`, transformOrigin: "50% 50%" }}>
              {paid ? (
                <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 30,
                  color: "#FFF8ED" }}>$ /mo</span>
              ) : (<>
                <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                  <Img src={staticFile("logos/github.svg")} style={{ width: 18, height: 18,
                    objectFit: "contain", filter: "invert(1)" }} />
                  <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 21,
                    color: "#EAF7F0", letterSpacing: "0.1em", lineHeight: 1 }}>FREE</span>
                </div>
                <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 19,
                  color: "#EAF7F0", lineHeight: 1.1 }}>★ {p.stars.toLocaleString("en-US")}</span>
              </>)}
            </div>
            </>)}
          </React.Fragment>
        );
      })}
      {/* C · the single tile, blown up, before the row exists */}
      {mode === "one" && f < 24 && (<>
        <div style={{ position: "absolute", left: 300, top: 254, width: 412, height: 382,
          zIndex: 30, borderRadius: 20, background: PAPER, boxShadow: SH }} />
        <Img src={staticFile(PAID[2].file)} style={{ position: "absolute", left: 424, top: 300,
          width: 164, height: 164, objectFit: "contain", zIndex: 32 }} />
        <div style={{ position: "absolute", left: 300, top: 484, width: 412, textAlign: "center",
          zIndex: 32, fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 34, color: INKD,
          letterSpacing: "0.06em" }}>NOTION</div>
        <div style={{ position: "absolute", left: 340, top: 536, width: 332, height: 74,
          borderRadius: 12, zIndex: 32, background: RED, display: "flex", alignItems: "center",
          justifyContent: "center", fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 46,
          color: "#FFF8ED" }}>$ /mo</div>
      </>)}

      {/* the stage lip the row stands on */}
      <div style={{ position: "absolute", left: 0, top: BASE, width: 1012, height: 16,
        background: "#615C54", zIndex: 18 }} />
      <div style={{ position: "absolute", left: 0, top: BASE + 16, width: 1012, height: 7,
        background: "#4E4A43", zIndex: 18 }} />

      {/* in FRONT of the stage, below the row — out of the tiles' band entirely */}
      <Cl f={f} x={48} y={654} size={134} gaze={2} cheer={0.85} nodAmp={3} nodSpeed={10} z={30} />
      <Chip text="EVERY ONE HAS A FREE VERSION" c={AMB} size={30} />
    </Shot>
    {sharedTail(f)}
  </>));
};
export const CancelHookP = makeFlipHook("paid");
