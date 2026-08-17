import React from "react";
import { Img, staticFile } from "remotion";
/* ⛔⛔ THESE IMPORTS DO NOT COME FROM SklWorld, AND THAT IS DELIBERATE.
   `SklWorld` imports `VolStack` from this file so that every existing
   `BookTower` call site is upgraded in place. Importing back from SklWorld
   would close a module cycle; taking the primitives from their real homes
   keeps the graph one-way. The accents are the same six house values. */
import { W, H, hexa, SH, SH_D, rnd } from "./NomWorld";
import { dkh, mxh } from "./AppWorld";
import { drift, rock } from "./SklWorld";
import { MONO } from "./SlopKit";
const CLAY = "#D97757", GOLD = "#E7B24C", GREEN = "#3F9E74";
const RED = "#C44A3A", SKY = "#5AA0DE";

/* ===========================================================================
   REEL 106 · THE PROP KIT — real drawing, not primitives.

   ⛔⛔⛔ THE NOTE THIS FILE EXISTS FOR. Alex, 2026-08-15, on the hook variants:
   *"the beginning things need to be more interesting not so plain and basic,
   like everything just reads as a whole lot of nothing even though there's more
   stuff… its just not interesting graphics here either way"*.

   "EITHER WAY" is the tell — three different concepts, same verdict, so the
   defect is not the concept. It is the DRAWING, and it is countable:

     `BookTower`  5 <div>s for the entire component
     `PromptCard` 4 <div>s
     a day-cell   1 <div>

   A book in this reel was a rounded rect with a gradient, a border, one cream
   strip and two translucent bars. Every object shares one silhouette and
   carries no internal detail, so FORTY of them is forty rounded rectangles —
   "more stuff" that is still "a whole lot of nothing", exactly as described.
   The eye gets no reward for looking closer because there is nothing to find.

   ⭐ THE THREE MOVES THAT MAKE AN OBJECT READ AS DRAWN RATHER THAN SPECIFIED:
     1. A VISIBLE THIRD FACE. A front rect is a sticker; a front + a top lip in
        a lighter tone is a solid. This is the single cheapest gain in the file.
     2. FINE REPEATED DETAIL AT THE EDGE OF RESOLUTION — page blocks, ruling,
        hatching. It is what the eye reads as "craft" and it survives the
        downsample as texture even when no single line does.
     3. SILHOUETTE VARIETY. Open, splayed, leaning, face-down, upright. A stack
        of identical rects reads as a bar chart; a real pile does not.
   ⛔ Detail is not decoration here — `feedback_reel_geometric_references` asks
      for DENSE CRISP DETAIL (Matrix rain, a factory), never a smooth blob.
   ======================================================================== */

const PAGE = ["#F6EFDC", "#EFE6CE", "#E7DCC0", "#F2EAD6"];

/** ⭐ THE BOOK, lying flat, seen spine-on with a hint of 3/4 so the top face
    shows. ~22 drawn elements against the old 4. */
export const Vol: React.FC<{ x: number; y: number; w: number; h: number; c: string;
  z?: number; rot?: number; detail?: number; ribbon?: number; mark?: boolean }> =
  ({ x, y, w, h, c, z = 40, rot = 0, detail = 1, ribbon = 0, mark = true }) => {
  const lip = Math.max(3, h * 0.15);          /* the cover overhanging the block */
  const band = Math.max(2, h * 0.06);
  const pw = Math.max(9, w * 0.075);          /* the page block at the fore-edge */
  const nb = detail ? 4 : 2;                  /* raised spine bands */
  return (
    <div style={{ position: "absolute", left: x, top: y, width: w, height: h, zIndex: z,
      transform: `rotate(${rot}deg)`, transformOrigin: "50% 100%" }}>
      {/* 1 · the boards, overhanging the text block top and bottom */}
      <div style={{ position: "absolute", left: -3, top: 0, width: w + 6, height: lip,
        borderRadius: `${h * 0.16}px ${h * 0.16}px 2px 2px`,
        background: mxh(c, 0.26), boxShadow: SH }} />
      <div style={{ position: "absolute", left: -3, bottom: 0, width: w + 6, height: lip * 0.86,
        borderRadius: `2px 2px ${h * 0.16}px ${h * 0.16}px`, background: dkh(c, 0.30) }} />
      {/* 2 · the spine field */}
      <div style={{ position: "absolute", left: 0, top: lip * 0.86, width: w,
        height: h - lip * 1.7, overflow: "hidden",
        background: `linear-gradient(184deg, ${mxh(c, 0.08)} 0%, ${c} 42%, ${dkh(c, 0.24)} 100%)` }}>
        {/* 3 · raised bands, each with its own lit and shadowed edge */}
        {Array.from({ length: nb }, (_, i) => {
          const bx = w * (0.19 + i * (detail ? 0.20 : 0.42));
          return (
            <React.Fragment key={"bd" + i}>
              <div style={{ position: "absolute", left: bx, top: 0, width: band * 2.4,
                height: "100%", background: mxh(c, 0.16) }} />
              <div style={{ position: "absolute", left: bx, top: 0, width: Math.max(1, band * 0.7),
                height: "100%", background: hexa("#FFF3D8", 0.34) }} />
              <div style={{ position: "absolute", left: bx + band * 2.4, top: 0,
                width: Math.max(1, band * 0.7), height: "100%", background: hexa("#2B1E12", 0.30) }} />
            </React.Fragment>
          );
        })}
        {/* 4 · THE TITLE PLATE, AND IT CARRIES THE CLAUDE MARK.
            ⭐⭐ Alex, 2026-08-15: *"have each of the plates have like claude logo
            or something so its recognizable to our target audience so we
            attract the right audience here"*. This is the reel-95 round-3 rule
            applied to the prop kit rather than to a badge in the corner: the
            mark is an AUDIENCE FILTER, not branding — the scroller who does not
            recognise it was never the audience, so the objective is the RIGHT
            stop, not a broad one. On a wall of volumes it also means the pile
            reads as "six months of Claude study" at a glance, and it puts many
            marks inside the first three seconds, where the filter has to work.
            ⛔ Gated on plate height: under ~20px the logo is mush, so small
            background volumes keep the type bars instead of a smear. */}
        {detail > 0 && h > 26 && (
          <div style={{ position: "absolute", left: w * 0.38, top: "18%", width: w * 0.38,
            height: "64%", borderRadius: 3, background: dkh(c, 0.42),
            border: `1px solid ${hexa("#FFE9BE", 0.34)}`, display: "flex",
            alignItems: "center", gap: h * 0.06, padding: `0 ${h * 0.07}px` }}>
            {/* ⭐⭐ THE MARK IS SIZED FOR A PHONE, NOT FOR MY MONITOR. Alex:
                *"bigger logos on the books so its easy to see on ig reels mobile
                phone device"*. Same budget arithmetic as the prompt panel: the
                mark scales off the volume's THICKNESS, so it is set by how many
                books are in the pile. At 7 volumes over 560px each book is ~80px
                and the old h*0.26 mark measured 21px in a 1080 frame — under a
                millimetre on a handset. Fewer, thicker volumes plus h*0.38 puts
                it at 40-70px, which is the whole reason the pile lost three
                books rather than the mark gaining a few pixels. */}
            {mark && h * 0.64 > 26 ? (<>
              <div style={{ width: h * 0.50, height: h * 0.50, borderRadius: h * 0.11,
                background: "#FFFFFF", flex: "0 0 auto", display: "flex",
                alignItems: "center", justifyContent: "center",
                boxShadow: "0 2px 5px rgba(0,0,0,0.28)" }}>
                <Img src={staticFile("claude_logo.png")}
                  style={{ width: h * 0.38, height: h * 0.38, objectFit: "contain" }} />
              </div>
              <div style={{ flex: "1 1 auto" }}>
                <div style={{ width: "92%", height: Math.max(2, h * 0.06),
                  background: hexa("#FFEDC6", 0.78), marginBottom: h * 0.05 }} />
                <div style={{ width: "58%", height: Math.max(1, h * 0.05),
                  background: hexa("#FFEDC6", 0.52) }} />
              </div>
            </>) : (<div style={{ flex: "1 1 auto" }}>
              <div style={{ width: "76%", height: Math.max(1, h * 0.055),
                background: hexa("#FFEDC6", 0.72), marginBottom: h * 0.06 }} />
              <div style={{ width: "48%", height: Math.max(1, h * 0.045),
                background: hexa("#FFEDC6", 0.5) }} />
            </div>)}
          </div>
        )}
        {/* 5 · gilt rules near each end */}
        {detail > 0 && (<>
          <div style={{ position: "absolute", left: w * 0.05, top: "18%", width: w * 0.06,
            height: Math.max(1, h * 0.04), background: hexa("#FFE7B0", 0.6) }} />
          <div style={{ position: "absolute", left: w * 0.05, top: "72%", width: w * 0.06,
            height: Math.max(1, h * 0.04), background: hexa("#FFE7B0", 0.45) }} />
        </>)}
      </div>
      {/* 6 · the page block at the fore-edge — individual leaves, the texture
             the eye actually reads as "a book" rather than "a coloured bar" */}
      <div style={{ position: "absolute", right: 0, top: lip * 0.55, width: pw,
        height: h - lip * 1.1, overflow: "hidden", borderRadius: "0 3px 3px 0",
        background: PAGE[2] }}>
        {Array.from({ length: Math.max(4, Math.round(h / 3.4)) }, (_, i) => (
          <div key={"pg" + i} style={{ position: "absolute", left: 0, right: 0,
            top: i * 3.4, height: 1.7, background: PAGE[i % 4],
            opacity: 0.55 + (i % 3) * 0.2 }} />
        ))}
      </div>
      {/* 7 · head and tail bands, the little striped fabric at each end */}
      {detail > 0 && h > 22 && (<>
        <div style={{ position: "absolute", right: pw, top: lip * 0.7, width: Math.max(3, w * 0.02),
          height: h - lip * 1.4, background: `repeating-linear-gradient(180deg, ${GOLD} 0 3px, ${dkh(RED, 0.1)} 3px 6px)`,
          opacity: 0.85 }} />
      </>)}
      {/* 8 · the ribbon */}
      {/* ⛔ SHORT, AND ONLY ON A TOP VOLUME. At h*1.6 hanging from every 4th
          book it crossed the volumes below and rendered as stray red lines
          through the whole pile — it read as a bug, not a bookmark. */}
      {ribbon > 0 && (
        <div style={{ position: "absolute", left: w * 0.30, top: h - 2,
          width: Math.max(5, w * 0.034), height: h * ribbon * 0.55, background: RED,
          borderRadius: "0 0 3px 3px" }} />
      )}
    </div>
  );
};

/** a stack of `n` volumes with real variation in length, thickness, hue and
    tilt — `k` concertinas it exactly like the old BookTower did. */
export const VolStack: React.FC<{ x: number; y: number; n: number; w: number; hMax: number;
  f: number; k?: number; z?: number; seed?: number; strain?: number; detail?: number }> =
  ({ x, y, n, w, hMax, f, k = 0, z = 40, seed = 0, strain = 0, detail = 1 }) => {
  const C = [CLAY, GOLD, GREEN, SKY, RED, "#7C6BD0", "#C9803F", "#4E8C8A"];
  let acc = 0;
  const rows = Array.from({ length: n }, (_, i) => {
    const th = (hMax / n) * (0.72 + rnd(i + seed, 3) * 0.62);
    const h = th * (1 - k) + th * 0.18 * k;
    const ww = w * (0.80 + rnd(i + seed, 5) * 0.24);
    const top = -acc - h;
    acc += h + 2.5 * (1 - k);
    return { i, h, ww, top, c: C[(i + seed) % C.length] };
  });
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: z }}>
      {rows.map(({ i, h, ww, top, c }) => {
        const wob = (1 - k) * (1 + strain * 0.9)
          * (Math.sin(f / 17 + i * 1.7 + seed) * 2.6 + Math.sin(f / 41 + i * 0.9) * 1.3);
        return (
          <Vol key={"v" + i} x={-ww / 2 + (rnd(i + seed, 7) - 0.5) * w * 0.16} y={top}
            w={ww} h={h} c={c} z={z + i} rot={wob + (rnd(i + seed, 9) - 0.5) * 3}
            detail={detail} ribbon={i === n - 1 ? 0.5 : 0} />
        );
      })}
    </div>
  );
};

/** ⭐ SILHOUETTE VARIETY — an open book, splayed, with a real page fan and a
    gutter. Nothing else in the kit has this outline. */
export const OpenVol: React.FC<{ x: number; y: number; w: number; c: string;
  z?: number; rot?: number }> = ({ x, y, w, c, z = 44, rot = 0 }) => {
  const h = w * 0.62, half = w / 2;
  const leaf = (side: -1 | 1) => (
    <div style={{ position: "absolute", left: side < 0 ? 0 : half, top: 0, width: half, height: h,
      overflow: "hidden",
      transform: `perspective(520px) rotateY(${side * -13}deg)`,
      transformOrigin: side < 0 ? "100% 50%" : "0% 50%" }}>
      {/* the leaves, individually */}
      {Array.from({ length: 9 }, (_, i) => (
        <div key={"lf" + i} style={{ position: "absolute", left: side < 0 ? i * 1.6 : undefined,
          right: side > 0 ? i * 1.6 : undefined, top: i * 1.1, width: half - i * 1.6,
          height: h - i * 2.2, borderRadius: side < 0 ? "5px 2px 2px 5px" : "2px 5px 5px 2px",
          background: PAGE[i % 4], border: `1px solid ${hexa("#C9BC9C", 0.5)}` }} />
      ))}
      {/* the mark on the recto — the largest legible plate in the frame */}
      {side > 0 && (
        <div style={{ position: "absolute", left: "18%", top: "12%", width: half * 0.30,
          height: half * 0.30, borderRadius: half * 0.07, background: "#FFFFFF",
          display: "flex", alignItems: "center", justifyContent: "center",
          border: `2px solid ${hexa("#C9BC9C", 0.7)}` }}>
          <Img src={staticFile("claude_logo.png")}
            style={{ width: half * 0.22, height: half * 0.22, objectFit: "contain" }} />
        </div>
      )}
      {/* ruling on the top leaf */}
      {Array.from({ length: 7 }, (_, i) => (
        <div key={"rl" + i} style={{ position: "absolute", left: half * 0.12, top: h * (0.18 + i * 0.10),
          width: half * (0.74 - (i % 3) * 0.16), height: Math.max(1, h * 0.022),
          background: hexa("#9C8F72", 0.55) }} />
      ))}
    </div>
  );
  return (
    <div style={{ position: "absolute", left: x, top: y, width: w, height: h, zIndex: z,
      transform: `rotate(${rot}deg)`, transformOrigin: "50% 100%" }}>
      {/* the boards under the block */}
      <div style={{ position: "absolute", left: -6, top: h * 0.06, width: w + 12, height: h,
        borderRadius: 5, background: `linear-gradient(180deg, ${c}, ${dkh(c, 0.26)})`,
        boxShadow: SH }} />
      {leaf(-1)}{leaf(1)}
      {/* the gutter */}
      <div style={{ position: "absolute", left: half - 3, top: 2, width: 6, height: h - 4,
        background: `linear-gradient(90deg, ${hexa("#6B5C42", 0.42)}, ${hexa("#6B5C42", 0.10)} 50%, ${hexa("#6B5C42", 0.42)})` }} />
    </div>
  );
};

/** loose sheets, edges visible — the second non-rectangular silhouette */
export const Sheets: React.FC<{ x: number; y: number; w: number; n?: number; z?: number }> =
  ({ x, y, w, n = 7, z = 46 }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z }}>
    {Array.from({ length: n }, (_, i) => (
      <div key={"sh" + i} style={{ position: "absolute",
        left: (rnd(i, 3) - 0.5) * w * 0.30, top: -i * 2.4,
        width: w * (0.9 + rnd(i, 5) * 0.2), height: w * 0.70, borderRadius: 3,
        background: PAGE[i % 4], border: `1px solid ${hexa("#BFB295", 0.6)}`,
        boxShadow: i === n - 1 ? SH : undefined,
        transform: `rotate(${(rnd(i, 7) - 0.5) * 13}deg)` }}>
        {i === n - 1 && Array.from({ length: 6 }, (_, j) => (
          <div key={"ln" + j} style={{ position: "absolute", left: "12%", top: `${16 + j * 13}%`,
            width: `${70 - (j % 3) * 18}%`, height: 2, background: hexa("#A2957A", 0.6) }} />
        ))}
      </div>
    ))}
  </div>
);

/** sticky notes — small, saturated, and they break the neutral run of paper */
export const Sticky: React.FC<{ x: number; y: number; s?: number; c?: string;
  z?: number; rot?: number; f?: number }> =
  ({ x, y, s = 54, c = GOLD, z = 60, rot = 0, f = 0 }) => {
  /* a note pinned to a desk lifts at its corner — it is paper, not tile */
  const d = drift(f, x * 0.013, 0.8);
  return (
  <div style={{ position: "absolute", left: x + d.x, top: y + d.y, width: s,
    height: s * 0.92, zIndex: z,
    background: `linear-gradient(168deg, ${mxh(c, 0.18)}, ${c})`,
    transform: `rotate(${rot + d.r}deg)`, boxShadow: SH }}>
    <div style={{ position: "absolute", left: "14%", top: "16%", width: s * 0.30,
      height: s * 0.30, borderRadius: s * 0.07, background: "#FFFFFF",
      display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Img src={staticFile("claude_logo.png")}
        style={{ width: s * 0.22, height: s * 0.22, objectFit: "contain" }} />
    </div>
    {Array.from({ length: 2 }, (_, i) => (
      <div key={"sl" + i} style={{ position: "absolute", left: "16%", top: `${58 + i * 18}%`,
        width: `${58 - i * 16}%`, height: Math.max(1, s * 0.05),
        background: hexa("#6B5230", 0.44) }} />
    ))}
  </div>
  );
};

/** the mug — the one CURVED silhouette in the frame, which is why it earns a
    place on a desk otherwise made of rectangles */
export const Mug: React.FC<{ x: number; y: number; s?: number; c?: string; z?: number }> =
  ({ x, y, s = 74, c = CLAY, z = 62 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: s, height: s * 1.05, zIndex: z }}>
    <div style={{ position: "absolute", right: -s * 0.22, top: s * 0.24, width: s * 0.34,
      height: s * 0.44, borderRadius: "50%", border: `${s * 0.11}px solid ${dkh(c, 0.14)}` }} />
    <div style={{ position: "absolute", left: 0, top: 0, width: s * 0.86, height: s * 1.02,
      borderRadius: `${s * 0.08}px ${s * 0.08}px ${s * 0.30}px ${s * 0.30}px`,
      background: `linear-gradient(96deg, ${mxh(c, 0.16)} 0%, ${c} 46%, ${dkh(c, 0.26)} 100%)`,
      boxShadow: SH }} />
    <div style={{ position: "absolute", left: s * 0.04, top: 0, width: s * 0.78, height: s * 0.14,
      borderRadius: "50%", background: dkh("#3A2A1C", 0.1) }} />
    <div style={{ position: "absolute", left: s * 0.10, top: s * 0.02, width: s * 0.66,
      height: s * 0.10, borderRadius: "50%", background: "#6B4A2E" }} />
  </div>
);

/** pencils in a pot — fine near-vertical detail, and it reads at a glance */
export const Pot: React.FC<{ x: number; y: number; s?: number; z?: number }> =
  ({ x, y, s = 66, z = 62 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: s, height: s * 1.5, zIndex: z }}>
    {Array.from({ length: 6 }, (_, i) => {
      const c = [GOLD, CLAY, GREEN, SKY, RED, "#7C6BD0"][i];
      return (
        <div key={"pc" + i} style={{ position: "absolute", left: s * (0.12 + i * 0.13),
          top: -s * (0.34 + rnd(i, 3) * 0.30), width: s * 0.10, height: s * 1.0,
          background: c, transform: `rotate(${(rnd(i, 5) - 0.5) * 16}deg)`,
          transformOrigin: "50% 100%" }}>
          <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: "16%",
            background: "#E8D6B4" }} />
          <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: "6%",
            background: "#3A2A1C" }} />
        </div>
      );
    })}
    <div style={{ position: "absolute", left: 0, top: s * 0.62, width: s, height: s * 0.86,
      borderRadius: `${s * 0.06}px ${s * 0.06}px ${s * 0.14}px ${s * 0.14}px`,
      background: `linear-gradient(96deg, #6E7C86 0%, #55636D 52%, #3E4A53 100%)`,
      boxShadow: SH }} />
  </div>
);


/** ⭐⭐⭐ `Cross` — N LARGE OBJECTS CROSSING THE PANEL, staggered across a
    scene's FULL duration. This is the one shape that measurably moves the
    needle, and it took four attempts to arrive at:

      spreading existing arrivals   no effect — they were too small to register
      cutting the ambient band      lowered the floor, HOLD got mechanically WORSE
      day-blocks rising 130px       +0.16, i.e. nothing (only the swept edge repaints)
      objects crossing ~1000px      CTA HOLD 79% -> 55%, ROOF 82% -> 72%

    Delivered reel 105 measures floor 3.1 / mean 13.0 and never holds a 3.5s
    window above 34%. It gets there with constant large-area change, not with a
    hum. `Cross` is that, made of the reel's own objects.
    ⛔ Solid stock (0.92), 110-180px, real travel. A translucent or small
    version of this measures as absent — see the v7 sheet-opacity finding. */
export const Cross: React.FC<{ f: number; dur: number; n?: number; z?: number;
  seed?: number; dir?: 1 | -1; y0?: number; y1?: number; mark?: boolean }> =
  ({ f, dur, n = 6, z = 66, seed = 0, dir = 1, y0 = 180, y1 = 620, mark = true }) => (<>
    {Array.from({ length: n }, (_, i) => {
      const launch = Math.round(dur * 0.06 + (dur * 0.80) * (i / n));
      const t = (f - launch) / 46;
      if (t <= 0 || t >= 1) return null;
      const c = [CLAY, GOLD, GREEN, SKY, RED, "#7C6BD0"][(i + seed) % 6];
      /* ⛔ THREE TIERS, NOT ONE BAND. 118-180px for every card put `Cross`
         in the same size class as the props, the sprites and each other, which
         is precisely the "everything seems the same size" note. One hero per
         sweep, two mid, the rest small — so a crossing beat has its own
         internal hierarchy and the eye is led rather than sprayed. */
      const TIER = [286, 96, 176, 72, 224, 118, 84, 152];
      const w = TIER[(i + seed) % TIER.length];
      const x = dir > 0 ? -240 + t * 1420 : 1180 - t * 1420;
      const y = y0 + rnd(i + seed, 5) * (y1 - y0) - Math.sin(t * Math.PI) * 92;
      return (
        <div key={"cx" + i} style={{ position: "absolute", left: x, top: y, width: w,
          height: w * 0.72, zIndex: z + i, borderRadius: 7, background: c,
          border: `4px solid ${dkh(c, 0.30)}`, boxShadow: SH, opacity: 0.92,
          transform: `rotate(${(rnd(i + seed, 7) - 0.5) * 180 * t}deg)` }}>
          {mark && (
            <div style={{ position: "absolute", left: "50%", top: "50%",
              width: w * 0.34, height: w * 0.34, marginLeft: -w * 0.17,
              marginTop: -w * 0.17, borderRadius: w * 0.08, background: "#FFFFFF",
              display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Img src={staticFile("claude_logo.png")}
                style={{ width: w * 0.25, height: w * 0.25, objectFit: "contain" }} />
            </div>
          )}
        </div>
      );
    })}
  </>);

/* ===========================================================================
   ⭐⭐⭐ THE SCENE MUST DEPICT THE LINE, AND THE CHARACTERS MUST ACT.
   Alex, 2026-08-15: *"theres no motion of the characters and stuff — like have
   him exert a speech bubble saying something here after he comes down"* and
   *"each of the scenes seem way too similar like its just text boxes and stuff,
   its not actually relating to whats being spoken, like roadmap should be a
   roadmap animation"*.

   ⛔ This is `feedback_graphical_over_textual` failing at the level of the whole
   body: every scene resolved to A SET + SPRITES + A CARD, so ten different VO
   lines were illustrated by the same furniture with different captions. A card
   labelled DEADLINE is not a deadline; a block labelled DAY 3 is not a roadmap.
   The picture has to carry the specific noun the VO just said.
   ======================================================================== */

/** a character actually SAYING something — pops with overshoot, holds, leaves */
export const Bubble: React.FC<{ x: number; y: number; t: string; k: number;
  f?: number; at?: number; w?: number; z?: number; flip?: boolean; c?: string }> =
  ({ x, y, t, k, f = 0, at = 0, w = 330, z = 90, flip = false, c = "#FFFFFF" }) => {
  if (k <= 0.01) return null;
  /* ⭐⭐ IT PERFORMS, IT DOES NOT JUST APPEAR. Alex: *"even like the speaking
     bubble should be animated more"* and *"each animation needs to be animated
     more, each component"*. A bubble that pops and then sits is the same
     arrives-and-holds defect as everything else, at component scale:
       1. it OVERSHOOTS in, then rocks on its own tail like a real speech pop
       2. the WORDS TYPE, so the beat lasts as long as the line does
       3. it never stops — a ceiling'd drift runs for as long as it is up,
          at the documented 2.6deg / 4.6px floor, because anything under that
          reads as static to a human even while a metric calls it moving
       4. it BREATHES, a slow scale pulse, so the shape itself is alive */
  const d = drift(f, 3.1, 1.05);
  const pop = rock(f, at + 4, 4.6, 22);
  const breathe = 1 + Math.sin(f / 15) * 0.018;
  const s0 = (0.62 + k * 0.38) * breathe;
  const typed = Math.max(0, Math.min(1, (f - at - 5) / 15));
  const shown = t.slice(0, Math.max(1, Math.round(typed * t.length)));
  return (
    <div style={{ position: "absolute", left: x + d.x, top: y + d.y, width: w, zIndex: z,
      opacity: Math.min(1, k * 2.2),
      transform: `scale(${s0}) rotate(${d.r * 0.5 + pop}deg)`,
      transformOrigin: flip ? "88% 118%" : "12% 118%" }}>
      <div style={{ position: "relative", background: c, borderRadius: 18,
        border: "4px solid #2A2118", padding: "16px 20px", boxShadow: SH_D }}>
        <span style={{ fontFamily: "Inter, system-ui, sans-serif", fontWeight: 900,
          fontSize: 27, lineHeight: 1.18, letterSpacing: "-0.01em", color: "#241F17",
          display: "block" }}>{shown}
          {typed < 1 && (
            <span style={{ display: "inline-block", width: 13, height: 22,
              marginLeft: 2, verticalAlign: "-3px", background: CLAY }} />
          )}
        </span>
      </div>
      <div style={{ position: "absolute", left: flip ? undefined : 34,
        right: flip ? 34 : undefined, top: "100%", width: 0, height: 0,
        borderLeft: "16px solid transparent", borderRight: "16px solid transparent",
        borderTop: "26px solid #2A2118" }} />
      <div style={{ position: "absolute", left: flip ? undefined : 39,
        right: flip ? 39 : undefined, top: "100%", width: 0, height: 0,
        borderLeft: "11px solid transparent", borderRight: "11px solid transparent",
        borderTop: `19px solid ${c}` }} />
    </div>
  );
};

/** ⭐ AN ACTUAL ROADMAP — a route that DRAWS ITSELF across the panel with seven
    stops appearing as it reaches them, and a marker travelling the line.
    Replaces seven labelled blocks sitting in a row, which is a bar chart. */
export const Roadmap: React.FC<{ f: number; a: number; b: number; z?: number;
  stops?: number }> = ({ f, a, b, z = 46, stops = 7 }) => {
  const a0 = a, b0 = b;
  const p = Math.max(0, Math.min(1, (f - a) / (b - a)));
  const PT = Array.from({ length: stops }, (_, i) => ({
    /* ⛔ x starts at 150, not 96. S8's push is 1.17 and `Scene` scales about
       panel centre, so anything left of 506-486/1.17 = 91 walks off-frame by
       the scene's last frame — pin 1 rendered half outside the panel. Same
       constraint that bit the PromptUI placement. */
    x: 150 + i * 118,
    y: 396 + Math.sin(i * 1.15 + 0.4) * 122,
  }));
  const d = PT.map((q, i) => (i ? `L ${q.x} ${q.y}` : `M ${q.x} ${q.y}`)).join(" ");
  const LEN = 1500;
  /* where the travelling marker is right now */
  const fi = p * (stops - 1);
  const i0 = Math.min(stops - 2, Math.floor(fi)), fr = fi - i0;
  const mx = PT[i0].x + (PT[i0 + 1].x - PT[i0].x) * fr;
  const my = PT[i0].y + (PT[i0 + 1].y - PT[i0].y) * fr;
  return (
    <div style={{ position: "absolute", inset: 0, zIndex: z }}>
      <svg width={W} height={H} style={{ position: "absolute", inset: 0 }}>
        {/* the road bed, dashed like a route on a map */}
        <path d={d} fill="none" stroke="#6B5A44" strokeWidth={34}
          strokeLinecap="round" strokeLinejoin="round" opacity={0.30} />
        <path d={d} fill="none" stroke={GOLD} strokeWidth={18}
          strokeLinecap="round" strokeLinejoin="round"
          strokeDasharray={`${LEN}`} strokeDashoffset={LEN * (1 - p)} />
        <path d={d} fill="none" stroke="#FFF3D2" strokeWidth={4}
          strokeDasharray="14 18" strokeLinecap="round"
          opacity={0.75} style={{ strokeDashoffset: -f * 1.6 }} />
      </svg>
      {PT.map((q, i) => {
        const k = Math.max(0, Math.min(1, (p * (stops - 1) - i + 0.85) / 0.85));
        if (k <= 0.02) return null;
        const c = [CLAY, GOLD, GREEN, SKY, "#7C6BD0", RED, CLAY][i];
        const done = p * (stops - 1) > i + 0.2;
          /* ⛔ a landed pin that stops is seven objects going still one after
             another. Each keeps its own drift phase, and each rocks on the
             frame it lands, so the route stays alive behind the marker. */
          const dp = drift(f, i * 1.9 + 2, done ? 0.9 : 0.35);
          return (
          <div key={"st" + i} style={{ position: "absolute", left: q.x - 42 + dp.x,
            top: q.y - 42 - (1 - k) * 46 + dp.y, zIndex: z + 4 + i,
            opacity: Math.min(1, k * 1.6),
            transform: `scale(${0.5 + k * 0.5 + (done ? 0 : 0.12)}) `
              + `rotate(${dp.r * 0.8 + rock(f, a0 + i * (b0 - a0) / stops, 4.2, 16)}deg)` }}>
            {/* the pin */}
            <div style={{ width: 84, height: 84, borderRadius: "50% 50% 50% 6%",
              transform: "rotate(-45deg)", background: c,
              border: `5px solid ${dkh(c, 0.32)}`, boxShadow: SH,
              display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ transform: "rotate(45deg)", fontFamily: "Inter, sans-serif",
                fontWeight: 900, fontSize: 34, color: "#FFF6E4" }}>{i + 1}</span>
            </div>
            {/* the day's 45 minutes, as a real quantity under its own stop */}
            <div style={{ position: "absolute", left: -2, top: 92, width: 92, height: 24,
              borderRadius: 5, background: "#2A2118", display: "flex",
              alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontFamily: MONO, fontWeight: 800,
                letterSpacing: "0.04em", color: "#F2E6CC", fontSize: 15 }}>45 MIN</span>
            </div>
          </div>
        );
      })}
      {/* the marker walking the route */}
      {p > 0.01 && p < 0.995 && (
        <div style={{ position: "absolute", left: mx - 28, top: my - 28, zIndex: z + 40,
          width: 56, height: 56, borderRadius: "50%", background: "#FFFFFF",
          border: `5px solid ${CLAY}`, boxShadow: SH,
          display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Img src={staticFile("claude_logo.png")}
            style={{ width: 31, height: 31, objectFit: "contain" }} />
        </div>
      )}
    </div>
  );
};
