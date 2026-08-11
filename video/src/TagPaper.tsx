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
   ⭐⭐ THE WEIGHT AND THE BALLOON.

   Round 15: *"I don't like this card idea, and the hands aren't well designed,
   and it has to be within the video frame — or more interesting theming."*

   ⛔ THE CARDS ARE GONE. Two rectangles side by side is a SLIDE, not a scene, and
   it is what every cut before this one was underneath its set dressing. The tools
   are not presented on cards any more; they ARE objects in a world:

     paid   a stone BLOCK with the mark chiselled into it and the price cut in
            underneath, chained to a Claude who is dragging it and getting
            nowhere. It slams a notch deeper every time the price lands.
     free   a BALLOON carrying the mark, on a string in another Claude's hand.
            On the word it lifts, and it takes him off the ground with it.

   Heavy and low on the left, light and high on the right: the comparison is the
   COMPOSITION, so it reads with the sound off and without a single card.

   ⛔ AND NO DRAWN ARMS. The bolted-on clay rectangles were the "hands aren't well
   designed" note and they were right — the house sprite has its own art and
   anything I weld onto it looks welded on. The sprite holds a CHAIN and a
   STRING; those are props, and props are allowed to be drawn.
   ------------------------------------------------------------------------ */

/* ⛔ EVERYTHING IS BIGGER AND SITS LOWER THAN THE FIRST PASS, and the total moved
   to the top. First composition put the "YOU PAY" sticker at y1216 with the
   sprites' heads at y1110 — the number was printed straight across the hauler —
   and the whole scene was crushed into a band at the bottom under an empty sky.
   Floor 1240, feet 1400, sprites at 1.4, captions down to 1560. */
const GROUND = 1240;      // where the world's floor sits
const FEET = 1400;        // where the sprites stand

/** the chain from the hauler to his block: real links, sagging */
const Chain: React.FC<{ x1: number; y1: number; x2: number; y2: number }> =
  ({ x1, y1, x2, y2 }) => (<>
  {Array.from({ length: 9 }, (_, i) => {
    const t = i / 8;
    const x = x1 + (x2 - x1) * t, y = y1 + (y2 - y1) * t + Math.sin(t * Math.PI) * 26;
    return (<div key={i} style={{ position: "absolute", left: x - 11, top: y - 8, width: 22,
      height: 16, borderRadius: 8, border: "5px solid #6E6252", zIndex: 25 }} />);
  })}
</>);

const PaperBeat: React.FC<{ i: number; paidAt: number; freeAt: number; hook?: boolean }> =
  ({ i, paidAt, freeAt, hook }) => {
  const f = useStep(2);
  const P = PAIRS[i], S = STOCK[i];
  const LEAD = 4;
  const pf = f - (paidAt - LEAD), ff = f - (freeAt - LEAD);

  const load = pf < 0 ? 0 : Math.min(1, pf / 12);
  const lift = ff < 0 ? 0 : E(ff, 0, 16, 0, 1, OUT);
  const rise = hook ? 1 : E(f, 0, 8, 0, 1, OUT);
  /* the balloon strains upward before it goes: the anticipation beat */
  const strain = ff < 0 ? Math.max(0, 1 + ff / 20) : 0;
  const bob = Math.sin(f / 5.2) * 10 + strain * Math.sin(f / 2.1) * 7;

  const BX = 258, BY = GROUND - 16;            // the block, sitting on the ground
  const BW = 380, BH = 360;
  const HX = 588;                               // the hauler
  const FX = 862;                               // the free one
  const BALX = 862, BALY = 660 - lift * 220 + bob;
  const BALR = 176;
  const flyer = FEET - lift * 330;

  const cap = (lg: string, box: number) => Math.min(box * 0.62, (MARK_CAP[lg] ?? 999) * 1.4);

  return (
    <AbsoluteFill style={{ background: S.bg, overflow: "hidden" }}>
      <Halftone c={S.alt} o={0.20} />
      {/* ⭐ A SLOW PUSH ON THE WHOLE SCENE. Losing the card-rip lost the one big
          fast mass in the frame and measured motion fell from 3.03 to 2.16. A
          push moves every pixel, which is what the audit can actually see, and
          on twos it still steps. */}
      <div style={{ position: "absolute", inset: 0,
        transform: `scale(${1 + Math.min(1, f / 66) * 0.075})`,
        transformOrigin: "52% 60%" }}>
      {/* the ground: a torn paper hill */}
      <div style={{ position: "absolute", left: -20, right: -20, top: GROUND, height: 900,
        background: mix(S.bg, 0.30), clipPath: TORN_TOP, zIndex: 4 }} />
      <div style={{ position: "absolute", left: -20, right: -20, top: GROUND + 150, height: 760,
        background: mix(S.bg, 0.44), clipPath: TORN_TOP, zIndex: 4 }} />

      {/* the category, on a stuck-down tab */}
      <div style={{ position: "absolute", left: 56, top: 236, padding: "16px 30px",
        background: S.ink, transform: "rotate(-2.2deg)", zIndex: 40,
        filter: `drop-shadow(${SHADOW})`, fontFamily: inter.fontFamily, fontWeight: 900,
        fontSize: 46, color: S.bg, textTransform: "uppercase" }}>{P.cat}</div>
      <div style={{ position: "absolute", right: 56, top: 244, padding: "12px 22px",
        background: "#F7F3E6", transform: "rotate(2.6deg)", zIndex: 40,
        filter: `drop-shadow(${SHADOW})`, fontFamily: inter.fontFamily, fontWeight: 900,
        fontSize: 34, color: "#2A2114" }}>{i + 1}/10</div>

      {/* ⛔⛔ THE ARRIVAL SLIDES, IT DOES NOT FADE. `opacity: rise` with rise
          easing from 0 means the first frame of every scene is EMPTY — and on
          twos it is the first TWO. That is ten blank frames on ten cuts, in the
          one style where a cut is meant to land hard. Position animates;
          opacity stays at 1. */}
      <div style={{ position: "absolute", inset: 0, zIndex: 20,
        transform: `translateY(${(1 - rise) * 64}px)` }}>

        {/* ---------- the BALLOON, and the string in his hand ------------- */}
        <div style={{ position: "absolute", left: BALX - 3, top: BALY + BALR - 14, width: 6,
          height: flyer - 150 - (BALY + BALR) + 30, background: "#6E6252", zIndex: 24,
          transform: `rotate(${Math.sin(f / 6) * 2}deg)`, transformOrigin: "50% 0%" }} />
        <div style={{ position: "absolute", left: BALX - BALR, top: BALY - BALR,
          width: BALR * 2, height: BALR * 2.16, zIndex: 26,
          filter: `drop-shadow(${SHADOW})` }}>
          <div style={{ position: "absolute", inset: 0, borderRadius: "50% 50% 46% 46%",
            background: "#F7F3E6" }} />
          <div style={{ position: "absolute", left: BALR - 20, bottom: -14, width: 40, height: 26,
            borderRadius: "0 0 12px 12px", background: "#E2DCC8" }} />
          <div style={{ position: "absolute", left: BALR - 70, top: 48, width: 140, height: 140,
            background: "#FFFFFF", border: "5px solid #E2DCC8", display: "flex",
            alignItems: "center", justifyContent: "center" }}>
            <Img src={staticFile("logos/" + P.fLogo)}
              style={{ width: cap(P.fLogo, 140), height: cap(P.fLogo, 140), objectFit: "contain" }} />
          </div>
          <div style={{ position: "absolute", left: 6, right: 6, top: 200, textAlign: "center",
            fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 36,
            color: "#2A2114" }}>{P.free}</div>
          <div style={{ position: "absolute", left: 0, right: 0, top: 246, textAlign: "center",
            fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 70,
            color: "#237A54" }}>FREE</div>
        </div>

        {/* ---------- the BLOCK he is chained to -------------------------- */}
        <div style={{ position: "absolute", left: BX - BW / 2, top: BY - BH + load * 30,
          width: BW, height: BH, zIndex: 22, filter: `drop-shadow(${SHADOW})` }}>
          <div style={{ position: "absolute", inset: 0, background: "#AEA391",
            clipPath: "polygon(3% 0,97% 2%,100% 96%,96% 100%,4% 98%,0 6%)" }} />
          <div style={{ position: "absolute", inset: 0, background: "#948A79",
            clipPath: "polygon(3% 0,97% 2%,100% 12%,0 10%)" }} />
          <div style={{ position: "absolute", left: BW / 2 - 66, top: 38, width: 132, height: 132,
            background: "#FFFFFF", border: "5px solid #6E6252", display: "flex",
            alignItems: "center", justifyContent: "center" }}>
            <Img src={staticFile("logos/" + P.pLogo)}
              style={{ width: cap(P.pLogo, 132), height: cap(P.pLogo, 132), objectFit: "contain" }} />
          </div>
          <div style={{ position: "absolute", left: 4, right: 4, top: 186, textAlign: "center",
            fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 32,
            color: "#2A2114" }}>{P.paid}</div>
          <div style={{ position: "absolute", left: 0, right: 0, top: 228, textAlign: "center",
            fontFamily: inter.fontFamily, fontWeight: 900,
            fontSize: String(P.price).length >= 3 ? 78 : 92, lineHeight: 1,
            color: "#B3372A", transform: `scale(${pf < 0 ? 1 : 1 + Math.sin(Math.min(1, pf / 9) * Math.PI) * 0.16})` }}>
            {"$" + P.price}
          </div>
          <div style={{ position: "absolute", left: 0, right: 0, top: 310, textAlign: "center",
            fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 22,
            letterSpacing: "0.14em", color: "#5E5446" }}>{P.note || "PER MONTH"}</div>
        </div>
        {/* dust on the slam */}
        {load > 0.1 && load < 0.9 && [0, 1, 2, 3].map((k) => (
          <div key={"du" + k} style={{ position: "absolute",
            left: BX - 170 + k * 112 + load * (k < 2 ? -110 : 110), top: BY - 16 - load * 46,
            width: 40 - k * 5, height: 40 - k * 5, borderRadius: 22, background: mix(S.bg, 0.62),
            opacity: (1 - load) * 0.8, zIndex: 23 }} />
        ))}

        <Chain x1={HX - 46} y1={FEET - 128} x2={BX + BW / 2 - 22} y2={BY - 92} />

        {/* ---------- the two of them ------------------------------------ */}
        <div style={{ position: "absolute", left: HX - 78, top: FEET - 16, width: 156, height: 24,
          borderRadius: "50%", background: "rgba(24,18,12,0.28)", zIndex: 24 }} />
        {/* ⭐ HE LEANS INTO IT. A sprite standing upright next to a chain is
            standing next to a chain; the lean is what makes it a haul, and it
            deepens as the price lands. */}
        <div style={{ position: "absolute", inset: 0, zIndex: 27,
          transform: `rotate(${7 + load * 7}deg)`, transformOrigin: `${HX}px ${FEET}px` }}>
          <Claudie x={HX} y={FEET + load * 16} s={1.40} f={f} z={27} face={-1}
            costume={{ stern: 1 }} />
        </div>

        <div style={{ position: "absolute", left: FX - 78, top: FEET - 16, width: 156,
          height: 24, borderRadius: "50%", background: "rgba(24,18,12,0.28)",
          opacity: 1 - lift * 0.8, transform: `scale(${1 - lift * 0.4})`, zIndex: 24 }} />
        <div style={{ position: "absolute", inset: 0, zIndex: 27,
          transform: `rotate(${-lift * 9 + Math.sin(f / 7) * lift * 3}deg)`,
          transformOrigin: `${FX}px ${flyer}px` }}>
          <Claudie x={FX} y={flyer} s={1.40} f={f} z={27} face={1}
            costume={{ cheer: lift > 0.25 ? 1 : 0, gaze: lift > 0.25 ? 0 : 1.3 }} />
        </div>
      </div>

      </div>
      {/* the running total, on a stuck-on sticker */}
      <div style={{ position: "absolute", left: W / 2 - 190, top: 336, width: 380, height: 86,
        background: "#F7F3E6", transform: "rotate(-1.4deg)", zIndex: 42,
        filter: `drop-shadow(${SHADOW})`, display: "flex", alignItems: "center",
        justifyContent: "center", gap: 14 }}>
        <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 24,
          letterSpacing: "0.16em", color: "#8A8072" }}>YOU PAY</span>
        <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 58,
          color: lift > 0.5 ? "#237A54" : "#B3372A" }}>
          {"$" + (TOTAL - (lift > 0.5 ? CUM[i] : i > 0 ? CUM[i - 1] : 0))}
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
  ...PFREE.map((fr, i): Cue => ({ at: (fr - 18) / PFPS, src: A_ + "paper-rustle.wav",
    v: LEVELS.SFX_TEXTURE, dur: 0.72, rate: 1.0 + i * 0.01, lead: 0 })),
  ...PFREE.flatMap((fr, i): Cue[] => [
    { at: fr / PFPS, src: A_ + "paper-slide.wav", v: LEVELS.SFX_HERO, dur: 0.85, rate: 0.96 + i * 0.016, lead: 1 },
    { at: fr / PFPS, src: A_ + "page-turn.wav", v: LEVELS.SFX_MID, dur: 0.7, rate: 1.08 + i * 0.01, lead: 0 },
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
