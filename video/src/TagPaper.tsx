import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame, Img } from "remotion";
import { inter, fraunces } from "./fonts";
import { SfxTrack, LEVELS, layer, Cue } from "./SoundKit";
import { PAIRS, CUM, TOTAL, MARK_CAP, E, OUT, IO, BACK, LIN, mix, dark } from "./TagWorld";
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
  { bg: "#D4593F", ink: "#2A150F", alt: "#A8402C" },   // 123
  { bg: "#6F82C4", ink: "#1C2340", alt: "#4A5C9E" },   // 131
  { bg: "#8D9F52", ink: "#22280F", alt: "#6A7B36" },   // 137
  { bg: "#D4718F", ink: "#33141F", alt: "#A84C68" },   // 146
  { bg: "#5FA377", ink: "#182A1F", alt: "#3E7A54" },   // 138
  { bg: "#D9913E", ink: "#2B1B0E", alt: "#A86A22" },   // 152
  { bg: "#7A83BE", ink: "#1E2340", alt: "#565F98" },   // 134
  { bg: "#C8635A", ink: "#2E1310", alt: "#9C443C" },   // 128
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
   ONE BEAT. Two paper cards; the free one is under a paper sheet reading FREE
   that RIPS DOWN THE MIDDLE and peels away in two halves.
   ⛔ The rip replaces the curtain because a curtain that lifts is what the other
   six cuts already do — a different style has to change the ACTION, not just
   the texture.
   ------------------------------------------------------------------------ */
const PaperBeat: React.FC<{ i: number; paidAt: number; freeAt: number; hook?: boolean }> =
  ({ i, paidAt, freeAt, hook }) => {
  const f = useStep(2);
  const raw = useCurrentFrame();
  const P = PAIRS[i], S = STOCK[i];
  const LEAD = 4;
  const pf = f - (paidAt - LEAD), ff = f - (freeAt - LEAD);

  const rip = ff < 0 ? 0 : E(ff, 0, 12, 0, 1, OUT);
  const shake = ff < 0 ? Math.max(0, 1 + ff / 22) : Math.max(0, 1 - ff / 8);
  const jx = Math.sin(f * 1.7) * 6 * shake, jr = Math.sin(f * 2.3) * 1.4 * shake;
  const punch = pf < 0 ? 1 : 1 + Math.sin(Math.min(1, pf / 8) * Math.PI) * 0.16;
  const rise = hook ? 1 : E(f, 0, 8, 0, 1, BACK);

  const CW = 452, CH = 620, CY = 560;
  const cap = (lg: string) => Math.min(150 * 0.62, (MARK_CAP[lg] ?? 999) * 1.3);

  return (
    <AbsoluteFill style={{ background: S.bg, overflow: "hidden" }}>
      <Halftone c={S.alt} o={0.22} />
      {/* a torn band across the middle: the paper horizon */}
      <div style={{ position: "absolute", left: -20, right: -20, top: 430, height: 980,
        background: mix(S.bg, 0.13), clipPath: TORN_TOP, zIndex: 3 }} />
      {/* the category tab, hand-placed and rotated like a stuck label */}
      <div style={{ position: "absolute", left: 56, top: 250, padding: "16px 30px",
        background: S.ink, transform: "rotate(-2.2deg)", zIndex: 40,
        filter: `drop-shadow(${SHADOW})` }}>
        <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 46,
          letterSpacing: "0.02em", color: S.bg, textTransform: "uppercase" }}>{P.cat}</div>
      </div>
      <div style={{ position: "absolute", right: 56, top: 258, padding: "12px 22px",
        background: "#F2EFE4", transform: "rotate(2.6deg)", zIndex: 40,
        filter: `drop-shadow(${SHADOW})`, fontFamily: inter.fontFamily, fontWeight: 900,
        fontSize: 34, color: "#2A2114" }}>{i + 1}/10</div>

      <div style={{ position: "absolute", inset: 0, zIndex: 20,
        transform: `translateY(${(1 - rise) * 90}px)`, opacity: rise }}>
        {/* ---- the paid card ------------------------------------------- */}
        <Card x={58} y={CY} w={CW} h={CH} rot={-1.8} bg="#F2EFE4" z={22}>
          <div style={{ position: "absolute", left: 0, right: 0, top: 44, textAlign: "center",
            fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 40, letterSpacing: "0.22em",
            color: "#B3372A" }}>PAID</div>
          <div style={{ position: "absolute", left: CW / 2 - 75, top: 108, width: 150, height: 150,
            background: "#FFFFFF", border: "5px solid #E2DCCC",
            display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Img src={staticFile("logos/" + P.pLogo)}
              style={{ width: cap(P.pLogo), height: cap(P.pLogo), objectFit: "contain" }} />
          </div>
          <div style={{ position: "absolute", left: 10, right: 10, top: 282, textAlign: "center",
            fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 44,
            color: "#2A2114" }}>{P.paid}</div>
          <div style={{ position: "absolute", left: 0, right: 0, top: 340, textAlign: "center" }}>
            <span style={{ display: "inline-block", padding: "5px 14px", background: "#E2DCCC",
              fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 22,
              letterSpacing: "0.16em", color: "#6B6252" }}>{P.tier}</span>
          </div>
          <div style={{ position: "absolute", left: 0, right: 0, top: 402, textAlign: "center",
            transform: `scale(${punch})` }}>
            <span style={{ fontFamily: inter.fontFamily, fontWeight: 900,
              fontSize: String(P.price).length >= 3 ? 118 : 140, lineHeight: 1,
              color: "#B3372A" }}>{"$" + P.price}</span>
            <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 30,
              letterSpacing: "0.14em", color: "#8A4A3C" }}>
              {P.note ? P.note : "PER MONTH"}
            </div>
          </div>
          {rip > 0 && (
            <div style={{ position: "absolute", left: 40, right: 40, top: 452, height: 14,
              background: "#B3372A", transform: `scaleX(${rip})`, transformOrigin: "0% 50%" }} />
          )}
        </Card>

        {/* ---- the free card ------------------------------------------- */}
        <Card x={W - 58 - CW} y={CY + 16} w={CW} h={CH} rot={1.6} bg="#F2EFE4" z={22}>
          <div style={{ position: "absolute", left: 0, right: 0, top: 44, textAlign: "center",
            fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 40, letterSpacing: "0.22em",
            color: "#237A54" }}>FREE</div>
          <div style={{ position: "absolute", left: CW / 2 - 75, top: 108, width: 150, height: 150,
            background: "#FFFFFF", border: "5px solid #E2DCCC",
            display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Img src={staticFile("logos/" + P.fLogo)}
              style={{ width: cap(P.fLogo), height: cap(P.fLogo), objectFit: "contain" }} />
          </div>
          <div style={{ position: "absolute", left: 10, right: 10, top: 282, textAlign: "center",
            fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 44,
            color: "#2A2114" }}>{P.free}</div>
          <div style={{ position: "absolute", left: 0, right: 0, top: 396, textAlign: "center",
            transform: `scale(${ff < 0 ? 1 : 1 + Math.sin(Math.min(1, ff / 12) * Math.PI) * 0.18})` }}>
            <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 150,
              lineHeight: 1, color: "#237A54" }}>FREE</span>
          </div>
        </Card>

        {/* ---- the sheet over it, and the RIP --------------------------- */}
        {rip < 1 && [0, 1].map((half) => (
          <div key={half} style={{ position: "absolute",
            left: W - 58 - CW - 14 + half * (CW + 28) / 2, top: CY - 6,
            width: (CW + 28) / 2, height: CH + 12, zIndex: 30, overflow: "hidden",
            /* ⛔ THE LEFT HALF FLIES TOWARD THE PAID CARD, so it has to CLEAR it.
               At 520px of travel it parked on top of "Midjourney / $30" for the
               whole reveal — the torn-off sheet was covering the other half of
               the comparison. 780px plus an opacity fade puts it out of frame
               before it can land on anything. */
            transform: `translate(${(half ? 1 : -1) * rip * 780 + jx}px, ${rip * -60}px) rotate(${(half ? 1 : -1) * rip * 34 + jr}deg)`,
            transformOrigin: half ? "0% 40%" : "100% 40%",
            opacity: Math.max(0, 1 - rip * 1.5),
            filter: `drop-shadow(${SHADOW})` }}>
            <div style={{ position: "absolute", left: half ? -(CW + 28) / 2 : 0, top: 0,
              width: CW + 28, height: CH + 12, background: "#E8E2D2",
              clipPath: TORN_ALL }} />
            {/* the printed word, split across the two halves */}
            <div style={{ position: "absolute", left: half ? -(CW + 28) / 2 : 0, top: 0,
              width: CW + 28, height: CH + 12, display: "flex", alignItems: "center",
              justifyContent: "center", fontFamily: inter.fontFamily, fontWeight: 900,
              fontSize: 168, letterSpacing: "-0.02em", color: "#2A2114" }}>FREE</div>
            {/* the torn seam down the middle */}
            <div style={{ position: "absolute", top: 0, bottom: 0,
              left: half ? 0 : (CW + 28) / 2 - 9, width: 9, background: mix("#E8E2D2", 0.4),
              clipPath: "polygon(0 0,100% 4%,20% 11%,100% 19%,10% 27%,100% 35%,20% 43%,100% 51%,10% 59%,100% 67%,20% 75%,100% 83%,10% 91%,100% 97%,0 100%)" }} />
          </div>
        ))}
        {/* paper bits flying off the tear */}
        {rip > 0.05 && rip < 1 && Array.from({ length: 10 }, (_, k) => {
          const r = (n: number) => { const v = Math.sin(k * 31.4 + n * 7.7) * 4371.7; return v - Math.floor(v); };
          return (<div key={"bit" + k} style={{ position: "absolute",
            left: W - 58 - CW / 2 + (r(1) - 0.5) * 260 * rip * 2,
            top: CY + 200 + (r(2) - 0.5) * 320 * rip * 2 + rip * 180,
            width: 14 + r(3) * 16, height: 10 + r(4) * 14, background: "#E8E2D2",
            transform: `rotate(${r(5) * 360 + rip * 300}deg)`, zIndex: 31,
            opacity: 1 - rip }} />);
        })}
      </div>

      {/* the running total, as a stuck-on price sticker */}
      <div style={{ position: "absolute", left: W / 2 - 190, top: 1252, width: 380, height: 92,
        background: "#F2EFE4", transform: "rotate(-1.4deg)", zIndex: 42,
        filter: `drop-shadow(${SHADOW})`, display: "flex", alignItems: "center",
        justifyContent: "center", gap: 14 }}>
        <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 24,
          letterSpacing: "0.16em", color: "#8A8072" }}>YOU PAY</span>
        <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 60,
          color: rip > 0.5 ? "#237A54" : "#B3372A" }}>
          {"$" + (TOTAL - (rip > 0.5 ? CUM[i] : i > 0 ? CUM[i - 1] : 0))}
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
    <div style={{ position: "absolute", left: 0, right: 0, top: 1420, zIndex: 60,
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
