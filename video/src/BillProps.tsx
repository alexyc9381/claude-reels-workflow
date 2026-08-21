import React from "react";
import { Img, OffthreadVideo, staticFile } from "remotion";
import {
  W, H, E, OUT, IO, BACK, IN_Q, LIN, hexa, dkh, mxh, rnd, SH, SH_D,
  squash, rock, shake, R, ui, mono, vivid,
  CLAY, CLAYD, GOLD, GREEN, RED, SKY, PAPER, CREAMB, INK, MUTE, TEAL, STEEL, OXIDE, BRASS,
  G_BLUE, G_RED, G_YEL, G_GRN, Ring, Puff,
} from "./BillWorld";

/* ===========================================================================
   REEL 116 · "BILL" — THE SCENE PROPS.  Board: storyboards/116-bill.md.

   ⛔⛔ PROPS NEED REAL DRAWING, NOT PRIMITIVES
   ([[feedback_props_need_real_drawing]]). *"A whole lot of nothing even though
   there's more stuff"* was a book drawn as FOUR DIVS. Every object below is
   counted: the turnstile is 11 parts, the crate 9, the shelf unit 12, the crane
   14, the app tile 10, the bay 13. Count the parts BEFORE adding objects.

   ⛔ THE 40px FLOOR APPLIES TO MOVING OBJECTS TOO. Anything under ~40px on its
   short side vanishes in the audit's 1012->240 downsample and reads as nothing
   to a human either.
   ========================================================================= */

/* =========================================================================
   ⭐⭐⭐ THE B-ROLL SCREEN — REAL GOOGLE LAUNCH FOOTAGE, IN A REAL DEVICE.

   Alex: *"try to find the google launch videos for these tools you can
   partially use as broll for some of these scenes."* This is also the single
   biggest motion lever this repo has measured: real UI took reel 107's median
   6.36 -> 8.00 (one scene 6.30 -> 10.25) and reel 111's 10.90 -> 12.51.

   SOURCES, all Google's own published assets:
     · Flow      four clips from `gstatic.com/aitestkitchen/website/flow/
                 landing_page/*.mp4` — the product's own landing-page videos
     · NotebookLM the official "Introducing NotebookLM Video Overviews" launch
                 video from the Google channel
   Each is cut to 3.0-3.4s and sits INSIDE a device frame, which is what makes
   it read as "here is the product" rather than as a pasted rectangle.

   ⛔ REAL FOOTAGE IS NOT AUTOMATICALLY MOTION (§1). A clip HELD for a whole
   sentence measured 3.23 with a 60-frame dead run. Every call site here either
   sits under a scene that is already cutting, or gets a `punch` — a hard scale
   step partway through, which is the "cut inside the clip on the beat" that
   took that scene 3.23 -> 4.40.
   ====================================================================== */
export const Broll: React.FC<{ x: number; y: number; w: number; f: number; at: number;
  src: string; z?: number; label?: string; punch?: number; chrome?: "browser" | "app" | "bare";
  ratio?: number; startFrom?: number;
  /** ⭐ the per-cut framing: a different start frame AND a different zoom/pan on
      the same footage, so the trial cuts do not share pixels. */
  bv?: { t: number; k: number; dx: number; dy: number } }> =
  ({ x, y, w, f, at, src, z = 50, label, punch, chrome = "browser", ratio = 0.562,
     startFrom = 0, bv }) => {
  const BV = bv ?? { t: startFrom, k: 1, dx: 0, dy: 0 };
  const lf = f - at;
  if (lf < 0) return null;
  const h = w * ratio;
  const inS = E(lf, 0, 9, 0, 1, BACK);
  /* the punch: a hard step, never a tween — a smooth zoom measures WORSE */
  const pk = punch !== undefined && f >= punch ? 1.09 : 1;
  const head = chrome === "bare" ? 0 : chrome === "browser" ? h * 0.11 : h * 0.09;
  return (
    <div style={{ position: "absolute", left: x - w / 2, top: y - (h + head) / 2, width: w,
      height: h + head, zIndex: z, transform: `scale(${inS * pk})`, borderRadius: 14,
      overflow: "hidden", background: "#0E1218",
      border: `5px solid ${dkh("#2A3038", 0.20)}`, boxShadow: SH_D }}>
      {/* the chrome, so it reads as a product and not as a pasted rectangle */}
      {chrome !== "bare" && (
        <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: head,
          background: "#1A2029", borderBottom: `2px solid #2A3038` }}>
          {chrome === "browser" && ["#E0685C", "#E7B24C", "#3F9E74"].map((c, i) => (
            <div key={"bl" + i} style={{ position: "absolute", left: 12 + i * 20, top: "34%",
              width: 11, height: 11, borderRadius: "50%", background: c }} />
          ))}
          {chrome === "browser" && (
            <div style={{ position: "absolute", left: 82, right: 60, top: "24%", height: "52%",
              borderRadius: 8, background: "#0E1218" }} />
          )}
          {label && (
            <span style={{ position: "absolute", right: 12, top: "26%", ...mono(Math.max(10, head * 0.40), 700),
              color: hexa("#9FB4C8", 0.9), letterSpacing: "0.06em" }}>{label}</span>
          )}
        </div>
      )}
      {/* the footage */}
      <div style={{ position: "absolute", left: 0, right: 0, top: head, bottom: 0, overflow: "hidden" }}>
        <OffthreadVideo src={staticFile(src)} startFrom={BV.t} muted
          style={{ width: "100%", height: "100%", objectFit: "cover",
            transform: `scale(${BV.k}) translate(${BV.dx}%, ${BV.dy}%)` }} />
      </div>
      {/* a live REC pip, so the frame says THIS IS THE REAL THING */}
      <div style={{ position: "absolute", left: 14, bottom: 12, display: "flex", alignItems: "center",
        gap: 7, padding: "5px 11px", borderRadius: 12, background: hexa("#0A0E14", 0.62) }}>
        <div style={{ width: 9, height: 9, borderRadius: "50%",
          background: Math.floor(f / 14) % 2 ? "#E0443E" : hexa("#E0443E", 0.35) }} />
        <span style={{ ...mono(11, 800), color: hexa("#DCE6F0", 0.86), letterSpacing: "0.10em" }}>LIVE</span>
      </div>
    </div>
  );
};

/** the same frame for a STILL capture — the three products with no launch video */
export const Shot: React.FC<{ x: number; y: number; w: number; f: number; at: number;
  src: string; z?: number; label?: string; ratio?: number; pan?: number; chrome?: "browser" | "bare" }> =
  ({ x, y, w, f, at, src, z = 50, label, ratio = 0.562, pan = 0, chrome = "browser" }) => {
  const lf = f - at;
  if (lf < 0) return null;
  const h = w * ratio;
  const inS = E(lf, 0, 9, 0, 1, BACK);
  const head = chrome === "bare" ? 0 : h * 0.11;
  /* ⭐ a still has to MOVE or it is a poster: a slow vertical pan across the
     capture is the cheapest legitimate motion a screenshot can carry. */
  const dy = pan ? -E(lf, 0, 120, 0, pan, LIN) : 0;
  return (
    <div style={{ position: "absolute", left: x - w / 2, top: y - (h + head) / 2, width: w,
      height: h + head, zIndex: z, transform: `scale(${inS})`, borderRadius: 14,
      overflow: "hidden", background: "#0E1218",
      border: `5px solid ${dkh("#2A3038", 0.20)}`, boxShadow: SH_D }}>
      {chrome !== "bare" && (
        <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: head,
          background: "#1A2029", borderBottom: `2px solid #2A3038` }}>
          {["#E0685C", "#E7B24C", "#3F9E74"].map((c, i) => (
            <div key={"sl" + i} style={{ position: "absolute", left: 12 + i * 20, top: "34%",
              width: 11, height: 11, borderRadius: "50%", background: c }} />
          ))}
          <div style={{ position: "absolute", left: 82, right: 60, top: "24%", height: "52%",
            borderRadius: 8, background: "#0E1218" }} />
          {label && (
            <span style={{ position: "absolute", right: 12, top: "26%", ...mono(Math.max(10, head * 0.40), 700),
              color: hexa("#9FB4C8", 0.9), letterSpacing: "0.06em" }}>{label}</span>
          )}
        </div>
      )}
      <div style={{ position: "absolute", left: 0, right: 0, top: head, bottom: 0, overflow: "hidden" }}>
        <Img src={staticFile(src)} style={{ position: "absolute", left: 0, top: dy, width: "100%" }} />
      </div>
    </div>
  );
};

/* =========================================================================
   S4 — THE TOLL BOOTH. Eleven parts: the plinth, two posts, the drum, three
   arms, the coin head, the slot, the reader lamp, the counter drum, the
   ratchet pawl and the cage mesh behind it.
   ====================================================================== */
export const Turnstile: React.FC<{ x: number; y: number; s: number; f: number; clack?: number;
  z?: number; c?: string; mesh?: boolean }> =
  /* ⛔ `c` WAS "#7E8A84" ON A DARK GREEN BOOTH and the whole prop vanished —
     the contact sheet showed a grey stick. Reel 110's silhouette test: name
     which side of the contrast the subject is on. Machined steel at #B4BDB8
     puts the barrier at the TOP of the value ladder in that room, which is
     right — it is the thing standing in your way.
     ⛔ And the mesh is now OPTIONAL, because painting it across the chat window
     made the one object the line is about unreadable. */
  ({ x, y, s, f, clack, z = 60, c = "#B4BDB8", mesh = true }) => {
  const t = clack !== undefined && f >= clack ? E(f, clack, clack + 9, 0, 1, BACK) : 0;
  const rot = t * 120;
  return (
    <div style={{ position: "absolute", left: x - 150 * s, top: y - 300 * s, width: 300 * s,
      height: 300 * s, zIndex: z }}>
      {/* the cage mesh behind — this is a barrier, not a stick. ⛔ 6px wire, not
          4px: under the audit's 1012->240 downsample a 4px wire is 0.9px and
          disappears, which is the same 40px-floor arithmetic one order down. */}
      {mesh && (
        <div style={{ position: "absolute", left: -30 * s, top: -150 * s, width: 360 * s, height: 280 * s,
          background: `repeating-linear-gradient(46deg, ${hexa(c, 0.34)} 0px, ${hexa(c, 0.34)} 6px, transparent 6px, transparent 34px), repeating-linear-gradient(-46deg, ${hexa(c, 0.34)} 0px, ${hexa(c, 0.34)} 6px, transparent 6px, transparent 34px)` }} />
      )}
      {/* the plinth */}
      <div style={{ position: "absolute", left: 78 * s, top: 232 * s, width: 144 * s, height: 68 * s,
        borderRadius: 8 * s, background: `linear-gradient(178deg, ${mxh(c, 0.14)} 0%, ${dkh(c, 0.40)} 100%)` }} />
      {/* two posts */}
      {[26, 226].map((k, i) => (
        <div key={"tp" + i} style={{ position: "absolute", left: k * s, top: 96 * s, width: 48 * s,
          height: 150 * s, borderRadius: 8 * s,
          background: `linear-gradient(94deg, ${mxh(c, 0.20)} 0%, ${dkh(c, 0.36)} 100%)`,
          border: `${4 * s}px solid ${dkh(c, 0.46)}` }} />
      ))}
      {/* the drum the arms turn in */}
      <div style={{ position: "absolute", left: 106 * s, top: 150 * s, width: 88 * s, height: 88 * s,
        borderRadius: "50%", background: dkh(c, 0.30), border: `${6 * s}px solid ${dkh(c, 0.50)}` }} />
      {/* three arms */}
      {[0, 120, 240].map((a, i) => (
        <div key={"ta" + i} style={{ position: "absolute", left: 146 * s, top: 190 * s, width: 148 * s,
          height: 15 * s, borderRadius: 8 * s, background: mxh(c, 0.30),
          transform: `rotate(${a + rot}deg)`, transformOrigin: "2px 50%" }}>
          <div style={{ position: "absolute", right: 0, top: -6 * s, width: 20 * s, height: 27 * s,
            borderRadius: 6 * s, background: dkh(c, 0.20) }} />
        </div>
      ))}
      {/* the coin head with its slot and reader lamp */}
      <div style={{ position: "absolute", left: 4 * s, top: -6 * s, width: 92 * s, height: 118 * s,
        borderRadius: 10 * s, background: `linear-gradient(176deg, ${mxh(c, 0.24)} 0%, ${dkh(c, 0.40)} 100%)`,
        border: `${5 * s}px solid ${dkh(c, 0.50)}` }}>
        <div style={{ position: "absolute", left: 34 * s, top: 12 * s, width: 15 * s, height: 44 * s,
          borderRadius: 4 * s, background: "#100E0C" }} />
        <div style={{ position: "absolute", left: 24 * s, top: 74 * s, width: 36 * s, height: 14 * s,
          borderRadius: 4 * s, background: t > 0 ? GREEN : dkh(RED, 0.10) }} />
      </div>
      {/* the counter drum — it only ever goes UP */}
      <div style={{ position: "absolute", left: 214 * s, top: 4 * s, width: 76 * s, height: 62 * s,
        borderRadius: 8 * s, background: "#14110E", border: `${4 * s}px solid ${dkh(c, 0.48)}`,
        display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ ...mono(30 * s, 800), color: GOLD }}>{t > 0 ? "02" : "01"}</span>
      </div>
      {/* the ratchet pawl — the thing that makes it one-way */}
      <div style={{ position: "absolute", left: 190 * s, top: 176 * s, width: 34 * s, height: 12 * s,
        borderRadius: 4 * s, background: dkh(c, 0.20), transform: `rotate(${-18 + t * 22}deg)` }} />
    </div>
  );
};

/** the $20 token — a real coin with a milled edge, a rim and a struck face */
export const Coin: React.FC<{ x: number; y: number; s: number; f: number; rot?: number; z?: number }> =
  ({ x, y, s, f, rot = 0, z = 68 }) => (
  <div style={{ position: "absolute", left: x - 42 * s, top: y - 42 * s, width: 84 * s, height: 84 * s,
    zIndex: z, borderRadius: "50%", transform: `rotate(${rot}deg)`,
    background: `linear-gradient(140deg, ${mxh(BRASS, 0.34)} 0%, ${BRASS} 46%, ${dkh(BRASS, 0.30)} 100%)`,
    border: `${5 * s}px solid ${dkh(BRASS, 0.34)}`,
    display: "flex", alignItems: "center", justifyContent: "center" }}>
    {/* the milled edge */}
    <div style={{ position: "absolute", inset: 0, borderRadius: "50%",
      background: `repeating-conic-gradient(${hexa(dkh(BRASS, 0.36), 0.5)} 0deg 4deg, transparent 4deg 8deg)` }} />
    <div style={{ position: "absolute", inset: 8 * s, borderRadius: "50%",
      border: `${3 * s}px solid ${hexa(dkh(BRASS, 0.42), 0.7)}` }} />
    <span style={{ ...mono(27 * s, 800), color: dkh(BRASS, 0.56), zIndex: 2 }}>{R.price}</span>
  </div>
);

/* =========================================================================
   S5 — THE BROWSER. A real chrome: a title bar, three lights, a tab, an
   address bar with a lock, a reload, and a content area that holds the mark.
   ====================================================================== */
export const BrowserWin: React.FC<{ x: number; y: number; w: number; h: number; f: number;
  at: number; z?: number; url: string; children?: React.ReactNode; open?: number }> =
  ({ x, y, w, h, f, at, z = 50, url, children, open = 22 }) => {
  const t = E(f, at, at + open, 0, 1, OUT);
  if (f < at) return null;
  const ww = w * (0.28 + t * 0.72), hh = h * (0.34 + t * 0.66);
  return (
    <div style={{ position: "absolute", left: x - ww / 2, top: y - hh / 2, width: ww, height: hh,
      zIndex: z, borderRadius: 18, overflow: "hidden", background: "#FFFFFF",
      border: `6px solid ${dkh("#E6E1D4", 0.14)}`, boxShadow: SH_D }}>
      {/* the title bar */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: hh * 0.13,
        background: "#EFEBE2", borderBottom: `3px solid ${dkh("#E6E1D4", 0.10)}` }}>
        {["#E0685C", "#E7B24C", "#3F9E74"].map((c, i) => (
          <div key={"tl" + i} style={{ position: "absolute", left: 16 + i * 26, top: "34%",
            width: 15, height: 15, borderRadius: "50%", background: c }} />
        ))}
        {/* the active tab */}
        <div style={{ position: "absolute", left: 110, top: "22%", width: ww * 0.30, height: "74%",
          borderRadius: "9px 9px 0 0", background: "#FFFFFF", borderTop: `3px solid ${dkh("#E6E1D4", 0.10)}` }} />
      </div>
      {/* the address bar */}
      <div style={{ position: "absolute", left: 18, right: 18, top: hh * 0.155, height: hh * 0.086,
        borderRadius: 10, background: "#F6F3EC", border: `3px solid ${dkh("#E6E1D4", 0.10)}`,
        display: "flex", alignItems: "center", gap: 12, paddingLeft: 14 }}>
        <div style={{ width: 14, height: 17, borderRadius: 3, background: GREEN }} />
        <span style={{ ...mono(Math.max(15, hh * 0.042), 700), color: hexa(INK, 0.56) }}>{url}</span>
      </div>
      {/* the content area */}
      <div style={{ position: "absolute", left: 0, right: 0, top: hh * 0.26, bottom: 0,
        background: "#FCFBF7" }}>
        {children}
      </div>
    </div>
  );
};

/* =========================================================================
   S6 — THE CONTEXT SHAFT and its CRATES. The crate is 9 parts: the box, four
   board runs, two banding straps, the stencil block and the corner irons.
   ====================================================================== */
export const CodeCrate: React.FC<{ x: number; y: number; s: number; f: number; rot?: number;
  z?: number; c?: string }> =
  ({ x, y, s, f, rot = 0, z = 62, c = "#7A5B38" }) => (
  <div style={{ position: "absolute", left: x - 132 * s, top: y - 116 * s, width: 264 * s,
    height: 232 * s, zIndex: z, transform: `rotate(${rot}deg)`,
    background: `linear-gradient(96deg, ${mxh(c, 0.18)} 0%, ${dkh(c, 0.28)} 100%)`,
    border: `${7 * s}px solid ${dkh(c, 0.42)}`, borderRadius: 6 * s }}>
    {/* four board runs */}
    {[0.16, 0.40, 0.62, 0.84].map((k, i) => (
      <div key={"cb" + i} style={{ position: "absolute", left: 0, right: 0, top: `${k * 100}%`,
        height: 8 * s, background: hexa(dkh(c, 0.40), 0.6) }} />
    ))}
    {/* two banding straps */}
    {[0.24, 0.72].map((k, i) => (
      <div key={"cs" + i} style={{ position: "absolute", left: `${k * 100}%`, top: -8 * s, bottom: -8 * s,
        width: 15 * s, background: `linear-gradient(90deg, ${mxh(STEEL, 0.20)} 0%, ${dkh(STEEL, 0.30)} 100%)` }} />
    ))}
    {/* the stencil block — a codebase is FILES, so the stencil is a file tree */}
    <div style={{ position: "absolute", left: 34 * s, top: 58 * s, width: 130 * s, height: 108 * s }}>
      {[0, 1, 2, 3, 4].map(i => (
        <div key={"cf" + i} style={{ position: "absolute", left: (i % 2) * 16 * s, top: i * 22 * s,
          width: (86 - (i % 3) * 22) * s, height: 12 * s, borderRadius: 3,
          background: hexa("#F4E8D0", 0.50) }} />
      ))}
    </div>
    {/* the corner irons */}
    {[[0, 0], [1, 0], [0, 1], [1, 1]].map(([a, b], i) => (
      <div key={"ci" + i} style={{ position: "absolute", left: a ? undefined : -4 * s,
        right: a ? -4 * s : undefined, top: b ? undefined : -4 * s, bottom: b ? -4 * s : undefined,
        width: 34 * s, height: 34 * s, background: dkh(STEEL, 0.24) }} />
    ))}
  </div>
);

/* =========================================================================
   S7 — ⭐⭐⭐ THE SECOND BRAIN, DRAWN AS A BRAIN.
   Alex: *"second brain part animation should be represented as like a big
   brain something like that."* He is right and the first version was the
   defect ANIMATION-QUALITY §3 is about: shelves of files are a CONTAINER for
   "a place your files go". The VO's noun is **a second brain**, so the picture
   is a brain, and the mechanism is that HIS OWN FILES are what fill it.

   ⛔ AND IT IS DRAWN, NOT A BLOB. `feedback_props_need_real_drawing`: two
   hemispheres, a dividing fissure, the cerebellum, the stem, eight gyri folds
   per side as real curved bands, a temporal lobe, and eight LOBE CELLS that
   light one at a time as files land. Twenty-two parts.
   ====================================================================== */
export const Brain: React.FC<{ x: number; y: number; s: number; f: number;
  lit: number[]; z?: number; c?: string; hot?: string }> =
  /* ⛔⛔ DRAWN IN SVG, AFTER TWO DIV VERSIONS FAILED IN OPPOSITE DIRECTIONS.
     v1 built the folds from `border-radius` ARCS with two transparent sides, so
     their ends stuck out past the outline in every direction — Alex: *"why is
     it hairy too."* v2 clipped every fold inside an `overflow:hidden`
     hemisphere, which killed the hair and left two pink rounded RECTANGLES: no
     silhouette, no organic edge, and folds too low-contrast to count.

     ⭐ The real problem is that a brain is a CURVE, and stacked divs can only
     make rounded boxes. One SVG path gives the bumpy frontal rise, the
     occipital swell, the temporal notch and the cerebellum in a single
     silhouette, and the folds become stroked paths with round caps that are
     clipped to that silhouette by construction. Everything below is one
     560x440 viewBox, so it scales with `s` and nothing can drift out of
     register. */
  ({ x, y, s, f, lit, z = 40, c = "#D2757F", hot = "#FFDFA8" }) => {
  const n = lit.filter(k => f >= k).length;
  const last = lit.filter(k => f >= k).slice(-1)[0];
  const pulse = last !== undefined && f - last < 14 ? 1 - (f - last) / 14 : 0;
  const W_ = 560 * s, H_ = 440 * s;
  const br = 1 + Math.sin(f / 21) * 0.013 + pulse * 0.028;

  /* the cerebrum silhouette — four bumps across the top, a frontal bulge at the
     left, the occipital swell at the right and the temporal notch beneath */
  const CEREBRUM = "M 92 262 C 62 206 84 138 146 112 C 158 66 218 44 262 72 "
    + "C 296 40 358 46 382 88 C 442 84 486 130 482 186 C 512 214 508 268 476 292 "
    + "C 470 330 430 350 392 338 C 372 372 316 380 288 352 C 250 372 198 360 178 324 "
    + "C 122 322 92 300 92 262 Z";
  /* six folds, as strokes. Each is a real channel across the mass, not a ring. */
  const FOLDS = [
    "M 118 150 C 176 128 214 168 268 142 C 318 118 362 150 418 128",
    "M 104 200 C 168 182 200 224 258 200 C 312 178 358 214 452 190",
    "M 108 250 C 170 236 206 272 262 250 C 316 230 372 262 468 244",
    "M 128 298 C 186 288 214 318 268 300 C 320 284 368 306 430 296",
    "M 150 106 C 190 90 214 118 250 104",
    "M 300 96 C 340 82 372 106 402 102",
  ];
  const LOBES: Array<[number, number, number]> = [
    [168, 176, 44], [268, 128, 46], [372, 156, 44],
    [150, 268, 42], [268, 236, 48], [392, 244, 44], [258, 320, 42],
  ];
  return (
    <div style={{ position: "absolute", left: x - W_ / 2, top: y - H_ / 2, width: W_, height: H_,
      zIndex: z, transform: `scale(${br})` }}>
      <svg viewBox="0 0 560 440" width={W_} height={H_} style={{ display: "block", overflow: "visible" }}>
        <defs>
          <clipPath id="brainClip"><path d={CEREBRUM} /></clipPath>
          <linearGradient id="brainFill" x1="0" y1="0" x2="0.4" y2="1">
            <stop offset="0%" stopColor={mxh(c, 0.26)} />
            <stop offset="46%" stopColor={c} />
            <stop offset="100%" stopColor={dkh(c, 0.24)} />
          </linearGradient>
        </defs>

        {/* the stem, behind everything */}
        <path d="M 300 330 C 296 372 302 404 316 424 L 372 424 C 356 396 350 360 352 330 Z"
          fill={dkh(c, 0.40)} stroke={dkh(c, 0.52)} strokeWidth={7} strokeLinejoin="round" />
        {/* the cerebellum, tucked under the occipital */}
        <g>
          <ellipse cx={412} cy={340} rx={82} ry={56} fill={dkh(c, 0.28)}
            stroke={dkh(c, 0.46)} strokeWidth={7} />
          {[-30, -12, 6, 24].map((dy, i) => (
            <path key={"cb" + i} d={`M 342 ${340 + dy} C 380 ${332 + dy} 442 ${348 + dy} 486 ${338 + dy}`}
              fill="none" stroke={hexa(dkh(c, 0.52), 0.8)} strokeWidth={5} strokeLinecap="round" />
          ))}
        </g>

        {/* the cerebrum */}
        <path d={CEREBRUM} fill="url(#brainFill)" stroke={dkh(c, 0.36)} strokeWidth={9}
          strokeLinejoin="round" />
        {/* the folds — clipped to the silhouette, so nothing can protrude */}
        <g clipPath="url(#brainClip)">
          {FOLDS.map((d, i) => (
            <React.Fragment key={"fd" + i}>
              {/* the lit ridge, then the channel under it: a fold has two sides */}
              <path d={d} fill="none" stroke={hexa(mxh(c, 0.30), 0.5)} strokeWidth={20}
                strokeLinecap="round" transform="translate(0,-11)" />
              <path d={d} fill="none" stroke={hexa(dkh(c, 0.34), 0.85)} strokeWidth={15}
                strokeLinecap="round" />
            </React.Fragment>
          ))}
          {/* the central fissure */}
          <path d="M 268 60 C 258 140 276 224 262 356" fill="none"
            stroke={hexa(dkh(c, 0.48), 0.9)} strokeWidth={13} strokeLinecap="round" />
        </g>

        {/* ⭐ THE LOBE CELLS — one lights per file, and an UNLIT one is not drawn
            at all: a grey disc on a brain reads as damage, not as capacity. */}
        {LOBES.map(([cx, cy, r], i) => {
          if (i >= n) return null;
          const pop = squash(f - lit[i], 6, 0.22, 3, 10);
          return (
            <g key={"lb" + i} transform={`translate(${cx} ${cy}) scale(${pop}) translate(${-cx} ${-cy})`}>
              <circle cx={cx} cy={cy} r={r} fill={hexa(hot, 0.52)}
                stroke={hexa(hot, 0.92)} strokeWidth={6} />
              {/* the FILE that lit it */}
              <rect x={cx - r * 0.32} y={cy - r * 0.40} width={r * 0.64} height={r * 0.80}
                rx={4} fill={hexa("#FFF8EA", 0.95)} />
              {[0.26, 0.50, 0.74].map((q, j) => (
                <rect key={"lf" + j} x={cx - r * 0.22} y={cy - r * 0.40 + r * 0.80 * q}
                  width={r * (0.44 - j * 0.10)} height={3} rx={1.5} fill={hexa(INK, 0.36)} />
              ))}
            </g>
          );
        })}
        {/* the synapses firing between lit lobes — a brain WORKS */}
        {n > 1 && Array.from({ length: Math.min(n - 1, 6) }, (_, i) => {
          const [ax, ay] = LOBES[i], [bx, by] = LOBES[i + 1];
          const t = (f / 15 + i * 0.4) % 1;
          return (
            <circle key={"sy" + i} cx={ax + (bx - ax) * t} cy={ay + (by - ay) * t} r={9}
              fill={hexa(hot, 0.95 * (1 - Math.abs(t - 0.5) * 1.2))} />
          );
        })}
      </svg>
    </div>
  );
};

/* =========================================================================
   S6 — ⭐⭐⭐ A CODEBASE, DRAWN AS CODE.
   Alex: *"codebase, that should be seen as actual kind of codebase graphics."*
   The first version dropped wooden CRATES with a file-tree stencil on the side,
   which is a container for "a lot of files" and not a picture of a codebase.
   This is a real editor slab: a title bar with a filename tab, a line-number
   gutter, indented syntax-coloured lines with keyword / string / comment
   colouring, a fold marker, a minimap strip and a status bar. Fourteen parts,
   and the LINES are what makes it read as code at thumbnail size.
   ====================================================================== */
export const CodeSlab: React.FC<{ x: number; y: number; w: number; f: number; seed: number;
  rot?: number; z?: number; s?: number; name?: string }> =
  ({ x, y, w, f, seed, rot = 0, z = 62, s = 1, name = "src" }) => {
  const h = w * 0.72;
  const ROWS = 13;
  return (
    <div style={{ position: "absolute", left: x - w / 2, top: y - h / 2, width: w, height: h,
      zIndex: z, transform: `rotate(${rot}deg)`, borderRadius: 10 * s, overflow: "hidden",
      background: "#141A22", border: `${4 * s}px solid #2C3644`, boxShadow: SH_D }}>
      {/* the title bar with a real filename tab */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: h * 0.12,
        background: "#1B2430", borderBottom: `2px solid #2C3644` }}>
        <div style={{ position: "absolute", left: w * 0.03, top: "16%", width: w * 0.36, height: "70%",
          borderRadius: `${5 * s}px ${5 * s}px 0 0`, background: "#141A22",
          display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ ...mono(Math.max(9, h * 0.055), 700), color: hexa("#9FB4C8", 0.9) }}>
            {name}.ts
          </span>
        </div>
        <div style={{ position: "absolute", right: w * 0.04, top: "34%", width: w * 0.05,
          height: w * 0.05, borderRadius: "50%", background: hexa(G_YEL, 0.7) }} />
      </div>
      {/* the line-number gutter */}
      <div style={{ position: "absolute", left: 0, top: h * 0.12, bottom: h * 0.09, width: w * 0.10,
        background: "#111720", borderRight: `2px solid #232C38` }}>
        {Array.from({ length: ROWS }, (_, i) => (
          <div key={"ln" + i} style={{ position: "absolute", right: w * 0.018,
            top: h * (0.02 + i * 0.062), width: w * 0.035, height: Math.max(3, h * 0.016),
            borderRadius: 2, background: hexa("#4A5A6E", 0.8) }} />
        ))}
      </div>
      {/* ⭐ THE CODE — indented, syntax-coloured, with a blank line and a fold */}
      {Array.from({ length: ROWS }, (_, i) => {
        const indent = [0, 0, 1, 2, 2, 1, 0, 0, 1, 2, 2, 1, 0][i] ?? 0;
        const kind = [0, 1, 2, 3, 2, 3, 0, 1, 2, 3, 2, 0, 1][i] ?? 0;
        const col = kind === 0 ? "#C792EA" : kind === 1 ? "#82AAFF" : kind === 2 ? "#C3E88D" : "#7E8CA0";
        const wid = 0.20 + rnd(seed, i) * 0.52;
        if (i === 6) return null;                       /* a blank line — code breathes */
        return (
          <React.Fragment key={"cl" + i}>
            <div style={{ position: "absolute", left: w * (0.13 + indent * 0.05),
              top: h * (0.155 + i * 0.062), width: w * wid, height: Math.max(4, h * 0.026),
              borderRadius: 2, background: hexa(col, 0.88) }} />
            {/* a second token on some lines, so it is not one bar per row */}
            {i % 3 === 1 && (
              <div style={{ position: "absolute", left: w * (0.13 + indent * 0.05 + wid + 0.03),
                top: h * (0.155 + i * 0.062), width: w * (0.08 + rnd(seed + 3, i) * 0.14),
                height: Math.max(4, h * 0.026), borderRadius: 2, background: hexa("#FFCB6B", 0.8) }} />
            )}
          </React.Fragment>
        );
      })}
      {/* the fold marker */}
      <div style={{ position: "absolute", left: w * 0.105, top: h * 0.28, width: w * 0.02,
        height: h * 0.19, background: hexa("#3E4C5E", 0.9) }} />
      {/* the minimap strip down the right edge */}
      <div style={{ position: "absolute", right: 0, top: h * 0.12, bottom: h * 0.09, width: w * 0.09,
        background: "#111720", borderLeft: `2px solid #232C38` }}>
        {Array.from({ length: 22 }, (_, i) => (
          <div key={"mm" + i} style={{ position: "absolute", left: w * 0.012,
            top: h * (0.015 + i * 0.036), width: w * (0.02 + rnd(seed + 7, i) * 0.05),
            height: Math.max(2, h * 0.011), background: hexa("#3E5064", 0.9) }} />
        ))}
      </div>
      {/* the caret, blinking — the file is OPEN */}
      <div style={{ position: "absolute", left: w * 0.24, top: h * 0.40, width: Math.max(2, w * 0.008),
        height: h * 0.032, background: Math.floor(f / 8) % 2 ? "#FFFFFF" : "transparent" }} />
      {/* the status bar */}
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: h * 0.09,
        background: "#1B2430", borderTop: `2px solid #2C3644` }}>
        <div style={{ position: "absolute", left: w * 0.03, top: "30%", width: w * 0.18,
          height: "40%", borderRadius: 2, background: hexa(G_BLUE, 0.55) }} />
        <div style={{ position: "absolute", right: w * 0.03, top: "30%", width: w * 0.10,
          height: "40%", borderRadius: 2, background: hexa("#4A5A6E", 0.8) }} />
      </div>
    </div>
  );
};

/** the shaft mouth: a lit hatch with a gauge that barely moves. ⛔ the gauge
    reads `1M` — the REAL Gemini 3 context figure, and the only one legal here. */
export const ContextShaft: React.FC<{ x: number; y: number; w: number; f: number; fills: number[];
  z?: number; c?: string }> =
  ({ x, y, w, f, fills, z = 30, c = "#FFD98A" }) => {
  const n = fills.filter(k => f >= k).length;
  /* ⭐ THE MISSING HALF: three crates go in and the gauge STILL barely moves.
     A drop that fills nothing is the claim; three that do not fill it is proof. */
  const lvl = n * 0.035;
  const last = fills.filter(k => f >= k).slice(-1)[0];
  const bloom = last !== undefined && f - last < 16 ? 1 - (f - last) / 16 : 0;
  return (<>
    {/* the shaft throat, receding — five rings getting smaller and darker */}
    {[0, 1, 2, 3, 4].map(i => (
      <div key={"sr" + i} style={{ position: "absolute", left: x - (w / 2) * (1 - i * 0.13),
        top: y + i * 44, width: w * (1 - i * 0.13), height: 76 - i * 9, zIndex: z + i,
        borderRadius: "50%", background: dkh("#1A1206", 0.02 + i * 0.10),
        border: `${9 - i}px solid ${hexa(c, 0.30 - i * 0.05)}` }} />
    ))}
    {/* the light coming back UP out of it — the only set lit from below */}
    <div style={{ position: "absolute", left: x - w * 0.82, top: y - 380, width: w * 1.64, height: 460,
      zIndex: z + 6, opacity: 0.26 + bloom * 0.52, pointerEvents: "none",
      clipPath: `polygon(38% 100%, 62% 100%, 100% 0, 0 0)`,
      background: `linear-gradient(0deg, ${hexa(c, 0.62)} 0%, ${hexa(c, 0)} 100%)` }} />
    {/* the hatch coaming, bolted */}
    <div style={{ position: "absolute", left: x - w / 2 - 26, top: y - 30, width: w + 52, height: 54,
      zIndex: z + 8, borderRadius: 10,
      background: `linear-gradient(178deg, ${mxh("#5E4826", 0.24)} 0%, ${dkh("#5E4826", 0.34)} 100%)` }}>
      {Array.from({ length: 9 }, (_, i) => (
        <div key={"hb" + i} style={{ position: "absolute", left: 20 + i * ((w + 12) / 9), top: 18,
          width: 17, height: 17, borderRadius: "50%", background: dkh("#5E4826", 0.52) }} />
      ))}
    </div>
    {/* the gauge — a real dial with a scale, a needle and its case */}
    <div style={{ position: "absolute", left: x + w / 2 + 76, top: y - 218, width: 176, height: 176,
      zIndex: z + 12, borderRadius: "50%", background: "#14110E",
      border: `9px solid ${dkh("#5E4826", 0.44)}` }}>
      {Array.from({ length: 11 }, (_, i) => (
        <div key={"gt" + i} style={{ position: "absolute", left: 84, top: 12, width: 4,
          height: i % 5 === 0 ? 22 : 13, background: hexa(PAPER, i % 5 === 0 ? 0.7 : 0.34),
          transform: `rotate(${-130 + i * 26}deg)`, transformOrigin: "2px 76px" }} />
      ))}
      {/* the needle, barely off the stop */}
      <div style={{ position: "absolute", left: 84, top: 24, width: 5, height: 64, borderRadius: 3,
        background: RED, transform: `rotate(${-130 + lvl * 260}deg)`, transformOrigin: "2px 64px" }} />
      <div style={{ position: "absolute", left: 78, top: 78, width: 20, height: 20, borderRadius: "50%",
        background: mxh(BRASS, 0.10) }} />
      <span style={{ position: "absolute", left: 0, right: 0, top: 112, textAlign: "center",
        ...mono(34, 800), color: GOLD }}>{R.context}</span>
      <span style={{ position: "absolute", left: 0, right: 0, top: 146, textAlign: "center",
        ...mono(14, 700), color: hexa(PAPER, 0.44), letterSpacing: "0.12em" }}>CONTEXT</span>
    </div>
  </>);
};

/* =========================================================================
   S7 — THE SHELF UNIT and THE FILES. Twelve parts on the unit: two uprights,
   five shelf boards, the back panel, a kick plate, two brackets and a label
   strip per shelf.
   ====================================================================== */
export const ShelfUnit: React.FC<{ x: number; y: number; w: number; h: number; f: number;
  lit: number[]; z?: number; c?: string }> =
  ({ x, y, w, h, f, lit, z = 34, c = "#4E4632" }) => (
  <div style={{ position: "absolute", left: x - w / 2, top: y - h, width: w, height: h, zIndex: z }}>
    {/* the back panel */}
    <div style={{ position: "absolute", inset: 0, background: dkh(c, 0.34), borderRadius: 4 }} />
    {/* two uprights */}
    {[0, 1].map(i => (
      <div key={"su" + i} style={{ position: "absolute", left: i ? w - 26 : 0, top: -14, width: 26,
        height: h + 14, background: `linear-gradient(90deg, ${mxh(c, 0.22)} 0%, ${dkh(c, 0.28)} 100%)` }} />
    ))}
    {/* five shelf boards, each with its bracket and label strip */}
    {[0, 1, 2, 3, 4].map(i => {
      const sy = 26 + i * ((h - 60) / 5);
      const on = lit.filter(k => f >= k).length > i;
      return (
        <React.Fragment key={"sb" + i}>
          <div style={{ position: "absolute", left: 12, top: sy + (h - 60) / 5 - 18, width: w - 24,
            height: 17, background: mxh(c, 0.30), borderRadius: 3 }} />
          <div style={{ position: "absolute", left: 12, top: sy + (h - 60) / 5 - 4, width: w - 24,
            height: 7, background: dkh(c, 0.40) }} />
          {/* the label strip lights as the shelf fills */}
          <div style={{ position: "absolute", left: 22, top: sy + (h - 60) / 5 - 34, width: 108,
            height: 16, borderRadius: 3, background: on ? "#D8E8B0" : dkh(c, 0.20),
            opacity: on ? 0.9 : 0.5 }} />
          {/* the brackets */}
          {[18, w - 34].map((bx, j) => (
            <div key={"sk" + j} style={{ position: "absolute", left: bx, top: sy + (h - 60) / 5 - 16,
              width: 16, height: 22, background: dkh(c, 0.44),
              clipPath: "polygon(0 0, 100% 0, 0 100%)" }} />
          ))}
        </React.Fragment>
      );
    })}
    {/* a kick plate */}
    <div style={{ position: "absolute", left: 0, right: 0, bottom: -12, height: 24,
      background: dkh(c, 0.48), borderRadius: 3 }} />
  </div>
);

/** the user's OWN file — a real folder: a tab, a body, a fold and three ruled
    lines, so it reads as a document rather than a rectangle. */
export const FileProp: React.FC<{ x: number; y: number; s: number; rot?: number; z?: number;
  c?: string }> =
  ({ x, y, s, rot = 0, z = 60, c = "#E8DFC6" }) => (
  <div style={{ position: "absolute", left: x - 44 * s, top: y - 56 * s, width: 88 * s, height: 112 * s,
    zIndex: z, transform: `rotate(${rot}deg)` }}>
    {/* the tab */}
    <div style={{ position: "absolute", left: 4 * s, top: -12 * s, width: 42 * s, height: 18 * s,
      borderRadius: `${5 * s}px ${5 * s}px 0 0`, background: dkh(c, 0.14) }} />
    {/* the body */}
    <div style={{ position: "absolute", inset: 0, borderRadius: 5 * s,
      background: `linear-gradient(158deg, ${mxh(c, 0.10)} 0%, ${dkh(c, 0.12)} 100%)`,
      border: `${3 * s}px solid ${dkh(c, 0.26)}` }} />
    {/* the folded corner */}
    <div style={{ position: "absolute", right: 0, top: 0, width: 26 * s, height: 26 * s,
      background: dkh(c, 0.24), clipPath: "polygon(0 0, 100% 0, 100% 100%)" }} />
    {/* three ruled lines */}
    {[0.34, 0.52, 0.70].map((k, i) => (
      <div key={"fl" + i} style={{ position: "absolute", left: 12 * s, top: `${k * 100}%`,
        width: (56 - i * 12) * s, height: 7 * s, borderRadius: 2, background: hexa(INK, 0.24) }} />
    ))}
  </div>
);

/* =========================================================================
   S8 — THE TETHER. ⛔ NO "0% HALLUCINATION" PLATE. The claim is drawn as a
   physical rope back to a real source: an answer that is tied holds, one that
   is not falls apart. And the ropes pass THROUGH the session boundary.
   ====================================================================== */
export const AnswerCard: React.FC<{ x: number; y: number; w: number; h: number; f: number;
  at: number; tied?: boolean; z?: number; collapse?: number }> =
  ({ x, y, w, h, f, at, tied = true, z = 62, collapse }) => {
  const lf = f - at;
  if (lf < 0) return null;
  const inS = E(lf, 0, 9, 0, 1, BACK);
  const col = collapse !== undefined && f >= collapse ? Math.min(1, (f - collapse) / 20) : 0;
  const sag = tied ? 0 : Math.sin(f / 9) * 3 + col * 26;
  return (
    /* ⛔ THE UNTIED CARD USED TO START AT 0.10 OPACITY-EQUIVALENT AND READ AS A
       BLUR. An answer that was never solid cannot be seen to FALL APART, and
       falling apart is the whole claim. It now starts as SOLID a card as the
       tied one and only loses value as it collapses. */
    <div style={{ position: "absolute", left: x - w / 2, top: y - h / 2, width: w, height: h, zIndex: z,
      transform: `scale(${inS}) rotate(${sag * 0.5}deg) translateY(${col * col * 420}px)`,
      opacity: 1 - col * 0.85, borderRadius: 14,
      background: tied ? "#FFFFFF" : mxh("#D8D2C4", 0.30 - col * 0.30),
      border: `5px solid ${tied ? dkh(SKY, 0.10) : dkh("#C4BCA8", 0.20 + col * 0.20)}`, boxShadow: SH }}>
      {/* the answer's own body: a heading bar and four ruled lines */}
      <div style={{ position: "absolute", left: 18, top: 16, width: w * 0.46, height: 16,
        borderRadius: 4, background: tied ? hexa(SKY, 0.55) : hexa(MUTE, 0.42) }} />
      {/* ⭐ the untied card's own lines SLIDE OFF as it goes — the coming-apart
          is drawn on the object, not only on its opacity */}
      {[0.34, 0.50, 0.66, 0.80].map((k, i) => (
        <div key={"ac" + i} style={{ position: "absolute", left: 18 + (tied ? 0 : col * (40 + i * 55)),
          top: `${k * 100}%`,
          width: w * (0.72 - i * 0.11) * (1 - col * 0.55), height: 13, borderRadius: 3,
          background: hexa(INK, (tied ? 0.30 : 0.26) - i * 0.02),
          transform: tied ? undefined : `rotate(${col * (i % 2 ? 9 : -7)}deg)` }} />
      ))}
      {/* the citation pips — only a tied answer has them */}
      {tied && [0, 1, 2].map(i => (
        <div key={"cp" + i} style={{ position: "absolute", left: 18 + i * 34, bottom: 14,
          width: 26, height: 26, borderRadius: 7, background: hexa(SKY, 0.20),
          border: `3px solid ${hexa(SKY, 0.50)}`, display: "flex", alignItems: "center",
          justifyContent: "center", ...mono(14, 800), color: dkh(SKY, 0.30) }}>{i + 1}</div>
      ))}
    </div>
  );
};

/** a rope from an answer back to the source it came from. It has SAG, because
    a rope that is straight is a line and a line is a diagram. */
export const Tether: React.FC<{ x0: number; y0: number; x1: number; y1: number; f: number;
  at: number; z?: number; c?: string; w?: number }> =
  /* ⛔⛔ THE FIRST VERSION WAS NINE 9px DOTS AND THE MECHANISM WAS INVISIBLE.
     9px is under the 40px short-side floor four times over, so it vanished in
     the audit's 1012->240 downsample AND read as nothing to a human — the
     scene depicted its claim and the claim could not be seen. 14 beads at 22px
     with a bright core is a ROPE. Same lesson as reel 109's 34x14 supply
     pulses, which left their scene at 75% HOLD. */
  ({ x0, y0, x1, y1, f, at, z = 58, c = "#9FD0FF", w = 22 }) => {
  const t = E(f, at, at + 12, 0, 1, OUT);
  if (f < at) return null;
  const N = 14;
  const dx = x1 - x0, dy = y1 - y0;
  const len = Math.hypot(dx, dy);
  return (<>{Array.from({ length: N }, (_, i) => {
    const k = i / (N - 1);
    const kk = Math.min(k, t);
    const sag = Math.sin(kk * Math.PI) * (24 + Math.sin(f / 13 + i) * 5);
    const nx = x0 + dx * kk, ny = y0 + dy * kk + sag;
    if (k > t) return null;
    const ww = w + (i % 2) * 4;
    return (
      <React.Fragment key={"tt" + i}>
        {/* the rope's shadow side, so it is a cord and not a string of lights */}
        <div style={{ position: "absolute", left: nx - ww / 2, top: ny - ww / 2 + 5,
          width: ww, height: ww, borderRadius: "50%", zIndex: z - 1,
          background: hexa("#1A2A44", 0.55) }} />
        <div style={{ position: "absolute", left: nx - ww / 2, top: ny - ww / 2,
          width: ww, height: ww, borderRadius: "50%", zIndex: z,
          background: c, opacity: 0.78 + 0.22 * Math.sin(f / 7 + i) }} />
      </React.Fragment>
    );
  })}</>);
};

/* =========================================================================
   S9/S10 — THE STAGE. The crane is 14 parts: the base, four castors, the
   column, two boom sections, the counterweight stack, the head yoke, the
   camera body, the matte box, the lamp and the operator platform.
   ====================================================================== */
export const Crane: React.FC<{ x: number; y: number; s: number; f: number; unfold: number;
  travel?: [number, number, number]; boom?: [number, number, number]; z?: number; c?: string }> =
  /* ⛔ `c` WAS "#3E3648" ON THE `stage` SET (back2 #0A0810) — a near-black rig
     on a near-black stage, which is the reel's darkest frame and the one place
     a silhouette had to carry the whole shot. #7A6E90 keeps it cool and inside
     the matte palette while putting it clearly above the surround. */
  ({ x, y, s, f, unfold, travel, boom, z = 56, c = "#7A6E90" }) => {
  const u = E(f, unfold, unfold + 22, 0, 1, OUT);
  const tx = travel ? E(f, travel[0], travel[1], 0, travel[2], IO) : 0;
  const bm = boom ? E(f, boom[0], boom[1], 0, boom[2], IO) : 0;
  const ang = -74 + u * 46 + bm;
  return (
    <div style={{ position: "absolute", left: x - 130 * s + tx, top: y - 300 * s, width: 260 * s,
      height: 300 * s, zIndex: z }}>
      {/* the base and its four castors */}
      <div style={{ position: "absolute", left: 34 * s, top: 246 * s, width: 192 * s, height: 40 * s,
        borderRadius: 8 * s, background: `linear-gradient(178deg, ${mxh(c, 0.20)} 0%, ${dkh(c, 0.34)} 100%)` }} />
      {[10, 76, 142, 200].map((k, i) => (
        <div key={"cc" + i} style={{ position: "absolute", left: (34 + k * 0.86) * s, top: 282 * s,
          width: 30 * s, height: 30 * s, borderRadius: "50%", background: dkh(c, 0.44),
          border: `${4 * s}px solid ${mxh(c, 0.14)}` }} />
      ))}
      {/* the column */}
      <div style={{ position: "absolute", left: 110 * s, top: 138 * s, width: 42 * s, height: 116 * s,
        background: `linear-gradient(94deg, ${mxh(c, 0.24)} 0%, ${dkh(c, 0.30)} 100%)` }} />
      {/* the boom — two sections on a pivot */}
      <div style={{ position: "absolute", left: 128 * s, top: 150 * s, width: 300 * s, height: 26 * s,
        transformOrigin: "8px 50%", transform: `rotate(${ang}deg)` }}>
        <div style={{ position: "absolute", inset: 0, borderRadius: 6 * s,
          background: `linear-gradient(178deg, ${mxh(c, 0.28)} 0%, ${dkh(c, 0.26)} 100%)` }} />
        {/* the lattice — a boom is a truss, not a stick */}
        {Array.from({ length: 7 }, (_, i) => (
          <div key={"cl" + i} style={{ position: "absolute", left: 20 * s + i * 38 * s, top: -2 * s,
            width: 5 * s, height: 30 * s, background: dkh(c, 0.40),
            transform: `rotate(${i % 2 ? 30 : -30}deg)` }} />
        ))}
        {/* the head yoke + camera body + matte box + lamp, at the boom tip */}
        <div style={{ position: "absolute", left: 276 * s, top: -34 * s, width: 34 * s, height: 92 * s,
          background: dkh(c, 0.30), transform: `rotate(${-ang}deg)`, transformOrigin: "50% 34%" }}>
          <div style={{ position: "absolute", left: -44 * s, top: 26 * s, width: 118 * s, height: 66 * s,
            borderRadius: 8 * s, background: `linear-gradient(176deg, ${mxh(c, 0.14)} 0%, ${dkh(c, 0.44)} 100%)`,
            border: `${4 * s}px solid ${dkh(c, 0.50)}` }} />
          {/* the matte box */}
          <div style={{ position: "absolute", left: 62 * s, top: 34 * s, width: 46 * s, height: 50 * s,
            borderRadius: 4 * s, background: "#0E0C10", border: `${4 * s}px solid ${dkh(c, 0.46)}` }} />
          {/* the lens */}
          <div style={{ position: "absolute", left: 96 * s, top: 46 * s, width: 26 * s, height: 26 * s,
            borderRadius: "50%", background: mxh("#8FA8C0", 0.16), border: `${3 * s}px solid #1A1620` }} />
          {/* the lamp */}
          <div style={{ position: "absolute", left: -10 * s, top: -6 * s, width: 40 * s, height: 26 * s,
            borderRadius: 5 * s, background: f >= unfold + 20 ? "#FFE2B0" : dkh(c, 0.30) }} />
        </div>
      </div>
      {/* the counterweight stack */}
      {[0, 1, 2].map(i => (
        <div key={"cw" + i} style={{ position: "absolute", left: 92 * s, top: (118 - i * 18) * s,
          width: 78 * s, height: 16 * s, borderRadius: 4 * s, background: dkh(c, 0.48) }} />
      ))}
      {/* the operator platform */}
      <div style={{ position: "absolute", left: 12 * s, top: 214 * s, width: 96 * s, height: 14 * s,
        borderRadius: 3 * s, background: mxh(c, 0.10) }} />
    </div>
  );
};

/** a stage flat that flies in from the wings and locks — the set BUILDING
    ITSELF is the depiction of "Veo builds it". */
export const StageFlat: React.FC<{ x: number; y: number; w: number; h: number; f: number;
  at: number; from: number; z?: number; c?: string; kind?: number }> =
  ({ x, y, w, h, f, at, from, z = 40, c = "#3E3452", kind = 0 }) => {
  const t = E(f, at, at + 11, 0, 1, OUT);
  if (f < at) return null;
  const sq = squash(f - at, 9, 0.12, 3, 12);
  const nx = from + (x - from) * t;
  return (
    <div style={{ position: "absolute", left: nx - w / 2, top: y - h, width: w, height: h, zIndex: z,
      transform: `scaleX(${sq})`, transformOrigin: "50% 100%",
      background: `linear-gradient(174deg, ${mxh(c, 0.20)} 0%, ${dkh(c, 0.26)} 100%)`,
      borderLeft: `5px solid ${dkh(c, 0.36)}`, borderRight: `5px solid ${dkh(c, 0.36)}` }}>
      {/* what is painted on the flat — a window run, a door, or a skyline */}
      {kind === 0 && Array.from({ length: 3 }, (_, i) => (
        <div key={"sf" + i} style={{ position: "absolute", left: "16%", top: `${14 + i * 28}%`,
          width: "68%", height: "18%", background: hexa("#FFE2B0", 0.24), borderRadius: 4 }} />
      ))}
      {kind === 1 && (<>
        <div style={{ position: "absolute", left: "26%", top: "30%", width: "48%", height: "70%",
          background: dkh(c, 0.40), borderRadius: "8px 8px 0 0" }} />
        <div style={{ position: "absolute", left: "62%", top: "62%", width: 14, height: 14,
          borderRadius: "50%", background: BRASS }} />
      </>)}
      {kind === 2 && Array.from({ length: 5 }, (_, i) => (
        <div key={"sk" + i} style={{ position: "absolute", left: `${8 + i * 18}%`,
          bottom: 0, width: "14%", height: `${34 + rnd(7, i) * 52}%`, background: dkh(c, 0.42) }} />
      ))}
      {/* the bracing on the back, which is what makes it a FLAT */}
      <div style={{ position: "absolute", left: 0, right: 0, top: "52%", height: 9,
        background: hexa(dkh(c, 0.44), 0.7) }} />
    </div>
  );
};

/* =========================================================================
   S12/S13 — THE PRESS, THE APP TILE and THE LINK CHAIN.
   ⭐ The app tile carries LIVE MOVING UI on its face — reel 107 measured real
   changing content as the biggest single motion lever there is. A logo on a box
   is a container; a running app is a depiction.
   ====================================================================== */
export const AppTile: React.FC<{ x: number; y: number; s: number; f: number; at: number;
  z?: number; live?: boolean }> =
  ({ x, y, s, f, at, z = 64, live = true }) => {
  const lf = f - at;
  if (lf < 0) return null;
  const inS = E(lf, 0, 9, 0, 1, BACK);
  const w = 236 * s, h = 288 * s;
  /* the live face: rows arriving on a clock, and a bar that fills and resets */
  const rows = live ? Math.min(5, Math.floor(lf / 7)) : 0;
  const bar = live ? ((lf % 46) / 46) : 0;
  return (
    <div style={{ position: "absolute", left: x - w / 2, top: y - h, width: w, height: h, zIndex: z,
      transform: `scale(${inS})`, transformOrigin: "50% 100%", borderRadius: 18 * s,
      background: "#FFFFFF", border: `${5 * s}px solid ${dkh("#E6E1D4", 0.16)}`, boxShadow: SH_D,
      overflow: "hidden" }}>
      {/* the app's own chrome */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 44 * s,
        background: "#F2EEE4", borderBottom: `3px solid ${dkh("#E6E1D4", 0.12)}` }}>
        <div style={{ position: "absolute", left: 14 * s, top: 12 * s, width: 20 * s, height: 20 * s,
          borderRadius: 6 * s, background: G_BLUE }} />
        <div style={{ position: "absolute", left: 44 * s, top: 15 * s, width: 92 * s, height: 14 * s,
          borderRadius: 4, background: hexa(INK, 0.20) }} />
        {/* the four Google bar, small, on the app's own chrome */}
        <div style={{ position: "absolute", right: 12 * s, top: 18 * s, width: 52 * s, height: 9 * s,
          borderRadius: 5, overflow: "hidden", display: "flex" }}>
          {[G_BLUE, G_RED, G_YEL, G_GRN].map((c, j) => <div key={"ag" + j} style={{ flex: 1, background: c }} />)}
        </div>
      </div>
      {/* the input field — one sentence went in here */}
      <div style={{ position: "absolute", left: 16 * s, top: 60 * s, right: 16 * s, height: 40 * s,
        borderRadius: 9 * s, background: "#F7F4EC", border: `3px solid ${dkh("#E6E1D4", 0.14)}` }}>
        <div style={{ position: "absolute", left: 12 * s, top: 14 * s, width: `${58 + Math.sin(f / 11) * 6}%`,
          height: 12 * s, borderRadius: 3, background: hexa(INK, 0.24) }} />
      </div>
      {/* THE LIVE PART — result rows arriving one at a time */}
      {Array.from({ length: rows }, (_, i) => (
        <div key={"ar" + i} style={{ position: "absolute", left: 16 * s, right: 16 * s,
          top: (116 + i * 30) * s, height: 24 * s, borderRadius: 6 * s,
          background: i % 2 ? hexa(G_BLUE, 0.10) : hexa(G_GRN, 0.10),
          border: `2px solid ${hexa(i % 2 ? G_BLUE : G_GRN, 0.30)}`,
          transform: `scale(${squash(lf - i * 7, 5, 0.12, 2, 8)})` }}>
          <div style={{ position: "absolute", left: 8 * s, top: 7 * s, width: `${44 + rnd(3, i) * 34}%`,
            height: 9 * s, borderRadius: 2, background: hexa(INK, 0.26) }} />
        </div>
      ))}
      {/* the running bar */}
      <div style={{ position: "absolute", left: 16 * s, right: 16 * s, bottom: 18 * s, height: 16 * s,
        borderRadius: 8 * s, background: hexa(INK, 0.08), overflow: "hidden" }}>
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: `${bar * 100}%`,
          background: G_BLUE, borderRadius: 8 * s }} />
      </div>
    </div>
  );
};

/** ⭐ THE LINK CHAIN — the app travelling to someone else, drawn as real links
    that snap out one by one across the FULL panel width. */
export const LinkChain: React.FC<{ x0: number; y0: number; x1: number; y1: number; f: number;
  at: number; z?: number; c?: string; n?: number }> =
  ({ x0, y0, x1, y1, f, at, z = 60, c = "#5AA0DE", n = 13 }) => {
  if (f < at) return null;
  const t = E(f, at, at + 15, 0, 1, OUT);
  const dx = x1 - x0, dy = y1 - y0;
  const ang = Math.atan2(dy, dx) * 180 / Math.PI;
  return (<>{Array.from({ length: n }, (_, i) => {
    const k = i / (n - 1);
    if (k > t) return null;
    const pop = squash((f - at) - i * 1.2, 4, 0.30, 2, 7);
    const arc = -Math.sin(k * Math.PI) * 46;
    return (
      <div key={"lk" + i} style={{ position: "absolute", left: x0 + dx * k - 22, top: y0 + dy * k + arc - 15,
        width: 44, height: 30, zIndex: z, borderRadius: 15,
        border: `7px solid ${i % 2 ? c : mxh(c, 0.26)}`,
        transform: `rotate(${ang + (i % 2 ? 0 : 82)}deg) scale(${pop})` }} />
    );
  })}</>);
};

/* =========================================================================
   S14/S15/S16 — THE BAYS. One bay is 13 parts: the surround, the shutter, the
   screen, its bezel, the sign, two sign brackets, the desk, the desk lip, the
   cable run, two conduit clips, the status lamp and the content it runs.
   ⛔⛔ EACH BAY'S CONTENT IS A DIFFERENT JOB WITH A DIFFERENT OBJECT — three
   copies of one animation is what "sprites standing around bouncing" looks like.
   ====================================================================== */
export const Bay: React.FC<{ x: number; y: number; w: number; h: number; f: number;
  open: number; kind: 0 | 1 | 2; z?: number; c?: string; live?: number }> =
  ({ x, y, w, h, f, open, kind, z = 34, c = "#243440", live = -999 }) => {
  const o = E(f, open, open + 16, 0, 1, OUT);
  const lf = f - live;
  const on = f >= live;
  const names = R.surfaces;
  const face = kind === 0 ? "#101A22" : kind === 1 ? "#0A1410" : "#12161E";
  return (
    <div style={{ position: "absolute", left: x - w / 2, top: y - h, width: w, height: h, zIndex: z }}>
      {/* the surround */}
      <div style={{ position: "absolute", left: -18, top: -18, right: -18, bottom: -30, borderRadius: 12,
        background: `linear-gradient(176deg, ${mxh(c, 0.16)} 0%, ${dkh(c, 0.34)} 100%)`,
        border: `6px solid ${dkh(c, 0.44)}` }} />
      {/* the screen and its bezel */}
      <div style={{ position: "absolute", inset: 0, borderRadius: 6, background: face,
        border: `5px solid ${dkh(c, 0.50)}`, overflow: "hidden" }}>
        {/* ⛔⛔ ALL THREE SCREENS WERE COLOURED BARS. Alex: *"the animations
             behind the little cloth sprites need to be more interesting and more
             detailed... they just look very surface level and generic, just too
             generic."* He is right: an editor, a terminal and a browser were the
             same primitive — a rounded rect of a different hue — so the three
             surfaces the VO NAMES were indistinguishable from each other.
             [[feedback_props_need_real_drawing]]: count the parts per object
             before adding objects.
             ⭐ Each screen is now drawn as the tool it actually is. */}

        {/* ---- EDITOR: a tab bar, a numbered gutter, and INDENTED lines made of
             several syntax-coloured tokens each, not one bar per line.
             ⛔ THE RUN STILL CYCLES — `Math.min(9, lf/5)` filled once and then
             repainted nothing, which left the reel's peak scene static two
             thirds of the way through. A file gets written, saved, written
             again. */}
        {kind === 0 && on && (<>
          <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 22,
            background: hexa("#FFFFFF", 0.07), borderBottom: `2px solid ${hexa("#FFFFFF", 0.10)}` }}>
            <div style={{ position: "absolute", left: 8, top: 5, width: 54, height: 12,
              borderRadius: 3, background: hexa(SKY, 0.5) }} />
            <div style={{ position: "absolute", left: 68, top: 5, width: 38, height: 12,
              borderRadius: 3, background: hexa("#FFFFFF", 0.10) }} />
          </div>
          <div style={{ position: "absolute", left: 0, top: 22, bottom: 0, width: 26,
            background: hexa("#FFFFFF", 0.05), borderRight: `2px solid ${hexa("#FFFFFF", 0.09)}` }} />
          {Array.from({ length: 1 + Math.floor((lf % 58) / 4.2) }, (_, i) => {
            const ind = [0, 0, 1, 2, 2, 1, 0, 1, 2, 2, 1, 0, 1, 2][i % 14];
            const toks = [[26, SKY], [40, GOLD], [30, "#FFFFFF"], [22, GREEN]] as const;
            let cx = 32 + ind * 14;
            return (
              <React.Fragment key={"eb" + i}>
                <div style={{ position: "absolute", left: 7, top: 30 + i * 15, width: 12, height: 8,
                  borderRadius: 2, background: hexa("#FFFFFF", 0.16) }} />
                {toks.map(([tw, tc], j) => {
                  if (rnd(7, i * 4 + j) < 0.22) return null;
                  const wpx = tw * (0.6 + rnd(3, i + j) * 0.8);
                  const el = (
                    <div key={"tk" + j} style={{ position: "absolute", left: cx, top: 30 + i * 15,
                      width: wpx, height: 9, borderRadius: 2,
                      background: hexa(tc as string, 0.30 + rnd(5, i + j) * 0.45),
                      transform: `scaleX(${squash((lf % 58) - i * 4.2, 4, 0.5, 2, 6)})`,
                      transformOrigin: "0% 50%" }} />
                  );
                  cx += wpx + 6;
                  return el;
                })}
              </React.Fragment>
            );
          })}
        </>)}

        {/* ---- TERMINAL: a prompt, a command, output PILING UP, and a run bar */}
        {kind === 1 && on && (<>
          {Array.from({ length: 14 }, (_, i) => {
            const k = (i * 30 - lf * 3.4) % (h + 60);
            const isCmd = i % 4 === 0;
            return (
              <React.Fragment key={"tl" + i}>
                {/* the $ prompt, so a line reads as a SHELL line */}
                <div style={{ position: "absolute", left: 14, top: h - k + 2,
                  width: 9, height: 9, borderRadius: 2,
                  background: hexa(isCmd ? GOLD : GREEN, 0.8) }} />
                <div style={{ position: "absolute", left: 28, top: h - k,
                  width: w * (0.20 + rnd(9, i) * 0.52), height: 12, borderRadius: 2,
                  background: hexa(isCmd ? "#FFFFFF" : GREEN, 0.22 + rnd(2, i) * 0.44) }} />
                {!isCmd && rnd(4, i) > 0.6 && (
                  <div style={{ position: "absolute", right: 16, top: h - k + 1, width: 14, height: 10,
                    borderRadius: 2, background: hexa(GREEN, 0.7) }} />
                )}
              </React.Fragment>
            );
          })}
          {/* the run bar at the foot — a job in progress */}
          <div style={{ position: "absolute", left: 14, right: 14, bottom: 34, height: 10,
            borderRadius: 5, background: hexa("#FFFFFF", 0.10) }}>
            <div style={{ position: "absolute", inset: 0, borderRadius: 5, background: hexa(GREEN, 0.62),
              clipPath: `inset(0 ${100 - ((lf * 2.2) % 100)}% 0 0)` }} />
          </div>
          <div style={{ position: "absolute", left: 18, bottom: 14, width: 16, height: 20,
            background: Math.floor(f / 8) % 2 ? GREEN : "transparent" }} />
        </>)}

        {/* ---- BROWSER: a real page — chrome with tabs and a URL pill, a nav
             bar, a hero with an image placeholder, a two-column text block, and
             a check column running down the side as it passes. */}
        {kind === 2 && (<>
          {/* the chrome: two tabs and a URL pill */}
          <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 34,
            background: hexa("#FFFFFF", 0.07), borderBottom: `2px solid ${hexa("#FFFFFF", 0.10)}` }}>
            <div style={{ position: "absolute", left: 8, top: 5, width: 46, height: 13,
              borderRadius: "4px 4px 0 0", background: hexa("#FFFFFF", 0.16) }} />
            <div style={{ position: "absolute", left: 58, top: 5, width: 34, height: 13,
              borderRadius: "4px 4px 0 0", background: hexa("#FFFFFF", 0.07) }} />
            <div style={{ position: "absolute", left: 8, right: 8, top: 21, height: 10,
              borderRadius: 5, background: hexa("#0A0F16", 0.6) }}>
              <div style={{ position: "absolute", left: 5, top: 3, width: 4, height: 4,
                borderRadius: "50%", background: hexa(GREEN, 0.8) }} />
              <div style={{ position: "absolute", left: 14, top: 3, width: `${34 + (on ? (lf % 52) / 52 * 22 : 0)}%`,
                height: 4, borderRadius: 2, background: hexa("#FFFFFF", 0.26) }} />
            </div>
          </div>
          {/* the page's own nav */}
          <div style={{ position: "absolute", left: 0, right: 0, top: 34, height: 20,
            background: hexa(SKY, 0.16), display: "flex", alignItems: "center", gap: 9,
            paddingLeft: 10 }}>
            <div style={{ width: 13, height: 9, borderRadius: 2, background: hexa(SKY, 0.7) }} />
            {[16, 22, 18].map((q, i) => (
              <div key={"nv" + i} style={{ width: q, height: 5, borderRadius: 2,
                background: hexa("#FFFFFF", 0.22) }} />
            ))}
          </div>
          {/* the hero, with an image placeholder that CYCLES */}
          <div style={{ position: "absolute", left: 12, right: 12, top: 62, height: h * 0.26,
            borderRadius: 5, overflow: "hidden",
            background: `linear-gradient(148deg, ${hexa(SKY, 0.30)} 0%, ${hexa(GREEN, 0.22)} 100%)` }}>
            <div style={{ position: "absolute", left: "50%", top: "50%", width: 26, height: 20,
              marginLeft: -13, marginTop: -10, borderRadius: 3,
              border: `3px solid ${hexa("#FFFFFF", 0.34)}`,
              transform: `scale(${on ? 1 + 0.14 * Math.sin(lf / 7) : 1})` }} />
            <div style={{ position: "absolute", left: 10, bottom: 8, width: 54, height: 7,
              borderRadius: 3, background: hexa("#FFFFFF", 0.5) }} />
          </div>
          {/* two columns of copy, refilling on the cycle */}
          {on && [0, 1].map(col => (
            Array.from({ length: 5 }, (_, i) => (
              <div key={"bp" + col + "_" + i} style={{ position: "absolute",
                left: 14 + col * (w * 0.46), top: 62 + h * 0.30 + i * 15,
                width: (w * 0.42) * (0.44 + rnd(11, i + col * 5 + Math.floor(lf / 52)) * 0.56),
                height: 8, borderRadius: 2, background: hexa("#FFFFFF", 0.22) }} />
            ))
          ))}
          {/* the checks running down the edge as the page passes */}
          {on && Array.from({ length: 1 + Math.floor((lf % 52) / 8.2) }, (_, i) => (
            <div key={"bc" + i} style={{ position: "absolute", right: 12, top: h * 0.44 + i * 24,
              width: 20, height: 20, borderRadius: 5, background: hexa(GREEN, 0.78),
              transform: `scale(${squash((lf % 52) - i * 8.2, 5, 0.24, 2, 8)})` }}>
              <div style={{ position: "absolute", left: 4, top: 9, width: 10, height: 4,
                background: "#0A140E", transform: "rotate(42deg)" }} />
              <div style={{ position: "absolute", left: 8, top: 5, width: 4, height: 11,
                background: "#0A140E", transform: "rotate(42deg)" }} />
            </div>
          ))}
        </>)}
      </div>
      {/* the shutter, rolling up */}
      <div style={{ position: "absolute", left: -18, right: -18, top: -18, height: (h + 36) * (1 - o),
        zIndex: 6, overflow: "hidden",
        background: `repeating-linear-gradient(180deg, ${mxh(c, 0.22)} 0px, ${mxh(c, 0.22)} 14px, ${dkh(c, 0.36)} 14px, ${dkh(c, 0.36)} 28px)`,
        borderBottom: `7px solid ${dkh(c, 0.54)}` }} />
      {/* the sign and its two brackets */}
      <div style={{ position: "absolute", left: w * 0.5 - 92, top: -78, width: 184, height: 44,
        zIndex: 8, borderRadius: 7, background: on ? "#F2EDE0" : dkh(c, 0.28),
        border: `4px solid ${dkh(c, 0.46)}`, display: "flex", alignItems: "center",
        justifyContent: "center" }}>
        <span style={{ ...mono(21, 800), color: on ? INK : hexa(PAPER, 0.30), letterSpacing: "0.08em" }}>
          {names[kind]}
        </span>
      </div>
      {[-72, 62].map((k, i) => (
        <div key={"sbk" + i} style={{ position: "absolute", left: w * 0.5 + k, top: -34, width: 10,
          height: 22, zIndex: 7, background: dkh(c, 0.44) }} />
      ))}
      {/* the desk, its lip, the cable run and two clips */}
      <div style={{ position: "absolute", left: -34, right: -34, top: h + 12, height: 34, zIndex: 9,
        borderRadius: 5, background: `linear-gradient(178deg, ${mxh(c, 0.12)} 0%, ${dkh(c, 0.36)} 100%)` }} />
      <div style={{ position: "absolute", left: -34, right: -34, top: h + 44, height: 9, zIndex: 9,
        background: dkh(c, 0.50) }} />
      <div style={{ position: "absolute", left: 20, right: 20, top: h + 58, height: 7, zIndex: 8,
        background: dkh(c, 0.20) }} />
      {/* the status lamp */}
      <div style={{ position: "absolute", left: w - 26, top: h + 18, width: 18, height: 18, zIndex: 10,
        borderRadius: "50%", background: on ? GREEN : dkh(c, 0.44) }} />
    </div>
  );
};

/** ⭐⭐ THE TICKET — one work item handed EDITOR -> TERMINAL -> BROWSER across
    the full panel. Reel 110: eight correctly-looping sprites still read as
    "standing around bouncing" until something moved BETWEEN them. */
export const Ticket: React.FC<{ f: number; legs: Array<[number, number, number, number, number, number]>;
  z?: number; s?: number }> =
  ({ f, legs, z = 78, s = 1 }) => {
  const leg = legs.find(([a, b]) => f >= a && f <= b);
  if (!leg) return null;
  const [a, b, x0, y0, x1, y1] = leg;
  const t = E(f, a, b, 0, 1, IO);
  const x = x0 + (x1 - x0) * t;
  const y = y0 + (y1 - y0) * t - Math.sin(t * Math.PI) * 96;
  const rot = Math.sin(t * Math.PI * 2) * 22;
  return (
    <div style={{ position: "absolute", left: x - 42 * s, top: y - 30 * s, width: 84 * s, height: 60 * s,
      zIndex: z, transform: `rotate(${rot}deg)`, borderRadius: 7 * s, background: "#FFF6E2",
      border: `4px solid ${dkh("#E6D9BC", 0.24)}`, boxShadow: SH }}>
      {/* a real ticket: a stub perforation, two ruled lines and a punch hole */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 20 * s, height: 3,
        background: `repeating-linear-gradient(90deg, ${hexa(INK, 0.22)} 0px, ${hexa(INK, 0.22)} 6px, transparent 6px, transparent 12px)` }} />
      {[0.52, 0.72].map((k, i) => (
        <div key={"tk" + i} style={{ position: "absolute", left: 10 * s, top: `${k * 100}%`,
          width: (48 - i * 14) * s, height: 7 * s, borderRadius: 2, background: hexa(INK, 0.26) }} />
      ))}
      <div style={{ position: "absolute", right: 10 * s, top: 6 * s, width: 12 * s, height: 12 * s,
        borderRadius: "50%", background: hexa(INK, 0.18) }} />
    </div>
  );
};

/* =========================================================================
   S17 — THE OUTPUT RACK. ⛔ NO MULTIPLIER, NO PERCENTAGE. "More productive" is
   drawn as OUTPUT VOLUME — countable finished units that fill a rack and then
   overflow past the top of frame.
   ====================================================================== */
export const OutputRack: React.FC<{ x: number; y: number; w: number; h: number; f: number;
  lands: number[]; z?: number; c?: string; extend?: [number, number, number] }> =
  ({ x, y, w, h, f, lands, z = 40, c = "#8A6A44", extend }) => {
  const ew = extend ? E(f, extend[0], extend[1], w, extend[2], OUT) : w;
  const n = lands.filter(k => f >= k).length;
  const cols = 12, rowH = 52;
  return (
    <div style={{ position: "absolute", left: x - ew / 2, top: y - h, width: ew, height: h, zIndex: z }}>
      {/* the rack frame: two uprights, four rails, and its feet */}
      {[0, 1].map(i => (
        <div key={"ru" + i} style={{ position: "absolute", left: i ? ew - 22 : 0, top: 0, width: 22,
          height: h, background: `linear-gradient(90deg, ${mxh(c, 0.20)} 0%, ${dkh(c, 0.30)} 100%)` }} />
      ))}
      {[0, 1, 2, 3].map(i => (
        <div key={"rr" + i} style={{ position: "absolute", left: 0, right: 0, top: 18 + i * (h - 40) / 4,
          height: 12, background: dkh(c, 0.26) }} />
      ))}
      {/* the finished units — countable, 44px+ so they survive the downsample */}
      {Array.from({ length: n }, (_, i) => {
        const col = i % cols, row = Math.floor(i / cols);
        const at = lands[i];
        const sq = squash(f - at, 5, 0.22, 3, 9);
        return (
          <div key={"ou" + i} style={{ position: "absolute",
            left: 28 + col * ((ew - 62) / cols), top: h - 58 - row * rowH,
            width: (ew - 62) / cols - 8, height: 44, borderRadius: 5,
            background: `linear-gradient(172deg, ${mxh(CREAMB, 0.12)} 0%, ${dkh(CREAMB, 0.16)} 100%)`,
            border: `3px solid ${dkh(CREAMB, 0.30)}`, transform: `scale(${sq})` }}>
            <div style={{ position: "absolute", left: 5, top: 8, right: 5, height: 7, borderRadius: 2,
              background: hexa(INK, 0.22) }} />
            <div style={{ position: "absolute", left: 5, top: 21, width: "56%", height: 6, borderRadius: 2,
              background: hexa(INK, 0.16) }} />
            <div style={{ position: "absolute", right: 5, bottom: 5, width: 13, height: 13,
              borderRadius: 3, background: hexa(GREEN, 0.66) }} />
          </div>
        );
      })}
      {/* the feet */}
      {[0, 1].map(i => (
        <div key={"rf" + i} style={{ position: "absolute", left: i ? ew - 46 : -2, top: h, width: 48,
          height: 15, background: dkh(c, 0.40) }} />
      ))}
    </div>
  );
};

/** the comment field for the CTA — a real IG-shaped input with an avatar, a
    field, a send button and a caret that types. */
export const CommentField: React.FC<{ x: number; y: number; w: number; f: number; at: number;
  word: string; z?: number }> =
  ({ x, y, w, f, at, word, z = 84 }) => {
  const lf = f - at;
  if (lf < 0) return null;
  const inS = E(lf, 0, 9, 0, 1, BACK);
  const n = Math.min(word.length, Math.max(0, Math.floor((lf - 8) / 2.4)));
  const done = n >= word.length;
  const flash = done && lf < 46 ? Math.max(0, 1 - (lf - (8 + word.length * 2.4)) / 10) : 0;
  return (
    <div style={{ position: "absolute", left: x - w / 2, top: y, width: w, height: 96, zIndex: z,
      transform: `scale(${inS})`, transformOrigin: "50% 50%", borderRadius: 48,
      background: "#FFFFFF", border: `6px solid ${dkh("#E6E1D4", 0.16)}`, boxShadow: SH_D }}>
      {/* the avatar */}
      <div style={{ position: "absolute", left: 14, top: 12, width: 60, height: 60, borderRadius: "50%",
        background: "#FFF1E8", border: "4px solid #F0D5C6", display: "flex", alignItems: "center",
        justifyContent: "center" }}>
        <Img src={staticFile("claude_logo.png")} style={{ width: 40, height: 40, objectFit: "contain" }} />
      </div>
      {/* the typed word */}
      <span style={{ position: "absolute", left: 96, top: 20, ...ui(46, 900), color: INK,
        letterSpacing: "0.02em" }}>
        {word.slice(0, n)}
        {!done && <span style={{ opacity: Math.floor(f / 6) % 2 ? 1 : 0, color: CLAY }}>|</span>}
      </span>
      {/* the send button */}
      <div style={{ position: "absolute", right: 16, top: 18, width: 108, height: 52, borderRadius: 26,
        background: done ? CLAY : hexa(CLAY, 0.26), display: "flex", alignItems: "center",
        justifyContent: "center", ...ui(23, 900), color: done ? "#FFFFFF" : hexa(CLAY, 0.6) }}>
        POST
      </div>
      {/* the lock flash on the keyword */}
      {flash > 0 && (
        <div style={{ position: "absolute", inset: -10, borderRadius: 54,
          border: `${8 * flash}px solid ${hexa(GOLD, flash)}` }} />
      )}
    </div>
  );
};

/* =========================================================================
   ⭐⭐ THE MONEY. Alex: *"those paper things should be green, there should be
   like dollar bills or hundred dollar bills, not... like if it's money it
   might [be] green. Like actually look like money paper."*

   ⛔ THEY WERE CREAM. The reel drew its money as a pale tan rectangle with a
   circle and a figure on it — the same paper stock as the BILL, the villain,
   which is exactly backwards: the money you get back should not be made of the
   thing that was taking it. Cream also gave it no identity at 104px; it read as
   a receipt.

   ⭐ It is a BANKNOTE now, drawn with the four things that make paper money
   recognisable at a glance and at small size:
     · a desaturated green field (⛔ matte palette — money green, not neon)
     · fine engraving hatch across the whole face
     · an oval portrait frame, off centre
     · a numeral in two opposite corners and a seal disc
   One component, used by all four scenes that move money, so the reel's cash is
   a single object wherever it appears. [[feedback_props_need_real_drawing]]
   ====================================================================== */
export const MoneyNote: React.FC<{ x: number; y: number; s?: number; rot?: number;
  z?: number; o?: number; fig?: string }> =
  ({ x, y, s = 1, rot = 0, z = 74, o = 1, fig = R.price }) => {
  const W = 112 * s, H = 62 * s;
  return (
    <div style={{ position: "absolute", left: x - W / 2, top: y - H / 2, width: W, height: H,
      zIndex: z, opacity: o, borderRadius: 4 * s, overflow: "hidden",
      transform: `rotate(${rot}deg)`,
      background: `linear-gradient(166deg, #CBDCC0 0%, #A6BF9C 58%, #8FAA86 100%)`,
      border: `${3.5 * s}px solid #5E7A58` }}>
      {/* the engraving — what makes a rectangle read as CURRENCY */}
      <div style={{ position: "absolute", inset: 0,
        background: `repeating-linear-gradient(90deg, transparent 0 ${2.6 * s}px, ${hexa("#415C3C", 0.20)} ${2.6 * s}px ${3.6 * s}px)` }} />
      <div style={{ position: "absolute", inset: 0,
        background: `repeating-linear-gradient(0deg, transparent 0 ${4 * s}px, ${hexa("#415C3C", 0.11)} ${4 * s}px ${5 * s}px)` }} />
      {/* the inner rule */}
      <div style={{ position: "absolute", inset: 4 * s, borderRadius: 2 * s,
        border: `${2 * s}px solid ${hexa("#415C3C", 0.40)}` }} />
      {/* the portrait oval */}
      <div style={{ position: "absolute", left: 14 * s, top: 12 * s, width: 30 * s, height: 38 * s,
        borderRadius: "50%", background: "#E3EEDC", border: `${2.5 * s}px solid #415C3C` }}>
        <div style={{ position: "absolute", left: 7 * s, top: 8 * s, width: 14 * s, height: 14 * s,
          borderRadius: "50%", background: hexa("#415C3C", 0.42) }} />
        <div style={{ position: "absolute", left: 3 * s, top: 22 * s, width: 22 * s, height: 13 * s,
          borderRadius: `${11 * s}px ${11 * s}px 0 0`, background: hexa("#415C3C", 0.42) }} />
      </div>
      {/* the seal */}
      <div style={{ position: "absolute", right: 12 * s, bottom: 9 * s, width: 17 * s, height: 17 * s,
        borderRadius: "50%", border: `${2.5 * s}px solid ${hexa("#7A3B36", 0.62)}` }} />
      {/* the numerals, opposite corners */}
      <div style={{ position: "absolute", right: 9 * s, top: 8 * s, ...mono(20 * s, 800),
        color: "#2E4529" }}>{fig}</div>
      <div style={{ position: "absolute", left: 50 * s, bottom: 7 * s, ...mono(11 * s, 800),
        color: hexa("#2E4529", 0.72), letterSpacing: "0.08em" }}>{fig}</div>
    </div>
  );
};
