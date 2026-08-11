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
  Counter, Pile, Fall, Chute, Flag429, Machine, Claude, Waiting, Stack, Cap,
  Belt, Junction, Ledger,
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

  /* ---- A · WIDE · THE RANK IS ALREADY IN FRAME 0 ----------------------- */
  if (shot === 0) {
    /* ⛔⛔ v3's FRAME 0 WAS A SEALED CHUTE AND AN ODOMETER READING ZERO, and the
       note was *"the beginning its not too clear what its about ... not really
       hierarchical."* A counter at 000,000,000 states nothing, and there was no
       rank in the frame because the only two things in it were both small.

       Reel 86 already defined the word: hierarchical does NOT mean depth tiers,
       it means A RANK — you have to see which is bigger without reading. So the
       comparison is now the OPENING image, not the reveal: a Claude sprite for
       scale, a 4-token stack at his feet, and a mountain of tokens filling the
       right of frame with 200px provider logos on its face. Small / person /
       enormous, readable in a glance, before a word is spoken. */
    const surge = E(lf, 12, 24, 0, 1, OUT);
    /* ⛔ FRAME 0 READS THE WHOLE CLAIM. v1 of this shot opened mid-count on
       496,000,000, which is not a settled state and not a number anybody can
       use. It reads 800,000,000 at f0 and keeps CLIMBING past it as the fresh
       avalanche lands. */
    const cnt = M + E(lf, 12, 26, 0, 14200000, OUT);
    const sk = shake(lf, 12, 16, 14);
    return (
      <Scene p={p} slug="FREE AI TOKENS  ·  EVERY MONTH" push={[0, 22, 1.045]}
        vig={0.32}>
        <div style={{ position: "absolute", inset: 0, zIndex: 1,
          transform: `translate(${sk.x}px, ${sk.y}px)` }}>
          <Room p={p} f={f} />
          <Counter x={606} y={150} v={cnt} s={0.76} z={96} />
          {/* the mountain — settled and complete at f0, surging at f12 */}
          <Fall x={690} y={-30} len={470} f={f} n={12} s={1.2} z={64} spread={360}
            on={0.35 + surge * 0.65} />
          <Pile x={690} base={762} n={Math.round(150 + surge * 70)} s={1.1} z={70}
            w={540} seed={5} />
          {/* ⛔ THE LOGOS ARE THE POINT AND THEY ARE 200px. They sit ON the face
              of the mound, so they are big, they belong to the pile, and they
              say "AI" in the first frame. */}
          <Token x={548} y={588} s={198} z={92} markKey={P[0].k} name={P[0].n}
            hasMark rot={-9} />
          <Token x={742} y={452} s={210} z={93} markKey={P[1].k} name={P[1].n}
            hasMark rot={6} />
          <Token x={918} y={606} s={190} z={92} markKey={P[3].k} name={P[3].n}
            hasMark rot={12} />
          {/* the Claude sprite: the scale reference, and the one who reacts */}
          <Claude x={132} base={756} s={0.92} z={80} f={f} gaze={0.75}
            shock={surge * 0.7} />
          <Stack x={392} base={756} n={4} s={0.78} z={74} label="800,000"
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
        <Counter x={W / 2} y={272} v={cnt} s={1.02} z={96} />
        <Fall x={W / 2} y={-30} len={280} f={f} n={7} s={0.8} z={40} spread={760} on={1} />
        {/* he is watching the number, which is what tells you to watch it too */}
        {/* a BELT, not another heap — the second pile in ninety frames was the
            start of the "just coins piling" problem */}
        <Belt y={604} f={f} z={50} s={1.0} speed={4.2} n={7} from={2} />
        <Claude x={168} base={792} s={1.0} z={80} f={f} gaze={0.9} cheer={0.25} />
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
        <Token x={690} y={286} s={332} z={58} markKey={P[1].k} name={P[1].n} hasMark
          rot={9} />
        <Claude x={278} base={720} s={1.24} z={80} f={f} gaze={0.5} cheer={0.4}
          hold={276} holdKey={P[0].k} holdName={P[0].n} holdMark />
        <Cam z={88} y={(1 - set) * 24} o={set}>
          <MakerPlate x={560} y={584} s={1.16} z={90} />
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
      {/* ⛔ NO PILE IN THIS SHOT. Two belts running opposite ways give the frame
          a direction a heap cannot have, and every token on them carries a mark
          — so the shot is busier AND says more. */}
      <Belt y={318} f={f} z={40} s={1.05} speed={3.6} n={6} from={0} />
      <Belt y={528} f={f} z={44} s={1.05} speed={-2.9} n={6} from={4} />
      <Claude x={152} base={784} s={1.0} z={80} f={f} gaze={0.8} cheer={0.7}
        hold={168} holdKey={P[2].k} holdName={P[2].n} holdMark />
      <Counter x={W / 2 + 120} y={686} v={M} s={0.52} z={96} label="" />
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
        <Stack x={W / 2 + 150} base={HZ + 168} n={4} s={1.5} z={60} label="800,000"
          sub="ONE FREE TIER, ONE MONTH" seed={2} />
        {/* ⛔ THE SPRITE IS THE RULER. Two piles only rank against each other if
            something in frame has a known size, and he is it — the same sprite
            at the same scale stands beside both. */}
        <Claude x={272} base={HZ + 170} s={1.0} z={80} f={f} gaze={0.6} stern={1} />
        <Counter x={W / 2} y={182} v={800000} s={0.62} z={96} label="" />
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
        <Stack x={140} base={HZ + 168} n={4} s={0.72} z={60} label="800,000" seed={2} />
        <Claude x={250} base={HZ + 170} s={0.48} z={80} f={f} gaze={0.9}
          shock={E(lf, 20, 28, 0, 1, OUT) * 0.8} />
        <Pile x={660} base={HZ + 168} n={Math.round(grow * 150)} s={1.0} z={50}
          w={700} seed={4} />
        <Token x={520} y={HZ + 66} s={172} z={92} markKey={P[0].k} name={P[0].n}
          hasMark rot={-10} />
        <Token x={772} y={HZ + 28} s={172} z={93} markKey={P[3].k} name={P[3].n}
          hasMark rot={8} />
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
              transformOrigin: `${t.x}px 500px` }}>
              <Token x={t.x} y={330} s={306} z={50 + k} markKey={P[t.i].k}
                name={P[t.i].n} hasMark={P[t.i].mark} rot={-8 + k * 8} />
            </div>
          );
        })}
        {/* the impact rings, on the frame each one actually lands */}
        {T.map((t, k) => {
          const land = (lf - (t.at + 8)) / 7;
          if (land < 0 || land > 1) return null;
          return <div key={"rg" + k} style={{ position: "absolute",
            left: t.x - 150 * land - 60, top: 496 - 22 * land,
            width: 300 * land + 120, height: 44 * land + 18, borderRadius: "50%",
            border: `4px solid ${TOKL}`, opacity: (1 - land) * 0.6, zIndex: 48,
            boxSizing: "border-box" }} />;
        })}
        <Claude x={128} base={772} s={0.78} z={82} f={f} gaze={0.8} cheer={0.5} />
        <Chip t="EVERY ONE HAS A FREE TIER" y={634} x={276} z={98} c="#241F19" />
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
        return <Token key={"r1" + k} x={152 + k * 186} y={218 - (1 - on) * 70}
          s={184 * (0.78 + on * 0.22)} z={50 + k} markKey={P[i].k} name={P[i].n}
          hasMark={P[i].mark} rot={(k % 2 ? 6 : -6) + (1 - on) * 30} />;
      })}
      {[5, 6, 7, 8].map((i, k) => {
        const on = E(lf, 10 + k * 2, 17 + k * 2, 0, 1, BACK);
        if (on <= 0.02) return null;
        return <Token key={"r2" + k} x={245 + k * 186} y={398 - (1 - on) * 70}
          s={184 * (0.78 + on * 0.22)} z={56 + k} markKey={P[i].k} name={P[i].n}
          hasMark={P[i].mark} rot={(k % 2 ? -5 : 7) + (1 - on) * -30} />;
      })}
      <Cam z={90} o={rise} y={(1 - rise) * 18}>
        <Plate x={806} y={512} t="+19 MORE" sub="29 TOTAL" w={186} s={1.12} z={92} />
      </Cam>
      {/* the Claude token: the CLIENT that spends them, which is what
          `/v1/messages` support actually means */}
      <Claude x={196} base={764} s={0.90} z={82} f={f} gaze={0.5} cheer={0.55}
        hold={186} holdClaude />
      {/* ⛔ NO EDGE OCCLUDER ON THIS SHOT — it was cropping the first logo, and a
          scene whose whole job is "the logos are big" cannot afford to eat one. */}
      <div style={{ position: "absolute", left: 384, right: 20, top: 690, textAlign: "left",
        zIndex: 96, fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 32,
        letterSpacing: "0.03em", color: "#3A3226" }}>CLAUDE CODE SPENDS THEM</div>
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
        <Machine x={638} base={678} s={1.06} z={40} f={f} price={PRICE[Math.min(3, n)]}
          markKey={P[0].k} name={P[0].n} hasMark out={n > 0 ? 1 : 0} />
        <Claude x={214} base={676} s={0.98} z={80} f={f} gaze={0.8} stern={1} />
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
        <Token x={636} y={566} s={206} z={60} markKey={P[0].k} name={P[0].n} hasMark />
        <Claude x={252} base={716} s={0.86} z={80} f={f} gaze={0.7} stern={1} />
        <div style={{ position: "absolute", left: 420, right: 0, top: 690, textAlign: "left",
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
        {/* ⛔ A JUNCTION, NOT A HEAP. "routes your requests across every
            provider" is a CONVERGENCE, and five labelled lines running into one
            header is a shape you can trace with a finger. A pile can only ever
            say "a lot". */}
        <Junction x={W / 2} y={470} f={f} n={5} z={30} s={1.0} w={760} on={on} />
        <Claude x={W / 2 - 30} base={784} s={0.94} z={82} f={f} gaze={0.4}
          cheer={on * 0.8} hold={158} holdClaude />
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
      {/* ⛔ A LIST, NOT A HEAP. This is the beat that has to carry 29 items AND
          their arithmetic, and a printed roll is the only shape that does both:
          names, amounts, a rule, a total. It is also the most literal object in
          the reel — nothing on it needs translating. */}
      <Ledger x={W / 2 + 34} y={140} f={f} rows={5} s={0.90} z={60}
        reveal={E(lf, 2, 40, 0, 1, OUT)} />
      <Claude x={116} base={776} s={0.82} z={82} f={f} gaze={0.7} cheer={on * 0.7} />
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
        {/* ⛔ THE BELT NEVER STOPS, and that IS the claim. A growing pile only
            says "more"; a belt that keeps running while the feed above it swaps
            says "the switch cost you nothing", which is the actual sentence. */}
        <Belt y={624} f={f} z={50} s={1.0} speed={3.8} n={7} from={1} />
        <Claude x={116} base={792} s={0.80} z={82} f={f} gaze={0.9}
          shock={E(f, 24, 32, 0, 1, OUT) * 0.6} />
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
        <Belt y={556} f={f} z={40} s={1.0} speed={3.2} n={7} from={3} />
        <Claude x={150} base={780} s={0.96} z={82} f={f} gaze={0.4} cheer={0.85} />
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
