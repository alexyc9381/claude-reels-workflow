import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame, Img } from "remotion";
import { Bg, Panel, ProgressBar, KaraokeCaption, AssemblyCtx, HookHeader } from "./SlopKit";
import { inter, fraunces } from "./fonts";
import { SfxTrack, LEVELS, layer, Cue } from "./SoundKit";
import { PAIRS, CUM, TOTAL, MARK_CAP, E, OUT, IO, BACK, LIN, mix, dark, Claudie } from "./TagWorld";
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

/** ⭐ ON TWOS. The single highest-leverage difference in this file. */
const useStep = (n = 2) => Math.floor(useCurrentFrame() / n) * n;

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

const SHADOW = "10px 12px 0 rgba(24,18,12,0.34)";
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
    transform: `rotate(${rot}deg)`, filter: `drop-shadow(${SHADOW})` }}>
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
const SQ = 300, SQY = 178, LX = 250, RX = 762;
const GROUND = 520;
const FEET = 688;

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
  clip?: string; z?: number }> = ({ cx, free, P, punch, clip, z = 22 }) => {
  const cap = Math.min(92 * 0.62, (MARK_CAP[free ? P.fLogo : P.pLogo] ?? 999) * 1.4);
  return (
    <div style={{ position: "absolute", left: cx - SQ / 2, top: SQY, width: SQ, height: SQ,
      zIndex: z, clipPath: clip, filter: clip ? undefined : `drop-shadow(${SHADOW})` }}>
      <div style={{ position: "absolute", inset: 0, background: "#F7F3E6" }} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 46,
        background: free ? "#237A54" : "#B3372A", display: "flex", alignItems: "center",
        justifyContent: "center", fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 26,
        letterSpacing: "0.22em", color: "#F7F3E6" }}>{free ? "FREE" : "PAID"}</div>
      <div style={{ position: "absolute", left: SQ / 2 - 46, top: 64, width: 92, height: 92,
        background: "#FFFFFF", border: "4px solid #E2DCC8", display: "flex",
        alignItems: "center", justifyContent: "center" }}>
        <Img src={staticFile("logos/" + (free ? P.fLogo : P.pLogo))}
          style={{ width: cap, height: cap, objectFit: "contain" }} />
      </div>
      <div style={{ position: "absolute", left: 6, right: 6, top: 168, textAlign: "center",
        fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 27,
        color: "#2A2114" }}>{free ? P.free : P.paid}</div>
      {/* ⛔ MEASURED AGAINST THE BOX, NOT PLACED BY EYE. 300 tall: banner 46,
          mark to 156, name to 196, tier to 226, number 232..288. */}
      {!free && (
        <div style={{ position: "absolute", left: 0, right: 0, top: 200, textAlign: "center" }}>
          <span style={{ display: "inline-block", padding: "2px 9px", background: "#E2DCC8",
            fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 14,
            letterSpacing: "0.16em", color: "#6B6252" }}>{P.tier}</span>
        </div>
      )}
      <div style={{ position: "absolute", left: 0, right: 0, top: free ? 208 : 232,
        textAlign: "center", transform: `scale(${punch})` }}>
        <span style={{ fontFamily: inter.fontFamily, fontWeight: 900,
          fontSize: free ? 72 : (String(P.price).length >= 3 ? 46 : 54), lineHeight: 1,
          color: free ? "#237A54" : "#B3372A" }}>
          {free ? "FREE" : "$" + P.price}
        </span>
        {!free && (
          <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 13,
            letterSpacing: "0.14em", color: "#8A4A3C" }}>{P.note || "PER MONTH"}</div>
        )}
      </div>
    </div>
  );
};

const PaperBeat: React.FC<{ i: number; paidAt: number; freeAt: number; hook?: boolean }> =
  ({ i, paidAt, freeAt, hook }) => {
  const f = useStep(2);
  const P = PAIRS[i], S = STOCK[i];
  const LEAD = 4;
  const pf = f - (paidAt - LEAD), ff = f - (freeAt - LEAD);

  const punchP = pf < 0 ? 1 : 1 + Math.sin(Math.min(1, pf / 9) * Math.PI) * 0.20;
  const crouch = pf < 0 ? 0 : Math.min(1, pf / 8);
  const dash = ff < 0 ? 0 : E(ff, 0, 6, 0, 1, IO);
  const slice = ff < 3 ? 0 : E(ff, 3, 15, 0, 1, OUT);
  const flash = ff >= 2 && ff <= 4;
  const stamp = ff < 4 ? 1 : 1 + Math.sin(Math.min(1, (ff - 4) / 10) * Math.PI) * 0.22;
  const rise = hook ? 1 : E(f, 0, 8, 0, 1, OUT);
  /* ⛔ HE STARTS AT 890, NOT 950. The panel is 1012 wide with rounded corners and
     a push on top; at 950 his first pose was half off the screen. */
  const nx = 890 - dash * 800;

  return (
    <AbsoluteFill>
      <Panel>
        <div style={{ position: "absolute", inset: 0, overflow: "hidden",
          transform: `scale(${1 + Math.min(1, f / 66) * 0.07})`, transformOrigin: "50% 58%" }}>
          <NightYard S={S} f={f} i={i} />

          <div style={{ position: "absolute", inset: 0, zIndex: 20,
            transform: `translateY(${(1 - rise) * 46}px)` }}>
            {slice <= 0 && <Square cx={LX} P={P} punch={punchP} z={22} />}
            {slice > 0 && (<>
              <div style={{ position: "absolute", inset: 0, zIndex: 22,
                transform: `translate(${-slice * 150}px, ${-slice * 28 + slice * slice * 210}px) rotate(${-slice * 26}deg)`,
                transformOrigin: `${LX}px ${SQY + SQ / 2}px`,
                filter: `drop-shadow(${SHADOW})`, opacity: 1 - Math.max(0, slice - 0.7) * 3 }}>
                <Square cx={LX} P={P} punch={1} clip="polygon(0 0,100% 0,100% 26%,0 74%)" z={22} />
              </div>
              <div style={{ position: "absolute", inset: 0, zIndex: 22,
                transform: `translate(${slice * 130}px, ${slice * 42 + slice * slice * 250}px) rotate(${slice * 30}deg)`,
                transformOrigin: `${LX}px ${SQY + SQ / 2}px`,
                filter: `drop-shadow(${SHADOW})`, opacity: 1 - Math.max(0, slice - 0.7) * 3 }}>
                <Square cx={LX} P={P} punch={1} clip="polygon(0 74%,100% 26%,100% 100%,0 100%)" z={22} />
              </div>
            </>)}

            <div style={{ position: "absolute", inset: 0, zIndex: 23,
              transform: `scale(${stamp})`, transformOrigin: `${RX}px ${SQY + SQ / 2}px` }}>
              <Square cx={RX} free P={P} punch={1} z={23} />
            </div>

            {ff >= 1 && ff <= 6 && (
              <div style={{ position: "absolute", left: -50, top: SQY + SQ * 0.5,
                width: LX + SQ / 2 + 96, height: 7, background: "#FFFBF0", zIndex: 40,
                transform: "rotate(-13deg)", transformOrigin: "0% 50%" }} />
            )}
            {dash > 0.02 && dash < 0.98 && [0, 1, 2, 3, 4].map((k) => (
              <div key={"sl" + k} style={{ position: "absolute", left: nx + 30 + k * 70,
                top: FEET - 150 + k * 32, width: 110 + k * 30, height: 5,
                background: "#FFFBF0", opacity: 0.55, zIndex: 39 }} />
            ))}

            <div style={{ position: "absolute", left: nx - 56, top: FEET - 12, width: 112,
              height: 18, borderRadius: "50%", background: "rgba(14,12,10,0.32)", zIndex: 24,
              opacity: dash > 0.02 && dash < 0.98 ? 0.2 : 1 }} />
            <Claudie x={nx} y={FEET + crouch * 14 - (dash > 0.02 && dash < 0.98 ? 22 : 0)}
              s={0.98} f={f} z={27} face={-1}
              costume={{ samurai: 1, stern: ff < 4 ? 1 : 0, cheer: ff >= 8 ? 1 : 0 }} />
          </div>

          {flash && (
            <div style={{ position: "absolute", inset: 0, background: "#FFFBF0", opacity: 0.66,
              zIndex: 55 }} />
          )}

          {/* the running total, on a stuck-on paper sticker */}
          <div style={{ position: "absolute", left: PW / 2 - 152, top: 700, width: 304, height: 62,
            background: "#F7F3E6", transform: "rotate(-1.4deg)", zIndex: 42,
            filter: `drop-shadow(${SHADOW})`, display: "flex", alignItems: "center",
            justifyContent: "center", gap: 12 }}>
            <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 18,
              letterSpacing: "0.16em", color: "#8A8072" }}>YOU PAY</span>
            <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 42,
              color: slice > 0.4 ? "#237A54" : "#B3372A" }}>
              {"$" + (TOTAL - (slice > 0.4 ? CUM[i] : i > 0 ? CUM[i - 1] : 0))}
            </span>
          </div>
        </div>
      </Panel>
    </AbsoluteFill>
  );
};

/* ---- the CTA, in the screen ------------------------------------------- */
const PaperCta: React.FC = () => {
  const f = useStep(2);
  const S = STOCK[1];
  return (
    <AbsoluteFill>
      <Panel>
        <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
          <NightYard S={S} f={f} i={4} />
          {/* the ten free marks, pegged up as paper chips */}
          {PAIRS.map((p, k) => {
            const col = k % 5, row = Math.floor(k / 5);
            const t = E(f, 4 + k * 3, 4 + k * 3 + 8, 0, 1, BACK);
            const r = (n: number) => { const v = Math.sin(k * 19.3 + n * 5.1) * 4371.7; return v - Math.floor(v); };
            return (
              <div key={p.free} style={{ position: "absolute", left: 52 + col * 186,
                top: 150 + row * 208, width: 162, height: 190, zIndex: 30,
                transform: `rotate(${(r(1) - 0.5) * 7}deg) scale(${t})`,
                filter: `drop-shadow(${SHADOW})` }}>
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
            zIndex: 44, filter: `drop-shadow(${SHADOW})`, display: "flex", alignItems: "center",
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
  ...PPAID.flatMap((fr, i): Cue[] => [
    { at: fr / PFPS, src: A_ + "snap.wav", v: LEVELS.SFX_HERO, dur: 0.7, rate: 0.93 + i * 0.015, lead: 1 },
    { at: fr / PFPS, src: A_ + "hit-boom.wav", v: LEVELS.SFX_MID, dur: 1.0, rate: 0.9, lead: 2 },
  ]),
  ...PFREE.map((fr, i): Cue => ({ at: (fr - 14) / PFPS, src: A_ + "whoosh-fast.wav",
    v: LEVELS.SFX_TEXTURE, dur: 0.5, rate: 1.24 + i * 0.012, lead: 0 })),
  ...PFREE.flatMap((fr, i): Cue[] => [
    { at: fr / PFPS, src: A_ + "whoosh-choppy.wav", v: LEVELS.SFX_HERO, dur: 0.5, rate: 1.30 + i * 0.014, lead: 1 },
    { at: fr / PFPS, src: A_ + "snap.wav", v: LEVELS.SFX_HERO, dur: 0.4, rate: 1.18 + i * 0.012, lead: 0 },
    { at: (fr + 7) / PFPS, src: A_ + "hit-boom.wav", v: LEVELS.SFX_MID, dur: 0.8, rate: 0.88, lead: 0 },
    { at: (fr + 11) / PFPS, src: A_ + "paper-slide.wav", v: LEVELS.SFX_MID, dur: 0.6, rate: 0.94, lead: 0 },
  ]),
  ...layer(713 / PFPS, { src: A_ + "hit-up.wav", v: LEVELS.SFX_HERO, dur: 1.3 },
                        { src: A_ + "snap.wav", v: LEVELS.SFX_MID, dur: 0.7 }),
  { at: 760 / PFPS, src: A_ + "success-jingle.wav", v: LEVELS.SFX_MID, dur: 1.6, lead: 0 },
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
export const FreeReelPaper: React.FC = () => (
  <AbsoluteFill>
    <Audio src={staticFile("free_vo.wav")} />
    <Audio src={staticFile("free_bed_g.wav")} />
    <SfxTrack cues={PSFX} />
    <Bg />
    <AssemblyCtx.Provider value={true}>
      {SC.map((at, i) => {
        const to = i < SC.length - 1 ? SC[i + 1] : 767;
        return (
          <Sequence key={at} from={at} durationInFrames={to - at} layout="none">
            {i < 10
              ? <PaperBeat i={i} paidAt={PPAID[i] - at} freeAt={PFREE[i] - at} hook={i === 0} />
              : <PaperCta />}
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
