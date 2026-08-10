import React from "react";
import { Img, staticFile } from "remotion";
import { inter } from "./fonts";
import { Mascot, MONO } from "./SlopKit";
import { PAPER, INK, INK_L, MUTE, CLAY, GO, RED, GOLD, SH, SH_D } from "./RowRituals";

/* =========================================================================
   REEL 92 "JOBS" · THE PROPS.

   The world engine is RowSurfaces' `Site` (unchanged — chassis stays byte
   identical, playbook C6). Everything in THIS file is the reel's own
   vocabulary: a street of doors, the portal that swallows your applications,
   and the four things the system does to it.

   ⛔ ONE KNOCKOFF BRAND FOR THE WHOLE REEL: APPLYVAULT. It is the villain and
      it is a SLOT, never a screen. Two brand names would be a continuity break.
   ⛔ IT IS UNDEFEATED UNTIL S7. Its lamp is lit in every scene it appears in
      and goes dark exactly once, on the knock.
   ⛔ MATTE PAINTS, DARK SHADOWS. No coloured glow, no washes, no neon.
      The only lit things are real light sources: a lantern, a doorway, a lamp.
   ========================================================================= */

export const STEEL = "#6E7581", STEEL_D = "#4A505A", STEEL_L = "#98A0AC";
export const WOOD = "#8A5C3A", WOOD_D = "#6B4529", WOOD_L = "#A87446";
export const PAPER_W = "#F3EDE0";

const box = (
  x: number, y: number, w: number, h: number, c: string, r = 0, z = 30,
): React.CSSProperties => ({
  position: "absolute", left: x, top: y, width: w, height: h,
  background: c, borderRadius: r, zIndex: z,
});

/* ---------------------------------------------------------------------------
   THE DOOR — the reel's atom. A job posting IS a door: you knock, or you don't.

   ⛔ IT DRAWS UPWARD FROM ITS BASE, like every `Piece` in RowSurfaces, so `y` is
      where it STANDS on the ground. Getting this wrong is what made reel 91's
      lamps hang in mid-air.
   ------------------------------------------------------------------------ */
export const Door: React.FC<{
  x: number; y: number; s?: number; z?: number;
  sign?: string;              // the posting title, on a plate ON the door
  slot?: boolean;             // an APPLYVAULT slot in the face
  slotLive?: boolean;         // its lamp lit (it always is, until S7)
  open?: number;              // 0..1 — swings open, warm interior behind
  fall?: number;              // 0..1 — the FACE tips forward into the lot
  dim?: boolean;              // further down the row
  c?: string;
  hollow?: boolean;           // nothing behind it: the doorway is a bare frame
}> = ({ x, y, s = 1, z = 30, sign, slot, slotLive = true, open = 0, fall = 0, dim, c = WOOD, hollow }) => {
  const W = 232, H = 396;
  const face = dim ? WOOD_D : c;
  /* ⛔ THE FRAME STAYS AND ONLY THE FACE FALLS. Rotating the whole door meant
     that at fall=1 the entire object was edge-on, i.e. INVISIBLE, and S5 read
     as an empty rectangle instead of "a facade went over". The leaf now
     rotates about its own base and lands as a foreshortened rectangle on the
     ground, where you can still see it. */
  const lit = open > 0.02;
  return (
    <div style={{ position: "absolute", left: x, top: y - H * s, width: W * s, height: H * s,
      zIndex: z, opacity: dim ? 0.86 : 1 }}>
      {/* the doorway behind it — warm when it opens, black when it does not, and
          ⛔ TRANSPARENT when the listing was fake, so the lot behind SHOWS
          THROUGH the frame. Painting it a solid tan read as a wall, which is the
          exact opposite of "there was nothing behind it". */}
      <div style={{ ...box(0, 0, W * s, H * s, lit ? "#E8B96A" : hollow ? "transparent" : "#221C18", 6 * s, 1) }} />
      {lit && (
        <div style={{ ...box(0, 0, W * s, H * s, "transparent", 6 * s, 2),
          boxShadow: `inset 0 0 ${70 * s}px ${hexi("#F6D79A", 0.9)}` }} />
      )}
      <div style={{ ...box(0, 0, W * s, H * s, "transparent", 6 * s, 3),
        border: `${11 * s}px solid ${dim ? "#5C4A38" : "#6B5B48"}`, borderRadius: 6 * s }} />
      {/* the leaf */}
      <div style={{ position: "absolute", left: 0, top: 0, width: W * s, height: H * s,
        transformOrigin: fall > 0 ? "50% 100%" : "0% 50%", zIndex: fall > 0.5 ? 44 : 4,
        transform: fall > 0
          ? `perspective(820px) rotateX(${fall * 64}deg) translateY(${fall * 150 * s}px)`
          : `perspective(760px) rotateY(${-open * 62}deg)` }}>
        <div style={{ ...box(0, 0, W * s, H * s, face, 6 * s, 4), boxShadow: SH_D }} />
        <div style={{ ...box(14 * s, 20 * s, (W - 28) * s, 140 * s, dim ? "#5C3B23" : WOOD_D, 4 * s, 5), opacity: 0.55 }} />
        <div style={{ ...box(14 * s, 246 * s, (W - 28) * s, 128 * s, dim ? "#5C3B23" : WOOD_D, 4 * s, 5), opacity: 0.55 }} />
        <div style={{ ...box((W - 40) * s, 200 * s, 20 * s, 20 * s, "#D9C48A", 10 * s, 8) }} />
        {slot && <Slot x={46 * s} y={186 * s} s={0.86 * s} live={slotLive} z={9} />}
        {/* ⛔ THE POSTING TITLE SITS ON THE DOOR, NOT ABOVE IT. Above it, the
            tallest doors pushed it behind the header card and it was clipped
            on the very first frame of the reel. */}
        {sign && (
          <div style={{ position: "absolute", left: 14 * s, top: 34 * s, width: (W - 28) * s,
            zIndex: 10, padding: `${10 * s}px ${6 * s}px`, background: PAPER_W, boxShadow: SH,
            borderRadius: 5 * s, textAlign: "center", fontFamily: inter.fontFamily,
            fontWeight: 900, color: INK, lineHeight: 1.06,
            fontSize: Math.min(30, (30 * 15) / Math.max(10, sign.length)) * s }}>{sign}</div>
        )}
      </div>
    </div>
  );
};

const hexi = (h: string, a: number) => {
  const n = parseInt(h.slice(1), 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
};

/* ---------------------------------------------------------------------------
   APPLYVAULT — the villain. A bolted steel letterbox. Things go in. Nothing
   has ever come out. `live` is its lamp; it goes dark once, in S7.
   ------------------------------------------------------------------------ */
export const Slot: React.FC<{ x: number; y: number; s?: number; z?: number; live?: boolean;
  flap?: number; big?: boolean }> = ({ x, y, s = 1, z = 40, live = true, flap = 0, big }) => {
  const W = big ? 300 : 150;
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: z }}>
      <div style={{ ...box(0, 0, W * s, (big ? 116 : 58) * s, STEEL, 7 * s, 1), boxShadow: SH_D }} />
      <div style={{ ...box(0, 0, W * s, (big ? 116 : 58) * s, "transparent", 7 * s, 2),
        border: `${3 * s}px solid ${STEEL_D}`, borderRadius: 7 * s }} />
      {/* the mouth, and its flap */}
      <div style={{ ...box(W * 0.09 * s, (big ? 30 : 15) * s, W * 0.66 * s, (big ? 22 : 11) * s, "#15181D", 3 * s, 3) }} />
      <div style={{ position: "absolute", left: W * 0.09 * s, top: (big ? 30 : 15) * s,
        width: W * 0.66 * s, height: (big ? 22 : 11) * s, background: STEEL_L, zIndex: 4,
        transformOrigin: "50% 0%", transform: `rotateX(${flap * 74}deg)` }} />
      {/* the brand, stencilled */}
      <div style={{ position: "absolute", left: 0, top: (big ? 70 : 34) * s, width: W * s,
        textAlign: "center", zIndex: 5, fontFamily: MONO, fontWeight: 800,
        fontSize: (big ? 26 : 13) * s, letterSpacing: "0.16em", color: "#D6DBE2" }}>APPLYVAULT</div>
      {/* its lamp */}
      <div style={{ ...box(W * 0.82 * s, (big ? 32 : 16) * s, (big ? 20 : 10) * s, (big ? 20 : 10) * s,
        live ? RED : "#3A3F47", 999, 6) }} />
      {/* the bolts, four of them, so it reads as fixed to the door for good */}
      {[[6, 6], [W - 14, 6], [6, (big ? 100 : 44)], [W - 14, (big ? 100 : 44)]].map(([bx, by], i) => (
        <div key={i} style={{ ...box(bx * s, by * s, 8 * s, 8 * s, STEEL_D, 999, 7) }} />
      ))}
    </div>
  );
};

/** one application. */
export const Env: React.FC<{ x: number; y: number; s?: number; z?: number; rot?: number;
  stamp?: boolean }> = ({ x, y, s = 1, z = 40, rot = 0, stamp }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z,
    transform: `rotate(${rot}deg)` }}>
    <div style={{ ...box(0, 0, 96 * s, 66 * s, PAPER_W, 4 * s, 1), boxShadow: SH }} />
    <div style={{ position: "absolute", left: 0, top: 0, width: 96 * s, height: 34 * s,
      background: "#E2D8C4", zIndex: 2, clipPath: "polygon(0 0, 100% 0, 50% 100%)" }} />
    {stamp && (
      <div style={{ position: "absolute", left: 18 * s, top: 36 * s, zIndex: 3,
        padding: `${2 * s}px ${7 * s}px`, border: `${2.5 * s}px solid ${RED}`, borderRadius: 3 * s,
        fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 13 * s, color: RED,
        transform: "rotate(-9deg)" }}>NO REPLY</div>
    )}
  </div>
);

/** the heap of them. ⛔ IT PILES UP FROM `y` AS A BASE and narrows as it rises,
    so it reads as a heap resting on the ground rather than envelopes scattered
    in mid-air. Taller than the handle, so the door could not open anyway. */
export const Heap: React.FC<{ x: number; y: number; n?: number; s?: number; z?: number;
  w?: number; grow?: number }> = ({ x, y, n = 34, s = 1, z = 36, w = 300, grow = 1 }) => (<>
  {Array.from({ length: Math.round(n * grow) }, (_, i) => {
    const r = (k: number) => { const v = Math.sin(i * 91.7 + k * 41.3) * 4371.7; return v - Math.floor(v); };
    const rows = 5, row = Math.min(rows - 1, Math.floor(i / Math.ceil(n / rows)));
    const shrink = 1 - row * 0.17;
    return (
      <Env key={i} s={0.78 * s} z={z + row}
        x={x + (r(1) - 0.5) * w * s * shrink}
        y={y - row * 30 * s - r(2) * 10 * s}
        rot={(r(3) - 0.5) * 52} />
    );
  })}
</>);

/* ---------------------------------------------------------------------------
   THE COUNTER. The open's whole proof: it goes UP on the left and NEVER on the
   right. ⛔ Same 740 as S1's tally — one number, two uses.
   ------------------------------------------------------------------------ */
export const Counter: React.FC<{ x: number; y: number; sent: number; replies?: number;
  s?: number; z?: number }> = ({ x, y, sent, replies = 0, s = 1, z = 70 }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z, display: "flex",
    gap: 12 * s, padding: `${14 * s}px ${18 * s}px`, borderRadius: 14 * s,
    background: "#191D24", boxShadow: SH_D, border: `${3 * s}px solid #2B313A` }}>
    {[["SENT", Math.round(sent).toLocaleString(), "#E8DFCE"], ["REPLIES", String(replies), RED]].map(
      ([k, v, c], i) => (
      <div key={i} style={{ padding: `${6 * s}px ${16 * s}px`, borderRadius: 9 * s,
        background: "#0F1319", textAlign: "center" }}>
        <div style={{ fontFamily: MONO, fontWeight: 800, fontSize: 17 * s, letterSpacing: "0.14em",
          color: "#7C8595" }}>{k}</div>
        <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 54 * s,
          lineHeight: 1.02, color: c as string, fontVariantNumeric: "tabular-nums" }}>{v}</div>
      </div>
    ))}
  </div>
);

/* ---------------------------------------------------------------------------
   THE GRADE PLATE. The repo grades every listing A-F on a 1.0-5.0 rubric, so
   the plate carries both. ⛔ SUPPORTING, NEVER THE HERO: this is the system
   scoring its own read, which is the same trap as CALLBACK's % gauge.
   ------------------------------------------------------------------------ */
export const Grade: React.FC<{ x: number; y: number; g: string; v: string; s?: number;
  z?: number; t?: number }> = ({ x, y, g, v, s = 1, z = 62, t = 1 }) => {
  const c = g === "A" ? GO : g === "F" ? RED : GOLD;
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: z,
      transform: `scale(${Math.max(0.02, t)}) rotate(${(1 - t) * -16}deg)`,
      transformOrigin: "50% 50%", opacity: t > 0.02 ? 1 : 0 }}>
      <div style={{ ...box(0, 0, 132 * s, 132 * s, PAPER_W, 12 * s, 1), boxShadow: SH_D,
        border: `${6 * s}px solid ${c}` }} />
      <div style={{ position: "absolute", left: 0, top: 6 * s, width: 132 * s, textAlign: "center",
        zIndex: 2, fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 76 * s,
        lineHeight: 1, color: c }}>{g}</div>
      <div style={{ position: "absolute", left: 0, top: 88 * s, width: 132 * s, textAlign: "center",
        zIndex: 2, fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 30 * s,
        color: INK_L, fontVariantNumeric: "tabular-nums" }}>{v}</div>
      {[[8, 8], [112, 8], [8, 112], [112, 112]].map(([bx, by], i) => (
        <div key={i} style={{ ...box(bx * s, by * s, 11 * s, 11 * s, "#B9AF9A", 999, 3) }} />
      ))}
    </div>
  );
};

/** a dated re-post. Eleven of these on a wall is the ghost-job beat. */
export const Poster: React.FC<{ x: number; y: number; date: string; s?: number; z?: number;
  rot?: number; t?: number; wet?: boolean }> =
  ({ x, y, date, s = 1, z = 40, rot = 0, t = 1, wet }) => (
  <div style={{ position: "absolute", left: x, top: y - (1 - t) * 210, zIndex: z,
    opacity: t > 0.02 ? 1 : 0, transform: `rotate(${rot}deg) scale(${0.9 + t * 0.1})` }}>
    <div style={{ ...box(0, 0, 154 * s, 200 * s, wet ? "#FFFFFF" : PAPER_W, 4 * s, 1), boxShadow: SH }} />
    {[0, 1, 2, 3].map((i) => (
      <div key={i} style={{ ...box(16 * s, (44 + i * 26) * s, (110 - (i % 2) * 34) * s, 11 * s, "#CFC5B2", 3 * s, 2) }} />
    ))}
    <div style={{ ...box(16 * s, 14 * s, 92 * s, 18 * s, MUTE, 3 * s, 2) }} />
    <div style={{ position: "absolute", left: 16 * s, top: 156 * s, zIndex: 3,
      padding: `${3 * s}px ${9 * s}px`, border: `${2.5 * s}px solid ${RED}`, borderRadius: 3 * s,
      fontFamily: MONO, fontWeight: 800, fontSize: 15 * s, color: RED,
      transform: "rotate(-6deg)" }}>{date}</div>
  </div>
);

/* ---------------------------------------------------------------------------
   THE OFFER BOARD — ⛔ THE REEL'S HERO ARTIFACT.

   The first figure is struck through and a higher one goes up. That is the
   thing the hook promised at 2.9s, it is mute-legible in under 2 seconds, and
   nothing else in S8 may move while it happens.

   ⛔ NO CURRENCY FIGURE. The repo publishes no salary number, so the raise is a
      BAR getting longer plus a struck-out first mark — never "$120k -> $148k",
      which would be an invented on-screen fact about someone's real offer.
   ------------------------------------------------------------------------ */
export const OfferBoard: React.FC<{ x: number; y: number; s?: number; z?: number;
  first: number; raise: number; strike: number }> =
  ({ x, y, s = 1, z = 60, first, raise, strike }) => {
  const BW = 620, low = 0.44, high = 0.94;
  /* ⛔ THE OUTER BOX NEEDS AN EXPLICIT WIDTH. Without one it shrink-wraps to its
     absolutely-positioned children, which are zero-width, so every label wrapped
     mid-phrase and "THE OFFER" came out as two stacked lines. */
  return (
    <div style={{ position: "absolute", left: x, top: y, width: (BW + 84) * s,
      height: 396 * s, zIndex: z }}>
      <div style={{ ...box(0, 0, (BW + 84) * s, 396 * s, "#2A3038", 18 * s, 1), boxShadow: SH_D }} />
      <div style={{ ...box(18 * s, 18 * s, (BW + 48) * s, 360 * s, "#1B2027", 12 * s, 2),
        border: `${3 * s}px solid #39414B` }} />
      <div style={{ position: "absolute", left: 44 * s, top: 40 * s, zIndex: 4,
        fontFamily: MONO, fontWeight: 800, fontSize: 25 * s, letterSpacing: "0.16em",
        color: "#7C8595" }}>THE OFFER</div>
      {/* THEIR number: the label, the bar, and then the strike through both */}
      {/* ⛔ NOWRAP. At 26px these two labels wrapped onto their own bars and the
          board read as a pile of overlapping text. */}
      <div style={{ position: "absolute", left: 44 * s, top: 88 * s, zIndex: 5, whiteSpace: "nowrap",
        fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 23 * s,
        letterSpacing: "0.02em", color: "#8E97A4" }}>WHAT THEY OPENED WITH</div>
      <div style={{ ...box(44 * s, 128 * s, BW * low * s * first, 46 * s, "#6F7885", 7 * s, 4) }} />
      <div style={{ position: "absolute", left: 40 * s, top: 148 * s, width: (BW * low + 14) * s,
        height: 8 * s, borderRadius: 4 * s, background: RED, zIndex: 8, transformOrigin: "0% 50%",
        transform: `scaleX(${strike}) rotate(-2.5deg)` }} />
      {/* YOURS. ⛔ The hero: it is taller, gold, and it overshoots theirs. */}
      <div style={{ position: "absolute", left: 44 * s, top: 202 * s, zIndex: 5, opacity: raise,
        whiteSpace: "nowrap", fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 23 * s,
        letterSpacing: "0.02em", color: GOLD }}>WHAT IT WRITES BACK</div>
      <div style={{ ...box(44 * s, 238 * s, BW * high * s * raise, 74 * s, GOLD, 7 * s, 4),
        boxShadow: raise > 0.05 ? `0 ${8 * s}px ${18 * s}px rgba(90,66,20,0.45)` : undefined }} />
      <div style={{ position: "absolute", left: 44 * s, top: 330 * s, zIndex: 5,
        padding: `${6 * s}px ${14 * s}px`, borderRadius: 8 * s, background: "#0F1319",
        fontFamily: MONO, fontWeight: 800, fontSize: 21 * s, letterSpacing: "0.06em",
        color: "#8E97A4", textDecoration: "line-through", whiteSpace: "nowrap",
        opacity: raise }}>GEOGRAPHIC DISCOUNT</div>
      {/* the arrow that says which way it went */}
      <div style={{ position: "absolute", left: (BW + 6) * s, top: 200 * s, zIndex: 7,
        width: 0, height: 0, opacity: raise,
        borderLeft: `${32 * s}px solid transparent`, borderRight: `${32 * s}px solid transparent`,
        borderBottom: `${52 * s}px solid ${GOLD}`,
        transform: `translateY(${(1 - raise) * 54}px)` }} />
    </div>
  );
};

/* ---------------------------------------------------------------------------
   THE CONTRACT. `offer-prep` is a "contract reading companion — clause walk
   plus a lawyer question list", so the scroll walks a marker down real clause
   rows: ticks as it clears them, and ONE flag, because a reader that approves
   everything is not reading.
   ------------------------------------------------------------------------ */
export const Scroll: React.FC<{ x: number; y: number; s?: number; z?: number; open: number;
  walk: number; rows?: number; flagAt?: number }> =
  ({ x, y, s = 1, z = 56, open, walk, rows = 7, flagAt = 4 }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z }}>
    <div style={{ ...box(0, 0, 470 * s, 470 * s * open, PAPER_W, 6 * s, 1), boxShadow: SH_D,
      overflow: "hidden" }}>
      {Array.from({ length: rows }, (_, i) => {
        const done = walk > (i + 0.6) / rows;
        const flag = i === flagAt;
        return (
          <div key={i} style={{ position: "absolute", left: 26 * s, top: (26 + i * 60) * s,
            width: 418 * s, height: 44 * s, display: "flex", alignItems: "center", gap: 14 * s }}>
            {/* ⛔ THE UNREAD ROWS WERE #DCD3C0 ON #F3EDE0 — about 8 luma apart, so
                a scroll of eight clauses read as a blank sheet. */}
            <div style={{ width: 32 * s, height: 32 * s, borderRadius: 7 * s,
              background: done ? (flag ? GOLD : GO) : "#B4A992",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 22 * s, color: PAPER }}>
              {done ? (flag ? "!" : "✓") : ""}
            </div>
            <div style={{ flex: 1, height: 15 * s, borderRadius: 4 * s,
              background: done ? "#6E6250" : "#A79C86", width: `${58 + ((i * 37) % 40)}%` }} />
          </div>
        );
      })}
      {/* the marker walking down it */}
      <div style={{ position: "absolute", left: 12 * s, top: (18 + walk * (rows - 0.4) * 60) * s,
        width: 446 * s, height: 58 * s, borderRadius: 8 * s,
        background: hexi(CLAY, 0.16), border: `${3 * s}px solid ${CLAY}` }} />
    </div>
    {/* the roll it is coming off */}
    <div style={{ ...box(-14 * s, 470 * s * open - 12 * s, 498 * s, 30 * s, "#D7CDB8", 15 * s, 3),
      boxShadow: SH }} />
  </div>
);

/** the tally the author keeps as he walks the row */
export const Tally: React.FC<{ x: number; y: number; n: number; s?: number; z?: number;
  cap?: string }> = ({ x, y, n, s = 1, z = 66, cap = "POSTINGS READ" }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z, padding: `${16 * s}px ${26 * s}px`,
    borderRadius: 14 * s, background: PAPER, boxShadow: SH_D, textAlign: "center" }}>
    <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 74 * s, lineHeight: 1,
      letterSpacing: "-0.04em", color: INK, fontVariantNumeric: "tabular-nums" }}>
      {Math.round(n).toLocaleString()}
    </div>
    <div style={{ fontFamily: MONO, fontWeight: 800, fontSize: 18 * s, letterSpacing: "0.14em",
      color: MUTE, marginTop: 4 * s }}>{cap}</div>
  </div>
);

/** the repo, on a slab, with the star count the VO actually says. */
export const StarSlab: React.FC<{ x: number; y: number; s?: number; z?: number; stars: number;
  t?: number }> = ({ x, y, s = 1, z = 62, stars, t = 1 }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z,
    transform: `scale(${Math.max(0.02, t)})`, transformOrigin: "50% 100%" }}>
    <div style={{ ...box(0, 0, 660 * s, 250 * s, PAPER, 22 * s, 1), boxShadow: SH_D }} />
    <div style={{ position: "absolute", left: 36 * s, top: 34 * s, display: "flex",
      alignItems: "center", gap: 16 * s, zIndex: 2, whiteSpace: "nowrap" }}>
      <Img src={staticFile("logos/github.svg")}
           style={{ width: 62 * s, height: 62 * s, objectFit: "contain", flexShrink: 0 }} />
      <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 34 * s,
        letterSpacing: "-0.02em", color: INK_L, whiteSpace: "nowrap" }}>career-ops</div>
      <div style={{ padding: `${7 * s}px ${15 * s}px`, borderRadius: 9 * s, background: "#EFE7D8",
        fontFamily: MONO, fontWeight: 800, fontSize: 20 * s, letterSpacing: "0.1em",
        color: INK_L, whiteSpace: "nowrap" }}>MIT</div>
    </div>
    <div style={{ position: "absolute", left: 36 * s, top: 118 * s, display: "flex",
      alignItems: "center", gap: 14 * s, zIndex: 2 }}>
      <div style={{ fontSize: 76 * s, lineHeight: 1, color: GOLD }}>{"★"}</div>
      <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 92 * s, lineHeight: 1,
        letterSpacing: "-0.05em", color: INK, fontVariantNumeric: "tabular-nums" }}>
        {Math.round(stars).toLocaleString()}
      </div>
    </div>
  </div>
);

/** a star, falling onto the slab */
export const FallStar: React.FC<{ x: number; y: number; s?: number; z?: number; o?: number }> =
  ({ x, y, s = 1, z = 50, o = 1 }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z, opacity: o,
    fontSize: 40 * s, lineHeight: 1, color: GOLD,
    textShadow: "0 3px 6px rgba(60,44,28,0.35)" }}>{"★"}</div>
);

/** a lantern the Scout carries down the row */
export const Lantern: React.FC<{ x: number; y: number; s?: number; z?: number; f: number }> =
  ({ x, y, s = 1, z = 64, f }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z }}>
    <div style={{ ...box(0, 0, 7 * s, 40 * s, "#4B4038", 3 * s, 2) }} />
    <div style={{ ...box(-24 * s, 40 * s, 56 * s, 60 * s, "#3B3229", 8 * s, 2) }} />
    <div style={{ ...box(-16 * s, 48 * s, 40 * s, 44 * s, "#F0C368", 5 * s, 3),
      opacity: 0.86 + Math.sin(f / 6) * 0.1 }} />
  </div>
);

/** the person who was behind the door the whole time */
export const Manager: React.FC<{ f: number; x: number; y: number; s?: number; z?: number;
  t?: number }> = ({ f, x, y, s = 1, z = 52, t = 1 }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z, opacity: t,
    transform: `translateY(${(1 - t) * 26}px)` }}>
    <Mascot lf={f} size={188 * s} suit={1} gaze={-2} nodAmp={2.4} nodSpeed={7} />
    <div style={{ position: "absolute", left: 6 * s, top: 196 * s, padding: `${6 * s}px ${14 * s}px`,
      borderRadius: 8 * s, background: INK, fontFamily: MONO, fontWeight: 800, fontSize: 17 * s,
      letterSpacing: "0.1em", color: PAPER, whiteSpace: "nowrap" }}>HIRING MANAGER</div>
  </div>
);

/** the letter, already written. ⛔ GATE THE HOW: the subject line is legible,
    the body never is. */
export const Letter: React.FC<{ x: number; y: number; s?: number; z?: number; t?: number;
  subject?: string }> = ({ x, y, s = 1, z = 66, t = 1, subject = "Re: Applied AI role, one question"   /* ⛔ zero em dashes, on screen included */ }) => (
  /* ⛔ EXPLICIT WIDTH, same trap as OfferBoard: with none, the card shrink-wraps
     its absolutely-positioned children and "TO: HIRING MANAGER" wrapped onto two
     lines straight through the subject line. */
  <div style={{ position: "absolute", left: x, top: y, width: 320 * s, height: 210 * s, zIndex: z,
    transform: `scale(${Math.max(0.02, t)}) rotate(${(1 - t) * 9}deg)`, transformOrigin: "0% 100%",
    opacity: t > 0.02 ? 1 : 0 }}>
    <div style={{ ...box(0, 0, 320 * s, 210 * s, PAPER_W, 8 * s, 1), boxShadow: SH_D }} />
    <div style={{ position: "absolute", left: 18 * s, top: 16 * s, zIndex: 2, whiteSpace: "nowrap",
      fontFamily: MONO, fontWeight: 800, fontSize: 15 * s, letterSpacing: "0.1em",
      color: MUTE }}>TO: HIRING MANAGER</div>
    <div style={{ position: "absolute", left: 18 * s, top: 48 * s, width: 284 * s, zIndex: 2,
      fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 21 * s, lineHeight: 1.16,
      color: INK }}>{subject}</div>
    {/* the body: blurred to unreadable on purpose */}
    {[0, 1, 2, 3, 4].map((i) => (
      <div key={i} style={{ ...box(18 * s, (104 + i * 20) * s, (284 - (i % 3) * 62) * s, 10 * s,
        "#CFC5B2", 3 * s, 2), filter: "blur(1.5px)" }} />
    ))}
  </div>
);
