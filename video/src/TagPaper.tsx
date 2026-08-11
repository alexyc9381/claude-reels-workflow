import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame, Img } from "remotion";
import { Bg, Panel, ProgressBar, KaraokeCaption, AssemblyCtx, HookHeader } from "./SlopKit";
import { inter, fraunces } from "./fonts";
import { SfxTrack, LEVELS, layer, Cue } from "./SoundKit";
import { PAIRS, CUM, TOTAL, MARK_CAP, E, OUT, IO, BACK, IN_Q, LIN, mix, dark, Claudie } from "./TagWorld";
import words from "./data/words_free.json";

/* ============================================================================
   REEL 97 "FREE" · CUT G — "PAPER". A DIFFERENT ANIMATION LANGUAGE, not a
   different set.

   ⛔⛔ WHY THIS BREAKS THE HOUSE CHASSIS ON PURPOSE.
   `feedback_reel_house_chassis` is a standing rule: clone the chassis, keep the
   cream ground, the framed dark Panel, the karaoke captions, the progress rail
   and the HookHeader. Every reel from 24 to 97 shares that furniture, which is
   exactly what makes it a HOUSE STYLE — and also exactly what makes ninety-odd
   reels share one visual fingerprint. Alex, round 13: *"this video's animation
   theme style needs to be a lot different than the ones before, for some reason
   it's getting flagged for duplicate content."*

   So this cut keeps what identifies the CHANNEL (the clay Claude, the real brand
   marks, the ten pairs, the keyword) and replaces what identifies the TEMPLATE:

     house chassis                  ->   PAPER
     cream ground + framed panel    ->   FULL BLEED, a new paper colour per beat
     Fraunces karaoke, clay on ink  ->   heavy uppercase Inter in a solid block
     the progress rail + mascot     ->   a torn tab and a price sticker
     smooth 30fps easing            ->   STEPPED ON TWOS
     drawn props, soft shading      ->   torn paper, hard offset shadows, halftone

   ⭐ THE STEP IS THE REAL CHANGE. Everything here samples a frame counter
   quantised to every second frame, so the motion runs at an effective 15fps
   against the house's smooth 30. That is a different MOTION SIGNATURE rather
   than a different palette, and it is the thing a viewer reads as "a different
   kind of animation" before they can name why.
   ========================================================================== */

export const PFPS = 30;

/** ⛔⛔ STEPPING ON TWOS IS GONE. It was the whole differentiation argument in
    round 13 and round 18 killed it in three words: *"too laggy."*  On a phone,
    at this size, a 15fps cadence does not read as hand-made — it reads as a
    dropped-frame video, and no amount of intent survives that. The cut is
    different because of the WORLD and the ACTION now, which is where the
    difference should have been carried all along. Smooth 30. */
const useStep = (_n = 2) => useCurrentFrame();

/* ten paper grounds — matte stock colours, no glow, no gradient washes */
const STOCK = [
  /* ⛔⛔ EVERY GROUND CARRIES ITS OWN LUMA IN A FULL-BLEED STYLE. The first set
     used deep poster inks and six of eleven scenes measured 122-137 against a
     140 bar. The house cuts only ever clear that bar because the cream chassis
     is ~39% of every frame — a full-bleed cut has no such safety net, and the
     bar is not negotiable just because the style changed. These are sun-faded
     stock: same hues, raised value, which also suits paper better than ink did.
     Measured ground luma is in the comment on each row. */
  { bg: "#D8A62C", ink: "#2A2114", alt: "#A87C18" },   // 166
  { bg: "#4FA69C", ink: "#1B2A28", alt: "#2E7C74" },   // 139
  { bg: "#E0705A", ink: "#2A150F", alt: "#B04A38" },   // 137
  { bg: "#6F82C4", ink: "#1C2340", alt: "#4A5C9E" },   // 131
  { bg: "#8D9F52", ink: "#22280F", alt: "#6A7B36" },   // 137
  { bg: "#D4718F", ink: "#33141F", alt: "#A84C68" },   // 146
  { bg: "#5FA377", ink: "#182A1F", alt: "#3E7A54" },   // 138
  { bg: "#D9913E", ink: "#2B1B0E", alt: "#A86A22" },   // 152
  { bg: "#8A93CA", ink: "#1E2340", alt: "#626BA6" },   // 143
  { bg: "#D4786E", ink: "#2E1310", alt: "#A85248" },   // 142
];

/** a torn paper edge: a hand-cut polygon, never a soft mask */
const TORN_TOP = "polygon(0 6%,4% 0,9% 7%,15% 1%,21% 8%,28% 2%,34% 9%,41% 2%,47% 8%,54% 1%,60% 8%,67% 2%,73% 9%,80% 2%,86% 8%,93% 1%,98% 7%,100% 2%,100% 100%,0 100%)";
const TORN_ALL = "polygon(0 4%,5% 0,11% 6%,18% 1%,25% 7%,33% 1%,40% 6%,48% 0,56% 6%,64% 1%,72% 7%,80% 1%,88% 6%,95% 0,100% 5%,99% 12%,100% 22%,98% 33%,100% 44%,99% 56%,100% 67%,98% 78%,100% 89%,96% 96%,88% 100%,80% 95%,72% 100%,63% 95%,55% 100%,46% 95%,38% 100%,29% 95%,21% 100%,12% 95%,4% 99%,0 93%,1% 82%,0 71%,2% 60%,0 49%,1% 38%,0 27%,2% 16%)";

/* ⛔⛔ `filter: drop-shadow()` WAS THE BLUR. It forces the element and its whole
   subtree into a rasterised layer, and that raster then gets scaled twice — once
   by the Panel's own push and once by the scene push — so every logo, price and
   label resampled softly. `boxShadow` is composited, not rasterised, and stays
   crisp under any transform. Same look, no cost. */
const SHADOW = "10px 12px 0 rgba(24,18,12,0.34)";
const BOXSH = "10px 12px 0 rgba(24,18,12,0.34)";
const W = 1080, H = 1920;

/** halftone: a dot field, drawn not filtered */
const Halftone: React.FC<{ c: string; n?: number; o?: number }> = ({ c, n = 22, o = 0.14 }) => (
  <div style={{ position: "absolute", inset: 0, zIndex: 2, overflow: "hidden" }}>
    {Array.from({ length: n * 12 }, (_, i) => {
      const col = i % n, row = Math.floor(i / n);
      const r = 3 + ((col * 7 + row * 5) % 5);
      return (<div key={i} style={{ position: "absolute", left: col * (W / n) + (row % 2 ? W / n / 2 : 0),
        top: row * 170, width: r * 2, height: r * 2, borderRadius: r,
        background: c, opacity: o }} />);
    })}
  </div>
);

/** a paper card with a torn edge and a hard offset shadow */
const Card: React.FC<{ x: number; y: number; w: number; h: number; rot: number;
  bg: string; children?: React.ReactNode; z?: number }> =
  ({ x, y, w, h, rot, bg, children, z = 20 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: w, height: h, zIndex: z,
    transform: `rotate(${rot}deg)`, }}>
    <div style={{ position: "absolute", inset: 0, background: bg, clipPath: TORN_ALL }} />
    {children}
  </div>
);

/* ---------------------------------------------------------------------------
   ⭐⭐ THE NINJA SLICE.

   Round 16: *"having like two squares is kinda good, but maybe like ninja
   slice? need better ideas, not balloon."*  The two-square comparison stays —
   it is the ACTION that was weak. The balloon was a state (light vs heavy);
   this is an EVENT, and an event is what a cut can land on.

     both squares stand, equal
     "this is paid"  -> the price SLAMS on and the ninja drops into a crouch
     "this is free"  -> he DASHES right to left, one flash frame, and the PAID
                        square falls apart along a single diagonal. The FREE
                        square is untouched: the blade went clean over it.

   ⛔ THE FREE SQUARE IS NEVER TOUCHED. The whole argument is that one of these
   survives; cutting both would be a nice effect and a wrong sentence.
   ⭐ House precedent: reel 81 DELETE ran a ninja Claude across nine locations,
   so this is the channel's own cast, not a new character.
   ------------------------------------------------------------------------ */

/* ---- panel-local geometry. ⛔ THE SCENE LIVES IN THE HOUSE SCREEN NOW ------
   Round 17: *"the captions aren't the correct style as nocodealex, and the
   screen part doesn't show properly."*  Both right, and they correct round 13.
   I read "make the animation style a lot different" as licence to throw out the
   chassis, and threw out BRAND with it: the karaoke captions and the framed
   screen are what a viewer recognises as @nocodealex, not what makes ninety
   reels look alike.

   ⭐ THE SPLIT THAT ACTUALLY WORKS:
       BRAND, keep   the cream ground, the framed screen, the house karaoke
                     captions, the progress rail, the clay Claude
       TEMPLATE, change   what happens INSIDE the screen — the world, the
                     action, the cadence, the backgrounds
   Everything below is authored in PANEL coordinates (1012 x 792), not frame. */
const PW = 1012, PH = 792;
/* ⛔ SQY 178, NOT 148. The HookHeader sits over the top of the panel and its
   pill runs to about panel-local 150 — at 148 it clipped the PAID/FREE banners,
   the same y=120-ish ceiling every other cut in this build has had to respect. */
/* ⭐ THE CARDS ARE THE MAIN FOCUS AND THEY ARE SIZED AS SUCH. Round 18: *"the
   cards are too small when they should be the main focus."*  356 x 396 is the
   largest a PAIR fits inside the push-safe box (x 90..922) with a 40px gap
   between them: 2*356 + 3*40 = 832 = exactly the safe width. +41% area. */
const SQ = 356, SQH = 396, SQY = 166, LX = 308, RX = 704;
const GROUND = 574;
const FEET = 700;

/** ⭐ A REAL BACKGROUND, NOT A FILL. Round 17: *"much more interesting
    backgrounds, not just single colour."*  Seven layers before a square lands —
    sky, moon, roofline, bamboo, mist, lanterns, ground — and every one of them
    is on-theme with the ninja rather than generic texture. */
const NightYard: React.FC<{ S: typeof STOCK[0]; f: number; i: number }> = ({ S, f, i }) => {
  const r = (k: number) => { const v = Math.sin(i * 27.3 + k * 6.1) * 4371.7; return v - Math.floor(v); };
  const moonX = 200 + r(1) * 640, moonR = 86 + r(2) * 46;
  return (<>
    {/* sky */}
    {/* ⛔ A NIGHT YARD IS NOT A DARK RECTANGLE. Built off `dark(bg,0.62)` the
        panel read as mud; the layers only separate if the sky is LIGHTER than
        the silhouettes in front of it, which is what a moonlit sky actually is. */}
    <div style={{ position: "absolute", inset: 0,
      background: `linear-gradient(178deg, ${mix(S.bg, 0.30)} 0%, ${mix(S.bg, 0.10)} 54%, ${S.bg} 100%)` }} />
    <Halftone c={S.alt} n={18} o={0.16} />
    {/* the moon, flat and pale */}
    <div style={{ position: "absolute", left: moonX - moonR, top: 40 + r(3) * 60,
      width: moonR * 2, height: moonR * 2, borderRadius: "50%", background: "#F7F3E6",
      opacity: 0.90 }} />
    <div style={{ position: "absolute", left: moonX - moonR * 0.5, top: 40 + r(3) * 60 + moonR * 0.5,
      width: moonR * 0.5, height: moonR * 0.4, borderRadius: "50%", background: mix(S.bg, 0.44),
      opacity: 0.5 }} />
    {/* the roofline: pagoda eaves in torn paper */}
    {[0, 1, 2, 3].map((k) => {
      const w = 200 + r(k + 4) * 190, x = -60 + k * 280 + r(k + 8) * 60;
      const y = GROUND - 120 - r(k + 5) * 78;
      return (<div key={"rf" + k} style={{ position: "absolute", left: x, top: y, width: w,
        height: GROUND - y + 40, background: dark(S.bg, 0.62 - k * 0.05) }}>
        <div style={{ position: "absolute", left: -22, top: -18, width: w + 44, height: 30,
          background: dark(S.bg, 0.54),
          clipPath: "polygon(0 100%,8% 22%,50% 0,92% 22%,100% 100%)" }} />
        <div style={{ position: "absolute", left: w / 2 - 4, top: -40, width: 8, height: 26,
          background: dark(S.bg, 0.40) }} />
      </div>);
    })}
    {/* bamboo, at both edges, with nodes and leaves */}
    {[36, 96, PW - 62, PW - 118].map((x, k) => (
      <div key={"bb" + k} style={{ position: "absolute", left: x - 13, top: -20,
        width: 26, height: GROUND + 120,
        transform: `rotate(${(k % 2 ? 1 : -1) * (1.4 + r(k) * 1.6)}deg)`, transformOrigin: "50% 100%" }}>
        <div style={{ position: "absolute", inset: 0, background: dark(S.bg, 0.56) }} />
        {[0, 1, 2, 3, 4].map((n) => (
          <div key={n} style={{ position: "absolute", left: -3, right: -3, top: 60 + n * 110,
            height: 8, background: dark(S.bg, 0.34) }} />
        ))}
        {[0, 1, 2].map((n) => (
          <div key={"lf" + n} style={{ position: "absolute",
            left: k > 1 ? -66 : 22, top: 90 + n * 140,
            width: 66, height: 17, borderRadius: "50%", background: dark(S.bg, 0.40),
            transform: `rotate(${(k > 1 ? 1 : -1) * (16 + n * 9) + Math.sin(f / 21 + n) * 3}deg)` }} />
        ))}
      </div>
    ))}
    {/* mist: solid bands, drifting, never an alpha wash over the whole frame */}
    {[0, 1, 2].map((k) => (
      <div key={"ms" + k} style={{ position: "absolute",
        left: -140 + ((f * (0.5 + k * 0.35) + k * 300) % (PW + 280)),
        top: GROUND - 128 + k * 44, width: 420, height: 22, borderRadius: 12,
        background: mix(S.bg, 0.30), opacity: 0.55 }} />
    ))}
    {/* two lanterns on a wire, swaying */}
    {[176, PW - 196].map((x, k) => (
      <div key={"ln" + k} style={{ position: "absolute", left: x, top: 4,
        transform: `rotate(${Math.sin(f / 17 + k * 2) * 4}deg)`, transformOrigin: "50% 0%" }}>
        <div style={{ position: "absolute", left: 15, top: 0, width: 4, height: 52,
          background: dark(S.bg, 0.40) }} />
        <div style={{ position: "absolute", left: 0, top: 50, width: 34, height: 46,
          borderRadius: "16px 16px 14px 14px", background: "#D96A4A" }} />
        <div style={{ position: "absolute", left: 0, top: 66, width: 34, height: 5,
          background: "#A84A32" }} />
      </div>
    ))}
    {/* the yard floor */}
    <div style={{ position: "absolute", left: -20, right: -20, top: GROUND, height: PH,
      background: mix(S.bg, 0.40), clipPath: TORN_TOP }} />
    <div style={{ position: "absolute", left: -20, right: -20, top: GROUND + 96, height: PH,
      background: mix(S.bg, 0.54), clipPath: TORN_TOP }} />
    {[130, 380, 640, 890].map((x, k) => (
      <div key={"st" + k} style={{ position: "absolute", left: x - 44, top: GROUND + 150 + (k % 2) * 46,
        width: 88, height: 26, borderRadius: 13, background: mix(S.bg, 0.66), opacity: 0.8 }} />
    ))}
  </>);
};

/** one square, or one half of one: same content, a different clip. */
const Square: React.FC<{ cx: number; free?: boolean; P: typeof PAIRS[0]; punch: number;
  clip?: string; shine?: number; z?: number }> =
  ({ cx, free, P, punch, clip, shine = -1, z = 22 }) => {
  const cap = Math.min(116 * 0.62, (MARK_CAP[free ? P.fLogo : P.pLogo] ?? 999) * 1.4);
  return (
    <div style={{ position: "absolute", left: cx - SQ / 2, top: SQY, width: SQ, height: SQH,
      zIndex: z, clipPath: clip, boxShadow: clip ? undefined : BOXSH,
      overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: "#F7F3E6" }} />
      {/* ⭐ THE GLISTEN. Round 22: *"have a glisten at the beginning for each, on
          the paid part, so it attracts more attention."*  A specular sweep is
          the oldest trick there is for making the eye land somewhere, and the
          paid card is what the beat opens on. Two bands, a wide one and a thin
          trailing one, so it reads as a moving highlight and not a wipe.
          ⛔ HARD-EDGED SOLID PAINT, clipped by the card. No blur, no glow — the
          matte rule is a ship gate and the grep still reads 0. */}
      {shine >= 0 && shine <= 1 && [0, 1].map((b) => (
        <div key={"gl" + b} style={{ position: "absolute", top: -80, bottom: -80,
          left: `${-30 + shine * 150 + b * 9}%`, width: b ? 22 : 76,
          background: "#FFFFFF", opacity: (b ? 0.20 : 0.34) * Math.sin(shine * Math.PI),
          transform: "rotate(-16deg)", zIndex: 9 }} />
      ))}
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 56,
        background: free ? "#237A54" : "#B3372A", display: "flex", alignItems: "center",
        justifyContent: "center", fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 32,
        letterSpacing: "0.22em", color: "#F7F3E6" }}>{free ? "FREE" : "PAID"}</div>
      <div style={{ position: "absolute", left: SQ / 2 - 58, top: 78, width: 116, height: 116,
        background: "#FFFFFF", border: "5px solid #E2DCC8", display: "flex",
        alignItems: "center", justifyContent: "center" }}>
        <Img src={staticFile("logos/" + (free ? P.fLogo : P.pLogo))}
          style={{ width: cap, height: cap, objectFit: "contain" }} />
      </div>
      <div style={{ position: "absolute", left: 6, right: 6, top: 206, textAlign: "center",
        fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 34,
        color: "#2A2114" }}>{free ? P.free : P.paid}</div>
      {/* ⛔ THE TIER BADGE IS GONE. Round 22: *"remove the words PRO from those
          things on the left side."*  It read as part of the product name —
          "GitHub Copilot PRO+" looks like what the thing is called — and on the
          rows where it said PRO it said it three times across the reel.
          ⚠️ IT WAS THERE FOR AN HONESTY REASON and that reason has not gone
          away: the reel prices each tool on its SECOND paid tier, and a bare
          number can read as "what the tool costs" rather than "what that plan
          costs". The rule is still stated in the lead magnet and the caption,
          and the number itself is unchanged. Flagged to Alex, not quietly
          dropped. */}
      {/* ⛔ THE CONTENT STOPS AT 330 OF 396. The last 66px is deliberate empty
          card — it is the band the ninja is allowed to overlap as he crosses in
          front, and it is why nothing he does can ever cover a price. */}
      <div style={{ position: "absolute", left: 0, right: 0, top: free ? 250 : 262,
        textAlign: "center", transform: `scale(${punch})` }}>
        <span style={{ fontFamily: inter.fontFamily, fontWeight: 900,
          fontSize: free ? 84 : (String(P.price).length >= 3 ? 56 : 66), lineHeight: 1,
          color: free ? "#237A54" : "#B3372A" }}>
          {free ? "FREE" : "$" + P.price}
        </span>
        {!free && (
          <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 15,
            letterSpacing: "0.14em", color: "#8A4A3C" }}>{P.note || "PER MONTH"}</div>
        )}
      </div>
    </div>
  );
};

/* ---- H · THE STAGE ------------------------------------------------------
   A variety-show stage: swagged curtain, proscenium arch, footlights, boards.
   Warm and bright, and the opposite temperature to the dojo on purpose.
   ------------------------------------------------------------------------ */
const STAGE_STOCK = [
  { bg: "#B8452F", ink: "#2A1108", alt: "#8E2E1E" }, { bg: "#C97C1E", ink: "#2A1B08", alt: "#9C5C10" },
  { bg: "#8E3350", ink: "#2A0E18", alt: "#6E2038" }, { bg: "#B85E22", ink: "#2A1508", alt: "#8E4212" },
  { bg: "#A03A62", ink: "#2A0E1A", alt: "#7C2648" }, { bg: "#C06A28", ink: "#2A1808", alt: "#964C16" },
  { bg: "#96305A", ink: "#2A0C18", alt: "#741E40" }, { bg: "#BE5230", ink: "#2A1208", alt: "#933A1E" },
  { bg: "#AA4A28", ink: "#2A1208", alt: "#843418" }, { bg: "#8E3A66", ink: "#2A0E1C", alt: "#6E264A" },
];
const StageYard: React.FC<{ S: typeof STOCK[0]; f: number; i: number }> = ({ S, f, i }) => (<>
  <div style={{ position: "absolute", inset: 0,
    background: `linear-gradient(178deg, ${mix(S.bg, 0.24)} 0%, ${S.bg} 60%, ${dark(S.bg, 0.82)} 100%)` }} />
  <Halftone c={S.alt} n={18} o={0.14} />
  {/* the back curtain, swagged and gathered */}
  {Array.from({ length: 14 }, (_, k) => (
    <div key={"cu" + k} style={{ position: "absolute", left: k * (PW / 14) - 4, top: 0,
      width: PW / 14 + 8, bottom: GROUND - 30,
      background: `linear-gradient(90deg, ${dark(S.bg, 0.60)} 0%, ${mix(S.bg, 0.16)} 46%, ${dark(S.bg, 0.68)} 100%)` }} />
  ))}
  {Array.from({ length: 7 }, (_, k) => (
    <div key={"sw" + k} style={{ position: "absolute", left: k * (PW / 7) - 20, top: -66,
      width: PW / 7 + 40, height: 150, borderRadius: "0 0 50% 50%",
      background: dark(S.bg, 0.52) }} />
  ))}
  {/* the proscenium arch and its bulbs */}
  <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 40,
    background: "#7E5A28" }} />
  {[0, 1].map((k) => (
    <div key={"pl" + k} style={{ position: "absolute", left: k ? PW - 44 : 0, top: 0, width: 44,
      bottom: 0, background: `linear-gradient(90deg,#7E5A28,#4E3714)` }} />
  ))}
  {Array.from({ length: 11 }, (_, k) => (
    <div key={"bl" + k} style={{ position: "absolute", left: 30 + k * 96, top: 12, width: 20,
      height: 20, borderRadius: 10, background: "#F4DC9A",
      opacity: 0.55 + 0.45 * Math.abs(Math.sin(f / 9 + k * 0.7)) }} />
  ))}
  {/* the boards, and the footlights along the front */}
  <div style={{ position: "absolute", left: 0, right: 0, top: GROUND - 30, bottom: 0,
    background: `linear-gradient(180deg, ${mix(S.bg, 0.34)} 0%, ${dark(S.bg, 0.74)} 100%)` }} />
  {Array.from({ length: 13 }, (_, k) => (
    <div key={"bd" + k} style={{ position: "absolute", left: k * 82, top: GROUND - 30, bottom: 0,
      width: 3, background: dark(S.bg, 0.58), opacity: 0.6 }} />
  ))}
  {Array.from({ length: 9 }, (_, k) => (
    <div key={"fl" + k} style={{ position: "absolute", left: 26 + k * 122, top: PH - 74,
      width: 74, height: 34, borderRadius: "36px 36px 6px 6px", background: "#6E5A2E" }} />
  ))}
  {Array.from({ length: 9 }, (_, k) => (
    <div key={"fg" + k} style={{ position: "absolute", left: 34 + k * 122, top: PH - 88,
      width: 58, height: 18, borderRadius: 9, background: "#F4DC9A", opacity: 0.85 }} />
  ))}
</>);

/* ---- I · THE PRESS FLOOR ------------------------------------------------
   A factory: riveted plate, gantries, hazard stripes, pipework, a warning lamp.
   Cool and hard, and the only world of the three with no soft edge in it.
   ------------------------------------------------------------------------ */
const PRESS_STOCK = [
  { bg: "#41535E", ink: "#101A20", alt: "#2C3C46" }, { bg: "#4E5A50", ink: "#121A14", alt: "#36423A" },
  { bg: "#3E4C64", ink: "#0E1420", alt: "#2A3648" }, { bg: "#56504A", ink: "#1A1612", alt: "#3C3833" },
  { bg: "#3A5A5E", ink: "#0E1C1E", alt: "#284244" }, { bg: "#4A4E62", ink: "#121424", alt: "#343848" },
  { bg: "#485A4E", ink: "#101A12", alt: "#324236" }, { bg: "#3E5068", ink: "#0E1622", alt: "#2A384C" },
  { bg: "#525648", ink: "#181A12", alt: "#3A3E32" }, { bg: "#40525C", ink: "#101A1E", alt: "#2C3C44" },
];
const PressFloor: React.FC<{ S: typeof STOCK[0]; f: number; i: number }> = ({ S, f, i }) => (<>
  <div style={{ position: "absolute", inset: 0,
    background: `linear-gradient(178deg, ${dark(S.bg, 0.78)} 0%, ${S.bg} 66%, ${mix(S.bg, 0.10)} 100%)` }} />
  <Halftone c={S.alt} n={16} o={0.14} />
  {/* riveted wall plate */}
  {Array.from({ length: 3 }, (_, r) => Array.from({ length: 4 }, (_, c) => (
    <div key={"pl" + r + c} style={{ position: "absolute", left: c * 258 + 6, top: 40 + r * 168,
      width: 246, height: 156, borderRadius: 4,
      background: (r + c) % 2 ? mix(S.bg, 0.06) : dark(S.bg, 0.88),
      border: `3px solid ${dark(S.bg, 0.70)}` }} />
  )))}
  {Array.from({ length: 20 }, (_, k) => (
    <div key={"rv" + k} style={{ position: "absolute", left: 18 + (k % 5) * 258,
      top: 50 + Math.floor(k / 5) * 168, width: 10, height: 10, borderRadius: 5,
      background: mix(S.bg, 0.30), opacity: 0.8 }} />
  ))}
  {/* pipework across the top, and a warning lamp that pulses */}
  {[70, 116].map((y, k) => (
    <div key={"pi" + k} style={{ position: "absolute", left: -20, right: -20, top: y, height: 18,
      background: `linear-gradient(180deg, ${mix(S.bg, 0.22)}, ${dark(S.bg, 0.68)})` }} />
  ))}
  {[180, 520, 860].map((x, k) => (
    <div key={"fl" + k} style={{ position: "absolute", left: x - 12, top: 62, width: 24, height: 70,
      background: dark(S.bg, 0.60) }} />
  ))}
  <div style={{ position: "absolute", left: PW - 116, top: 150, width: 52, height: 52,
    borderRadius: 26, background: "#C0392B",
    opacity: 0.45 + 0.55 * Math.abs(Math.sin(f / 7)) }} />
  <div style={{ position: "absolute", left: PW - 124, top: 196, width: 68, height: 14,
    borderRadius: 5, background: dark(S.bg, 0.62) }} />
  {/* the press bed and the hazard kick rail */}
  <div style={{ position: "absolute", left: 0, right: 0, top: GROUND - 34, height: 22,
    background: "repeating-linear-gradient(45deg,#C8A23A 0 22px,#2B2F34 22px 44px)", opacity: 0.9 }} />
  <div style={{ position: "absolute", left: 0, right: 0, top: GROUND - 12, bottom: 0,
    background: `linear-gradient(180deg, ${mix(S.bg, 0.18)} 0%, ${dark(S.bg, 0.72)} 100%)` }} />
  {Array.from({ length: 8 }, (_, k) => (
    <div key={"cq" + k} style={{ position: "absolute", left: -40 + k * 146, top: GROUND - 12,
      bottom: 0, width: 72, background: mix(S.bg, 0.07), transform: "skewX(-15deg)" }} />
  ))}
</>);

/* =========================================================================
   ⭐⭐ A VARIANT IS A WORLD PLUS AN EVENT.

   Round 21. The ninja cut is the shape that works, so the two new variants keep
   everything that makes it work and change only the two things that make it
   THAT cut: where it happens, and what happens.

     shared, never varied   the house chassis · two 356x396 cards · the free one
                            straining and rumbling before the beat · the reward
                            chime on every spoken "free" · the running total
     varied per cut         the WORLD (a layered background, its own palette)
                            the EVENT (what destroys the paid card, and which
                            Claude does it)

   ⛔ The FREE card is never touched in any of them. That is the sentence.
   ========================================================================= */
type EventProps = { P: typeof PAIRS[0]; f: number; ff: number; pf: number; punchP: number;
  shine: number };
type PaperKit = {
  id: string; label: string; bed: string;
  stocks: typeof STOCK;
  Dress: React.FC<{ S: typeof STOCK[0]; f: number; i: number }>;
  Event: React.FC<EventProps>;
};

/* ---- G · THE DOJO — one stroke, the card falls in two ------------------- */
const SliceEvent: React.FC<EventProps> = ({ P, f, ff, pf, punchP, shine }) => {
  const crouch = pf < 0 ? 0 : Math.min(1, pf / 8);
  const dash = ff < 0 ? 0 : E(ff, 0, 6, 0, 1, IO);
  const slice = ff < 3 ? 0 : E(ff, 3, 15, 0, 1, OUT);
  /* he starts at 902, not further right: the panel is 1012 wide with rounded
     corners and a push on top, and at 950 his first pose was half off. */
  const nx = 902 - dash * 806;
  const idleBob = Math.sin(f / 6.5) * 5 + Math.sin(f / 3.1) * 2;
  const drift = ff < 0 ? Math.min(48, Math.max(0, f - 4) * 1.1) : 0;
  const landing = ff >= 6 ? Math.max(0, 1 - (ff - 6) / 10) : 0;
  const x = nx - drift;
  const y = FEET + crouch * 22 + idleBob * (dash > 0.02 ? 0 : 1)
          - (dash > 0.02 && dash < 0.98 ? 26 : 0) + landing * 10;
  const tilt = dash > 0.02 && dash < 0.98 ? -16 : ff >= 6 ? -6 + landing * 6 : -crouch * 7;
  return (<>
    {slice <= 0 && <Square cx={LX} P={P} punch={punchP} shine={shine} z={22} />}
    {slice > 0 && (<>
      <div style={{ position: "absolute", inset: 0, zIndex: 22,
        transform: `translate(${-slice * 150}px, ${-slice * 28 + slice * slice * 210}px) rotate(${-slice * 26}deg)`,
        transformOrigin: `${LX}px ${SQY + SQH / 2}px`, opacity: 1 - Math.max(0, slice - 0.7) * 3 }}>
        <Square cx={LX} P={P} punch={1} clip="polygon(0 0,100% 0,100% 26%,0 74%)" z={22} />
      </div>
      <div style={{ position: "absolute", inset: 0, zIndex: 22,
        transform: `translate(${slice * 130}px, ${slice * 42 + slice * slice * 250}px) rotate(${slice * 30}deg)`,
        transformOrigin: `${LX}px ${SQY + SQH / 2}px`, opacity: 1 - Math.max(0, slice - 0.7) * 3 }}>
        <Square cx={LX} P={P} punch={1} clip="polygon(0 74%,100% 26%,100% 100%,0 100%)" z={22} />
      </div>
    </>)}
    {ff >= 1 && ff <= 6 && (
      <div style={{ position: "absolute", left: -50, top: SQY + SQH * 0.46,
        width: LX + SQ / 2 + 96, height: 7, background: "#FFFBF0", zIndex: 40,
        transform: "rotate(-13deg)", transformOrigin: "0% 50%" }} />
    )}
    {dash > 0.02 && dash < 0.98 && [0, 1, 2, 3, 4].map((k) => (
      <div key={"sl" + k} style={{ position: "absolute", left: nx + 30 + k * 70,
        top: FEET - 150 + k * 32, width: 110 + k * 30, height: 5,
        background: "#FFFBF0", opacity: 0.55, zIndex: 39 }} />
    ))}
    {ff >= 7 && ff <= 13 && [0, 1].map((k) => (
      <div key={"fk" + k} style={{ position: "absolute", left: x + 26 + k * 20,
        top: FEET - 96 - k * 16, width: 40 - k * 12, height: 5, background: "#FFFBF0",
        opacity: 0.7 - k * 0.25, zIndex: 39, transform: `rotate(${-24 - k * 10}deg)` }} />
    ))}
    <div style={{ position: "absolute", left: x - 60, top: FEET - 12, width: 120, height: 18,
      borderRadius: "50%", background: "rgba(14,12,10,0.32)", zIndex: 24,
      opacity: dash > 0.02 && dash < 0.98 ? 0.2 : 1, transform: `scaleX(${1 - crouch * 0.12})` }} />
    <div style={{ position: "absolute", inset: 0, zIndex: 27,
      transform: `rotate(${tilt}deg)`, transformOrigin: `${x}px ${FEET}px` }}>
      <Claudie x={x} y={y} s={0.92} f={f} z={27} face={-1}
        costume={{ samurai: 1, stern: ff < 5 ? 1 : 0, cheer: ff >= 10 ? 1 : 0 }} />
    </div>
  </>);
};

/* ---- H · THE STAGE — the floor opens and it is simply gone -------------- */
const TrapEvent: React.FC<EventProps> = ({ P, f, ff, pf, punchP, shine }) => {
  const pull = ff < 0 ? 0 : E(ff, 0, 5, 0, 1, IO);        // the lever
  const flap = ff < 1 ? 0 : E(ff, 1, 9, 0, 1, OUT);        // the doors swing down
  const fall = ff < 3 ? 0 : E(ff, 3, 14, 0, 1, IN_Q);      // gravity, accelerating
  const shut = ff < 15 ? 0 : E(ff, 15, 21, 0, 1, BACK);    // and they snap back
  const open = Math.max(0, flap - shut);
  const lx = 108, lever = -18 + pull * 46;
  const brace = pf < 0 ? 0 : Math.min(1, pf / 9);
  return (<>
    {/* the trap doors, hinged at the outer edges of the card's footprint */}
    {[-1, 1].map((sgn) => (
      <div key={"tp" + sgn} style={{ position: "absolute",
        left: sgn < 0 ? LX - SQ / 2 - 14 : LX + 4, top: GROUND - 12,
        width: SQ / 2 + 10, height: 22, background: "#6E5A3E", zIndex: 26,
        transformOrigin: sgn < 0 ? "0% 50%" : "100% 50%",
        transform: `rotate(${sgn * open * 86}deg)`,
        boxShadow: BOXSH }} />
    ))}
    {/* the hole under it, which only exists while the doors are open */}
    {open > 0.05 && (
      <div style={{ position: "absolute", left: LX - SQ / 2 - 4, top: GROUND - 6,
        width: SQ + 8, height: 26, borderRadius: 6, background: "#17130E",
        opacity: Math.min(1, open * 2), zIndex: 25 }} />
    )}
    {/* ⛔ THE CARD IS MASKED AT THE TRAPDOOR LINE, not just moved down. Without
        the clip it slid over the floor and read as falling OVER rather than
        THROUGH — the hole has to actually swallow it. The mask is a fixed band
        from the top of the panel to the doors; the card animates inside it. */}
    {fall < 1 && (
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: GROUND - 4,
        overflow: "hidden", zIndex: 22 }}>
        <div style={{ position: "absolute", inset: 0,
          transform: `translateY(${fall * 470}px) rotate(${fall * 4}deg)`,
          transformOrigin: `${LX}px ${SQY + SQH}px` }}>
          <Square cx={LX} P={P} punch={punchP} shine={shine} z={22} />
        </div>
      </div>
    )}
    {/* the lever, and the Claude who yanks it */}
    <div style={{ position: "absolute", left: lx - 12, top: FEET - 104, width: 24, height: 96,
      borderRadius: 12, background: "#5E5348", zIndex: 26,
      transform: `rotate(${lever}deg)`, transformOrigin: "50% 100%" }} />
    <div style={{ position: "absolute", left: lx - 20, top: FEET - 118, width: 40, height: 30,
      borderRadius: 14, background: "#C0392B", zIndex: 27,
      transform: `rotate(${lever}deg)`, transformOrigin: "50% 320%" }} />
    <div style={{ position: "absolute", left: lx - 34, top: FEET - 14, width: 68, height: 20,
      borderRadius: 6, background: "#4A4038", zIndex: 26 }} />
    <div style={{ position: "absolute", left: lx + 52, top: FEET - 12, width: 116, height: 18,
      borderRadius: "50%", background: "rgba(14,12,10,0.30)", zIndex: 24 }} />
    <Claudie x={lx + 110} y={FEET + brace * 10} s={0.92} f={f} z={27} face={-1}
      costume={{ suit: 1, stern: ff < 3 ? 1 : 0, cheer: ff >= 8 ? 1 : 0 }} />
  </>);
};

/* ---- I · THE PRESS — flattened where it stands -------------------------- */
const PressEvent: React.FC<EventProps> = ({ P, f, ff, pf, punchP, shine }) => {
  const arm = pf < 0 ? 0 : Math.min(1, pf / 10);           // he reaches for it
  const hit = ff < 0 ? 0 : E(ff, 0, 4, 0, 1, IN_Q);        // the ram comes down FAST
  const squash = ff < 3 ? 0 : E(ff, 3, 8, 0, 1, OUT);      // and it gives
  const lift = ff < 14 ? 0 : E(ff, 14, 24, 0, 1, IO);      // then it withdraws
  const ram = hit - lift * 0.8;
  const flat = squash;
  const bx = 118;
  return (<>
    {/* the card, flattening in place */}
    <div style={{ position: "absolute", inset: 0, zIndex: 22,
      transform: `scaleY(${1 - flat * 0.88}) scaleX(${1 + flat * 0.14})`,
      transformOrigin: `${LX}px ${SQY + SQH}px` }}>
      <Square cx={LX} P={P} punch={punchP} shine={shine} z={22} />
    </div>
    {/* the ram: a slab on two guide rails */}
    {[-1, 1].map((sgn) => (
      <div key={"gr" + sgn} style={{ position: "absolute", left: LX + sgn * (SQ / 2 + 26) - 9,
        top: 40, width: 18, height: GROUND - 40, background: "#5A6169", zIndex: 20 }} />
    ))}
    {/* ⛔ THE RAM STOPS ON WHAT IT CRUSHED. It travelled to a fixed offset that
        left it hovering mid-card; the card flattens to ~12% of its height with
        its FOOT pinned, so the ram's resting face is (card foot - flat height -
        ram height). Anything else and the press is pressing thin air. */}
    <div style={{ position: "absolute", left: LX - SQ / 2 - 40,
      top: -150 + ram * (SQY + SQH - SQH * 0.12 - 132 + 150),
      width: SQ + 80, height: 132, zIndex: 30, boxShadow: BOXSH }}>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,#8A939C,#4A5158)" }} />
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 26,
        background: "repeating-linear-gradient(45deg,#C8A23A 0 20px,#2B2F34 20px 40px)" }} />
      {[0, 1, 2, 3, 4].map((k) => (
        <div key={k} style={{ position: "absolute", left: 26 + k * (SQ + 80 - 52) / 4 - 8, top: 20,
          width: 16, height: 16, borderRadius: 9, background: "#39404A" }} />
      ))}
    </div>
    {/* what squirts out sideways when it gives */}
    {squash > 0.05 && squash < 0.98 && [0, 1, 2, 3, 4, 5].map((k) => (
      <div key={"bo" + k} style={{ position: "absolute",
        left: LX + (k % 2 ? 1 : -1) * (SQ / 2 + squash * (60 + k * 34)),
        top: SQY + SQH - 30 - squash * (30 + k * 12), width: 16 - k, height: 16 - k,
        borderRadius: 8, background: "#C8A23A", opacity: 1 - squash, zIndex: 31 }} />
    ))}
    {/* the button, and the Claude who hits it */}
    <div style={{ position: "absolute", left: bx - 32, top: FEET - 92, width: 64, height: 58,
      borderRadius: 8, background: "#3A4149", zIndex: 26, boxShadow: BOXSH }} />
    <div style={{ position: "absolute", left: bx - 22, top: FEET - 100 + (ff >= 0 && ff < 8 ? 8 : 0),
      width: 44, height: 30, borderRadius: 15, background: "#C0392B", zIndex: 27 }} />
    <div style={{ position: "absolute", left: bx + 54, top: FEET - 12, width: 116, height: 18,
      borderRadius: "50%", background: "rgba(14,12,10,0.30)", zIndex: 24 }} />
    <div style={{ position: "absolute", inset: 0, zIndex: 27,
      transform: `rotate(${arm * -8 + (ff >= 0 && ff < 8 ? -6 : 0)}deg)`,
      transformOrigin: `${bx + 112}px ${FEET}px` }}>
      <Claudie x={bx + 112} y={FEET} s={0.92} f={f} z={27} face={-1}
        costume={{ constr: 1, stern: ff < 4 ? 1 : 0, cheer: ff >= 10 ? 1 : 0 }} />
    </div>
  </>);
};

export const PKITS: PaperKit[] = [
  { id: "dojo",  label: "THE DOJO · one stroke, the card falls in two",
    bed: "free_bed_g.wav", stocks: STOCK,       Dress: NightYard,  Event: SliceEvent },
  { id: "stage", label: "THE STAGE · the floor opens and it is gone",
    bed: "free_bed_h.wav", stocks: STAGE_STOCK, Dress: StageYard,  Event: TrapEvent },
  { id: "press", label: "THE PRESS · flattened where it stands",
    bed: "free_bed_i.wav", stocks: PRESS_STOCK, Dress: PressFloor, Event: PressEvent },
];

const PaperBeat: React.FC<{ i: number; paidAt: number; freeAt: number; hook?: boolean; k?: number }> =
  ({ i, paidAt, freeAt, hook, k = 0 }) => {
  const f = useStep(2);
  const K = PKITS[k];
  const P = PAIRS[i], S = K.stocks[i];
  const LEAD = 4;
  const pf = f - (paidAt - LEAD), ff = f - (freeAt - LEAD);

  const punchP = pf < 0 ? 1 : 1 + Math.sin(Math.min(1, pf / 9) * Math.PI) * 0.20;
  const crouch = pf < 0 ? 0 : Math.min(1, pf / 8);
  const dash = ff < 0 ? 0 : E(ff, 0, 6, 0, 1, IO);
  const slice = ff < 3 ? 0 : E(ff, 3, 15, 0, 1, OUT);
  const flash = ff >= 2 && ff <= 4;
  const stamp = ff < 4 ? 1 : 1 + Math.sin(Math.min(1, (ff - 4) / 10) * Math.PI) * 0.22;
  /* ⭐ THE FREE SQUARE STRAINS BEFORE THE BLADE LANDS. Round 19: *"the right side
     needs to shake and stuff here and sound like that."*  Same job the curtain
     does in the six house cuts — the beat has to be EARNED, not just arrived at.
     A small idle tremble all the way through, ramping to full over the 22 frames
     before the cut, released on the stamp.
     ⛔ TWO FREQUENCIES, NOT ONE: a fast jitter over a slow sway reads as strain;
     one sine reads as floating. And it BULGES on the same curve. */
  const build = ff < 0 ? Math.max(0, 1 + ff / 22) : Math.max(0, 1 - ff / 5);
  const shake = Math.min(1, 0.14 + build * 0.86);
  const sx = (Math.sin(f * 2.2) * 4.2 + Math.sin(f * 4.9 + 1.1) * 2.2) * shake;
  const sy = (Math.sin(f * 3.1 + 0.6) * 3.0 + Math.sin(f * 6.3) * 1.2) * shake;
  const sr = Math.sin(f * 2.5 + 0.4) * 1.0 * shake;
  const swell = 1 + Math.abs(Math.sin(f * 1.8)) * 0.024 * shake;
  const rise = hook ? 1 : E(f, 0, 8, 0, 1, OUT);
  /* ⛔ THE TOTAL NEEDS A KIT-AGNOSTIC "IT IS DONE". Each event destroys the paid
     card its own way — sliced, dropped, flattened — so the rail cannot read any
     one of their internals. It reads the BEAT: 7 frames past the word, whatever
     just happened has happened. */
  const gone = ff >= 7;
  /* ⭐ the glisten runs early, while the beat is still introducing the card —
     it is an attention cue, not a payoff, so it must be finished before the
     price lands rather than competing with it. */
  const shine = f >= 3 && f <= 22 ? (f - 3) / 19 : -1;

  return (
    <AbsoluteFill>
      <Panel>
        <div style={{ position: "absolute", inset: 0, overflow: "hidden",
          transform: `scale(${1 + Math.min(1, f / 66) * 0.045})`, transformOrigin: "50% 58%" }}>
          <K.Dress S={S} f={f} i={i} />

          <div style={{ position: "absolute", inset: 0, zIndex: 20,
            transform: `translateY(${(1 - rise) * 46}px)` }}>
            <K.Event P={P} f={f} ff={ff} pf={pf} punchP={punchP} shine={shine} />

            {/* ⭐ light building up BEHIND the free square as it strains. Hard
                wedges and solid paints — the matte rule is a ship gate, and a
                blur here would be the same mistake the drop-shadow was. */}
            {/* ⛔ `ri`, not `k` — `k` is the KIT INDEX in this scope and shadowing
                it here silently pointed the rays at the wrong variant's data. */}
            {shake > 0.2 && Array.from({ length: 9 }, (_, ri) => {
              const a = (ri / 8) * 360;
              const len = (120 + ((ri * 31) % 70)) * (0.35 + shake * 0.75);
              return (<div key={"ry" + ri} style={{ position: "absolute",
                left: RX, top: SQY + SQH * 0.46, width: len, height: 22 + (ri % 3) * 8,
                marginTop: -14, background: "#FFF4D2", opacity: 0.06 + shake * 0.20,
                transform: `rotate(${a + Math.sin(f / 17 + ri) * 2}deg)`,
                transformOrigin: "0% 50%",
                clipPath: "polygon(0 42%,100% 0,100% 100%,0 58%)", zIndex: 21 }} />);
            })}
            <div style={{ position: "absolute", inset: 0, zIndex: 23,
              transform: `translate(${sx}px, ${sy}px) rotate(${sr}deg) scale(${stamp * swell})`,
              transformOrigin: `${RX}px ${SQY + SQH / 2}px` }}>
              <Square cx={RX} free P={P} punch={1} z={23} />
            </div>
          </div>

          {flash && (
            <div style={{ position: "absolute", inset: 0, background: "#FFFBF0", opacity: 0.66,
              zIndex: 55 }} />
          )}

          {/* the running total, on a stuck-on paper sticker */}
          <div style={{ position: "absolute", left: PW / 2 - 152, top: 700, width: 304, height: 62,
            background: "#F7F3E6", transform: "rotate(-1.4deg)", zIndex: 42,
            boxShadow: BOXSH, display: "flex", alignItems: "center",
            justifyContent: "center", gap: 12 }}>
            <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 18,
              letterSpacing: "0.16em", color: "#8A8072" }}>YOU PAY</span>
            <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 42,
              color: gone ? "#237A54" : "#B3372A" }}>
              {"$" + (TOTAL - (gone ? CUM[i] : i > 0 ? CUM[i - 1] : 0))}
            </span>
          </div>
        </div>
      </Panel>
    </AbsoluteFill>
  );
};

/* ---- the CTA, in the screen ------------------------------------------- */
const PaperCta: React.FC<{ k?: number }> = ({ k = 0 }) => {
  const f = useStep(2);
  const K = PKITS[k];
  const S = K.stocks[1];
  return (
    <AbsoluteFill>
      <Panel>
        <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
          <K.Dress S={S} f={f} i={4} />
          {/* the ten free marks, pegged up as paper chips */}
          {PAIRS.map((p, k) => {
            const col = k % 5, row = Math.floor(k / 5);
            const t = E(f, 4 + k * 3, 4 + k * 3 + 8, 0, 1, BACK);
            const r = (n: number) => { const v = Math.sin(k * 19.3 + n * 5.1) * 4371.7; return v - Math.floor(v); };
            return (
              <div key={p.free} style={{ position: "absolute", left: 52 + col * 186,
                top: 150 + row * 208, width: 162, height: 190, zIndex: 30,
                transform: `rotate(${(r(1) - 0.5) * 7}deg) scale(${t})`,
                boxShadow: BOXSH }}>
                <div style={{ position: "absolute", inset: 0, background: "#F7F3E6" }} />
                <div style={{ position: "absolute", left: 35, top: 20, width: 92, height: 92,
                  background: "#FFFFFF", border: "4px solid #E2DCC8", display: "flex",
                  alignItems: "center", justifyContent: "center" }}>
                  <Img src={staticFile("logos/" + p.fLogo)}
                    style={{ width: Math.min(57, (MARK_CAP[p.fLogo] ?? 999) * 1.4),
                      height: Math.min(57, (MARK_CAP[p.fLogo] ?? 999) * 1.4), objectFit: "contain" }} />
                </div>
                <div style={{ position: "absolute", left: 4, right: 4, top: 122, textAlign: "center",
                  fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 19,
                  color: "#2A2114" }}>{p.free}</div>
                <div style={{ position: "absolute", left: 0, right: 0, top: 148, textAlign: "center",
                  fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 26,
                  color: "#237A54" }}>FREE</div>
              </div>
            );
          })}
          <div style={{ position: "absolute", left: 52, right: 52, top: 592, height: 96,
            background: "#D8A62C", transform: `rotate(1.2deg) scale(${f < 4 ? 0 : E(f, 4, 12, 1.4, 1, BACK)})`,
            zIndex: 44, boxShadow: BOXSH, display: "flex", alignItems: "center",
            justifyContent: "center", fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 50,
            letterSpacing: "0.04em", color: "#2A2114" }}>COMMENT “FREE”</div>
        </div>
      </Panel>
    </AbsoluteFill>
  );
};

/* ---- assembly ----------------------------------------------------------- */
const SC = [0, 65, 135, 204, 274, 338, 407, 479, 549, 618, 699];
const HEADS: Array<[string, string]> = [
  ["FREE VS PAID AI", "IMAGE CREATION"], ["AI RESEARCH", "2 OF 10"],
  ["AVATAR CREATION", "3 OF 10"], ["CODE GENERATION", "4 OF 10"],
  ["VIDEO GENERATION", "5 OF 10"], ["IMAGE EDITING", "6 OF 10"],
  ["SOCIAL SCHEDULING", "7 OF 10"], ["WEBSITE BUILDER", "8 OF 10"],
  ["VIDEO EDITING", "9 OF 10"], ["VOICE GENERATION", "10 OF 10"],
  ["THAT IS $521 A MONTH", "COMMENT FREE FOR THE LIST"],
];
/** ⭐⭐ EVERY SPOKEN "FREE", DERIVED FROM THE CAPTION DATA. Round 20: *"have some
    sort of satisfying sound whenever 'free' is mentioned."*  Twelve of them —
    the ten line-final ones plus both in the CTA ("comment FREE", "every free
    tool") — and this list is COMPUTED from `words_free.json` rather than typed,
    so it can never drift from what is actually said. Hardcoding it would be the
    same mistake that put every hit 2-13 frames late in round 2. */
const FREE_WORDS: number[] = (words as Array<{ start: number; word: string }>)
  .filter((w) => w.word.trim().toLowerCase().replace(/[.,!?]/g, "") === "free")
  .map((w) => Math.round(w.start * PFPS));

const PPAID = [26, 98, 171, 242, 303, 370, 442, 513, 581, 661];
const PFREE = [51, 120, 181, 260, 325, 393, 461, 525, 604, 682];
const A_ = "am/";

/** ⛔ THE SFX ARE REBUILT FOR A SWORD, not reused from the house cuts. A till
    and a coin drop belong to the coin-op world; this one draws and cuts.
    ⛔ THE SLICE IS THREE LAYERS AND THEY ARE NOT SIMULTANEOUS: the draw BEFORE
    the word (the wind-up), the ring ON it, the thuds after as the halves land.
    A single cue on the beat sounds like a click. */
const PSFX: Cue[] = [
  ...layer(0, { src: A_ + "hit-boom.wav", v: LEVELS.SFX_HERO, dur: 1.8 },
              { src: A_ + "paper-slide.wav", v: LEVELS.SFX_MID, dur: 1.1 }),
  ...SC.slice(1).map((at, i): Cue => ({ at: at / PFPS, src: A_ + "page-turn.wav",
    v: LEVELS.SFX_MID, dur: 0.8, rate: 0.94 + (i % 3) * 0.07, lead: 2 })),
  /* ⛔ THE SLAM GETS OUT OF THE WAY WHEN THE NEXT BEAT IS CLOSE. Row 8's two
     hits are 12 frames apart, and a 1.0s boom was still ringing when the reward
     chime landed — measured a 0.0 dB rise on that row against 4-9 dB elsewhere.
     The boom is shortened to fit the gap it actually has. */
  ...PPAID.flatMap((fr, i): Cue[] => {
    const gap = PFREE[i] - fr;
    return [
      { at: fr / PFPS, src: A_ + "snap.wav", v: LEVELS.SFX_HERO,
        dur: gap < 20 ? 0.42 : 0.7, rate: 0.93 + i * 0.015, lead: 1 },
      { at: fr / PFPS, src: A_ + "hit-boom.wav", v: LEVELS.SFX_MID,
        dur: gap < 20 ? 0.44 : 1.0, rate: 0.9, lead: 2 },
    ];
  }),
  /* ⭐ THE STRAIN, AUDIBLE. The right square shakes for the 22 frames before the
     cut, so it has to be heard doing it: a synthesized low rumble under the
     build plus a paper rustle over it, and only then the sword. */
  /* ⛔ THE PRE-ROLL IS CLAMPED OFF THE PAID SLAM. Row 8's two hits are only 12
     frames apart (513 -> 525), so a flat 22-frame wind-up started BEFORE the
     slam and the reward chime had to fight it — measured a 0.1 dB rise on that
     row against 4-9 dB everywhere else. Never let an anticipation layer start
     before the beat it is anticipating from. */
  ...PFREE.map((fr, i): Cue => ({ at: Math.max(fr - 22, PPAID[i] + 5) / PFPS,
    src: A_ + "rumble-build.wav", v: LEVELS.SFX_TEXTURE, dur: 0.86,
    rate: 0.98 + i * 0.006, lead: 0 })),
  ...PFREE.map((fr, i): Cue => ({ at: Math.max(fr - 18, PPAID[i] + 7) / PFPS,
    src: A_ + "paper-rustle.wav", v: LEVELS.SFX_BED, dur: 0.72,
    rate: 1.04 + i * 0.008, lead: 0 })),
  ...PFREE.map((fr, i): Cue => ({ at: (fr - 14) / PFPS, src: A_ + "whoosh-fast.wav",
    v: LEVELS.SFX_TEXTURE, dur: 0.5, rate: 1.24 + i * 0.012, lead: 0 })),
  ...PFREE.flatMap((fr, i): Cue[] => [
    { at: fr / PFPS, src: A_ + "whoosh-choppy.wav", v: LEVELS.SFX_HERO, dur: 0.5, rate: 1.30 + i * 0.014, lead: 1 },
    { at: fr / PFPS, src: A_ + "snap.wav", v: LEVELS.SFX_HERO, dur: 0.4, rate: 1.18 + i * 0.012, lead: 0 },
    { at: (fr + 7) / PFPS, src: A_ + "hit-boom.wav", v: LEVELS.SFX_MID, dur: 0.8, rate: 0.88, lead: 0 },
    { at: (fr + 11) / PFPS, src: A_ + "paper-slide.wav", v: LEVELS.SFX_MID, dur: 0.6, rate: 0.94, lead: 0 },
  ]),
  /* ⛔⛔ THESE WERE HARDCODED AT 713 AND 760 AND THE WORDS ARE AT 709 AND 756.
     Four frames of drift is enough for the stack to sit ON TOP of the reward
     chime instead of under it — measured -4.2 dB on "comment FREE", the one
     word in the reel the viewer is being asked to type. Derived now, like
     everything else that has to match the voice. */
  ...layer(FREE_WORDS[10] / PFPS, { src: A_ + "hit-up.wav", v: LEVELS.SFX_HERO, dur: 1.3 },
                                   { src: A_ + "snap.wav", v: LEVELS.SFX_MID, dur: 0.7 }),
  { at: FREE_WORDS[11] / PFPS, src: A_ + "success-jingle.wav", v: LEVELS.SFX_MID,
    dur: 1.6, lead: 0 },

  /* ⭐⭐ THE WORD ALWAYS RINGS. A bright chime plus a small pop on every single
     "free", so the word itself becomes a motif rather than only the slice being
     scored. ⛔ PITCHED UP THE RUN (0.94 -> 1.18 across the twelve) so they read
     as ONE RISING GESTURE instead of twelve identical dings — twelve of the same
     sample is a glitch, not a rhythm.
     ⛔ It lands ON the word while the sword's snap leads it by a frame, so the
     order a listener hears is: blade, then reward. Simultaneous would smear
     both. */
  /* ⛔⛔ THE CHIME RINGS FOUR FRAMES AFTER THE WORD, NOT ON IT. Landing it ON the
     syllable put it underneath the sword, and the sword is BRIGHT — measured in
     the 2-6 kHz band where the chime lives, the "before" window was up to 8 dB
     HOTTER than the chime because the snap and the whoosh lead it by a frame.
     Stacking two bright transients 30ms apart smears both. At +4 frames (133ms)
     the ear gets a clean one-two: the crack, then the reward. */
  ...FREE_WORDS.map((fr, i): Cue => ({
    at: (fr + 4) / PFPS, src: A_ + "positive-chime.wav", v: LEVELS.SFX_HERO,
    dur: 1.05, rate: 0.94 + i * 0.022, lead: 0,
  })),
  /* ⛔ THE TWO IN THE CTA SIT INSIDE UNBROKEN SPEECH ("comment FREE for", "every
     free tool") rather than in the pause the other ten land in, so they get a
     second, brighter layer to cut through the voice instead of sitting under it.
     ⚠️ An energy-rise measurement cannot separate these two from the VO — the
     window before them IS the voice. Same trap as the transient-density metric. */
  ...FREE_WORDS.slice(10).map((fr, i): Cue => ({
    at: (fr + 4) / PFPS, src: A_ + "ping.wav", v: LEVELS.SFX_HERO,
    dur: 0.7, rate: 1.16 + i * 0.06, lead: 0,
  })),
  ...FREE_WORDS.map((fr, i): Cue => ({
    at: (fr + 4) / PFPS, src: A_ + "check-pop.wav", v: LEVELS.SFX_MID,
    dur: 0.38, rate: 1.00 + i * 0.018, lead: 0,
  })),
];

const PaperHead: React.FC<{ big: string; hot: string; settled?: boolean }> =
  ({ big, hot, settled }) => {
  const f = useCurrentFrame();
  return <HookHeader f={settled ? f + 12 : f} big={big} hot={hot} />;
};

/** ⛔⛔ THE ROOT OWNS THE BRAND. `Bg`, `HookHeader`, `ProgressBar` and the ONE
    house `KaraokeCaption` track — byte-identical to the six house cuts, because
    those are what a viewer recognises as this channel. Only what happens inside
    the screen is new. */
export const makePaperReel = (k: number): React.FC => () => (
  <AbsoluteFill>
    <Audio src={staticFile("free_vo.wav")} />
    <Audio src={staticFile(PKITS[k].bed)} />
    <SfxTrack cues={PSFX} />
    <Bg />
    <AssemblyCtx.Provider value={true}>
      {SC.map((at, i) => {
        const to = i < SC.length - 1 ? SC[i + 1] : 767;
        return (
          <Sequence key={at} from={at} durationInFrames={to - at} layout="none">
            {i < 10
              ? <PaperBeat i={i} paidAt={PPAID[i] - at} freeAt={PFREE[i] - at} hook={i === 0} k={k} />
              : <PaperCta k={k} />}
          </Sequence>
        );
      })}
    </AssemblyCtx.Provider>
    {/* ⛔ HookHeader TAKES ITS OWN FRAME. Rendered without `f` it defaults to 0
        and the entrance never plays, so the header simply never appears — which
        is what "the screen part doesn't show properly" partly was. The house
        cuts wrap it for exactly this reason, and the hook gets +12 so scene 0 is
        SETTLED rather than animating in. */}
    {SC.map((at, i) => {
      const to = i < SC.length - 1 ? SC[i + 1] : 767;
      return (
        <Sequence key={"h" + at} from={at} durationInFrames={to - at} layout="none">
          <PaperHead big={HEADS[i][0]} hot={HEADS[i][1]} settled={i === 0} />
        </Sequence>
      );
    })}
    <ProgressBar />
    <KaraokeCaption words={words as any} fps={PFPS} top={1268} />
  </AbsoluteFill>
);

export const FreeReelPaper = makePaperReel(0);   // G · THE DOJO
export const FreeReelStage = makePaperReel(1);   // H · THE STAGE
export const FreeReelPress = makePaperReel(2);   // I · THE PRESS
