import React from "react";
import { useCurrentFrame } from "remotion";
import { inter, fraunces } from "./fonts";
import { MONO } from "./SlopKit";
import {
  W, H, SAFE, E, OUT, IO, BACK, IN_Q, LIN, hexa, mxh, dkh, SH, SH_D, rnd,
  CLAY, GOLD, GREEN, RED, PAPER, INK, TOK, TOKD, TOKL, BRASS, BRASSD, BRASSL,
  WOOD, WOODD, WOODL,
  Room, Rain, Scene, Cam, Beam, Strip, Motes, Chip, Plate, BigNum, Contact, Edge,
  Mark, MarkPlate, MarkCast, Token, MakerPlate, PROVIDERS, usePlace,
} from "./RepWorld";
import {
  Counter, Pile, Fall, Chute, Flag429, Machine, Clerk, Waiting, Stack, Cap,
} from "./RepProps";

/* ===========================================================================
   REEL 99 "REPO" · THE BODY.  Board: storyboards/99-repo.md.  BUILD 3.

   ⛔⛔ THE NOTE THAT PRODUCED THIS BUILD:
      *"try to represent 800 million free tokens in a much simpler and
        straightforward way ... some of the components i wouldnt think its about
        the content discussed in the video unless otherwise, like the animations
        isnt really related"*

      So: no metaphor at all. A TOKEN is already a physical object and a NUMBER
      is already a number. Every object in every scene below is one of four
      things — a token, a logo, a counter, or a real figure — and a prop that
      would need a sentence of explanation is not in the reel.

   ⛔ EVERY EVENT FRAME IS A MEASURED WORD ONSET from src/data/words_repo.json,
      converted to LOCAL Sequence frames, PICTURE LEADING THE ONSET BY 4 FRAMES.
      root onsets: Someone 0 · Not 114 · GPT-5 182 · Most 255 · This 365 ·
                   Hit 499 · Comment 574     (lead-4: 0/110/178/251/361/495/570)

   ⛔⛔ THE `push` RANGE IS SCENE-LOCAL, NOT SHOT-LOCAL — `Scene` reads
      useCurrentFrame(), which restarts per SEQUENCE, not per hard cut. Every
      range starts on ITS OWN CUT or the shot sits on a frozen camera.

   ⛔ THE MOVE BUDGET IS ONE. Only S1b re-frames (a motivated pull-back that
      reveals the pile). ⛔ ANY TRANSFORMED WRAPPER NEEDS AN EXPLICIT zIndex.
   ========================================================================= */

const shake = (lf: number, at: number, amp = 14, n = 12) => {
  if (lf < at || lf > at + n) return { x: 0, y: 0 };
  const k = 1 - (lf - at) / n;
  const d = k * k * amp;
  return { x: Math.sin(lf * 2.7) * d, y: Math.cos(lf * 3.4) * d * 0.7 };
};

const Flash: React.FC<{ lf: number; at: number; n?: number; o?: number }> =
  ({ lf, at, n = 3, o = 0.34 }) => {
  if (lf < at || lf >= at + n) return null;
  return <div style={{ position: "absolute", inset: 0, zIndex: 130, pointerEvents: "none",
    background: "#F9F3E4", opacity: (1 - (lf - at) / n) * o }} />;
};

const P = PROVIDERS;
const M = 800000000;

/* ================================================================== S0 ====
   0.00 -> 3.67s · 110f · HOOK · FOUR HARD CUTS, camera locked in each.

   ⛔ FRAME 0 IS SETTLED AND COMPLETE: a sealed chute with the Claude mark on
      its cap, an odometer reading all zeros, and a small labelled stack of
      800,000 tokens on the counter. Every one of those is legible with no
      explanation, and together they ARE the claim waiting to happen.
   ⛔ THE PHYSICAL SURPRISE IS AT f12: the cap blows off, tokens blast down, and
      the odometer spins to 800,000,000. That is the whole hook — the number
      counting up, and the pile appearing under it.
   ========================================================================= */
export const S0Hook: React.FC = () => {
  const f = useCurrentFrame();
  const p = usePlace("count");
  const pb = usePlace("bench");
  const CUT = [0, 22, 56, 82];
  const shot = CUT.filter((c) => f >= c).length - 1;
  const lf = f - CUT[shot];
  const HZ = p.horizon;

  /* ---- A · WIDE · the seal breaks and the count starts ----------------- */
  if (shot === 0) {
    const pop = E(lf, 12, 19, 0, 1, OUT);
    const cnt = E(lf, 13, 22, 0, M, OUT);
    const pour = E(lf, 13, 20, 0, 1, OUT);
    const sk = shake(lf, 12, 15, 13);
    return (
      <Scene p={p} slug="FREE TOKENS  ·  PER MONTH" push={[0, 22, 1.045]} vig={0.34}>
        <div style={{ position: "absolute", inset: 0, zIndex: 1,
          transform: `translate(${sk.x}px, ${sk.y}px)` }}>
          <Room p={p} f={f} />
          {/* ⛔ THE HEADER PILL OCCLUDES PANEL y 0..100 ACROSS x 96..881. v1 of
              this shot put the chute mouth at y=170 and the pill ate the top
              two thirds of it, so the frame read as an empty cream room with a
              small odometer in the corner. The chute now clears the pill and
              the odometer sits on the counter-top at full size. */}
          {/* two providers mounted on the wall — logos, in frame 0, at 120px */}
          <Token x={162} y={252} s={132} z={26} markKey={P[0].k} name={P[0].n}
            hasMark rot={-6} />
          <Token x={856} y={252} s={132} z={26} markKey={P[1].k} name={P[1].n}
            hasMark rot={7} />
          {/* the main chute, Claude-marked, sealed at f0 */}
          <div style={{ position: "absolute", left: W / 2 - 156, top: -40, width: 312,
            height: 330, background: BRASS, zIndex: 30, boxShadow: SH_D,
            clipPath: "polygon(0 0, 100% 0, 66% 100%, 34% 100%)" }} />
          <div style={{ position: "absolute", left: W / 2 - 156, top: -40, width: 88,
            height: 330, background: BRASSL, opacity: 0.5, zIndex: 31,
            clipPath: "polygon(0 0, 100% 0, 66% 100%, 34% 100%)" }} />
          <Cap x={W / 2} y={274} w={226} z={80} t={pop} />
          <Fall x={W / 2} y={296} len={396} f={f} n={12} s={1.15} z={70}
            spread={190} on={pour} />
          {/* the odometer — the simple, straightforward version of the claim */}
          <Counter x={W / 2} y={452} v={cnt} s={0.78} z={64} />
          <Pile x={W / 2} base={748} n={Math.round(pour * 40)} s={1.0} z={76}
            w={560} seed={5} logos={[2, 7, 13, 21]} />
          {/* what one free tier gives, already on the counter at f0 — it fills
              the empty lower-left AND sets up the comparison S1 makes */}
          <Stack x={168} base={744} n={3} s={0.86} z={70} label="800,000"
            sub="ONE FREE TIER" seed={2} />
          <Flash lf={lf} at={12} />
        </div>
      </Scene>
    );
  }

  /* ---- B · EXTREME CLOSE · the digits, rolling ------------------------- */
  if (shot === 1) {
    const cnt = E(lf, 0, 26, M * 0.42, M, OUT);
    return (
      <Scene p={p} slug="800,000,000  ·  A MONTH" push={[22, 56, 1.05]} vig={0.42}>
        <Room p={p} f={f} counter={false} />
        <div style={{ position: "absolute", left: 0, right: 0, top: 470, bottom: 0,
          background: `linear-gradient(184deg, ${p.floor} 0%, ${p.floor2} 100%)`,
          zIndex: 12 }} />
        <Counter x={W / 2} y={286} v={cnt} s={1.02} z={96} />
        <Fall x={W / 2} y={-30} len={280} f={f} n={7} s={0.8} z={40} spread={760} on={1} />
        <Flash lf={lf} at={0} n={2} o={0.22} />
      </Scene>
    );
  }

  /* ---- C · WHOSE TOKENS, and the receipt ------------------------------- */
  if (shot === 2) {
    const set = E(lf, 0, 12, 0, 1, OUT);
    return (
      <Scene p={pb} slug="ONE REPO  ·  MIT" push={[56, 82, 1.055]} vig={0.44}>
        <Room p={pb} f={f} />
        <Token x={330} y={318} s={330} z={60} markKey={P[0].k} name={P[0].n} hasMark
          rot={-7} />
        <Token x={678} y={386} s={214} z={58} markKey={P[1].k} name={P[1].n} hasMark
          rot={9} />
        <Cam z={88} y={(1 - set) * 24} o={set}>
          <MakerPlate x={W / 2 - 176} y={556} s={1.3} z={90} />
        </Cam>
        <Flash lf={lf} at={0} n={2} o={0.2} />
      </Scene>
    );
  }

  /* ---- D · THE PILE, and it is still going ---------------------------- */
  const grow = E(lf, 0, 24, 0.5, 1, OUT);
  return (
    <Scene p={p} slug="AND IT KEEPS COUNTING" push={[82, 110, 1.05]} vig={0.4}>
      <Room p={p} f={f} />
      <Fall x={W / 2 - 40} y={-30} len={HZ + 40} f={f} n={10} s={1.1} z={40}
        spread={330} on={1} />
      <Pile x={W / 2 - 40} base={HZ + 150} n={Math.round(grow * 86)} s={1.16} z={50}
        w={620} seed={9} logos={[3, 9, 17, 26, 38, 51]} />
      <Counter x={W / 2} y={176} v={M} s={0.62} z={96} label="" />
      <Flash lf={lf} at={0} n={2} o={0.24} />
    </Scene>
  );
};

/* ================================================================== S1 ====
   3.67 -> 5.93s · 68f · THE SCALE.  "Not 800,000, but 800 million."

   ⛔ TRUE SCALE, NOT A DIAGRAM. Both piles are the same tokens at the same
      size; only the COUNT differs, so the comparison does arithmetic on screen
      rather than asserting it. This is the reel's ONE camera move and it is
      motivated: the frame has to grow to hold what is beside it.
   ========================================================================= */
export const S1: React.FC = () => {
  const f = useCurrentFrame();
  const p = usePlace("hall");
  const CUT = [0, 30];
  const shot = CUT.filter((c) => f >= c).length - 1;
  const lf = f - CUT[shot];
  const HZ = p.horizon;

  if (shot === 0) {
    return (
      <Scene p={p} slug="WHAT ONE FREE TIER GIVES" push={[0, 30, 1.05]} vig={0.44}>
        <Room p={p} f={f} />
        <Stack x={W / 2} base={HZ + 168} n={4} s={1.5} z={60} label="800,000"
          sub="ONE FREE TIER, ONE MONTH" seed={2} />
        <Counter x={W / 2} y={186} v={800000} s={0.62} z={96} label="" />
      </Scene>
    );
  }

  const pull = E(lf, 2, 26, 1.34, 1.0, IO);
  const grow = E(lf, 4, 26, 0, 1, OUT);
  const sk = shake(lf, 22, 10, 10);
  return (
    <Scene p={p} slug="WHAT THIS REPO GIVES" push={[30, 68, 1.02]} vig={0.4}>
      <div style={{ position: "absolute", inset: 0, zIndex: 1,
        transform: `translate(${sk.x}px, ${sk.y}px) scale(${pull})`,
        transformOrigin: "16% 64%" }}>
        <Room p={p} f={f} />
        <Stack x={122} base={HZ + 168} n={4} s={0.72} z={60} label="800,000" seed={2} />
        <Pile x={636} base={HZ + 168} n={Math.round(grow * 150)} s={1.0} z={50}
          w={700} seed={4} logos={[6, 14, 27, 41, 63, 88]} />
        <Counter x={636} y={186} v={grow * M} s={0.66} z={96} />
        <Flash lf={lf} at={22} n={3} o={0.26} />
      </div>
    </Scene>
  );
};

/* ================================================================== S2 ====
   5.93 -> 8.37s · 73f · WHOSE TOKENS THEY ARE.
   "GPT-5, Claude, Gemini, Llama, all for free."

   ⛔⛔ NO OPENAI / GPT MARK APPEARS IN THIS REEL. OpenAI is NOT a provider in
      this repo's README and GPT-5 is not obtainable through it. Captions carry
      what was said; the PICTURE never makes the claim. Only providers really in
      the README are struck, the four with no public mark get their NAME struck
      instead of an invented glyph, and CLAUDE appears as the CLIENT.
   ⛔ THE MARKS ARE 252px AND 152px HERE — this is the scene "logos need to be
      bigger" was really about, and a token face is what makes that possible.
   ========================================================================= */
export const S2: React.FC = () => {
  const f = useCurrentFrame();
  const p = usePlace("bench");
  const CUT = [0, 38];
  const shot = CUT.filter((c) => f >= c).length - 1;
  const lf = f - CUT[shot];

  if (shot === 0) {
    const T = [{ x: 212, i: 0, at: 1 }, { x: 508, i: 1, at: 7 }, { x: 806, i: 3, at: 13 }];
    return (
      <Scene p={p} slug="REAL PROVIDERS  ·  FREE TIERS" push={[0, 38, 1.05]} vig={0.42}>
        <Room p={p} f={f} />
        {T.map((t, k) => {
          const on = E(lf, t.at, t.at + 8, 0, 1, BACK);
          if (on <= 0.02) return null;
          /* ⛔ A FADE IS NOT AN EVENT. v1 cross-faded three tokens in and the
             scene measured 4.98 against a 4.0 bar — technically passing, and
             the flattest thing in the reel. Each one now DROPS in, squashes on
             contact and kicks a two-frame ring, so three arrivals read as three
             events and the scene has a rhythm. */
          const land = Math.max(0, 1 - Math.abs(lf - (t.at + 8)) / 5);
          return (
            <div key={"tk" + k} style={{ position: "absolute", inset: 0, zIndex: 50 + k,
              opacity: Math.min(1, on * 1.6),
              transform: `translateY(${(1 - on) * -230}px) scale(${(0.72 + on * 0.28) * (1 + land * 0.06)}, ${(0.72 + on * 0.28) * (1 - land * 0.10)})`,
              transformOrigin: `${t.x}px 476px` }}>
              <Token x={t.x} y={350} s={252} z={50 + k} markKey={P[t.i].k}
                name={P[t.i].n} hasMark={P[t.i].mark} rot={-8 + k * 8} />
            </div>
          );
        })}
        {/* the impact rings, on the frame each one actually lands */}
        {T.map((t, k) => {
          const land = (lf - (t.at + 8)) / 7;
          if (land < 0 || land > 1) return null;
          return <div key={"rg" + k} style={{ position: "absolute",
            left: t.x - 150 * land - 60, top: 462 - 22 * land,
            width: 300 * land + 120, height: 44 * land + 18, borderRadius: "50%",
            border: `4px solid ${TOKL}`, opacity: (1 - land) * 0.6, zIndex: 48,
            boxSizing: "border-box" }} />;
        })}
        <Chip t="EVERY ONE OF THESE HAS A FREE TIER" y={600} z={98} c="#241F19" />
        <Motes x={506} y={200} w={700} h={280} n={11} f={f} z={80} />
      </Scene>
    );
  }

  const rise = E(lf, 4, 16, 0, 1, OUT);
  return (
    <Scene p={p} slug="29 PROVIDERS  ·  ONE CLIENT" push={[38, 73, 1.05]} vig={0.46}>
      <Room p={p} f={f} />
      {/* they assemble one at a time, back row first — nine arrivals across the
          shot instead of one block appearing */}
      {[0, 1, 2, 3, 4].map((i, k) => {
        const on = E(lf, k * 2, k * 2 + 7, 0, 1, BACK);
        if (on <= 0.02) return null;
        return <Token key={"r1" + k} x={122 + k * 192} y={228 - (1 - on) * 70}
          s={152 * (0.78 + on * 0.22)} z={50 + k} markKey={P[i].k} name={P[i].n}
          hasMark={P[i].mark} rot={(k % 2 ? 6 : -6) + (1 - on) * 30} />;
      })}
      {[5, 6, 7, 8].map((i, k) => {
        const on = E(lf, 10 + k * 2, 17 + k * 2, 0, 1, BACK);
        if (on <= 0.02) return null;
        return <Token key={"r2" + k} x={168 + k * 192} y={396 - (1 - on) * 70}
          s={152 * (0.78 + on * 0.22)} z={56 + k} markKey={P[i].k} name={P[i].n}
          hasMark={P[i].mark} rot={(k % 2 ? -5 : 7) + (1 - on) * -30} />;
      })}
      <Cam z={90} o={rise} y={(1 - rise) * 18}>
        <Plate x={830} y={356} t="+19 MORE" sub="29 TOTAL" w={176} s={1.1} z={92} />
      </Cam>
      {/* the Claude token: the CLIENT that spends them, which is what
          `/v1/messages` support actually means */}
      <Token x={W / 2} y={572} s={150} z={70} claude />
      <div style={{ position: "absolute", left: 0, right: 0, top: 656, textAlign: "center",
        zIndex: 96, fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 30,
        letterSpacing: "0.04em", color: "#3A3226" }}>CLAUDE CODE SPENDS THEM</div>
      <Edge side="l" c={dkh(p.back2, 0.34)} kind="post" z={94} />
    </Scene>
  );
};

/* ================================================================== S3 ====
   8.37 -> 12.03s · 110f · THE VILLAIN.
   "Most developers are paying hundreds of dollars a month just to access one
    of these tools."

   ⛔ THE ONLY COLD SCENE IN THE REEL, and the only one with rain. The villain
      gets a palette nothing else shares, so the S4 cut back to warm IS the
      relief beat with no words spent. It is never argued with — the price
      ratchets three times and you still get one provider — only abandoned.
   ========================================================================= */
export const S3: React.FC = () => {
  const f = useCurrentFrame();
  const p = usePlace("cash");
  const CUT = [0, 40, 78];
  const shot = CUT.filter((c) => f >= c).length - 1;
  const lf = f - CUT[shot];

  const RAISE = [4, 26, 48];
  const n = RAISE.filter((d) => f >= d).length;
  const PRICE = ["$20", "$60", "$140", "$300"];

  if (shot === 0) {
    return (
      <Scene p={p} slug="PAY PER PROVIDER" push={[0, 40, 1.05]} vig={0.58}>
        <Room p={p} f={f} panel={false} />
        <Machine x={506} base={678} s={1.06} z={40} f={f} price={PRICE[Math.min(3, n)]}
          markKey={P[0].k} name={P[0].n} hasMark out={n > 0 ? 1 : 0} />
        <Rain f={f} n={40} z={90} />
        <Edge side="l" c="#232A30" kind="post" z={92} />
        <Flash lf={f} at={RAISE[0]} n={2} o={0.14} />
      </Scene>
    );
  }

  if (shot === 1) {
    return (
      <Scene p={p} slug="AND STILL  ·  ONE OF THEM" push={[40, 78, 1.06]} vig={0.6}>
        <Room p={p} f={f} panel={false} />
        <div style={{ position: "absolute", left: 118, top: 148, width: 776, height: 232,
          borderRadius: 12, background: "#241F19", border: "8px solid #7E8890", zIndex: 40,
          boxShadow: SH_D, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontFamily: MONO, fontWeight: 900, fontSize: 150,
            letterSpacing: "-0.03em", color: "#E8DCBA" }}>{PRICE[Math.min(3, n)]}</span>
        </div>
        <Chip t="PER MONTH" y={406} z={98} c="#2A343B" />
        {/* one token, for all that money */}
        <Token x={506} y={558} s={172} z={60} markKey={P[0].k} name={P[0].n} hasMark />
        <div style={{ position: "absolute", left: 0, right: 0, top: 656, textAlign: "center",
          zIndex: 96, fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 29,
          letterSpacing: "0.06em", color: "#C3CBD1" }}>ONE PROVIDER</div>
        <Rain f={f} n={38} z={90} />
        <Edge side="r" c="#232A30" kind="wall" z={92} />
      </Scene>
    );
  }

  const step = E(lf, 6, 20, 0, 1, IO);
  return (
    <Scene p={p} slug="AND THE QUEUE  ·  DOES NOT END" push={[78, 110, 1.05]} vig={0.62}>
      <Room p={p} f={f} panel={false} />
      <Machine x={824} base={668} s={0.8} z={40} f={f} price="$300" markKey={P[0].k}
        name={P[0].n} hasMark out={1} />
      {[600, 462, 344, 246, 172].map((x, i) => {
        const kk = E(lf, 6 + i * 3, 20 + i * 3, 0, 1, IO);
        const bob = Math.abs(Math.sin(kk * Math.PI)) * 9 * (0.94 - i * 0.13);
        return (
          <Waiting key={"wt" + i} x={x + kk * (i === 0 ? 74 : 118)}
            base={668 - i * 22 - bob} s={0.94 - i * 0.13} z={38 - i}
            c={dkh("#2E373E", i * 0.06)} />
        );
      })}
      <Rain f={f} n={46} z={90} />
      <Edge side="l" c="#1E242A" kind="post" z={92} />
    </Scene>
  );
};

/* ================================================================== S4 ====
   12.03 -> 16.50s · 134f · THE TURN.
   "This repo routes your requests across the free tiers of every major AI
    company simultaneously."

   ⛔ 4 BILLION IS THE REPO'S OWN FIGURE. The VO says 800 million, which
      understates it 5x, so the receipt over-delivers and never contradicts.
   ========================================================================= */
export const S4: React.FC = () => {
  const f = useCurrentFrame();
  const p = usePlace("count");
  const CUT = [0, 26, 70];
  const shot = CUT.filter((c) => f >= c).length - 1;
  const lf = f - CUT[shot];
  const HZ = p.horizon;

  if (shot === 0) {
    const on = E(lf, 2, 16, 0, 1, OUT);
    return (
      <Scene p={p} slug="ALL OF THEM  ·  AT ONCE" push={[0, 26, 1.05]} vig={0.4}>
        <Room p={p} f={f} />
        {[[188, 0], [506, 1], [824, 3]].map(([x, i], k) => (
          <React.Fragment key={"c4" + k}>
            <Chute x={x as number} y={134} w={224} z={30 + k} f={f}
              markKey={P[i as number].k} name={P[i as number].n}
              hasMark={P[i as number].mark} open={on} />
            <Fall x={x as number} y={330} len={HZ - 260} f={f + k * 11} n={6} s={0.9}
              z={60 + k} spread={70} on={on} />
          </React.Fragment>
        ))}
        <Pile x={506} base={HZ + 110} n={Math.round(on * 40)} s={1.0} z={50} w={640}
          seed={6} logos={[2, 11, 19, 30]} />
        <Flash lf={lf} at={0} n={2} o={0.2} />
      </Scene>
    );
  }

  if (shot === 1) {
    const on = E(lf, 0, 16, 0, 1, OUT);
    const cnt = E(lf, 2, 30, M, 4000000000, OUT);
    const sk = shake(lf, 2, 15, 14);
    return (
      <Scene p={p} slug="RATED  ·  4 BILLION / MONTH" push={[26, 70, 1.05]} vig={0.36}>
        <div style={{ position: "absolute", inset: 0, zIndex: 1,
          transform: `translate(${sk.x}px, ${sk.y}px)` }}>
          <Room p={p} f={f} />
          {[0, 1, 2, 3, 4, 5].map((k) => {
            const x = 96 + k * 164;
            return (
              <React.Fragment key={"c5" + k}>
                <Chute x={x} y={128} w={150} z={30 + k} f={f} markKey={P[k].k}
                  name={P[k].n} hasMark={P[k].mark} open={on} />
                <Fall x={x} y={258} len={170} f={f + k * 9} n={4} s={0.7} z={60 + k}
                  spread={44} on={on} />
              </React.Fragment>
            );
          })}
          <Counter x={W / 2} y={438} v={cnt} s={0.66} z={96} label="TOKENS / MONTH"
            digits={10} />
          <Chip t="29 PROVIDERS  ·  358 ENDPOINTS" y={614} z={98} c="#241F19" />
          <Flash lf={lf} at={2} n={3} o={0.28} />
        </div>
      </Scene>
    );
  }

  /* ---- C · ONE OUTPUT. Everything lands in one place. ------------------ */
  const on = E(lf, 2, 26, 0, 1, OUT);
  return (
    <Scene p={p} slug="ONE  /v1  ENDPOINT" push={[70, 134, 1.05]} vig={0.38}>
      <Room p={p} f={f} />
      {[0, 1, 2, 3, 4].map((k) => (
        <Chute key={"c6" + k} x={150 + k * 202} y={126} w={130} z={30 + k} f={f}
          markKey={P[k].k} name={P[k].n} hasMark={P[k].mark} open={1} />
      ))}
      {/* they converge: five falls angled toward one mouth */}
      {[0, 1, 2, 3, 4].map((k) => (
        <div key={"cv" + k} style={{ position: "absolute", inset: 0, zIndex: 60 + k,
          transform: `rotate(${(k - 2) * 7}deg)`, transformOrigin: "50% 100%" }}>
          <Fall x={W / 2} y={240} len={230} f={f + k * 13} n={4} s={0.78} z={60}
            spread={40} on={on} />
        </div>
      ))}
      <div style={{ position: "absolute", left: W / 2 - 178, top: 446, width: 356,
        height: 46, borderRadius: 9, background: BRASS, zIndex: 78, boxShadow: SH_D }} />
      <Token x={W / 2} y={548} s={162} z={80} claude />
      <div style={{ position: "absolute", left: 0, right: 0, top: 640, textAlign: "center",
        zIndex: 96, fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 31,
        letterSpacing: "0.04em", color: "#3A3226" }}>ONE KEY, ONE ENDPOINT</div>
    </Scene>
  );
};

/* ================================================================== S5 ====
   16.50 -> 19.00s · 75f · THE MECHANISM.
   "Hit one model's rate limit, it automatically jumps to the next."

   ⛔ THE CLAIM IS THAT NOTHING STOPS, so the thing to animate is the FALL not
      breaking: one chute jams, a red 429 drops on it, the next gate snaps open
      eight frames later, and the counter behind never pauses.
   ⛔ IT HAPPENS TWICE — the second time unprompted — so it reads as a loop
      rather than a one-off trick.
   ========================================================================= */
export const S5: React.FC = () => {
  const f = useCurrentFrame();
  const p = usePlace("chute");
  const CUT = [0, 44];
  const shot = CUT.filter((c) => f >= c).length - 1;
  const lf = f - CUT[shot];

  const die = E(f, 12, 18, 1, 0, OUT);
  const flag = E(f, 15, 23, 0, 1, OUT);
  const next = E(f, 24, 30, 0, 1, OUT);
  const die2 = E(f, 58, 64, 1, 0, OUT);
  const next2 = E(f, 64, 70, 0, 1, OUT);

  if (shot === 0) {
    return (
      <Scene p={p} slug="RATE LIMIT  ·  429" push={[0, 44, 1.05]} vig={0.44}>
        <Room p={p} f={f} />
        <Chute x={266} y={132} w={230} z={30} f={f} markKey={P[6].k} name={P[6].n}
          hasMark={P[6].mark} open={die} dead={flag > 0.5 ? 1 : 0} />
        <Chute x={738} y={132} w={230} z={31} f={f} markKey={P[1].k} name={P[1].n}
          hasMark open={next} />
        <Fall x={266} y={320} len={270} f={f} n={6} s={0.9} z={60} spread={70} on={die} />
        <Fall x={738} y={320} len={270} f={f} n={6} s={0.9} z={61} spread={70} on={next} />
        <Flag429 x={266} y={340} s={1.0} z={96} t={flag} />
        {/* the pile never stops growing, which is the actual claim */}
        <Pile x={506} base={p.horizon + 176} n={30 + Math.round(f * 0.5)} s={0.92} z={50}
          w={560} seed={7} logos={[4, 12, 22]} />
        <Flash lf={f} at={24} n={3} o={0.24} />
      </Scene>
    );
  }

  const set = E(lf, 4, 14, 0, 1, OUT);
  return (
    <Scene p={p} slug="NO PAUSE  ·  NO DROP" push={[44, 75, 1.05]} vig={0.4}>
      <Room p={p} f={f} />
      <Chute x={210} y={126} w={170} z={30} f={f} markKey={P[1].k} name={P[1].n}
        hasMark open={1 - die2} />
      <Chute x={506} y={126} w={170} z={31} f={f} markKey={P[3].k} name={P[3].n}
        hasMark open={next2} />
      <Chute x={802} y={126} w={170} z={32} f={f} markKey={P[4].k} name={P[4].n}
        hasMark open={0} />
      <Fall x={210} y={272} len={180} f={f} n={5} s={0.76} z={60} spread={50}
        on={1 - die2} />
      <Fall x={506} y={272} len={180} f={f + 9} n={5} s={0.76} z={61} spread={50}
        on={next2} />
      <Counter x={W / 2} y={452} v={M + Math.round(f * 41000)} s={0.58} z={96}
        label="STILL COUNTING" />
      <Cam z={98} o={set} y={(1 - set) * 14}>
        <Plate x={384} y={618} t="AUTO FAILOVER" sub="YOU NEVER SEE IT" w={244} s={1.1}
          z={98} />
      </Cam>
      <Motes x={506} y={200} w={600} h={280} n={10} f={f} z={82} />
    </Scene>
  );
};

/* ================================================================== S6 ====
   19.00 -> 20.93s · 58f · CTA.
   ⛔ THE KEYWORD IS STRUCK ON A TOKEN — the reel's own object, not a card
      floated over the picture. Brightest frame, receipt still on screen, and it
      keeps moving to the last frame (an earlier CTA finished by f12 and the
      motion audit caught the hold as a dead run).
   ========================================================================= */
export const S6Cta: React.FC = () => {
  const f = useCurrentFrame();
  const p = usePlace("count");
  const pop = E(f, 0, 10, 0, 1, BACK);
  const grow = E(f, 4, 52, 0.4, 1, LIN);
  const sk = shake(f, 0, 12, 10);
  const HZ = p.horizon;
  return (
    <Scene p={p} slug="COMMENT THE KEYWORD" push={[0, 58, 1.05]} vig={0.32}>
      <div style={{ position: "absolute", inset: 0, zIndex: 1,
        transform: `translate(${sk.x}px, ${sk.y}px)` }}>
        <Room p={p} f={f} />
        <Fall x={W / 2 + 30} y={-30} len={HZ + 30} f={f} n={9} s={1.0} z={40}
          spread={420} on={1} />
        <Pile x={W / 2 + 30} base={HZ + 168} n={Math.round(grow * 96)} s={1.1} z={50}
          w={660} seed={11} logos={[2, 9, 18, 29, 44]} />
        {/* the keyword, struck on a token */}
        <div style={{ position: "absolute", inset: 0, zIndex: 92, opacity: pop,
          transform: `scale(${0.72 + pop * 0.28}) rotate(${-6 + (1 - pop) * 10}deg)`,
          transformOrigin: "50% 34%" }}>
          <div style={{ position: "absolute", left: W / 2 - 178, top: 122, width: 356,
            height: 356, borderRadius: "50%", background: TOKD, boxShadow: SH_D }} />
          <div style={{ position: "absolute", left: W / 2 - 162, top: 138, width: 324,
            height: 324, borderRadius: "50%", background: TOK }} />
          <div style={{ position: "absolute", left: W / 2 - 128, top: 172, width: 256,
            height: 256, borderRadius: "50%", background: "#FBF8F1",
            display: "flex", flexDirection: "column", alignItems: "center",
            justifyContent: "center" }}>
            <span style={{ fontFamily: MONO, fontWeight: 800, fontSize: 23,
              letterSpacing: "0.24em", color: "#7A6A44" }}>COMMENT</span>
            <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 84,
              lineHeight: 1.02, letterSpacing: "-0.02em", color: "#241F14" }}>REPO</span>
          </div>
        </div>
        <MakerPlate x={606} y={578} s={1.0} z={94} />
        <Flash lf={f} at={0} n={4} o={0.32} />
      </div>
    </Scene>
  );
};
