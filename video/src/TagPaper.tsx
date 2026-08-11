import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame, Img } from "remotion";
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

const GROUND = 1240;
const FEET = 1372;
const SQ = 430;                       // they are SQUARES, which is the note
const LX = 288, RX = 792, SQY = 646;

/** one square, or one half of one: same content, a different clip. */
const Square: React.FC<{ cx: number; free?: boolean; P: typeof PAIRS[0]; punch: number;
  clip?: string; z?: number }> = ({ cx, free, P, punch, clip, z = 22 }) => {
  const cap = Math.min(132 * 0.62, (MARK_CAP[free ? P.fLogo : P.pLogo] ?? 999) * 1.4);
  return (
    <div style={{ position: "absolute", left: cx - SQ / 2, top: SQY, width: SQ, height: SQ,
      zIndex: z, clipPath: clip, filter: clip ? undefined : `drop-shadow(${SHADOW})` }}>
      <div style={{ position: "absolute", inset: 0, background: "#F7F3E6" }} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 66,
        background: free ? "#237A54" : "#B3372A", display: "flex", alignItems: "center",
        justifyContent: "center", fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 38,
        letterSpacing: "0.22em", color: "#F7F3E6" }}>{free ? "FREE" : "PAID"}</div>
      <div style={{ position: "absolute", left: SQ / 2 - 66, top: 96, width: 132, height: 132,
        background: "#FFFFFF", border: "5px solid #E2DCC8", display: "flex",
        alignItems: "center", justifyContent: "center" }}>
        <Img src={staticFile("logos/" + (free ? P.fLogo : P.pLogo))}
          style={{ width: cap, height: cap, objectFit: "contain" }} />
      </div>
      <div style={{ position: "absolute", left: 8, right: 8, top: 244, textAlign: "center",
        fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 38,
        color: "#2A2114" }}>{free ? P.free : P.paid}</div>
      {!free && (
        <div style={{ position: "absolute", left: 0, right: 0, top: 292, textAlign: "center" }}>
          <span style={{ display: "inline-block", padding: "4px 12px", background: "#E2DCC8",
            fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 20,
            letterSpacing: "0.16em", color: "#6B6252" }}>{P.tier}</span>
        </div>
      )}
      {/* ⛔ THE SQUARE IS 430 TALL. At top 328 a 92px price plus its "PER MONTH"
          ran to 444 and the label was cut off by the square's own edge — the
          third time this exact overflow has bitten in this build. Measure the
          block against the box. */}
      <div style={{ position: "absolute", left: 0, right: 0, top: free ? 296 : 306,
        textAlign: "center", transform: `scale(${punch})` }}>
        <span style={{ fontFamily: inter.fontFamily, fontWeight: 900,
          fontSize: free ? 100 : (String(P.price).length >= 3 ? 72 : 84), lineHeight: 1,
          color: free ? "#237A54" : "#B3372A" }}>
          {free ? "FREE" : "$" + P.price}
        </span>
        {!free && (
          <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 20,
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
  /* ⛔ THE DASH IS SIX FRAMES. A ninja who takes half a second to cross is a
     jogger; the whole read is that it already happened. */
  const dash = ff < 0 ? 0 : E(ff, 0, 6, 0, 1, IO);
  const slice = ff < 3 ? 0 : E(ff, 3, 15, 0, 1, OUT);
  const flash = ff >= 2 && ff <= 4 ? 1 : 0;
  const stamp = ff < 4 ? 1 : 1 + Math.sin(Math.min(1, (ff - 4) / 10) * Math.PI) * 0.22;
  const rise = hook ? 1 : E(f, 0, 8, 0, 1, OUT);
  const nx = 1010 - dash * 900;

  return (
    <AbsoluteFill style={{ background: S.bg, overflow: "hidden" }}>
      <Halftone c={S.alt} o={0.20} />
      <div style={{ position: "absolute", inset: 0,
        transform: `scale(${1 + Math.min(1, f / 66) * 0.07})`, transformOrigin: "50% 58%" }}>
        <div style={{ position: "absolute", left: -20, right: -20, top: GROUND, height: 900,
          background: mix(S.bg, 0.30), clipPath: TORN_TOP, zIndex: 4 }} />
        <div style={{ position: "absolute", left: -20, right: -20, top: GROUND + 170, height: 760,
          background: mix(S.bg, 0.46), clipPath: TORN_TOP, zIndex: 4 }} />

        <div style={{ position: "absolute", inset: 0, zIndex: 20,
          transform: `translateY(${(1 - rise) * 64}px)` }}>

          {/* ---- the PAID square, in one piece until the blade lands ------ */}
          {slice <= 0 && <Square cx={LX} P={P} punch={punchP} z={22} />}
          {/* ---- and in two after. One diagonal, two halves, gravity ------ */}
          {slice > 0 && (<>
            <div style={{ position: "absolute", inset: 0, zIndex: 22,
              transform: `translate(${-slice * 210}px, ${-slice * 40 + slice * slice * 300}px) rotate(${-slice * 26}deg)`,
              transformOrigin: `${LX}px ${SQY + SQ / 2}px`,
              filter: `drop-shadow(${SHADOW})`, opacity: 1 - Math.max(0, slice - 0.7) * 3 }}>
              <Square cx={LX} P={P} punch={1} clip="polygon(0 0,100% 0,100% 26%,0 74%)" z={22} />
            </div>
            <div style={{ position: "absolute", inset: 0, zIndex: 22,
              transform: `translate(${slice * 180}px, ${slice * 60 + slice * slice * 360}px) rotate(${slice * 30}deg)`,
              transformOrigin: `${LX}px ${SQY + SQ / 2}px`,
              filter: `drop-shadow(${SHADOW})`, opacity: 1 - Math.max(0, slice - 0.7) * 3 }}>
              <Square cx={LX} P={P} punch={1} clip="polygon(0 74%,100% 26%,100% 100%,0 100%)" z={22} />
            </div>
          </>)}

          {/* ---- the FREE square. Untouched, and it stamps -------------- */}
          <div style={{ position: "absolute", inset: 0, zIndex: 23,
            transform: `scale(${stamp})`, transformOrigin: `${RX}px ${SQY + SQ / 2}px` }}>
            <Square cx={RX} free P={P} punch={1} z={23} />
          </div>

          {/* ---- the cut itself: one hard streak, three frames ---------- */}
          {/* ⛔ THE STREAK STOPS AT THE PAID SQUARE. Run full width it crossed the
              FREE one too, which contradicts the only thing the shot is saying:
              the blade went over that one. */}
          {ff >= 1 && ff <= 6 && (
            <div style={{ position: "absolute", left: -70, top: SQY + SQ * 0.5,
              width: LX + SQ / 2 + 130, height: 9, background: "#FFFBF0", zIndex: 40,
              transform: "rotate(-13deg)", transformOrigin: "0% 50%" }} />
          )}
          {/* speed lines, only while he is actually moving */}
          {dash > 0.02 && dash < 0.98 && [0, 1, 2, 3, 4].map((k) => (
            <div key={"sl" + k} style={{ position: "absolute", left: nx + 40 + k * 90,
              top: FEET - 200 + k * 42, width: 150 + k * 40, height: 7,
              background: "#FFFBF0", opacity: 0.55, zIndex: 39 }} />
          ))}

          {/* ---- the ninja ---------------------------------------------- */}
          <div style={{ position: "absolute", left: nx - 78, top: FEET - 16, width: 156,
            height: 24, borderRadius: "50%", background: "rgba(24,18,12,0.28)", zIndex: 24,
            opacity: dash > 0.02 && dash < 0.98 ? 0.2 : 1 }} />
          <Claudie x={nx} y={FEET + crouch * 20 - (dash > 0.02 && dash < 0.98 ? 30 : 0)}
            s={1.34} f={f} z={27} face={-1}
            costume={{ samurai: 1, stern: ff < 4 ? 1 : 0, cheer: ff >= 8 ? 1 : 0 }} />
        </div>
      </div>

      {/* ⛔ ONE FLASH FRAME, and it is a SOLID PAINT for two frames — a hard cut
          flash, not a glow. The matte rule is a ship gate. */}
      {flash > 0 && (
        <div style={{ position: "absolute", inset: 0, background: "#FFFBF0", opacity: 0.72,
          zIndex: 55 }} />
      )}

      <div style={{ position: "absolute", left: 56, top: 236, padding: "16px 30px",
        background: S.ink, transform: "rotate(-2.2deg)", zIndex: 40,
        filter: `drop-shadow(${SHADOW})`, fontFamily: inter.fontFamily, fontWeight: 900,
        fontSize: 46, color: S.bg, textTransform: "uppercase" }}>{P.cat}</div>
      <div style={{ position: "absolute", right: 56, top: 244, padding: "12px 22px",
        background: "#F7F3E6", transform: "rotate(2.6deg)", zIndex: 40,
        filter: `drop-shadow(${SHADOW})`, fontFamily: inter.fontFamily, fontWeight: 900,
        fontSize: 34, color: "#2A2114" }}>{i + 1}/10</div>
      <div style={{ position: "absolute", left: W / 2 - 190, top: 336, width: 380, height: 86,
        background: "#F7F3E6", transform: "rotate(-1.4deg)", zIndex: 42,
        filter: `drop-shadow(${SHADOW})`, display: "flex", alignItems: "center",
        justifyContent: "center", gap: 14 }}>
        <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 24,
          letterSpacing: "0.16em", color: "#8A8072" }}>YOU PAY</span>
        <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 58,
          color: slice > 0.4 ? "#237A54" : "#B3372A" }}>
          {"$" + (TOTAL - (slice > 0.4 ? CUM[i] : i > 0 ? CUM[i - 1] : 0))}
        </span>
      </div>
    </AbsoluteFill>
  );
};

/* ---- the CTA ------------------------------------------------------------ */
const PaperCta: React.FC = () => {
  const f = useStep(2);
  /* ⛔ THE CTA GROUND IS PAPER, NOT NEAR-BLACK. At #1E1A14 full bleed the whole
     frame measured 55.7 against a 140 bar — the house cuts only clear it because
     the cream chassis is 39% of every frame, and a full-bleed style has no such
     safety net. Every ground in this cut has to carry its own luma. */
  const S = { bg: "#EDE6D4", ink: "#2A2114" };
  return (
    <AbsoluteFill style={{ background: S.bg, overflow: "hidden" }}>
      <Halftone c="#B9A97E" o={0.20} />
      <div style={{ position: "absolute", left: 56, top: 250, padding: "16px 30px",
        background: "#2A2114", transform: "rotate(-2deg)", zIndex: 40,
        filter: `drop-shadow(${SHADOW})`, fontFamily: inter.fontFamily, fontWeight: 900,
        fontSize: 46, color: "#EDE6D4" }}>THAT IS $521 A MONTH</div>
      {/* the ten free marks, stuck down as paper chips */}
      {PAIRS.map((p, k) => {
        const col = k % 5, row = Math.floor(k / 5);
        const t = E(f, 6 + k * 3, 6 + k * 3 + 8, 0, 1, BACK);
        const r = (n: number) => { const v = Math.sin(k * 19.3 + n * 5.1) * 4371.7; return v - Math.floor(v); };
        return (
          <div key={p.free} style={{ position: "absolute", left: 66 + col * 194,
            top: 560 + row * 250, width: 168, height: 218, zIndex: 30,
            transform: `rotate(${(r(1) - 0.5) * 7}deg) scale(${t})`,
            filter: `drop-shadow(${SHADOW})` }}>
            <div style={{ position: "absolute", inset: 0, background: "#FBF8EE",
              clipPath: TORN_ALL }} />
            <div style={{ position: "absolute", left: 34, top: 26, width: 100, height: 100,
              background: "#FFFFFF", border: "4px solid #E2DCCC", display: "flex",
              alignItems: "center", justifyContent: "center" }}>
              <Img src={staticFile("logos/" + p.fLogo)}
                style={{ width: Math.min(62, (MARK_CAP[p.fLogo] ?? 999) * 1.3),
                  height: Math.min(62, (MARK_CAP[p.fLogo] ?? 999) * 1.3), objectFit: "contain" }} />
            </div>
            <div style={{ position: "absolute", left: 6, right: 6, top: 140, textAlign: "center",
              fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 22,
              color: "#2A2114" }}>{p.free}</div>
            <div style={{ position: "absolute", left: 0, right: 0, top: 172, textAlign: "center",
              fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 30,
              color: "#237A54" }}>FREE</div>
          </div>
        );
      })}
      {/* the keyword, stamped */}
      <div style={{ position: "absolute", left: 66, right: 66, top: 1120, height: 132,
        background: "#D8A62C", transform: `rotate(1.2deg) scale(${f < 4 ? 0 : E(f, 4, 12, 1.4, 1, BACK)})`,
        zIndex: 44, filter: `drop-shadow(${SHADOW})`, display: "flex", alignItems: "center",
        justifyContent: "center", fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 62,
        letterSpacing: "0.04em", color: "#2A2114" }}>COMMENT “FREE”</div>
    </AbsoluteFill>
  );
};

/* ---- captions: a solid block, heavy uppercase, NOT the house karaoke ----- */
const PaperCaption: React.FC = () => {
  const f = useCurrentFrame();
  const t = f / PFPS;
  const W2 = words as Array<{ start: number; end: number; word: string }>;
  const idx = W2.findIndex((w, k) => t >= w.start && (k === W2.length - 1 || t < W2[k + 1].start));
  if (idx < 0) return null;
  const lineStart = Math.max(0, idx - (idx % 4));
  const line = W2.slice(lineStart, lineStart + 4);
  return (
    <div style={{ position: "absolute", left: 0, right: 0, top: 1560, zIndex: 60,
      display: "flex", justifyContent: "center" }}>
      <div style={{ background: "#1E1A14", padding: "18px 34px", transform: "rotate(-0.8deg)",
        filter: `drop-shadow(${SHADOW})`, display: "flex", gap: 16 }}>
        {line.map((w, k) => (
          <span key={k} style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 66,
            letterSpacing: "-0.01em", textTransform: "uppercase",
            color: lineStart + k === idx ? "#D8A62C" : "#F2EFE4" }}>{w.word.trim()}</span>
        ))}
      </div>
    </div>
  );
};

/* ---- assembly ----------------------------------------------------------- */
const SC = [0, 65, 135, 204, 274, 338, 407, 479, 549, 618, 699];
const PPAID = [26, 98, 171, 242, 303, 370, 442, 513, 581, 661];
const PFREE = [51, 120, 181, 260, 325, 393, 461, 525, 604, 682];
const A_ = "am/";

/** ⛔ THE SFX ARE REBUILT FOR PAPER, not reused. A cash register and a coin drop
    belong to the coin-op cut; this world tears and stamps. */
const PSFX: Cue[] = [
  ...layer(0, { src: A_ + "hit-boom.wav", v: LEVELS.SFX_HERO, dur: 1.8 },
              { src: A_ + "paper-slide.wav", v: LEVELS.SFX_MID, dur: 1.1 }),
  ...SC.slice(1).map((at, i): Cue => ({ at: at / PFPS, src: A_ + "page-turn.wav",
    v: LEVELS.SFX_MID, dur: 0.8, rate: 0.94 + (i % 3) * 0.07, lead: 2 })),
  ...PPAID.flatMap((fr, i): Cue[] => [
    { at: fr / PFPS, src: A_ + "snap.wav", v: LEVELS.SFX_HERO, dur: 0.7, rate: 0.93 + i * 0.015, lead: 1 },
    { at: fr / PFPS, src: A_ + "hit-boom.wav", v: LEVELS.SFX_MID, dur: 1.0, rate: 0.9, lead: 2 },
  ]),
  /* ⛔ THE SLICE IS THREE LAYERS AND THEY ARE NOT SIMULTANEOUS: the draw comes
     BEFORE the word (the wind-up), the ring lands ON it, the two thuds land
     after as the halves hit. A single cue on the beat would sound like a click. */
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

export const FreeReelPaper: React.FC = () => (
  <AbsoluteFill style={{ background: "#1E1A14" }}>
    <Audio src={staticFile("free_vo.wav")} />
    <Audio src={staticFile("free_bed_g.wav")} />
    <SfxTrack cues={PSFX} />
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
    <PaperCaption />
  </AbsoluteFill>
);
