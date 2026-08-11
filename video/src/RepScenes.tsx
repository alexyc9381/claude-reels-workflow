import React from "react";
import { useCurrentFrame } from "remotion";
import { inter, fraunces } from "./fonts";
import { MONO } from "./SlopKit";
import {
  W, H, SAFE, E, OUT, IO, BACK, IN_Q, LIN, hexa, mxh, dkh, SH, SH_D, rnd,
  CLAY, GOLD, GREEN, RED, PAPER, INK, CANVAS, CANVAS2, ROPE, POST_R, POST_B,
  BRASS, BRASSD, BRASSL, CROWD,
  Arena, Ring, Rain, Scene, Cam, Beam, Strip, Motes, Chip, Plate, BigNum, Contact,
  Edge, Mark, MarkPlate, MarkCast, Banner, Hoarding, MakerPlate, Stencil, PROVIDERS, usePlace,
} from "./RepWorld";
import {
  NameBoard, Fighter, Tag, RoundBoard, Roster, Booth, Waiting, Towel429, Belt,
  Mic, Poster,
} from "./RepProps";

/* ===========================================================================
   REEL 99 "REPO" · THE BODY. Board: storyboards/99-repo.md.

   ⛔⛔ THE NOTE THAT REBUILT THIS REEL: *"each of the scenes dont really make
      sense in relation back to the main topic like its just water animations
      not really about claude or ai... ppl will just get bored and scroll away"*
      and *"logos need to be bigger and especially hook scene needs to be
      clearer we are talking about claude and stuff."*

      So the contract every scene below is held to, and it is checkable:
        1. a REAL provider mark at >= 96px, or the Claude mark, is on screen;
        2. a REAL product noun or number is on screen (429, /v1, MIT, 18,265★,
           29 PROVIDERS, 358 ENDPOINTS);
        3. the Claude mark is painted on the ring canvas at 260px in every ring
           scene, so the subject is legible before any decoding happens.

   ⛔ EVERY EVENT FRAME IS A MEASURED WORD ONSET from src/data/words_repo.json,
      converted to LOCAL Sequence frames, PICTURE LEADING THE ONSET BY 4 FRAMES.
      root onsets: Someone 0 · Not 114 · GPT-5 182 · Most 255 · This 365 ·
                   Hit 499 · Comment 574     (lead-4: 0/110/178/251/361/495/570)

   ⛔⛔ THE `push` RANGE IS SCENE-LOCAL, NOT SHOT-LOCAL. `Scene` reads
      useCurrentFrame(), which restarts per SEQUENCE and not per hard cut, so a
      second shot given `push={[0, n, …]}` sits on a frozen camera for its whole
      duration. Every range starts on ITS OWN CUT.

   ⛔ THE MOVE BUDGET IS ONE. Only S4c re-frames. Everything else is LOCKED.
   ⛔ ANY TRANSFORMED WRAPPER NEEDS AN EXPLICIT zIndex.
   ========================================================================= */

/** a decaying camera shake — the only thing that moves EVERY pixel. */
const shake = (lf: number, at: number, amp = 14, n = 12) => {
  if (lf < at || lf > at + n) return { x: 0, y: 0 };
  const k = 1 - (lf - at) / n;
  const d = k * k * amp;
  return { x: Math.sin(lf * 2.7) * d, y: Math.cos(lf * 3.4) * d * 0.7 };
};

/** an impact flash — three frames, paper-white, never a colour. */
const Flash: React.FC<{ lf: number; at: number; n?: number; o?: number }> =
  ({ lf, at, n = 3, o = 0.34 }) => {
  if (lf < at || lf >= at + n) return null;
  return <div style={{ position: "absolute", inset: 0, zIndex: 120, pointerEvents: "none",
    background: "#F6F0E2", opacity: (1 - (lf - at) / n) * o }} />;
};

/* the corner, in a fixed order so a fighter keeps his identity across cuts */
const P = PROVIDERS;

/* ================================================================== S0 ====
   0.00 -> 3.67s · 110f · HOOK · FOUR HARD CUTS, camera locked in each.

   RITUAL: a tag-team title fight, whose whole cultural purpose is one fighter
   relieving another — which IS failover, so nothing has to be decoded.
   HIERARCHY: the corner's roster, and the totaliser over the ring.
   THE MOMENT FRAME 0 IS FROZEN ON: two gloves an inch apart, mid-tag.

   ⛔ FRAME 0 IS SETTLED AND BRIGHT. The lit canvas fills the lower third at full
      value and nothing that must read has an entrance. The Claude mark is
      PAINTED ON THE MAT at 260px, so the first thing the eye lands on says who
      this is for — that is the fix for "the hook needs to be clearer we are
      talking about claude", and it costs no badge and no decode.
   ========================================================================= */
export const S0Hook: React.FC = () => {
  const f = useCurrentFrame();
  const p = usePlace("ring");
  const CUT = [0, 22, 56, 82];
  const shot = CUT.filter((c) => f >= c).length - 1;
  const lf = f - CUT[shot];
  const CANV = p.horizon + 4;

  /* ---- A · WIDE · THE RING. The tag lands at f12. ---------------------- */
  if (shot === 0) {
    const t = E(lf, 12, 18, 0, 1, OUT);
    const sk = shake(lf, 12, 15, 13);
    const surge = E(lf, 13, 24, 0, 1, OUT);
    /* ⛔ NO SLUG ON THIS SHOT. The slug prints centred at y=750 and the ring
       skirt is the only place the CLAUDE CODE lockup can live, so the two were
       overprinting. The lockup wins: it is this frame's answer to "make it
       clearer we are talking about claude". */
    return (
      <Scene p={p} slug="" push={[0, 22, 1.045]} vig={0.34}>
        <div style={{ position: "absolute", inset: 0, zIndex: 1,
          transform: `translate(${sk.x}px, ${sk.y}px)` }}>
          <Arena p={p} f={f} rows={3} lights={4} />
          {/* ⛔ ONE BIG BANNER, NOT TWO SMALL ONES. Two 186px banners plus the
              hoarding stacked three rows of marks into the top third and each
              one clipped the next. The hoarding already carries five; this
              carries the SIXTH at 200px, which is the size the note asked for. */}
          <Banner x={296} y={112} w={190} z={26} markKey={P[0].k} name={P[0].n}
            hasMark f={f} />
          <Hoarding y={CANV - 96} z={16} n={4} from={0} />
          <Ring p={p} f={f} z={30} mark={330} markX={W / 2} markY={CANV + 236} />
          {/* the corner, behind the far ropes, surging on the tag */}
          {[[176, 6], [268, 3], [896, 4]].map(([x, i], k) => (
            <Fighter key={"cf" + k} x={x as number} base={CANV + 52 - surge * 8}
              s={0.46} z={40 + k} f={f + k * 9} cheer={surge} board={false} />
          ))}
          {/* ⛔ THE MOMENT IS TWO ARMS MEETING, AND BOTH ARMS ARE DRAWN. Claude
              reaches right, the fresh man reaches left, and at f0 there is a
              visible GAP between the gloves — the baseline the f12 slam breaks. */}
          <Fighter x={286} base={CANV + 250} s={1.0} z={70} f={f}
            tint={CLAY} robe="#B8543A" board={false} gaze={0.7}
            reach={92 + t * 40} reachSide={1} />
          <Fighter x={790} base={CANV + 250} s={1.0} z={68} f={f + 13}
            markKey={P[1].k} name={P[1].n} hasMark board
            reach={92 + t * 40} reachSide={-1} cheer={t * 0.7} />
          {/* the contact burst, on the frame the gloves actually touch */}
          {t > 0.9 && Array.from({ length: 9 }, (_, i) => (
            <div key={"bz" + i} style={{ position: "absolute", left: 534, top: CANV + 122,
              width: 11, height: 74, borderRadius: 6, background: "#F6EBD2", zIndex: 90,
              transformOrigin: "50% 0%",
              transform: `rotate(${i * 40}deg) translateY(40px)` }} />
          ))}
          {/* ⛔⛔ THE CLAUDE MARKS ARE PART OF THE WORLD, NOT PASTED ON IT. v1 put
              a white badge plate in mid-canvas and it read as a sticker. A real
              ring carries its sponsor PAINTED ON THE MAT and printed on the
              apron skirt, so both go where they belong: 340px underfoot, and a
              90px mark with the wordmark on the skirt, which is the brightest
              band at the bottom of frame. */}
          <div style={{ position: "absolute", left: 0, right: 0, top: CANV + 262,
            zIndex: 88, display: "flex", alignItems: "center", justifyContent: "center",
            gap: 13 }}>
            <div style={{ width: 46, height: 46, borderRadius: 11, background: "#FFFFFF",
              border: "3px solid #E8DCC0", display: "flex", alignItems: "center",
              justifyContent: "center", boxShadow: SH }}>
              <MarkCast x={23} y={23} s={34} z={89} />
            </div>
            <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 33,
              letterSpacing: "-0.01em", color: "#F9F0DE",
              textShadow: "0 3px 10px rgba(0,0,0,0.5)" }}>CLAUDE CODE</span>
          </div>
          <RoundBoard x={598} y={186} v="800 MILLION" sub="FREE AI TOKENS / MONTH"
            s={0.68} z={96} />
          <Flash lf={lf} at={12} />
        </div>
      </Scene>
    );
  }

  /* ---- B · EXTREME CLOSE · THE TAG, and who is on each side ------------ */
  if (shot === 1) {
    return (
      <Scene p={p} slug="THE TAG  ·  AUTOMATIC" push={[22, 56, 1.05]} vig={0.5}>
        <Arena p={p} f={f} rows={2} truss={false} dim={0.12} />
        <div style={{ position: "absolute", left: 0, right: 0, top: 300, height: 22,
          borderRadius: 11, background: ROPE, zIndex: 20, boxShadow: SH }} />
        <div style={{ position: "absolute", left: 0, right: 0, top: 620, height: 22,
          borderRadius: 11, background: ROPE, zIndex: 84, boxShadow: SH }} />
        {/* both marks at 168px, one per side of the tag */}
        <div style={{ position: "absolute", left: 96, top: 372, width: 168, height: 168,
          borderRadius: 22, background: "#FFFFFF", border: "6px solid #E8DCC0",
          boxShadow: SH_D, zIndex: 60, display: "flex", alignItems: "center",
          justifyContent: "center" }}>
          <MarkCast x={84} y={84} s={124} z={61} />
        </div>
        <Banner x={848} y={318} w={168} z={60} markKey={P[0].k} name={P[0].n}
          hasMark f={f} sway={0} />
        <Tag x={W / 2} y={470} s={1.5} z={90} t={1} f={lf} />
        <Chip t="ONE ENDPOINT, 29 CORNERS" y={666} z={98} c="#241F19" />
        <Flash lf={lf} at={0} n={2} o={0.26} />
      </Scene>
    );
  }

  /* ---- C · THE FIGHT BILL. The receipt, at poster scale. --------------- */
  if (shot === 2) {
    const set = E(lf, 0, 12, 0, 1, OUT);
    const pr = usePlace("corner");
    return (
      <Scene p={pr} slug="THE BILL  ·  freellmapi" push={[56, 82, 1.055]} vig={0.52}>
        <Arena p={pr} f={f} rows={2} truss lights={3} />
        {/* brick behind the posters so the wall is a wall */}
        <div style={{ position: "absolute", left: 0, right: 0, top: 130, height: 400,
          background: mxh(pr.back2, 0.08), zIndex: 6 }} />
        {Array.from({ length: 8 }, (_, r) => (
          <div key={"bc" + r} style={{ position: "absolute", left: 0, right: 0, top: 138 + r * 50,
            height: 3, background: dkh(pr.back2, 0.24), opacity: 0.55, zIndex: 7 }} />
        ))}
        <Poster x={214} y={168} w={224} z={30} rot={-2.5} markKey={P[1].k} name={P[1].n}
          hasMark sub="FREE TIER" />
        <Poster x={800} y={182} w={224} z={30} rot={2} markKey={P[3].k} name={P[3].n}
          hasMark sub="FREE TIER" />
        <Cam z={80} y={(1 - set) * 26} o={set}>
          <MakerPlate x={W / 2 - 172} y={470} s={1.34} z={86} />
        </Cam>
        <Mic x={506} y={92} s={0.9} z={26} f={f} />
        <Flash lf={lf} at={0} n={2} o={0.2} />
      </Scene>
    );
  }

  /* ---- D · CLOSE · the fresh corner man comes through the ropes -------- */
  const step = E(lf, 2, 16, 0, 1, OUT);
  const pc = usePlace("corner");
  return (
    <Scene p={pc} slug="NEXT MAN IN  ·  NO GAP" push={[82, 110, 1.05]} vig={0.46}>
      <Arena p={pc} f={f} rows={2} lights={3} />
      <Ring p={pc} f={f} z={30} mark={230} markY={pc.horizon + 132} near={false} />
      {/* he ducks through: the middle rope lifts, he rises */}
      <div style={{ position: "absolute", left: -60, top: 352 - step * 46, width: W + 120,
        height: 20, borderRadius: 10, background: ROPE, zIndex: 86, boxShadow: SH }} />
      <Fighter x={W / 2 + 40} base={pc.horizon + 268} s={1.16} z={70} f={f}
        markKey={P[4].k} name={P[4].n} hasMark cheer={step} board />
      <Mark x={128} y={520} s={104} z={88} />
      <Chip t="FREE TIER  ·  ROUND 1" y={684} z={98} c="#241F19" />
      <Flash lf={lf} at={0} n={2} o={0.24} />
    </Scene>
  );
};

/* ================================================================== S1 ====
   3.67 -> 5.93s · 68f · SETUP · THE SCALE.
   "Not 800,000, but 800 million."

   ⛔ THE HIERARCHY IS THE WHOLE SCENE and it is carried by HOW MANY BODIES are
      in the corner, plus the totaliser over them. One fighter alone, then the
      same frame with the corner full. Nothing has to be read.
   ========================================================================= */
export const S1: React.FC = () => {
  const f = useCurrentFrame();
  const p = usePlace("stand");
  const CUT = [0, 30];
  const shot = CUT.filter((c) => f >= c).length - 1;
  const lf = f - CUT[shot];
  const CANV = p.horizon + 4;

  /* ---- A · ONE FIGHTER, ALONE ------------------------------------------ */
  if (shot === 0) {
    return (
      <Scene p={p} slug="ONE FREE TIER  ·  ALONE" push={[0, 30, 1.05]} vig={0.5}>
        <Arena p={p} f={f} rows={3} lights={4} />
        <Ring p={p} f={f} z={30} mark={240} markY={CANV + 128} />
        <Fighter x={330} base={CANV + 214} s={0.78} z={70} f={f}
          markKey={P[6].k} name={P[6].n} hasMark={P[6].mark} gassed={0.3} board />
        <RoundBoard x={604} y={196} v="800,000" sub="ONE FREE TIER" s={0.62} z={96} />
        <Chip t="A FEW ROUNDS, THEN NOTHING" y={686} z={98} c="#241F19" />
      </Scene>
    );
  }

  /* ---- B · THE SAME CORNER, FULL. The count is the argument. ----------- */
  const fill = E(lf, 0, 20, 0, 1, OUT);
  const sk = shake(lf, 16, 11, 11);
  return (
    <Scene p={p} slug="ALL 29  ·  ONE CORNER" push={[30, 68, 1.04]} vig={0.44}>
      <div style={{ position: "absolute", inset: 0, zIndex: 1,
        transform: `translate(${sk.x}px, ${sk.y}px)` }}>
        <Arena p={p} f={f} rows={3} lights={5} />
        {/* four banners across the top, 132px marks */}
        {[[150, 0], [388, 1], [626, 3], [864, 4]].map(([x, i], k) => (
          <Banner key={"b2" + k} x={x as number} y={132} w={132} z={24}
            markKey={P[i as number].k} name={P[i as number].n}
            hasMark={P[i as number].mark} f={f} />
        ))}
        <Ring p={p} f={f} z={30} mark={240} markY={CANV + 128} />
        {/* the corner fills, back row first */}
        {[[196, 6], [304, 2], [412, 8], [610, 5], [718, 9], [826, 1]].map(([x, i], k) => {
          const on = fill * 6 > k;
          return on ? (
            <Fighter key={"f2" + k} x={x as number} base={CANV + 176 + (k % 2) * 34}
              s={0.56 + (k % 2) * 0.06} z={50 + k} f={f + k * 7}
              markKey={P[i as number].k} name={P[i as number].n}
              hasMark={P[i as number].mark} cheer={0.6} board={false} />
          ) : null;
        })}
        <RoundBoard x={342} y={368} v="800 MILLION" sub="ALL 29 POOLED" s={0.74} z={96}
          small="29 PROVIDERS" />
        <Flash lf={lf} at={16} n={3} o={0.28} />
      </div>
    </Scene>
  );
};

/* ================================================================== S2 ====
   5.93 -> 8.37s · 73f · SETUP · WHO IS IN THE CORNER.
   "GPT-5, Claude, Gemini, Llama, all for free."

   ⛔⛔ NO OPENAI / GPT MARK APPEARS IN THIS REEL. OpenAI is NOT a provider in
      this repo's README and GPT-5 is not obtainable through it. The captions
      carry what was said; the PICTURE never makes the claim. Only providers
      really in the README are drawn, the four with no public mark get a cast
      stencil rather than an invented glyph, and CLAUDE appears as the CLIENT —
      which is what `/v1/messages` support actually means.
   ⛔ THE MARKS ARE 210px HERE. This is the scene the "logos need to be bigger"
      note was really about.
   ========================================================================= */
export const S2: React.FC = () => {
  const f = useCurrentFrame();
  const p = usePlace("roster");
  const CUT = [0, 38];
  const shot = CUT.filter((c) => f >= c).length - 1;
  const lf = f - CUT[shot];

  const Wall = () => (<>
    <div style={{ position: "absolute", left: 0, right: 0, top: 104, height: 560,
      background: mxh(p.back2, 0.06), zIndex: 6 }} />
    {Array.from({ length: 11 }, (_, r) => (
      <div key={"bc" + r} style={{ position: "absolute", left: 0, right: 0, top: 112 + r * 52,
        height: 3, background: dkh(p.back2, 0.20), opacity: 0.5, zIndex: 7 }} />
    ))}
    {/* the skirting and the tunnel floor, so the lower half is a PLACE and not
        an unlit band — v1 left it near-black under the posters */}
    <div style={{ position: "absolute", left: 0, right: 0, top: 664, height: 16,
      background: dkh(p.back2, 0.34), zIndex: 8 }} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 680, bottom: 0,
      background: `linear-gradient(184deg, ${p.floor} 0%, ${p.floor2} 100%)`, zIndex: 8 }} />
  </>);

  /* ---- A · THREE POSTERS, 210px marks, pasted up in sequence ----------- */
  if (shot === 0) {
    const T = [{ x: 190, i: 0, at: 2, r: -2.5 }, { x: 506, i: 1, at: 8, r: 1.5 },
               { x: 822, i: 5, at: 14, r: -1.5 }];
    return (
      <Scene p={p} slug="THE CORNER  ·  FREE TIERS" push={[0, 38, 1.05]} vig={0.5}>
        <Arena p={p} f={f} rows={2} lights={3} />
        <Wall />
        {T.map((t, k) => {
          const on = E(lf, t.at, t.at + 7, 0, 1, BACK);
          return on > 0.01 ? (
            <div key={"po" + k} style={{ position: "absolute", inset: 0, zIndex: 40 + k,
              opacity: Math.min(1, on * 1.4),
              transform: `scale(${0.86 + on * 0.14})`, transformOrigin: `${t.x}px 320px` }}>
              <Poster x={t.x} y={168} w={252} z={40} rot={t.r}
                markKey={P[t.i].k} name={P[t.i].n} hasMark={P[t.i].mark} sub="FREE TIER" />
            </div>
          ) : null;
        })}
        <Chip t="FREE TIERS THAT REALLY EXIST" y={640} z={98} c="#241F19" />
        <Motes x={506} y={180} w={700} h={300} n={12} f={f} z={80} />
        <Edge side="l" c={dkh(p.back, 0.5)} kind="post" z={94} />
      </Scene>
    );
  }

  /* ---- B · THE WHOLE BILL. Marks, stencils, the count, and the client. -- */
  const rise = E(lf, 4, 16, 0, 1, OUT);
  return (
    <Scene p={p} slug="29 PROVIDERS  ·  ONE CLIENT" push={[38, 73, 1.05]} vig={0.54}>
      <Arena p={p} f={f} rows={2} lights={4} />
      <Wall />
      {/* six real marks at 138px */}
      {[[132, 0], [320, 1], [508, 2], [696, 3], [884, 4]].map(([x, i], k) => (
        <Banner key={"b3" + k} x={x as number} y={128} w={138} z={30}
          markKey={P[i as number].k} name={P[i as number].n}
          hasMark={P[i as number].mark} f={f} />
      ))}
      {/* the four with no public mark get a cast name, never an invented glyph */}
      {[[112, 6], [318, 7], [524, 8], [742, 9]].map(([x, i], k) => (
        <Stencil key={"st" + k} t={P[i as number].n} x={x as number} y={430} s={1.15}
          z={70} />
      ))}
      <Cam z={88} o={rise} y={(1 - rise) * 18}>
        <Plate x={806} y={418} t="+19 MORE" sub="29 TOTAL" w={190} s={1.1} z={90} />
      </Cam>
      <MarkPlate x={218} y={532} t="CLAUDE CODE IS THE CLIENT" s={1.02} z={92} />
      <Motes x={506} y={170} w={720} h={300} n={12} f={f} z={80} />
      <Edge side="r" c={dkh(p.back, 0.52)} kind="wall" z={94} />
    </Scene>
  );
};

/* ================================================================== S3 ====
   8.37 -> 12.03s · 110f · ESCALATE · THE VILLAIN.
   "Most developers are paying hundreds of dollars a month just to access one
    of these tools."

   ⛔ THE ONLY COLD SCENE IN THE REEL, and the only one with rain. The villain
      gets a palette nothing else shares, so the S4 cut back to the warm hall IS
      the relief beat with no words spent.
   ⛔ THE VILLAIN IS NEVER ARGUED WITH. The price ratchets three times and you
      still get exactly one fighter. It is abandoned at S4, not beaten.
   ========================================================================= */
export const S3: React.FC = () => {
  const f = useCurrentFrame();
  const p = usePlace("booth");
  const CUT = [0, 40, 78];
  const shot = CUT.filter((c) => f >= c).length - 1;
  const lf = f - CUT[shot];

  const RAISE = [4, 26, 48];
  const n = RAISE.filter((d) => f >= d).length;
  const PRICE = ["$20", "$60", "$140", "$300"];

  /* ---- A · THE BOX OFFICE. One ticket, one fighter. -------------------- */
  if (shot === 0) {
    return (
      <Scene p={p} slug="BOX OFFICE  ·  PER PROVIDER" push={[0, 40, 1.05]} vig={0.6}>
        <Arena p={p} f={f} rows={2} truss={false} lights={0} />
        <Booth x={520} base={676} s={1.18} z={40} f={f}
          price={PRICE[Math.min(3, n)]} sold={n} />
        {/* the ONE poster you are allowed behind the glass */}
        <Poster x={186} y={216} w={196} z={46} rot={-3} markKey={P[0].k} name={P[0].n}
          hasMark sub="1 OF 29" />
        <Rain f={f} n={44} z={90} />
        <Edge side="l" c="#20272C" kind="post" z={92} />
        <Flash lf={f} at={RAISE[0]} n={2} o={0.14} />
      </Scene>
    );
  }

  /* ---- B · THE PRICE, BIG. Three raises, still one fighter. ------------ */
  if (shot === 1) {
    return (
      <Scene p={p} slug="THE PRICE  ·  ONE OF THEM" push={[40, 78, 1.06]} vig={0.62}>
        <Arena p={p} f={f} rows={2} truss={false} lights={0} />
        <div style={{ position: "absolute", left: 118, top: 158, width: 776, height: 250,
          borderRadius: 12, background: "#241F19", border: "8px solid #6E6A5E", zIndex: 40,
          boxShadow: SH_D, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontFamily: MONO, fontWeight: 900, fontSize: 156,
            letterSpacing: "-0.03em", color: "#E8DCBA" }}>{PRICE[Math.min(3, n)]}</span>
        </div>
        <Chip t="PER MONTH  ·  ONE PROVIDER" y={438} z={98} c="#2A343B" />
        <Poster x={506} y={498} w={198} z={46} rot={1.5} markKey={P[0].k} name={P[0].n}
          hasMark sub="AND ONLY THIS ONE" />
        <Rain f={f} n={40} z={90} />
        <Edge side="r" c="#20272C" kind="wall" z={92} />
      </Scene>
    );
  }

  /* ---- C · WIDE · the queue, and it shuffles forward -------------------
     ⛔ THE DEAD RUN LIVED HERE in v1 (0.9s static at 11.1-12.0s, the last
        second before the reel's biggest turn). Rain is 2px wide and invisible
        to a 240x188 frame-difference metric, and a queue that never advances is
        the thing that was actually wrong. It now shuffles, on a stagger. */
  const step = E(lf, 6, 20, 0, 1, IO);
  return (
    <Scene p={p} slug="AND THE QUEUE  ·  DOES NOT END" push={[78, 110, 1.05]} vig={0.64}>
      <Arena p={p} f={f} rows={2} truss={false} lights={0} />
      <Booth x={812} base={664} s={0.9} z={40} f={f} price="$300" sold={3} />
      {[600, 462, 344, 246, 172].map((x, i) => {
        const kk = E(lf, 6 + i * 3, 20 + i * 3, 0, 1, IO);
        const bob = Math.abs(Math.sin(kk * Math.PI)) * 9 * (0.94 - i * 0.13);
        return (
          <Waiting key={"wt" + i} x={x + kk * (i === 0 ? 74 : 118)}
            base={664 - i * 22 - bob} s={0.94 - i * 0.13} z={38 - i}
            c={dkh("#2E373E", i * 0.06)} />
        );
      })}
      <Rain f={f} n={48} z={90} />
      <Edge side="l" c="#1C2226" kind="post" z={92} />
    </Scene>
  );
};

/* ================================================================== S4 ====
   12.03 -> 16.50s · 134f · TURN · THE PAYOFF.
   "This repo routes your requests across the free tiers of every major AI
    company simultaneously."

   ⛔ THE REEL'S ONE MOTIVATED CAMERA MOVE is in shot C — a slow pull back as
      the roster's pooled bar runs the full rail.
   ========================================================================= */
export const S4: React.FC = () => {
  const f = useCurrentFrame();
  const p = usePlace("ring");
  const CUT = [0, 26, 70];
  const shot = CUT.filter((c) => f >= c).length - 1;
  const lf = f - CUT[shot];
  const CANV = p.horizon + 4;

  /* ---- A · CLOSE · three of them come in together ---------------------- */
  if (shot === 0) {
    const on = E(lf, 2, 18, 0, 1, OUT);
    return (
      <Scene p={p} slug="EVERY CORNER  ·  AT ONCE" push={[0, 26, 1.05]} vig={0.46}>
        <Arena p={p} f={f} rows={3} lights={5} />
        {[[210, 0], [506, 2], [802, 5]].map(([x, i], k) => (
          <Banner key={"b4" + k} x={x as number} y={128} w={162} z={26}
            markKey={P[i as number].k} name={P[i as number].n}
            hasMark={P[i as number].mark} f={f} />
        ))}
        <Ring p={p} f={f} z={30} mark={250} markY={CANV + 120} />
        {[[248, 0], [506, 2], [764, 5]].map(([x, i], k) => (
          <Fighter key={"f4" + k} x={x as number} base={CANV + 232 - on * 10}
            s={0.84} z={60 + k} f={f + k * 8} cheer={on} board={false} />
        ))}
        <Flash lf={lf} at={0} n={2} o={0.2} />
      </Scene>
    );
  }

  /* ---- B · WIDE · the corner is full, and the totaliser says the real
     number. ⛔ 4 BILLION IS THE REPO'S OWN FIGURE. The VO says 800 million,
     which understates it 5x, so the receipt over-delivers and never
     contradicts. ------------------------------------------------------- */
  if (shot === 1) {
    const on = E(lf, 0, 16, 0, 1, OUT);
    const sk = shake(lf, 2, 16, 14);
    return (
      <Scene p={p} slug="RATED  ·  4B TOKENS / MONTH" push={[26, 70, 1.05]} vig={0.42}>
        <div style={{ position: "absolute", inset: 0, zIndex: 1,
          transform: `translate(${sk.x}px, ${sk.y}px)` }}>
          <Arena p={p} f={f} rows={3} lights={5} />
          {[[128, 0], [316, 1], [694, 3], [882, 4]].map(([x, i], k) => (
            <Banner key={"b5" + k} x={x as number} y={126} w={140} z={24}
              markKey={P[i as number].k} name={P[i as number].n}
              hasMark={P[i as number].mark} f={f} />
          ))}
          <Ring p={p} f={f} z={30} mark={250} markY={CANV + 120} />
          {[[168, 6], [268, 2], [368, 8], [644, 5], [744, 9], [844, 1]].map(([x, i], k) => (
            <Fighter key={"f5" + k} x={x as number} base={CANV + 168 + (k % 2) * 40}
              s={0.5 + (k % 2) * 0.06} z={48 + k} f={f + k * 6} cheer={on}
              board={false} />
          ))}
          <RoundBoard x={332} y={330} v="4 BILLION" sub="RATED CAPACITY"
            s={0.78} z={96} small="29 PROVIDERS · 358 ENDPOINTS" />
          <Flash lf={lf} at={2} n={3} o={0.3} />
        </div>
      </Scene>
    );
  }

  /* ---- C · THE ROSTER BOARD. Each is a toy; the pooled rail is not.
     THE ONE MOVE: a motivated pull-back as that rail fills. -------------- */
  const lit = E(lf, 2, 30, 0, 6, LIN);
  const pool = E(lf, 26, 54, 0, 1, OUT);
  const pull = E(lf, 0, 60, 1.13, 1.0, IO);
  return (
    <Scene p={p} slug="ONE  /v1  ENDPOINT" push={[70, 134, 1.02]} vig={0.46}>
      <div style={{ position: "absolute", inset: 0, zIndex: 1,
        transform: `scale(${pull})`, transformOrigin: "50% 46%" }}>
        <Arena p={p} f={f} rows={3} lights={4} />
        <Ring p={p} f={f} z={30} mark={230} markY={CANV + 126} near={false} />
        <Roster x={92} y={222} n={6} s={1.0} z={70} f={f} lit={lit} pooled={pool} />
        <Fighter x={806} base={CANV + 244} s={0.94} z={72} f={f} tint={CLAY}
          robe="#B8543A" cheer={pool} board={false} />
        <Mark x={742} y={CANV - 78} s={104} z={90} />
        <Chip t="358 FREE MODEL ENDPOINTS" y={690} x={92} z={98} c="#241F19" />
      </div>
    </Scene>
  );
};

/* ================================================================== S5 ====
   16.50 -> 19.00s · 75f · PAYOFF · THE MECHANISM.
   "Hit one model's rate limit, it automatically jumps to the next."

   ⛔ THE TIGHTEST FRAMING IN THE REEL. A fighter gasses out, the 429 towel
      comes in, and the tag fires — total dead time eight frames. The round
      counter behind NEVER RESETS, which is the actual claim.
   ⛔ THE TAG FIRES TWICE. Once on the VO's beat, once unprompted at the end, so
      it reads as a loop rather than a one-off trick.
   ========================================================================= */
export const S5: React.FC = () => {
  const f = useCurrentFrame();
  const p = usePlace("apron");
  const CUT = [0, 44];
  const shot = CUT.filter((c) => f >= c).length - 1;
  const lf = f - CUT[shot];

  const gas = E(f, 12, 20, 0, 1, OUT);          /* he empties */
  const towel = E(f, 16, 24, 0, 1, OUT);        /* 429 comes in */
  const tag = E(f, 24, 30, 0, 1, OUT);          /* the switch: 8 frames */
  const tag2 = E(f, 62, 68, 0, 1, OUT);         /* and again, unprompted */

  /* ---- A · MACRO AT THE ROPES · the gassed man, the towel, the tag ----- */
  if (shot === 0) {
    return (
      <Scene p={p} slug="RATE LIMIT  ·  429" push={[0, 44, 1.05]} vig={0.5}>
        <Arena p={p} f={f} rows={2} lights={3} dim={0.06} />
        <Ring p={p} f={f} z={30} mark={220} markY={p.horizon + 126} near={false} />
        <div style={{ position: "absolute", left: -60, top: 336, width: W + 120, height: 20,
          borderRadius: 10, background: ROPE, zIndex: 84, boxShadow: SH }} />
        {/* the one who ran out */}
        <Fighter x={286} base={p.horizon + 258} s={0.94} z={60} f={f}
          markKey={P[6].k} name={P[6].n} hasMark={P[6].mark} gassed={gas} board />
        {/* the one coming in */}
        <Fighter x={786} base={p.horizon + 258} s={0.94} z={62} f={f + 14}
          markKey={P[1].k} name={P[1].n} hasMark cheer={tag} board />
        <Tag x={536} y={p.horizon + 122} s={0.98} z={92} t={tag} f={lf} />
        <Towel429 x={286} y={186} s={0.86} t={towel} z={96} />
        <Flash lf={f} at={24} n={3} o={0.26} />
      </Scene>
    );
  }

  /* ---- B · THE ROUND COUNTER NEVER RESET ------------------------------- */
  const set = E(lf, 4, 14, 0, 1, OUT);
  return (
    <Scene p={p} slug="THE FIGHT  ·  NEVER STOPS" push={[44, 75, 1.05]} vig={0.46}>
      <Arena p={p} f={f} rows={3} lights={4} />
      <Ring p={p} f={f} z={30} mark={230} markY={p.horizon + 126} />
      <Fighter x={318} base={p.horizon + 250} s={0.88} z={60} f={f}
        markKey={P[1].k} name={P[1].n} hasMark cheer={0.5} board />
      <Fighter x={706} base={p.horizon + 250} s={0.88} z={61} f={f + 11} tint={CLAY}
        robe="#B8543A" cheer={0.7} board={false} />
      <Tag x={512} y={p.horizon + 116} s={0.72} z={92} t={tag2} f={lf} />
      <Cam z={96} o={set} y={(1 - set) * 16}>
        <RoundBoard x={318} y={172} v="ROUND 12" sub="NO DROP, NO RESET" s={0.62}
          z={96} small="AUTO FAILOVER" />
      </Cam>
      <Motes x={506} y={200} w={620} h={300} n={10} f={f} z={82} />
    </Scene>
  );
};

/* ================================================================== S6 ====
   19.00 -> 20.93s · 58f · CTA.
   "Comment REPO and I'll send it immediately."

   ⛔ HARD CUT ON THE KEYWORD, and the keyword is CAST INTO THE WORLD — the
      centre plate of the belt — never floated over the picture.
   ⛔ THE BRIGHTEST FRAME IN THE REEL, with the receipt still on screen.
   ⛔ AND IT KEEPS MOVING. v1's CTA finished every animation by f12 and then held
      for a full second, which the motion audit caught as a dead run at the worst
      possible place. The belt is RAISED across the whole shot.
   ========================================================================= */
export const S6Cta: React.FC = () => {
  const f = useCurrentFrame();
  const p = usePlace("belt");
  const pop = E(f, 0, 10, 0, 1, BACK);
  const lift = E(f, 4, 50, 0, 1, IO);
  const sk = shake(f, 0, 12, 10);
  return (
    <Scene p={p} slug="COMMENT THE KEYWORD" push={[0, 58, 1.05]} vig={0.38}>
      <div style={{ position: "absolute", inset: 0, zIndex: 1,
        transform: `translate(${sk.x}px, ${sk.y}px)` }}>
        <Arena p={p} f={f} rows={3} lights={5} />
        <Ring p={p} f={f} z={30} mark={250} markY={p.horizon + 122} />
        {/* the winner, arms up, holding it */}
        <Fighter x={W / 2 - 24} base={p.horizon + 286} s={1.34} z={60} f={f} tint={CLAY}
          robe="#B8543A" cheer={0.75} board={false} armUp={lift} />
        <Mark x={64} y={556} s={104} z={88} />
        {/* THE BELT, raised across the whole shot */}
        <div style={{ position: "absolute", inset: 0, zIndex: 92,
          transform: `translateY(${(1 - lift) * 132}px) scale(${0.82 + pop * 0.18})`,
          transformOrigin: "50% 40%", opacity: pop }}>
          <Belt x={W / 2} y={126} s={0.92} z={92} word="REPO" />
        </div>
        <MakerPlate x={636} y={556} s={1.0} z={94} />
        <Flash lf={f} at={0} n={4} o={0.34} />
      </div>
    </Scene>
  );
};
