import React from "react";
import { useCurrentFrame } from "remotion";
import { inter, fraunces } from "./fonts";
import { MONO } from "./SlopKit";
import {
  W, H, E, OUT, IO, BACK, IN_Q, LIN, mxh, dkh, SH, SH_D, rnd,
  CLAY, GOLD, RED, TOK, TOKD, TOKL, BRASS, BRASSD, BRASSL, WOOD, WOODD, WOODL,
  Room, Scene, Cam, Beam, Motes, Chip, Plate, Edge, Token, MakerPlate, PROVIDERS,
  usePlace,
} from "./RepWorld";
import { Counter, Pile, Fall, Claude, Stack, RepoCard, Burst, Belt } from "./RepProps";
import type { Place } from "./RepWorld";

/* ===========================================================================
   REEL 99 · FOUR HOOK DESIGNS, ROUND 2.

   ⛔⛔ HOOK-ONLY PREVIEWS. 110 frames each, and by construction NO VO, NO music,
      NO SFX, NO captions and none of the assembly chrome (cream bg, header
      pill) — that lives in ROOT, not in a scene ([[feedback_label_preview_artifacts]]).
      Judge the picture and the timing of the break.

   WHAT CHANGED FROM ROUND 1, and it is the same three things on all four:

   1. THEY ARE IN A PLACE NOW. Round 1 staged every idea against a bare wall and
      a floor — 5 or 6 objects, two depth planes, and it read as artwork rather
      than a scene. `Shop` gives all four the same working counting room: back
      shelf carrying stock, a hung lamp and its beam, panelling, the counter,
      a till, and a foreground counter-edge that crops the frame. 14-18 objects
      before the idea's own props land.
   2. THREE SHOTS, NOT TWO. Cuts at f42 and f78 (1.4s / 2.6s), so each hook is
      SET UP -> BREAK -> CONSEQUENCE -> PAYOFF rather than one event and a hold.
   3. THE BREAK IS HARDER AND EARLIER. Every one of them now lands its physical
      event by f12 with a flash, a decaying shake and thrown mass, and Hook B's
      fuse — which measured 3.94 against a 4.0 bar and peaked at 1.9s — is now a
      slam at f11.
   ========================================================================= */

const shake = (lf: number, at: number, amp = 18, n = 15) => {
  if (lf < at || lf > at + n) return { x: 0, y: 0 };
  const k = 1 - (lf - at) / n;
  const d = k * k * amp;
  return { x: Math.sin(lf * 2.7) * d, y: Math.cos(lf * 3.4) * d * 0.7 };
};
const Flash: React.FC<{ lf: number; at: number; n?: number; o?: number }> =
  ({ lf, at, n = 3, o = 0.42 }) => {
  if (lf < at || lf >= at + n) return null;
  return <div style={{ position: "absolute", inset: 0, zIndex: 140, pointerEvents: "none",
    background: "#F9F3E4", opacity: (1 - (lf - at) / n) * o }} />;
};
const P = PROVIDERS;
const M = 800000000;

/* =========================================================================
   THE SET — one working room, shared by all four hooks so they are variants of
   an idea rather than four different films. Six depth planes: wall, shelf,
   lamp+beam, counter face, counter top, foreground edge.
   ====================================================================== */
const Shop: React.FC<{ p: Place; f: number; shelf?: number; lamp?: number;
  till?: boolean; edge?: boolean; from?: number }> =
  ({ p, f, shelf = 4, lamp = 250, till = true, edge = true, from = 0 }) => {
  const hz = p.horizon;
  return (<>
    <Room p={p} f={f} />
    {/* the back shelf, carrying stock — this is also where four more logos live */}
    <div style={{ position: "absolute", left: 46, top: hz - 214, width: W - 92, height: 15,
      background: WOODL, zIndex: 6, boxShadow: SH }} />
    <div style={{ position: "absolute", left: 46, top: hz - 200, width: W - 92, height: 8,
      background: WOODD, zIndex: 6 }} />
    {[64, W - 88].map((x, i) => (
      <div key={"br" + i} style={{ position: "absolute", left: x, top: hz - 200, width: 24,
        height: 74, background: WOODD, zIndex: 5 }} />
    ))}
    {Array.from({ length: shelf }, (_, i) => {
      const pr = P[(from + i) % P.length];
      const x = 150 + i * ((W - 300) / Math.max(1, shelf - 1));
      return <Token key={"sh" + i} x={x} y={hz - 258} s={96} z={8}
        markKey={pr.k} name={pr.n} hasMark={pr.mark} rot={(i % 2 ? 5 : -5)} />;
    })}
    {/* the hung lamp and one solid beam */}
    <div style={{ position: "absolute", left: lamp - 3, top: 0, width: 6, height: 78,
      background: "#3E444A", zIndex: 20 }} />
    <div style={{ position: "absolute", left: lamp - 52, top: 74, width: 104, height: 44,
      borderRadius: "6px 6px 52px 52px", background: "#4E555C", zIndex: 21, boxShadow: SH_D }} />
    <div style={{ position: "absolute", left: lamp - 44, top: 108, width: 88, height: 14,
      borderRadius: "0 0 44px 44px", background: "#F2DFAE", zIndex: 22 }} />
    <Beam x={lamp} y={120} top={90} bot={430} len={430} c="#F2E2BC" o={0.20} z={18} f={f} />
    {/* the till on the counter */}
    {till && (<>
      <div style={{ position: "absolute", left: W - 268, top: hz - 74, width: 196,
        height: 78, borderRadius: 8, background: "#6E6154", zIndex: 30, boxShadow: SH }} />
      <div style={{ position: "absolute", left: W - 258, top: hz - 62, width: 176,
        height: 40, borderRadius: 5, background: "#241F19", zIndex: 31 }} />
      <div style={{ position: "absolute", left: W - 250, top: hz - 54, width: 160,
        textAlign: "center", zIndex: 32, fontFamily: MONO, fontWeight: 900, fontSize: 25,
        color: "#E8DCBA" }}>FREE</div>
    </>)}
    <Motes x={lamp + 60} y={150} w={420} h={330} n={11} f={f} z={26} />
    {/* the foreground counter edge — the frame is INSIDE the room, not aimed at it */}
    {edge && (
      <div style={{ position: "absolute", left: -40, top: H - 74, width: W + 80, height: 120,
        background: WOODD, zIndex: 118, boxShadow: "0 -14px 26px rgba(26,24,19,0.34)" }}>
        <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 12,
          background: WOODL }} />
      </div>
    )}
  </>);
};

/* ========================================================== HOOK A =======
   THE PAYWALL — a barred gate of price cards, and the repo smashes it.
   RANK: the small money in front vs the number behind, both in frame 0.
   MOMENT: the repo card falling, one frame before contact.
   ====================================================================== */
export const HookPaywall: React.FC = () => {
  const f = useCurrentFrame();
  const p = usePlace("count");
  const CUT = [0, 42, 78];
  const shot = CUT.filter((c) => f >= c).length - 1;
  const lf = f - CUT[shot];
  const PRICES = ["$20", "$60", "$140", "$300"];

  /* ---- A · the gate, and the repo coming through it -------------------- */
  if (shot === 0) {
    const drop = E(lf, 0, 11, 0, 1, IN_Q);
    const smash = E(lf, 11, 30, 0, 1, OUT);
    const sk = shake(lf, 11, 22, 16);
    return (
      <Scene p={p} slug="" push={[0, 42, 1.05]} vig={0.3}>
        <div style={{ position: "absolute", inset: 0, zIndex: 1,
          transform: `translate(${sk.x}px, ${sk.y}px)` }}>
          <Shop p={p} f={f} shelf={4} lamp={824} from={4} till={false} />
          {/* what is behind the gate, legible from frame 0 — that is the rank */}
          <div style={{ position: "absolute", left: 0, right: 0, top: 176, textAlign: "center",
            zIndex: 24, fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 92,
            lineHeight: 1, letterSpacing: "-0.03em", color: "#B8541F" }}>800,000,000</div>
          <div style={{ position: "absolute", left: 0, right: 0, top: 272, textAlign: "center",
            zIndex: 24, fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 29,
            letterSpacing: "0.14em", color: "#5C5346" }}>FREE AI TOKENS / MONTH</div>
          {/* THE GATE — iron bars across the counter, price cards hung on them */}
          {smash < 0.02 && Array.from({ length: 9 }, (_, i) => (
            <div key={"bar" + i} style={{ position: "absolute", left: 76 + i * 108, top: 330,
              width: 17, height: 330, background: "#6E747C", zIndex: 50, boxShadow: SH }} />
          ))}
          {PRICES.map((pr, i) => {
            const x = 210 + i * 200;
            const gone = smash > 0.02;
            const a = (i - 1.5) * 0.55;
            return (
              <div key={"pw" + i} style={{ position: "absolute", left: x - 92, top: 372,
                width: 184, height: 246, zIndex: 60 + i,
                transform: gone
                  ? `translate(${Math.cos(a) * smash * 620}px, ${-smash * 210 + smash * smash * 760}px) rotate(${smash * (i % 2 ? 230 : -270)}deg)`
                  : "none", opacity: gone ? 1 - smash * 0.35 : 1 }}>
                <div style={{ width: "100%", height: "100%", borderRadius: 12,
                  background: "#EFE9DA", border: "6px solid #9A8F78", boxSizing: "border-box",
                  boxShadow: SH_D, display: "flex", flexDirection: "column",
                  alignItems: "center", justifyContent: "center" }}>
                  <Token x={92} y={78} s={118} z={2} markKey={P[i].k} name={P[i].n}
                    hasMark={P[i].mark} />
                  <span style={{ marginTop: 92, fontFamily: MONO, fontWeight: 900,
                    fontSize: 48, color: "#3A342A" }}>{pr}</span>
                  <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 16,
                    letterSpacing: "0.12em", color: "#8A8074" }}>PER MONTH</span>
                </div>
              </div>
            );
          })}
          <div style={{ position: "absolute", inset: 0, zIndex: 100,
            transform: `translateY(${-760 + drop * 760}px) rotate(${(1 - drop) * -14}deg)`,
            transformOrigin: "50% 50%" }}>
            <RepoCard x={W / 2} y={318} s={0.74} z={100} />
          </div>
          <Burst x={W / 2} y={500} t={smash} n={18} s={1.05} z={112} spread={680} />
          <Claude x={126} base={706} s={0.8} z={84} f={f} gaze={0.85} shock={smash * 0.9} />
          <Flash lf={lf} at={11} n={4} o={0.48} />
        </div>
      </Scene>
    );
  }

  /* ---- B · CLOSE · a price card hits the counter and stops dead -------- */
  if (shot === 1) {
    const land = Math.max(0, 1 - Math.abs(lf - 5) / 5);
    return (
      <Scene p={p} slug="NOTHING WAS BEHIND IT" push={[42, 78, 1.06]} vig={0.4}>
        <Shop p={p} f={f} shelf={3} lamp={190} from={1} till={false} edge={false} />
        <div style={{ position: "absolute", left: 268, top: 262, width: 300, height: 400,
          borderRadius: 16, background: "#EFE9DA", border: "8px solid #9A8F78",
          boxSizing: "border-box", boxShadow: SH_D, zIndex: 70,
          transform: `rotate(-9deg) scale(${1 + land * 0.06}, ${1 - land * 0.09})`,
          transformOrigin: "50% 100%" }} />
        <Token x={418} y={392} s={186} z={74} markKey={P[3].k} name={P[3].n} hasMark
          rot={-9} />
        <div style={{ position: "absolute", left: 268, top: 520, width: 300, textAlign: "center",
          zIndex: 76, fontFamily: MONO, fontWeight: 900, fontSize: 72, color: "#3A342A",
          transform: "rotate(-9deg)" }}>$300</div>
        <RepoCard x={760} y={236} s={0.62} z={90} />
        <Burst x={418} y={392} t={Math.min(1, E(lf, 2, 18, 0, 1, OUT))} n={9} s={0.8}
          z={104} spread={330} />
        <Flash lf={lf} at={0} n={3} o={0.3} />
      </Scene>
    );
  }

  /* ---- C · WIDE · the room is full of what the gate was hiding -------- */
  const pour = E(lf, 0, 22, 0, 1, OUT);
  return (
    <Scene p={p} slug="800 MILLION  ·  FREE" push={[78, 110, 1.05]} vig={0.32}>
      <Shop p={p} f={f} shelf={4} lamp={230} from={0} />
      <Fall x={676} y={-30} len={640} f={f} n={13} s={1.15} z={64} spread={440} on={1} />
      <Pile x={676} base={712} n={Math.round(pour * 175)} s={1.1} z={70} w={560} seed={5} />
      <Token x={548} y={540} s={192} z={92} markKey={P[0].k} name={P[0].n} hasMark rot={-9} />
      <Token x={766} y={408} s={204} z={93} markKey={P[1].k} name={P[1].n} hasMark rot={6} />
      <Counter x={330} y={172} v={M} s={0.58} z={96} />
      <Claude x={158} base={716} s={0.88} z={84} f={f} gaze={0.7} cheer={0.75} />
      <Flash lf={lf} at={0} n={2} o={0.22} />
    </Scene>
  );
};

/* ========================================================== HOOK B =======
   THE FUSE — eight useless stubs SLAM into one tower.
   ⛔ ROUND 1 MEASURED 3.94 AGAINST A 4.0 BAR and peaked at 1.9s: the slide was a
      slow gesture and the rise came after it. They now slam at f11 and the tower
      punches out of frame on the same frame, so the whole idea lands at once.
   ====================================================================== */
export const HookFuse: React.FC = () => {
  const f = useCurrentFrame();
  const p = usePlace("hall");
  const CUT = [0, 42, 78];
  const shot = CUT.filter((c) => f >= c).length - 1;
  const lf = f - CUT[shot];
  const BASE = 656;

  if (shot === 0) {
    const pull = E(lf, 4, 11, 0, 1, IN_Q);       /* they rush inward */
    const rise = E(lf, 11, 24, 0, 1, OUT);       /* and punch upward */
    const sk = shake(lf, 11, 24, 17);
    return (
      <Scene p={p} slug="" push={[0, 42, 1.05]} vig={0.32}>
        <div style={{ position: "absolute", inset: 0, zIndex: 1,
          transform: `translate(${sk.x}px, ${sk.y}px)` }}>
          <Shop p={p} f={f} shelf={4} lamp={806} from={4} till={false} />
          {/* EIGHT STUBS, each one provider's free tier, each useless */}
          {Array.from({ length: 8 }, (_, i) => {
            const x0 = 128 + i * 108;
            const x = x0 + (W / 2 - x0) * pull;
            const hgt = (46 + rnd(i, 3) * 22) * (1 - rise);
            if (rise > 0.96) return null;
            return (
              <React.Fragment key={"st" + i}>
                <div style={{ position: "absolute", left: x - 42, top: BASE - hgt,
                  width: 84, height: Math.max(2, hgt), borderRadius: 7, background: TOK,
                  border: `4px solid ${TOKD}`, boxSizing: "border-box", zIndex: 40 + i,
                  boxShadow: SH }} />
                <Token x={x} y={BASE - hgt - 52} s={104 - pull * 26} z={60 + i}
                  markKey={P[i].k} name={P[i].n} hasMark={P[i].mark} />
              </React.Fragment>
            );
          })}
          {/* the tower, leaving the top of frame on the slam */}
          {rise > 0.02 && (<>
            <div style={{ position: "absolute", left: W / 2 - 124,
              top: BASE - 40 - rise * 780, width: 248, height: 40 + rise * 780,
              borderRadius: 10, background: TOK, border: `7px solid ${TOKD}`,
              boxSizing: "border-box", zIndex: 88, boxShadow: SH_D }} />
            <div style={{ position: "absolute", left: W / 2 - 124,
              top: BASE - 40 - rise * 780, width: 62, height: 40 + rise * 780,
              background: TOKL, opacity: 0.45, zIndex: 89 }} />
          </>)}
          <Burst x={W / 2} y={BASE - 60} t={Math.min(1, rise * 1.6)} n={14} s={1.0}
            z={104} spread={560} />
          {/* ⛔ THE HEADLINE MOVES OFF THE TOWER'S PATH. Centred, it was printed
              straight through by the column punching up, and the shelf tokens
              sat behind it as well. It lives in the clear left band instead. */}
          <div style={{ position: "absolute", left: 34, top: 286, width: 330,
            zIndex: 100, fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 66,
            lineHeight: 1.04, letterSpacing: "-0.02em", color: "#B8541F",
            opacity: rise }}>800,000,000</div>
          <div style={{ position: "absolute", left: 34, top: 358, width: 330,
            zIndex: 100, fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 24,
            letterSpacing: "0.10em", color: "#5C5346",
            opacity: rise }}>FREE AI TOKENS / MONTH</div>
          <Claude x={110} base={712} s={0.76} z={84} f={f} gaze={0.9} shock={rise * 0.95} />
          <Flash lf={lf} at={11} n={4} o={0.46} />
        </div>
      </Scene>
    );
  }

  /* ---- B · CLOSE · one stub, for comparison, against the column ------- */
  if (shot === 1) {
    const set = E(lf, 0, 10, 0, 1, OUT);
    return (
      <Scene p={p} slug="ONE FREE TIER  vs  ALL OF THEM" push={[42, 78, 1.06]} vig={0.4}>
        <Shop p={p} f={f} shelf={3} lamp={200} from={2} till={false} edge={false} />
        <div style={{ position: "absolute", left: 232, top: 560, width: 96, height: 96,
          borderRadius: 7, background: TOK, border: `5px solid ${TOKD}`,
          boxSizing: "border-box", zIndex: 60, boxShadow: SH }} />
        <Token x={280} y={488} s={124} z={64} markKey={P[6].k} name={P[6].n}
          hasMark={P[6].mark} />
        <div style={{ position: "absolute", left: 596, top: -40, width: 248, height: 700,
          borderRadius: 10, background: TOK, border: `7px solid ${TOKD}`,
          boxSizing: "border-box", zIndex: 60, boxShadow: SH_D }} />
        <div style={{ position: "absolute", left: 596, top: -40, width: 62, height: 700,
          background: TOKL, opacity: 0.45, zIndex: 61 }} />
        <Cam z={96} o={set} y={(1 - set) * 18}>
          <Plate x={196} y={664} t="800,000" sub="ONE FREE TIER" w={216} s={1.06} z={96} />
        </Cam>
        <Flash lf={lf} at={0} n={2} o={0.26} />
      </Scene>
    );
  }

  const set = E(lf, 0, 12, 0, 1, OUT);
  return (
    <Scene p={p} slug="29 FREE TIERS  ·  ONE POOL" push={[78, 110, 1.05]} vig={0.34}>
      <Shop p={p} f={f} shelf={4} lamp={210} from={0} />
      <div style={{ position: "absolute", left: W / 2 - 118, top: -40, width: 236,
        height: 660, borderRadius: 10, background: TOK, border: `6px solid ${TOKD}`,
        boxSizing: "border-box", zIndex: 40, boxShadow: SH_D }} />
      <Token x={W / 2 - 186} y={288} s={180} z={92} markKey={P[0].k} name={P[0].n}
        hasMark rot={-8} />
      <Token x={W / 2 + 192} y={214} s={180} z={92} markKey={P[1].k} name={P[1].n}
        hasMark rot={7} />
      <Cam z={96} o={set} y={(1 - set) * 20}>
        <MakerPlate x={W / 2 - 160} y={548} s={1.04} z={96} />
      </Cam>
      <Claude x={126} base={716} s={0.82} z={84} f={f} gaze={0.8} cheer={0.75} />
      <Flash lf={lf} at={0} n={2} o={0.22} />
    </Scene>
  );
};

/* ========================================================== HOOK C =======
   THE JACKPOT — one card turns every price to FREE and the machine dumps.
   ⛔ ROUND 1 HAD THE LOWEST FRAME-0 LUMA OF THE FOUR (152.4) because the cabinet
      was a 690x540 slab of #5E6870. It is now a pale enamel machine in a lit
      room, and the windows are bigger.
   ====================================================================== */
export const HookJackpot: React.FC = () => {
  const f = useCurrentFrame();
  const p = usePlace("count");
  const CUT = [0, 42, 78];
  const shot = CUT.filter((c) => f >= c).length - 1;
  const lf = f - CUT[shot];

  if (shot === 0) {
    const insert = E(lf, 4, 11, 0, 1, IN_Q);
    const flip = E(lf, 11, 20, 0, 1, OUT);
    const dump = E(lf, 12, 38, 0, 1, OUT);
    const sk = shake(lf, 11, 22, 17);
    return (
      <Scene p={p} slug="" push={[0, 42, 1.05]} vig={0.3}>
        <div style={{ position: "absolute", inset: 0, zIndex: 1,
          transform: `translate(${sk.x}px, ${sk.y}px)` }}>
          <Shop p={p} f={f} shelf={4} lamp={140} from={4} till={false} />
          {/* the cabinet — pale enamel, not a grey slab */}
          <div style={{ position: "absolute", left: 178, top: 132, width: 690, height: 500,
            borderRadius: 18, background: "#E4DCC8", border: "8px solid #A2957C",
            boxSizing: "border-box", zIndex: 30, boxShadow: SH_D }} />
          <div style={{ position: "absolute", left: 186, top: 140, width: 674, height: 22,
            borderRadius: "12px 12px 0 0", background: "#F4EEE0", zIndex: 31 }} />
          {[0, 1, 2, 3].map((i) => {
            const x = 262 + i * 172;
            const on = flip > 0.5;
            return (
              <React.Fragment key={"wd" + i}>
                <div style={{ position: "absolute", left: x - 74, top: 186, width: 148,
                  height: 214, borderRadius: 12, background: "#FBF8F1",
                  border: `6px solid ${on ? "#3F9E74" : "#8A8074"}`, boxSizing: "border-box",
                  zIndex: 40, boxShadow: SH }} />
                <Token x={x} y={262} s={126} z={44} markKey={P[i].k} name={P[i].n}
                  hasMark={P[i].mark} />
                <div style={{ position: "absolute", left: x - 66, top: 336, width: 132,
                  textAlign: "center", zIndex: 46, fontFamily: MONO, fontWeight: 900,
                  fontSize: 36, color: on ? "#2E7D52" : "#3A342A" }}>
                  {on ? "FREE" : "$300"}</div>
              </React.Fragment>
            );
          })}
          <div style={{ position: "absolute", left: W / 2 - 100, top: 434, width: 200,
            height: 22, borderRadius: 7, background: "#2A2620", zIndex: 44 }} />
          <div style={{ position: "absolute", inset: 0, zIndex: 96,
            transform: `translate(${-46 + insert * 46}px, ${-176 + insert * 176}px) rotate(${(1 - insert) * -16}deg)`,
            opacity: 1 - flip * 0.85 }}>
            <RepoCard x={W / 2} y={360} s={0.52} z={96} />
          </div>
          {/* the tray, and what comes out of it */}
          <div style={{ position: "absolute", left: 306, top: 502, width: 434, height: 96,
            borderRadius: 10, background: "#2E2820", zIndex: 44 }} />
          <Fall x={W / 2} y={546} len={220} f={f} n={15} s={1.25} z={70} spread={470}
            on={dump} />
          <Burst x={W / 2} y={584} t={Math.min(1, dump * 1.5)} n={13} s={1.0} z={106}
            spread={560} />
          <Pile x={W / 2} base={716} n={Math.round(dump * 130)} s={1.05} z={80} w={700}
            seed={4} />
          <Claude x={106} base={718} s={0.76} z={90} f={f} gaze={0.85} shock={dump * 0.9} />
          <Flash lf={lf} at={11} n={4} o={0.46} />
        </div>
      </Scene>
    );
  }

  if (shot === 1) {
    const set = E(lf, 0, 10, 0, 1, OUT);
    return (
      <Scene p={p} slug="$300  ->  FREE" push={[42, 78, 1.06]} vig={0.4}>
        <Shop p={p} f={f} shelf={3} lamp={846} from={1} till={false} edge={false} />
        <div style={{ position: "absolute", left: 210, top: 216, width: 592, height: 304,
          borderRadius: 16, background: "#FBF8F1", border: "8px solid #3F9E74",
          boxSizing: "border-box", zIndex: 60, boxShadow: SH_D }} />
        <Token x={396} y={330} s={182} z={66} markKey={P[0].k} name={P[0].n} hasMark />
        <div style={{ position: "absolute", left: 500, top: 286, width: 280, zIndex: 66,
          fontFamily: MONO, fontWeight: 900, fontSize: 52, color: "#9A9082",
          textDecoration: "line-through" }}>$300</div>
        <div style={{ position: "absolute", left: 500, top: 366, width: 280, zIndex: 66,
          fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 92, lineHeight: 1,
          color: "#2E7D52" }}>FREE</div>
        <Cam z={96} o={set} y={(1 - set) * 16}>
          <Chip t="EVERY PROVIDER, NOT ONE" y={572} z={96} c="#241F19" />
        </Cam>
        <Flash lf={lf} at={0} n={2} o={0.28} />
      </Scene>
    );
  }

  const grow = E(lf, 0, 22, 0.5, 1, OUT);
  return (
    <Scene p={p} slug="800 MILLION  ·  A MONTH" push={[78, 110, 1.05]} vig={0.32}>
      <Shop p={p} f={f} shelf={4} lamp={200} from={0} />
      <Counter x={W / 2} y={166} v={M} s={0.62} z={96} />
      <Fall x={646} y={-30} len={620} f={f} n={12} s={1.15} z={64} spread={430} on={1} />
      <Pile x={646} base={716} n={Math.round(grow * 175)} s={1.1} z={70} w={560} seed={7} />
      <Token x={506} y={544} s={190} z={92} markKey={P[2].k} name={P[2].n} hasMark rot={-9} />
      <Token x={730} y={412} s={202} z={93} markKey={P[3].k} name={P[3].n} hasMark rot={6} />
      <Claude x={144} base={716} s={0.86} z={84} f={f} gaze={0.75} cheer={0.8} />
      <Flash lf={lf} at={0} n={2} o={0.22} />
    </Scene>
  );
};

/* ========================================================== HOOK D =======
   THE FIREHOSE — a drip becomes a blast that knocks him off his feet.
   RANK: the cup he is holding vs what arrives, same tap, same frame.
   ====================================================================== */
export const HookFirehose: React.FC = () => {
  const f = useCurrentFrame();
  const p = usePlace("bench");
  const CUT = [0, 42, 78];
  const shot = CUT.filter((c) => f >= c).length - 1;
  const lf = f - CUT[shot];

  if (shot === 0) {
    const click = E(lf, 4, 11, 0, 1, IN_Q);
    const blast = E(lf, 11, 26, 0, 1, OUT);
    const sk = shake(lf, 11, 26, 20);
    return (
      <Scene p={p} slug="" push={[0, 42, 1.05]} vig={0.3}>
        <div style={{ position: "absolute", inset: 0, zIndex: 1,
          transform: `translate(${sk.x}px, ${sk.y}px) scale(${1 + blast * 0.09})`,
          transformOrigin: "34% 44%" }}>
          <Shop p={p} f={f} shelf={4} lamp={846} from={4} till={false} />
          {/* the pipe, and the ONE provider it carries */}
          <div style={{ position: "absolute", left: 236, top: -40, width: 112, height: 340,
            background: BRASS, zIndex: 30, boxShadow: SH_D }} />
          <div style={{ position: "absolute", left: 236, top: -40, width: 32, height: 340,
            background: BRASSL, opacity: 0.55, zIndex: 31 }} />
          <div style={{ position: "absolute", left: 192, top: 286, width: 200, height: 58,
            borderRadius: 9, background: BRASSD, zIndex: 32, boxShadow: SH }} />
          <Token x={292} y={182} s={168} z={40} markKey={P[6].k} name={P[6].n}
            hasMark={P[6].mark} />
          {blast < 0.02 && <Token x={292} y={376 + Math.sin(f / 9) * 5} s={58} z={60} plain />}
          {blast > 0.02 && (<>
            <Fall x={292} y={344} len={400} f={f} n={17} s={1.45} z={70} spread={320}
              on={blast} />
            <Burst x={340} y={470} t={Math.min(1, blast * 1.3)} n={15} s={1.15} z={106}
              spread={700} />
          </>)}
          <div style={{ position: "absolute", inset: 0, zIndex: 100,
            transform: `translate(${430 - click * 128}px, -30px) rotate(${(1 - click) * 12}deg)`,
            opacity: 1 - blast * 0.8 }}>
            <RepoCard x={330} y={452} s={0.48} z={100} />
          </div>
          {/* he is blown back, and the cup was never going to be enough */}
          <div style={{ position: "absolute", inset: 0, zIndex: 86,
            transform: `translate(${blast * 186}px, 0) rotate(${blast * 14}deg)`,
            transformOrigin: "50% 100%" }}>
            <Claude x={496} base={716} s={1.0} f={f} z={86} gaze={0.9} shock={blast}
              hold={blast < 0.3 ? 98 : 0} holdClaude />
          </div>
          <Pile x={330} base={718} n={Math.round(blast * 100)} s={1.0} z={92} w={540}
            seed={9} />
          <Flash lf={lf} at={11} n={4} o={0.48} />
        </div>
      </Scene>
    );
  }

  if (shot === 1) {
    const set = E(lf, 0, 10, 0, 1, OUT);
    return (
      <Scene p={p} slug="SAME TAP  ·  EVERY PROVIDER" push={[42, 78, 1.06]} vig={0.4}>
        <Shop p={p} f={f} shelf={3} lamp={190} from={1} till={false} edge={false} />
        {[0, 1, 2, 3].map((i) => (
          <React.Fragment key={"pp" + i}>
            <div style={{ position: "absolute", left: 152 + i * 232, top: -40, width: 76,
              height: 260, background: BRASS, zIndex: 30, boxShadow: SH }} />
            <Token x={190 + i * 232} y={300} s={148} z={40} markKey={P[i].k}
              name={P[i].n} hasMark={P[i].mark} />
            <Fall x={190 + i * 232} y={368} len={230} f={f + i * 9} n={5} s={0.9}
              z={60 + i} spread={60} on={E(lf, i * 3, i * 3 + 8, 0, 1, OUT)} />
          </React.Fragment>
        ))}
        <Cam z={96} o={set} y={(1 - set) * 16}>
          <Chip t="ALL 29, THROUGH ONE" y={604} z={96} c="#241F19" />
        </Cam>
        <Flash lf={lf} at={0} n={2} o={0.28} />
      </Scene>
    );
  }

  const grow = E(lf, 0, 24, 0.4, 1, OUT);
  return (
    <Scene p={p} slug="ONE REPO  ·  EVERY FREE TIER" push={[78, 110, 1.05]} vig={0.34}>
      <Shop p={p} f={f} shelf={4} lamp={210} from={0} />
      <Counter x={W / 2} y={160} v={M} s={0.6} z={96} />
      <Fall x={664} y={-30} len={640} f={f} n={12} s={1.12} z={64} spread={420} on={1} />
      <Pile x={664} base={716} n={Math.round(grow * 165)} s={1.08} z={70} w={560} seed={3} />
      <Token x={534} y={548} s={188} z={92} markKey={P[1].k} name={P[1].n} hasMark rot={-8} />
      <Token x={758} y={420} s={198} z={93} markKey={P[4].k} name={P[4].n} hasMark rot={7} />
      <Claude x={150} base={716} s={0.88} z={84} f={f} gaze={0.8} cheer={0.85} />
      <Flash lf={lf} at={0} n={2} o={0.22} />
    </Scene>
  );
};
